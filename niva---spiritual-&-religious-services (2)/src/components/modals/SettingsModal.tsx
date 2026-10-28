import React, { useState } from 'react';
import { X, Globe, Bell, Shield, Sparkles, Check } from 'lucide-react';
import { AppLanguage } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../utils/translations';
import { useEffectsSettings, EffectsLevel } from '../../context/EffectsContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage?: AppLanguage;
  onSelectLanguage?: (lang: AppLanguage) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentLanguage = 'en',
  onSelectLanguage,
}) => {
  const { effectsLevel, setEffectsLevel } = useEffectsSettings();
  const [notifyMuhurat, setNotifyMuhurat] = useState(true);
  const [notifyOrders, setNotifyOrders] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const effectsOptions: {
    level: EffectsLevel;
    title: string;
    desc: string;
  }[] = [
    {
      level: 'full',
      title: 'Full Spatial',
      desc: 'Starfield parallax, drifting nebulae, particles, 3D tilt & glare',
    },
    {
      level: 'balanced',
      title: 'Balanced',
      desc: 'Frosted glass & fluid transitions, low particle count, static nebula',
    },
    {
      level: 'minimal',
      title: 'Minimal',
      desc: 'Static gradient, zero particles/tilt, battery & low-end saver',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07030F]/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-panel-elevated w-full max-w-sm rounded-[32px] border border-white/20 overflow-hidden text-white shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.04]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#A855F7]" />
            <h3 className="font-bold text-white text-sm">Settings & Spatial Preferences</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full glass-pill flex items-center justify-center text-white/70 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4 max-h-[78vh] overflow-y-auto text-xs no-scrollbar">
          {/* Spatial Motion & Effects Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-white/90 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                Visual Effects & Motion Mode
              </label>
              <span className="text-[10px] text-purple-300 font-mono capitalize">
                {effectsLevel}
              </span>
            </div>

            {/* Segmented Glass Control */}
            <div className="p-1 rounded-2xl glass-panel grid grid-cols-3 gap-1 border-white/15 bg-black/30">
              {effectsOptions.map((opt) => {
                const isSelected = effectsLevel === opt.level;
                return (
                  <button
                    key={opt.level}
                    type="button"
                    onClick={() => setEffectsLevel(opt.level)}
                    className={`py-2 px-1 rounded-xl text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-600 to-amber-600 text-white font-bold shadow-md border border-white/30'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="text-xs truncate font-semibold capitalize">{opt.level}</div>
                  </button>
                );
              })}
            </div>

            {/* Description for currently selected option */}
            <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-[11px] text-white/70">
              <span className="font-semibold text-amber-300 block mb-0.5">
                {effectsOptions.find((o) => o.level === effectsLevel)?.title}:
              </span>
              {effectsOptions.find((o) => o.level === effectsLevel)?.desc}
            </div>
          </div>

          {/* Language */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <label className="font-bold text-white/90 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              Ceremony & App Language
            </label>
            <div className="grid grid-cols-2 gap-1.5 max-h-40 overflow-y-auto pr-1 no-scrollbar">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onSelectLanguage && onSelectLanguage(lang.code)}
                  className={`p-2 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    currentLanguage === lang.code
                      ? 'bg-purple-600/30 border-purple-400 font-bold text-white shadow-xs'
                      : 'glass-card border-white/10 text-white/70 hover:border-white/25 hover:text-white'
                  }`}
                >
                  <div className="truncate">
                    <div className="truncate font-semibold text-xs">{lang.nativeName}</div>
                    <div className="text-[10px] text-white/40 truncate">{lang.name}</div>
                  </div>
                  {currentLanguage === lang.code && (
                    <Check className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-2.5 pt-2 border-t border-white/10">
            <label className="font-bold text-white/90 flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-purple-300" />
              Alerts & Auspicious Muhurats
            </label>
            <div className="flex items-center justify-between p-2.5 glass-card">
              <div>
                <div className="font-semibold text-white">Festival & Muhurat Alerts</div>
                <div className="text-[10px] text-white/50">Auspicious timing reminders</div>
              </div>
              <input
                type="checkbox"
                checked={notifyMuhurat}
                onChange={(e) => setNotifyMuhurat(e.target.checked)}
                className="w-4 h-4 accent-purple-500 rounded cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between p-2.5 glass-card">
              <div>
                <div className="font-semibold text-white">Order & Ceremony Updates</div>
                <div className="text-[10px] text-white/50">Clergy arrival & kit dispatch</div>
              </div>
              <input
                type="checkbox"
                checked={notifyOrders}
                onChange={(e) => setNotifyOrders(e.target.checked)}
                className="w-4 h-4 accent-purple-500 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Privacy */}
          <div className="p-3 glass-card space-y-1">
            <div className="font-bold text-white flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-amber-300" />
              Sacred Privacy Pledge
            </div>
            <p className="text-[11px] text-white/60 leading-relaxed">
              NIVA respects sacred religious privacy and never monetizes devotions or faith analytics.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white font-bold rounded-2xl text-xs shadow-lg transition-all cursor-pointer"
          >
            {savedSuccess ? 'Preferences Saved ✓' : 'Save Preferences'}
          </button>
        </div>
      </div>
    </div>
  );
};
