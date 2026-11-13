import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import React from "react";

export default function CustomSelect({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  disabled = false,
  required = false,
  error = "",
}) {
  //handle selection
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label className="text-muted font-semibold">
          {label}
          {required && <span className="text-red-600"> *</span>}
        </label>
      )}

      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative">
          <ListboxButton className="border-border focus:border-primary focus:ring-primary flex w-full cursor-pointer items-center justify-between rounded-lg border px-4 py-2 text-left outline-none focus:ring-1 disabled:cursor-not-allowed disabled:bg-gray-100">
            <span className={`${selectedOption ? "" : "text-gray-400"}`}>
              {selectedOption?.label || placeholder}
            </span>

            <ChevronDown size={18} />
          </ListboxButton>

          <ListboxOptions
            anchor="bottom"
            className="border-border z-50 mt-1 w-(--button-width) rounded-lg border bg-white p-1 shadow-lg focus:outline-none"
          >
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                className="data-selected:bg-primary/10 cursor-pointer rounded-md px-3 py-2 data-focus:bg-gray-100 data-selected:font-semibold"
              >
                {option.label}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>

      {/* Native form validation */}
      <input
        type="text"
        value={value || ""}
        onChange={() => {}}
        required={required}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
