"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RefreshPage() {

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {

        const redirect =
            searchParams.get("redirect") ?? "/home";

        const refresh = async () => {

            try {

                const response = await fetch(
                    "/api/auth/refresh",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (response.ok) {

                    router.replace(redirect);

                }
                else {

                    router.replace("/login");

                }

            }
            catch {

                router.replace("/login");

            }

        };

        refresh();

    }, [router, searchParams]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            Refreshing session...
        </div>
    );

}