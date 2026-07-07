"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "₨0",
    period: "/month",
    description: "Perfect for getting started",
    features: [
      "Up to 50 products",
      "Basic order tracking",
      "1 user account",
      "Customer ledger",
      "Email support",
    ],
    recommended: false,
  },
  {
    id: "basic",
    name: "Basic",
    price: "₨2,999",
    period: "/month",
    description: "For growing businesses",
    features: [
      "Unlimited products",
      "Advanced order management",
      "Up to 5 staff accounts",
      "Low stock alerts",
      "Ledger & payment tracking",
      "Priority support",
    ],
    recommended: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "₨5,999",
    period: "/month",
    description: "Full power for established dealers",
    features: [
      "Everything in Basic",
      "Unlimited staff accounts",
      "Financial reports & analytics",
      "Multi-location support",
      "API access",
      "Dedicated account manager",
    ],
    recommended: false,
  },
];

export function Pricing() {
  const [activePlan, setActivePlan] = useState("basic");

  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 bg-brand-black-light/50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-cream mb-4">
            Simple, Transparent{" "}
            <span className="text-orange-500">Pricing</span>
          </h2>

          <p className="text-brand-cream-muted max-w-2xl mx-auto">
            Choose the plan that fits your business. Upgrade anytime as you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-center">
          {plans.map((plan) => {
            const active = activePlan === plan.id;

            return (
              <motion.div
                key={plan.id}
                onClick={() => setActivePlan(plan.id)}
                animate={{
                  scale: active ? 1.06 : 1,
                }}
                transition={{
                  duration: 0.3,
                }}
                className={cn(
                  "cursor-pointer rounded-2xl border p-8 relative transition-all duration-300",
                  active
                    ? "border-orange-500/60 bg-brand-black-light shadow-2xl"
                    : "border-orange-500/20 bg-brand-black-light/70 hover:border-orange-500/40"
                )}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-bold text-white">
                    Recommended
                  </span>
                )}

                <h3 className="text-2xl font-bold text-brand-cream">
                  {plan.name}
                </h3>

                <p className="text-brand-cream-muted text-sm mt-1">
                  {plan.description}
                </p>

                <div className="mt-6 mb-8">
                  <span
                    className={cn(
                      "text-4xl font-bold",
                      active ? "text-orange-400" : "text-brand-cream"
                    )}
                  >
                    {plan.price}
                  </span>

                  <span className="text-brand-cream-muted">
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-brand-cream-muted"
                    >
                      <Check className="h-4 w-4 text-orange-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant="primary"
                  className="w-full"
                  href={`/signup?plan=${plan.id}`}
                >
                  Get Started
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}