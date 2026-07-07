import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Share2, Globe, Mail } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-orange-500/20 bg-brand-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Logo size="lg" />

            <p className="mt-4 text-sm text-brand-cream-muted max-w-xs leading-relaxed">
              Inventory, orders, and customer ledger management — built for
              local businesses that mean business.
            </p>

            <div className="flex gap-4 mt-6">
              {[Share2, Globe, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="rounded-lg border border-orange-500/30 p-2 text-brand-cream-muted hover:text-orange-500 hover:border-orange-500/50 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-brand-cream mb-4">
                {title}
              </h4>

              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-cream-muted hover:text-orange-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-orange-500/20 text-center text-sm text-brand-cream-muted">
          © {new Date().getFullYear()} StockFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}