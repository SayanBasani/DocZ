"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";

export default function ChangePasswordForm() {

    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);

    const [showNew, setShowNew] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false);

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        setLoading(true);

        setMessage("");

        setError("");

        try {

            const response = await fetch(
                "/api/security/password",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({

                        currentPassword,

                        newPassword,

                        confirmPassword,

                    }),
                }
            );

            const result = await response.json();

            if (!response.ok) {

                throw new Error(
                    result.message
                );

            }

            setMessage(result.message);

            setCurrentPassword("");

            setNewPassword("");

            setConfirmPassword("");

        }
        catch (err) {

            setError(

                err instanceof Error

                    ? err.message

                    : "Something went wrong."

            );

        }
        finally {

            setLoading(false);

        }

    }

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >

            <PasswordField
                label="Current Password"
                value={currentPassword}
                onChange={setCurrentPassword}
                show={showCurrent}
                setShow={setShowCurrent}
            />

            <PasswordField
                label="New Password"
                value={newPassword}
                onChange={setNewPassword}
                show={showNew}
                setShow={setShowNew}
            />

            <PasswordField
                label="Confirm Password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                show={showConfirm}
                setShow={setShowConfirm}
            />

            {error && (

                <div className="rounded-xl bg-red-100 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">

                    {error}

                </div>

            )}

            {message && (

                <div className="rounded-xl bg-green-100 p-3 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300">

                    {message}

                </div>

            )}

            <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >

                {

                    loading ?

                        <>

                            <Loader2
                                size={18}
                                className="animate-spin"
                            />

                            Updating...

                        </>

                        :

                        <>

                            <Lock size={18} />

                            Change Password

                        </>

                }

            </button>

        </form>

    );

}

interface PasswordFieldProps {

    label: string;

    value: string;

    onChange: (value: string) => void;

    show: boolean;

    setShow: React.Dispatch<React.SetStateAction<boolean>>;

}

function PasswordField({

    label,

    value,

    onChange,

    show,

    setShow,

}: PasswordFieldProps) {

    return (

        <div className="">

            <label className="mb-2 block text-sm font-medium">

                {label}

            </label>

            <div className="relative">

                <input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-[#111827]"
                />

                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                >

                    {

                        show ?

                            <EyeOff size={20} />

                            :

                            <Eye size={20} />

                    }

                </button>

            </div>

        </div>

    );

}