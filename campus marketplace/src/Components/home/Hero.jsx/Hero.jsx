import React from "react"
import { Link } from "react-router-dom"
import { Sparkles, Users, Shield, TrendingUp, ArrowRight, CheckCircle } from "lucide-react"
import { useSelector } from "react-redux"

const Hero = () => {
  const products = useSelector((state) => state.products.products);
  const activeProducts = products.filter(p => p.status === "approved" || p.status === "active")

  return (
    <div className="w-full flex justify-center px-4 mt-6">
      <div
        className="
          w-full max-w-6xl
          bg-[#0c0c0c]
          rounded-2xl
          p-6 sm:p-8 md:p-10
          text-white
          shadow-xl
          relative
          overflow-hidden
          animate-fadeIn
        "
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          {/* Live Listing Count Pill */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white/90">
              {activeProducts.length} listings live now
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 max-w-2xl">
            Buy & Sell on Your Campus Marketplace
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mb-6">
            Connect with fellow students to buy, sell, and trade. Safe, local, and built for your campus community.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-lg font-semibold bg-white text-black hover:bg-gray-200 transition-colors"
            >
              Create free account
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-lg font-semibold border border-gray-600 text-white hover:bg-white/10 transition-colors"
            >
              Browse listings
            </Link>
          </div>

          {/* Stats Counter */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
            <div>
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-xs text-white/60">Students joined</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{activeProducts.length}+</div>
              <div className="text-xs text-white/60">Active listings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">4.8</div>
              <div className="text-xs text-white/60">Positive ratings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">₹0</div>
              <div className="text-xs text-white/60">Platform fees</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero