import React from 'react';
import { motion } from 'motion/react';
import { X, Check, Sparkles, Wand2 } from 'lucide-react';
import { Religion } from '../../types';
import { DIVINE_THEMES, DivineThemeConfig } from '../../theme/divineThemes';
import { audioEngine } from '../../utils/audioEngine';

interface DivineThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentReligion: Religion;
  onSelectReligion: (religion: Religion) => void;
  onOpenOpeningPortal?: () => void;
}

export const DivineThemeModal: React.FC<DivineThemeModalProps> = ({
  isOpen,
  onClose,
  currentReligion,
  onSelectReligion,
  onOpenOpeningPortal,
}) => {
  if (!isOpen) return null;

  const religionsList: Religion[] = [
    'Islam',
    'Hinduism',
    'Christianity',
    'Sikhism',
    'Buddhism',
    'Jainism',
    'Judaism',
    'All',
  ];

  const handleSelect = (rel: Religion) => {
    audioEngine.ringTempleBell();
    onSelectReligion(rel);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07030F]/80 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-panel bg-[#0D071E]/95 w-full max-w-md rounded-3xl shadow-[0_0_80px_rgba(168,85,247,0.3)] border border-white/20 overflow-hidden flex flex-col max-h-[90vh] text-white"
      >
        {/* Header */}
        <div className="relative p-5 bg-white/[0.05] border-b border-white/10 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-300">
              <Wand2 className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">
              Custom Faith Interface
            </span>
          </div>

          <h2 className="text-lg font-black tracking-tight text-white">
            Choose Your Divine Theme
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            Personalize NIVA with sacred colors, blessings, and traditions curated for your spiritual faith.
          </p>
        </div>

        {/* Themes Grid */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
          {religionsList.map((relKey) => {
            const theme: DivineThemeConfig = DIVINE_THEMES[relKey];
            const isSelected = currentReligion === relKey;
            const atmos = theme.atmosphere;

            return (
              <div
                key={relKey}
                onClick={() => handleSelect(relKey)}
                className={`rounded-2xl border transition-all cursor-pointer group flex flex-col overflow-hidden ${
                  isSelected
                    ? 'border-purple-400/70 shadow-[0_0_25px_rgba(168,85,247,0.35)] ring-1 ring-purple-400/40 bg-purple-950/30'
                    : 'glass-card bg-white/[0.04] border-white/10 hover:border-white/20 hover:bg-white/[0.08]'
                }`}
              >
                {/* Live Atmosphere Mini-Preview Strip */}
                <div
                  className="h-14 relative overflow-hidden flex items-center justify-between px-3.5 border-b border-white/10"
                  style={{
                    background: `linear-gradient(135deg, ${atmos.bg0} 0%, ${atmos.bg1} 60%, ${atmos.bg2} 100%)`,
                  }}
                >
                  {/* Subtle scene aura glow */}
                  <div
                    className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-xl opacity-60"
                    style={{ background: atmos.glow }}
                  />

                  {/* Left: Faith Symbol + Atmosphere Scene Name */}
                  <div className="flex items-center gap-2.5 relative z-10">
                    <span className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-base shadow-sm">
                      {theme.symbol}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-white group-hover:text-amber-300 transition-colors">
                          {theme.themeTitle}
                        </span>
                        {isSelected && (
                          <span className="text-[9px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.2 rounded-full border border-amber-400/30">
                            Active
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-white/70 block truncate max-w-[220px]">
                        {atmos.sceneTitle}
                      </span>
                    </div>
                  </div>

                  {/* Right: Particle / Atmosphere Badge */}
                  <div className="relative z-10 flex items-center gap-1.5">
                    <span
                      className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border backdrop-blur-sm shadow-sm"
                      style={{
                        backgroundColor: `${atmos.accent}25`,
                        borderColor: `${atmos.accent}55`,
                        color: atmos.accent,
                      }}
                    >
                      {atmos.particles.type}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-amber-500 text-white flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.5)]">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Theme Details Body */}
                <div className="p-3">
                  <p className="text-[11px] text-white/60 line-clamp-1">
                    {theme.tagline}
                  </p>

                  <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                    <span className="font-serif italic text-amber-200/80 line-clamp-1 max-w-[260px]">
                      “{theme.scriptureText}”
                    </span>
                    <span className="text-white/40 font-medium shrink-0 ml-2">
                      {theme.name.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note & Opening Portal Trigger */}
        <div className="p-3.5 bg-white/[0.03] border-t border-white/10 text-center space-y-2 shrink-0">
          {onOpenOpeningPortal && (
            <button
              onClick={() => {
                onClose();
                onOpenOpeningPortal();
              }}
              className="w-full py-2.5 px-3 rounded-2xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/15"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Replay Opening Faith Selection & Top Entrance Animation</span>
            </button>
          )}
          <p className="text-[11px] text-white/40">
            You can switch your Divine Theme anytime from the top bar or profile settings.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
