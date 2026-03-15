import React from 'react'
import Hero from '../Components/home/Hero.jsx/Hero'
import FeaturedProducts from '../Components/home/featuredproduct/FeaturedProducts'

const Container = () => {
  return (
    <div className=' w-full flex flex-col gap-4  items-center'>

    <Hero />

    <FeaturedProducts />

    </div>
  )
}

export default Container    
