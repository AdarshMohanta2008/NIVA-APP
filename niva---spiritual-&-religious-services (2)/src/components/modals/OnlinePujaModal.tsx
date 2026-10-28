import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Flame,
  Bell,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle2,
  Package,
  Video,
  Play,
  Share2,
  ShieldCheck,
  ChevronRight,
  Heart,
  Droplets,
  Flower2,
  Users,
  Clock,
  Send,
  Eye,
  ArrowLeft,
} from 'lucide-react';
import { OnlinePujaItem, OnlinePujaBooking, AppLanguage } from '../../types';
import { ONLINE_PUJAS, INITIAL_ONLINE_PUJA_BOOKINGS } from '../../data/onlinePujaData';
import { audioEngine } from '../../utils/audioEngine';
import { getTranslation } from '../../utils/translations';

interface OnlinePujaModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage?: AppLanguage;
  onNotify?: (title: string, message: string) => void;
}

export const OnlinePujaModal: React.FC<OnlinePujaModalProps> = ({
  isOpen,
  onClose,
  currentLanguage = 'en',
  onNotify,
}) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'virtual_room' | 'my_bookings'>('catalog');
  const [selectedPuja, setSelectedPuja] = useState<OnlinePujaItem | null>(null);
  const [isBookingStep, setIsBookingStep] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string>('pkg-basic');
  const [myBookings, setMyBookings] = useState<OnlinePujaBooking[]>(INITIAL_ONLINE_PUJA_BOOKINGS);

  // Booking Form State
  const [devoteeName, setDevoteeName] = useState('Rohan Sharma');
  const [gotra, setGotra] = useState('Kashyap');
  const [familyMembers, setFamilyMembers] = useState('Rohan Sharma, Pooja Sharma, Aarav Sharma');
  const [sankalpWish, setSankalpWish] = useState('Good health, family prosperity, and spiritual peace');
  const [prasadAddress, setPrasadAddress] = useState('Flat 402, Shivam Heights, Bandra West, Mumbai 400050');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Virtual Aarti Room State
  const [isAartiWaving, setIsAartiWaving] = useState(false);
  const [flowerShowerActive, setFlowerShowerActive] = useState(false);
  const [holyWaterActive, setHolyWaterActive] = useState(false);
  const [liveChantCount, setLiveChantCount] = useState(3840);
  const [userChanted, setUserChanted] = useState(false);
  const [activeVirtualShrine, setActiveVirtualShrine] = useState<OnlinePujaItem>(ONLINE_PUJAS[0]);

  if (!isOpen) return null;

  const handleSelectPujaForBooking = (puja: OnlinePujaItem) => {
    setSelectedPuja(puja);
    setSelectedPackageId(puja.packages[0]?.id || 'pkg-basic');
    setIsBookingStep(true);
  };

  const handleRingBell = () => {
    audioEngine.ringTempleBell();
  };

  const handleWaveAarti = () => {
    setIsAartiWaving((prev) => !prev);
    if (!isAartiWaving) {
      audioEngine.ringTempleBell();
    }
  };

  const handleShowerFlowers = () => {
    setFlowerShowerActive(true);
    setTimeout(() => setFlowerShowerActive(false), 3000);
  };

  const handleOfferWater = () => {
    setHolyWaterActive(true);
    setTimeout(() => setHolyWaterActive(false), 2500);
  };

  const handleChantMantra = () => {
    setLiveChantCount((prev) => prev + 1);
    setUserChanted(true);
    audioEngine.ringTempleBell();
    setTimeout(() => setUserChanted(false), 2000);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPuja) return;

    const chosenPkg = selectedPuja.packages.find((p) => p.id === selectedPackageId) || selectedPuja.packages[0];

    const newBooking: OnlinePujaBooking = {
      id: `op-${Date.now()}`,
      pujaId: selectedPuja.id,
      pujaTitle: selectedPuja.title,
      templeOrShrine: selectedPuja.templeOrShrine,
      deityOrTheme: selectedPuja.deityOrTheme,
      devoteeName: devoteeName.trim() || 'Devotee',
      gotra: gotra.trim() || 'Kashyap',
      familyMembers: familyMembers.split(',').map((s) => s.trim()).filter(Boolean),
      sankalpWish: sankalpWish.trim() || 'Health and auspiciousness for all family members',
      date: selectedPuja.upcomingDate,
      timeSlot: 'Morning 7:30 AM – 9:00 AM (Auspicious Muhurat)',
      packageType: chosenPkg.name,
      pricePaid: chosenPkg.price,
      status: 'Confirmed',
      videoStreamUrl: `https://niva.faith/live/${selectedPuja.id}`,
      prasadTrackingNumber: `INDIA-POST-${Math.floor(10000000 + Math.random() * 90000000)}IN`,
      createdAt: 'Just now',
    };

    setMyBookings((prev) => [newBooking, ...prev]);
    setBookingSuccess(true);

    if (onNotify) {
      onNotify(
        'Online Puja Booked Successfully',
        `Personalized Sankalp for ${selectedPuja.title} confirmed. Certified Prasad will be couriered to your address.`
      );
    }

    setTimeout(() => {
      setBookingSuccess(false);
      setIsBookingStep(false);
      setActiveTab('my_bookings');
    }, 1200);
  };

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
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-amber-500 text-white flex items-center justify-center shadow-[0_0_12px_rgba(168,85,247,0.4)] border border-white/20">
              <Flame className="w-4 h-4 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-black text-white text-sm sm:text-base leading-tight">
                  {getTranslation(currentLanguage, 'online_puja_title')}
                </h2>
                <span className="text-[9px] bg-red-500/20 text-red-300 border border-red-400/30 font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                  Live
                </span>
              </div>
              <p className="text-[11px] text-white/60 font-medium">
                Remote Sankalp at Holy Shrines & Doorstep Blessed Prasad
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full glass-pill bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs inside Modal */}
        <div className="flex items-center border-b border-white/10 bg-white/[0.02] px-3 py-1.5 gap-2 text-xs">
          <button
            onClick={() => {
              setActiveTab('catalog');
              setIsBookingStep(false);
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === 'catalog'
                ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-md border border-white/30'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Browse E-Pujas
          </button>
          <button
            onClick={() => setActiveTab('virtual_room')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'virtual_room'
                ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-md border border-white/30'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Virtual Aarti & Darshan</span>
          </button>
          <button
            onClick={() => setActiveTab('my_bookings')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'my_bookings'
                ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-md border border-white/30'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>My E-Pujas ({myBookings.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto flex-1 p-3.5 sm:p-5">
          {/* TAB 1: CATALOG OR BOOKING FORM */}
          {activeTab === 'catalog' && !isBookingStep && (
            <div className="space-y-4">
              <div className="p-4 rounded-3xl bg-gradient-to-r from-purple-900/40 via-amber-950/40 to-[#07030F] border border-amber-400/30 text-white flex items-center justify-between shadow-xl">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300">
                    Sacred Pilgrimage from Home
                  </span>
                  <h3 className="font-extrabold text-sm sm:text-base mt-0.5 text-white">
                    Participate with Individual Gotra & Family Sankalp
                  </h3>
                  <p className="text-[11px] text-white/70 mt-1 max-w-md">
                    Certified Vedic Purohits chant your names at the sanctum. Receive genuine consecrated Prasad delivered to your home by courier.
                  </p>
                </div>
                <div className="hidden sm:flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 border border-white/20 text-center">
                  <Package className="w-5 h-5 text-amber-300" />
                  <span className="text-[10px] font-bold mt-1 text-white">Prasad Guaranteed</span>
                </div>
              </div>

              {/* Pujas List */}
              <div className="grid grid-cols-1 gap-4">
                {ONLINE_PUJAS.map((puja) => (
                  <article
                    key={puja.id}
                    className="glass-card rounded-3xl border border-white/15 overflow-hidden shadow-lg hover:border-amber-400/60 transition-all flex flex-col sm:flex-row group"
                  >
                    <div className="sm:w-44 h-36 sm:h-auto relative shrink-0">
                      <img
                        src={puja.image}
                        alt={puja.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {puja.isLiveNow && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-red-600/90 text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                          Live Stream
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-[#07030F]/80 backdrop-blur-md text-white text-[10px] font-bold border border-white/15">
                        {puja.religion}
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-white/60 font-medium">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          <span>{puja.templeOrShrine}</span>
                        </div>
                        <h4 className="font-extrabold text-white text-sm sm:text-base mt-0.5 leading-snug">
                          {puja.title}
                        </h4>
                        <p className="text-xs text-white/70 line-clamp-2 mt-1 leading-relaxed">
                          {puja.shortDesc}
                        </p>
                      </div>

                      {/* Benefits & Date */}
                      <div className="bg-white/[0.04] p-2.5 rounded-xl border border-white/10 text-[11px] space-y-1">
                        <div className="font-bold text-amber-300 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-400" />
                          <span>Next Auspicious Date: {puja.upcomingDate}</span>
                        </div>
                        <div className="text-white/70">
                          {puja.benefits[0]}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="flex items-center justify-between pt-1 border-t border-white/10">
                        <div>
                          <div className="text-[10px] text-white/50 uppercase font-semibold">
                            Sankalp Starting From
                          </div>
                          <div className="text-base font-black text-amber-300">
                            ₹{puja.startingPrice}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setActiveVirtualShrine(puja);
                              setActiveTab('virtual_room');
                            }}
                            className="px-3 py-2 rounded-xl border border-white/20 hover:border-amber-400/50 bg-white/10 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                            title="Open Virtual Aarti for this temple"
                          >
                            <Flame className="w-3.5 h-3.5 text-amber-400" />
                            <span>Darshan</span>
                          </button>

                          <button
                            onClick={() => handleSelectPujaForBooking(puja)}
                            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1 cursor-pointer border border-white/20"
                          >
                            <span>Book E-Puja</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* BOOKING STEP WIZARD */}
          {activeTab === 'catalog' && isBookingStep && selectedPuja && (
            <div className="space-y-5">
              <button
                onClick={() => setIsBookingStep(false)}
                className="text-xs font-bold text-white/70 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Online Pujas</span>
              </button>

              <div className="p-3.5 glass-card rounded-2xl border border-amber-400/30 bg-amber-500/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-300">Selected Puja</span>
                  <h3 className="font-extrabold text-white text-sm sm:text-base">
                    {selectedPuja.title}
                  </h3>
                  <div className="text-xs text-white/70 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{selectedPuja.templeOrShrine}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-white/50 uppercase">Priest in Charge</div>
                  <div className="text-xs font-bold text-amber-300">{selectedPuja.leadPriest.name}</div>
                </div>
              </div>

              {/* Package Tier Selection */}
              <div>
                <label className="block text-xs font-extrabold text-white mb-2">
                  Select Sankalp & Puja Package
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {selectedPuja.packages.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-gradient-to-r from-purple-600/30 to-amber-500/30 border-amber-400/60 ring-2 ring-amber-400/30 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                            : 'bg-white/[0.05] border-white/10 hover:border-white/25 hover:bg-white/[0.08]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-xs text-white">{pkg.name}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />}
                          </div>
                          <div className={`text-sm font-black mt-1 ${isSelected ? 'text-amber-300' : 'text-amber-200'}`}>
                            ₹{pkg.price}
                          </div>
                          <p className={`text-[11px] mt-1 leading-snug ${isSelected ? 'text-white/80' : 'text-white/60'}`}>
                            {pkg.description}
                          </p>
                        </div>
                        <ul className="mt-2 space-y-1 text-[10px] border-t border-white/10 pt-2 text-white/70">
                          {pkg.features.map((feat, i) => (
                            <li key={i} className="flex items-center gap-1 truncate">
                              <span className="text-emerald-400">✓</span>
                              <span className="truncate">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Devotee Sankalp Form */}
              <form onSubmit={handleSubmitBooking} className="space-y-3.5 glass-card p-4 rounded-3xl border border-white/15">
                <div className="text-xs font-extrabold text-white border-b border-white/10 pb-2 flex items-center justify-between">
                  <span>Enter Sankalp Details for Sacred Recital</span>
                  <span className="text-[10px] text-amber-300 font-semibold">Chanted before Sanctum</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-white/80 block mb-1">
                      Primary Devotee Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={devoteeName}
                      onChange={(e) => setDevoteeName(e.target.value)}
                      placeholder="e.g. Rohan Sharma"
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-white/80 block mb-1">
                      Gotra (Lineage / Tradition) *
                    </label>
                    <input
                      type="text"
                      required
                      value={gotra}
                      onChange={(e) => setGotra(e.target.value)}
                      placeholder="e.g. Kashyap, Vatsa, or 'Shiva Gotra'"
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:border-amber-400 outline-none"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="font-bold text-white/80 block mb-1">
                    Family Members to Include in Sankalp (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={familyMembers}
                    onChange={(e) => setFamilyMembers(e.target.value)}
                    placeholder="e.g. Rohan Sharma, Pooja Sharma, Aarav Sharma"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:border-amber-400 outline-none"
                  />
                </div>

                <div className="text-xs">
                  <label className="font-bold text-white/80 block mb-1">
                    Sankalp Wish / Manoratha (Prayer Intention)
                  </label>
                  <textarea
                    rows={2}
                    value={sankalpWish}
                    onChange={(e) => setSankalpWish(e.target.value)}
                    placeholder="State your prayer request e.g. peace, health recovery, overcoming obstacles, wedding blessings..."
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:border-amber-400 outline-none"
                  />
                </div>

                <div className="text-xs">
                  <label className="font-bold text-white/80 block mb-1 flex items-center justify-between">
                    <span>Doorstep Address for Consecrated Prasad Dispatch</span>
                    <span className="text-[10px] text-emerald-300 font-bold">Includes Tracking Number</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={prasadAddress}
                    onChange={(e) => setPrasadAddress(e.target.value)}
                    placeholder="Full residential address with PIN code for courier delivery"
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:border-amber-400 outline-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={bookingSuccess}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-extrabold text-sm transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer border border-white/20"
                  >
                    {bookingSuccess ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                        <span>Sankalp Confirmed! Preparing Booking...</span>
                      </>
                    ) : (
                      <>
                        <Flame className="w-4 h-4 text-amber-300" />
                        <span>
                          Confirm Sankalp & Book Puja (₹
                          {selectedPuja.packages.find((p) => p.id === selectedPackageId)?.price || selectedPuja.startingPrice})
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: VIRTUAL AARTI & LIVE DARSHAN ROOM */}
          {activeTab === 'virtual_room' && (
            <div className="space-y-4">
              {/* Virtual Shrine Selector */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
                {ONLINE_PUJAS.map((shrine) => (
                  <button
                    key={shrine.id}
                    onClick={() => setActiveVirtualShrine(shrine)}
                    className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-bold transition-all cursor-pointer ${
                      activeVirtualShrine.id === shrine.id
                        ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-md border border-white/30'
                        : 'bg-white/10 border border-white/15 text-white/70 hover:border-white/30'
                    }`}
                  >
                    {shrine.templeOrShrine.split(',')[0]}
                  </button>
                ))}
              </div>

              {/* Shrine Canvas Feed */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-[#07030F] aspect-video flex items-center justify-center">
                <img
                  src={activeVirtualShrine.bannerImage || activeVirtualShrine.image}
                  alt={activeVirtualShrine.title}
                  className="w-full h-full object-cover opacity-80"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60 pointer-events-none" />

                {/* Live indicators */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    LIVE DARSHAN
                  </div>
                  <div className="px-2 py-0.5 rounded-full bg-[#07030F]/80 backdrop-blur-md text-white/90 text-[10px] font-medium flex items-center gap-1 border border-white/15">
                    <Eye className="w-3 h-3 text-amber-400" />
                    <span>{liveChantCount.toLocaleString()} chanting live</span>
                  </div>
                </div>

                {/* Shrine Title */}
                <div className="absolute top-3 right-3 text-right">
                  <div className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">
                    {activeVirtualShrine.deityOrTheme}
                  </div>
                  <div className="text-xs font-extrabold text-white">
                    {activeVirtualShrine.templeOrShrine}
                  </div>
                </div>

                {/* Interactive Animated Aarti Diya in center */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {isAartiWaving && (
                    <div className="animate-spin-slow flex flex-col items-center">
                      <div className="w-28 h-28 rounded-full border-4 border-amber-400/80 border-dashed animate-pulse flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.8)]">
                        <Flame className="w-14 h-14 text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,1)] animate-bounce" />
                      </div>
                      <span className="text-[11px] font-black text-amber-200 bg-[#07030F]/80 px-2 py-0.5 rounded-full mt-2 border border-amber-400/30">
                        🪔 Aarti in Progress...
                      </span>
                    </div>
                  )}

                  {flowerShowerActive && (
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                      <div className="text-2xl animate-bounce space-x-3">
                        <span>🌸</span>
                        <span>🌺</span>
                        <span>🌼</span>
                        <span>🌹</span>
                        <span>🌸</span>
                      </div>
                    </div>
                  )}

                  {holyWaterActive && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="px-3 py-1.5 rounded-full bg-cyan-900/90 text-cyan-200 text-xs font-bold animate-pulse flex items-center gap-1.5 border border-cyan-400/40 shadow-lg">
                        <Droplets className="w-4 h-4 text-cyan-400" />
                        <span>Sacred Gangajal Offered (जलार्पणम्)</span>
                      </div>
                    </div>
                  )}

                  {userChanted && (
                    <div className="absolute top-1/3 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-amber-500 text-white font-black text-xs animate-ping shadow-lg">
                      ॐ नमः शिवाय · Chanted!
                    </div>
                  )}
                </div>

                {/* Bottom Shrine Audio & Devotee Bar */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <div>
                    <span className="text-[10px] text-amber-300 font-bold block">Priest Chant</span>
                    <span className="font-extrabold truncate max-w-[200px] block">
                      {activeVirtualShrine.leadPriest.name}
                    </span>
                  </div>

                  <button
                    onClick={handleChantMantra}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-black text-xs transition-all shadow-md flex items-center gap-1 cursor-pointer border border-white/20"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Chant with Priest (+1)</span>
                  </button>
                </div>
              </div>

              {/* Ritual Control Deck */}
              <div className="glass-card p-4 rounded-3xl border border-white/15 space-y-2.5">
                <div className="text-xs font-bold text-white/80 flex items-center justify-between">
                  <span>Interactive Ritual Offerings:</span>
                  <span className="text-[11px] text-white/50">Click to offer directly to deity</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={handleRingBell}
                    className="p-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer shadow-sm"
                  >
                    <Bell className="w-5 h-5 text-amber-400" />
                    <span>Ring Bell (घंटी)</span>
                  </button>

                  <button
                    onClick={handleWaveAarti}
                    className={`p-2.5 rounded-2xl border font-bold text-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer ${
                      isAartiWaving
                        ? 'bg-amber-500/30 text-amber-200 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                        : 'bg-white/[0.06] hover:bg-white/[0.14] border-white/15 text-white'
                    }`}
                  >
                    <Flame className="w-5 h-5 text-amber-400" />
                    <span>{isAartiWaving ? 'Stop Aarti' : 'Wave Diya (आरती)'}</span>
                  </button>

                  <button
                    onClick={handleShowerFlowers}
                    className="p-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer shadow-sm"
                  >
                    <Flower2 className="w-5 h-5 text-pink-400" />
                    <span>Offer Flowers (पुष्प)</span>
                  </button>

                  <button
                    onClick={handleOfferWater}
                    className="p-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-all cursor-pointer shadow-sm"
                  >
                    <Droplets className="w-5 h-5 text-cyan-400" />
                    <span>Holy Water (जलार्पण)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MY BOOKINGS & TRACKING */}
          {activeTab === 'my_bookings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span className="font-bold text-white">Your Registered Virtual Sankalps</span>
                <span>{myBookings.length} Recorded</span>
              </div>

              {myBookings.length === 0 ? (
                <div className="p-8 text-center glass-card rounded-3xl border border-white/15 space-y-2">
                  <Package className="w-8 h-8 text-white/30 mx-auto" />
                  <p className="text-xs text-white/60 font-medium">No online pujas booked yet.</p>
                  <button
                    onClick={() => setActiveTab('catalog')}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-amber-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer border border-white/20"
                  >
                    Browse E-Pujas
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {myBookings.map((b) => (
                    <div
                      key={b.id}
                      className="glass-card p-4 rounded-3xl border border-white/15 space-y-3 shadow-md"
                    >
                      <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-amber-300">
                            Booking ID: {b.id}
                          </span>
                          <h4 className="font-extrabold text-white text-sm">
                            {b.pujaTitle}
                          </h4>
                          <span className="text-[11px] text-white/60 font-medium">
                            {b.templeOrShrine}
                          </span>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-extrabold uppercase">
                          {b.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs bg-white/[0.04] p-3 rounded-2xl border border-white/10">
                        <div>
                          <div className="text-[10px] text-white/50 font-bold">Devotee & Gotra:</div>
                          <div className="font-semibold text-white">
                            {b.devoteeName} ({b.gotra})
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-white/50 font-bold">Auspicious Date:</div>
                          <div className="font-semibold text-white">{b.date}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-[10px] text-white/50 font-bold">Family Members in Sankalp:</div>
                          <div className="font-medium text-white/80 truncate">
                            {b.familyMembers.join(', ')}
                          </div>
                        </div>
                      </div>

                      {/* Prasad Tracking */}
                      {b.prasadTrackingNumber && (
                        <div className="flex items-center justify-between p-2.5 bg-amber-500/10 rounded-xl border border-amber-400/30 text-xs">
                          <div className="flex items-center gap-1.5">
                            <Package className="w-4 h-4 text-amber-400" />
                            <div>
                              <div className="font-bold text-amber-200">Prasad Courier Dispatched</div>
                              <div className="text-[10px] text-white/60 font-mono">
                                AWB: {b.prasadTrackingNumber}
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] font-extrabold text-amber-300 bg-white/10 px-2 py-0.5 rounded-md border border-amber-400/40">
                            In Transit
                          </span>
                        </div>
                      )}
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
