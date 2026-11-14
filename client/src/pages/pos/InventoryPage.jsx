import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  initialInventoryFilters,
  inventoryStatus,
} from "../../constants/inventoryConstants";
import Searchbar from "../../ui/Searchbar";
import FilterGroup from "../../ui/FilterGroup";
import {
  resetFilters,
  updateFilters,
  validateInventoryStatus,
} from "../../util/inventoryUtils";
import { categories } from "../../constants/productConstants";
import { getAllInventories } from "../../services/inventoryService";
import CustomButton from "../../ui/CustomButton";
import Pagination from "../../ui/Pagination";
import EmptyState from "../../ui/EmptyState";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import AddInventoryModal from "../../components/pos/inventory/AddInventoryModal";
import AdjustInventoryModal from "../../components/pos/inventory/AdjustInventoryModal";

export default function InventoryPage() {
  //initialize navigate
  const navigate = useNavigate();

  //initialize filters
  const [filters, setFilters] = useState(initialInventoryFilters);

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

  //initialize add inventory form state
  const [isAddInventoryModalOpen, setIsAddInventoryModalOpen] = useState(false);

  //initialize adjust inventory form state
  const [isAdjustInventoryModalOpen, setIsAdjustInventoryModalOpen] =
    useState(false);

  //initialize selected inventory
  const [selectedInventory, setSelectedInventory] = useState(null);

  //update filters
  const handleFilterChange = (name, value) => {
    setFilters((prev) => updateFilters(prev, name, value));
  };

  //get all inventories
  const getInventories = async () => {
    try {
      setLoading(true);

      //call api
      const result = await getAllInventories(filters);

      setData(result.inventories);

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
    getInventories();
  }, [filters]);

  return (
    <div className="bg-surface min-h-screen w-full p-2 md:p-4">
      <h1 className="text-secondary mb-4 text-2xl font-semibold md:text-3xl">
        Inventory
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

        {/* status filters */}
        <FilterGroup
          options={[{ value: "", label: "All" }, ...inventoryStatus]}
          value={filters.status}
          onChange={(value) => handleFilterChange("status", value)}
        />

        {/* reset filters */}
        <button
          type="button"
          onClick={() => setFilters(resetFilters(initialInventoryFilters))}
          className="text-primary mb-4 cursor-pointer text-sm"
        >
          Reset Filters
        </button>
      </div>

      {/* desktop inventory section */}
      <div className="border-border mt-6 hidden rounded-xl border bg-white shadow-sm md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-border text-muted border-b bg-gray-50 text-xs font-semibold tracking-wide">
            <tr>
              <th className="px-5 py-4">PRODUCT</th>
              <th className="px-5 py-4">AVAILABLE</th>
              <th className="px-5 py-4">RESERVED</th>
              <th className="px-5 py-4">TOTAL</th>
              <th className="px-5 py-4">STATUS</th>
              <th className="px-5 py-4">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((inventory) => {
              const status = validateInventoryStatus(
                inventory.available,
                inventory.lowStockThreshold,
              );

              const unit =
                inventory.product.pricingType === "by_weight" ? " g" : " pcs";

              return (
                <tr
                  key={inventory._id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="text-secondary px-5 py-4 font-medium">
                    {inventory.product.name}
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {unit === " g"
                      ? inventory.available / 1000
                      : inventory.available}
                    {unit}
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {unit === " g"
                      ? inventory.reserved / 1000
                      : inventory.reserved}
                    {unit}
                  </td>
                  <td className="text-secondary px-5 py-4 font-medium">
                    {unit === " g"
                      ? (inventory.available + inventory.reserved) / 1000
                      : inventory.available + inventory.reserved}
                    {unit}
                  </td>
                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        status === "Available"
                          ? "bg-green-100 text-green-600"
                          : status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <CustomButton
                        size="sm"
                        onClick={() => {
                          setSelectedInventory(inventory);
                          setIsAddInventoryModalOpen(true);
                        }}
                      >
                        Add
                      </CustomButton>
                      <CustomButton
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setSelectedInventory(inventory);
                          setIsAdjustInventoryModalOpen(true);
                        }}
                      >
                        Adjust
                      </CustomButton>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {data.length === 0 && !loading && (
          <EmptyState
            actionLabel="Add Product"
            onAction={() => navigate("/products")}
          />
        )}
      </div>

      {/* mobile inventory section */}
      <div className="mt-6 space-y-3 pb-20 md:hidden">
        {data.map((inventory) => {
          const status = validateInventoryStatus(
            inventory.available,
            inventory.lowStockThreshold,
          );

          const unit =
            inventory.product.pricingType === "by_weight" ? " g" : " pcs";

          return (
            <Disclosure key={inventory._id}>
              {({ open }) => (
                <div className="border-border rounded-xl border bg-white shadow-sm">
                  {/* always visible section */}
                  <div className="p-3">
                    <DisclosureButton className="flex w-full items-center justify-between gap-3 text-left">
                      <span className="text-secondary font-medium">
                        {inventory.product.name}
                      </span>

                      <ChevronDown
                        size={18}
                        className={`text-muted shrink-0 transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </DisclosureButton>

                    {/* Action buttons */}
                    <div className="mt-3 flex gap-2">
                      <div className="flex-1">
                        <CustomButton
                          size="sm"
                          onClick={() => {
                            setSelectedInventory(inventory);
                            setIsAddInventoryModalOpen(true);
                          }}
                          className="w-full"
                        >
                          Add
                        </CustomButton>
                      </div>

                      <div className="flex-1">
                        <CustomButton
                          variant="secondary"
                          size="sm"
                          className="w-full"
                        >
                          Adjust
                        </CustomButton>
                      </div>
                    </div>
                    {/* Expandable details */}
                    <DisclosurePanel className="border-border border-t bg-gray-50 p-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-muted text-xs">AVAILABLE</p>
                          <p className="text-secondary mt-1 font-medium">
                            {inventory.available}
                            {unit}
                          </p>
                        </div>

                        <div>
                          <p className="text-muted text-xs">RESERVED</p>
                          <p className="text-secondary mt-1 font-medium">
                            {inventory.reserved}
                            {unit}
                          </p>
                        </div>

                        <div>
                          <p className="text-muted text-xs">TOTAL</p>
                          <p className="text-secondary mt-1 font-medium">
                            {inventory.available + inventory.reserved}
                            {unit}
                          </p>
                        </div>

                        <div>
                          <p className="text-muted text-xs">STATUS</p>
                          <span
                            className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                              status === "Available"
                                ? "bg-green-100 text-green-600"
                                : status === "Low Stock"
                                  ? "bg-yellow-100 text-yellow-600"
                                  : "bg-red-100 text-red-600"
                            }`}
                          >
                            {status}
                          </span>
                        </div>
                      </div>
                    </DisclosurePanel>
                  </div>
                </div>
              )}
            </Disclosure>
          );
        })}
      </div>

      <AddInventoryModal
        isOpen={isAddInventoryModalOpen}
        onClose={() => setIsAddInventoryModalOpen(false)}
        onCreate={getInventories}
        inventory={selectedInventory}
      />

      <AdjustInventoryModal
        isOpen={isAdjustInventoryModalOpen}
        onClose={() => setIsAdjustInventoryModalOpen(false)}
        onCreate={getInventories}
        inventory={selectedInventory}
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
