"use client";

import React from 'react';
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

const PartnersMarquee = () => {
  // Real bank logos from /public/partners/
  const partnerLogos = [
    { name: "BMO", src: "/partners/BMO.svg" },
    { name: "CIBC", src: "/partners/CIBC.svg" },
    { name: "National Bank", src: "/partners/National_Bank.svg" },
    { name: "RBC", src: "/partners/RBC.svg" },
    { name: "Scotiabank", src: "/partners/Scotiabank.svg" },
    { name: "TD Bank", src: "/partners/TD_BANK.svg" }
  ];

  return (
    <section className="relative text-center py-16 bg-white">
      {/* Top border with gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-8 mb-12">
        <h2 className="font-['Space_Grotesk'] text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 mb-4 tracking-tight">
          Trusted by <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Top Lenders</span>
        </h2>
        <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
          We work with Canada&apos;s most respected financial institutions to provide you with secure, transparent, and reliable loan options.
        </p>
      </div>

      <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
        <Marquee
          className="[--duration:50s] marquee-fade gap-12"
          pauseOnHover={true}
        >
          {partnerLogos.map((partner, index) => (
            <div
              key={index}
              className="mx-8 flex items-center justify-center transition-all duration-300 w-32 md:w-40 h-16 shrink-0 cursor-pointer"
            >
              <img 
                src={partner.src} 
                alt={`${partner.name} - Trusted Personal Loan Partner Canada`} 
                className={cn(
                  "w-full h-full object-contain opacity-40 grayscale transition-all duration-500",
                  "hover:opacity-100 hover:grayscale-0 hover:scale-110"
                )}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default PartnersMarquee;
