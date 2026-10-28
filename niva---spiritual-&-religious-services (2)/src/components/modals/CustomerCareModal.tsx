import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Headphones, Phone, MessageSquare, Send, CheckCircle, HelpCircle } from 'lucide-react';

interface CustomerCareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomerCareModal: React.FC<CustomerCareModalProps> = ({ isOpen, onClose }) => {
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: 'Namaste & Blessings! Welcome to NIVA Care. How may our ritual coordination team assist you today?',
      time: 'Just now',
    },
  ]);
  const [callbackRequested, setCallbackRequested] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userText = chatMessage;
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: 'Just now' },
    ]);
    setChatMessage('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Thank you for reaching out. A senior ceremony specialist has received your inquiry and will connect with your priest coordinator promptly.',
          time: 'Just now',
        },
      ]);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07030F]/80 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in duration-200">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-panel bg-[#0D071E]/95 w-full max-w-md rounded-3xl shadow-[0_0_80px_rgba(168,85,247,0.3)] border border-white/20 overflow-hidden flex flex-col max-h-[90vh] text-white"
      >
        {/* Header */}
        <div className="p-4 bg-white/[0.05] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
              <Headphones className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">NIVA Spiritual Care</h3>
              <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                24/7 Live Support Active
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

        {/* Helpline cards */}
        <div className="p-4 bg-white/[0.03] border-b border-white/10 space-y-2">
          <div className="flex items-center justify-between glass-card bg-white/[0.04] p-3 rounded-2xl border border-white/10 shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Toll-Free Ceremony Hotline</div>
                <div className="text-[11px] text-amber-300 font-mono">+1 (800) 555-NIVA (6482)</div>
              </div>
            </div>
            <button
              onClick={() => setCallbackRequested(true)}
              className="px-3 py-1.5 text-[11px] font-bold bg-gradient-to-r from-purple-600 to-amber-500 hover:brightness-110 text-white rounded-xl transition-all cursor-pointer border border-white/20"
            >
              {callbackRequested ? 'Requested ✓' : 'Call Me'}
            </button>
          </div>

          {callbackRequested && (
            <div className="text-[11px] text-emerald-300 bg-emerald-500/10 border border-emerald-400/25 p-2.5 rounded-xl flex items-center gap-1.5 font-medium">
              <CheckCircle className="w-3.5 h-3.5 shrink-0" />
              Callback scheduled! A ritual coordinator will call you within 10 minutes.
            </div>
          )}
        </div>

        {/* Live Chat area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 min-h-[200px] no-scrollbar">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-600/50 to-indigo-600/50 border border-purple-400/30 text-white rounded-br-xs'
                    : 'glass-card bg-white/[0.05] border border-white/12 text-white/90 shadow-md rounded-bl-xs'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[9px] text-white/40 mt-1 px-1">{m.time}</span>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 bg-white/[0.04] border-t border-white/10 flex gap-2">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Type your question or ritual inquiry..."
            className="flex-1 px-3.5 py-2 text-xs bg-white/[0.06] border border-white/15 rounded-xl outline-none focus:border-purple-400 text-white placeholder-white/40"
          />
          <button
            type="submit"
            className="p-2.5 bg-gradient-to-r from-purple-600 to-amber-500 hover:brightness-110 text-white rounded-xl transition-all shrink-0 cursor-pointer border border-white/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};
