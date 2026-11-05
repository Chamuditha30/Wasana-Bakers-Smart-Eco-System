import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Card from "../../ui/Card";
import StatCard from "../../ui/StatCard";

export default function ReportsPage() {
  const [timeRange] = useState("This Week");

  const topSellingCakes = [
    { name: "Birthday Cake", value: 33, max: 36 },
    { name: "Chocolate Cake", value: 28, max: 36 },
    { name: "Vanilla Butter Cake", value: 21, max: 36 },
    { name: "Ribbon Cake", value: 17, max: 36 },
    { name: "Love Cake", value: 12, max: 36 },
  ];

  const expenseBreakdown = [
    { label: "Ingredients", amount: "48,200", color: "bg-[#7a4b35]" },
    { label: "Packaging", amount: "12,400", color: "bg-[#e5a93c]" },
    { label: "Utilities", amount: "8,500", color: "bg-[#d9222a]" },
    { label: "Transport", amount: "4,200", color: "bg-[#2d7a4f]" },
    { label: "Other", amount: "2,800", color: "bg-[#8c827a]" },
  ];

  return (
    <div className="p-8 bg-[#fbf9f4] min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Reports</h1>
          <p className="text-xs text-neutral-400 mt-0.5">Week of 22–28 September 2026</p>
        </div>

        <button className="flex items-center gap-2 bg-white border border-neutral-200 px-4 py-2 rounded-xl text-xs font-semibold text-neutral-700 shadow-sm hover:bg-neutral-50 transition">
          <span>{timeRange}</span>
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-5 mb-6">
        <StatCard label="TOTAL REVENUE" value="Rs. 249k" subtext="+18% vs last week" />
        <StatCard label="ONLINE ORDERS" value="Rs.153k" subtext="+22% 7 days" />
        <StatCard label="WALK-IN-SALES" value="Rs.97k" subtext="+11% 7 days" />
        <StatCard label="TOTAL EXPENSES" value="Rs.76k" subtext="All categories" />
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card className="col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-neutral-900">Sales This Week</h2>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-[#d9222a]">
                <span className="w-2.5 h-0.5 bg-[#d9222a] inline-block"></span> Online
              </span>
              <span className="flex items-center gap-1.5 text-[#7a4b35]">
                <span className="w-2.5 h-0.5 bg-[#7a4b35] inline-block"></span> Walk-in
              </span>
            </div>
          </div>

          <div className="h-48 w-full flex items-center justify-center relative bg-gradient-to-b from-neutral-50/50 to-white rounded-xl border border-neutral-100 p-4">
            <div className="absolute top-10 right-32 bg-white border border-neutral-200 rounded-xl p-2.5 shadow-md text-[11px] leading-tight">
              <p className="font-bold text-neutral-800 mb-1">Fri</p>
              <p className="text-[#d9222a] font-semibold">Online: Rs. 28,500</p>
              <p className="text-[#7a4b35] font-semibold">Walk-in: Rs. 17,200</p>
            </div>
            <p className="text-xs text-neutral-300 select-none">[ Sales Trend Analytics Chart ]</p>
          </div>

          <div className="flex justify-between text-[11px] text-neutral-400 mt-3 px-2">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-sm font-bold text-neutral-900 mb-4">Expenses</h2>

          <div className="flex justify-center my-2">
            <div className="w-28 h-28 rounded-full border-8 border-[#7a4b35] border-t-[#d9222a] border-r-[#e5a93c] border-b-[#2d7a4f] flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white"></div>
            </div>
          </div>

          <div className="space-y-2 mt-4 text-xs">
            {expenseBreakdown.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-neutral-600">
                  <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                  {item.label}
                </span>
                <span className="font-bold text-neutral-800">Rs. {item.amount}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-sm font-bold text-neutral-900 mb-6">Top Selling Cakes</h2>

          <div className="space-y-4">
            {topSellingCakes.map((cake) => (
              <div key={cake.name} className="flex items-center gap-4 text-xs">
                <span className="w-32 font-medium text-neutral-700 truncate">{cake.name}</span>
                <div className="flex-1 bg-neutral-100 h-5 rounded-md overflow-hidden relative">
                  <div
                    className="h-full bg-[#d9222a] rounded-r-md transition-all duration-500"
                    style={{ width: `${(cake.value / cake.max) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 flex flex-col justify-between">
          <h2 className="text-sm font-bold text-neutral-900 mb-4">Financial Summary</h2>

          <div className="space-y-3 text-xs divide-y divide-neutral-100">
            <div className="flex justify-between pt-1">
              <span className="text-neutral-500">Total Revenue</span>
              <span className="font-bold text-emerald-600">+Rs. 249,200</span>
            </div>
            <div className="flex justify-between pt-3">
              <span className="text-neutral-500">Total Expenses</span>
              <span className="font-bold text-[#d9222a]">-Rs. 76,100</span>
            </div>
            <div className="flex justify-between pt-3">
              <span className="font-bold text-neutral-800">Net Amount</span>
              <span className="font-bold text-neutral-900 text-sm">Rs. 173,100</span>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-100 mt-4">
            <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">ONLINE VS WALK-IN</p>
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1 font-medium">
                  <span className="text-neutral-600">Online Orders</span>
                  <span className="font-bold text-neutral-900">61%</span>
                </div>
                <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#d9222a] h-full rounded-full" style={{ width: "61%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1 font-medium">
                  <span className="text-neutral-600">Walk-In Sales</span>
                  <span className="font-bold text-neutral-900">39%</span>
                </div>
                <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#7a4b35] h-full rounded-full" style={{ width: "39%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}