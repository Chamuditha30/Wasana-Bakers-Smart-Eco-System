import React from "react";
import FilterPill from "./FilterPill";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";

export default function FilterGroup({ options, value, onChange }) {
  const selectedOption = options.find((option) => option.value === value);
  return (
    <div className="my-4">
      {/* Desktop pills */}
      <div className="hidden flex-wrap justify-center gap-2 md:flex md:justify-start">
        {options.map((option) => (
          <FilterPill
            key={option.value}
            label={option.label}
            active={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>

      {/* Mobile dropdown */}
      <div className="md:hidden">
        <Listbox value={value} onChange={onChange}>
          <div className="relative">
            <ListboxButton className="bg-surface flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-2.5 text-sm">
              {({ open }) => (
                <>
                  <span>{selectedOption?.label}</span>

                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${
                      open ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </>
              )}
            </ListboxButton>

            <ListboxOptions className="absolute z-20 mt-2 w-full rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
              {options.map((option) => (
                <ListboxOption
                  key={option.value}
                  value={option.value}
                  className={({ active, selected }) =>
                    `cursor-pointer rounded-md px-4 py-2 text-sm ${
                      active ? "bg-gray-100" : ""
                    } ${selected ? "text-primary font-semibold" : ""}`
                  }
                >
                  {option.label}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>
    </div>
  );
}
