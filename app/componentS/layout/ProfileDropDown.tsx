"use client";

import { LogOut, Moon, Settings, Sun, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";

export default function ProfileDropDown() {

    const router = useRouter();
    const { resolvedTheme, setTheme } = useTheme();

    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {

        try {

            setLoading(true);

            const response = await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error("Logout failed.");
            }

            router.replace("/login");
            router.refresh();

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="py-2">

            <Link href={'/profile'} className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-slate-700">

                <User size={18} />

                <span>My Profile</span>

            </Link>

            <Link href="/settings" className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-slate-700">

                <Settings size={18} />

                <span>Settings</span>

            </Link>

            <button
                type="button"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-slate-700"
            >

                {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}

                <span>Switch to {resolvedTheme === "dark" ? "light" : "dark"} mode</span>

            </button>

            <hr className="my-2 border-gray-200 dark:border-slate-700" />

            <button
                onClick={handleLogout}
                disabled={loading}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-70 dark:hover:bg-red-950"
            >

                <LogOut size={18} />

                <span>{loading ? "Logging out..." : "Logout"}</span>

            </button>

        </div>

    );

}
