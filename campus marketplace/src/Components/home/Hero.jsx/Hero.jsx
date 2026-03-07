import React from "react"
import { Sparkles } from "lucide-react"

const Hero = () => {
  return (
    <div className="w-full flex justify-center px-4 mt-10">
      <div
        className="
          w-full max-w-6xl
          bg-gradient-to-r from-blue-500 to-purple-600
          rounded-xl
          p-5 sm:p-6 md:p-8
          text-white
        "
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 mt-1" />

          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
              Welcome to Campus Marketplace!
            </h1>

            <p className="text-sm sm:text-base text-white/90 max-w-2xl">
              Discover great deals from fellow students. Buy, sell, and connect
              with your campus community.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
