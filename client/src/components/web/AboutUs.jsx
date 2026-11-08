import React from 'react'
import CustomButton from '../../ui/CustomButton'

export default function AboutUs() {
  return (
    <section className="flex flex-col items-center justify-between gap-10 px-4 py-12 md:flex-row md:px-10 md:py-20 bg-white">
        
          {/* left side content */}
          <div className="flex h-full w-full items-center justify-center rounded-2xl md:h-96 md:w-1/2">
            <img src="https://images.unsplash.com/photo-1601924582975-4b0f3e1c6d7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="About Us" className="h-full w-full rounded-2xl object-cover shadow-md" />
          </div>
    
          {/* right side content */}
          <div className="flex w-full flex-col gap-2 px-4 py-12 md:px-10 md:py-10 bg-white md:w-1/2">
                 
                  {/* Section label */}
                  <p className="font-medium text-red-600 text-sm">
                      OUR STORY
                  </p>
          
                  {/* Heading */}
                  <h2 className=" font-semibold text-2xl text-gray-800 ">
                      About Wasana Bakers
                  </h2>
          
                  {/* Description */}
                  <p className="text-sm font-medium text-tertiary md:text-sm">
                    The seed of Horana Wasana Bakery was planted by Mr. Dayananda Bobuwala and his wife Mrs. Anusha Wijayanthi Perera. In the search for a name for this new bakery, he wanted to add the name of the city Horana, which has a strong connection since his childhood. The foundation of Wasana Bakers was laid in 1995 when the current owner and his wife established it in Ratiyala, Govinna in Western Province.                    </p>
           
                  {/* View All Cakes Button */}
                  <CustomButton variant="outlined" size="sm" className="mt-6">
                      Our Products
                  </CustomButton>
            </div>

        </section>
  )
}
