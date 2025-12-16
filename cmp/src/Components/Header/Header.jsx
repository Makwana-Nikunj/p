import React from 'react'
import Logo from './Logo'
import NavItems from './NavItems'
import Logout from './Logout'

const Header = () => {
  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-around">
      
      {/* Left */}
    
          <Logo />


     
    
      {/* Center */}
      <NavItems />

   
        

      {/* Right */}
      <div className="   flex items-center gap-4">
        
       <button
        className=" 
         flex justify-evenly items-center gap-2 
         h-10 w-25
           py-2 
              rounded-lg 
              font-semibold 
              transition-all 
              duration-300 
              ease-in-out
            text-white 
             bg-black 
             
              active:scale-95"
         
         >


        <span className="text-lg leading-none">+</span>
        List Item
      </button>


        <Logout />
      </div>

    </header>
  )
}

export default Header
