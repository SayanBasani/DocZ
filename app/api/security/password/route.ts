import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// import prisma from "@/lib/db/prisma";
import { prisma } from "@/lib/db/prisma";
import { requireUser } from "@/lib/auth/requireUser";
import {
    changePasswordSchema,
} from "@/lib/validation/security";

export async function PATCH(
    request: NextRequest
) {

    try {

        const currentUser = await requireUser();
        const body = await request.json();
        const validation = changePasswordSchema.safeParse(body);

        if (!validation.success) {

            return NextResponse.json(
                {
                    success: false,
                    message: validation.error.issues[0].message ?? "Invalid request.",
                },
                { status: 400, }
            );
        }

        const {
            currentPassword,
            newPassword,
        } = validation.data;

        const user = await prisma.user.findUnique({
            where: { id: currentUser.id, },
        });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found.",
                },
                { status: 404, }
            );
        }

        const passwordCorrect = await bcrypt.compare( currentPassword, user.password );

        if (!passwordCorrect) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Current password is incorrect.",
                },
                {
                    status: 400,
                }
            );
        }

        const samePassword = await bcrypt.compare( newPassword, user.password );
        if (samePassword) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "New password must be different from the current password.",
                },
                { status: 400, }
            );
        }
        const hashedPassword =
            await bcrypt.hash( newPassword, 12 );

        await prisma.$transaction([
            prisma.user.update({
                where: { id: user.id, },
                data: {
                    password: hashedPassword,
                    passwordChangedAt: new Date(),
                },
            }),
            prisma.refreshToken.deleteMany({
                where: { userId: user.id, },
            }),
        ]);

        return NextResponse.json({
            success: true,
            message:
                "Password changed successfully. Please sign in again.",
        });
    }
    catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
            },
            { status: 500, }
        );
    }
}