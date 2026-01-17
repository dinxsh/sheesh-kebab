"use client";

import Link from "next/link";
import { ArrowRight, Shield, Globe, Users, ChevronRight, Activity, Zap, Server, Lock, MousePointer2 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Mock Marquee Component
const Marquee = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex overflow-x-hidden border-y border-slate-100 bg-slate-50/50 py-12">
    <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
      {children}
      {children}
    </div>
    <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
    <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
  </div>
);

export default function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* Hero Section with Grid Pattern */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center max-w-5xl mx-auto px-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm shadow-sm mb-8 hover:border-indigo-200 transition-colors cursor-default">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
            <span className="text-sm font-medium text-slate-600">Unified Digital Experience</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.9]">
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-800 via-slate-900 to-slate-900">Governance.</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-12 font-light">
            One Identity. One Portal. <span className="text-slate-900 font-medium">Infinite Possibilities.</span> <br />
            Seamlessly connecting citizens to Healthcare, Agriculture, and Urban Services.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="px-8 py-4 rounded-full bg-slate-900 text-white font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 hover:-translate-y-1 flex items-center gap-2">
              Launch Dashboard <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/services" className="px-8 py-4 rounded-full bg-white text-slate-900 border border-slate-200 font-bold text-lg hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center gap-2">
              View Services
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Marquee Section */}
      <section className="py-2">
        <Marquee>
          <span className="text-2xl font-bold text-slate-300 mx-8">HEALTHCARE</span>
          <span className="text-2xl font-bold text-slate-300 mx-8">AGRICULTURE</span>
          <span className="text-2xl font-bold text-slate-300 mx-8">SMART CITIES</span>
          <span className="text-2xl font-bold text-slate-300 mx-8">IDENTITY</span>
          <span className="text-2xl font-bold text-slate-300 mx-8">PAYMENTS</span>
          <span className="text-2xl font-bold text-slate-300 mx-8">GOVERNANCE</span>
        </Marquee>
      </section>

      {/* Bento Grid Features */}
      <section className="py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">Architected for Scale</h2>
          <p className="text-lg text-slate-500">Microservices architecture meets modern design.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px] md:h-[500px]">
          {/* Big Card */}
          <div className="md:col-span-2 row-span-2 relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-8 group hover:border-indigo-200 transition-colors">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="p-3 bg-white w-fit rounded-xl border border-slate-200 shadow-sm mb-6">
                  <Globe className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">National Scale Registry</h3>
                <p className="text-slate-500 max-w-md">Real-time service discovery and load balancing handling millions of requests with sub-millisecond latency using Redis caching.</p>
              </div>
              <div className="w-full h-48 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative">
                {/* Fake abstract UI */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <div className="w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Small Card 1 */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 group hover:border-emerald-200 transition-colors">
            <div className="p-3 bg-emerald-50 w-fit rounded-xl mb-4 text-emerald-600">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Secure</h3>
            <p className="text-sm text-slate-500">JWT Authentication & RBAC baked in.</p>
          </div>

          {/* Small Card 2 */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 group hover:border-orange-200 transition-colors">
            <div className="p-3 bg-orange-50 w-fit rounded-xl mb-4 text-orange-600">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Fast</h3>
            <p className="text-sm text-slate-500">Powered by NestJS & Next.js 14.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e51a_1px,transparent_1px),linear-gradient(to_bottom,#4f46e51a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
          <h2 className="text-5xl font-black tracking-tight mb-8">Ready to Transform?</h2>
          <p className="text-xl text-slate-400 mb-12">Join the digital revolution. Experience the prototype today.</p>
          <Link href="/dashboard" className="inline-block px-10 py-5 rounded-full bg-indigo-600 font-bold text-lg hover:bg-indigo-500 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-indigo-900/50">
            Enter Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}
