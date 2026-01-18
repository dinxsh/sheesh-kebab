"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, MapPin, Calendar, CheckCircle2, Clock, ShieldCheck, Leaf, Stethoscope, Building2, QrCode, Download, Share2, Loader2 } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function ProfilePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({
        appointments: [],
        schemes: [],
        complaints: []
    });
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [healthRes, agriRes, cityRes] = await Promise.all([
                    fetch('/api/healthcare/appointments'),
                    fetch('/api/agriculture/schemes'),
                    fetch('/api/city/complaints')
                ]);

                const appointments = await healthRes.json();
                const schemes = await agriRes.json();
                const complaints = await cityRes.json();

                setData({ appointments, schemes, complaints });
                // Artificial delay for smoother entrance animation
                setTimeout(() => setIsLoading(false), 800);
            } catch (error) {
                console.error("Failed to load profile data", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDownloadID = () => {
        setIsDownloading(true);
        setTimeout(() => {
            setIsDownloading(false);
            alert("Digital ID Card (PDF) downloaded successfully!");
        }, 1500);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-slate-500 gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-orange-600" />
                <p className="animate-pulse font-medium">Authenticating Biometrics...</p>
            </div>
        );
    }

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <motion.div
            className="max-w-5xl mx-auto py-10 px-4 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >

            {/* Holographic ID Card */}
            <motion.div
                className="relative overflow-hidden rounded-3xl p-1 bg-gradient-to-br from-orange-400 via-white to-green-400 shadow-2xl"
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
            >
                <div className="bg-white/95 backdrop-blur-md rounded-[20px] p-6 md:p-8 relative overflow-hidden">
                    {/* Watermark / Background Pattern */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-gradient-to-br from-orange-100 to-green-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        {/* Avatar Section */}
                        <div className="relative">
                            <div className="h-32 w-32 bg-slate-100 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg overflow-hidden relative group">
                                <User className="h-16 w-16 text-slate-300" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                            </div>
                            <div className="absolute -bottom-3 -right-3 bg-green-500 text-white p-1.5 rounded-full border-4 border-white shadow-sm">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="flex-1 text-center md:text-left space-y-2">
                            <div className="flex items-center justify-center md:justify-start gap-3">
                                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Rajesh Kumar</h1>
                                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full border border-blue-200 uppercase tracking-wide">Citizen</span>
                            </div>
                            <p className="text-slate-500 font-mono text-sm tracking-wider">UID: <span className="text-slate-900 font-bold">9921 4421 9922</span></p>

                            <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4 max-w-md mx-auto md:mx-0 text-sm">
                                <div>
                                    <p className="text-slate-400 text-xs uppercase font-bold">Location</p>
                                    <p className="font-medium text-slate-700">Ahmedabad, Gujarat</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs uppercase font-bold">DOB</p>
                                    <p className="font-medium text-slate-700">12 Aug 1985</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
                                <span className="flex items-center gap-1.5 text-xs font-bold bg-green-50 text-green-700 px-3 py-1.5 rounded-lg border border-green-100">
                                    <CheckCircle2 className="h-3.5 w-3.5" /> Biometrics Verified
                                </span>
                                <span className="flex items-center gap-1.5 text-xs font-bold bg-orange-50 text-orange-700 px-3 py-1.5 rounded-lg border border-orange-100">
                                    <ShieldCheck className="h-3.5 w-3.5" /> Digilocker Linked
                                </span>
                            </div>
                        </div>

                        {/* QR / Actions */}
                        <div className="flex flex-col items-center gap-3 md:border-l md:border-slate-100 md:pl-8">
                            <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-inner">
                                <QrCode className="h-20 w-20 text-slate-900" />
                            </div>
                            <div className="flex gap-2 w-full">
                                <button
                                    onClick={handleDownloadID}
                                    className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-800 transition-all active:scale-95 whitespace-nowrap"
                                >
                                    {isDownloading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Download className="h-3 w-3" />}
                                    Download ID
                                </button>
                                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                                    <Share2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-xl font-bold text-slate-800 flex items-center gap-2 pt-4">
                <span className="bg-orange-500 w-1.5 h-6 rounded-full"></span>
                Integrated Services
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6">

                {/* Health Section */}
                <motion.div variants={itemVariants}>
                    <Card className="border-t-4 border-t-blue-500 shadow-sm hover:shadow-md transition-shadow h-full">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                    <Stethoscope className="h-5 w-5" />
                                </div>
                                Healthcare
                            </CardTitle>
                            <CardDescription>Upcoming appointments & records</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {data.appointments.length === 0 ? (
                                <p className="text-sm text-slate-400 italic">No active appointments.</p>
                            ) : data.appointments.map((appt: any, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-100 rounded-lg group hover:border-blue-200 transition-colors">
                                    <div className="bg-white p-2 rounded-md shadow-sm text-center min-w-[3.5rem] border border-slate-100">
                                        <span className="block text-xs text-slate-400 uppercase font-bold">{appt.date.split(' ')[0]}</span>
                                        <span className="block text-lg font-bold text-slate-900">{appt.date.split(' ')[1]}</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">{appt.doctor}</p>
                                        <p className="text-xs text-slate-500">{appt.hospital}</p>
                                        <p className="text-xs font-mono text-blue-600 mt-1 flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> {appt.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Agriculture Section */}
                <motion.div variants={itemVariants}>
                    <Card className="border-t-4 border-t-green-500 shadow-sm hover:shadow-md transition-shadow h-full">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <div className="p-2 bg-green-50 rounded-lg text-green-600">
                                    <Leaf className="h-5 w-5" />
                                </div>
                                Agriculture (DBT)
                            </CardTitle>
                            <CardDescription>Subsidies & Scheme Applications</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {data.schemes.filter((s: any) => s.applied).length === 0 ? (
                                <p className="text-sm text-slate-400 italic">No active applications.</p>
                            ) : data.schemes.filter((s: any) => s.applied).map((scheme: any, i) => (
                                <div key={i} className="flex justify-between items-center p-3 border border-green-100 bg-green-50/30 rounded-lg">
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">{scheme.name}</p>
                                        <p className="text-xs text-green-700">{scheme.desc}</p>
                                    </div>
                                    <span className="text-[10px] font-bold bg-white text-green-700 px-2 py-1 rounded border border-green-200 shadow-sm uppercase tracking-wider">
                                        {scheme.status}
                                    </span>
                                </div>
                            ))}
                            <div className="pt-2">
                                <button className="w-full py-2 text-xs font-bold text-green-700 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
                                    View 3 Eligible Schemes
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* City Section */}
                <motion.div variants={itemVariants} className="md:col-span-2">
                    <Card className="border-t-4 border-t-orange-500 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                                    <Building2 className="h-5 w-5" />
                                </div>
                                Municipal Services
                            </CardTitle>
                            <CardDescription>Grievance Redressal & Utilities</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {data.complaints.slice(0, 3).map((c: any, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-lg shadow-sm group hover:border-orange-100 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-full ${c.status === 'Resolved' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                                                {c.status === 'Resolved' ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 text-sm">{c.type}</p>
                                                <p className="text-xs text-slate-500 flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" /> {c.loc}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${c.status === 'Resolved' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                                                {c.status}
                                            </span>
                                            <p className="text-[10px] font-mono text-slate-400 mt-1">ID: {c.id}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <motion.div variants={itemVariants} className="text-center py-6">
                <p className="text-slate-400 text-xs font-medium">
                    Unified Digital Identity • Powered by National DPI • Made for Jan Parichay
                </p>
            </motion.div>
        </motion.div>
    );
}
