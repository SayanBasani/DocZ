export interface UserProfile {
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    avatar: string | null;
    country: string | null;
    state: string | null;
    city: string | null;
    timezone: string | null;
}

export interface CurrentUser {
    id: string;
    email: string;
    username: string;
    role: string;
    status: string;
    emailVerified: boolean;
    createdAt: string;
    lastLogin: string | null;
    profile: UserProfile | null;
}