"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// The Mock Database (We will replace this with your automated Python pipeline later)
const mockProjects = [
  {
    id: 1,
    title: "Well-being Kaizen Outcome Analysis",
    category: "HR Analytics",
    summary: "Analyzed outcomes of a problem-solving training initiative to improve future learning activities, ensuring all participants successfully graduated.",
    techStack: ["Python", "Jupyter", "Pandas"],
  },
  {
    id: 2,
    title: "Automated File Decryption Pipeline",
    category: "Automation",
    summary: "Engineered a Python script to bypass department file encryption by automating the extraction and resaving process of secure documents.",
    techStack: ["Python", "Automation"],
  },
  {
    id: 3,
    title: "HR Monthly Report Dashboard",
    category: "BI & Dashboards",
    summary: "Designed and simplified an interactive dashboard for monthly HR reporting, ensuring complex workforce metrics are easily digestible.",
    techStack: ["SQL", "Metabase", "Data Viz"],
  },
  {
    id: 4,
    title: "Dynamic QR Code Generator",
    category: "Automation",
    summary: "Built a Python-based utility to generate custom QR codes, featuring automated logo embedding and background removal.",
    techStack: ["Python", "Image Processing"],
  }
];

const categories = ["All", "HR Analytics", "Data Science", "BI & Dashboards", "Automation"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = mockProjects.filter(
    (project) => activeFilter === "All" || project.category === activeFilter
  );

  return (
    <div className="min-h-[85vh] py-8">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
          Data & <span className="font-semibold text-water">Analytics.</span>
        </h1>
        <p className="text-lg text-ocean/70 font-light max-w-2xl">
          A collection of projects spanning business intelligence, automated workflows, and human-centric data analysis.
        </p>
      </motion.div>

      {/* Interactive Filter System */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-wrap gap-3 mb-12"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === category
                ? "bg-ocean text-white shadow-md"
                : "bg-white border border-mist text-ocean/70 hover:border-water hover:text-water"
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* The Project Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white p-8 rounded-2xl border border-mist shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden flex flex-col h-full"
            >
              {/* Subtle top border accent on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-water to-ocean transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
              
              <span className="text-xs font-semibold text-water uppercase tracking-wider mb-2 block">
                {project.category}
              </span>
              <h3 className="text-2xl font-semibold mb-3 text-ocean">
                {project.title}
              </h3>
              <p className="text-ocean/70 font-light leading-relaxed mb-8 flex-grow">
                {project.summary}
              </p>
              
              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="text-xs font-medium px-3 py-1 bg-cloud border border-mist rounded-md text-ocean/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

    </div>
  );
}