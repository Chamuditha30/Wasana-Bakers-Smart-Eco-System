//initialize data
export const initialProductData = {
  name: "",
  category: "",
  description: "",
  pricingType: "by_weight",
  pricePerKg: "",
  price: "",
  weight: "",
};

//initialize predfined categories
export const categories = [
  { value: "regular cake", label: "Regular Cake" },
  { value: "birthday cake", label: "Birthday Cake" },
  { value: "celebration cake", label: "Celebration Cake" },
  { value: "sweets", label: "Sweets" },
];

//initialize predfined pricing types
export const pricingTypes = [
  { value: "by_weight", label: "By Weight" },
  { value: "fixed", label: "Fixed Price" },
];

//initialize product availability filters
export const availabilityFilters = [
  { value: "", label: "All" },
  { value: "true", label: "Available" },
  { value: "false", label: "Unavailable" },
];

//initialize product filters
export const initialProductFilters = {
  search: "",
  category: "",
  pricingType: "",
  isAvailable: "",
  page: 1,
  limit: 12,
};
