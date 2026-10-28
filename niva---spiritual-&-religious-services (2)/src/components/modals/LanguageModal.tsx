import React from 'react';
import { motion } from 'motion/react';
import { X, Globe, Check, Sparkles } from 'lucide-react';
import { AppLanguage } from '../../types';
import { SUPPORTED_LANGUAGES, getTranslation } from '../../utils/translations';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: AppLanguage;
  onSelectLanguage: (lang: AppLanguage) => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectLanguage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07030F]/80 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-panel bg-[#0D071E]/95 w-full max-w-md rounded-3xl shadow-[0_0_80px_rgba(168,85,247,0.3)] border border-white/20 overflow-hidden flex flex-col max-h-[90vh] text-white"
      >
        {/* Header */}
        <div className="p-4 bg-white/[0.05] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
              <Globe className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h2 className="font-extrabold text-white text-sm sm:text-base leading-tight">
                {getTranslation(currentLanguage, 'language_switcher')}
              </h2>
              <p className="text-[11px] text-white/50 font-medium">
                Local Languages Across World Religions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info banner */}
        <div className="p-3 bg-white/[0.03] border-b border-white/10 text-xs text-white/80 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Translate the app interface, prayer scriptures, rituals, and chants into your native mother tongue and sacred tradition script.
          </p>
        </div>

        {/* Languages Grid */}
        <div className="p-4 overflow-y-auto space-y-2 text-xs flex-1 no-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = currentLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    onSelectLanguage(lang.code);
                    onClose();
                  }}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all group cursor-pointer ${
                    isSelected
                      ? 'bg-purple-600/30 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                      : 'glass-card bg-white/[0.04] border-white/10 text-white/80 hover:border-white/20 hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-sm tracking-tight truncate text-white">
                        {lang.nativeName}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-white/50 border border-white/10'
                        }`}
                      >
                        {lang.code.toUpperCase()}
                      </span>
                    </div>
                    <div
                      className={`text-[11px] truncate mt-0.5 ${
                        isSelected ? 'text-amber-300' : 'text-white/50'
                      }`}
                    >
                      {lang.name} · {lang.associatedFaith}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-600 to-amber-500 text-white flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.5)]">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-white/[0.02] border-t border-white/10 text-center text-[11px] text-white/40 font-medium">
          Selecting a language immediately translates the entire app & holy scriptures.
        </div>
      </motion.div>
    </div>
  );
};
