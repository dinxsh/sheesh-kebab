"use client";

import { ServiceSidebar } from "@/components/service-sidebar";
import { Activity, Calendar, FileText, LayoutDashboard } from "lucide-react";

export default function HealthcareLayout({ children }: { children: React.ReactNode }) {
    const links = [
        { label: "Overview", href: "/services/healthcare", icon: LayoutDashboard },
        { label: "Priorities / Visits", href: "/services/healthcare/records", icon: FileText },
        { label: "Find Doctor", href: "/services/healthcare/appointments", icon: Calendar },
        { label: "Epidemic Watch", href: "/services/healthcare/epidemic-watch", icon: Activity },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50">
            <ServiceSidebar title="Amdavad Health" links={links} />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}
