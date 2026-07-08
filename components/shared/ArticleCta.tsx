'use client';

import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CTASection = () => {
  return (
    <section
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(241, 245, 249, 0.95) 50%, rgba(248, 250, 252, 0.9) 100%)",
      }}
    >
      {/* Background Gradient Overlays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full bg-indigo-100/30 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-slate-100/20 blur-2xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Limited Time Offer Badge */}
        <div className="flex justify-center mb-6">
          <Badge
            variant="secondary"
            className="font-semibold text-sm tracking-wider bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 px-4 py-2 gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Limited Time Offer
          </Badge>
        </div>

        {/* Main Content */}
        <div className="text-center">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: "#1F2937" }}
          >
            Apply for Your Personal Loan Today
          </h2>

          <p
            className="text-lg sm:text-xl leading-relaxed mb-8 max-w-3xl mx-auto"
            style={{ color: "#64748B" }}
          >
            Join thousands of Canadians who have found better loan options with LoanHero Canada. Apply now and get your personalized offers in minutes.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center mb-8">
            <a
              href="/loan-application"
              target="_blank"
              rel="sponsored noopener noreferrer"
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'loan_application_click', {
                    event_category: 'engagement',
                    event_label: 'Main CTA Button',
                    event_source: 'cta_section'
                  });
                }
              }}
              className="inline-block"
            >
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-offset-2 ring-2 ring-indigo-200 ring-offset-2 ring-offset-white active:scale-95"
                style={{
                  background: "var(--gradient-primary)",
                  color: "#FFFFFF",
                }}
              >
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4 text-indigo-600" />
              <p className="text-sm" style={{ color: "#64748B" }}>
                <strong>No-Impact Credit Check:</strong> Comparing offers will not affect your credit score.
              </p>
            </div>
            <p className="text-sm" style={{ color: "#64748B" }}>
              No obligation • 100% Free
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        button:hover {
          background-color: #4F46E5 !important;
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
};

export default CTASection;
