import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { RefreshCw, Lightbulb, ArrowDown, FileText, Folder, Sparkles, Zap, SunMedium } from 'lucide-react';
import { playPaperRustle, playStampClick, playPop } from '../utils/audioSynth';
import { USER_INFO } from '../data/portfolioData';

export default function HeroDesk({ isLoaded = true, onOpenSketchpad, onOpenResume }) {
  const [lampOn, setLampOn] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  // Mouse Parallax Coordinates (-1 to 1)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);

  const handleMouseMove = (e) => {
    if (rafRef.current) return;

    const { innerWidth, innerHeight } = window;
    const clientX = e.clientX;
    const clientY = e.clientY;

    rafRef.current = requestAnimationFrame(() => {
      const x = (clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (clientY - innerHeight / 2) / (innerHeight / 2);
      setMousePos({ x, y });
      rafRef.current = null;
    });
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Smooth Springs for Mouse Parallax
  const springConfig = { stiffness: 90, damping: 22 };
  const parallaxX = useSpring(mousePos.x * 18, springConfig);
  const parallaxY = useSpring(mousePos.y * 18, springConfig);
  const rotateX = useSpring(mousePos.y * -5, springConfig);
  const rotateY = useSpring(mousePos.x * 5, springConfig);

  // Scroll Parallax Transforms
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.94]);
  const heroOpacity = useTransform(scrollY, [0, 350], [1, 0.35]);
  const titleY = useTransform(scrollY, [0, 400], [0, 80]);

  const handleReset = () => {
    setResetKey(prev => prev + 1);
    playPop();
  };

  const toggleLamp = () => {
    playStampClick();
    setLampOn(!lampOn);
  };

  // Title letters for staggered stamp animation
  const titleLetters = "PORTFOLIO".split("");

  // Design Tokens Floating in Background
  const floatingTokens = ['⌘Z', 'Ps', 'Ai', '72dpi', 'Px', 'Pt', 'Aa', '✎'];

  return (
    <header 
      onMouseMove={handleMouseMove}
      className={`relative min-h-[92vh] py-12 sm:py-16 px-3 sm:px-4 bg-desk-wood overflow-hidden select-none border-b-8 border-[var(--craft-b)] perspective-1000 max-w-full transition-all duration-700 ${
        lampOn ? 'brightness-100 contrast-100' : 'brightness-50 contrast-125 bg-stone-950'
      }`} 
      id="home"
    >
      
      {/* REAL STUDIO DESK LAMP SPOTLIGHT CONE */}
      <motion.div 
        style={{
          x: useTransform(parallaxX, (v) => v * -0.6),
          y: useTransform(parallaxY, (v) => v * -0.6)
        }}
        className={`absolute -top-[15%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[1400px] h-[700px] sm:h-[1400px] pointer-events-none transition-all duration-700 z-10 will-change-transform transform-gpu ${
          lampOn ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        {/* Light Cone Ray Beam */}
        <div className="w-full h-full rounded-full bg-[radial-gradient(ellipse_at_top,rgba(255,245,215,0.42)_0%,rgba(255,225,160,0.18)_35%,rgba(255,200,100,0.05)_60%,transparent_80%)] blur-md" />
      </motion.div>

      {/* PHYSICAL DESK LAMP FIXTURE & LED BULB */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center">
        {/* Metal Lamp Arm */}
        <div className="w-3 sm:w-4 h-8 sm:h-12 bg-gradient-to-b from-stone-800 to-stone-600 rounded-b shadow-md border-x border-stone-500" />
        {/* Lamp Shade Dome */}
        <div className="relative w-28 sm:w-44 h-10 sm:h-14 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 rounded-t-full border-t-2 border-amber-400/40 shadow-2xl flex items-end justify-center pb-1">
          {/* LED Glowing Bulb */}
          <div 
            className={`w-12 sm:w-20 h-3 sm:h-5 rounded-full transition-all duration-500 ${
              lampOn 
                ? 'bg-amber-100 shadow-[0_0_35px_12px_rgba(255,230,150,0.95)]' 
                : 'bg-stone-700 shadow-none border border-stone-600'
            }`} 
          />
        </div>
      </div>

      {/* Floating Design Tokens Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-40">
        {floatingTokens.map((token, i) => (
          <motion.div
            key={i}
            className="absolute font-mono-code font-bold text-xs sm:text-sm text-[var(--yellow)]/80 select-none will-change-transform transform-gpu"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i * 9)}%`
            }}
            animate={{
              y: [0, -35, 0],
              x: [0, (i % 2 === 0 ? 15 : -15), 0],
              opacity: lampOn ? [0.3, 0.8, 0.3] : [0.1, 0.4, 0.1]
            }}
            transition={{
              duration: 5 + (i * 0.7),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2
            }}
          >
            {token}
          </motion.div>
        ))}
      </div>

      {/* DESK CONTROL BAR WITH WORKING DESK LAMP BUTTON */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ delay: 0.1 }}
        className="absolute top-4 sm:top-6 right-3 sm:right-6 z-40 flex items-center gap-2 sm:gap-3 bg-[var(--paper)]/95 backdrop-blur-md border-2 border-[var(--ink)] p-1.5 sm:p-2 rounded-lg shadow-xl"
      >
        {/* DESK LAMP ON/OFF TOGGLE BUTTON */}
        <button
          onClick={toggleLamp}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-bold font-kalam rounded border-2 border-[var(--ink)] transition-all duration-300 shadow-md ${
            lampOn 
              ? 'bg-[var(--yellow)] text-[#2b2620] shadow-[0_0_15px_rgba(242,217,78,0.6)] scale-105' 
              : 'bg-stone-800 text-amber-300 border-amber-500/50 hover:bg-stone-700'
          }`}
          title="Toggle Studio Desk Lamp Spotlight"
        >
          <Lightbulb className={`w-4 h-4 ${lampOn ? 'text-[var(--red)] animate-pulse' : 'text-amber-400'}`} />
          <span className="font-bold">
            {lampOn ? 'Lamp: ON 💡' : 'Lamp: OFF 🌙'}
          </span>
        </button>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-bold font-kalam border-2 border-[var(--ink)] rounded bg-[var(--craft)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors text-[var(--ink)]"
          title="Reset dragged sticky notes back to position"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Desk</span>
          <span className="sm:hidden">Reset</span>
        </button>
      </motion.div>

      {/* 3D PARALLAX BACKGROUND SHEETS */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
        animate={isLoaded ? { opacity: 1, scale: 1, rotate: -1 } : { opacity: 0, scale: 0.85, rotate: -6 }}
        transition={{ duration: 0.7, type: 'spring', damping: 18 }}
        style={{
          rotateX,
          rotateY,
          x: useTransform(parallaxX, (v) => v * 0.4),
          y: useTransform(parallaxY, (v) => v * 0.4)
        }}
        className="absolute w-[94%] sm:w-[86%] max-w-[1020px] h-[86%] sm:h-[80%] top-[7%] sm:top-[10%] left-1/2 -translate-x-1/2 bg-craft-paper shadow-2xl rounded-sm pointer-events-none border border-[var(--craft-b)] will-change-transform transform-gpu" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.85, rotate: 6 }}
        animate={isLoaded ? { opacity: 1, scale: 1, rotate: 1 } : { opacity: 0, scale: 0.85, rotate: 6 }}
        transition={{ duration: 0.7, delay: 0.1, type: 'spring', damping: 18 }}
        style={{
          rotateX,
          rotateY,
          x: useTransform(parallaxX, (v) => v * 0.7),
          y: useTransform(parallaxY, (v) => v * 0.7)
        }}
        className="absolute w-[88%] sm:w-[76%] max-w-[880px] h-[78%] sm:h-[68%] top-[11%] sm:top-[16%] left-1/2 -translate-x-1/2 bg-graph-paper opacity-95 shadow-xl rounded-sm pointer-events-none border border-[var(--grid)] will-change-transform transform-gpu" 
      />

      {/* MAIN DESK CONTENT LAYER WITH SCROLL & MOUSE PARALLAX */}
      <motion.div 
        style={{ 
          scale: heroScale,
          opacity: heroOpacity,
          x: parallaxX,
          y: parallaxY
        }}
        className="relative z-10 max-w-[1240px] mx-auto min-h-[74vh] flex flex-col items-center justify-center text-center px-2 will-change-transform transform-gpu"
      >
        
        {/* RESPONSIVE TITLE STAMP */}
        <motion.div 
          style={{ y: titleY }}
          className="relative font-marker text-3.5xl xs:text-5xl sm:text-7xl md:text-9xl text-[var(--ink)] tracking-tight leading-none drop-shadow-lg my-2 sm:my-4 flex items-center justify-center gap-0.5 sm:gap-1 max-w-full"
        >
          {titleLetters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: -80, rotate: (i % 2 === 0 ? -18 : 18), scale: 1.6 }}
              animate={isLoaded ? { opacity: 1, y: 0, rotate: (i % 2 === 0 ? -2 : 2), scale: 1 } : { opacity: 0, y: -80, scale: 1.6 }}
              transition={{
                type: 'spring',
                stiffness: 220,
                damping: 14,
                delay: isLoaded ? 0.15 + i * 0.05 : 0
              }}
              whileHover={{ 
                scale: 1.25, 
                rotate: i % 2 === 0 ? 15 : -15, 
                color: 'var(--red)',
                transition: { duration: 0.2 } 
              }}
              className="inline-block cursor-default"
            >
              {char}
            </motion.span>
          ))}

          {/* SVG Animated Interactive Glasses */}
          <motion.svg 
            initial={{ opacity: 0, scale: 0, rotate: -30 }}
            animate={isLoaded ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.7 }}
            whileHover={{ scale: 1.3, rotate: 18, y: -6 }}
            whileTap={{ scale: 0.85, rotate: -12 }}
            onHoverStart={playPaperRustle}
            className="absolute -top-4 right-0 sm:-top-10 sm:right-6 w-16 xs:w-20 sm:w-36 cursor-pointer drop-shadow-xl z-20" 
            viewBox="0 0 120 50" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="30" cy="25" r="20" stroke="var(--ink)" strokeWidth="5"/>
            <circle cx="90" cy="25" r="20" stroke="var(--ink)" strokeWidth="5"/>
            <path d="M50 22 Q60 12 70 22" stroke="var(--ink)" strokeWidth="5" fill="none"/>
            <path d="M10 25 L2 20" stroke="var(--ink)" strokeWidth="5"/>
            <path d="M110 25 L118 20" stroke="var(--ink)" strokeWidth="5"/>
          </motion.svg>
        </motion.div>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.65 }}
          className="font-kalam font-bold text-sm xs:text-base sm:text-2xl text-[var(--ink-soft)] -rotate-1 max-w-xl flex items-center justify-center gap-1.5 px-2"
        >
          <Sparkles className="w-4 h-4 text-[var(--red)] animate-pulse shrink-0" />
          <span>{USER_INFO.name} — Graphic &amp; Typography Designer's Desk</span>
          <Sparkles className="w-4 h-4 text-[var(--red)] animate-pulse shrink-0" />
        </motion.p>

        {/* CTA Stamp Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.75, type: 'spring', stiffness: 180 }}
          className="mt-6 sm:mt-8 flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-center z-20 w-full sm:w-auto px-4"
        >
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            href="#work" 
            onClick={playStampClick} 
            className="stamp-btn w-full xs:w-auto justify-center bg-[var(--paper)] text-[var(--ink)] border-2 border-[var(--ink)] shadow-lg hover:bg-[var(--ink)] hover:text-[var(--paper)] text-xs sm:text-base"
          >
            See Selected Posters ↓
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              playStampClick();
              onOpenResume();
            }}
            className="stamp-btn w-full xs:w-auto justify-center bg-[var(--yellow)] text-[#2b2620] border-2 border-[var(--ink)] shadow-lg hover:bg-[var(--ink)] hover:text-white text-xs sm:text-base"
          >
            <FileText className="w-4 h-4 text-[var(--red)]" /> Download Resume
          </motion.button>

          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            href={USER_INFO.driveFolderUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playStampClick}
            className="stamp-btn w-full xs:w-auto justify-center bg-[var(--craft)] text-[var(--ink)] border-2 border-[var(--ink)] shadow-lg hover:bg-[var(--ink)] hover:text-white text-xs sm:text-base"
          >
            <Folder className="w-4 h-4 text-[var(--red)]" /> Drive Works 📁
          </motion.a>
        </motion.div>

        {/* RESPONSIVE STICKY NOTES */}
        <React.Fragment key={resetKey}>
          <div className="w-full mt-8 md:mt-0 grid grid-cols-1 sm:grid-cols-2 md:block gap-4 md:gap-0 max-w-lg md:max-w-none">
            
            {/* Note 1: Name */}
            <motion.div
              drag
              dragConstraints={{ left: -180, right: 180, top: -120, bottom: 120 }}
              initial={{ opacity: 0, scale: 0.4, rotate: -25, y: -60 }}
              animate={isLoaded ? { opacity: 1, scale: 1, rotate: -3, y: 0 } : { opacity: 0, scale: 0.4, y: -60 }}
              transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.35 }}
              whileHover={{ scale: 1.06, rotate: 0, zIndex: 35 }}
              whileTap={{ scale: 0.95, cursor: 'grabbing' }}
              onDragStart={playPaperRustle}
              style={{
                x: useTransform(parallaxX, (v) => v * 0.9),
                y: useTransform(parallaxY, (v) => v * 0.9)
              }}
              className="note yellow relative md:absolute md:top-[4%] md:left-[3%] sm:md:left-[5%] w-full md:w-56 p-4 sm:p-5 font-kalam font-bold text-base sm:text-xl shadow-xl cursor-grab border border-yellow-400/40 rounded-sm will-change-transform transform-gpu"
            >
              <span className="pin yellow top-[-8px] left-1/2 -ml-2" />
              <span className="lbl block font-sans font-bold text-[10px] tracking-widest uppercase mb-1">Designer</span>
              KRISH SHRESTHA
              <span className="block text-xs font-sans mt-0.5">📍 Kathmandu, Nepal / Remote</span>
            </motion.div>

            {/* Note 2: Focus / Role */}
            <motion.div
              drag
              dragConstraints={{ left: -180, right: 180, top: -120, bottom: 120 }}
              initial={{ opacity: 0, scale: 0.4, rotate: 25, y: -60 }}
              animate={isLoaded ? { opacity: 1, scale: 1, rotate: 3, y: 0 } : { opacity: 0, scale: 0.4, y: -60 }}
              transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.45 }}
              whileHover={{ scale: 1.06, rotate: 0, zIndex: 35 }}
              whileTap={{ scale: 0.95, cursor: 'grabbing' }}
              onDragStart={playPaperRustle}
              style={{
                x: useTransform(parallaxX, (v) => v * -0.9),
                y: useTransform(parallaxY, (v) => v * -0.9)
              }}
              className="note blue relative md:absolute md:top-[8%] md:right-[3%] sm:md:right-[5%] w-full md:w-56 p-4 sm:p-5 font-kalam font-bold text-sm sm:text-lg shadow-xl cursor-grab border border-sky-400/40 rounded-sm will-change-transform transform-gpu"
            >
              <span className="pin blue top-[-8px] right-4" />
              <span className="lbl block font-sans font-bold text-[10px] tracking-widest uppercase mb-1">Specialization</span>
              Graphic &amp; Typography Art
              <span className="block text-xs font-sans mt-0.5">Editorial Posters &amp; Photoshop</span>
            </motion.div>

            {/* Note 3: Background */}
            <motion.div
              drag
              dragConstraints={{ left: -180, right: 180, top: -120, bottom: 120 }}
              initial={{ opacity: 0, scale: 0.4, rotate: -20, y: 60 }}
              animate={isLoaded ? { opacity: 1, scale: 1, rotate: -2, y: 0 } : { opacity: 0, scale: 0.4, y: 60 }}
              transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.55 }}
              whileHover={{ scale: 1.06, rotate: 0, zIndex: 35 }}
              whileTap={{ scale: 0.95, cursor: 'grabbing' }}
              onDragStart={playPaperRustle}
              style={{
                x: useTransform(parallaxX, (v) => v * 1.1),
                y: useTransform(parallaxY, (v) => v * 1.1)
              }}
              className="note craft-note relative md:absolute md:bottom-[14%] md:left-[3%] sm:md:left-[6%] w-full md:w-60 p-4 sm:p-5 font-kalam font-bold text-xs sm:text-base shadow-xl cursor-grab border border-[var(--craft-b)] rounded-sm will-change-transform transform-gpu"
            >
              <span className="pin red top-[-8px] left-1/2 -ml-2" />
              <span className="lbl block font-sans font-bold text-[10px] tracking-widest uppercase mb-1">Background</span>
              BSc.IT Student &amp; Tech Mentor — Bridging Logic &amp; Artistry
            </motion.div>

            {/* Note 4: Tools & Passion */}
            <motion.div
              drag
              dragConstraints={{ left: -180, right: 180, top: -120, bottom: 120 }}
              initial={{ opacity: 0, scale: 0.4, rotate: 20, y: 60 }}
              animate={isLoaded ? { opacity: 1, scale: 1, rotate: 2, y: 0 } : { opacity: 0, scale: 0.4, y: 60 }}
              transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.65 }}
              whileHover={{ scale: 1.06, rotate: 0, zIndex: 35 }}
              whileTap={{ scale: 0.95, cursor: 'grabbing' }}
              onDragStart={playPaperRustle}
              style={{
                x: useTransform(parallaxX, (v) => v * -1.1),
                y: useTransform(parallaxY, (v) => v * -1.1)
              }}
              className="note yellow relative md:absolute md:bottom-[12%] md:right-[3%] sm:md:right-[6%] w-full md:w-60 p-4 sm:p-5 font-kalam font-bold text-xs sm:text-base shadow-xl cursor-grab border border-yellow-400/40 rounded-sm will-change-transform transform-gpu"
            >
              <span className="pin red top-[-8px] left-3" />
              <span className="lbl block font-sans font-bold text-[10px] tracking-widest uppercase mb-1">Craft</span>
              Photoshop, Typography Posters, Editorial Magazine Layouts &amp; Halftones
            </motion.div>

          </div>

          {/* Draggable Pencil Asset */}
          <motion.div
            drag
            dragConstraints={{ left: -220, right: 220, top: -120, bottom: 120 }}
            initial={{ opacity: 0, x: -100 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ delay: 0.75 }}
            whileHover={{ scale: 1.2, rotate: -8 }}
            onDragStart={playPaperRustle}
            style={{
              x: useTransform(parallaxX, (v) => v * 1.4),
              y: useTransform(parallaxY, (v) => v * 1.4)
            }}
            className="absolute bottom-[4%] left-[26%] w-36 sm:w-44 -rotate-12 cursor-grab z-20 hidden md:block will-change-transform transform-gpu"
            title="Draggable Pencil"
          >
            <img 
              alt="Pencil" 
              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 30'><rect x='0' y='10' width='150' height='10' fill='%23e8b923'/><polygon points='150,7 175,15 150,23' fill='%23d9a441'/><polygon points='175,12 190,15 175,18' fill='%232b2620'/><rect x='0' y='10' width='150' height='2' fill='%23fff2c2' opacity='0.5'/></svg>" 
              className="w-full drop-shadow-md"
            />
          </motion.div>
        </React.Fragment>

      </motion.div>

      {/* Bouncing Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 font-kalam font-bold text-xs text-[var(--ink-soft)] flex flex-col items-center gap-0.5 z-20"
      >
        <span>↓ scroll to view gallery</span>
        <ArrowDown className="w-3.5 h-3.5 text-[var(--red)]" />
      </motion.div>
    </header>
  );
}
