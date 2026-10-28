import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Play,
  Pause,
  Heart,
  Sparkles,
  Music2,
  Disc3,
  Clock,
  Radio,
  Flame,
  Volume2,
  Bell,
  Headphones,
  BookOpen,
  ChevronRight,
  Star,
  Layers,
} from 'lucide-react';
import {
  Religion,
  MusicTrack,
  MusicPlaylist,
  MusicCategoryType,
  AudioBook,
  AudioBookChapter,
} from '../../types';
import { SACRED_TRACKS, SACRED_PLAYLISTS, MUSIC_MOOD_CATEGORIES } from '../../data/musicData';
import { SACRED_AUDIO_BOOKS } from '../../data/audioBooksData';
import { audioEngine } from '../../utils/audioEngine';
import { AudioBookModal } from '../modals/AudioBookModal';

interface MusicViewProps {
  currentTrack: MusicTrack | null;
  isPlaying: boolean;
  onPlayTrack: (track: MusicTrack) => void;
  onTogglePlay: () => void;
  likedTrackIds: string[];
  onToggleLike: (trackId: string) => void;
  onSelectPlaylist: (playlist: MusicPlaylist) => void;
  onNavigateToBooks?: () => void;
}

type AudioFormatTab = 'all' | 'audiobooks' | 'playlists' | 'ambient';

export const MusicView: React.FC<MusicViewProps> = ({
  currentTrack,
  isPlaying,
  onPlayTrack,
  onTogglePlay,
  likedTrackIds,
  onToggleLike,
  onSelectPlaylist,
  onNavigateToBooks,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReligion, setSelectedReligion] = useState<Religion | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<MusicCategoryType | 'All'>('All');
  const [selectedFormat, setSelectedFormat] = useState<AudioFormatTab>('all');
  const [activeAmbientSound, setActiveAmbientSound] = useState<string | null>(null);

  // Audio Book Modal state
  const [selectedAudioBook, setSelectedAudioBook] = useState<AudioBook | null>(null);
  const [isAudioBookModalOpen, setIsAudioBookModalOpen] = useState(false);

  const religions: (Religion | 'All')[] = [
    'All',
    'Hinduism',
    'Islam',
    'Christianity',
    'Sikhism',
    'Buddhism',
    'Jainism',
    'Judaism',
  ];

  // Filtered tracks
  const filteredTracks = useMemo(() => {
    return SACRED_TRACKS.filter((track) => {
      const matchesSearch =
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesReligion =
        selectedReligion === 'All' || track.religion === selectedReligion || track.religion === 'All';

      const matchesCategory =
        selectedCategory === 'All' || track.category === selectedCategory;

      return matchesSearch && matchesReligion && matchesCategory;
    });
  }, [searchQuery, selectedReligion, selectedCategory]);

  // Filtered audio books
  const filteredAudioBooks = useMemo(() => {
    return SACRED_AUDIO_BOOKS.filter((book) => {
      const matchesSearch =
        searchQuery === '' ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.nativeTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.narrator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.authorOrSage.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesReligion =
        selectedReligion === 'All' || book.religion === selectedReligion || book.religion === 'All';

      return matchesSearch && matchesReligion;
    });
  }, [searchQuery, selectedReligion]);

  const quickMixes = SACRED_TRACKS.slice(0, 6);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAmbientToggle = (preset: string) => {
    if (activeAmbientSound === preset) {
      audioEngine.stop();
      setActiveAmbientSound(null);
    } else {
      audioEngine.play(preset);
      setActiveAmbientSound(preset);
    }
  };

  const handlePlayAudioBookChapter = (book: AudioBook, chapter: AudioBookChapter) => {
    const track: MusicTrack = {
      id: `track-${chapter.id}`,
      title: `${book.title}: Ch. ${chapter.chapterNumber} - ${chapter.title}`,
      artist: `${chapter.narrator} (${book.authorOrSage})`,
      religion: book.religion,
      album: book.title,
      category: 'Meditation & Zen',
      coverArt: book.coverArt,
      duration: chapter.duration,
      playsCount: book.listensCount,
      soundPreset: chapter.soundPreset,
      audioFrequency: `${book.totalDuration} Audio Narration`,
      lyricsOriginal: `${book.nativeTitle} — Chapter ${chapter.chapterNumber}: ${chapter.title}\n\n${chapter.summary}`,
      lyricsTransliteration: `Narrated by ${chapter.narrator}. Spiritual Takeaway: ${book.spiritualTakeaway}`,
      lyricsTranslation: `Summary: ${chapter.summary}\n\nKey Insight: ${book.spiritualTakeaway}`,
      tags: book.tags,
    };
    onPlayTrack(track);
  };

  const handleOpenAudioBook = (book: AudioBook) => {
    setSelectedAudioBook(book);
    setIsAudioBookModalOpen(true);
  };

  return (
    <div id="music-view" className="space-y-6 pb-28 pt-2 text-white">
      {/* Header Bar Glass Panel */}
      <div className="glass-panel p-5 relative overflow-hidden space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/10 text-xs font-semibold text-violet-300 mb-1.5">
              <Disc3 className="w-3.5 h-3.5 animate-spin-slow text-violet-400" />
              <span>NIVA Sacred Acoustics</span>
              <span className="text-white/40">•</span>
              <span className="text-amber-300">Spatial Resonance</span>
            </div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white">
              Devotional Chants & Audio Books
            </h1>
            <p className="text-white/60 text-xs md:text-sm mt-0.5">
              Binaural frequencies, holy book narrations & classical divine raagas
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Spinning Resonant Sound Orb + Dynamic Wave Equalizer */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl glass border transition-all ${
              isPlaying
                ? 'border-amber-400/40 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                : 'border-white/10 opacity-70'
            }`}>
              {/* Spinning Sacred Orb */}
              <div className={`relative w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 to-amber-400 flex items-center justify-center shadow-md ${
                isPlaying ? 'animate-spin-slow shadow-[0_0_8px_#F59E0B]' : ''
              }`}>
                <div className="w-1.5 h-1.5 rounded-full bg-[#07030F]" />
              </div>

              {/* Dynamic Wave Equalizer */}
              <div className="flex items-end gap-0.5 h-3">
                <span className={`w-0.5 bg-amber-300 rounded-full transition-all ${isPlaying ? 'h-3 animate-pulse' : 'h-1'}`} />
                <span className={`w-0.5 bg-amber-400 rounded-full transition-all ${isPlaying ? 'h-2 animate-pulse delay-75' : 'h-1.5'}`} />
                <span className={`w-0.5 bg-purple-300 rounded-full transition-all ${isPlaying ? 'h-3.5 animate-pulse delay-150' : 'h-1'}`} />
                <span className={`w-0.5 bg-amber-300 rounded-full transition-all ${isPlaying ? 'h-2 animate-pulse delay-100' : 'h-2'}`} />
              </div>
            </div>

            <button
              onClick={() => audioEngine.ringTempleBell()}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl glass border border-white/10 text-white text-xs font-semibold hover:bg-white/15 active:scale-95 transition-all shadow-lg"
              title="Ring Sacred Temple Bell"
            >
              <Bell className="w-4 h-4 text-amber-300" />
              <span>Bell</span>
            </button>
          </div>
        </div>

        {/* Search Bar in visionOS Glass */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
          <input
            type="text"
            id="music-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search audio books, mantras, qawwalis, hymns, gurbani..."
            className="w-full pl-10 pr-10 py-2.5 glass border border-white/15 rounded-2xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-violet-400 focus:bg-white/15 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Format Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all' as AudioFormatTab, label: 'All Sacred Audio', icon: Disc3 },
            {
              id: 'audiobooks' as AudioFormatTab,
              label: 'Audio Books',
              icon: Headphones,
              badge: `${SACRED_AUDIO_BOOKS.length}`,
            },
            { id: 'playlists' as AudioFormatTab, label: 'Playlists', icon: Layers },
            { id: 'ambient' as AudioFormatTab, label: 'Ambient Drone', icon: Volume2 },
          ].map((fmt) => {
            const isSelected = selectedFormat === fmt.id;
            const Icon = fmt.icon;
            return (
              <button
                key={fmt.id}
                onClick={() => setSelectedFormat(fmt.id)}
                className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 border-white/30'
                    : 'glass text-white/70 border-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{fmt.label}</span>
                {fmt.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-white/20 text-white">
                    {fmt.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Religion Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {religions.map((rel) => (
            <button
              key={rel}
              id={`filter-music-${rel.toLowerCase()}`}
              onClick={() => setSelectedReligion(rel)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                selectedReligion === rel
                  ? 'bg-violet-600 text-white border-violet-400 shadow-md shadow-violet-500/30'
                  : 'glass text-white/60 border-white/10 hover:text-white'
              }`}
            >
              {rel}
            </button>
          ))}
        </div>
      </div>

      {/* 1. SACRED AUDIO BOOKS SECTION */}
      {(selectedFormat === 'all' || selectedFormat === 'audiobooks') && (
        <section className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl glass text-violet-300 flex items-center justify-center border border-white/10">
                <Headphones className="w-3.5 h-3.5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Spiritual Audio Books</span>
                  <span className="text-[10px] font-bold text-amber-300 glass px-2 py-0.5 rounded-full border border-amber-400/30">
                    {filteredAudioBooks.length} Classics
                  </span>
                </h2>
                <p className="text-[11px] text-white/50">
                  Full narrations with sacred ambient drone & chapter insights
                </p>
              </div>
            </div>

            {selectedFormat === 'all' && (
              <button
                onClick={() => setSelectedFormat('audiobooks')}
                className="text-xs font-semibold text-violet-300 hover:text-violet-100 flex items-center gap-0.5"
              >
                <span>View All</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Audio Books Scroller */}
          <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-none">
            {filteredAudioBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => handleOpenAudioBook(book)}
                className="w-56 shrink-0 p-3.5 rounded-3xl glass-card cursor-pointer group flex flex-col justify-between hover:border-violet-400/40 transition-all hover:-translate-y-0.5"
              >
                <div>
                  <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-2.5 border border-white/20">
                    <img
                      src={book.coverArt}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 text-[10px] font-semibold text-white glass px-2 py-0.5 rounded-full border border-white/10">
                      {book.religion}
                    </span>
                    <span className="absolute top-2 right-2 text-[10px] font-semibold text-amber-300 glass px-2 py-0.5 rounded-full flex items-center gap-1 border border-amber-400/30">
                      <Clock className="w-3 h-3" />
                      {book.totalDuration}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white line-clamp-1 group-hover:text-violet-200 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-[10px] font-serif text-amber-300 line-clamp-1">
                    {book.nativeTitle}
                  </p>
                  <p className="text-[10px] text-white/50 mt-1 line-clamp-1">
                    Narrated by {book.narrator}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{book.rating}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayAudioBookChapter(book, book.chapters[0]);
                    }}
                    className="px-2.5 py-1 rounded-xl glass hover:bg-white/20 border border-white/20 text-white text-[10px] font-bold flex items-center gap-1 transition-all"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Ch. 1</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. QUICK DEVOTIONAL MIX TILES */}
      {selectedFormat === 'all' && !searchQuery && selectedCategory === 'All' && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-white/90 tracking-tight flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Quick Devotional Mixes</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {quickMixes.map((track) => {
              const isCurrent = currentTrack?.id === track.id;
              return (
                <div
                  key={track.id}
                  id={`quick-mix-${track.id}`}
                  onClick={() => onPlayTrack(track)}
                  className={`flex items-center rounded-2xl overflow-hidden cursor-pointer transition-all group relative p-2 ${
                    isCurrent
                      ? 'glass-panel border-violet-400/50 shadow-lg shadow-violet-500/20'
                      : 'glass-card hover:bg-white/10'
                  }`}
                >
                  <img
                    src={track.coverArt}
                    alt={track.title}
                    className="w-12 h-12 object-cover rounded-xl shrink-0 border border-white/20"
                  />
                  <div className="p-2 min-w-0 flex-1">
                    <p className="text-xs font-bold text-white truncate group-hover:text-violet-200">
                      {track.title}
                    </p>
                    <p className="text-[10px] text-white/50 truncate">
                      {track.religion} • {track.artist}
                    </p>
                  </div>
                  <div className="mr-2 w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-md shrink-0 border border-white/20">
                    {isCurrent && isPlaying ? (
                      <Pause className="w-3.5 h-3.5 fill-white" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. CURATED PLAYLISTS */}
      {(selectedFormat === 'all' || selectedFormat === 'playlists') && !searchQuery && (
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <span>Curated Devotional Playlists</span>
              <span className="text-[10px] font-bold text-amber-300 glass px-2 py-0.5 rounded-full border border-amber-400/30">
                {SACRED_PLAYLISTS.length}
              </span>
            </h2>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-none">
            {SACRED_PLAYLISTS.map((pl) => (
              <div
                key={pl.id}
                id={`playlist-${pl.id}`}
                onClick={() => onSelectPlaylist(pl)}
                className="w-44 shrink-0 p-3 rounded-3xl glass-card cursor-pointer group hover:border-violet-400/40 transition-all hover:-translate-y-0.5"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-2 border border-white/20">
                  <img
                    src={pl.coverArt}
                    alt={pl.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-40" />
                  <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform border border-white/20">
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  </div>
                </div>
                <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-violet-200">
                  {pl.title}
                </h4>
                <p className="text-[10px] text-white/50 line-clamp-2 mt-0.5">
                  {pl.description}
                </p>
                <span className="text-[9px] font-semibold text-amber-300 mt-1 inline-block">
                  {pl.tracksCount} sacred chants
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. AMBIENT SOUND GENERATOR */}
      {(selectedFormat === 'all' || selectedFormat === 'ambient') && (
        <div className="p-5 rounded-3xl glass-panel space-y-3 border-violet-400/25">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-violet-300" />
              <span className="text-xs font-bold text-white">
                Live Ambient Drone & Frequency Generator
              </span>
            </div>
            <span className="text-[10px] text-amber-300 font-mono glass px-2 py-0.5 rounded-full border border-amber-400/20">
              Web Audio Synth
            </span>
          </div>
          <p className="text-[11px] text-white/60">
            Harmonic sustained drone while reading, praying, or meditating in the cosmos.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {[
              { id: 'tanpura-om', label: '🕉️ Om Tanpura (C#)' },
              { id: 'singing-bowl', label: '🥣 528Hz Bowls' },
              { id: 'choir-chime', label: '⛪ Cathedral Organ' },
              { id: 'sufi-drone', label: '🪕 Ney Harmonium' },
              { id: 'gurbani-raag', label: '🪗 Rabab & Sarangi' },
            ].map((item) => {
              const isActive = activeAmbientSound === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleAmbientToggle(item.id)}
                  className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 border-white/40'
                      : 'glass text-white/80 border-white/10 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. TRACK LISTING */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-white/10">
          <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Top Sacred Chants ({filteredTracks.length})</span>
          </h2>
        </div>

        <div className="space-y-1.5">
          {filteredTracks.map((track, idx) => {
            const isCurrent = currentTrack?.id === track.id;
            const isLiked = likedTrackIds.includes(track.id);

            return (
              <div
                key={track.id}
                id={`track-item-${track.id}`}
                onClick={() => onPlayTrack(track)}
                className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all group ${
                  isCurrent
                    ? 'glass-panel border-violet-400/50 shadow-md shadow-violet-500/20'
                    : 'glass-card hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
                  <span className="text-xs font-bold text-white/40 w-4 text-center shrink-0">
                    {idx + 1}
                  </span>
                  <img
                    src={track.coverArt}
                    alt={track.title}
                    className="w-11 h-11 rounded-xl object-cover shrink-0 border border-white/20"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-white truncate group-hover:text-violet-200">
                      {track.title}
                    </p>
                    <p className="text-[11px] text-white/50 truncate">{track.artist}</p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-2 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => onToggleLike(track.id)}
                    className={`w-8 h-8 rounded-xl glass border border-white/10 flex items-center justify-center transition-colors ${
                      isLiked ? 'text-amber-400' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-amber-400' : ''}`} />
                  </button>

                  <span className="text-[11px] text-white/40 w-8 text-right font-medium">
                    {formatDuration(track.duration)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Audio Book Details Modal */}
      <AudioBookModal
        isOpen={isAudioBookModalOpen}
        onClose={() => setIsAudioBookModalOpen(false)}
        audioBook={selectedAudioBook}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayChapter={handlePlayAudioBookChapter}
        onTogglePlay={onTogglePlay}
        onNavigateToBooks={onNavigateToBooks}
      />
    </div>
  );
};
