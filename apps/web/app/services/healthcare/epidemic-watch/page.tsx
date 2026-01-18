"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, Siren } from "lucide-react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Data for Epidemic Graph
const epidemicData = [
    { day: 'Mon', cases: 12 },
    { day: 'Tue', cases: 18 },
    { day: 'Wed', cases: 14 },
    { day: 'Thu', cases: 28 },
    { day: 'Fri', cases: 42 },
    { day: 'Sat', cases: 65 }, // Spike
    { day: 'Sun', cases: 88 },
];

export default function EpidemicWatchPage() {
    return (
        <div className="p-8 max-w-5xl mx-auto h-full">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900">HealthGuard AI</h1>
                <p className="text-slate-500 mt-1">Real-time Epidemic Monitoring & Prediction</p>
            </div>

            <Card className="bg-white border-0 shadow-xl shadow-rose-100 overflow-hidden relative max-w-2xl">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Siren className="h-64 w-64" />
                </div>
                <CardHeader className="pb-2 relative z-10">
                    <div className="flex items-center gap-2">
                        <Activity className="h-6 w-6 text-rose-600 animate-pulse" />
                        <CardTitle className="text-rose-900 text-2xl">Outbreak Analysis</CardTitle>
                    </div>
                    <CardDescription className="text-rose-700 font-medium text-lg">Predictive Vector Borne Disease Model</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                    <div className="p-6 bg-rose-50/50 rounded-2xl border border-rose-100 backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-bold text-rose-500 uppercase tracking-wider">Dengue Risk Trend</span>
                            <span className="text-xs font-bold bg-rose-100 text-rose-600 px-3 py-1 rounded-full animate-pulse border border-rose-200">LIVE</span>
                        </div>

                        {/* Recharts Area Chart */}
                        <div className="h-64 w-full mb-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={epidemicData}>
                                    <defs>
                                        <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#e11d48" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#e11d48" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                                        itemStyle={{ color: '#e11d48', fontWeight: 'bold' }}
                                    />
                                    <Area type="monotone" dataKey="cases" stroke="#e11d48" strokeWidth={3} fillOpacity={1} fill="url(#colorCases)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="flex items-center justify-between text-sm font-medium text-rose-800 mb-6">
                            <span>High Risk Zone: <span className="font-bold text-lg">East Ahmedabad</span></span>
                            <span className="text-4xl font-black">82%</span>
                        </div>

                        <button
                            onClick={async () => {
                                // Alert Logic
                                try {
                                    await fetch('/api/interop/alerts', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ type: 'Epidemic Risk: Dengue', zone: 'East Zone' })
                                    });
                                    alert("Cross-Ministry Alert Broadcasted via Secure API.");
                                } catch (e) {
                                    alert("Failed to send alert.");
                                }
                            }}
                            className="w-full py-4 bg-rose-600 text-white text-sm font-bold rounded-xl hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200"
                        >
                            Broadcast Alert to AMC (Municipal Corp)
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
