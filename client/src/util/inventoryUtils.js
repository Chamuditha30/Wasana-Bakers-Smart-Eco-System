//validate form
export const validateInventoryForm = (amount, canZero = false) => {
  const errors = {};

  if (amount === "" || amount === null || amount === undefined) {
    errors.amount = "Please enter an inventory amount.";
  } else if (!Number.isFinite(Number(amount))) {
    errors.amount = "Please enter a valid number.";
  } else if (Number(amount) < 0 || (!canZero && Number(amount) === 0)) {
    errors.amount = canZero
      ? "Amount cannot be negative."
      : "Amount must be greater than zero.";
  }

  return errors;
};

//validate status and return it
export const validateInventoryStatus = (available, lowStockThreshold) => {
  //check stock
  if (available <= 0) return "Out of Stock";

  //check low stock
  if (available <= lowStockThreshold) return "Low Stock";

  return "Available";
};

//update filter values
export const updateFilters = (prev, name, value) => ({
  ...prev,
  [name]: value,
  page: 1,
});

//reset filters
export const resetFilters = (initialFilters) => ({
  ...initialFilters,
});
