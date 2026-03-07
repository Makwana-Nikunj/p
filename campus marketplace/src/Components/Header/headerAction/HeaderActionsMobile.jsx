import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "./Logout";

const HeaderActionsMobile = () => {
  const isLoggedIn = useSelector((state) => state.auth.status);

  return (
    <div className="flex flex-col gap-3">
      {isLoggedIn ? (
        <>
         <div className="flex items-center justify-around w-full">

          <div>

            <NavLink
            to="/add-item"
            className={({ isActive }) =>
              `
              flex items-center justify-center gap-2 w-30 h-10 rounded-lg font-semibold
              transition-all border border-gray-300
              ${isActive ? "bg-black text-white" : "bg-white text-black"}
              hover:bg-black hover:text-white hover:border-black
              active:scale-95
              `
            }
          >
            <span className="text-lg">+</span>
            List Item
          </NavLink>

          </div>

          <div>

             <Logout />

          </div>

        </div>
          

         
        </>
      ) : (
        <>
        <div className="flex items-center justify-around w-full">

          <div>

            <NavLink
            to="/login"
            className={({ isActive }) =>
              `
              flex items-center justify-center w-25 h-10 rounded-lg font-semibold
              transition-all border border-gray-300
              ${isActive ? "bg-black text-white" : "bg-white text-black"}
              hover:bg-black hover:text-white hover:border-black
              active:scale-95
              `
            }
          >
            Login
          </NavLink>
            
          </div>
          <div>

             <NavLink
            to="/register"
            className={({ isActive }) =>
              `
              flex items-center justify-center w-25 h-10 rounded-lg font-semibold
              transition-all border border-gray-300
              ${isActive ? "bg-black text-white" : "bg-white text-black"}
              hover:bg-black hover:text-white hover:border-black
              active:scale-95
              `
            }
          >
            Register
          </NavLink>

          </div>

           

         

        </div>
         
        </>
      )}
    </div>
  );
};

export default HeaderActionsMobile;
