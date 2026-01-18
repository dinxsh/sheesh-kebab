"use client";

import { Activity, Calendar, FileText, ArrowRight, User } from "lucide-react";
import Link from "next/link";

export default function HealthcareOverview() {
    const stats = [
        { label: "Active Doctors", value: "142", icon: User, color: "text-indigo-600 bg-indigo-100" },
        { label: "Daily Appointments", value: "1,200+", icon: Calendar, color: "text-emerald-600 bg-emerald-100" },
        { label: "Epidemic Risk", value: "High", icon: Activity, color: "text-rose-600 bg-rose-100" },
    ];

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Welcome, Administrator</h1>
                <p className="text-slate-500 mt-1 font-medium text-lg">Amdavad Municipal Health Dashboard</p>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                        <div className={`p-4 rounded-xl ${stat.color}`}>
                            <stat.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-500">{stat.label}</p>
                            <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
                <Link href="/services/healthcare/appointments" className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                    <div className="h-12 w-12 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                        <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Book Appointment</h3>
                    <p className="text-slate-500 mb-4">Find specialists at SVP, Civil, and Apollo hospitals.</p>
                    <span className="text-indigo-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                        Find Doctor <ArrowRight className="h-4 w-4" />
                    </span>
                </Link>

                <Link href="/services/healthcare/epidemic-watch" className="group bg-gradient-to-br from-rose-500 to-rose-600 p-8 rounded-3xl border border-rose-400 shadow-xl shadow-rose-200 hover:-translate-y-1 transition-all">
                    <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform">
                        <Activity className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Epidemic Watch</h3>
                    <p className="text-rose-100 mb-4">Monitor real-time disease outbreaks in zones.</p>
                    <span className="text-white font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                        View Analytics <ArrowRight className="h-4 w-4" />
                    </span>
                </Link>
            </div>
        </div>
    );
}
