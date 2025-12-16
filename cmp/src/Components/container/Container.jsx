import React from 'react'
import Hero from './Hero.jsx/Hero'
import FeaturedProducts from './featuredproduct/FeaturedProducts'

const Container = () => {
  return (
    <div className='mt-25 w-full flex flex-col gap-4  items-center'>

    <Hero />

    <FeaturedProducts />

    </div>
  )
}

export default Container    