import React, { useState } from "react";
import Card from "../../ui/Card";
import FilterPill from "../../ui/FilterPill";
import CustomInput from "../../ui/CustomInput";

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filterTabs = [
    { label: "All", count: 5 },
    { label: "New", count: 1 },
    { label: "Confirmed", count: 1 },
    { label: "Preparing", count: 1 },
    { label: "Ready", count: 1 },
    { label: "Completed", count: 1 },
    { label: "Cancelled", count: null },
  ];

  const orders = [
    {
      ref: "WB1047",
      customer: "Priya Jayawardena",
      phone: "0771234567",
      item: "Birthday Celebration Cake",
      time: "10:00 AM - 11:00 AM",
      payment: "Pending",
      paymentBadge: "bg-[#fff8ea] text-[#d98218] border border-[#fae2b8]",
      status: "Waiting Payment",
      statusBadge: "bg-[#fff8ea] text-[#d98218] border border-[#fae2b8]",
      action: "Confirm order",
    },
    {
      ref: "WB1046",
      customer: "Kasun",
      phone: "0771554567",
      item: "Chocolate Cake",
      time: "2:00 PM - 3:00 PM",
      payment: "Pending",
      paymentBadge: "bg-[#fff8ea] text-[#d98218] border border-[#fae2b8]",
      status: "Preparing",
      statusBadge: "bg-[#fdf0f1] text-[#e04556] border border-[#fad2d6]",
      action: "Mark Ready",
    },
    {
      ref: "WB1045",
      customer: "Nimal",
      phone: "0771234867",
      item: "Ribbon Cake",
      time: "11:00 AM - 12:00 PM",
      payment: "Confirmed",
      paymentBadge: "bg-[#eef8f2] text-[#2d9a4e] border border-[#c4e8cf]",
      status: "Ready",
      statusBadge: "bg-[#eef8f2] text-[#2d9a4e] border border-[#c4e8cf]",
      action: "Complete",
    },
    {
      ref: "WB1044",
      customer: "Dilini",
      phone: "0771234567",
      item: "Sparkling Celebration Cake",
      time: "9:00 AM - 10:00 AM",
      payment: "Confirmed",
      paymentBadge: "bg-[#eef8f2] text-[#2d9a4e] border border-[#c4e8cf]",
      status: "Completed",
      statusBadge: "bg-[#f4f2ef] text-[#6d635e] border border-[#e2ddd8]",
      action: null,
    },
    {
      ref: "WB1043",
      customer: "Chamara",
      phone: "0771234567",
      item: "Vanilla Butter Cake",
      time: "3:00 PM - 4:00 PM",
      payment: "Pending",
      paymentBadge: "bg-[#fff8ea] text-[#d98218] border border-[#fae2b8]",
      status: "Confirmed",
      statusBadge: "bg-[#edf5ff] text-[#2563eb] border border-[#bfdbfe]",
      action: "Start Preparing",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfaf6] p-7 select-none">
      {/* Title & Search Bar */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1e1715]">Orders</h1>
        <div className="w-64">
          <CustomInput placeholder="Search orders..." />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {filterTabs.map((tab) => (
          <FilterPill
            key={tab.label}
            label={tab.label}
            count={tab.count}
            active={activeFilter === tab.label}
            onClick={() => setActiveFilter(tab.label)}
          />
        ))}
      </div>

      {/* Orders Table Card */}
      <Card className="overflow-hidden !rounded-2xl border-[#eee9e2]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-[#ece6dd] bg-[#faf7f2] font-semibold tracking-wider text-[#9b908a] uppercase">
                <th className="py-4 px-5">Reference</th>
                <th className="py-4 px-5">Customer</th>
                <th className="py-4 px-5">Items</th>
                <th className="py-4 px-5">Pickup</th>
                <th className="py-4 px-5 text-center">Payment</th>
                <th className="py-4 px-5 text-center">Status</th>
                <th className="py-4 px-5 text-right min-w-[210px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ece6dd] text-[#2b211d]">
              {orders.map((o) => (
                <tr key={o.ref} className="transition hover:bg-[#faf8f5]/60">
                  {/* Reference */}
                  <td className="py-4 px-5 font-bold text-[#c8102e] whitespace-nowrap">
                    {o.ref}
                  </td>

                  {/* Customer */}
                  <td className="py-4 px-5 whitespace-nowrap">
                    <p className="font-bold text-[#1e1715]">{o.customer}</p>
                    <p className="text-[11px] text-[#8a7e78]">{o.phone}</p>
                  </td>

                  {/* Items */}
                  <td className="py-4 px-5 font-medium text-[#2b211d] max-w-[200px]">
                    {o.item}
                  </td>

                  {/* Pickup */}
                  <td className="py-4 px-5 font-medium text-[#8a7e78] whitespace-nowrap">
                    {o.time}
                  </td>

                  {/* Payment Badge */}
                  <td className="py-4 px-5 text-center whitespace-nowrap">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-semibold ${o.paymentBadge}`}>
                      {o.payment}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-5 text-center whitespace-nowrap">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-semibold ${o.statusBadge}`}>
                      {o.status}
                    </span>
                  </td>

                  {/* Action Buttons (Fixed Alignment) */}
                  <td className="py-4 px-5 text-right whitespace-nowrap">
                    {o.action ? (
                      <div className="inline-flex items-center justify-end gap-3.5">
                        <button className="rounded-xl bg-[#c8102e] px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#a50b24]">
                          {o.action}
                        </button>
                        <button className="text-xs font-medium text-[#8a7e78] hover:text-[#1e1715] hover:underline transition">
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <span className="text-neutral-300 select-none">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}