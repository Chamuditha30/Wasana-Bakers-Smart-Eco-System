import React, { useState } from "react";
import sample3 from "../../images/sample3.webp";
import sample4 from "../../images/sample4.webp";
import sample2 from "../../images/sample2.webp";
import Card from "../../ui/Card";
import FilterPill from "../../ui/FilterPill";
import Badge from "../../ui/Badge";
import CustomInput from "../../ui/CustomInput";
import CustomButton from "../../ui/CustomButton";

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const categories = ["All", "Birthday Cakes", "Regular Cakes", "Sweets", "Celebration Cakes", "Special Cakes"];

  const products = [
    {
      id: 1,
      name: "Chocolate Cake",
      desc: "Rich, moist chocolate cake layered with velvety chocolate ganache and dark cocoa...",
      price: "950.00",
      status: "Available",
      statusVariant: "green",
      stockCount: 8,
      stockStyle: "text-emerald-600 bg-emerald-50",
      image: sample3,
    },
    {
      id: 2,
      name: "Birthday Celebration Cake",
      desc: "Elegant celebration cake decorated with fresh frosting roses and custom icing...",
      price: "1850.00",
      status: "Limited",
      statusVariant: "amber",
      stockCount: 2,
      stockStyle: "text-amber-600 bg-amber-50",
      image: sample4,
    },
    {
      id: 3,
      name: "Ribbon Cake",
      desc: "Traditional Sri Lankan ribbon cake with a soft, buttery texture and colourful layered...",
      price: "750.00",
      status: "Sold Out",
      statusVariant: "rose",
      stockCount: 0,
      stockStyle: "text-rose-600 bg-rose-50",
      image: sample2,
    },
  ];

  return (
    <div className="p-8 bg-[#fbf9f4] min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Products</h1>
        <div className="flex items-center gap-3">
          <div className="w-64">
            <CustomInput placeholder="Search products..." />
          </div>
          <CustomButton>+ Add Product</CustomButton>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-8">
        {categories.map((c) => (
          <FilterPill
            key={c}
            label={c}
            active={activeTab === c}
            onClick={() => setActiveTab(c)}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {products.map((p) => (
          <Card key={p.id} className="overflow-hidden">
            <div className="h-44 relative overflow-hidden bg-neutral-100">
              <div className="absolute top-3 left-3 z-10">
                <Badge variant={p.statusVariant}>{p.status}</Badge>
              </div>
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
            </div>

            <div className="p-5">
              <h3 className="font-bold text-neutral-900 text-sm mb-1">{p.name}</h3>
              <p className="text-xs text-neutral-500 line-clamp-2 mb-4 leading-relaxed">{p.desc}</p>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] text-neutral-400 block font-medium">From</span>
                  <span className="text-sm font-bold text-neutral-900">Rs. {p.price}</span>
                </div>
                <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${p.stockStyle}`}>
                  {p.stockCount}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <CustomButton variant="secondary" size="sm">Edit</CustomButton>
                <CustomButton variant="secondary" size="sm">Disable</CustomButton>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}