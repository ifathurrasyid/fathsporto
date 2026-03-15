"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const mockProjects = [
  {
    id: 1, title: "Well-being Kaizen Outcome Analysis", category: "HR Analytics", accent: "neon-orange",
    summary: "Analyzed outcomes of a problem-solving training initiative to improve future learning activities, ensuring all participants successfully graduated.",
    techStack: ["Python", "Jupyter", "Pandas"],
  },
  {
    id: 2, title: "Automated File Decryption Pipeline", category: "Automation", accent: "neon-red",
    summary: "Engineered a Python script to bypass department file encryption by automating the extraction and resaving process of secure documents.",
    techStack: ["Python", "Automation"],
  },
  {
    id: 3, title: "HR Monthly Report Dashboard", category: "BI & Dashboards", accent: "cyan",
    summary: "Designed and simplified an interactive dashboard for monthly HR reporting, ensuring complex workforce metrics are easily digestible.",
    techStack: ["SQL", "Metabase", "Data Viz"],
  },
  {
    id: 4, title: "Dynamic QR Code Generator", category: "Automation", accent: "neon-yellow",
    summary: "Built a Python-based utility to generate custom QR codes, featuring automated logo embedding and background removal.",
    techStack: ["Python", "Image Processing"],
  }
];

const categories = ["All", "HR Analytics", "BI & Dashboards", "Automation"];

