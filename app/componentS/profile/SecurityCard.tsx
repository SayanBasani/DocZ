"use client"
import { SafeUser } from "@/lib/types/user";
import { useState } from "react";
import {
    ShieldCheck,
    Lock,
    Mail,
    Smartphone,
    LogOut,
    KeyRound,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import ChangePasswordForm from "./ChangePasswordForm";
import ActiveSessions from "./ActiveSessions";
import { useRouter } from "next/navigation";

interface SecurityCardProps {
    user: SafeUser;
}

export default function SecurityCard({
    user,
}: SecurityCardProps) {
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const router = useRouter();
    const [loggingOut, setLoggingOut] = useState(false);

    async function logoutOtherDevices() {
        try {
            setLoggingOut(true);

            const response = await fetch("/api/security/logout-all", {
                method: "POST",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            router.refresh();
        }
        catch (error) {
            console.error(error);
            alert("Unable to logout other devices.");
        }
        finally {
            setLoggingOut(false);
        }
    }

    return (

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-[#162033]">

            <div className="mb-8">

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">

                    Security

                </h2>

                <p className="mt-1 text-sm text-gray-500">

                    Manage your account security and login settings.

                </p>

            </div>

            <div className="grid gap-5">

                <div className="rounded-2xl border border-gray-200 dark:border-slate-700">
                    <SecurityItem icon={<Lock size={22} />} title="Password" description="Change your account password." >
                        <button
                            onClick={() => setShowPasswordForm(!showPasswordForm) }
                            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                            Change Password
                            {
                                showPasswordForm
                                    ? <ChevronUp size={18} />
                                    : <ChevronDown size={18} />
                            }
                        </button>
                    </SecurityItem>
                    {
                        showPasswordForm && (
                            <div className="border-t border-gray-200 p-5 dark:border-slate-700">
                                <ChangePasswordForm />
                            </div>
                        )
                    }
                </div>

                <SecurityItem
                    icon={<Mail size={22} />}
                    title="Email Verification"
                    description={user.emailVerified ? "Verified" : "Not Verified"}
                >

                    <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            user.emailVerified
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                        }`}
                    >

                        {user.emailVerified ? "Verified" : "Verify"}

                    </span>

                </SecurityItem>

                <SecurityItem
                    icon={<ShieldCheck size={22} />}
                    title="Two-Factor Authentication"
                    description="Protect your account with an extra verification step."
                >

                    <button className="rounded-xl border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 dark:border-slate-600 dark:hover:bg-slate-700">

                        Enable

                    </button>

                </SecurityItem>

                <SecurityItem
                    icon={<Smartphone size={22} />}
                    title="Current Session"
                    description="Windows • Chrome • Active Now"
                >

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">

                        Active

                    </span>

                </SecurityItem>
                
                <ActiveSessions />

                <SecurityItem
                    icon={<KeyRound size={22} />}
                    title="Refresh Tokens"
                    description="Manage trusted devices."

                >

                    <button className="rounded-xl border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 dark:border-slate-600 dark:hover:bg-slate-700">

                        View Devices

                    </button>

                </SecurityItem>

                <SecurityItem
                    icon={<LogOut size={22} />}
                    title="Logout Other Devices"
                    description="Sign out from every device except this one."

                >

                    <button
                        onClick={logoutOtherDevices}
                        disabled={loggingOut}
                        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loggingOut ? "Logging Out..." : "Logout All"}
                    </button>

                </SecurityItem>

            </div>

        </section>

    );

}

interface SecurityItemProps {

    icon: React.ReactNode;

    title: string;

    description: string;

    children: React.ReactNode;

}

function SecurityItem({

    icon,

    title,

    description,

    children,

}: SecurityItemProps) {

    return (

        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 p-5 transition hover:border-blue-500 dark:border-slate-700 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-4">

                <div className="rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30">

                    {icon}

                </div>

                <div>

                    <h3 className="font-semibold text-gray-900 dark:text-white">

                        {title}

                    </h3>

                    <p className="text-sm text-gray-500">

                        {description}

                    </p>

                </div>

            </div>

            {children}

        </div>

    );

}