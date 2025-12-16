import React from 'react'
import { FiLogOut } from "react-icons/fi"

const Logout = () => {
  return (
    <button className="flex justify-evenly items-center gap-2  h-10 w-25 px-4 rounded-md text-sm font-medium text-gray-700 hover:text-black transition">
      <FiLogOut size={16} />
      Logout
    </button>
  )
}

export default Logout
