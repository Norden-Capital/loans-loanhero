import React from 'react';
import Script from 'next/script';
import LegalHero from '@/components/legal/LegalHero';
import PrivacyContent from '@/components/legal/PrivacyContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | LoanHero',
  description: 'Learn how LoanHero protects your privacy and secures your personal information during the loan application process.',
  alternates: {
    canonical: 'https://loanhero.ca/privacy',
  },
};

export default function PrivacyPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://loanhero.ca" },
      { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://loanhero.ca/privacy" }
    ]
  };

  return (
    <>
      <Script id="privacy-breadcrumb" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <LegalHero title="Privacy Policy" subtitle="Last Updated" />
      <PrivacyContent />
    </>
  );
}
