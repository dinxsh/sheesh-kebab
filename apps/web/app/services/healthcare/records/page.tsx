"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Clock, FileText, ShieldCheck, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RecordsPage() {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [isConsentOpen, setIsConsentOpen] = useState(false);

    useEffect(() => {
        fetch('/api/healthcare/appointments')
            .then(res => res.json())
            .then(data => setAppointments(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900">Medical Records</h1>
                <p className="text-slate-500 mt-1">Manage your visits and consent</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Visits Column */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-800">Upcoming Visits</h2>
                    <Card className="bg-slate-900 text-white border-0 shadow-2xl">
                        <CardHeader>
                            <CardTitle className="text-white">Scheduled Appointments</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {appointments.length === 0 ? (
                                <p className="text-slate-400 text-sm">No upcoming appointments.</p>
                            ) : (
                                appointments.map((apt) => (
                                    <div key={apt.id} className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-indigo-300">{apt.doctor}</h4>
                                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded font-bold uppercase tracking-wide">{apt.status}</span>
                                        </div>
                                        <p className="text-xs text-slate-400">{apt.hospital}</p>
                                        <div className="flex items-center gap-3 mt-3 text-sm font-medium text-white/80">
                                            <div className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {apt.date}</div>
                                            <div className="flex items-center gap-1"><Clock className="h-4 w-4" /> {apt.time}</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Consent Column */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-800">Unified Health Interface (UHI)</h2>
                    <Card className="border-0 shadow-lg bg-indigo-600 text-white">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                                <FileText className="h-4 w-4" /> UHI Consent Manager
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-indigo-100 mb-4 leading-relaxed">Securely sync medical records from other registered hospitals (Apollo, Civil) using Jan Parichay.</p>
                            <button
                                onClick={() => setIsConsentOpen(true)}
                                className="w-full py-2 bg-white text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-50 transition-colors shadow-sm"
                            >
                                Request Sync
                            </button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Consent Modal */}
            <AnimatePresence>
                {isConsentOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    >
                        <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden font-sans">
                            <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-green-600" /> Data Consent</h3>
                                <button onClick={() => setIsConsentOpen(false)}><X className="h-5 w-5 text-slate-400" /></button>
                            </div>
                            <div className="p-6 space-y-4">
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    You are requesting to fetch medical records from <span className="font-bold text-slate-900">National Digital Health Mission</span>.
                                </p>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                                        <input type="checkbox" defaultChecked className="h-5 w-5 text-indigo-600 rounded bg-slate-100 border-slate-300" />
                                        <div className="text-sm">
                                            <p className="font-bold text-slate-900">Lab Reports</p>
                                            <p className="text-xs text-slate-500">Pathology, Blood Work</p>
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                                        <input type="checkbox" defaultChecked className="h-5 w-5 text-indigo-600 rounded bg-slate-100 border-slate-300" />
                                        <div className="text-sm">
                                            <p className="font-bold text-slate-900">Prescriptions</p>
                                            <p className="text-xs text-slate-500">Medications, Notes</p>
                                        </div>
                                    </label>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsConsentOpen(false);
                                        alert("Consent Granted! Records Syncing...");
                                    }}
                                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-200 transition-all hover:-translate-y-0.5"
                                >
                                    Confirm & Sync
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
