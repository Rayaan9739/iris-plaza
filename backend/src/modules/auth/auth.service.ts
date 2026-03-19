import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { PrismaService } from "@/prisma/prisma.service";
import {
  SignUpDto,
  SignInDto,
  RefreshTokenDto,
} from "./dto/auth.dto";

// Constants for security
const BCRYPT_ROUNDS = 12;

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  /**
   * Sign up - Create new tenant account (active immediately)
   */
  async signUp(signUpDto: SignUpDto) {
    const { phone, email, password, firstName, lastName } = signUpDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ phone }, ...(email ? [{ email }] : [])],
      },
    });

    if (existingUser) {
      throw new BadRequestException(
        "User with this phone or email already exists",
      );
    }

    // Hash password with bcrypt (12 rounds)
    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

    // Create user as ACTIVE immediately with provided details
    const user = await this.prisma.user.create({
      data: {
        phone,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: "TENANT",
        isApproved: true,
        accountStatus: "ACTIVE",
        tenantProfile: {
          create: {},
        },
      },
      include: {
        tenantProfile: true,
      },
    });

    // Try to update tenant profile with identity details (if fields exist in DB)
    // This will be skipped if prisma client hasn't been regenerated
    const { fatherName, relation, aadhaarNumber, gender, tenantAddress, collegeName } = signUpDto as any;
    if (fatherName || relation || aadhaarNumber || gender || tenantAddress || collegeName) {
      try {
        await this.prisma.tenantProfile.update({
          where: { userId: user.id },
          data: {
            ...(fatherName && { fatherName }),
            ...(relation && { relation }),
            ...(aadhaarNumber && { aadhaarNumber }),
            ...(gender && { gender }),
            ...(tenantAddress && { tenantAddress }),
            ...(collegeName && { collegeName }),
          },
        });
      } catch (err) {
        // Ignore errors - fields may not exist yet in database
        this.logger.log("Tenant profile update skipped - fields may not exist yet");
      }
    }

    const tokens = await this.generateTokens(user.id, user.phone, user.role);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
      message: "Registration successful.",
    };
  }

  /**
   * Sign in - Login with phone and password
   */
  async signIn(signInDto: SignInDto) {
    const { phone, password } = signInDto;

    const user = await this.prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // Check if account is suspended
    if (user.accountStatus === "SUSPENDED") {
      throw new UnauthorizedException("Account is suspended");
    }

    // Check if account is rejected
    if (user.accountStatus === "REJECTED") {
      throw new UnauthorizedException("Account has been rejected");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // Generate tokens for active users
    const tokens = await this.generateTokens(user.id, user.phone, user.role);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  /**
   * Refresh access tokens
   */
  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;

    const tokenRecord = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }

    // Check if user is still active
    if (tokenRecord.user.accountStatus !== "ACTIVE") {
      throw new UnauthorizedException("Account is not active");
    }

    // Delete old refresh token
    await this.prisma.refreshToken.delete({
      where: { id: tokenRecord.id },
    });

    // Generate new tokens
    const tokens = await this.generateTokens(
      tokenRecord.user.id,
      tokenRecord.user.phone,
      tokenRecord.user.role,
    );

    return tokens;
  }

  /**
   * Validate user for JWT strategy
   */
  async validateUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        tenantProfile: true,
      },
    });

    if (!user || user.accountStatus === "SUSPENDED") {
      return null;
    }

    return this.sanitizeUser(user);
  }

  /**
   * Check if user can perform booking actions
   */
  canPerformBooking(user: any): boolean {
    return (
      user.accountStatus === "ACTIVE"
    );
  }

  /**
   * Generate JWT tokens
   */
  private async generateTokens(
    userId: string,
    phone: string,
    role: string,
  ) {
    const payload = { sub: userId, phone, role };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: "15m",
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: "7d",
    });

    // Store refresh token
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        expiresAt,
        userId,
      },
    });

    return { accessToken, refreshToken };
  }

  /**
   * Remove sensitive data from user object
   */
  private sanitizeUser(user: any) {
    const { password, ...sanitized } = user;
    return sanitized;
  }
}
