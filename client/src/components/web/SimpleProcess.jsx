import React from 'react'
import CustomButton from '../../ui/CustomButton'

export default function SimpleProcess() {
  return (
    <div className="flex w-full flex-col items-center gap-2 px-4 py-12 md:px-10 md:py-10">
           
            {/* Section label */}
            <p className="font-medium text-red-600 text-sm">
                SIMPLE PROCESS
            </p>
    
            {/* Heading */}
            <h2 className="text-center font-semibold text-3xl text-gray-800 ">
                How It Works
            </h2>
    
            {/* Description */}
            <p className="text-sm font-medium text-tertiary md:text-sm">
                Order your favourite cake in four easy steps
            </p>
    
            {/* Popular Cakes Images */}
            <div className="flex flex-col gap-6 md:flex-row">
                <img src="https://images.unsplash.com/photo-1601924582975-4b0f3e1c6d7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="process step 1" className="w-full h-auto rounded-lg shadow-md" />
                <img src="https://images.unsplash.com/photo-1601924582975-4b0f3e1c6d7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="process step 2" className="w-full h-auto rounded-lg shadow-md" />
                <img src="https://images.unsplash.com/photo-1601924582975-4b0f3e1c6d7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="process step 3" className="w-full h-auto rounded-lg shadow-md" />
                <img src="https://images.unsplash.com/photo-1601924582975-4b0f3e1c6d7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="process step 4" className="w-full h-auto rounded-lg shadow-md" />

            </div>
     
            {/* View All Cakes Button */}
            <CustomButton variant="outlined" size="sm" className="mt-6">
                Browse Now
            </CustomButton>
    
        </div>
  )
}
