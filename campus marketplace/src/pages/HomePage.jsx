import React from 'react'
import Hero from '../Components/home/Hero.jsx/Hero'
import TrendingSection from '../Components/home/TrendingSection'
import TrustBar from '../Components/home/TrustBar'
import BottomCTA from '../Components/home/BottomCTA'

const Container = () => {
  return (
    <div className='w-full flex flex-col items-center perspective-1000'>

      <Hero />
      <div className="w-full border-b border-gray-200 dark:border-gray-800 my-4" />
      <TrendingSection />
      <TrustBar />
      <BottomCTA />

    </div>
  )
}

export default Container