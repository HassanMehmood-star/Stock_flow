"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  { feature: "Real-time stock alerts", stockflow: true, excel: false, generic: "partial" as const },
  { feature: "Customer ledger (udhaar)", stockflow: true, excel: "partial" as const, generic: false },
  { feature: "Mobile-friendly", stockflow: true, excel: false, generic: true },
  { feature: "Setup time", stockflow: "< 1 hour", excel: "Days", generic: "Weeks" },
  { feature: "Monthly cost", stockflow: "From ₨0", excel: "Free*", generic: "₨10,000+" },
  { feature: "Role-based staff access", stockflow: true, excel: false, generic: "partial" as const },
  { feature: "Built for local dealers", stockflow: true, excel: false, generic: false },
];

function CellValue({ value }: { value: boolean | string | "partial" }) {
  if (value === true)
    return <Check className="h-5 w-5 text-orange-500 mx-auto" />;

  if (value === false)
    return <X className="h-5 w-5 text-red-400/70 mx-auto" />;

  if (value === "partial")
    return <span className="text-xs text-amber-400">Partial</span>;

  return <span className="text-sm text-brand-cream">{value}</span>;
}

export function Comparison() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-cream mb-4">
            StockFlow vs{" "}
            <span className="text-orange-500">The Alternatives</span>
          </h2>

          <p className="text-brand-cream-muted">
            See how we compare to spreadsheets and generic software.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto rounded-2xl border border-orange-500/30"
        >
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-orange-500/20 bg-brand-black-light">
                <th className="px-6 py-4 text-left text-sm font-medium text-brand-cream-muted">
                  Feature
                </th>

                <th className="px-6 py-4 text-center text-sm font-bold text-orange-500">
                  StockFlow
                </th>

                <th className="px-6 py-4 text-center text-sm font-medium text-brand-cream-muted">
                  Excel / Register
                </th>

                <th className="px-6 py-4 text-center text-sm font-medium text-brand-cream-muted">
                  Generic Software
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={
                    i % 2 === 0
                      ? "bg-brand-black/40"
                      : "bg-brand-black-light/20"
                  }
                >
                  <td className="px-6 py-4 text-sm text-brand-cream">
                    {row.feature}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <CellValue value={row.stockflow} />
                  </td>

                  <td className="px-6 py-4 text-center">
                    <CellValue value={row.excel} />
                  </td>

                  <td className="px-6 py-4 text-center">
                    <CellValue value={row.generic} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}