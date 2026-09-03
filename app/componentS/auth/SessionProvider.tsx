import { useEffect, useRef } from "react";

type SessionProviderProps = {
    children: React.ReactNode;
    accessTokenLifetime: number; // minutes
};

export default function SessionProvider({
    children,
    accessTokenLifetime,
}: SessionProviderProps) {

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {

        const scheduleRefresh = () => {
            const delay = Math.max((accessTokenLifetime - 2) * 60 * 1000, 1000 );
            timerRef.current = setTimeout(async () => {
                try {
                    const response = await fetch(
                        "/api/auth/refresh",
                        { method: "GET", credentials: "include", } );
                    if (response.ok) { scheduleRefresh(); }
                    else { window.location.href = "/login"; }
                }
                catch { window.location.href = "/login"; }
            }, delay);
        };

        scheduleRefresh();

        return () => {

            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }

        };

    }, [accessTokenLifetime]);

    return <>{children}</>;

}