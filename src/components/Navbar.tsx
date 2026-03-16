"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// --- PURE MATRIX TEXT ENGINE ---
const ScrambleText = ({ defaultText, hoverText, isHovering }: { defaultText: string, hoverText: string, isHovering: boolean }) => {
  const [text, setText] = useState(defaultText);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const targetText = isHovering ? hoverText : defaultText;
    let iteration = 0;
    const step = Math.max(1, targetText.length / 10); 

    const scramble = () => {
      setText(targetText.split("").map((letter, index) => {
        if (index < iteration) return targetText[index];
        if (targetText[index] === " ") return " ";
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));

      if (iteration < targetText.length) {
        iteration += step;
        timeoutId = setTimeout(scramble, 30); 
      } else {
        setText(targetText);
      }
    };

    scramble();
    return () => clearTimeout(timeoutId);
  }, [isHovering, hoverText, defaultText]);

  return <span>{text}</span>;
};

// --- WRAPPER COMPONENTS FOR CLEAN HOVER CONTROL ---
const NavLink = ({ href, name, glitch }: { href: string, name: string, glitch: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link 
      href={href} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      className="relative group/nav overflow-hidden pb-1 hover:text-cyan hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-colors pulse-cyan"
    >
      <ScrambleText defaultText={name} hoverText={glitch} isHovering={isHovered} />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan transform origin-left scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 ease-out"></div>
    </Link>
  );
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
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
      initial={{ y: "-100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed top-0 left-0 w-full z-50 transition-[background-color,backdrop-filter,border-color,padding,box-shadow] duration-700 ease-in-out border-b ${
        scrolled ? "bg-abyss/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)] py-4 border-white/5" : "bg-transparent backdrop-blur-none py-6 border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
          <Link href="#hero">
            <svg className="w-8 h-8 text-starlight hover:text-cyan transform transition-all duration-500 ease-out hover:rotate-[720deg] pulse-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L15 9L24 12L15 15L12 24L9 15L0 12L9 9Z" />
            </svg>
          </Link>
          <Link 
            href="#hero" 
            onMouseEnter={() => setLogoHovered(true)} 
            onMouseLeave={() => setLogoHovered(false)}
            className="font-mono text-sm tracking-[0.2em] uppercase font-bold text-starlight pb-1 hover:text-cyan hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all"
          >
            <ScrambleText defaultText="Fathuri" hoverText="FA7HU21" isHovering={logoHovered} />
          </Link>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-mono tracking-[0.2em] uppercase text-stardust">
          {navLinks.map((link) => <NavLink key={link.name} {...link} />)}
        </div>
      </div>
    </motion.nav>
  );
}