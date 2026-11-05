import React from "react";

export default function Badge({ children, variant = "gray", className = "" }) {
  const variants = {
    green: "text-emerald-700 bg-emerald-50 border-emerald-300",
    amber: "text-amber-700 bg-amber-50 border-amber-300",
    rose: "text-rose-700 bg-rose-50 border-rose-300",
    blue: "text-sky-700 bg-sky-50 border-sky-300",
    gray: "text-neutral-600 bg-neutral-100 border-neutral-300",
  };

  return (
    <span
      className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${variants[variant] || variants.gray} ${className}`}
    >
      {children}
    </span>
  );
}