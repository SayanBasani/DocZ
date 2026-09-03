import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/requireUser";
import { prisma } from "@/lib/db/prisma";
import { validateProfile } from "@/lib/validation/profile";

export async function GET() {
    try {
        const user = await requireUser();

        return NextResponse.json(
            {
                success: true,
                data: user,
            },
            {
                status: 200,
            }
        );
    }
    catch {
        return NextResponse.json(
            {
                success: false,
                message: "Unauthorized.",
            },
            {
                status: 401,
            }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        const user = await requireUser();

        const body = await request.json();

        const firstName = body.firstName?.trim() ?? "";
        const lastName = body.lastName?.trim() ?? "";
        const phone = body.phone?.trim() ?? "";
        const country = body.country?.trim() ?? "";
        const state = body.state?.trim() ?? "";
        const city = body.city?.trim() ?? "";
        const timezone = body.timezone?.trim() ?? "";

        const validation = validateProfile({
            firstName,
            lastName,
            phone,
            country,
            state,
            city,
            timezone,
        });

        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: validation.message,
                },
                {
                    status: 400,
                }
            );
        }

        const profile = await prisma.userProfile.update({
            where: {
                userId: user.id,
            },
            data: {
                firstName,
                lastName,
                phone,
                country,
                state,
                city,
                timezone,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Profile updated successfully.",
                data: profile,
            },
            {
                status: 200,
            }
        );
    }
    catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to update profile.",
            },
            {
                status: 500,
            }
        );
    }
}