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
      
      {/* Background Graphic Blueprint Crosshairs & Halftone Accents */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-15 overflow-hidden">
        <div className="absolute top-[15%] left-6 font-mono-code text-xs text-[var(--ink-soft)] font-bold select-none">+ 00° 15' N // GRID_STUDIO</div>
        <div className="absolute top-[35%] right-6 font-mono-code text-xs text-[var(--ink-soft)] font-bold select-none">+ 85° 40' E // DRAFTING_SCALE</div>
        <div className="absolute top-[65%] left-6 font-mono-code text-xs text-[var(--ink-soft)] font-bold select-none">SCALE 1:1 // KRISH_SHRESTHA</div>
        <div className="absolute top-[85%] right-6 font-mono-code text-xs text-[var(--ink-soft)] font-bold select-none">TYPOGRAPHY_LAB_2026</div>

        {/* Floating Geometric Blueprint Target Rings */}
        <svg className="absolute top-1/4 left-10 w-24 h-24 text-[var(--ink-soft)] opacity-20" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="1" />
        </svg>

        <svg className="absolute bottom-1/4 right-10 w-28 h-28 text-[var(--ink-soft)] opacity-20" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
          <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
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
