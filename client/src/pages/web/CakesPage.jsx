import React, { useState } from "react";
import { Search } from "lucide-react";

import CakeFilters from "../../components/web/cakes/CakeFilters";
import CakeGrid from "../../components/web/cakes/CakeGrid";
import { sampleCakes } from "../../data/sampleCakes";

export default function CakesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [availability, setAvailability] = useState("All");

  return (
    <div className="bg-surface w-full">
      {/* Heading */}
      <div className="px-4 py-10 md:px-8">
        <h1 className="text-4xl leading-tight font-bold text-gray-800 md:text-5xl">
          Cake Catalogue
        </h1>

        <p className="text-tertiary max-w-xl text-lg leading-relaxed">
          Browse our full range of handcrafted cakes.
        </p>
      </div>

      {/* Cakes Catalogue */}
      <section className="w-full justify-between px-4 pb-10 md:px-8">

        {/* Search and Filter Container */}
        <div className="rounded-2xl bg-white p-4 shadow-md">
          
          {/* Search Bar */}
          <div className="flex items-center gap-3 rounded-xl border border-gray-300 px-4 py-3 focus-within:border-red-600">
            <Search className="h-5 w-5 text-gray-600" />

            <input
              type="text"
              placeholder="Search cakes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-gray-700 outline-none"
            />
          </div>

          {/* Filter Options */}
          <CakeFilters
            category={category}
            setCategory={setCategory}
            availability={availability}
            setAvailability={setAvailability}
          />
        </div>

        {/* Cake Card Grid */}
        <CakeGrid cakes={sampleCakes} />
      </section>
    </div>
  );
}
