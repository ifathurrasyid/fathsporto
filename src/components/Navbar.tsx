"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", glitch: "4B0U7", href: "#about" },
    { name: "Work", glitch: "W0Rk", href: "#work" },
    { name: "Contact", glitch: "C0N74C7", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed top-0 left-0 w-full z-50 transition-[background-color,backdrop-filter,border-color,padding,box-shadow] duration-700 ease-in-out border-b ${
        scrolled 
          /* The Fix: We use border-white/5 here, and border-transparent below to prevent the tear */
          ? "bg-abyss/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)] py-4 border-white/5" 
          : "bg-transparent backdrop-blur-none py-6 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center w-full">
        
        <div className="flex items-center gap-4">
          <Link href="#hero">
            <svg 
              className="w-8 h-8 text-starlight hover:text-cyan transform transition-all duration-500 ease-out hover:rotate-[720deg] pulse-white" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12 0L15 9L24 12L15 15L12 24L9 15L0 12L9 9Z" />
            </svg>
          </Link>
          
          <Link href="#hero" className="relative group/text cursor-pointer font-mono text-sm tracking-[0.2em] uppercase font-bold overflow-hidden pb-1 w-24">
            <span className="block text-starlight group-hover/text:opacity-0 transition-opacity duration-300">
              Fathuri
            </span>
            <span className="absolute top-0 left-0 text-cyan opacity-0 group-hover/text:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
              FA7HU21
            </span>
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan transform origin-left scale-x-0 group-hover/text:scale-x-100 transition-transform duration-300 ease-out"></div>
          </Link>
        </div>

        <div className="hidden md:flex gap-8 text-[10px] font-mono tracking-[0.2em] uppercase text-stardust">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="relative group/nav overflow-hidden pb-1 hover:text-cyan transition-colors pulse-cyan">
              <span className="block group-hover/nav:opacity-0 transition-opacity duration-300">
                {link.name}
              </span>
              <span className="absolute top-0 left-0 text-cyan opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
                {link.glitch}
              </span>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan transform origin-left scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 ease-out"></div>
            </Link>
          ))}
        </div>

      </div>
    </motion.nav>
  );
}