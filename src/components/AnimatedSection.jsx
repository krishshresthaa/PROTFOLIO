import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedSection({ children, className = '', delay = 0, direction = 'up' }) {
  const getVariants = () => {
    switch (direction) {
      case 'left':
        return {
          hidden: { opacity: 0, x: -60, rotate: -2 },
          visible: { opacity: 1, x: 0, rotate: 0 }
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: 60, rotate: 2 },
          visible: { opacity: 1, x: 0, rotate: 0 }
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.85, y: 30 },
          visible: { opacity: 1, scale: 1, y: 0 }
        };
      default:
        return {
          hidden: { opacity: 0, y: 50, rotate: -1 },
          visible: { opacity: 1, y: 0, rotate: 0 }
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      variants={getVariants()}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
