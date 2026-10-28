import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffectsSettings } from '../../context/EffectsContext';

interface LightBurstProps {
  isActive: boolean;
  color?: string;
  type?: 'lightburst' | 'crescent-iris' | 'rays-fan' | 'golden-ripple' | 'lotus-bloom' | 'bubbles-rise' | 'candle-glow' | 'aurora-shift';
  onComplete?: () => void;
}

export const LightBurst: React.FC<LightBurstProps> = ({
  isActive,
  color = '#F59E0B',
  type = 'lightburst',
  onComplete,
}) => {
  const { effectsLevel } = useEffectsSettings();
  const isMinimal = effectsLevel === 'minimal';

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: isMinimal ? 0.2 : 0.8 }}
        onAnimationComplete={onComplete}
        className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        {/* Central Ambient Glow Core */}
        <motion.div
          initial={{ scale: 0.1, opacity: 0.2 }}
          animate={{ scale: [0.1, 1.8, 3.5], opacity: [0.3, 1, 0] }}
          transition={{ duration: isMinimal ? 0.3 : 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-96 h-96 rounded-full"
          style={{
            background: `radial-gradient(circle, #FFFFFF 0%, ${color} 40%, transparent 75%)`,
            filter: isMinimal ? 'none' : 'blur(40px)',
          }}
        />

        {/* Golden Ripple / Concentric Expanding Shockwave */}
        {!isMinimal && (
          <>
            <motion.div
              initial={{ scale: 0.1, opacity: 0.9 }}
              animate={{ scale: 3.8, opacity: 0 }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
              className="absolute w-[450px] h-[450px] rounded-full border-2 border-white/80"
              style={{ boxShadow: `0 0 50px ${color}` }}
            />
            <motion.div
              initial={{ scale: 0.05, opacity: 0.8 }}
              animate={{ scale: 4.8, opacity: 0 }}
              transition={{ duration: 0.95, delay: 0.1, ease: 'easeOut' }}
              className="absolute w-[450px] h-[450px] rounded-full border border-white/60"
              style={{ boxShadow: `0 0 35px ${color}` }}
            />
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
