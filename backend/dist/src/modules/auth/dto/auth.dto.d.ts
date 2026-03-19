export declare class SignUpDto {
    phone: string;
    email?: string;
    password: string;
    firstName: string;
    lastName: string;
    fatherName?: string;
    relation?: string;
    aadhaarNumber?: string;
    gender?: string;
    tenantAddress?: string;
    collegeName?: string;
}
export declare class SignInDto {
    phone: string;
    password: string;
}
export declare class RefreshTokenDto {
    refreshToken: string;
}
