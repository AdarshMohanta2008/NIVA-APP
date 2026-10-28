import React, { useMemo } from 'react';
import { useEffectsSettings } from '../../context/EffectsContext';
import { DivineThemeConfig } from '../../theme/divineThemes';

interface FloatingParticlesProps {
  themeConfig: DivineThemeConfig;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({ themeConfig }) => {
  const { effectsLevel, isBackgroundActive } = useEffectsSettings();

  const particles = useMemo<Particle[]>(() => {
    if (effectsLevel === 'minimal') return [];
    const count = effectsLevel === 'balanced' ? 6 : 18;
    const colors = themeConfig.particleColors;

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 10 + ((i * 19) % 80),
      y: 15 + ((i * 23) % 75),
      size: 2 + (i % 3) * 1.5,
      color: colors[i % colors.length],
      duration: 6 + (i % 4) * 2,
      delay: (i % 5) * 1.2,
    }));
  }, [effectsLevel, themeConfig.particleColors]);

  if (effectsLevel === 'minimal' || !isBackgroundActive || particles.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-float-slow pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            opacity: 0.65,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
