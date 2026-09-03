import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { setAuthCookies, clearAuthCookies } from "@/lib/auth/cookies";
import { refreshSession } from "@/lib/auth/refreshSession";

export async function GET(request: Request) {
    try {
        const cookieStore = await cookies();

        const refreshToken = cookieStore.get("refreshToken")?.value;

        if (!refreshToken) {
            await clearAuthCookies();
            return NextResponse.json(
                { success: false, message: "Refresh token missing." }, 
                { status: 401 } 
            );
        }

        const ipAddress =
            request.headers.get("x-forwarded-for") ??
            request.headers.get("x-real-ip") ??
            undefined;
        const tokens = await refreshSession(refreshToken, ipAddress);

        await setAuthCookies( tokens.accessToken, tokens.refreshToken );

        return NextResponse.json({ success: true, message: "Token refreshed.", }, { status: 200, } );
    }
    catch (error) {
        console.error(error);
        await clearAuthCookies();
        return NextResponse.json(
            { success: false, message: "Session expired." }, 
            { status: 401 }
        );
    }
}

