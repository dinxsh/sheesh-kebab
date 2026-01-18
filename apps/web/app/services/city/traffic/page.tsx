"use client";

import { useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function TrafficPage() {
    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900">Traffic Control AI</h1>
                <p className="text-slate-500 mt-1">UrbanFlow: Intelligent Signal Optimization</p>
            </div>

            <Card className="bg-slate-900 border-none text-white overflow-hidden relative shadow-2xl shadow-blue-900/20 max-w-3xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse"></div>
                <CardHeader className="relative z-10 pb-2">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <AlertTriangle className="h-5 w-5 text-amber-400" />
                                <CardTitle className="text-white">Live Traffic Status</CardTitle>
                            </div>
                            <CardDescription className="text-slate-400">Real-time Signal Optimization & Congestion Management</CardDescription>
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-mono text-blue-400 flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            AI ACTIVE • v4.2
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="relative z-10">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                            <p className="text-xs text-slate-400 mb-1 group-hover:text-white transition-colors">SG Highway Junction</p>
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-xl font-bold font-mono">FLOW: 92%</span>
                            </div>
                            <p className="text-xs text-green-400 mt-2">Signal Adjusted: +15s Green</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                            <p className="text-xs text-slate-400 mb-1 group-hover:text-white transition-colors">C.G. Road Access</p>
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                                <span className="text-xl font-bold font-mono">LOAD: High</span>
                            </div>
                            <p className="text-xs text-amber-400 mt-2">Re-routing traffic to 132ft Rd</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col justify-center">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-400">Avg Wait Time Reduced</span>
                                <span className="font-bold text-white">-12%</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "88%" }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="bg-blue-500 h-1.5 rounded-full"
                                ></motion.div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
