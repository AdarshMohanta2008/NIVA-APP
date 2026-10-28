import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NivaLogo } from '../NivaLogo';
import { useEffectsSettings } from '../../context/EffectsContext';

interface CosmicSplashScreenProps {
  onComplete?: () => void;
  accentColor?: string;
  duration?: number;
}

export const CosmicSplashScreen: React.FC<CosmicSplashScreenProps> = ({
  onComplete,
  accentColor = '#A855F7',
  duration = 900,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const { effectsLevel } = useEffectsSettings();
  const isMinimal = effectsLevel === 'minimal';

  useEffect(() => {
    // If minimal effects or fast load, finish quickly
    const time = isMinimal ? 200 : duration;
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, time);

    return () => clearTimeout(timer);
  }, [duration, isMinimal, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isMinimal ? 0.1 : 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07030F] select-none pointer-events-none"
        >
          {/* Subtle cosmic glow */}
          <div
            className="absolute w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
            }}
          />

          {/* Logo with gentle pulse & gold star shimmer */}
          <motion.div
            initial={isMinimal ? undefined : { scale: 0.9, opacity: 0 }}
            animate={isMinimal ? undefined : { scale: [0.95, 1.02, 0.98], opacity: 1 }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative z-10 flex flex-col items-center"
          >
            <NivaLogo
              variant="icon"
              size={88}
              glowColor={accentColor}
              withGlow={true}
              animated={!isMinimal}
              showStarTwinkle={true}
            />

            <h1 className="mt-4 font-brand text-2xl font-bold tracking-widest gradient-text-sacred">
              NIVA
            </h1>
            <p className="text-xs text-white/50 tracking-[0.25em] uppercase font-medium mt-1">
              Sacred Cosmos
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
