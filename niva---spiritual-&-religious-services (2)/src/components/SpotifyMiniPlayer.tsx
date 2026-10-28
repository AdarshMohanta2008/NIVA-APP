import React from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Heart, SkipForward } from 'lucide-react';
import { MusicTrack } from '../types';
import { useEffectsSettings } from '../context/EffectsContext';

interface SpotifyMiniPlayerProps {
  currentTrack: MusicTrack | null;
  isPlaying: boolean;
  playbackProgress: number; // 0 to 100
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onOpenFullPlayer: () => void;
  isLiked: boolean;
  onToggleLike: (trackId: string) => void;
}

export const SpotifyMiniPlayer: React.FC<SpotifyMiniPlayerProps> = ({
  currentTrack,
  isPlaying,
  playbackProgress,
  onTogglePlay,
  onNextTrack,
  onOpenFullPlayer,
  isLiked,
  onToggleLike,
}) => {
  const { effectsLevel } = useEffectsSettings();

  if (!currentTrack) return null;

  return (
    <div
      id="spotify-mini-player"
      className="shrink-0 w-full max-w-[1400px] mx-auto px-4 lg:px-8 pb-3 z-30 transition-all duration-300 pointer-events-auto"
    >
      <motion.div
        whileHover={effectsLevel === 'minimal' ? undefined : { y: -2 }}
        onClick={onOpenFullPlayer}
        className="cursor-pointer relative overflow-hidden glass-dock p-2.5 shadow-2xl flex items-center justify-between group border border-white/25"
      >
        {/* Real-time gradient playback progress bar with glowing edge */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-amber-400 to-amber-300 transition-all duration-300 ease-linear rounded-full shadow-[0_0_8px_#F59E0B]"
            style={{ width: `${Math.min(100, Math.max(0, playbackProgress))}%` }}
          />
        </div>

        {/* Left: Spinning Disc Thumbnail & Track info */}
        <div className="flex items-center gap-3 min-w-0 flex-1 pr-2 mt-0.5">
          <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-white/30 shadow-md">
            <img
              src={currentTrack.coverArt}
              alt={currentTrack.title}
              className={`w-full h-full object-cover transition-transform ${
                isPlaying && effectsLevel !== 'minimal'
                  ? 'animate-spin-slow'
                  : ''
              }`}
              style={{ animationDuration: '10s' }}
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                {/* Animated Equalizer Waveform */}
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-full bg-amber-300 animate-pulse" />
                  <span className="w-0.5 h-2 bg-purple-300 animate-pulse delay-75" />
                  <span className="w-0.5 h-3 bg-amber-400 animate-pulse delay-150" />
                </div>
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.2 rounded-full glass-pill text-amber-300 border border-amber-400/30">
                {currentTrack.religion}
              </span>
              {currentTrack.audioFrequency && (
                <span className="text-[9px] text-white/50 truncate hidden sm:inline">
                  • {currentTrack.audioFrequency.split(' ')[0]}
                </span>
              )}
            </div>
            <p className="text-xs font-bold text-white truncate group-hover:text-amber-200 transition-colors mt-0.5">
              {currentTrack.title}
            </p>
            <p className="text-[11px] text-white/50 truncate leading-tight">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div
          className="flex items-center gap-1 shrink-0 mt-0.5"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Like Button */}
          <button
            type="button"
            id="mini-player-like-btn"
            onClick={() => onToggleLike(currentTrack.id)}
            className={`w-8 h-8 rounded-full glass-pill flex items-center justify-center transition-colors cursor-pointer ${
              isLiked ? 'text-amber-400' : 'text-white/60 hover:text-white'
            }`}
            title={isLiked ? 'Remove from Saved' : 'Save to Sacred Playlist'}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-amber-400' : ''}`} />
          </button>

          {/* Play/Pause Button */}
          <button
            type="button"
            id="mini-player-play-btn"
            onClick={onTogglePlay}
            className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-amber-500 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-white" />
            ) : (
              <Play className="w-4 h-4 fill-white ml-0.5" />
            )}
          </button>

          {/* Next Track */}
          <button
            type="button"
            id="mini-player-next-btn"
            onClick={onNextTrack}
            className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            title="Next Sacred Track"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
