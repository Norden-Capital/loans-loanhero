import React from 'react';

const WhyChooseUs = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
        <div className="mb-10">
          <p className="text-[var(--primary)] font-bold mb-3 tracking-widest uppercase text-[10px]">Our Story</p>
          <h2 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
            Why Choose <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Us?</span>
          </h2>
          <div 
            className="w-12 h-1 rounded-full mx-auto"
            style={{ background: 'var(--gradient-primary)' }}
          ></div>
        </div>
        <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">
          For over 15 years, we&apos;ve been helping everyday Canadians access fast loans when traditional banks say no. We don&apos;t judge you based on your credit score. We focus on your current ability to repay. Our streamlined application process delivers approval decisions within minutes and we fund your account within one hour via Interac E-transfer. No hidden fees, flexible repayment options, and no collateral required — we make emergency borrowing simple and stress-free.
        </p>
      </div>
    </section>
  );
};

export default WhyChooseUs;
