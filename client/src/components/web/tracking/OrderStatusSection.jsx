import React from "react";

const orderStages = [
  "Order Created",
  "Confirmed",
  "Preparing",
  "Ready for Pickup",
  "Completed",
];

export default function OrderStatusSection({ currentStatus }) {
  const currentIndex = orderStages.indexOf(currentStatus);

  return (
    <div className="border-t border-gray-200 pt-5">
      <h3 className="text-secondary mb-5 font-semibold">Order Progress</h3>

      <div className="space-y-4">
        {orderStages.map((stage, index) => {
          const isCompleted = currentIndex >= 0 && index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={stage} className="flex items-center gap-3">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  isCompleted || isCurrent
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {index + 1}
              </span>

              <div>
                <p
                  className={`text-sm ${
                    isCurrent ? "text-primary font-semibold" : "text-gray-600"
                  }`}
                >
                  {stage}
                </p>

                {isCurrent && (
                  <p className="text-primary text-xs">Current status</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
