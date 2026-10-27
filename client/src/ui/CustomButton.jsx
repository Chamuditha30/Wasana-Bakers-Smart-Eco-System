import React from "react";
import { Button } from "@headlessui/react";

//define variant styles
const variantStyles = {
  primary: "bg-primary text-white hover:bg-rose-800",
  secondary: "bg-surface border-muted text-muted border hover:bg-stone-200",
  outlined: "border-2 border-tertiary text-tertiary",
};

//define button sizes
const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
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
      className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded px-4 py-2 font-semibold transition-colors duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto md:rounded-lg ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}
