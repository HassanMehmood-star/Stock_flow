"use client";

import { motion } from "framer-motion";
import { Package, BookOpen, Shield, Store } from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Real-time Inventory Tracking",
    description:
      "Know exactly what's in stock across all products. Get instant low-stock alerts before you run out.",
  },
  {
    icon: BookOpen,
    title: "Customer Ledger Built-in",
    description:
      "Track udhaar, payments, and balances per customer. No more separate notebooks or guesswork.",
  },
  {
    icon: Shield,
    title: "Role-based Access",
    description:
      "Give staff limited access while you keep full control. Owners see everything, staff see what they need.",
  },
  {
    icon: Store,
    title: "Built for Local Businesses",
    description:
      "Designed for steel dealers, hardware stores, and wholesalers — not generic enterprise software.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-black-light/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-cream mb-4">
            Why Choose <span className="text-orange-500">StockFlow</span>
          </h2>

          <p className="text-brand-cream-muted max-w-2xl mx-auto">
            Everything you need to run your inventory and customer accounts — nothing you don&apos;t.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-orange-500/30 bg-brand-black-light/40 p-6 hover:border-orange-500/60 transition-all duration-300"
            >
              <div className="mb-4 inline-flex rounded-xl bg-orange-500/10 p-3 group-hover:bg-orange-500/20 transition-colors">
                <feature.icon className="h-6 w-6 text-orange-500" />
              </div>

              <h3 className="text-lg font-semibold text-brand-cream mb-2">
                {feature.title}
              </h3>

              <p className="text-sm text-brand-cream-muted leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}