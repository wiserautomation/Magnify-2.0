'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { 
  Lightbulb, 
  TrendingUp, 
  BarChart3, 
  Globe, 
  Target,
  ChevronRight,
  ArrowUpRight,
  Flame,
  MousePointer2,
  Trophy,
  Sparkles,
  Zap,
  Activity,
  Network
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORY_INSIGHTS = [
  {
    category: "Apparel & Accessories",
    benchmarkCtr: 3.2,
    topStrategy: "brand_first",
    lift: 24,
    insight: "Including 'Gender' and 'Material' in the first 70 characters increases CTR by 31% in US markets.",
    confidence: 98,
    sampleSize: 12450
  },
  {
    category: "Home & Garden",
    benchmarkCtr: 1.8,
    topStrategy: "attribute_first",
    lift: 40,
    insight: "Furniture titles with 'Dimensions' at the start outperform generic titles by 42% in EU markets.",
    confidence: 92,
    sampleSize: 8900
  },
  {
    category: "Electronics",
    benchmarkCtr: 2.5,
    topStrategy: "brand_first",
    lift: 18,
    insight: "Model Numbers found to be the #1 click driver for high-intent searches in Electronics.",
    confidence: 95,
    sampleSize: 15600
  }
];

const SEASONAL_TRENDS = [
  { month: 'Nov', lift: 65, trend: 'up', label: 'Black Friday Peak' },
  { month: 'Dec', lift: 45, trend: 'up', label: 'Holiday' },
  { month: 'Jan', lift: -12, trend: 'down', label: 'Post-Holiday Dip' },
  { month: 'Feb', lift: 15, trend: 'up', label: 'Valentine Spike' },
];

