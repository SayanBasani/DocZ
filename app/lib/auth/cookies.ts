import { cookies } from "next/headers";
import { ENV } from "../config/env";

export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
};

export async function setAuthCookies(accessToken: string, refreshToken: string) {

    const cookieStore = await cookies();

    cookieStore.set(ENV.ACCESS_TOKEN_COOKIE, accessToken, {
        ...COOKIE_OPTIONS,
        maxAge: 60 * ENV.ACCESS_TOKEN_EXPIRES_IN
    });

    cookieStore.set(ENV.REFRESH_TOKEN_COOKIE, refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: 60 * 60 * 24 * ENV.REFRESH_TOKEN_EXPIRES_IN
    });

}
export async function setAccessTokenCookie(accessToken: string) {
    const cookieStore = await cookies();

    cookieStore.set(ENV.ACCESS_TOKEN_COOKIE, accessToken, {
        ...COOKIE_OPTIONS,
        maxAge: 60 * ENV.ACCESS_TOKEN_EXPIRES_IN,
    });
}

export async function clearAuthCookies() {

    const cookieStore = await cookies();

    cookieStore.set(ENV.ACCESS_TOKEN_COOKIE, "", {
        ...COOKIE_OPTIONS,
        maxAge: 0,
    });

    cookieStore.set(ENV.REFRESH_TOKEN_COOKIE, "", {
        ...COOKIE_OPTIONS,
        maxAge: 0,
    });

}