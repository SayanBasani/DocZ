import { UAParser } from "ua-parser-js";

export interface ParsedSession {

    browser: string;

    os: string;

    device: string;

    deviceName: string;

}

export function parseUserAgent(
    userAgent: string | null
): ParsedSession {

    const parser = new UAParser(
        userAgent ?? ""
    );

    const browser =
        parser.getBrowser().name ?? "Unknown Browser";

    const os =
        parser.getOS().name ?? "Unknown OS";

    const deviceType =
        parser.getDevice().type ?? "Desktop";

    const deviceName = `${browser} on ${os}`;

    return {

        browser,

        os,

        device: deviceType,

        deviceName,

    };

}