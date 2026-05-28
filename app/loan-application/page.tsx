import React, { Suspense } from 'react';
import Script from 'next/script';
import AppHero from '@/components/application/AppHero';
import AppForm from '@/components/application/AppForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply for a Personal Loan Online | LoanHero Canada',
  description: 'Start your secure online loan application with LoanHero. Get instant approval decisions and same-day funding for personal and emergency loans.',
  alternates: {
    canonical: 'https://loanhero.ca/loan-application',
  },
};

export default function LoanApplicationPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://loanhero.ca" },
      { "@type": "ListItem", "position": 2, "name": "Loan Application", "item": "https://loanhero.ca/loan-application" }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Script id="application-breadcrumb" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <AppHero />
      <Suspense fallback={<div className="p-8 text-center">Loading application...</div>}>
        <AppForm />
      </Suspense>
    </main>
  );
}
