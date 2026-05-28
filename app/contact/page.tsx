import React from 'react';
import Script from 'next/script';
import ContactHero from '@/components/contact/ContactHero';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact LoanHero | Customer Support & Personal Loan Inquiries',
  description: 'Need help with your personal loan application? Contact the LoanHero customer support team today for fast, friendly assistance in Canada.',
  alternates: {
    canonical: 'https://loanhero.ca/contact',
  },
};

export default function ContactPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://loanhero.ca" },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://loanhero.ca/contact" }
    ]
  };

  return (
    <>
      <Script id="contact-breadcrumb" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <ContactHero />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
