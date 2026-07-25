import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { PROJECTS_DATA, USER_INFO } from '../data/portfolioData';
import { playPaperRustle, playStampClick } from '../utils/audioSynth';
import ProjectModal from './ProjectModal';
import AnimatedSection from './AnimatedSection';
import { ExternalLink, Folder, Sparkles, Eye, ShieldAlert } from 'lucide-react';

const CATEGORIES = [
  'All', 
  'Typography Art', 
  'Cinematic Poster Art', 
  'Editorial Magazine', 
  'Sports & Halftone Art'
];

/* SPIDER-WEB SVG CORNER GRAPHICS */
function SpiderWebTopLeft() {
  return (
    <svg 
      className="absolute top-0 left-0 w-36 sm:w-64 h-36 sm:h-64 pointer-events-none opacity-40 z-0 text-[var(--ink)]" 
      viewBox="0 0 200 200" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.2"
    >
      <path d="M0 0 L200 0 M0 0 L0 200 M0 0 L200 200 M0 0 L150 200 M0 0 L200 150 M0 0 L80 200 M0 0 L200 80" />
      <path d="M30 0 Q 30 30 0 30 M60 0 Q 60 60 0 60 M100 0 Q 100 100 0 100 M140 0 Q 140 140 0 140 M180 0 Q 180 180 0 180" />
      <path d="M45 0 Q 45 45 0 45 M80 0 Q 80 80 0 80 M120 0 Q 120 120 0 120 M160 0 Q 160 160 0 160" strokeDasharray="3 3" />
    </svg>
  );
}

function SpiderWebTopRight() {
  return (
    <svg 
      className="absolute top-0 right-0 w-36 sm:w-64 h-36 sm:h-64 pointer-events-none opacity-40 z-0 text-[var(--ink)] scale-x-[-1]" 
      viewBox="0 0 200 200" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.2"
    >
      <path d="M0 0 L200 0 M0 0 L0 200 M0 0 L200 200 M0 0 L150 200 M0 0 L200 150 M0 0 L80 200 M0 0 L200 80" />
      <path d="M30 0 Q 30 30 0 30 M60 0 Q 60 60 0 60 M100 0 Q 100 100 0 100 M140 0 Q 140 140 0 140 M180 0 Q 180 180 0 180" />
    </svg>
  );
}

function SpiderWebBottomLeft() {
  return (
    <svg 
      className="absolute bottom-0 left-0 w-36 sm:w-64 h-36 sm:h-64 pointer-events-none opacity-35 z-0 text-[var(--ink)] scale-y-[-1]" 
      viewBox="0 0 200 200" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.2"
    >
      <path d="M0 0 L200 0 M0 0 L0 200 M0 0 L200 200 M0 0 L150 200 M0 0 L200 150" />
      <path d="M30 0 Q 30 30 0 30 M60 0 Q 60 60 0 60 M100 0 Q 100 100 0 100 M140 0 Q 140 140 0 140" />
    </svg>
  );
}

function SpiderWebBottomRight() {
  return (
    <svg 
      className="absolute bottom-0 right-0 w-36 sm:w-64 h-36 sm:h-64 pointer-events-none opacity-35 z-0 text-[var(--ink)] scale-x-[-1] scale-y-[-1]" 
      viewBox="0 0 200 200" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.2"
    >
      <path d="M0 0 L200 0 M0 0 L0 200 M0 0 L200 200 M0 0 L150 200 M0 0 L200 150" />
      <path d="M30 0 Q 30 30 0 30 M60 0 Q 60 60 0 60 M100 0 Q 100 100 0 100 M140 0 Q 140 140 0 140" />
    </svg>
  );
}

