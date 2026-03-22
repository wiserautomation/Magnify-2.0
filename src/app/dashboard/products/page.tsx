'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { type Product } from '@/types';
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  Zap,
  MoreVertical,
  Layers,
  Sparkles,
  Target
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getTitleScoreColor, getTitleScoreLabel } from '@/lib/scoring/titleScorer';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1', storeId: 's1', gmcId: '123', 
    title: 'Camping Tent', originalTitle: 'Camping Tent', currentTitle: 'Camping Tent',
    description: 'A tent for camping.', imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80',
    price: 199.99, currency: 'EUR', category: 'Outdoors', brand: 'Mountain', 
    geography: 'ES', language: 'en', titleScore: 32, titleIssues: [], 
    impressions: 4500, clicks: 12, ctr: 0.26, conversions: 0, revenue: 0, 
    lastOptimizedAt: null, optimizationCount: 0, status: 'pending'
  },
  {
    id: 'p2', storeId: 's1', gmcId: '124', 
    title: 'Arc\'teryx Men\'s Beta AR Jacket - Black - Medium', 
    originalTitle: 'AR Jacket', currentTitle: 'Arc\'teryx Men\'s Beta AR Jacket - Black - Medium',
    description: 'Premium Gore-Tex jacket.', imageUrl: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80',
    price: 550.00, currency: 'EUR', category: 'Apparel', brand: 'Arc\'teryx', 
    geography: 'ES', language: 'en', titleScore: 94, titleIssues: [], 
    impressions: 12400, clicks: 520, ctr: 4.19, conversions: 12, revenue: 6600, 
    lastOptimizedAt: new Date(), optimizationCount: 2, status: 'champion'
  },
  {
    id: 'p3', storeId: 's1', gmcId: '125', 
    title: 'Running Shoes Red', 
    originalTitle: 'Running Shoes Red', currentTitle: 'Running Shoes Red',
    description: 'Shoes for running.', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80',
    price: 89.00, currency: 'EUR', category: 'Footwear', brand: 'Nike', 
    geography: 'ES', language: 'en', titleScore: 45, titleIssues: [], 
    impressions: 8900, clicks: 89, ctr: 1.0, conversions: 2, revenue: 178, 
    lastOptimizedAt: new Date(), optimizationCount: 1, status: 'testing'
  }
];

export default function ProductsPage() {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'critical' | 'optimized' | 'testing'>('all');

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
           <div className="flex items-center gap-2 text-blue-500 mb-2">
              <Layers className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Catalog Intelligence</span>
           </div>
           <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
              Product <span className="text-blue-500">Inventory</span>
           </h1>
           <p className="text-white/30 text-sm max-w-xl">
              Analyzing <span className="text-white/60">{MOCK_PRODUCTS.length} SKUs</span> for title-to-intent alignment.
           </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group/search">
             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/search:text-blue-500 transition-colors" />
             <input 
                type="text" 
                placeholder="Search catalog..." 
                className="bg-white/[0.03] border border-white/5 rounded-xl py-3 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-80 transition-all placeholder:text-white/10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
             />
          </div>
          <Button className="h-11 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 uppercase text-[10px] font-bold tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.3)]">
             Manual Import
          </Button>
        </div>
      </header>

      <section className="flex items-center gap-4">
         {['all', 'critical', 'optimized', 'testing'].map((f) => (
            <button
               key={f}
               onClick={() => setFilter(f as any)}
               className={cn(
                  "px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border",
                  filter === f 
                     ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]" 
                     : "bg-white/[0.03] border-white/5 text-white/40 hover:text-white/60 hover:border-white/10"
               )}
            >
               {f}
            </button>
         ))}
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <AnimatePresence>
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-black/40 border-white/5 overflow-hidden group hover:border-white/10 transition-all rounded-3xl relative backdrop-blur-md shadow-2xl">
                   <div className="absolute top-0 right-0 p-4 z-10">
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg bg-black/40 border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                         <MoreVertical className="w-3 h-3 text-white/40" />
                      </Button>
                   </div>
                   
                   <div className="aspect-[16/10] relative overflow-hidden bg-zinc-900">
                      <Image 
                        src={product.imageUrl} 
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
                      
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                         <div className="space-y-1">
                            <p className="text-[9px] text-white/40 uppercase font-bold tracking-widest">{product.brand}</p>
                            <h3 className="text-sm font-bold text-white line-clamp-1">{product.title}</h3>
                         </div>
                         <div className="text-right">
                            <p className="text-[9px] text-white/40 uppercase font-bold tracking-widest leading-none mb-1">Score</p>
                            <span className={cn(
                               "text-lg font-bold leading-none",
                               product.titleScore > 80 ? "text-emerald-400" : product.titleScore > 60 ? "text-blue-400" : "text-red-400"
                            )}>{product.titleScore}</span>
                         </div>
                      </div>
                   </div>

                   <div className="p-6 space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                         <div className="space-y-1">
                            <p className="text-[9px] text-white/20 uppercase font-bold tracking-widest leading-none">CTR</p>
                            <p className="text-xs font-bold text-white/80">{product.ctr}%</p>
                         </div>
                         <div className="space-y-1">
                            <p className="text-[9px] text-white/20 uppercase font-bold tracking-widest leading-none">Clicks</p>
                            <p className="text-xs font-bold text-white/80">{product.clicks}</p>
                         </div>
                         <div className="space-y-1">
                            <p className="text-[9px] text-white/20 uppercase font-bold tracking-widest leading-none">Revenue</p>
                            <p className="text-xs font-bold text-emerald-400">€{product.revenue}</p>
                         </div>
                      </div>

                      <div className="space-y-2">
                         <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/20">
                            <span>Optimization Health</span>
                            <span className={cn(
                               product.titleScore > 80 ? "text-emerald-400" : product.titleScore > 60 ? "text-blue-400" : "text-red-400"
                            )}>{getTitleScoreLabel(product.titleScore)}</span>
                         </div>
                         <Progress value={product.titleScore} className="h-1 bg-white/5 [&>div]:bg-blue-600" />
                      </div>

                      <div className="pt-2 flex items-center gap-2">
                         <Button className="flex-1 h-10 bg-white/[0.03] hover:bg-white/5 border border-white/5 text-white/60 text-[10px] uppercase font-bold tracking-widest rounded-xl transition-all">
                            Analyze DNA
                         </Button>
                         <Button className="h-10 px-4 bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600/20 rounded-xl transition-all">
                             <Zap className="w-3.5 h-3.5" />
                         </Button>
                      </div>
                   </div>
                </Card>
              </motion.div>
            ))}
         </AnimatePresence>
      </div>

      <div className="flex justify-center pt-8">
         <Button variant="ghost" className="text-white/20 hover:text-white uppercase text-[10px] font-bold tracking-[0.3em] group">
            Load More Transmissions
            <ArrowUpRight className="ml-2 w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
         </Button>
      </div>
    </div>
  );
}
