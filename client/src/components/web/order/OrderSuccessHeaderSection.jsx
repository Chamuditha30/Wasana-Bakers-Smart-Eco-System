import React from 'react'
import { Check } from 'lucide-react'

export default function OrderSuccessHeaderSection() {
  return (
    <div className="flex flex-col items-center text-center">

        {/* Success Icon */}
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-green-700 bg-green-50">
            <Check className="h-9 w-9 text-green-700"/>
        </div>

        {/* Heading */}
        <h1 className="text-secondary text-3xl font-bold">
            Order Placed!
        </h1>

        {/* Description */}
        <p className="text-tertiary mt-2 text-sm">
            Your order has been received successfully.
        </p>
    </div>
  )
}
