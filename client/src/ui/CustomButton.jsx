import React from "react";
import { Button } from "@headlessui/react";

const variantStyles = {
  primary: "bg-[#d9222a] text-white hover:bg-[#b81b22] shadow-sm",
  secondary: "bg-white border border-neutral-300 text-neutral-800 hover:bg-neutral-50",
  outlined: "border border-[#d9222a] text-[#d9222a] hover:bg-rose-50",
  danger: "border border-rose-300 text-rose-600 hover:bg-rose-50",
  text: "text-[#d9222a] hover:underline p-0 font-bold",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-xs",
  lg: "px-5 py-2.5 text-sm",
};

export default function CustomButton({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  onClick,
  className = "",
  ...props
}) {
  return (
    <Button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center font-semibold rounded-xl transition duration-150 select-none disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}