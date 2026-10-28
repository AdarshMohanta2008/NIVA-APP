import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Search,
  Volume2,
  Bookmark,
  Share2,
  Copy,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Bot,
  Lightbulb,
  Globe,
} from 'lucide-react';
import { Religion, HolyBook, SacredVerse, HolyBookChapter, AppLanguage } from '../../types';
import { HOLY_BOOKS, DAILY_SACRED_VERSES } from '../../data/holyBooksData';
import { RELIGIONS } from '../../data/mockData';
import { audioEngine } from '../../utils/audioEngine';
import { SUPPORTED_LANGUAGES } from '../../utils/translations';
import { TiltCard } from '../spatial/TiltCard';
import { useEffectsSettings } from '../../context/EffectsContext';

interface HolyBooksViewProps {
  onOpenNivaGuide?: (topic?: string) => void;
  onPlayPlaylist?: (playlistId: string) => void;
  onGoToTab?: (tab: any) => void;
}

export const HolyBooksView: React.FC<HolyBooksViewProps> = ({
  onOpenNivaGuide,
  onPlayPlaylist,
  onGoToTab,
}) => {
  const [selectedReligion, setSelectedReligion] = useState<Religion | 'All'>('All');
  const [selectedTheme, setSelectedTheme] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBook, setActiveBook] = useState<HolyBook | null>(null);
  const [activeChapter, setActiveChapter] = useState<HolyBookChapter | null>(null);

  // Local Language Selection for Verses
  const [verseLanguage, setVerseLanguage] = useState<AppLanguage>('hi');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [bookmarkedVerses, setBookmarkedVerses] = useState<string[]>(['gita-2-47', 'quran-1-1']);
  const [copiedVerseId, setCopiedVerseId] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [playingVerseId, setPlayingVerseId] = useState<string | null>(null);
  const [dailyIndex, setDailyIndex] = useState(0);
  const { effectsLevel } = useEffectsSettings();

  const currentDailyVerse = DAILY_SACRED_VERSES[dailyIndex];

  // Filtering books
  const filteredBooks = HOLY_BOOKS.filter((book) => {
    const matchesReligion = selectedReligion === 'All' || book.religion === selectedReligion;
    const matchesSearch =
      searchQuery.trim() === '' ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.nativeTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.spiritualEssence.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTheme =
      selectedTheme === 'All' || book.keyThemes.includes(selectedTheme);

    return matchesReligion && matchesSearch && matchesTheme;
  });

  const handleCopyVerse = (verse: SacredVerse) => {
    const textToCopy = `"${verse.translation}"\n— ${verse.verseNumber} (${activeBook?.title || 'Holy Scriptures'})\n\nOriginal: ${verse.scriptOriginal}\nTransliteration: ${verse.transliteration}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedVerseId(verse.id);
    setTimeout(() => setCopiedVerseId(null), 2500);
  };

  const handleToggleBookmark = (verseId: string) => {
    setBookmarkedVerses((prev) =>
      prev.includes(verseId) ? prev.filter((id) => id !== verseId) : [...prev, verseId]
    );
  };

  const handlePlayVerseAudio = (verse: SacredVerse) => {
    if (isAudioPlaying && playingVerseId === verse.id) {
      audioEngine.stop();
      setIsAudioPlaying(false);
      setPlayingVerseId(null);
    } else {
      audioEngine.play(verse.audioPreset || 'tanpura-om');
      setIsAudioPlaying(true);
      setPlayingVerseId(verse.id);
    }
  };

  const THEMES = [
    'All',
    'Peace',
    'Duty & Courage',
    'Love & Compassion',
    'Wisdom & Truth',
    'Devotion & Faith',
    'Healing & Comfort',
  ];

  // 1. DEEP SCRIPTURE READER VIEW
  if (activeBook) {
    const currentChapter = activeChapter || activeBook.chapters[0];
    const versesToDisplay = currentChapter ? currentChapter.verses : [];

    return (
      <div className="pb-12 pt-2 max-w-6xl mx-auto space-y-5 text-white">
        {/* Navigation & Header in visionOS Glass */}
        <div className="sticky top-14 z-20 p-3.5 rounded-3xl glass-panel flex items-center justify-between gap-2 shadow-2xl">
          <button
            onClick={() => {
              setActiveBook(null);
              setActiveChapter(null);
              audioEngine.stop();
              setIsAudioPlaying(false);
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-white hover:text-amber-300 transition-colors py-1.5 px-3 rounded-2xl glass border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Library</span>
          </button>

          <div className="text-center truncate max-w-[220px]">
            <span className="text-[10px] font-semibold text-amber-300 block truncate uppercase tracking-wider">
              {activeBook.religion}
            </span>
            <span className="text-xs font-bold text-white truncate block">
              {activeBook.title}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() =>
                setFontSize(fontSize === 'normal' ? 'large' : fontSize === 'large' ? 'xlarge' : 'normal')
              }
              className="px-2.5 py-1.5 rounded-2xl glass border border-white/10 text-[10px] font-bold text-white hover:bg-white/10 transition-colors"
              title="Adjust Font Size"
            >
              A{fontSize === 'xlarge' ? '++' : fontSize === 'large' ? '+' : ''}
            </button>
          </div>
        </div>

        {/* Chapters Strip */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          {activeBook.chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setActiveChapter(ch)}
              className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all border ${
                (activeChapter?.id || activeBook.chapters[0].id) === ch.id
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 border-white/30'
                  : 'glass text-white/70 border-white/10 hover:text-white'
              }`}
            >
              Ch. {ch.chapterNumber}: {ch.titleEnglish || ch.titleOriginal}
            </button>
          ))}
        </div>

        {/* Page-Glow Verse Cards */}
        <div className="space-y-4">
          {versesToDisplay.map((verse) => {
            const isBookmarked = bookmarkedVerses.includes(verse.id);
            const isAudioActive = isAudioPlaying && playingVerseId === verse.id;

            return (
              <article
                key={verse.id}
                className="p-6 rounded-[32px] glass-panel shadow-2xl space-y-4 border-white/15 relative overflow-hidden"
              >
                {/* Page Glow Effect */}
                <div
                  className="absolute -top-20 -right-20 w-48 h-48 rounded-full pointer-events-none opacity-20"
                  style={{
                    background: 'radial-gradient(circle, #F59E0B 0%, transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                />

                <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
                  <span className="text-xs font-semibold text-amber-300 px-3 py-1 rounded-full glass border border-amber-400/30">
                    Verse {verse.verseNumber}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handlePlayVerseAudio(verse)}
                      className={`p-2 rounded-xl glass border border-white/10 transition-colors ${
                        isAudioActive ? 'text-amber-300 bg-amber-500/20 border-amber-400/40' : 'text-white/60 hover:text-white'
                      }`}
                      title="Chant Drone"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleToggleBookmark(verse.id)}
                      className={`p-2 rounded-xl glass border border-white/10 transition-colors ${
                        isBookmarked ? 'text-amber-400' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleCopyVerse(verse)}
                      className="p-2 rounded-xl glass border border-white/10 text-white/60 hover:text-white transition-colors"
                      title="Copy verse"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Original Sacred Script */}
                <div className="p-4 rounded-2xl glass border border-white/10 bg-white/[0.04]">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-amber-300 mb-1.5">
                    Original Sacred Verse
                  </div>
                  <div
                    className={`font-serif text-white leading-loose whitespace-pre-line tracking-wide ${
                      fontSize === 'xlarge'
                        ? 'text-xl'
                        : fontSize === 'large'
                        ? 'text-lg'
                        : 'text-base'
                    }`}
                  >
                    {verse.scriptOriginal}
                  </div>
                </div>

                {/* Transliteration */}
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-white/50 mb-1">
                    Phonetic Transliteration
                  </div>
                  <p className="italic text-white/70 font-sans leading-relaxed text-xs">
                    {verse.transliteration}
                  </p>
                </div>

                {/* Translation */}
                <div className="pt-2 border-t border-white/10">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-amber-300 mb-1">
                    Spiritual Meaning
                  </div>
                  <p className="font-serif font-medium text-white leading-relaxed text-sm">
                    “{verse.translation}”
                  </p>
                </div>

                {/* Commentary */}
                <div className="p-4 rounded-2xl glass text-xs border border-amber-400/25 bg-amber-500/[0.03]">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-300 mb-1">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                    <span>Living Wisdom & Reflection</span>
                  </div>
                  <p className="text-white/80 font-normal leading-relaxed">
                    {verse.commentary}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. MAIN HOLY BOOKS CATALOG & PORTAL
  return (
    <div className="pb-12 pt-2 max-w-6xl mx-auto space-y-6 text-white">
      {/* Header Introduction in Glass Panel */}
      <div className="glass-panel p-5 relative overflow-hidden space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/10 text-xs font-semibold text-violet-300">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Sacred Cosmos Canon</span>
          <span className="text-white/40">•</span>
          <span className="text-amber-300">7 Traditions</span>
        </div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          <span>Holy Books & Scriptures</span>
        </h1>
        <p className="text-xs md:text-sm text-white/60 leading-relaxed">
          Authentic verses, chant drones, transliterations, and living reflections across world spiritual lineages.
        </p>
      </div>

      {/* Daily Verse Inspiration Card with Page-Glow */}
      {currentDailyVerse && (
        <div className="p-6 rounded-[32px] glass-panel relative overflow-hidden border border-amber-400/30">
          <div className="flex items-center justify-between text-[11px] text-amber-300 pb-3 border-b border-white/10">
            <span className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Verse of the Day</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-white/70">{currentDailyVerse.verseNumber}</span>
              <button
                onClick={() => setDailyIndex((prev) => (prev + 1) % DAILY_SACRED_VERSES.length)}
                className="text-[10px] font-bold text-amber-300 hover:underline"
              >
                Next →
              </button>
            </div>
          </div>

          <div className="my-4 space-y-2">
            <div className="font-serif text-base sm:text-lg leading-relaxed text-white font-medium">
              “{currentDailyVerse.translation}”
            </div>
            <div className="text-xs text-amber-200/70 italic">
              {currentDailyVerse.transliteration}
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-[11px] text-amber-300 font-medium">
              Theme: {currentDailyVerse.theme}
            </span>
            <button
              onClick={() => handlePlayVerseAudio(currentDailyVerse)}
              className="py-1.5 px-3.5 rounded-2xl glass text-white text-[11px] font-semibold flex items-center gap-1.5 border border-white/10 hover:bg-white/15 transition-all"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Chant Drone</span>
            </button>
          </div>
        </div>
      )}

      {/* Search Input in Frosted Glass */}
      <div className="relative">
        <Search className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by scripture title, verse text, or theme..."
          className="w-full glass border border-white/15 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-violet-400 transition-all shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-white/50 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filter by Religion */}
      <div>
        <div className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-2">
          Filter by Faith Tradition
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          <button
            onClick={() => setSelectedReligion('All')}
            className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedReligion === 'All'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 border-white/30'
                : 'glass text-white/70 border-white/10 hover:text-white'
            }`}
          >
            All Traditions ({HOLY_BOOKS.length})
          </button>
          {RELIGIONS.map((rel) => {
            const count = HOLY_BOOKS.filter((b) => b.religion === rel.id).length;
            if (count === 0) return null;
            const isSelected = selectedReligion === rel.id;

            return (
              <button
                key={rel.id}
                onClick={() => setSelectedReligion(rel.id)}
                className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 border-white/30'
                    : 'glass text-white/70 border-white/10 hover:text-white'
                }`}
              >
                <span>{rel.symbol}</span>
                <span>{rel.name}</span>
                <span className="opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating 3D Book Covers Grid with Soft Shadows */}
      <div className="space-y-4">
        {filteredBooks.map((book) => (
          <TiltCard
            key={book.id}
            onClick={() => {
              setActiveBook(book);
              setActiveChapter(book.chapters[0] || null);
            }}
            className="p-5 rounded-[32px] glass-panel shadow-2xl cursor-pointer group flex flex-col sm:flex-row gap-4 border border-white/15 hover:border-violet-400/40 transition-all"
          >
            {/* 3D Floating Book Cover */}
            <div className="w-full sm:w-28 h-40 sm:h-auto rounded-2xl overflow-hidden relative shrink-0 border border-white/25 shadow-[0_15px_30px_rgba(0,0,0,0.6)] group-hover:-translate-y-1.5 group-hover:shadow-[0_22px_45px_rgba(168,85,247,0.35)] transition-all duration-500 transform-gpu">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-2 text-[10px] font-semibold text-white glass px-2 py-0.5 rounded-full border border-white/10">
                {book.religion}
              </span>
            </div>

            {/* Book Metadata */}
            <div className="flex-1 flex flex-col justify-between space-y-2.5">
              <div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <span>{book.languageOrigin}</span>
                  <span aria-hidden="true">·</span>
                  <span>{book.periodOrEra}</span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-violet-200 transition-colors flex items-center justify-between">
                  <span>{book.title}</span>
                  <span className="text-xs font-serif font-normal text-amber-300">
                    {book.nativeTitle}
                  </span>
                </h2>

                <p className="text-xs text-white/70 mt-1 line-clamp-2 leading-relaxed">
                  {book.description}
                </p>
              </div>

              {/* Essence Quote */}
              <div className="p-3 rounded-2xl glass text-[11px] text-white/90 font-serif italic border border-amber-400/20 bg-amber-500/[0.03]">
                “{book.spiritualEssence}”
              </div>

              {/* Bottom Details & Action */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[11px] text-white/50">
                  <span>{book.chaptersCount} Chapters</span>
                  <span aria-hidden="true">·</span>
                  <span>{book.versesCount}</span>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-amber-300 group-hover:translate-x-1 transition-transform">
                  <span>Read Scripture</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
};
