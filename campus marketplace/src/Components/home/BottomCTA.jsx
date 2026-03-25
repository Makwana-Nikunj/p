import React from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

const BottomCTA = () => {
  return (
    <div className="w-full flex justify-center px-4 mt-10 mb-6">
      <div className="w-full max-w-6xl glass rounded-2xl p-6 sm:p-8 md:p-10 text-white relative overflow-hidden border border-subtle">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] opacity-20 animate-float3d" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-400 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px] opacity-20 animate-float3d" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-pink-500 rounded-full blur-[100px] opacity-20 animate-float3d" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-section-headline gradient-text mb-2">Ready to get started?</h2>
            <p className="text-gray-300 text-sm sm:text-base">
              Join thousands of students trading on campus
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/browse" className="inline-flex items-center gap-2 h-11 px-6 rounded-xl font-semibold glass border border-subtle text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 btn-press">
              Browse first
            </Link>
            <Link to="/register" className="inline-flex items-center gap-2 h-11 px-6 rounded-xl font-bold btn-gradient-primary text-white hover:shadow-indigo-500/60 transition-all duration-300 btn-press">
              Create free account
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomCTA