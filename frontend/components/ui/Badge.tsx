import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "orange";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default:
    "bg-brand-brown-dark/60 text-brand-cream-muted border-brand-brown-dark",

  success:
    "bg-emerald-900/40 text-emerald-300 border-emerald-700/50",

  warning:
    "bg-amber-900/40 text-amber-300 border-amber-700/50",

  danger:
    "bg-red-900/40 text-red-300 border-red-700/50",

  info:
    "bg-blue-900/40 text-blue-300 border-blue-700/50",

  orange:
    "bg-orange-500/15 text-orange-400 border-orange-500/40",
};

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}