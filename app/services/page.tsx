import React from 'react';
import Script from 'next/script';
import ServicesHero from '@/components/services/ServicesHero';
import WhyChooseUs from '@/components/services/WhyChooseUs';
import ServicesFeatures from '@/components/services/ServicesFeatures';
import ServicesStats from '@/components/services/ServicesStats';
import FaqCta from '@/components/faq/FaqCta';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fast Emergency Loans Canada | Same Day Funding | LoanHero',
  description: 'Need cash fast? LoanHero provides quick emergency loans in Canada with same-day funding and easy online approvals. Apply now to handle unexpected expenses.',
  alternates: {
    canonical: 'https://loanhero.ca/services',
  },
};

export default function ServicesPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://loanhero.ca" },
      { "@type": "ListItem", "position": 2, "name": "Emergency Loans & Services", "item": "https://loanhero.ca/services" }
    ]
  };

  return (
    <>
      <Script id="services-breadcrumb" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <ServicesHero />
      <WhyChooseUs />
      <ServicesFeatures />
      <ServicesStats />
      <FaqCta />
    </>
  );
}
