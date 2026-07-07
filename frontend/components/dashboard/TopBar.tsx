import { Badge } from "@/components/ui/Badge";
import type { User } from "@/lib/types";

export function TopBar({ user }: { user: User }) {
  console.log("TopBar User Data:", user);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-orange-500/20 bg-brand-black/80 backdrop-blur-md px-4 py-4 lg:px-8">
      <div className="lg:pl-0 pl-12">
        <h1 className="text-lg font-semibold text-brand-cream">
          {user.business_name}
        </h1>

        <p className="text-xs text-brand-cream-muted">
          Welcome back, {user.first_name}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Badge variant={user.role === "owner" ? "orange" : "info"}>
          {user.role === "owner" ? "Owner" : "Staff"}
        </Badge>

        <div className="hidden sm:flex h-9 w-9 rounded-full bg-orange-500/20 border border-orange-500/30 items-center justify-center text-sm font-bold text-orange-500">
          {user.email.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}