import React, { useState } from "react"
import Logo from "./Logo"
import NavItems from "./NavItems"

import { FiMenu, FiX } from "react-icons/fi"
import HeaderActions from "./headerAction/HeaderActions"
import HeaderActionsMobile from "./headerAction/HeaderActionsMobile"



const Header = () => {


  const [open, setOpen] = useState(false)

  return (
    <header className="w-full h-16 bg-[#0c0c0c] dark:bg-[#0c0c0c] border-b border-gray-800 fixed top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">

        {/* Left */}
        <Logo />

        {/* Center (Desktop only) */}
        <div className="hidden md:block">
          <NavItems />
        </div>

        {/* Right (Desktop only) */}
        <div className="hidden md:flex items-center gap-3">
          <HeaderActions />
        </div>



        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out bg-[#0c0c0c] border-t border-gray-800 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-4">
          <NavItems mobile />
          <HeaderActionsMobile />
        </div>
      </div>

    </header>
  )
}

export default Header