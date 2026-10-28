import React from 'react';
import { motion } from 'motion/react';
import { X, MapPin, Check, Compass } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCity: string;
  onSelectCity: (city: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentCity,
  onSelectCity,
}) => {
  if (!isOpen) return null;

  const popularCities = [
    { city: 'Odisha', country: 'India', flag: '🇮🇳' },
    { city: 'Delhi NCR', country: 'India', flag: '🇮🇳' },
    { city: 'Bengaluru', country: 'India', flag: '🇮🇳' },
    { city: 'New York', country: 'USA', flag: '🇺🇸' },
    { city: 'San Francisco', country: 'USA', flag: '🇺🇸' },
    { city: 'London', country: 'UK', flag: '🇬🇧' },
    { city: 'Toronto', country: 'Canada', flag: '🇨🇦' },
    { city: 'Dubai', country: 'UAE', flag: '🇦🇪' },
    { city: 'Singapore', country: 'Singapore', flag: '🇸🇬' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07030F]/80 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in duration-200">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-panel bg-[#0D071E]/95 w-full max-w-sm rounded-3xl shadow-[0_0_80px_rgba(168,85,247,0.3)] border border-white/20 overflow-hidden text-white"
      >
        {/* Header */}
        <div className="p-4 bg-white/[0.05] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
              <MapPin className="w-4 h-4 text-amber-300" />
            </div>
            <h3 className="font-bold text-white text-sm">Select Your City</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of cities */}
        <div className="p-4 space-y-2 max-h-96 overflow-y-auto no-scrollbar">
          <div className="flex items-center gap-2 p-3 rounded-2xl glass-card bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs font-semibold mb-2">
            <Compass className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Find local verified priests and same-day puja kits</span>
          </div>

          <div className="grid grid-cols-1 gap-1.5">
            {popularCities.map((item) => {
              const isSelected = currentCity.toLowerCase().includes(item.city.toLowerCase());
              return (
                <button
                  key={item.city}
                  onClick={() => {
                    onSelectCity(`${item.city}, ${item.flag}`);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-600/30 border-purple-400 font-bold text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                      : 'glass-card bg-white/[0.04] border-white/10 text-white/80 hover:border-white/20 hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{item.flag}</span>
                    <div>
                      <div className="text-xs font-bold text-white">{item.city}</div>
                      <div className="text-[10px] text-white/50">{item.country}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-amber-300" />}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
