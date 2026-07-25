import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { USER_INFO } from '../data/portfolioData';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            if (onCompleteRef.current) onCompleteRef.current();
          }, 200);
          return 100;
        }
        return prev + 15;
      });
    }, 40);

    // Safety Timeout: Force completion after 1.2s max
    const safetyTimeout = setTimeout(() => {
      clearInterval(timer);
      setIsFinished(true);
      if (onCompleteRef.current) onCompleteRef.current();
    }, 1200);

    return () => {
      clearInterval(timer);
      clearTimeout(safetyTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#faf7ee] text-[var(--ink)] font-kalam select-none p-6 bg-graph-paper"
        >
          {/* Decorative Desk Craft Card */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-white border-4 border-[var(--ink)] shadow-2xl p-8 sm:p-12 rounded max-w-lg w-full text-center -rotate-1"
          >
            <span className="tape top-[-14px] left-1/2 -ml-12 w-24 h-6 -rotate-2" />

            {/* Logo Stamp */}
            <div className="font-marker text-4xl sm:text-6xl text-[var(--ink)] tracking-tight mb-2">
              {USER_INFO.shortName}<span className="text-[var(--red)]">.</span>
            </div>

            <p className="font-kalam font-bold text-base text-[var(--ink-soft)] mb-6">
              Setting up designer's desk &amp; sketchbook...
            </p>

            {/* Progress Bar Container */}
            <div className="relative w-full h-4 bg-stone-200 border-2 border-[var(--ink)] rounded-full overflow-hidden mb-4 shadow-inner">
              <motion.div
                className="h-full bg-[var(--red)] transition-all duration-150"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between font-mono-code font-bold text-xs text-[var(--ink-soft)]">
              <span>INITIALIZING WORKSPACE</span>
              <span className="text-[var(--red)]">{Math.min(progress, 100)}%</span>
            </div>

            {progress >= 100 && (
              <motion.div
                initial={{ scale: 1.5, opacity: 0, rotate: -15 }}
                animate={{ scale: 1, opacity: 1, rotate: -4 }}
                className="mt-6 inline-block font-marker text-xl text-emerald-700 border-3 border-emerald-700 px-4 py-1 rounded shadow-md"
              >
                READY TO EXPLORE ✓
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
