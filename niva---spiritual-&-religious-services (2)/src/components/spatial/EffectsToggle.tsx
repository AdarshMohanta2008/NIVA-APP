import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useEffectsSettings, EffectsLevel } from '../../context/EffectsContext';

interface EffectsToggleProps {
  compact?: boolean;
}

export const EffectsToggle: React.FC<EffectsToggleProps> = ({ compact = false }) => {
  const { effectsLevel, cycleEffectsLevel, setEffectsLevel } = useEffectsSettings();
  const [isOpen, setIsOpen] = useState(false);

  const levelLabels: Record<EffectsLevel, { title: string; color: string; desc: string }> = {
    full: {
      title: 'Full Spatial',
      color: 'text-purple-300 bg-purple-500/20 border-purple-400/40',
      desc: '3D tilt, starfield drift, particles, glows',
    },
    balanced: {
      title: 'Balanced',
      color: 'text-amber-300 bg-amber-500/20 border-amber-400/40',
      desc: 'Glass & transitions, frozen starfield',
    },
    minimal: {
      title: 'Minimal',
      color: 'text-slate-300 bg-slate-500/20 border-slate-400/40',
      desc: 'Static cosmic gradient, battery saver',
    },
  };

  const current = levelLabels[effectsLevel];

  if (compact) {
    return (
      <button
        onClick={cycleEffectsLevel}
        className="flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all shadow-sm"
        title={`Effects: ${current.title} (click to cycle)`}
        aria-label="Cycle visual effects level"
      >
        <Sparkles className="w-3 h-3 text-purple-300" />
        <span className="capitalize">{effectsLevel}</span>
      </button>
    );
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${current.color}`}
        title="Adjust visual effects"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span className="capitalize">{effectsLevel}</span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 p-2 rounded-2xl glass-panel-elevated z-50 shadow-2xl border border-white/20 text-xs"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-2 py-1 font-bold text-white/90 border-b border-white/10 mb-1 flex items-center justify-between">
            <span>Cosmic Effects</span>
            <span className="text-[10px] text-purple-300">visionOS</span>
          </div>
          {(['full', 'balanced', 'minimal'] as EffectsLevel[]).map((level) => {
            const item = levelLabels[level];
            const isSelected = effectsLevel === level;
            return (
              <button
                key={level}
                onClick={() => {
                  setEffectsLevel(level);
                  setIsOpen(false);
                }}
                className={`w-full text-left p-2 rounded-xl transition-colors mb-0.5 flex flex-col ${
                  isSelected
                    ? 'bg-purple-600/30 text-white border border-purple-400/40 font-semibold'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="capitalize">{level}</span>
                  {isSelected && <span className="text-[10px] text-amber-300">Active</span>}
                </div>
                <span className="text-[10px] text-white/50 leading-tight mt-0.5">{item.desc}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
