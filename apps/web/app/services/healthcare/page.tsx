"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Clock, User, FileText, Plus, Search, MapPin, Star, X, Activity, ShieldCheck, Siren } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Data for Epidemic Graph
const epidemicData = [
    { day: 'Mon', cases: 12 },
    { day: 'Tue', cases: 18 },
    { day: 'Wed', cases: 14 },
    { day: 'Thu', cases: 28 },
    { day: 'Fri', cases: 42 },
    { day: 'Sat', cases: 65 }, // Spike
    { day: 'Sun', cases: 88 },
];

export default function HealthcarePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
    const [isConsentOpen, setIsConsentOpen] = useState(false);
    const [appointments, setAppointments] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/healthcare/appointments')
            .then(res => res.json())
            .then(data => setAppointments(data))
            .catch(err => console.error(err));
    }, []);

    const doctors = [
        { id: 1, name: "Dr. Rajesh Patel", specialty: "Cardiologist", hospital: "SVP Hospital", exp: "15 Years", rating: 4.8, loc: "Ellisbridge" },
        { id: 2, name: "Dr. Anjali Shah", specialty: "Dermatologist", hospital: "Apollo Hospitals, Sola", exp: "8 Years", rating: 4.9, loc: "Sola" },
        { id: 3, name: "Dr. Vikram Sarabhai", specialty: "Neurologist", hospital: "Zydus Hospital", exp: "20 Years", rating: 5.0, loc: "Thaltej" },
        { id: 4, name: "Dr. Meera Desai", specialty: "Pediatrician", hospital: "Civil Hospital", exp: "12 Years", rating: 4.7, loc: "Asarwa" },
        { id: 5, name: "Dr. Sanjay Gupta", specialty: "Orthopedic", hospital: "Sterling Hospital", exp: "18 Years", rating: 4.6, loc: "Memnagar" },
    ];

    const filteredDoctors = doctors.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.hospital.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Form Handling (Same as before)
    const handleBook = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const newAppointment = {
            doctor: selectedDoctor.name,
            hospital: selectedDoctor.hospital,
            date: formData.get("date"),
            time: formData.get("time"),
        };

        try {
            const res = await fetch('/api/healthcare/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newAppointment)
            });
            const data = await res.json();

            if (data.success) {
                setAppointments([data.appointment, ...appointments]);
                setIsBookingOpen(false);
                setSelectedDoctor(null);
                alert(`Appointment confirmed with ${selectedDoctor.name} at ${selectedDoctor.hospital}`);
            }
        } catch (e) {
            alert("Failed to book appointment.");
        }
    };

    const openBooking = (doctor: any) => {
        setSelectedDoctor(doctor);
        setIsBookingOpen(true);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 py-8 px-4 bg-slate-50 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Amdavad Health</h1>
                    <p className="text-slate-500 mt-1 font-medium">Integrated City Health Dashboard • Powered by Ayushman Bharat</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Left Column: Doctor Discovery (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Search Bar */}
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-indigo-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Find doctors, specialties, or hospitals..."
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 shadow-lg shadow-indigo-100 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-lg text-slate-700"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Doctors List */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid gap-4"
                    >
                        <h2 className="font-bold text-slate-900 text-lg ml-1">Top Specialists in Ahmedabad</h2>
                        {filteredDoctors.map((doc) => (
                            <motion.div
                                key={doc.id}
                                variants={itemVariants}
                                className="flex flex-col sm:flex-row items-start sm:items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-transparent hover:border-indigo-100 group cursor-pointer"
                            >
                                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl mr-4 shadow-lg shadow-indigo-200">
                                    {doc.name.split(' ')[1][0]}
                                </div>
                                <div className="flex-1 mt-4 sm:mt-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">{doc.name}</h3>
                                            <p className="text-indigo-600 font-medium text-sm">{doc.specialty}</p>
                                        </div>
                                        <div className="flex items-center bg-amber-50 px-2 py-1 rounded text-amber-700 text-xs font-bold border border-amber-100">
                                            <Star className="h-3 w-3 fill-current mr-1" /> {doc.rating}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 font-medium">
                                        <span className="flex items-center"><MapPin className="h-3.5 w-3.5 mr-1" /> {doc.hospital}, {doc.loc}</span>
                                        <span>• {doc.exp} Exp.</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => openBooking(doc)}
                                    className="mt-4 sm:mt-0 px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 active:scale-95 ml-auto"
                                >
                                    Book Visit
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Right Column: User Dashboard (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                    {/* HealthGuard AI - Epidemic Watch (Now with Chart) */}
                    <Card className="bg-white border-0 shadow-xl shadow-rose-100 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Siren className="h-32 w-32" />
                        </div>
                        <CardHeader className="pb-2 relative z-10">
                            <div className="flex items-center gap-2">
                                <Activity className="h-5 w-5 text-rose-600 animate-pulse" />
                                <CardTitle className="text-rose-900">HealthGuard AI</CardTitle>
                            </div>
                            <CardDescription className="text-rose-700 font-medium">Predictive Outbreak Analytics</CardDescription>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100 backdrop-blur-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">Dengue Risk Trend</span>
                                    <span className="text-xs font-bold bg-rose-100 text-rose-600 px-2 py-1 rounded-full animate-pulse border border-rose-200">LIVE</span>
                                </div>

                                {/* Recharts Area Chart */}
                                <div className="h-32 w-full mb-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={epidemicData}>
                                            <defs>
                                                <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#e11d48" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#e11d48" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <Tooltip
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                                                itemStyle={{ color: '#e11d48', fontWeight: 'bold' }}
                                            />
                                            <Area type="monotone" dataKey="cases" stroke="#e11d48" strokeWidth={3} fillOpacity={1} fill="url(#colorCases)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="flex items-center justify-between text-xs font-medium text-rose-800">
                                    <span>High Risk Zone: <span className="font-bold">East Ahmedabad</span></span>
                                    <span className="text-2xl font-black">82%</span>
                                </div>

                                <button
                                    onClick={async () => {
                                        // Alert Logic
                                        try {
                                            await fetch('/api/interop/alerts', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({ type: 'Epidemic Risk: Dengue', zone: 'East Zone' })
                                            });
                                            alert("Cross-Ministry Alert Broadcasted via Secure API.");
                                        } catch (e) {
                                            alert("Failed to send alert.");
                                        }
                                    }}
                                    className="w-full mt-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-lg hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200"
                                >
                                    Broadcast Alert to AMC
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900 text-white border-0 shadow-2xl">
                        <CardHeader>
                            <CardTitle className="text-white">Upcoming Visits</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {appointments.map((apt) => (
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
                            ))}
                        </CardContent>
                    </Card>

                    {/* Interoperability Feature */}
                    <Card className="border-0 shadow-lg bg-indigo-600 text-white">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                                <FileText className="h-4 w-4" /> UHI Consent
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

            {/* Booking Modal (Same Logic, Better UI) */}
            <AnimatePresence>
                {isBookingOpen && selectedDoctor && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Book Appointment</h2>
                                    <p className="text-sm text-slate-500">with {selectedDoctor.name}</p>
                                </div>
                                <button onClick={() => setIsBookingOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                                    <X className="h-5 w-5 text-slate-500" />
                                </button>
                            </div>
                            <form onSubmit={handleBook} className="p-6 space-y-5">
                                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center gap-4">
                                    <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl border border-indigo-100 shadow-sm">
                                        {selectedDoctor.name.split(' ')[1][0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">{selectedDoctor.hospital}</p>
                                        <p className="text-sm text-indigo-600 font-medium">{selectedDoctor.specialty}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Date</label>
                                        <input name="date" required type="date" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Time</label>
                                        <select name="time" required className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium">
                                            <option>09:00 AM</option>
                                            <option>10:30 AM</option>
                                            <option>12:00 PM</option>
                                            <option>04:00 PM</option>
                                            <option>06:30 PM</option>
                                        </select>
                                    </div>
                                </div>

                                <button type="submit" className="w-full py-4 text-base font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-2xl shadow-xl shadow-slate-900/20 transition-all hover:scale-[1.02]">
                                    Confirm Booking
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Consent Modal (Same Logic) */}
            <AnimatePresence>
                {isConsentOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    >
                        <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden font-sans">
                            {/* ... Consent Modal Content (reused from previous code with better styling) ... */}
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
