import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  MapPin,
  Calendar,
  Package,
  Heart,
  Bookmark,
  Crown,
  ShieldCheck,
  Settings as SettingsIcon,
  LogOut,
  ChevronRight,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Clock,
  Trash2,
  Play,
  Award,
  Users,
  Bot,
  BookOpen,
} from 'lucide-react';
import { Booking, OrderItem, Product, Reel, Religion } from '../../types';
import { PRODUCTS, REELS } from '../../data/mockData';
import { DIVINE_THEMES, DivineThemeConfig } from '../../theme/divineThemes';
import { GlowButton } from '../spatial/GlowButton';
import { NivaLogo } from '../NivaLogo';

interface ProfileViewProps {
  userName: string;
  userEmail: string;
  userCity: string;
  bookings: Booking[];
  orders: OrderItem[];
  wishlistIds: string[];
  savedReelIds: string[];
  onOpenSettings: () => void;
  onLogout: () => void;
  onAddToCart: (product: Product) => void;
  onRemoveFromWishlist: (productId: string) => void;
  onOpenNivaFamily?: () => void;
  onOpenNivaGuide?: () => void;
  onNavigateToHolyBooks?: () => void;
  userReligion?: Religion;
  onOpenThemeModal?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userName,
  userEmail,
  userCity,
  bookings,
  orders,
  wishlistIds,
  savedReelIds,
  onOpenSettings,
  onLogout,
  onAddToCart,
  onRemoveFromWishlist,
  onOpenNivaFamily,
  onOpenNivaGuide,
  onNavigateToHolyBooks,
  userReligion = 'All',
  onOpenThemeModal,
}) => {
  const activeTheme: DivineThemeConfig = DIVINE_THEMES[userReligion] || DIVINE_THEMES.All;
  const [activeSection, setActiveSection] = useState<
    'bookings' | 'orders' | 'wishlist' | 'likes' | 'subscription' | 'provider-info'
  >('bookings');

  // Priest onboarding application state
  const [providerAppSubmitted, setProviderAppSubmitted] = useState(false);
  const [priestName, setPriestName] = useState('');
  const [priestTradition, setPriestTradition] = useState('Hinduism');
  const [priestExperience, setPriestExperience] = useState('10+ years');

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  const savedReels = REELS.filter((r) => savedReelIds.includes(r.id));

  const handlePriestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProviderAppSubmitted(true);
    setTimeout(() => {
      setPriestName('');
    }, 1000);
  };

  return (
    <div className="space-y-5 px-1 sm:px-2 pt-2 pb-16">
      {/* 1. VISIONOS GLASS PROFILE HEADER WITH GLOWING AVATAR HALO */}
      <div className="glass-panel p-5 rounded-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.65)] relative overflow-hidden group">
        {/* Soft cosmic glow in background */}
        <div
          className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-35 pointer-events-none"
          style={{ background: activeTheme.accentGlow }}
        />

        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition-opacity"
                style={{ background: activeTheme.accentGlow }}
              />
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="Profile avatar"
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/30 relative z-10 shadow-lg"
              />
              <span className="absolute -bottom-1.5 -right-1.5 z-20 bg-[#07030F] p-1 rounded-full shadow-md border border-white/30 flex items-center justify-center">
                <NivaLogo variant="icon" size={18} withGlow={false} />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold text-white tracking-wide">
                  {userName}
                </h1>
                <span className="bg-white/15 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300/30 shadow-[0_0_8px_rgba(245,158,11,0.25)] flex items-center gap-1">
                  <NivaLogo variant="icon" size={12} withGlow={false} />
                  <span>Seeker</span>
                </span>
              </div>
              <p className="text-xs text-white/60 mt-0.5">{userEmail}</p>
              <div className="flex items-center gap-1.5 text-[11px] text-white/70 mt-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{userCity}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenSettings}
            className="p-2.5 rounded-2xl glass-pill bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white transition-all shadow-md cursor-pointer"
            title="Account Settings"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-4 gap-2 mt-5 pt-4 border-t border-white/10 text-center relative z-10">
          <div
            onClick={() => setActiveSection('bookings')}
            className="p-2 rounded-2xl bg-white/[0.04] hover:bg-white/[0.12] border border-white/10 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <div className="text-base font-black text-white">{bookings.length}</div>
            <div className="text-[10px] font-semibold text-white/60">Bookings</div>
          </div>
          <div
            onClick={() => setActiveSection('orders')}
            className="p-2 rounded-2xl bg-white/[0.04] hover:bg-white/[0.12] border border-white/10 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <div className="text-base font-black text-white">{orders.length}</div>
            <div className="text-[10px] font-semibold text-white/60">Orders</div>
          </div>
          <div
            onClick={() => setActiveSection('wishlist')}
            className="p-2 rounded-2xl bg-white/[0.04] hover:bg-white/[0.12] border border-white/10 cursor-pointer transition-all hover:scale-[1.02]"
          >
            <div className="text-base font-black text-white">{wishlistIds.length}</div>
            <div className="text-[10px] font-semibold text-white/60">Wishlist</div>
          </div>
          <div className="p-2 rounded-2xl bg-gradient-to-br from-amber-500/20 to-purple-500/20 border border-amber-400/30 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
            <div className="text-base font-black text-amber-200">450</div>
            <div className="text-[10px] font-bold">Karma Pts</div>
          </div>
        </div>
      </div>

      {/* 2. SPIRITUAL TRADITION & DIVINE THEME CARD */}
      <div className="glass-card p-4 rounded-3xl border border-white/15 shadow-xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-3.5 min-w-0 pr-2">
          <div
            className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl shrink-0 shadow-[0_0_16px_rgba(255,255,255,0.15)]"
            style={{ textShadow: `0 0 12px ${activeTheme.accentGlow}` }}
          >
            {activeTheme.symbol}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-black text-white truncate">
                {activeTheme.themeTitle}
              </h3>
              <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/30 shrink-0">
                Active Theme
              </span>
            </div>
            <p className="text-[11px] text-white/65 mt-0.5 line-clamp-1">
              {activeTheme.tagline}
            </p>
            <p className="text-[10px] font-serif italic text-amber-200/80 mt-0.5 truncate">
              “{activeTheme.scriptureText}”
            </p>
          </div>
        </div>

        {onOpenThemeModal && (
          <button
            onClick={onOpenThemeModal}
            className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-bold text-xs rounded-xl shadow-[0_0_14px_rgba(168,85,247,0.4)] border border-white/20 transition-all active:scale-95 shrink-0 cursor-pointer"
          >
            Change Theme
          </button>
        )}
      </div>

      {/* NIVA Family, Holy Books & AI Guide Quick Launchers */}
      <div className="grid grid-cols-3 gap-2.5">
        <div
          onClick={onNavigateToHolyBooks}
          className="p-3 glass-card rounded-2xl border border-white/15 hover:border-purple-400/50 hover:bg-white/[0.12] cursor-pointer transition-all shadow-md group flex flex-col justify-between"
        >
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-[0_0_12px_rgba(168,85,247,0.3)]">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-white leading-tight">
              Holy Books
            </div>
            <p className="text-[9px] text-white/55 mt-0.5 leading-snug line-clamp-2">
              7 Faiths sacred texts & chants
            </p>
          </div>
        </div>

        <div
          onClick={onOpenNivaFamily}
          className="p-3 glass-card rounded-2xl border border-white/15 hover:border-amber-400/50 hover:bg-white/[0.12] cursor-pointer transition-all shadow-md group flex flex-col justify-between"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-[0_0_12px_rgba(245,158,11,0.3)]">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-white leading-tight">
              NIVA Family
            </div>
            <p className="text-[9px] text-white/55 mt-0.5 leading-snug line-clamp-2">
              Joint rituals & ceremony prep
            </p>
          </div>
        </div>

        <div
          onClick={onOpenNivaGuide}
          className="p-3 glass-card rounded-2xl border border-white/15 hover:border-pink-400/50 hover:bg-white/[0.12] cursor-pointer transition-all shadow-md group flex flex-col justify-between"
        >
          <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-300 border border-pink-400/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-[0_0_12px_rgba(236,72,153,0.3)]">
            <NivaLogo variant="icon" size={20} withGlow={false} />
          </div>
          <div>
            <div className="text-[11px] font-bold text-white leading-tight">
              NIVA Guide
            </div>
            <p className="text-[9px] text-white/55 mt-0.5 leading-snug line-clamp-2">
              AI ritual & muhurat advisor
            </p>
          </div>
        </div>
      </div>

      {/* 2. SECTION SELECTOR TABS */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {[
          { id: 'bookings' as const, label: 'My Bookings', icon: Calendar, count: bookings.length },
          { id: 'orders' as const, label: 'My Orders', icon: Package, count: orders.length },
          { id: 'wishlist' as const, label: 'Wishlist', icon: Heart, count: wishlistIds.length },
          { id: 'likes' as const, label: 'Likes & Saved', icon: Bookmark, count: savedReelIds.length },
          { id: 'subscription' as const, label: 'Soul Club', icon: Crown },
          { id: 'provider-info' as const, label: 'Priest Portal', icon: ShieldCheck },
        ].map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-white/30'
                  : 'bg-white/[0.07] border border-white/12 text-white/70 hover:bg-white/[0.14] hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{sec.label}</span>
              {typeof sec.count === 'number' && sec.count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-black/30 text-white' : 'bg-white/15 text-white/80'
                  }`}
                >
                  {sec.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. ACTIVE SECTION CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {/* SECTION: MY BOOKINGS */}
          {activeSection === 'bookings' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-white">
                  Ceremonies & Priest Bookings
                </h2>
                <span className="text-[11px] text-white/50 font-medium">
                  {bookings.length} reservations
                </span>
              </div>

              {bookings.length === 0 ? (
                <div className="glass-card p-8 rounded-3xl border border-white/15 text-center space-y-2">
                  <Calendar className="w-8 h-8 text-white/30 mx-auto" />
                  <h4 className="text-xs font-bold text-white/80">No active ceremony bookings</h4>
                  <p className="text-[11px] text-white/50">
                    Schedule your next home blessing, wedding, or puja ritual.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="glass-card p-4 rounded-3xl border border-white/15 shadow-lg space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-white/40 font-mono block">
                            REF: {booking.id}
                          </span>
                          <h3 className="text-sm font-bold text-white mt-0.5">
                            {booking.serviceTitle}
                          </h3>
                          <p className="text-[11px] text-amber-300 font-medium">
                            {booking.packageName}
                          </p>
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            booking.status === 'Confirmed'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                              : booking.status === 'Completed'
                              ? 'bg-white/10 text-white/70 border-white/20'
                              : 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                          }`}
                        >
                          ● {booking.status}
                        </span>
                      </div>

                      {/* Provider Info */}
                      <div className="flex items-center gap-3 p-2.5 bg-white/[0.05] rounded-2xl border border-white/10">
                        <img
                          src={booking.providerPhoto}
                          alt={booking.providerName}
                          className="w-10 h-10 rounded-xl object-cover shrink-0 ring-1 ring-white/20"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-white truncate">
                            {booking.providerName}
                          </div>
                          <div className="text-[10px] text-white/50 truncate">
                            {booking.providerTitle} • {booking.religion}
                          </div>
                        </div>
                      </div>

                      {/* Timing & Venue */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-white/[0.04] p-2.5 rounded-xl border border-white/10">
                          <span className="text-[10px] text-white/50 font-medium block">
                            Scheduled Time
                          </span>
                          <span className="font-bold text-white mt-0.5 block truncate">
                            {booking.date}
                          </span>
                          <span className="text-[10px] text-amber-300 block truncate">
                            {booking.timeSlot}
                          </span>
                        </div>

                        <div className="bg-white/[0.04] p-2.5 rounded-xl border border-white/10">
                          <span className="text-[10px] text-white/50 font-medium block">
                            Format & Venue
                          </span>
                          <span className="font-bold text-white mt-0.5 block truncate">
                            {booking.locationType}
                          </span>
                          <span className="text-[10px] text-white/70 block truncate">
                            {booking.address}
                          </span>
                        </div>
                      </div>

                      {/* Footer itemization */}
                      <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-white/50">Total Dakshina</span>
                          <div className="text-xs font-extrabold text-amber-300">
                            ${booking.totalPrice}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button className="px-2.5 py-1 text-[11px] font-semibold text-white/80 hover:bg-white/15 rounded-lg border border-white/15 cursor-pointer">
                            Samagri List
                          </button>
                          <button className="px-2.5 py-1 text-[11px] font-semibold text-amber-300 hover:bg-amber-500/20 rounded-lg border border-amber-400/30 cursor-pointer">
                            Reschedule
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION: MY ORDERS */}
          {activeSection === 'orders' && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-white">
                Sacred Products & Ceremony Kits
              </h2>

              {orders.length === 0 ? (
                <div className="glass-card p-8 rounded-3xl border border-white/15 text-center space-y-2">
                  <Package className="w-8 h-8 text-white/30 mx-auto" />
                  <h4 className="text-xs font-bold text-white/80">No orders placed yet</h4>
                  <p className="text-[11px] text-white/50">
                    Explore ceremony kits, hawan samagri, and sacred brassware in the shop.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="glass-card p-4 rounded-3xl border border-white/15 shadow-lg space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <div>
                          <span className="text-xs font-bold text-white">
                            {order.orderNumber}
                          </span>
                          <span className="text-[10px] text-white/40 block">
                            Placed on {order.date}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                          ✓ {order.status}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2.5">
                            <img
                              src={item.image}
                              alt={item.productName}
                              className="w-10 h-10 rounded-lg object-cover ring-1 ring-white/15"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-medium text-white truncate">
                                {item.productName}
                              </h4>
                              <span className="text-[10px] text-white/50">
                                Qty: {item.quantity} • ${item.price} each
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="text-white/50 font-medium">Total Paid:</span>
                        <span className="font-bold text-amber-300">${order.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION: WISHLIST */}
          {activeSection === 'wishlist' && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-white">
                Saved Ceremony Essentials ({wishlistedProducts.length})
              </h2>

              {wishlistedProducts.length === 0 ? (
                <div className="glass-card p-8 rounded-3xl border border-white/15 text-center space-y-2">
                  <Heart className="w-8 h-8 text-white/30 mx-auto" />
                  <h4 className="text-xs font-bold text-white/80">Your wishlist is empty</h4>
                  <p className="text-[11px] text-white/50">
                    Tap the heart icon on products to save them for upcoming rituals.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {wishlistedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center gap-3 p-3 glass-card rounded-2xl border border-white/15 shadow-md"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 ring-1 ring-white/20"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-bold text-white truncate">
                          {p.name}
                        </h3>
                        <div className="text-xs font-extrabold text-amber-300 mt-0.5">
                          ${p.price}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => onAddToCart(p)}
                          className="px-2.5 py-1.5 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-bold text-xs rounded-xl shadow-md border border-white/20 cursor-pointer"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => onRemoveFromWishlist(p.id)}
                          className="p-1.5 text-white/40 hover:text-rose-400 rounded-lg cursor-pointer transition-colors"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION: LIKES & SAVED REELS */}
          {activeSection === 'likes' && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-white">
                Bookmarked Spiritual Reels & Wisdom ({savedReels.length})
              </h2>

              {savedReels.length === 0 ? (
                <div className="glass-card p-8 rounded-3xl border border-white/15 text-center space-y-2">
                  <Bookmark className="w-8 h-8 text-white/30 mx-auto" />
                  <h4 className="text-xs font-bold text-white/80">No saved reels yet</h4>
                  <p className="text-[11px] text-white/50">
                    Save mantra commentaries and sermons in the Reels tab.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {savedReels.map((reel) => (
                    <div
                      key={reel.id}
                      className="glass-card rounded-2xl border border-white/15 overflow-hidden shadow-md relative group"
                    >
                      <div className="relative h-36">
                        <img
                          src={reel.thumbnail}
                          alt={reel.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                        <span className="absolute top-2 left-2 bg-purple-600/80 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                          {reel.religion}
                        </span>
                        <div className="absolute bottom-2 left-2 right-2 text-white">
                          <h4 className="text-xs font-bold line-clamp-2 leading-tight">
                            {reel.title}
                          </h4>
                          <p className="text-[10px] text-white/60 mt-0.5">
                            {reel.creatorName}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION: SUBSCRIPTION (SOUL CLUB) */}
          {activeSection === 'subscription' && (
            <div className="space-y-4">
              <div className="glass-panel p-5 rounded-3xl text-white shadow-2xl space-y-4 border border-amber-400/30 bg-gradient-to-br from-purple-900/40 via-amber-950/30 to-[#07030F]">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-full border border-amber-400/30">
                      NIVA Soul Club Membership
                    </span>
                    <h3 className="text-lg font-black mt-2 text-white">
                      Spiritual Well-Being & Priority Access
                    </h3>
                    <p className="text-xs text-white/70 mt-1">
                      Elevate your household’s spiritual rhythm with monthly curated kits and consecrated blessings.
                    </p>
                  </div>
                  <Crown className="w-8 h-8 text-amber-300 shrink-0" />
                </div>

                <div className="space-y-2 pt-2 text-xs">
                  {[
                    'Free Monthly Consecrated Prasad & Fragrance Box delivered to your doorstep',
                    'Guaranteed Priority Booking on Auspicious Muhurats & Festivals (Diwali, Eid, etc.)',
                    '15% Flat Discount across all Ceremony Samagri Kits in the NIVA shop',
                    'Unlimited 1-on-1 Astrological & Spiritual Consultations with verified Acharyas',
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                      <span className="text-white/80">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-white/50">Membership Fee</span>
                    <div className="text-base font-black text-amber-300">
                      $14.99 <span className="text-xs font-normal text-white/60">/ month</span>
                    </div>
                  </div>

                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-extrabold text-xs rounded-xl shadow-lg border border-white/20 active:scale-95 transition-all cursor-pointer">
                    Join Soul Club
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: PRIEST / SERVICE PROVIDER ONBOARDING */}
          {activeSection === 'provider-info' && (
            <div className="space-y-4">
              <div className="glass-card p-4 rounded-3xl border border-white/15 shadow-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-white text-sm">
                    Join NIVA as a Verified Religious Officiant
                  </h3>
                </div>

                <p className="text-xs text-white/70 leading-relaxed">
                  NIVA empowers priests, imams, pastors, granthis, monks, and rabbis to connect directly with devout families in their city or globally over video ceremonies.
                </p>

                <div className="bg-white/[0.04] p-3 rounded-2xl border border-white/10 space-y-2 text-xs">
                  <h4 className="font-bold text-amber-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    Our Rigorous Verification Standards:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-white/70 text-[11px]">
                    <li>Proof of traditional Gurukul / Seminarian / Madrasa / Yeshiva accreditation</li>
                    <li>Minimum 5 years of verified ceremonial officiation experience</li>
                    <li>Comprehensive identity verification and criminal record check</li>
                    <li>Strict adherence to transparent pricing and sacred etiquette</li>
                  </ul>
                </div>

                {providerAppSubmitted ? (
                  <div className="p-4 bg-emerald-500/20 rounded-2xl border border-emerald-400/30 text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-300 mx-auto" />
                    <h4 className="text-xs font-bold text-emerald-200">Application Received</h4>
                    <p className="text-[11px] text-emerald-300/80">
                      Our clergy verification committee will review your credentials and contact you within 48 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handlePriestSubmit} className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-white">
                      Quick Registration Form:
                    </h4>

                    <div>
                      <label className="text-[11px] font-semibold text-white/70 block mb-1">
                        Your Name & Title
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Pandit Satish Sharma or Pastor Mark"
                        value={priestName}
                        onChange={(e) => setPriestName(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white/[0.06] border border-white/15 rounded-xl text-white placeholder-white/40 outline-none focus:border-amber-400/60"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-semibold text-white/70 block mb-1">
                          Tradition / Faith
                        </label>
                        <select
                          value={priestTradition}
                          onChange={(e) => setPriestTradition(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-[#1A1230] border border-white/15 rounded-xl text-white outline-none focus:border-amber-400/60"
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

                      <div>
                        <label className="text-[11px] font-semibold text-white/70 block mb-1">
                          Experience
                        </label>
                        <select
                          value={priestExperience}
                          onChange={(e) => setPriestExperience(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-[#1A1230] border border-white/15 rounded-xl text-white outline-none focus:border-amber-400/60"
                        >
                          <option value="5-10 years">5 - 10 years</option>
                          <option value="10-15 years">10 - 15 years</option>
                          <option value="15+ years">15+ years</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-bold text-xs rounded-xl shadow-md border border-white/20 transition-all cursor-pointer"
                    >
                      Submit Credential Portfolio
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* 4. SETTINGS & LOGOUT ACTIONS */}
      <div className="glass-panel rounded-3xl border border-white/15 p-2 space-y-1 shadow-lg">
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-white/[0.08] text-white text-left transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/10 text-white/80 flex items-center justify-center border border-white/15">
              <SettingsIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">App Settings & Languages</div>
              <div className="text-[10px] text-white/50">
                Preferences, Muhurat notifications & faith focus
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-white/40" />
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-rose-500/15 text-rose-300 text-left transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center border border-rose-400/30">
              <LogOut className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-rose-200">Logout from NIVA</div>
              <div className="text-[10px] text-rose-300/70">
                Sign out of this session
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-rose-400/60" />
        </button>
      </div>
    </div>
  );
};
