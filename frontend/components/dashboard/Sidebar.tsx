"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BookOpen,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { clearTokens } from "@/lib/auth";
import type { UserRole } from "@/lib/types";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, roles: ["owner", "staff"] },
  { href: "/dashboard/products", label: "Products", icon: Package, roles: ["owner", "staff"] },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart, roles: ["owner", "staff"] },
  { href: "/dashboard/customers", label: "Customers", icon: Users, roles: ["owner", "staff"] },
  { href: "/dashboard/ledger", label: "Ledger", icon: BookOpen, roles: ["owner", "staff"] },
  { href: "/dashboard/settings", label: "Settings", icon: Settings, roles: ["owner"] },
];

export function Sidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const filteredItems = navItems.filter((item) => item.roles.includes(role));

  function handleLogout() {
    clearTokens();
    window.location.href = "/login";
  }

  const navContent = (
    <>
      <div className="px-4 py-6 border-b border-orange-500/20">
        <Logo />
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {filteredItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-orange-500/15 text-orange-500 border border-orange-500/20"
                  : "text-brand-cream-muted hover:bg-orange-500/10 hover:text-brand-cream"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-orange-500/20">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-brand-cream-muted hover:bg-red-900/20 hover:text-red-300 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 rounded-lg bg-brand-black-light border border-orange-500/30 p-2 text-brand-cream"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
      >
        {mobileOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-orange-500/20 bg-brand-black-light transition-transform duration-300 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {navContent}
      </aside>
    </>
  );
}