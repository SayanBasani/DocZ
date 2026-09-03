import type { JWTPayload } from "jose";

export interface AccessTokenPayload extends JWTPayload {
    userId: string;
    email: string;
    role: string;
    sessionId: string;
}

export interface RefreshTokenPayload extends JWTPayload {
    userId: string;
    email: string;
    role: string;
}
export interface JwtPayload extends JWTPayload {
    userId: string;
    email: string;
    role: string;
    sessionId: string;
}