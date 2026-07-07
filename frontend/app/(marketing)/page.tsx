import type { Metadata } from "next";
import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { Pricing } from "@/components/marketing/Pricing";
import { Testimonials } from "@/components/marketing/Testimonials";
import { WhyChooseUs } from "@/components/marketing/WhyChooseUs";
import { Comparison } from "@/components/marketing/Comparison";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Footer } from "@/components/marketing/Footer";

export const metadata: Metadata = {
  title: "StockFlow — Inventory & Ledger Management for Local Businesses",
  description:
    "Track inventory, manage orders, and handle customer udhaar — all in one place. Built for steel dealers, hardware stores, and wholesalers.",
};

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyChooseUs />
        <Pricing />
        <Testimonials />
        <Comparison />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
