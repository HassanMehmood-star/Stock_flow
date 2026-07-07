"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { LaptopMockup } from "./LaptopMockup";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 gradient-dark" />

      {/* Orange ambient glow */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-orange-400/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-medium text-orange-400 mb-6">
              Inventory & Ledger Management for Local Businesses
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-brand-cream mb-6">
              Business Management{" "}
              <span className="text-orange-400 orange-text-glow">
                Made Simple
              </span>
            </h1>

            <p className="text-lg text-brand-cream-muted max-w-xl mb-8 leading-relaxed">
              Track inventory, manage orders, and handle customer udhaar — all
              in one place. Built for steel dealers, hardware stores, and local
              wholesalers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" href="/signup">
                Try for Free
              </Button>

              <Button variant="outline" size="lg" href="#pricing">
                See Pricing
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <LaptopMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}