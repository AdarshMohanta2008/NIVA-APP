import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronUp,
  ChevronDown,
  Music,
  Send,
  X,
  Sparkles,
  Check,
} from 'lucide-react';
import { Reel, Religion } from '../../types';
import { REELS, RELIGIONS } from '../../data/mockData';

interface ReelsViewProps {
  onBookmarkReel: (reelId: string) => void;
  savedReelIds: string[];
}

export const ReelsView: React.FC<ReelsViewProps> = ({
  onBookmarkReel,
  savedReelIds,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likesMap, setLikesMap] = useState<Record<string, { liked: boolean; count: number }>>({
    'reel-1': { liked: false, count: REELS[0].likesCount },
    'reel-2': { liked: true, count: REELS[1].likesCount },
    'reel-3': { liked: false, count: REELS[2].likesCount },
    'reel-4': { liked: true, count: REELS[3].likesCount },
  });

  const [selectedReligion, setSelectedReligion] = useState<Religion | 'All'>('All');
  const [isCommentSheetOpen, setIsCommentSheetOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [shareToast, setShareToast] = useState(false);
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  const filteredReels = REELS.filter(
    (r) => selectedReligion === 'All' || r.religion === selectedReligion
  );

  const activeReels = filteredReels.length > 0 ? filteredReels : REELS;
  const currentReel = activeReels[currentIndex % activeReels.length];

  const currentLikeState = likesMap[currentReel.id] || {
    liked: currentReel.isLiked || false,
    count: currentReel.likesCount,
  };

  const handleToggleLike = () => {
    const isNowLiked = !currentLikeState.liked;
    if (isNowLiked) {
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 900);
    }
    setLikesMap((prev) => {
      const cur = prev[currentReel.id] || {
        liked: currentReel.isLiked || false,
        count: currentReel.likesCount,
      };
      return {
        ...prev,
        [currentReel.id]: {
          liked: !cur.liked,
          count: cur.liked ? cur.count - 1 : cur.count + 1,
        },
      };
    });
  };

  const handleShare = () => {
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    currentReel.comments.unshift({
      id: `c-${Date.now()}`,
      userName: 'Rohan Sharma',
      userAvatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      comment: newComment.trim(),
      timeAgo: 'Just now',
      likes: 1,
    });
    setNewComment('');
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeReels.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeReels.length) % activeReels.length);
  };

  const isSaved = savedReelIds.includes(currentReel.id);

  return (
    <div className="relative h-[calc(100vh-200px)] max-h-[860px] w-full max-w-md mx-auto flex flex-col justify-between overflow-hidden rounded-[36px] glass-panel border border-white/20 select-none shadow-2xl">
      {/* Top Religion Filter overlay in visionOS glass */}
      <div className="absolute top-3 left-0 right-0 z-20 px-4 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <button
          onClick={() => {
            setSelectedReligion('All');
            setCurrentIndex(0);
          }}
          className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all border ${
            selectedReligion === 'All'
              ? 'bg-violet-600 text-white border-violet-400 shadow-md shadow-violet-500/30'
              : 'glass text-white/80 border-white/10 hover:text-white'
          }`}
        >
          All
        </button>
        {RELIGIONS.map((rel) => (
          <button
            key={rel.id}
            onClick={() => {
              setSelectedReligion(rel.id);
              setCurrentIndex(0);
            }}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold transition-all whitespace-nowrap border ${
              selectedReligion === rel.id
                ? 'bg-violet-600 text-white border-violet-400 shadow-md shadow-violet-500/30'
                : 'glass text-white/80 border-white/10 hover:text-white'
            }`}
          >
            <span>{rel.symbol}</span>
            <span>{rel.name}</span>
          </button>
        ))}
      </div>

      {/* Main Video Screen Container */}
      <div
        className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <img
          src={currentReel.thumbnail}
          alt={currentReel.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />

        {/* VisionOS cosmic dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />

        {/* Heart Burst Particle Effect */}
        <AnimatePresence>
          {showHeartBurst && (
            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              exit={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
            >
              <div className="relative">
                <Heart className="w-24 h-24 text-rose-500 fill-rose-500 drop-shadow-[0_0_24px_rgba(244,63,94,0.8)]" />
                <Sparkles className="w-8 h-8 text-amber-300 absolute -top-2 -right-2 animate-ping" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Play/Pause indicator flash */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-none">
            <div className="w-16 h-16 rounded-full glass border border-white/20 flex items-center justify-center text-white shadow-2xl">
              <Play className="w-7 h-7 fill-white ml-1" />
            </div>
          </div>
        )}

        {/* Audio Mute button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMuted(!isMuted);
          }}
          className="absolute top-14 right-3 z-20 p-2.5 rounded-full glass border border-white/20 text-white hover:bg-white/20 transition-all shadow-lg"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Right Actions Stack: VisionOS Glass Capsules */}
        <div
          className="absolute right-3.5 bottom-16 z-20 flex flex-col items-center gap-3.5"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Like */}
          <button
            id="btn-reel-like"
            onClick={handleToggleLike}
            className="flex flex-col items-center group active:scale-90 transition-transform"
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all shadow-xl ${
                currentLikeState.liked
                  ? 'bg-rose-500/80 border-rose-400 text-white shadow-rose-500/30'
                  : 'glass border-white/20 text-white hover:bg-white/15'
              }`}
            >
              <Heart
                className={`w-5 h-5 ${
                  currentLikeState.liked ? 'fill-white' : ''
                }`}
              />
            </div>
            <span className="text-[11px] font-semibold text-white drop-shadow mt-1">
              {(currentLikeState.count / 1000).toFixed(1)}k
            </span>
          </button>

          {/* Comment */}
          <button
            id="btn-reel-comments"
            onClick={() => setIsCommentSheetOpen(true)}
            className="flex flex-col items-center group active:scale-90 transition-transform"
          >
            <div className="w-12 h-12 rounded-2xl glass border border-white/20 text-white flex items-center justify-center hover:bg-white/15 transition-all shadow-xl">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-white drop-shadow mt-1">
              {currentReel.comments.length}
            </span>
          </button>

          {/* Save / Bookmark */}
          <button
            id="btn-reel-save"
            onClick={() => onBookmarkReel(currentReel.id)}
            className="flex flex-col items-center group active:scale-90 transition-transform"
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all shadow-xl ${
                isSaved
                  ? 'bg-amber-500/80 border-amber-400 text-white shadow-amber-500/30'
                  : 'glass border-white/20 text-white hover:bg-white/15'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} />
            </div>
            <span className="text-[11px] font-semibold text-white drop-shadow mt-1">
              {isSaved ? 'Saved' : 'Save'}
            </span>
          </button>

          {/* Share */}
          <button
            id="btn-reel-share"
            onClick={handleShare}
            className="flex flex-col items-center group active:scale-90 transition-transform"
          >
            <div className="w-12 h-12 rounded-2xl glass border border-white/20 text-white flex items-center justify-center hover:bg-white/15 transition-all shadow-xl">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-white drop-shadow mt-1">
              Share
            </span>
          </button>
        </div>

        {/* Reel Details & Audio Bottom Sheet */}
        <div
          className="absolute bottom-5 left-4 right-20 z-20 text-white space-y-2 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Creator */}
          <div className="flex items-center gap-2.5">
            <img
              src={currentReel.creatorAvatar}
              alt={currentReel.creatorName}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-violet-400 shadow-md"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold leading-tight drop-shadow">
                  {currentReel.creatorName}
                </h4>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full glass border border-amber-400/30 text-amber-300">
                  {currentReel.religion}
                </span>
              </div>
              <p className="text-[10px] text-white/60 font-medium">Verified Clergy</p>
            </div>
          </div>

          {/* Caption */}
          <p className="text-xs text-white/95 leading-relaxed drop-shadow line-clamp-2">
            {currentReel.caption}
          </p>

          {/* Audio track ticker */}
          <div className="flex items-center gap-2 text-[11px] text-white/80 glass px-3 py-1 rounded-full w-fit max-w-full border border-white/10">
            <Music className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="truncate">{currentReel.audioTitle}</span>
          </div>
        </div>

        {/* Up/Down Navigation Floating Arrows */}
        <div
          className="absolute right-3.5 top-28 z-20 flex flex-col gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handlePrev}
            className="p-2 rounded-xl glass border border-white/15 text-white hover:bg-white/20 transition-all shadow-lg"
            title="Previous reel"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-xl glass border border-white/15 text-white hover:bg-white/20 transition-all shadow-lg"
            title="Next reel"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Share Toast Notification */}
      {shareToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 glass-panel border border-violet-400/40 text-white px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 shadow-2xl animate-bounce">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          Sacred wisdom link copied to clipboard!
        </div>
      )}

      {/* Slide-Up Comments Drawer in Frosted Glass */}
      {isCommentSheetOpen && (
        <div className="absolute inset-0 z-40 bg-black/70 backdrop-blur-md flex flex-col justify-end">
          <div className="glass-panel rounded-t-[36px] border-t border-white/20 max-h-[70%] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-violet-300" />
                <h3 className="text-xs font-bold text-white">
                  Reflections & Comments ({currentReel.comments.length})
                </h3>
              </div>
              <button
                onClick={() => setIsCommentSheetOpen(false)}
                className="p-1 rounded-full glass border border-white/10 text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {currentReel.comments.map((c) => (
                <div key={c.id} className="flex items-start gap-2.5">
                  <img
                    src={c.userAvatar}
                    alt={c.userName}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-white/20 shrink-0 mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white truncate">
                        {c.userName}
                      </span>
                      <span className="text-[10px] text-white/40">{c.timeAgo}</span>
                    </div>
                    <p className="text-xs text-white/80 mt-0.5 leading-relaxed">
                      {c.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Post Comment Input */}
            <form onSubmit={handleAddComment} className="p-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a respectful spiritual reflection..."
                className="flex-1 px-3.5 py-2 text-xs glass border border-white/15 rounded-2xl outline-none text-white placeholder-white/40 focus:border-violet-400"
              />
              <button
                type="submit"
                className="p-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl hover:opacity-90 transition-opacity shrink-0 shadow-lg"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
