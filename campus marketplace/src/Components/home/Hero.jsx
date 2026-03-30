import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Hero = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#060E20]">
        {/* Atmospheric Bloom Circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Indigo bloom - large, subtle */}
          <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-indigo-500/15 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow"></div>
          {/* Cyan bloom - medium */}
          <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[100px] rounded-full mix-blend-screen animate-pulse-medium"></div>
          {/* Violet accent bloom - small, positioned */}
          <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] bg-violet-500/8 blur-[90px] rounded-full mix-blend-screen animate-pulse-fast"></div>
        </div>

        {/* Floating Product Cards Background with 3D Tilt */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Card 1: Top Left - Keyboard */}
          <div className="absolute top-[20%] left-[10%] perspective-container">
            <div className="tilt-card glass-card-indigo p-4 rounded-xl w-48 opacity-40 floating-anim-1">
              <div className="aspect-square bg-surface-container-highest rounded-lg mb-2 overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxvd5NWRg_YmYCO8a0TPVh_yZn8nR0zlrdGLwFvF0G4xTdPjmY24podJHiZlo70oB5XgPjeJt13LtxpThcxSu85xTMK7pOQEtkQybisrSWGffcZBDV6-laNZRXJOqpudJvZQzQTBIFQFqSBEChCdgiu3x_7OHIOkvfbGW0IxDzcmdSHODhNzpo99qk_6vdH-aJVk8zl9xB-EyqFhSG_cbWv6Mxh7ZoTz534CPwZLGRP_oVURl9qGGhhwkXhR5kNM9l7KN-kDdfRa6Y"
                  alt="sleek modern mechanical keyboard with RGB lighting on a dark desk background"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="h-2 w-20 bg-indigo-500/20 rounded mb-1"></div>
              <div className="h-2 w-12 bg-indigo-500/10 rounded"></div>
            </div>
          </div>

          {/* Card 2: Bottom Right - Headphones */}
          <div className="absolute bottom-[25%] right-[15%] perspective-container">
            <div className="tilt-card glass-card-cyan p-4 rounded-xl w-56 opacity-40 floating-anim-2">
              <div className="aspect-square bg-surface-container-highest rounded-lg mb-2 overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVHJGXb7_kEYMhgjY4D9cLL8zZhOul0FRcjY45tBmQISMI6M9Rt4dX-WXygwtDNWj7t4HtYfhzbzd5s11BB_u6eDRGToNJUPwVxnfxM-ENMma_4JEkQLMzS7MckFqjFjFUfn1zXKiSpfcQAEwt1seheBCegdVj6ucvUMFxAnK8jGXb2ijYjYQFExcdeynHI6p_ssMIlCQKL-nt6PIYbIINWyiIzXDcsQYiYZwZKghedO-7jT7kea2yJZgXnaRhnXb9zKpUOEOEheeC"
                  alt="high-quality designer noise-cancelling headphones resting on a minimalist glass table"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="h-2 w-24 bg-cyan-500/20 rounded mb-1"></div>
              <div className="h-2 w-16 bg-cyan-500/10 rounded"></div>
            </div>
          </div>

          {/* Card 3: Top Leftish - Books (hidden on mobile) */}
          <div className="absolute top-[60%] left-[5%] perspective-container hidden lg:block">
            <div className="tilt-card glass-card-violet p-4 rounded-xl w-40 opacity-20 floating-anim-2">
              <div className="aspect-square bg-surface-container-highest rounded-lg mb-2 overflow-hidden">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAD6MwwUxIz3BputhoiM1eSUZvqlrbcLtLrWVOPacPPFiV070ou-q0s8A6_90z-EUbgS2ZtGtSNG1-ZpgNPruNZJF3-K8gFFvSCD60Fy6Clx9WhJglL0AXe7xgf6blP8iqFn5EXEiZv5OCAKNHtsijXO5jcrhI44EXthHYXKWF1BXgBmIUYxtJqoUMArJXKWeKnyVEDpUsh9NdmlS2VvG7xUFHEwoK8tnDAq_BfQwRzKX4b0h71JquEYvnt7fPicVIlV3uu8XiUXUW"
                  alt="stack of academic textbooks with artistic composition in a library setting with soft focus"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-8 md:pt-12">
          {/* Welcome Message for Logged In Users */}
          {user && (
            <div className="mb-6 animate-fadeIn">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 text-gray-200 text-sm font-medium backdrop-blur-sm">
                <span className="material-symbols-outlined text-indigo-400 mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>wave</span>
                Welcome back, {user.name || user.email?.split('@')[0]}!
              </span>
            </div>
          )}

          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold text-xs tracking-widest uppercase mb-6 md:mb-8 backdrop-blur-sm transition-all duration-300 hover:bg-indigo-500/20 hover:border-indigo-500/50 hover:scale-105 cursor-default">
            The Ethereal Exchange
          </span>

          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 md:mb-8">
            <span className="gradient-text animate-gradient-shift bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent" style={{ backgroundSize: '200% auto' }}>
              Elevate Your Campus Life.
            </span>
          </h1>

          <p className="font-body text-lg md:text-xl text-gray-300/80 mb-10 md:mb-14 max-w-3xl mx-auto leading-relaxed">
            The high-fidelity marketplace designed exclusively for students. Buy, sell, and connect within a secure ecosystem built on trust and kinetic energy.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-12 md:mb-16">
            <Link
              to="/browse"
              className="px-8 md:px-10 py-3 md:py-4 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-base md:text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] hover:shadow-[0_0_50px_-5px_rgba(139,92,246,0.7)] cursor-pointer active:scale-95 w-full sm:w-auto text-center"
            >
              Explore Marketplace
            </Link>
            <Link
              to="/add-item"
              className="px-8 md:px-10 py-3 md:py-4 rounded-full border border-indigo-500/30 text-gray-200 font-bold text-base md:text-lg hover:bg-indigo-500/10 transition-all duration-300 backdrop-blur-sm cursor-pointer active:scale-95 w-full sm:w-auto text-center"
            >
              List an Item
            </Link>
          </div>

          {/* Feature Strip (Marquee) */}
          <div className="w-full mt-32 md:mt-48 py-6 bg-surface-container-low/50 backdrop-blur-md overflow-hidden border-y border-indigo-500/10 relative">
            <div className="marquee-content">
              {/* First set of features */}
              {[
                { icon: 'verified_user', text: 'Secure Transactions', color: 'text-indigo-400' },
                { icon: 'payments', text: 'Zero Fees', color: 'text-violet-400' },
                { icon: 'chat_bubble', text: 'Real-time Chat', color: 'text-cyan-400' },
                { icon: 'school', text: 'Verified Students', color: 'text-indigo-400' }
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
                { icon: 'verified_user', text: 'Secure Transactions', color: 'text-indigo-400' },
                { icon: 'payments', text: 'Zero Fees', color: 'text-violet-400' },
                { icon: 'chat_bubble', text: 'Real-time Chat', color: 'text-cyan-400' },
                { icon: 'school', text: 'Verified Students', color: 'text-indigo-400' }
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
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
