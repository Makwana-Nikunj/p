import React, { useMemo } from 'react'
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

  // Marketplace items data - realistic product cards
  const marketplaceItems = useMemo(() => [
    {
      id: 1,
      title: 'Mechanical Keyboard',
      price: '₹4,500',
      category: 'Electronics',
      condition: 'Like New',
      icon: 'keyboard',
      color: 'indigo'
    },
    {
      id: 2,
      title: 'Noise-Cancelling Headphones',
      price: '₹8,999',
      category: 'Electronics',
      condition: 'Excellent',
      icon: 'headphones',
      color: 'cyan'
    },
    {
      id: 3,
      title: 'Calculus: Early Transcendentals',
      price: '₹1,200',
      category: 'Books',
      condition: 'Good',
      icon: 'menu_book',
      color: 'violet'
    },
    {
      id: 4,
      title: 'iPad Pro 12.9"',
      price: '₹75,000',
      category: 'Electronics',
      condition: 'Like New',
      icon: 'tablet',
      color: 'indigo'
    },
    {
      id: 5,
      title: 'Graphing Calculator',
      price: '₹6,500',
      category: 'Electronics',
      condition: 'Very Good',
      icon: 'calculate',
      color: 'cyan'
    },
    {
      id: 6,
      title: 'Introduction to Python',
      price: '₹800',
      category: 'Books',
      condition: 'Like New',
      icon: 'book',
      color: 'violet'
    },
    {
      id: 7,
      title: 'Wireless Mouse',
      price: '₹1,800',
      category: 'Electronics',
      condition: 'New',
      icon: 'computer',
      color: 'indigo'
    },
    {
      id: 8,
      title: 'Dorm Room Desk',
      price: '₹4,500',
      category: 'Furniture',
      condition: 'Good',
      icon: 'desk',
      color: 'cyan'
    },
    {
      id: 9,
      title: 'Physics for Scientists',
      price: '₹1,500',
      category: 'Books',
      condition: 'Acceptable',
      icon: 'auto_stories',
      color: 'violet'
    },
    {
      id: 10,
      title: 'Yoga Mat',
      price: '₹1,200',
      category: 'Sports',
      condition: 'Like New',
      icon: 'fitness_center',
      color: 'indigo'
    },
    {
      id: 11,
      title: 'Coffee Maker',
      price: '₹3,200',
      category: 'Home',
      condition: 'Good',
      icon: 'kitchen',
      color: 'cyan'
    },
    {
      id: 12,
      title: 'Study Lamp',
      price: '₹900',
      category: 'Home',
      condition: 'Very Good',
      icon: 'lightbulb',
      color: 'violet'
    }
  ], [])

  // Helper function for random range
  const random = (min, max) => Math.random() * (max - min) + min

  // Helper function for random selection
  const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)]

  // Generate random floating items with depth-based properties
  const floatingItems = useMemo(() => {
    const items = []
    const zones = [
      { xRange: [5, 25], yRange: [15, 40] },   // Top-left
      { xRange: [75, 95], yRange: [15, 40] },  // Top-right
      { xRange: [5, 25], yRange: [60, 85] },   // Bottom-left
      { xRange: [75, 95], yRange: [60, 85] },  // Bottom-right
      { xRange: [40, 60], yRange: [20, 35] },  // Top-center
      { xRange: [40, 60], yRange: [65, 80] },  // Bottom-center
    ]

    // Create 12 floating items with depth layers
    for (let i = 0; i < 12; i++) {
      // Depth layer: 0 = far, 1 = mid, 2 = close
      const depth = i % 3 // 0, 1, 2 repeating

      // Scale based on depth (far = smaller)
      const baseScale = depth === 2 ? random(0.85, 1.0) : depth === 1 ? random(0.7, 0.85) : random(0.5, 0.7)

      // Blur based on depth (far = more blur)
      const blurAmount = depth === 2 ? '0px' : depth === 1 ? '2px' : '4px'

      // Opacity based on depth (far = more transparent)
      const opacity = depth === 2 ? random(0.85, 0.95) : depth === 1 ? random(0.7, 0.85) : random(0.4, 0.6)

      // Random zone selection (avoid center)
      const zone = randomChoice(zones)

      // Position within zone
      const x = random(zone.xRange[0], zone.xRange[1])
      const y = random(zone.yRange[0], zone.yRange[1])

      // Animation timing unique per card
      const duration = random(8, 14)
      const delay = random(0, 4)
      const driftX = random(-1.5, 1.5)
      const driftY = random(-2, 2)
      const rotation = random(-8, 8)

      // Random item selection
      const item = randomChoice(marketplaceItems)

      items.push({
        key: i,
        item,
        x,
        y,
        scale: baseScale,
        blur: blurAmount,
        opacity,
        duration,
        delay,
        driftX,
        driftY,
        rotation
      })
    }

    return items
  }, [])

  // Floating animation variant
  const createFloatVariant = (driftX, driftY, rotation, duration) => ({
    animate: {
      x: [0, driftX, 0],
      y: [0, driftY, 0],
      rotate: [0, rotation, -rotation/2, 0],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "mirror"
      }
    }
  })

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

        {/* Dynamic Floating Marketplace Items */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {floatingItems.map(({ key, item, x, y, scale, blur, opacity, duration, delay, driftX, driftY, rotation }) => (
            <motion.div
              key={key}
              className="absolute origin-center"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                filter: `blur(${blur})`,
                opacity
              }}
              {...createFloatVariant(driftX, driftY, rotation, duration)}
              initial={{ x: 0, y: 0, rotate: 0 }}
            >
              <div
                className="tilt-card glass-card rounded-2xl overflow-hidden border border-white/10 shadow-lg backdrop-blur-xl"
                style={{
                  transform: `scale(${scale})`,
                  boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 ${scale > 0.8 ? '40px' : '30px'} -5px rgba(99,102,241,${scale * 0.2})`
                }}
              >
                {/* Product image placeholder with gradient */}
                <div className={`aspect-[4/3] bg-gradient-to-br from-${item.color}-500/20 to-${item.color}-500/5 relative`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`material-symbols-outlined text-6xl md:text-7xl text-${item.color}-400/40`}>
                      {item.icon}
                    </span>
                  </div>
                  {/* Condition badge */}
                  <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-indigo-500/20 backdrop-blur-sm border border-indigo-500/30">
                    <span className="text-[10px] font-bold text-indigo-300">{item.condition}</span>
                  </div>
                </div>

                {/* Product info */}
                <div className="p-3">
                  <h4 className="font-headline font-bold text-white text-sm mb-1 line-clamp-2 leading-tight">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{item.category}</span>
                    <div className="text-sm font-extrabold gradient-text bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                      {item.price}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
