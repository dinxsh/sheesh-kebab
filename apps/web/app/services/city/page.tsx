"use client";

import { AlertTriangle, Home, Zap, ArrowRight, ShieldCheck, MapPin } from "lucide-react";
import Link from "next/link";

export default function CityOverview() {
    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-end border-b border-orange-100 pb-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">AMC Citizen Portal</h1>
                    <p className="text-slate-500 mt-1 font-medium text-lg">One-Stop Digital Services for Ahmedabad</p>
                </div>
                <div className="hidden md:flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-xl border border-orange-100 font-bold text-sm">
                    <ShieldCheck className="h-5 w-5" />
                    <span>Verified Citizen</span>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-red-100 rounded-xl text-red-600">
                        <AlertTriangle className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-500">Active Alerts</p>
                        <p className="text-xl font-black text-slate-900">2 (Heavy Traffic)</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                        <Home className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-500">Property Tax</p>
                        <p className="text-xl font-black text-slate-900">Due in 30 Days</p>
                    </div>
                </div>
            </div>

            {/* Featured Services */}
            <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link href="/services/city/grievances" className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                        <div className="h-10 w-10 bg-orange-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform">
                            <Home className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Report Grievance</h3>
                        <p className="text-slate-500 text-sm mb-4">Complaint for Potholes, Garbage, or Street Lights.</p>
                        <span className="text-orange-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                            File Report <ArrowRight className="h-4 w-4" />
                        </span>
                    </Link>

                    <Link href="/services/city/utilities" className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                        <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                            <Zap className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Pay Bills</h3>
                        <p className="text-slate-500 text-sm mb-4">Clear Tax, Electricity, and Gas bills instantly.</p>
                        <span className="text-indigo-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                            Pay Now <ArrowRight className="h-4 w-4" />
                        </span>
                    </Link>

                    <Link href="/services/city/traffic" className="group bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                        <div className="h-10 w-10 bg-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                            <MapPin className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Check Traffic</h3>
                        <p className="text-slate-400 text-sm mb-4">Avoid congestion with UrbanFlow AI.</p>
                        <span className="text-blue-400 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                            View Map <ArrowRight className="h-4 w-4" />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
