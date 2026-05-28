import Hero from "@/components/home/Hero";
import TrustBadges from "@/components/home/TrustBadges";
import Lenders from "@/components/home/Lenders";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CtaSection from "@/components/home/CtaSection";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <Lenders />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CtaSection />
    </>
  )
}
