import React from "react";

export default function CustomInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  required = false,
  ...props
}) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-xs font-bold text-neutral-800">
          {label} {required && <span className="text-[#d9222a]">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-300 bg-white text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#d9222a] focus:ring-1 focus:ring-[#d9222a] transition duration-150 ${className}`}
        {...props}
      />
    </div>
  );
}