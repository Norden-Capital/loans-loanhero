import React from 'react';
import Link from 'next/link';
import { Rocket, CheckCircle2 } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="relative py-16 bg-slate-50 overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="bg-[#0b0f1a] rounded-[2rem] p-8 md:p-12 text-center overflow-hidden relative shadow-2xl">
          {/* Mesh Gradient Overlay - Less transparent */}
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

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="font-['Space_Grotesk'] text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
              Ready to Secure Your <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Financial Future?</span>
            </h2>
            <p className="text-sm md:text-base text-slate-300 mb-8 leading-relaxed font-medium px-4">
              Join over 50,000 Canadians who have accessed fast, fair, and transparent loans. Get approved in minutes.
            </p>

            {/* Button - Now before badges on mobile */}
            <Link 
              suppressHydrationWarning
              href="/loan-application" 
              className="inline-flex items-center gap-3 text-white px-10 py-3.5 rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 hover:shadow-indigo-500/40 ring-4 ring-indigo-500/10 hover:ring-indigo-500/20 group order-1 md:order-2 mb-10"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <Rocket className="w-6 h-6" />
              Apply for Loan
            </Link>

            {/* Badges - 2+1 layout on mobile, now after button */}
            <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-3 md:gap-4 order-2 md:order-1 mb-0 md:mb-10">
              <div className="flex items-center gap-2 text-white font-bold text-[11px] bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md justify-center">
                <CheckCircle2 className="text-[var(--success)] w-3.5 h-3.5" />
                No Credit Check
              </div>
              <div className="flex items-center gap-2 text-white font-bold text-[11px] bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md justify-center">
                <CheckCircle2 className="text-[var(--success)] w-3.5 h-3.5" />
                Instant Funding
              </div>
              <div className="col-span-2 md:col-span-1 flex items-center gap-2 text-white font-bold text-[11px] bg-white/10 px-4 py-1.5 rounded-xl border border-white/10 backdrop-blur-md justify-center w-max mx-auto md:w-auto">
                <CheckCircle2 className="text-[var(--success)] w-3.5 h-3.5" />
                24/7 Support
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
