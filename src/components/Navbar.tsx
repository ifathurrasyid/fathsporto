"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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
const NavLink = ({ href, name, glitch, onClick }: { href: string, name: string, glitch: string, onClick?: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link 
      href={href} 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      className="relative group/nav overflow-hidden pb-1 hover:text-cyan hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-colors pulse-cyan w-fit"
    >
      <ScrambleText defaultText={name} hoverText={glitch} isHovering={isHovered} />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan transform origin-left scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 ease-out"></div>
    </Link>
  );
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [spinClicks, setSpinClicks] = useState(0); // NEW STATE FOR FAST SPIN
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", glitch: "4B0U7", href: "#about" },
    { name: "Work", glitch: "W0Rk", href: "#work" },
    { name: "Career", glitch: "C4R33R", href: "#career" },
    { name: "Clearances", glitch: "CL34R4NC35", href: "#clearances" },
    { name: "Contact", glitch: "C0N74C7", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: "-100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 w-full z-50 transition-[background-color,backdrop-filter,border-color,padding,box-shadow] duration-700 ease-in-out border-b ${
          scrolled ? "bg-abyss/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)] py-4 border-white/5" : "bg-transparent backdrop-blur-none py-6 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center w-full">
          
          {/* LOGO & STAR */}
          <div className="flex items-center gap-4">
            <Link href="#hero" onClick={() => setSpinClicks(prev => prev + 1)} className="cursor-pointer outline-none block">
              <div className="animate-[spin_10s_linear_infinite] flex items-center justify-center">
                <motion.svg 
                  animate={{ rotate: spinClicks * 360 }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                  className="w-8 h-8 text-starlight hover:text-cyan active:text-cyan pulse-white" 
                  viewBox="0 0 24 24" fill="currentColor"
                >
                  <path d="M12 0L15 9L24 12L15 15L12 24L9 15L0 12L9 9Z" />
                </motion.svg>
              </div>
            </Link>
            <Link 
              href="#hero" 
              onMouseEnter={() => setLogoHovered(true)} 
              onMouseLeave={() => setLogoHovered(false)}
              className="font-mono text-sm tracking-[0.2em] uppercase font-bold text-starlight hover:text-cyan active:text-cyan hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] active:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all translate-y-[2px]"
            >
              <ScrambleText defaultText="Fathuri" hoverText="FA7HU21" isHovering={logoHovered} />
            </Link>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex gap-8 text-[10px] font-mono tracking-[0.2em] uppercase text-stardust">
            {navLinks.map((link) => <NavLink key={link.name} {...link} />)}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button 
            className="lg:hidden text-starlight hover:text-cyan active:text-cyan transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

        </div>
      </motion.nav>

      {/* MOBILE DROPDOWN MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[70px] left-0 w-full bg-[#010308]/95 backdrop-blur-xl border-b border-white/5 z-40 lg:hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="flex flex-col px-8 py-8 gap-6 text-xs font-mono tracking-[0.2em] uppercase text-starlight">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.name} 
                  {...link} 
                  onClick={() => setMobileMenuOpen(false)} // Close menu when link clicked
                />
              ))}
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}