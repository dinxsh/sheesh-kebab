"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, MapPin, Lightbulb, Droplets, Flame, Search, Filter, Plus, X, Loader2, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CityPage() {
    const [activeTab, setActiveTab] = useState("complaints");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterZone, setFilterZone] = useState("All");
    const [toast, setToast] = useState<{ msg: string, type: 'success' | 'error' } | null>(null);

    // Show Toast Helper
    const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Location Simulation
    const [isLocating, setIsLocating] = useState(false);
    const [locationValue, setLocationValue] = useState("");

    const handleLocateMe = () => {
        setIsLocating(true);
        setTimeout(() => {
            setIsLocating(false);
            setLocationValue("23.0225° N, 72.5714° E (Near Law Garden)");
        }, 1500);
    };

    // Local Ahmedabad Data
    const [complaints, setComplaints] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/city/complaints')
            .then(res => res.json())
            .then(data => setComplaints(data))
            .catch(err => console.error(err));
    }, []);

    const [bills, setBills] = useState([
        { id: 1, provider: "Torrent Power", type: "Electricity", amount: "₹4,250", dueDate: "2 Days", status: "Due", icon: Lightbulb, color: "text-yellow-600 bg-yellow-100" },
        { id: 2, provider: "Adani Gas", type: "Piped Gas", amount: "₹890", dueDate: "Paid", status: "Paid", icon: Flame, color: "text-rose-600 bg-rose-100" },
        { id: 3, provider: "AMC Property Tax", type: "Tax", amount: "₹12,000", dueDate: "30 Days", status: "Due", icon: MapPin, color: "text-blue-600 bg-blue-100" },
    ]);

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
                showToast(`Grievance Raised! ID: ${data.complaint.id}`);
            }
        } catch (e) {
            showToast("Failed to submit grievance.", "error");
        }
    };

    const handlePayBill = (id: number) => {
        setBills(bills.map(b => b.id === id ? { ...b, status: "Paid", dueDate: "Paid" } : b));
        showToast("Payment Successful via UPI!");
    };

    // Cross-Ministry Alert State
    const [alertData, setAlertData] = useState<any>(null);

    useEffect(() => {
        // Poll for alerts every 5 seconds to demonstrate real-time interop
        const interval = setInterval(() => {
            fetch('/api/interop/alerts')
                .then(res => res.json())
                .then(data => {
                    const latestAlert = data[data.length - 1]; // Get most recent
                    if (latestAlert && latestAlert.active) {
                        setAlertData(latestAlert);
                    }
                });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const filteredComplaints = complaints.filter(c =>
        (c.type.toLowerCase().includes(searchTerm.toLowerCase()) || c.loc.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterZone === "All" || c.zone === filterZone)
    );

    return (
        <div className="max-w-7xl mx-auto space-y-8 py-8 px-4 relative">

            {/* Custom Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: -20, x: "-50%" }}
                        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 ${toast.type === 'success' ? 'bg-slate-900 text-white' : 'bg-red-500 text-white'}`}
                    >
                        {toast.type === 'success' ? <CheckCircle className="h-4 w-4 text-green-400" /> : <AlertTriangle className="h-4 w-4 text-white" />}
                        {toast.msg}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-orange-100 pb-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">AMC Citizen Connect</h1>
                    <p className="text-slate-500 mt-1 font-medium">Ahmedabad Municipal Corporation • Seva | Suraksha | Vikas</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-200 hover:bg-orange-500 transition-all hover:-translate-y-0.5"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Raise Grievance
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 w-full overflow-x-auto">
                <button
                    onClick={() => setActiveTab("complaints")}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === "complaints" ? "border-orange-600 text-orange-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                >
                    Grievances & Requests
                </button>
                <button
                    onClick={() => setActiveTab("utilities")}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === "utilities" ? "border-orange-600 text-orange-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                >
                    Pay Bills & Tax
                </button>
            </div>

            {/* Content Area */}
            {activeTab === "complaints" ? (
                <div className="space-y-6">
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

                    {/* Cross-Ministry Alert Injection */}
                    <AnimatePresence>
                        {alertData && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-4"
                            >
                                <div className="p-3 bg-rose-100 rounded-full text-rose-600 animate-pulse">
                                    <AlertTriangle className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-rose-800">EMERGENCY PROTOCOL ACTIVATED</h3>
                                    <p className="text-sm text-rose-700 mt-1">
                                        <strong>Source:</strong> Ministry of Health (HealthGuard)<br />
                                        <strong>Alert:</strong> {alertData.type} detected in {alertData.zone}.<br />
                                        <strong>Action Required:</strong> Immediate deployment of Fogging Machines.
                                    </p>
                                    <div className="mt-3 flex gap-3">
                                        <button
                                            onClick={() => {
                                                showToast("Fogging Teams Dispatched to Sector-4, 5, and 9 via GPS.");
                                                setAlertData(null);
                                            }}
                                            className="px-4 py-2 bg-rose-600 text-white text-sm font-bold rounded-lg shadow hover:bg-rose-700 transition-colors"
                                        >
                                            Deploy Teams Now
                                        </button>
                                        <button
                                            onClick={() => setAlertData(null)}
                                            className="px-4 py-2 bg-white text-rose-600 text-sm font-bold rounded-lg border border-rose-200 hover:bg-rose-50 transition-colors"
                                        >
                                            Dismiss
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* UrbanFlow AI - Traffic Optimization */}
                    <Card className="bg-slate-900 border-none text-white overflow-hidden relative shadow-2xl shadow-blue-900/20">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse"></div>
                        <CardHeader className="relative z-10 pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <AlertTriangle className="h-5 w-5 text-amber-400" />
                                        <CardTitle className="text-white">UrbanFlow AI Traffic Control</CardTitle>
                                    </div>
                                    <CardDescription className="text-slate-400">Real-time Signal Optimization & Congestion Management</CardDescription>
                                </div>
                                <div className="bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-mono text-blue-400 flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                    </span>
                                    AI ACTIVE • v4.2
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                                    <p className="text-xs text-slate-400 mb-1 group-hover:text-white transition-colors">SG Highway Junction</p>
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-xl font-bold font-mono">FLOW: 92%</span>
                                    </div>
                                    <p className="text-xs text-green-400 mt-2">Signal Adjusted: +15s Green</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                                    <p className="text-xs text-slate-400 mb-1 group-hover:text-white transition-colors">C.G. Road Access</p>
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                                        <span className="text-xl font-bold font-mono">LOAD: High</span>
                                    </div>
                                    <p className="text-xs text-amber-400 mt-2">Re-routing traffic to 132ft Rd</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col justify-center">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-slate-400">Avg Wait Time Reduced</span>
                                        <span className="font-bold text-white">-12%</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "88%" }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="bg-blue-500 h-1.5 rounded-full"
                                        ></motion.div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

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
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {bills.map((bill) => (
                        <Card key={bill.id} className="relative overflow-hidden group hover:border-orange-200 transition-colors">
                            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                <div className={`p-3 rounded-xl ${bill.color}`}>
                                    <bill.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <CardTitle className="text-base">{bill.provider}</CardTitle>
                                    <CardDescription>{bill.type}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between items-end mt-4">
                                    <div>
                                        <p className="text-sm text-slate-500 mb-1">Total Amount</p>
                                        <p className="text-2xl font-bold text-slate-900">{bill.amount}</p>
                                    </div>
                                    <div className="text-right">
                                        {bill.status === "Due" ? (
                                            <>
                                                <p className="text-xs font-semibold text-red-500 mb-2">Due in {bill.dueDate}</p>
                                                <button
                                                    onClick={() => handlePayBill(bill.id)}
                                                    className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
                                                >
                                                    Pay Now
                                                </button>
                                            </>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded-lg text-sm">
                                                Paid <CheckCircle className="h-4 w-4" />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Add New Biller */}
                    <button className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-6 text-slate-400 hover:border-orange-200 hover:text-orange-600 hover:bg-orange-50/50 transition-all min-h-[200px] group">
                        <div className="bg-slate-100 p-4 rounded-full mb-3 group-hover:bg-orange-100 transition-colors">
                            <Plus className="h-6 w-6" />
                        </div>
                        <span className="font-bold">Link New Utility Service</span>
                    </button>
                </div>
            )}

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
