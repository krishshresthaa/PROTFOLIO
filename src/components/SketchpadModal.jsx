import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eraser, Download, Trash2, Edit2 } from 'lucide-react';
import { playStampClick, playPop } from '../utils/audioSynth';

export default function SketchpadModal({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#2b2620');
  const [lineWidth, setLineWidth] = useState(4);

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 420;

    // Draw grid background
    ctx.fillStyle = '#faf7ee';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#c3d3e0';
    ctx.lineWidth = 1;
    const step = 24;
    for (let x = 0; x < canvas.width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }, [isOpen]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    playPop();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#faf7ee';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Redraw grid
    ctx.strokeStyle = '#c3d3e0';
    ctx.lineWidth = 1;
    const step = 24;
    for (let x = 0; x < canvas.width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  };

  const downloadSketch = () => {
    playStampClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'desk-doodle-sketch.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-3xl bg-[#faf7ee] border-4 border-[var(--ink)] shadow-2xl rounded-lg overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-3 border-b-2 border-[var(--ink)] bg-[var(--craft)]">
            <div className="flex items-center gap-2 font-kalam font-bold text-lg text-[var(--ink)]">
              <Edit2 className="w-5 h-5 text-[var(--red)]" />
              <span>Interactive Desk Sketchpad</span>
            </div>
            <button
              onClick={() => {
                playStampClick();
                onClose();
              }}
              className="p-1 border-2 border-[var(--ink)] rounded hover:bg-[var(--red)] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Canvas Toolbar */}
          <div className="p-3 bg-white border-b-2 border-[var(--ink)]/30 flex flex-wrap items-center justify-between gap-3">
            {/* Color Palette */}
            <div className="flex items-center gap-2">
              {['#2b2620', '#c22a1f', '#3f7cac', '#e8b923', '#3fae5c'].map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setColor(c);
                    playPop();
                  }}
                  className={`w-6 h-6 rounded-full border-2 border-black/30 transition-transform ${
                    color === c ? 'scale-125 ring-2 ring-[var(--red)]' : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>

            {/* Stroke Width Selector */}
            <div className="flex items-center gap-2 font-kalam font-bold text-xs">
              <span>Thickness:</span>
              {[2, 4, 8, 14].map((w) => (
                <button
                  key={w}
                  onClick={() => setLineWidth(w)}
                  className={`px-2 py-0.5 border rounded ${lineWidth === w ? 'bg-[var(--ink)] text-white' : 'bg-gray-100'}`}
                >
                  {w}px
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 font-kalam font-bold text-xs">
              <button
                onClick={clearCanvas}
                className="flex items-center gap-1 px-3 py-1 border border-[var(--ink)] rounded bg-stone-100 hover:bg-stone-200"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
              <button
                onClick={downloadSketch}
                className="flex items-center gap-1 px-3 py-1 border border-[var(--ink)] rounded bg-[var(--yellow)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white"
              >
                <Download className="w-3.5 h-3.5" /> Save PNG
              </button>
            </div>
          </div>

          {/* Drawing Canvas Area */}
          <div className="relative w-full cursor-crosshair">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onMouseMove={draw}
              onTouchStart={startDrawing}
              onTouchEnd={stopDrawing}
              onTouchMove={draw}
            />
          </div>

          {/* Footer Note */}
          <div className="px-6 py-2 bg-[var(--craft)]/50 border-t border-[var(--ink)]/20 font-kalam font-bold text-xs text-[var(--ink-soft)] text-center">
            Sketch your idea, sign your name, or leave a quick doodle on the desk!
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
