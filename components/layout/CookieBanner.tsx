"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Check if user has already made a choice
  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    // Set cookies for tracking/analytics
    setCookie("analytics_consent", "true", 365);
    setCookie("marketing_consent", "true", 365);
    setCookie("functional_consent", "true", 365);

    // Store user preference
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem("cookieTimestamp", new Date().toISOString());

    // Hide banner
    setIsVisible(false);

    // Initialize analytics/tracking here
    console.log("Analytics and marketing cookies enabled");
  };

  const handleDecline = () => {
    // Only set essential cookies
    setCookie("analytics_consent", "false", 365);
    setCookie("marketing_consent", "false", 365);
    setCookie("functional_consent", "true", 365); // Essential cookies only

    // Store user preference
    localStorage.setItem("cookieConsent", "declined");
    localStorage.setItem("cookieTimestamp", new Date().toISOString());

    // Hide banner
    setIsVisible(false);

    console.log("Only essential cookies enabled");
  };

  // Helper function to set cookies
  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[10000] p-4 sm:p-6 bg-[#0b0f1a]/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        {/* Text content */}
        <div className="flex-1 pr-4">
          <p className="text-sm font-medium text-slate-300 leading-relaxed tracking-wide">
            We use cookies to improve your experience and deliver personalized services. 
            By continuing to use this site, you agree to our use of cookies.{" "}
            <Link
              href="/privacy"
              className="text-[var(--primary)] hover:text-indigo-400 font-bold transition-colors hover:underline whitespace-nowrap"
            >
              Learn More
            </Link>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end shrink-0">
          <button
            onClick={handleDecline}
            className="px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 hover:border-white/20 whitespace-nowrap"
          >
            Decline All
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-6 py-2.5 text-xs sm:text-sm font-bold rounded-xl text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 hover:shadow-indigo-500/40 ring-4 ring-indigo-500/10 hover:ring-indigo-500/20 whitespace-nowrap"
            style={{ background: 'var(--gradient-primary)' }}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
