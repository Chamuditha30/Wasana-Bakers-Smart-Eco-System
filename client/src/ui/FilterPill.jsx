import React from "react";

export default function FilterPill({ label, active, count = null, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition duration-150 flex items-center gap-1.5 select-none ${
        active
          ? "bg-[#d9222a] text-white shadow-sm font-semibold"
          : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
      }`}
    >
      <span>{label}</span>
      {count !== null && (
        <span
          className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
            active ? "bg-white text-[#d9222a]" : "bg-neutral-100 text-neutral-600"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}