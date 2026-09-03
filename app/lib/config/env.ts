export const ENV = {
    // App
    APP_NAME: process.env.NEXT_PUBLIC_APP_NAME ?? "Trader Pro",
    APP_URL: process.env.APP_URL  ?? "http://localhost:3000",

    // Database
    DATABASE_URL: process.env.DATABASE_URL!,

    // JWT
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
    ACCESS_TOKEN_COOKIE: "accessToken",
    REFRESH_TOKEN_COOKIE: "refreshToken",
    DEVICE_COOKIE_NAME: "deviceId",

    // Token Expiration
    ACCESS_TOKEN_EXPIRES_IN: Number(
        process.env.ACCESS_TOKEN_EXPIRES_IN ?? 15
    ),

    REFRESH_TOKEN_EXPIRES_IN: Number(
        process.env.REFRESH_TOKEN_EXPIRES_IN ?? 7
    ),

    // SMTP
    SMTP_HOST: process.env.SMTP_HOST ?? "",
    SMTP_PORT: Number(process.env.SMTP_PORT ?? 587),
    SMTP_USER: process.env.SMTP_USER ?? "",
    SMTP_PASS: process.env.SMTP_PASS ?? "",

    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
    
} as const;