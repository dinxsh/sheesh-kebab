"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sprout, CloudRain, IndianRupee, Wheat, ArrowUpRight } from "lucide-react";
import axios from 'axios';

export default function AgriculturePage() {
    const [schemes, setSchemes] = useState<any[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/agriculture/schemes')
            .then(res => setSchemes(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="max-w-6xl mx-auto space-y-8 py-8">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-emerald-950">Agriculture Hub</h1>
                    <p className="text-emerald-700 mt-1">Smart farming insights and government schemes.</p>
                </div>
            </div>

            {/* Insight Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="border-t-4 border-t-emerald-500 bg-gradient-to-br from-white to-emerald-50/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md">Market Price</span>
                            <IndianRupee className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-3xl font-bold text-slate-900">₹2,125</span>
                            <span className="text-sm text-slate-500 mb-1">/ Quintal</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">Wheat (Common)</p>
                    </CardContent>
                </Card>

                <Card className="border-t-4 border-t-blue-500 bg-gradient-to-br from-white to-blue-50/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-md">Weather</span>
                            <CloudRain className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="flex items-end gap-2">
                            <span className="text-3xl font-bold text-slate-900">24°C</span>
                            <span className="text-sm text-blue-600 mb-1 font-semibold">Rainy</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">Humidity: 82% • Wind: 12 km/h</p>
                    </CardContent>
                </Card>

                <Card className="border-t-4 border-t-amber-500 bg-gradient-to-br from-white to-amber-50/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded-md">Advisory</span>
                            <Sprout className="h-5 w-5 text-amber-600" />
                        </div>
                        <p className="text-sm font-medium text-slate-800 leading-relaxed">
                            "Apply Nitrogen fertilizer now for optimal growth phase in Wheat crop."
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Schemes Section */}
            <h2 className="text-2xl font-bold text-slate-900 pt-8">Active Schemes</h2>
            <div className="grid gap-6 md:grid-cols-2">
                {schemes.map((s) => (
                    <div key={s.id} className="group flex flex-col justify-between p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300">
                        <div className="space-y-4">
                            <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <Wheat className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{s.name}</h3>
                                <p className="text-slate-500 text-sm mt-2 leading-relaxed">{s.desc}</p>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Government of India</span>
                            <button className="text-sm font-semibold text-emerald-600 flex items-center gap-1 group-hover:underline">View Details <ArrowUpRight className="h-4 w-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
