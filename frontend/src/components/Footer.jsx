import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa";
import { BiSolidMagicWand } from "react-icons/bi";

const FooterBar = ({ isDark }) => {
    return (
        <footer
            className={`w-full ${isDark
                    ? "bg-gradient-to-r from-rose-900 via-purple-900 to-violet-900 backdrop-blur-md"
                    : "bg-gradient-to-r from-rose-100 via-purple-100 to-violet-100"
                } border-t ${isDark ? "border-violet-700/40" : "border-violet-200"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Brand */}
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-gradient-to-r from-rose-500 to-violet-500 rounded-lg">
                            <BiSolidMagicWand className="text-white text-sm" />
                        </div>
                        <h2 className="text-lg font-bold bg-gradient-to-r from-rose-400 to-violet-400 bg-clip-text text-transparent">
                            Nirvana AI
                        </h2>
                    </div>

                    {/* Links */}
                    <ul className="flex flex-wrap justify-center gap-5 text-sm">
                        {["Home", "Documentation", "Examples", "Pricing", "Contact"].map(
                            (link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className={`hover:text-rose-400 transition-colors ${isDark ? "text-gray-200" : "text-gray-700"
                                            }`}
                                    >
                                        {link}
                                    </a>
                                </li>
                            )
                        )}
                    </ul>

                    {/* Social */}
                    <div className="flex gap-3 text-lg">
                        {[FaGithub, FaLinkedin, FaTwitter].map((Icon, i) => (
                            <motion.a
                                key={i}
                                whileHover={{ scale: 1.2, y: -2 }}
                                href="#"
                                className={`p-2 rounded-lg ${isDark
                                        ? "bg-violet-800/40 text-gray-200 hover:bg-rose-500/30 hover:text-white"
                                        : "bg-violet-100 text-gray-700 hover:bg-rose-200 hover:text-violet-600"
                                    } transition-all border ${isDark ? "border-violet-700/30" : "border-violet-300"
                                    }`}
                            >
                                <Icon />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <div
                    className={`mt-6 pt-4 text-center text-xs ${isDark
                            ? "text-gray-300 border-t border-violet-700/30"
                            : "text-gray-600 border-t border-violet-200"
                        }`}
                >
                    <div className="flex items-center justify-center gap-1">
                        <span>Made with</span>
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="text-rose-500"
                        >
                            <FaHeart />
                        </motion.span>
                        <span>
                            by Nirvana AI Team • © {new Date().getFullYear()} All rights
                            reserved
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterBar;
