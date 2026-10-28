import React from 'react';
import { motion } from 'motion/react';
import { Home, Calendar, ShoppingBag, PlaySquare, User, Disc3, BookOpen } from 'lucide-react';
import { Religion } from '../types';
import { DIVINE_THEMES } from '../theme/divineThemes';
import { useEffectsSettings } from '../context/EffectsContext';
import { NivaLogo } from './NivaLogo';

export type TabType = 'home' | 'calendar' | 'books' | 'music' | 'shop' | 'reels' | 'profile';

export interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  cartCount: number;
  isMusicPlaying?: boolean;
  currentReligion?: Religion;
}

const TABS = [
  { id: 'home' as TabType, label: 'Home', icon: Home },
  { id: 'calendar' as TabType, label: 'Calendar', icon: Calendar },
  { id: 'books' as TabType, label: 'Books', icon: BookOpen },
  { id: 'music' as TabType, label: 'Music', icon: Disc3, isMusic: true },
  { id: 'shop' as TabType, label: 'Shop', icon: ShoppingBag },
  { id: 'reels' as TabType, label: 'Reels', icon: PlaySquare },
  { id: 'profile' as TabType, label: 'Profile', icon: User },
];

/** Desktop VisionOS Glass Sidebar Navigation */
export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  cartCount,
  isMusicPlaying = false,
  currentReligion = 'All',
}) => {
  const activeTheme = DIVINE_THEMES[currentReligion] || DIVINE_THEMES.All;
  const { effectsLevel } = useEffectsSettings();
  const isMinimal = effectsLevel === 'minimal';

  return (
    <aside className="hidden lg:flex shrink-0 w-64 xl:w-72 flex-col h-full p-4 z-40 pointer-events-auto select-none">
      <div className="glass-panel flex-1 flex flex-col p-3 border border-white/15 overflow-y-auto no-scrollbar">
        {/* Brand header */}
        <div className="flex items-center gap-3 px-3 py-3 mb-2 rounded-2xl bg-white/[0.04] border border-white/10">
          <NivaLogo
            variant="icon"
            size={42}
            glowColor={activeTheme.accentGlow}
            withGlow={!isMinimal}
            animated={!isMinimal}
            showStarTwinkle={!isMinimal}
          />
          <div className="flex flex-col min-w-0">
            <span className="font-brand text-xl font-bold tracking-widest gradient-text-sacred">
              NIVA
            </span>
            <span className="text-[10px] text-white/50 tracking-wider uppercase font-medium truncate">
              Sacred Cosmos
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-1.5 flex-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const badge = tab.id === 'shop' ? cartCount : 0;
            return (
              <button
                key={tab.id}
                id={`nav-tab-${tab.id}`}
                onClick={() => onChangeTab(tab.id)}
                className="relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all cursor-pointer group text-left"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSidebarPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-2xl bg-white/[0.14] border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_0_24px_var(--glow)]"
                  />
                )}
                <Icon
                  className={`relative z-10 w-5 h-5 transition-colors ${
                    isActive ? 'text-white' : 'text-white/60 group-hover:text-white/90'
                  } ${tab.isMusic && isMusicPlaying && !isMinimal ? 'animate-spin' : ''}`}
                  style={{
                    color: isActive ? activeTheme.accentColor : undefined,
                    filter: isActive && !isMinimal ? `drop-shadow(0 0 10px ${activeTheme.accentGlow})` : 'none',
                  }}
                />
                <span
                  className={`relative z-10 text-sm tracking-tight ${
                    isActive ? 'text-white font-semibold' : 'text-white/60 group-hover:text-white/90 font-medium'
                  }`}
                >
                  {tab.label}
                </span>
                {Boolean(badge > 0) && (
                  <span className="relative z-10 ml-auto text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-gradient-to-r from-purple-500 to-amber-500 shadow-sm">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Tradition Note in Sidebar */}
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 mt-auto text-center">
          <span className="text-lg">{activeTheme.symbol}</span>
          <p className="text-[11px] font-bold text-white mt-0.5 truncate">{activeTheme.themeTitle}</p>
          <p className="text-[9px] text-white/50 truncate">“{activeTheme.scriptureText}”</p>
        </div>
      </div>
    </aside>
  );
};

/** Mobile / Tablet Floating VisionOS Glass Bottom Dock (< lg) */
export const MobileBottomDock: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  cartCount,
  isMusicPlaying = false,
  currentReligion = 'All',
}) => {
  const activeTheme = DIVINE_THEMES[currentReligion] || DIVINE_THEMES.All;
  const { effectsLevel } = useEffectsSettings();
  const isMinimal = effectsLevel === 'minimal';

  return (
    <nav
      aria-label="Mobile Navigation Dock"
      className="lg:hidden shrink-0 w-full px-2 sm:px-4 pb-[max(env(safe-area-inset-bottom,0px),8px)] pt-1.5 z-40 pointer-events-auto select-none"
    >
      <div className="glass-dock max-w-lg mx-auto flex items-center justify-around p-1.5 shadow-[0_16px_50px_rgba(0,0,0,0.85)] border border-white/20">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const badge = tab.id === 'shop' ? cartCount : 0;
          return (
            <button
              key={tab.id}
              id={`mobile-tab-${tab.id}`}
              onClick={() => onChangeTab(tab.id)}
              className="relative flex flex-col items-center justify-center py-1.5 px-2.5 sm:px-3 rounded-full cursor-pointer transition-all flex-1"
              aria-label={tab.label}
            >
              {isActive && (
                <motion.div
                  layoutId="activeDockPill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-white/[0.18] border border-white/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_0_20px_var(--glow)]"
                />
              )}
              <div className="relative z-10 flex flex-col items-center">
                <Icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-white' : 'text-white/65'
                  } ${tab.isMusic && isMusicPlaying && !isMinimal ? 'animate-spin' : ''}`}
                  style={{
                    color: isActive ? activeTheme.accentColor : undefined,
                    filter: isActive && !isMinimal ? `drop-shadow(0 0 8px ${activeTheme.accentGlow})` : 'none',
                  }}
                />
                <span
                  className={`text-[9px] sm:text-[10px] mt-0.5 tracking-tight font-medium ${
                    isActive ? 'text-white font-bold' : 'text-white/60'
                  }`}
                >
                  {tab.label}
                </span>
                {Boolean(badge > 0) && (
                  <span className="absolute -top-1 -right-1.5 text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center bg-gradient-to-r from-purple-500 to-amber-500 shadow-sm">
                    {badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

/** Compatibility alias */
export const TopTabsNarrow: React.FC<BottomNavProps> = () => null;
