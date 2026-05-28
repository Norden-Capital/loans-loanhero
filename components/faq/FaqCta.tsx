"use client";

import React from 'react';
import Link from 'next/link';
import { Rocket } from 'lucide-react';

const FaqCta = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative bg-[#0b0f1a] rounded-[2rem] p-8 md:p-12 text-center overflow-hidden border border-white/5 shadow-2xl">
          {/* Mesh Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 opacity-40 animate-[mesh-move_20s_ease-in-out_infinite]"
              style={{
                background: `
                  radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.4) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.4) 0%, transparent 50%),
                  linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)
                `
              }}
            />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
              Ready to Get Started?
            </h2>
            <p className="text-sm md:text-base text-slate-400 mb-8 leading-relaxed font-medium">
              Apply now and get your loan in under 2 minutes. Fast, secure, and completely transparent.
            </p>
            <Link 
              href="/loan-application" 
              className="inline-flex items-center gap-3 text-white px-8 py-3 rounded-xl font-bold text-base shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 hover:shadow-indigo-500/40 ring-4 ring-indigo-500/10 hover:ring-indigo-500/20 group"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <Rocket className="w-5 h-5" />
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqCta;
