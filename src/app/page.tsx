'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { signInWithGoogle } from '@/lib/firebase/auth';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  BarChart3, 
  Zap, 
  RefreshCw, 
  Globe, 
  ShieldCheck,
  Search,
  CheckCircle2
} from 'lucide-react';

export default function LandingPage() {
  const { user } = useAuth();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 overflow-x-hidden">
      {/* ── Navigation ────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]">
              M
            </div>
            <span className="text-xl font-bold tracking-tight">Magnify <span className="text-blue-500">2.0</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
            <Link href="#benchmarks" className="hover:text-white transition-colors">Benchmarks</Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <Link href="/dashboard">
                <Button variant="outline" className="border-white/10 hover:bg-white/10 text-white">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Button 
                onClick={handleSignIn}
                className="bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
              >
                Launch App
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* ── Hero Section ──────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full animate-pulse delay-700" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold mb-8 backdrop-blur-sm">
              <Zap className="w-3 h-3 fill-current" />
              <span>THE ABOVE-THE-LINE UPDATE IS HERE</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
              The Data Flywheel for <br />
              <span className="text-blue-500">Google Shopping</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              Experience the first autonomous title optimization engine. 
              Magnify 2.0 learns from thousands of concurrent A/B tests to predict the perfect title structure before you spend a single dollar.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                onClick={handleSignIn}
                className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-500 text-white min-w-[200px]"
              >
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="h-14 px-8 text-lg border-white/10 hover:bg-white/5 text-white bg-transparent min-w-[200px]"
              >
                Watch Demo
              </Button>
            </div>

            {/* Platform Stats */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/5 pt-10 text-left">
              <div>
                <div className="text-3xl font-bold text-white mb-1">500k+</div>
                <div className="text-sm text-white/40 uppercase tracking-widest">Experiments Run</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">24.5%</div>
                <div className="text-sm text-white/40 uppercase tracking-widest">Avg. CTR Lift</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">98%</div>
                <div className="text-sm text-white/40 uppercase tracking-widest">Confidence Index</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">€12M+</div>
                <div className="text-sm text-white/40 uppercase tracking-widest">Revenue Impact</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Dashboard Preview Section ─────────────────────────────────────────── */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent border border-white/20 shadow-2xl shadow-blue-500/10 aspect-video relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bbbda5366391?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700 blur-[2px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            
            <div className="relative h-full w-full flex items-center justify-center">
               <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform shadow-[0_0_30px_rgba(37,99,235,0.6)]">
                    <Zap className="w-8 h-8 text-white fill-current" />
                  </div>
                  <h3 className="text-xl font-bold">Autonomous Dashboard</h3>
                  <p className="text-white/60">Real-time performance predictions in action</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────────────── */}
      <section id="features" className="py-32 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Built Above the Line</h2>
            <p className="text-white/40 max-w-2xl mx-auto">
              Magnify 2.0 isn't just a CRUD app. It's a collective intelligence network where every test result improves the platform for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <RefreshCw className="w-6 h-6 text-blue-500" />,
                title: "Infinite A/B Loop",
                desc: "Our system automatically identifies low-performing SKUs, generates champions, and runs tests 24/7 without your intervention."
              },
              {
                icon: <BarChart3 className="w-6 h-6 text-purple-500" />,
                title: "Prediction Engine",
                desc: "We can predict which title structure will win based on 500,000+ historical experiments across your specific industry niche."
              },
              {
                icon: <Globe className="w-6 h-6 text-emerald-500" />,
                title: "Cross-Store IQ",
                desc: "Benefit from insights gained in your category globally. If 'Brand-First' is winning for shoes in US, your Spanish shoe store knows it instantly."
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-red-500" />,
                title: "Health Guard",
                desc: "Stop revenue leaks. We monitor catalog health daily and flag critical title issues before they impact your ROAS."
              },
              {
                icon: <Search className="w-6 h-6 text-orange-500" />,
                title: "Semantic Analysis",
                desc: "We don't just 'rewrite'. We analyze search query intent to ensure your products match the exact way users are searching."
              },
              {
                icon: <CheckCircle2 className="w-6 h-6 text-blue-400" />,
                title: "GMC First-Class",
                desc: "Native integration via supplemental feeds. No product CSVs, no uploads, no developers required. Pure OAuth simplicity."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl border border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all group">
                <div className="w-12 h-12 rounded-xl bg-black border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────────── */}
      <footer className="py-20 px-4 border-t border-white/5 text-white/30 text-sm text-center">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8 opacity-50 grayscale hover:grayscale-0 transition-all">
             <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center font-bold text-white text-[10px]">M</div>
             <span className="font-bold tracking-tight text-white">Magnify</span>
          </div>
          <p>© 2026 Magnify Shopping. Built for the future of Google Shopping.</p>
        </div>
      </footer>
    </div>
  );
}
