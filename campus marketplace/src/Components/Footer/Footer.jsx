import React from "react"
import { Link } from "react-router-dom"
import { Github, Linkedin, Twitter } from "lucide-react"

const Footer = () => {
  return (
    <footer className="w-full bg-white text-black border-t border-gray-200">
      
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
          <p className="mt-3 text-sm text-gray-600 max-w-xs">
            Buy & sell within your campus community.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center sm:items-start">
          <h3 className="text-lg font-semibold mb-3">Marketplace</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link to="/browse" className="hover:text-black transition">
                Listed Products
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-black transition">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/messages" className="hover:text-black transition">
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
              className="p-2 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 transition"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 transition"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 transition"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="py-4 px-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Campus Marketplace. All rights reserved.
      </div>

    </footer>
  )
}

export default Footer
