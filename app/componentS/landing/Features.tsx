"use client";

import { ShieldCheck, BrainCircuit, CandlestickChart, BellRing, Wallet, Smartphone } from "lucide-react";

const features = [
    {
        icon: BrainCircuit,
        title: "AI Trading Signals",
        description: "Receive AI-generated buy and sell signals based on real-time market analysis."
    },
    {
        icon: CandlestickChart,
        title: "Advanced Charts",
        description: "Analyze the market with interactive charts and professional indicators."
    },
    {
        icon: Wallet,
        title: "Portfolio Manager",
        description: "Track your assets, profit, loss and investment growth in one dashboard."
    },
    {
        icon: BellRing,
        title: "Price Alerts",
        description: "Get instant notifications whenever the market reaches your target price."
    },
    {
        icon: ShieldCheck,
        title: "Secure Platform",
        description: "Protected with industry-standard encryption and multi-layer authentication."
    },
    {
        icon: Smartphone,
        title: "Any Device",
        description: "Access Trader Pro from desktop, tablet or mobile with a seamless experience."
    }
];

export default function Features() {

    return (

        <section id="features" className="py-24">

            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">

                        Features

                    </span>

                    <h2 className="mt-6 text-4xl font-black sm:text-5xl">

                        Everything You Need To Trade Better

                    </h2>

                    <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600 dark:text-gray-400">

                        Powerful tools designed to help beginners and professional traders make smarter investment decisions.

                    </p>

                </div>

                <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

                    {features.map((feature) => {

                        const Icon = feature.icon;

                        return (

                            <div key={feature.title} className="group rounded-3xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl dark:border-slate-700 dark:bg-[#162033]">

                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-900/30">

                                    <Icon size={32} />

                                </div>

                                <h3 className="mt-8 text-2xl font-bold">

                                    {feature.title}

                                </h3>

                                <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">

                                    {feature.description}

                                </p>

                            </div>

                        );

                    })}

                </div>

            </div>

        </section>

    );

}