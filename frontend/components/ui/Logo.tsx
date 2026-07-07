import Link from "next/link";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  };

  return (
    <Link href="/" className={`font-bold tracking-tight ${sizes[size]}`}>
      <span className="text-brand-gold-bright gold-text-glow">Stock</span>
      <span className="text-brand-cream">Flow</span>
    </Link>
  );
}
