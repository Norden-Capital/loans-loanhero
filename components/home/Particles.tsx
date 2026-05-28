"use client";

import React, { useEffect, useState } from 'react';

const Particles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; size: string; duration: string; delay: string }>>([]);

  useEffect(() => {
    // Generate initial particles
    const initialParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      size: `${Math.random() * 6 + 2}px`,
      duration: `${Math.random() * 10 + 15}s`,
      delay: `${Math.random() * 5}s`,
    }));
    setParticles(initialParticles);

    // Add new particles over time
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev.slice(-20), // Keep a reasonable amount
        {
          id: Date.now(),
          left: `${Math.random() * 100}vw`,
          size: `${Math.random() * 6 + 2}px`,
          duration: `${Math.random() * 10 + 15}s`,
          delay: '0s',
        }
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute bg-[var(--primary)] rounded-full opacity-10 animate-[float-particles_linear_infinite]"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            bottom: '-20px'
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
