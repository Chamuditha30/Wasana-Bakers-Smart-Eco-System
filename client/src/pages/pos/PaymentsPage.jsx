import React, { useState } from "react";
import Card from "../../ui/Card";
import FilterPill from "../../ui/FilterPill";
import Badge from "../../ui/Badge";
import CustomButton from "../../ui/CustomButton";

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("Pending Verification");

  return (
    <div className="p-8 bg-[#fbf9f4] min-h-screen">
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Payments</h1>

      <div className="flex items-center gap-2 mb-6">
        <FilterPill
          label="Pending Verification"
          count={1}
          active={activeTab === "Pending Verification"}
          onClick={() => setActiveTab("Pending Verification")}
        />
        <FilterPill
          label="Confirmed"
          count={2}
          active={activeTab === "Confirmed"}
          onClick={() => setActiveTab("Confirmed")}
        />
        <FilterPill
          label="Rejected"
          active={activeTab === "Rejected"}
          onClick={() => setActiveTab("Rejected")}
        />
      </div>

      <Card className="p-6 max-w-4xl">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-bold text-sm text-[#d9222a]">WB1047</span>
              <Badge variant="amber">Pending</Badge>
              <Badge variant="amber">Waiting Payment</Badge>
            </div>

            <div className="grid grid-cols-4 gap-6 text-xs text-neutral-500">
              <div>
                <p className="text-neutral-400">Customer</p>
                <p className="font-bold text-neutral-900 mt-0.5">Priya jayawardena</p>
              </div>
              <div>
                <p className="text-neutral-400">Phone</p>
                <p className="font-bold text-neutral-900 mt-0.5">0771234567</p>
              </div>
              <div>
                <p className="text-neutral-400">Amount</p>
                <p className="font-bold text-neutral-900 mt-0.5">Rs. 2600</p>
              </div>
              <div>
                <p className="text-neutral-400">Pickup</p>
                <p className="font-bold text-neutral-900 mt-0.5">10:00 AM - 11:00 AM</p>
              </div>
            </div>

            <p className="text-[11px] text-neutral-400 mt-3">Ordered 28/09/2026 at 8.30AM</p>
          </div>

          <div className="flex items-center gap-2">
            <button className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs px-4 py-2 rounded-xl transition">
              Confirm Payment
            </button>
            <CustomButton variant="danger" size="md">Reject</CustomButton>
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-3">
          <p className="text-xs text-neutral-400 mb-1.5">Order Items</p>
          <span className="inline-block bg-neutral-100 text-neutral-700 text-xs font-semibold px-3 py-1 rounded-lg">
            Birthday Celebration Cake (1.5kg) x 1
          </span>
        </div>
      </Card>
    </div>
  );
}