import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import Hero from '../Components/home/Hero'
import CampusPulse from '../Components/home/CampusPulse'
import Testimonials from '../Components/home/Testimonials'

const HomePage = () => {
  const products = useSelector((state) => state.products.products)
  const activeProducts = products.filter(p => p.status === "approved" || p.status === "active")

  // Deterministically select featured product based on product data
  // Using stable index calculation without Math.random()
  const featuredProduct = useMemo(() => {
    if (activeProducts.length === 0) return null

    // Use first few characters of product IDs to create a deterministic index
    // This will be stable for the same array and different for different arrays
    const combinedValue = activeProducts.reduce((acc, product, index) => {
      const idStr = String(product.id || index)
      const charSum = idStr.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
      return acc + charSum + index
    }, 0)

    const deterministicIndex = Math.abs(combinedValue) % activeProducts.length
    return activeProducts[deterministicIndex]
  }, [activeProducts])

  return (
    <div className='w-full flex flex-col items-center relative bg-[#060E20]'>
      {/* Hero Section (includes feature strip) */}
      <Hero />

      {/* Campus Pulse Section - 5rem spacing */}
      <div className="w-full mt-20 md:mt-24 mb-20 md:mb-24 px-4 md:px-8">
        <CampusPulse featuredProduct={featuredProduct} />
      </div>

      {/* Testimonials - 5rem spacing */}
      <div className="w-full mb-20 md:mb-24 px-4 md:px-8">
        <Testimonials />
      </div>
    </div>
  )
}

export default HomePage