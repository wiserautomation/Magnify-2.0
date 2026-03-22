'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Zap, 
  BarChart3,
  TrendingUp,
  History,
  Filter,
  MoreVertical,
  Target,
  Beaker,
  Activity,
  Play,
  RotateCcw,
  Sparkles,
  Search
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_EXPERIMENTS = [
  {
    id: 'EXP-901',
    product: 'Ultra-Light Trekking Boots',
    strategy: 'Brand-First',
    variantA: { title: 'Trekking Boots', ctr: 1.2 },
    variantB: { title: 'Mountain Gear - Ultra-Light Men\'s Trekking Boots - Black - Size 42', ctr: 1.8 },
    lift: 50,
    confidence: 98,
    status: 'running',
    daysElapsed: 8,
    totalDays: 14
  },
  {
    id: 'EXP-902',
    product: 'Titanium Camping Stove',
    strategy: 'Attribute-First',
    variantA: { title: 'Camping Stove', ctr: 2.4 },
    variantB: { title: 'Mountain Gear - Portable Titanium Camping Stove - Windproof - 2000W', ctr: 3.1 },
    lift: 29,
    confidence: 82,
    status: 'winner_b',
    daysElapsed: 14,
    totalDays: 14
  },
  {
    id: 'EXP-903',
    product: '4-Season Expedition Tent',
    strategy: 'Semantic-Rich',
    variantA: { title: 'Expedition Tent', ctr: 0.8 },
    variantB: { title: 'Mountain Gear - 4-Season Professional Expedition Tent - Waterproof - 3 Person', ctr: 0.9 },
    lift: 12,
    confidence: 45,
    status: 'running',
    daysElapsed: 4,
    totalDays: 14
  }
];

