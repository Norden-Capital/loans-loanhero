"use client";

import React, { useEffect, useState, useRef } from 'react';
import Script from 'next/script';
import { useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    LeadScout: any;
  }
}

const AppForm = () => {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // LeadScout Config
    const source = searchParams.get('source');
    const amount = searchParams.get('amount');
    const id = searchParams.get('id');
    const affiliate_sub1 = searchParams.get('affiliate_sub1');
    const affiliate_sub2 = searchParams.get('affiliate_sub2');
    const affiliate_sub5 = searchParams.get('affiliate_sub5');
    const firstname = searchParams.get('firstname');
    const email = searchParams.get('email');

    const formConfig = {
      affiliateCode: id || "4PrKYVa8",
      formId: "1",
      language: "en",
      theme: "light",
      overrides: {
        requestedAmount: {
          max: 3000,
          min: 300,
          step: 100,
        }
      },
      defaultValues: {
        requestedAmount: Number(amount) || 750,
        firstName: firstname || '',
        email: email || ''
      },
      extra: {
        affiliate_sub1: affiliate_sub1 || '',
        affiliate_sub2: affiliate_sub2 || '',
        affiliate_sub5: affiliate_sub5 || null,
        aff_utm_source: source || ''
      },
      conversion: source === 'fb'
        ? { type: 'FACEBOOK' }
        : source === 'tiktok'
          ? { type: 'TIKTOK' }
          : {}
    };

    window.LeadScout = window.LeadScout || {};
    window.LeadScout.onLoad = () => {
      setIsLoaded(true);
      if (formRef.current && window.LeadScout.init) {
        window.LeadScout.init(formRef.current, formConfig);
      }
    };

    // If script is already loaded
    if (window.LeadScout && window.LeadScout.init && !isLoaded) {
      window.LeadScout.onLoad();
    }
  }, [searchParams, isLoaded]);

  return (
    <>
      <Script 
        src="https://app.leadscout.ca/library/library.js" 
        strategy="afterInteractive"
      />
      
      <div className="max-w-3xl mx-auto px-4 -mt-12 relative z-20 mb-16">
        <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-2xl shadow-slate-900/5 border border-slate-100 overflow-hidden relative">
          {/* Top Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--gradient-primary)]" />

          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900 mb-2 tracking-tight">
              Get Your Rate in <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">2 Minutes</span>
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto font-medium">
              Our AI technology compares offers from trusted Canadian lenders to find you the best rate. No credit impact.
            </p>
          </div>

          <div id="lead-scout-form" ref={formRef} className="min-h-[450px]">
            {!isLoaded && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-12 h-12 border-4 border-slate-100 border-t-[var(--primary)] rounded-full animate-spin mb-4"></div>
                <p className="text-sm font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
                  Loading intelligent application...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppForm;
