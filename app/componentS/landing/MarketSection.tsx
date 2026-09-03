"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const markets = [
    {
        name: "Bitcoin",
        symbol: "BTC",
        price: "$118,420",
        change: "+2.84%",
        positive: true
    },
    {
        name: "Ethereum",
        symbol: "ETH",
        price: "$3,486",
        change: "+1.72%",
        positive: true
    },
    {
        name: "Solana",
        symbol: "SOL",
        price: "$182.54",
        change: "-0.68%",
        positive: false
    },
    {
        name: "BNB",
        symbol: "BNB",
        price: "$742.18",
        change: "+1.16%",
        positive: true
    },
    {
        name: "XRP",
        symbol: "XRP",
        price: "$0.83",
        change: "-1.12%",
        positive: false
    },
    {
        name: "Cardano",
        symbol: "ADA",
        price: "$0.92",
        change: "+3.52%",
        positive: true
    }
];

export default function MarketSection() {

    return (

        <section id="markets" className="bg-slate-50 py-24 dark:bg-[#0D1728]">

            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">

                        Live Market

                    </span>

                    <h2 className="mt-6 text-4xl font-black sm:text-5xl">

                        Top Market Overview

                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600 dark:text-gray-400">

                        Track the latest prices and market performance of the worlds most popular digital assets.

                    </p>

                </div>

                <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

                    {markets.map((coin) => (

                        <div key={coin.symbol} className="group rounded-3xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl dark:border-slate-700 dark:bg-[#162033]">

                            <div className="flex items-center justify-between">

                                <div>

                                    <h3 className="text-2xl font-bold">

                                        {coin.symbol}

                                    </h3>

                                    <p className="mt-1 text-gray-500">

                                        {coin.name}

                                    </p>

                                </div>

                                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${coin.positive ? "bg-green-100 text-green-600 dark:bg-green-900/30" : "bg-red-100 text-red-600 dark:bg-red-900/30"}`}>

                                    {coin.positive ? <ArrowUpRight /> : <ArrowDownRight />}

                                </div>

                            </div>

                            <div className="mt-8 h-24 rounded-2xl bg-gradient-to-r from-blue-100 via-cyan-100 to-indigo-100 dark:from-slate-800 dark:to-slate-700"></div>

                            <div className="mt-8 flex items-end justify-between">

                                <div>

                                    <p className="text-sm text-gray-500">

                                        Current Price

                                    </p>

                                    <h4 className="mt-2 text-3xl font-bold">

                                        {coin.price}

                                    </h4>

                                </div>

                                <span className={`rounded-full px-4 py-2 text-sm font-semibold ${coin.positive ? "bg-green-100 text-green-600 dark:bg-green-900/30" : "bg-red-100 text-red-600 dark:bg-red-900/30"}`}>

                                    {coin.change}

                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}