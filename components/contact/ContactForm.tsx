"use client";

import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('Thank you for your message! We will get back to you within 24 hours.');
    (e.target as HTMLFormElement).reset();
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-slate-200/20 border border-slate-100">
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-medium text-slate-900 mb-2 tracking-tight">Send Us a Message</h2>
        <div 
          className="w-8 h-1 rounded-full opacity-50"
          style={{ background: 'var(--gradient-primary)' }}
        ></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label htmlFor="name" className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider ml-1">Full Name *</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              placeholder="Full Name"
              className="w-full p-2.5 text-xs bg-slate-50/50 border border-slate-100 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:bg-white transition-all font-medium"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider ml-1">Email Address *</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              placeholder="Email Address"
              className="w-full p-2.5 text-xs bg-slate-50/50 border border-slate-100 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:bg-white transition-all font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label htmlFor="phone" className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider ml-1">Phone Number *</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              required 
              placeholder="(555) 123-4567"
              className="w-full p-2.5 text-xs bg-slate-50/50 border border-slate-100 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:bg-white transition-all font-medium"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="subject" className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider ml-1">Subject *</label>
            <select 
              id="subject" 
              name="subject" 
              required
              className="w-full p-2.5 text-xs bg-slate-50/50 border border-slate-100 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:bg-white transition-all appearance-none font-medium cursor-pointer"
            >
              <option value="">Select Topic</option>
              <option value="loan-inquiry">Loan Inquiry</option>
              <option value="support">Support</option>
              <option value="complaint">Complaint</option>
              <option value="feedback">Feedback</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="message" className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider ml-1">Message *</label>
          <textarea 
            id="message" 
            name="message" 
            required 
            placeholder="How can we help?"
            rows={3}
            className="w-full p-2.5 text-xs bg-slate-50/50 border border-slate-100 rounded-xl focus:outline-none focus:border-[var(--primary)] focus:bg-white transition-all resize-none font-medium"
          />
        </div>

        <div className="pt-2">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/10 transition-all hover:scale-[1.01] hover:shadow-indigo-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 ring-2 ring-indigo-500/5 hover:ring-indigo-500/10"
            style={{ background: 'var(--gradient-primary)' }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
