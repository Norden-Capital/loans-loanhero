import React from 'react';
import { Bolt, Lock, Eye, CalendarCheck, ThumbsUp, Smartphone } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Bolt,
      title: 'Lightning Fast',
      desc: 'Get approved in just 2 minutes with our advanced AI-powered assessment system.',
    },
    {
      icon: Lock,
      title: '100% Secure',
      desc: 'Your data is protected with bank-level encryption and security measures.',
    },
    {
      icon: Eye,
      title: 'Transparent',
      desc: 'No hidden fees, no surprises. See exactly what you\'ll pay before you sign.',
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      desc: 'Complete your application entirely on your phone. Manage everything from our app.',
    },
    {
      icon: CalendarCheck,
      title: 'Flexible Terms',
      desc: 'Choose repayment terms that work for your budget. No penalties for early payment.',
    },
    {
      icon: ThumbsUp,
      title: 'No Credit Check',
      desc: 'Bad credit? No problem. We focus on your current ability to repay.',
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-[var(--primary)] font-bold mb-3 tracking-widest uppercase text-[10px]">Advantages</p>
          <h2 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
            Why Choose <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">LoanHero?</span>
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Experience the fastest, most transparent lending process in Canada.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:border-[var(--primary)]/20 hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5 shadow-lg shadow-indigo-500/10 transition-transform"
                style={{ background: 'var(--gradient-primary)' }}
              >
                <f.icon className="w-6 h-6" />
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

export default Features;
