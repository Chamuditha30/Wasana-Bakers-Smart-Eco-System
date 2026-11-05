import React from "react";
import Card from "./Card";

export default function StatCard({ label, value, subtext, valueColor = "text-neutral-900" }) {
  return (
    <Card className="p-5">
      {label && <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">{label}</p>}
      <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
      {subtext && <p className="text-xs text-neutral-500 mt-1 font-medium">{subtext}</p>}
    </Card>
  );
}