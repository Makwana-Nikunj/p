import React from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

const BottomCTA = () => {
  return (
    <div className="w-full flex justify-center px-4 mt-10 mb-6 perspective-1000">
      <div
        className="
          w-full max-w-6xl
          bg-gradient-to-br from-[#0c0c0c] via-[#1a1a1a] to-[#0c0c0c]
          rounded-2xl
          p-6 sm:p-8 md:p-10
          text-white
          relative
          overflow-hidden
          border border-gray-800/50
          shadow-2xl
          hover:animate-float3d
          transition-all duration-500
        "
      >
        {/* 3D Decorative orbs */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl animate-float3d" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl animate-float3d" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-green-500/5 to-cyan-500/5 rounded-full blur-xl animate-float3d" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-200">
              Ready to get started?
            </h2>
            <p className="text-white/70 text-sm sm:text-base">
              Join thousands of students trading on campus
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-xl font-semibold border-2 border-gray-600 text-white hover:border-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transform hover:-translate-y-0.5 btn-press"
            >
              Browse first
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-xl font-bold bg-gradient-to-r from-white to-gray-100 text-black hover:from-gray-100 hover:to-white shadow-[0_8px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.3)] transform hover:-translate-y-0.5 transition-all duration-300 btn-press animate-glowPulse"
            >
              Create free account
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomCTA