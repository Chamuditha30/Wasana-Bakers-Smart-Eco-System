import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { useState } from "react";
import CustomInput from "../../../ui/CustomInput";
import CustomButton from "../../../ui/CustomButton";
import { validateInventoryForm } from "../../../util/inventoryUtils";
import { addInventoryStock } from "../../../services/inventoryService";

export default function AddInventoryModal({
  isOpen,
  onClose,
  onCreate,
  inventory,
}) {
  //initialize amount
  const [amount, setAmount] = useState("");

  //initialize errors
  const [errors, setErrors] = useState({});

  //initialize loading
  const [loading, setLoading] = useState(false);

  //initialize unit
  const unit =
    inventory?.product?.pricingType === "by_weight" ? "grams" : "pieces";

  //reset form
  const resetForm = () => {
    setAmount("");
    setErrors({});
  };

  //handle modal close
  const handleClose = () => {
    resetForm();
    onClose();
  };

  //handle input changes
  const handleInputChange = (e) => {
    setAmount(e.target.value);

    setErrors((prev) => ({
      ...prev,
      amount: "",
    }));
  };

  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    //validate form
    const validationErrors = validateInventoryForm(amount);

    setErrors(validationErrors);

    //stop if validation fails
    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);

      //call api
      await addInventoryStock(inventory.product._id, Number(amount));

      //refetch products
      await onCreate();

      //reset and close modal
      resetForm();
      onClose();
    } catch (error) {
      console.error("Failed to add inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      {/* background overlay */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* modal container */}
      <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-4">
        <DialogPanel className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-4 shadow-xl">
          <DialogTitle className="mb-6 text-xl font-semibold">
            Add Inventory Stock
          </DialogTitle>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-2"
          >
            <CustomInput
              label={`Add Inventory Stock (${unit})`}
              name="amount"
              value={amount}
              onChange={handleInputChange}
              placeholder={`Enter amount in ${unit}`}
              required
              error={errors.amount}
            />

            <div className="flex w-full items-center justify-center gap-2">
              <CustomButton
                type="submit"
                disabled={loading}
                className="md:w-full"
              >
                {loading ? "Adding..." : "Add"}
              </CustomButton>
              <CustomButton
                variant="outlined"
                disabled={loading}
                onClick={handleClose}
                className="md:w-full"
              >
                Cancel
              </CustomButton>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
