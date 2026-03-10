"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../../prisma/prisma.service");
const BCRYPT_ROUNDS = 12;
let AuthService = AuthService_1 = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async signUp(signUpDto) {
        const { phone, email, password, firstName, lastName } = signUpDto;
        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [{ phone }, ...(email ? [{ email }] : [])],
            },
        });
        if (existingUser) {
            throw new common_1.BadRequestException("User with this phone or email already exists");
        }
        const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
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
        const tokens = await this.generateTokens(user.id, user.phone, user.role);
        return {
            user: this.sanitizeUser(user),
            ...tokens,
            message: "Registration successful.",
        };
    }
    async signIn(signInDto) {
        const { phone, password } = signInDto;
        const user = await this.prisma.user.findUnique({
            where: { phone },
        });
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        if (user.accountStatus === "SUSPENDED") {
            throw new common_1.UnauthorizedException("Account is suspended");
        }
        if (user.accountStatus === "REJECTED") {
            throw new common_1.UnauthorizedException("Account has been rejected");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const tokens = await this.generateTokens(user.id, user.phone, user.role);
        return {
            user: this.sanitizeUser(user),
            ...tokens,
        };
    }
    async refreshTokens(refreshTokenDto) {
        const { refreshToken } = refreshTokenDto;
        const tokenRecord = await this.prisma.refreshToken.findUnique({
            where: { token: refreshToken },
            include: { user: true },
        });
        if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
            throw new common_1.UnauthorizedException("Invalid or expired refresh token");
        }
        if (tokenRecord.user.accountStatus !== "ACTIVE") {
            throw new common_1.UnauthorizedException("Account is not active");
        }
        await this.prisma.refreshToken.delete({
            where: { id: tokenRecord.id },
        });
        const tokens = await this.generateTokens(tokenRecord.user.id, tokenRecord.user.phone, tokenRecord.user.role);
        return tokens;
    }
    async validateUser(userId) {
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
    canPerformBooking(user) {
        return (user.accountStatus === "ACTIVE");
    }
    async generateTokens(userId, phone, role) {
        const payload = { sub: userId, phone, role };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: "15m",
        });
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: "7d",
        });
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
    sanitizeUser(user) {
        const { password, ...sanitized } = user;
        return sanitized;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map