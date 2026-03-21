'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getProductsRealtime } from '@/lib/firebase/firestore';
import { type Product } from '@/types';
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  Zap,
  MoreVertical,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getTitleScoreColor, getTitleScoreLabel } from '@/lib/scoring/titleScorer';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'critical' | 'optimized' | 'testing'>('all');

  // For high-end demo purposes, we define some mock products if Firestore is empty
  const mockProducts: Product[] = [
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

  useEffect(() => {
     // REALTIME FIRESTORE SYNC: 
     // We assume storeId exists for this user. In a real app we'd fetch the storeId first.
     // For this initial setup, we populate with mock and then switch to Firestore.
     setProducts(mockProducts);
     setLoading(false);

     // If storeId is known:
     // return getProductsRealtime('store_id_placeholder', (data) => {
     //    setProducts(data as Product[]);
     //    setLoading(false);
     // });
  }, [user]);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    if (filter === 'all') return matchesSearch;
    if (filter === 'critical') return matchesSearch && p.titleScore < 40;
    if (filter === 'optimized') return matchesSearch && p.titleScore >= 80;
    if (filter === 'testing') return matchesSearch && p.status === 'testing';
    return matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 uppercase">Catalog Core</h1>
          <p className="text-white/40 text-sm">Managing {products.length} products across Google Merchant Center.</p>
        </div>
        <div className="flex items-center gap-2">
           <div className="relative group">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-blue-500 transition-colors" />
              <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text" 
                placeholder="Search by title or GMC ID..." 
                className="bg-zinc-900 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 w-full md:w-80 transition-all focus:bg-black"
              />
           </div>
           <Button variant="outline" className="bg-zinc-900 border-white/5 text-white/60 hover:text-white">
              <Filter className="w-4 h-4 mr-2" /> Filter
           </Button>
        </div>
      </div>

      {/* ── Tabs ────────────────────────────────────────────────────────────── */}
      <div className="flex gap-2 p-1 bg-zinc-950 border border-white/5 rounded-2xl w-fit">
         {[
           { id: 'all', label: 'All Products' },
           { id: 'critical', label: 'Critical Issues' },
           { id: 'testing', label: 'Active Tests' },
           { id: 'optimized', label: 'Optimized' }
         ].map((t) => (
           <button
             key={t.id}
             onClick={() => setFilter(t.id as any)}
             className={cn(
               "px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
               filter === t.id ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-white/30 hover:text-white/60"
             )}
           >
             {t.label}
           </button>
         ))}
      </div>

      {/* ── Product Grid ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, idx) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="bg-zinc-900/40 border-white/5 overflow-hidden group hover:border-white/10 transition-all duration-500 shadow-xl hover:shadow-2xl">
                <CardContent className="p-0">
                  {/* Thumbnail Row */}
                  <div className="flex p-4 gap-4 border-b border-white/5 bg-black/20">
                    <div className="w-16 h-16 rounded-lg bg-zinc-800 border border-white/10 shrink-0 overflow-hidden relative">
                       <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       <div className="absolute top-1 right-1">
                          <div className={cn("w-2 h-2 rounded-full", product.status === 'testing' ? "bg-amber-500 animate-pulse" : "bg-emerald-500")} />
                       </div>
                    </div>
                    <div className="min-w-0 flex-1">
                       <div className="flex items-center justify-between gap-2 mb-1">
                          <Badge variant="outline" className="text-[9px] uppercase tracking-tighter border-white/10 text-white/40 h-4">
                             GMC: #{product.gmcId}
                          </Badge>
                          {product.status === 'champion' && (
                             <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-400 uppercase tracking-widest">
                                <Zap className="w-3 h-3 fill-current" /> Champion
                             </div>
                          )}
                       </div>
                       <h3 className="text-xs font-bold text-white/90 truncate group-hover:text-blue-400 transition-colors uppercase leading-relaxed">
                          {product.title}
                       </h3>
                       <p className="text-[10px] text-white/30 truncate mt-1">{product.brand} • {product.category}</p>
                    </div>
                  </div>

                  {/* Performance Data */}
                  <div className="p-4 bg-gradient-to-b from-transparent to-black/20">
                     <div className="flex items-center justify-between mb-4">
                        <div className="space-y-1">
                           <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Efficiency</p>
                           <div className="flex items-center gap-2">
                              <span className="text-lg font-bold">{(product.ctr * 100).toFixed(2)}%</span>
                              <span className={cn(
                                "text-[10px] font-bold px-1 rounded",
                                product.ctr > 2 ? "text-emerald-400 bg-emerald-500/10" : "text-amber-400 bg-amber-500/10"
                              )}>
                                 {product.ctr > 2 ? 'High' : 'Low'}
                              </span>
                           </div>
                        </div>
                        <div className="text-right space-y-1">
                           <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Title Score</p>
                           <div className="flex items-center gap-2 justify-end">
                              <span className="text-lg font-bold" style={{ color: getTitleScoreColor(product.titleScore) }}>
                                 {product.titleScore}
                              </span>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <div className="space-y-2">
                           <div className="flex justify-between text-[10px] font-bold tracking-tighter">
                              <span className="text-white/20 uppercase">Optimization Status</span>
                              <span style={{ color: getTitleScoreColor(product.titleScore) }}>{getTitleScoreLabel(product.titleScore)}</span>
                           </div>
                           <Progress 
                             value={product.titleScore} 
                             className="h-1 bg-white/5" 
                             indicatorClassName={cn(
                               product.titleScore < 50 ? "bg-red-500" : product.titleScore < 80 ? "bg-amber-500" : "bg-emerald-500"
                             )}
                           />
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                           <div>
                              <p className="text-[9px] text-white/30 uppercase font-bold mb-1">Impact</p>
                              <p className="text-xs font-bold text-blue-400">{product.impressions.toLocaleString()} <span className="text-[10px] font-normal text-white/20">Impr.</span></p>
                           </div>
                           <div className="text-right">
                              <p className="text-[9px] text-white/30 uppercase font-bold mb-1">ROAS</p>
                              <p className="text-xs font-bold text-white/80">{product.conversions} <span className="text-[10px] font-normal text-white/20">Conv.</span></p>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Action Row */}
                  <div className="p-3 bg-black flex items-center justify-between border-t border-white/5">
                     <Button size="sm" variant="ghost" className="h-8 text-[10px] uppercase font-bold tracking-widest text-white/40 hover:text-white hover:bg-white/5 px-2">
                        View Analytics <ArrowUpRight className="ml-1 w-3 h-3" />
                     </Button>
                     <div className="flex items-center gap-1">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-white/5 bg-zinc-900 group-hover:border-blue-500/30 transition-all">
                           <Zap className="w-3.5 h-3.5 fill-current text-blue-500" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 border-white/5 bg-zinc-900">
                           <MoreVertical className="w-3.5 h-3.5 text-white/40" />
                        </Button>
                     </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Helper for class merging
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