export default function IntelligencePage() {
  return (
    <div className="space-y-10 scrollbar-hide">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
           <div className="flex items-center gap-2 text-blue-500 mb-2">
              <Network className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Global IQ Transmission</span>
           </div>
           <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
              Collective <span className="text-blue-500">Intelligence</span>
           </h1>
           <p className="text-white/30 text-sm max-w-xl">
              Streaming analytics from <span className="text-white/60">512,042</span> cross-market experiment outcomes.
           </p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-11 border-white/5 bg-white/[0.03] text-white/60 hover:text-white rounded-xl px-4 uppercase text-[10px] font-bold tracking-widest transition-all">
              <Globe className="w-4 h-4 mr-2" /> Global Benchmarks
           </Button>
           <Button className="h-11 bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] rounded-xl px-6 uppercase text-[10px] font-bold tracking-widest transition-all group">
              <BarChart3 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" /> Sync Data
           </Button>
        </div>
      </header>

      {/* ── Platform Benchmarks ──────────────────────────────────────────────── */}
      <section className="grid lg:grid-cols-3 gap-6">
         <Card className="lg:col-span-2 bg-black/40 border-white/5 p-8 rounded-3xl relative overflow-hidden shadow-2xl backdrop-blur-md">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all">
               <TrendingUp className="w-48 h-48" />
            </div>
            <div className="flex items-center justify-between mb-10 relative z-10">
               <h3 className="text-xl font-bold uppercase tracking-tight">Category Benchmarks</h3>
               <Badge className="bg-blue-600/10 text-blue-400 border border-blue-500/20 text-[9px] uppercase tracking-widest px-3">Real-time Feed</Badge>
            </div>

            <div className="space-y-10 relative z-10">
               {CATEGORY_INSIGHTS.map((cat, i) => (
                 <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                 >
                    <div className="flex items-center justify-between mb-4 px-2">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-blue-600/10 group-hover:border-blue-500/20 transition-all duration-500 shadow-xl">
                             <Target className="w-5 h-5 text-white/20 group-hover:text-blue-400 group-hover:scale-110 transition-all" />
                          </div>
                          <div>
                             <p className="text-sm font-bold text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">{cat.category}</p>
                             <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold">Benchmark CTR: <span className="text-white/40">{cat.benchmarkCtr}%</span></p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-2xl font-bold text-emerald-400 leading-none group-hover:scale-110 transition-transform">+{cat.lift}%</p>
                          <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-bold mt-1">Aggregated Lift</p>
                       </div>
                    </div>
                    
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:border-blue-500/20 group-hover:bg-blue-600/[0.02] transition-all duration-500 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-10 transition-opacity">
                          <Sparkles className="w-12 h-12 text-blue-500" />
                       </div>
                       <p className="text-xs text-white/60 italic leading-relaxed relative z-10 pl-4 border-l-2 border-white/5 group-hover:border-l-blue-500 transition-all">
                          &quot;{cat.insight}&quot;
                       </p>
                       <div className="mt-6 flex flex-wrap items-center gap-6 relative z-10">
                          <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                             <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{cat.confidence}% Confidence</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <Activity className="w-3.5 h-3.5 text-white/20" />
                             <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{cat.sampleSize.toLocaleString()} Node Outcomes</span>
                          </div>
                          <Button size="sm" variant="ghost" className="ml-auto h-8 text-[10px] uppercase font-bold tracking-widest text-blue-400 hover:text-white hover:bg-blue-600/20 transition-all border border-transparent hover:border-blue-500/20 rounded-xl px-4">
                             Inject Strategy <ArrowUpRight className="w-3.5 h-3.5 ml-2" />
                          </Button>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </div>
         </Card>

         <div className="flex flex-col gap-6">
            <Card className="bg-black/40 border-white/5 p-8 rounded-3xl relative overflow-hidden group shadow-2xl backdrop-blur-md">
               <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-all">
                  <Flame className="w-16 h-16 text-emerald-500" />
               </div>
               <h3 className="text-base font-bold uppercase tracking-tight mb-8">Seasonal Efficiency</h3>
               <div className="space-y-6">
                  {SEASONAL_TRENDS.map((t, i) => (
                    <div key={i} className="flex flex-col gap-2">
                       <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                          <span>{t.month} / {t.label}</span>
                          <span className={cn(t.trend === 'up' ? "text-emerald-400" : "text-red-500/40")}>{t.lift > 0 ? '+' : ''}{t.lift}%</span>
                       </div>
                       <Progress 
                          value={Math.abs(t.lift)} 
                          className={cn("h-1.5 bg-white/5", t.trend === 'up' ? "[&>div]:bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)]" : "[&>div]:bg-red-500/40")} 
                       />
                    </div>
                  ))}
               </div>
               <div className="mt-8 p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                  <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] leading-relaxed font-bold">
                     Predicting High Performance <br/> for <span className="text-white/60">Q4 E-commerce Windows</span>.
                  </p>
               </div>
            </Card>

            <Card className="bg-blue-600/[0.03] border border-blue-500/10 p-8 rounded-3xl relative overflow-hidden group shadow-2xl backdrop-blur-md">
               <div className="absolute -bottom-4 -right-4 p-8 opacity-0 group-hover:opacity-10 transition-all rotate-12">
                  <Trophy className="w-24 h-24 text-blue-500" />
               </div>
               <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                     <Trophy className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 leading-none">Verified Results</h3>
               </div>
               <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-3xl font-bold tracking-tight text-white mb-1">98.2%</p>
                        <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Accuracy Benchmark</p>
                     </div>
                     <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                        <MousePointer2 className="w-5 h-5 text-blue-500" />
                     </div>
                  </div>
                  <p className="text-[11px] text-white/40 leading-relaxed font-medium">
                     Autonomous models have reached critical mass. Receiving predictions that outperform stock LLM generation by 68%.
                  </p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold uppercase tracking-[0.3em] h-11 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all">
                     Initialize Insight Sync
                  </Button>
               </div>
            </Card>
         </div>
      </section>

      {/* ── Intelligence Feed ─────────────────────────────────────────────────── */}
      <section className="space-y-6">
         <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
               <div className="w-2 h-6 bg-blue-600 rounded-full" />
               <h3 className="text-xl font-bold uppercase tracking-tight">Strategy Transmission Feed</h3>
            </div>
            <Button variant="ghost" className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/20 hover:text-white">
               Configure Filters
            </Button>
         </div>

         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                tag: 'PEAK Q4', 
                title: 'Bundle Descriptors', 
                desc: 'Nodes using "Set of [X]" in titles see 18% higher CTR than "Pack of [X]" in US/EU markets.',
                icon: Activity
              },
               { 
                tag: 'VISION AI', 
                title: 'Image-Title Pairing', 
                desc: 'Products with Lifestyle images matched with Brand-First titles have 42% higher conversion power.',
                icon: Zap
              },
              { 
                tag: 'PRICE SIGNALS', 
                title: 'Luxury Anchor Weights', 
                desc: 'Using the word "Premium" for items over €500 correlates with a 12% lift in CTR in Electronics.',
                icon: Target
              }
            ].map((feed, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-black/40 border-white/5 p-6 rounded-2xl hover:bg-white/[0.03] hover:border-white/10 transition-all cursor-pointer group relative overflow-hidden shadow-xl backdrop-blur-md h-full">
                   <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                      <feed.icon className="w-20 h-20" />
                   </div>
                   
                   <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                      <span className="text-[8px] font-bold text-blue-400 tracking-[0.2em] uppercase">{feed.tag}</span>
                   </div>
                   
                   <h4 className="text-base font-bold mb-3 text-white/90 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{feed.title}</h4>
                   <p className="text-xs text-white/30 leading-relaxed font-medium">
                      &quot;{feed.desc}&quot;
                   </p>
                   
                   <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <span className="text-[9px] text-white/20 uppercase font-bold tracking-[0.2em]">Validated 12h ago</span>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-blue-600/10 border border-transparent hover:border-blue-500/20">
                         <ArrowUpRight className="w-4 h-4 text-blue-500" />
                      </Button>
                   </div>
                </Card>
              </motion.div>
            ))}
         </div>

         <div className="flex justify-center pt-8">
            <Button variant="ghost" className="text-white/20 hover:text-white uppercase text-[10px] font-bold tracking-[0.4em] group flex items-center gap-4">
               <span>Expand Collective Knowledge</span>
               <div className="flex gap-1">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-1 h-3 bg-white/10 rounded-full group-hover:bg-blue-500 transition-all" style={{ transitionDelay: `${i * 100}ms` }} />
                  ))}
               </div>
            </Button>
         </div>
      </section>
    </div>
  );
}
