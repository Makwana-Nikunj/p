import React from 'react'
import { FiShoppingBag } from "react-icons/fi"

const Logo = () => {
  return (
    <div className="flex items-center gap-2 font-semibold text-gray-900 ">

      <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-black text-white">
        
        <FiShoppingBag size={18} />

      </div>

      <span className='text-2xl'>Campus Marketplace</span>

    </div>
  )
}

export default Logo
