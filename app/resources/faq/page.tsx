import FAQClient from './FAQClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "FAQ | LoanHero Canada",
  description: "Answers to common questions about applying for a personal loan with LoanHero.",
  alternates: {
    canonical: '/resources/faq',
  },
};

export default function FAQPage() {
  return <FAQClient />;
}
