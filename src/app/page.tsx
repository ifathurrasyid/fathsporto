"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
// @ts-ignore
import mockProjectsData from "./projects.json";
// @ts-ignore
import mockCareerData from "./career.json";
// @ts-ignore
import mockCertsData from "./certs.json";

interface Project {
  id: number; title: string; category: string; linkType?: string;
  styles: { text: string; border: string; pulse: string; shadow: string; line: string; };
  summary: string; techStack: string[]; projectUrl: string; details: any[];
}

interface Career {
  id: string; title: string; company: string; period: string;
  styles: { glow: string; border: string; text: string; };
  modalContent: string[];
}

interface Cert {
  id: string; title: string; issuer: string; date: string; link: string;
  styles: { glow: string; border: string; text: string; };
}

const mockProjects: Project[] = mockProjectsData;
const careerLogs: Career[] = mockCareerData;
const certsLogs: Cert[] = mockCertsData;

// --- HIGH-PERFORMANCE MATRIX ENGINE ---
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

// --- ANIMATED PROJECT THUMBNAIL ENGINE ---
const AnimatedThumbnail = ({ details }: { details: any[] }) => {
  const images = details.filter((d: any) => d.image).map((d: any) => d.image);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images]);

  if (images.length === 0) {
    return <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-20 z-0"></div>;
  }

  return (
    <div className="absolute inset-0 overflow-hidden opacity-15 group-hover:opacity-45 group-active:opacity-45 transition-opacity duration-700 z-0 pointer-events-none mix-blend-luminosity">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-[#01040A] via-[#01040A]/80 to-transparent"></div>
    </div>
  );
};

// --- BUTTON WRAPPERS ---
const MatrixButton = ({ href, defaultText, hoverText, className }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <a href={href} target="_blank" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={className}>
      <ScrambleText defaultText={defaultText} hoverText={hoverText} isHovering={isHovered} />
    </a>
  );
};

const ContactLink = ({ href, defaultText, hoverText }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <a href={href} target="_blank" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="relative overflow-hidden font-roboto text-lg font-light text-stardust hover:text-neon-yellow active:text-neon-yellow border-b border-white/5 pb-4 flex justify-between transition-all duration-300 group hover:pl-2 active:pl-2 pulse-yellow">
      <span className="group-hover:font-bold group-active:font-bold transition-all min-w-[180px] inline-block">
        <ScrambleText defaultText={defaultText} hoverText={hoverText} isHovering={isHovered} />
      </span>
      <span className="text-neon-yellow transform group-hover:translate-x-2 group-active:translate-x-2 transition-transform duration-300">→</span>
    </a>
  );
};

// --- DEDICATED NAVBAR SCRAMBLE COMPONENT ---
const NavScrambleLink = ({ href, defaultText, hoverText, colorClass, onClick }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link href={href} onClick={onClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={`transition-colors block ${colorClass}`}>
      <ScrambleText defaultText={defaultText} hoverText={hoverText} isHovering={isHovered} />
    </Link>
  );
};

const categories = ["All", "HR Analytics", "BI & Dashboards", "Statistical Analytics", "Automation", "Others"];

// THE FIX: Removed GPU-heavy 'drop-shadow' from the filter string to fix scrolling lag.
const extremeCrash: Variants = {
  hidden: { opacity: 0, x: -30, filter: "brightness(2) hue-rotate(90deg) blur(10px)" },
  visible: {
    opacity: [0, 1, 0.2, 1], x: [-30, 15, -5, 0],
    filter: [
      "brightness(2) hue-rotate(90deg) blur(10px)",
      "brightness(1.5) hue-rotate(-90deg) blur(4px)",
      "brightness(0.5) hue-rotate(0deg) blur(2px)", /* <-- Added hue-rotate(0deg) here to fix the math */
      "brightness(1) hue-rotate(0deg) blur(0px)"
    ],
    transition: { duration: 0.5, times: [0, 0.4, 0.7, 1], ease: "anticipate" }
  }
};

const systemBoot: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.8 } }
};

const hammerCrash: any = {
  hidden: { opacity: 0, scale: 2.5, y: -100, filter: "blur(20px)" },
  visible: {
    opacity: [0, 1, 1, 1], scale: [2.5, 0.9, 1.05, 1], y: [-100, 0, 0, 0],
    filter: ["blur(20px)", "blur(0px)", "blur(4px)", "blur(0px)"],
    textShadow: ["0 0 0 transparent", "-40px 0 red, 40px 0 cyan", "15px 0 cyan, -15px 0 red", "0 0 0 transparent"],
    transition: { duration: 0.9, times: [0, 0.4, 0.6, 1], ease: "anticipate" }
  }
};

const powerUp: any = {
  hidden: { opacity: 0, y: 30, filter: "brightness(0)" },
  visible: { opacity: 1, y: 0, filter: "brightness(1)", transition: { duration: 0.8, ease: "easeOut" } }
};

// --- PORTRAIT PIXEL REVEAL ENGINE ---
const pixelGrid = Array.from({ length: 140 }).map((_, i) => {
  const col = i % 10;
  const row = Math.floor(i / 10);
  const forwardDelay = (col + row) * 0.03; // Sweeps Top-Left to Bottom-Right
  const reverseDelay = ((9 - col) + (13 - row)) * 0.03; // Sweeps Bottom-Right to Top-Left
  return { id: i, forwardDelay, reverseDelay };
});

export default function Home() {
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");
  const filteredProjects = mockProjects.filter((p: Project) => activeFilter === "All" || p.category === activeFilter);

  const [revealState, setRevealState] = useState("encrypted"); 
  const [isHoveringPortrait, setIsHoveringPortrait] = useState(false); 
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [repoHovered, setRepoHovered] = useState(false);
  const [portfolioHovered, setPortfolioHovered] = useState(false);
  const [spinClicks, setSpinClicks] = useState(0);
  const [logoHovered, setLogoHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- UNIVERSAL MODAL CONTROLLER ---
  const closeModals = () => {
    setSelectedProject(null);
    setSelectedCareer(null);
  };

  useEffect(() => {
    if (selectedProject || selectedCareer) {
      document.body.style.overflow = 'hidden'; 
      window.history.pushState({ modalOpen: true }, ''); 
      
      const handleBackButton = () => { closeModals(); };
      window.addEventListener('popstate', handleBackButton);
      
      return () => {
        document.body.style.overflow = ''; 
        window.removeEventListener('popstate', handleBackButton);
      };
    }
  }, [selectedProject, selectedCareer]);

  // THE 5-STAGE REVEAL SEQUENCE (And Manual Relock)
  const handleReveal = () => {
    if (revealState === "encrypted") {
      // FORWARD SEQUENCE: Decrypt -> Flash -> Revealed
      setRevealState("decrypting");
      setTimeout(() => { setRevealState("smashing"); }, 1200); 
      setTimeout(() => { setRevealState("revealed"); }, 1500); 
      
    } else if (revealState === "revealed") {
      // REVERSE SEQUENCE: Flash -> Encrypt -> Locked
      setRevealState("reverse_smashing"); 
      setTimeout(() => { setRevealState("encrypting"); }, 300); 
      setTimeout(() => { setRevealState("encrypted"); }, 1500); 
    }
  };

  // THE REVERSE "SHUTTER" SEQUENCE (Auto-Relock)
  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];

    if (revealState === "revealed" && !isHoveringPortrait) {
      const t1 = setTimeout(() => {
        // 1. Trigger the heavy light flash first
        setRevealState("reverse_smashing"); 
        
        // 2. After 300ms flash, start the pixel shutters
        const t2 = setTimeout(() => { 
          setRevealState("encrypting"); 
        }, 300);
        timeouts.push(t2);

        // 3. After 1200ms of shutters (1500ms total), lock it down
        const t3 = setTimeout(() => { 
          setRevealState("encrypted"); 
        }, 1500);
        timeouts.push(t3);

      }, 7000); // 7-second idle timer
      timeouts.push(t1);
    }

    // Cleanup function to kill all timers if the user hovers or clicks
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [revealState, isHoveringPortrait]);

  const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

  // THE REVERSE "SHUTTER" SEQUENCE (Auto-Relock)
  useEffect(() => {
    let idleTimer: NodeJS.Timeout;
    
    // Only run the 7-second countdown if fully revealed and not hovering
    if (revealState === "revealed" && !isHoveringPortrait) {
      idleTimer = setTimeout(() => {
        
        // Fire the sequence safely outside of the cleanup array
        setRevealState("reverse_smashing"); 
        setTimeout(() => setRevealState("encrypting"), 300); 
        setTimeout(() => setRevealState("encrypted"), 1500); 
        
      }, 7000);
    }
    
    // This now ONLY kills the 7-second countdown if you interrupt it, 
    // it won't accidentally kill the animation while it's running!
    return () => clearTimeout(idleTimer);
  }, [revealState, isHoveringPortrait]);

  return (
    <div className="flex flex-col w-full selection:bg-neon-red/40 selection:text-white relative overflow-clip bg-[#01040A]" onTouchStart={() => {}}>
      <div className="grain-overlay z-0 pointer-events-none"></div>
    
      {/* SECTION 1: HERO -> Fades directly into Neon Red */}
      <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 w-full relative bg-gradient-to-b from-cyan/3 to-neon-red/3">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/10 rounded-full blur-[120px] pointer-events-none animate-neon-breath z-0"></div>
        <motion.div initial="hidden" animate="visible" variants={systemBoot} className="max-w-4xl flex flex-col items-center space-y-6 relative z-10">
          <motion.div variants={powerUp} className="flex items-center gap-3 mb-2 relative p-1">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan"></span>
            </span>
            <span className="block font-roboto text-[10px] tracking-[0.3em] uppercase text-cyan pulse-cyan">Open for Opportunities</span>
          </motion.div>
          <motion.span variants={hammerCrash} className="pulse-white inline-block">
            <h1 className="text-5xl md:text-[5.5rem] leading-none font-roboto font-bold tracking-tighter text-starlight uppercase animate-pull-glitch">FATHURRASYID IBRAHIM</h1>
          </motion.span>
          <motion.div variants={powerUp} className="relative mt-6">
            <p className="text-lg md:text-xl text-stardust leading-relaxed font-light max-w-2xl mx-auto block">I translate the complexity of real-world challenges into clarity—through data, through analysis, and through the quiet art of asking the right questions, while leveraging AI to validate hypotheses and engineer solutions.</p>
          </motion.div>
          <motion.div variants={powerUp} className="pt-10">
            <Link 
              href="#work" 
              onMouseEnter={() => setPortfolioHovered(true)} 
              onMouseLeave={() => setPortfolioHovered(false)}
              className="relative inline-block border border-cyan/50 bg-abyss text-cyan px-8 py-4 rounded-sm text-xs font-roboto tracking-[0.2em] font-bold uppercase hover:scale-105 hover:bg-cyan hover:text-abyss active:scale-95 transition-all duration-300 pulse-cyan"
            >
              <ScrambleText defaultText="[ Execute Portfolio ]" hoverText="[ EX3CU7E P0R7F0L10 ]" isHovering={portfolioHovered} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: ABOUT -> Starts Red, ends Orange */}
      {/* 5. CONSISTENT SPACING: Changed py-20 to py-24 */}
      <section id="about" className="py-24 flex items-center justify-center scroll-mt-24 relative w-full bg-gradient-to-b from-neon-red/3 to-neon-orange/3">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-neon-red/5 rounded-full blur-[100px] pointer-events-none animate-neon-breath z-0" style={{ animationDelay: '1s' }}></div>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-50px" }} variants={extremeCrash}>
            <p className="font-roboto text-[10px] tracking-[0.4em] uppercase text-neon-red mb-4 pulse-red">01_The_Human</p>
            <h2 className="text-4xl md:text-5xl font-inter font-light text-starlight leading-tight mb-8">
              <span className="block">The person</span>
              <span className="inline-block pulse-red"><span className="text-neon-red font-bold animate-pull-glitch block">behind the data</span></span>
            </h2>
            <div className="space-y-6 text-stardust font-light leading-relaxed">
              {/* Updated Bio to the new version! */}
              <p>
                I am a <strong className="font-medium text-starlight pulse-white">Data Analyst</strong> focused on turning complex operational friction into streamlined systems. By leveraging <strong className="font-medium text-starlight">SQL databases</strong>, <strong className="font-medium text-starlight">Python automation</strong>, <strong className="font-medium text-starlight">statistical modeling</strong>, and <strong className="font-medium text-starlight">interactive dashboards</strong>, I engineer scalable solutions that drive strategic decisions.
                </p>
              <p className="italic font-inter text-starlight/60">
                Based in Subang. Translating data worldwide.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-50px" }} variants={extremeCrash} 
            onClick={handleReveal} 
            onPointerEnter={(e) => { if (e.pointerType === 'mouse') setIsHoveringPortrait(true); }}
            onPointerLeave={() => setIsHoveringPortrait(false)}
            className={`aspect-[3/4] bg-abyss/40 backdrop-blur-md border border-white/5 rounded-[2rem] flex items-center justify-center relative overflow-hidden group shadow-[inset_0_0_40px_rgba(255,0,60,0.05)] transition-all duration-700 ${(revealState === "encrypted" || revealState === "encrypting") ? "cursor-pointer hover:shadow-[0_0_40px_rgba(255,0,60,0.2)] hover:border-neon-red/30" : ""} ${revealState === "revealed" ? "hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,0,60,0.15)]" : ""}`}
          >
            {/* 1. BASE IMAGE LAYER (Updated to handle reverse_smashing) */}
            <div className={`absolute inset-0 transition-all z-0 ${
              (revealState === "encrypted" || revealState === "encrypting") ? "opacity-0 blur-xl scale-110 duration-700" : 
              revealState === "decrypting" ? "opacity-100 blur-md scale-[1.05] duration-[1200ms] ease-linear" : 
              (revealState === "smashing" || revealState === "reverse_smashing") ? "opacity-100 blur-0 scale-[1.50] duration-300 ease-out" : 
              "opacity-100 blur-0 scale-100 duration-500 ease-out"
            }`}>
              <img src="/my_portrait/fath_portrait.png" alt="Fathurrasyid Ibrahim" className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${revealState === "revealed" ? "opacity-60 grayscale contrast-125 group-hover:opacity-100 group-hover:grayscale-0 group-hover:contrast-100 transform scale-100 group-hover:scale-150" : "opacity-100 grayscale contrast-125"}`} />
              <div className={`absolute inset-0 bg-gradient-to-tr from-cyan/30 to-neon-red/30 mix-blend-overlay transition-opacity duration-700 pointer-events-none ${revealState === "revealed" ? "group-hover:opacity-0" : "opacity-100"}`}></div>
            </div>

            {/* 2. THE MECHANICAL PIXEL SHUTTERS */}
            <div className="absolute inset-0 z-10 grid pointer-events-none bg-abyss/50" style={{ gridTemplateColumns: 'repeat(10, 1fr)', gridTemplateRows: 'repeat(14, 1fr)' }}>
              {pixelGrid.map((pixel) => {
                const isClosed = revealState === "encrypted" || revealState === "encrypting";
                return (
                  <motion.div
                    key={pixel.id}
                    initial={false}
                    animate={{ 
                      opacity: isClosed ? 1 : 0,
                      rotateY: isClosed ? 0 : 90 
                    }}
                    transition={{ 
                      // Uses reverseDelay for encrypting (bottom-right to top-left)
                      delay: revealState === "encrypting" ? pixel.reverseDelay : (revealState === "decrypting" ? pixel.forwardDelay : 0), 
                      duration: 0.15,
                      ease: "easeInOut"
                    }}
                    className="bg-[#01040A] w-full h-full border border-white/[0.01]"
                  />
                )
              })}
            </div>

            {/* 3. THE HEAVY LIGHT FLASH (Now triggers on reverse_smashing too) */}
            <div className={`absolute inset-0 bg-white z-20 pointer-events-none transition-opacity ${revealState === 'smashing' || revealState === 'reverse_smashing' ? 'opacity-100 duration-300' : 'opacity-0 duration-500'}`}></div>

            {/* 4. RESTRICTED UI */}
            <div className={`absolute inset-0 z-30 flex flex-col items-center justify-center transition-all ${
              revealState === "encrypted" ? "opacity-100 duration-700 delay-0 bg-abyss/80 backdrop-blur-sm" : 
              revealState === "encrypting" ? "opacity-100 duration-1000 delay-300 bg-transparent backdrop-blur-none" : 
              "opacity-0 duration-300 pointer-events-none bg-transparent backdrop-blur-none"
            }`}>
               <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none"></div>
               <svg className="w-10 h-10 text-neon-red mb-4 animate-neon-pulse" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
               </svg>
               <span className="font-roboto text-xs text-neon-red tracking-[0.4em] uppercase animate-pull-glitch">[ RESTRICTED_ACCESS ]</span>
               <span className="font-mono text-[9px] text-stardust mt-6 tracking-widest uppercase pulse-white">Click to Decrypt</span>
            </div>

            {/* 5. DECRYPTING / ENCRYPTING TEXT */}
            <div className={`absolute inset-0 z-40 flex items-center justify-center bg-neon-red/10 mix-blend-overlay transition-opacity duration-75 ${revealState === "decrypting" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              <span className="font-mono text-2xl text-starlight tracking-widest font-bold animate-micro-glitch">DECRYPTING...</span>
            </div>
            
            {/* Added: ENCRYPTING TEXT overlay */}
            <div className={`absolute inset-0 z-40 flex items-center justify-center bg-neon-red/10 mix-blend-overlay transition-opacity duration-75 ${revealState === "encrypting" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              <span className="font-mono text-2xl text-starlight tracking-widest font-bold animate-micro-glitch">ENCRYPTING...</span>
            </div>

            {/* 6. BORDER GLOW */}
            <div className={`absolute inset-4 border border-neon-red/20 rounded-2xl z-50 pointer-events-none transition-all duration-700 animate-neon-breath ${revealState === "revealed" ? "group-hover:border-neon-red/80 group-hover:shadow-[0_0_40px_rgba(255,0,60,0.5)_inset] group-hover:scale-95" : ""}`} style={{ animationDelay: '2s' }}></div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: WORK -> Starts Orange, ends Cyan */}
      {/* 5. CONSISTENT SPACING: Changed py-20 to py-24 */}
      <section id="work" className="py-24 scroll-mt-24 relative w-full bg-gradient-to-b from-neon-orange/3 to-cyan/3">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-neon-orange/5 rounded-full blur-[120px] pointer-events-none animate-neon-breath z-0"></div>
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={extremeCrash} className="mb-12 max-w-5xl mx-auto">
            <p className="font-roboto text-[10px] tracking-[0.4em] uppercase text-neon-orange mb-4 pulse-orange">02_Data_Library</p>
            <h2 className="text-4xl md:text-5xl font-inter font-light tracking-tight mb-4 text-starlight">
              <span>Data & </span> 
              <span className="inline-block pulse-orange"><span className="font-bold text-neon-orange animate-pull-glitch block">Analytics</span></span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={extremeCrash} className="flex flex-wrap gap-3 mb-12 max-w-5xl mx-auto">
            {categories.map((category) => (
              <button key={category} onClick={() => setActiveFilter(category)} className={`px-5 py-2.5 rounded-full font-roboto text-[10px] uppercase tracking-widest transition-all duration-300 border hover:scale-105 active:scale-95 pulse-orange ${activeFilter === category ? "bg-white/10 border-white text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" : "bg-transparent border-white/10 text-stardust hover:border-white/50 hover:text-white active:text-white"}`}>
                {category}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project: Project) => (
                <motion.div 
                  key={project.id} 
                  initial="hidden" whileInView="visible" viewport={{ once: false }} variants={extremeCrash} exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)", transition: { duration: 0.3 } }} 
                  onClick={() => {
                    setSelectedProject(project);
                    setActiveSegmentIndex(0);
                  }}
                  className={`bg-abyss/30 backdrop-blur-md p-10 rounded-3xl border border-white/5 ${project.styles.border} hover:bg-glass active:bg-glass ${project.styles.shadow} hover:scale-[1.04] active:scale-[1.02] hover:z-20 active:z-20 transition-all duration-500 group relative flex flex-col h-full text-left overflow-hidden cursor-pointer`}
                >
                  <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent ${project.styles.line} to-transparent transform origin-center scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform duration-700 ease-out z-20`}></div>
                  
                  <AnimatedThumbnail details={project.details} />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <span className={`font-roboto text-[10px] ${project.styles.text} uppercase tracking-widest mb-4 block ${project.styles.pulse}`}>{project.category}</span>
                    <h3 className="text-3xl font-inter font-semibold text-starlight mb-4 group-hover:animate-micro-glitch group-active:animate-micro-glitch">{project.title}</h3>
                    <p className="text-stardust font-light leading-relaxed mb-10 flex-grow text-lg">{project.summary}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.techStack.map((tech: string) => (
                        <span key={tech} className="font-roboto text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-stardust">{tech}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 4: CAREER LOGS -> Starts Cyan, ends Purple */}
      <section id="career" className="py-24 scroll-mt-24 relative w-full bg-gradient-to-b from-cyan/3 to-purple-500/3">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan/5 rounded-full blur-[100px] pointer-events-none animate-neon-breath z-0"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={extremeCrash} className="mb-16">
            <p className="font-roboto text-[10px] tracking-[0.4em] uppercase text-cyan mb-4 pulse-cyan">03_Career_Logs</p>
            <h2 className="text-4xl md:text-5xl font-inter font-light tracking-tight mb-4 text-starlight">
              <span>Operational </span> 
              <span className="inline-block pulse-cyan"><span className="font-bold text-cyan animate-pull-glitch block">History</span></span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[1px] bg-[linear-gradient(to_bottom,#00F0FF_0%,#A855F7_33%,#FF003C_66%,#FF5E00_100%)] opacity-30"></div>
            
            <div className="flex flex-col gap-8">
              {careerLogs.map((log, index) => (
                <motion.div 
                  key={log.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-50px" }} transition={{ delay: index * 0.2, duration: 0.5 }}
                  onClick={() => setSelectedCareer(log)} className="group relative pl-12 md:pl-24 py-4 cursor-pointer"
                >
                  {/* THE FIX: Mathematically centered the 8px dot exactly onto the 1px line (left-12 & left-28) */}
                  <div className={`absolute left-[12.5px] md:left-[28.5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-abyss border-2 ${log.styles.border} group-hover:scale-[2] group-active:scale-[2] group-hover:bg-white group-active:bg-white transition-all duration-300 z-10`}></div>
                  
                  <div className={`bg-abyss/40 backdrop-blur-sm border border-white/5 ${log.styles.border} ${log.styles.glow} p-6 md:p-8 rounded-2xl hover:bg-white/5 active:bg-white/5 transition-all duration-300 transform group-hover:translate-x-2 group-active:translate-x-2 group-hover:-translate-y-1 group-active:-translate-y-1`}>
                    <p className={`font-roboto text-[10px] tracking-widest uppercase mb-2 ${log.styles.text}`}>{log.period}</p>
                    <h3 className="text-2xl font-inter font-bold text-starlight mb-1 group-hover:animate-micro-glitch group-active:animate-micro-glitch">{log.title}</h3>
                    <p className="text-stardust font-light text-sm md:text-base">{log.company}</p>
                    
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-roboto tracking-widest uppercase text-white/40 group-hover:text-white/80 group-active:text-white/80 transition-colors">
                      <span>[ Execute_Query ]</span>
                      <svg className="w-3 h-3 group-hover:translate-x-1 group-active:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CLEARANCES -> Starts Purple, ends Neon Yellow */}
      <section id="credentials" className="py-24 scroll-mt-24 relative w-full bg-gradient-to-b from-purple-500/3 to-neon-yellow/3">
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none animate-neon-breath z-0"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={extremeCrash} className="mb-12">
            <p className="font-roboto text-[10px] tracking-[0.4em] uppercase text-purple-400 mb-4 pulse-purple">04_Credentials</p>
            <h2 className="text-4xl md:text-5xl font-inter font-light tracking-tight mb-4 text-starlight">
              <span>Acquired </span> 
              <span className="inline-block pulse-purple"><span className="font-bold text-purple-400 animate-pull-glitch block">Protocols</span></span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certsLogs.map((cert, index) => (
              <motion.div 
                key={cert.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }} transition={{ delay: index * 0.2, duration: 0.5 }}
                className={`relative bg-abyss/40 backdrop-blur-md border border-white/5 ${cert.styles.border} ${cert.styles.glow} p-8 rounded-2xl overflow-hidden group transition-all duration-300 hover:scale-[1.02] active:scale-[1.02] flex flex-col`}
              >
                <div className="w-3/4 h-5 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.1)_2px,rgba(255,255,255,0.1)_5px,transparent_5px,transparent_8px,rgba(255,255,255,0.3)_8px,rgba(255,255,255,0.3)_10px)] mb-6 opacity-40 group-hover:opacity-100 group-active:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 left-0 w-full h-[200%] bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-y-full group-hover:translate-y-full group-active:translate-y-full transition-transform duration-[1500ms] ease-in-out z-0 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <p className={`font-mono text-[10px] uppercase tracking-widest ${cert.styles.text} mb-3`}>{cert.issuer} // {cert.date}</p>
                  <h4 className="text-2xl font-bold text-starlight mb-8 leading-snug group-hover:animate-micro-glitch group-active:animate-micro-glitch">{cert.title}</h4>
                  
                  <div className="flex justify-between items-center mt-auto pt-5 border-t border-white/5">
                    <span className="px-3 py-1.5 bg-white/5 text-[10px] leading-none font-roboto font-bold tracking-[0.2em] text-stardust uppercase border border-white/10 rounded-md flex items-center gap-2 shrink-0">
                      <span className={`w-1.5 h-1.5 rounded-full bg-current ${cert.styles.text} animate-pulse shrink-0`}></span>
                      Verified
                    </span>
                    {cert.link !== "#" && (
                      <a href={cert.link} target="_blank" className={`text-[10px] font-mono font-bold tracking-widest uppercase hover:text-white active:text-white transition-colors ${cert.styles.text}`}>
                        [ View_Record ]
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CONTACT -> Stays Yellow to the bottom */}
      {/* 5. CONSISTENT SPACING: Changed pt-20 pb-4 to py-24 */}
      <section id="contact" className="py-24 scroll-mt-24 relative w-full bg-gradient-to-b from-neon-yellow/3 to-neon-yellow/3">
        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon-yellow/3 rounded-full blur-[120px] pointer-events-none animate-neon-breath z-0" style={{ animationDelay: '1.5s' }}></div>
        
        {/* THE ORCHESTRATOR: Parent motion.div controls the stagger sequence */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false, margin: "-50px" }} 
          variants={{
            hidden: { transition: { staggerChildren: 0.15, staggerDirection: -1 } },
            visible: { transition: { staggerChildren: 0.3 } }
          }}
          className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full relative z-10"
        >
          {/* LEFT BLOCK: Appears first, disappears last */}
          <motion.div variants={extremeCrash}>
            <p className="font-roboto text-[10px] tracking-[0.4em] uppercase text-neon-yellow mb-4 pulse-yellow">05_Initialize_Contact</p>
            <h2 className="text-4xl md:text-5xl font-inter font-light leading-tight mb-6 text-starlight">
              <span className="block">Let's make</span> 
              <span className="inline-block pulse-yellow"><span className="font-bold text-neon-yellow animate-pull-glitch block">data make sense.</span></span>
            </h2>
            <p className="text-stardust font-light mb-10 max-w-md leading-relaxed">
              Actively open for new opportunities. Available for <strong className="text-starlight font-medium pulse-white">full-time</strong> or <strong className="text-starlight font-medium pulse-white">freelance</strong> data engagements across <span className="text-neon-yellow font-medium animate-pulse">remote, hybrid, or on-site</span> environments.
            </p>
          </motion.div>
          
          {/* RIGHT BLOCK (SOCMED): Appears second, disappears first */}
          <motion.div variants={extremeCrash} className="flex flex-col gap-6 md:pl-16">
            <ContactLink href="mailto:ifathurra@gmail.com" defaultText="Email" hoverText="3M41L" />
            <ContactLink href="https://linkedin.com/in/ifathurrasyid" defaultText="LinkedIn" hoverText="L1NK3D1N" />
            <ContactLink href="https://www.instagram.com/ifathurrasyid/" defaultText="Instagram" hoverText="1N574GR4M" />
          </motion.div>
        </motion.div>
        
        {/* Tightened Footer Spacing */}
        {/* 4. REMOVED FOOTER LINE: Deleted 'border-t border-white/5' */}
        <div className="max-w-5xl mx-auto px-6 mt-16 pt-8 pb-2 flex flex-col md:flex-row justify-between items-center font-roboto text-[9px] tracking-widest text-stardust uppercase relative z-10">
          <p>© 2026 Fathurrasyid Ibrahim.</p>
          <p className="text-neon-yellow/60 pulse-yellow">System Online</p>
        </div>
      </section>

      {/* FLOATING BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[100] p-4 rounded-full bg-abyss border border-white/10 text-starlight hover:text-cyan hover:border-cyan hover:bg-cyan/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] active:text-cyan active:border-cyan active:bg-cyan/10 active:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-y-1 group-active:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* --- CAREER MODAL (TERMINAL STYLE) --- */}
      <AnimatePresence>
        {selectedCareer && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-abyss/80 p-4"
            onClick={() => window.history.back()}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()} 
              className={`w-[calc(100vw-2rem)] md:w-full max-w-2xl bg-[#03060D] border ${selectedCareer.styles.border} ${selectedCareer.styles.glow} rounded-xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden`}
            >
              {/* HEADER: Protected from shrinking, text wraps safely */}
              <div className="px-4 md:px-6 py-4 border-b border-white/5 flex justify-between items-start bg-[#010308] shrink-0 gap-4">
                <div className="flex flex-col min-w-0 flex-1">
                   <span className={`font-mono text-xs tracking-[0.2em] uppercase ${selectedCareer.styles.text} animate-micro-glitch block break-words whitespace-normal leading-relaxed`}>
                      sys.log.query({selectedCareer.company.replace(/\s+/g, '_')})
                   </span>
                </div>
                <button onClick={() => window.history.back()} className="text-stardust hover:text-neon-red active:text-neon-red transition-colors pulse-red font-mono uppercase text-xs tracking-widest p-2 -mt-2 -mr-2 shrink-0">
                  [ X ]
                </button>
              </div>
              
              {/* CONTENT: Now scrollable inside the box! */}
              <div className="p-6 md:p-10 relative overflow-y-auto flex-1">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30"></div>
                <h3 className="text-3xl font-inter font-bold text-starlight mb-2">{selectedCareer.title}</h3>
                <p className={`font-roboto text-sm tracking-widest uppercase mb-8 ${selectedCareer.styles.text}`}>{selectedCareer.company} // {selectedCareer.period}</p>
                
                <div className="space-y-4">
                  {selectedCareer.modalContent.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <span className={`mt-1 font-mono text-xs ${selectedCareer.styles.text}`}>{'>'}</span>
                      <p className="text-stardust font-light leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PROJECT PARALLAX MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-abyss/80 p-0 md:p-10"
            onClick={() => window.history.back()}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()} 
              className="w-full h-full md:max-w-7xl md:h-[85vh] bg-[#03060D] md:border border-white/10 md:rounded-2xl overflow-hidden flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
              {/* MODAL HEADER */}
              <div className="border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between px-4 md:px-8 py-4 bg-[#010308] z-50 shrink-0 gap-4 w-full">
                <div className="min-w-0 flex-1">
                  <span className={`font-mono text-xs tracking-[0.2em] uppercase ${selectedProject.styles.text} animate-micro-glitch leading-relaxed block break-words whitespace-normal`}>
                    {selectedProject.title}.exe
                  </span>
                </div>
                <div className="flex justify-between md:justify-end items-center gap-2 md:gap-4 shrink-0 w-full md:w-auto">
                  {selectedProject.projectUrl !== "#" && (
                    <a 
                      href={selectedProject.projectUrl} 
                      target="_blank" 
                      download={selectedProject.linkType === 'excel' ? true : undefined}
                      onMouseEnter={() => setRepoHovered(true)} onMouseLeave={() => setRepoHovered(false)}
                      className={`group relative text-[10px] font-roboto font-bold tracking-widest uppercase border border-white/10 px-4 md:px-6 py-2 rounded-full hover:bg-white/5 active:bg-white/5 transition-colors ${selectedProject.styles.text} flex items-center justify-center min-w-[140px] md:min-w-[220px]`}
                    >
                      <span className="absolute left-4 md:left-6 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 hidden md:block">
                        {/* ICON RENDERER LOGIC */}
                        {selectedProject.linkType === 'tableau' || selectedProject.linkType === 'looker' || selectedProject.linkType === 'metabase' ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h6v16H4V4zm8 5h8v11h-8V9zm0-5h8v3h-8V4z" /></svg>
                        ) : selectedProject.linkType === 'deck' ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zm-3.5-9h-5c-.28 0-.5.22-.5.5v3c0 .28.22.5.5.5h5c.28 0 .5-.22.5-.5v-3c0-.28-.22-.5-.5-.5z"/></svg>
                        ) : selectedProject.linkType === 'excel' ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2V8l-6-6zm-4 14H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V6h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V6h2v2zm-3-6V3.5L18.5 9H13z"/></svg>
                        ) : (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                        )}
                      </span>
                      <span className="transform md:group-hover:translate-x-3 md:group-active:translate-x-3 transition-transform duration-300">
                        <ScrambleText 
                          defaultText="[ Execute_Link ]" 
                          hoverText={
                            selectedProject.linkType === 'tableau' || selectedProject.linkType === 'looker' || selectedProject.linkType === 'metabase' ? "[ ACCESS_DASHBOARD ]" : 
                            selectedProject.linkType === 'deck' ? "[ ACCESS_DECK ]" : 
                            selectedProject.linkType === 'excel' ? "[ DOWNLOAD_EXCEL ]" : 
                            "[ ACCESS_REPO ]"
                          } 
                          isHovering={repoHovered} 
                        />
                      </span>
                    </a>
                  )}
                  <button onClick={() => window.history.back()} className="text-stardust hover:text-neon-red active:text-neon-red transition-colors pulse-red font-mono uppercase text-xs tracking-widest px-2">
                    [ X ]
                  </button>
                </div>
              </div>
              
              {/* MODAL CONTENT: OS SLIDER ARCHITECTURE */}
              <div className="flex-1 overflow-hidden relative bg-[#03060D]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSegmentIndex}
                    initial={{ opacity: 0, filter: "blur(8px)", x: 20 }}
                    animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                    exit={{ opacity: 0, filter: "blur(8px)", x: -20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute inset-0 flex flex-col md:flex-row w-full h-full"
                  >
                    
                    {/* TEXT HALF: Fixed Justification to 'justify-start' */}
                    <div className="w-full md:w-[40%] lg:w-[35%] p-6 md:p-8 lg:p-12 flex flex-col justify-start bg-[#010308] z-20 md:border-r border-white/5 md:shadow-xl h-auto md:h-full overflow-y-auto pt-8 md:pt-16">
                      
                      <div className="flex-1">
                        <p className={`font-roboto text-[10px] tracking-[0.4em] uppercase ${selectedProject.styles.text} mb-3 md:mb-4 ${selectedProject.styles.pulse}`}>
                          0{activeSegmentIndex + 1}_Segment
                        </p>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-inter font-light text-starlight leading-tight mb-3 md:mb-5">
                          {selectedProject.details[activeSegmentIndex].subtitle}
                        </h3>
                        <p className="text-stardust font-light text-sm md:text-base lg:text-lg leading-relaxed">
                          {selectedProject.details[activeSegmentIndex].content}
                        </p>
                        
                        {/* Detail-specific execute link */}
                        {selectedProject.details[activeSegmentIndex].link && selectedProject.details[activeSegmentIndex].link !== selectedProject.projectUrl && (
                          <div className="mt-6 md:mt-8">
                            <a href={selectedProject.details[activeSegmentIndex].link} target="_blank" className={`group/link inline-flex items-center gap-3 font-roboto text-xs font-bold uppercase tracking-[0.2em] border border-white/10 px-6 py-3 rounded-full hover:bg-white/5 active:bg-white/5 transition-all duration-300 ${selectedProject.styles.text} hover:scale-105 active:scale-95`}>
                              <span>[ {selectedProject.details[activeSegmentIndex].linkText || "EXECUTE_LINK"} ]</span>
                              <svg className="w-4 h-4 animate-pulse group-hover/link:translate-x-1 group-hover/link:-translate-y-1 group-active/link:translate-x-1 group-active/link:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </a>
                          </div>
                        )}
                      </div>

                      {/* OS SLIDER CONTROLS (Anchored to bottom of text) */}
                      <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between z-50 shrink-0">
                        <button 
                          onClick={() => setActiveSegmentIndex(Math.max(0, activeSegmentIndex - 1))}
                          disabled={activeSegmentIndex === 0}
                          className={`font-mono text-[10px] tracking-widest uppercase transition-colors px-2 py-1 ${activeSegmentIndex === 0 ? 'text-white/10 cursor-not-allowed' : 'text-stardust hover:text-white pulse-white'}`}
                        >
                          {'[ < PREV ]'}
                        </button>
                        
                        <div className="font-mono text-[10px] tracking-[0.3em] text-starlight">
                          0{activeSegmentIndex + 1} <span className="text-white/20">/</span> 0{selectedProject.details.length}
                        </div>

                        <button 
                          onClick={() => setActiveSegmentIndex(Math.min(selectedProject.details.length - 1, activeSegmentIndex + 1))}
                          disabled={activeSegmentIndex === selectedProject.details.length - 1}
                          className={`font-mono text-[10px] tracking-widest uppercase transition-colors px-2 py-1 ${activeSegmentIndex === selectedProject.details.length - 1 ? 'text-white/10 cursor-not-allowed' : 'text-stardust hover:text-white pulse-white'}`}
                        >
                          {'[ NEXT > ]'}
                        </button>
                      </div>

                    </div>
                    
                    {/* IMAGE HALF */}
                    <div className="w-full md:w-[60%] lg:w-[65%] h-[40vh] md:h-full relative overflow-hidden z-10 bg-[#03060D]">
                      <div className="absolute inset-0 p-4 md:p-16 flex items-center justify-center z-30">
                        {selectedProject.details[activeSegmentIndex].image ? (
                          <img src={selectedProject.details[activeSegmentIndex].image} alt={selectedProject.details[activeSegmentIndex].subtitle} className="max-w-full max-h-full object-contain opacity-95 drop-shadow-[0_0_25px_rgba(0,240,255,0.3)]" />
                        ) : (
                          <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.details[activeSegmentIndex].gradient} opacity-40 z-10`}></div>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40 z-40"></div>
                      <div className="absolute inset-0 grain-overlay opacity-20 pointer-events-none z-40"></div>
                      <div className="absolute inset-4 border border-white/5 rounded-xl pointer-events-none z-50"></div>
                      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 font-mono text-[8px] tracking-[0.3em] text-white/30 uppercase z-50">
                        {selectedProject.details[activeSegmentIndex].image ? `SYS.IMG.0${activeSegmentIndex + 1}` : `SYS.DAT.0${activeSegmentIndex + 1}`}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}