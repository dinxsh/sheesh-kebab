"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarLink {
    label: string;
    href: string;
    icon: LucideIcon;
}

interface ServiceSidebarProps {
    title: string;
    links: SidebarLink[];
    className?: string; // Add className prop for flexibility
}

export function ServiceSidebar({ title, links, className }: ServiceSidebarProps) {
    const pathname = usePathname();

    return (
        <div className={cn("w-64 bg-white border-r border-slate-200 h-screen flex-shrink-0 sticky top-0 hidden lg:block", className)}>
            <div className="p-6 border-b border-slate-100">
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
            </div>
            <nav className="p-4 space-y-2">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                                isActive
                                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <link.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-slate-400")} />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