/* 3D PARALLAX TILT PROJECT CARD COMPONENT WITH SPIDEY ACCENTS */
function ProjectCard({ project, idx, theme, onClick }) {
  const cardRef = useRef(null);

  // Mouse position within card bounds for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tilt
  const springConfig = { stiffness: 250, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);
  const shineOpacity = useSpring(useTransform(y, [-0.5, 0.5], [0.1, 0.45]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isSpideyCard = project.id === 'spidey-no-fear' || project.title.toLowerCase().includes('fear');
  const cardBg = theme === 'dark' ? '#22201c' : theme === 'blueprint' ? '#102e5c' : '#ffffff';
  const textColor = theme === 'dark' || theme === 'blueprint' ? '#ffffff' : '#2b2620';

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9, rotate: idx % 2 === 0 ? -3 : 3 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: idx % 2 === 0 ? -1 : 1 }}
      viewport={{ once: true, amount: 0.15 }}
      exit={{ opacity: 0, scale: 0.85, y: 30 }}
      transition={{ 
        duration: 0.55, 
        delay: idx * 0.1,
        ease: [0.22, 1, 0.36, 1] 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03, zIndex: 30 }}
      onHoverStart={playPaperRustle}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        backgroundColor: cardBg,
        color: textColor
      }}
      className={`frame relative p-4 sm:p-5 pb-10 sm:pb-12 shadow-2xl border-3 border-[var(--ink)] cursor-pointer rounded-sm group transition-shadow duration-300 w-full max-w-full ${
        isSpideyCard ? 'ring-4 ring-[var(--red)]/60 shadow-[0_0_25px_rgba(194,42,31,0.25)]' : ''
      }`}
    >
      {/* Spider-Man Web Overlay Tape Accent */}
      <motion.div 
        whileHover={{ rotate: 5, scale: 1.1 }}
        className="tape top-[-12px] left-1/2 -ml-8 w-20 h-6 -rotate-3 z-20 pointer-events-none" 
      />

      {/* Spider-Man Badge on Spidey Poster */}
      {isSpideyCard && (
        <span className="absolute top-[-10px] right-3 z-30 font-kalam font-bold text-[10px] sm:text-xs bg-[var(--red)] text-white px-2.5 py-0.5 rounded shadow-lg border border-white/40 flex items-center gap-1">
          🕷️ SPIDEY CINEMATIC SELECTION
        </span>
      )}

      {/* Frame Image Container */}
      <div 
        style={{ transform: 'translateZ(20px)' }}
        className="relative aspect-3/4 bg-stone-900 border-2 border-[var(--ink)]/40 overflow-hidden flex items-center justify-center rounded-sm shadow-inner group w-full"
      >
        {/* Poster Image */}
        <img 
          src={project.images[0]} 
          alt={project.title} 
          className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-108 group-hover:brightness-105"
        />

        {/* Shimmer Light Reflection Sweep */}
        <motion.div 
          style={{ opacity: shineOpacity }}
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent pointer-events-none -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
        />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-3 text-center gap-2 backdrop-blur-[1px]">
          <span className="font-kalam font-bold text-xs sm:text-sm bg-[var(--yellow)] text-[#2b2620] px-3.5 py-1.5 border-2 border-[var(--ink)] rounded-md shadow-lg -rotate-2 flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-[var(--red)]" /> Inspect Artwork 🕷️
          </span>
          <span className="text-[11px] text-white/90 font-mono-code font-semibold">
            Click for full resolution &amp; Drive
          </span>
        </div>

        {/* Frame Number Tag */}
        <span 
          style={{ transform: 'translateZ(30px)' }}
          className="frame-num absolute top-2.5 left-2.5 font-kalam font-bold text-[11px] sm:text-xs text-[var(--ink)] bg-[var(--paper)]/95 border-2 border-[var(--ink)] px-2 py-0.5 rounded shadow-md"
        >
          {project.number}
        </span>
      </div>

      {/* Frame Title & Category Metadata */}
      <div style={{ transform: 'translateZ(15px)' }} className="mt-3.5">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[var(--red)] animate-ping shrink-0" />
          <span className="frame-cat block font-sans font-extrabold text-[10px] sm:text-xs tracking-widest uppercase text-[var(--red)]">
            {project.category}
          </span>
        </div>

        <span 
          style={{ color: textColor }}
          className="frame-name block font-kalam font-bold text-lg sm:text-2xl mt-0.5 leading-snug group-hover:text-[var(--red)] transition-colors"
        >
          {project.title}
        </span>
      </div>
    </motion.div>
  );
}

export default function WorkGallery({ theme }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = selectedCategory === 'All' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === selectedCategory);

  const cardBg = theme === 'dark' ? '#22201c' : theme === 'blueprint' ? '#102e5c' : '#ffffff';
  const textColor = theme === 'dark' || theme === 'blueprint' ? '#ffffff' : '#2b2620';
  const textSoftColor = theme === 'dark' ? '#e3ded5' : theme === 'blueprint' ? '#c2e0ff' : '#4a423a';

  return (
    <section className="relative py-16 sm:py-24 px-3 sm:px-4 bg-graph-paper border-t-8 border-b-8 border-[var(--craft-b)] overflow-hidden max-w-full" id="work">
      
      {/* SPIDER-MAN THEME CORNER WEBS & SPIDER EMBLEM WATERMARK */}
      <SpiderWebTopLeft />
      <SpiderWebTopRight />
      <SpiderWebBottomLeft />
      <SpiderWebBottomRight />

      {/* Spider Emblem Watermark Background Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] pointer-events-none opacity-5 z-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[var(--red)] fill-current">
          <path d="M50 20 C45 35 25 35 15 25 C25 40 40 45 45 50 C40 60 20 70 10 85 C25 75 40 65 48 55 L50 65 L52 55 C60 65 75 75 90 85 C80 70 60 60 55 50 C60 45 75 40 85 25 C75 35 55 35 50 20 Z" />
        </svg>
      </div>

      {/* Decorative Outer Border */}
      <div className="absolute inset-0 shadow-[inset_0_0_0_12px_rgba(230,214,179,0.35)] sm:shadow-[inset_0_0_0_20px_rgba(230,214,179,0.35)] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        
        {/* Gallery Header with AnimatedSection */}
        <AnimatedSection direction="up">
          <div className="mb-8 sm:mb-12">
            <div 
              style={{ color: textSoftColor }}
              className="inline-flex items-center gap-2 font-sans font-extrabold text-[10px] sm:text-xs tracking-widest uppercase border-2 border-dashed border-[var(--red)] px-3 py-1.5 -rotate-1 bg-[var(--paper)] text-[var(--red)] shadow-md"
            >
              🕷️ SPIDEY-SENSE ARTWORK SHOWCASE ★ LOG_01
            </div>
            
            <h2 
              style={{ color: textColor }}
              className="font-caveat font-bold text-5xl sm:text-8xl md:text-9xl mt-3 sm:mt-4 leading-none relative inline-block"
            >
              WORK <span className="text-[var(--red)]">GALLERY 🕷️</span>
            </h2>
            
            <svg className="w-56 sm:w-96 mt-1 block" viewBox="0 0 340 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 20 C 80 4, 140 36, 210 16 S 320 4, 336 22" stroke="var(--red)" strokeWidth="5" strokeLinecap="round" fill="none"/>
            </svg>

            <p 
              style={{ color: textSoftColor }}
              className="font-sans text-xs sm:text-base max-w-lg mt-3 sm:mt-4 leading-relaxed"
            >
              A showcase of typography posters, editorial magazine covers, Spider-Man cinematic art, and visual graphic design — crafted in Photoshop &amp; Illustrator.
            </p>
          </div>
        </AnimatedSection>

        {/* Category Filters (Horizontal Touch Scroll on Mobile) */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-nowrap sm:flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedCategory(cat);
                    playStampClick();
                  }}
                  className={`font-kalam font-bold text-xs sm:text-sm px-3.5 py-1.5 sm:px-4 sm:py-2 border-2 border-[var(--ink)] rounded whitespace-nowrap shrink-0 transition-all duration-200 ${
                    active 
                      ? 'bg-[var(--red)] text-white -rotate-1 scale-105 shadow-lg border-[var(--ink)]' 
                      : 'bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--craft)] rotate-0'
                  }`}
                >
                  {cat === 'Cinematic Poster Art' ? '🕸️ Cinematic Poster Art' : cat}
                </motion.button>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto gap-6 sm:gap-12 perspective-1000 relative"
        >
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                idx={idx}
                theme={theme}
                onClick={() => {
                  playStampClick();
                  setSelectedProject(project);
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Google Drive Link Showcase Box */}
        <AnimatedSection delay={0.2} direction="scale">
          <div 
            style={{ backgroundColor: cardBg, color: textColor }}
            className="mt-12 sm:mt-16 border-3 sm:border-4 border-[var(--ink)] p-6 sm:p-8 rounded-lg shadow-xl text-center max-w-3xl mx-auto relative -rotate-1"
          >
            <span className="tape top-[-14px] left-1/2 -ml-12 w-24 h-6 -rotate-2" />
            <h3 
              style={{ color: textColor }}
              className="font-marker text-2xl sm:text-4xl"
            >
              Explore My Full Graphic Design Drive Folder 📁
            </h3>
            <p 
              style={{ color: textSoftColor }}
              className="font-sans text-xs sm:text-sm mt-2 max-w-md mx-auto"
            >
              Check out all raw posters, typography experiments, Spider-Man art, and high-res graphic exports.
            </p>
            <div className="mt-5 sm:mt-6">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={USER_INFO.driveFolderUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playStampClick}
                className="stamp-btn inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-[var(--yellow)] text-[#2b2620] hover:bg-[var(--ink)] hover:text-white shadow-lg text-xs sm:text-base w-full sm:w-auto"
              >
                <Folder className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--red)]" />
                Open Google Drive Folder 🕷️
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" />
              </motion.a>
            </div>
          </div>
        </AnimatedSection>

      </div>

      {/* Project Details Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        theme={theme}
      />
    </section>
  );
}
