import React, { useMemo } from 'react';
import { useEffectsSettings } from '../../context/EffectsContext';
import { DivineThemeConfig } from '../../theme/divineThemes';

interface CosmicBackgroundProps {
  themeConfig: DivineThemeConfig;
}

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  layer: 1 | 2 | 3;
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ themeConfig }) => {
  const { effectsLevel, isBackgroundActive } = useEffectsSettings();

  // Generate deterministic stars
  const stars = useMemo<Star[]>(() => {
    if (effectsLevel === 'minimal') return [];
    const count = effectsLevel === 'balanced' ? 30 : 75;
    const list: Star[] = [];
    for (let i = 0; i < count; i++) {
      // Pseudo-random based on index
      const seed = (i * 9301 + 49297) % 233280;
      const seed2 = ((i + 1) * 9301 + 49297) % 233280;
      const seed3 = ((i + 2) * 9301 + 49297) % 233280;
      const x = (seed / 233280) * 100;
      const y = (seed2 / 233280) * 100;
      const size = 1 + (seed3 / 233280) * 2;
      const layer = ((i % 3) + 1) as 1 | 2 | 3;
      list.push({
        id: i,
        x,
        y,
        size,
        duration: 3 + (i % 5) * 1.5,
        delay: (i % 7) * 0.7,
        opacity: 0.3 + (i % 4) * 0.2,
        layer,
      });
    }
    return list;
  }, [effectsLevel]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
      style={{
        backgroundColor: '#07030F',
      }}
    >
      {/* 1. Base deep purple & indigo radial cosmic gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 50% 0%, #1c0b38 0%, transparent 60%),
            radial-gradient(circle at 10% 40%, #15092a 0%, transparent 50%),
            radial-gradient(circle at 90% 60%, #1e0934 0%, transparent 55%),
            linear-gradient(180deg, #07030F 0%, #0d051c 50%, #07030F 100%)
          `,
        }}
      />

      {/* 2. Faith-Adaptive Nebula Clouds with smooth cross-fade */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          effectsLevel === 'minimal' ? 'opacity-20' : 'opacity-70'
        }`}
        style={{
          background: themeConfig.nebulaGradient,
          filter: effectsLevel === 'minimal' ? 'none' : 'blur(40px)',
        }}
      />

      {/* 3. Drifting Animated Nebula Blobs (only in full / balanced when active) */}
      {effectsLevel !== 'minimal' && isBackgroundActive && (
        <>
          <div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-35 animate-nebula-1 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, #7e22ce 0%, #3b0764 60%, transparent 80%)',
              filter: 'blur(60px)',
            }}
          />
          <div
            className="absolute top-1/3 -right-32 w-96 h-96 rounded-full opacity-30 animate-nebula-2 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${themeConfig.accentColor}40 0%, #581c87 50%, transparent 80%)`,
              filter: 'blur(70px)',
            }}
          />
          <div
            className="absolute -bottom-24 left-1/4 w-[500px] h-[350px] rounded-full opacity-25 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, #4c1d95 0%, #2e1065 60%, transparent 85%)',
              filter: 'blur(80px)',
            }}
          />
        </>
      )}

      {/* 4. 3-Layer Twinkling Starfield */}
      {stars.length > 0 && (
        <div className="absolute inset-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className={`absolute rounded-full bg-white ${
                effectsLevel === 'full' && isBackgroundActive ? 'animate-pulse' : ''
              }`}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                boxShadow:
                  star.size > 2
                    ? `0 0 ${star.size * 2}px ${star.size}px rgba(255, 255, 255, 0.4)`
                    : 'none',
                animationDuration: `${star.duration}s`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* 5. Occasional Shooting Star in Full Effects */}
      {effectsLevel === 'full' && isBackgroundActive && (
        <div
          className="absolute top-16 right-10 w-24 h-[1.5px] pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(245,158,11,0.5), transparent)',
            animation: 'shooting-star 14s infinite ease-out 3s',
            filter: 'drop-shadow(0 0 4px #FFFFFF)',
          }}
        />
      )}

      {/* 6. Faint Sacred Galaxy Core Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(109, 40, 217, 0.05) 50%, transparent 75%)',
          filter: 'blur(60px)',
        }}
      />

      {/* 7. Soft Sacred Horizon Glow at Screen Bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none opacity-40"
        style={{
          background: `linear-gradient(to top, ${themeConfig.accentColor}25 0%, rgba(139, 92, 246, 0.1) 40%, transparent 100%)`,
        }}
      />
    </div>
  );
};
