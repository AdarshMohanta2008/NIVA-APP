import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, Phone, Mail, ArrowRight, CheckCircle2, Wand2 } from 'lucide-react';
import { Religion } from '../../types';
import { DIVINE_THEMES, DivineThemeConfig } from '../../theme/divineThemes';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string, email: string, religion: Religion) => void;
  initialReligion?: Religion;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialReligion = 'Islam',
}) => {
  const [isRegister, setIsRegister] = useState(true);
  const [selectedReligion, setSelectedReligion] = useState<Religion>(initialReligion);
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('+91 98201 45890');
  const [email, setEmail] = useState('devotee@niva.faith');
  const [name, setName] = useState(DIVINE_THEMES[initialReligion].sampleUserName);
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [otp, setOtp] = useState('8492');

  if (!isOpen) return null;

  const activeThemeConfig: DivineThemeConfig = DIVINE_THEMES[selectedReligion];

  const handleReligionChange = (rel: Religion) => {
    setSelectedReligion(rel);
    const theme = DIVINE_THEMES[rel];
    setName(theme.sampleUserName);
    setEmail(theme.sampleUserEmail);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || activeThemeConfig.sampleUserName;
    const finalEmail = method === 'email' ? email : activeThemeConfig.sampleUserEmail;
    onLoginSuccess(finalName, finalEmail, selectedReligion);
    onClose();
  };

  const religionsList: Religion[] = [
    'Islam',
    'Hinduism',
    'Christianity',
    'Sikhism',
    'Buddhism',
    'Jainism',
    'Judaism',
    'All',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07030F]/80 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-panel bg-[#0D071E]/95 w-full max-w-md rounded-3xl shadow-[0_0_80px_rgba(168,85,247,0.3)] border border-white/20 overflow-hidden flex flex-col max-h-[92vh] text-white"
      >
        {/* Header */}
        <div className="p-4 bg-white/[0.05] text-white flex items-center justify-between shrink-0 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="font-black text-white text-sm">
                {isRegister ? 'Join NIVA Sacred Ecosystem' : 'Welcome Back to NIVA'}
              </h3>
              <p className="text-[10px] text-white/50">
                Customized Divine Interface for Every Faith
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 no-scrollbar">
          {step === 'input' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              {/* Faith Tradition Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white/90 flex items-center gap-1.5">
                    <Wand2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Select Your Faith Tradition</span>
                  </label>
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                    {activeThemeConfig.themeTitle}
                  </span>
                </div>
                <p className="text-[11px] text-white/50">
                  NIVA dynamically transforms into your custom faith theme (colors, greetings & clergy).
                </p>

                {/* 4x2 grid of religions */}
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  {religionsList.map((rel) => {
                    const theme = DIVINE_THEMES[rel];
                    const isSelected = selectedReligion === rel;
                    return (
                      <button
                        key={rel}
                        type="button"
                        onClick={() => handleReligionChange(rel)}
                        className={`p-2 rounded-2xl text-center border transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                          isSelected
                            ? 'bg-purple-600/40 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] text-white'
                            : 'glass-card bg-white/[0.04] border-white/10 hover:bg-white/[0.08] text-white/70 hover:text-white'
                        }`}
                      >
                        <span className="text-base">{theme.symbol}</span>
                        <span
                          className={`text-[10px] font-bold truncate w-full ${
                            isSelected ? 'text-amber-300 font-black' : 'text-white/70'
                          }`}
                        >
                          {rel}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Theme preview ribbon */}
                <div className="p-3 rounded-2xl glass-card bg-white/[0.04] border border-white/10 text-[11px] text-white flex items-start gap-2.5">
                  <span className="text-base shrink-0">{activeThemeConfig.symbol}</span>
                  <div className="min-w-0">
                    <span className="font-bold text-amber-300 block">{activeThemeConfig.greetingTitle}</span>
                    <span className="text-[10px] text-white/60 line-clamp-1 italic font-serif">
                      “{activeThemeConfig.scriptureText}”
                    </span>
                  </div>
                </div>
              </div>

              {/* Devotee Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-white/80">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={`e.g. ${activeThemeConfig.sampleUserName}`}
                  className="w-full px-3.5 py-2.5 text-xs bg-white/[0.06] border border-white/15 rounded-xl outline-none focus:border-purple-400 font-medium text-white placeholder-white/40"
                />
              </div>

              {/* Toggle method */}
              <div className="flex border border-white/15 rounded-xl overflow-hidden p-0.5 bg-white/[0.04] text-xs">
                <button
                  type="button"
                  onClick={() => setMethod('phone')}
                  className={`flex-1 py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    method === 'phone'
                      ? 'bg-purple-600/40 text-white border border-purple-400/30 shadow-xs'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" /> Mobile
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('email')}
                  className={`flex-1 py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    method === 'email'
                      ? 'bg-purple-600/40 text-white border border-purple-400/30 shadow-xs'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" /> Email
                </button>
              </div>

              {method === 'phone' ? (
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-white/80">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 text-xs bg-white/[0.06] border border-white/15 rounded-xl outline-none focus:border-purple-400 font-mono text-white placeholder-white/40"
                  />
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-white/80">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-white/[0.06] border border-white/15 rounded-xl outline-none focus:border-purple-400 font-medium text-white placeholder-white/40"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 hover:brightness-110 text-white font-bold text-xs rounded-2xl shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/20"
              >
                <span>Send Sacred OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-xs text-amber-300 font-semibold hover:underline cursor-pointer"
                >
                  {isRegister
                    ? 'Already have an account? Sign In'
                    : "Don't have an account? Create one"}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center space-y-1">
                <p className="text-xs text-white/70">
                  Enter the 4-digit sacred verification OTP sent to your device.
                </p>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-400/30">
                  {activeThemeConfig.symbol} {activeThemeConfig.themeTitle}
                </div>
              </div>

              <div className="space-y-1 text-center">
                <input
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-40 mx-auto text-center tracking-[0.6em] text-xl font-bold py-2.5 bg-white/[0.08] border border-purple-400/50 rounded-2xl outline-none focus:border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                />
                <p className="text-[11px] text-white/50 pt-1">
                  Demo OTP: <strong className="text-amber-300">8492</strong>
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 hover:brightness-110 text-white font-bold text-xs rounded-2xl shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/20"
              >
                Enter NIVA with {selectedReligion} Theme
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="text-xs text-white/50 hover:text-white cursor-pointer"
                >
                  Change details / Back
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
