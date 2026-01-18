"use client";

import { CloudRain, Sprout, TrendingUp, Scan, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AgricultureOverview() {
    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-end border-b border-green-100 pb-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Krishi Command Center</h1>
                    <p className="text-slate-500 mt-1 font-medium text-lg">Real-time insights for Dholera Region</p>
                </div>
                <div className="hidden md:block text-right">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Weather (Ahmedabad)</p>
                    <div className="flex items-center gap-2 justify-end text-slate-700">
                        <CloudRain className="h-6 w-6 text-sky-500" />
                        <span className="text-2xl font-bold">28°C</span>
                    </div>
                </div>
            </div>

            {/* Advisory Card */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6 flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                    <CloudRain className="h-6 w-6 text-sky-500" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-green-900">Today's Advisory</h3>
                    <p className="text-green-800 font-medium mt-1">Light rainfall expected. Delay harvesting of Groundnut by 2 days.</p>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/services/agriculture/mandi-rates" className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                    <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform">
                        <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Mandi Rates</h3>
                    <p className="text-slate-500 text-sm mb-4">Live prices for Wheat, Cotton, and Rice.</p>
                </Link>

                <Link href="/services/agriculture/crop-doctor" className="group bg-green-600 p-6 rounded-2xl border border-green-500 shadow-xl shadow-green-100 hover:-translate-y-1 transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-8 -mt-8"></div>
                    <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm group-hover:scale-110 transition-transform">
                        <Scan className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Dr. Krishi AI</h3>
                    <p className="text-green-100 text-sm mb-4">Scan crops for disease diagnosis.</p>
                    <span className="text-white text-xs font-bold inline-flex items-center gap-1 bg-white/10 px-2 py-1 rounded">
                        Try Now <ArrowRight className="h-3 w-3" />
                    </span>
                </Link>

                <Link href="/services/agriculture/schemes" className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                    <div className="h-10 w-10 bg-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-orange-100 group-hover:scale-110 transition-transform">
                        <Sprout className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">My Schemes</h3>
                    <p className="text-slate-500 text-sm mb-4">Check subsudy status (PM-KISAN).</p>
                </Link>
            </div>
        </div>
    );
}
