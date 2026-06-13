"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Home, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

// Inline SVG Components for Social Icons
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'FR'>('EN');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const sidebarLinks = [
    { name: 'Home', href: '/', icon: Home },
    ...navLinks
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[9999] transition-all duration-300 bg-white/95 backdrop-blur-md",
          isScrolled ? "shadow-lg border-b border-slate-100" : "shadow-sm"
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <nav className="grid grid-cols-2 md:grid-cols-3 items-center py-2.5">
            {/* Logo - Left column */}
            <Link href="/" className="flex items-center transition-transform hover:scale-105 justify-self-start">
              <Image src="/favicon.svg" alt="LoanHero - Fast Personal Loans Canada" width={160} height={36} className="h-9 w-auto" priority />
            </Link>

            {/* Desktop Navigation - Center column */}
            <div className="hidden md:flex items-center justify-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={cn(
                    "text-sm font-semibold transition-colors relative group",
                    isActive(link.href) ? "text-[var(--primary)]" : "text-slate-900 hover:text-[var(--primary)]"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-[var(--primary)] transition-all",
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  )}></span>
                </Link>
              ))}
            </div>

            {/* CTA - Right column */}
            <div className="flex items-center justify-end gap-3 md:gap-4">
              {/* Language Switch */}
              {/* TODO: Implement multi-language functionality in the future to route between EN/FR
              <div className="flex items-center bg-slate-100/80 p-0.5 rounded-lg border border-slate-200 backdrop-blur-sm">
                <button
                  onClick={() => setLanguage('EN')}
                  className={cn(
                    "px-2 py-0.5 text-[11px] font-bold rounded-md transition-all",
                    language === 'EN' 
                      ? "bg-white text-[var(--primary)] shadow-sm" 
                      : "text-slate-500 hover:text-slate-700"
                  )}
                  aria-label="Switch to English"
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('FR')}
                  className={cn(
                    "px-2 py-0.5 text-[11px] font-bold rounded-md transition-all",
                    language === 'FR' 
                      ? "bg-white text-[var(--primary)] shadow-sm" 
                      : "text-slate-500 hover:text-slate-700"
                  )}
                  aria-label="Switch to French"
                >
                  FR
                </button>
              </div>
              */}

              <Link 
                href="/loan-application" 
                className="hidden md:block text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 hover:shadow-indigo-500/40 ring-4 ring-indigo-500/10 hover:ring-indigo-500/20"
                style={{ background: 'var(--gradient-primary)' }}
              >
                Apply Now
              </Link>
              
              <button 
                aria-label="Open Menu"
                className="md:hidden text-[var(--primary)] p-2 transition-transform active:scale-90"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={26} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Modern Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-[10000] bg-slate-950/40 backdrop-blur-sm transition-opacity duration-500 md:hidden",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={cn(
          "fixed top-0 right-0 z-[10001] h-full w-[85%] max-w-sm bg-white shadow-2xl transition-all duration-500 ease-out md:hidden flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div className="p-6 flex items-center justify-end">
          <button
            aria-label="Close Menu"
            className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-slate-950 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex-1 overflow-y-auto py-4 px-6 space-y-2">
          {sidebarLinks.map((link, i) => (
            <Link key={link.name}
              href={link.href}
              className={cn(
                "group flex items-center justify-between p-4 transition-all duration-300 border-b border-slate-50 last:border-0",
                isActive(link.href) 
                  ? "text-[var(--primary)]" 
                  : "text-slate-900 hover:text-[var(--primary)]"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="relative">
                <span className="text-lg font-medium tracking-tight">{link.name}</span>
                <span className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-[var(--primary)] transition-all",
                  isActive(link.href) ? "w-full" : "w-0"
                )}></span>
              </div>
              <ArrowRight className={cn(
                "w-5 h-5 transition-all",
                isActive(link.href) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
              )} />
            </Link>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-8 bg-white flex flex-col items-center">
          <Link href="/loan-application"
            className="inline-flex items-center justify-center gap-3 text-white px-8 py-3 rounded-xl font-bold text-base shadow-lg shadow-indigo-500/10 ring-4 ring-indigo-500/10 mb-6 w-full"
            style={{ background: 'var(--gradient-primary)' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Apply for Loan
          </Link>

          <div className="flex justify-center gap-6">
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-400 hover:text-[var(--primary)] cursor-pointer transition-colors">
              <FacebookIcon />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-slate-400 hover:text-[var(--primary)] cursor-pointer transition-colors">
              <TwitterIcon />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-400 hover:text-[var(--primary)] cursor-pointer transition-colors">
              <InstagramIcon />
            </Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-[var(--primary)] cursor-pointer transition-colors">
              <LinkedinIcon />
            </Link>
          </div>
          <p className="text-center text-slate-400 text-[10px] mt-6 font-bold uppercase tracking-widest">
            © 2026 LoanHero Canada
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;
