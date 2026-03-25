import React from "react"
import { Link } from "react-router-dom"
import { Sparkles, Users, Shield, TrendingUp, ArrowRight, CheckCircle } from "lucide-react"
import { useSelector } from "react-redux"

const Hero = () => {
  const products = useSelector((state) => state.products.products)
  const activeProducts = products.filter(p => p.status === "approved" || p.status === "active")

  return (
    <div className="w-full flex justify-center px-4 mt-6 relative z-10">
      <div className="w-full max-w-6xl glass rounded-2xl p-6 sm:p-8 md:p-10 text-white relative overflow-hidden animate-fadeIn border border-subtle">
        
        {/* 3D floating elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] opacity-20 animate-float3d" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-400 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px] opacity-20 animate-float3d" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-500 rounded-full -translate-y-1/2 blur-[100px] opacity-20 animate-float3d" style={{ animationDelay: '0.75s' }} />

        <div className="relative z-10">
          {/* Live listings pill */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 animate-glowPulse border border-subtle">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ filter: 'drop-shadow(0 0 8px rgba(34,211,238,0.6))' }} />
            <span className="text-sm font-medium text-white/90">{activeProducts.length} listings live now</span>
          </div>

          {/* Headline */}
          <h1 className="font-hero mb-4 max-w-3xl leading-tight">
            Buy & Sell on Your{' '}
            <span className="gradient-text">Campus</span>
            <br className="hidden sm:block" />
            <span className="gradient-text">Marketplace</span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mb-8 leading-relaxed">
            Connect with fellow students to buy, sell, and trade.
            <span className="text-white font-semibold"> Safe, local, and built for your campus community.</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-10">
            <Link to="/register" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl font-bold btn-gradient-primary text-white hover:shadow-indigo-500/60 transform hover:-translate-y-0.5 transition-all duration-300 btn-press">
              Create free account
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/browse" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl font-bold glass border border-subtle text-white hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transform hover:-translate-y-0.5 btn-press">
              Browse listings
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-subtle">
            {[
              { value: "500+", label: "Students joined" },
              { value: `${activeProducts.length}+`, label: "Active listings" },
              { value: "4.8", label: "Positive ratings" },
              { value: "₹0", label: "Platform fees" }
            ].map((stat, index) => (
              <div key={index} className="tilt-card p-4 rounded-xl glass border border-subtle transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
