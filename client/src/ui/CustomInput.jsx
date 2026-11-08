import { Input } from "@headlessui/react";
import React from "react";

export default function CustomInput({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error = "",
  disabled = false,
  required = false,
  className = "",
  ...props
}) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label className="text-muted font-semibold">
          {label} {required && <span className="text-red-600"> *</span>}
        </label>
      )}

      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        aria-invalid={Boolean(error)}
        className={`border-border focus:border-primary focus:ring-primary w-full rounded border px-4 py-2 transition-colors outline-none focus:ring-1 disabled:cursor-not-allowed disabled:bg-gray-100 md:rounded-lg ${error ? "border-red-600" : "border-border"} ${className}`}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
