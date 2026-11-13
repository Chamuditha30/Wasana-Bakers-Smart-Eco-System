import React from "react";
import FilterPill from "./FilterPill";

export default function FilterGroup({ options, value, onChange }) {
  return (
    <div className="my-4 flex flex-wrap justify-center gap-2 md:justify-start">
      {options.map((option) => (
        <FilterPill
          key={option.value}
          label={option.label}
          active={value === option.value}
          onClick={() => onChange(option.value)}
        />
      ))}
    </div>
  );
}
