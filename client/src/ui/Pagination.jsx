import React from "react";

export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-center gap-4 py-6">
      <CustomButton disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </CustomButton>

      <span className="text-sm font-medium">
        Page {page} of {totalPages}
      </span>

      <CustomButton
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </CustomButton>
    </div>
  );
}
