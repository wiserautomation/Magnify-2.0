'use client';

import React from 'react';
import { 
  Plus, 
  ArrowUpRight, 
  Zap,
  BarChart3,
  TrendingUp,
  Cpu,
  Globe,
  Activity,
  ArrowDownRight,
  Sparkles,
  Command,
  Search
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { motion } from 'framer-motion';

const chartData = [
  { name: '01', ctr: 2.1, lift: 1.2 },
  { name: '02', ctr: 2.3, lift: 1.4 },
  { name: '03', ctr: 2.2, lift: 1.3 },
  { name: '04', ctr: 3.5, lift: 2.1 },
  { name: '05', ctr: 2.8, lift: 1.8 },
  { name: '06', ctr: 4.1, lift: 2.8 },
  { name: '07', ctr: 3.9, lift: 2.6 },
  { name: '08', ctr: 4.5, lift: 3.1 },
  { name: '09', ctr: 5.2, lift: 3.8 },
  { name: '10', ctr: 4.8, lift: 3.4 },
  { name: '11', ctr: 5.8, lift: 4.2 },
  { name: '12', ctr: 6.2, lift: 4.5 },
];

const STRATEGY_STATS = [
  { name: 'Brand-First', win: 82, lift: 28, color: '#3b82f6' },
  { name: 'Attribute-First', win: 74, lift: 21, color: '#8b5cf6' },
  { name: 'Semantic-Rich', win: 65, lift: 18, color: '#10b981' },
  { name: 'SKU/Model', win: 42, lift: 9, color: '#f59e0b' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-10 scrollbar-hide">
      {/* ── Dashboard Header ────────────────────────────────────────────────── */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
           <div className="flex items-center gap-2 text-blue-500 mb-2">
              <Command className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Command Center v2.4</span>
           </div>
           <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
              Network <span className="text-blue-500">Intelligence</span>
           </h1>
           <p className="text-white/30 text-sm max-w-xl leading-relaxed">
              Monitoring <span className="text-white/60 font-medium">1,242 active SKUs</span> with autonomous predictive modeling. Real-time arbitrage detected in Home & Garden category.
           </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-12 border-white/5 bg-white/5 hover:bg-white/10 text-white rounded-xl px-6 uppercase text-[10px] font-bold tracking-widest transition-all">
             Audit Reports
          </Button>
          <Button className="h-12 bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] rounded-xl px-6 uppercase text-[10px] font-bold tracking-widest transition-all group">
             <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" /> Deploy Challenger
          </Button>
        </div>
      </section>

      {/* ── High-Level Telemetry ────────────────────────────────────────────── */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: 'Network Health', value: '98.2', sub: 'Optimal State', icon: Activity, color: 'blue', trend: '+0.4%' },
           { label: 'Active Signals', value: '142', sub: 'Live Experiments', icon: Zap, color: 'emerald', trend: '+12' },
           { label: 'Aggregated Lift', value: '24.5%', sub: 'Above Control', icon: TrendingUp, color: 'purple', trend: '↑ 3.2%' },
           { label: 'Value Recouped', value: '€12.4k', sub: 'Est. Impact', icon: Sparkles, color: 'amber', trend: '+€1.2k' },
         ].map((stat, i) => (
           <motion.div
             key={i}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.1 }}
           >
             <Card className="bg-black/40 border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-all shadow-2xl">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                   <stat.icon className="w-16 h-16" />
                </div>
                <div className="relative z-10 flex flex-col h-full">
                   <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] text-white/30 uppercase font-bold tracking-[0.2em]">{stat.label}</p>
                      <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
                         {stat.trend}
                      </span>
                   </div>
                   <h3 className="text-3xl font-bold mb-1 tracking-tight">{stat.value}</h3>
                   <p className="text-[10px] text-white/20 uppercase tracking-widest mt-auto">{stat.sub}</p>
                </div>
                {/* Micro-chart indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/[0.02]">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: '70%' }}
                     transition={{ duration: 1.5, delay: i * 0.2 }}
                     className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                   />
                </div>
             </Card>
           </motion.div>
         ))}
      </section>

      {/* ── Centerpiece Data Visualization ──────────────────────────────────── */}
      <section className="grid lg:grid-cols-3 gap-6">
         <Card className="lg:col-span-2 bg-black/40 border-white/5 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
            {/* Background SVG Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 relative z-10">
               <div>
                  <h3 className="text-xl font-bold text-white mb-1">Performance Velocity</h3>
                  <p className="text-white/30 text-[11px] uppercase tracking-widest">Global CTR Benchmarks vs. Challenger Variants</p>
               </div>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                     <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Network variant</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-white/10" />
                     <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Baseline</span>
                  </div>
               </div>
            </div>

            <div className="h-[350px] w-full relative z-10">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                     <defs>
                        <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#ffffff03" />
                     <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: 'rgba(255,255,255,0.15)', fontSize: 9, fontWeight: 'bold'}}
                        dy={10}
                     />
                     <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: 'rgba(255,255,255,0.15)', fontSize: 9, fontWeight: 'bold'}}
                        dx={-10}
                     />
                     <Tooltip 
                        cursor={{ stroke: '#3b82f633', strokeWidth: 1 }}
                        contentStyle={{ 
                           backgroundColor: 'rgba(5, 5, 5, 0.8)', 
                           backdropFilter: 'blur(12px)',
                           border: '1px solid rgba(255,255,255,0.05)', 
                           borderRadius: '16px', 
                           padding: '12px'
                        }}
                        itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}
                        labelStyle={{ color: 'rgba(255,255,255,0.3)', fontSize: '9px', marginBottom: '4px', textTransform: 'uppercase' }}
                     />
                     <Area 
                        type="monotone" 
                        dataKey="ctr" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#velocityGradient)" 
                        animationDuration={2000}
                     />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </Card>

         <Card className="bg-black/40 border-white/5 p-8 rounded-3xl flex flex-col relative overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-blue-600/[0.01] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-8 relative z-10">
               <h3 className="text-xl font-bold">Strategy IQ</h3>
               <Cpu className="w-5 h-5 text-blue-500/40" />
            </div>
            
            <div className="space-y-8 relative z-10 flex-1">
               {STRATEGY_STATS.map((strat, i) => (
                 <div key={i} className="space-y-3">
                    <div className="flex justify-between items-end">
                       <div className="space-y-1">
                          <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest">{strat.name}</p>
                          <p className="text-sm font-bold text-white/90 leading-none">+{strat.lift}% Median Lift</p>
                       </div>
                       <span className="text-[11px] font-bold text-blue-400">{strat.win}% Win Rate</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         whileInView={{ width: `${strat.win}%` }}
                         viewport={{ once: true }}
                         transition={{ duration: 1.5, delay: i * 0.1 }}
                         style={{ backgroundColor: strat.color }}
                         className="h-full shadow-[0_0_15px_rgba(0,0,0,0.5)] rounded-full"
                       />
                    </div>
                 </div>
               ))}
            </div>

            <Button variant="ghost" className="mt-8 w-full border border-white/5 bg-white/[0.02] hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all">
               Analyze All Strategies
            </Button>
         </Card>
      </section>

      {/* ── Data Grid: Active Experiments ───────────────────────────────────── */}
      <section className="space-y-6">
         <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
               <div className="w-2 h-6 bg-blue-600 rounded-full" />
               <h3 className="text-xl font-bold uppercase tracking-tight">Active Transmissions</h3>
            </div>
            <div className="flex items-center gap-4">
               <div className="relative group/search">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/search:text-blue-500 transition-colors" />
                  <input 
                     type="text" 
                     placeholder="Search node ID..." 
                     className="bg-black/40 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-[11px] text-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-72 transition-all placeholder:text-white/10"
                  />
               </div>
            </div>
         </div>

         <div className="grid gap-4">
            {[
              { id: 'NODE-092', product: 'Arc\'teryx Beta AR Jacket', category: 'Apparel', status: 'Stable', lift: 42, conf: 98, color: 'text-emerald-400' },
              { id: 'NODE-114', product: 'Garmin Fenix 7X Sapphire', category: 'Electronics', status: 'Testing', lift: 15, conf: 42, color: 'text-blue-400' },
              { id: 'NODE-205', product: 'Black Diamond Headlamp', category: 'Accessories', status: 'Stable', lift: 28, conf: 91, color: 'text-emerald-400' },
              { id: 'NODE-042', product: 'Patagonia Nano Puff Hoody', category: 'Apparel', status: 'Divergent', lift: -4, conf: 85, color: 'text-red-400' },
            ].map((node, i) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="px-6 py-5 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-all cursor-pointer relative overflow-hidden backdrop-blur-md">
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-blue-600 transition-colors" />
                   
                   <div className="flex items-center gap-8">
                      <div className="space-y-1">
                         <p className="text-[9px] text-white/20 uppercase font-bold tracking-[0.2em]">{node.id}</p>
                         <h4 className="text-xs font-bold text-white transition-colors uppercase tracking-tight">{node.product}</h4>
                      </div>
                      <div className="hidden md:block space-y-1">
                         <p className="text-[9px] text-white/20 uppercase font-bold tracking-[0.2em]">Strategy</p>
                         <Badge variant="outline" className="text-[9px] border-white/10 text-white/40 uppercase py-0">{node.category}</Badge>
                      </div>
                   </div>

                   <div className="flex items-center gap-12">
                      <div className="text-center hidden sm:block">
                         <p className="text-[9px] text-white/20 uppercase font-bold tracking-[0.2em] mb-1">Status</p>
                         <p className={`text-[10px] font-bold ${node.status === 'Stable' ? 'text-emerald-400' : node.status === 'Testing' ? 'text-blue-400' : 'text-red-400'} uppercase`}>
                            {node.status}
                         </p>
                      </div>
                      <div className="text-center min-w-[80px]">
                         <p className="text-[9px] text-white/20 uppercase font-bold tracking-[0.2em] mb-1">Arbitrage</p>
                         <p className={`text-base font-bold ${node.lift >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {node.lift >= 0 ? '+' : ''}{node.lift}%
                         </p>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="text-right hidden lg:block">
                            <p className="text-[9px] text-white/20 uppercase font-bold tracking-[0.2em] mb-1">Confidence</p>
                            <p className="text-[10px] font-bold text-white/70">{node.conf}%</p>
                         </div>
                         <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5">
                            <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-blue-500 transition-colors" />
                         </Button>
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
         </div>

         <div className="flex justify-center pt-4">
            <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 hover:text-white transition-all space-x-3 group">
               <span>Expand Signal Feed</span>
               <div className="flex gap-0.5">
                  <div className="w-1 h-3 bg-white/10 group-hover:bg-blue-500 rounded-full transition-colors" />
                  <div className="w-1 h-3 bg-white/10 group-hover:bg-blue-500/60 rounded-full transition-colors" />
                  <div className="w-1 h-3 bg-white/10 group-hover:bg-blue-500/30 rounded-full transition-colors" />
               </div>
            </Button>
         </div>
      </section>
    </div>
  );
}
