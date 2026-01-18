"use client";

import { ServiceSidebar } from "@/components/service-sidebar";
import { AlertTriangle, Home, LayoutDashboard, Zap } from "lucide-react";

export default function CityLayout({ children }: { children: React.ReactNode }) {
    const links = [
        { label: "Dashboard", href: "/services/city", icon: LayoutDashboard },
        { label: "Grievances", href: "/services/city/grievances", icon: Home },
        { label: "Pay Bills", href: "/services/city/utilities", icon: Zap },
        { label: "Traffic AI", href: "/services/city/traffic", icon: AlertTriangle },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50">
            <ServiceSidebar title="AMC Connect" links={links} />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}
