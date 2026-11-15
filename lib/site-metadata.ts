import type { FileOgImage, Metadata } from "@/lib/metadata";
import altText from "@/lib/og-assets/opengraph-image.alt.txt?raw";

/** Site-wide defaults (was app/layout.tsx `metadata`). Pages override keys of this. */
export const siteMetadata: Metadata = {
  metadataBase: new URL("https://loanhero.ca"),
  title: "LoanHero - Quick & Easy Personal Loans Canada | Fast Approval & Competitive Rates",
  description: "LoanHero: Get instant personal loans in Canada with competitive rates and fast approval. Simple online application, secure process, and trusted lending solutions for all your financial needs.",
  keywords: ["loanhero", "personal loans Canada", "quick loans", "fast approval", "competitive rates", "online loan application", "instant loans", "Canadian lending", "financial solutions", "secure loans"],
  authors: [{ name: "LoanHero" }],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://loanhero.ca/",
  },
  openGraph: { images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    type: "website",
    url: "https://loanhero.ca/",
    title: "LoanHero - Quick & Easy Personal Loans Canada",
    description: "Get instant personal loans with competitive rates and fast approval. Simple online application, secure process, and trusted lending solutions.",
    locale: "en_CA",
    siteName: "LoanHero",
  },
  twitter: {
    card: "summary_large_image",
    title: "LoanHero - Quick & Easy Personal Loans Canada",
    description: "Get instant personal loans with competitive rates and fast approval. Simple online application, secure process, and trusted lending solutions.",
  },
  manifest: "/manifest.webmanifest",
  themeColor: "#588157",
  other: {
    "revisit-after": "7 days",
    "contact": "info@loanhero.ca",
    "phone": "+1-800-ASK-LOAN",
    "geo.region": "CA",
    "geo.placename": "Canada",
    "ICBM": "56.1304, -106.3468",
    "business:contact_data:country_name": "Canada",
  },
};

/**
 * The home page's social image (was app/opengraph-image.png + .alt.txt). The
 * query string is the cache key the old site used for this same file.
 */
export const homeOgImage: FileOgImage = {
  url: "/opengraph-image.png?opengraph-image.0dxv7-m_xfwtm.png",
  type: "image/png",
  width: 1200,
  height: 630,
  alt: altText.replace(/\r\n/g, "\n"),
};

/** Favicons (were app/favicon.ico and app/icon.png), with the same cache keys. */
export const iconLinks =
  '<link rel="icon" href="/favicon.ico?favicon.0pupb1j96jsx2.ico" sizes="256x256" type="image/x-icon"/>' +
  '<link rel="icon" href="/icon.png?icon.0-e03xvaw67~p.png" sizes="48x48" type="image/png"/>';

/** Structured data the old layout added after page load (next/script afterInteractive). */
export const siteJsonLd: { id: string; data: object }[] = [
  {
    id: "financial-service-jsonld",
    data: {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "LoanHero",
      "alternateName": "Loan Hero",
      "url": "https://loanhero.ca",
      "logo": "https://loanhero.ca/favicon.svg",
      "image": "https://loanhero.ca/opengraph-image",
      "description": "Quick and easy personal loans in Canada with competitive rates, fast approval, and secure online application process.",
      "email": "info@loanhero.ca",
      "telephone": "+1-800-ASK-LOAN",
      "areaServed": { "@type": "Country", "name": "Canada" },
      "serviceArea": { "@type": "Country", "name": "Canada" },
      "serviceType": [
        "Personal Loans", "Quick Loans", "Instant Loans",
        "Online Loans", "Emergency Loans", "Bad Credit Loans"
      ],
      "priceRange": "$$",
      "knowsAbout": [
        "Personal Finance", "Quick Financing", "Online Lending",
        "Credit Solutions", "Fast Loan Applications", "Emergency Funding"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Loan Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Personal Loans",
              "description": "Quick personal loans for any purpose with competitive rates"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Emergency Loans",
              "description": "Fast emergency funding when you need it most"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Bad Credit Loans",
              "description": "Loans available even with poor credit history"
            }
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "25000",
        "bestRating": "5",
        "worstRating": "1"
      },
      "sameAs": [
        "https://www.facebook.com/loanhero",
        "https://www.linkedin.com/company/loanhero",
        "https://twitter.com/loanhero"
      ]
    },
  },
  {
    id: "organization-jsonld",
    data: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "LoanHero",
      "url": "https://loanhero.ca",
      "logo": "https://loanhero.ca/favicon.svg",
      "foundingDate": "2020",
      "slogan": "Quick & Easy Personal Loans",
      "description": "Leading Canadian online lending platform providing quick personal loans with competitive rates and fast approval.",
      "areaServed": { "@type": "Country", "name": "Canada" },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+1-800-ASK-LOAN",
          "contactType": "customer service",
          "areaServed": "CA",
          "availableLanguage": ["English"]
        },
        {
          "@type": "ContactPoint",
          "email": "info@loanhero.ca",
          "contactType": "customer service",
          "areaServed": "CA"
        }
      ],
      "brand": {
        "@type": "Brand",
        "name": "LoanHero",
        "slogan": "Quick & Easy Personal Loans"
      }
    },
  },
  {
    id: "faq-jsonld",
    data: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How fast can I get my loan approved?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "With LoanHero, most applications are approved within minutes. Once approved, funds are typically deposited into your account within 24 hours."
          }
        },
        {
          "@type": "Question",
          "name": "Can I apply with bad credit?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we consider applications from people with various credit backgrounds. While credit score is a factor, we also consider your income and overall financial situation."
          }
        },
        {
          "@type": "Question",
          "name": "Is the application process secure?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. We use bank-level encryption and security measures to protect your personal and financial information throughout the application process."
          }
        }
      ]
    },
  },
];
