import {
    Wallet,
    TrendingUp,
    BarChart3,
    DollarSign,
} from "lucide-react";

const stats = [
    {
        title: "Portfolio Value",
        value: "$125,420",
        change: "+5.24%",
        icon: Wallet,
        color: "text-blue-600",
        bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
        title: "Today's Profit",
        value: "$2,340",
        change: "+2.10%",
        icon: TrendingUp,
        color: "text-green-600",
        bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
        title: "Total Trades",
        value: "248",
        change: "+18",
        icon: BarChart3,
        color: "text-purple-600",
        bg: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
        title: "Net Profit",
        value: "$42,850",
        change: "+18.7%",
        icon: DollarSign,
        color: "text-amber-600",
        bg: "bg-amber-100 dark:bg-amber-900/30",
    },
];

export default function TradingStats() {

    return (

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

            {

                stats.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div
                            key={item.title}
                            className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-[#162033]"
                        >

                            <div className="flex items-start justify-between">

                                <div>

                                    <p className="text-sm text-gray-500 dark:text-gray-400">

                                        {item.title}

                                    </p>

                                    <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">

                                        {item.value}

                                    </h2>

                                    <p className="mt-4 font-semibold text-green-500">

                                        {item.change}

                                    </p>

                                </div>

                                <div className={`rounded-2xl p-4 ${item.bg}`}>

                                    <Icon
                                        size={28}
                                        className={item.color}
                                    />

                                </div>

                            </div>

                        </div>

                    );

                })

            }

        </section>

    );

}