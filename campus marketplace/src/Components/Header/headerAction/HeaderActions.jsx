import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropdown";

const HeaderActions = () => {
  const isLoggedIn = useSelector((state) => state.auth.status);

  return (
    <div className="hidden md:flex items-center gap-3">
      {isLoggedIn && (
        <NavLink
          to="/add-item"
          className={({ isActive }) =>
            `
            flex items-center justify-center gap-2 h-10 px-4 rounded-lg font-semibold
            transition-all
            ${isActive ? "bg-white text-black" : "bg-white text-black hover:bg-gray-200"}
            `
          }
        >
          <span className="text-lg leading-none mb-0.5">+</span>
          List Item
        </NavLink>
      )}

      {/* Unified Profile Dropdown Action */}
      <ProfileDropdown />
    </div>
  );
};

export default HeaderActions;