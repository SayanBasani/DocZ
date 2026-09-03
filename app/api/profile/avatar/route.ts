import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth/requireUser";
import { uploadAvatar, deleteAvatar } from "@/lib/cloudinary/upload";
import { prisma } from "@/lib/db/prisma";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

export async function PATCH( request: NextRequest ) {

    try {

        const user = await requireUser();

        const formData = await request.formData();

        const file = formData.get("avatar");

        if (!(file instanceof File)) {

            return NextResponse.json(
                {
                    message: "Avatar image is required.",
                },
                {
                    status: 400,
                }
            );

        }

        if (!ALLOWED_TYPES.includes(file.type)) {

            return NextResponse.json(
                {
                    message: "Only JPG, PNG and WEBP images are allowed.",
                },
                {
                    status: 400,
                }
            );

        }

        if (file.size > MAX_FILE_SIZE) {

            return NextResponse.json(
                {
                    message: "Image must be smaller than 5MB.",
                },
                {
                    status: 400,
                }
            );

        }

        const profile = await prisma.userProfile.findUnique({

            where: {
                userId: user.id,
            },

        });

        if (!profile) {

            return NextResponse.json(
                {
                    message: "Profile not found.",
                },
                {
                    status: 404,
                }
            );

        }

        if (profile.avatarPublicId) {

            await deleteAvatar(profile.avatarPublicId);

        }

        const bytes = await file.arrayBuffer();

        const buffer = Buffer.from(bytes);

        const result = await uploadAvatar(
            buffer,
            user.id
        );

        const updatedProfile = await prisma.userProfile.update({

            where: {
                userId: user.id,
            },

            data: {

                avatar: result.secure_url,

                avatarPublicId: result.public_id,

            },

        });

        return NextResponse.json({

            message: "Avatar updated successfully.",

            avatar: updatedProfile.avatar,

        });

    }
    catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                message: "Something went wrong.",
            },
            {
                status: 500,
            }
        );

    }

}

export async function DELETE() {

    try {

        const user = await requireUser();

        const profile = await prisma.userProfile.findUnique({

            where: {
                userId: user.id,
            },

        });

        if (!profile) {

            return NextResponse.json(
                {
                    message: "Profile not found.",
                },
                {
                    status: 404,
                }
            );

        }

        if (profile.avatarPublicId) {

            await deleteAvatar(
                profile.avatarPublicId
            );

        }

        await prisma.userProfile.update({

            where: {
                userId: user.id,
            },

            data: {

                avatar: null,

                avatarPublicId: null,

            },

        });

        return NextResponse.json({

            message: "Avatar removed successfully.",

        });

    }
    catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                message: "Something went wrong.",
            },
            {
                status: 500,
            }
        );

    }

}