export default function ExperimentsPage() {
  const [filter, setFilter] = useState<'all' | 'running' | 'completed'>('all');

  return (
    <div className="space-y-10">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
           <div className="flex items-center gap-2 text-blue-500 mb-2">
              <Beaker className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Validation Lab</span>
           </div>
           <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
              A/B <span className="text-blue-500">Transmissions</span>
           </h1>
           <p className="text-white/30 text-sm max-w-xl">
              Currently processing <span className="text-white/60">{MOCK_EXPERIMENTS.length} title experiments</span> with high-confidence statistical modeling.
           </p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-11 border-white/5 bg-white/[0.03] text-white/60 hover:text-white rounded-xl px-4 uppercase text-[10px] font-bold tracking-widest transition-all">
              <History className="w-4 h-4 mr-2" /> Winner Logs
           </Button>
           <Button className="h-11 bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] rounded-xl px-6 uppercase text-[10px] font-bold tracking-widest transition-all group">
              <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" /> New Signal
           </Button>
        </div>
      </header>

      {/* ── Key Stats ───────────────────────────────────────────────────────── */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: 'Network Lift', value: '+24.5%', sub: 'Vs. Control', icon: TrendingUp, color: 'blue' },
           { label: 'Win Rate', value: '72%', sub: 'Median Signal', icon: Zap, color: 'emerald' },
           { label: 'Node Outcomes', value: '456', sub: 'Historical Data', icon: BarChart3, color: 'purple' },
           { label: 'Revenue +', value: '€12.4k', sub: 'Est. Recouped', icon: Sparkles, color: 'amber' },
         ].map((stat, i) => (
           <Card key={i} className="bg-black/40 border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-all shadow-2xl">
              <div className={cn("absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity", `text-${stat.color}-500`)}>
                 <stat.icon className="w-12 h-12" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                 <p className="text-[10px] text-white/30 uppercase font-bold tracking-[0.2em] mb-3">{stat.label}</p>
                 <h3 className={cn("text-2xl font-bold mb-1", `text-white`)}>{stat.value}</h3>
                 <p className="text-[10px] text-white/20 uppercase tracking-widest mt-auto">{stat.sub}</p>
              </div>
           </Card>
         ))}
      </section>

      {/* ── Experiments Table ────────────────────────────────────────────────── */}
      <section className="space-y-6">
         <div className="flex items-center justify-between border-b border-white/5 pb-4 px-2">
            <div className="flex gap-6">
               {['all', 'running', 'completed'].map(f => (
                 <button 
                   key={f}
                   onClick={() => setFilter(f as any)}
                   className={cn(
                     "text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative pb-2 px-1",
                     filter === f ? "text-blue-500" : "text-white/20 hover:text-white"
                   )}
                 >
                   {f}
                   {filter === f && (
                     <motion.div layoutId="filter-bar" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                   )}
                 </button>
               ))}
            </div>
            <div className="flex items-center gap-4">
               <div className="relative group/search">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/search:text-blue-500 transition-colors" />
                  <input 
                     type="text" 
                     placeholder="Filter nodes..." 
                     className="bg-black/40 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-[11px] text-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64 transition-all placeholder:text-white/10"
                  />
               </div>
            </div>
         </div>

         <div className="grid gap-6">
            <AnimatePresence>
               {MOCK_EXPERIMENTS.map((exp, i) => (
                 <motion.div 
                   layout
                   key={exp.id}
                   initial={{ opacity: 0, scale: 0.98 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: i * 0.1 }}
                 >
                   <Card className="bg-black/40 border-white/5 overflow-hidden group hover:border-white/10 transition-all rounded-3xl backdrop-blur-md shadow-2xl relative">
                     <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-zinc-900 group-hover:bg-blue-600 transition-colors" />
                     
                     <div className="p-8">
                       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
                          <div className="space-y-2">
                             <div className="flex items-center gap-3">
                                <h3 className="text-lg font-bold text-white uppercase tracking-tight">{exp.product}</h3>
                                <Badge variant="outline" className="text-[9px] border-blue-500/20 text-blue-400 py-0.5 h-auto uppercase tracking-widest bg-blue-500/5">{exp.strategy}</Badge>
                                {exp.status === 'winner_b' && (
                                   <div className="flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded text-[9px] font-bold text-emerald-400 uppercase tracking-widest border border-emerald-500/20">
                                      <Sparkles className="w-2.5 h-2.5" />
                                      Winner Deployed
                                   </div>
                                )}
                             </div>
                             <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold">Node ID: {exp.id} • Statistical Confidence: <span className="text-white/40">{exp.confidence}%</span></p>
                          </div>
                          
                          <div className="flex items-center gap-6 self-end lg:self-center">
                             <div className="text-right">
                                <p className="text-[9px] text-white/20 uppercase font-bold tracking-widest leading-none mb-2">Lift Velocity</p>
                                <p className={cn("text-2xl font-bold leading-none", exp.lift > 0 ? "text-emerald-400" : "text-red-400")}>
                                   {exp.lift > 0 ? '+' : ''}{exp.lift}%
                                </p>
                             </div>
                             <div className="w-px h-10 bg-white/5" />
                             <div className="flex gap-2">
                                <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/5">
                                   <MoreVertical className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                                </Button>
                             </div>
                          </div>
                       </div>

                       <div className="grid lg:grid-cols-2 gap-8 relative pb-2">
                          {/* VS Badge */}
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2 opacity-20 z-10 pointer-events-none">
                             <div className="w-px h-12 bg-gradient-to-t from-transparent via-white to-transparent" />
                             <div className="p-2 rounded-full border border-white/20 bg-black text-[9px] font-bold tracking-widest uppercase">vs</div>
                             <div className="w-px h-12 bg-gradient-to-b from-transparent via-white to-transparent" />
                          </div>

                          {/* Variant A */}
                          <div className="p-6 rounded-2xl bg-black/20 border border-white/5 space-y-4 hover:bg-white/[0.02] transition-colors group/v">
                             <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">A: Control Baseline</span>
                                <span className="text-xs font-bold text-white/60">{exp.variantA.ctr}% CTR</span>
                             </div>
                             <p className="text-xs text-white/30 italic line-through break-words leading-relaxed pl-4 border-l-2 border-white/5 group-hover/v:text-white/40 transition-colors">
                                {exp.variantA.title}
                             </p>
                          </div>

                          {/* Variant B */}
                          <div className="p-6 rounded-2xl bg-blue-600/[0.03] border border-blue-500/10 space-y-4 relative overflow-hidden group/challenger hover:bg-blue-600/[0.05] transition-colors">
                             <div className="absolute top-0 right-0 p-4">
                                <Target className="w-4 h-4 text-blue-500/20 group-hover/challenger:text-blue-500/40 transition-colors" />
                             </div>
                             <div className="flex items-center justify-between border-b border-blue-500/10 pb-3">
                                <div className="flex items-center gap-2">
                                   <span className="text-[9px] font-bold text-blue-400 uppercase tracking-[0.2em]">{exp.strategy} Signal</span>
                                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] animate-pulse" />
                                </div>
                                <span className="text-xs font-bold text-emerald-400">{exp.variantB.ctr}% CTR</span>
                             </div>
                             <p className="text-xs text-white/90 font-bold break-words leading-relaxed pl-4 border-l-2 border-blue-500 group-hover/challenger:text-blue-400 transition-colors">
                                {exp.variantB.title}
                             </p>
                          </div>
                       </div>

                       <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-2">
                          <div className="flex items-center gap-12">
                             <div className="space-y-2">
                                <p className="text-[9px] text-white/20 uppercase font-bold tracking-[0.2em] leading-none">Global State</p>
                                <div className="flex items-center gap-3">
                                   <div className={cn("w-2 h-2 rounded-full", exp.status === 'running' ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] animate-pulse" : "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]")} />
                                   <span className={cn("text-[10px] font-bold uppercase tracking-widest", exp.status === 'running' ? "text-blue-500" : "text-emerald-500")}>
                                      {exp.status === 'running' ? 'Active Collection' : 'Champion Deployed'}
                                   </span>
                                </div>
                             </div>
                             <div className="space-y-2">
                                <p className="text-[9px] text-white/20 uppercase font-bold tracking-[0.2em] leading-none">Transmission Progress</p>
                                <div className="flex items-center gap-4">
                                   <Progress value={(exp.daysElapsed / exp.totalDays) * 100} className="h-1 w-24 bg-white/5 [&>div]:bg-blue-600" />
                                   <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest shrink-0">{exp.daysElapsed}/{exp.totalDays} Days</span>
                                </div>
                             </div>
                          </div>
                          
                          <div className="flex gap-3">
                             <Button variant="ghost" className="h-10 text-[10px] uppercase font-bold tracking-widest text-white/30 hover:text-white transition-all">
                                Node Reports
                             </Button>
                             <Button className={cn(
                               "h-10 px-6 text-[10px] uppercase font-bold tracking-widest rounded-xl transition-all",
                               exp.status === 'running' ? "bg-white text-black hover:bg-white/90" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                             )}>
                                {exp.status === 'running' ? 'Intercept Test' : 'Finalized'}
                             </Button>
                          </div>
                       </div>
                     </div>
                   </Card>
                 </motion.div>
               ))}
            </AnimatePresence>
         </div>

         <div className="flex justify-center pt-8">
            <Button variant="ghost" className="text-white/20 hover:text-white uppercase text-[10px] font-bold tracking-[0.3em] group space-x-4">
               <span>Access Archive Nodes</span>
               <RotateCcw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
            </Button>
         </div>
      </section>
    </div>
  );
}
