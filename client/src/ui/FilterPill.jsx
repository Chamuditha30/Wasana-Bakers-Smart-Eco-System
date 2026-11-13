import { Button } from "@headlessui/react";
import React from "react";

export default function FilterPill({ label, active = false, onClick }) {
  return (
    <Button
      type="button"
      onClick={onClick}
      className={`shrink-0 cursor-pointer rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors ${active ? "bg-primary border-primary text-white" : "bg-surface border-border text-muted hover:bg-stone-200"}`}
    >
      {label}
    </Button>
  );
}
