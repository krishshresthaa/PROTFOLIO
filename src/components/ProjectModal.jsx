import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Tag, Folder } from 'lucide-react';
import { playStampClick } from '../utils/audioSynth';
import { USER_INFO } from '../data/portfolioData';

export default function ProjectModal({ project, onClose, theme }) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  if (!project) return null;

  const cardBg = theme === 'dark' ? '#22201c' : theme === 'blueprint' ? '#102e5c' : '#ffffff';
  const textColor = theme === 'dark' || theme === 'blueprint' ? '#ffffff' : '#2b2620';
  const textSoftColor = theme === 'dark' ? '#e3ded5' : theme === 'blueprint' ? '#c2e0ff' : '#4a423a';

  const toolsList = project.tools || project.tags || [];
  const descriptionText = project.summary || project.description || '';
  const driveUrl = project.link || project.driveUrl || USER_INFO.driveFolderUrl;

  return (
    <AnimatePresence>
      <div 
        onClick={() => {
          playStampClick();
          onClose();
        }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto"
      >
        <motion.div 
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          style={{ backgroundColor: cardBg, color: textColor }}
          className="relative w-full max-w-4xl border-4 border-[var(--ink)] shadow-2xl rounded-lg overflow-hidden my-8"
        >
          {/* Tape Accent */}
          <div className="tape top-[-10px] left-1/2 -ml-10 w-24 h-6 -rotate-2 z-20" />

          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[var(--ink)] bg-[var(--craft)]">
            <div className="flex items-center gap-3">
              <span className="font-kalam font-bold text-sm text-[var(--red)] border border-[var(--red)] px-2.5 py-0.5 rounded bg-[var(--paper)]">
                LOG_{project.number}
              </span>
              <span className="font-sans font-bold text-xs uppercase tracking-widest text-[var(--ink-soft)]">
                {project.category}
              </span>
            </div>
            
            <button
              onClick={() => {
                playStampClick();
                onClose();
              }}
              className="p-1.5 border-2 border-[var(--ink)] rounded bg-[var(--paper)] hover:bg-[var(--red)] hover:text-white transition-colors"
            >
              <X className="w-5 h-5 text-[var(--ink)]" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8 items-start">
            {/* Image Preview */}
            <div className="space-y-4">
              <div className="relative aspect-3/4 bg-stone-900 border-2 border-[var(--ink)] rounded overflow-hidden shadow-md group">
                <img 
                  src={project.images[activeImgIndex]} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Content & Details */}
            <div className="space-y-6">
              <div>
                <h2 
                  style={{ color: textColor }}
                  className="font-caveat font-bold text-4xl sm:text-5xl leading-tight"
                >
                  {project.title}
                </h2>
                <p 
                  style={{ color: textSoftColor }}
                  className="font-sans text-sm mt-2 leading-relaxed"
                >
                  {descriptionText}
                </p>
              </div>

              {/* Tools & Tags */}
              <div className="flex flex-wrap gap-2">
                {toolsList.map((tool) => (
                  <span 
                    key={tool} 
                    className="inline-flex items-center gap-1 text-xs font-mono-code font-bold px-2.5 py-1 bg-[var(--craft)] text-[var(--ink)] border border-[var(--ink)]/40 rounded"
                  >
                    <Tag className="w-3 h-3 text-[var(--red)]" />
                    {tool}
                  </span>
                ))}
              </div>

              {/* Challenge & Solution */}
              <div className="space-y-3 p-4 bg-[var(--craft)]/20 border-2 border-dashed border-[var(--ink)]/40 rounded">
                <div>
                  <h4 className="font-kalam font-bold text-sm uppercase text-[var(--red)]">The Artistic Brief:</h4>
                  <p 
                    style={{ color: textSoftColor }}
                    className="font-sans text-xs mt-1 leading-normal"
                  >
                    {project.challenge}
                  </p>
                </div>
                <div>
                  <h4 className="font-kalam font-bold text-sm uppercase text-emerald-500">The Visual Solution:</h4>
                  <p 
                    style={{ color: textSoftColor }}
                    className="font-sans text-xs mt-1 leading-normal"
                  >
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col gap-3">
                <a
                  href={driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playStampClick}
                  className="stamp-btn w-full justify-center text-center py-3 bg-[var(--yellow)] text-[#2b2620] hover:bg-[var(--ink)] hover:text-white shadow-md text-sm font-bold flex items-center gap-2"
                >
                  <Folder className="w-4 h-4 text-[var(--red)]" />
                  View High-Res Artwork on Drive
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
