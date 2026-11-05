import React, { useState } from "react";
import { ShoppingBag, CreditCard, Box, Cake, Settings } from "lucide-react";
import Card from "../../ui/Card";
import FilterPill from "../../ui/FilterPill";

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filterTabs = ["All", "Orders", "Payments", "Inventory", "System"];

  const notifications = [
    {
      id: 1,
      title: "New order received",
      desc: "Order WB1047 from Priya Jayawardena — Birthday Cake 1.5kg",
      date: "28/09/2026",
      icon: ShoppingBag,
      iconColor: "text-rose-600 bg-rose-50",
    },
    {
      id: 2,
      title: "Payment requires confirmation",
      desc: "Bank transfer for Order WB1045 is awaiting your verification",
      date: "28/09/2026",
      icon: CreditCard,
      iconColor: "text-amber-600 bg-amber-50",
    },
    {
      id: 3,
      title: "Ribbon cake– Low stock",
      desc: "Only 2 items remaining in stock",
      date: "28/09/2026",
      icon: Box,
      iconColor: "text-amber-600 bg-amber-50",
    },
    {
      id: 4,
      title: "Order ready for pickup",
      desc: "Order WB1045 has been prepared and marked ready",
      date: "28/09/2026",
      icon: Cake,
      iconColor: "text-rose-600 bg-rose-50",
    },
    {
      id: 5,
      title: "Red Velvet Cake - sold out",
      desc: "Stock count has reached zero",
      date: "27/09/2026",
      icon: Box,
      iconColor: "text-amber-600 bg-amber-50",
    },
    {
      id: 6,
      title: "Festival mode available",
      desc: "Upcoming holiday season profile is ready for configuration",
      date: "27/09/2026",
      icon: Settings,
      iconColor: "text-neutral-600 bg-neutral-100",
    },
  ];

  return (
    <div className="p-8 bg-[#fbf9f4] min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Notifications</h1>
          <p className="text-xs text-[#d9222a] font-semibold mt-0.5">3 unread</p>
        </div>

        <button className="text-xs font-semibold text-[#d9222a] hover:underline">
          Mark all read
        </button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        {filterTabs.map((tab) => (
          <FilterPill
            key={tab}
            label={tab}
            active={activeFilter === tab}
            onClick={() => setActiveFilter(tab)}
          />
        ))}
      </div>

      <div className="space-y-4">
        {notifications.map((item) => {
          const IconComponent = item.icon;
          return (
            <Card key={item.id} className="p-5 flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.iconColor}`}>
                  <IconComponent size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-neutral-900">{item.title}</h3>
                  <p className="text-xs text-neutral-500 mt-0.5">{item.desc}</p>
                  <div className="flex items-center gap-3 mt-2 text-[11px]">
                    <button className="text-[#d9222a] font-bold hover:underline">View →</button>
                    <button className="text-neutral-400 hover:text-neutral-700">Mark as read</button>
                  </div>
                </div>
              </div>

              <span className="text-[11px] text-neutral-400 font-medium self-start">{item.date}</span>
            </Card>
          );
        })}
      </div>
    </div>
  );
}