import React, { createContext, useContext, useState, useEffect } from 'react';

export type EffectsLevel = 'full' | 'balanced' | 'minimal';

interface EffectsContextType {
  effectsLevel: EffectsLevel;
  setEffectsLevel: (level: EffectsLevel) => void;
  cycleEffectsLevel: () => void;
  isBackgroundActive: boolean;
}

const EffectsContext = createContext<EffectsContextType>({
  effectsLevel: 'full',
  setEffectsLevel: () => {},
  cycleEffectsLevel: () => {},
  isBackgroundActive: true,
});

const STORAGE_KEY = 'niva_effects_level_v1';

function getInitialEffectsLevel(): EffectsLevel {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as EffectsLevel | null;
    if (saved && (saved === 'full' || saved === 'balanced' || saved === 'minimal')) {
      return saved;
    }
  } catch {
    // localStorage unavailable
  }

  // Auto-detect based on device & preferences
  if (typeof window !== 'undefined') {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) {
      return 'minimal';
    }
    const nav = navigator as Navigator & { deviceMemory?: number };
    if (
      (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) ||
      (nav.deviceMemory && nav.deviceMemory <= 4)
    ) {
      return 'balanced';
    }
  }

  return 'full';
}

export const EffectsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [effectsLevel, setEffectsLevelState] = useState<EffectsLevel>(getInitialEffectsLevel);
  const [isBackgroundActive, setIsBackgroundActive] = useState<boolean>(true);

  const setEffectsLevel = (level: EffectsLevel) => {
    setEffectsLevelState(level);
    try {
      localStorage.setItem(STORAGE_KEY, level);
    } catch {
      // storage error
    }
  };

  const cycleEffectsLevel = () => {
    setEffectsLevel(
      effectsLevel === 'full' ? 'balanced' : effectsLevel === 'balanced' ? 'minimal' : 'full'
    );
  };

  // Sync to <html data-effects="...">
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-effects', effectsLevel);
    }
  }, [effectsLevel]);

  // Pause background animations when page is not visible
  useEffect(() => {
    const handleVisibility = () => {
      setIsBackgroundActive(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <EffectsContext.Provider
      value={{
        effectsLevel,
        setEffectsLevel,
        cycleEffectsLevel,
        isBackgroundActive,
      }}
    >
      {children}
    </EffectsContext.Provider>
  );
};

export const useEffectsSettings = () => useContext(EffectsContext);
