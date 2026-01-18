"use client";
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sprout, CloudRain, Tractor, TrendingUp, Upload, AlertTriangle, FileText, CheckCircle, Search, Leaf, Loader2, ShieldCheck } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";

// --- Components ---

const ScannerEffect = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        <motion.div
            className="w-full h-1 bg-green-500/80 shadow-[0_0_20px_2px_rgba(34,197,94,0.6)]"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ position: 'absolute' }}
        />
        <div className="absolute inset-0 bg-green-500/5 mix-blend-overlay"></div>
    </div>
);

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

export default function AgriculturePage() {
    const [analyzing, setAnalyzing] = useState(false);
    const [scanResult, setScanResult] = useState<any>(null);
    const [selectedScheme, setSelectedScheme] = useState<string | null>(null);

    // Mock Data
    const mandiRates = [
        { commodity: "Wheat (Lokwan)", price: 2350, change: 1.2 },
        { commodity: "Cotton (Shankar-6)", price: 6100, change: -0.5 },
        { commodity: "Rice (Basmati)", price: 4200, change: 2.1 },
        { commodity: "Groundnut", price: 5800, change: 0.8 },
        { commodity: "Jeera", price: 12500, change: -1.5 },
    ];

    const schemes = [
        { id: "PM-KISAN", title: "PM Kisan Samman Nidhi", benefits: "₹6,000/year income support", icon: <TrendingUp className="h-5 w-5 text-green-600" /> },
        { id: "FASAL-BIMA", title: "Pradhan Mantri Fasal Bima", benefits: "Crop insurance coverage", icon: <ShieldCheck className="h-5 w-5 text-indigo-600 font-lucide" /> }, // ShieldCheck needs import if not global
        { id: "SOIL-CARD", title: "Soil Health Card", benefits: "Personalized fertilizer recommendations", icon: <FileText className="h-5 w-5 text-amber-600" /> },
    ];

    // Mock AI Analysis
    const handleUpload = () => {
        setAnalyzing(true);
        setScanResult(null);
        setTimeout(() => {
            setAnalyzing(false);
            setScanResult({
                disease: "Leaf Rust (Puccinia triticina)",
                confidence: "94%",
                treatment: "Apply Tebuconazole 250 EC (1ml/liter). Improve air circulation.",
                severity: "Moderate"
            });
        }, 3500); // Longer duration to show off animation
    };

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 min-h-screen bg-slate-50/50">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-green-200 pb-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 border border-green-200 text-green-700 text-xs font-bold mb-3">
                        <Tractor className="h-3 w-3" /> Digital Agriculture Mission
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Krishi Command Center</h1>
                    <p className="text-slate-500 mt-1 font-medium">Smart Farming • Real-time Mandi Rates • AI Crop Doctor</p>
                </div>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <div className="text-right hidden md:block">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Weather (Ahmedabad)</p>
                        <div className="flex items-center gap-2 justify-end text-slate-700">
                            <CloudRain className="h-5 w-5 text-sky-500" />
                            <span className="text-xl font-bold">28°C</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mandi Ticker */}
            <MandiTicker items={mandiRates} />

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Visual AI - Crop Doctor (Left 7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border-0 shadow-2xl shadow-green-100 overflow-hidden bg-white relative group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-green-500/10 transition-colors"></div>
                        <CardHeader className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Leaf className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-green-900 text-xl">Dr. Krishi AI</CardTitle>
                                    <CardDescription className="text-green-700 font-medium">Upload a photo for instant disease diagnosis</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 relative z-10">
                            <div className="relative w-full aspect-video bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-green-400 transition-all group/upload overflow-hidden">
                                {analyzing && <ScannerEffect />}

                                {!analyzing && !scanResult && (
                                    <div className="text-center p-8" onClick={handleUpload}>
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover/upload:scale-110 transition-transform">
                                            <Upload className="h-8 w-8 text-slate-400 group-hover/upload:text-green-500 transition-colors" />
                                        </div>
                                        <p className="font-bold text-slate-700">Click to Upload or Drag Photo</p>
                                        <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto">Supports JPG, PNG. Optimized for wheat, cotton, and castor crops.</p>
                                    </div>
                                )}

                                {analyzing && (
                                    <div className="text-center z-20 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-green-100">
                                        <Loader2 className="h-6 w-6 mx-auto animate-spin text-green-600 mb-2" />
                                        <p className="font-bold text-green-800 animate-pulse">Analyzing Leaf Patterns...</p>
                                        <p className="text-xs text-green-600 font-mono mt-1">Comparing with 50K+ samples</p>
                                    </div>
                                )}

                                {scanResult && (
                                    <div className="absolute inset-0 bg-white/95 backdrop-blur-md p-8 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-300">
                                        <div className="mb-4 p-3 bg-red-100 rounded-full animate-bounce">
                                            <AlertTriangle className="h-8 w-8 text-red-600" />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 mb-1">{scanResult.disease}</h3>
                                        <div className="flex gap-3 mb-6">
                                            <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-200">Severity: {scanResult.severity}</span>
                                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200">Confidence: {scanResult.confidence}</span>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 w-full text-left max-w-md">
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Recommended Treatment</p>
                                            <p className="text-slate-800 font-medium leading-relaxed">{scanResult.treatment}</p>
                                        </div>
                                        <button
                                            onClick={() => setScanResult(null)}
                                            className="mt-6 text-sm font-bold text-slate-500 hover:text-slate-900 underline underline-offset-4"
                                        >
                                            Analyze Another Crop
                                        </button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Schemes & Subsidy (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <Card className="bg-indigo-900 text-white border-none shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl"></div>
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <FileText className="h-5 w-5" /> Active Schemes
                            </CardTitle>
                            <CardDescription className="text-indigo-200">Linked to your Aadhaar ID</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 relative z-10">
                            {schemes.map((scheme) => (
                                <motion.div
                                    key={scheme.id}
                                    whileHover={{ scale: 1.02 }}
                                    className="p-4 bg-white/10 rounded-xl border border-white/10 hover:bg-white/15 transition-all cursor-pointer"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-300">
                                            {scheme.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-indigo-50 mb-1">{scheme.title}</h4>
                                            <p className="text-xs text-indigo-200">{scheme.benefits}</p>
                                        </div>
                                        <CheckCircle className="h-5 w-5 text-emerald-400 ml-auto" />
                                    </div>
                                </motion.div>
                            ))}
                            <button className="w-full py-3 mt-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl transition-colors shadow-lg shadow-indigo-900/50 text-sm">
                                Check Eligibility for New Subsidy
                            </button>
                        </CardContent>
                    </Card>

                    <Card className="border-green-100 bg-green-50/50">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-green-900 text-sm font-bold">Today's Advisory</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4 items-start">
                                <div className="p-2 bg-white rounded-lg shadow-sm border border-green-100">
                                    <CloudRain className="h-5 w-5 text-sky-500" />
                                </div>
                                <p className="text-sm text-green-800 leading-relaxed font-medium">
                                    Light rainfall expected in Dholera region. Delay harvesting of Groundnut by 2 days. Cover stored output.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}


// Helper for Lucide generic (if needed, but importing directly works better in Next.js)
