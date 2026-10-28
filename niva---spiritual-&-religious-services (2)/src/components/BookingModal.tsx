import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  ChevronLeft,
  Shield,
  Sparkles,
  ArrowRight,
  Star,
  Layers,
  Video,
  Home as HomeIcon,
  Landmark,
} from 'lucide-react';
import { ServiceItem, ServiceProvider, Booking, Religion } from '../types';
import { SERVICES, SERVICE_PROVIDERS } from '../data/mockData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: ServiceItem | null;
  initialProvider?: ServiceProvider | null;
  onBookingSuccess: (newBooking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
  initialProvider,
  onBookingSuccess,
}) => {
  // Step tracker: 1 to 7
  // 1: Service, 2: Provider, 3: Date & Time, 4: Location, 5: Package, 6: Summary, 7: Confirmation
  const [step, setStep] = useState<number>(1);

  // Selections
  const [selectedService, setSelectedService] = useState<ServiceItem>(
    initialService || SERVICES[0]
  );
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider>(
    initialProvider || SERVICE_PROVIDERS[0]
  );

  // Date & Time
  const dates = [
    { day: 'Sun', date: 'Oct 04', full: '2026-10-04', auspicious: 'Shubh Muhurat' },
    { day: 'Mon', date: 'Oct 05', full: '2026-10-05', auspicious: '' },
    { day: 'Tue', date: 'Oct 06', full: '2026-10-06', auspicious: 'Amrit Bela' },
    { day: 'Wed', date: 'Oct 07', full: '2026-10-07', auspicious: '' },
    { day: 'Thu', date: 'Oct 08', full: '2026-10-08', auspicious: 'Vijay Muhurat' },
    { day: 'Fri', date: 'Oct 09', full: '2026-10-09', auspicious: 'Abhijit Muhurat' },
  ];
  const [selectedDate, setSelectedDate] = useState(dates[0]);

  const timeSlots = [
    { time: '06:30 AM - 08:30 AM', label: 'Brahma Muhurat (Sunrise)', available: true },
    { time: '09:00 AM - 11:30 AM', label: 'Morning Auspicious', available: true },
    { time: '12:00 PM - 02:00 PM', label: 'Afternoon Puja', available: true },
    { time: '04:30 PM - 06:30 PM', label: 'Pradosh / Twilight', available: true },
    { time: '07:00 PM - 09:00 PM', label: 'Evening Aarti & Katha', available: true },
  ];
  const [selectedTime, setSelectedTime] = useState(timeSlots[1].time);

  // Location
  const [locationType, setLocationType] = useState<'Home' | 'Temple/Venue' | 'Virtual Video'>('Home');
  const [address, setAddress] = useState('Flat 402, Lotus Greens, Bandra West, Mumbai');

  // Package
  type PackageOption = {
    type: 'Basic' | 'Standard' | 'Grand';
    title: string;
    multiplier: number;
    description: string;
    features: string[];
  };

  const packages: PackageOption[] = [
    {
      type: 'Basic',
      title: 'Ceremony Officiating Only',
      multiplier: 1.0,
      description: 'The verified priest/clergy officiates rites. You arrange materials & samagri from our checklist.',
      features: ['Lead Priest Officiating', 'Pre-ceremony consultation call', 'Digital samagri checklist provided'],
    },
    {
      type: 'Standard',
      title: 'Standard (All Samagri Included)',
      multiplier: 1.4,
      description: 'Priest brings all fresh consecrated flowers, certified herbs, sacred powders & ritual vessels.',
      features: [
        'Lead Priest Officiating',
        '100% Pure Organic Samagri kit included',
        'Fresh sacred flowers & hawan wood',
        'Post-puja prasad sanctification',
      ],
    },
    {
      type: 'Grand',
      title: 'Grand Ceremony (Priest + Assistant)',
      multiplier: 2.1,
      description: 'Complete ceremonial grandeur with 2 clergy members, traditional chanting hymns & elaborate altar setup.',
      features: [
        'Lead Acharya + Assistant Priest',
        'Full Premium Samagri & Hawan Kund',
        'Melodic mantra chanting & instruments',
        'Complete altar decoration guidance',
        'Personalized horoscope / astrological muhurat reading',
      ],
    },
  ];
  const [selectedPackage, setSelectedPackage] = useState<PackageOption>(packages[1]);

  // Computed Price
  const basePrice = selectedProvider.startingPrice || selectedService.startingPrice;
  const totalPrice = Math.round(basePrice * selectedPackage.multiplier);

  // Confirmed booking reference
  const [confirmedId, setConfirmedId] = useState<string>('');

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else if (step === 6) {
      // Confirm Booking
      const generatedId = `NV-BK-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmedId(generatedId);
      const newBooking: Booking = {
        id: generatedId,
        serviceId: selectedService.id,
        serviceTitle: selectedService.title,
        providerId: selectedProvider.id,
        providerName: selectedProvider.name,
        providerPhoto: selectedProvider.photo,
        providerTitle: selectedProvider.title,
        religion: selectedProvider.religion,
        date: selectedDate.full,
        timeSlot: selectedTime,
        locationType: locationType,
        address: locationType === 'Virtual Video' ? 'Secure High-Definition Video Link' : address,
        packageType: selectedPackage.type,
        packageName: selectedPackage.title,
        totalPrice: totalPrice,
        status: 'Confirmed',
        createdAt: new Date().toISOString().split('T')[0],
      };
      onBookingSuccess(newBooking);
      setStep(7);
    }
  };

  const handleBack = () => {
    if (step > 1 && step < 7) {
      setStep(step - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-2xl flex items-end sm:items-center justify-center p-0 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="glass-panel-elevated w-full max-w-lg rounded-t-[32px] sm:rounded-[32px] shadow-[0_30px_90px_rgba(0,0,0,0.9)] border border-white/25 overflow-hidden flex flex-col max-h-[92vh] text-white"
      >
        {/* Drag handle for mobile */}
        <div className="w-12 h-1 rounded-full bg-white/20 mx-auto mt-2.5 sm:hidden" />

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/15 bg-white/[0.04] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B] animate-pulse" />
              <span className="text-[11px] font-bold tracking-wider uppercase text-amber-300">
                {step < 7 ? `Step ${step} of 6 • Sacred Ceremony` : 'Ceremony Confirmed'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white leading-tight mt-0.5">
              {step === 1 && 'Select Religious Service'}
              {step === 2 && 'Choose Verified Clergy / Priest'}
              {step === 3 && 'Pick Auspicious Date & Time'}
              {step === 4 && 'Ceremony Venue & Location'}
              {step === 5 && 'Choose Ceremony Package'}
              {step === 6 && 'Review Booking Summary'}
              {step === 7 && 'Sacred Booking Confirmed!'}
            </h3>
          </div>

          <button
            id="btn-close-booking-modal"
            onClick={onClose}
            className="p-2 rounded-full glass-pill bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        {step <= 6 && (
          <div className="w-full bg-white/10 h-1">
            <div
              className="bg-gradient-to-r from-purple-500 via-amber-400 to-amber-300 h-1 transition-all duration-300 ease-out shadow-[0_0_8px_#F59E0B]"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        )}

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* STEP 1: SERVICE */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-xs text-white/60 font-medium">
                Choose the sacred ceremony or prayer ritual you wish to conduct:
              </p>
              <div className="grid grid-cols-1 gap-2.5">
                {SERVICES.map((srv) => {
                  const isSelected = selectedService.id === srv.id;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedService(srv)}
                      className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-600/30 to-amber-500/30 border-amber-400/60 ring-2 ring-amber-400/30 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                          : 'bg-white/[0.05] border-white/10 hover:border-white/25 hover:bg-white/[0.08]'
                      }`}
                    >
                      <img
                        src={srv.image}
                        alt={srv.title}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 ring-1 ring-white/15"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-white/15 text-white/90 border border-white/15">
                            {srv.religion}
                          </span>
                          <span className="text-[11px] text-white/60">
                            ⏱ {srv.duration}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white truncate mt-1">
                          {srv.title}
                        </h4>
                        <p className="text-xs text-white/60 line-clamp-1">
                          {srv.shortDesc}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-semibold text-white/50">From</div>
                        <div className="text-sm font-extrabold text-amber-300">
                          ${srv.startingPrice}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: PROVIDER */}
          {step === 2 && (
            <div className="space-y-3">
              <div className="glass-card p-3 rounded-xl border border-amber-400/30 bg-amber-500/10 flex items-center gap-2.5 text-xs text-amber-200 font-medium">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Showing verified practitioners for <strong className="text-white">{selectedService.religion}</strong> ceremonies.
                </span>
              </div>

              <div className="space-y-2.5">
                {SERVICE_PROVIDERS.map((prov) => {
                  const isSelected = selectedProvider.id === prov.id;
                  return (
                    <div
                      key={prov.id}
                      onClick={() => setSelectedProvider(prov)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-600/30 to-amber-500/30 border-amber-400/60 ring-2 ring-amber-400/30 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                          : 'bg-white/[0.05] border-white/10 hover:border-white/25 hover:bg-white/[0.08]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={prov.photo}
                          alt={prov.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0 ring-1 ring-white/20"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-bold text-white">
                              {prov.name}
                            </h4>
                            {prov.verified && (
                              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-semibold px-1.5 py-0.5 rounded">
                                ✓ Verified
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-white/70 font-medium">{prov.title}</p>
                          <div className="flex items-center gap-3 text-xs text-white/50 mt-1">
                            <span className="flex items-center gap-1 font-semibold text-amber-300">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              {prov.rating} ({prov.reviewCount})
                            </span>
                            <span>• {prov.experienceYears}+ yrs exp</span>
                            <span>• {prov.languages.slice(0, 2).join(', ')}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs text-white/50">Fee</span>
                          <div className="text-sm font-extrabold text-amber-300">
                            ${prov.startingPrice}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-white/60 mt-2 bg-white/[0.04] p-2 rounded-lg line-clamp-2 border border-white/5">
                        {prov.bio}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: DATE & TIME */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
                  Select Auspicious Date
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {dates.map((d) => {
                    const isSelected = selectedDate.full === d.full;
                    return (
                      <button
                        key={d.full}
                        onClick={() => setSelectedDate(d)}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white border-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                            : 'bg-white/[0.05] border-white/10 hover:border-white/25 text-white/80'
                        }`}
                      >
                        <span className={`text-[10px] font-semibold uppercase ${isSelected ? 'text-amber-200' : 'text-white/40'}`}>
                          {d.day}
                        </span>
                        <span className="text-sm font-bold my-0.5">{d.date}</span>
                        {d.auspicious && (
                          <span className={`text-[8px] font-bold leading-tight line-clamp-1 ${isSelected ? 'text-amber-200' : 'text-amber-300'}`}>
                            {d.auspicious}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
                  Select Muhurat & Time Slot
                </label>
                <div className="space-y-2">
                  {timeSlots.map((ts) => {
                    const isSelected = selectedTime === ts.time;
                    return (
                      <div
                        key={ts.time}
                        onClick={() => setSelectedTime(ts.time)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-purple-600/30 to-amber-500/30 border-amber-400/60 text-white font-semibold ring-1 ring-amber-400/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                            : 'bg-white/[0.05] border-white/10 hover:border-white/25 text-white/80'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Clock className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-white/40'}`} />
                          <div>
                            <div className="text-xs font-bold">{ts.time}</div>
                            <div className="text-[11px] text-white/50">{ts.label}</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                          Available
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: LOCATION */}
          {step === 4 && (
            <div className="space-y-4">
              <label className="text-xs font-bold text-white uppercase tracking-wider block">
                Ceremony Format & Venue
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'Home' as const, label: 'At My Home', icon: HomeIcon, desc: 'Clergy visits residence' },
                  { id: 'Temple/Venue' as const, label: 'Temple / Hall', icon: Landmark, desc: 'Booked sacred hall' },
                  { id: 'Virtual Video' as const, label: 'Live Video Puja', icon: Video, desc: 'Interactive HD stream' },
                ].map((item) => {
                  const isSelected = locationType === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setLocationType(item.id)}
                      className={`p-3 rounded-xl border flex flex-col items-center text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-600/30 to-amber-500/30 border-amber-400/60 text-white font-bold ring-1 ring-amber-400/30 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                          : 'bg-white/[0.05] border-white/10 text-white/70 hover:border-white/25'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-amber-400' : 'text-white/40'}`} />
                      <span className="text-xs font-semibold">{item.label}</span>
                      <span className="text-[10px] text-white/50 mt-0.5">{item.desc}</span>
                    </button>
                  );
                })}
              </div>

              {locationType !== 'Virtual Video' ? (
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    Enter Ceremony Address:
                  </label>
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 text-xs bg-white/[0.06] border border-white/15 rounded-xl focus:border-amber-400 focus:bg-white/10 outline-none text-white font-medium placeholder-white/40"
                    placeholder="Enter complete address with flat number, building, landmark, and pincode..."
                  />
                  <p className="text-[11px] text-white/50">
                    The clergy will arrive 20 minutes prior to begin sanctification and rangoli / altar prep.
                  </p>
                </div>
              ) : (
                <div className="bg-sky-500/10 p-4 rounded-xl border border-sky-400/30 text-xs text-sky-200 space-y-1">
                  <p className="font-bold">🖥️ Interactive Video Ceremony Details:</p>
                  <p className="text-white/70">
                    You will receive a high-speed encrypted 2-way video link. Priest will guide you live through every sacred mantra step-by-step.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: PACKAGE */}
          {step === 5 && (
            <div className="space-y-3">
              <p className="text-xs text-white/60 font-medium">
                Choose the ceremony package that best fits your occasion:
              </p>

              <div className="space-y-3">
                {packages.map((pkg) => {
                  const isSelected = selectedPackage.type === pkg.type;
                  const price = Math.round(basePrice * pkg.multiplier);
                  return (
                    <div
                      key={pkg.type}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-600/30 to-amber-500/30 border-amber-400/60 ring-2 ring-amber-400/30 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                          : 'bg-white/[0.05] border-white/10 hover:border-white/25 hover:bg-white/[0.08]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Layers className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-white/40'}`} />
                          <h4 className="text-sm font-bold text-white">{pkg.title}</h4>
                        </div>
                        <span className="text-sm font-black text-amber-300">${price}</span>
                      </div>
                      <p className="text-xs text-white/70 mt-1">{pkg.description}</p>
                      <div className="mt-2.5 pt-2.5 border-t border-white/10 space-y-1">
                        {pkg.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-[11px] text-white/80 font-medium">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6: SUMMARY */}
          {step === 6 && (
            <div className="space-y-3.5 text-xs">
              {/* Selected Service Card */}
              <div className="p-3 bg-white/[0.05] rounded-2xl border border-white/15 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-white/50">Service</span>
                  <span className="font-bold text-white">{selectedService.title}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-white/50">Officiant / Clergy</span>
                  <span className="font-bold text-white flex items-center gap-1">
                    {selectedProvider.name}
                    <span className="text-[10px] text-amber-400">★ {selectedProvider.rating}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-white/50">Date & Time</span>
                  <span className="font-bold text-white">
                    {selectedDate.date}, 2026 • {selectedTime}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-white/50">Format & Venue</span>
                  <span className="font-bold text-white">
                    {locationType} ({locationType === 'Virtual Video' ? 'Online' : address.split(',')[0]})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/50">Selected Package</span>
                  <span className="font-bold text-white">{selectedPackage.title}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-3 bg-white/[0.04] rounded-2xl border border-amber-400/25 space-y-2">
                <div className="flex items-center justify-between text-white/70">
                  <span>Ceremony Base Dakshina</span>
                  <span>${basePrice}</span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span>Package Materials & Prep ({selectedPackage.type})</span>
                  <span>${totalPrice - basePrice}</span>
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span>Platform Verification & Protection</span>
                  <span className="text-emerald-400 font-semibold">FREE (Waived)</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-sm font-black text-amber-300">
                  <span>Total Payable:</span>
                  <span>${totalPrice}</span>
                </div>
              </div>

              {/* Peace of mind pledge */}
              <div className="flex items-center gap-2 p-2.5 bg-white/[0.04] rounded-xl text-white/70 text-[11px] border border-white/10">
                <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong className="text-white">NIVA Sacred Guarantee:</strong> 100% money-back or free rescheduling if clergy is delayed or ritual is interrupted.
                </span>
              </div>
            </div>
          )}

          {/* STEP 7: CONFIRMED */}
          {step === 7 && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-300 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-500/10 border border-emerald-400/30">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-widest bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-400/30">
                  Ceremony Booked
                </span>
                <h3 className="text-xl font-extrabold text-white mt-2">
                  Blessings & Congratulations!
                </h3>
                <p className="text-xs text-white/70 max-w-sm mx-auto mt-1">
                  Your ritual has been reserved with <strong className="text-white">{selectedProvider.name}</strong>. An SMS and calendar invitation have been dispatched.
                </p>
              </div>

              <div className="glass-card p-3.5 rounded-2xl border border-white/15 max-w-sm mx-auto text-left text-xs space-y-1.5 shadow-md">
                <div className="flex justify-between">
                  <span className="text-white/50">Booking Reference:</span>
                  <span className="font-mono font-bold text-amber-300">{confirmedId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Ceremony:</span>
                  <span className="font-semibold text-white">{selectedService.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Scheduled:</span>
                  <span className="font-semibold text-white">{selectedDate.date}, 2026 • {selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Total:</span>
                  <span className="font-bold text-emerald-300">${totalPrice}</span>
                </div>
              </div>

              <button
                id="btn-done-booking"
                onClick={onClose}
                className="w-full max-w-sm py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-bold text-sm shadow-xl transition-all cursor-pointer border border-white/20"
              >
                Go to Home & View My Bookings
              </button>
            </div>
          )}
        </div>

        {/* Action Controls */}
        {step <= 6 && (
          <div className="p-4 bg-white/[0.04] border-t border-white/15 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                id="btn-booking-back"
                onClick={handleBack}
                className="flex items-center gap-1 px-4 py-2.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              id="btn-booking-next"
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-1.5 py-3 px-5 rounded-xl bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-bold text-xs shadow-xl transition-all cursor-pointer border border-white/20"
            >
              {step === 6 ? (
                <>Confirm & Book Ceremony • ${totalPrice}</>
              ) : (
                <>
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
