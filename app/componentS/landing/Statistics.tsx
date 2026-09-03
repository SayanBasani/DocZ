"use client";

import { Users, Wallet, TrendingUp, Globe } from "lucide-react";

const stats = [
    {
        icon: Users,
        value: "120K+",
        title: "Active Traders"
    },
    {
        icon: Wallet,
        value: "$2.4B+",
        title: "Trading Volume"
    },
    {
        icon: TrendingUp,
        value: "98.9%",
        title: "Successful Trades"
    },
    {
        icon: Globe,
        value: "180+",
        title: "Countries"
    }
];

export default function Statistics() {

    return (

        <section className="py-24">

            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">

                        Statistics

                    </span>

                    <h2 className="mt-6 text-4xl font-black sm:text-5xl">

                        Trusted By Thousands Of Traders

                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600 dark:text-gray-400">

                        Join one of the fastest growing trading communities around the world.

                    </p>

                </div>

                <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

                    {stats.map((item) => {

                        const Icon = item.icon;

                        return (

                            <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-8 text-center transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl dark:border-slate-700 dark:bg-[#162033]">

                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/30">

                                    <Icon size={32} />

                                </div>

                                <h3 className="mt-6 text-5xl font-black text-blue-600">

                                    {item.value}

                                </h3>

                                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">

                                    {item.title}

                                </p>

                            </div>

                        );

                    })}

                </div>

            </div>

        </section>

    );

}