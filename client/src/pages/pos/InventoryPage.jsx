import React from "react";
import sample3 from "../../images/sample3.webp";
import sample4 from "../../images/sample4.webp";
import sample2 from "../../images/sample2.webp";
import Card from "../../ui/Card";
import StatCard from "../../ui/StatCard";
import Badge from "../../ui/Badge";
import CustomButton from "../../ui/CustomButton";

export default function InventoryPage() {
  const inventoryItems = [
    { id: 1, name: "Chocolate Cake", available: 8, reserved: 3, total: 11, status: "Available", statusVariant: "green", image: sample3 },
    { id: 2, name: "Birthday Celebration Cake", available: 2, reserved: 1, total: 3, status: "Limited", statusVariant: "amber", image: sample4 },
    { id: 3, name: "Ribbon Cake", available: 0, reserved: 0, total: 0, status: "Sold Out", statusVariant: "rose", image: sample2 },
  ];

  return (
    <div className="p-8 bg-[#fbf9f4] min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Inventory</h1>
        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="text-amber-600">1 Low Stock</span>
          <span className="text-neutral-300">|</span>
          <span className="text-rose-600">1 Sold Out</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatCard label="Available Products" value="3" valueColor="text-emerald-600" />
        <StatCard label="Low Stock" value="1" valueColor="text-amber-600" />
        <StatCard label="Sold Out" value="1" valueColor="text-rose-600" />
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-neutral-50/70 text-neutral-500 uppercase tracking-wider font-semibold border-b border-neutral-100">
              <th className="py-3.5 px-6">Product</th>
              <th className="py-3.5 px-6">Available</th>
              <th className="py-3.5 px-6">Reserved</th>
              <th className="py-3.5 px-6">Total</th>
              <th className="py-3.5 px-6">Status</th>
              <th className="py-3.5 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {inventoryItems.map((item) => (
              <tr key={item.id} className="hover:bg-neutral-50/50 transition">
                <td className="py-4 px-6 flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover" />
                  <span className="font-bold text-neutral-900">{item.name}</span>
                </td>
                <td className="py-4 px-6 font-bold text-neutral-900">{item.available}</td>
                <td className="py-4 px-6 font-bold text-amber-600">{item.reserved}</td>
                <td className="py-4 px-6 font-bold text-neutral-900">{item.total}</td>
                <td className="py-4 px-6">
                  <Badge variant={item.statusVariant}>{item.status}</Badge>
                </td>
                <td className="py-4 px-6 text-right">
                  <CustomButton variant="secondary" size="sm">Adjust</CustomButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}