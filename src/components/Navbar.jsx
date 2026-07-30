import React, { useState } from 'react';
import { Volume2, VolumeX, Moon, Sun, Compass, Edit3, FileText, Folder, Menu, X } from 'lucide-react';
import { playStampClick, setSoundEnabled } from '../utils/audioSynth';
import { USER_INFO } from '../data/portfolioData';

export default function Navbar({ theme, setTheme, onOpenSketchpad, onOpenResume, soundOn, setSoundOn }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
    if (nextState) playStampClick();
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    if (soundOn) playStampClick();
  };

  // Determine explicit text color based on theme
  const textColor = theme === 'dark' || theme === 'blueprint' ? '#ffffff' : '#2b2620';
  const navBg = theme === 'dark' ? '#181715' : theme === 'blueprint' ? '#0b2247' : '#faf7ee';

  return (
    <nav 
      style={{ backgroundColor: navBg, color: textColor }}
      className="sticky top-0 z-50 backdrop-blur-md border-b-2 border-[var(--ink)] transition-colors duration-300 shadow-md"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#home" 
          onClick={playStampClick}
          style={{ color: textColor }}
          className="logo font-marker text-xl sm:text-2xl tracking-tight hover:rotate-2 transition-transform duration-200"
        >
          KRISH<span className="text-[var(--red)]">.</span>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 list-none font-kalam font-bold text-base">
          {['Home', 'Work', 'Process', 'Skills', 'Contact'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                onClick={playStampClick}
                style={{ color: textColor }}
                className="relative py-1 font-bold hover:text-[var(--red)] transition-colors group"
              >
                {item}
                <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-[var(--red)] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Controls & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Resume Button */}
          <button
            onClick={() => {
              playStampClick();
              onOpenResume();
            }}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold uppercase tracking-wider border-2 border-[var(--ink)] rounded bg-[var(--yellow)] text-[#2b2620] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-all duration-200 -rotate-1 hover:rotate-0 shadow-sm"
            title="Download / View Resume"
          >
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--red)]" />
            <span className="font-kalam text-xs sm:text-sm">Resume</span>
          </button>

          {/* Drive Folder Link Button */}
          <a
            href={USER_INFO.driveFolderUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={playStampClick}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider border-2 border-[var(--ink)] rounded bg-[var(--craft)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-all duration-200 rotate-1 hover:rotate-0 shadow-sm"
            title="Open Google Drive Portfolio"
          >
            <Folder className="w-4 h-4 text-[var(--red)]" />
            <span className="font-kalam text-sm">Drive 📁</span>
          </a>

          {/* Sketchpad Button */}
          <button
            onClick={() => {
              playStampClick();
              onOpenSketchpad();
            }}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider border-2 border-[var(--ink)] rounded bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-all duration-200 -rotate-1 hover:rotate-0 shadow-sm"
            title="Open Interactive Desk Sketchpad"
          >
            <Edit3 className="w-4 h-4 text-[var(--red)]" />
            <span className="font-kalam text-sm">Doodle Pad</span>
          </button>

          {/* Audio Sound Toggle */}
          <button
            onClick={toggleSound}
            style={{ color: textColor }}
            className="p-1.5 sm:p-2 border-2 border-[var(--ink)] rounded bg-[var(--paper)] hover:bg-[var(--craft)] transition-colors"
            title={soundOn ? "Mute Sound Effects" : "Enable Tactile Sound Effects"}
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--red)]" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-60" />}
          </button>

          {/* Theme Selector */}
          <div className="flex items-center border-2 border-[var(--ink)] rounded bg-[var(--paper)] overflow-hidden">
            <button
              onClick={() => handleThemeChange('day')}
              className={`p-1 sm:p-1.5 text-xs font-bold transition-colors ${theme === 'day' ? 'bg-[var(--ink)] text-[var(--paper)]' : 'text-[#2b2620] hover:bg-[var(--craft)]'}`}
              title="Day Desk Mode"
            >
              <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
            <button
              onClick={() => handleThemeChange('dark')}
              className={`p-1 sm:p-1.5 text-xs font-bold transition-colors ${theme === 'dark' ? 'bg-[var(--ink)] text-[var(--paper)]' : 'text-[#2b2620] hover:bg-[var(--craft)]'}`}
              title="Dark Studio Mode"
            >
              <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
            <button
              onClick={() => handleThemeChange('blueprint')}
              className={`p-1 sm:p-1.5 text-xs font-bold transition-colors ${theme === 'blueprint' ? 'bg-[var(--ink)] text-[var(--paper)]' : 'text-[#2b2620] hover:bg-[var(--craft)]'}`}
              title="Blueprint Graph Mode"
            >
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => {
              playStampClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            style={{ color: textColor }}
            className="md:hidden p-1.5 border-2 border-[var(--ink)] rounded bg-[var(--paper)] hover:bg-[var(--craft)]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] px-6 py-5 space-y-4 shadow-xl font-kalam font-bold text-lg">
          <div className="flex flex-col gap-3">
            {['Home', 'Work', 'Process', 'Skills', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => {
                  playStampClick();
                  setMobileMenuOpen(false);
                }}
                className="py-1 text-[var(--ink)] hover:text-[var(--red)] border-b border-dashed border-[var(--ink)]/20"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                playStampClick();
                setMobileMenuOpen(false);
                onOpenSketchpad();
              }}
              className="stamp-btn w-full justify-center text-sm py-2 bg-[var(--craft)] text-[var(--ink)]"
            >
              <Edit3 className="w-4 h-4 text-[var(--red)]" /> Open Doodle Pad
            </button>

            <a
              href={USER_INFO.driveFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                playStampClick();
                setMobileMenuOpen(false);
              }}
              className="stamp-btn w-full justify-center text-sm py-2 bg-[var(--yellow)] text-[#2b2620]"
            >
              <Folder className="w-4 h-4 text-[var(--red)]" /> Google Drive Folder 📁
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
