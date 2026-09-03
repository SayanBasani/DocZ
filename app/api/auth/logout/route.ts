import { NextResponse } from "next/server";
import { clearAuthCookies } from "@/lib/auth/cookies";
import { cookies } from "next/headers";
import { hashToken } from "@/lib/auth/tokenHash";
import { prisma } from "@/lib/db/prisma";
export async function POST() {
    try {
        const cookieStore = await cookies();
        
        const refreshToken = cookieStore.get("refreshToken")?.value;
        
        if (refreshToken) {
            const hashedRefreshToken = hashToken(refreshToken);
            await prisma.refreshToken.update(
                { 
                    where: { tokenHash: hashedRefreshToken },
                    data: {
                        revokedAt: new Date(),
                        lastUsedAt: new Date(),
                    }
                }
            )
        }
        await clearAuthCookies();
        return NextResponse.json(
            { success: true, message: "Logged out successfully." },
            { status: 200 } );
    }
    catch (error) {
        console.error(error);
        await clearAuthCookies();
        return NextResponse.json(
            { success: false, message: "Failed to logout." },
            { status: 500 } );
    }
}