"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, Activity, Users, Globe, Lock, AlertTriangle, Terminal, Server, Map } from "lucide-react";
import { motion } from "framer-motion";

// --- Cyber Components ---

const NetworkMap = () => (
    <div className="relative w-full h-[300px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 group">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-center"></div>
        {/* Animated Radar Sweep */}
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(16,185,129,0)_0deg,rgba(16,185,129,0.1)_360deg)] animate-[spin_4s_linear_infinite] rounded-full w-[600px] h-[600px] -left-[150px] -top-[150px] opacity-20"></div>

        {/* Nodes */}
        {[{ x: 20, y: 30 }, { x: 50, y: 50 }, { x: 80, y: 20 }, { x: 30, y: 70 }, { x: 70, y: 80 }].map((pos, i) => (
            <div key={i} className="absolute w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_2px_rgba(6,182,212,0.6)]" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
                <div className="absolute inset-0 animate-ping bg-cyan-400 rounded-full opacity-75"></div>
            </div>
        ))}

        <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur px-3 py-1 rounded text-xs text-cyan-400 border border-cyan-900 font-mono">
            LIVE NETWORK STATUS: ACTIVE
        </div>
    </div>
);

const TerminalLog = ({ logs }: { logs: any[] }) => (
    <div className="bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs p-4 h-[300px] overflow-y-auto custom-scrollbar">
        <div className="flex gap-2 mb-4 border-b border-slate-800 pb-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-slate-500">security_audit.log</span>
        </div>
        <div className="space-y-2">
            {logs.map((log, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex gap-3 ${log.type === 'Critical' ? 'text-red-400' : 'text-emerald-400'}`}
                >
                    <span className="text-slate-600">[{log.time}]</span>
                    <span className="font-bold uppercase w-16">{log.type}</span>
                    <span className="text-slate-300">{log.message}</span>
                </motion.div>
            ))}
            <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="text-cyan-500 font-bold"
            >
                _
            </motion.div>
        </div>
    </div>
);

export default function AdminPage() {
    const [serviceCount, setServiceCount] = useState<number>(0);
    const [securityLogs, setSecurityLogs] = useState([]);

    useEffect(() => {
        // 1. Fetch Service Count
        fetch("/api/registry/services")
            .then((res) => res.json())
            .then((data) => setServiceCount(data.length))
            .catch((err) => console.error(err));

        // 2. Mock Security Logs
        setSecurityLogs([
            { time: "10:42:01", type: "Success", message: "Key Rotation for Medical API" },
            { time: "10:41:55", type: "Info", message: "Node 842 (Agri-Mandi) heartbeat sync" },
            { time: "10:40:12", type: "Critical", message: "Unauthorized access attempt blocked (IP: 192.168.x.x)" },
            { time: "10:38:45", type: "Success", message: "Jan Parichay SSO Token Validated" },
            { time: "10:35:20", type: "Info", message: "Automated Backup to Cloud Storage completed" },
        ] as any);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex justify-between items-end border-b border-slate-800 pb-6">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter text-white flex items-center gap-3">
                            <ShieldCheck className="h-10 w-10 text-emerald-500" />
                            SUDO CONTROL
                        </h1>
                        <p className="text-slate-400 mt-2 font-mono text-sm tracking-widest text-emerald-500/80">SYSTEM INTEGRITY: 100% // ENCRYPTION: AES-256</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg text-right">
                            <p className="text-[10px] text-slate-500 uppercase font-bold">Latency</p>
                            <p className="text-xl font-mono text-emerald-400">14ms</p>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg text-right">
                            <p className="text-[10px] text-slate-500 uppercase font-bold">Active Nodes</p>
                            <p className="text-xl font-mono text-cyan-400">1,284</p>
                        </div>
                    </div>
                </div>

                {/* Top Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="bg-slate-900 border border-slate-800 text-slate-200 hover:border-cyan-500/50 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Services Active</CardTitle>
                            <Server className="h-4 w-4 text-cyan-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-white">{serviceCount}</div>
                            <p className="text-xs text-slate-500 mt-1">+2 deployed in last hour</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900 border border-slate-800 text-slate-200 hover:border-emerald-500/50 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Citizen Traffic</CardTitle>
                            <Users className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-white">45.2k</div>
                            <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
                                <Activity className="h-3 w-3" /> Live
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900 border border-slate-800 text-slate-200 hover:border-purple-500/50 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Global Uptime</CardTitle>
                            <Globe className="h-4 w-4 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-white">99.99%</div>
                            <p className="text-xs text-slate-500 mt-1">Last downtime: 42 days ago</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900 border border-slate-800 text-slate-200 hover:border-red-500/50 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Threats Blocked</CardTitle>
                            <Lock className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-white">128</div>
                            <p className="text-xs text-slate-500 mt-1">24h Window</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left: Geo Map */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Map className="h-5 w-5 text-cyan-500" /> Network Topology
                            </h3>
                            <span className="text-xs font-mono text-cyan-500 animate-pulse">● LIVE FEED</span>
                        </div>
                        <NetworkMap />

                        <Card className="bg-slate-900 border border-slate-800">
                            <CardHeader>
                                <CardTitle className="text-white text-sm">Resource Usage</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs mb-1 text-slate-400"><span>CPU Load</span><span>42%</span></div>
                                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-cyan-500 w-[42%]"></div></div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1 text-slate-400"><span>Memory</span><span>68%</span></div>
                                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-purple-500 w-[68%]"></div></div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-xs mb-1 text-slate-400"><span>Bandwidth</span><span>2.4 GB/s</span></div>
                                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[35%]"></div></div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right: Security Console */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Terminal className="h-5 w-5 text-emerald-500" /> Security Audit Stream
                            </h3>
                            <button className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded text-white transition-colors">Export Logs</button>
                        </div>
                        <TerminalLog logs={securityLogs} />

                        <div className="grid grid-cols-2 gap-4">
                            <button className="p-4 bg-red-900/20 border border-red-900/50 rounded-xl hover:bg-red-900/40 transition-all flex flex-col items-center gap-2 group">
                                <AlertTriangle className="h-8 w-8 text-red-500 group-hover:scale-110 transition-transform" />
                                <span className="text-red-400 font-bold text-sm">Emergency Lockdown</span>
                            </button>
                            <button className="p-4 bg-cyan-900/20 border border-cyan-900/50 rounded-xl hover:bg-cyan-900/40 transition-all flex flex-col items-center gap-2 group">
                                <Activity className="h-8 w-8 text-cyan-500 group-hover:scale-110 transition-transform" />
                                <span className="text-cyan-400 font-bold text-sm">Run Diagnostics</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
