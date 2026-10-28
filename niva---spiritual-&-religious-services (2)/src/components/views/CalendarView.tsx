import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Sparkles,
  Clock,
  MapPin,
  Share2,
  Bell,
  Star,
  Info,
  Layers,
  Heart,
  BookOpen,
  Filter,
} from 'lucide-react';
import { Religion, CalendarEvent, Product } from '../../types';
import { DIVINE_THEMES, DivineThemeConfig } from '../../theme/divineThemes';
import { COMPREHENSIVE_CALENDAR_EVENTS } from '../../data/calendarData';

interface CalendarViewProps {
  currentReligion?: Religion;
  themeConfig?: DivineThemeConfig;
  onBookCeremonyForEvent?: (event: CalendarEvent) => void;
  onAddReminder?: (event: CalendarEvent) => void;
  onAddToCart?: (product: Product) => void;
  onGoToShop?: () => void;
  onPlayPlaylist?: (playlistId: string) => void;
  onOpenNivaGuide?: (topic?: string) => void;
  onOpenPujaModal?: (title?: string) => void;
  onOpenStore?: () => void;
  onOpenMusic?: () => void;
  onSelectReligion?: (r: Religion) => void;
}

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarView: React.FC<CalendarViewProps> = ({
  currentReligion = 'Hinduism',
  themeConfig,
  onBookCeremonyForEvent,
  onAddReminder,
  onAddToCart,
  onGoToShop,
  onPlayPlaylist,
  onOpenNivaGuide,
  onOpenPujaModal,
  onOpenStore,
  onOpenMusic,
  onSelectReligion,
}) => {
  // Safe resolved theme config with fallback
  const resolvedThemeConfig: DivineThemeConfig =
    themeConfig || DIVINE_THEMES[currentReligion] || DIVINE_THEMES.All;

  // Center around September 2026 where COMPREHENSIVE_CALENDAR_EVENTS has rich festival data
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 8, 14));
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 8, 14));
  const [viewMode, setViewMode] = useState<'calendar' | 'upcoming'>('calendar');
  const [religionFilter, setReligionFilter] = useState<Religion | 'all'>(currentReligion);
  const [reminderSet, setReminderSet] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'festivals' | 'panchang' | 'timings'>('festivals');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday = () => {
    const defaultDate = new Date(2026, 8, 14);
    setCurrentDate(defaultDate);
    setSelectedDate(defaultDate);
  };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const toggleReminder = (event: CalendarEvent) => {
    setReminderSet((prev) => ({ ...prev, [event.id]: !prev[event.id] }));
    if (onAddReminder) {
      onAddReminder(event);
    }
  };

  const formatDateStr = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const selectedDateStr = formatDateStr(selectedDate);

  const selectedFestivals = COMPREHENSIVE_CALENDAR_EVENTS.filter(
    (ev) => ev.date === selectedDateStr
  );

  const monthFestivals = COMPREHENSIVE_CALENDAR_EVENTS.filter((ev) => {
    const [yStr, mStr] = ev.date.split('-');
    return parseInt(yStr, 10) === year && parseInt(mStr, 10) === month + 1;
  });

  const filteredMonthFestivals =
    religionFilter === 'all'
      ? monthFestivals
      : monthFestivals.filter((f) => f.religion === religionFilter);

  const isSelectedDate = (d: number) =>
    selectedDate.getDate() === d &&
    selectedDate.getMonth() === month &&
    selectedDate.getFullYear() === year;

  const isTodayDate = (d: number) => {
    return d === 14 && month === 8 && year === 2026;
  };

  const hasFestivalsOnDay = (d: number) => {
    const targetDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return COMPREHENSIVE_CALENDAR_EVENTS.some((ev) => ev.date === targetDateStr);
  };

  const handleBookPuja = (fest: CalendarEvent) => {
    if (onBookCeremonyForEvent) {
      onBookCeremonyForEvent(fest);
    } else if (onOpenPujaModal) {
      onOpenPujaModal(fest.title);
    }
  };

  return (
    <div className="space-y-6 pb-28 pt-2">
      {/* Header glass card */}
      <div className="glass-panel p-5 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/10 text-xs font-medium text-white/80 mb-2">
              <CalendarIcon className="w-3.5 h-3.5 text-violet-300" />
              <span>Sacred Cosmic Ephemeris</span>
              <span className="text-white/40">•</span>
              <span className="text-amber-300">{resolvedThemeConfig?.name || 'All Traditions'}</span>
            </div>
            <h1 className="font-heading text-2xl md:text-3xl font-semibold text-white tracking-wide">
              Panchang & Divine Timings
            </h1>
            <p className="text-white/60 text-xs md:text-sm mt-0.5">
              Auspicious Muhurat, Tithi, Nakshatra & Global Multi-Faith Observances
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="glass p-1 rounded-2xl flex items-center gap-1 border border-white/10">
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  viewMode === 'calendar'
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 border border-white/20'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Calendar
              </button>
              <button
                onClick={() => setViewMode('upcoming')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  viewMode === 'upcoming'
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 border border-white/20'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Upcoming ({filteredMonthFestivals.length})
              </button>
            </div>

            <button
              onClick={goToToday}
              className="glass px-3 py-1.5 rounded-xl text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 border border-white/10 transition-colors"
            >
              Today
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Month grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="glass-panel p-5">
              {/* Month selector */}
              <div className="flex items-center justify-between mb-5">
                <button
                  onClick={prevMonth}
                  className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="text-center">
                  <h2 className="font-heading text-lg md:text-xl font-semibold text-white tracking-wide">
                    {MONTH_NAMES[month]} {year}
                  </h2>
                  <p className="text-[11px] text-white/50">Bhadrapada – Ashwina 2083 Vikram Samvat</p>
                </div>

                <button
                  onClick={nextMonth}
                  className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Next Month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Day labels */}
              <div className="grid grid-cols-7 gap-1.5 mb-2 text-center">
                {WEEKDAYS.map((w) => (
                  <div key={w} className="text-[11px] font-semibold text-white/40 uppercase py-1">
                    {w}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1.5">
                {/* Empty cells before 1st */}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-12 md:h-14 rounded-2xl opacity-10" />
                ))}

                {/* Actual days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const selected = isSelectedDate(dayNum);
                  const today = isTodayDate(dayNum);
                  const hasFestivals = hasFestivalsOnDay(dayNum);

                  return (
                    <button
                      key={`day-${dayNum}`}
                      onClick={() => setSelectedDate(new Date(year, month, dayNum))}
                      className={`relative h-12 md:h-14 rounded-2xl flex flex-col items-center justify-center transition-all p-1 group border ${
                        selected
                          ? 'bg-gradient-to-br from-violet-600/80 to-indigo-600/80 border-white/40 text-white shadow-lg shadow-violet-500/30 scale-105 z-10'
                          : today
                          ? 'glass border-violet-400/50 text-white animate-pulse-glow'
                          : hasFestivals
                          ? 'glass border-amber-400/40 text-white shadow-[0_0_12px_rgba(245,158,11,0.22)] hover:border-amber-400/70 hover:shadow-[0_0_18px_rgba(245,158,11,0.35)]'
                          : 'glass border-white/5 text-white/80 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className={`text-xs md:text-sm font-semibold ${selected ? 'text-white' : 'text-white/90'}`}>
                        {dayNum}
                      </span>

                      {/* Festival star beacon */}
                      {hasFestivals && (
                        <div className="flex items-center gap-0.5 mt-0.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              selected ? 'bg-amber-300 shadow-[0_0_8px_#fde047]' : 'bg-amber-400 shadow-[0_0_6px_#fbbf24]'
                            }`}
                          />
                        </div>
                      )}

                      {/* Today badge */}
                      {today && !selected && (
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_6px_#a78bfa]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick multi-faith legend */}
            <div className="glass p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs text-white/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
                <span>Festival Observance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_6px_#a78bfa]" />
                <span>Today</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Amrit Kaal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span>Rahu Kaal</span>
              </div>
            </div>
          </div>

          {/* Day Detail panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel p-5 space-y-4">
              {/* Selected date header */}
              <div className="flex items-start justify-between pb-3 border-b border-white/10">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-violet-300 font-semibold">
                    {WEEKDAYS[selectedDate.getDay()]}
                  </p>
                  <h3 className="font-heading text-xl font-bold text-white">
                    {MONTH_NAMES[selectedDate.getMonth()]} {selectedDate.getDate()}, {selectedDate.getFullYear()}
                  </h3>
                  <p className="text-xs text-white/60 mt-0.5">
                    Shukla Chaturthi • Sharad Ritu
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl glass border border-white/10 flex items-center justify-center text-amber-300">
                  <Sun className="w-5 h-5 animate-spin-slow" />
                </div>
              </div>

              {/* Subtabs */}
              <div className="grid grid-cols-3 gap-1 glass p-1 rounded-2xl border border-white/10 text-xs">
                <button
                  onClick={() => setActiveTab('festivals')}
                  className={`py-1.5 rounded-xl font-medium transition-all ${
                    activeTab === 'festivals'
                      ? 'bg-violet-600/80 text-white shadow border border-white/20'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Festivals ({selectedFestivals.length})
                </button>
                <button
                  onClick={() => setActiveTab('panchang')}
                  className={`py-1.5 rounded-xl font-medium transition-all ${
                    activeTab === 'panchang'
                      ? 'bg-violet-600/80 text-white shadow border border-white/20'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Panchang
                </button>
                <button
                  onClick={() => setActiveTab('timings')}
                  className={`py-1.5 rounded-xl font-medium transition-all ${
                    activeTab === 'timings'
                      ? 'bg-violet-600/80 text-white shadow border border-white/20'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Muhurat
                </button>
              </div>

              {/* Tab: Festivals on Selected Date */}
              {activeTab === 'festivals' && (
                <div className="space-y-3">
                  {selectedFestivals.length === 0 ? (
                    <div className="glass p-6 rounded-2xl text-center space-y-2">
                      <Sparkles className="w-6 h-6 text-violet-400 mx-auto opacity-60" />
                      <p className="text-xs text-white/60">
                        No major religious festival recorded on this calendar day.
                      </p>
                      <p className="text-[11px] text-white/40">
                        Regular daily rituals, prayers, and meditations are auspicious throughout the day.
                      </p>
                    </div>
                  ) : (
                    selectedFestivals.map((fest) => (
                      <div
                        key={fest.id}
                        className="glass-panel p-4 space-y-2 border border-violet-500/30 bg-violet-950/20"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="px-2 py-0.5 rounded-full glass text-[10px] font-semibold text-amber-300 uppercase tracking-wider">
                              {fest.religion}
                            </span>
                            <h4 className="font-heading text-base font-bold text-white mt-1">
                              {fest.title}
                            </h4>
                          </div>
                          <button
                            onClick={() => toggleReminder(fest)}
                            className={`p-2 rounded-xl glass border border-white/10 transition-colors ${
                              reminderSet[fest.id]
                                ? 'text-amber-300 bg-amber-500/10 border-amber-400/30'
                                : 'text-white/60 hover:text-white'
                            }`}
                            aria-label="Toggle reminder"
                          >
                            <Bell className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed">
                          {fest.description}
                        </p>
                        <div className="pt-2 flex items-center justify-between text-[11px]">
                          <span className="text-white/50">{fest.auspiciousTimings || 'Auspicious throughout the day'}</span>
                          <button
                            onClick={() => handleBookPuja(fest)}
                            className="text-violet-300 hover:text-violet-200 font-semibold underline underline-offset-4"
                          >
                            Book Special Puja →
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab: Panchang */}
              {activeTab === 'panchang' && (
                <div className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="glass p-3 rounded-2xl border border-white/10">
                      <span className="text-[10px] uppercase text-white/40 block">Tithi</span>
                      <span className="font-semibold text-white text-sm">Shukla Chaturthi</span>
                      <span className="text-[10px] text-white/50 block mt-0.5">Paksha: Shukla Paksha</span>
                    </div>
                    <div className="glass p-3 rounded-2xl border border-white/10">
                      <span className="text-[10px] uppercase text-white/40 block">Nakshatra</span>
                      <span className="font-semibold text-white text-sm">Chitra Nakshatra</span>
                      <span className="text-[10px] text-white/50 block mt-0.5">Lord: Mars / Mangal</span>
                    </div>
                    <div className="glass p-3 rounded-2xl border border-white/10">
                      <span className="text-[10px] uppercase text-white/40 block">Yoga</span>
                      <span className="font-semibold text-white text-sm">Brahma Yoga</span>
                      <span className="text-[10px] text-white/50 block mt-0.5">Auspicious Conjunction</span>
                    </div>
                    <div className="glass p-3 rounded-2xl border border-white/10">
                      <span className="text-[10px] uppercase text-white/40 block">Karana</span>
                      <span className="font-semibold text-white text-sm">Vanija Karana</span>
                      <span className="text-[10px] text-white/50 block mt-0.5">Shakuni • Active</span>
                    </div>
                  </div>

                  <div className="glass p-3 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-amber-400" />
                      <div>
                        <span className="text-white/40 text-[10px] block">Sunrise / Sunset</span>
                        <span className="font-semibold text-white">06:08 AM – 06:27 PM</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Moon className="w-4 h-4 text-indigo-300" />
                      <div className="text-right">
                        <span className="text-white/40 text-[10px] block">Moonrise</span>
                        <span className="font-semibold text-white">09:14 AM</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Timings / Muhurat */}
              {activeTab === 'timings' && (
                <div className="space-y-2 text-xs">
                  <div className="glass p-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-emerald-400 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Amrit Kaal (Most Auspicious)
                      </span>
                      <span className="font-semibold text-white text-sm">02:15 PM – 03:52 PM</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-medium">
                      Optimal
                    </span>
                  </div>

                  <div className="glass p-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-amber-300 font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Abhijit Muhurat
                      </span>
                      <span className="font-semibold text-white text-sm">11:52 AM – 12:42 PM</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-medium">
                      Midday Victory
                    </span>
                  </div>

                  <div className="glass p-3 rounded-2xl border border-rose-500/20 bg-rose-500/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-rose-400 font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Rahu Kaal (Inauspicious)
                      </span>
                      <span className="font-semibold text-white text-sm">07:40 AM – 09:12 AM</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-medium">
                      Avoid New Works
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Upcoming month festivals list */
        <div className="space-y-4">
          {/* Religion filter bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setReligionFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                religionFilter === 'all'
                  ? 'bg-violet-600 text-white border-violet-400 shadow-md shadow-violet-500/30'
                  : 'glass text-white/60 border-white/10 hover:text-white'
              }`}
            >
              All Faiths ({monthFestivals.length})
            </button>
            {Object.values(DIVINE_THEMES).map((t) => (
              <button
                key={t.id}
                onClick={() => setReligionFilter(t.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  religionFilter === t.id
                    ? 'bg-violet-600 text-white border-violet-400 shadow-md shadow-violet-500/30'
                    : 'glass text-white/60 border-white/10 hover:text-white'
                }`}
              >
                <span>{t.symbol}</span>
                <span>{t.name}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMonthFestivals.map((fest) => (
              <div
                key={fest.id}
                className="glass-panel p-5 flex flex-col justify-between group hover:border-violet-500/40 transition-all hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded-full glass border border-white/10 text-[10px] font-semibold text-amber-300 uppercase">
                      {fest.religion}
                    </span>
                    <button
                      onClick={() => toggleReminder(fest)}
                      className={`p-1.5 rounded-lg glass border border-white/10 transition-colors ${
                        reminderSet[fest.id]
                          ? 'text-amber-300 bg-amber-500/10'
                          : 'text-white/40 hover:text-white'
                      }`}
                    >
                      <Bell className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-white group-hover:text-violet-200 transition-colors">
                    {fest.title}
                  </h3>
                  <p className="text-xs text-violet-300 font-medium mt-0.5">
                    {fest.date}
                  </p>
                  <p className="text-xs text-white/70 mt-2 leading-relaxed line-clamp-3">
                    {fest.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-white/50">{fest.auspiciousTimings || 'Sacred Day'}</span>
                  <button
                    onClick={() => handleBookPuja(fest)}
                    className="text-violet-300 hover:text-violet-100 font-semibold"
                  >
                    Book Puja →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
