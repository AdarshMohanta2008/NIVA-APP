import React from 'react';
import { Menu, MapPin, Bell, ShoppingBag, Globe, Compass } from 'lucide-react';
import { Religion, AppLanguage } from '../types';
import { DIVINE_THEMES } from '../theme/divineThemes';
import { SUPPORTED_LANGUAGES } from '../utils/translations';
import { EffectsToggle } from './spatial/EffectsToggle';
import { NivaLogo } from './NivaLogo';

interface TopBarProps {
  currentCity: string;
  onOpenMenu: () => void;
  onOpenLocation: () => void;
  onOpenNotifications: () => void;
  onOpenCart: () => void;
  cartCount: number;
  unreadNotificationsCount: number;
  currentReligion: Religion;
  onOpenThemeModal: () => void;
  currentLanguage?: AppLanguage;
  onOpenLanguageModal?: () => void;
  onOpenOpeningPortal?: () => void;
  onOpenNearbyPlaces?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentCity,
  onOpenMenu,
  onOpenLocation,
  onOpenNotifications,
  onOpenCart,
  cartCount,
  unreadNotificationsCount,
  currentReligion,
  onOpenThemeModal,
  currentLanguage = 'en',
  onOpenLanguageModal,
  onOpenOpeningPortal,
  onOpenNearbyPlaces,
}) => {
  const activeTheme = DIVINE_THEMES[currentReligion] || DIVINE_THEMES.All;
  const activeLangMeta = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage);

  return (
    <header className="sticky top-0 z-40 px-3 sm:px-6 py-2.5 transition-all">
      <div className="glass-panel mx-auto flex items-center justify-between gap-3 px-3.5 py-2 sm:px-4 sm:py-2.5 bg-white/[0.08] backdrop-blur-[28px] border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
        {/* Left: Navigation Menu trigger, Location & Nearby Mandirs */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            id="btn-hamburger-menu"
            onClick={onOpenMenu}
            className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all cursor-pointer active:scale-95"
            aria-label="Open menu"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Location button */}
          <button
            id="btn-select-location"
            onClick={onOpenLocation}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-pill text-xs text-white/80 hover:text-white transition-all cursor-pointer"
            title="Change city"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="font-normal truncate max-w-[90px]">{currentCity}</span>
          </button>

          {/* Nearby Mandirs & Sacred Places Trigger */}
          {onOpenNearbyPlaces && (
            <button
              id="btn-nearby-mandirs"
              onClick={onOpenNearbyPlaces}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-pill text-xs text-amber-300 hover:text-white bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 transition-all cursor-pointer shadow-[0_0_12px_rgba(245,158,11,0.25)]"
              title="Explore nearby mandirs & sacred shrines"
            >
              <Compass className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="font-semibold text-[11px]">Nearby Mandirs</span>
            </button>
          )}
        </div>

        {/* Center: Brand Wordmark with Breathing Sacred Halo */}
        <div
          onClick={onOpenOpeningPortal}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          title="NIVA — Sacred Cosmos Sanctuary"
        >
          <NivaLogo
            variant="icon"
            size={34}
            glowColor={activeTheme.accentGlow}
            withGlow={true}
            animated={true}
            showStarTwinkle={true}
          />
          <span className="font-brand text-base sm:text-lg font-bold tracking-widest gradient-text-sacred group-hover:brightness-110 transition-all">
            NIVA
          </span>
        </div>

        {/* Right: Actions (Effects Toggle, Faith Theme, Language, Notifications, Cart) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Effects Control */}
          <EffectsToggle compact />

          {/* Tradition Switcher */}
          <button
            id="btn-faith-theme-switcher"
            onClick={onOpenThemeModal}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full glass-pill text-xs text-white/90 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
            title="Switch Faith Attunement"
          >
            <span className="text-xs">{activeTheme.symbol}</span>
            <span className="hidden md:inline font-semibold text-[11px]">
              {currentReligion === 'All' ? 'Interfaith' : currentReligion}
            </span>
          </button>

          {/* Language Switcher */}
          {onOpenLanguageModal && (
            <button
              id="btn-language-switcher"
              onClick={onOpenLanguageModal}
              className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full glass-pill text-xs text-white/80 hover:text-white transition-all cursor-pointer"
              title="Language"
            >
              <Globe className="w-3.5 h-3.5 text-purple-300" />
              <span className="text-[11px] font-medium">{activeLangMeta?.code?.toUpperCase() || 'EN'}</span>
            </button>
          )}

          {/* Notifications */}
          <button
            id="btn-notifications"
            onClick={onOpenNotifications}
            className="relative w-8 h-8 rounded-full glass-pill flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all cursor-pointer active:scale-95"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_8px_#F59E0B]" />
            )}
          </button>

          {/* Cart */}
          <button
            id="btn-open-cart"
            onClick={onOpenCart}
            className="relative w-8 h-8 rounded-full glass-pill flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all cursor-pointer active:scale-95"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
