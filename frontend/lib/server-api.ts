import { cookies } from "next/headers";
import {
  mockCustomers,
  mockDashboardStats,
  mockOrders,
  mockProducts,
  mockUser,
} from "./mock-data";
import type { Customer, DashboardStats, Order, Product, User } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

async function serverFetch<T>(path: string, fallback: T): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get("stockflow_access")?.value;

  if (!token) return fallback;

  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch {
    return fallback;
  }
}

export async function getServerUser(): Promise<User> {
  return serverFetch<User>("/auth/me/", mockUser);
}

export async function getServerProducts(): Promise<Product[]> {
  return serverFetch<Product[]>("/products/", mockProducts);
}

export async function getServerCustomers(): Promise<Customer[]> {
  return serverFetch<Customer[]>("/customers/", mockCustomers);
}

export async function getServerOrders(): Promise<Order[]> {
  return serverFetch<Order[]>("/orders/", mockOrders);
}

export async function getServerDashboardStats(): Promise<DashboardStats> {
  return serverFetch<DashboardStats>("/dashboard/stats/", mockDashboardStats);
}
