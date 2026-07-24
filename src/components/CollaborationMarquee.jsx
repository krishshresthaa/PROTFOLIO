import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const PARTNERS = [
  {
    name: 'Shashan Robotics & Infotech',
    logo: '/partners/shashan-infotech.jpg',
    category: 'Robotics & Tech'
  },
  {
    name: 'Shashan Emblem',
    logo: '/partners/shashan-emblem.png',
    category: 'Brand Identity'
  },
  {
    name: 'TS Logo Design',
    logo: '/partners/ts-emblem.png',
    category: 'Visual Arts'
  },
  {
    name: 'Mimosa Care',
    logo: '/partners/mimosa-care.png',
    category: 'Healthcare & Trust'
  },
  {
    name: 'Shashan Robotics Community',
    logo: '/partners/shashan-community.png',
    category: 'Community & Tech'
  }
];

export default function CollaborationMarquee({ theme }) {
  // Duplicate array 3 times for continuous infinite loop
  const marqueeItems = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  const cardBg = theme === 'dark' ? '#22201c' : theme === 'blueprint' ? '#102e5c' : '#ffffff';
  const textColor = theme === 'dark' || theme === 'blueprint' ? '#ffffff' : '#2b2620';
  const textSoftColor = theme === 'dark' ? '#e3ded5' : theme === 'blueprint' ? '#c2e0ff' : '#4a423a';

  return (
    <section className="relative py-16 px-4 bg-[var(--paper)] border-b-8 border-[var(--craft-b)] overflow-hidden select-none" id="collaborations">
      
      {/* Decorative Header */}
      <AnimatedSection direction="up">
        <div className="max-w-[1240px] mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 font-sans font-extrabold text-xs tracking-widest uppercase text-[var(--red)] border-2 border-dashed border-[var(--red)] px-4 py-1.5 -rotate-1 shadow-sm">
            ★ TRUSTED COLLABORATIONS &amp; BRANDING ★
          </div>
          <h3 
            style={{ color: textColor }}
            className="font-marker text-3xl sm:text-5xl mt-3 tracking-tight"
          >
            Brands &amp; Teams I've Collaborated With
          </h3>
        </div>
      </AnimatedSection>

      {/* Infinite Horizontal Sliding Marquee Track */}
      <div className="relative w-full overflow-hidden flex py-4">
        
        {/* Left/Right Vignette Gradient Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--paper)] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--paper)] to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex gap-8 items-center flex-nowrap"
          animate={{ x: ['0%', '-33.33%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 22
          }}
        >
          {marqueeItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 30 }}
              style={{ backgroundColor: cardBg, color: textColor }}
              className="flex-shrink-0 flex items-center gap-4 p-4 px-6 border-3 border-[var(--ink)] rounded-lg shadow-lg cursor-pointer -rotate-1 transition-transform"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-md border border-[var(--ink)]/30 overflow-hidden flex items-center justify-center p-2 shadow-inner">
                <img
                  src={item.logo}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <span className="font-kalam font-bold text-base sm:text-lg block leading-tight">
                  {item.name}
                </span>
                <span 
                  style={{ color: textSoftColor }}
                  className="font-sans text-xs font-semibold uppercase tracking-wider block mt-0.5"
                >
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
