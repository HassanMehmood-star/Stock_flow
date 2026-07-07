import axios from "axios";
import { getAccessToken, clearTokens } from "./auth";
import {
  mockCustomers,
  mockDashboardStats,
  mockLedger,
  mockOrders,
  mockProducts,
  mockUser,
} from "./mock-data";
import type {
  Customer,
  DashboardStats,
  LedgerEntry,
  LoginPayload,
  Order,
  Product,
  SignupPayload,
  User,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      clearTokens();
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

async function withFallback<T>(fetcher: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fetcher();
  } catch {
    return fallback;
  }
}

export async function signup(data: SignupPayload) {
  const res = await api.post("/auth/signup/", data);
  return res.data;
}

export async function login(data: LoginPayload) {
  const res = await api.post<{ access: string; refresh: string }>("/auth/login/", data);
  return res.data;
}

export async function getMe(): Promise<User> {
  return withFallback(async () => {
    const res = await api.get<User>("/auth/me/");
    return res.data;
  }, mockUser);
}

export async function getProducts(): Promise<Product[]> {
  return withFallback(async () => {
    const res = await api.get<Product[]>("/products/");
    return res.data;
  }, mockProducts);
}

export async function createProduct(data: Partial<Product>): Promise<Product> {
  const res = await api.post<Product>("/products/", data);
  return res.data;
}

export async function updateProduct(id: number, data: Partial<Product>): Promise<Product> {
  const res = await api.patch<Product>(`/products/${id}/`, data);
  return res.data;
}

export async function deleteProduct(id: number): Promise<void> {
  await api.delete(`/products/${id}/`);
}

export async function getCustomers(): Promise<Customer[]> {
  return withFallback(async () => {
    const res = await api.get<Customer[]>("/customers/");
    return res.data;
  }, mockCustomers);
}

export async function createCustomer(data: Partial<Customer>): Promise<Customer> {
  const res = await api.post<Customer>("/customers/", data);
  return res.data;
}

export async function getOrders(): Promise<Order[]> {
  return withFallback(async () => {
    const res = await api.get<Order[]>("/orders/");
    return res.data;
  }, mockOrders);
}

export async function createOrder(data: Partial<Order>): Promise<Order> {
  const res = await api.post<Order>("/orders/", data);
  return res.data;
}

export async function getLedger(): Promise<LedgerEntry[]> {
  return withFallback(async () => {
    const res = await api.get<LedgerEntry[]>("/ledger/");
    return res.data;
  }, mockLedger);
}

export async function createLedgerEntry(data: Partial<LedgerEntry>): Promise<LedgerEntry> {
  const res = await api.post<LedgerEntry>("/ledger/", data);
  return res.data;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  return withFallback(async () => {
    const res = await api.get<DashboardStats>("/dashboard/stats/");
    return res.data;
  }, mockDashboardStats);
}
