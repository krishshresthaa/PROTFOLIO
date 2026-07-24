import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const rafId = useRef(null);

  useEffect(() => {
    // Only enable custom cursor on non-touch desktop devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let pendingX = -100;
    let pendingY = -100;
    let ticking = false;

    const handleMouseMove = (e) => {
      pendingX = e.clientX;
      pendingY = e.clientY;

      if (!ticking) {
        rafId.current = requestAnimationFrame(() => {
          setMousePosition({ x: pendingX, y: pendingY });

          // Detect hover targets efficiently
          const target = e.target;
          const isClickable = target && target.closest('a, button, input, textarea, .stamp-btn, .frame, .hex, .note, .pin, canvas');
          setIsHovered(!!isClickable);

          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Inner Red Pen Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3.5 h-3.5 bg-[var(--red)] rounded-full z-50 pointer-events-none shadow-md will-change-transform transform-gpu"
        animate={{
          x: mousePosition.x - 7,
          y: mousePosition.y - 7,
          scale: isClicking ? 0.6 : isHovered ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 1200, damping: 50 }}
      />

      {/* Outer Magnetic Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-[var(--ink)] rounded-full z-40 pointer-events-none opacity-70 will-change-transform transform-gpu"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isClicking ? 0.85 : isHovered ? 2.0 : 1,
          borderColor: isHovered ? 'var(--red)' : 'var(--ink)',
          borderWidth: isHovered ? '2.5px' : '2px'
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      />
    </div>
  );
}
