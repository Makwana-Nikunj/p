import React from "react"
import { Link } from "react-router-dom"
import { Github, Linkedin, Twitter } from "lucide-react"

const Footer = () => {
  return (
    <footer className="w-full bg-white text-black dark:bg-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-800">
      
      {/* Top Section */}
      <div
        className="
          max-w-7xl mx-auto 
          px-4 sm:px-6 
          py-10 sm:py-12
          grid grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          gap-8 sm:gap-10
          text-center sm:text-left
        "
      >
        
        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start">
          <Link to="/" className="text-2xl font-bold tracking-wide">
            Campus Marketplace
          </Link>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 max-w-xs">
            Buy & sell within your campus community.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-lg font-semibold mb-3">Marketplace</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link to="/browse" className="hover:text-black dark:hover:text-gray-200 transition">
                Listed Products
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-black dark:hover:text-gray-200 transition">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/messages" className="hover:text-black dark:hover:text-gray-200 transition">
                Messages
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-lg font-semibold mb-3">Connect</h3>
          <div className="flex gap-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="py-4 px-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        © {new Date().getFullYear()} Campus Marketplace. All rights reserved.
      </div>

    </footer>
  )
}

export default Footer
