import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Headphones,
  Package,
  Settings as SettingsIcon,
  Star,
  LogIn,
  LogOut,
  FileText,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Users,
  Bot,
  BookOpen,
  Wand2,
  Flame,
  Globe,
  Compass,
  MapPin,
} from 'lucide-react';
import { Religion, AppLanguage } from '../types';
import { DIVINE_THEMES } from '../theme/divineThemes';
import { SUPPORTED_LANGUAGES } from '../utils/translations';
import { EffectsToggle } from './spatial/EffectsToggle';
import { NivaLogo } from './NivaLogo';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  userName: string;
  userEmail: string;
  onNavigateToOrders: () => void;
  onOpenCustomerCare: () => void;
  onOpenSettings: () => void;
  onOpenReviews: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenTerms: () => void;
  onOpenNivaFamily?: () => void;
  onOpenNivaGuide?: () => void;
  onNavigateToHolyBooks?: () => void;
  currentReligion?: Religion;
  onOpenThemeModal?: () => void;
  onOpenOnlinePuja?: () => void;
  onOpenLiveDonations?: () => void;
  onOpenLanguageModal?: () => void;
  currentLanguage?: AppLanguage;
  onOpenOpeningPortal?: () => void;
  onOpenNearbyPlaces?: () => void;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen,
  onClose,
  isLoggedIn,
  userName,
  userEmail,
  onNavigateToOrders,
  onOpenCustomerCare,
  onOpenSettings,
  onOpenReviews,
  onOpenAuth,
  onLogout,
  onOpenTerms,
  onOpenNivaFamily,
  onOpenNivaGuide,
  onNavigateToHolyBooks,
  currentReligion = 'All',
  onOpenThemeModal,
  onOpenOnlinePuja,
  onOpenLiveDonations,
  onOpenLanguageModal,
  currentLanguage = 'en',
  onOpenOpeningPortal,
  onOpenNearbyPlaces,
}) => {
  if (!isOpen) return null;

  const activeTheme = DIVINE_THEMES[currentReligion] || DIVINE_THEMES.All;
  const currentLangMeta = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage);

  const menuItems = [
    {
      id: 'item-nearby-mandirs',
      label: 'Nearby Mandirs & Spiritual Shrines',
      subtitle: 'Locate local temples, darshan timings & Google Maps directions',
      icon: MapPin,
      highlight: true,
      action: () => {
        onClose();
        if (onOpenNearbyPlaces) onOpenNearbyPlaces();
      },
    },
    {
      id: 'item-faith-portal',
      label: 'Spiritual Onboarding & Entrance',
      subtitle: 'Choose tradition and replay cosmic warp animation',
      icon: Compass,
      highlight: true,
      action: () => {
        onClose();
        if (onOpenOpeningPortal) onOpenOpeningPortal();
      },
    },
    {
      id: 'item-online-puja',
      label: 'Live Online Puja & E-Darshan',
      subtitle: 'Remote Sankalp with Gotra & doorstep Prasad delivery',
      icon: Flame,
      highlight: true,
      action: () => {
        onClose();
        if (onOpenOnlinePuja) onOpenOnlinePuja();
      },
    },
    {
      id: 'item-live-donations',
      label: 'Live Ritual Streams & NGO Donations',
      subtitle: 'Watch live broadcasts & donate directly to 80G verified trusts',
      icon: HeartHandshake,
      highlight: true,
      action: () => {
        onClose();
        if (onOpenLiveDonations) onOpenLiveDonations();
      },
    },
    {
      id: 'item-language',
      label: `Local Language: ${currentLangMeta?.nativeName || 'English'}`,
      subtitle: 'Translate prayers, scriptures & UI across all traditions',
      icon: Globe,
      highlight: true,
      action: () => {
        onClose();
        if (onOpenLanguageModal) onOpenLanguageModal();
      },
    },
    {
      id: 'item-divine-theme',
      label: 'Spiritual Theme & Interface',
      subtitle: `${activeTheme.symbol} ${activeTheme.themeTitle} (Cosmic glass)`,
      icon: Wand2,
      highlight: true,
      action: () => {
        onClose();
        if (onOpenThemeModal) onOpenThemeModal();
      },
    },
    {
      id: 'item-books',
      label: 'Holy Books & Sacred Scriptures',
      subtitle: 'Read authentic verses across 7 world faiths',
      icon: BookOpen,
      highlight: true,
      action: () => {
        onClose();
        if (onNavigateToHolyBooks) onNavigateToHolyBooks();
      },
    },
    {
      id: 'item-guide',
      label: 'NIVA Personal Guide',
      subtitle: 'Natural, intelligent guidance tailored to your intent',
      icon: Bot,
      highlight: true,
      action: () => {
        onClose();
        if (onOpenNivaGuide) onOpenNivaGuide();
      },
    },
    {
      id: 'item-family',
      label: 'NIVA Family Hub',
      subtitle: 'Shared occasion readiness & checklists',
      icon: Users,
      highlight: true,
      action: () => {
        onClose();
        if (onOpenNivaFamily) onOpenNivaFamily();
      },
    },
    {
      id: 'item-customer-care',
      label: 'Customer Care & Helpline',
      subtitle: '24/7 Spiritual & Ceremony Assistance',
      icon: Headphones,
      action: () => {
        onClose();
        onOpenCustomerCare();
      },
    },
    {
      id: 'item-orders',
      label: 'Orders & Deliveries',
      subtitle: 'Track ceremony essentials and sacred kits',
      icon: Package,
      action: () => {
        onClose();
        onNavigateToOrders();
      },
    },
    {
      id: 'item-reviews',
      label: 'Community Reviews & Blessings',
      subtitle: 'Devotee testimonials & verified experiences',
      icon: Star,
      action: () => {
        onClose();
        onOpenReviews();
      },
    },
    {
      id: 'item-settings',
      label: 'Settings & Visual Effects',
      subtitle: 'Manage Reduce Effects, audio & preferences',
      icon: SettingsIcon,
      action: () => {
        onClose();
        onOpenSettings();
      },
    },
    {
      id: 'item-terms',
      label: 'Terms & Conditions',
      subtitle: 'Service standards & Code of Conduct',
      icon: FileText,
      action: () => {
        onClose();
        onOpenTerms();
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Blurred Cosmic Dim Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#07030F]/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Slide Glass Drawer */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="absolute inset-y-0 left-0 max-w-[340px] w-[88%] bg-[#0e071e]/90 backdrop-blur-3xl shadow-[0_20px_70px_rgba(0,0,0,0.9)] flex flex-col z-10 border-r border-white/20 text-white"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-white/10 bg-white/[0.04]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <NivaLogo
                variant="icon"
                size={36}
                glowColor={activeTheme.accentGlow}
                withGlow={true}
                animated={true}
                showStarTwinkle={true}
              />
              <div>
                <span className="font-brand font-bold text-lg tracking-wider gradient-text-sacred">
                  NIVA
                </span>
                <p className="text-[10px] text-white/50 -mt-0.5">
                  Spatial Spiritual Sanctuary
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <EffectsToggle compact />
              <button
                id="btn-close-hamburger"
                onClick={onClose}
                className="w-7 h-7 rounded-full glass-pill flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* User Profile Snippet in Frosted Glass Card */}
          <div className="p-3 rounded-2xl glass-card flex items-center gap-3 border-white/15">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="User profile"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-400/40"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-white text-sm truncate">
                {isLoggedIn ? userName : 'Welcome, Devotee'}
              </h4>
              <p className="text-xs text-white/50 truncate">
                {isLoggedIn ? userEmail : 'Sign in to sync your sanctum'}
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items List */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-1 no-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                id={item.id}
                onClick={item.action}
                className="w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-white/10 active:bg-white/15 text-left transition-colors group cursor-pointer border border-transparent hover:border-white/10"
              >
                <div className="w-9 h-9 rounded-xl glass-pill text-white/80 group-hover:text-amber-300 flex items-center justify-center transition-colors shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-semibold text-white/90 group-hover:text-white truncate">
                    {item.label}
                  </div>
                  <div className="text-[10px] text-white/50 truncate">
                    {item.subtitle}
                  </div>
                </div>
              </button>
            );
          })}

          <div className="my-3 border-t border-white/10 pt-2" />

          {/* Login/Register or Logout */}
          {isLoggedIn ? (
            <button
              id="item-logout"
              onClick={() => {
                onClose();
                onLogout();
              }}
              className="w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-rose-500/20 text-rose-300 active:bg-rose-500/30 text-left transition-colors border border-rose-500/20 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0">
                <LogOut className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold">Sign Out</div>
                <div className="text-[10px] text-rose-300/70">
                  Disconnect account from this device
                </div>
              </div>
            </button>
          ) : (
            <button
              id="item-login-register"
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className="w-full flex items-center gap-3 p-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white text-left shadow-lg transition-colors cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
                <LogIn className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-semibold">Login / Register</div>
                <div className="text-[10px] text-white/80">
                  Access saved ceremonies & family hub
                </div>
              </div>
            </button>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-white/[0.03] border-t border-white/10 text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <NivaLogo variant="icon" size={20} withGlow={false} />
            <span className="font-brand text-xs font-bold tracking-widest text-white/80">
              NIVA
            </span>
          </div>
          <div className="flex items-center justify-center gap-1 text-[11px] text-white/60 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            100% Background-Verified Religious Clergy
          </div>
          <p className="text-[10px] text-white/40">
            NIVA Spatial Sanctuary • visionOS Edition
          </p>
        </div>
      </motion.div>
    </div>
  );
};
