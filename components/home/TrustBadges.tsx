import React from 'react';
import { ShieldCheck, Lock, Star, Headset } from 'lucide-react';

const TrustBadges = () => {
  const badges = [
    {
      icon: ShieldCheck,
      title: 'Licensed & Regulated',
      desc: 'Fully compliant in all provinces',
    },
    {
      icon: Lock,
      title: 'Bank-Level Security',
      desc: '256-bit SSL encryption',
    },
    {
      icon: Star,
      title: '4.9/5 Rating',
      desc: 'Based on 10,000+ reviews',
    },
    {
      icon: Headset,
      title: '24/7 Support',
      desc: 'Always here to help',
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10">
          <h2 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
            Trusted by <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Thousands of Canadians</span>
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-medium">Experience the safety and reliability of Canada&apos;s leading smart loan platform.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {badges.map((badge, i) => (
            <div 
              key={i} 
              className="group p-6 bg-slate-50/50 rounded-2xl border border-slate-100 transition-all duration-300 hover:scale-[1.03] hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <div 
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-indigo-500/10 transition-transform group-hover:scale-110"
                style={{ background: 'var(--gradient-primary)' }}
              >
                <badge.icon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-lg leading-tight mb-2">{badge.title}</h4>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
