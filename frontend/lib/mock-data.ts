import type {
  Customer,
  DashboardStats,
  LedgerEntry,
  Order,
  Product,
  User,
} from "./types";

export const mockUser: User = {
  id: 1,
  name: "Ahmed Khan",
  email: "ahmed@steelworks.pk",
  role: "owner",
  business: {
    id: 1,
    business_name: "Khan Steel & Tape",
    owner_name: "Ahmed Khan",
    email: "ahmed@steelworks.pk",
    phone: "+92 300 1234567",
    address: "Industrial Area, Lahore",
    plan: "basic",
  },
};

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Reflective Tape 2 inch",
    type: "Tape",
    color: "Yellow",
    width: "2 inch",
    grade: "Premium",
    unit: "roll",
    cost_price: 450,
    sell_price: 650,
    retail_price: 750,
    current_stock: 120,
    low_stock_threshold: 30,
  },
  {
    id: 2,
    name: "Steel Sheet 4x8",
    type: "Sheet",
    color: "Silver",
    width: "4x8 ft",
    grade: "A",
    unit: "sheet",
    cost_price: 8500,
    sell_price: 10200,
    retail_price: 11500,
    current_stock: 18,
    low_stock_threshold: 20,
  },
  {
    id: 3,
    name: "Aluminum Strip 1 inch",
    type: "Strip",
    color: "Silver",
    width: "1 inch",
    grade: "B",
    unit: "kg",
    cost_price: 320,
    sell_price: 420,
    retail_price: 480,
    current_stock: 8,
    low_stock_threshold: 15,
  },
  {
    id: 4,
    name: "Safety Vest",
    type: "Apparel",
    color: "Orange",
    width: "L",
    grade: "Standard",
    unit: "piece",
    cost_price: 280,
    sell_price: 450,
    retail_price: 550,
    current_stock: 45,
    low_stock_threshold: 10,
  },
];

export const mockCustomers: Customer[] = [
  {
    id: 1,
    name: "Ali Traders",
    phone: "+92 321 9876543",
    address: "Saddar, Karachi",
    customer_type: "wholesale",
    total_due: 45000,
  },
  {
    id: 2,
    name: "Metro Construction",
    phone: "+92 333 1122334",
    address: "DHA Phase 5, Lahore",
    customer_type: "corporate",
    total_due: 0,
  },
  {
    id: 3,
    name: "Hassan Hardware",
    phone: "+92 300 5566778",
    address: "Gulberg, Islamabad",
    customer_type: "retail",
    total_due: 12500,
  },
];

export const mockOrders: Order[] = [
  {
    id: 101,
    customer: 1,
    customer_name: "Ali Traders",
    items: [
      { product_id: 1, product_name: "Reflective Tape 2 inch", quantity: 50, unit_price: 650 },
    ],
    total_amount: 32500,
    paid_amount: 0,
    status: "pending",
    payment_status: "unpaid",
    created_at: "2026-07-05T10:30:00Z",
  },
  {
    id: 102,
    customer: 2,
    customer_name: "Metro Construction",
    items: [
      { product_id: 2, product_name: "Steel Sheet 4x8", quantity: 10, unit_price: 10200 },
    ],
    total_amount: 102000,
    paid_amount: 102000,
    status: "delivered",
    payment_status: "paid",
    created_at: "2026-07-04T14:15:00Z",
  },
  {
    id: 103,
    customer: 3,
    customer_name: "Hassan Hardware",
    items: [
      { product_id: 3, product_name: "Aluminum Strip 1 inch", quantity: 20, unit_price: 420 },
    ],
    total_amount: 8400,
    paid_amount: 4000,
    status: "delivered",
    payment_status: "partial",
    created_at: "2026-07-03T09:00:00Z",
  },
];

export const mockLedger: LedgerEntry[] = [
  {
    id: 1,
    customer: 1,
    customer_name: "Ali Traders",
    order: 101,
    type: "debit",
    amount: 32500,
    note: "Order #101 — Reflective Tape",
    created_at: "2026-07-05T10:30:00Z",
  },
  {
    id: 2,
    customer: 3,
    customer_name: "Hassan Hardware",
    order: 103,
    type: "debit",
    amount: 8400,
    note: "Order #103 — Aluminum Strip",
    created_at: "2026-07-03T09:00:00Z",
  },
  {
    id: 3,
    customer: 3,
    customer_name: "Hassan Hardware",
    order: 103,
    type: "credit",
    amount: 4000,
    note: "Partial payment received",
    created_at: "2026-07-03T11:00:00Z",
  },
  {
    id: 4,
    customer: 1,
    customer_name: "Ali Traders",
    order: null,
    type: "debit",
    amount: 12500,
    note: "Previous balance carried forward",
    created_at: "2026-06-28T08:00:00Z",
  },
];

export const mockDashboardStats: DashboardStats = {
  total_products: mockProducts.length,
  low_stock_count: mockProducts.filter(
    (p) => p.current_stock <= p.low_stock_threshold
  ).length,
  pending_orders: mockOrders.filter((o) => o.status === "pending").length,
  total_receivables: mockCustomers.reduce((sum, c) => sum + c.total_due, 0),
};
