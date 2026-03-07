import React, { useState } from "react"
import Logo from "./Logo"
import NavItems from "./NavItems"

import { FiMenu, FiX } from "react-icons/fi"
import HeaderActions from "./headerAction/HeaderActions"
import HeaderActionsMobile from "./headerAction/HeaderActionsMobile"



const Header = () => {


  const [open, setOpen] = useState(false)

  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">

        {/* Left */}
        <Logo />

        {/* Center (Desktop only) */}
        <div className="hidden md:block">
          <NavItems  />
        </div>

        {/* Right (Desktop only) */}
      <div className="hidden md:flex items-center gap-4">
        <HeaderActions />
      </div>



       

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
   
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-4">
          <NavItems mobile />
          <HeaderActionsMobile />
        </div>
      )}



    </header>
  )
}

export default Header
