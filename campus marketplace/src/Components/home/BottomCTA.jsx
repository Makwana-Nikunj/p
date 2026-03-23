import React from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

const BottomCTA = () => {
  return (
    <div className="w-full flex justify-center px-4 mt-10 mb-6">
      <div
        className="
          w-full max-w-6xl
          bg-[#0c0c0c]
          rounded-2xl
          p-6 sm:p-8
          text-white
          relative
          overflow-hidden
        "
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1">
              Ready to get started?
            </h2>
            <p className="text-white/70 text-sm">
              Join thousands of students trading on campus
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-lg font-semibold border border-gray-600 text-white hover:bg-white/10 transition-colors"
            >
              Browse first
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-lg font-semibold bg-white text-black hover:bg-gray-200 transition-colors"
            >
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