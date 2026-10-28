import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  Heart,
  Share2,
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Repeat1,
  Volume2,
  Bell,
  Sparkles,
  BookOpen,
  ListMusic,
  Clock,
  Check,
} from 'lucide-react';
import { MusicTrack } from '../types';
import { audioEngine } from '../utils/audioEngine';
import { useEffectsSettings } from '../context/EffectsContext';

interface SpotifyNowPlayingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrack: MusicTrack | null;
  isPlaying: boolean;
  playbackSeconds: number;
  onTogglePlay: () => void;
  onPreviousTrack: () => void;
  onNextTrack: () => void;
  onSeek: (seconds: number) => void;
  isLiked: boolean;
  onToggleLike: (trackId: string) => void;
  playlistQueue: MusicTrack[];
  onSelectQueueTrack: (track: MusicTrack) => void;
}

export const SpotifyNowPlayingModal: React.FC<SpotifyNowPlayingModalProps> = ({
  isOpen,
  onClose,
  currentTrack,
  isPlaying,
  playbackSeconds,
  onTogglePlay,
  onPreviousTrack,
  onNextTrack,
  onSeek,
  isLiked,
  onToggleLike,
  playlistQueue,
  onSelectQueueTrack,
}) => {
  const [activeTab, setActiveTab] = useState<'player' | 'lyrics' | 'queue'>('player');
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('all');
  const [japaCount, setJapaCount] = useState(1);
  const [volume, setVolume] = useState(0.85);
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number | null>(null);
  const [showSleepTimerModal, setShowSleepTimerModal] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const { effectsLevel } = useEffectsSettings();

  if (!isOpen || !currentTrack) return null;

  const duration = currentTrack.duration || 300;
  const progressPercent = Math.min(100, Math.max(0, (playbackSeconds / duration) * 100));

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioEngine.setVolume(val);
  };

  const handleRingBell = () => {
    audioEngine.ringTempleBell();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  const cycleRepeatMode = () => {
    if (repeatMode === 'off') setRepeatMode('all');
    else if (repeatMode === 'all') setRepeatMode('one');
    else setRepeatMode('off');
  };

  return (
    <div
      id="spotify-now-playing-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#07030F]/80 backdrop-blur-3xl overflow-hidden"
    >
      {/* Dynamic ambient backdrop glow tinted by the track */}
      <div
        className="absolute inset-0 opacity-20 filter blur-3xl pointer-events-none scale-125"
        style={{
          backgroundImage: `url(${currentTrack.coverArt})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Main VisionOS Glass Player Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 30 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="relative z-10 w-full max-w-md h-[92vh] max-h-[720px] rounded-[36px] glass-panel-elevated text-white flex flex-col justify-between overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)] border border-white/20"
      >
        {/* Top Bar Header */}
        <div className="px-4 pt-3.5 pb-2.5 flex items-center justify-between border-b border-white/10">
          <button
            type="button"
            id="close-full-player-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            title="Minimize"
          >
            <ChevronDown className="w-5 h-5" />
          </button>

          <div className="text-center flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
              Playing Sanctuary
            </span>
            <span className="text-xs font-semibold text-white/90 truncate max-w-[200px]">
              {currentTrack.album || `${currentTrack.religion} Sacred Sounds`}
            </span>
          </div>

          <button
            type="button"
            id="share-track-btn"
            onClick={handleShare}
            className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            title="Share Chant"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {showShareToast && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-purple-600/90 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-purple-400/40">
            <Check className="w-3.5 h-3.5" /> Link copied to clipboard!
          </div>
        )}

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-center gap-1 px-4 py-1.5 border-b border-white/10 bg-white/[0.02]">
          <button
            onClick={() => setActiveTab('player')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'player'
                ? 'bg-white/20 text-white border border-white/30 shadow-sm'
                : 'text-white/50 hover:text-white'
            }`}
          >
            Player
          </button>
          <button
            onClick={() => setActiveTab('lyrics')}
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'lyrics'
                ? 'bg-white/20 text-white border border-white/30 shadow-sm'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Lyrics
          </button>
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'queue'
                ? 'bg-white/20 text-white border border-white/30 shadow-sm'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <ListMusic className="w-3.5 h-3.5" />
            Queue ({playlistQueue.length})
          </button>
        </div>

        {/* Main Tab Content */}
        <div className="flex-1 overflow-y-auto px-5 py-3 flex flex-col justify-between no-scrollbar">
          {activeTab === 'player' && (
            <div className="flex flex-col h-full justify-between">
              {/* Spinning Sacred Disc Artwork */}
              <div className="flex-1 flex items-center justify-center my-2">
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.35)] border-4 border-white/25 group">
                  <img
                    src={currentTrack.coverArt}
                    alt={currentTrack.title}
                    className={`w-full h-full object-cover ${
                      isPlaying && effectsLevel !== 'minimal' ? 'animate-spin-slow' : ''
                    }`}
                    style={{ animationDuration: '14s' }}
                  />
                  <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/40" />

                  {/* Center Spindle */}
                  <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-[#07030F] border-2 border-white/40 shadow-inner flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
                  </div>
                </div>
              </div>

              {/* Track Info & Like */}
              <div className="mt-1 mb-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full glass-pill text-amber-300 border border-amber-400/30">
                        {currentTrack.religion}
                      </span>
                      <span className="text-[10px] text-white/50">
                        {currentTrack.audioFrequency || '432 Hz Sacred Solfeggio'}
                      </span>
                    </div>
                    <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug truncate">
                      {currentTrack.title}
                    </h1>
                    <p className="text-xs font-medium text-white/60 mt-0.5 truncate">
                      {currentTrack.artist}
                    </p>
                  </div>

                  <button
                    type="button"
                    id="full-player-like-btn"
                    onClick={() => onToggleLike(currentTrack.id)}
                    className={`w-9 h-9 rounded-full glass-pill flex items-center justify-center transition-all cursor-pointer ${
                      isLiked ? 'text-amber-400 border-amber-400/40' : 'text-white/60 hover:text-white'
                    }`}
                    title={isLiked ? 'Saved' : 'Save'}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-amber-400 stroke-amber-400' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Scrubber / Progress Slider with Glowing Thumb */}
              <div className="my-2">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={playbackSeconds}
                  onChange={(e) => onSeek(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex items-center justify-between text-[11px] font-medium text-white/50 mt-1">
                  <span>{formatTime(playbackSeconds)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-between my-2 px-1">
                <button
                  type="button"
                  id="player-shuffle-btn"
                  onClick={() => setIsShuffle(!isShuffle)}
                  className={`p-2 transition-colors cursor-pointer ${
                    isShuffle ? 'text-amber-400' : 'text-white/50 hover:text-white'
                  }`}
                  title="Shuffle"
                >
                  <Shuffle className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  id="player-prev-btn"
                  onClick={onPreviousTrack}
                  className="p-2 text-white/80 hover:text-white transition-colors active:scale-95 cursor-pointer"
                  title="Previous Track"
                >
                  <SkipBack className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  id="player-main-play-btn"
                  onClick={onTogglePlay}
                  className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-amber-500 text-white flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-transform active:scale-90 cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-white" />
                  ) : (
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  id="player-next-btn"
                  onClick={onNextTrack}
                  className="p-2 text-white/80 hover:text-white transition-colors active:scale-95 cursor-pointer"
                  title="Next Track"
                >
                  <SkipForward className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  id="player-repeat-btn"
                  onClick={cycleRepeatMode}
                  className={`p-2 transition-colors cursor-pointer ${
                    repeatMode !== 'off' ? 'text-amber-400' : 'text-white/50 hover:text-white'
                  }`}
                  title={`Repeat: ${repeatMode}`}
                >
                  {repeatMode === 'one' ? (
                    <Repeat1 className="w-5 h-5" />
                  ) : (
                    <Repeat className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Sacred Toolset (Japa Bead Counter, Temple Bell chime, Sleep Timer) */}
              <div className="mt-2 pt-2 border-t border-white/10 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  id="japa-counter-btn"
                  onClick={() => setJapaCount((prev) => (prev >= 108 ? 1 : prev + 1))}
                  className="p-2 rounded-2xl glass-card text-center cursor-pointer"
                >
                  <div className="text-[10px] text-amber-300 font-bold uppercase">Japa Mala</div>
                  <span className="text-xs font-bold text-white block mt-0.5">{japaCount} / 108</span>
                  <span className="text-[9px] text-white/40">Tap count</span>
                </button>

                <button
                  type="button"
                  id="ring-temple-bell-btn"
                  onClick={handleRingBell}
                  className="p-2 rounded-2xl glass-card text-center group cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5 text-amber-300 mx-auto group-hover:animate-bounce" />
                  <span className="text-xs font-bold text-white block mt-0.5">Temple Bell</span>
                  <span className="text-[9px] text-white/40">Sacred chime</span>
                </button>

                <button
                  type="button"
                  id="sleep-timer-btn"
                  onClick={() => setShowSleepTimerModal(!showSleepTimerModal)}
                  className={`p-2 rounded-2xl glass-card text-center cursor-pointer ${
                    sleepTimerMinutes ? 'border-amber-400/40 text-amber-300' : ''
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-purple-300 mx-auto" />
                  <span className="text-xs font-bold block mt-0.5">
                    {sleepTimerMinutes ? `${sleepTimerMinutes}m` : 'Sleep'}
                  </span>
                  <span className="text-[9px] text-white/40">Auto Stop</span>
                </button>
              </div>

              {/* Volume Slider */}
              <div className="mt-2 flex items-center gap-2 px-1 text-white/50">
                <Volume2 className="w-4 h-4 text-white/50" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-purple-400"
                />
              </div>
            </div>
          )}

          {/* Tab 2: Sacred Lyrics */}
          {activeTab === 'lyrics' && (
            <div className="h-full flex flex-col space-y-3 pb-4">
              <div className="p-4 rounded-3xl glass-card border-amber-400/30">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold mb-2">
                  <BookOpen className="w-4 h-4" />
                  Original Sacred Verse
                </div>
                <p className="text-sm font-serif text-white whitespace-pre-line leading-relaxed">
                  {currentTrack.lyricsOriginal}
                </p>
              </div>

              <div className="p-4 rounded-3xl glass-card">
                <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
                  Translation & Intent
                </div>
                <p className="text-xs text-white/80 leading-relaxed font-sans">
                  {currentTrack.lyricsTranslation}
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Queue */}
          {activeTab === 'queue' && (
            <div className="h-full flex flex-col space-y-2 pb-4">
              <p className="text-xs uppercase font-bold tracking-wider text-amber-300 mb-2">
                Upcoming Sacred Queue
              </p>
              {playlistQueue.map((track, idx) => {
                const isCurrent = track.id === currentTrack.id;
                return (
                  <div
                    key={track.id}
                    onClick={() => onSelectQueueTrack(track)}
                    className={`flex items-center justify-between p-2.5 rounded-2xl cursor-pointer transition-all ${
                      isCurrent ? 'glass-panel-elevated bg-white/20 border-white/30' : 'glass-card'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs text-white/40 font-bold w-4 text-center">
                        {idx + 1}
                      </span>
                      <img
                        src={track.coverArt}
                        alt={track.title}
                        className="w-10 h-10 rounded-xl object-cover shrink-0 border border-white/20"
                      />
                      <div className="min-w-0">
                        <p
                          className={`text-xs font-bold truncate ${
                            isCurrent ? 'text-amber-300' : 'text-white'
                          }`}
                        >
                          {track.title}
                        </p>
                        <p className="text-[11px] text-white/50 truncate">{track.artist}</p>
                      </div>
                    </div>

                    <span className="text-[11px] text-white/50 shrink-0">
                      {formatTime(track.duration)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
