import React from 'react';
import Script from 'next/script';
import FaqHero from '@/components/faq/FaqHero';
import FaqAccordion from '@/components/faq/FaqAccordion';
import FaqCta from '@/components/faq/FaqCta';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | LoanHero Personal Loans',
  description: 'Got questions about applying for a personal loan in Canada? Read our FAQ for answers about rates, approvals, bad credit, and same-day funding.',
  alternates: {
    canonical: 'https://loanhero.ca/faq',
  },
};

export default function FaqPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://loanhero.ca" },
      { "@type": "ListItem", "position": 2, "name": "FAQ", "item": "https://loanhero.ca/faq" }
    ]
  };

  return (
    <>
      <Script id="faq-breadcrumb" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <FaqHero />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <FaqAccordion />
        </div>
      </section>
      <FaqCta />
    </>
  );
}
