import React from 'react';
import { motion } from 'motion/react';

export function SunBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, rgba(251, 146, 60, 0.2) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: ['-20%', '10%', '-20%'],
          y: ['-10%', '20%', '-10%'],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full right-0 top-0"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, rgba(249, 115, 22, 0.15) 50%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          x: ['20%', '-10%', '20%'],
          y: ['10%', '-20%', '10%'],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full bottom-0 left-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(252, 211, 77, 0.2) 0%, rgba(251, 191, 36, 0.1) 50%, transparent 70%)',
          filter: 'blur(70px)',
        }}
        animate={{
          x: ['-50%', '-40%', '-50%'],
          y: ['30%', '10%', '30%'],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: i % 2 === 0 
              ? 'rgba(251, 191, 36, 0.4)' 
              : 'rgba(249, 115, 22, 0.3)',
            left: `${10 + i * 12}%`,
            top: `${20 + (i * 7) % 60}%`,
            filter: 'blur(2px)',
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, (i % 2 === 0 ? 50 : -50), 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Sun rays effect */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`ray-${i}`}
          className="absolute origin-center"
          style={{
            width: '2px',
            height: '200px',
            background: `linear-gradient(to bottom, rgba(251, 191, 36, ${0.1 + i * 0.05}), transparent)`,
            left: '50%',
            top: '0%',
            transformOrigin: 'top center',
          }}
          animate={{
            rotate: [i * 60, i * 60 + 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
