"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type ProfileData = {
    firstName: string;
    lastName: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    timezone: string;
};

interface EditProfileFormProps {
    initialData: ProfileData;
    onCancel: () => void;
}

export default function EditProfileForm({
    initialData,
    onCancel,
}: EditProfileFormProps) {

    const router = useRouter();

    const [form, setForm] = useState(initialData);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {

        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

    }

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        setLoading(true);

        setMessage("");

        try {

            const response = await fetch("/api/profile", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setMessage("Profile updated successfully.");

            router.refresh();

            onCancel();

        }
        catch (error) {

            setMessage(
                error instanceof Error
                    ? error.message
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
            className="grid gap-5 md:grid-cols-2"
        >

            <Input
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
            />

            <Input
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
            />

            <Input
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
            />

            <Input
                label="Country"
                name="country"
                value={form.country}
                onChange={handleChange}
            />

            <Input
                label="State"
                name="state"
                value={form.state}
                onChange={handleChange}
            />

            <Input
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
            />

            <div className="md:col-span-2">

                <Input
                    label="Timezone"
                    name="timezone"
                    value={form.timezone}
                    onChange={handleChange}
                />

            </div>

            <div className="flex gap-3 md:col-span-2">

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Changes"}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="rounded-xl border border-gray-300 px-5 py-2 dark:border-slate-600"
                >
                    Cancel
                </button>

            </div>

            {message && (

                <p className="text-sm text-green-600 md:col-span-2">

                    {message}

                </p>

            )}

        </form>

    );

}

interface InputProps {
    label: string;
    name: keyof ProfileData;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
    label,
    name,
    value,
    onChange,
}: InputProps) {

    return (

        <div>

            <label className="mb-2 block text-sm font-medium">

                {label}

            </label>

            <input
                name={name}
                value={value}
                onChange={onChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-[#111827]"
            />

        </div>

    );

}