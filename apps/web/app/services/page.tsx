import Link from "next/link";
import { Stethoscope, Sprout, Building2, ArrowRight } from "lucide-react";

const services = [
    {
        title: "Healthcare",
        description: "Access telemedicine, book appointments, and view digital health records.",
        icon: Stethoscope,
        href: "/services/healthcare",
        color: "indigo",
        accent: "bg-indigo-50 text-indigo-600",
    },
    {
        title: "Agriculture",
        description: "Get crop advisories, check market prices, and apply for government schemes.",
        icon: Sprout,
        href: "/services/agriculture",
        color: "emerald",
        accent: "bg-emerald-50 text-emerald-600",
    },
    {
        title: "Smart City",
        description: "Pay utility bills, file complaints, and access municipal services.",
        icon: Building2,
        href: "/services/city",
        color: "orange",
        accent: "bg-orange-50 text-orange-600",
    },
];

export default function ServicesPage() {
    return (
        <div className="max-w-5xl mx-auto py-12 space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Service Catalogue</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Explore the range of digital public services available to you. Connect seamlessly to healthcare, agriculture, and city departments.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service) => (
                    <Link
                        key={service.title}
                        href={service.href}
                        className="flex flex-col group bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className={`h-16 w-16 rounded-2xl ${service.accent} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                            <service.icon className="h-8 w-8" />
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                        <p className="text-slate-500 text-base leading-relaxed flex-1">{service.description}</p>

                        <div className="mt-8 flex items-center text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            Access Portal <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
