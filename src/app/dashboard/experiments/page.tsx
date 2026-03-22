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
  Target
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const MOCK_EXPERIMENTS = [
  {
    id: 'exp_1',
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
    id: 'exp_2',
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
    id: 'exp_3',
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
    <div className="space-y-8">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 uppercase">A/B Testing Lab</h1>
          <p className="text-white/40 text-sm">Managing {MOCK_EXPERIMENTS.length} active experiments across your catalog.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="border-white/5 bg-zinc-900 text-white/60">
              <History className="w-4 h-4 mr-2" /> Recent Winners
           </Button>
           <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              <Zap className="w-4 h-4 mr-2" /> Start New Test
           </Button>
        </div>
      </div>

      {/* ── Key Stats ───────────────────────────────────────────────────────── */}
      <div className="grid md:grid-cols-4 gap-4">
         {[
           { label: 'Avg Lift', value: '+24.5%', sub: 'vs Control', icon: TrendingUp, color: 'text-blue-400' },
           { label: 'Win Rate', value: '72%', sub: 'Challenger Wins', icon: Zap, color: 'text-emerald-400' },
           { label: 'Tests Run', value: '456', sub: 'Total Outcomes', icon: BarChart3, color: 'text-purple-400' },
           { label: 'Revenue +', value: '€12,450', sub: 'Est. Recouped', icon: Zap, color: 'text-amber-400' },
         ].map((stat, i) => (
           <Card key={i} className="bg-zinc-900/40 border-white/5 p-4 relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start justify-between">
                 <div className="space-y-1">
                    <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">{stat.label}</p>
                    <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
                    <p className="text-[10px] text-white/20">{stat.sub}</p>
                 </div>
                 <div className="p-2 bg-black/40 rounded-lg border border-white/5">
                    <stat.icon className={cn("w-4 h-4", stat.color)} />
                 </div>
              </div>
           </Card>
         ))}
      </div>

      {/* ── Experiments Table ────────────────────────────────────────────────── */}
      <div className="space-y-4">
         <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex gap-4">
               {['all', 'running', 'completed'].map(f => (
                 <button 
                   key={f}
                   onClick={() => setFilter(f as 'all' | 'running' | 'completed')}
                   className={cn(
                     "text-[10px] font-bold uppercase tracking-widest transition-colors",
                     filter === f ? "text-blue-500" : "text-white/20 hover:text-white/40"
                   )}
                 >
                   {f}
                 </button>
               ))}
            </div>
            <div className="flex items-center gap-2">
               <Filter className="w-3 h-3 text-white/20" />
               <span className="text-[10px] text-white/20 uppercase font-bold tracking-widest">Sort by Confidence</span>
            </div>
         </div>

         <div className="grid gap-4">
            {MOCK_EXPERIMENTS.map((exp, i) => (
              <motion.div 
                layout
                key={exp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-zinc-900/40 border-white/5 overflow-hidden group hover:border-white/10 transition-all">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-8">
                       <div className="space-y-1">
                          <div className="flex items-center gap-2">
                             <h3 className="text-sm font-bold uppercase tracking-tight">{exp.product}</h3>
                             <Badge variant="outline" className="text-[9px] border-white/10 text-white/40 py-0 h-4 uppercase">{exp.strategy}</Badge>
                             {exp.status === 'winner_b' && <Badge className="bg-emerald-500/10 text-emerald-400 border-none text-[9px] uppercase">Winner Found</Badge>}
                          </div>
                          <p className="text-[10px] text-white/30">ID: {exp.id} • Started {exp.daysElapsed} days ago</p>
                       </div>
                       <div className="flex items-center gap-2">
                          <div className="text-right">
                             <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest leading-none mb-1">Confidence</p>
                             <p className={cn("text-xs font-bold leading-none", exp.confidence > 90 ? "text-emerald-400" : "text-blue-400")}>{exp.confidence}%</p>
                          </div>
                          <div className="w-px h-6 bg-white/5 ml-2 mr-2" />
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-white/5 bg-zinc-900">
                             <MoreVertical className="w-3 h-3 text-white/30" />
                          </Button>
                       </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 relative">
                       {/* Connection Line */}
                       <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                          <div className="flex flex-col items-center gap-1 opacity-20">
                             <div className="w-px h-8 bg-gradient-to-t from-transparent via-white to-transparent" />
                             <span className="text-[10px] font-bold">VS</span>
                             <div className="w-px h-8 bg-gradient-to-b from-transparent via-white to-transparent" />
                          </div>
                       </div>

                       {/* Variant A (Control) */}
                       <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-3">
                          <div className="flex items-center justify-between">
                             <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">A: Control (Original)</span>
                             <span className="text-[10px] font-bold text-white/60">{exp.variantA.ctr}% CTR</span>
                          </div>
                          <p className="text-xs text-white/40 italic line-through decoration-white/10 break-words leading-relaxed px-2 border-l border-white/5">
                             {exp.variantA.title}
                          </p>
                       </div>

                       {/* Variant B (Challenger) */}
                       <div className="p-4 rounded-xl bg-blue-600/5 border border-blue-500/10 space-y-3 relative overflow-hidden group/challenger">
                          <div className="absolute top-0 right-0 p-2">
                             <Target className="w-3 h-3 text-blue-500/40" />
                          </div>
                          <div className="flex items-center justify-between">
                             <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">B: {exp.strategy} (Magnify)</span>
                             <span className="text-[10px] font-bold text-emerald-400">{exp.variantB.ctr}% CTR</span>
                          </div>
                          <p className="text-xs text-white font-medium break-words leading-relaxed px-2 border-l-2 border-blue-500 group-hover/challenger:text-blue-400 transition-colors">
                             {exp.variantB.title}
                          </p>
                       </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                       <div className="flex items-center gap-8">
                          <div className="space-y-1">
                             <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest leading-none">Status</p>
                             <div className="flex items-center gap-2">
                                <div className={cn("w-2 h-2 rounded-full", exp.status === 'running' ? "bg-blue-500 animate-pulse" : "bg-emerald-500")} />
                                <span className={cn("text-[11px] font-bold uppercase tracking-tight", exp.status === 'running' ? "text-blue-500" : "text-emerald-500")}>
                                   {exp.status === 'running' ? 'Active Collection' : 'Winner Rolled Out'}
                                </span>
                             </div>
                          </div>
                          <div className="space-y-1">
                             <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest leading-none">CTR Lift</p>
                             <p className="text-[11px] font-bold text-emerald-400">+{exp.lift}%</p>
                          </div>
                       </div>
                       
                       <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="h-8 text-[10px] uppercase font-bold tracking-widest text-white/40 hover:text-white">
                             View Full Report
                          </Button>
                          <Button size="sm" className={cn(
                            "h-8 px-4 text-[10px] uppercase font-bold tracking-widest",
                            exp.status === 'running' ? "bg-white text-black hover:bg-white/90" : "bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 cursor-default"
                          )}>
                             {exp.status === 'running' ? 'Pause Test' : 'Winner Live'}
                          </Button>
                       </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-1 w-full bg-zinc-950">
                     <div className="h-full bg-blue-600/30" style={{ width: `${(exp.daysElapsed / exp.totalDays) * 100}%` }} />
                  </div>
                </Card>
              </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
}

