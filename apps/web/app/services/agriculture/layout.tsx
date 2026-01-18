"use client";

import { ServiceSidebar } from "@/components/service-sidebar";
import { FileText, Scan, Sprout, TrendingUp } from "lucide-react";

export default function AgricultureLayout({ children }: { children: React.ReactNode }) {
    const links = [
        { label: "Dashboard", href: "/services/agriculture", icon: Sprout },
        { label: "Mandi Rates", href: "/services/agriculture/mandi-rates", icon: TrendingUp },
        { label: "Crop Doctor", href: "/services/agriculture/crop-doctor", icon: Scan },
        { label: "Schemes", href: "/services/agriculture/schemes", icon: FileText },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50">
            <ServiceSidebar title="Krishi Command" links={links} />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}
