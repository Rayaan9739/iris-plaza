import { Response } from "express";
import { AgreementsService } from "./agreements.service";
export declare class AgreementsController {
    private agreementsService;
    constructor(agreementsService: AgreementsService);
    getMyAgreement(req: any): Promise<{
        agreement: ({
            booking: {
                id: string;
                status: import(".prisma/client").$Enums.BookingStatus;
                startDate: Date;
                endDate: Date | null;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                roomId: string;
                moveInDate: Date | null;
                moveOutDate: Date | null;
                checkoutDate: Date | null;
                bookingFee: import("@prisma/client/runtime/library").Decimal | null;
                bookingFeePaid: boolean;
                expiresAt: Date | null;
                deletedAt: Date | null;
            };
        } & {
            id: string;
            bookingId: string;
            agreementUrl: string | null;
            status: import(".prisma/client").$Enums.AgreementStatus;
            tenantSigned: boolean;
            tenantSignedAt: Date | null;
            adminSigned: boolean;
            adminSignedAt: Date | null;
            startDate: Date;
            endDate: Date;
            monthlyRent: import("@prisma/client/runtime/library").Decimal;
            securityDeposit: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            updatedAt: Date;
        }) | null;
    }>;
    findByBooking(bookingId: string): Promise<({
        booking: {
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                email: string | null;
                phone: string;
                password: string;
                role: import(".prisma/client").$Enums.UserRole;
                firstName: string;
                lastName: string;
                isActive: boolean;
                isApproved: boolean;
                accountStatus: import(".prisma/client").$Enums.AccountStatus;
                isEmailVerified: boolean;
                isPhoneVerified: boolean;
                emailVerifyToken: string | null;
            };
            room: {
                id: string;
                status: import(".prisma/client").$Enums.RoomStatus;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                deletedAt: Date | null;
                type: import(".prisma/client").$Enums.RoomType;
                description: string | null;
                floor: number;
                area: number;
                rent: import("@prisma/client/runtime/library").Decimal;
                deposit: import("@prisma/client/runtime/library").Decimal;
                isAvailable: boolean;
                occupiedFrom: Date | null;
                occupiedUntil: Date | null;
                availableAt: Date | null;
                videoUrl: string | null;
            };
        } & {
            id: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            startDate: Date;
            endDate: Date | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            roomId: string;
            moveInDate: Date | null;
            moveOutDate: Date | null;
            checkoutDate: Date | null;
            bookingFee: import("@prisma/client/runtime/library").Decimal | null;
            bookingFeePaid: boolean;
            expiresAt: Date | null;
            deletedAt: Date | null;
        };
    } & {
        id: string;
        bookingId: string;
        agreementUrl: string | null;
        status: import(".prisma/client").$Enums.AgreementStatus;
        tenantSigned: boolean;
        tenantSignedAt: Date | null;
        adminSigned: boolean;
        adminSignedAt: Date | null;
        startDate: Date;
        endDate: Date;
        monthlyRent: import("@prisma/client/runtime/library").Decimal;
        securityDeposit: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    signAsTenant(bookingId: string, body: {
        signature?: string;
    }): Promise<{
        booking: {
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                email: string | null;
                phone: string;
                password: string;
                role: import(".prisma/client").$Enums.UserRole;
                firstName: string;
                lastName: string;
                isActive: boolean;
                isApproved: boolean;
                accountStatus: import(".prisma/client").$Enums.AccountStatus;
                isEmailVerified: boolean;
                isPhoneVerified: boolean;
                emailVerifyToken: string | null;
            };
            room: {
                id: string;
                status: import(".prisma/client").$Enums.RoomStatus;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                deletedAt: Date | null;
                type: import(".prisma/client").$Enums.RoomType;
                description: string | null;
                floor: number;
                area: number;
                rent: import("@prisma/client/runtime/library").Decimal;
                deposit: import("@prisma/client/runtime/library").Decimal;
                isAvailable: boolean;
                occupiedFrom: Date | null;
                occupiedUntil: Date | null;
                availableAt: Date | null;
                videoUrl: string | null;
            };
        } & {
            id: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            startDate: Date;
            endDate: Date | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            roomId: string;
            moveInDate: Date | null;
            moveOutDate: Date | null;
            checkoutDate: Date | null;
            bookingFee: import("@prisma/client/runtime/library").Decimal | null;
            bookingFeePaid: boolean;
            expiresAt: Date | null;
            deletedAt: Date | null;
        };
    } & {
        id: string;
        bookingId: string;
        agreementUrl: string | null;
        status: import(".prisma/client").$Enums.AgreementStatus;
        tenantSigned: boolean;
        tenantSignedAt: Date | null;
        adminSigned: boolean;
        adminSignedAt: Date | null;
        startDate: Date;
        endDate: Date;
        monthlyRent: import("@prisma/client/runtime/library").Decimal;
        securityDeposit: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
    signAsAdmin(bookingId: string, body: {
        signature?: string;
    }): Promise<{
        booking: {
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                email: string | null;
                phone: string;
                password: string;
                role: import(".prisma/client").$Enums.UserRole;
                firstName: string;
                lastName: string;
                isActive: boolean;
                isApproved: boolean;
                accountStatus: import(".prisma/client").$Enums.AccountStatus;
                isEmailVerified: boolean;
                isPhoneVerified: boolean;
                emailVerifyToken: string | null;
            };
            room: {
                id: string;
                status: import(".prisma/client").$Enums.RoomStatus;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                deletedAt: Date | null;
                type: import(".prisma/client").$Enums.RoomType;
                description: string | null;
                floor: number;
                area: number;
                rent: import("@prisma/client/runtime/library").Decimal;
                deposit: import("@prisma/client/runtime/library").Decimal;
                isAvailable: boolean;
                occupiedFrom: Date | null;
                occupiedUntil: Date | null;
                availableAt: Date | null;
                videoUrl: string | null;
            };
        } & {
            id: string;
            status: import(".prisma/client").$Enums.BookingStatus;
            startDate: Date;
            endDate: Date | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            roomId: string;
            moveInDate: Date | null;
            moveOutDate: Date | null;
            checkoutDate: Date | null;
            bookingFee: import("@prisma/client/runtime/library").Decimal | null;
            bookingFeePaid: boolean;
            expiresAt: Date | null;
            deletedAt: Date | null;
        };
    } & {
        id: string;
        bookingId: string;
        agreementUrl: string | null;
        status: import(".prisma/client").$Enums.AgreementStatus;
        tenantSigned: boolean;
        tenantSignedAt: Date | null;
        adminSigned: boolean;
        adminSignedAt: Date | null;
        startDate: Date;
        endDate: Date;
        monthlyRent: import("@prisma/client/runtime/library").Decimal;
        securityDeposit: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
    downloadAgreement(bookingId: string, res: Response): Promise<void | Response<any, Record<string, any>>>;
    viewAgreement(bookingId: string, req: any, res: Response): Promise<void | Response<any, Record<string, any>>>;
}
