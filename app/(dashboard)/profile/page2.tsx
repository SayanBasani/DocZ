"use client";

import { CurrentUser } from "@/lib/types/profile";
import { useEffect, useState } from "react";


export default function ProfilePage() {
    const [user, setUser] = useState<CurrentUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const response = await fetch("/api/profile");

                const result = await response.json();

                if (result.success) {
                    setUser(result.data);
                }
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    if (loading) {
        return (
            <div className="p-6">
                Loading profile...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="p-6">
                Failed to load profile.
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-8">
                My Profile
            </h1>

            <div className="rounded-xl border p-6 space-y-4">

                <div>
                    <strong>Username:</strong> {user.username}
                </div>

                <div>
                    <strong>Email:</strong> {user.email}
                </div>

                <div>
                    <strong>First Name:</strong> {user.profile?.firstName ?? "-"}
                </div>

                <div>
                    <strong>Last Name:</strong> {user.profile?.lastName ?? "-"}
                </div>

                <div>
                    <strong>Phone:</strong> {user.profile?.phone ?? "-"}
                </div>

                <div>
                    <strong>Country:</strong> {user.profile?.country ?? "-"}
                </div>

                <div>
                    <strong>State:</strong> {user.profile?.state ?? "-"}
                </div>

                <div>
                    <strong>City:</strong> {user.profile?.city ?? "-"}
                </div>

                <div>
                    <strong>Timezone:</strong> {user.profile?.timezone ?? "-"}
                </div>

                <div>
                    <strong>Role:</strong> {user.role}
                </div>

                <div>
                    <strong>Status:</strong> {user.status}
                </div>

                <div>
                    <strong>Email Verified:</strong> {user.emailVerified ? "Yes" : "No"}
                </div>

            </div>

        </div>
    );
}