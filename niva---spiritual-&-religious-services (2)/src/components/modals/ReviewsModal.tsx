import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Star, Heart, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({ isOpen, onClose }) => {
  const [reviewsList, setReviewsList] = useState([
    {
      id: 'rev-1',
      name: 'Sunita & Deepak Kapoor',
      ceremony: 'Griha Pravesh Ceremony',
      priest: 'Pandit Rameshwar Shastri',
      rating: 5,
      date: '2 days ago',
      comment:
        'Pandit ji arrived right on time with pure organic hawan samagri. The chanting brought tears of joy and palpable peaceful vibrations into our new home.',
    },
    {
      id: 'rev-2',
      name: 'Dr. Tariq & Farida Mansoor',
      ceremony: 'Nikah Solemnization',
      priest: 'Qazi Mohammad Tariq',
      rating: 5,
      date: '1 week ago',
      comment:
        'The solemnization was graceful and dignified. Qazi sahab explained the spiritual responsibilities of marriage with such eloquence. Truly grateful to NIVA.',
    },
    {
      id: 'rev-3',
      name: 'David & Sarah Jenkins',
      ceremony: 'Home Dedication Blessing',
      priest: 'Rev. David Thompson',
      rating: 5,
      date: '2 weeks ago',
      comment:
        'Pastor David brought so much warmth into our family blessing. The customized prayer booklet was a cherished keepsake.',
    },
  ]);

  const [newReviewText, setNewReviewText] = useState('');
  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;

    setReviewsList([
      {
        id: `rev-${Date.now()}`,
        name: newName.trim() || 'Spiritual Devotee',
        ceremony: 'Sacred Ceremony Blessing',
        priest: 'Verified Clergy',
        rating: newRating,
        date: 'Just now',
        comment: newReviewText,
      },
      ...reviewsList,
    ]);
    setNewReviewText('');
    setNewName('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07030F]/80 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-panel bg-[#0D071E]/95 w-full max-w-md rounded-3xl shadow-[0_0_80px_rgba(168,85,247,0.3)] border border-white/20 overflow-hidden flex flex-col max-h-[88vh] text-white"
      >
        {/* Header */}
        <div className="p-4 bg-white/[0.05] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Community Reviews & Blessings</h3>
              <p className="text-[10px] text-white/50">4.96 ★ based on 2,400+ ceremonies</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Write Review Card */}
          <form onSubmit={handleSubmit} className="glass-card bg-white/[0.04] p-4 rounded-2xl border border-white/12 shadow-lg space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Share Your Ceremony Experience</span>
            </h4>

            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-white/60 mr-1 font-medium">Your Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewRating(star)}
                  className="p-0.5 text-amber-400 cursor-pointer"
                >
                  <Star className={`w-4 h-4 ${star <= newRating ? 'fill-amber-400' : 'text-white/20'}`} />
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Your Name (e.g. Anjali Gupta)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white/[0.06] border border-white/15 rounded-xl outline-none focus:border-purple-400 text-white placeholder-white/40"
            />

            <textarea
              rows={2}
              placeholder="How was your ceremony, the priest's conduct, and samagri quality?"
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white/[0.06] border border-white/15 rounded-xl outline-none focus:border-purple-400 text-white placeholder-white/40 resize-none"
            />

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 hover:brightness-110 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer border border-white/20"
            >
              Post Blessing & Review
            </button>

            {submitted && (
              <p className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Thank you! Your heartfelt review has been shared.
              </p>
            )}
          </form>

          {/* List of reviews */}
          <div className="space-y-3">
            {reviewsList.map((rev) => (
              <div
                key={rev.id}
                className="p-3.5 glass-card bg-white/[0.04] rounded-2xl border border-white/10 shadow-md space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{rev.name}</span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <div className="text-[10px] text-amber-300 font-medium">
                  {rev.ceremony} • Officiated by {rev.priest}
                </div>

                <p className="text-xs text-white/80 leading-relaxed pt-1">
                  "{rev.comment}"
                </p>

                <div className="text-[10px] text-white/40 pt-1">
                  Verified Booking • {rev.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
