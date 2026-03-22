'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { 
  Package, 
  Zap, 
  Lightbulb, 
  Settings, 
  LayoutDashboard,
  LogOut,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'A/B Tests', href: '/dashboard/experiments', icon: Zap },
  { name: 'Intelligence', href: '/dashboard/intelligence', icon: Lightbulb },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  // Dummy data for demonstration, replace with actual user data
  const strat = { win: 75, lift: 12.5 };

  return (
    <div className="flex h-screen bg-[#020203] text-white font-sans selection:bg-blue-500/30">
      {/* ── Background Decoration ────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 blur-[120px] rounded-full" />
      </div>

      {/* ── Sidebar ──────────────────────────────────────────────────────────── */}
      <aside className="w-64 border-r border-white/5 bg-black/20 flex flex-col backdrop-blur-3xl z-20 relative">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform duration-500">
               M
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-lg leading-none">Magnify <span className="text-blue-500">2.0</span></span>
              <span className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-bold mt-1">Autonomous Trading</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs transition-all relative overflow-hidden",
                  isActive 
                    ? "bg-white/5 text-white font-semibold border border-white/5" 
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.02]"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent pointer-events-none" 
                  />
                )}
                <item.icon className={cn(
                  "w-4 h-4 transition-colors duration-300", 
                  isActive ? "text-blue-500" : "text-white/20 group-hover:text-white/40"
                )} />
                <span className="relative z-10 uppercase tracking-widest">{item.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-indicator"
                    className="ml-auto w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" 
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 mt-auto">
          {/* Progress Card */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-6 relative overflow-hidden group/card shadow-2xl">
             <div className="absolute inset-0 bg-blue-600/[0.02] opacity-0 group-hover/card:opacity-100 transition-opacity" />
             <div className="flex items-center gap-2 mb-3">
                <div className="p-1 px-2 rounded-md bg-blue-500/10 border border-blue-500/20">
                  <TrendingUp className="w-3 h-3 text-blue-400" />
                </div>
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Global IQ</span>
             </div>
             <p className="text-[11px] text-white/40 leading-relaxed mb-4">
                Connected to <span className="text-white">512k+</span> experiment nodes.
             </p>
             <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '14%' }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                />
             </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-3 p-2 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5 group">
                <div className="relative">
                  <Avatar className="h-9 w-9 bg-zinc-900 border border-white/10 p-0.5">
                    <AvatarImage src={user?.photoURL} className="rounded-lg" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-[10px] rounded-lg">
                      {user?.displayName?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#050505] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-xs font-bold text-white/90 truncate leading-none mb-1 group-hover:text-white transition-colors">
                    {user?.displayName || 'User'}
                  </p>
                  <p className="text-[9px] text-white/30 uppercase tracking-[0.1em] font-bold">
                    Pro Strategist
                  </p>
                </div>
                <ChevronRight className="w-3 h-3 text-white/10 group-hover:text-white/30 transition-colors" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right" className="w-64 bg-[#0a0a0c]/90 backdrop-blur-xl border-white/10 text-white p-2 rounded-2xl shadow-2xl">
              <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-white/40 pb-2">Session Control</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/5" />
              <DropdownMenuItem className="cursor-pointer hover:bg-white/5 rounded-xl py-2 text-xs" onClick={signOut}>
                <LogOut className="mr-3 h-3.5 w-3.5 text-red-400" />
                Terminate Session
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* ── Main Content ──────────────────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto relative z-10 scrollbar-hide">
        <header className="h-16 border-b border-white/5 px-8 flex items-center justify-between sticky top-0 bg-black/10 backdrop-blur-md z-30">
           <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              <span className="text-blue-500/50">Network</span>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <span>Spain_Node_12</span>
           </div>
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                 <div className="text-right">
                    <p className="text-[9px] text-white/20 uppercase font-bold leading-none mb-1">Status</p>
                    <p className="text-[10px] text-emerald-400 font-bold leading-none">Operational</p>
                 </div>
                 <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
              </div>
           </div>
        </header>
        <div className="max-w-[1400px] mx-auto p-10">
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
           >
             {children}
           </motion.div>
        </div>
      </main>
    </div>
  );
}
