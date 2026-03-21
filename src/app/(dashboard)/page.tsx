'use client';

import React from 'react';
import { 
  Plus, 
  Search, 
  ArrowUpRight, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  Zap,
  CheckCircle2,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MOCK_STATS } from '@/lib/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const chartData = [
  { name: 'Mon', ctr: 2.1 },
  { name: 'Tue', ctr: 2.3 },
  { name: 'Wed', ctr: 2.2 },
  { name: 'Thu', ctr: 2.5 },
  { name: 'Fri', ctr: 2.8 },
  { name: 'Sat', ctr: 3.1 },
  { name: 'Sun', ctr: 3.2 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Platform Overview</h1>
          <p className="text-white/40 text-sm">Welcome back. Your autonomous optimizations have generated <span className="text-blue-400 font-semibold">+24.5% CTR lift</span> this week.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-white/5 bg-white/5 hover:bg-white/10 text-white">
             Quick Sync
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
             <Plus className="w-4 h-4 mr-2" /> New Experiment
          </Button>
        </div>
      </div>

      {/* ── Key Metrics ──────────────────────────────────────────────────────── */}
      <div className="grid md:grid-cols-4 gap-4">
         <Card className="bg-black/40 border-white/5 overflow-hidden relative group">
            <div className="absolute inset-0 bg-blue-600/5 transition-opacity group-hover:opacity-10 opacity-0" />
            <CardHeader className="pb-2">
              <CardDescription className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Health Score</CardDescription>
              <CardTitle className="text-3xl font-bold flex items-baseline gap-2">
                42 <span className="text-xs text-red-500 font-medium">Critical</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
               <Progress value={42} className="h-1 bg-white/5 [&>div]:bg-red-500" />
               <p className="text-[10px] text-white/20">Last sync 2 hours ago</p>
            </CardContent>
         </Card>

         <Card className="bg-black/40 border-white/5 overflow-hidden relative group">
            <div className="absolute inset-0 bg-emerald-600/5 transition-opacity group-hover:opacity-10 opacity-0" />
            <CardHeader className="pb-2">
              <CardDescription className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Active Tests</CardDescription>
              <CardTitle className="text-3xl font-bold flex items-baseline gap-2">
                12 <span className="text-xs text-emerald-500 font-medium">+2 today</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
               <div className="flex gap-1">
                 {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="h-1 flex-1 bg-emerald-600/30 rounded-full overflow-hidden">
                    <div className={`h-full bg-emerald-500 ${i < 4 ? 'w-full' : 'w-0'}`} />
                 </div>)}
               </div>
               <p className="text-[10px] text-white/20">6 ending in 48h</p>
            </CardContent>
         </Card>

         <Card className="bg-black/40 border-white/5 overflow-hidden relative group">
            <div className="absolute inset-0 bg-blue-600/5 transition-opacity group-hover:opacity-10 opacity-0" />
            <CardHeader className="pb-2">
              <CardDescription className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Total Lift</CardDescription>
              <CardTitle className="text-3xl font-bold flex items-baseline gap-2">
                24.5% <span className="text-xs text-blue-400 font-medium">↑ 3.2%</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
               <Progress value={75} className="h-1 bg-white/5 [&>div]:bg-blue-600" />
               <p className="text-[10px] text-white/20">Vs. Original Feed Control</p>
            </CardContent>
         </Card>

         <Card className="bg-black/40 border-white/5 overflow-hidden relative group">
             <div className="absolute inset-0 bg-purple-600/5 transition-opacity group-hover:opacity-10 opacity-0" />
            <CardHeader className="pb-2">
              <CardDescription className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Est. Impact</CardDescription>
              <CardTitle className="text-3xl font-bold flex items-baseline gap-2">
                €12,450 <span className="text-xs text-purple-400 font-medium">Revenue</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
               <Progress value={60} className="h-1 bg-white/5 [&>div]:bg-purple-600" />
               <p className="text-[10px] text-white/20">Calculated from CTR Gap × CPC</p>
            </CardContent>
         </Card>
      </div>

      {/* ── Main Charts Area ──────────────────────────────────────────────────── */}
      <div className="grid md:grid-cols-3 gap-6">
         <Card className="md:col-span-2 bg-black/40 border-white/5 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">CTR Optimization Performance</h3>
                <p className="text-white/40 text-xs">Proprietary performance data compared across your category</p>
              </div>
              <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/5 gap-1">
                 <Zap className="w-3 h-3 fill-current" /> Above the Line
              </Badge>
            </div>
            
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorCtr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: 'rgba(255,255,255,0.2)', fontSize: 10}} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: 'rgba(255,255,255,0.2)', fontSize: 10}}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '10px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="ctr" 
                    stroke="#2563eb" 
                    fillOpacity={1} 
                    fill="url(#colorCtr)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
         </Card>

         <Card className="bg-black/40 border-white/5 p-6 overflow-hidden relative">
             <div className="absolute top-0 right-0 p-4 -translate-y-4 translate-x-4 opacity-10">
                <BarChart3 className="w-32 h-32" />
             </div>
             <h3 className="text-lg font-bold mb-6">Win Rate by Strategy</h3>
             <div className="space-y-6">
                {[
                  { name: 'Brand-First', win: 82, lift: 28 },
                  { name: 'Attribute-First', win: 74, lift: 21 },
                  { name: 'Semantic-Rich', win: 65, lift: 18 },
                  { name: 'SKU/Model', win: 42, lift: 9 },
                ].map((strat, i) => (
                  <div key={i} className="space-y-2">
                     <div className="flex justify-between items-end">
                        <span className="text-xs font-semibold text-white/50">{strat.name}</span>
                        <span className="text-xs font-bold text-emerald-400">{strat.win}% Win</span>
                     </div>
                     <Progress value={strat.win} className="h-1.5 bg-white/5 [&>div]:bg-gradient-to-r [&>div]:from-blue-600 [&>div]:to-emerald-500" />
                     <p className="text-[10px] text-white/20">Avg. Lift: <span className="text-blue-400">+{strat.lift}%</span></p>
                  </div>
                ))}
             </div>
         </Card>
      </div>

      {/* ── Active Experiments Table ─────────────────────────────────────────── */}
      <Card className="bg-black/40 border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
           <h3 className="text-lg font-bold">Active Title Experiments</h3>
           <div className="flex items-center gap-2">
             <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input 
                  type="text" 
                  placeholder="Filter experiments..." 
                  className="bg-white/5 border border-white/10 rounded-md py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/50 w-64"
                />
             </div>
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-white/[0.02] text-white/30 border-b border-white/5">
                <th className="px-6 py-4 font-semibold text-[10px] uppercase tracking-widest">Product</th>
                <th className="px-6 py-4 font-semibold text-[10px] uppercase tracking-widest text-center">Control CTR</th>
                <th className="px-6 py-4 font-semibold text-[10px] uppercase tracking-widest text-center">Variant B CTR</th>
                <th className="px-6 py-4 font-semibold text-[10px] uppercase tracking-widest text-center">Lift</th>
                <th className="px-6 py-4 font-semibold text-[10px] uppercase tracking-widest text-right">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: 'Ultra-Light Trekking Boots', a: 1.2, b: 1.8, lift: 50, conf: 98 },
                { name: 'Titanium Camping Stove', a: 2.4, b: 3.1, lift: 29, conf: 82 },
                { name: '4-Season expedition Tent', a: 0.8, b: 0.9, lift: 12, conf: 45 },
                { name: 'Compact Water Filter 2.0', a: 3.2, b: 4.5, lift: 40, conf: 92 },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                     <span className="font-medium text-white/80 group-hover:text-blue-400 transition-colors uppercase tracking-tight text-[11px]">{row.name}</span>
                  </td>
                  <td className="px-6 py-4 text-center text-white/40">{row.a}%</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">
                       {row.b}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-blue-400 font-bold">+{row.lift}%</td>
                  <td className="px-6 py-4 text-right pr-6">
                    <div className="inline-flex items-center gap-2">
                       <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: `${row.conf}%` }} />
                       </div>
                       <span className="text-[10px] text-white/30">{row.conf}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-black/20 border-t border-white/5 text-center">
           <Button variant="ghost" size="sm" className="text-white/30 hover:text-white hover:bg-white/5 text-[10px] uppercase tracking-widest">
              View All 42 Active Tests <ArrowUpRight className="ml-2 w-3 h-3" />
           </Button>
        </div>
      </Card>
    </div>
  );
}
