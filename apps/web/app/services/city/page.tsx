"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, MapPin, Lightbulb, Droplets, Flame } from "lucide-react";
import axios from 'axios';

export default function CityPage() {
    const [complaints, setComplaints] = useState<any[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/city/complaints')
            .then(res => setComplaints(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="max-w-6xl mx-auto space-y-8 py-8">
            <div className="flex items-center justify-between border-b border-orange-100 pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900">Smart City Portal</h1>
                    <p className="text-slate-500 mt-1">Civic services, utilities, and grievance redressal.</p>
                </div>
                <button className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 transition-colors">
                    + Raise Complaint
                </button>
            </div>

            <div className="grid gap-8 lg:grid-cols-12">

                {/* Main: Complaints List (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>My Grievances</CardTitle>
                            <CardDescription>Track status of your filed issues.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {complaints.length === 0 ? (
                                <div className="text-center py-8 text-slate-400">No complaints found.</div>
                            ) : (
                                complaints.map((c) => (
                                    <div key={c.id} className="flex flex-col sm:flex-row gap-4 p-5 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                                        <div className={`p-3 rounded-full h-fit flex-shrink-0 ${c.status === 'Resolved' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                            {c.status === 'Resolved' ? <CheckCircle className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-slate-900">{c.type}</h4>
                                                <span className="text-xs font-mono text-slate-400">#{c.id}</span>
                                            </div>
                                            <p className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                                                <MapPin className="h-3 w-3" /> {c.loc}
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${c.status === 'Resolved' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
                                                }`}>
                                                {c.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar: Utilities (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Utility Due</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-md"><Droplets className="h-4 w-4" /></div>
                                    <span className="font-medium text-slate-700">Water</span>
                                </div>
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">PAID</span>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-yellow-100 text-yellow-600 rounded-md"><Lightbulb className="h-4 w-4" /></div>
                                    <span className="font-medium text-slate-700">Electricity</span>
                                </div>
                                <div className="text-right">
                                    <span className="block text-sm font-bold text-slate-900">₹1,240</span>
                                    <span className="text-xs text-red-500 font-medium">Due in 2 days</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-rose-100 text-rose-600 rounded-md"><Flame className="h-4 w-4" /></div>
                                    <span className="font-medium text-slate-700">Gas</span>
                                </div>
                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">PAID</span>
                            </div>

                            <button className="w-full mt-2 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors">
                                Pay All Dues
                            </button>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}
