"use client";

import React from 'react';
import { Award, Clock, CheckCircle } from 'lucide-react';

const ServicesStats = () => {
  const stats = [
    {
      icon: Award,
      number: '15+',
      label: 'Years of Service',
    },
    {
      icon: Clock,
      number: '<1hr',
      label: 'Funding Time',
    },
    {
      icon: CheckCircle,
      number: '100%',
      label: 'Transparent',
    },
  ];

  return (
    <section className="relative py-12 bg-[#0b0f1a] overflow-hidden text-white border-y border-white/5">
      {/* Mesh Gradient Background */}
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

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <p className="text-[var(--primary)] font-bold mb-3 tracking-widest uppercase text-[10px]">Track Record</p>
          <h2 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold mb-3 tracking-tight">
            Trusted by <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Canadians</span>
          </h2>
          <p className="text-sm text-slate-400 font-medium">Over 15 years of helping Canadians when they need it most</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group flex flex-col items-center">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white mx-auto mb-4 transition-transform group-hover:scale-110 shadow-lg shadow-indigo-500/10"
                style={{ background: 'var(--gradient-primary)' }}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="font-['Space_Grotesk'] text-3xl font-black mb-0.5 bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesStats;
