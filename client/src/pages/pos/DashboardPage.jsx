import React from "react";
import { Link } from "react-router-dom";
import { DollarSign, ClipboardList, Clock, Check } from "lucide-react";
import Card from "../../ui/Card";

export default function DashboardPage() {
  const recentOrders = [
    {
      id: "WB1047",
      customer: "Priya Jayawardena",
      time: "10:00 AM – 11:00 AM",
      amount: "2,600",
      status: "Waiting Payment",
      statusBadge: "bg-[#fff8ea] text-[#d98218] border border-[#fae2b8]",
      payStatus: "Pending",
      payBadge: "bg-[#fff8ea] text-[#d98218] border border-[#fae2b8]",
    },
    {
      id: "WB1046",
      customer: "Kasun Perera",
      time: "2:00 PM – 3:00 PM",
      amount: "1,750",
      status: "Preparing",
      statusBadge: "bg-[#fdf0f1] text-[#e04556] border border-[#fad2d6]",
      payStatus: "Pending",
      payBadge: "bg-[#fff8ea] text-[#d98218] border border-[#fae2b8]",
    },
    {
      id: "WB1045",
      customer: "Nimal Fernando",
      time: "11:00 AM – 12:00 PM",
      amount: "2,700",
      status: "Ready",
      statusBadge: "bg-[#eef8f2] text-[#2d9a4e] border border-[#c4e8cf]",
      payStatus: "Confirmed",
      payBadge: "bg-[#eef8f2] text-[#2d9a4e] border border-[#c4e8cf]",
    },
    {
      id: "WB1044",
      customer: "Dilini Rathnayake",
      time: "3:00 PM – 4:00 PM",
      amount: "3,200",
      status: "Completed",
      statusBadge: "bg-[#f4f2ef] text-[#6d635e] border border-[#e2ddd8]",
      payStatus: "Confirmed",
      payBadge: "bg-[#eef8f2] text-[#2d9a4e] border border-[#c4e8cf]",
    },
    {
      id: "WB1043",
      customer: "Chamara Silva",
      time: "9:00 AM – 10:00 AM",
      amount: "650",
      status: "Confirmed",
      statusBadge: "bg-[#edf5ff] text-[#2563eb] border border-[#bfdbfe]",
      payStatus: "Pending",
      payBadge: "bg-[#fff8ea] text-[#d98218] border border-[#fae2b8]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfaf6] p-7 select-none">
      {/* Top Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[26px] font-bold tracking-tight text-[#1e1715] flex items-center gap-2">
            Good Morning, Wasana <span className="font-sans text-xl">👋</span>
          </h1>
          <p className="mt-0.5 text-xs text-[#8a7e78]">
            Monday, 28 September 2026 · Anuradhapura
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/sales">
            <button className="flex items-center gap-1.5 rounded-2xl bg-[#c8102e] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#a50b24]">
              <span className="text-base font-normal leading-none">+</span> New Sale
            </button>
          </Link>
          <Link to="/products">
            <button className="rounded-2xl border border-[#d6cec7] bg-white px-5 py-2.5 text-xs font-semibold text-[#2b211d] shadow-sm transition hover:bg-[#faf7f2]">
              Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        <Card className="flex items-center justify-between p-4.5 !rounded-2xl border-[#efebe5]">
          <div>
            <p className="text-[10px] font-bold tracking-wider text-[#9b908a] uppercase">TODAY'S SALES</p>
            <p className="mt-1 text-2xl font-bold text-[#1e1715]">Rs. 49k</p>
            <p className="mt-1 text-[11px] font-medium text-[#8a7e78]">+12% vs yesterday</p>
          </div>
          <div className="flex size-11 items-center justify-center rounded-2xl bg-[#ebf7ee] text-[#2d9a4e]">
            <DollarSign size={20} strokeWidth={2.5} />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-4.5 !rounded-2xl border-[#efebe5]">
          <div>
            <p className="text-[10px] font-bold tracking-wider text-[#9b908a] uppercase">ORDERS TODAY</p>
            <p className="mt-1 text-2xl font-bold text-[#1e1715]">3</p>
            <p className="mt-1 text-[11px] font-medium text-[#8a7e78]">3 online · 2 walk-in</p>
          </div>
          <div className="flex size-11 items-center justify-center rounded-2xl bg-[#fdf0f1] text-[#e04556]">
            <ClipboardList size={20} strokeWidth={2.2} />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-4.5 !rounded-2xl border-[#efebe5]">
          <div>
            <p className="text-[10px] font-bold tracking-wider text-[#9b908a] uppercase">PENDING ACTION</p>
            <p className="mt-1 text-2xl font-bold text-[#1e1715]">2</p>
            <p className="mt-1 text-[11px] font-medium text-[#8a7e78]">Require confirmation</p>
          </div>
          <div className="flex size-11 items-center justify-center rounded-2xl bg-[#fff7ea] text-[#d98218]">
            <Clock size={20} strokeWidth={2.2} />
          </div>
        </Card>

        <Card className="flex items-center justify-between p-4.5 !rounded-2xl border-[#efebe5]">
          <div>
            <p className="text-[10px] font-bold tracking-wider text-[#9b908a] uppercase">READY FOR PICKUP</p>
            <p className="mt-1 text-2xl font-bold text-[#1e1715]">1</p>
            <p className="mt-1 text-[11px] font-medium text-[#8a7e78]">Waiting for customer</p>
          </div>
          <div className="flex size-11 items-center justify-center rounded-2xl bg-[#f0eee9] text-[#554b45]">
            <Check size={20} strokeWidth={2.5} />
          </div>
        </Card>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-3 gap-5 items-start">
        {/* Recent Orders Card */}
        <Card className="col-span-2 p-5.5 !rounded-2xl border-[#eee9e2]">
          <div className="mb-3.5 flex items-center justify-between">
            <h2 className="font-serif text-[15px] font-bold text-[#1e1715]">Recent Orders</h2>
            <Link to="/orders" className="text-xs font-semibold text-[#c8102e] hover:underline">
              View All
            </Link>
          </div>

          <div className="divide-y divide-[#ece6dd]">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3.5 first:pt-1 last:pb-1">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#c8102e]">{order.id}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ${order.statusBadge}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8a7e78]">
                    {order.customer} · {order.time}
                  </p>
                </div>

                <div className="space-y-1 text-right">
                  <p className="text-xs font-bold text-[#1e1715]">Rs. {order.amount}</p>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium ${order.payBadge}`}>
                    {order.payStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right Side Alerts */}
        <div className="space-y-4">
          <Card className="p-4.5 !rounded-2xl border-[#eee9e2]">
            <div className="mb-3.5 flex items-center justify-between">
              <h2 className="font-serif text-[13px] font-bold text-[#1e1715]">Low Stock Alert</h2>
              <Link to="/inventory" className="text-xs font-semibold text-[#c8102e] hover:underline">
                Manage
              </Link>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#2b211d]">Ribbon Cake</span>
                <span className="rounded-full bg-[#fff7ea] px-2.5 py-0.5 text-[10px] font-medium text-[#b56e13] border border-[#fae2b8]">
                  2 left
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#2b211d]">Wedding Tier Cake</span>
                <span className="rounded-full bg-[#fff7ea] px-2.5 py-0.5 text-[10px] font-medium text-[#b56e13] border border-[#fae2b8]">
                  1 left
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[#2b211d]">Red Velvet Cake</span>
                <span className="rounded-full bg-[#fdf0f1] px-2.5 py-0.5 text-[10px] font-medium text-[#c8102e] border border-[#fad2d6]">
                  Sold Out
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-4.5 !rounded-2xl border-[#eee9e2]">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-serif text-[13px] font-bold text-[#1e1715]">Pending Payments</h2>
              <Link to="/payments" className="text-xs font-semibold text-[#c8102e] hover:underline">
                Review
              </Link>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-[#c8102e]">WB1047</p>
                <p className="text-[10px] text-[#8a7e78] mt-0.5">Priya Jayawardena</p>
              </div>
              <span className="font-bold text-[#1e1715]">Rs. 2,600</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}