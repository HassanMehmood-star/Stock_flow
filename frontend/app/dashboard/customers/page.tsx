"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { getCustomers, createCustomer } from "@/lib/api";
import type { Customer } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { LoadingSpinner, EmptyState } from "@/components/ui/Loading";
import { cn, formatCurrency } from "@/lib/utils";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    customer_type: "retail",
  });

  useEffect(() => {
    getCustomers().then(setCustomers).finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      const created = await createCustomer({ ...form, total_due: 0 });
      setCustomers((prev) => [...prev, created]);
    } catch {
      setCustomers((prev) => [
        ...prev,
        { ...form, id: Date.now(), total_due: 0 } as Customer,
      ]);
    }
    setModalOpen(false);
    setSaving(false);
    setForm({ name: "", phone: "", address: "", customer_type: "retail" });
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-cream">Customers</h2>
          <p className="text-sm text-brand-cream-muted">Manage customer accounts and balances</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" /> Add Customer
        </Button>
      </div>

      {customers.length === 0 ? (
        <EmptyState message="No customers yet." action={<Button onClick={() => setModalOpen(true)}>Add Customer</Button>} />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-brand-brown-dark/60">
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-brand-brown-dark/60 bg-brand-black-light text-brand-cream-muted">
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Phone</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-right font-medium">Total Due</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-brand-brown-dark/20 last:border-0">
                  <td className="px-4 py-3 text-brand-cream font-medium">{customer.name}</td>
                  <td className="px-4 py-3 text-brand-cream-muted">{customer.phone}</td>
                  <td className="px-4 py-3 text-brand-cream-muted capitalize">{customer.customer_type}</td>
                  <td
                    className={cn(
                      "px-4 py-3 text-right font-semibold",
                      customer.total_due > 0 ? "text-red-400" : "text-emerald-400"
                    )}
                  >
                    {formatCurrency(customer.total_due)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Customer">
        <div className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <Textarea label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={2} />
          <Input label="Customer Type" value={form.customer_type} onChange={(e) => setForm({ ...form, customer_type: e.target.value })} placeholder="retail, wholesale, corporate" />
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
        </div>
      </Modal>
    </div>
  );
}
