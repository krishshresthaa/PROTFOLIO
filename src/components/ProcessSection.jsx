import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROCESS_STEPS } from '../data/portfolioData';
import { playPaperRustle, playStampClick, playPop } from '../utils/audioSynth';
import AnimatedSection from './AnimatedSection';
import { Search, Lightbulb, PenTool, MessageSquare, CheckCircle, X, ArrowRight } from 'lucide-react';

export default function ProcessSection({ theme }) {
  const [activeStep, setActiveStep] = useState(null);

  const getStepIcon = (iconName) => {
    switch (iconName) {
      case 'search': return <Search className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--red)]" />;
      case 'lightbulb': return <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--red)]" />;
      case 'pen-tool': return <PenTool className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--red)]" />;
      case 'message-square': return <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--red)]" />;
      case 'check-circle': return <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--red)]" />;
      default: return <PenTool className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--red)]" />;
    }
  };

  const cardBg = theme === 'dark' ? '#22201c' : theme === 'blueprint' ? '#102e5c' : '#ffffff';
  const textColor = theme === 'dark' || theme === 'blueprint' ? '#ffffff' : '#2b2620';
  const textSoftColor = theme === 'dark' ? '#e3ded5' : theme === 'blueprint' ? '#c2e0ff' : '#4a423a';

  return (
    <section className="relative py-16 sm:py-24 px-4 bg-desk-wood overflow-hidden border-b-8 border-[var(--craft-b)]" id="studio">
      
      {/* Studio Grid Panel Background */}
      <div className="absolute inset-2 sm:inset-8 bg-graph-paper opacity-95 shadow-2xl rounded-sm pointer-events-none border border-[var(--grid)]" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        
        {/* Process Header */}
        <AnimatedSection direction="up">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-marker text-4xl sm:text-6xl md:text-7xl text-[var(--ink)] -rotate-1 inline-block">
              Graphic Design Process
            </h2>

            <svg className="w-48 sm:w-64 mx-auto mt-1 block" viewBox="0 0 260 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12c40-14 80 14 120 0s80-14 120 0" stroke="var(--red)" strokeWidth="4" strokeLinecap="round" fill="none"/>
            </svg>

            <p className="font-sans text-xs sm:text-base text-[var(--ink-soft)] max-w-md mx-auto mt-3 sm:mt-4 leading-relaxed px-2">
              Five steps from a blank canvas to a polished, high-resolution poster print. Click any step to inspect deliverables.
            </p>
          </div>
        </AnimatedSection>

        {/* Process Hexagons Container */}
        <div className="relative max-w-5xl mx-auto mb-12 sm:mb-16">
          
          {/* Animated String Line */}
          <div className="hidden lg:block absolute top-1/2 left-[8%] right-[8%] h-[3px] border-t-4 border-dashed border-[var(--red)] -translate-y-1/2 z-0 opacity-80" />

          {/* Hex Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6 relative z-10">
            {PROCESS_STEPS.map((step, idx) => {
              const isSelected = activeStep?.num === step.num;
              return (
                <AnimatedSection key={step.num} delay={idx * 0.08} direction="scale">
                  <motion.div
                    whileHover={{ scale: 1.08, y: -8 }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={playPaperRustle}
                    onClick={() => {
                      setActiveStep(step);
                      playPop();
                    }}
                    style={{
                      backgroundColor: cardBg,
                      color: textColor,
                      clipPath: 'polygon(50% 0%, 100% 26%, 100% 74%, 50% 100%, 0% 74%, 0% 26%)'
                    }}
                    className={`hex relative aspect-[1/1.05] flex flex-col items-center justify-center text-center p-2 sm:p-4 shadow-xl border border-[var(--ink)]/30 cursor-pointer transition-all duration-300 ${
                      isSelected ? 'ring-4 ring-[var(--red)] scale-105' : ''
                    }`}
                  >
                    <span className="pin red top-1 left-1/2 -ml-2" />
                    
                    <div className="mb-1 sm:mb-2">
                      {getStepIcon(step.icon)}
                    </div>

                    <span className="font-kalam font-bold text-[10px] sm:text-xs text-[var(--red)] tracking-widest">
                      STEP {step.num}
                    </span>

                    <h4 
                      style={{ color: textColor }}
                      className="font-kalam font-bold text-xs sm:text-base uppercase mt-0.5"
                    >
                      {step.title}
                    </h4>

                    <p 
                      style={{ color: textSoftColor }}
                      className="font-sans text-[9px] sm:text-[11px] leading-tight mt-0.5 sm:mt-1 max-w-[120px] hidden xs:block"
                    >
                      {step.subtitle}
                    </p>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>

        {/* Step Deliverables Drawer / Overlay */}
        <AnimatePresence>
          {activeStep && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 22 }}
              style={{ backgroundColor: cardBg, color: textColor }}
              className="max-w-2xl mx-auto border-3 border-[var(--ink)] shadow-2xl p-5 sm:p-8 rounded-lg relative"
            >
              <button
                onClick={() => {
                  playStampClick();
                  setActiveStep(null);
                }}
                className="absolute top-3 right-3 p-1.5 border border-[var(--ink)] rounded bg-[var(--craft)] hover:bg-[var(--red)] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="font-kalam font-bold text-xs sm:text-sm bg-[var(--yellow)] text-[#2b2620] px-2.5 py-1 border border-[var(--ink)] rounded">
                  STEP {activeStep.num} — {activeStep.title}
                </span>
                <span 
                  style={{ color: textSoftColor }}
                  className="font-sans text-xs font-semibold"
                >
                  {activeStep.subtitle}
                </span>
              </div>

              <p 
                style={{ color: textSoftColor }}
                className="font-sans text-xs sm:text-sm mb-5 leading-relaxed"
              >
                {activeStep.description}
              </p>

              <div className="border-t border-dashed border-[var(--ink)]/30 pt-4">
                <h5 className="font-kalam font-bold text-xs uppercase tracking-widest text-[var(--red)] mb-3">
                  Key Deliverables &amp; Artifacts:
                </h5>
                <div 
                  style={{ color: textColor }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-sans text-xs font-medium"
                >
                  {activeStep.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <ArrowRight className="w-3.5 h-3.5 text-[var(--red)] shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
