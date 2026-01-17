"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, AreaChart, Area, CartesianGrid } from 'recharts';
import { ShieldCheck, AlertTriangle, Cpu, Server, CheckCircle2, XCircle } from "lucide-react";

export default function AdminDashboard() {
    const [data] = useState([
        { name: 'Registry', load: 12, errors: 0 },
        { name: 'Health', load: 45, errors: 2 },
        { name: 'Agri', load: 30, errors: 0 },
        { name: 'City', load: 55, errors: 5 },
    ]);

    const [traffic] = useState([
        { name: '00:00', uv: 400 },
        { name: '04:00', uv: 300 },
        { name: '08:00', uv: 2000 },
        { name: '12:00', uv: 2780 },
        { name: '16:00', uv: 1890 },
        { name: '20:00', uv: 2390 },
    ]);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">System Admin Console</h1>
                    <p className="text-slate-500 mt-1">Infrastructure monitoring and health checks.</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-sm font-bold px-4 py-2 rounded-full flex items-center shadow-sm">
                    <ShieldCheck className="w-4 h-4 mr-2" /> System Healthy
                </span>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
                <Card className="bg-slate-900 text-white border-slate-800 shadow-xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <span className="text-sm font-medium text-slate-300">Total Nodes</span>
                        <Server className="h-4 w-4 text-emerald-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">4</div>
                        <p className="text-xs text-slate-400 mt-1">Microservices Active</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardDescription>CPU Usage</CardDescription>
                        <Cpu className="h-4 w-4 text-indigo-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">42%</div>
                        <p className="text-xs text-slate-500 mt-1">Cluster average</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardDescription>Error Rate</CardDescription>
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-slate-900">0.05%</div>
                        <p className="text-xs text-slate-500 mt-1">Within SLA</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardDescription>Gateway Status</CardDescription>
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-emerald-600">Secure</div>
                        <p className="text-xs text-slate-500 mt-1">WAF Active</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="flex flex-col h-[400px]">
                    <CardHeader>
                        <CardTitle>Service Load</CardTitle>
                        <CardDescription>Distribution of traffic relative to capacity.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="load" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="flex flex-col h-[400px]">
                    <CardHeader>
                        <CardTitle>Gateway Throughput</CardTitle>
                        <CardDescription>Incoming request volume over time.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={traffic}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Area type="monotone" dataKey="uv" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
