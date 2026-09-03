import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { prisma } from "@/lib/db/prisma";
import { verifyAccessToken } from "@/lib/auth/jwt";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;
        if (!accessToken) {
            return NextResponse.json(
                { success: false, message: "Unauthorized." },
                {status: 401}
            );
        }
        const payload = await verifyAccessToken(accessToken);

        const user = await prisma.user.findUnique({
            where: {
                id: payload.userId as string
            },
                select: {
                id: true,
                email: true,
                username: true,
                role: true,
                status: true,
                emailVerified: true
            }

        });
        console.log("in api/auth/me ->",user);
        
        if (!user) {

            return NextResponse.json(
                {
                    success: false,
                    message: "User not found."
                },
                {
                    status: 404
                }
            );

        }

        return NextResponse.json(
            {
                success: true,
                user
            },
            {
                status: 200
            }
        );

    }
    catch {

        return NextResponse.json(
            {
                success: false,
                message: "Invalid or expired token."
            },
            {
                status: 401
            }
        );

    }

}