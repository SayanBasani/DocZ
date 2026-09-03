import { SignJWT, jwtVerify} from "jose";
import { ENV } from "../config/env";
import { JwtPayload } from "../types/jwt";

if (!ENV.JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET is missing in .env");
}

if (!ENV.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is missing in .env");
}

const accessSecretKey = new TextEncoder().encode(ENV.JWT_ACCESS_SECRET);

const refreshSecretKey = new TextEncoder().encode(ENV.JWT_REFRESH_SECRET);

// export interface JwtPayload extends JWTPayload {
//     userId: string;
//     email: string;
//     role: string;
//     sessionId: string;
// }


export async function generateAccessToken(payload: JwtPayload) {

    return await new SignJWT(payload)
        .setProtectedHeader({
            alg: "HS256"
        })
        .setIssuedAt()
        .setExpirationTime(`${ENV.ACCESS_TOKEN_EXPIRES_IN}m`)
        .sign(accessSecretKey);

}

export async function generateRefreshToken(payload: JwtPayload) {

    return await new SignJWT(payload)
        .setProtectedHeader({
            alg: "HS256"
        })
        .setIssuedAt()
        .setExpirationTime(`${ENV.REFRESH_TOKEN_EXPIRES_IN}d`)
        .sign(refreshSecretKey);

}

export async function verifyAccessToken(token: string): Promise<JwtPayload>  {

    const { payload } = await jwtVerify(token, accessSecretKey);

    return payload as JwtPayload;

}

export async function verifyRefreshToken(token: string): Promise<JwtPayload> {
    const { payload } = await jwtVerify(token, refreshSecretKey);
    return payload as JwtPayload;

}