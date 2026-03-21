'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  ShieldCheck, 
  RefreshCw,
  Loader2,
  ChevronRight,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createStore } from '@/lib/firebase/firestore';

export default function OnboardingFlow() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [merchantId, setMerchantId] = useState('');
  const [syncCount, setSyncCount] = useState(0);

  const handleConnect = async () => {
    setLoading(true);
    try {
      // Re-trigger OAuth if scopes missing
      const provider = new GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/content');
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      
      // In a real environment, we'd fetch the MerchantID via listGmcAccounts
      setStep(2);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const startSync = async () => {
    setLoading(true);
    // Simulation for first flight
    await new Promise(r => setTimeout(r, 2000));
    setSyncCount(1240);
    setStep(3);
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="max-w-md w-full"
          >
            <Card className="bg-zinc-900/40 border-white/5 shadow-2xl overflow-hidden relative group">
               <div className="h-1.5 w-full bg-zinc-950">
                  <div className="h-full w-1/3 bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
               </div>
               <CardHeader className="text-center pt-8">
                  <CardTitle className="text-2xl font-bold uppercase tracking-tight">Step 1: Authorization</CardTitle>
                  <CardDescription className="text-white/40">Connect Magnify to your Google Merchant Center via secure OAuth.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-6 pb-8">
                  <div className="p-4 rounded-xl bg-blue-600/5 border border-blue-500/10 space-y-3">
                     {[
                       { icon: CheckCircle2, text: "Read product catalog" },
                       { icon: CheckCircle2, text: "Access performance metrics" },
                       { icon: CheckCircle2, text: "Manage supplemental feeds" }
                     ].map((item, i) => (
                       <div key={i} className="flex items-center gap-3 text-xs text-white/60">
                          <item.icon className="w-3.5 h-3.5 text-blue-500" />
                          {item.text}
                       </div>
                     ))}
                  </div>
                  <Button 
                    onClick={handleConnect}
                    disabled={loading}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest text-xs"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Link Merchant Account"} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
               </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-md w-full"
          >
            <Card className="bg-zinc-900/40 border-white/5 border-t-2 border-t-blue-600 shadow-2xl">
               <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Database className="w-6 h-6 text-blue-500" />
                  </div>
                  <CardTitle className="text-2xl font-bold uppercase tracking-tight">Step 2: Initialize Sync</CardTitle>
                  <CardDescription className="text-white/40 pb-4">We found account #123-456-7890. Ready to import your catalog?</CardDescription>
               </CardHeader>
               <CardContent className="space-y-6">
                  <div className="space-y-1">
                     <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Merchant ID (Auto-detected)</label>
                     <div className="bg-black/40 p-3 rounded-lg border border-white/5 font-mono text-sm text-blue-400">123-456-7890</div>
                  </div>
                  <Button 
                    onClick={startSync}
                    disabled={loading}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest text-xs"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Synchronize Catalog"}
                  </Button>
                  <p className="text-[10px] text-center text-white/20">Syncing thousands of products takes ~30 seconds.</p>
               </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full"
          >
            <Card className="bg-zinc-900/40 border-white/5 border-t-2 border-t-emerald-500 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Zap className="w-32 h-32" />
               </div>
               <CardHeader className="text-center pb-2">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400">
                     <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-2xl font-bold uppercase tracking-tight">Sync Complete</CardTitle>
                  <CardDescription className="text-white/40">We've imported and scored {syncCount} products.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-6 pb-8">
                  <div className="grid grid-cols-2 gap-3">
                     <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-center">
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Initial Score</p>
                        <p className="text-2xl font-bold text-red-500">32/100</p>
                     </div>
                     <div className="p-3 bg-black/40 rounded-xl border border-white/5 text-center">
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Critical SKUs</p>
                        <p className="text-2xl font-bold text-blue-400">842</p>
                     </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-4">
                     <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                           <Cpu className="w-5 h-5 text-white" />
                        </div>
                        <div>
                           <p className="text-[11px] font-bold text-white uppercase tracking-tight">Enable Autopilot</p>
                           <p className="text-[10px] text-white/40">Our autonomous engine will begin running A/B tests to recover leaking revenue immediately.</p>
                        </div>
                     </div>
                     <div className="h-px bg-white/5" />
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-white/30 tracking-widest">DATA FLYWHEEL STATUS</span>
                        <span className="text-[10px] font-bold text-blue-400 animate-pulse">CONNECTING...</span>
                     </div>
                  </div>

                  <Button 
                    asChild
                    className="w-full h-12 bg-white text-black hover:bg-white/90 font-bold uppercase tracking-widest text-xs"
                  >
                    <a href="/dashboard">Enter Control Center <ChevronRight className="ml-2 w-4 h-4" /></a>
                  </Button>
               </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
