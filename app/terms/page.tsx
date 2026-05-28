import React from 'react';
import Script from 'next/script';
import LegalHero from '@/components/legal/LegalHero';
import TermsContent from '@/components/legal/TermsContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | LoanHero',
  description: 'Read the Terms of Service for LoanHero. Understand our policies, user agreements, and service guidelines for personal loans in Canada.',
  alternates: {
    canonical: 'https://loanhero.ca/terms',
  },
};

export default function TermsPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://loanhero.ca" },
      { "@type": "ListItem", "position": 2, "name": "Terms of Service", "item": "https://loanhero.ca/terms" }
    ]
  };

  return (
    <>
      <Script id="terms-breadcrumb" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <LegalHero title="Terms of Service" subtitle="Last Updated" />
      <TermsContent />
    </>
  );
}
