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
  Trophy
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';

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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 uppercase flex items-center gap-3">
             <Lightbulb className="w-8 h-8 text-blue-500 fill-current opacity-20" /> 
             Collective Intelligence
          </h1>
          <p className="text-white/40 text-sm">Insights derived from <span className="text-blue-400 font-semibold">512,042</span> global Google Shopping experiment outcomes.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="border-white/5 bg-zinc-900 text-white/60">
              <Globe className="w-4 h-4 mr-2" /> Global Benchmarks
           </Button>
           <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              <BarChart3 className="w-4 h-4 mr-2" /> Export Report
           </Button>
        </div>
      </div>

      {/* ── Platform Benchmarks ──────────────────────────────────────────────── */}
      <div className="grid md:grid-cols-3 gap-6">
         <Card className="md:col-span-2 bg-zinc-900/40 border-white/5 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <TrendingUp className="w-48 h-48" />
            </div>
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold uppercase tracking-tight">Category High-Performers</h3>
               <Badge className="bg-blue-600/10 text-blue-400 border-none text-[9px] uppercase tracking-widest">Real-time Data</Badge>
            </div>

            <div className="space-y-8">
               {CATEGORY_INSIGHTS.map((cat, i) => (
                 <div key={i} className="group cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-black border border-white/5 flex items-center justify-center group-hover:bg-blue-600/10 transition-colors">
                             <Target className="w-5 h-5 text-white/40 group-hover:text-blue-400" />
                          </div>
                          <div>
                             <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{cat.category}</p>
                             <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Benchmark CTR: {cat.benchmarkCtr}%</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-lg font-bold text-emerald-400 leading-none">+{cat.lift}%</p>
                          <p className="text-[9px] text-white/30 uppercase tracking-widest font-bold">Avg. Lift</p>
                       </div>
                    </div>
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 group-hover:border-blue-500/20 transition-all">
                       <p className="text-xs text-white/60 italic leading-relaxed">
                          &quot;{cat.insight}&quot;
                       </p>
                       <div className="mt-3 flex items-center gap-4">
                          <div className="flex items-center gap-1.5">
                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                             <span className="text-[9px] font-bold text-white/30 uppercase tracking-tighter">{cat.confidence}% Confidence</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                             <span className="text-[9px] font-bold text-white/30 uppercase tracking-tighter">{cat.sampleSize.toLocaleString()} Tests</span>
                          </div>
                          <Button size="sm" variant="ghost" className="ml-auto h-6 text-[9px] uppercase font-bold tracking-widest text-blue-400 hover:bg-blue-400/5">
                             Apply Model <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </Card>

         <div className="space-y-6">
            {/* Seasonal Velocity Card */}
            <Card className="bg-zinc-900/40 border-white/5 p-6 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Flame className="w-12 h-12 text-blue-500" />
               </div>
               <h3 className="text-sm font-bold uppercase tracking-tight mb-6">Seasonal Efficiency</h3>
               <div className="space-y-4">
                  {SEASONAL_TRENDS.map((t, i) => (
                    <div key={i} className="flex items-center gap-4">
                       <span className="text-[10px] font-bold text-white/30 w-8">{t.month}</span>
                       <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${Math.abs(t.lift)}%` }}
                             className={cn("h-full", t.trend === 'up' ? "bg-emerald-500" : "bg-red-500/40")} 
                          />
                       </div>
                       <span className={cn("text-[10px] font-bold", t.trend === 'up' ? "text-emerald-400" : "text-red-500/60")}>
                          {t.lift > 0 ? '+' : ''}{t.lift}%
                       </span>
                    </div>
                  ))}
               </div>
               <p className="mt-6 text-[10px] text-white/20 text-center uppercase tracking-widest leading-relaxed">
                  Predicting high efficiency for Q4 <br/> based on 10,000+ Apparel stores.
               </p>
            </Card>

            {/* Platform Trust Card */}
            <Card className="bg-blue-600/5 border border-blue-500/10 p-6 relative overflow-hidden">
               <div className="flex items-center gap-3 mb-4">
                  <Trophy className="w-5 h-5 text-blue-500" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 leading-none">Verified Results</h3>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-2xl font-bold">98.2%</p>
                        <p className="text-[9px] text-white/40 uppercase tracking-widest">Platform Confidence</p>
                     </div>
                     <div className="w-8 h-8 rounded bg-blue-600/10 flex items-center justify-center">
                        <MousePointer2 className="w-4 h-4 text-blue-500" />
                     </div>
                  </div>
                  <p className="text-[10px] text-white/50 leading-relaxed font-medium">
                     Our models have reached critical mass. You are now receiving predictions that outperform stock LLM generation by 68%.
                  </p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest h-9">
                     Join Collective Sync
                  </Button>
               </div>
            </Card>
         </div>
      </div>

      {/* ── Intelligence Feed ─────────────────────────────────────────────────── */}
      <div className="space-y-4">
         <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-sm font-bold uppercase tracking-tight border-b-2 border-blue-500 pb-4 -mb-[18px]">Proprietary Insight Feed</h3>
         </div>

         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            {[
              { 
                tag: 'BLACK FRIDAY', 
                title: 'Bundle Descriptors', 
                desc: 'Stores using "Set of [X]" in titles see 18% higher CTR than "Pack of [X]" in US/EU markets.' 
              },
              { 
                tag: 'ALGORITHM UPDATE', 
                title: 'Google Image Pref', 
                desc: 'Products with Lifestyle images matched with Brand-First titles have 42% higher conversion in Home/Garden.' 
              },
              { 
                tag: 'PRICE SENSITIVITY', 
                title: 'Anchor words', 
                desc: 'Using the word "Premium" for items over €500 correlates with a 12% lift in CTR in Electronics.' 
              }
            ].map((feed, i) => (
              <Card key={i} className="bg-white/5 border-white/5 p-5 hover:bg-white/[0.07] transition-all cursor-pointer group">
                 <div className="inline-block px-2 py-0.5 rounded-full bg-blue-600/10 border border-blue-500/20 mb-4">
                    <span className="text-[8px] font-bold text-blue-400 tracking-widest uppercase">{feed.tag}</span>
                 </div>
                 <h4 className="text-sm font-bold mb-2 group-hover:text-blue-400">{feed.title}</h4>
                 <p className="text-xs text-white/40 leading-relaxed">
                    &quot;{feed.desc}&quot;
                 </p>
                 <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] text-white/20 uppercase font-bold tracking-widest">Added 12h ago</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-blue-500" />
                 </div>
              </Card>
            ))}
         </div>
      </div>
    </div>
  );
}

