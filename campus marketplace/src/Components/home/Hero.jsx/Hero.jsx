import React from "react"
import { Link } from "react-router-dom"
import { Sparkles, Users, Shield, TrendingUp, ArrowRight, CheckCircle } from "lucide-react"
import { useSelector } from "react-redux"

const Hero = () => {
  const products = useSelector((state) => state.products.products);
  const activeProducts = products.filter(p => p.status === "approved" || p.status === "active")

  return (
    <div className="w-full flex justify-center px-4 mt-6 perspective-1000">
      <div
        className="
          w-full max-w-6xl
          bg-gradient-to-br from-[#0c0c0c] via-[#1a1a1a] to-[#0c0c0c]
          rounded-2xl
          p-6 sm:p-8 md:p-10
          text-white
          shadow-2xl
          relative
          overflow-hidden
          animate-fadeIn
          hover:animate-float3d
          transition-all duration-500
          transform-gpu
          border border-gray-800/50
        "
      >
        {/* Animated 3D decorative orbs */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl animate-float3d" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl animate-float3d" style={{ animationDelay: '1.5s' }} />
        {/* Third decorative element */}
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-green-500/5 to-cyan-500/5 rounded-full -translate-y-1/2 blur-xl animate-float3d" style={{ animationDelay: '0.75s' }} />

        <div className="relative z-10">
          {/* Live Listing Count Pill - with glow effect */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 rounded-full px-4 py-2 mb-6 animate-glowPulse">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
            <span className="text-sm font-medium text-white/90">
              {activeProducts.length} listings live now
            </span>
          </div>

          {/* Headline - improved typography */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 max-w-3xl leading-tight tracking-tight">
            Buy & Sell on Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 animate-gradient bg-300%">
              Campus
            </span>
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 animate-gradient bg-300%">
              Marketplace
            </span>
          </h1>

          {/* Subtext - improved readability */}
          <p className="text-base sm:text-lg text-white/75 max-w-2xl mb-8 leading-relaxed">
            Connect with fellow students to buy, sell, and trade.
            <span className="text-white font-semibold"> Safe, local, and built for your campus community.</span>
          </p>

          {/* CTAs - enhanced with 3D shadow */}
          <div className="flex flex-wrap gap-4 mb-10">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-xl font-bold bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-white shadow-[0_8px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.3)] transform hover:-translate-y-0.5 transition-all duration-300 animate-glowPulse btn-press"
            >
              Create free account
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-xl font-bold border-2 border-gray-600 text-white hover:border-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transform hover:-translate-y-0.5 btn-press"
            >
              Browse listings
            </Link>
          </div>

          {/* Stats Counter - enhanced with 3D cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
            {[
              { value: "500+", label: "Students joined" },
              { value: `${activeProducts.length}+`, label: "Active listings" },
              { value: "4.8", label: "Positive ratings" },
              { value: "₹0", label: "Platform fees" }
            ].map((stat, index) => (
              <div
                key={index}
                className="animate-tilt3d p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero