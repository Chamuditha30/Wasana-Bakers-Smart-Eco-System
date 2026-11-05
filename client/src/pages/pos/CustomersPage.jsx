import React from "react";
import { AlertCircle, Edit2 } from "lucide-react";
import Card from "../../ui/Card";
import CustomInput from "../../ui/CustomInput";
import CustomButton from "../../ui/CustomButton";

export default function CustomersPage() {
  const customers = [
    { name: "Priya jayawardena", initial: "P", phone: "0771234567", orders: 1, spend: "2,600", lastOrder: "28/09/2026" },
    { name: "Kasun", initial: "K", phone: "0712345678", orders: 1, spend: "1,750", lastOrder: "27/09/2026" },
    { name: "Nimal", initial: "N", phone: "0765432109", orders: 1, spend: "2,700", lastOrder: "27/09/2026" },
    { name: "Dilini", initial: "D", phone: "0751234567", orders: 1, spend: "3,200", lastOrder: "25/09/2026" },
    { name: "Chamara", initial: "C", phone: "0779876543", orders: 1, spend: "650", lastOrder: "27/09/2026" },
  ];

  return (
    <div className="p-8 bg-[#fbf9f4] min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-neutral-900">Customers</h1>
        <div className="flex items-center gap-3">
          <div className="w-64">
            <CustomInput placeholder="Search by name or phone..." />
          </div>
          <CustomButton>+ Add Customer</CustomButton>
        </div>
      </div>

      <div className="bg-[#faede8] border border-[#f5d0c5] rounded-xl p-3 flex items-center gap-2 mb-6 text-xs text-[#9c3620]">
        <AlertCircle size={16} className="shrink-0" />
        <span>Customer records are automatically created from order history. No customer accounts are required.</span>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-neutral-50/70 text-neutral-500 uppercase tracking-wider font-semibold border-b border-neutral-100">
              <th className="py-3.5 px-6">Customer</th>
              <th className="py-3.5 px-6">Phone</th>
              <th className="py-3.5 px-6">Orders</th>
              <th className="py-3.5 px-6">Total Spend</th>
              <th className="py-3.5 px-6">Last Order</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-neutral-700">
            {customers.map((c, i) => (
              <tr key={i} className="hover:bg-neutral-50/50 transition">
                <td className="py-4 px-6 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-600 font-bold flex items-center justify-center text-xs">
                    {c.initial}
                  </div>
                  <span className="font-bold text-neutral-900">{c.name}</span>
                  <Edit2 size={12} className="text-neutral-400 cursor-pointer hover:text-neutral-700" />
                </td>
                <td className="py-4 px-6 text-neutral-600 font-medium">{c.phone}</td>
                <td className="py-4 px-6">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 font-bold flex items-center justify-center text-[11px]">
                    {c.orders}
                  </span>
                </td>
                <td className="py-4 px-6 font-bold text-neutral-900">Rs. {c.spend}</td>
                <td className="py-4 px-6 text-neutral-500">{c.lastOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}