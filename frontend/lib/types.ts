export type UserRole = "owner" | "staff";

export interface Business {
  id: number;
  business_name: string;
  owner_name: string;
  email: string;
  phone: string;
  address: string;
  plan: string;
}

export interface User {
  first_name: string;
  business_name: string;
  id: number;
  name: string;
  email: string;
  role: UserRole;
  business: Business;
}

export interface Product {
  id: number;
  name: string;
  type: string;
  color: string;
  width: string;
  grade: string;
  unit: string;
  cost_price: number;
  sell_price: number;
  retail_price: number;
  current_stock: number;
  low_stock_threshold: number;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
  address: string;
  customer_type: string;
  total_due: number;
}

export interface OrderItem {
  product_id: number;
  product_name?: string;
  quantity: number;
  unit_price: number;
}

export interface Order {
  id: number;
  customer: number;
  customer_name?: string;
  items: OrderItem[];
  total_amount: number;
  paid_amount: number;
  status: "pending" | "delivered" | "cancelled";
  payment_status: "unpaid" | "partial" | "paid";
  created_at?: string;
}

export interface LedgerEntry {
  id: number;
  customer: number;
  customer_name?: string;
  order: number | null;
  type: "debit" | "credit";
  amount: number;
  note: string;
  created_at?: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface SignupPayload {
  business_name: string;
  owner_name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface DashboardStats {
  total_products: number;
  low_stock_count: number;
  pending_orders: number;
  total_receivables: number;
}
