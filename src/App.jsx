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
    <div className={`min-h-screen bg-[var(--paper)] text-[var(--ink)] transition-colors duration-300 ${theme === 'dark' ? 'dark-theme' : theme === 'blueprint' ? 'blueprint-theme' : ''}`}>
      
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
      <main>
        {/* Interactive Physical Desk Hero (Entrance animations trigger AFTER preloader completes) */}
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
