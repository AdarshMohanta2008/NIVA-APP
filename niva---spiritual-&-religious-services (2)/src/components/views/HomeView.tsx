import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  Sparkles,
  Star,
  ChevronRight,
  ShieldCheck,
  Calendar as CalendarIcon,
  Play,
  Heart,
  Plus,
  ShoppingBag,
  Flame,
  Radio,
  Bot,
  Users,
  BookOpen,
  Globe,
  MapPin,
  Compass,
  Navigation,
  ExternalLink,
} from 'lucide-react';
import { NivaLogo } from '../NivaLogo';
import {
  Religion,
  ServiceCategory,
  ServiceItem,
  ServiceProvider,
  Product,
  CalendarEvent,
  Reel,
  MusicTrack,
  AppLanguage,
} from '../../types';
import {
  RELIGIONS,
  SERVICES,
  SERVICE_PROVIDERS,
  CALENDAR_EVENTS,
  PRODUCTS,
  REELS,
} from '../../data/mockData';
import { SACRED_TRACKS } from '../../data/musicData';
import { ONLINE_PUJAS } from '../../data/onlinePujaData';
import { SPIRITUAL_PLACES } from '../../data/spiritualPlacesData';
import { DIVINE_THEMES, DivineThemeConfig } from '../../theme/divineThemes';
import {
  FAITH_LOCAL_GREETINGS,
  SUPPORTED_LANGUAGES,
  getTranslation,
} from '../../utils/translations';
import { TiltCard } from '../spatial/TiltCard';
import { useEffectsSettings } from '../../context/EffectsContext';

