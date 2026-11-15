import React from "react";
import { CircleX, Search } from "lucide-react";

export default function Searchbar({ value, onChange, placeholder = "..." }) {
  return (
    <div className="relative w-full md:w-1/2">
      {value === "" ? (
        <Search
          size={18}
          className="text-muted absolute top-1/2 left-3 -translate-y-1/2"
        />
      ) : (
        <CircleX
          size={18}
          onClick={() => onChange("")}
          className="text-muted absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer"
        />
      )}

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Search ${placeholder}`}
        className="focus:border-primary focus:ring-primary border-border w-full rounded-lg border-2 py-2 pr-4 pl-10 outline-none focus:ring-1"
      />
    </div>
  );
}
