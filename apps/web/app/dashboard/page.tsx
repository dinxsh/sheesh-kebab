"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, Server, ShieldCheck, Database, Zap, Cpu, Network, Lock, Globe, Mic, Bell, AlertTriangle } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Line, LineChart, CartesianGrid } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const NewsTicker = () => (
    <div className="bg-slate-900 text-white py-2 px-4 overflow-hidden flex items-center gap-4 text-xs font-mono border-b border-indigo-500/30">
        <span className="text-red-400 font-bold flex items-center gap-1 shrink-0"><Bell className="h-3 w-3 animate-pulse" /> LIVE ALERTS:</span>
        <div className="animate-marquee whitespace-nowrap flex gap-12 text-slate-300">
            <span>🔴 Heavy Rainfall Alert: West Zone (Satellite, Bopal) - Avoid underpasses.</span>
            <span>🟡 Heatwave Warning: Temperature &gt; 42°C in North Zone. Stay hydrated.</span>
            <span>🟢 Metric: Ahmedabad Digital Payments hit ₹450Cr volume today.</span>
            <span>🔵 Infra: Metro Phase 2 testing successful at Gandhinagar.</span>
        </div>
    </div>
);

export default function DashboardPage() {
    // Simulator State
    const [systemHealth, setSystemHealth] = useState({
        apiLatency: 45,
        requestsPerSec: 1240,
        errorRate: 0.02,
        activeNodes: 142
    });

    const [logs, setLogs] = useState<string[]>([
        "10:42:05 | [AUTH] User verified via Jan Parichay (UID-8821)",
        "10:42:03 | [AGRI-NODE] Syncing Mandi Rates with Central Server...",
        "10:42:01 | [HEALTH-NODE] Updated bed availability in Region-West",
    ]);

    const [simulatorMode, setSimulatorMode] = useState<'Standard' | 'HighLoad' | 'AutoBalanced' | 'EdgeCached'>('Standard');

    // Voice Search State
    const [isListening, setIsListening] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleVoiceSearch = () => {
        setIsListening(true);
        // Simulate Voice Recognition
        setTimeout(() => {
            setIsListening(false);
            setSearchQuery("Health");
        }, 2000);
    };

    // Service Registry State (Connected to API)
    const [services, setServices] = useState<any[]>([]);
    const [isRegModalOpen, setIsRegModalOpen] = useState(false);

    // Fetch Services on Mount
    useEffect(() => {
        fetch('/api/registry/services')
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.error("Registry connection failed", err));
    }, []);

    // Filtered Services Logic
    const filteredServices = services.filter(s =>
        (s.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.region || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Mock Real-time Updates with Simulator Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setSystemHealth(prev => {
                // Logic based on Simulator Mode
                let latencyVariance = 10;
                let requestVariance = 50;
                let baseReq = 1240;

                if (simulatorMode === 'HighLoad') {
                    baseReq = 3500;
                    latencyVariance = 150; // High latency spikes
                } else if (simulatorMode === 'AutoBalanced') {
                    baseReq = 1240;
                    latencyVariance = 2; // Very stable
                    requestVariance = 5; // Load balancer smoothing
                } else if (simulatorMode === 'EdgeCached') {
                    // Edge Caching Mode (Ultra Low Latency)
                    return {
                        apiLatency: Math.max(5, Math.min(25, 14 + (Math.random() * 5))), // Super fast: ~15ms
                        requestsPerSec: Math.floor(4500 + (Math.random() * 100)), // Handling massive load
                        errorRate: 0,
                        activeNodes: 142
                    };
                }

                return {
                    apiLatency: Math.max(20, Math.min(500, prev.apiLatency + (Math.random() * latencyVariance - (latencyVariance / 2)))),
                    requestsPerSec: Math.floor(baseReq + (Math.random() * requestVariance - (requestVariance / 2))),
                    errorRate: simulatorMode === 'AutoBalanced' ? 0.001 : Math.max(0, Math.min(0.05, prev.errorRate + (Math.random() * 0.01 - 0.005))),
                    activeNodes: simulatorMode === 'AutoBalanced' ? 156 : 142
                };
            });

            // Add Random Log based on Mode
            let newAction = "[SYSTEM] Routine Check";
            if (simulatorMode === 'HighLoad') newAction = "[WARN] High Latency detected on Gateway-2";
            if (simulatorMode === 'AutoBalanced') newAction = "[SCALE] Auto-Scaler spun up +2 nodes";
            if (simulatorMode === 'EdgeCached') newAction = `[CACHE] Serving content from Edge Node-A${Math.floor(Math.random() * 10)}`;

            const commonActions = [
                "[PAYMENT] UPI Transaction success (Tx-9932)",
                "[CITY-NODE] Grievance #442 routed to Zone-East",
                "[SYNC] Data Exchange Bus: Packet verified",
                "[HEALTH] SVP Hospital Bed Status: Updated",
                "[AUTH] Jan Parichay Token Refreshed",
            ];

            if (Math.random() > 0.7) newAction = commonActions[Math.floor(Math.random() * commonActions.length)];

            setLogs(prev => [`${new Date().toLocaleTimeString()} | ${newAction}`, ...prev.slice(0, 12)]);
        }, 1500);
        return () => clearInterval(interval);
    }, [simulatorMode]);

    const trafficData = [
        { time: "10:00", req: 1200 }, { time: "10:05", req: 1350 },
        { time: "10:10", req: 1100 }, { time: "10:15", req: 1600 },
        { time: "10:20", req: 1450 }, { time: "10:25", req: 1800 },
        { time: "10:30", req: 1700 }
    ];

    const handleRegisterService = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        try {
            const res = await fetch('/api/registry/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.get('name'),
                    region: formData.get('region')
                })
            });

            if (res.ok) {
                const newSvc = await res.json();
                setServices([...services, newSvc]);
                setIsRegModalOpen(false);
                setLogs(prev => [`${new Date().toLocaleTimeString()} | [REGISTRY] New Node Attached: ${newSvc.name}`, ...prev]);
            }
        } catch (error) {
            alert("Registration Failed");
        }
    };

    // Localization State
    const [lang, setLang] = useState<'EN' | 'HI' | 'GU'>('EN');

    return (
        <div className="min-h-screen bg-slate-50/50">
            <NewsTicker />

            <div className="max-w-7xl mx-auto space-y-6 py-6 px-4">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <div className="bg-indigo-600 p-2 rounded-lg text-white">
                                <Globe className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                                    {lang === 'EN' ? 'National DPI Command Center' : lang === 'HI' ? 'राष्ट्रीय डीपीआई कमांड सेंटर' : 'રાષ્ટ્રીય DPI કમાન્ડ સેન્ટર'}
                                </h1>
                                <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">
                                    {lang === 'EN' ? 'Unified Governance Gateway • Zone: IND-WEST-1' : lang === 'HI' ? 'એકીકૃત શાસન ગેટવે • ઝોન: IND-WEST-1' : 'એકીકૃત શાસન ગેટવે • ઝોન: IND-WEST-1'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-auto">
                        <select
                            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold py-2 px-3 rounded-lg focus:outline-none shadow-sm hover:border-indigo-300 transition-colors"
                            value={lang}
                            onChange={(e) => setLang(e.target.value as any)}
                        >
                            <option value="EN">🇺🇸 English</option>
                            <option value="HI">🇮🇳 हिंदी</option>
                            <option value="GU">🇮🇳 ગુજરાતી</option>
                        </select>

                        <span className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100 shadow-sm animate-pulse">
                            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                            SYSTEM ONLINE
                        </span>
                    </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="border-l-4 border-l-indigo-500 shadow-xl shadow-indigo-100/50 bg-white">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Requests / Sec</p>
                                <p className="text-3xl font-black text-slate-900 font-mono mt-1">{systemHealth.requestsPerSec}</p>
                            </div>
                            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 shadow-inner"><Activity className="h-6 w-6" /></div>
                        </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-emerald-500 shadow-xl shadow-emerald-100/50 bg-white">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Avg Latency</p>
                                <p className="text-3xl font-black text-slate-900 font-mono mt-1">{systemHealth.apiLatency.toFixed(0)} <span className="text-sm font-bold text-slate-400">ms</span></p>
                            </div>
                            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 shadow-inner"><Zap className="h-6 w-6" /></div>
                        </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-blue-500 shadow-xl shadow-blue-100/50 bg-white">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Nodes</p>
                                <p className="text-3xl font-black text-slate-900 font-mono mt-1">{systemHealth.activeNodes}</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-xl text-blue-600 shadow-inner"><Server className="h-6 w-6" /></div>
                        </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-purple-500 shadow-xl shadow-purple-100/50 bg-white">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Cache H.R.</p>
                                <p className="text-3xl font-black text-slate-900 font-mono mt-1">{simulatorMode === 'EdgeCached' ? '99.4%' : '12.1%'}</p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-xl text-purple-600 shadow-inner"><Database className="h-6 w-6" /></div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Main: Service Registry Status */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Simulator Controls (New) */}
                        <Card className="bg-white border-slate-200 overflow-hidden">
                            <CardHeader className="pb-4 border-b border-slate-100 bg-slate-50/50">
                                <CardTitle className="text-sm uppercase tracking-wider text-slate-500 font-bold flex items-center gap-2">
                                    <Lock className="h-4 w-4" /> Scalability Control Panel
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="flex flex-wrap gap-4">
                                    <button
                                        onClick={() => setSimulatorMode('Standard')}
                                        className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all ${simulatorMode === 'Standard' ? 'bg-white border-indigo-600 text-indigo-700 shadow-lg scale-105' : 'bg-slate-50 border-transparent text-slate-400 hover:bg-white hover:border-slate-200'}`}
                                    >
                                        Standard Load
                                    </button>
                                    <button
                                        onClick={() => setSimulatorMode('HighLoad')}
                                        className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all ${simulatorMode === 'HighLoad' ? 'bg-rose-50 border-rose-600 text-rose-700 shadow-lg scale-105 animate-pulse' : 'bg-slate-50 border-transparent text-slate-400 hover:bg-white hover:border-slate-200'}`}
                                    >
                                        <AlertTriangle className="inline h-4 w-4 mr-1" /> Stress Test
                                    </button>
                                    <button
                                        onClick={() => setSimulatorMode('EdgeCached')}
                                        className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all ${simulatorMode === 'EdgeCached' ? 'bg-purple-50 border-purple-600 text-purple-700 shadow-lg scale-105' : 'bg-slate-50 border-transparent text-slate-400 hover:bg-white hover:border-slate-200'}`}
                                    >
                                        <Zap className="inline h-4 w-4 mr-1" /> Turbo / Edge
                                    </button>
                                </div>
                                <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs font-mono text-slate-500 text-center">
                                    {simulatorMode === 'Standard' && "System operating within normal parameters. Capacity: 65%"}
                                    {simulatorMode === 'HighLoad' && "WARNING: Simulating 10x Traffic Spike. Database IOPS saturated."}
                                    {simulatorMode === 'EdgeCached' && "CDN ACTIVATED: Content serving from 14 distributed edge nodes. Latency minimized."}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg border-slate-200">
                            <CardHeader className="pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100">
                                <CardTitle className="text-lg flex items-center gap-2"><Network className="h-5 w-5 text-indigo-600" /> Service Registry & Health</CardTitle>

                                <div className="flex gap-2 w-full md:w-auto">
                                    <div className="relative flex-1 md:w-64 group">
                                        <input
                                            type="text"
                                            placeholder={isListening ? "Listening..." : "Search Services..."}
                                            className={`w-full pl-10 pr-10 py-2 text-sm border-2 rounded-xl focus:outline-none transition-all ${isListening ? 'border-red-400 bg-red-50' : 'border-slate-100 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'}`}
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                                            <Globe className="h-4 w-4" />
                                        </div>
                                        <button
                                            onClick={handleVoiceSearch}
                                            className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-slate-200 transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-slate-400'}`}
                                        >
                                            <Mic className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => setIsRegModalOpen(true)}
                                        className="text-xs font-bold bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
                                    >
                                        + Connect Node
                                    </button>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="space-y-3">
                                    {services.length === 0 ? (
                                        <div className="p-8 text-center">
                                            <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                                            <p className="text-slate-500 text-sm">Synchronizing with Registry API...</p>
                                        </div>
                                    ) : (
                                        <AnimatePresence>
                                            {filteredServices.map((svc, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="relative">
                                                            <div className={`h-3 w-3 rounded-full ${svc.status === 'Operational' ? 'bg-emerald-500' : svc.status === 'Initializing' ? 'bg-blue-500' : 'bg-amber-500'}`}></div>
                                                            <div className={`absolute inset-0 h-3 w-3 rounded-full animate-ping opacity-75 ${svc.status === 'Operational' ? 'bg-emerald-400' : 'hidden'}`}></div>
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">{svc.name}</p>
                                                            <p className="text-xs text-slate-500 font-medium">Region: {svc.region}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-6">
                                                        <div className="text-right hidden sm:block">
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Load</p>
                                                            <p className={`text-xs font-bold ${svc.load === 'High' || svc.load === 'Extreme' || svc.load === 'Critical' ? 'text-rose-600' : 'text-slate-700'}`}>{svc.load}</p>
                                                        </div>
                                                        <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${svc.status === 'Operational' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : svc.status === 'Initializing' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                                                            {svc.status}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    )}
                                    {filteredServices.length === 0 && services.length > 0 && (
                                        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
                                            <p className="text-slate-500 text-sm">No services found matching "{searchQuery}"</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Service Registration Modal */}
                        {isRegModalOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                                <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl scale-100 animate-in zoom-in-95 duration-200 overflow-hidden">
                                    <div className="bg-indigo-600 p-6">
                                        <h2 className="text-lg font-bold text-white mb-1">Connect New Node</h2>
                                        <p className="text-indigo-100 text-xs">Register a microservice to the main gateway.</p>
                                    </div>
                                    <form onSubmit={handleRegisterService} className="p-6 space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Service Name</label>
                                            <input name="name" required placeholder="e.g. Edu-Tech Portal" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Region Scope</label>
                                            <select name="region" required className="w-full p-3 rounded-xl border border-slate-200 bg-white font-medium">
                                                <option value="National">National</option>
                                                <option value="State">State (Gujarat)</option>
                                                <option value="Urban">Urban (Ahmedabad)</option>
                                                <option value="Rural">Rural</option>
                                            </select>
                                        </div>
                                        <div className="pt-4 flex gap-3">
                                            <button type="button" onClick={() => setIsRegModalOpen(false)} className="flex-1 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
                                            <button type="submit" className="flex-1 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200 transition-all">
                                                Register Node
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar: Infrastructure & Logs */}
                    <div className="space-y-6">
                        {/* Live Logs */}
                        <Card className="bg-slate-900 border-none shadow-2xl text-slate-300 overflow-hidden relative group">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-slate-900 to-slate-900"></div>
                            <CardHeader className="relative z-10 pb-4 border-b border-white/5">
                                <CardTitle className="text-white text-sm font-mono flex items-center gap-2 tracking-wider"><Cpu className="h-4 w-4 text-indigo-400" /> DATA EXCHANGE BUS</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 relative z-10">
                                <div className="space-y-3 font-mono text-[10px] sm:text-xs h-[400px] overflow-hidden relative">
                                    <AnimatePresence initial={false}>
                                        {logs.map((log, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="border-l-2 border-indigo-500 pl-3 py-1"
                                            >
                                                <p className="leading-relaxed opacity-90 hover:opacity-100 transition-opacity cursor-default">
                                                    <span className="text-indigo-400 mr-2">{log.split('|')[0]}</span>
                                                    {log.split('|')[1]}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Security Status */}
                        <Card className="bg-white shadow-lg border-emerald-100 overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-sm flex items-center gap-2 uppercase tracking-widest font-bold text-slate-500"><ShieldCheck className="h-5 w-5 text-emerald-500" /> Security Layer</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                                    <span className="text-slate-600 text-sm font-medium">DDoS Guard</span>
                                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-white px-2 py-1 rounded shadow-sm border border-emerald-100">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></div> ACTIVE
                                    </span>
                                </div>
                                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                                    <span className="text-slate-600 text-sm font-medium">Encryption</span>
                                    <span className="text-xs font-bold text-slate-700 bg-white px-2 py-1 rounded shadow-sm">AES-256-GCM</span>
                                </div>
                                <div className="flex justify-between items-center bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                                    <span className="text-indigo-900 text-sm font-medium">Identity Provider</span>
                                    <span className="text-xs font-bold text-indigo-700">Jan Parichay</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
