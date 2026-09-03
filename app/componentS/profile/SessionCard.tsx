"use client";

import { useState } from "react";

interface SessionCardProps {

    session: {

        id: string;

        browser: string;

        os: string;

        device: string;

        deviceName: string;

        ipAddress: string;

        createdAt: string | Date;

        lastUsedAt: string | Date;

        expiresAt: string | Date;

        isCurrent: boolean;

    };

    onDeleted: (id: string) => void;

}

export default function SessionCard({

    session,

    onDeleted,

}: SessionCardProps) {

    const [loading, setLoading] = useState(false);

    async function logoutDevice() {

        if (!confirm("Logout this device?")) {

            return;

        }

        try {

            setLoading(true);

            const response = await fetch(

                `/api/security/sessions/${session.id}`,

                {

                    method: "DELETE",

                }

            );

            const data = await response.json();

            if (!response.ok) {

                throw new Error(data.message);

            }

            onDeleted(session.id);

        }
        catch (error) {

            if (error instanceof Error) {

                alert(error.message);

            }

        }
        finally {

            setLoading(false);

        }

    }

    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">

                        {session.deviceName}

                    </h3>

                    <p className="mt-1 text-sm text-gray-500">

                        {session.browser} • {session.os}

                    </p>

                </div>

                {

                    session.isCurrent && (

                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">

                            Current Device

                        </span>

                    )

                }

            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-3">

                <div>

                    <p className="text-sm font-semibold">

                        IP Address

                    </p>

                    <p className="text-sm text-gray-500">

                        {session.ipAddress}

                    </p>

                </div>

                <div>

                    <p className="text-sm font-semibold">

                        Last Active

                    </p>

                    <p className="text-sm text-gray-500">

                        {new Date(session.lastUsedAt).toLocaleString()}

                    </p>

                </div>

                <div>

                    <p className="text-sm font-semibold">

                        Expires

                    </p>

                    <p className="text-sm text-gray-500">

                        {new Date(session.expiresAt).toLocaleString()}

                    </p>

                </div>

            </div>

            {

                !session.isCurrent && (

                    <div className="mt-6 flex justify-end">

                        <button
                            onClick={logoutDevice}
                            disabled={loading}
                            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
                        >

                            {

                                loading

                                    ? "Logging out..."

                                    : "Logout Device"

                            }

                        </button>

                    </div>

                )

            }

        </div>

    );

}