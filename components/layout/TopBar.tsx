"use client";

import React from 'react';

const TopBar = () => {
  return (
    <div 
      suppressHydrationWarning
      className="text-white py-2 relative overflow-hidden"
      style={{ background: 'var(--gradient-primary)' }}
    >
      <div suppressHydrationWarning className="absolute inset-0 bg-black/5"></div>
      <div suppressHydrationWarning className="container mx-auto px-4 relative z-10 text-center text-[0.85rem] font-medium tracking-wide">
        Get a lower interest rate on your first loan!
      </div>
      
      {/* Shimmer Effect */}
      <div suppressHydrationWarning className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2 -translate-x-full animate-[shimmer_4s_infinite]" />
    </div>
  );
};

export default TopBar;
