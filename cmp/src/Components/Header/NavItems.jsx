import React from 'react'
import { FiHome, FiShoppingBag } from "react-icons/fi"
import { CgProfile } from "react-icons/cg"
import { TiMessages } from "react-icons/ti";

const NavItems = () => {
  return (
    <nav>
      <ul className="flex items-center text-sm font-medium text-gray-700 p-5 ">

        {/* Active */}
        <li>
          <button
         className="flex justify-evenly items-center  h-10 w-28 px-4 rounded-md"
          >
            <FiHome size={15} />
            Home
          </button>
        </li>

        {/* Inactive */}
        <li>
          <button
           className="flex justify-evenly items-center  h-10 w-28 px-4 rounded-md"
          >
            <FiShoppingBag size={15} />
            Browse
          </button>
        </li>

        <li>
          <button
            className="flex justify-evenly items-center  h-10 w-28 px-4 rounded-md"
          >
            <CgProfile size={15} />
             
            Profile
          </button>
        </li>

        <li>
          <button
           className="flex justify-evenly items-center  h-10 w-28 px-4 rounded-md"
          >
           <TiMessages size={15}/>
            Messages
          </button>
        </li>

      </ul>
    </nav>
  )
}

export default NavItems
