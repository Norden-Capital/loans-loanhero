import React from 'react';

// Premium Inline SVGs
const FastIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
);
const SecurityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);
const EyeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
);
const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>
);
const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);
const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3"/><path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5"/></svg>
);

const ServicesFeatures = () => {
  const features = [
    {
      icon: UserIcon,
      title: 'No Credit Score Judgment',
      desc: 'We focus on your current ability to repay, not your past mistakes.',
    },
    {
      icon: FastIcon,
      title: 'Lightning Fast Approval',
      desc: 'Get your approval decision within minutes, not days or weeks.',
    },
    {
      icon: RocketIcon,
      title: 'Same-Day Funding',
      desc: 'Funds transferred within one hour via Interac E-transfer.',
    },
    {
      icon: EyeIcon,
      title: 'No Hidden Fees',
      desc: 'Complete transparency with all costs clearly outlined upfront.',
    },
    {
      icon: CalendarIcon,
      title: 'Flexible Repayment',
      desc: 'Choose repayment options that work with your budget.',
    },
    {
      icon: SecurityIcon,
      title: 'No Collateral Required',
      desc: 'Access funds without putting your assets at risk.',
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-indigo-700 font-bold mb-3 tracking-widest uppercase text-[10px]">Advantages</p>
          <h2 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
            What Makes Us <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Different</span>
          </h2>
          <div 
            className="w-12 h-1 rounded-full mx-auto"
            style={{ background: 'var(--gradient-primary)' }}
          ></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:border-[var(--primary)]/20 hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5 shadow-lg shadow-indigo-500/10 transition-transform"
                style={{ background: 'var(--gradient-primary)' }}
              >
                <f.icon />
              </div>
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesFeatures;
