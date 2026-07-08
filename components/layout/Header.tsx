"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu, X, ArrowRight, ChevronDown,
  DollarSign, Target, CreditCard, FileText, MapPin,
  Calculator, Scale, BookOpen, HelpCircle, Newspaper, Rss,
  type LucideIcon,
} from 'lucide-react';
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

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  type NavChild = { name: string; href: string; icon: LucideIcon };
  type NavLink = { name: string; href: string; children?: NavChild[] };

  const navLinks: NavLink[] = [
    { name: 'Services', href: '/services' },
    {
      name: 'Loans',
      href: '/loans',
      children: [
        { name: 'By Amount', href: '/loans/by-amount', icon: DollarSign },
        { name: 'By Purpose', href: '/loans/by-purpose', icon: Target },
        { name: 'By Credit Score', href: '/loans/by-credit-score', icon: CreditCard },
        { name: 'By Type', href: '/loans/by-type', icon: FileText },
        { name: 'By Location', href: '/loans/by-location', icon: MapPin },
      ],
    },
    {
      name: 'Resources',
      href: '/resources',
      children: [
        { name: 'Tools', href: '/resources/tools', icon: Calculator },
        { name: 'Comparisons', href: '/resources/comparisons', icon: Scale },
        { name: 'Guides', href: '/resources/guides', icon: BookOpen },
        { name: 'FAQ', href: '/resources/faq', icon: HelpCircle },
        { name: 'Blog', href: '/blog', icon: Newspaper },
        { name: 'News', href: '/news', icon: Rss },
      ],
    },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => pathname === href;
  const isSectionActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

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
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setOpenMenu(link.name)}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-1 text-sm font-semibold transition-colors relative group",
                        isSectionActive(link.href) ? "text-[var(--primary)]" : "text-slate-900 hover:text-[var(--primary)]"
                      )}
                    >
                      {link.name}
                      <ChevronDown className={cn(
                        "w-3.5 h-3.5 transition-transform duration-200",
                        openMenu === link.name ? "rotate-180" : ""
                      )} />
                      <span className={cn(
                        "absolute -bottom-1 left-0 h-0.5 bg-[var(--primary)] transition-all",
                        isSectionActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                      )}></span>
                    </Link>

                    {/* Dropdown */}
                    <div className={cn(
                      "absolute left-1/2 -translate-x-1/2 top-full pt-4 w-60 transition-all duration-200",
                      openMenu === link.name
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-1 pointer-events-none"
                    )}>
                      <div className="bg-white rounded-2xl shadow-2xl shadow-slate-900/10 border border-slate-100 p-2">
                        <Link
                          href={link.href}
                          className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-bold text-[var(--primary)] hover:bg-slate-50 transition-colors"
                        >
                          All {link.name}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <div className="my-1 h-px bg-slate-100" />
                        {link.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={cn(
                              "group/item flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                              isActive(child.href)
                                ? "text-[var(--primary)] bg-slate-50"
                                : "text-slate-600 hover:text-[var(--primary)] hover:bg-slate-50"
                            )}
                          >
                            <span className={cn(
                              "flex items-center justify-center w-8 h-8 rounded-lg shrink-0 transition-colors",
                              isActive(child.href)
                                ? "bg-[var(--primary)] text-white"
                                : "bg-slate-100 text-slate-500 group-hover/item:bg-[var(--primary)] group-hover/item:text-white"
                            )}>
                              <child.icon className="w-4 h-4" />
                            </span>
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
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
                )
              )}
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
        <div className="flex-1 overflow-y-auto py-4 px-6 space-y-1">
          {/* Home */}
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "group flex items-center justify-between p-4 transition-colors border-b border-slate-50",
              isActive('/') ? "text-[var(--primary)]" : "text-slate-900 hover:text-[var(--primary)]"
            )}
          >
            <span className="text-lg font-medium tracking-tight">Home</span>
            <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </Link>

          {navLinks.map((link) =>
            link.children ? (
              <div key={link.name} className="border-b border-slate-50">
                <div className="flex items-center justify-between">
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex-1 py-4 text-lg font-medium tracking-tight transition-colors",
                      isSectionActive(link.href) ? "text-[var(--primary)]" : "text-slate-900 hover:text-[var(--primary)]"
                    )}
                  >
                    {link.name}
                  </Link>
                  <button
                    aria-label={`Toggle ${link.name} menu`}
                    aria-expanded={expandedMobile === link.name}
                    onClick={() => setExpandedMobile(expandedMobile === link.name ? null : link.name)}
                    className="p-2 text-slate-400 transition-transform active:scale-90"
                  >
                    <ChevronDown className={cn(
                      "w-5 h-5 transition-transform duration-200",
                      expandedMobile === link.name ? "rotate-180 text-[var(--primary)]" : ""
                    )} />
                  </button>
                </div>
                <div className={cn(
                  "overflow-hidden transition-all duration-300",
                  expandedMobile === link.name ? "max-h-96 pb-3" : "max-h-0"
                )}>
                  <div className="flex flex-col gap-0.5 pl-2 border-l-2 border-slate-100 ml-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 pl-4 pr-2 py-2.5 text-sm font-medium rounded-lg transition-colors",
                          isActive(child.href) ? "text-[var(--primary)]" : "text-slate-500 hover:text-[var(--primary)]"
                        )}
                      >
                        <span className={cn(
                          "flex items-center justify-center w-7 h-7 rounded-lg shrink-0",
                          isActive(child.href) ? "bg-[var(--primary)] text-white" : "bg-slate-100 text-slate-500"
                        )}>
                          <child.icon className="w-3.5 h-3.5" />
                        </span>
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "group flex items-center justify-between p-4 transition-colors border-b border-slate-50",
                  isActive(link.href) ? "text-[var(--primary)]" : "text-slate-900 hover:text-[var(--primary)]"
                )}
              >
                <span className="text-lg font-medium tracking-tight">{link.name}</span>
                <ArrowRight className={cn(
                  "w-5 h-5 transition-all",
                  isActive(link.href) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                )} />
              </Link>
            )
          )}
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
