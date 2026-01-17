"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, Stethoscope, Sprout, Building2, ArrowUpRight, Signal } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import Link from "next/link";

export default function Dashboard() {
    const [stats, setStats] = useState({
        activeServices: 4,
        totalRequests: 12450,
        avgResponseTime: "45ms",
        usersOnline: 320,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/registry/services');
                setStats(prev => ({
                    ...prev,
                    activeServices: res.data.length,
                    totalRequests: 12450 + Math.floor(Math.random() * 100),
                    usersOnline: 320 + Math.floor(Math.random() * 20),
                }));
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            }
        };
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    // Make chart data look prettier
    const data = [
        { name: '08:00', requests: 400 },
        { name: '10:00', requests: 1200 },
        { name: '12:00', requests: 3000 },
        { name: '14:00', requests: 2780 },
        { name: '16:00', requests: 1890 },
        { name: '18:00', requests: 2390 },
        { name: '20:00', requests: 3490 },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Dashboard</h1>
                    <p className="text-slate-500 font-medium">Real-time overview of national infrastructure.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm text-sm font-medium text-slate-600">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    Live Updates
                </div>
            </div>

            {/* KPI Cards - Compact Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-l-4 border-l-emerald-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardDescription>System Status</CardDescription>
                        <Activity className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{stats.activeServices} <span className="text-sm font-normal text-slate-400">Nodes</span></div>
                        <p className="text-xs text-emerald-600 font-medium mt-1">100% Uptime</p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-indigo-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardDescription>Total Requests</CardDescription>
                        <Signal className="h-4 w-4 text-indigo-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{stats.totalRequests.toLocaleString()}</div>
                        <p className="text-xs text-indigo-600 font-medium mt-1">+12.5% vs last hour</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardDescription>Latency</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{stats.avgResponseTime}</div>
                        <p className="text-xs text-slate-400 mt-1">Global Global Average</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardDescription>Active Citizens</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{stats.usersOnline}</div>
                        <p className="text-xs text-slate-400 mt-1">Currently Online</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 md:grid-cols-7 lg:grid-cols-7">

                {/* Chart Section - Takes up 4/7 cols */}
                <Card className="col-span-4 flex flex-col h-[400px]">
                    <CardHeader>
                        <CardTitle>Network Traffic</CardTitle>
                        <CardDescription>Requests per hour across all gateways</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                                />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Area type="monotone" dataKey="requests" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRequests)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Quick Actions / Services Bento - Takes up 3/7 cols */}
                <div className="col-span-3 grid grid-rows-3 gap-4 h-[400px]">

                    <Link href="/services/healthcare" className="group relative overflow-hidden rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight className="h-5 w-5 text-indigo-400" />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Stethoscope className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Healthcare</h3>
                                <p className="text-xs text-slate-500 font-medium">Appointments & Records</p>
                            </div>
                        </div>
                    </Link>

                    <Link href="/services/agriculture" className="group relative overflow-hidden rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <Sprout className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Agriculture</h3>
                                <p className="text-xs text-slate-500 font-medium">Schemes & Advisory</p>
                            </div>
                        </div>
                    </Link>

                    <Link href="/services/city" className="group relative overflow-hidden rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight className="h-5 w-5 text-orange-400" />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-50 rounded-xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                <Building2 className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Smart City</h3>
                                <p className="text-xs text-slate-500 font-medium">Utilities & Complaints</p>
                            </div>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );
}
