import React from 'react';
import { cn } from "../../lib/utils";

export function Badge({ className, variant, ...props }) {
  // Different slab variants used in the structure
  const variants = {
    silver: "bg-slate-400 text-white",
    gold: "bg-amber-500 text-white",
    platinum: "bg-indigo-500 text-white",
    diamond: "bg-gradient-to-tr from-slate-100 via-white to-slate-200 border border-slate-300 text-slate-800 font-extrabold shadow-[0_0_12px_rgba(255,255,255,0.8)]",
    ruby: "bg-rose-600 text-white",
    outline: "border border-slate-200 text-slate-900 bg-slate-50",
    default: "bg-slate-900 text-slate-50 hover:bg-slate-800",
    light: "bg-slate-100 text-slate-600 border border-slate-200"
  };

  const selectedVariant = variants[variant?.toLowerCase()] || variants.default;

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 w-fit",
        selectedVariant,
        className
      )}
      {...props}
    />
  )
}