const extremeCrash: Variants = {
  hidden: { opacity: 0, x: -30, filter: "brightness(2) hue-rotate(90deg) blur(10px) drop-shadow(-10px 0 red) drop-shadow(10px 0 blue)" },
  visible: {
    opacity: [0, 1, 0.2, 1],
    x: [-30, 15, -5, 0],
    filter: [
      "brightness(2) hue-rotate(90deg) blur(10px) drop-shadow(-10px 0 red) drop-shadow(10px 0 blue)",
      "brightness(1.5) hue-rotate(-90deg) blur(4px) drop-shadow(5px 0 red) drop-shadow(-5px 0 cyan)",
      "brightness(0.5) blur(2px)",
      "brightness(1) hue-rotate(0deg) blur(0px) drop-shadow(0px 0 transparent)"
    ],
    transition: { duration: 0.7, times: [0, 0.4, 0.7, 1], ease: "anticipate" }
  }
};

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filteredProjects = mockProjects.filter(p => activeFilter === "All" || p.category === activeFilter);

  return (
    <div className="flex flex-col w-full selection:bg-neon-red/40 selection:text-white relative overflow-x-hidden">
      <div className="grain-overlay"></div>
      
      {/* SECTION 1: HERO */}
      <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 max-w-5xl mx-auto w-full relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/10 rounded-full blur-[120px] pointer-events-none animate-neon-breath"></div>

        <motion.div initial="hidden" animate="visible" variants={extremeCrash} className="max-w-4xl flex flex-col items-center space-y-6 relative z-10">
          
          <div className="flex items-center gap-3 mb-2 relative overflow-hidden">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan"></span>
            </span>
            <span className="block font-roboto text-[10px] tracking-[0.3em] uppercase text-cyan pulse-cyan">
              Open for Opportunities
            </span>
          </div>

          <span className="pulse-white inline-block">
            <h1 className="text-5xl md:text-[5.5rem] leading-none font-roboto font-bold tracking-tighter text-starlight uppercase animate-pull-glitch">
              FATHURRASYID IBRAHIM
            </h1>
          </span>
          
          <div className="relative mt-6">
            <p className="text-lg md:text-xl text-stardust leading-relaxed font-light max-w-2xl mx-auto block">
              I translate the complexity of business and people into clarity—through data, through analysis, and through the quiet art of asking the right questions.
            </p>
          </div>
          
          <div className="pt-10">
            <Link href="#work" className="relative group/leet overflow-hidden inline-block border border-cyan/50 bg-abyss text-cyan px-8 py-4 rounded-sm text-xs font-roboto tracking-[0.2em] uppercase hover:scale-105 active:scale-95 transition-all duration-300 pulse-cyan">
              <span className="block group-hover/leet:opacity-0 transition-opacity duration-150">[ Execute Portfolio ]</span>
              <span className="absolute inset-0 flex items-center justify-center text-abyss bg-cyan opacity-0 group-hover/leet:opacity-100 transition-opacity duration-150 font-bold">
                [ 3X3CU73 P0R7F0L10 ]
              </span>
            </Link>
          </div>
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
              {/* Dual Effect Wrapper for Red Text */}
              <span className="inline-block pulse-red">
                <span className="text-neon-red font-bold animate-pull-glitch block">behind the data</span>
              </span>
            </h2>
            
            <div className="space-y-6 text-stardust font-light leading-relaxed">
              <p>
                I am a <strong className="font-medium text-starlight pulse-white">Data Analyst</strong> with a foundation in Human Resources. I believe that behind every raw data point is a process, a friction point, or a story worth understanding.
              </p>
              <p>
                My work lives at the intersection of complex analytics and actual human strategy. Whether I am building automated Python pipelines or simplifying workforce metrics into Metabase dashboards, my goal is always to turn complexity into decisions that make sense.
              </p>
              <p className="italic font-inter text-starlight/60">Based in Subang. Translating data worldwide.</p>
            </div>
          </motion.div>

          {/* Photo Container */}
          {/* THE CYBERPUNK PORTRAIT CONTAINER */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-50px" }} variants={extremeCrash} className="aspect-[3/4] bg-abyss/40 backdrop-blur-md border border-white/5 rounded-[2rem] flex items-center justify-center relative overflow-hidden group shadow-[inset_0_0_40px_rgba(255,0,60,0.05)] hover:shadow-[0_0_40px_rgba(255,0,60,0.15)] transition-all duration-700">
            
            {/* 1. The Image: Zooms in physically (scale-110) and restores full color on hover */}
            <Image 
              src="/fath_portrait.png" 
              alt="Fathurrasyid Ibrahim" 
              fill 
              className="object-cover opacity-60 grayscale contrast-125 group-hover:opacity-100 group-hover:grayscale-0 group-hover:contrast-100 transform scale-100 group-hover:scale-150 transition-all duration-700 ease-out z-0" 
            />

            {/* 2. Cyberpunk Color Wash: Cyan/Red security-cam tint that fades out on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan/30 to-neon-red/30 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700 z-10 pointer-events-none"></div>

            {/* 3. High-Density Localized Picture Grain */}
            <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none z-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}></div>

            {/* 4. Tactical CRT Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] z-10 pointer-events-none opacity-60 group-hover:opacity-20 transition-opacity duration-700"></div>

            {/* 5. Inner Glowing Neon Border: Pulses, and shrinks inward slightly on hover for a 3D effect */}
            <div className="absolute inset-4 border border-neon-red/20 rounded-2xl z-20 pointer-events-none transition-all duration-700 group-hover:border-neon-red/80 group-hover:shadow-[0_0_40px_rgba(255,0,60,0.5)_inset] group-hover:scale-95 animate-neon-breath" style={{ animationDelay: '2s' }}></div>
            
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
              {/* Dual Effect Wrapper for Orange Text */}
              <span className="inline-block pulse-orange">
                <span className="font-bold text-neon-orange animate-pull-glitch block">Analytics</span>
              </span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={extremeCrash} className="flex flex-wrap gap-3 mb-12 max-w-5xl mx-auto">
            {categories.map((category) => (
              <button key={category} onClick={() => setActiveFilter(category)} className={`px-5 py-2.5 rounded-full font-roboto text-[10px] uppercase tracking-widest transition-all duration-300 border hover:scale-105 active:scale-95 pulse-orange ${activeFilter === category ? "bg-neon-orange/10 border-neon-orange text-neon-orange drop-shadow-[0_0_12px_rgba(255,102,0,0.8)]" : "bg-transparent border-white/10 text-stardust hover:border-neon-orange/50 hover:text-neon-orange"}`}>
                {category}
              </button>
            ))}
          </motion.div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div key={project.id} layout initial="hidden" whileInView="visible" viewport={{ once: false }} variants={extremeCrash} exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)", transition: { duration: 0.3 } }} className={`bg-abyss/30 backdrop-blur-md p-10 rounded-3xl border border-white/5 hover:border-${project.accent}/50 hover:bg-glass hover:shadow-[0_0_30px_var(--color-${project.accent})_inset] hover:scale-[1.04] hover:z-20 transition-all duration-500 group relative flex flex-col h-full text-left overflow-hidden cursor-pointer`}>
                  <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-${project.accent} to-transparent transform origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out`}></div>
                  
                  <span className={`font-roboto text-[10px] text-${project.accent} uppercase tracking-widest mb-4 block pulse-${project.accent.replace('neon-', '')}`}>{project.category}</span>
                  
                  <h3 className="text-3xl font-inter font-semibold text-starlight mb-4 group-hover:animate-micro-glitch">{project.title}</h3>

                  <p className="text-stardust font-light leading-relaxed mb-10 flex-grow text-lg">{project.summary}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="font-roboto text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-stardust">{tech}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
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
              {/* Dual Effect Wrapper for Yellow Text */}
              <span className="inline-block pulse-yellow">
                <span className="font-bold text-neon-yellow animate-pull-glitch block">data make sense.</span>
              </span>
            </h2>
            
            <p className="text-stardust font-light mb-10 max-w-md">
              Currently open for new opportunities. Whether you need a complex pipeline built or a dashboard simplified, I'm ready to help.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <a href="/cv-ats.pdf" target="_blank" className="relative group/leet overflow-hidden bg-neon-yellow text-abyss px-6 py-4 rounded-full font-roboto text-xs uppercase tracking-[0.2em] font-bold hover:scale-105 active:scale-95 transition-all duration-300 pulse-yellow">
                <span className="block group-hover/leet:opacity-0 transition-opacity duration-150">[ Get CV_ATS ]</span>
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/leet:opacity-100 transition-opacity duration-150 text-neon-red bg-white">[ G37 CV_47S ]</span>
              </a>
              <a href="/cv-visual.pdf" target="_blank" className="relative group/leet overflow-hidden border border-white/10 text-neon-yellow px-6 py-4 rounded-full font-roboto text-xs uppercase tracking-[0.2em] font-bold hover:scale-105 active:scale-95 hover:bg-white/5 hover:border-neon-yellow/50 transition-all duration-300 pulse-yellow">
                <span className="block group-hover/leet:opacity-0 transition-opacity duration-150">[ Get CV_Visual ]</span>
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/leet:opacity-100 transition-opacity duration-150 text-neon-yellow bg-abyss border border-neon-yellow">[ G37 CV_V15U4L ]</span>
              </a>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: false }} variants={extremeCrash} className="flex flex-col gap-6 md:pl-16">
            <a href="mailto:ifathurra@gmail.com" className="relative group/leet overflow-hidden font-roboto text-lg font-light text-stardust hover:text-neon-yellow border-b border-white/5 pb-4 flex justify-between transition-all duration-300 group hover:pl-2 pulse-yellow">
              <span className="block group-hover/leet:opacity-0 transition-opacity duration-150">Email</span>
              <span className="absolute top-0 left-0 font-bold opacity-0 group-hover/leet:opacity-100 transition-opacity duration-150 text-neon-yellow">3M41L</span>
              <span className="text-neon-yellow transform group-hover:translate-x-2 transition-transform duration-300">→</span>
            </a>
            <a href="https://linkedin.com/in/ifathurrasyid" target="_blank" className="relative group/leet overflow-hidden font-roboto text-lg font-light text-stardust hover:text-neon-yellow border-b border-white/5 pb-4 flex justify-between transition-all duration-300 group hover:pl-2 pulse-yellow">
              <span className="block group-hover/leet:opacity-0 transition-opacity duration-150">LinkedIn</span>
              <span className="absolute top-0 left-0 font-bold opacity-0 group-hover/leet:opacity-100 transition-opacity duration-150 text-neon-yellow">L1NK3D1N</span>
              <span className="text-neon-yellow transform group-hover:translate-x-2 transition-transform duration-300">→</span>
            </a>
            <a href="https://www.instagram.com/ifathurrasyid/" target="_blank" className="relative group/leet overflow-hidden font-roboto text-lg font-light text-stardust hover:text-neon-yellow border-b border-white/5 pb-4 flex justify-between transition-all duration-300 group hover:pl-2 pulse-yellow">
              <span className="block group-hover/leet:opacity-0 transition-opacity duration-150">Instagram</span>
              <span className="absolute top-0 left-0 font-bold opacity-0 group-hover/leet:opacity-100 transition-opacity duration-150 text-neon-yellow">1N574GR4M</span>
              <span className="text-neon-yellow transform group-hover:translate-x-2 transition-transform duration-300">→</span>
            </a>
            <a href="https://wa.me/6285117171327" target="_blank" className="font-roboto text-lg font-light text-stardust border-b border-white/5 pb-4 flex justify-between transition-all duration-300 group hover:text-neon-yellow hover:pl-2 pulse-yellow">
              +62 851-1717-1327 <span className="text-neon-yellow opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-300">→</span>
            </a>
          </motion.div>
        </div>
        
        <div className="max-w-5xl mx-auto px-6 mt-24 pt-8 flex flex-col md:flex-row justify-between items-center font-roboto text-[9px] tracking-widest text-stardust uppercase relative z-10">
          <p>© 2026 Fathurrasyid Ibrahim.</p>
          <p className="text-neon-yellow/60 pulse-yellow">System Online</p>
        </div>
      </section>

    </div>
  );
}