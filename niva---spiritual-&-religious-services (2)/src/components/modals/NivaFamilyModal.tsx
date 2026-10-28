import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  ShoppingBag,
  UserCheck,
  Music2,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Bell,
  Heart,
} from 'lucide-react';
import { FamilyOccasion, Product, ServiceProvider } from '../../types';
import { INITIAL_FAMILY_OCCASIONS, SERVICE_PROVIDERS } from '../../data/mockData';

interface NivaFamilyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartBooking?: (provider?: ServiceProvider) => void;
  onGoToShop?: () => void;
  onGoToCalendar?: () => void;
}

export const NivaFamilyModal: React.FC<NivaFamilyModalProps> = ({
  isOpen,
  onClose,
  onStartBooking,
  onGoToShop,
  onGoToCalendar,
}) => {
  const [familyOccasions, setFamilyOccasions] = useState<FamilyOccasion[]>(
    INITIAL_FAMILY_OCCASIONS
  );
  const [activeTab, setActiveTab] = useState<'occasions' | 'members' | 'add'>('occasions');

  // Form for adding a new family occasion
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newReligion, setNewReligion] = useState<'Hinduism' | 'Islam' | 'Christianity' | 'Sikhism' | 'Buddhism' | 'Jainism' | 'Judaism'>('Hinduism');
  const [newMembers, setNewMembers] = useState('Rahul, Ananya, Dadi Ma');
  const [newReminder, setNewReminder] = useState('');

  // Family Members list
  const [members, setMembers] = useState([
    { id: 'mem-1', name: 'Rahul Sharma', role: 'Family Organizer', phone: '+91 98201 44521', isHost: true },
    { id: 'mem-2', name: 'Ananya Sharma', role: 'Co-Organizer', phone: '+91 98201 88392', isHost: false },
    { id: 'mem-3', name: 'Dadi Ma (Kalyani)', role: 'Elder Guide', phone: '+91 98201 11029', isHost: false },
    { id: 'mem-4', name: 'Arjun Sharma', role: 'Youth Member', phone: '+91 98201 77312', isHost: false },
  ]);

  const [invitePhone, setInvitePhone] = useState('');
  const [inviteSent, setInviteSent] = useState(false);

  if (!isOpen) return null;

  const handleCreateOccasion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDate) return;

    const created: FamilyOccasion = {
      id: `fam-${Date.now()}`,
      title: newTitle.trim(),
      date: newDate,
      dayBadge: 'Upcoming Family Event',
      familyMembers: newMembers.split(',').map((s) => s.trim()),
      religion: newReligion,
      preparationStatus: {
        priestBooked: false,
        itemsOrdered: false,
        musicSelected: false,
      },
      reminders: newReminder ? [newReminder] : ['Coordinate ceremony time with family'],
    };

    setFamilyOccasions((prev) => [created, ...prev]);
    setNewTitle('');
    setNewDate('');
    setNewReminder('');
    setActiveTab('occasions');
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invitePhone.trim()) return;
    setInviteSent(true);
    setMembers((prev) => [
      ...prev,
      {
        id: `mem-${Date.now()}`,
        name: `Invited Member (${invitePhone})`,
        role: 'Invited Member',
        phone: invitePhone,
        isHost: false,
      },
    ]);
    setInvitePhone('');
    setTimeout(() => setInviteSent(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#07030F]/80 backdrop-blur-2xl animate-in fade-in duration-200">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-panel bg-[#0D071E]/95 w-full max-w-lg rounded-3xl shadow-[0_0_80px_rgba(168,85,247,0.3)] border border-white/20 flex flex-col h-[90vh] max-h-[750px] overflow-hidden text-white"
      >
        {/* Header */}
        <div className="bg-white/[0.05] p-4 flex items-center justify-between shrink-0 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              <Users className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-extrabold tracking-wide text-white">NIVA Family</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  Shared Sanctum
                </span>
              </div>
              <p className="text-[11px] text-white/60">
                Co-plan family ceremonies, priests, samagri & checklists
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 bg-white/[0.03] p-1.5 gap-1 shrink-0">
          <button
            onClick={() => setActiveTab('occasions')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'occasions'
                ? 'bg-purple-600/40 text-white border border-purple-400/30 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            Family Occasions ({familyOccasions.length})
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'members'
                ? 'bg-purple-600/40 text-white border border-purple-400/30 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            Members ({members.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeTab === 'add'
                ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white border border-white/30 shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                : 'text-amber-300 hover:bg-amber-500/10'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Event</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* TAB 1: FAMILY OCCASIONS */}
          {activeTab === 'occasions' && (
            <div className="space-y-3.5">
              <div className="glass-panel p-3.5 rounded-2xl border border-white/10 text-xs text-white/80 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong className="text-amber-300">Joint Readiness Tracking:</strong> Everyone in your family sees the same live preparation status for each upcoming ceremony.
                </span>
              </div>

              {familyOccasions.map((occ) => (
                <div
                  key={occ.id}
                  className="glass-card rounded-2xl p-4 border border-white/12 shadow-lg space-y-3.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30">
                          {occ.religion}
                        </span>
                        <span className="text-[11px] font-semibold text-white/50">
                          {occ.dayBadge}
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-white mt-1">
                        {occ.title}
                      </h3>
                    </div>

                    <span className="text-[11px] font-bold text-amber-300 bg-amber-500/20 px-2.5 py-1 rounded-xl border border-amber-400/30 shrink-0">
                      {occ.date}
                    </span>
                  </div>

                  {/* Readiness 3-Step Matrix */}
                  <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-white/10">
                    {/* Priest Readiness */}
                    <div
                      className={`p-2.5 rounded-xl border text-[11px] flex flex-col items-center justify-center gap-1 ${
                        occ.preparationStatus.priestBooked
                          ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-200'
                          : 'bg-white/[0.04] border-white/10 text-white/60'
                      }`}
                    >
                      <UserCheck
                        className={`w-4 h-4 ${
                          occ.preparationStatus.priestBooked
                            ? 'text-emerald-400'
                            : 'text-white/40'
                        }`}
                      />
                      <span className="font-bold text-[10px]">
                        {occ.preparationStatus.priestBooked ? 'Priest Booked' : 'Priest Needed'}
                      </span>
                      {!occ.preparationStatus.priestBooked && (
                        <button
                          onClick={() => {
                            onClose();
                            onStartBooking && onStartBooking(SERVICE_PROVIDERS[0]);
                          }}
                          className="mt-0.5 text-[9px] font-bold text-amber-300 underline cursor-pointer"
                        >
                          Book Now
                        </button>
                      )}
                    </div>

                    {/* Samagri Items Readiness */}
                    <div
                      className={`p-2.5 rounded-xl border text-[11px] flex flex-col items-center justify-center gap-1 ${
                        occ.preparationStatus.itemsOrdered
                          ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-200'
                          : 'bg-white/[0.04] border-white/10 text-white/60'
                      }`}
                    >
                      <ShoppingBag
                        className={`w-4 h-4 ${
                          occ.preparationStatus.itemsOrdered
                            ? 'text-emerald-400'
                            : 'text-white/40'
                        }`}
                      />
                      <span className="font-bold text-[10px]">
                        {occ.preparationStatus.itemsOrdered ? 'Samagri Ready' : 'Order Kit'}
                      </span>
                      {!occ.preparationStatus.itemsOrdered && (
                        <button
                          onClick={() => {
                            onClose();
                            onGoToShop && onGoToShop();
                          }}
                          className="mt-0.5 text-[9px] font-bold text-amber-300 underline cursor-pointer"
                        >
                          Shop Kits
                        </button>
                      )}
                    </div>

                    {/* Music Readiness */}
                    <div
                      className={`p-2.5 rounded-xl border text-[11px] flex flex-col items-center justify-center gap-1 ${
                        occ.preparationStatus.musicSelected
                          ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-200'
                          : 'bg-white/[0.04] border-white/10 text-white/60'
                      }`}
                    >
                      <Music2
                        className={`w-4 h-4 ${
                          occ.preparationStatus.musicSelected
                            ? 'text-emerald-400'
                            : 'text-white/40'
                        }`}
                      />
                      <span className="font-bold text-[10px]">
                        {occ.preparationStatus.musicSelected ? 'Music Chosen' : 'Pick Hymns'}
                      </span>
                    </div>
                  </div>

                  {/* Family Members Tagged */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-white/80">Family:</span>
                      {occ.familyMembers.map((m, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-full bg-white/[0.06] text-white/80 text-[10px] font-medium border border-white/10"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Shared Reminders */}
                  {occ.reminders && occ.reminders.length > 0 && (
                    <div className="glass-panel p-2.5 rounded-xl border border-white/10 text-xs space-y-1.5">
                      <span className="text-[10px] font-bold text-white/60 uppercase tracking-wider flex items-center gap-1">
                        <Bell className="w-3 h-3 text-amber-400" />
                        Shared Reminders
                      </span>
                      <div className="space-y-1">
                        {occ.reminders.map((rem, rIdx) => (
                          <div key={rIdx} className="flex items-center gap-2 text-[11px] text-white/80">
                            <input
                              type="checkbox"
                              defaultChecked={rIdx === 0}
                              className="rounded accent-purple-500 cursor-pointer"
                            />
                            <span>{rem}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: FAMILY MEMBERS */}
          {activeTab === 'members' && (
            <div className="space-y-4">
              {/* Invite Member Card */}
              <form
                onSubmit={handleInvite}
                className="glass-panel p-4 rounded-2xl border border-white/10 space-y-2.5"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>Invite Family Member</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={invitePhone}
                    onChange={(e) => setInvitePhone(e.target.value)}
                    placeholder="Enter mobile number (+91 / +1)"
                    className="flex-1 bg-white/[0.06] border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-hidden focus:border-purple-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-amber-500 text-white rounded-xl text-xs font-bold hover:brightness-110 transition-all cursor-pointer border border-white/20"
                  >
                    Send Invite
                  </button>
                </div>
                {inviteSent && (
                  <p className="text-[11px] text-emerald-300 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Invitation SMS sent successfully!
                  </p>
                )}
              </form>

              {/* Members List */}
              <div className="space-y-2">
                {members.map((mem) => (
                  <div
                    key={mem.id}
                    className="glass-card p-3 rounded-2xl border border-white/10 flex items-center justify-between shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-500/20 text-purple-200 font-bold flex items-center justify-center text-xs border border-purple-400/30">
                        {mem.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-white">{mem.name}</h4>
                          {mem.isHost && (
                            <span className="text-[9px] font-bold px-2 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                              Host
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-white/50">{mem.role} • {mem.phone}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ADD NEW FAMILY OCCASION */}
          {activeTab === 'add' && (
            <form onSubmit={handleCreateOccasion} className="space-y-3.5 glass-panel p-4 rounded-2xl border border-white/10 shadow-lg">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Create Family Ceremony Occasion
              </h3>

              <div>
                <label className="block text-[11px] font-bold text-white/70 mb-1">
                  Occasion / Ceremony Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Satyanarayan Puja, Baby Naming, House Blessing"
                  className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-hidden focus:border-purple-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-white/70 mb-1">
                    Ceremony Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-purple-400 [color-scheme:dark]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-white/70 mb-1">
                    Faith Tradition
                  </label>
                  <select
                    value={newReligion}
                    onChange={(e) => setNewReligion(e.target.value as any)}
                    className="w-full bg-[#1A1230] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-purple-400"
                  >
                    <option value="Hinduism">Hinduism</option>
                    <option value="Islam">Islam</option>
                    <option value="Christianity">Christianity</option>
                    <option value="Sikhism">Sikhism</option>
                    <option value="Buddhism">Buddhism</option>
                    <option value="Jainism">Jainism</option>
                    <option value="Judaism">Judaism</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-white/70 mb-1">
                  Participating Family Members
                </label>
                <input
                  type="text"
                  value={newMembers}
                  onChange={(e) => setNewMembers(e.target.value)}
                  placeholder="Rahul, Ananya, Dadi Ma"
                  className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-hidden focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-white/70 mb-1">
                  Primary Task / Preparation Note
                </label>
                <input
                  type="text"
                  value={newReminder}
                  onChange={(e) => setNewReminder(e.target.value)}
                  placeholder="e.g. Order organic hawan herbs, clean puja room"
                  className="w-full bg-white/[0.06] border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-hidden focus:border-purple-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 hover:brightness-110 text-white text-xs font-bold transition-all shadow-lg shadow-purple-600/30 cursor-pointer border border-white/20"
              >
                Save Family Occasion
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
