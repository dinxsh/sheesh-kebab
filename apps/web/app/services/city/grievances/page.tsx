"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Filter, Loader2, MapPin, Navigation, Plus, Search, X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GrievancesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterZone, setFilterZone] = useState("All");
    const [complaints, setComplaints] = useState<any[]>([]);

    // Values for Form
    const [isLocating, setIsLocating] = useState(false);
    const [locationValue, setLocationValue] = useState("");

    useEffect(() => {
        fetch('/api/city/complaints')
            .then(res => res.json())
            .then(data => setComplaints(data))
            .catch(err => console.error(err));
    }, []);

    const handleLocateMe = () => {
        setIsLocating(true);
        setTimeout(() => {
            setIsLocating(false);
            setLocationValue("23.0225° N, 72.5714° E (Near Law Garden)");
        }, 1500);
    };

    const handleRaiseComplaint = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const newComplaint = {
            type: formData.get("type"),
            loc: formData.get("loc"),
            zone: formData.get("zone"),
        };

        try {
            const res = await fetch('/api/city/complaints', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newComplaint)
            });
            const data = await res.json();

            if (data.success) {
                setComplaints([data.complaint, ...complaints]);
                setIsModalOpen(false);
                alert(`Grievance Raised! ID: ${data.complaint.id}`);
            }
        } catch (e) {
            alert("Failed to submit grievance.");
        }
    };

    const filteredComplaints = complaints.filter(c =>
        (c.type.toLowerCase().includes(searchTerm.toLowerCase()) || c.loc.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterZone === "All" || c.zone === filterZone)
    );

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900">Grievances</h1>
                    <p className="text-slate-500 mt-1">Report potholes, drainage, and street light issues</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-200 hover:bg-orange-500 transition-all hover:-translate-y-0.5"
                >
                    <Plus className="mr-2 h-4 w-4" /> Raise New Grievance
                </button>
            </div>

            {/* Filters Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by area, issue type or ID..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                    <Filter className="h-4 w-4 text-slate-400 flex-shrink-0" />
                    {["All", "North West", "West", "South West", "Central", "East"].map(zone => (
                        <button
                            key={zone}
                            onClick={() => setFilterZone(zone)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${filterZone === zone ? "bg-slate-900 text-white shadow-md shadow-slate-900/20" : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"}`}
                        >
                            {zone}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-4">
                {filteredComplaints.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-slate-200">
                        <p className="text-slate-500 font-medium">No grievances found matching your criteria.</p>
                    </div>
                ) : (
                    filteredComplaints.map((c, i) => (
                        <motion.div
                            key={c.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="group flex flex-col md:flex-row gap-4 p-6 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-lg transition-all hover:border-orange-100"
                        >
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${c.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                        c.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                        {c.status}
                                    </span>
                                    <span className="text-xs font-mono text-slate-400">{c.id}</span>
                                    <span className="text-xs text-slate-400">• {c.date}</span>
                                </div>
                                <h3 className="font-bold text-lg text-slate-900 mb-1">{c.type}</h3>
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                                    <span>{c.loc}</span>
                                    <span className="bg-slate-100 px-2 py-0.5 rounded text-xs ml-2 font-medium text-slate-600">{c.zone} Zone</span>
                                </div>
                            </div>
                            <div className="flex items-center self-start md:self-center">
                                {c.status !== 'Resolved' && (
                                    <button className="text-orange-600 text-sm font-bold hover:underline">Track Status</button>
                                )}
                                {c.status === 'Resolved' && (
                                    <div className="flex items-center gap-1 text-green-600 text-sm font-bold bg-green-50 px-3 py-1 rounded-lg">
                                        <CheckCircle className="h-4 w-4" /> Closed
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl scale-100 animate-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900">Raise New Grievance</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleRaiseComplaint} className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Issue Category</label>
                                <select name="type" required className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 bg-white font-medium">
                                    <option value="">Select Category</option>
                                    <option value="Road Maintenance">Road Maintenance / Potholes</option>
                                    <option value="Street Lighting">Street Lighting</option>
                                    <option value="Water Supply">Water Supply / Drainage</option>
                                    <option value="Garbage Collection">Garbage Collection / Cleaning</option>
                                    <option value="Stray Animals">Stray Animals / Cattle</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Zone</label>
                                    <select name="zone" required className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 bg-white font-medium">
                                        <option value="West">West Zone</option>
                                        <option value="North West">North West</option>
                                        <option value="South West">South West</option>
                                        <option value="East">East Zone</option>
                                        <option value="Central">Central Zone</option>
                                        <option value="North">North Zone</option>
                                        <option value="South">South Zone</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Date</label>
                                    <input type="date" className="w-full p-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed font-medium" defaultValue={new Date().toISOString().split('T')[0]} disabled />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Specific Location / Landmark</label>
                                <div className="relative">
                                    <input
                                        name="loc"
                                        required
                                        type="text"
                                        placeholder="e.g. Near Shivranjani Cross Road"
                                        className="w-full pl-3 pr-12 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 font-medium transition-all"
                                        value={locationValue}
                                        onChange={(e) => setLocationValue(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleLocateMe}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                                        title="Use my current location"
                                    >
                                        {isLocating ? <Loader2 className="h-5 w-5 animate-spin text-orange-600" /> : <Navigation className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Description / Comments</label>
                                <textarea className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 min-h-[100px] font-medium" placeholder="Describe the issue in detail..."></textarea>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 py-3 text-sm font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-lg shadow-lg shadow-orange-200 transition-all">Submit Complaint</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
