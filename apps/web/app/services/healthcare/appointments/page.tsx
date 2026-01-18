"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Star, X } from "lucide-react";

export default function AppointmentsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

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
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900">Find a Doctor</h1>
                <p className="text-slate-500 mt-1">Book appointments with top specialists across the city</p>
            </div>

            {/* Search Bar */}
            <div className="relative group mb-8">
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

            {/* Booking Modal */}
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
        </div>
    );
}
