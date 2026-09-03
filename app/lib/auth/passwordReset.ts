import crypto from "crypto";

import { prisma } from "@/lib/db/prisma";
import { hashToken } from "@/lib/auth/tokenHash";

export async function createPasswordResetToken(userId: string) {

    await prisma.passwordResetToken.deleteMany({

        where: {
            userId
        }

    });

    const rawToken = crypto.randomBytes(32).toString("hex");

    const tokenHash = hashToken(rawToken);

    const expiresAt = new Date(
        Date.now() + 1000 * 60 * 30
    );

    await prisma.passwordResetToken.create({

        data: {

            tokenHash,

            userId,

            expiresAt

        }

    });

    return rawToken;

}