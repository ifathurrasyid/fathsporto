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
// THE FIX: Added 'isActive' and 'activeColor' to trigger the effect based on scroll position
const NavLink = ({ href, name, glitch, colorClass, activeColor, lineClass, isActive, onClick }: { href: string, name: string, glitch: string, colorClass: string, activeColor: string, lineClass: string, isActive: boolean, onClick?: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Activate if the user is hovering OR if the scrollspy says this section is active
  const displayActive = isActive || isHovered;

  return (
    <Link 
      href={href} 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group/nav overflow-hidden pb-1 transition-colors w-fit ${displayActive ? activeColor : 'text-stardust'} ${colorClass}`}
    >
      <ScrambleText defaultText={name} hoverText={glitch} isHovering={displayActive} />
      <div className={`absolute bottom-0 left-0 w-full h-[1px] transform origin-left transition-transform duration-300 ease-out ${displayActive ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-100'} ${lineClass}`}></div>
    </Link>
  );
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [spinClicks, setSpinClicks] = useState(0); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // THE FIX: Scrollspy engine added to your existing scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      
      const sections = ["hero", "about", "work", "career", "credentials", "contact"];
      let current = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Triggers when the top of the section hits the upper middle of the screen
          if (rect.top <= window.innerHeight / 2.5) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger once on load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "about", name: "About", glitch: "AB0U7", href: "#about", activeColor: "text-neon-red", colorClass: "hover:text-neon-red active:text-neon-red", lineClass: "bg-neon-red" },
    { id: "work", name: "Work", glitch: "W0RK", href: "#work", activeColor: "text-neon-orange", colorClass: "hover:text-neon-orange active:text-neon-orange", lineClass: "bg-neon-orange" },
    { id: "career", name: "Career", glitch: "C4R33R", href: "#career", activeColor: "text-cyan", colorClass: "hover:text-cyan active:text-cyan", lineClass: "bg-cyan" },
    { id: "credentials", name: "Credentials", glitch: "CR3D3NT14LS", href: "#credentials", activeColor: "text-purple-400", colorClass: "hover:text-purple-400 active:text-purple-400", lineClass: "bg-purple-400" },
    { id: "contact", name: "Contact", glitch: "C0N74C7", href: "#contact", activeColor: "text-neon-yellow", colorClass: "hover:text-neon-yellow active:text-neon-yellow", lineClass: "bg-neon-yellow" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: "-100%" }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 w-full z-50 transition-[background-color,backdrop-filter,border-color,padding,box-shadow] duration-700 ease-in-out border-b ${
          scrolled ? "bg-[#01040A]/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)] py-4 border-transparent" : "bg-transparent backdrop-blur-none py-6 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center w-full">
          
          {/* LOGO & STAR */}
          <div className="flex items-center gap-4">
            <Link href="#hero" onClick={() => setSpinClicks(prev => prev + 1)} className="cursor-pointer outline-none block">
              <div className="animate-[spin_10s_linear_infinite] flex items-center justify-center">
                {/* 1. LARGER STAR (w-10 h-10) */}
                <motion.svg 
                  animate={{ rotate: spinClicks * 360 }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                  className={`w-10 h-10 hover:text-cyan active:text-cyan pulse-white transition-colors duration-300 ${activeSection === 'hero' || activeSection === '' ? 'text-white' : 'text-starlight'}`} 
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
              /* 1. LARGER LOGO (text-base) */
              className="font-mono text-base tracking-[0.2em] uppercase font-bold text-starlight hover:text-cyan active:text-cyan hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] active:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all translate-y-[2px]"
            >
              <ScrambleText defaultText="Fathuri" hoverText="FA7HU21" isHovering={logoHovered || activeSection === 'hero'} />
            </Link>
          </div>

          {/* DESKTOP LINKS */}
          {/* 1. LARGER NAV LINKS (text-xs) */}
          <div className="hidden lg:flex gap-8 text-xs font-mono tracking-[0.2em] uppercase">
            {navLinks.map((link) => (
              <NavLink 
                key={link.id} 
                isActive={activeSection === link.id} 
                {...link} 
              />
            ))}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button 
            className="lg:hidden text-starlight hover:text-cyan active:text-cyan transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {/* 1. LARGER HAMBURGER (w-7 h-7) */}
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            {/* 1. LARGER MOBILE LINKS (text-xs) */}
            <div className="flex flex-col px-8 py-8 gap-6 text-xs font-mono tracking-[0.2em] uppercase text-starlight">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.id} 
                  isActive={activeSection === link.id}
                  {...link} 
                  onClick={() => setMobileMenuOpen(false)} 
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