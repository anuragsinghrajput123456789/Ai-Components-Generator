import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa";
import { BiSolidMagicWand } from "react-icons/bi";

const FooterBar = ({ isDark }) => {
    return (
        <footer className={`w-full ${isDark ? "bg-slate-900/70 backdrop-blur-md" : "bg-gray-100"} border-t ${isDark ? "border-slate-700/50" : "border-gray-300"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Brand */}
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                            <BiSolidMagicWand className="text-white text-sm" />
                        </div>
                        <h2 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Nirvana AI
                        </h2>
                    </div>

                    {/* Links */}
                    <ul className="flex flex-wrap justify-center gap-5 text-sm">
                        <li>
                            <a href="#" className={`hover:text-purple-400 transition-colors ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#" className={`hover:text-purple-400 transition-colors ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                Documentation
                            </a>
                        </li>
                        <li>
                            <a href="#" className={`hover:text-purple-400 transition-colors ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                Examples
                            </a>
                        </li>
                        <li>
                            <a href="#" className={`hover:text-purple-400 transition-colors ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                Pricing
                            </a>
                        </li>
                        <li>
                            <a href="#" className={`hover:text-purple-400 transition-colors ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                Contact
                            </a>
                        </li>
                    </ul>

                    {/* Social */}
                    <div className="flex gap-3 text-lg">
                        <motion.a
                            whileHover={{ scale: 1.2, y: -2 }}
                            href="#"
                            className={`p-2 rounded-lg ${isDark ? "bg-slate-800/50 text-gray-300 hover:bg-purple-500/20 hover:text-white" : "bg-gray-200 text-gray-700 hover:bg-purple-500/20 hover:text-purple-600"} transition-all border ${isDark ? "border-slate-700/30" : "border-gray-300"}`}
                            aria-label="GitHub"
                        >
                            <FaGithub />
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.2, y: -2 }}
                            href="#"
                            className={`p-2 rounded-lg ${isDark ? "bg-slate-800/50 text-gray-300 hover:bg-purple-500/20 hover:text-white" : "bg-gray-200 text-gray-700 hover:bg-purple-500/20 hover:text-purple-600"} transition-all border ${isDark ? "border-slate-700/30" : "border-gray-300"}`}
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin />
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.2, y: -2 }}
                            href="#"
                            className={`p-2 rounded-lg ${isDark ? "bg-slate-800/50 text-gray-300 hover:bg-purple-500/20 hover:text-white" : "bg-gray-200 text-gray-700 hover:bg-purple-500/20 hover:text-purple-600"} transition-all border ${isDark ? "border-slate-700/30" : "border-gray-300"}`}
                            aria-label="Twitter"
                        >
                            <FaTwitter />
                        </motion.a>
                    </div>
                </div>

                {/* Copyright */}
                <div className={`mt-6 pt-4 text-center text-xs ${isDark ? "text-gray-400 border-t border-slate-700/30" : "text-gray-500 border-t border-gray-300"}`}>
                    <div className="flex items-center justify-center gap-1">
                        <span>Made with</span>
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="text-red-500"
                        >
                            <FaHeart />
                        </motion.span>
                        <span>by Nirvana AI Team • © {new Date().getFullYear()} All rights reserved</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterBar;