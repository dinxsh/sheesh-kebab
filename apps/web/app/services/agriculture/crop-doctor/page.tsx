"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Loader2, AlertTriangle, Leaf } from "lucide-react";

// Scanner Effect Component
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

export default function CropDoctorPage() {
    const [analyzing, setAnalyzing] = useState(false);
    const [scanResult, setScanResult] = useState<any>(null);

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
        }, 3500);
    };

    return (
        <div className="p-8 max-w-4xl mx-auto h-full flex flex-col items-center justify-center">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
                    <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900">Dr. Krishi AI</h1>
                <p className="text-slate-500 mt-2">Upload a photo for instant disease diagnosis</p>
            </div>

            <div className="w-full max-w-2xl">
                <div className="relative w-full aspect-video bg-white rounded-3xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-green-400 transition-all shadow-xl shadow-slate-200 overflow-hidden group">

                    {analyzing && <ScannerEffect />}

                    {!analyzing && !scanResult && (
                        <div className="text-center p-8 w-full h-full flex flex-col items-center justify-center" onClick={handleUpload}>
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform border border-slate-100">
                                <Upload className="h-10 w-10 text-slate-400 group-hover:text-green-500 transition-colors" />
                            </div>
                            <p className="font-bold text-xl text-slate-700">Click to Upload or Drag Photo</p>
                            <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto">Supports JPG, PNG. Optimized for wheat, cotton, and castor crops.</p>
                        </div>
                    )}

                    {analyzing && (
                        <div className="text-center z-20 bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-2xl border border-green-100">
                            <Loader2 className="h-8 w-8 mx-auto animate-spin text-green-600 mb-3" />
                            <p className="font-bold text-green-800 animate-pulse text-lg">Analyzing Leaf Patterns...</p>
                        </div>
                    )}

                    {scanResult && (
                        <div className="absolute inset-0 bg-white/95 backdrop-blur-md p-8 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-300">
                            <div className="mb-4 p-3 bg-red-100 rounded-full animate-bounce">
                                <AlertTriangle className="h-10 w-10 text-red-600" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-2">{scanResult.disease}</h3>
                            <div className="flex gap-3 mb-8">
                                <span className="px-4 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-bold border border-red-200">Severity: {scanResult.severity}</span>
                                <span className="px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-bold border border-green-200">Confidence: {scanResult.confidence}</span>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 w-full text-left max-w-lg shadow-sm">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Recommended Treatment</p>
                                <p className="text-slate-800 font-medium leading-relaxed text-lg">{scanResult.treatment}</p>
                            </div>
                            <button
                                onClick={() => setScanResult(null)}
                                className="mt-8 px-6 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
                            >
                                Analyze Another Crop
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
