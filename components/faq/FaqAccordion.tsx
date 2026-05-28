"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

// Premium Inline SVGs
const DollarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);
const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);
const FileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
);
const UploadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
);
const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const AlertIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);

// Plus and X icons
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
);
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      icon: DollarIcon,
      question: 'How much can I borrow?',
      answer: 'You can borrow between $300 and $3,000 depending on your income and repayment ability. First-time borrowers typically start with smaller amounts and can access higher limits on future loans.',
    },
    {
      icon: CalendarIcon,
      question: 'Can I pay off my loan early?',
      answer: 'Absolutely! There are zero penalties for early repayment. In fact, paying early saves you money on interest. We encourage responsible borrowing.',
    },
    {
      icon: FileIcon,
      question: 'How do I apply?',
      answer: 'Simply fill out our online application form on this website. It takes about 5 minutes and can be completed from any device — computer, tablet, or smartphone.',
    },
    {
      icon: UploadIcon,
      question: 'Do I need to upload documents?',
      answer: 'No documents are required during the application. All applications are approved within minutes without additional paperwork.',
    },
    {
      icon: ClockIcon,
      question: 'How long does approval take?',
      answer: 'All applications are reviewed and approved within minutes. You\'ll receive an email notification with your decision.',
    },
    {
      icon: AlertIcon,
      question: 'What if I\'m rejected?',
      answer: 'If we\'re unable to approve your application, we\'ll explain why via email. Common reasons include insufficient income or inability to verify banking information. You\'re welcome to reapply once your situation changes.',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;

        return (
          <div 
            key={i} 
            onClick={() => setOpenIndex(isOpen ? null : i)}
            className={cn(
              "bg-white rounded-xl overflow-hidden border border-slate-100 cursor-pointer group select-none",
              isOpen ? "shadow-lg shadow-indigo-500/5 ring-1 ring-[var(--primary)]/5" : "shadow-sm hover:shadow-md",
              "transition-all duration-300"
            )}
          >
            <div className="w-full flex items-center justify-between p-4 md:p-5 text-left transition-colors">
              <div className="flex items-center gap-4">
                <div 
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0 shadow-md shadow-indigo-500/10"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <faq.icon />
                </div>
                <span className={cn(
                  "text-sm font-medium transition-colors tracking-tight",
                  isOpen ? "text-[var(--primary)]" : "text-slate-900 group-hover:text-[var(--primary)]"
                )}>
                  {faq.question}
                </span>
              </div>
              <div 
                className={cn(
                  "w-7 h-7 flex items-center justify-center transition-all duration-300",
                  isOpen ? "text-[var(--primary)] rotate-0" : "text-slate-300 group-hover:text-[var(--primary)]"
                )}
              >
                {isOpen ? <CloseIcon /> : <PlusIcon />}
              </div>
            </div>
            
            <div 
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="p-4 md:p-5 pt-0 text-slate-500 leading-relaxed text-xs font-medium border-t border-slate-50/50">
                <div className="pt-3">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
