import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/server-api";
import { Badge } from "@/components/ui/Badge";

export default async function SettingsPage() {
  const user = await getServerUser();

  if (user.role !== "owner") {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-brand-cream">Settings</h2>
        <p className="text-sm text-brand-cream-muted mt-1">
          Manage your business profile and plan
        </p>
      </div>

      <div className="rounded-2xl border border-brand-brown-dark/60 bg-brand-black-light/60 p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-brand-cream mb-4">Business Profile</h3>
          <dl className="space-y-4">
            {[
              { label: "Business Name", value: user.business.business_name },
              { label: "Owner", value: user.business.owner_name },
              { label: "Email", value: user.business.email },
              { label: "Phone", value: user.business.phone },
              { label: "Address", value: user.business.address },
            ].map((item) => (
              <div key={item.label} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <dt className="text-sm text-brand-cream-muted">{item.label}</dt>
                <dd className="text-sm text-brand-cream font-medium">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="border-t border-brand-brown-dark/40 pt-6">
          <h3 className="text-lg font-semibold text-brand-cream mb-4">Plan</h3>
          <div className="flex items-center gap-3">
            <Badge variant="gold" className="capitalize">
              {user.business.plan} Plan
            </Badge>
            <span className="text-sm text-brand-cream-muted">
              Contact support to upgrade your plan.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
