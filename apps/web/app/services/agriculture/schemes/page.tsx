"use client";

import { motion } from "framer-motion";
import { CheckCircle, FileText, ShieldCheck, TrendingUp } from "lucide-react";

export default function SchemesPage() {
    const schemes = [
        { id: "PM-KISAN", title: "PM Kisan Samman Nidhi", benefits: "₹6,000/year income support", icon: <TrendingUp className="h-5 w-5 text-green-600" /> },
        { id: "FASAL-BIMA", title: "Pradhan Mantri Fasal Bima", benefits: "Crop insurance coverage", icon: <ShieldCheck className="h-5 w-5 text-indigo-600" /> },
        { id: "SOIL-CARD", title: "Soil Health Card", benefits: "Personalized fertilizer recommendations", icon: <FileText className="h-5 w-5 text-amber-600" /> },
    ];

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Govt. Schemes</h1>
            <p className="text-slate-500 mb-8">Subsidies and benefits linked to your Aadhaar</p>

            <div className="space-y-4">
                {schemes.map((scheme) => (
                    <motion.div
                        key={scheme.id}
                        whileHover={{ scale: 1.02 }}
                        className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-indigo-50 transition-colors">
                                {scheme.icon}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg text-slate-900 mb-1">{scheme.title}</h4>
                                <p className="text-slate-500 font-medium">{scheme.benefits}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                                    <CheckCircle className="h-3 w-3" /> Eligible
                                </span>
                                <button className="text-indigo-600 text-sm font-bold hover:underline">Apply Now</button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 p-6 bg-indigo-900 rounded-3xl text-white text-center relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">Need a New Subsidy?</h3>
                    <p className="text-indigo-200 mb-6 max-w-md mx-auto">Check eligibility for solar pumps, drip irrigation, and tractor loans instantly.</p>
                    <button className="px-8 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors">
                        Check Eligibility
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            </div>
        </div>
    );
}
