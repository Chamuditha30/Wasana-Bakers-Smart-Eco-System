import React from "react";

export default function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-white rounded-[20px] border border-[#f0ece6] shadow-[0_2px_6px_rgba(0,0,0,0.02)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}