"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { getOrders, getCustomers, getProducts, createOrder } from "@/lib/api";
import type { Order, Customer, Product } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { LoadingSpinner, EmptyState } from "@/components/ui/Loading";
import { formatCurrency, formatDate } from "@/lib/utils";

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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paidAmount, setPaidAmount] = useState(0);

  useEffect(() => {
    Promise.all([getOrders(), getCustomers(), getProducts()])
      .then(([o, c, p]) => {
        setOrders(o);
        setCustomers(c);
        setProducts(p);
      })
      .finally(() => setLoading(false));
  }, []);

  const selectedProduct = products.find((p) => p.id === +productId);
  const total = selectedProduct ? selectedProduct.sell_price * quantity : 0;

  async function handleCreate() {
    if (!customerId || !productId) return;
    setSaving(true);
    const orderData: Partial<Order> = {
      customer: +customerId,
      items: [
        {
          product_id: +productId,
          product_name: selectedProduct?.name,
          quantity,
          unit_price: selectedProduct?.sell_price || 0,
        },
      ],
      total_amount: total,
      paid_amount: paidAmount,
      status: "pending",
      payment_status: paidAmount >= total ? "paid" : paidAmount > 0 ? "partial" : "unpaid",
    };

    try {
      const created = await createOrder(orderData);
      setOrders((prev) => [created, ...prev]);
    } catch {
      const customer = customers.find((c) => c.id === +customerId);
      setOrders((prev) => [
        {
          ...orderData,
          id: Date.now(),
          customer_name: customer?.name,
          created_at: new Date().toISOString(),
        } as Order,
        ...prev,
      ]);
    }
    setModalOpen(false);
    setSaving(false);
    setCustomerId("");
    setProductId("");
    setQuantity(1);
    setPaidAmount(0);
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-cream">Orders</h2>
          <p className="text-sm text-brand-cream-muted">Track and manage orders</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" /> Add Order
        </Button>
      </div>

      {orders.length === 0 ? (
        <EmptyState message="No orders yet." action={<Button onClick={() => setModalOpen(true)}>Add Order</Button>} />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-brand-brown-dark/60">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-brand-brown-dark/60 bg-brand-black-light text-brand-cream-muted">
                <th className="px-4 py-3 text-left font-medium">Order #</th>
                <th className="px-4 py-3 text-left font-medium">Customer</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-right font-medium">Total</th>
                <th className="px-4 py-3 text-right font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Payment</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-brand-brown-dark/20 last:border-0">
                  <td className="px-4 py-3 text-brand-cream font-medium">#{order.id}</td>
                  <td className="px-4 py-3 text-brand-cream-muted">
                    {order.customer_name || `#${order.customer}`}
                  </td>
                  <td className="px-4 py-3 text-brand-cream-muted">{formatDate(order.created_at)}</td>
                  <td className="px-4 py-3 text-right text-brand-cream">
                    {formatCurrency(order.total_amount)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Badge variant={statusVariant[order.status]}>{order.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Badge variant={paymentVariant[order.payment_status]}>
                      {order.payment_status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create Order" wide>
        <div className="space-y-4">
          <Select
            label="Customer"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            options={[
              { value: "", label: "Select customer..." },
              ...customers.map((c) => ({ value: c.id, label: c.name })),
            ]}
          />
          <Select
            label="Product"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            options={[
              { value: "", label: "Select product..." },
              ...products.map((p) => ({ value: p.id, label: `${p.name} — ${formatCurrency(p.sell_price)}` })),
            ]}
          />
          <Input
            label="Quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(+e.target.value)}
          />
          <Input
            label="Paid Amount"
            type="number"
            min={0}
            value={paidAmount}
            onChange={(e) => setPaidAmount(+e.target.value)}
          />
          <div className="rounded-xl bg-brand-brown-dark/30 px-4 py-3 flex justify-between">
            <span className="text-brand-cream-muted">Total</span>
            <span className="text-lg font-bold text-brand-gold">{formatCurrency(total)}</span>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleCreate} disabled={saving || !customerId || !productId}>
            {saving ? "Creating..." : "Create Order"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
