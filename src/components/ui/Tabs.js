import React from 'react';
import { cn } from "../../lib/utils";

export function TabsList({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm p-1 text-slate-500 shadow-sm border border-slate-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function TabsTrigger({ className, active, children, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2",
        active 
          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md relative overflow-hidden"
          : "hover:bg-slate-100 hover:text-slate-900",
        className
      )}
      {...props}
    >
      {active && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] animate-[shimmer_2s_infinite]" />
      )}
      {children}
    </button>
  )
}
