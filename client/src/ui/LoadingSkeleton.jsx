import React from "react";

export default function LoadingSkeleton({ type = "card", count = 1 }) {
  return (
    <div
      className={`${type === "card" ? "grid grid-cols-2 gap-4 md:grid-cols-4" : "flex flex-col gap-4"}`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse rounded-xl bg-white ${type === "card" ? "space-y-4 p-4" : "flex items-center gap-4 p-4"}`}
        >
          {type === "card" ? (
            <>
              {/* Image */}
              <div className="h-40 w-full rounded-lg bg-gray-200" />

              {/* Product details */}
              <div className="space-y-3">
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-3 w-1/2 rounded bg-gray-200" />
                <div className="h-4 w-1/3 rounded bg-gray-200" />
              </div>

              {/* Button */}
              <div className="h-9 w-full rounded-lg bg-gray-200" />
            </>
          ) : (
            <>
              {/* Image */}
              <div className="h-14 w-14 shrink-0 rounded-lg bg-gray-200" />

              {/* Details */}
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 rounded bg-gray-200" />
                <div className="h-3 w-1/2 rounded bg-gray-200" />
              </div>

              {/* Action */}
              <div className="h-8 w-20 rounded-lg bg-gray-200" />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
