import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const Hero = () => {
  const { userData } = useSelector((state) => state.auth)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
    }
  }

  const floatVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060E20]">
        {/* Atmospheric Bloom Circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Indigo bloom - large, subtle */}
          <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-indigo-500/15 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow"></div>
          {/* Cyan bloom - medium */}
          <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[100px] rounded-full mix-blend-screen animate-pulse-medium"></div>
          {/* Violet accent bloom - small, positioned */}
          <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] bg-violet-500/8 blur-[90px] rounded-full mix-blend-screen animate-pulse-fast"></div>
        </div>

        {/* Premium Product Preview Cards - Floating 3D */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Left: Chat Preview */}
          <motion.div
            className="absolute top-[15%] left-[8%] md:left-[15%] perspective-container"
            variants={floatVariants}
            animate="animate"
            style={{ animationDelay: '0s' }}
          >
            <div className="tilt-card glass-card p-4 rounded-2xl w-64 md:w-72 opacity-90">
              {/* Chat header */}
              <div className="flex items-center gap-3 mb-3 pb-3 border-b border-indigo-500/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-sm">person</span>
                </div>
                <div className="flex-1">
                  <div className="h-2.5 w-20 bg-indigo-400/30 rounded mb-1"></div>
                  <div className="h-1.5 w-16 bg-cyan-400/20 rounded"></div>
                </div>
                <div className="h-2 w-2 bg-green-400 rounded-full"></div>
              </div>
              {/* Chat bubbles */}
              <div className="space-y-2.5">
                <div className="bg-[#0C0C0C] p-2.5 rounded-2xl rounded-bl-md max-w-[80%]">
                  <div className="h-2 w-full bg-indigo-400/20 rounded mb-1.5"></div>
                  <div className="h-2 w-3/4 bg-indigo-400/10 rounded"></div>
                </div>
                <div className="bg-indigo-500/20 p-2.5 rounded-2xl rounded-br-md ml-auto max-w-[80%]">
                  <div className="h-2 w-full bg-indigo-300/30 rounded mb-1.5"></div>
                  <div className="h-2 w-2/3 bg-indigo-300/20 rounded"></div>
                </div>
                <div className="bg-[#0C0C0C] p-2.5 rounded-2xl rounded-bl-md max-w-[80%]">
                  <div className="h-2 w-full bg-indigo-400/20 rounded mb-1.5"></div>
                  <div className="h-2 w-4/5 bg-indigo-400/10 rounded"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Product Card Preview */}
          <motion.div
            className="absolute top-[25%] right-[10%] md:right-[18%] perspective-container"
            variants={floatVariants}
            animate="animate"
            style={{ animationDelay: '2s' }}
          >
            <div className="tilt-card glass-card rounded-3xl overflow-hidden w-64 md:w-72 opacity-90 shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]">
              {/* Product image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-7xl text-indigo-400/30">laptop_mac</span>
                </div>
                {/* Condition badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-indigo-500/20 backdrop-blur-sm border border-indigo-500/30">
                  <span className="text-xs font-bold text-indigo-300">Like New</span>
                </div>
              </div>
              {/* Product info */}
              <div className="p-4">
                <h4 className="font-headline font-bold text-white text-base mb-2 line-clamp-2">Premium Wireless Keyboard</h4>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>Electronics</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-extrabold gradient-text bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">₹4,999</div>
                  <div className="text-xs text-gray-400"> Seller • 2h</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom: Small notification/trust card */}
          <motion.div
            className="absolute bottom-[20%] left-[20%] md:left-[25%] perspective-container"
            variants={floatVariants}
            animate="animate"
            style={{ animationDelay: '4s' }}
          >
            <div className="glass-card p-3 rounded-xl flex items-center gap-3 opacity-80 w-56">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-xs">check_circle</span>
              </div>
              <div className="flex-1">
                <div className="h-2 w-full bg-green-400/30 rounded mb-1"></div>
                <div className="h-1.5 w-3/4 bg-green-400/20 rounded"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-8 md:pt-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Welcome Message for Logged In Users */}
          {userData && (
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 text-gray-200 text-sm font-medium backdrop-blur-sm">
                <span className="material-symbols-outlined text-indigo-400 mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>wave</span>
                Welcome back, {userData.name || userData.email?.split('@')[0]}!
              </span>
            </motion.div>
          )}

          {/* Main Headline - Stronger conversion focus */}
          <motion.h1
            variants={itemVariants}
            className="font-headline text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 md:mb-8 leading-tight"
          >
            Buy, Sell & Connect
            <br className="hidden sm:block" />
            <span className="gradient-text animate-gradient-shift bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent" style={{ backgroundSize: '200% auto' }}>
              Inside Your Campus
            </span>
          </motion.h1>

          {/* Subheadline - Clear value prop */}
          <motion.p
            variants={itemVariants}
            className="font-body text-lg md:text-xl text-gray-300/80 mb-10 md:mb-14 max-w-3xl mx-auto leading-relaxed"
          >
            The trusted marketplace built exclusively for students.
            <span className="text-cyan-400 font-semibold"> Verified users, zero fees, and campus-safe transactions.</span>
          </motion.p>

          {/* Primary CTA - More prominent */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-8"
          >
            <Link
              to={userData ? "/add-item" : "/register"}
              className="group px-10 md:px-12 py-4 md:py-5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-base md:text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(99,102,241,0.6)] hover:shadow-[0_0_60px_-10px_rgba(139,92,246,0.8)] cursor-pointer w-full sm:w-auto text-center relative overflow-hidden"
            >
              {/* Button glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                {userData ? (
                  <>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
                    List Your Item Free
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>rocket_launch</span>
                    Get Started Free
                  </>
                )}
              </span>
            </Link>
            <Link
              to="/browse"
              className="px-10 md:px-12 py-4 md:py-5 rounded-full border-2 border-indigo-500/40 text-gray-200 font-bold text-base md:text-lg hover:bg-indigo-500/10 hover:border-indigo-500/60 transition-all duration-300 backdrop-blur-sm cursor-pointer active:scale-95 w-full sm:w-auto text-center group"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
                Browse Marketplace
              </span>
            </Link>
          </motion.div>

          {/* Feature Strip (Marquee) */}
          <motion.div
            variants={itemVariants}
            className="w-full mt-20 md:mt-24 py-6 bg-surface-container-low/50 backdrop-blur-md overflow-hidden border-y border-indigo-500/10 relative"
          >
            <div className="marquee-content">
              {/* First set of features */}
              {[
                { icon: 'verified', text: 'Verified Student Accounts', color: 'text-indigo-400' },
                { icon: 'verified_user', text: 'Secure Transactions', color: 'text-indigo-400' },
                { icon: 'lock', text: 'Secure Campus Meetups', color: 'text-cyan-400' },
                { icon: 'chat_bubble', text: 'In-App Chat Included', color: 'text-cyan-400' },
                { icon: 'payments', text: 'Zero Fees Forever', color: 'text-violet-400' },
                { icon: 'school', text: 'Verified Students Only', color: 'text-indigo-400' },
                { icon: 'location_on', text: 'Campus-Specific', color: 'text-cyan-400' },
                { icon: 'bolt', text: 'Real-Time Deals', color: 'text-violet-400' }
              ].map((feature, index) => (
                <div key={`first-${index}`} className="flex items-center space-x-3 px-6 md:px-8">
                  <span className={`material-symbols-outlined text-2xl md:text-3xl ${feature.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                    {feature.icon}
                  </span>
                  <span className="font-headline font-bold text-base md:text-lg tracking-tight text-gray-200">
                    {feature.text}
                  </span>
                </div>
              ))}

              {/* Duplicate set for seamless loop */}
              {[
                { icon: 'verified', text: 'Verified Student Accounts', color: 'text-indigo-400' },
                { icon: 'verified_user', text: 'Secure Transactions', color: 'text-indigo-400' },
                { icon: 'lock', text: 'Secure Campus Meetups', color: 'text-cyan-400' },
                { icon: 'chat_bubble', text: 'In-App Chat Included', color: 'text-cyan-400' },
                { icon: 'payments', text: 'Zero Fees Forever', color: 'text-violet-400' },
                { icon: 'school', text: 'Verified Students Only', color: 'text-indigo-400' },
                { icon: 'location_on', text: 'Campus-Specific', color: 'text-cyan-400' },
                { icon: 'bolt', text: 'Real-Time Deals', color: 'text-violet-400' }
              ].map((feature, index) => (
                <div key={`second-${index}`} className="flex items-center space-x-3 px-6 md:px-8">
                  <span className={`material-symbols-outlined text-2xl md:text-3xl ${feature.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                    {feature.icon}
                  </span>
                  <span className="font-headline font-bold text-base md:text-lg tracking-tight text-gray-200">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}

export default Hero
