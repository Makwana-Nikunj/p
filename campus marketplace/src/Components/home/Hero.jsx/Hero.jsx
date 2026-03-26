import React from "react"
import { Link } from "react-router-dom"
import { Sparkles, Users, Shield, TrendingUp, ArrowRight, CheckCircle } from "lucide-react"
import { useSelector } from "react-redux"

const Hero = () => {
  const products = useSelector((state) => state.products.products)
  const activeProducts = products.filter(p => p.status === "approved" || p.status === "active")
  const user = useSelector((state) => state.auth.userData)

  return (
    <div className="w-full flex justify-center px-4 mt-6 relative z-10">
      <div className="w-full max-w-6xl glass glass-intense rounded-2xl p-8 sm:p-10 md:p-12 lg:p-16 text-white relative overflow-hidden animate-fadeIn border border-subtle">

        {/* 3D floating elements with precise colors */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] opacity-20 animate-float3d" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-400 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px] opacity-20 animate-float3d" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-500 rounded-full -translate-y-1/2 blur-[100px] opacity-20 animate-float3d" style={{ animationDelay: '0.75s' }} />

        <div className="relative z-10">
          {/* Live listings pill */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-glowPulse border border-subtle">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ filter: 'drop-shadow(0 0 8px rgba(34,211,238,0.6))' }} />
            <span className="text-sm font-medium text-white/90">{activeProducts.length} listings live now</span>
          </div>

          {/* Headline - Hero font with gradient text */}
          <h1 className="font-hero mb-6 max-w-3xl leading-tight tracking-tight">
            Buy & Sell on Your{' '}
            <span className="gradient-text">Campus</span>
            <br className="hidden sm:block" />
            <span className="gradient-text">Marketplace</span>
          </h1>

          {/* Subtext - proper text color following theme */}
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed font-body">
            Connect with fellow students to buy, sell, and trade.
            <span className="text-white font-semibold"> Safe, local, and built for your campus community.</span>
          </p>

          {/* CTAs - proper spacing and effects */}
          <div className="flex flex-wrap gap-4 mb-12">
            {user ? (
              <div className="inline-flex items-center gap-3 h-12 px-6 rounded-xl font-semibold glass border border-subtle text-white/90 bg-indigo-500/10">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Welcome back, {user.name || user.username || user.email?.split('@')[0]}</span>
              </div>
            ) : (
              <Link
                to="/register"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-xl font-bold btn-gradient-primary text-white hover:shadow-indigo-500/60 transform hover:-translate-y-0.5 transition-all duration-300 btn-press"
              >
                Create free account
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
            <Link to="/browse" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl font-bold glass border border-subtle text-white hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transform hover:-translate-y-0.5 btn-press hover:border-indigo-500/50">
              Browse listings
              <Sparkles className="w-4 h-4" />
            </Link>
          </div>

          {/* Stats - with proper spacing and glassmorphism */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-subtle">
            {[
              { value: "500+", label: "Students joined" },
              { value: `${activeProducts.length}+`, label: "Active listings" },
              { value: "4.8", label: "Positive ratings" },
              { value: "₹0", label: "Platform fees" }
            ].map((stat, index) => (
              <div key={index} className="tilt-card p-4 rounded-xl glass border border-subtle transition-all duration-300 hover:border-indigo-500/50">
                <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400 font-body">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
