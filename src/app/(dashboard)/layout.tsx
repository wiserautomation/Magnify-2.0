'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  Package, 
  Zap, 
  Lightbulb, 
  Settings, 
  LayoutDashboard,
  LogOut,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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

  return (
    <div className="flex h-screen bg-[#050505] text-white">
      {/* ── Sidebar ──────────────────────────────────────────────────────────── */}
      <aside className="w-64 border-r border-white/5 bg-black/40 flex flex-col backdrop-blur-md">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center font-bold text-white text-[10px] shadow-[0_0_10px_rgba(37,99,235,0.4)]">M</div>
            <span className="font-bold tracking-tight text-lg">Magnify <span className="text-blue-500">2.0</span></span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all hover:bg-white/5",
                  isActive ? "bg-blue-600/10 text-blue-400 font-medium" : "text-white/40"
                )}
              >
                <item.icon className={cn("w-4 h-4", isActive ? "text-blue-400" : "text-white/40")} />
                {item.name}
                {item.name === 'Dashboard' && isActive && (
                   <motion.div layoutId="active" className="ml-auto w-1 h-1 rounded-full bg-blue-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/10 mb-4">
             <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                <TrendingUp className="w-3 h-3" />
                <span>Collective IQ</span>
             </div>
             <p className="text-[11px] text-white/50 leading-normal mb-3">
                Your store is connected to 512,042 experiment outcomes.
             </p>
             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[0.14%] bg-blue-500 rounded-full" />
             </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                <div className="flex items-center gap-3 shrink-0">
                  <Avatar className="h-8 w-8 bg-zinc-800 border border-white/10">
                    <AvatarImage src={user?.photoURL} />
                    <AvatarFallback className="bg-blue-600/20 text-blue-400 text-[10px]">
                      {user?.displayName?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left overflow-hidden">
                    <p className="text-xs font-semibold text-white/80 truncate leading-none mb-1">
                      {user?.displayName || 'User'}
                    </p>
                    <p className="text-[10px] text-white/30 truncate uppercase tracking-widest leading-none">
                      Free Account
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-3 h-3 text-white/20" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-white/10 text-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/5" />
              <DropdownMenuItem className="cursor-pointer hover:bg-white/5" onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* ── Main Content ──────────────────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
           {children}
        </div>
      </main>
    </div>
  );
}
