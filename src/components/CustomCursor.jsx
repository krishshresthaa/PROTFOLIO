import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    // Disable on touch / mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let isMouseDown = false;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target;
      isHovering = !!(target && target.closest('a, button, input, textarea, .stamp-btn, .frame, .hex, .note, .pin, canvas'));
    };

    const handleMouseDown = () => { isMouseDown = true; };
    const handleMouseUp = () => { isMouseDown = false; };

    const render = () => {
      // Smooth lerp for outer magnetic ring
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      if (dotRef.current) {
        const dotScale = isMouseDown ? 0.6 : isHovering ? 1.5 : 1;
        dotRef.current.style.transform = `translate3d(${mouseX - 7}px, ${mouseY - 7}px, 0) scale(${dotScale})`;
      }

      if (ringRef.current) {
        const ringScale = isMouseDown ? 0.85 : isHovering ? 1.8 : 1;
        const ringColor = isHovering ? 'var(--red)' : 'var(--ink)';
        ringRef.current.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0) scale(${ringScale})`;
        ringRef.current.style.borderColor = ringColor;
      }

      rafId.current = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Inner Red Pen Dot (Pure Hardware-Accelerated DOM Ref) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3.5 h-3.5 bg-[var(--red)] rounded-full z-50 pointer-events-none shadow-sm will-change-transform transform-gpu transition-transform duration-75"
      />

      {/* Outer Magnetic Ring (Pure Hardware-Accelerated DOM Ref) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-[var(--ink)] rounded-full z-40 pointer-events-none opacity-70 will-change-transform transform-gpu transition-transform duration-100"
      />
    </div>
  );
}
