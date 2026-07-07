"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { getLedger, getCustomers, createLedgerEntry } from "@/lib/api";
import type { LedgerEntry, Customer } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { LoadingSpinner, EmptyState } from "@/components/ui/Loading";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function LedgerPage() {
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filterCustomer, setFilterCustomer] = useState("");
  const [form, setForm] = useState({
    customer: "",
    type: "credit" as "debit" | "credit",
    amount: 0,
    note: "",
  });

  useEffect(() => {
    Promise.all([getLedger(), getCustomers()])
      .then(([l, c]) => {
        setEntries(l);
        setCustomers(c);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = filterCustomer
    ? entries.filter((e) => e.customer === +filterCustomer)
    : entries;

  async function handleSave() {
    if (!form.customer || !form.amount) return;
    setSaving(true);
    const data: Partial<LedgerEntry> = {
      customer: +form.customer,
      order: null,
      type: form.type,
      amount: form.amount,
      note: form.note,
    };

    try {
      const created = await createLedgerEntry(data);
      setEntries((prev) => [created, ...prev]);
    } catch {
      const customer = customers.find((c) => c.id === +form.customer);
      setEntries((prev) => [
        {
          ...data,
          id: Date.now(),
          customer_name: customer?.name,
          created_at: new Date().toISOString(),
        } as LedgerEntry,
        ...prev,
      ]);
    }
    setModalOpen(false);
    setSaving(false);
    setForm({ customer: "", type: "credit", amount: 0, note: "" });
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-cream">Ledger</h2>
          <p className="text-sm text-brand-cream-muted">Customer debit & credit history</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" /> Add Payment
        </Button>
      </div>

      <div className="max-w-xs">
        <Select
          label="Filter by Customer"
          value={filterCustomer}
          onChange={(e) => setFilterCustomer(e.target.value)}
          options={[
            { value: "", label: "All customers" },
            ...customers.map((c) => ({ value: c.id, label: c.name })),
          ]}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No ledger entries found." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-brand-brown-dark/60">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-brand-brown-dark/60 bg-brand-black-light text-brand-cream-muted">
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Customer</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-right font-medium">Amount</th>
                <th className="px-4 py-3 text-left font-medium">Note</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry) => (
                <tr key={entry.id} className="border-b border-brand-brown-dark/20 last:border-0">
                  <td className="px-4 py-3 text-brand-cream-muted">{formatDate(entry.created_at)}</td>
                  <td className="px-4 py-3 text-brand-cream">
                    {entry.customer_name || `#${entry.customer}`}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={entry.type === "debit" ? "danger" : "success"}>
                      {entry.type}
                    </Badge>
                  </td>
                  <td className={`px-4 py-3 text-right font-semibold ${entry.type === "debit" ? "text-red-400" : "text-emerald-400"}`}>
                    {entry.type === "debit" ? "+" : "−"}{formatCurrency(entry.amount)}
                  </td>
                  <td className="px-4 py-3 text-brand-cream-muted">{entry.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Payment / Entry">
        <div className="space-y-4">
          <Select
            label="Customer"
            value={form.customer}
            onChange={(e) => setForm({ ...form, customer: e.target.value })}
            options={[
              { value: "", label: "Select customer..." },
              ...customers.map((c) => ({ value: c.id, label: c.name })),
            ]}
          />
          <Select
            label="Type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as "debit" | "credit" })}
            options={[
              { value: "credit", label: "Credit (Payment Received)" },
              { value: "debit", label: "Debit (Amount Owed)" },
            ]}
          />
          <Input
            label="Amount"
            type="number"
            min={0}
            value={form.amount || ""}
            onChange={(e) => setForm({ ...form, amount: +e.target.value })}
          />
          <Input
            label="Note"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            placeholder="Payment description..."
          />
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
        </div>
      </Modal>
    </div>
  );
}
