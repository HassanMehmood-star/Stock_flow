"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Package, TrendingUp, AlertTriangle, Users } from "lucide-react";

function DashboardPreview() {
  return (
    <div className="h-full w-full bg-brand-black p-3 sm:p-4 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-red-500/80" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/80" />
          <div className="h-2 w-2 rounded-full bg-green-500/80" />
        </div>

        <span className="text-[10px] text-brand-cream-muted">
          StockFlow Dashboard
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        {[
          {
            icon: Package,
            label: "Products",
            value: "248",
            color: "text-orange-400",
          },
          {
            icon: AlertTriangle,
            label: "Low Stock",
            value: "5",
            color: "text-amber-400",
          },
          {
            icon: TrendingUp,
            label: "Orders",
            value: "32",
            color: "text-emerald-400",
          },
          {
            icon: Users,
            label: "Receivables",
            value: "₨1.2M",
            color: "text-blue-400",
          },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-lg bg-brand-black-light/80 border border-orange-400/15 p-2"
          >
            <card.icon className={`h-3 w-3 ${card.color} mb-1`} />

            <p className="text-[10px] text-brand-cream-muted">
              {card.label}
            </p>

            <p className={`text-sm font-bold ${card.color}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-brand-black-light/80 border border-orange-400/15 p-2 mb-2">
        <div className="flex items-end gap-1 h-12">
          {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map(
            (h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-orange-400/20 to-orange-400"
                style={{ height: `${h}%` }}
              />
            )
          )}
        </div>
      </div>

      <div className="space-y-1">
        {[
          "Ali Traders — ₨32,500",
          "Metro Construction — ₨102,000",
          "Hassan Hardware — ₨8,400",
        ].map((row, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded bg-orange-400/5 px-2 py-1"
          >
            <span className="text-[9px] text-brand-cream-muted truncate">
              {row}
            </span>

            <span
              className={`text-[8px] px-1.5 py-0.5 rounded-full ${
                i === 0
                  ? "bg-amber-900/40 text-amber-300"
                  : i === 1
                  ? "bg-emerald-900/40 text-emerald-300"
                  : "bg-blue-900/40 text-blue-300"
              }`}
            >
              {i === 0 ? "Pending" : i === 1 ? "Paid" : "Partial"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LaptopMockup() {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [8, -8]),
    {
      stiffness: 150,
      damping: 20,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
    {
      stiffness: 150,
      damping: 20,
    }
  );

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      animate={{ y: [0, -12, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative mx-auto w-full max-w-lg"
    >
      <div className="absolute -inset-4 rounded-3xl bg-orange-400/5 blur-2xl" />

      <div className="relative">
        <div className="rounded-t-2xl border border-orange-400/20 bg-gradient-to-b from-orange-500/10 to-brand-black-light p-3 sm:p-4 shadow-2xl">
          <div className="aspect-[16/10] overflow-hidden rounded-lg border border-orange-400/15 bg-brand-black shadow-inner">
            <DashboardPreview />
          </div>
        </div>

        <div className="mx-auto h-3 w-[90%] rounded-b-lg  from-orange-500/20 to-brand-black" />

        <div className="mx-auto h-1.5 w-[70%] rounded-b-xl bg-orange-400/30" />
      </div>
    </motion.div>
  );
}