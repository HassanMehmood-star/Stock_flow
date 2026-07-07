"use client";

import { motion } from "framer-motion";
import { UserPlus, PackagePlus, ClipboardList, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "1",
    title: "Sign Up",
    description:
      "Create your business account in under 2 minutes. No credit card required.",
  },
  {
    icon: PackagePlus,
    step: "2",
    title: "Add Your Products",
    description:
      "Import or manually add your inventory with prices, stock levels, and alerts.",
  },
  {
    icon: ClipboardList,
    step: "3",
    title: "Track Orders & Payments",
    description:
      "Create orders, assign customers, and record payments — ledger updates automatically.",
  },
  {
    icon: TrendingUp,
    step: "4",
    title: "Grow Your Business",
    description:
      "Use insights from your dashboard to restock smart and collect receivables faster.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-brand-black-light/30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-cream mb-4">
            How It{" "}
            <span className="text-orange-500">Works</span>
          </h2>

          <p className="text-brand-cream-muted">
            Get up and running in four simple steps.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5  from-orange-500/20 via-orange-500/50 to-orange-500/20" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="mx-auto mb-6 relative">
                <div className="h-24 w-24 mx-auto rounded-2xl border border-orange-500/30 bg-brand-black-light flex items-center justify-center orange-glow">
                  <step.icon className="h-10 w-10 text-orange-500" />
                </div>

                <span className="absolute -top-2 -right-2 sm:right-auto sm:-left-2 h-8 w-8 rounded-full bg-orange-500 text-white text-sm font-bold flex items-center justify-center">
                  {step.step}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-brand-cream mb-2">
                {step.title}
              </h3>

              <p className="text-sm text-brand-cream-muted leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}