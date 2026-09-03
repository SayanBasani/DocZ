import {
    UserRole,
    UserStatus,
} from "@prisma/client";

export interface SafeUser {
    id: string;
    email: string;
    username: string;
    role: UserRole;
    status: UserStatus;
    emailVerified: boolean;
    createdAt: Date;
    lastLogin: Date | null;
    profile: {
        firstName: string | null;
        lastName: string | null;
        avatar: string | null;
        phone: string | null;
        country: string | null;
        state: string | null;
        city: string | null;
        timezone: string | null;
    } | null;

}