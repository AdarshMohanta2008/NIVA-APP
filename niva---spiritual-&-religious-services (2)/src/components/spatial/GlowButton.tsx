import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { useEffectsSettings } from '../../context/EffectsContext';

interface GlowButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: 'primary' | 'glass' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  glowColor?: string;
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  variant = 'glass',
  size = 'md',
  className = '',
  glowColor,
  ...props
}) => {
  const { effectsLevel } = useEffectsSettings();

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-full',
    md: 'px-4 py-2 text-sm rounded-full',
    lg: 'px-6 py-3 text-base rounded-full font-semibold',
  }[size];

  const variantClasses = {
    glass:
      'bg-white/10 hover:bg-white/15 text-white border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_16px_rgba(0,0,0,0.4)]',
    primary:
      'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_24px_rgba(168,85,247,0.4)] border border-purple-400/30',
    gold:
      'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-[#07030F] font-bold shadow-[0_0_24px_rgba(245,158,11,0.45)] border border-amber-300/40',
  }[variant];

  return (
    <motion.button
      whileHover={
        effectsLevel === 'minimal'
          ? undefined
          : {
              scale: 1.03,
              boxShadow: glowColor ? `0 0 24px ${glowColor}` : undefined,
              transition: { duration: 0.18 },
            }
      }
      whileTap={
        effectsLevel === 'minimal'
          ? undefined
          : {
              scale: 0.96,
              transition: { duration: 0.1 },
            }
      }
      className={`relative inline-flex items-center justify-center gap-2 cursor-pointer transition-colors backdrop-blur-md ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
