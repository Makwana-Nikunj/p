import React from "react"
import { Github, Linkedin, Twitter } from "lucide-react"

const Footer = () => {
  return (
    <footer className="w-full bg-white text-black border-t border-gray-200">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold tracking-wide">MyApp</h2>
          <p className="mt-3 text-sm text-gray-600">
            Simple. Clean. Powerful web experiences.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="hover:text-black transition cursor-pointer">Home</li>
            <li className="hover:text-black transition cursor-pointer">About</li>
            <li className="hover:text-black transition cursor-pointer">Projects</li>
            <li className="hover:text-black transition cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect</h3>
          <div className="flex gap-4 text-gray-600">
            <a href="#" className="hover:text-black transition">
              <Github size={20} />
            </a>
            <a href="#" className="hover:text-black transition">
              <Linkedin size={20} />
            </a>
            <a href="#" className="hover:text-black transition">
              <Twitter size={20} />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </div>

    </footer>
  )
}

export default Footer
