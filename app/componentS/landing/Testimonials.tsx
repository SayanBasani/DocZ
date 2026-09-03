"use client";

import { Star } from "lucide-react";

const testimonials = [
    {
        name: "James Anderson",
        role: "Crypto Trader",
        review: "Trader Pro completely changed how I trade. The dashboard is fast, clean and incredibly easy to use."
    },
    {
        name: "Sophia Wilson",
        role: "Stock Investor",
        review: "The AI insights helped me make better investment decisions. Highly recommended for beginners."
    },
    {
        name: "Michael Brown",
        role: "Day Trader",
        review: "Everything I need is in one place. Portfolio tracking, analytics and alerts work perfectly."
    }
];

export default function Testimonials() {

    return (

        <section className="bg-slate-50 py-24 dark:bg-[#0D1728]">

            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">

                        Testimonials

                    </span>

                    <h2 className="mt-6 text-4xl font-black sm:text-5xl">

                        Loved By Traders Worldwide

                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600 dark:text-gray-400">

                        Thousands of investors trust Trader Pro to manage and grow their portfolios.

                    </p>

                </div>

                <div className="mt-16 grid gap-8 lg:grid-cols-3">

                    {testimonials.map((item) => (

                        <div key={item.name} className="rounded-3xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl dark:border-slate-700 dark:bg-[#162033]">

                            <div className="mb-6 flex gap-1">

                                <Star className="fill-yellow-400 text-yellow-400" />

                                <Star className="fill-yellow-400 text-yellow-400" />

                                <Star className="fill-yellow-400 text-yellow-400" />

                                <Star className="fill-yellow-400 text-yellow-400" />

                                <Star className="fill-yellow-400 text-yellow-400" />

                            </div>

                            <p className="leading-8 text-gray-600 dark:text-gray-400">

                                "{item.review}"

                            </p>

                            <div className="mt-8 flex items-center gap-4">

                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">

                                    {item.name.charAt(0)}

                                </div>

                                <div>

                                    <h3 className="font-bold">

                                        {item.name}

                                    </h3>

                                    <p className="text-sm text-gray-500">

                                        {item.role}

                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}