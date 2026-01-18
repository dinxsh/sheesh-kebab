"use client";

import { motion } from "framer-motion";

const MandiTicker = ({ items }: { items: any[] }) => (
    <div className="overflow-hidden bg-slate-900 py-3 mb-8 rounded-xl shadow-lg border border-slate-800 relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10"></div>
        <motion.div
            className="flex gap-16 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
            {[...items, ...items, ...items].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-slate-400 uppercase tracking-wider">{item.commodity}</span>
                    <span className="text-white font-bold">₹{item.price}</span>
                    <span className={item.change > 0 ? "text-green-400" : "text-red-400"}>
                        {item.change > 0 ? "▲" : "▼"} {Math.abs(item.change)}%
                    </span>
                </div>
            ))}
        </motion.div>
    </div>
);

export default function MandiRatesPage() {
    const mandiRates = [
        { commodity: "Wheat (Lokwan)", price: 2350, change: 1.2 },
        { commodity: "Cotton (Shankar-6)", price: 6100, change: -0.5 },
        { commodity: "Rice (Basmati)", price: 4200, change: 2.1 },
        { commodity: "Groundnut", price: 5800, change: 0.8 },
        { commodity: "Jeera", price: 12500, change: -1.5 },
    ];

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Mandi Rates (Live)</h1>

            <MandiTicker items={mandiRates} />

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 font-bold text-slate-700">Commodity</th>
                            <th className="p-4 font-bold text-slate-700">Price (₹/Quintal)</th>
                            <th className="p-4 font-bold text-slate-700">Change (24h)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {mandiRates.map((item, index) => (
                            <tr key={index} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 font-medium text-slate-900">{item.commodity}</td>
                                <td className="p-4 font-bold text-slate-700">₹{item.price}</td>
                                <td className={`p-4 font-bold ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {item.change > 0 ? "+" : ""}{item.change}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
