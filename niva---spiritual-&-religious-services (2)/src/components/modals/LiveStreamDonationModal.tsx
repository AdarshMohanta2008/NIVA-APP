import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Radio,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Users,
  Eye,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Receipt,
  Download,
  Send,
  Volume2,
  VolumeX,
  Building2,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { Religion } from '../../types';
import {
  VERIFIED_NGOS,
  LIVE_RITUAL_STREAMS,
  INITIAL_USER_DONATIONS,
  VerifiedNGO,
  LiveRitualStream,
  UserDonationRecord,
} from '../../data/ngoDonationsData';
import { audioEngine } from '../../utils/audioEngine';

interface LiveStreamDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify?: (title: string, message: string) => void;
  currentReligion?: Religion;
}

export const LiveStreamDonationModal: React.FC<LiveStreamDonationModalProps> = ({
  isOpen,
  onClose,
  onNotify,
  currentReligion = 'All',
}) => {
  const [activeTab, setActiveTab] = useState<'streams' | 'ngos' | 'my_donations'>('streams');
  const [activeStream, setActiveStream] = useState<LiveRitualStream>(LIVE_RITUAL_STREAMS[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Quick stream donation
  const [streamDonationAmount, setStreamDonationAmount] = useState<number>(501);
  const [streamDonorName, setStreamDonorName] = useState('Rohan Sharma');
  const [streamComment, setStreamComment] = useState('');
  const [streamDonationsList, setStreamDonationsList] = useState(activeStream.recentDonations);

  // Dedicated NGO modal drawer
  const [selectedNGOForDonation, setSelectedNGOForDonation] = useState<VerifiedNGO | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(1100);
  const [donorName, setDonorName] = useState('Rohan Sharma');
  const [donorEmail, setDonorEmail] = useState('rohan.sharma@niva.faith');
  const [donorPan, setDonorPan] = useState('');
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [donationRecords, setDonationRecords] = useState<UserDonationRecord[]>(INITIAL_USER_DONATIONS);

  if (!isOpen) return null;

  const handleToggleStreamAudio = () => {
    if (isPlayingAudio) {
      audioEngine.stop();
      setIsPlayingAudio(false);
    } else {
      audioEngine.play(activeStream.audioPreset || 'tanpura-om');
      setIsPlayingAudio(true);
    }
  };

  const handleSelectStream = (stream: LiveRitualStream) => {
    setActiveStream(stream);
    setStreamDonationsList(stream.recentDonations);
    if (isPlayingAudio) {
      audioEngine.stop();
      audioEngine.play(stream.audioPreset || 'tanpura-om');
    }
  };

  const handleSendStreamDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!streamDonationAmount) return;

    const newDonationEntry = {
      donorName: streamDonorName.trim() || 'Devotee',
      amount: streamDonationAmount,
      timeAgo: 'Just now',
      message: streamComment.trim() || 'Prayers for health and peace',
    };

    setStreamDonationsList((prev) => [newDonationEntry, ...prev]);

    // Also record in user donation history
    const userRec: UserDonationRecord = {
      id: `don-${Date.now()}`,
      ngoId: activeStream.associatedNgoId || 'ngo-general',
      ngoName: activeStream.shrineOrNgo,
      amount: streamDonationAmount,
      date: 'Today',
      cause: `Live Stream Seva during ${activeStream.title}`,
      donorName: streamDonorName.trim() || 'Devotee',
      donorEmail: 'rohan.sharma@niva.faith',
      taxReceiptNo: `80G-LIVE-${Math.floor(100000 + Math.random() * 900000)}`,
      taxExemptionEligible: true,
      paymentMode: 'UPI',
      status: 'Completed',
    };

    setDonationRecords((prev) => [userRec, ...prev]);
    setStreamComment('');

    if (onNotify) {
      onNotify(
        'Seva Offering Received',
        `₹${streamDonationAmount} offered live during ${activeStream.title}. Blessed digital receipt generated.`
      );
    }
  };

  const handleCompleteNgoDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNGOForDonation) return;

    const newRec: UserDonationRecord = {
      id: `don-${Date.now()}`,
      ngoId: selectedNGOForDonation.id,
      ngoName: selectedNGOForDonation.name,
      amount: donationAmount,
      date: 'Today',
      cause: selectedNGOForDonation.tagline,
      donorName: donorName.trim() || 'Anonymous Devotee',
      donorEmail: donorEmail.trim() || 'devotee@niva.faith',
      taxReceiptNo: `80G-${selectedNGOForDonation.id.slice(4).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
      taxExemptionEligible: selectedNGOForDonation.taxExempt80G,
      paymentMode: 'UPI',
      status: 'Completed',
    };

    setDonationRecords((prev) => [newRec, ...prev]);
    setDonationSuccess(true);

    if (onNotify) {
      onNotify(
        'Donation Successful (80G Tax Exemption)',
        `Thank you for contributing ₹${donationAmount} to ${selectedNGOForDonation.name}. Receipt generated.`
      );
    }

    setTimeout(() => {
      setDonationSuccess(false);
      setSelectedNGOForDonation(null);
      setActiveTab('my_donations');
    }, 1200);
  };

  const categories = [
    'All',
    'Annadanam & Langar',
    'Gau Seva & Animal Compassion',
    'Temple & Shrine Preservation',
    'Elder Care & Medical Relief',
  ];

  const filteredNGOs = VERIFIED_NGOS.filter((ngo) => {
    if (selectedCategory === 'All') return true;
    return ngo.category === selectedCategory;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-2xl flex items-center justify-center p-2.5 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="glass-panel-elevated w-full max-w-2xl rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] border border-white/25 overflow-hidden flex flex-col max-h-[92vh] text-white"
      >
        {/* Modal Header */}
        <div className="p-3.5 sm:p-4 bg-white/[0.04] border-b border-white/15 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.4)] border border-white/20">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-black text-white text-sm sm:text-base leading-tight">
                  Live Ritual Streams & NGO Donations
                </h2>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Verified 80G
                </span>
              </div>
              <p className="text-[11px] text-white/60 font-medium">
                Live Shrine Broadcasts & Direct Giving to Authentic Seva Foundations
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (isPlayingAudio) audioEngine.stop();
              onClose();
            }}
            className="p-1.5 rounded-full glass-pill bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Internal Navigation */}
        <div className="flex items-center border-b border-white/10 bg-white/[0.02] px-3 py-1.5 gap-2 text-xs">
          <button
            onClick={() => {
              setActiveTab('streams');
              setSelectedNGOForDonation(null);
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'streams'
                ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-md border border-white/30'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>Live Streams ({LIVE_RITUAL_STREAMS.length})</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('ngos');
              setSelectedNGOForDonation(null);
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'ngos'
                ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-md border border-white/30'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Verified NGOs ({VERIFIED_NGOS.length})</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('my_donations');
              setSelectedNGOForDonation(null);
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'my_donations'
                ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-md border border-white/30'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>My Seva & Receipts ({donationRecords.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-3.5 sm:p-5">
          {/* TAB 1: LIVE RITUAL BROADCASTS */}
          {activeTab === 'streams' && (
            <div className="space-y-4">
              {/* Stream Selector Bar */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
                {LIVE_RITUAL_STREAMS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelectStream(s)}
                    className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      activeStream.id === s.id
                        ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-md border border-white/30'
                        : 'bg-white/10 border border-white/15 text-white/70 hover:border-white/30'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                    <span>{s.title.split(' ')[0]} {s.title.split(' ')[1]}</span>
                  </button>
                ))}
              </div>

              {/* Main Live Broadcast Screen */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-black aspect-video flex items-center justify-center">
                <img
                  src={activeStream.thumbnail}
                  alt={activeStream.title}
                  className="w-full h-full object-cover opacity-85"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/60 pointer-events-none" />

                {/* Top Overlay Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    LIVE BROADCAST
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-[#07030F]/80 backdrop-blur-md text-white/90 text-[10px] font-medium flex items-center gap-1 border border-white/15">
                    <Eye className="w-3 h-3 text-emerald-400" />
                    <span>{activeStream.viewersCount.toLocaleString()} Watching</span>
                  </div>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={handleToggleStreamAudio}
                    className="p-2 rounded-full bg-[#07030F]/80 hover:bg-[#07030F] text-white text-xs backdrop-blur-md transition-all border border-white/20 cursor-pointer"
                    title={isPlayingAudio ? 'Mute Chants' : 'Listen to Live Ritual Audio Drone'}
                  >
                    {isPlayingAudio ? (
                      <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-white/60" />
                    )}
                  </button>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 border border-amber-400/30 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {activeStream.streamType}
                    </span>
                    <span className="text-xs text-white/70 font-medium">{activeStream.location}</span>
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                    {activeStream.title}
                  </h3>
                  <p className="text-[11px] text-white/80 leading-tight truncate">
                    Current Step: {activeStream.currentRitualStep}
                  </p>
                </div>
              </div>

              {/* Direct Seva & Live Offering Deck */}
              <div className="glass-card p-4 rounded-3xl border border-white/15 space-y-3 shadow-lg">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div>
                    <h4 className="font-extrabold text-white text-xs sm:text-sm">
                      Direct Seva Offering to Shrine & Trust
                    </h4>
                    <p className="text-[11px] text-white/60">
                      Offer flower, langar meal, or deepam directly during this ongoing live ritual.
                    </p>
                  </div>
                  <div className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-lg border border-emerald-400/30">
                    Instant Digital Receipt
                  </div>
                </div>

                <form onSubmit={handleSendStreamDonation} className="space-y-3">
                  {/* Preset amounts */}
                  <div className="flex items-center gap-2">
                    {[101, 251, 501, 1100, 2100].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setStreamDonationAmount(amt)}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          streamDonationAmount === amt
                            ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white border-amber-400/60 shadow-md'
                            : 'bg-white/[0.06] border-white/15 text-white/80 hover:border-white/30'
                        }`}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <input
                      type="text"
                      value={streamDonorName}
                      onChange={(e) => setStreamDonorName(e.target.value)}
                      placeholder="Your Name (for live donor roll)"
                      className="px-3 py-2 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:border-amber-400 outline-none"
                    />
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={streamComment}
                        onChange={(e) => setStreamComment(e.target.value)}
                        placeholder="Prayer / wish message (optional)"
                        className="flex-1 px-3 py-2 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:border-amber-400 outline-none"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold rounded-xl text-xs flex items-center gap-1 transition-all shadow-md cursor-pointer border border-white/20"
                      >
                        <HeartHandshake className="w-3.5 h-3.5" />
                        <span>Offer</span>
                      </button>
                    </div>
                  </div>
                </form>

                {/* Recent Live Donors Ticker */}
                <div className="pt-2 border-t border-white/10">
                  <div className="text-[11px] font-bold text-white/70 mb-1.5 flex items-center justify-between">
                    <span>Recent Live Devotee Offerings:</span>
                    <span className="text-[10px] text-white/40">Updating live</span>
                  </div>
                  <div className="max-h-24 overflow-y-auto space-y-1.5 pr-1">
                    {streamDonationsList.map((d, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-[11px] bg-white/[0.04] p-2 rounded-xl border border-white/5"
                      >
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                          <span className="font-bold text-white truncate">{d.donorName}</span>
                          {d.message && (
                            <span className="text-white/60 italic truncate max-w-[180px]">
                              "{d.message}"
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <span className="font-black text-emerald-300">₹{d.amount}</span>
                          <span className="text-[10px] text-white/40">{d.timeAgo}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VERIFIED NGOS & TRUSTS DIRECT DIRECTORY */}
          {activeTab === 'ngos' && !selectedNGOForDonation && (
            <div className="space-y-4">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs pb-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-bold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-md border border-white/30'
                        : 'bg-white/10 border border-white/15 text-white/70 hover:border-white/30'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* NGO Cards List */}
              <div className="grid grid-cols-1 gap-3.5">
                {filteredNGOs.map((ngo) => {
                  const percent = Math.min(100, Math.round((ngo.raisedAmount / ngo.targetAmount) * 100));
                  return (
                    <article
                      key={ngo.id}
                      className="glass-card rounded-3xl border border-white/15 p-4 shadow-lg hover:border-emerald-400/50 transition-all flex flex-col sm:flex-row gap-4 justify-between"
                    >
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-white/10 text-white/80 border border-white/10">
                            {ngo.category}
                          </span>
                          {ngo.taxExempt80G && (
                            <span className="text-[10px] font-extrabold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-md border border-emerald-400/30 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-400" />
                              80G Tax Exemption
                            </span>
                          )}
                          <span className="text-[10px] font-bold text-white/40">
                            Score: {ngo.transparencyScore}%
                          </span>
                        </div>

                        <div>
                          <h4 className="font-extrabold text-white text-sm sm:text-base leading-snug">
                            {ngo.name}
                          </h4>
                          <p className="text-xs text-white/70 mt-1 leading-relaxed">
                            {ngo.description}
                          </p>
                        </div>

                        <div className="text-[11px] font-bold text-amber-200 bg-amber-500/10 p-2 rounded-xl border border-amber-400/20">
                          Impact: {ngo.impactMetric}
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] font-bold text-white/80">
                            <span>₹{ngo.raisedAmount.toLocaleString()} Raised</span>
                            <span className="text-white/50">Goal: ₹{ngo.targetAmount.toLocaleString()}</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="sm:w-44 flex flex-col justify-between pt-2 sm:pt-0 sm:border-l sm:border-white/10 sm:pl-4 shrink-0">
                        <div className="text-[11px] text-white/50">
                          <span className="block font-bold text-white">
                            {ngo.donorsCount.toLocaleString()} Donors
                          </span>
                          <span className="block text-[10px] text-white/40">Reg: {ngo.registrationNumber}</span>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedNGOForDonation(ngo);
                            setDonationAmount(ngo.presetAmounts[1] || 1100);
                          }}
                          className="w-full mt-3 py-2.5 px-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer border border-white/20"
                        >
                          <HeartHandshake className="w-4 h-4 text-emerald-300" />
                          <span>Donate Directly</span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {/* DEDICATED NGO DONATION WIZARD */}
          {activeTab === 'ngos' && selectedNGOForDonation && (
            <div className="space-y-4">
              <button
                onClick={() => setSelectedNGOForDonation(null)}
                className="text-xs font-bold text-white/70 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                ← Back to NGO Directory
              </button>

              <div className="p-3.5 glass-card rounded-2xl border border-emerald-400/30 bg-emerald-500/10">
                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest">
                  Direct Donation Portal
                </span>
                <h3 className="font-extrabold text-white text-base">
                  {selectedNGOForDonation.name}
                </h3>
                <div className="text-xs text-white/70 mt-1">
                  100% of this contribution goes to {selectedNGOForDonation.category} ({selectedNGOForDonation.bankOrTrustName}).
                </div>
              </div>

              <form onSubmit={handleCompleteNgoDonation} className="glass-card p-4 rounded-3xl border border-white/15 space-y-4">
                {/* Amount presets */}
                <div>
                  <label className="block text-xs font-extrabold text-white mb-1.5">
                    Select Contribution Amount (INR ₹)
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {selectedNGOForDonation.presetAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setDonationAmount(amt)}
                        className={`py-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                          donationAmount === amt
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white border-emerald-400/60 shadow-md'
                            : 'bg-white/[0.06] border-white/15 text-white/80 hover:border-white/30'
                        }`}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Donor Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-white/80 block mb-1">Donor Name *</label>
                    <input
                      type="text"
                      required
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="e.g. Rohan Sharma"
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:border-emerald-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-white/80 block mb-1">Email for 80G Receipt *</label>
                    <input
                      type="email"
                      required
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="e.g. rohan@niva.faith"
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:border-emerald-400 outline-none"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="font-bold text-white/80 block mb-1 flex items-center justify-between">
                    <span>PAN Number (Optional, for 50% Tax Exemption certificate)</span>
                    <span className="text-[10px] text-emerald-300 font-bold">Section 80G Compliant</span>
                  </label>
                  <input
                    type="text"
                    value={donorPan}
                    onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                    placeholder="e.g. ABCDE1234F"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-white/40 uppercase focus:border-emerald-400 outline-none"
                  />
                </div>

                {/* Payment summary */}
                <div className="p-3 bg-white/[0.04] rounded-2xl text-xs space-y-1 border border-white/10">
                  <div className="flex justify-between font-bold text-white">
                    <span>Direct NGO Donation:</span>
                    <span>₹{donationAmount}</span>
                  </div>
                  <div className="flex justify-between text-white/60 text-[11px]">
                    <span>Platform Fee / Platform Cut:</span>
                    <span className="text-emerald-300 font-bold">₹0 (100% Direct Giving)</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={donationSuccess}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-sm transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer border border-white/20"
                >
                  {donationSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      <span>Donation Confirmed! Generating 80G Receipt...</span>
                    </>
                  ) : (
                    <>
                      <HeartHandshake className="w-4 h-4 text-emerald-300" />
                      <span>Confirm & Donate ₹{donationAmount} via UPI / Card</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: MY SEVA & TAX RECEIPTS */}
          {activeTab === 'my_donations' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span className="font-bold text-white">Your Verified Contributions & 80G Tax Certificates</span>
                <span>{donationRecords.length} Contributions</span>
              </div>

              {donationRecords.length === 0 ? (
                <div className="p-8 text-center glass-card rounded-3xl border border-white/15 space-y-2">
                  <HeartHandshake className="w-8 h-8 text-white/30 mx-auto" />
                  <p className="text-xs text-white/60 font-medium">No donations recorded yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {donationRecords.map((don) => (
                    <div
                      key={don.id}
                      className="glass-card p-4 rounded-3xl border border-white/15 space-y-2.5 shadow-md"
                    >
                      <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-emerald-300">
                            Receipt: {don.taxReceiptNo}
                          </span>
                          <h4 className="font-extrabold text-white text-sm">
                            {don.ngoName}
                          </h4>
                          <span className="text-[11px] text-white/60 font-medium">
                            {don.cause}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-black text-emerald-300">
                            ₹{don.amount}
                          </span>
                          <span className="block text-[10px] text-white/40">{don.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <div className="text-[11px] text-white/70">
                          Donor: <span className="font-semibold text-white">{don.donorName}</span>
                        </div>

                        <button
                          onClick={() => {
                            if (onNotify) {
                              onNotify('Receipt Downloaded', `Certificate ${don.taxReceiptNo} saved to device.`);
                            }
                          }}
                          className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-[11px] flex items-center gap-1 transition-all border border-white/15 cursor-pointer"
                        >
                          <Download className="w-3 h-3 text-white/70" />
                          <span>80G Receipt PDF</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
