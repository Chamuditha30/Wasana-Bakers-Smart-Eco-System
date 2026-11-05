import React, { useState } from "react";
import sample1 from "../../images/sample1.webp";
import sample2 from "../../images/sample2.webp";
import sample3 from "../../images/sample3.webp";
import Card from "../../ui/Card";
import FilterPill from "../../ui/FilterPill";
import CustomInput from "../../ui/CustomInput";
import CustomButton from "../../ui/CustomButton";

const productsList = [
  { id: 1, name: "Butter Icing Cake", price: 900, category: "Regular Cakes", image: sample1 },
  { id: 2, name: "Ribbon Cake", price: 900, category: "Regular Cakes", image: sample2 },
  { id: 3, name: "Chocolate Cake", price: 900, category: "Regular Cakes", image: sample3 },
  { id: 4, name: "Butter Icing Cake", price: 900, category: "Birthday Cakes", image: sample1 },
  { id: 5, name: "Ribbon Cake", price: 900, category: "Birthday Cakes", image: sample2 },
  { id: 6, name: "Chocolate Cake", price: 900, category: "Birthday Cakes", image: sample3 },
];

export default function SalesPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "Birthday Cakes", "Regular Cakes", "Sweets"];

  const filteredProducts = productsList.filter((prod) => {
    const matchesTab = activeTab === "All" || prod.category === activeTab;
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="flex h-screen bg-[#fbf9f4] overflow-hidden">
      <div className="flex-1 flex flex-col p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">New Sale</h1>

        <div className="mb-4 max-w-md">
          <CustomInput
            placeholder="Search Products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 mb-6">
          {categories.map((cat) => (
            <FilterPill
              key={cat}
              label={cat}
              active={activeTab === cat}
              onClick={() => setActiveTab(cat)}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-5">
          {filteredProducts.map((cake, idx) => (
            <Card
              key={idx}
              onClick={() => addToCart(cake)}
              className="overflow-hidden cursor-pointer hover:shadow-md transition group"
            >
              <div className="h-36 w-full overflow-hidden bg-neutral-100">
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-3.5">
                <p className="font-bold text-xs text-neutral-800">{cake.name}</p>
                <p className="text-[#d9222a] font-bold text-xs mt-1">LKR {cake.price}.00</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="w-80 bg-white border-l border-neutral-200 flex flex-col justify-between p-6">
        <div>
          <h2 className="font-bold text-base text-neutral-900 border-b border-neutral-200 pb-3">Current Sale</h2>
          {cart.length === 0 ? (
            <div className="flex items-center justify-center h-96 text-xs text-neutral-400">
              Click a product to add it to the sale
            </div>
          ) : (
            <div className="divide-y divide-neutral-100 max-h-96 overflow-y-auto mt-2">
              {cart.map((item) => (
                <div key={item.id} className="py-2.5 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-semibold text-neutral-800">{item.name}</p>
                    <p className="text-neutral-500">
                      {item.qty} x Rs. {item.price}
                    </p>
                  </div>
                  <p className="font-bold text-neutral-900">Rs. {item.qty * item.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-neutral-200 pt-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-sm text-neutral-800">Total</span>
            <span className="font-bold text-sm text-neutral-900">Rs. {total}.00</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <CustomButton size="sm">Cash</CustomButton>
            <CustomButton variant="secondary" size="sm">Card</CustomButton>
            <CustomButton variant="secondary" size="sm">Online</CustomButton>
          </div>

          <CustomInput placeholder="Amount received" />

          <CustomButton
            disabled={cart.length === 0}
            className="w-full !rounded-xl"
            size="md"
          >
            Complete Sale
          </CustomButton>
        </div>
      </div>
    </div>
  );
}