import React from "react"
import { FiHome, FiShoppingBag, FiHeart } from "react-icons/fi"
import { CgProfile } from "react-icons/cg"
import { TiMessages } from "react-icons/ti"
import { NavLink } from "react-router-dom"

const NavItems = ({ mobile = false }) => {
  return (
    <nav>
      <ul
        className={`
          flex ${mobile ? "flex justify-center gap-7 mb-10 items-center flex-wrap" : "items-center gap-2"}
          text-sm font-medium
        `}
      >
        {[
          { to: "/", label: "Home", icon: <FiHome size={15} /> },
          { to: "/browse", label: "Browse", icon: <FiShoppingBag size={15} /> },
          { to: "/favorites", label: "Favorites", icon: <FiHeart size={15} /> },
          { to: "/profile", label: "Profile", icon: <CgProfile size={15} /> },
          { to: "/chat", label: "Messages", icon: <TiMessages size={15} /> },
        ].map(({ to, label, icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `
                flex items-center gap-2 h-10 px-4 rounded-md
                ${isActive ? "bg-black text-white" : "text-black"}
                `
              }
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavItems
