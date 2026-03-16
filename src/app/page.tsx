"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
// @ts-ignore
import mockProjectsData from "./projects.json";

interface Project {
  id: number; title: string; category: string;
  styles: { text: string; border: string; pulse: string; shadow: string; line: string; };
  summary: string; techStack: string[]; projectUrl: string; details: any[];
}
const mockProjects: Project[] = mockProjectsData;

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
    <a href={href} target="_blank" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="relative overflow-hidden font-roboto text-lg font-light text-stardust hover:text-neon-yellow border-b border-white/5 pb-4 flex justify-between transition-all duration-300 group hover:pl-2 pulse-yellow">
      {/* GLITCH FIX: min-w-[180px] prevents the container from shrinking and causing the infinite hover loop */}
      <span className="group-hover:font-bold transition-all min-w-[180px] inline-block">
        <ScrambleText defaultText={defaultText} hoverText={hoverText} isHovering={isHovered} />
      </span>
      <span className="text-neon-yellow transform group-hover:translate-x-2 transition-transform duration-300">→</span>
    </a>
  );
};

const categories = ["All", "HR Analytics", "BI & Dashboards", "Automation", "Others"];

const extremeCrash: Variants = {
  hidden: { opacity: 0, x: -30, filter: "brightness(2) hue-rotate(90deg) blur(10px) drop-shadow(-10px 0 red) drop-shadow(10px 0 blue)" },
  visible: {
    opacity: [0, 1, 0.2, 1], x: [-30, 15, -5, 0],
    filter: [
      "brightness(2) hue-rotate(90deg) blur(10px) drop-shadow(-10px 0 red) drop-shadow(10px 0 blue)",
      "brightness(1.5) hue-rotate(-90deg) blur(4px) drop-shadow(5px 0 red) drop-shadow(-5px 0 cyan)",
      "brightness(0.5) blur(2px)",
      "brightness(1) hue-rotate(0deg) blur(0px) drop-shadow(0px 0 transparent)"
    ],
    transition: { duration: 0.7, times: [0, 0.4, 0.7, 1], ease: "anticipate" }
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

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filteredProjects = mockProjects.filter((p: Project) => activeFilter === "All" || p.category === activeFilter);

  const [revealState, setRevealState] = useState("encrypted"); 
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [repoHovered, setRepoHovered] = useState(false);
  const [portfolioHovered, setPortfolioHovered] = useState(false);

  const handleReveal = () => {
    if (revealState === "encrypted") {
      setRevealState("decrypting");
      setTimeout(() => { setRevealState("revealed"); }, 1500); 
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { window.history.replaceState(null, "", `#${entry.target.id}`); }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" } 
    );
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      // BACK TO TOP FIX: Lowered threshold so it appears quickly
      setShowBackToTop(window.scrollY > 400); 
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col w-full selection:bg-neon-red/40 selection:text-white relative overflow-x-hidden">
      <div className="grain-overlay"></div>
      
      {/* SECTION 1: HERO */}
      <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 max-w-5xl mx-auto w-full relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/10 rounded-full blur-[120px] pointer-events-none animate-neon-breath"></div>
        <motion.div initial="hidden" animate="visible" variants={systemBoot} className="max-w-4xl flex flex-col items-center space-y-6 relative z-10">
          
          {/* DOT GLITCH FIX: Removed overflow-hidden and added p-1 so the pinging animation isn't clipped */}
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
            <p className="text-lg md:text-xl text-stardust leading-relaxed font-light max-w-2xl mx-auto block">I translate the complexity of business and people into clarity—through data, through analysis, and through the quiet art of asking the right questions.</p>
          </motion.div>
          <motion.div variants={powerUp} className="pt-10">
            <Link 
              href="#work" 
              onMouseEnter={() => setPortfolioHovered(true)} 
              onMouseLeave={() => setPortfolioHovered(false)}
              className="relative inline-block border border-cyan/50 bg-abyss text-cyan px-8 py-4 rounded-sm text-xs font-roboto tracking-[0.2em] font-bold uppercase hover:scale-105 hover:bg-cyan hover:text-abyss active:scale-95 transition-all duration-300 pulse-cyan"
            >
              <ScrambleText defaultText="[ Execute Portfolio ]" hoverText="[ 3X3CU73 P0R7F0L10 ]" isHovering={portfolioHovered} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <div className="w-full h-16 bg-gradient-to-b from-transparent via-neon-red/10 to-transparent pointer-events-none"></div>

      {/* SECTION 2: ABOUT */}
      <section id="about" className="py-20 flex items-center justify-center scroll-mt-24 relative">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-neon-red/5 rounded-full blur-[100px] pointer-events-none animate-neon-breath" style={{ animationDelay: '1s' }}></div>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-50px" }} variants={extremeCrash}>
            <p className="font-roboto text-[10px] tracking-[0.4em] uppercase text-neon-red mb-4 pulse-red">01_The_Human</p>
            <h2 className="text-4xl md:text-5xl font-inter font-light text-starlight leading-tight mb-8">
              <span className="block">The person</span>
              <span className="inline-block pulse-red"><span className="text-neon-red font-bold animate-pull-glitch block">behind the data</span></span>
            </h2>
            <div className="space-y-6 text-stardust font-light leading-relaxed">
              <p>I am a <strong className="font-medium text-starlight pulse-white">Data Analyst</strong> with a foundation in Human Resources. I believe that behind every raw data point is a process, a friction point, or a story worth understanding.</p>
              <p>My work lives at the intersection of complex analytics and actual human strategy. Whether I am building automated Python pipelines or simplifying workforce metrics into Metabase dashboards, my goal is always to turn complexity into decisions that make sense.</p>
              <p className="italic font-inter text-starlight/60">Based in Subang. Translating data worldwide.</p>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-50px" }} variants={extremeCrash} onClick={handleReveal} className={`aspect-[3/4] bg-abyss/40 backdrop-blur-md border border-white/5 rounded-[2rem] flex items-center justify-center relative overflow-hidden group shadow-[inset_0_0_40px_rgba(255,0,60,0.05)] transition-all duration-700 ${revealState === "encrypted" ? "cursor-pointer hover:shadow-[0_0_40px_rgba(255,0,60,0.2)] hover:border-neon-red/30" : ""} ${revealState === "decrypting" ? "animate-glitch-crack filter contrast-150 brightness-150" : ""} ${revealState === "revealed" ? "hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,0,60,0.15)]" : ""}`}>
            <div className={`absolute inset-0 transition-all duration-1000 z-0 ${revealState === "revealed" ? "opacity-100 blur-0" : "opacity-0 blur-xl scale-125"}`}>
              <img src="/fath_portrait.png" alt="Fathurrasyid Ibrahim" className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale contrast-125 group-hover:opacity-100 group-hover:grayscale-0 group-hover:contrast-100 transform scale-100 group-hover:scale-150 transition-all duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan/30 to-neon-red/30 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700 pointer-events-none"></div>
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-60 group-hover:opacity-20 transition-opacity duration-700"></div>
            </div>
            <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center bg-abyss/90 backdrop-blur-xl transition-opacity duration-500 ${revealState !== "encrypted" ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
               <div className="absolute inset-0 grain-overlay opacity-30"></div>
               <svg className="w-10 h-10 text-neon-red mb-4 animate-neon-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
               <span className="font-roboto text-xs text-neon-red tracking-[0.4em] uppercase animate-pull-glitch">[ RESTRICTED_ACCESS ]</span>
               <span className="font-mono text-[9px] text-stardust mt-6 tracking-widest uppercase pulse-white">Click to Decrypt</span>
            </div>
            <div className={`absolute inset-0 z-30 flex items-center justify-center bg-neon-red/20 mix-blend-overlay transition-opacity duration-75 ${revealState === "decrypting" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              <span className="font-mono text-2xl text-starlight tracking-widest font-bold animate-micro-glitch">DECRYPTING...</span>
            </div>
            <div className={`absolute inset-4 border border-neon-red/20 rounded-2xl z-40 pointer-events-none transition-all duration-700 animate-neon-breath ${revealState === "revealed" ? "group-hover:border-neon-red/80 group-hover:shadow-[0_0_40px_rgba(255,0,60,0.5)_inset] group-hover:scale-95" : ""}`} style={{ animationDelay: '2s' }}></div>
          </motion.div>
        </div>
      </section>

      <div className="w-full h-16 bg-gradient-to-b from-transparent via-neon-orange/10 to-transparent pointer-events-none"></div>

      {/* SECTION 3: WORK */}
      <section id="work" className="py-20 scroll-mt-24 relative">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-neon-orange/5 rounded-full blur-[120px] pointer-events-none animate-neon-breath"></div>
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
              <button key={category} onClick={() => setActiveFilter(category)} className={`px-5 py-2.5 rounded-full font-roboto text-[10px] uppercase tracking-widest transition-all duration-300 border hover:scale-105 active:scale-95 pulse-orange ${activeFilter === category ? "bg-white/10 border-white text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" : "bg-transparent border-white/10 text-stardust hover:border-white/50 hover:text-white"}`}>
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
                  onClick={() => setSelectedProject(project)}
                  className={`bg-abyss/30 backdrop-blur-md p-10 rounded-3xl border border-white/5 ${project.styles.border} hover:bg-glass ${project.styles.shadow} hover:scale-[1.04] hover:z-20 transition-all duration-500 group relative flex flex-col h-full text-left overflow-hidden cursor-pointer`}
                >
                  <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent ${project.styles.line} to-transparent transform origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out`}></div>
                  <span className={`font-roboto text-[10px] ${project.styles.text} uppercase tracking-widest mb-4 block ${project.styles.pulse}`}>{project.category}</span>
                  <h3 className="text-3xl font-inter font-semibold text-starlight mb-4 group-hover:animate-micro-glitch">{project.title}</h3>
                  <p className="text-stardust font-light leading-relaxed mb-10 flex-grow text-lg">{project.summary}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack.map((tech: string) => (
                      <span key={tech} className="font-roboto text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-stardust">{tech}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <div className="w-full h-16 bg-gradient-to-b from-transparent via-neon-yellow/10 to-transparent pointer-events-none"></div>

      {/* SECTION 4: CONTACT */}
      <section id="contact" className="py-20 scroll-mt-24 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[300px] bg-neon-yellow/5 rounded-full blur-[100px] pointer-events-none animate-neon-breath" style={{ animationDelay: '1.5s' }}></div>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={extremeCrash}>
            <p className="font-roboto text-[10px] tracking-[0.4em] uppercase text-neon-yellow mb-4 pulse-yellow">03_Initialize_Contact</p>
            <h2 className="text-4xl md:text-5xl font-inter font-light leading-tight mb-6 text-starlight">
              <span className="block">Let's make</span> 
              <span className="inline-block pulse-yellow"><span className="font-bold text-neon-yellow animate-pull-glitch block">data make sense.</span></span>
            </h2>
            <p className="text-stardust font-light mb-10 max-w-md">Currently open for new opportunities. Whether you need a complex pipeline built or a dashboard simplified, I'm ready to help.</p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <MatrixButton href="/cv-ats.pdf" defaultText="[ Get CV_ATS ]" hoverText="[ G37 CV_47S ]" className="relative overflow-hidden bg-neon-yellow text-abyss px-6 py-4 rounded-full font-roboto text-xs uppercase tracking-[0.2em] font-bold hover:scale-105 active:scale-95 hover:bg-white hover:text-neon-red transition-all duration-300 pulse-yellow" />
              <MatrixButton href="/cv-visual.pdf" defaultText="[ Get CV_Visual ]" hoverText="[ G37 CV_V15U4L ]" className="relative overflow-hidden border border-white/10 text-neon-yellow px-6 py-4 rounded-full font-roboto text-xs uppercase tracking-[0.2em] font-bold hover:scale-105 active:scale-95 hover:bg-white/5 hover:border-neon-yellow/50 transition-all duration-300 pulse-yellow" />
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={extremeCrash} className="flex flex-col gap-6 md:pl-16">
            <ContactLink href="mailto:ifathurra@gmail.com" defaultText="Email" hoverText="3M41L" />
            <ContactLink href="https://linkedin.com/in/ifathurrasyid" defaultText="LinkedIn" hoverText="L1NK3D1N" />
            <ContactLink href="https://www.instagram.com/ifathurrasyid/" defaultText="Instagram" hoverText="1N574GR4M" />
            <ContactLink href="https://wa.me/6285117171327" defaultText="+62 851-1717-1327" hoverText="WH4754PP" />
          </motion.div>
        </div>
        <div className="max-w-5xl mx-auto px-6 mt-24 pt-8 pb-10 flex flex-col md:flex-row justify-between items-center font-roboto text-[9px] tracking-widest text-stardust uppercase relative z-10">
          <p>© 2026 Fathurrasyid Ibrahim.</p>
          <p className="text-neon-yellow/60 pulse-yellow">System Online</p>
        </div>
      </section>

      {/* FLOATING BACK TO TOP BUTTON (Z-INDEX 100) */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[100] p-4 rounded-full bg-abyss border border-white/10 text-starlight hover:text-cyan hover:border-cyan hover:bg-cyan/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* --- THE LIGHTWEIGHT PARALLAX PROJECT MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-abyss/80 p-4 md:p-10"
            onClick={() => setSelectedProject(null)}
          >
            {/* LAG FIX: Removed complex morphing, removed nested backdrop blurs. Added simple scale/slide up. */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()} 
              className="w-full max-w-7xl h-[85vh] bg-[#03060D] border border-white/10 rounded-2xl overflow-hidden flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            >
              {/* Solid top bar instead of blurred */}
              <div className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-[#010308] z-50 shrink-0">
                <span className={`font-mono text-xs tracking-[0.2em] uppercase ${selectedProject.styles.text} animate-micro-glitch`}>
                  {selectedProject.title}.exe
                </span>
                <div className="flex gap-4">
                  {selectedProject.projectUrl !== "#" && (
                    <a 
                      href={selectedProject.projectUrl} target="_blank" 
                      onMouseEnter={() => setRepoHovered(true)} onMouseLeave={() => setRepoHovered(false)}
                      className={`group relative text-[10px] font-roboto font-bold tracking-widest uppercase border border-white/10 px-6 py-2 rounded-full hover:bg-white/5 transition-colors ${selectedProject.styles.text} flex items-center justify-center min-w-[220px]`}
                    >
                      <span className="absolute left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                      </span>
                      <span className="transform group-hover:translate-x-3 transition-transform duration-300">
                        <ScrambleText defaultText="[ Execute_Link ]" hoverText="[ ACCESS_REPO ]" isHovering={repoHovered} />
                      </span>
                    </a>
                  )}
                  <button onClick={() => setSelectedProject(null)} className="text-stardust hover:text-neon-red transition-colors pulse-red font-mono uppercase text-xs tracking-widest">
                    [ X_Close ]
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth">
                {selectedProject.details.map((detail: any, idx: number) => (
                  <div key={idx} className="min-h-[85vh] w-full sticky top-0 flex flex-col md:flex-row bg-[#03060D] border-b border-white/5 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                    
                    {/* LAG FIX: Solid color background instead of backdrop-blur-2xl */}
                    <div className="w-full md:w-[35%] lg:w-[30%] p-10 md:p-14 flex flex-col justify-center bg-[#010308] z-20 border-r border-white/5 shadow-xl">
                      <p className={`font-roboto text-[10px] tracking-[0.4em] uppercase ${selectedProject.styles.text} mb-4 ${selectedProject.styles.pulse}`}>
                        0{idx + 1}_Segment
                      </p>
                      <h3 className="text-3xl md:text-4xl font-inter font-light text-starlight leading-tight mb-6">
                        {detail.subtitle}
                      </h3>
                      <p className="text-stardust font-light text-lg leading-relaxed">
                        {detail.content}
                      </p>
                    </div>

                    <div className="w-full md:w-[65%] lg:w-[70%] h-[40vh] md:min-h-[85vh] relative overflow-hidden z-10 bg-[#03060D]">
                      <div className="absolute inset-0 p-8 md:p-16 flex items-center justify-center z-30">
                        {detail.image ? (
                          <img 
                            src={detail.image} 
                            alt={detail.subtitle} 
                            className="max-w-full max-h-full object-contain opacity-95 drop-shadow-[0_0_25px_rgba(0,240,255,0.3)]" 
                          />
                        ) : (
                          <div className={`absolute inset-0 bg-gradient-to-br ${detail.gradient} opacity-40 z-10`}></div>
                        )}
                      </div>

                      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40 z-40"></div>
                      <div className="absolute inset-0 grain-overlay opacity-20 pointer-events-none z-40"></div>
                      <div className="absolute inset-4 border border-white/5 rounded-xl pointer-events-none z-50"></div>
                      
                      <div className="absolute bottom-6 right-6 font-mono text-[8px] tracking-[0.3em] text-white/30 uppercase z-50">
                        {detail.image ? `SYS.IMG.0${idx + 1}` : `SYS.DAT.0${idx + 1}`}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}