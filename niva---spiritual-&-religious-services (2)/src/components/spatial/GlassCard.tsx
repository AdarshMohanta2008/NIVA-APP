import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { useEffectsSettings } from '../../context/EffectsContext';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  elevated?: boolean;
  className?: string;
  glowOnHover?: boolean;
  accentGlow?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  elevated = false,
  className = '',
  glowOnHover = false,
  accentGlow,
  ...props
}) => {
  const { effectsLevel } = useEffectsSettings();

  return (
    <motion.div
      whileHover={
        effectsLevel === 'minimal'
          ? undefined
          : {
              y: -2,
              transition: { duration: 0.2 },
            }
      }
      whileTap={
        effectsLevel === 'minimal'
          ? undefined
          : {
              scale: 0.985,
              transition: { duration: 0.1 },
            }
      }
      className={`
        ${elevated ? 'glass-panel-elevated' : 'glass-panel'}
        ${glowOnHover ? 'hover:glow-halo-violet' : ''}
        ${className}
      `}
      style={{
        ...(accentGlow && glowOnHover ? ({ '--accent-glow': accentGlow } as React.CSSProperties) : {}),
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
