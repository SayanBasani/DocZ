"use client";

import { Moon, Bell, Globe, Monitor, ChevronRight } from "lucide-react";

export default function PreferencesCard() {

    return (

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-[#162033]">

            <div className="mb-8">

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">

                    Preferences

                </h2>

                <p className="mt-1 text-sm text-gray-500">

                    Manage your appearance and application preferences.

                </p>

            </div>

            <div className="space-y-4">

                <PreferenceItem
                    icon={<Moon size={22} />}
                    title="Theme"
                    description="Light / Dark Mode"
                />

                <PreferenceItem
                    icon={<Bell size={22} />}
                    title="Notifications"
                    description="Email & Push Notifications"
                />

                <PreferenceItem
                    icon={<Globe size={22} />}
                    title="Language"
                    description="English"
                />

                <PreferenceItem
                    icon={<Monitor size={22} />}
                    title="Display"
                    description="Dashboard appearance"
                />

            </div>

        </section>

    );

}

interface PreferenceItemProps {

    icon: React.ReactNode;

    title: string;

    description: string;

}

function PreferenceItem({

    icon,

    title,

    description,

}: PreferenceItemProps) {

    return (

        <button
            className="flex w-full items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:border-blue-500 hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800"
        >

            <div className="flex items-center gap-4">

                <div className="rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30">

                    {icon}

                </div>

                <div className="text-left">

                    <h3 className="font-semibold text-gray-900 dark:text-white">

                        {title}

                    </h3>

                    <p className="text-sm text-gray-500">

                        {description}

                    </p>

                </div>

            </div>

            <ChevronRight
                size={20}
                className="text-gray-400"
            />

        </button>

    );

}