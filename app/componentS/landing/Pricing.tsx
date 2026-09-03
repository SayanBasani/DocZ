"use client";

import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
    {
        name: "Starter",
        price: "Free",
        description: "Perfect for beginners starting their trading journey.",
        button: "Get Started",
        popular: false,
        features: [
            "Basic Dashboard",
            "Portfolio Tracking",
            "Market Overview",
            "Email Support"
        ]
    },
    {
        name: "Pro",
        price: "$19",
        description: "For active traders who need advanced features.",
        button: "Start Pro",
        popular: true,
        features: [
            "Everything in Starter",
            "AI Trading Signals",
            "Advanced Charts",
            "Unlimited Watchlist",
            "Priority Support",
            "Price Alerts"
        ]
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "Best solution for professional teams and businesses.",
        button: "Contact Sales",
        popular: false,
        features: [
            "Everything in Pro",
            "Team Management",
            "API Access",
            "Custom Reports",
            "Dedicated Manager",
            "24/7 Support"
        ]
    }
];

export default function Pricing() {

    return (

        <section id="pricing" className="py-24">

            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">

                        Pricing

                    </span>

                    <h2 className="mt-6 text-4xl font-black sm:text-5xl">

                        Choose Your Plan

                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600 dark:text-gray-400">

                        Flexible pricing for every trader.

                    </p>

                </div>

                <div className="mt-16 grid gap-8 lg:grid-cols-3">

                    {plans.map((plan) => (

                        <div key={plan.name} className={`relative rounded-3xl border p-8 transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${plan.popular ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white dark:border-slate-700 dark:bg-[#162033]"}`}>

                            {plan.popular && (

                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-sm font-bold text-blue-600">

                                    Most Popular

                                </span>

                            )}

                            <h3 className="text-3xl font-bold">

                                {plan.name}

                            </h3>

                            <h4 className="mt-6 text-5xl font-black">

                                {plan.price}

                            </h4>

                            <p className={`mt-4 ${plan.popular ? "text-blue-100" : "text-gray-600 dark:text-gray-400"}`}>

                                {plan.description}

                            </p>

                            <div className="mt-10 space-y-4">

                                {plan.features.map((feature) => (

                                    <div key={feature} className="flex items-center gap-3">

                                        <Check size={20} />

                                        <span>

                                            {feature}

                                        </span>

                                    </div>

                                ))}

                            </div>

                            <Link href="/signup" className={`mt-10 flex justify-center rounded-2xl py-4 font-semibold transition ${plan.popular ? "bg-white text-blue-600 hover:bg-slate-100" : "bg-blue-600 text-white hover:bg-blue-700"}`}>

                                {plan.button}

                            </Link>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}