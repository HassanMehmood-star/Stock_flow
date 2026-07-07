"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "@/lib/api";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { LoadingSpinner, EmptyState } from "@/components/ui/Loading";
import { cn, formatCurrency } from "@/lib/utils";

const emptyProduct: Partial<Product> = {
  name: "",
  type: "",
  color: "",
  width: "",
  grade: "",
  unit: "piece",
  cost_price: 0,
  sell_price: 0,
  retail_price: 0,
  current_stock: 0,
  low_stock_threshold: 10,
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Partial<Product>>(emptyProduct);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProducts().then(setProducts).finally(() => setLoading(false));
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() {
    setEditing(null);
    setForm(emptyProduct);
    setModalOpen(true);
  }

  function openEdit(product: Product) {
    setEditing(product);
    setForm(product);
    setModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      if (editing) {
        const updated = await updateProduct(editing.id, form);
        setProducts((prev) => prev.map((p) => (p.id === editing.id ? updated : p)));
      } else {
        const created = await createProduct(form);
        setProducts((prev) => [...prev, created]);
      }
      setModalOpen(false);
    } catch {
      if (editing) {
        setProducts((prev) =>
          prev.map((p) => (p.id === editing.id ? { ...p, ...form } as Product : p))
        );
      } else {
        setProducts((prev) => [
          ...prev,
          { ...form, id: Date.now() } as Product,
        ]);
      }
      setModalOpen(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
    } catch {
      /* fallback: remove locally */
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-brand-cream">Products</h2>
          <p className="text-sm text-brand-cream-muted">Manage your inventory</p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-cream-muted" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-xl border border-brand-brown-dark/80 bg-brand-black-light/80 pl-10 pr-4 py-2.5 text-sm text-brand-cream placeholder:text-brand-cream-muted/50 focus:border-brand-gold/60 focus:outline-none"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No products found." action={<Button onClick={openAdd}>Add Product</Button>} />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-brand-brown-dark/60">
          <table className="w-full min-w-[800px] text-sm">
            <thead>
              <tr className="border-b border-brand-brown-dark/60 bg-brand-black-light text-brand-cream-muted">
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-right font-medium">Stock</th>
                <th className="px-4 py-3 text-right font-medium">Sell Price</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => {
                const lowStock = product.current_stock <= product.low_stock_threshold;
                return (
                  <tr
                    key={product.id}
                    className={cn(
                      "border-b border-brand-brown-dark/20 last:border-0",
                      lowStock && "bg-red-900/10"
                    )}
                  >
                    <td className="px-4 py-3 text-brand-cream font-medium">
                      {product.name}
                      {lowStock && (
                        <span className="ml-2 text-xs text-red-400">Low stock</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-brand-cream-muted">{product.type}</td>
                    <td className={cn("px-4 py-3 text-right", lowStock ? "text-red-400 font-semibold" : "text-brand-cream")}>
                      {product.current_stock} {product.unit}
                    </td>
                    <td className="px-4 py-3 text-right text-brand-cream">
                      {formatCurrency(product.sell_price)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(product)}
                          className="rounded-lg p-1.5 text-brand-cream-muted hover:bg-brand-brown-dark/50 hover:text-brand-gold"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="rounded-lg p-1.5 text-brand-cream-muted hover:bg-red-900/30 hover:text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Product" : "Add Product"}
        wide
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Name" value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Type" value={form.type || ""} onChange={(e) => setForm({ ...form, type: e.target.value })} />
          <Input label="Color" value={form.color || ""} onChange={(e) => setForm({ ...form, color: e.target.value })} />
          <Input label="Width" value={form.width || ""} onChange={(e) => setForm({ ...form, width: e.target.value })} />
          <Input label="Grade" value={form.grade || ""} onChange={(e) => setForm({ ...form, grade: e.target.value })} />
          <Select
            label="Unit"
            value={form.unit || "piece"}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
            options={[
              { value: "piece", label: "Piece" },
              { value: "kg", label: "Kg" },
              { value: "roll", label: "Roll" },
              { value: "sheet", label: "Sheet" },
            ]}
          />
          <Input label="Cost Price" type="number" value={form.cost_price || ""} onChange={(e) => setForm({ ...form, cost_price: +e.target.value })} />
          <Input label="Sell Price" type="number" value={form.sell_price || ""} onChange={(e) => setForm({ ...form, sell_price: +e.target.value })} />
          <Input label="Retail Price" type="number" value={form.retail_price || ""} onChange={(e) => setForm({ ...form, retail_price: +e.target.value })} />
          <Input label="Current Stock" type="number" value={form.current_stock || ""} onChange={(e) => setForm({ ...form, current_stock: +e.target.value })} />
          <Input label="Low Stock Threshold" type="number" value={form.low_stock_threshold || ""} onChange={(e) => setForm({ ...form, low_stock_threshold: +e.target.value })} />
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
