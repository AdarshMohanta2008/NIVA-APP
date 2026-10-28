import React from 'react';
import { motion } from 'motion/react';
import { X, Bell, CheckCheck, Sparkles, Calendar, Package } from 'lucide-react';
import { UserNotification } from '../../types';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: UserNotification[];
  onMarkAllAsRead: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07030F]/80 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in duration-200">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-panel bg-[#0D071E]/95 w-full max-w-sm rounded-3xl shadow-[0_0_80px_rgba(168,85,247,0.3)] border border-white/20 overflow-hidden flex flex-col max-h-[85vh] text-white"
      >
        {/* Header */}
        <div className="p-4 bg-white/[0.05] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
              <Bell className="w-4 h-4 text-amber-300" />
            </div>
            <h3 className="font-bold text-white text-sm">Notifications & Reminders</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action subhead */}
        <div className="px-4 py-2 bg-white/[0.03] border-b border-white/10 flex items-center justify-between">
          <span className="text-[11px] text-amber-300 font-semibold bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
            {notifications.filter((n) => n.unread).length} new alerts
          </span>
          <button
            onClick={onMarkAllAsRead}
            className="flex items-center gap-1 text-[11px] text-white/60 hover:text-white font-medium transition-colors cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all read
          </button>
        </div>

        {/* Notifications list */}
        <div className="p-4 space-y-2.5 overflow-y-auto flex-1 no-scrollbar">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-xs text-white/40">
              No notifications yet.
            </div>
          ) : (
            notifications.map((notif) => {
              const getIcon = () => {
                switch (notif.type) {
                  case 'booking':
                    return <Sparkles className="w-4 h-4 text-amber-400" />;
                  case 'occasion':
                    return <Calendar className="w-4 h-4 text-emerald-400" />;
                  case 'order':
                    return <Package className="w-4 h-4 text-sky-400" />;
                  default:
                    return <Bell className="w-4 h-4 text-purple-400" />;
                }
              };

              return (
                <div
                  key={notif.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    notif.unread
                      ? 'bg-purple-600/20 border-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                      : 'glass-card bg-white/[0.04] border-white/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-white/[0.08] border border-white/10 shrink-0 mt-0.5">
                      {getIcon()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-bold text-white truncate">
                          {notif.title}
                        </h4>
                        <span className="text-[10px] text-white/40 shrink-0">
                          {notif.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-white/70 mt-0.5 leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  );
};
