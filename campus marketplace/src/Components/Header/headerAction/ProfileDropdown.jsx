import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { User, LogIn, LogOut, Sun, Moon, ShieldAlert } from "lucide-react";
import { useTheme } from "../../Theme/ThemeProvider";
import authService from "../../../services/authService";
import { logout } from "../../../store/authSlice";
import { useToast } from "../../Toast/ToastContainer";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const isLoggedIn = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData);
  
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      setIsOpen(false);
      showToast('Logged out successfully', 'success', 3000);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      showToast('Failed to logout. Please try again.', 'error', 4000);
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
        aria-label="User menu"
      >
        {isLoggedIn && user?.avatar ? (
          <img 
            src={user.avatar} 
            alt="Profile" 
            className="w-full h-full rounded-full object-cover"
          />
        ) : isLoggedIn && user ? (
          <span className="text-gray-700 dark:text-gray-300 font-semibold text-lg">
            {getInitials(user.name || user.username || user.email)}
          </span>
        ) : (
          <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        )}
      </button>

      {/* Dropdown Menu */}
      <div 
        className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 transition-all duration-300 origin-top-right ${
          isOpen ? "scale-100 opacity-100 visible" : "scale-95 opacity-0 invisible"
        } z-50 overflow-hidden`}
      >
        <div className="py-1">
          {isLoggedIn ? (
            <>
              <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.name || user?.username || "Campus Member"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email}
                </p>
              </div>

              <NavLink
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <User className="w-4 h-4" />
                Profile
              </NavLink>

              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  Dark Mode
                </div>
                <div className={`w-8 h-4 rounded-full transition-colors relative ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'}`}>
                   <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${theme === 'dark' ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
              </button>

              <div className="border-t border-gray-100 dark:border-gray-800 my-1"></div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-left"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Login
              </NavLink>

              <NavLink
                to="/register"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ShieldAlert className="w-4 h-4" />
                Register
              </NavLink>

              <div className="border-t border-gray-100 dark:border-gray-800 my-1"></div>

              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  Dark Mode
                </div>
                <div className={`w-8 h-4 rounded-full transition-colors relative ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'}`}>
                   <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${theme === 'dark' ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
