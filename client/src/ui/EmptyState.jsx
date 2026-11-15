import { Inbox } from "lucide-react";
import React from "react";
import CustomButton from "./CustomButton";

export default function EmptyState({
  title = "No data found",
  message = "There is nothing to display here",
  actionLabel = "",
  onAction,
}) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start pt-20">
      <Inbox size={80} className="text-border" />

      <h1 className="text-muted/75 text-xl font-semibold">{title}</h1>

      <p className="text-muted">{message}</p>

      <div className="mt-4">
        <CustomButton onClick={onAction}>{actionLabel}</CustomButton>
      </div>
    </div>
  );
}
