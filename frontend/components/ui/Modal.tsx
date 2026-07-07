"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}

export function Modal({ open, onClose, title, children, wide }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        className={cn(
          "relative z-10 w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-brand-brown-dark/60 bg-brand-black-light shadow-2xl",
          wide ? "max-w-2xl" : "max-w-lg"
        )}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-brand-brown-dark/40 bg-brand-black-light px-6 py-4">
          <h2 className="text-lg font-semibold text-brand-cream">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-brand-cream-muted hover:bg-brand-brown-dark/50 hover:text-brand-cream transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