interface HomeViewProps {
  onStartBooking: (service?: ServiceItem, provider?: ServiceProvider) => void;
  onAddToCart: (product: Product) => void;
  onGoToTab: (tab: any) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onPlayTrack?: (track: MusicTrack) => void;
  onOpenNivaGuide?: () => void;
  onOpenNivaFamily?: () => void;
  userReligion?: Religion;
  userName?: string;
  onOpenThemeModal?: () => void;
  onOpenOnlinePuja?: () => void;
  onOpenLiveDonations?: () => void;
  onOpenLanguageModal?: () => void;
  currentLanguage?: AppLanguage;
  onOpenNearbyPlaces?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartBooking,
  onAddToCart,
  onGoToTab,
  wishlistIds,
  onToggleWishlist,
  onPlayTrack,
  onOpenNivaGuide,
  onOpenNivaFamily,
  userReligion = 'All',
  userName,
  onOpenThemeModal,
  onOpenOnlinePuja,
  onOpenLiveDonations,
  onOpenLanguageModal,
  currentLanguage = 'en',
  onOpenNearbyPlaces,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReligion, setSelectedReligion] = useState<Religion | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'All'>('All');
  const { effectsLevel } = useEffectsSettings();

  const activeTheme: DivineThemeConfig = DIVINE_THEMES[userReligion] || DIVINE_THEMES.All;
  const localizedGreeting =
    FAITH_LOCAL_GREETINGS[userReligion]?.[currentLanguage] ||
    FAITH_LOCAL_GREETINGS.All[currentLanguage];

  // Filtered services
  const filteredServices = SERVICES.filter((srv) => {
    const matchesReligion = !selectedReligion || srv.religion === selectedReligion;
    const matchesCategory = selectedCategory === 'All' || srv.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.religion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesReligion && matchesCategory && matchesSearch;
  });

  // Filtered providers
  const filteredProviders = [...SERVICE_PROVIDERS]
    .sort((a, b) => {
      if (userReligion !== 'All') {
        if (a.religion === userReligion && b.religion !== userReligion) return -1;
        if (b.religion === userReligion && a.religion !== userReligion) return 1;
      }
      return b.rating - a.rating;
    })
    .filter((p) => {
      const matchesReligion = !selectedReligion || p.religion === selectedReligion;
      const matchesSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.religion.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesReligion && matchesSearch;
    });

  const categories: ServiceCategory[] = [
    'Puja & Rituals',
    'Weddings',
    'House Blessing',
    'Funeral Services',
    'Religious Guidance',
    'Festival Services',
  ];

  return (
    <div className="space-y-6 pb-28 text-white">
      {/* 1. EDITORIAL HEADER & BRAND HERO WITH ROTATING SACRED MANDALA */}
      <section className="relative px-2 sm:px-4 pt-2">
        <TiltCard className="p-5 sm:p-7 glass-panel-elevated specular-sweep overflow-hidden">
          {/* Faint Rotating Sacred Mandala Background */}
          {effectsLevel !== 'minimal' && (
            <div
              className="absolute -right-20 -top-20 w-80 h-80 pointer-events-none opacity-15 animate-mandala-slow"
              style={{
                backgroundImage: `radial-gradient(circle, ${activeTheme.accentColor} 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
                borderRadius: '50%',
                border: '1px dashed rgba(255,255,255,0.3)',
              }}
            />
          )}

          <div className="relative z-10">
            {/* Top Bar inside Hero */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
                <span className="text-[11px] font-semibold uppercase tracking-widest text-white/70">
                  Sacred Cosmos Sanctum
                </span>
              </div>

              <div className="flex items-center gap-2">
                {onOpenLanguageModal && (
                  <button
                    onClick={onOpenLanguageModal}
                    className="text-[11px] font-medium text-white/80 hover:text-white px-2.5 py-1 rounded-full glass-pill transition-colors flex items-center gap-1.5 cursor-pointer"
                    title="Switch Language"
                  >
                    <Globe className="w-3 h-3 text-purple-300" />
                    <span>
                      {SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage)?.nativeName ||
                        'Language'}
                    </span>
                  </button>
                )}

                {onOpenThemeModal && (
                  <button
                    onClick={onOpenThemeModal}
                    className="text-[11px] font-semibold text-white/90 hover:text-white px-2.5 py-1 rounded-full glass-pill transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{activeTheme.symbol}</span>
                    <span>{userReligion === 'All' ? 'Interfaith' : userReligion}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Main Editorial Masthead */}
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight gradient-text-sacred">
                {localizedGreeting?.greeting || activeTheme.greetingTitle}
                {userName && (
                  <span className="block text-amber-200 text-2xl sm:text-3xl font-light mt-0.5 font-serif italic">
                    {userName}
                  </span>
                )}
              </h1>
              <p className="text-xs sm:text-sm text-white/70 mt-2.5 font-normal leading-relaxed max-w-2xl">
                A visionOS spatial sanctuary floating in cosmic violet. Authentic pujas, sacred scriptures, traditional Ayurveda, and Vedic celestial wisdom.
              </p>
            </div>

            {/* Search Bar - Frosted Glass Capsule */}
            <div className="mt-5 relative max-w-2xl">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-white/50 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  id="search-services-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search rituals, scriptures, pujas, or verified clergy..."
                  className="w-full pl-10 pr-10 py-2.5 bg-white/[0.08] border border-white/20 rounded-2xl text-xs font-normal text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400 focus:bg-white/[0.12] transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 text-xs text-white/50 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Search Suggestions */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mt-2.5 pt-0.5 text-[11px] text-white/60">
                <span className="font-semibold text-white/80 shrink-0">Inquiries:</span>
                {(
                  activeTheme.popularTags || [
                    'Satyanarayan Puja',
                    'Griha Pravesh',
                    'Nikah Ceremony',
                    'Vedic Astrology',
                  ]
                ).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="hover:text-amber-300 hover:underline whitespace-nowrap transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </TiltCard>
      </section>

      {/* 2. TODAY'S SPIRITUAL INSIGHT */}
      <section className="px-2 sm:px-4">
        <div className="p-4 sm:p-6 rounded-[28px] glass-panel relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-white/60 text-[11px] tracking-widest uppercase font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
                <span>Today's Celestial Insight</span>
                <span aria-hidden="true">·</span>
                <span className="text-white/40">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <blockquote className="font-serif text-xl sm:text-2xl text-white italic font-normal leading-snug">
                “{localizedGreeting?.blessing || activeTheme.scriptureText}”
              </blockquote>

              <p className="text-xs text-white/70 font-normal leading-relaxed">
                {activeTheme.englishMeaning}
              </p>
            </div>

            <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-5 gap-2">
              <button
                onClick={onOpenNivaGuide}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white text-xs font-semibold rounded-full transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <NivaLogo
                  variant="icon"
                  size={18}
                  glowColor={activeTheme.accentGlow}
                  withGlow={false}
                />
                <span>Ask NIVA Guide</span>
              </button>
              <button
                onClick={onOpenThemeModal}
                className="text-[11px] text-white/50 hover:text-amber-300 transition-colors cursor-pointer"
              >
                Change tradition ({activeTheme.name.split('&')[0]})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. UPCOMING FESTIVALS & CELESTIAL MUHURATS */}
      <section className="px-2 sm:px-4">
        <div className="flex items-baseline justify-between pb-2 mb-3 border-b border-white/10">
          <div>
            <h2 className="text-lg font-serif font-bold text-white tracking-tight">
              Upcoming Observances & Muhurats
            </h2>
            <p className="text-xs text-white/50">
              Auspicious timings, lunar tithis, and consecrated rituals
            </p>
          </div>
          <button
            onClick={() => onGoToTab('calendar')}
            className="text-xs font-semibold text-amber-300 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Full Calendar</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CALENDAR_EVENTS.slice(0, 3).map((evt) => (
            <motion.div
              key={evt.id}
              whileHover={effectsLevel === 'minimal' ? undefined : { y: -2 }}
              onClick={() => onGoToTab('calendar')}
              className="p-4 rounded-3xl glass-card cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-white/60 mb-2">
                  <span className="font-semibold text-amber-300">{evt.religion}</span>
                  <span className="text-white/50">{evt.date.slice(5)}</span>
                </div>
                <h3 className="font-serif text-base font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1">
                  {evt.title}
                </h3>
                <p className="text-xs text-white/70 mt-1 line-clamp-2 leading-relaxed">
                  {evt.significance}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-amber-300 font-medium">Muhurat verified</span>
                <span className="text-white/50 group-hover:text-white transition-colors">
                  Read details →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3.5 NEARBY MANDIRS & SACRED SHRINES SHOWCASE */}
      <section className="px-2 sm:px-4">
        <div className="p-4 sm:p-5 rounded-3xl glass-panel relative overflow-hidden space-y-4 border border-amber-400/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
                <span className="eyebrow-label text-amber-300">Nearby Shrines & Mandirs</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/25 text-emerald-300 text-[10px] font-bold">
                  Open For Darshan
                </span>
              </div>
              <h2 className="text-lg font-serif font-bold text-white tracking-tight flex items-center gap-2">
                <span>Nearby Mandirs & Sacred Places</span>
              </h2>
              <p className="text-xs text-white/60">
                Aarti schedules, darshan hours & 1-tap Google Maps navigation
              </p>
            </div>

            {onOpenNearbyPlaces && (
              <button
                onClick={onOpenNearbyPlaces}
                className="self-start sm:self-auto px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-[#07030F] text-xs font-black transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.35)] cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#07030F] animate-spin-slow" />
                <span>Open Cosmic Radar Map</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Cards of top nearby mandirs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SPIRITUAL_PLACES.slice(0, 3).map((place) => (
              <div
                key={place.id}
                className="p-3.5 rounded-2xl glass-card border border-white/15 flex flex-col justify-between group space-y-2.5"
              >
                <div className="flex gap-2.5">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-300 uppercase">
                        {place.category}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded-full">
                        {place.distanceKm} km
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-white text-xs line-clamp-1 group-hover:text-amber-200 transition-colors">
                      {place.name}
                    </h3>
                    <p className="text-[10px] text-white/60 line-clamp-1">{place.deityOrSanctum}</p>
                    <p className="text-[9px] text-white/40 truncate mt-0.5">{place.darshanTimings}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 px-2.5 rounded-xl bg-amber-400/90 hover:bg-amber-300 text-[#07030F] font-bold text-[11px] transition-all flex items-center justify-center gap-1 shadow-xs"
                  >
                    <Navigation className="w-3 h-3 fill-current" />
                    <span>Google Maps</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                  </a>

                  {onOpenNearbyPlaces && (
                    <button
                      onClick={onOpenNearbyPlaces}
                      className="py-1.5 px-2.5 rounded-xl bg-white/[0.08] hover:bg-white/15 text-white text-[11px] font-medium transition-all border border-white/10 cursor-pointer"
                    >
                      Radar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EXPLORE TRADITIONS WITH CONSTELATION BUTTONS */}
      <section className="px-2 sm:px-4">
        <div className="flex items-baseline justify-between pb-2 mb-3 border-b border-white/10">
          <div>
            <h2 className="text-lg font-serif font-bold text-white tracking-tight">
              Explore Traditions
            </h2>
            <p className="text-xs text-white/50">
              Select a faith lineage to explore sacred ceremonies & verified clergy
            </p>
          </div>
          {selectedReligion && (
            <button
              onClick={() => setSelectedReligion(null)}
              className="text-xs font-semibold text-amber-300 hover:underline cursor-pointer"
            >
              Show all faiths
            </button>
          )}
        </div>

        {/* Faith Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pb-1">
          {RELIGIONS.map((rel) => {
            const isSelected = selectedReligion === rel.id;
            return (
              <button
                key={rel.id}
                id={`filter-religion-${rel.id.toLowerCase()}`}
                onClick={() => setSelectedReligion(isSelected ? null : rel.id)}
                className={`p-3 rounded-2xl transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  isSelected
                    ? 'glass-panel-elevated bg-white/20 border-amber-400/80 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                    : 'glass-card hover:bg-white/10'
                }`}
              >
                <span className="text-xl filter drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]">
                  {rel.symbol}
                </span>
                <span className="text-xs font-bold text-white whitespace-nowrap">
                  {rel.name}
                </span>
                <span className="text-[10px] text-white/50 line-clamp-1">
                  {rel.id === 'Hinduism' && 'Vedic Rites'}
                  {rel.id === 'Islam' && 'Nikah & Dua'}
                  {rel.id === 'Christianity' && 'Holy Blessings'}
                  {rel.id === 'Sikhism' && 'Anand Karaj'}
                  {rel.id === 'Buddhism' && 'Mindfulness'}
                  {rel.id === 'Jainism' && 'Navkar & Puja'}
                  {rel.id === 'Judaism' && 'Shabbat'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Scriptures & Family Hub Glass Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-3">
          <div
            onClick={() => onGoToTab('books')}
            className="p-3.5 rounded-2xl glass-card cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl glass-pill flex items-center justify-center text-amber-300 shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-white group-hover:text-amber-200 transition-colors">
                  Holy Books & Canonical Scriptures
                </h4>
                <p className="text-[11px] text-white/60 leading-snug">
                  Gita, Quran, Bible, Guru Granth Sahib & Dhammapada
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40 group-hover:translate-x-1 group-hover:text-white transition-all shrink-0" />
          </div>

          <div
            onClick={onOpenNivaFamily}
            className="p-3.5 rounded-2xl glass-card cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl glass-pill flex items-center justify-center text-purple-300 shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-white group-hover:text-purple-200 transition-colors">
                  NIVA Family Ceremony Hub
                </h4>
                <p className="text-[11px] text-white/60 leading-snug">
                  Collaborative preparation checklists & family celebration sharing
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40 group-hover:translate-x-1 group-hover:text-white transition-all shrink-0" />
          </div>
        </div>
      </section>

      {/* 5. LIVE ONLINE PUJA & REMOTE SANKALP WITH BREATHING GLOW RING */}
      <section className="px-2 sm:px-4">
        <div className="p-5 sm:p-6 rounded-[32px] glass-panel-elevated relative overflow-hidden border-purple-400/30">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500 shadow-[0_0_10px_#f43f5e]" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                  Live Sanctum Telecast & Prasad
                </span>
              </div>
              <h2 className="text-xl font-serif font-bold text-white">
                {getTranslation(currentLanguage, 'online_puja_title')}
              </h2>
              <p className="text-xs text-white/70 max-w-md leading-relaxed">
                {getTranslation(currentLanguage, 'online_puja_subtitle')}
              </p>
            </div>

            {onOpenOnlinePuja && (
              <button
                onClick={onOpenOnlinePuja}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-amber-500 hover:brightness-110 text-white font-bold text-xs rounded-full shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-1 self-start sm:self-auto shrink-0 cursor-pointer border border-white/20"
              >
                <span>View All ({ONLINE_PUJAS.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Puja Preview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
            {ONLINE_PUJAS.slice(0, 2).map((puja) => (
              <div
                key={puja.id}
                className="p-3.5 rounded-2xl glass-card flex gap-3 hover:bg-white/10 transition-colors group"
              >
                <img
                  src={puja.image}
                  alt={puja.title}
                  className="w-20 h-20 rounded-xl object-cover shrink-0 border border-white/20"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-[11px] text-amber-300 font-medium truncate">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{puja.templeOrShrine}</span>
                    </div>
                    <h3 className="text-xs font-bold text-white truncate mt-0.5">
                      {puja.title}
                    </h3>
                    <div className="text-[11px] text-white/60 line-clamp-1 mt-0.5">
                      {puja.benefits[0]}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-bold text-amber-300">
                      ₹{puja.startingPrice}
                    </span>
                    <button
                      onClick={onOpenOnlinePuja}
                      className="px-3 py-1 bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-[11px] rounded-full transition-colors cursor-pointer"
                    >
                      Book Sankalp
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOOK A RELIGIOUS SERVICE */}
      <section className="px-2 sm:px-4">
        <div className="flex items-baseline justify-between pb-2 mb-3 border-b border-white/10">
          <div>
            <h2 className="text-lg font-serif font-bold text-white tracking-tight">
              Book a Religious Ceremony
            </h2>
            <p className="text-xs text-white/50">
              {selectedReligion
                ? `Showing ${selectedReligion} ceremonies`
                : 'Consecrated rituals officiated by verified clergy'}
            </p>
          </div>
          <button
            onClick={() => onStartBooking()}
            className="text-xs font-semibold text-amber-300 hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>All Services</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-4 text-xs font-medium">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-gradient-to-r from-purple-600 to-amber-600 text-white font-bold shadow-md'
                : 'glass-pill text-white/70 hover:text-white'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-purple-600 to-amber-600 text-white font-bold shadow-md'
                  : 'glass-pill text-white/70 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid with 3D Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredServices.slice(0, 4).map((service) => (
            <TiltCard
              key={service.id}
              className="glass-card overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07030F] via-[#07030F]/40 to-transparent" />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-2 text-[10px] text-white">
                  <span className="glass-pill px-2 py-0.5 font-medium">
                    {service.religion}
                  </span>
                  {service.popular && (
                    <span className="text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/40">
                      Popular
                    </span>
                  )}
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <h3 className="font-serif text-base font-bold leading-snug">
                    {service.title}
                  </h3>
                </div>
              </div>

              <div className="p-3.5 flex flex-col justify-between flex-1 gap-3">
                <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
                  {service.shortDesc}
                </p>

                <div className="pt-2.5 border-t border-white/10 flex items-center justify-between">
                  <div className="text-[11px] text-white/60">
                    <span>Duration: {service.duration}</span>
                    <span aria-hidden="true" className="mx-1.5">
                      ·
                    </span>
                    <span className="font-bold text-amber-300">From ${service.startingPrice}</span>
                  </div>

                  <button
                    id={`book-service-${service.id}`}
                    onClick={() => onStartBooking(service)}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white font-bold text-xs rounded-full transition-all shadow-md cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* 7. VERIFIED CLERGY & FAITH OFFSubstring */}
      <section className="px-2 sm:px-4">
        <div className="flex items-baseline justify-between pb-2 mb-3 border-b border-white/10">
          <div>
            <h2 className="text-lg font-serif font-bold text-white tracking-tight flex items-center gap-2">
              <span>Verified Officiants & Clergy</span>
              {userReligion !== 'All' && (
                <span className="text-xs font-normal text-amber-300">
                  ({activeTheme.suggestedClergyTitle})
                </span>
              )}
            </h2>
            <p className="text-xs text-white/50">
              Spiritual officiants vetted for authentic lineage & community trust
            </p>
          </div>
          <button
            onClick={() => onStartBooking()}
            className="text-xs font-semibold text-amber-300 hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {filteredProviders.slice(0, 3).map((provider) => (
            <div
              key={provider.id}
              className="p-4 rounded-3xl glass-card flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3.5">
                <img
                  src={provider.photo}
                  alt={provider.name}
                  className="w-13 h-13 rounded-2xl object-cover ring-2 ring-white/20 shrink-0"
                />

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-base font-bold text-white truncate">
                      {provider.name}
                    </h3>
                    {provider.verified && (
                      <span className="text-[10px] text-emerald-300 font-semibold flex items-center gap-0.5 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        Verified
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-white/70 truncate">{provider.title}</p>

                  <div className="flex items-center gap-2 text-[11px] text-white/50 mt-1 flex-wrap">
                    <span className="text-amber-300 font-semibold">{provider.religion}</span>
                    <span aria-hidden="true">·</span>
                    <span>{provider.experienceYears} yrs experience</span>
                    <span aria-hidden="true">·</span>
                    <span>★ {provider.rating} ({provider.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2.5 sm:pt-0 border-white/10 gap-2 shrink-0">
                <div className="text-xs font-bold text-white">
                  From ${provider.startingPrice}{' '}
                  <span className="font-normal text-[11px] text-white/50">/ ceremony</span>
                </div>
                <button
                  id={`book-provider-${provider.id}`}
                  onClick={() => onStartBooking(undefined, provider)}
                  className="px-3.5 py-1.5 bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold text-xs rounded-full transition-colors cursor-pointer"
                >
                  Book Clergy
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CEREMONY ESSENTIALS SHOP PREVIEW */}
      <section className="px-2 sm:px-4">
        <div className="flex items-baseline justify-between pb-2 mb-3 border-b border-white/10">
          <div>
            <h2 className="text-lg font-serif font-bold text-white tracking-tight">
              Ceremony Essentials & Sacred Kits
            </h2>
            <p className="text-xs text-white/50">
              Pure hawan samagri, sacred lamps, prayer cloths & canonical texts
            </p>
          </div>
          <button
            onClick={() => onGoToTab('shop')}
            className="text-xs font-semibold text-amber-300 hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>Visit Shop</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-4">
          {PRODUCTS.slice(0, 4).map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            return (
              <div
                key={product.id}
                className="rounded-3xl glass-card overflow-hidden flex flex-col justify-between group"
              >
                <div className="relative aspect-square overflow-hidden bg-black/20">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 backdrop-blur-md text-white/80 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isWishlisted ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                  </button>
                  <span className="absolute bottom-2 left-2 glass-pill text-white text-[10px] font-medium px-2 py-0.5">
                    {product.religion}
                  </span>
                </div>

                <div className="p-3 flex flex-col justify-between flex-1 gap-2">
                  <div>
                    <h3 className="font-semibold text-xs text-white line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="text-[11px] text-white/50 mt-0.5">
                      ★ {product.rating} ({product.reviewsCount})
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-bold text-amber-300">
                      ${product.price}
                    </span>

                    <button
                      id={`add-cart-${product.id}`}
                      onClick={() => onAddToCart(product)}
                      className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white text-xs font-bold shadow-md active:scale-95 transition-all cursor-pointer"
                      title="Add to sacred cart"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. DEVOTIONAL CHANTS & MANTRAS PREVIEW */}
      <section className="px-2 sm:px-4">
        <div className="flex items-baseline justify-between pb-2 mb-3 border-b border-white/10">
          <div>
            <h2 className="text-lg font-serif font-bold text-white tracking-tight">
              Devotional Chants & Mantras
            </h2>
            <p className="text-xs text-white/50">
              Sacred sound frequencies, Upanishadic chants & meditation rāgas
            </p>
          </div>
          <button
            onClick={() => onGoToTab('music')}
            className="text-xs font-semibold text-amber-300 hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>Open Music</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Music Hero Glass Banner with Animated Waveform */}
        <div
          onClick={() => {
            if (onPlayTrack) onPlayTrack(SACRED_TRACKS[0]);
            onGoToTab('music');
          }}
          className="p-4 rounded-3xl glass-panel-elevated cursor-pointer group mb-3 relative overflow-hidden"
        >
          <div className="flex items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-white/20">
                <img
                  src={SACRED_TRACKS[0].coverArt}
                  alt={SACRED_TRACKS[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                  <Radio className="w-2.5 h-2.5 animate-pulse text-amber-400" /> 432 Hz Solfeggio
                </span>
                <h3 className="font-serif text-base font-bold text-white line-clamp-1 group-hover:text-amber-200 transition-colors">
                  {SACRED_TRACKS[0].title}
                </h3>
                <p className="text-xs text-white/60">{SACRED_TRACKS[0].artist}</p>
              </div>
            </div>

            <button
              type="button"
              className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-amber-500 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-all shrink-0 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white ml-0.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 10. SPIRITUAL WISDOM REELS PREVIEW */}
      <section className="px-2 sm:px-4">
        <div className="flex items-baseline justify-between pb-2 mb-3 border-b border-white/10">
          <div>
            <h2 className="text-lg font-serif font-bold text-white tracking-tight">
              Spiritual Wisdom Reels
            </h2>
            <p className="text-xs text-white/50">
              Short spiritual insights, mantra pronunciations & historical lore
            </p>
          </div>
          <button
            onClick={() => onGoToTab('reels')}
            className="text-xs font-semibold text-amber-300 hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>Watch All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
          {REELS.slice(0, 3).map((reel) => (
            <motion.div
              key={reel.id}
              whileHover={effectsLevel === 'minimal' ? undefined : { scale: 1.02 }}
              onClick={() => onGoToTab('reels')}
              className="h-56 rounded-3xl relative overflow-hidden glass-card cursor-pointer group"
            >
              <img
                src={reel.thumbnail}
                alt={reel.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07030F] via-black/30 to-transparent" />

              {/* Play Badge */}
              <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full glass-pill flex items-center justify-center text-white">
                <Play className="w-3 h-3 fill-white ml-0.5" />
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] text-amber-300 font-bold block mb-0.5">
                  {reel.religion}
                </span>
                <h3 className="font-serif text-sm font-bold line-clamp-2 leading-snug">
                  {reel.title}
                </h3>
                <p className="text-[10px] text-white/60 mt-1">
                  {(reel.likesCount / 1000).toFixed(1)}k reflections
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 11. CELESTIAL FOOTER WITH NIVA LOGO */}
      <footer className="mt-8 pt-8 pb-12 border-t border-white/10 px-4 text-center">
        <div className="flex flex-col items-center justify-center space-y-3 max-w-md mx-auto">
          <NivaLogo
            variant="full"
            size={110}
            glowColor={activeTheme.accentGlow}
            withGlow={true}
            animated={true}
            showStarTwinkle={true}
          />
          <p className="font-serif italic text-xs text-white/70 max-w-sm">
            “{activeTheme.scriptureText}”
          </p>
          <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest font-brand">
            <span>Interfaith Harmony</span>
            <span>•</span>
            <span>Verified Clergy</span>
            <span>•</span>
            <span>Sacred Cosmos</span>
          </div>
          <p className="text-[10px] text-white/30">
            © {new Date().getFullYear()} NIVA — Spiritual & Religious Services. Crafted with cosmic reverence.
          </p>
        </div>
      </footer>
    </div>
  );
};
