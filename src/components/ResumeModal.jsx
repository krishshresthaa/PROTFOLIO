import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Folder, ExternalLink, BookOpen, Code, Sparkles } from 'lucide-react';
import { USER_INFO } from '../data/portfolioData';
import { playStampClick } from '../utils/audioSynth';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl bg-[var(--paper)] text-[var(--ink)] border-4 border-[var(--ink)] shadow-2xl rounded-lg overflow-hidden my-8"
        >
          {/* Tape Accent */}
          <div className="tape top-[-10px] left-1/2 -ml-10 w-24 h-6 -rotate-2" />

          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[var(--ink)] bg-[var(--craft)]">
            <div className="flex items-center gap-3">
              <span className="font-marker text-2xl text-[var(--ink)]">
                {USER_INFO.name}
              </span>
              <span className="font-sans font-bold text-xs uppercase tracking-widest text-[var(--red)] border border-[var(--red)] px-2.5 py-0.5 rounded bg-[var(--paper)]">
                RESUME &amp; PROFILE
              </span>
            </div>

            <button
              onClick={() => {
                playStampClick();
                onClose();
              }}
              className="p-1.5 border-2 border-[var(--ink)] rounded bg-[var(--paper)] hover:bg-[var(--red)] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Resume Body */}
          <div className="p-6 md:p-8 space-y-6">
            
            {/* Bio Summary */}
            <div className="p-4 bg-[var(--craft)]/30 border-2 border-dashed border-[var(--ink)]/40 rounded">
              <h4 className="font-kalam font-bold text-base text-[var(--red)] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> About &amp; Philosophy
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[var(--ink-soft)] mt-1 leading-relaxed">
                {USER_INFO.aboutBio}
              </p>
            </div>

            {/* Grid: Education & Skills */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Education & Background */}
              <div className="space-y-3">
                <h4 className="font-kalam font-bold text-sm uppercase tracking-wider text-[var(--ink)] flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[var(--red)]" /> Education &amp; Tech Focus
                </h4>
                <div className="p-3.5 bg-[var(--card-bg)] border border-[var(--ink)]/30 rounded shadow-sm">
                  <span className="font-bold text-xs font-sans text-[var(--ink)] block">BSc.IT Degree Candidate</span>
                  <p className="text-xs text-[var(--ink-soft)] mt-0.5">Tech Innovation, System Automation &amp; Web Technologies</p>
                  <span className="text-[11px] text-[var(--red)] font-semibold mt-1 block">Kathmandu, Nepal</span>
                </div>
                <div className="p-3.5 bg-[var(--card-bg)] border border-[var(--ink)]/30 rounded shadow-sm">
                  <span className="font-bold text-xs font-sans text-[var(--ink)] block">Robotics &amp; Tech Mentor</span>
                  <p className="text-xs text-[var(--ink-soft)] mt-0.5">Mentoring next generation in robotics &amp; automated logic systems</p>
                </div>
              </div>

              {/* Core Skillsets */}
              <div className="space-y-3">
                <h4 className="font-kalam font-bold text-sm uppercase tracking-wider text-[var(--ink)] flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-[var(--red)]" /> Core Skillsets
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Typography Art',
                    'Photoshop',
                    'Illustrator',
                    'Editorial Poster Design',
                    'Grungy Cinematic Art',
                    'Sports & Halftone Art',
                    'Graphic Design',
                    'Figma',
                    'Brand Identity',
                    'Layout Composition'
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono-code font-bold px-2.5 py-1 bg-[var(--craft)] text-[var(--ink)] border border-[var(--ink)]/30 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t-2 border-dashed border-[var(--ink)]/30 flex flex-col sm:flex-row gap-4">
              <a
                href={USER_INFO.driveFolderUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playStampClick}
                className="stamp-btn flex-1 justify-center bg-[var(--yellow)] text-[#2b2620] hover:bg-[var(--ink)] hover:text-white shadow-md text-sm py-3 font-bold"
              >
                <Folder className="w-4 h-4 text-[var(--red)]" />
                View Google Drive Portfolio Folder
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={USER_INFO.driveFolderUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playStampClick}
                className="stamp-btn flex-1 justify-center bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--red)] hover:text-white shadow-md text-sm py-3 font-bold"
              >
                <Download className="w-4 h-4" />
                Download Resume (PDF)
              </a>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
