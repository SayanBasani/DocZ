"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Loader2, Trash2, User } from "lucide-react";

interface ProfileAvatarProps {
    avatar: string | null;
}

export default function ProfileAvatar({
    avatar,
}: ProfileAvatarProps) {

    const router = useRouter();

    const inputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);

    async function uploadAvatar(
        file: File
    ) {

        setLoading(true);

        try {

            const formData = new FormData();

            formData.append(
                "avatar",
                file
            );

            const response = await fetch(
                "/api/profile/avatar",
                {
                    method: "PATCH",
                    body: formData,
                }
            );

            const data = await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message
                );

            }

            router.refresh();

        }
        catch (error) {

            alert(
                error instanceof Error
                    ? error.message
                    : "Upload failed."
            );

        }
        finally {

            setLoading(false);

        }

    }

    async function removeAvatar() {

        if (!confirm("Delete your avatar?")) {

            return;

        }

        setLoading(true);

        try {

            const response = await fetch(
                "/api/profile/avatar",
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message
                );

            }

            router.refresh();

        }
        catch (error) {

            alert(
                error instanceof Error
                    ? error.message
                    : "Delete failed."
            );

        }
        finally {

            setLoading(false);

        }

    }

    return (

        <div className="relative h-32 w-32">

            <div className="group relative h-32 w-32 overflow-hidden rounded-full border-4 border-blue-600 bg-gray-100 shadow-lg dark:bg-slate-800">

                {
                    avatar ?

                        <img
                            src={avatar}
                            alt="Avatar"
                            className="h-full w-full object-cover"
                        />

                        :

                        <div className="flex h-full w-full items-center justify-center">

                            <User
                                size={54}
                                className="text-gray-400"
                            />

                        </div>

                }

                <button
                    type="button"
                    disabled={loading}
                    onClick={() => inputRef.current?.click()}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100"
                >

                    {

                        loading ?

                            <Loader2
                                size={34}
                                className="animate-spin text-white"
                            />

                            :

                            <Camera
                                size={34}
                                className="text-white"
                            />

                    }

                </button>

            </div>

            {

                avatar && (

                    <button
                        type="button"
                        disabled={loading}
                        onClick={removeAvatar}
                        className="absolute -right-1 -top-1 rounded-full bg-red-600 p-2 text-white shadow-lg transition hover:bg-red-700"
                    >

                        <Trash2 size={16} />

                    </button>

                )

            }

            <input
                ref={inputRef}
                hidden
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={(e) => {

                    const file = e.target.files?.[0];

                    if (!file) {

                        return;

                    }

                    uploadAvatar(file);

                }}
            />

        </div>

    );

}