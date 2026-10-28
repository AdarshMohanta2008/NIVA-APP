import React from 'react';
import { motion } from 'motion/react';
import { X, ShieldCheck, Scale, FileText } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07030F]/80 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in duration-200">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-panel bg-[#0D071E]/95 w-full max-w-md rounded-3xl shadow-[0_0_80px_rgba(168,85,247,0.3)] border border-white/20 overflow-hidden flex flex-col max-h-[85vh] text-white"
      >
        <div className="p-4 bg-white/[0.05] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
              <FileText className="w-4 h-4 text-amber-300" />
            </div>
            <h3 className="font-bold text-white text-sm">Terms & Sacred Code of Ethics</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-3.5 text-xs text-white/80 leading-relaxed no-scrollbar">
          <div className="glass-card bg-amber-500/10 p-3.5 rounded-2xl border border-amber-400/25 space-y-1.5">
            <h4 className="font-bold text-amber-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>1. Verified Clergy & Service Guarantee</span>
            </h4>
            <p className="text-white/80">
              Every priest, monk, imam, pastor, granthi, and religious scholar listed on NIVA undergoes extensive background verification, lineage verification, and credential checks.
            </p>
          </div>

          <div className="glass-card bg-white/[0.04] p-3.5 rounded-2xl border border-white/10 space-y-1.5">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-purple-400" />
              <span>2. Fair Dakshina & Transparent Pricing</span>
            </h4>
            <p className="text-white/70">
              All service fees and samagri charges are strictly fixed and transparent. Clergy are forbidden from soliciting unagreed fees or arbitrary demands during ceremonies.
            </p>
          </div>

          <div className="glass-card bg-white/[0.04] p-3.5 rounded-2xl border border-white/10 space-y-1.5">
            <h4 className="font-bold text-white">3. Cancellation & Rescheduling</h4>
            <p className="text-white/70">
              Free cancellation and full refund up to 24 hours before ceremony start time. Rescheduling to an alternate auspicious date/muhurat is always free of charge.
            </p>
          </div>

          <div className="glass-card bg-white/[0.04] p-3.5 rounded-2xl border border-white/10 space-y-1.5">
            <h4 className="font-bold text-white">4. Inter-Faith Respect</h4>
            <p className="text-white/70">
              NIVA serves all global faiths with utmost reverence and neutrality. Any discriminatory or disrespectful conduct by any user or provider results in immediate permanent deplatforming.
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-white/[0.03] border-t border-white/10 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-amber-500 hover:brightness-110 text-white font-bold text-xs rounded-xl transition-all cursor-pointer border border-white/20 shadow-md shadow-purple-600/30"
          >
            I Understand & Agree
          </button>
        </div>
      </motion.div>
    </div>
  );
};
