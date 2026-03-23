import React from "react"
import { FiShoppingBag } from "react-icons/fi"
import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 font-semibold text-white transition-colors duration-200">
      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white text-black transition-colors duration-200">
        <FiShoppingBag size={18} />
      </div>
      <span className="text-lg sm:text-2xl hidden sm:block">Campus Marketplace</span>
    </Link>
  )
}

export default Logo
