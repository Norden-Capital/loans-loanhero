"use client";

import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      text: 'LoanHero saved me when I needed emergency car repairs. The application was so simple, and I had the money in my account within hours.',
      author: 'Sarah M.',
      location: 'Toronto, ON',
      avatar: 'S',
    },
    {
      text: 'I was skeptical about online loans, but LoanHero exceeded my expectations. The process was transparent, fast, and the customer service was excellent.',
      author: 'Mike D.',
      location: 'Vancouver, BC',
      avatar: 'M',
    },
    {
      text: 'No credit check was a game-changer for me. Despite my poor credit history, LoanHero helped me get the funds I needed for my business.',
      author: 'Lisa K.',
      location: 'Calgary, AB',
      avatar: 'L',
    },
  ];

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-slate-50 py-16 overflow-hidden" id="testimonials">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[var(--primary)] font-bold mb-3 tracking-widest uppercase text-xs">Testimonials</p>
          <h2 className="font-['Space_Grotesk'] text-2xl md:text-3xl font-bold text-slate-900 mb-4 tracking-tight">
            What Our <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Customers Say</span>
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-medium">
            Join thousands of satisfied Canadians who trust LoanHero for their financial needs.
          </p>
        </div>

        {/* Carousel Container - Mobile Only Slider */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Mobile Slider View */}
          <div className="lg:hidden relative">
            {/* Arrows Overlaid */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-20 flex justify-between px-2 pointer-events-none">
              <button 
                onClick={prev}
                className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-slate-600 pointer-events-auto active:scale-90 transition-transform"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={next}
                className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-slate-600 pointer-events-auto active:scale-90 transition-transform"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="overflow-hidden px-4 pt-4 pb-4">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((t, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-2">
                    <div className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-md relative">
                      <div 
                        className="absolute top-[-12px] right-8 w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/10"
                        style={{ background: 'var(--gradient-primary)' }}
                      >
                        <Quote className="w-4 h-4" />
                      </div>

                      <div className="flex gap-1 text-yellow-400 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>

                      <p className="text-slate-600 leading-relaxed mb-6 text-[15px] font-medium min-h-[80px]">
                        &quot;{t.text}&quot;
                      </p>

                      <div className="flex items-center gap-3 border-t border-slate-50 pt-5">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-base font-black shrink-0"
                          style={{ background: 'var(--gradient-primary)' }}
                        >
                          {t.avatar}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-[15px] leading-none mb-1">{t.author}</h4>
                          <p className="text-slate-400 font-bold text-[10px] tracking-wide uppercase">{t.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-300",
                    activeIndex === i ? "w-5 bg-[var(--primary)]" : "bg-slate-300"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Desktop Static Grid View */}
          <div className="hidden lg:grid grid-cols-3 gap-6 pt-4">
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className="relative bg-white p-7 rounded-[2rem] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] transition-all duration-300 hover:scale-[1.02] hover:border-[var(--primary)]/20 hover:shadow-lg"
              >
                <div 
                  className="absolute top-[-12px] right-8 w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/10"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <Quote className="w-4 h-4" />
                </div>

                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-slate-600 leading-relaxed mb-6 text-[15px] font-medium relative z-10">
                  &quot;{t.text}&quot;
                </p>

                <div className="flex items-center gap-3 border-t border-slate-50 pt-5">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-base font-black shrink-0 shadow-lg shadow-indigo-500/10"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-[15px] leading-none mb-1">{t.author}</h4>
                    <p className="text-slate-400 font-bold text-[10px] tracking-wide uppercase">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
