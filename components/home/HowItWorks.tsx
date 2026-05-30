import React from 'react';
import { Play } from 'lucide-react';
import Link from 'next/link';

// Premium Inline SVGs
const FileIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
);
const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);
const DollarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);

const HowItWorks = () => {
  const steps = [
    {
      icon: FileIcon,
      title: 'Apply Online',
      desc: 'Fill out our simple 2-minute application form with basic information.',
      stepNum: 1,
    },
    {
      icon: SearchIcon,
      title: 'Instant Decision',
      desc: 'Our AI system reviews your application and matches you with the best lender.',
      stepNum: 2,
    },
    {
      icon: DollarIcon,
      title: 'Get Your Money',
      desc: 'Once approved, funds are deposited directly to your bank account.',
      stepNum: 3,
    },
  ];

  return (
    <section className="bg-slate-50 py-16" id="how-it-works">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-indigo-700 font-bold mb-3 tracking-widest uppercase text-xs">Our Process</p>
          <h2 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight px-4">
            Getting your loan is as<br className="md:hidden" /> easy as <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">1-2-3</span>
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">
            Our streamlined process gets you funded fast, with no hidden hurdles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[40%] left-0 w-full h-0.5 bg-slate-200 z-0"></div>

          {steps.map((step, i) => (
            <div key={i} className="relative z-10 group">
              <div className="bg-white p-7 rounded-[1.8rem] border border-slate-100 shadow-md transition-all duration-300 hover:scale-[1.02] hover:border-[var(--primary)]/20 hover:shadow-lg text-center h-full flex flex-col items-center">
                {/* Step Number Indicator */}
                <div 
                  className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-7 h-7 text-white rounded-full flex items-center justify-center font-black text-xs shadow-lg shadow-indigo-500/20"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  {step.stepNum}
                </div>

                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5 shadow-xl shadow-indigo-500/10 transition-transform"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <step.icon className="w-6 h-6" />
                </div>
                
                <h3 className="font-black text-lg text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed text-[13px]">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            suppressHydrationWarning
            href="/loan-application" 
            className="inline-flex items-center gap-3 text-white px-10 py-3 rounded-xl font-bold text-base shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 hover:shadow-indigo-500/40 ring-4 ring-indigo-500/10 hover:ring-indigo-500/20 group"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <Play className="w-5 h-5 fill-current" />
            Start Application
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
