"use client";

import { useState } from "react";
import { CheckCircle, Flame, Lightbulb, MapPin, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function UtilitiesPage() {
    const [bills, setBills] = useState([
        { id: 1, provider: "Torrent Power", type: "Electricity", amount: "₹4,250", dueDate: "2 Days", status: "Due", icon: Lightbulb, color: "text-yellow-600 bg-yellow-100" },
        { id: 2, provider: "Adani Gas", type: "Piped Gas", amount: "₹890", dueDate: "Paid", status: "Paid", icon: Flame, color: "text-rose-600 bg-rose-100" },
        { id: 3, provider: "AMC Property Tax", type: "Tax", amount: "₹12,000", dueDate: "30 Days", status: "Due", icon: MapPin, color: "text-blue-600 bg-blue-100" },
    ]);

    const handlePayBill = (id: number) => {
        setBills(bills.map(b => b.id === id ? { ...b, status: "Paid", dueDate: "Paid" } : b));
        alert("Payment Successful via UPI!");
    };

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900">Utility Payments</h1>
                <p className="text-slate-500 mt-1">Pay your electricity, gas, and property tax bills</p>
            </div>

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
        </div>
    );
}
