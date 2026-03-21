'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Database, 
  Bell, 
  CreditCard, 
  Zap,
  Globe,
  RefreshCw,
  Lock,
  ChevronRight,
  User as UserIcon,
  CheckCircle2,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/contexts/AuthContext';

export default function SettingsPage() {
  const { user, signOut } = useAuth();
  const [autopilot, setAutopilot] = useState(true);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 uppercase">Core Configuration</h1>
        <p className="text-white/40 text-sm">Managing store-level parameters and API integrations.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
         <div className="md:col-span-2 space-y-6">
            
            {/* ── Automation Policy ─────────────────────────────────────────── */}
            <Card className="bg-zinc-900/40 border-white/5 overflow-hidden">
               <CardHeader>
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-blue-500" />
                     </div>
                     <div>
                        <CardTitle className="text-sm font-bold uppercase tracking-tight">Automation Policy</CardTitle>
                        <CardDescription className="text-[10px]">Configure how the autonomous engine manages your catalog.</CardDescription>
                     </div>
                  </div>
               </CardHeader>
               <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5">
                     <div className="space-y-1">
                        <p className="text-xs font-bold text-white">Full Autopilot</p>
                        <p className="text-[10px] text-white/40">Automatically identify, test, and promote winning title variants with >95% confidence.</p>
                     </div>
                     <Switch checked={autopilot} onCheckedChange={setAutopilot} className="data-[state=checked]:bg-blue-600" />
                  </div>

                  <div className="space-y-4 pt-2">
                     <div className="flex items-center justify-between group">
                        <div className="space-y-0.5">
                           <p className="text-xs font-medium text-white/80 group-hover:text-white transition-colors">A/B Test Duration</p>
                           <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Recommended: 14 Days</p>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-xs font-bold text-blue-500">14 Days</span>
                           <ChevronRight className="w-3 h-3 text-white/10" />
                        </div>
                     </div>
                     <Separator className="bg-white/5" />
                     <div className="flex items-center justify-between group">
                        <div className="space-y-0.5">
                           <p className="text-xs font-medium text-white/80">Min Confidence Level</p>
                           <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Standard: 90%</p>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-xs font-bold text-white/60">95%</span>
                           <ChevronRight className="w-3 h-3 text-white/10" />
                        </div>
                     </div>
                     <Separator className="bg-white/5" />
                     <div className="flex items-center justify-between group">
                        <div className="space-y-0.5">
                           <p className="text-xs font-medium text-white/80">Max Concurrent Tests</p>
                           <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Based on Impression Volume</p>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-xs font-bold text-white/60">50 SKUs</span>
                           <ChevronRight className="w-3 h-3 text-white/10" />
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* ── GMC Integration ───────────────────────────────────────────── */}
            <Card className="bg-zinc-900/40 border-white/5 overflow-hidden">
               <CardHeader>
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-lg bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center">
                        <Database className="w-4 h-4 text-emerald-500" />
                     </div>
                     <div>
                        <CardTitle className="text-sm font-bold uppercase tracking-tight">Google Merchant Center</CardTitle>
                        <CardDescription className="text-[10px]">Direct connection to your GMC Content API.</CardDescription>
                     </div>
                  </div>
               </CardHeader>
               <CardContent className="space-y-6">
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-emerald-600/5 border border-emerald-500/10">
                     <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                        <div className="space-y-0.5">
                           <p className="text-[11px] font-bold text-white uppercase tracking-tight">Active Connection</p>
                           <p className="text-[10px] text-emerald-400/60 font-medium">Merchant ID: 123-456-7890</p>
                        </div>
                     </div>
                     <Button size="sm" variant="ghost" className="h-8 text-[10px] uppercase font-bold tracking-widest text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/5">
                        Refresh <RefreshCw className="w-3 h-3 ml-2" />
                     </Button>
                  </div>

                  <div className="flex items-center gap-4 text-[10px] text-white/30">
                     <div className="flex items-center gap-1.5 whitespace-nowrap">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Supplemental Feed Ready
                     </div>
                     <div className="flex items-center gap-1.5 whitespace-nowrap">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> OAuth Scope Verified
                     </div>
                     <div className="flex items-center gap-1.5 whitespace-nowrap">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Daily Sync Active
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* ── Danger Zone ────────────────────────────────────────────────── */}
            <Card className="bg-red-950/20 border-red-500/10 overflow-hidden">
               <CardContent className="p-6 flex items-center justify-between">
                  <div className="space-y-1">
                     <p className="text-xs font-bold text-red-500 uppercase tracking-tight">Danger Zone</p>
                     <p className="text-[10px] text-red-500/40 leading-relaxed">Disconnecting your GMC account will pause all active experiments and potentially revert optimized titles.</p>
                  </div>
                  <Button variant="outline" className="border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/10">
                     Disconnect Account
                  </Button>
               </CardContent>
            </Card>
         </div>

         {/* ── Sidebar Settings ──────────────────────────────────────────────── */}
         <div className="space-y-6">
            {/* User Profile */}
            <Card className="bg-white/5 border-white/5 p-6">
               <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-2xl bg-zinc-800 border border-white/10 flex items-center justify-center relative group">
                     <UserIcon className="w-10 h-10 text-white/20 group-hover:text-blue-400 transition-colors" />
                     <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-blue-600 border-4 border-zinc-950 flex items-center justify-center">
                        <Lock className="w-3 h-3 text-white" />
                     </div>
                  </div>
                  <div>
                     <h3 className="text-sm font-bold uppercase tracking-tight">{user?.displayName || 'Alejandro Peghin'}</h3>
                     <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold mt-1">Growth Account</p>
                  </div>
                  <div className="w-full h-px bg-white/5" />
                  <Button size="sm" variant="outline" className="w-full border-white/5 text-[10px] uppercase font-bold tracking-widest h-9" onClick={signOut}>
                     Logout Sessions
                  </Button>
               </div>
            </Card>

            {/* Resource Limits */}
            <Card className="bg-white/5 border-white/5 p-6">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-6">Resource Allocation</h3>
               <div className="space-y-6">
                  <div className="space-y-2">
                     <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-white/40 uppercase">Daily API Calls</span>
                        <span>4.2k / 10k</span>
                     </div>
                     <Progress value={42} className="h-1 bg-white/5 [&>div]:bg-emerald-500" />
                  </div>
                  <Separator className="bg-white/5" />
                  <div className="space-y-2">
                     <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-white/40 uppercase">AI Title Credits</span>
                        <span>14.5k / 20k</span>
                     </div>
                     <Progress value={72} className="h-1 bg-white/5 [&>div]:bg-blue-600" />
                  </div>
               </div>
               <Button className="w-full mt-8 bg-blue-600/10 text-blue-400 border border-blue-500/10 hover:bg-blue-600/20 text-[10px] font-bold uppercase tracking-widest h-9">
                  Increase Quotas <ExternalLink className="w-3 h-3 ml-2" />
               </Button>
            </Card>
         </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
