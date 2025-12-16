import React from 'react'
import { FiLogOut } from "react-icons/fi"

const Logout = () => {
  return (
    <button className="flex justify-evenly items-center gap-2  h-10 w-25  px-3 py-2 
              rounded-lg 
              font-semibold 
              border-gray-300 border
              transition-all 
              duration-300 
              ease-in-out
              hover:bg-black 
              hover:text-white 
          
              active:scale-95">
      <FiLogOut size={16} />
      Logout
    </button>
  )
}

export default Logout
