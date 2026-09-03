import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { ENV } from "../config/env";


export async function getDeviceId(): Promise<string> {
    const cookieStore = await cookies();

    let deviceId = cookieStore.get(ENV.DEVICE_COOKIE_NAME)?.value;

    if (!deviceId) {
        deviceId = randomUUID();

        cookieStore.set(ENV.DEVICE_COOKIE_NAME, deviceId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 365, // 1 year
        });
    }

    return deviceId;
}