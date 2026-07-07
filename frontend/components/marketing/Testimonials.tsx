"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Raza",
    business: "Hardware Store Owner, Lahore",
    quote:
      "StockFlow replaced our messy Excel sheets. Now I know exactly what's in stock and who owes me money — in seconds.",
    rating: 5,
  },
  {
    name: "Fatima Noor",
    business: "Reflective Tape Dealer, Karachi",
    quote:
      "The customer ledger feature alone saved us hours every week. My staff can take orders without calling me constantly.",
    rating: 5,
  },
  {
    name: "Usman Ali",
    business: "Steel Sheet Wholesaler, Faisalabad",
    quote:
      "Low stock alerts mean we never miss a sale. Setup took less than an hour and my team was using it the same day.",
    rating: 4,
  },
  {
    name: "Sara Khan",
    business: "Industrial Supplies, Islamabad",
    quote:
      "Finally, software that understands how local businesses actually work. Simple, fast, and affordable.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative">
      <div className="absolute inset-0 bg-orange-500/5" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-cream mb-4">
            Trusted by{" "}
            <span className="text-orange-500">
              Local Businesses
            </span>
          </h2>

          <p className="text-brand-cream-muted">
            See what business owners are saying about StockFlow.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-orange-500/20 bg-brand-black-light/70 p-6 hover:border-orange-500/50 transition-all duration-300"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`h-4 w-4 ${
                      j < t.rating
                        ? "fill-orange-500 text-orange-500"
                        : "text-orange-900/50"
                    }`}
                  />
                ))}
              </div>

              <p className="text-sm text-brand-cream-muted leading-relaxed mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div>
                <p className="font-semibold text-brand-cream text-sm">
                  {t.name}
                </p>

                <p className="text-xs text-orange-400/80">
                  {t.business}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}