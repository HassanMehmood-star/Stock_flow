import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-dark" />
      <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-brand-brown/10 blur-3xl" />
      <div className="relative z-10 w-full flex justify-center py-12">
        <SignupForm />
      </div>
    </div>
  );
}
