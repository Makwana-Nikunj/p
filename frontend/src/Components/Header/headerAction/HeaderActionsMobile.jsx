import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropdown";

const HeaderActionsMobile = () => {
  const isLoggedIn = useSelector((state) => state.auth.status);

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex items-center justify-around w-full">
        {isLoggedIn && (
          <NavLink
            to="/add-item"
            className={({ isActive }) =>
              `
              flex items-center justify-center gap-2 w-32 h-10 rounded-lg font-semibold
              transition-all border border-gray-300 dark:border-gray-700
              ${isActive ? "bg-surface-bright text-on-surface" : "bg-surface-bright text-on-surface hover:bg-surface-container"}
              hover:text-on-surface
              active:scale-95
              `
            }
          >
            <span className="text-lg leading-none mb-0.5">+</span>
            List Item
          </NavLink>
        )}
        
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default HeaderActionsMobile;
