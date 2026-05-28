"use client";

import React from 'react';
import Particles from '@/components/home/Particles';

const ContactHero = () => {
  return (
    <section className="relative min-h-[30vh] flex items-center justify-center overflow-hidden bg-[#0b0f1a] text-white py-16">
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
      </div>

      <Particles />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="font-['Space_Grotesk'] text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight">
          Get in <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Touch</span>
        </h1>
        <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto leading-relaxed font-medium">
          Have questions? We&apos;re here to help you 24/7. Reach out to us through any of the channels below.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
