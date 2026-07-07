import { Package, AlertTriangle, ShoppingCart, Wallet } from "lucide-react";
import { getServerDashboardStats, getServerOrders } from "@/lib/server-api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

const statusVariant = {
  pending: "warning" as const,
  delivered: "success" as const,
  cancelled: "danger" as const,
};

const paymentVariant = {
  unpaid: "danger" as const,
  partial: "warning" as const,
  paid: "success" as const,
};

export default async function DashboardOverviewPage() {
  const [stats, orders] = await Promise.all([
    getServerDashboardStats(),
    getServerOrders(),
  ]);

  const recentOrders = orders.slice(0, 5);
  const chartData = [40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88];

  const cards = [
    {
      label: "Total Products",
      value: stats.total_products.toString(),
      icon: Package,
      color: "text-brand-gold",
      bg: "bg-brand-gold/10",
    },
    {
      label: "Low Stock Alerts",
      value: stats.low_stock_count.toString(),
      icon: AlertTriangle,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      label: "Pending Orders",
      value: stats.pending_orders.toString(),
      icon: ShoppingCart,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Total Receivables",
      value: formatCurrency(stats.total_receivables),
      icon: Wallet,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-brand-cream">Overview</h2>
        <p className="text-sm text-brand-cream-muted mt-1">
          Your business at a glance
        </p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-brand-brown-dark/60 bg-brand-black-light/60 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-brand-cream-muted">{card.label}</span>
              <div className={`rounded-lg p-2 ${card.bg}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </div>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-brand-brown-dark/60 bg-brand-black-light/60 p-6">
          <h3 className="text-lg font-semibold text-brand-cream mb-4">
            Orders Trend
          </h3>
          <div className="flex items-end gap-2 h-48">
            {chartData.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-brand-gold/20 to-brand-gold/70 transition-all"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] text-brand-cream-muted">
                  {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-brand-brown-dark/60 bg-brand-black-light/60 p-6">
          <h3 className="text-lg font-semibold text-brand-cream mb-4">
            Recent Orders
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-brown-dark/40 text-brand-cream-muted">
                  <th className="pb-3 text-left font-medium">Order</th>
                  <th className="pb-3 text-left font-medium">Customer</th>
                  <th className="pb-3 text-right font-medium">Amount</th>
                  <th className="pb-3 text-right font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-brand-brown-dark/20 last:border-0"
                  >
                    <td className="py-3 text-brand-cream">#{order.id}</td>
                    <td className="py-3 text-brand-cream-muted">
                      {order.customer_name || `Customer #${order.customer}`}
                    </td>
                    <td className="py-3 text-right text-brand-cream">
                      {formatCurrency(order.total_amount)}
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end gap-1.5">
                        <Badge variant={statusVariant[order.status]}>
                          {order.status}
                        </Badge>
                        <Badge variant={paymentVariant[order.payment_status]}>
                          {order.payment_status}
                        </Badge>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
