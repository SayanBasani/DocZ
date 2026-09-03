"use client";

import { useEffect, useState } from "react";

import SessionCard from "./SessionCard";

interface Session {

    id: string;

    browser: string;

    os: string;

    device: string;

    deviceName: string;

    ipAddress: string;

    createdAt: string;

    lastUsedAt: string;

    expiresAt: string;

    isCurrent: boolean;

}

export default function ActiveSessions() {

    const [sessions, setSessions] = useState<Session[]>([]);

    const [loading, setLoading] = useState(true);

    async function loadSessions() {

        try {

            const response = await fetch("/api/security/sessions");

            const data = await response.json();

            if (response.ok) {

                setSessions(data.data);

            }

        }
        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadSessions();

    }, []);

    function removeSession(id: string) {

        setSessions(

            (previous) =>

                previous.filter(

                    (session) => session.id !== id

                )

        );

    }

    if (loading) {

        return (

            <div className="rounded-2xl border border-gray-200 p-5 dark:border-slate-700">

                Loading sessions...

            </div>

        );

    }

    return (

        <div className="space-y-5">

            {

                sessions.map((session) => (

                    <SessionCard

                        key={session.id}

                        session={session}

                        onDeleted={removeSession}

                    />

                ))

            }

        </div>

    );

}