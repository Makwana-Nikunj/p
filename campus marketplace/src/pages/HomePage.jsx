import React from 'react'
import Hero from '../Components/home/Hero.jsx/Hero'
import TrendingSection from '../Components/home/TrendingSection'
import TrustBar from '../Components/home/TrustBar'
import BottomCTA from '../Components/home/BottomCTA'

const Container = () => {
  return (
    <div className='w-full flex flex-col gap-4 items-center'>

    <Hero />
    <TrendingSection />
    <TrustBar />
    <BottomCTA />

    </div>
  )
}

export default Container