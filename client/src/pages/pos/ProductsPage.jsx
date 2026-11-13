import React, { useEffect, useState } from "react";
import Searchbar from "../../ui/Searchbar";
import CustomButton from "../../ui/CustomButton";
import FilterPill from "../../ui/FilterPill";
import AddProductModal from "../../components/pos/product/AddProductModal";
import PosCakeCard from "../../ui/PosCakeCard";
import {
  getAllProducts,
  handleAvailableProduct,
} from "../../services/productService";
import {
  resetFilters,
  updateFilters,
  validateProductStatus,
} from "../../util/productUtils";
import {
  availabilityFilters,
  categories,
  initialProductFilters,
  pricingTypes,
} from "../../constants/productConstants";
import FilterGroup from "../../ui/FilterGroup";
import Pagination from "../../ui/Pagination";
import LoadingSkeleton from "../../ui/LoadingSkeleton";
import EmptyState from "../../ui/EmptyState";
import UpdateProductModal from "../../components/pos/product/UpdateProductModal";

export default function ProductsPage() {
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

  //initialize create product form state
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  //initialize update product form state
  const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] =
    useState(false);

  //initialize selected product
  const [selectedProduct, setSelectedProduct] = useState(null);

  //initialize availability loading
  const [updatingProductId, setUpdatingProductId] = useState(null);

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

  //handle product availability
  const handleProductAvailability = async (product) => {
    try {
      setUpdatingProductId(product._id);

      await handleAvailableProduct(product._id, product.isAvailable);

      await getProducts();
    } catch (error) {
      console.error(
        "Product availability update failed:",
        error.response?.data?.message || error.message,
      );
    } finally {
      setUpdatingProductId(null);
    }
  };

  return (
    <div className="bg-surface min-h-screen w-full p-2 md:p-4">
      {/* page title */}
      <h1 className="text-secondary mb-4 text-2xl font-semibold md:text-3xl">
        Products
      </h1>

      {/* search, add*/}
      <div className="flex items-center justify-between gap-2">
        <Searchbar
          value={filters.search}
          onChange={(value) => handleFilterChange("search", value)}
          placeholder="products"
        />
        <div>
          <CustomButton onClick={() => setIsAddProductModalOpen(true)}>
            <span className="hidden md:block">Add Product</span>
            <span className="block md:hidden">Add</span>
          </CustomButton>
        </div>
      </div>

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
            onAction={() => setIsAddProductModalOpen(true)}
          />
        ) : (
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-6">
            {data.map((product) => (
              <PosCakeCard
                key={product._id}
                name={product.name}
                description={product.description}
                status={validateProductStatus(
                  product.isAvailable,
                  product.inventory?.available ?? 0,
                  product.inventory?.lowStockThreshold ?? 0,
                )}
                price={product.pricePerKg ?? product.price}
                images={product.images}
                onEdit={() => {
                  setSelectedProduct(product);
                  setIsUpdateProductModalOpen(true);
                }}
                onDisable={() => handleProductAvailability(product)}
                isUpdating={updatingProductId === product._id}
              />
            ))}
          </div>
        )}
      </div>

      {/* add product modal */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onCreate={getProducts}
      />

      {/* update product modal */}
      <UpdateProductModal
        isOpen={isUpdateProductModalOpen}
        onClose={() => {
          setIsUpdateProductModalOpen(false);
          setSelectedProduct(null);
        }}
        onUpdate={getProducts}
        product={selectedProduct}
      />

      {/* pagination */}
      {!loading && pagination.totalPages > 1 && (
        <Pagination
          page={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={(page) => handleFilterChange("page", page)}
        />
      )}
    </div>
  );
}
