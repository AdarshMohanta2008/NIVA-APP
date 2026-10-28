import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Religion } from '../../types';
import { DIVINE_THEMES, DivineThemeConfig } from '../../theme/divineThemes';
import { useEffectsSettings } from '../../context/EffectsContext';

interface AtmosphereBackgroundProps {
  currentReligion: Religion;
}

export const AtmosphereBackground: React.FC<AtmosphereBackgroundProps> = ({ currentReligion }) => {
  const { effectsLevel, isBackgroundActive } = useEffectsSettings();
  const theme = DIVINE_THEMES[currentReligion] || DIVINE_THEMES.All;
  const { atmosphere } = theme;
  const isMinimal = effectsLevel === 'minimal';
  const isBalanced = effectsLevel === 'balanced';

  // Deterministic particles
  const particleCount = useMemo(() => {
    if (isMinimal) return 0;
    return isBalanced ? atmosphere.particles.countBalanced : atmosphere.particles.countFull;
  }, [isMinimal, isBalanced, atmosphere.particles]);

  const particles = useMemo(() => {
    if (particleCount === 0) return [];
    const list = [];
    const colors = atmosphere.particles.colors;
    for (let i = 0; i < particleCount; i++) {
      const seed1 = (i * 9301 + 49297) % 233280;
      const seed2 = ((i + 1) * 9301 + 49297) % 233280;
      const seed3 = ((i + 2) * 9301 + 49297) % 233280;
      list.push({
        id: i,
        left: (seed1 / 233280) * 100,
        top: (seed2 / 233280) * 100,
        size: 1.5 + (seed3 / 233280) * 3,
        duration: (14 / atmosphere.particles.speed) + (i % 6) * 2,
        delay: (i % 9) * 0.7,
        color: colors[i % colors.length],
        opacity: 0.25 + (i % 5) * 0.15,
      });
    }
    return list;
  }, [particleCount, atmosphere.particles]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
      style={{ backgroundColor: atmosphere.bg0 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentReligion}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isMinimal ? 0.2 : 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Layer 1: Atmospheric Sky & Nebula Gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 50% 0%, ${atmosphere.glow} 0%, transparent 65%),
                radial-gradient(circle at 85% 80%, ${atmosphere.bg2} 0%, transparent 55%),
                linear-gradient(180deg, ${atmosphere.bg0} 0%, ${atmosphere.bg1} 60%, ${atmosphere.bg0} 100%)
              `,
            }}
          />

          {/* Layer 2: Religion-Specific Nature & Abstract Sacred Silhouette */}
          {!isMinimal && (
            <div className="absolute inset-0 pointer-events-none opacity-45 overflow-hidden">
              {/* HINDUISM: Deep purple cosmic space, rotating geometric mandala & shooting stars */}
              {atmosphere.sceneType === 'hinduism' && (
                <div className="absolute inset-0">
                  {/* Concentric subtle rotating mandala */}
                  <div
                    className={`absolute -top-32 -right-32 w-[650px] h-[650px] rounded-full border border-amber-400/10 pointer-events-none ${
                      isBackgroundActive ? 'animate-mandala-slow' : ''
                    }`}
                    style={{
                      background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)',
                    }}
                  >
                    <div className="absolute inset-8 rounded-full border border-purple-400/15 border-dashed" />
                    <div className="absolute inset-20 rounded-full border border-amber-300/10" />
                    <div className="absolute inset-36 rounded-full border border-violet-400/15 border-dotted" />
                  </div>

                  {/* Shooting star streak */}
                  {!isBalanced && (
                    <div
                      className="absolute top-1/4 right-1/4 w-32 h-[1.5px] bg-gradient-to-r from-transparent via-amber-200 to-transparent pointer-events-none"
                      style={{ animation: 'shooting-star 14s infinite ease-in-out' }}
                    />
                  )}
                </div>
              )}

              {/* ISLAM: Desert oasis night, glowing crescent moon, dunes & arabesque geometry */}
              {atmosphere.sceneType === 'islam' && (
                <div className="absolute inset-0">
                  {/* Glowing crescent moon in upper sky */}
                  <div className="absolute top-16 right-16 sm:right-28 w-20 h-20 rounded-full shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-200/40 fill-current">
                      <path d="M50 10 A40 40 0 1 0 90 50 A30 30 0 1 1 50 10 Z" />
                    </svg>
                  </div>

                  {/* Gentle sweeping dunes at bottom */}
                  <div className="absolute bottom-0 inset-x-0 h-48 opacity-30">
                    <svg viewBox="0 0 1200 300" preserveAspectRatio="none" className="w-full h-full text-[#041d18] fill-current">
                      <path d="M0,180 Q300,100 600,160 T1200,120 L1200,300 L0,300 Z" opacity="0.6" />
                      <path d="M0,220 Q400,150 800,210 T1200,180 L1200,300 L0,300 Z" opacity="0.9" />
                    </svg>
                  </div>
                </div>
              )}

              {/* CHRISTIANITY: Heavenly dawn, misty mountain silhouettes & golden rays */}
              {atmosphere.sceneType === 'christianity' && (
                <div className="absolute inset-0">
                  {/* Divine golden light rays from top center */}
                  <div
                    className="absolute top-0 inset-x-0 h-96 opacity-35 pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 0%, rgba(253,230,138,0.35) 0%, rgba(129,140,248,0.1) 45%, transparent 75%)',
                    }}
                  />

                  {/* Layered mountain ridges */}
                  <div className="absolute bottom-0 inset-x-0 h-56 opacity-35">
                    <svg viewBox="0 0 1200 300" preserveAspectRatio="none" className="w-full h-full text-[#080d24] fill-current">
                      <path d="M0,190 L180,90 L380,180 L580,70 L820,160 L1020,95 L1200,180 L1200,300 L0,300 Z" opacity="0.5" />
                      <path d="M0,230 L220,160 L450,220 L700,140 L950,210 L1200,170 L1200,300 L0,300 Z" opacity="0.8" />
                    </svg>
                  </div>
                </div>
              )}

              {/* SIKHISM: Golden sarovar sunrise, holy waters & sun reflection */}
              {atmosphere.sceneType === 'sikhism' && (
                <div className="absolute inset-0">
                  {/* Golden morning sun glow at horizon */}
                  <div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl opacity-35 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #F59E0B 0%, #3B82F6 60%, transparent 80%)' }}
                  />

                  {/* Sacred Sarovar Water line & reflection */}
                  <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#040f24] to-transparent opacity-60">
                    <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
                  </div>
                </div>
              )}

              {/* BUDDHISM: Misty lotus valley, bamboo grove silhouettes & fireflies */}
              {atmosphere.sceneType === 'buddhism' && (
                <div className="absolute inset-0">
                  {/* Subtle bamboo silhouettes on sides */}
                  <div className="absolute inset-y-0 left-2 w-28 opacity-25">
                    <svg viewBox="0 0 100 800" preserveAspectRatio="none" className="w-full h-full stroke-emerald-900/60 fill-none" strokeWidth="3">
                      <line x1="20" y1="0" x2="20" y2="800" />
                      <line x1="60" y1="0" x2="60" y2="800" />
                      <line x1="85" y1="0" x2="85" y2="800" />
                    </svg>
                  </div>

                  {/* Soft mist cloud */}
                  <div
                    className="absolute bottom-10 inset-x-0 h-48 opacity-30 pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 80%, rgba(244,114,182,0.18) 0%, transparent 70%)',
                    }}
                  />
                </div>
              )}

              {/* JAINISM: Pearl serenity, pale peaks, mirror lake & rising bubbles */}
              {atmosphere.sceneType === 'jainism' && (
                <div className="absolute inset-0">
                  {/* Pale ethereal mountain silhouette */}
                  <div className="absolute bottom-0 inset-x-0 h-52 opacity-25">
                    <svg viewBox="0 0 1200 300" preserveAspectRatio="none" className="w-full h-full text-[#081820] fill-current">
                      <path d="M0,200 L250,110 L500,210 L750,90 L1000,190 L1200,120 L1200,300 L0,300 Z" />
                    </svg>
                  </div>

                  {/* Mint-pearl aura band */}
                  <div
                    className="absolute top-1/4 inset-x-0 h-40 opacity-25 blur-2xl pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(45,212,191,0.2), rgba(254,240,138,0.2), transparent)' }}
                  />
                </div>
              )}

              {/* JUDAISM: Sapphire olive-grove night, stars & starlight candlelight glow */}
              {atmosphere.sceneType === 'judaism' && (
                <div className="absolute inset-0">
                  {/* Olive tree silhouette */}
                  <div className="absolute bottom-0 right-4 sm:right-16 w-64 h-64 opacity-25">
                    <svg viewBox="0 0 200 200" className="w-full h-full fill-[#030919]">
                      <path d="M100 180 Q95 140 85 110 Q70 80 50 60 Q80 70 95 90 Q110 65 140 50 Q125 80 115 105 Q105 140 100 180 Z" />
                      <circle cx="50" cy="55" r="30" opacity="0.8" />
                      <circle cx="140" cy="50" r="35" opacity="0.8" />
                      <circle cx="95" cy="40" r="38" opacity="0.8" />
                    </svg>
                  </div>

                  {/* Warm candlelight glow pool */}
                  <div
                    className="absolute bottom-12 left-1/3 w-72 h-72 rounded-full blur-3xl opacity-25 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)' }}
                  />
                </div>
              )}

              {/* ALL (UNIVERSAL): Drifting Seven-Faith Aurora Borealis */}
              {atmosphere.sceneType === 'all' && (
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className={`absolute -top-20 inset-x-0 h-[500px] opacity-35 blur-3xl pointer-events-none ${
                      isBackgroundActive ? 'animate-aurora' : ''
                    }`}
                    style={{
                      background: `
                        linear-gradient(135deg,
                          rgba(168, 85, 247, 0.3) 0%,
                          rgba(16, 185, 129, 0.25) 30%,
                          rgba(59, 130, 246, 0.25) 60%,
                          rgba(245, 158, 11, 0.25) 100%
                        )
                      `,
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Layer 3: Living Atmosphere Particles (Embers, Sand, Motes, Petals, Bubbles, Stars) */}
          {!isMinimal && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {particles.map((p) => (
                <motion.span
                  key={p.id}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: `${p.left}%`,
                    top: `${p.top}%`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    backgroundColor: p.color,
                    boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                    opacity: p.opacity,
                  }}
                  animate={
                    isBackgroundActive
                      ? {
                          y: [0, -35, 0],
                          x: [0, (p.id % 2 === 0 ? 15 : -15), 0],
                          opacity: [p.opacity * 0.5, p.opacity, p.opacity * 0.5],
                          scale: [0.85, 1.25, 0.85],
                        }
                      : undefined
                  }
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
