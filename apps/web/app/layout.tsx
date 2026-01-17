import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Changed from localFont
import "./globals.css";
import Link from "next/link";
import { Zap, Grid, LayoutDashboard, ShieldCheck, Layers } from "lucide-react";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "Ingenious DPI",
  description: "National-Scale Digital Public Infrastructure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen bg-white text-slate-900`}
      >
        <div className="flex flex-col min-h-screen">
          {/* Top Navbar */}
          <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <div className="flex-shrink-0 flex items-center gap-2">
                  <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-slate-900 p-1.5 rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
                      <Zap className="h-4 w-4 fill-current" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-900">Ingenious<span className="text-indigo-600">DPI</span></span>
                  </Link>
                </div>

                <div className="hidden md:flex space-x-8 items-center">
                  <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                  <Link href="/services" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-2">
                    <Grid className="h-4 w-4" /> Services
                  </Link>
                  <Link href="/admin" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" /> Admin
                  </Link>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-xs font-semibold text-slate-600">System Online</span>
                  </div>
                  <button className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Enhanced Footer */}
          <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-2 md:col-span-1">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-indigo-600 p-1 rounded-md text-white">
                      <Zap className="h-4 w-4 fill-current" />
                    </div>
                    <span className="font-bold text-lg text-slate-900">Ingenious<span className="text-indigo-600">DPI</span></span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Building the next generation of digital public infrastructure for a connected nation.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-4">Platform</h4>
                  <ul className="space-y-2 text-sm text-slate-500">
                    <li><Link href="/services/healthcare" className="hover:text-indigo-600">Healthcare</Link></li>
                    <li><Link href="/services/agriculture" className="hover:text-indigo-600">Agriculture</Link></li>
                    <li><Link href="/services/city" className="hover:text-indigo-600">Smart City</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-4">Resources</h4>
                  <ul className="space-y-2 text-sm text-slate-500">
                    <li><Link href="#" className="hover:text-indigo-600">Documentation</Link></li>
                    <li><Link href="#" className="hover:text-indigo-600">API Reference</Link></li>
                    <li><Link href="#" className="hover:text-indigo-600">Status</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
                  <ul className="space-y-2 text-sm text-slate-500">
                    <li><Link href="#" className="hover:text-indigo-600">Privacy Policy</Link></li>
                    <li><Link href="#" className="hover:text-indigo-600">Terms of Service</Link></li>
                  </ul>
                </div>
              </div>
              <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-slate-400">© 2026 Ingenious Hackathon Prototype. All rights reserved.</p>
                <div className="flex gap-4">
                  {/* Social icons placeholders */}
                  <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-indigo-600 transition-colors cursor-pointer"><Globe className="h-4 w-4" /></div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
