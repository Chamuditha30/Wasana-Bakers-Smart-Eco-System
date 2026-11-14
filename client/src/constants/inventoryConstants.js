//initialize inventory filters
export const initialInventoryFilters = {
  search: "",
  category: "",
  status: "",
  page: 1,
  limit: 12,
};

//initialize inventory status
export const inventoryStatus = [
  { value: "available", label: "Available" },
  { value: "low_stock", label: "Low Stock" },
  { value: "out_of_stock", label: "Out of Stock" },
];
