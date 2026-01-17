"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Clock, User, FileText, Plus } from "lucide-react";
import axios from 'axios';

export default function HealthcarePage() {
    const [appointments, setAppointments] = useState<any[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/healthcare/appointments')
            .then(res => setAppointments(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="max-w-5xl mx-auto space-y-8 py-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900">Healthcare Portal</h1>
                    <p className="text-slate-500 mt-1">Manage appointments and health records.</p>
                </div>
                <button className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors">
                    <Plus className="mr-2 h-4 w-4" /> New Appointment
                </button>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Content: Appointments */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Appointments</CardTitle>
                            <CardDescription>Your scheduled visits with medical professionals.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {appointments.length === 0 ? (
                                <p className="text-sm text-slate-500 italic">No appointments found. Fetching or empty.</p>
                            ) : (
                                appointments.map((apt) => (
                                    <div key={apt.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-white rounded-lg shadow-sm text-indigo-600">
                                                <User className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">{apt.doctor}</h4>
                                                <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                                                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {apt.date}</span>
                                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {apt.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 sm:mt-0 flex items-center">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${apt.status === 'Scheduled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {apt.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar: Quick Actions */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                            {['Find a Doctor', 'My Prescriptions', 'Lab Reports', 'Insurance'].map((action) => (
                                <button key={action} className="w-full text-left px-4 py-3 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-indigo-200 hover:text-indigo-700 transition-all">
                                    {action}
                                </button>
                            ))}
                        </CardContent>
                    </Card>

                    <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="h-6 w-6 opacity-80" />
                            <h3 className="font-bold text-lg">Health Tip</h3>
                        </div>
                        <p className="text-indigo-100 text-sm leading-relaxed">
                            Stay hydrated! Drinking water before meals can help you feel fuller and aid in digestion.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
