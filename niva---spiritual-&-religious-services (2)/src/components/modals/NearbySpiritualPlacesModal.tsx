import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  MapPin,
  Navigation,
  Compass,
  Clock,
  Flame,
  Search,
  ExternalLink,
  Sparkles,
  Share2,
  CheckCircle2,
  Layers,
  ChevronRight,
  Filter,
  Users,
} from 'lucide-react';
import { Religion } from '../../types';
import { SPIRITUAL_PLACES, SpiritualPlace } from '../../data/spiritualPlacesData';
import { DIVINE_THEMES } from '../../theme/divineThemes';
import { useEffectsSettings } from '../../context/EffectsContext';

interface NearbySpiritualPlacesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCity: string;
  onSelectCity?: (city: string) => void;
  currentReligion?: Religion;
  onBookAtMandir?: (place: SpiritualPlace) => void;
}

export const NearbySpiritualPlacesModal: React.FC<NearbySpiritualPlacesModalProps> = ({
  isOpen,
  onClose,
  currentCity,
  onSelectCity,
  currentReligion = 'All',
  onBookAtMandir,
}) => {
  const { effectsLevel } = useEffectsSettings();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeView, setActiveView] = useState<'map' | 'list'>('map');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(SPIRITUAL_PLACES[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'All', label: 'All Shrines', icon: '✨' },
    { id: 'Mandir', label: 'Mandirs', icon: '🕉️' },
    { id: 'Gurdwara', label: 'Gurdwaras', icon: 'ੴ' },
    { id: 'Derasar', label: 'Derasars', icon: '🪷' },
    { id: 'Mosque', label: 'Mosques & Dargahs', icon: '☪️' },
    { id: 'Church', label: 'Churches', icon: '✝️' },
    { id: 'Monastery', label: 'Monasteries', icon: '☸️' },
  ];

  const filteredPlaces = useMemo(() => {
    return SPIRITUAL_PLACES.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.deityOrSanctum.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activePlace = useMemo(() => {
    return SPIRITUAL_PLACES.find((p) => p.id === selectedPlaceId) || filteredPlaces[0] || SPIRITUAL_PLACES[0];
  }, [selectedPlaceId, filteredPlaces]);

  if (!isOpen) return null;

  const handleOpenGoogleMaps = (place: SpiritualPlace) => {
    const query = encodeURIComponent(`${place.name}, ${place.address}`);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShare = (place: SpiritualPlace) => {
    const text = `${place.name} (${place.deityOrSanctum})\nDarshan: ${place.darshanTimings}\nLocation: ${place.address}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(place.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07030F]/85 backdrop-blur-3xl flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel-elevated bg-[#0D071E]/95 w-full max-w-4xl max-h-[92dvh] flex flex-col rounded-3xl shadow-[0_0_90px_rgba(168,85,247,0.35)] border border-white/20 overflow-hidden text-white"
      >
        {/* HEADER BAR */}
        <div className="p-4 sm:p-5 bg-white/[0.04] border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-purple-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Compass className="w-5 h-5 text-amber-300 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="eyebrow-label text-amber-300">Sacred Shrines & Mandirs</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold">
                  Live Status Active
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold font-serif text-white tracking-tight flex items-center gap-2">
                <span>Nearby Spiritual Places</span>
                <span className="text-white/40 text-xs font-sans font-normal">· {currentCity}</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle: Map Radar vs List */}
            <div className="bg-white/10 p-1 rounded-2xl border border-white/15 flex items-center gap-1">
              <button
                onClick={() => setActiveView('map')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeView === 'map'
                    ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-md'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cosmic Radar</span>
              </button>
              <button
                onClick={() => setActiveView('list')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeView === 'list'
                    ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-md'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Directory</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer border border-white/15"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SEARCH & FAITH FILTER BAR */}
        <div className="p-3 sm:p-4 bg-white/[0.02] border-b border-white/10 space-y-2.5 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by temple name, deity, deity avatar, or locality..."
              className="w-full pl-10 pr-10 py-2.5 bg-white/[0.06] border border-white/15 rounded-2xl text-xs text-white placeholder-white/40 focus:border-amber-400 focus:bg-white/10 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-400 text-[#07030F] border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                      : 'bg-white/[0.05] border-white/10 text-white/75 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN BODY: RADAR MAP OR DIRECTORY LIST */}
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar p-3 sm:p-5">
          {activeView === 'map' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
              {/* Left 7 cols: Interactive Cosmic Radar Map */}
              <div className="lg:col-span-7 flex flex-col">
                <div className="relative w-full aspect-square max-h-[380px] sm:max-h-[440px] rounded-3xl glass-card border border-white/20 overflow-hidden flex items-center justify-center p-4 bg-radial from-[#1A0E36]/90 via-[#0B0418] to-[#05020B]">
                  {/* Radar Concentric Distance Rings */}
                  <div className="absolute inset-4 rounded-full border border-white/10 pointer-events-none" />
                  <div className="absolute inset-16 rounded-full border border-white/15 pointer-events-none" />
                  <div className="absolute inset-28 rounded-full border border-white/20 pointer-events-none" />
                  <div className="absolute inset-40 rounded-full border border-white/25 pointer-events-none" />

                  {/* Distance Ring Markers */}
                  <span className="absolute top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/30 tracking-widest">
                    10 KM RADIUS
                  </span>
                  <span className="absolute top-18 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/30 tracking-widest">
                    5 KM
                  </span>
                  <span className="absolute top-30 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/40 tracking-widest">
                    2 KM
                  </span>

                  {/* Radar Axis Crosshair */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/[0.07] pointer-events-none" />
                  <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/[0.07] pointer-events-none" />

                  {/* Rotating Radar Sweep Line */}
                  {effectsLevel !== 'minimal' && (
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        background:
                          'conic-gradient(from 0deg at 50% 50%, rgba(245, 158, 11, 0.18) 0deg, transparent 60deg, transparent 360deg)',
                        animation: 'orbit-spin 10s linear infinite',
                      }}
                    />
                  )}

                  {/* Center: Devotee Current Location (User) */}
                  <div className="relative z-20 flex flex-col items-center">
                    <div className="relative">
                      <span className="absolute -inset-2 rounded-full bg-amber-400/30 animate-ping pointer-events-none" />
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-purple-500 border-2 border-white flex items-center justify-center shadow-[0_0_20px_#F59E0B]">
                        <MapPin className="w-4 h-4 text-[#07030F]" />
                      </div>
                    </div>
                    <span className="mt-1 px-2 py-0.5 rounded-full bg-[#07030F]/90 border border-white/20 text-[9px] font-bold text-amber-300">
                      You are here
                    </span>
                  </div>

                  {/* Mandir / Shrine Pins on Radar */}
                  {filteredPlaces.map((place) => {
                    const isSelected = place.id === activePlace.id;
                    const theme = DIVINE_THEMES[place.religion] || DIVINE_THEMES.All;

                    return (
                      <button
                        key={place.id}
                        onClick={() => setSelectedPlaceId(place.id)}
                        className={`absolute z-30 transition-all cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group ${
                          isSelected ? 'scale-125 z-40' : 'hover:scale-115'
                        }`}
                        style={{
                          left: `calc(50% + ${place.coordinates.relativeX * 1.5}px)`,
                          top: `calc(50% + ${place.coordinates.relativeY * 1.5}px)`,
                        }}
                        title={place.name}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                            isSelected
                              ? 'bg-amber-400 text-[#07030F] border-white shadow-[0_0_16px_#F59E0B]'
                              : 'bg-white/20 text-white backdrop-blur-md border-white/40 hover:bg-white/30'
                          }`}
                        >
                          {theme.symbol || '🛕'}
                        </div>

                        {/* Pin Tooltip */}
                        <div
                          className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 rounded-lg text-[10px] whitespace-nowrap font-bold pointer-events-none transition-all ${
                            isSelected
                              ? 'bg-[#07030F] text-amber-300 border border-amber-400/40 opacity-100 shadow-md'
                              : 'bg-black/80 text-white/90 border border-white/10 opacity-0 group-hover:opacity-100'
                          }`}
                        >
                          {place.name.split(' ')[0]} · {place.distanceKm} km
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-[11px] text-white/60 px-2 mt-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Tap any sanctum pin to view darshan timings & navigation
                  </span>
                  <span className="font-mono text-amber-300 font-bold">{filteredPlaces.length} shrines active</span>
                </div>
              </div>

              {/* Right 5 cols: Active Mandir Detail Preview Card */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div className="glass-card p-4 sm:p-5 rounded-3xl border border-white/20 space-y-4">
                  {/* Photo & Status */}
                  <div className="relative h-40 rounded-2xl overflow-hidden border border-white/15">
                    <img
                      src={activePlace.image}
                      alt={activePlace.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07030F] via-transparent to-transparent" />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#07030F]/80 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold">
                      {activePlace.category} · {activePlace.religion}
                    </div>
                    <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-emerald-500/80 backdrop-blur-md text-white text-[10px] font-extrabold flex items-center gap-1 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      {activePlace.openStatus}
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <h3 className="font-serif font-bold text-white text-base leading-tight drop-shadow-md">
                        {activePlace.name}
                      </h3>
                      <p className="text-[11px] text-amber-200/90 font-medium drop-shadow-sm">
                        {activePlace.deityOrSanctum}
                      </p>
                    </div>
                  </div>

                  {/* Quick Info Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-white/50 block">Distance</span>
                      <span className="font-bold text-amber-300 flex items-center gap-1">
                        <Navigation className="w-3.5 h-3.5" />
                        {activePlace.distanceKm} km away
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-white/50 block">Darshan Hours</span>
                      <span className="font-bold text-white text-[11px] truncate block">
                        {activePlace.darshanTimings}
                      </span>
                    </div>
                  </div>

                  {/* Aarti Schedule */}
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-400/20 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-amber-300 flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-amber-400" />
                        Daily Aarti & Chanting Schedule
                      </span>
                      <span className="text-[10px] text-white/60">Verified</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-white/80">
                      {activePlace.aartiTimings.slice(0, 4).map((aarti, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-amber-400" />
                          <span className="truncate">{aarti}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {activePlace.features.map((feat, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-white/70 text-[10px] font-medium"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => handleOpenGoogleMaps(activePlace)}
                      className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-[#07030F] font-black text-xs transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Navigation className="w-4 h-4 fill-current" />
                      <span>Navigate via Google Maps ({activePlace.distanceKm} km)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {onBookAtMandir && (
                        <button
                          onClick={() => {
                            onClose();
                            onBookAtMandir(activePlace);
                          }}
                          className="flex-1 py-2 px-3 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-400/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                          <span>Book Ceremony Here</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleShare(activePlace)}
                        className="py-2 px-3 rounded-xl bg-white/[0.08] hover:bg-white/15 text-white border border-white/15 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        title="Share mandir details"
                      >
                        {copiedId === activePlace.id ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                            <span className="text-emerald-300">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-3.5 h-3.5 text-white/70" />
                            <span>Share</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* DIRECTORY LIST VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredPlaces.map((place) => {
                const theme = DIVINE_THEMES[place.religion] || DIVINE_THEMES.All;

                return (
                  <motion.div
                    key={place.id}
                    whileHover={effectsLevel === 'minimal' ? undefined : { y: -2 }}
                    className="glass-card p-4 rounded-3xl border border-white/15 flex flex-col justify-between group space-y-3"
                  >
                    <div className="flex gap-3">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-white/15">
                        <img
                          src={place.image}
                          alt={place.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute bottom-1 left-1 text-xs">
                          {theme.symbol || '🛕'}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                            {place.category} · {place.religion}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                            {place.distanceKm} km
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-white text-sm line-clamp-1 group-hover:text-amber-200 transition-colors">
                          {place.name}
                        </h4>
                        <p className="text-[11px] text-white/60 line-clamp-1">
                          {place.deityOrSanctum}
                        </p>
                        <p className="text-[10px] text-white/40 mt-1 truncate">
                          {place.address}
                        </p>
                      </div>
                    </div>

                    {/* Aarti schedule preview */}
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] space-y-1">
                      <div className="flex items-center justify-between text-white/70">
                        <span className="flex items-center gap-1 font-semibold text-amber-300">
                          <Clock className="w-3 h-3 text-amber-400" />
                          Darshan: {place.darshanTimings}
                        </span>
                        <span className="text-[10px] text-white/50">{place.crowdLevel}</span>
                      </div>
                      <div className="text-[10px] text-white/50 truncate">
                        Key Aarti: {place.aartiTimings[0] || 'Morning & Evening'}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                      <button
                        onClick={() => handleOpenGoogleMaps(place)}
                        className="flex-1 py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#07030F] font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <Navigation className="w-3.5 h-3.5 fill-current" />
                        <span>Navigate in Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedPlaceId(place.id);
                          setActiveView('map');
                        }}
                        className="py-2 px-3 rounded-xl bg-white/[0.08] hover:bg-white/15 text-white text-xs font-semibold transition-all border border-white/15 cursor-pointer"
                        title="View on radar"
                      >
                        Radar View
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* FOOTER NOTICE */}
        <div className="p-3 sm:p-4 bg-white/[0.03] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/50 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
            <span>1-Tap navigation opens directions directly in Google Maps on iOS & Android.</span>
          </div>
          <span className="text-white/40">Sacred Geolocation Engine • NIVA</span>
        </div>
      </motion.div>
    </div>
  );
};
