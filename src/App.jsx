import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroDesk from './components/HeroDesk';
import WorkGallery from './components/WorkGallery';
import CollaborationMarquee from './components/CollaborationMarquee';
import ProcessSection from './components/ProcessSection';
import StudioContact from './components/StudioContact';
import Footer from './components/Footer';
import SketchpadModal from './components/SketchpadModal';
import ResumeModal from './components/ResumeModal';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('day');
  const [soundOn, setSoundOn] = useState(true);
  const [sketchpadOpen, setSketchpadOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    // Apply theme class to document body
    document.body.classList.remove('dark-theme', 'blueprint-theme');
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else if (theme === 'blueprint') {
      document.body.classList.add('blueprint-theme');
    }
  }, [theme]);

  return (
    <div className={`min-h-screen bg-[var(--paper)] text-[var(--ink)] transition-colors duration-300 relative ${theme === 'dark' ? 'dark-theme' : theme === 'blueprint' ? 'blueprint-theme' : ''}`}>
      
      {/* VIBRANT GRAPHIC DESIGNER BACKGROUND WATERMARKS & CROP MARKS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        
        {/* Glowing Ambient Color Orbs */}
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--red)]/10 blur-[120px] will-change-transform transform-gpu" />
        <div className="absolute top-[45%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--yellow)]/12 blur-[140px] will-change-transform transform-gpu" />
        <div className="absolute top-[75%] left-[-5%] w-[550px] h-[550px] rounded-full bg-[var(--red)]/10 blur-[130px] will-change-transform transform-gpu" />

        {/* Printer Crop & Registration Marks */}
        <div className="absolute top-4 left-4 font-mono-code text-[11px] font-bold text-[var(--ink-soft)] opacity-40">⌜ CROP_01 // 300DPI</div>
        <div className="absolute top-4 right-4 font-mono-code text-[11px] font-bold text-[var(--ink-soft)] opacity-40">⌝ CROP_02 // CMYK</div>
        <div className="absolute bottom-4 left-4 font-mono-code text-[11px] font-bold text-[var(--ink-soft)] opacity-40">⌞ STUDIO_2026</div>
        <div className="absolute bottom-4 right-4 font-mono-code text-[11px] font-bold text-[var(--ink-soft)] opacity-40">⌟ KATHMANDU, NEPAL</div>

        {/* Background Typography Watermarks */}
        <div className="absolute top-[28%] left-8 font-marker text-7xl sm:text-9xl text-[var(--ink)] opacity-[0.035] -rotate-12 pointer-events-none">
          TYPOGRAPHY
        </div>
        <div className="absolute top-[58%] right-8 font-marker text-7xl sm:text-9xl text-[var(--red)] opacity-[0.04] rotate-6 pointer-events-none">
          GRAPHICS
        </div>
        <div className="absolute top-[82%] left-12 font-marker text-7xl sm:text-9xl text-[var(--ink)] opacity-[0.035] -rotate-3 pointer-events-none">
          EDITORIAL
        </div>

        {/* Floating Target Crosshairs */}
        <div className="absolute top-[22%] right-[8%] w-12 h-12 border border-[var(--red)]/30 rounded-full flex items-center justify-center opacity-30">
          <div className="w-2 h-2 bg-[var(--red)] rounded-full" />
        </div>
        <div className="absolute top-[68%] left-[6%] w-14 h-14 border border-dashed border-[var(--ink-soft)]/30 rounded-full flex items-center justify-center opacity-30">
          <div className="w-1.5 h-1.5 bg-[var(--ink)] rounded-full" />
        </div>

      </div>

      {/* Animated Workspace Preloader */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Custom Interactive Mouse Cursor */}
      <CustomCursor />

      {/* Sticky Navigation */}
      <Navbar 
        theme={theme} 
        setTheme={setTheme} 
        onOpenSketchpad={() => setSketchpadOpen(true)} 
        onOpenResume={() => setResumeOpen(true)}
        soundOn={soundOn}
        setSoundOn={setSoundOn}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Interactive Physical Desk Hero */}
        <HeroDesk 
          isLoaded={!loading}
          onOpenSketchpad={() => setSketchpadOpen(true)} 
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Selected Projects Work Gallery */}
        <WorkGallery theme={theme} />

        {/* Continuous Sliding Collaboration Belt / Marquee */}
        <CollaborationMarquee theme={theme} />

        {/* Studio Process Timeline */}
        <ProcessSection theme={theme} />

        {/* Studio Contact & Polaroid Sidebar */}
        <StudioContact 
          onOpenResume={() => setResumeOpen(true)} 
          theme={theme}
        />
      </main>

      {/* Footer */}
      <Footer theme={theme} />

      {/* Interactive Sketchpad Canvas Overlay */}
      <SketchpadModal 
        isOpen={sketchpadOpen} 
        onClose={() => setSketchpadOpen(false)} 
      />

      {/* Resume & Profile Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        theme={theme}
      />
    </div>
  );
}
