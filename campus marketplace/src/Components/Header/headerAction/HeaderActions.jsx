import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "./Logout";

const HeaderActions = () => {
  // 🔥 REAL auth state from Redux
  const isLoggedIn = useSelector((state) => state.auth.status);


  return (
    <div className="hidden md:flex items-center gap-4">

      {isLoggedIn ? (
        <>
          {/* List Item */}
          <NavLink
            to="/add-item"
            className={({ isActive }) =>
              `
              flex items-center gap-2 h-10 w-30 px-4 rounded-lg font-semibold
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

          {/* Logout */}
          <Logout />
        </>
      ) : (
        <>
          {/* Login */}
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `
              flex items-center justify-center h-10 px-4 rounded-lg font-semibold
              transition-all border border-gray-300
              ${isActive ? "bg-black text-white" : "bg-white text-black"}
              hover:bg-black hover:text-white hover:border-black
              active:scale-95
              `
            }
          >
            Login
          </NavLink>

          {/* Register */}
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `
              flex items-center justify-center h-10 px-4 rounded-lg font-semibold
              transition-all border border-gray-300
              ${isActive ? "bg-black text-white" : "bg-white text-black"}
              hover:bg-black hover:text-white hover:border-black
              active:scale-95
              `
            }
          >
            Register
          </NavLink>
        </>
      )}

    </div>
  );
};

export default HeaderActions;
