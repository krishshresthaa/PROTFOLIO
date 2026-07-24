import React from 'react';
import { playStampClick } from '../utils/audioSynth';
import { USER_INFO } from '../data/portfolioData';

export default function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-[var(--paper)] py-10 border-t-4 border-[var(--red)] transition-colors duration-300">
      <div className="max-w-[1240px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Approved Stamp */}
        <div 
          onClick={playStampClick}
          className="stamp font-marker text-sm text-[var(--red)] border-2 border-[var(--red)] px-3 py-1 rounded -rotate-3 cursor-pointer select-none hover:rotate-0 transition-transform"
        >
          APPROVED ✓
        </div>

        {/* Credit */}
        <p className="font-sans text-xs text-stone-400 text-center sm:text-right">
          &copy; {new Date().getFullYear()} {USER_INFO.name} — handcrafted with React, Framer Motion &amp; Photoshop visual craft.
        </p>

      </div>
    </footer>
  );
}
