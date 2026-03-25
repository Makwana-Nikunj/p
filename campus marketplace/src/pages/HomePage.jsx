import React from 'react'
import Hero from '../Components/home/Hero.jsx/Hero'
import TrendingSection from '../Components/home/TrendingSection'
import TrustBar from '../Components/home/TrustBar'
import BottomCTA from '../Components/home/BottomCTA'
import AtmosphericBlooms from '../Components/AtmosphericBlooms'

const Container = () => {
  return (
    <div className='w-full flex flex-col items-center relative min-h-screen'>

      <AtmosphericBlooms intensity="medium" />
      <Hero />
      <div className="w-full divider my-4" />
      <TrendingSection />
      <div className="section-spacing" />
      <TrustBar />
      <div className="section-spacing" />
      <BottomCTA />

    </div>
  )
}

export default Container