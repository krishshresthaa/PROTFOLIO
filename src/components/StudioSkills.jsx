import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { playStampClick, playPaperRustle, playPop } from '../utils/audioSynth';
import { 
  Palette, 
  Code2, 
  Bot, 
  Sparkles, 
  Layers, 
  Film, 
  Monitor, 
  Wrench, 
  Terminal, 
  Wifi, 
  Lightbulb, 
  Cpu,
  Layout,
  FileCode,
  Box,
  Sliders,
  Zap
} from 'lucide-react';

export default function StudioSkills({ theme }) {
  const [activeTab, setActiveTab] = useState('design');

  // Categories for the interactive Studio Workbench
  const categories = [
    { id: 'design', label: '🎨 Design & Motion Swatches', count: '07' },
    { id: 'code', label: '💻 Code & Dev Motherboard', count: '07' },
    { id: 'robotics', label: '🤖 Robotics & Ideation Blueprints', count: '05' },
  ];

  // 1. DESIGN & MOTION (Formatted as Graphic Pantone Swatches & Studio Cans)
  const designSkills = [
    {
      name: 'Adobe Photoshop',
      tag: 'Ps',
      code: 'PANTONE #31A8FF',
      dots: '98%',
      desc: 'Poster manipulation, halftone dot overlays, grunge paper textures, photo grading & CMYK press exports.',
      color: '#00c8ff',
      brandBg: '#001e36',
      badge: 'POSTER ART & HALFTONES'
    },
    {
      name: 'Adobe Illustrator',
      tag: 'Ai',
      code: 'PANTONE #FF9A00',
      dots: '95%',
      desc: 'Vector typography glyphs, brand identity marks, sharp geometric logos & print graphics.',
      color: '#ff9a00',
      brandBg: '#331c00',
      badge: 'VECTOR & TYPOGRAPHY'
    },
    {
      name: 'Adobe Premiere Pro',
      tag: 'Pr',
      code: 'PANTONE #EA77FF',
      dots: '88%',
      desc: 'Cinematic video cutting, rhythm editing, sound FX mixing & social motion reels.',
      color: '#ea77ff',
      brandBg: '#280033',
      badge: 'TIMELINE & CUTTING'
    },
    {
      name: 'DaVinci Resolve',
      tag: 'DVR',
      code: 'PANTONE #FF5050',
      dots: '85%',
      desc: 'Node-based color grading, film stock emulation, grain balancing & studio finishing.',
      color: '#ff5050',
      brandBg: '#330a0a',
      badge: 'FILM COLOR GRADING'
    },
    {
      name: 'After Effects',
      tag: 'Ae',
      code: 'PANTONE #9999FF',
      dots: '88%',
      desc: 'Kinetic text motion, visual FX compositing, lower thirds & animated title cards.',
      color: '#9999ff',
      brandBg: '#12123b',
      badge: 'MOTION FX & KINETIC'
    },
    {
      name: 'Figma',
      tag: 'Fg',
      code: 'PANTONE #0ACF83',
      dots: '94%',
      desc: 'UI/UX prototyping, design component systems, interactive web wireframes & vector assets.',
      color: '#0acf83',
      brandBg: '#002919',
      badge: 'UI/UX & WIREFRAMING'
    },
    {
      name: 'Canva',
      tag: 'Cv',
      code: 'PANTONE #00C4CC',
      dots: '90%',
      desc: 'Rapid social campaign templates, pitch decks, brand asset alignment & quick turnarounds.',
      color: '#00c4cc',
      brandBg: '#002628',
      badge: 'RAPID LAYOUTS'
    }
  ];

  // 2. CODE & DEV (Formatted as Motherboard Microchip Cards)
  const codeSkills = [
    {
      name: 'HTML5',
      tag: '<HTML>',
      code: 'SYS_VER 5.3',
      dots: '98%',
      desc: 'Semantic page structure, accessibility standards, schema markup & clean DOM trees.',
      color: '#ff5722',
      brandBg: '#330f03',
      badge: 'SEMANTIC DOM'
    },
    {
      name: 'CSS3 / Vanilla CSS',
      tag: '.CSS',
      code: 'SYS_VER 3.0',
      dots: '96%',
      desc: 'Custom design systems, CSS Grid/Flexbox layouts, keyframe animations & responsive rules.',
      color: '#29b6f6',
      brandBg: '#032033',
      badge: 'DESIGNS & ANIMATION'
    },
    {
      name: 'JavaScript (ES6+)',
      tag: 'JS',
      code: 'ECMASCRIPT 2024',
      dots: '90%',
      desc: 'Async/Await logic, Web APIs, DOM manipulation, custom state engines & canvas scripts.',
      color: '#ffd600',
      brandBg: '#332b00',
      badge: 'ASYNC LOGIC'
    },
    {
      name: 'React.js',
      tag: 'JSX',
      code: 'REACT 19',
      dots: '92%',
      desc: 'Component architecture, custom hooks, Framer Motion transitions & single-page applications.',
      color: '#00e5ff',
      brandBg: '#002c33',
      badge: 'COMPONENT STATE'
    },
    {
      name: '.NET Framework',
      tag: '.NET',
      code: 'DOTNET 8.0',
      dots: '80%',
      desc: 'C# backend API logic, object-oriented software patterns & enterprise desktop integrations.',
      color: '#b388ff',
      brandBg: '#1f0d38',
      badge: 'C# BACKEND API'
    },
    {
      name: 'C Programming',
      tag: 'C',
      code: 'ANSI C',
      dots: '82%',
      desc: 'Low-level memory management, pointers, data structures & computational algorithms.',
      color: '#cfd8dc',
      brandBg: '#1c2429',
      badge: 'POINTERS & MEMORY'
    },
    {
      name: 'Python',
      tag: 'Py',
      code: 'PYTHON 3.12',
      dots: '88%',
      desc: 'Automation scripts, PIL image processing scripts, backend utilities & data tools.',
      color: '#448aff',
      brandBg: '#081a38',
      badge: 'SCRIPTING & PIL'
    }
  ];

  // 3. ROBOTICS & IDEATION (Formatted as Engineering Blueprints & Gear Cards)
  const roboticsSkills = [
    {
      name: 'Creative Design Thinking',
      tag: 'CDT',
      code: 'METHOD_01',
      dots: '99%',
      desc: 'User empathy research, rapid pen-and-paper sketching, iterative testing & creative problem solving.',
      color: '#ff5252',
      brandBg: '#380a0a',
      badge: 'PROBLEM SOLVING'
    },
    {
      name: 'Robotics Engineering',
      tag: 'ROBOT',
      code: 'HARDWARE_02',
      dots: '86%',
      desc: 'Autonomous rover chassis assembly, motor driver controls, sensor telemetry & mechanical logic.',
      color: '#00e676',
      brandBg: '#03381a',
      badge: 'AUTONOMOUS BOTS'
    },
    {
      name: 'IoT (Internet of Things)',
      tag: 'IoT',
      code: 'WIRELESS_03',
      dots: '85%',
      desc: 'ESP32 & Arduino microcontroller nodes, Wi-Fi/Bluetooth sensors & remote telemetry feeds.',
      color: '#40c4ff',
      brandBg: '#052938',
      badge: 'ESP32 & ARDUINO'
    },
    {
      name: 'Hardware Prototyping',
      tag: 'HW',
      code: 'CIRCUIT_04',
      dots: '84%',
      desc: 'Breadboard circuit wiring, soldering components, microcontroller flashing & physical housing.',
      color: '#ffab40',
      brandBg: '#382205',
      badge: 'CIRCUITS & SOLDERING'
    },
    {
      name: 'Halftone Print Press Craft',
      tag: 'PRESS',
      code: 'CMYK_05',
      dots: '95%',
      desc: 'CMYK print separation, halftone dot matrix art, paper stock textures & poster press craft.',
      color: '#ff4081',
      brandBg: '#38051a',
      badge: 'CMYK PRINT CRAFT'
    }
  ];

  const currentList = activeTab === 'design' 
    ? designSkills 
    : activeTab === 'code' 
    ? codeSkills 
    : roboticsSkills;

  // Dynamic Theme Styling with ULTRA-HIGH CONTRAST for Day, Dark & Blueprint
  const isDark = theme === 'dark' || theme === 'blueprint';
  const sectionBg = isDark ? 'bg-stone-950' : 'bg-[#f4efe4]';
  const cardContainerBg = theme === 'dark' ? '#1c1a17' : theme === 'blueprint' ? '#0d254c' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#181715';
  const textSubColor = isDark ? '#d4cece' : '#3d362e';
  const chipBg = theme === 'dark' ? '#26231e' : theme === 'blueprint' ? '#143466' : '#fcfaf5';

  return (
    <section className={`relative py-24 px-4 border-t-4 border-dashed border-[var(--ink)]/30 overflow-hidden ${sectionBg}`} id="skills">
      
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 bg-graph-paper pointer-events-none opacity-40" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <AnimatedSection direction="up">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono-code font-bold text-xs uppercase tracking-widest bg-[var(--yellow)] text-[var(--ink)] px-3 py-1 border-2 border-[var(--ink)] rounded shadow-sm inline-block -rotate-1 mb-3">
              SECTION 04 // CAPABILITIES &amp; STUDIO TOOLSET
            </span>

            <h2 
              style={{ color: textColor }}
              className="font-marker text-4xl sm:text-6xl tracking-tight mb-3"
            >
              Interactive Studio Workbench<span className="text-[var(--red)]">.</span>
            </h2>

            <p 
              style={{ color: textSubColor }}
              className="font-sans text-sm sm:text-base leading-relaxed font-semibold"
            >
              Combining graphic poster art, full-stack software code, and robotics engineering. Click a tool category below to inspect the studio gear swatches:
            </p>
          </div>
        </AnimatedSection>

        {/* WORKBENCH TABS SELECTOR (Formatted as Physical Studio Stamp Trays) */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  playStampClick();
                  setActiveTab(cat.id);
                }}
                className={`px-5 py-3 font-kalam font-bold text-sm sm:text-base rounded-md border-3 border-[var(--ink)] transition-all shadow-md flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-[var(--red)] text-white scale-105 shadow-xl -rotate-1 ring-2 ring-yellow-400'
                    : isDark 
                    ? 'bg-stone-800 text-stone-100 hover:bg-stone-700' 
                    : 'bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--yellow)]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded font-mono-code font-extrabold ${
                  isActive ? 'bg-white text-[var(--red)]' : 'bg-[var(--ink)] text-white'
                }`}>
                  {cat.count}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* CREATIVE SHOWCASE DISPLAY BOARD */}
        <motion.div 
          style={{ backgroundColor: cardContainerBg }}
          className="border-4 border-[var(--ink)] shadow-2xl p-6 sm:p-10 rounded-sm relative"
        >
          {/* Tape Corners */}
          <span className="tape top-[-14px] left-10 w-24 h-6 -rotate-2" />
          <span className="tape top-[-14px] right-10 w-24 h-6 rotate-3" />

          {/* Tab Header Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b-2 border-dashed border-[var(--ink)]/30">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-[var(--red)] animate-pulse" />
              <h3 
                style={{ color: textColor }}
                className="font-marker text-2xl sm:text-3xl tracking-tight"
              >
                {activeTab === 'design' && '🎨 GRAPHIC PANTONE SWATCHES &amp; SUITE'}
                {activeTab === 'code' && '💻 FULL-STACK CODE CHIPS &amp; STACK'}
                {activeTab === 'robotics' && '🤖 ROBOTICS &amp; ENGINEERING BLUEPRINTS'}
              </h3>
            </div>

            <span className="font-mono-code text-xs font-bold px-3 py-1 bg-[var(--yellow)] text-[var(--ink)] border border-[var(--ink)] rounded shadow-sm">
              CLICK CARDS TO INSPECT TOOL DETAILS 🔎
            </span>
          </div>

          {/* CARDS GRID DISPLAY */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentList.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.03, y: -4, rotate: (index % 2 === 0 ? -1 : 1) }}
                  onHoverStart={playPaperRustle}
                  onClick={playPop}
                  style={{ backgroundColor: chipBg }}
                  className="border-3 border-[var(--ink)] shadow-md rounded-md p-5 relative group cursor-pointer flex flex-col justify-between hover:shadow-2xl transition-all"
                >
                  {/* Top Swatch Ribbon / Brand Strip */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {/* Big Color Badge Emblem */}
                      <div 
                        style={{ backgroundColor: item.color }}
                        className="px-3 py-1 rounded border-2 border-[var(--ink)] text-white font-mono-code font-black text-sm tracking-wider shadow-sm flex items-center gap-1.5"
                      >
                        <span>{item.tag}</span>
                      </div>

                      {/* Top Stamp Tag */}
                      <span className="font-kalam font-bold text-[11px] bg-[var(--yellow)] text-[#181715] px-2 py-0.5 border border-[var(--ink)] rounded -rotate-2 group-hover:rotate-0 transition-transform">
                        {item.badge}
                      </span>
                    </div>

                    {/* Skill Name (ULTRA HIGH CONTRAST) */}
                    <h4 
                      style={{ color: textColor }}
                      className="font-marker text-2xl mb-1 group-hover:text-[var(--red)] transition-colors"
                    >
                      {item.name}
                    </h4>

                    {/* Technical Code / Spec line */}
                    <span 
                      style={{ color: item.color }}
                      className="font-mono-code text-[11px] font-extrabold tracking-widest block mb-3 uppercase"
                    >
                      ● {item.code}
                    </span>

                    {/* Skill Description */}
                    <p 
                      style={{ color: textSubColor }}
                      className="font-sans text-xs leading-relaxed mb-4 font-medium"
                    >
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Studio Meter / Capability Bar */}
                  <div className="pt-3 border-t-2 border-dashed border-[var(--ink)]/20 flex items-center justify-between">
                    <span className="font-kalam font-bold text-xs text-[var(--red)]">
                      Studio Efficiency:
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-24 sm:w-28 h-3.5 bg-stone-200 dark:bg-stone-800 rounded-full border-2 border-[var(--ink)] overflow-hidden relative shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: item.dots }}
                          transition={{ duration: 0.8, delay: 0.2 + (index * 0.05) }}
                          style={{ backgroundColor: item.color }}
                          className="h-full rounded-full"
                        />
                      </div>
                      <span className="font-mono-code font-extrabold text-xs" style={{ color: textColor }}>
                        {item.dots}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom Footer Note */}
          <div className="mt-8 pt-6 border-t-2 border-dashed border-[var(--ink)]/30 flex flex-wrap items-center justify-between text-xs font-kalam font-bold text-[var(--red)] gap-3">
            <span>⚡ All studio tools calibrated for high-resolution print &amp; interactive web apps.</span>
            <a href="#contact" className="underline hover:text-[var(--ink)] transition-colors">
              Request project collaboration →
            </a>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
