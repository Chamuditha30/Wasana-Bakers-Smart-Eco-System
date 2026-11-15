import React from "react";
import Searchbar from "../../ui/Searchbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  availabilityFilters,
  categories,
  initialProductFilters,
  pricingTypes,
} from "../../constants/productConstants";
import { getAllProducts } from "../../services/productService";
import { useEffect } from "react";
import FilterGroup from "../../ui/FilterGroup";
import {
  resetFilters,
  updateFilters,
  validateProductStatus,
} from "../../util/productUtils";
import Pagination from "../../ui/Pagination";
import LoadingSkeleton from "../../ui/LoadingSkeleton";
import EmptyState from "../../ui/EmptyState";
import SaleCakeCard from "../../ui/SaleCakeCard";
import { Trash } from "lucide-react";
import CustomButton from "../../ui/CustomButton";
import { createPosOrder } from "../../services/orderService";

export default function SalesPage() {
  //initialize navigate
  const navigate = useNavigate();

  //initialize filters
  const [filters, setFilters] = useState(initialProductFilters);

  //initialize data
  const [data, setData] = useState([]);

  //initialize pagination
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
  });

  //initialize loading
  const [loading, setLoading] = useState(false);

  //initialize cart
  const [cart, setCart] = useState([]);

  //update filters
  const handleFilterChange = (name, value) => {
    setFilters((prev) => updateFilters(prev, name, value));
  };

  //get all products
  const getProducts = async () => {
    try {
      setLoading(true);

      //call api
      const result = await getAllProducts(filters);

      setData(result.products);

      setPagination({
        currentPage: result.page,
        totalPages: result.totalPages,
        totalProducts: result.total,
      });
    } catch (error) {
      console.error(
        "Products retrieved failed:",
        error.response?.data?.message || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [filters]);

  //add product to current sales
  const handleAddToCart = (product, amount) => {
    const isByWeight = product.pricingType === "by_weight";

    const unitPrice = isByWeight ? product.pricePerKg : product.price;

    const weight = isByWeight ? Number(amount) : undefined;
    const quantity = isByWeight ? 1 : Number(amount);

    const lineTotal = isByWeight ? unitPrice * weight : unitPrice * quantity;

    const saleItem = {
      product: product._id,
      productName: product.name,
      pricingType: product.pricingType,
      unitPrice,
      ...(isByWeight && { weight }),
      quantity,
      lineTotal,
    };

    setCart((prev) => [...prev, saleItem]);
  };

  //remove product from current sales
  const handleRemoveItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  //get total amount
  const totalAmount = cart.reduce((total, item) => total + item.lineTotal, 0);

  //handle form submission
  const handleSubmit = async () => {
    try {
      setLoading(true);

      //prepare sale data
      const saleData = {
        items: cart,
        totalAmount,
      };

      //call api
      await createPosOrder(saleData);

      setCart([]);
    } catch (error) {
      console.error(
        "Order creation failed:",
        error.response?.data?.message || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col-reverse md:flex-row">
      {/* products section */}
      <div className="bg-surface w-full flex-1 p-2 md:w-2/3 md:p-4">
        {/* page title */}
        <h1 className="text-secondary mb-4 text-2xl font-semibold md:text-3xl">
          Sales
        </h1>

        <Searchbar
          value={filters.search}
          onChange={(value) => handleFilterChange("search", value)}
          placeholder="products"
        />

        <div className="md:flex md:flex-wrap md:items-center md:gap-2">
          {/* category filters */}
          <FilterGroup
            options={[{ value: "", label: "All Categories" }, ...categories]}
            value={filters.category}
            onChange={(value) => handleFilterChange("category", value)}
          />

          {/* pricing filters */}
          <FilterGroup
            options={[{ value: "", label: "All Pricing" }, ...pricingTypes]}
            value={filters.pricingType}
            onChange={(value) => handleFilterChange("pricingType", value)}
          />

          {/* availability filters */}
          <FilterGroup
            options={availabilityFilters}
            value={filters.isAvailable}
            onChange={(value) => handleFilterChange("isAvailable", value)}
          />

          {/* reset filters */}
          <button
            type="button"
            onClick={() => setFilters(resetFilters(initialProductFilters))}
            className="text-primary mb-4 cursor-pointer text-sm"
          >
            Reset Filters
          </button>
        </div>

        {/* products section */}
        <div className="pb-20 md:pb-0">
          {loading ? (
            <LoadingSkeleton count={8} />
          ) : data.length === 0 ? (
            <EmptyState
              actionLabel="Add Product"
              onAction={() => navigate("/products")}
            />
          ) : (
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-6">
              {data.map((product) => (
                <SaleCakeCard
                  key={product._id}
                  product={{
                    ...product,
                    status: validateProductStatus(
                      product.isAvailable,
                      product.inventory?.available ?? 0,
                      product.inventory?.lowStockThreshold ?? 0,
                    ),
                  }}
                  onAdd={(amount) => handleAddToCart(product, amount)}
                />
              ))}
            </div>
          )}
        </div>

        {/* pagination */}
        {!loading && pagination.totalPages > 1 && (
          <Pagination
            page={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(page) => handleFilterChange("page", page)}
          />
        )}
      </div>

      {/* cart section */}
      <div className="sticky top-0 z-10 flex max-h-[40vh] w-full shrink-0 flex-col overflow-hidden rounded-xl bg-white p-3 shadow-lg md:relative md:top-auto md:h-screen md:max-h-none md:w-1/3 md:rounded-none md:p-4">
        {/* section title */}
        <h1 className="text-secondary mb-4 text-2xl font-semibold md:text-3xl">
          Current Sales
        </h1>

        {/* cart items */}
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-500">
              No products added yet.
            </p>
          ) : (
            cart.map((item, index) => (
              <div
                key={`${item.product}-${index}`}
                className="border-border flex items-center justify-between gap-3 rounded-lg border p-3 transition-colors duration-300 ease-out hover:bg-stone-100"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold">{item.productName}</p>

                  <p className="text-tertiary text-sm">
                    {item.pricingType === "by_weight"
                      ? `${item.weight} kg`
                      : `Qty: ${item.quantity}`}
                  </p>

                  <p className="text-secondary text-sm font-medium">
                    Rs. {item.lineTotal.toLocaleString("en-LK")}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="shrink-0 cursor-pointer text-red-600 hover:text-red-800"
                >
                  <Trash />
                </button>
              </div>
            ))
          )}
        </div>

        {/* total and payment */}
        <div className="mt-4 shrink-0 border-t border-gray-200 pt-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-semibold">Total Amount</span>

            <span className="text-primary text-xl font-bold">
              Rs. {totalAmount.toLocaleString("en-LK")}
            </span>
          </div>

          {/* Complete sale */}
          <CustomButton
            onClick={handleSubmit}
            disabled={cart.length === 0 || loading}
          >
            {loading ? "Processing..." : " Complete Sale"}
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
