import { getCurrentUser } from "./getCurrentUser";
import { redirect } from "next/navigation";

export async function requireUser() {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/auth/refresh");
    }
    return {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        status: user.status,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
        profile: user.profile
            ? {
                  firstName: user.profile.firstName,
                  lastName: user.profile.lastName,
                  avatar: user.profile.avatar,
                  phone: user.profile.phone,
                  country: user.profile.country,
                  state: user.profile.state,
                  city: user.profile.city,
                  timezone: user.profile.timezone,
              }
            : null,
    };

}