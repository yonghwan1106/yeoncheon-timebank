'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface AnimatedBackgroundProps {
  particleCount?: number;
  showParticles?: boolean;
  className?: string;
}

export function AnimatedBackground({
  particleCount = 20,
  showParticles = true,
  className = '',
}: AnimatedBackgroundProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const actualParticleCount = isMobile ? Math.floor(particleCount / 2) : particleCount;

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: actualParticleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 8 + 4,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.1,
    }));
  }, [actualParticleCount]);

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}>
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh" />

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-0 -left-40 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, oklch(0.55 0.15 145 / 0.15) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute top-1/3 -right-20 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, oklch(0.65 0.12 240 / 0.12) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-20 left-1/4 w-72 h-72 rounded-full"
        style={{
          background: 'radial-gradient(circle, oklch(0.8 0.16 85 / 0.1) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating Particles */}
      {showParticles && (
        <div className="particles-container">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: `${particle.x}%`,
                width: particle.size,
                height: particle.size,
                background: `oklch(0.55 0.15 145 / ${particle.opacity})`,
              }}
              initial={{ y: '100vh', opacity: 0 }}
              animate={{
                y: '-100vh',
                opacity: [0, particle.opacity, particle.opacity, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0 0 0) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0 0 0) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

export default AnimatedBackground;
