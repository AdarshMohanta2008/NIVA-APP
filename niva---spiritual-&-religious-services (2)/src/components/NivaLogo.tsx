import React from 'react';
import { motion } from 'motion/react';
import { useEffectsSettings } from '../context/EffectsContext';

export interface NivaLogoProps {
  variant?: 'icon' | 'full';
  size?: number | string;
  className?: string;
  glowColor?: string;
  withGlow?: boolean;
  animated?: boolean;
  showStarTwinkle?: boolean;
  alt?: string;
}

export const NivaLogo: React.FC<NivaLogoProps> = ({
  variant = 'icon',
  size = 42,
  className = '',
  glowColor = '#A855F7',
  withGlow = true,
  animated = false,
  showStarTwinkle = false,
  alt = 'NIVA logo',
}) => {
  const { effectsLevel } = useEffectsSettings();
  const isMinimal = effectsLevel === 'minimal';
  const shouldAnimate = animated && !isMinimal;

  const src =
    variant === 'full'
      ? '/src/assets/images/niva-logo-full.png'
      : '/src/assets/images/niva-logo-icon.png';

  const numericSize = typeof size === 'number' ? size : parseInt(size as string, 10) || 42;
  const heightStyle = variant === 'full' ? Math.round(numericSize * 1.48) : numericSize;

  const imgElement = (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: `${heightStyle}px`,
      }}
    >
      {/* Soft Radial Ambient Glow */}
      {withGlow && !isMinimal && (
        <div
          className={`absolute inset-0 rounded-full blur-xl pointer-events-none transition-all duration-700 ${
            shouldAnimate ? 'animate-pulse' : 'opacity-40'
          }`}
          style={{
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            transform: 'scale(1.4)',
            opacity: 0.45,
          }}
          aria-hidden="true"
        />
      )}

      {/* Primary Transparent Logo Image */}
      <img
        src={src}
        alt={alt}
        className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
        style={{
          imageRendering: 'crisp-edges',
        }}
      />

      {/* Gold Star Subtle Twinkle Accent Overlay */}
      {showStarTwinkle && !isMinimal && (
        <span
          className="absolute top-[3%] left-[49%] -translate-x-1/2 w-2 h-2 rounded-full bg-amber-200/90 blur-[1px] pointer-events-none animate-ping [animation-duration:3s]"
          aria-hidden="true"
        />
      )}

      {/* Subtle Flame Warmth Accent Overlay */}
      {showStarTwinkle && !isMinimal && (
        <span
          className="absolute top-[28%] left-[49%] -translate-x-1/2 w-1.5 h-2 rounded-full bg-amber-400/50 blur-[2px] pointer-events-none animate-pulse [animation-duration:2s]"
          aria-hidden="true"
        />
      )}
    </div>
  );

  if (shouldAnimate) {
    return (
      <motion.div
        animate={{
          y: [0, -5, 0],
          scale: [1, 1.015, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="inline-flex items-center justify-center"
      >
        {imgElement}
      </motion.div>
    );
  }

  return imgElement;
};
