import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Globe, ChevronRight, Compass } from 'lucide-react';
import { Religion, AppLanguage } from '../types';
import { DIVINE_THEMES, DivineThemeConfig } from '../theme/divineThemes';
import { SUPPORTED_LANGUAGES, FAITH_LOCAL_GREETINGS } from '../utils/translations';
import { audioEngine } from '../utils/audioEngine';
import { LightBurst } from './spatial/LightBurst';
import { useEffectsSettings } from '../context/EffectsContext';
import { NivaLogo } from './NivaLogo';

interface OpeningReligionPortalProps {
  isOpen: boolean;
  onSelectReligionAndEnter: (religion: Religion) => void;
  currentLanguage: AppLanguage;
  onChangeLanguage: (lang: AppLanguage) => void;
  onClose?: () => void;
}

export const OpeningReligionPortal: React.FC<OpeningReligionPortalProps> = ({
  isOpen,
  onSelectReligionAndEnter,
  currentLanguage,
  onChangeLanguage,
  onClose,
}) => {
  const [selectedReligion, setSelectedReligion] = useState<Religion | null>(null);
  const [isWarping, setIsWarping] = useState(false);
  const [hoveredReligion, setHoveredReligion] = useState<Religion | null>(null);
  const { effectsLevel } = useEffectsSettings();

  if (!isOpen) return null;

  const religionsList: Religion[] = [
    'Hinduism',
    'Islam',
    'Christianity',
    'Sikhism',
    'Buddhism',
    'Jainism',
    'Judaism',
    'All',
  ];

  const handleChooseReligion = (rel: Religion) => {
    setSelectedReligion(rel);
    setIsWarping(true);
    audioEngine.ringTempleBell();

    const timer = setTimeout(() => {
      onSelectReligionAndEnter(rel);
      setIsWarping(false);
      setSelectedReligion(null);
    }, 1100);

    return () => clearTimeout(timer);
  };

  const activeConfig: DivineThemeConfig | null = selectedReligion
    ? DIVINE_THEMES[selectedReligion] || DIVINE_THEMES.All
    : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-[#07030F]/90 backdrop-blur-2xl">
      {/* Background Cosmic Deep Glow */}
      <div
        className="fixed inset-0 pointer-events-none opacity-60"
        style={{
          background: `
            radial-gradient(circle at 50% 30%, rgba(168, 85, 247, 0.25) 0%, transparent 60%),
            radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.2) 0%, transparent 50%),
            linear-gradient(180deg, #07030F 0%, #0d051c 100%)
          `,
        }}
      />

      {/* Warp Light Burst Animation on selection */}
      <LightBurst
        isActive={isWarping}
        color={activeConfig?.accentColor || '#A855F7'}
      />

      {/* Main VisionOS Glass Portal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-xl p-5 sm:p-8 rounded-[36px] glass-panel-elevated text-white shadow-[0_25px_80px_rgba(0,0,0,0.85)] border border-white/20 z-10 my-auto"
      >
        {/* Header Bar: Brand Mark & Language Selector */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <NivaLogo
              variant="icon"
              size={32}
              glowColor={activeConfig?.accentGlow || '#A855F7'}
              withGlow={true}
            />
            <div>
              <span className="font-brand font-black text-sm tracking-wider text-white">
                NIVA
              </span>
              <span className="block text-[10px] text-white/50 tracking-tight">
                Sacred Cosmos Sanctum
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Dropdown */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-pill text-xs">
              <Globe className="w-3.5 h-3.5 text-purple-300" />
              <select
                value={currentLanguage}
                onChange={(e) => onChangeLanguage(e.target.value as AppLanguage)}
                className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code} className="bg-[#0D071E] text-white">
                    {l.nativeName} ({l.name})
                  </option>
                ))}
              </select>
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full glass-pill flex items-center justify-center text-xs text-white/70 hover:text-white"
                title="Close portal"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Portal Headline with Centered Full NIVA Logo (160px wide) */}
        <div className="my-5 flex flex-col items-center justify-center text-center">
          <NivaLogo
            variant="full"
            size={160}
            glowColor={
              hoveredReligion
                ? DIVINE_THEMES[hoveredReligion].accentGlow
                : activeConfig?.accentGlow || '#A855F7'
            }
            withGlow={true}
            animated={true}
            showStarTwinkle={true}
          />

          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-purple-200"
          >
            <Compass className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
            <span>Spiritual Tradition Onboarding</span>
          </motion.div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight gradient-text-sacred">
            Choose Your Faith Sanctuary
          </h1>
          <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto leading-relaxed mt-1">
            Floating inside the sacred cosmos. Select your tradition to attune scriptures, sacred rituals, authentic clergy, and ambient cosmic tints.
          </p>
        </div>

        {/* Constellation Orbit Faith Cards Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
          {religionsList.map((rel, idx) => {
            const theme = DIVINE_THEMES[rel];
            const isHovered = hoveredReligion === rel;

            return (
              <motion.button
                key={rel}
                whileHover={effectsLevel === 'minimal' ? undefined : { scale: 1.025, y: -2 }}
                whileTap={effectsLevel === 'minimal' ? undefined : { scale: 0.98 }}
                onClick={() => handleChooseReligion(rel)}
                onMouseEnter={() => setHoveredReligion(rel)}
                onMouseLeave={() => setHoveredReligion(null)}
                className="group relative p-3.5 sm:p-4 rounded-3xl glass-card text-left flex flex-col justify-between overflow-hidden cursor-pointer"
                style={{
                  borderColor: isHovered ? theme.accentColor : 'rgba(255, 255, 255, 0.14)',
                  boxShadow: isHovered
                    ? `0 0 30px ${theme.accentGlow}, inset 0 1px 1px rgba(255, 255, 255, 0.3)`
                    : undefined,
                }}
              >
                {/* Background Specular Flare */}
                <div
                  className="absolute -top-10 -right-10 w-24 h-24 rounded-full pointer-events-none transition-opacity duration-300 opacity-20 group-hover:opacity-60"
                  style={{
                    background: `radial-gradient(circle, ${theme.accentColor} 0%, transparent 70%)`,
                    filter: 'blur(20px)',
                  }}
                />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl sm:text-3xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-transform group-hover:scale-115 duration-200">
                      {theme.symbol}
                    </span>
                    <span className="w-6 h-6 rounded-full glass-pill flex items-center justify-center text-white/60 group-hover:text-white group-hover:border-white/40 transition-colors">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-white tracking-tight group-hover:text-amber-200 transition-colors">
                    {rel === 'All' ? 'Interfaith Harmony' : rel}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-white/60 line-clamp-1 mt-0.5">
                    {theme.themeTitle}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/50">
                  <span className="font-serif italic truncate max-w-[130px] text-white/70">
                    {theme.scriptureText}
                  </span>
                  <span
                    className="font-bold tracking-wider group-hover:underline"
                    style={{ color: theme.accentColor }}
                  >
                    Enter
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Bottom Interfaith Quick Entry */}
        <div className="mt-6 pt-3 border-t border-white/10 text-center">
          <button
            onClick={() => handleChooseReligion('All')}
            className="text-xs text-white/80 hover:text-white font-semibold inline-flex items-center gap-1.5 transition-colors group"
          >
            <span>Explore as Universal Cosmic Sanctuary</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <p className="text-[10px] text-white/40 mt-1">
            Attunement can be seamlessly shifted anytime via the top navigation bar.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
