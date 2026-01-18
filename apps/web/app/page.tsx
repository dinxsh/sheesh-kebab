"use client";

import Link from "next/link";
import { ArrowRight, Shield, Globe, Users, ChevronRight, Activity, Zap, Server, Lock, MousePointer2, LayoutDashboard, ShieldCheck, TrendingUp } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// --- Animated Components ---

const AuroraBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden bg-slate-950">
    <div className="absolute -inset-[10px] opacity-50 blur-[60px] invert filter">
      <div className="animate-blob mix-blend-multiply absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full opacity-70 blur-3xl filter"></div>
      <div className="animate-blob animation-delay-2000 mix-blend-multiply absolute top-0 -right-4 w-96 h-96 bg-indigo-500 rounded-full opacity-70 blur-3xl filter"></div>
      <div className="animate-blob animation-delay-4000 mix-blend-multiply absolute -bottom-32 left-20 w-96 h-96 bg-cyan-500 rounded-full opacity-70 blur-3xl filter"></div>
    </div>
    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
  </div>
);

const CountUp = ({ from, to, label, suffix = "" }: { from: number, to: number, label: string, suffix?: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = Math.floor(value).toLocaleString();
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return (
    <div className="flex flex-col items-center">
      <p className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
        <span ref={nodeRef} />{suffix}
      </p>
      <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-2">{label}</p>
    </div>
  );
};

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative group border border-slate-800 bg-slate-900 overflow-hidden rounded-3xl ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

const MockMarquee = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex overflow-x-hidden border-y border-slate-800 bg-slate-950/50 py-8 backdrop-blur-sm">
    <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
      {children}
      {children}
    </div>
    <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-950 to-transparent pointer-events-none"></div>
    <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-950 to-transparent pointer-events-none"></div>
  </div>
);

// --- Main Page Component ---

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        <AuroraBackground />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center max-w-6xl mx-auto px-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-800/50 backdrop-blur-md shadow-2xl mb-10 hover:border-indigo-500/50 transition-colors cursor-default animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-slate-300">National DPI Ecosystem • Live Prototype</span>
          </div>

          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white mb-8 leading-[0.85] drop-shadow-2xl">
            Governance <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-indigo-400 via-white to-slate-400">Reimagined.</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-16 font-light leading-relaxed">
            A unified, AI-powered command center connecting <span className="text-white font-medium border-b border-indigo-500/30 pb-0.5">Healthcare</span>, <span className="text-white font-medium border-b border-green-500/30 pb-0.5">Agriculture</span>, and <span className="text-white font-medium border-b border-orange-500/30 pb-0.5">Urban Services</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/dashboard" className="group relative px-8 py-4 rounded-full bg-white text-slate-950 font-bold text-lg hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all flex items-center gap-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <LayoutDashboard className="h-5 w-5 relative z-10" />
              <span className="relative z-10">Access Command Center</span>
              <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/profile" className="px-8 py-4 rounded-full bg-slate-800/50 text-white border border-slate-700 font-bold text-lg hover:bg-slate-800 hover:border-slate-500 transition-all backdrop-blur-sm flex items-center gap-3">
              <ShieldCheck className="h-5 w-5" /> Citizen Profile
            </Link>
          </div>
        </motion.div>

        {/* Live Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24 relative z-10 border-t border-slate-800/50 pt-12 px-8 bg-slate-950/30 backdrop-blur-sm rounded-t-3xl"
        >
          <CountUp from={0} to={1284} label="Active Nodes" />
          <CountUp from={0} to={852930} label="Citizens Served" />
          <CountUp from={0} to={99.9} label="System Uptime" suffix="%" />
          <CountUp from={0} to={45} label="Ministries Linked" />
        </motion.div>
      </section>

      {/* Marquee */}
      <MockMarquee>
        {["HEALTH", "AGRICULTURE", "URBAN", "PAYMENTS", "IDENTITY", "EDUCATION", "LOGISTICS", "POWER"].map((txt, i) => (
          <span key={i} className="text-4xl font-black text-slate-800 mx-8 tracking-tighter opacity-70 hover:opacity-100 hover:text-slate-600 transition-colors cursor-default">{txt}</span>
        ))}
      </MockMarquee>

      {/* Bento Grid Features */}
      <section className="py-32 px-4 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500 tracking-tight mb-6">Engineered for Scale</h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">Built on a microservices mesh with real-time interoperability and integrated AI decision support.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
          {/* Big Card */}
          <SpotlightCard className="md:col-span-2 row-span-2 p-10 group">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="p-3 bg-indigo-500/10 w-fit rounded-xl border border-indigo-500/20 mb-8">
                  <Globe className="h-8 w-8 text-indigo-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Hyper-Scale Registry</h3>
                <p className="text-slate-400 text-lg max-w-lg leading-relaxed">
                  Automatically discovers and connects thousands of departmental nodes.
                  Featuring <span className="text-indigo-400 font-bold">Edge Caching</span> for sub-20ms latency across rural networks.
                </p>
              </div>

              {/* Abstract Visualization */}
              <div className="w-full h-64 mt-8 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>

                {/* Simulated Activity Dots */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-indigo-500 rounded-full box-shadow-glow"
                    initial={{ x: (i * 75) % 400, y: (i * 45) % 200, opacity: 0 }}
                    animate={{
                      x: [(i * 75) % 400, (i * 95 + 100) % 400],
                      y: [(i * 45) % 200, (i * 65 + 50) % 200],
                      opacity: [0, 1, 0]
                    }}
                    transition={{ duration: 3 + (i * 0.5), repeat: Infinity, ease: "linear" }}
                  />
                ))}
              </div>
            </div>
          </SpotlightCard>

          {/* Small Card 1 */}
          <SpotlightCard className="p-8">
            <div className="p-3 bg-emerald-500/10 w-fit rounded-xl mb-6 border border-emerald-500/20">
              <Shield className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Zero Trust</h3>
            <p className="text-slate-400">Verifiable credentials via Jan Parichay with audit logs.</p>
          </SpotlightCard>

          {/* Small Card 2 */}
          <SpotlightCard className="p-8">
            <div className="p-3 bg-orange-500/10 w-fit rounded-xl mb-6 border border-orange-500/20">
              <Zap className="h-6 w-6 text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Instant Sync</h3>
            <p className="text-slate-400">Event-driven architecture for real-time alerts.</p>
          </SpotlightCard>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 relative text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent pointer-events-none"></div>
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-12">
          Ready to deploy?
        </h2>
        <Link href="/dashboard" className="inline-block px-12 py-6 rounded-full bg-white text-slate-950 font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_60px_-15px_rgba(255,255,255,0.3)]">
          Launch Command Center
        </Link>
      </section>
    </div>
  );
}
