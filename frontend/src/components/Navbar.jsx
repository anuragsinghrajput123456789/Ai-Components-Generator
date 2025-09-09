import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { HiSun, HiMoon } from 'react-icons/hi'
import { RiSettings3Fill } from 'react-icons/ri'
import { BiSolidMagicWand } from 'react-icons/bi'

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true)
  
  return (
    <>
      <div className="w-full from-purple-900 to-rose-400  bg-gradient-to-r backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                  <BiSolidMagicWand className="text-white text-lg" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Nirvana AI
                </h3>
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-800/50 border border-slate-700/30 text-gray-300 hover:bg-purple-500/20 hover:text-white transition-all"
                aria-label="Toggle theme"
              >
                {darkMode ? <HiSun className="text-lg" /> : <HiMoon className="text-lg" />}
              </button>
              
              {/* User Profile */}
              <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-800/50 border border-slate-700/30 text-gray-300 hover:bg-purple-500/20 hover:text-white transition-all">
                <FaUser className="text-lg" />
              </button>
              
              {/* Settings */}
              <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-800/50 border border-slate-700/30 text-gray-300 hover:bg-purple-500/20 hover:text-white transition-all">
                <RiSettings3Fill className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar