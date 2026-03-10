import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "@/prisma/prisma.service";
import { SignUpDto, SignInDto, RefreshTokenDto } from "./dto/auth.dto";
export declare class AuthService {
    private prisma;
    private jwtService;
    private readonly logger;
    constructor(prisma: PrismaService, jwtService: JwtService);
    signUp(signUpDto: SignUpDto): Promise<{
        message: string;
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    refreshTokens(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    validateUser(userId: string): Promise<any>;
    canPerformBooking(user: any): boolean;
    private generateTokens;
    private sanitizeUser;
}
