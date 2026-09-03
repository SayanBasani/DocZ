import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { hashToken } from "@/lib/auth/tokenHash";

export async function GET(request: NextRequest) {

    try {
        const token = request.nextUrl.searchParams.get("token");

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Verification token is missing.",
                },
                { status: 400, }
            );
        }
        const tokenHash = hashToken(token);
        const verification = await prisma.emailVerificationToken.findUnique({
                where: { tokenHash, },
            });

        if (!verification) {
            return NextResponse.redirect(
                new URL("/verify-email?status=invalid", request.url)
            );
        }

        if (verification.expiresAt < new Date()) {
            await prisma.emailVerificationToken.delete({
                where: { id: verification.id, },
            });
            return NextResponse.redirect(
                new URL("/verify-email?status=expired", request.url)
            );
        }

        await prisma.user.update({
            where: { id: verification.userId, },
            data: {
                emailVerified: true,
                status: "ACTIVE",
            },
        });

        await prisma.emailVerificationToken.delete({
            where: { id: verification.id, },
        });

        return NextResponse.redirect(
            new URL("/verify-email?status=success", request.url)
        );
    }
    catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error.",
            },
            { status: 500, }
        );
    }
}