import React from 'react'
import CustomInput from '../../../ui/CustomInput'

export default function CustomerDetailsSection({
  customerDetails,
  setCustomerDetails,
  errors,
}) {

  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-6">

      {/* section heading */}
      <div className="mb-6 flex flex-row space-x-4 items-center">
        <span className="flex h-8 w-8 items-center justify-center rounded-full text-white bg-primary font-bold">
          1
        </span>

        <h2 className="text-secondary text-xl font-semibold ">
          Your Details
        </h2>
      </div>

      {/* Full name */}
      <div className="mb-4">

        <CustomInput
          label="Full Name" 
          name="fullName"
          type="text"
          placeholder="Your Full Name"
          required
          value={customerDetails.fullName}
          onChange={(e) => 
            setCustomerDetails({
              ...customerDetails,
              fullName: e.target.value,
            })
          }
          error={errors.fullName}
        />         
      </div>

      {/* Phone Number */}
      <div className="mb-4">

        <CustomInput
          label="Phone Number" 
          name="phoneNumber"
          type="tel"
          placeholder="0712345678"
          required
          value={customerDetails.phoneNumber}
          onChange={(e) =>
            setCustomerDetails({
              ...customerDetails,
              phoneNumber: e.target.value,
            })
          }
          error={errors.phoneNumber}
        />    
      </div>

      {/* helper text */}
      <p className="text-sm text-gray-500">
        Used to identify your order. No account needed.
      </p>
    </section>
  )
}
