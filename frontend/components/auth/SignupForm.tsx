"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { signup, login } from "@/lib/api";
import { setTokens } from "@/lib/auth";

export function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    business_name: "",
    owner_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    const newErrors: Record<string, string> = {};

    if (!form.business_name.trim())
      newErrors.business_name = "Business name is required";

    if (!form.owner_name.trim())
      newErrors.owner_name = "Owner name is required";

    if (!form.email.trim())
      newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format";

    if (!form.password)
      newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!form.phone.trim())
      newErrors.phone = "Phone is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;

    setApiError("");
    setLoading(true);

    try {
      await signup(form);

      const tokens = await login({
        email: form.email,
        password: form.password,
      });

      setTokens(tokens.access, tokens.refresh);
      router.push("/dashboard");
    } catch {
      setApiError(
        "Could not create account. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-lg">
      <div className="text-center mb-8">
        <Logo size="lg" />

        <p className="mt-3 text-brand-cream-muted text-sm">
          Start managing your business today
        </p>
      </div>

      <div className="rounded-2xl border border-orange-500/30 bg-brand-black-light/80 p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute bottom-0 left-0 h-40 w-40 bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <form onSubmit={handleSubmit} className="relative space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Business Name"
              value={form.business_name}
              onChange={(e) => update("business_name", e.target.value)}
              placeholder="Khan Steel & Tape"
              error={errors.business_name}
            />

            <Input
              label="Owner Name"
              value={form.owner_name}
              onChange={(e) => update("owner_name", e.target.value)}
              placeholder="Ahmed Khan"
              error={errors.owner_name}
            />
          </div>

          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@business.com"
            error={errors.email}
          />

          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            placeholder="Min. 6 characters"
            error={errors.password}
          />

          <Input
            label="Phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+92 300 1234567"
            error={errors.phone}
          />

          <Textarea
            label="Address"
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            placeholder="Business address"
            rows={2}
          />

          {apiError && (
            <div className="rounded-lg bg-red-900/30 border border-red-700/50 px-4 py-3 text-sm text-red-300">
              {apiError}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-brand-cream-muted">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-orange-500 hover:text-orange-400 transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}