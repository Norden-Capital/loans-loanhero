"use client";

import React from 'react';
import Link from 'next/link';
import { Rocket, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

// Premium Inline SVGs
const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const ShieldIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);
const DollarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
import Particles from './Particles';

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-[#0b0f1a] text-white flex items-center py-20">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-40 animate-[mesh-move_20s_ease-in-out_infinite]"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(139, 92, 246, 0.4) 0%, transparent 50%),
              linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)
            `
          }}
        />
        <div 
          className="absolute inset-0 opacity-30"
          style={{ 
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>')`
          }}
        />
      </div>

      <Particles />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="font-['Space_Grotesk'] text-5xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-4 tracking-tight">
              Get Your <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Loan</span><br />
              In Under 2 Minutes
            </h1>
            <p className="text-sm md:text-base text-slate-400 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium px-4 md:px-0">
              Fast, secure, and transparent loans from $300 to $3,000. 
              No hidden fees, no credit check required, instant approval guaranteed.
            </p>

            {/* Stats - 2 Rows on Mobile, Side Padding */}
            <div className="grid grid-cols-2 lg:flex lg:flex-row items-center justify-center lg:justify-start gap-y-6 gap-x-4 md:gap-12 mb-10 max-w-md mx-auto lg:mx-0 px-6 md:px-0">
              {[
                { number: '50K+', label: 'Customers' },
                { number: '2 Min', label: 'Approval' },
                { number: '99.8%', label: 'Success' },
              ].map((stat, i) => (
                <div key={i} className={cn(
                  "text-center lg:text-left transition-transform hover:scale-105",
                  i === 2 ? "col-span-2 lg:col-span-1" : ""
                )}>
                  <span className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold block bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
                    {stat.number}
                  </span>
                  <span className="text-slate-500 text-[10px] md:text-[11px] font-bold uppercase tracking-widest block mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start px-6 md:px-0">
              <Link 
                suppressHydrationWarning
                href="/loan-application" 
                className="text-white px-8 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 hover:shadow-indigo-500/40 ring-4 ring-indigo-500/10 hover:ring-indigo-500/20"
                style={{ background: 'var(--gradient-primary)' }}
              >
                <Rocket className="w-5 h-5" />
                Apply Now
              </Link>
              <Link suppressHydrationWarning href="/contact" className="bg-white/5 text-white px-8 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border-2 border-white/5 backdrop-blur-md transition-all hover:scale-105 hover:bg-white/10 hover:border-white/20">
                <Phone className="w-4 h-4" />
                Contact Us
              </Link>
            </div>
          </div>

          {/* Hero Visual - Updated Floating Cards */}
          <div className="relative h-[400px] lg:h-[500px] hidden md:flex items-center justify-center">
            <div className="relative w-full h-full">
              {[
                { icon: ClockIcon, title: '2 Min Approval', desc: 'Lightning Fast', pos: 'top-[0%] left-[12%]', delay: '0s' },
                { icon: ShieldIcon, title: '100% Secure', desc: 'Bank Level', pos: 'top-[10%] right-[0%]', delay: '2s' },
                { icon: DollarIcon, title: '$300-3000', desc: 'Instant Cash', pos: 'bottom-[10%] right-[10%]', delay: '1s' },
              ].map((el, i) => (
                <div 
                  key={i}
                  className={`absolute bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 flex flex-col items-center text-center gap-4 shadow-2xl animate-[float_6s_ease-in-out_infinite] ${el.pos} min-w-[160px]`}
                  style={{ animationDelay: el.delay }}
                >
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    <el.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white mb-1">{el.title}</h4>
                    <p className="text-xs text-slate-400">{el.desc}</p>
                  </div>
                </div>
              ))}
              
              {/* Central Glowing Rocket */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500 blur-[60px] opacity-40 animate-pulse"></div>
                  <div 
                    className="relative w-40 h-40 md:w-48 md:h-48 rounded-full flex items-center justify-center text-white shadow-2xl animate-[pulse_3.5s_ease-in-out_infinite] border-4 border-white/20"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    <Rocket className="w-20 h-20 md:w-24 md:h-24" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
