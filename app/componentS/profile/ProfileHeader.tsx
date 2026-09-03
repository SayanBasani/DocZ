"use client";

import { SafeUser } from "@/lib/types/user";
import { Mail, ShieldCheck, CalendarDays, Pencil } from "lucide-react";
import ProfileAvatar from "@/componentS/profile/ProfileAvatar";

interface ProfileHeaderProps {
    user: SafeUser;
}

export default function ProfileHeader({
    user,
}: ProfileHeaderProps) {

    return (

        <section className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-slate-700 dark:bg-[#162033]">

            {/* Background */}

            <div className="h-40 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700" />

            <div className="relative px-8 pb-8">

                {/* Avatar */}

                <div className="-mt-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                        <div className="relative">

                            <ProfileAvatar
                                avatar={user.profile?.avatar ?? null}
                            />

                        </div>

                        <div>

                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">

                                {
                                    user.profile?.firstName || user.profile?.lastName
                                        ? `${user.profile?.firstName ?? ""} ${user.profile?.lastName ?? ""}`.trim()
                                        : user.username
                                }

                            </h1>

                            <p className="mt-1 text-gray-500">

                                @{user.username}

                            </p>

                            <div className="mt-4 flex flex-wrap gap-3">

                                <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">

                                    {user.role}

                                </span>

                                <span className={`rounded-full px-4 py-1 text-sm font-medium ${user.emailVerified ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"}`}>

                                    {user.emailVerified ? "Verified" : "Not Verified"}

                                </span>

                            </div>

                        </div>

                    </div>

                    <button
                        type="button"
                        disabled
                        className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white opacity-50 cursor-not-allowed"
                    >
                        <Pencil size={18} />

                        Edit Profile

                    </button>

                </div>

                {/* Information */}

                <div className="mt-10 grid gap-6 md:grid-cols-3">

                    <div className="flex items-center gap-3">

                        <Mail className="text-blue-600" />

                        <div>

                            <p className="text-sm text-gray-500">

                                Email

                            </p>

                            <p className="font-medium text-gray-900 dark:text-white">

                                {user.email}

                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <ShieldCheck className="text-blue-600" />

                        <div>

                            <p className="text-sm text-gray-500">

                                Status

                            </p>

                            <p className="font-medium capitalize text-gray-900 dark:text-white">

                                {user.status}

                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <CalendarDays className="text-blue-600" />

                        <div>

                            <p className="text-sm text-gray-500">

                                Member Since

                            </p>

                            <p className="font-medium text-gray-900 dark:text-white">

                                {
                                new Date(user.createdAt).toLocaleDateString("en-GB",{
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                })}

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}