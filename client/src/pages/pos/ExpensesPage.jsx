import React from "react";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import CustomButton from "../../ui/CustomButton";

export default function ExpensesPage() {
  const expenseSummary = [
    { label: "Ingredients", amount: "12,400", style: "bg-neutral-100 border-neutral-200 text-neutral-800" },
    { label: "Packing", amount: "3,200", style: "bg-amber-50 border-amber-200 text-amber-800" },
    { label: "Utilities", amount: "8,500", style: "bg-rose-50 border-rose-200 text-rose-800" },
    { label: "Transport", amount: "1,500", style: "bg-emerald-50 border-emerald-200 text-emerald-800" },
    { label: "Other", amount: "850", style: "bg-neutral-100 border-neutral-200 text-neutral-800" },
  ];

  const expenses = [
    { date: "26/09/2026", category: "Ingredients", desc: "flour,suger,butter - weekly stock", amount: "12,400", variant: "gray" },
    { date: "25/09/2026", category: "Packing", desc: "cake boxes and ribbons", amount: "3,200", variant: "amber" },
    { date: "24/09/2026", category: "Ingredients", desc: "chocolate and cream", amount: "5,800", variant: "gray" },
    { date: "22/09/2026", category: "Utilities", desc: "Electricity bill - september", amount: "8,500", variant: "rose" },
    { date: "20/09/2026", category: "Transport", desc: "Ingredient delivery-Colombo", amount: "1,500", variant: "green" },
    { date: "18/09/2026", category: "Other", desc: "Cleaning supplies", amount: "850", variant: "gray" },
  ];

  return (
    <div className="p-8 bg-[#fbf9f4] min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Expenses</h1>
        <CustomButton>+ Add Expenses</CustomButton>
      </div>

      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-neutral-500">Total Expenses (September)</span>
          <span className="text-2xl font-bold text-neutral-900">Rs. 32,250</span>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {expenseSummary.map((item) => (
            <div key={item.label} className={`p-4 rounded-xl border text-center ${item.style}`}>
              <p className="text-xs font-semibold">{item.label}</p>
              <p className="text-sm font-bold mt-1">Rs. {item.amount}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-neutral-50/70 text-neutral-500 uppercase tracking-wider font-semibold border-b border-neutral-100">
              <th className="py-3.5 px-6">Date</th>
              <th className="py-3.5 px-6">Category</th>
              <th className="py-3.5 px-6">Description</th>
              <th className="py-3.5 px-6 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-neutral-700">
            {expenses.map((e, idx) => (
              <tr key={idx} className="hover:bg-neutral-50/50 transition">
                <td className="py-4 px-6 text-neutral-500">{e.date}</td>
                <td className="py-4 px-6">
                  <Badge variant={e.variant}>{e.category}</Badge>
                </td>
                <td className="py-4 px-6 font-medium text-neutral-800">{e.desc}</td>
                <td className="py-4 px-6 text-right font-bold text-neutral-900">Rs. {e.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}