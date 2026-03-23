import React from "react"
import { Link } from "react-router-dom"
import { Github, Linkedin, Twitter } from "lucide-react"

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 text-center sm:text-left">
        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start animate-fadeIn">
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Campus Marketplace
          </Link>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed">
            Buy & sell within your campus community. Safe, local, and convenient.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center sm:items-start animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Marketplace</h3>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link
                to="/browse"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Browse Products
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/messages"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Messages
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="flex flex-col items-center sm:items-start animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Connect</h3>
          <div className="flex gap-3">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-105"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="py-4 px-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        <p className="animate-fadeIn">
          © {new Date().getFullYear()} Campus Marketplace. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer
