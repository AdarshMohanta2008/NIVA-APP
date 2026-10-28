import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Play,
  Pause,
  Headphones,
  Clock,
  Star,
  BookOpen,
  Share2,
  Sparkles,
  Volume2,
  Bookmark,
  Check,
  CheckCircle2,
  FastForward,
  Timer,
} from 'lucide-react';
import { AudioBook, AudioBookChapter, MusicTrack } from '../../types';

interface AudioBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  audioBook: AudioBook | null;
  currentTrack: MusicTrack | null;
  isPlaying: boolean;
  onPlayChapter: (audioBook: AudioBook, chapter: AudioBookChapter) => void;
  onTogglePlay: () => void;
  onNavigateToBooks?: () => void;
}

export const AudioBookModal: React.FC<AudioBookModalProps> = ({
  isOpen,
  onClose,
  audioBook,
  currentTrack,
  isPlaying,
  onPlayChapter,
  onTogglePlay,
  onNavigateToBooks,
}) => {
  const [playbackSpeed, setPlaybackSpeed] = useState<'1.0x' | '1.25x' | '1.5x'>('1.0x');
  const [sleepTimer, setSleepTimer] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [bookmarkedChapters, setBookmarkedChapters] = useState<string[]>([]);

  if (!isOpen || !audioBook) return null;

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainderSecs = sec % 60;
    return `${mins}m ${remainderSecs < 10 ? '0' : ''}${remainderSecs}s`;
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(
      `Listening to "${audioBook.title}" on NIVA Sacred Audio Books: ${audioBook.description.slice(0, 100)}...`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const toggleBookmark = (chapterId: string) => {
    setBookmarkedChapters((prev) =>
      prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#07030F]/80 backdrop-blur-2xl animate-in fade-in duration-200">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-panel bg-[#0D071E]/95 w-full max-w-lg rounded-3xl shadow-[0_0_80px_rgba(168,85,247,0.3)] border border-white/20 flex flex-col max-h-[90vh] overflow-hidden text-white"
      >
        {/* Top Header */}
        <div className="relative bg-white/[0.05] p-5 pb-6 shrink-0 border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex gap-4 items-start pt-1">
            <div className="w-24 h-32 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.3)] border border-white/20 shrink-0 relative">
              <img
                src={audioBook.coverArt}
                alt={audioBook.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1.5 left-1.5 text-[9px] font-bold text-white bg-black/70 px-2 py-0.5 rounded-full backdrop-blur-xs border border-white/15">
                {audioBook.religion}
              </span>
            </div>

            <div className="flex-1 space-y-1 pr-6">
              <div className="flex items-center gap-2 text-[11px] text-amber-300 font-medium">
                <span>{audioBook.totalDuration}</span>
                <span aria-hidden="true">·</span>
                <span>{audioBook.totalChapters} Chapters</span>
              </div>

              <h2 className="text-base sm:text-lg font-black tracking-tight text-white leading-snug">
                {audioBook.title}
              </h2>
              <p className="text-xs font-serif text-amber-200/80">
                {audioBook.nativeTitle}
              </p>

              <div className="pt-1 text-[11px] text-white/60">
                <span className="font-semibold text-white/90">Narrated by:</span> {audioBook.narrator}
              </div>

              <div className="flex items-center gap-3 pt-1 text-[11px]">
                <span className="flex items-center gap-1 font-bold text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {audioBook.rating}
                </span>
                <span className="text-white/50 font-medium">
                  {audioBook.listensCount.toLocaleString()} listens
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Bar in Header */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              {/* Play Chapter 1 */}
              <button
                onClick={() => onPlayChapter(audioBook, audioBook.chapters[0])}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-amber-500 hover:brightness-110 text-white font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-purple-600/30 cursor-pointer border border-white/20"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Play Chapter 1</span>
              </button>

              {onNavigateToBooks && (
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToBooks();
                  }}
                  className="px-3.5 py-2 bg-white/[0.08] hover:bg-white/[0.15] text-white rounded-xl font-bold flex items-center gap-1.5 transition-all text-xs border border-white/10 cursor-pointer"
                  title="Read full scripture text"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden sm:inline">Read Text</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white transition-colors cursor-pointer border border-white/10"
                title="Share Audio Book"
              >
                {copiedLink ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content: Book Description & Chapters */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 no-scrollbar">
          {/* Spiritual Takeaway Box */}
          <div className="p-3.5 glass-card bg-amber-500/10 rounded-2xl border border-amber-400/25">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Core Spiritual Essence</span>
            </div>
            <p className="text-xs text-amber-100/90 font-serif italic leading-relaxed">
              “{audioBook.spiritualTakeaway}”
            </p>
          </div>

          {/* Book Synopsis */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-1.5">
              About This Audio Journey
            </h3>
            <p className="text-xs text-white/75 leading-relaxed font-normal">
              {audioBook.description}
            </p>
          </div>

          {/* Player Preference Controls (Speed & Sleep Timer) */}
          <div className="flex items-center justify-between p-3 glass-panel rounded-2xl text-xs border border-white/10">
            <div className="flex items-center gap-2">
              <FastForward className="w-3.5 h-3.5 text-white/50" />
              <span className="text-[11px] font-bold text-white/80">Speed:</span>
              <div className="flex items-center bg-white/[0.06] rounded-xl p-0.5 border border-white/10">
                {(['1.0x', '1.25x', '1.5x'] as const).map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      playbackSpeed === spd ? 'bg-purple-600 text-white shadow-xs' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {spd}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Timer className="w-3.5 h-3.5 text-white/50" />
              <select
                value={sleepTimer || 'Off'}
                onChange={(e) => setSleepTimer(e.target.value === 'Off' ? null : e.target.value)}
                className="bg-[#1A1230] border border-white/15 text-white text-[10px] font-bold rounded-xl px-2.5 py-1 outline-hidden"
              >
                <option value="Off">Sleep Timer: Off</option>
                <option value="15m">15 Minutes</option>
                <option value="30m">30 Minutes</option>
                <option value="End">End of Chapter</option>
              </select>
            </div>
          </div>

          {/* Audio Chapters List */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/50">
                Audio Chapters ({audioBook.chapters.length})
              </h3>
              <span className="text-[11px] text-white/40 font-medium">
                Tap chapter to listen
              </span>
            </div>

            <div className="space-y-2">
              {audioBook.chapters.map((ch) => {
                const isChapterPlaying =
                  currentTrack?.id === `track-${ch.id}` && isPlaying;
                const isCurrentChapter = currentTrack?.id === `track-${ch.id}`;
                const isSaved = bookmarkedChapters.includes(ch.id);

                return (
                  <div
                    key={ch.id}
                    onClick={() => onPlayChapter(audioBook, ch)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer group flex items-start gap-3 ${
                      isCurrentChapter
                        ? 'bg-purple-600/30 border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                        : 'glass-card bg-white/[0.04] border-white/10 hover:border-white/20 hover:bg-white/[0.08]'
                    }`}
                  >
                    {/* Chapter Number / Play Icon */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                        isCurrentChapter
                          ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-md'
                          : 'bg-white/[0.08] text-white/70 group-hover:bg-white/[0.15] group-hover:text-white'
                      }`}
                    >
                      {isChapterPlaying ? (
                        <Pause className="w-4 h-4 fill-white" />
                      ) : isCurrentChapter ? (
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      ) : (
                        <span className="text-xs font-black">{ch.chapterNumber}</span>
                      )}
                    </div>

                    {/* Chapter Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4
                          className={`text-xs font-bold truncate leading-tight ${
                            isCurrentChapter ? 'text-amber-300 font-black' : 'text-white'
                          }`}
                        >
                          {ch.title}
                        </h4>
                        <span className="text-[10px] text-white/40 font-medium shrink-0">
                          {formatSeconds(ch.duration)}
                        </span>
                      </div>

                      <p className="text-[11px] text-white/60 mt-1 line-clamp-2 leading-relaxed">
                        {ch.summary}
                      </p>

                      <div className="mt-2 flex items-center justify-between text-[10px] text-white/40">
                        <span>Narrator: {ch.narrator}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(ch.id);
                          }}
                          className={`p-1 rounded-md transition-colors cursor-pointer ${
                            isSaved ? 'text-amber-400' : 'hover:text-white/70'
                          }`}
                          title="Save chapter"
                        >
                          <Bookmark
                            className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-400' : ''}`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
