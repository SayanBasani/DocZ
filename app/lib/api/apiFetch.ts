type ApiFetchOptions = RequestInit & {
    retry?: boolean;
};

export async function apiFetch(
    input: string,
    options: ApiFetchOptions = {}
) {
    const { retry = true, ...fetchOptions } = options;

    const response = await fetch(input, {
        ...fetchOptions,
        credentials: "include",
    });

    // Request successful
    if (response.ok) {
        return response;
    }

    // Access token expired
    if (response.status === 401 && retry) {

        const refreshResponse = await fetch("/api/auth/refresh", {
            method: "POST",
            credentials: "include",
        });

        // Refresh successful → Retry original request once
        if (refreshResponse.ok) {

            return apiFetch(input, {
                ...fetchOptions,
                retry: false,
            });

        }

        // Refresh failed → Login
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }

        throw new Error("Session expired");
    }

    return response;
}