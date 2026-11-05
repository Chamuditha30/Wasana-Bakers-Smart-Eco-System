import React from "react";
import Card from "../../ui/Card";
import StatCard from "../../ui/StatCard";
import Badge from "../../ui/Badge";
import CustomButton from "../../ui/CustomButton";

export default function PickupSlotsPage() {
  const slots = [
    { time: "9:00 AM – 10:00 AM", date: "2026-09-29", booked: 4, max: 10, percent: 40, color: "bg-emerald-600" },
    { time: "10:00 AM – 11:00 AM", date: "2026-09-29", booked: 7, max: 10, percent: 70, color: "bg-amber-500" },
    { time: "11:00 AM – 12:00 PM", date: "2026-09-29", booked: 10, max: 10, percent: 100, color: "bg-[#d9222a]" },
    { time: "2:00 PM – 3:00 PM", date: "2026-09-29", booked: 3, max: 10, percent: 30, color: "bg-emerald-600" },
    { time: "3:00 PM – 4:00 PM", date: "2026-09-29", booked: 5, max: 10, percent: 50, color: "bg-emerald-600" },
  ];

  return (
    <div className="p-8 bg-[#fbf9f4] min-h-screen">
      <h1 className="text-2xl font-bold text-neutral-900 mb-6">Pickup Slots</h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatCard label="Total Slots" value="6" />
        <StatCard label="Total Books" value="31" valueColor="text-[#d9222a]" />
        <StatCard label="Available" value="27" valueColor="text-emerald-600" />
      </div>

      <div className="space-y-4">
        {slots.map((s, idx) => (
          <Card key={idx} className="p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-sm text-neutral-900">{s.time}</h3>
                  <Badge variant="green">{s.booked}/{s.max} booked</Badge>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">{s.date}</p>
              </div>

              <div className="flex items-center gap-2">
                <CustomButton variant="secondary" size="sm">View Bookings</CustomButton>
                <CustomButton variant="outlined" size="sm">Disable</CustomButton>
              </div>
            </div>

            <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden my-3">
              <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.percent}%` }} />
            </div>

            <div className="flex justify-between items-center text-[11px] text-neutral-500 font-medium">
              <span>{s.max - s.booked} spots available</span>
              <span>{s.percent}% full</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}