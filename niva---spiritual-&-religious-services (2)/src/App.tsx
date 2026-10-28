import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TabType,
  BottomNav,
  MobileBottomDock,
} from './components/BottomNav';
import { TopBar } from './components/TopBar';
import { HamburgerMenu } from './components/HamburgerMenu';
import { BookingModal } from './components/BookingModal';
import { CartDrawer } from './components/CartDrawer';
import { SpotifyMiniPlayer } from './components/SpotifyMiniPlayer';
import { SpotifyNowPlayingModal } from './components/SpotifyNowPlayingModal';
import { LocationModal } from './components/modals/LocationModal';
import { NotificationModal } from './components/modals/NotificationModal';
import { CustomerCareModal } from './components/modals/CustomerCareModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { ReviewsModal } from './components/modals/ReviewsModal';
import { AuthModal } from './components/modals/AuthModal';
import { TermsModal } from './components/modals/TermsModal';
import { NivaGuideModal } from './components/modals/NivaGuideModal';
import { NivaFamilyModal } from './components/modals/NivaFamilyModal';
import { DivineThemeModal } from './components/modals/DivineThemeModal';
import { LanguageModal } from './components/modals/LanguageModal';
import { OnlinePujaModal } from './components/modals/OnlinePujaModal';
import { LiveStreamDonationModal } from './components/modals/LiveStreamDonationModal';
import { NearbySpiritualPlacesModal } from './components/modals/NearbySpiritualPlacesModal';
import { OpeningReligionPortal } from './components/OpeningReligionPortal';
import { DIVINE_THEMES, DivineThemeConfig } from './theme/divineThemes';
import { SUPPORTED_LANGUAGES } from './utils/translations';
import { EffectsProvider, useEffectsSettings } from './context/EffectsContext';
import { AtmosphereBackground } from './components/spatial/AtmosphereBackground';
import { EffectsToggle } from './components/spatial/EffectsToggle';
import { NivaLogo } from './components/NivaLogo';
import { CosmicSplashScreen } from './components/spatial/CosmicSplashScreen';

// Views
import { HomeView } from './components/views/HomeView';
import { CalendarView } from './components/views/CalendarView';
import { MusicView } from './components/views/MusicView';
import { HolyBooksView } from './components/views/HolyBooksView';
import { ShopView } from './components/views/ShopView';
import { ReelsView } from './components/views/ReelsView';
import { ProfileView } from './components/views/ProfileView';

// Types & Data
import {
  Booking,
  CartItem,
  OrderItem,
  Product,
  ServiceItem,
  ServiceProvider,
  CalendarEvent,
  UserNotification,
  MusicTrack,
  MusicPlaylist,
  Religion,
  AppLanguage,
} from './types';
import {
  INITIAL_BOOKINGS,
  INITIAL_ORDERS,
  INITIAL_NOTIFICATIONS,
  PRODUCTS,
} from './data/mockData';
import { SACRED_TRACKS, SACRED_PLAYLISTS } from './data/musicData';
import { audioEngine } from './utils/audioEngine';
import { Sparkles, Bot, Globe } from 'lucide-react';

function AppContent() {
  // Navigation
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // User details & Location & Spiritual Faith Theme
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userReligion, setUserReligion] = useState<Religion>('Hinduism');
  const [userName, setUserName] = useState('Rohan Sharma');
  const [userEmail, setUserEmail] = useState('rohan.sharma@niva.faith');
  const [currentCity, setCurrentCity] = useState('Mumbai, 🇮🇳');
  const [isDivineThemeOpen, setIsDivineThemeOpen] = useState(false);

  // Local Language State (All Religions)
  const [currentLanguage, setCurrentLanguage] = useState<AppLanguage>('en');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  // Online Puja & Live Stream Donations Modal State
  const [isOnlinePujaOpen, setIsOnlinePujaOpen] = useState(false);
  const [isLiveDonationsOpen, setIsLiveDonationsOpen] = useState(false);

  // Nearby Mandirs & Sacred Places Explorer State
  const [isNearbyPlacesOpen, setIsNearbyPlacesOpen] = useState(false);

  // Opening Page / Religion Selection Portal State with Top-Descent Animation
  const [showOpeningPortal, setShowOpeningPortal] = useState<boolean>(true);

  const activeThemeConfig: DivineThemeConfig = DIVINE_THEMES[userReligion] || DIVINE_THEMES.All;

  const handlePortalSelectReligion = (rel: Religion) => {
    setUserReligion(rel);
    const theme = DIVINE_THEMES[rel];
    if (theme.sampleUserName) setUserName(theme.sampleUserName);
    if (theme.sampleUserEmail) setUserEmail(theme.sampleUserEmail);
    setShowOpeningPortal(false);
    audioEngine.ringTempleBell();
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `Sanctuary Consecrated: ${theme.themeTitle}`,
        message: `Your experience is personalized with ${theme.symbol} ${theme.name}.`,
        time: 'Just now',
        unread: true,
        type: 'theme',
      },
      ...prev,
    ]);
  };

  // Core App State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 },
  ]);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [notifications, setNotifications] = useState<UserNotification[]>(
    INITIAL_NOTIFICATIONS
  );
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-1', 'prod-4']);
  const [savedReelIds, setSavedReelIds] = useState<string[]>(['reel-1', 'reel-4']);

  // Modals state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCustomerCareOpen, setIsCustomerCareOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [guideTopic, setGuideTopic] = useState('');
  const [isFamilyOpen, setIsFamilyOpen] = useState(false);

  // Sync data-faith to document root for real-time CSS variable updates
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-faith', userReligion.toLowerCase());
    }
  }, [userReligion]);

  // Pre-selected for booking wizard
  const [initialBookingService, setInitialBookingService] =
    useState<ServiceItem | null>(null);
  const [initialBookingProvider, setInitialBookingProvider] =
    useState<ServiceProvider | null>(null);

  // Spotify-style Sacred Music State
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(SACRED_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSeconds, setPlaybackSeconds] = useState(0);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [likedTrackIds, setLikedTrackIds] = useState<string[]>(['track-1', 'track-5']);
  const [playlistQueue, setPlaylistQueue] = useState<MusicTrack[]>(SACRED_TRACKS);

  // Music Playback Handlers
  const handlePlayTrack = (track: MusicTrack) => {
    setCurrentTrack(track);
    setPlaybackSeconds(0);
    setIsPlaying(true);
    audioEngine.play(track.soundPreset);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      audioEngine.stop();
    } else {
      setIsPlaying(true);
      if (currentTrack) {
        audioEngine.play(currentTrack.soundPreset);
      } else {
        const defaultTrack = SACRED_TRACKS[0];
        setCurrentTrack(defaultTrack);
        audioEngine.play(defaultTrack.soundPreset);
      }
    }
  };

  const handlePreviousTrack = () => {
    if (!currentTrack) return;
    const currentIndex = playlistQueue.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : playlistQueue.length - 1;
    const prevTrack = playlistQueue[prevIndex] || SACRED_TRACKS[0];
    handlePlayTrack(prevTrack);
  };

  const handleNextTrack = () => {
    if (!currentTrack) return;
    const currentIndex = playlistQueue.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % playlistQueue.length;
    const nextTrack = playlistQueue[nextIndex] || SACRED_TRACKS[0];
    handlePlayTrack(nextTrack);
  };

  const handleSeek = (seconds: number) => {
    setPlaybackSeconds(seconds);
  };

  const handleToggleLikeTrack = (trackId: string) => {
    setLikedTrackIds((prev) =>
      prev.includes(trackId)
        ? prev.filter((id) => id !== trackId)
        : [...prev, trackId]
    );
  };

  const handleSelectPlaylist = (playlist: MusicPlaylist) => {
    const tracks = SACRED_TRACKS.filter((t) => playlist.trackIds.includes(t.id));
    if (tracks.length > 0) {
      setPlaylistQueue(tracks);
      handlePlayTrack(tracks[0]);
    }
  };

  // Real-time playback ticking effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setPlaybackSeconds((prev) => {
          if (prev >= currentTrack.duration) {
            handleNextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentTrack, playlistQueue]);

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCheckoutSuccess = (newOrder: OrderItem) => {
    setOrders((prev) => [newOrder, ...prev]);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `Order ${newOrder.orderNumber} Confirmed`,
        message:
          'Your sacred ceremony essentials are being prepared with traditional sanctity.',
        time: 'Just now',
        unread: true,
        type: 'order',
      },
      ...prev,
    ]);
  };

  // Booking Handlers
  const handleStartBooking = (
    service?: ServiceItem,
    provider?: ServiceProvider
  ) => {
    setInitialBookingService(service || null);
    setInitialBookingProvider(provider || null);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `Ceremony Booked with ${newBooking.providerName}`,
        message: `${newBooking.serviceTitle} confirmed for ${newBooking.date}. Reference ID: ${newBooking.id}`,
        time: 'Just now',
        unread: true,
        type: 'booking',
      },
      ...prev,
    ]);
  };

  // Calendar Event to Booking handler
  const handleBookCeremonyForEvent = (event: CalendarEvent, provider?: ServiceProvider) => {
    setInitialBookingService({
      id: `evt-srv-${event.id}`,
      title: `${event.title} Special Ceremony`,
      category: 'Festival Services',
      religion: provider ? provider.religion : event.religion,
      shortDesc: event.description,
      duration: '2 - 3 Hours',
      startingPrice: provider ? provider.startingPrice : 120,
      image:
        'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80',
    });
    setInitialBookingProvider(provider || null);
    setIsBookingOpen(true);
  };

  const handleAddCalendarReminder = (event: CalendarEvent) => {
    const ritualsText = (event.recommendedRituals || event.howToCelebrate || ['Sacred prayers & meditation']).slice(0, 3).join(', ');
    setNotifications((prev) => [
      {
        id: `notif-cal-${Date.now()}`,
        title: `Reminder: ${event.title}`,
        message: `Observance reminder set for ${event.date}. Auspicious observances: ${ritualsText}`,
        time: 'Just now',
        unread: true,
        type: 'occasion',
      },
      ...prev,
    ]);
  };

  // Wishlist and Saved Reels
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleBookmarkReel = (reelId: string) => {
    setSavedReelIds((prev) =>
      prev.includes(reelId)
        ? prev.filter((id) => id !== reelId)
        : [...prev, reelId]
    );
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('Guest Devotee');
    setUserEmail('guest@niva.faith');
  };

  const handleLoginSuccess = (name: string, email: string, religion: Religion = 'Islam') => {
    setIsLoggedIn(true);
    setUserName(name);
    setUserEmail(email);
    setUserReligion(religion);
    const theme = DIVINE_THEMES[religion] || DIVINE_THEMES.All;
    setNotifications((prev) => [
      {
        id: `notif-welcome-${Date.now()}`,
        title: `${theme.greetingTitle}!`,
        message: `Your sacred ecosystem has been personalized for ${theme.themeTitle}. Clergy, scriptures, and holy chants are now attuned to ${religion}.`,
        time: 'Just now',
        unread: true,
        type: 'general',
      },
      ...prev,
    ]);
  };

  const handleSelectDivineTheme = (religion: Religion) => {
    setUserReligion(religion);
    const theme = DIVINE_THEMES[religion] || DIVINE_THEMES.All;
    setNotifications((prev) => [
      {
        id: `notif-theme-${Date.now()}`,
        title: `Interface: ${theme.themeTitle}`,
        message: `Custom interface loaded with ${theme.name}. Divine blessings and clergy reflect your faith.`,
        time: 'Just now',
        unread: true,
        type: 'theme',
      },
      ...prev,
    ]);
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const unreadNotificationsCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="h-[100dvh] w-full flex flex-col overflow-hidden text-white font-sans relative selection:bg-purple-600 selection:text-white">
      {/* 1. Immersive Multi-Layer Nature & Celestial Atmosphere Background */}
      <AtmosphereBackground currentReligion={userReligion} />

      {/* 1.1 Cosmic Loading / Splash Attunement Screen */}
      <CosmicSplashScreen accentColor={activeThemeConfig.accentGlow} />

      {/* 3. Top Spatial Control Bar */}
      <div className="w-full shrink-0 relative z-50 bg-[#07030F]/60 backdrop-blur-md text-white/90 py-1.5 px-3 sm:px-6 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B] shrink-0" />
          <span className="font-semibold text-[11px] text-white flex items-center gap-1 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            NIVA Sacred Cosmos • Spatial visionOS Glass
          </span>
        </div>

        {/* Quick Faith Theme Switcher Pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 max-w-full">
          <span className="text-[10px] text-white/60 font-semibold shrink-0 hidden md:inline">
            Faith Focus:
          </span>
          {(['Islam', 'Hinduism', 'Christianity', 'Sikhism', 'Buddhism', 'Jainism', 'Judaism', 'All'] as Religion[]).map((rel) => {
            const isCur = userReligion === rel;
            const t = DIVINE_THEMES[rel];
            return (
              <button
                key={rel}
                onClick={() => handleSelectDivineTheme(rel)}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 transition-all flex items-center gap-1 cursor-pointer ${
                  isCur
                    ? 'bg-gradient-to-r from-purple-500 to-amber-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)] border border-white/40'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/10'
                }`}
                title={`Switch to ${t.themeTitle}`}
              >
                <span>{t.symbol}</span>
                <span>{rel === 'All' ? 'Universal' : rel}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <EffectsToggle />

        </div>
      </div>

      {/* 4. Main Spatial Floating Sanctum Container */}
      <div className="w-full flex-1 min-h-0 flex relative z-10 overflow-hidden">
        {/* LEFT SIDEBAR NAV (desktop) */}
        <BottomNav
          activeTab={activeTab}
          onChangeTab={(tab) => setActiveTab(tab)}
          cartCount={totalCartCount}
          isMusicPlaying={isPlaying}
          currentReligion={userReligion}
        />

        <div className="flex-1 min-w-0 h-full relative flex flex-col overflow-hidden">
          {/* TOP BAR */}
          <div className="shrink-0">
            <TopBar
              currentCity={currentCity}
              onOpenMenu={() => setIsMenuOpen(true)}
              onOpenLocation={() => setIsLocationOpen(true)}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
              onOpenCart={() => setIsCartOpen(true)}
              cartCount={totalCartCount}
              unreadNotificationsCount={unreadNotificationsCount}
              currentReligion={userReligion}
              onOpenThemeModal={() => setIsDivineThemeOpen(true)}
              currentLanguage={currentLanguage}
              onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
              onOpenOpeningPortal={() => setShowOpeningPortal(true)}
              onOpenNearbyPlaces={() => setIsNearbyPlacesOpen(true)}
            />
          </div>

          {/* ACTIVE MAIN VIEW WITH VISIONOS WINDOW TRANSITION */}
          <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 sm:px-6 lg:px-8 xl:px-10 py-4 overscroll-contain pb-28 sm:pb-36">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.985, filter: 'blur(6px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.985, filter: 'blur(4px)' }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="pb-8 w-full max-w-[1400px] mx-auto"
              >
                {activeTab === 'home' && (
                  <HomeView
                    onStartBooking={handleStartBooking}
                    onAddToCart={handleAddToCart}
                    onGoToTab={(tab) => setActiveTab(tab)}
                    wishlistIds={wishlistIds}
                    onToggleWishlist={handleToggleWishlist}
                    onPlayTrack={handlePlayTrack}
                    onOpenNivaGuide={() => {
                      setGuideTopic('');
                      setIsGuideOpen(true);
                    }}
                    onOpenNivaFamily={() => setIsFamilyOpen(true)}
                    userReligion={userReligion}
                    userName={userName}
                    onOpenThemeModal={() => setIsDivineThemeOpen(true)}
                    onOpenOnlinePuja={() => setIsOnlinePujaOpen(true)}
                    onOpenLiveDonations={() => setIsLiveDonationsOpen(true)}
                    onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
                    currentLanguage={currentLanguage}
                    onOpenNearbyPlaces={() => setIsNearbyPlacesOpen(true)}
                  />
                )}

                {activeTab === 'calendar' && (
                  <CalendarView
                    currentReligion={userReligion}
                    themeConfig={activeThemeConfig}
                    onBookCeremonyForEvent={handleBookCeremonyForEvent}
                    onAddReminder={handleAddCalendarReminder}
                    onAddToCart={handleAddToCart}
                    onGoToShop={() => setActiveTab('shop')}
                    onPlayPlaylist={(playlistId) => {
                      const pl = SACRED_PLAYLISTS.find((p) => p.id === playlistId);
                      if (pl) {
                        handleSelectPlaylist(pl);
                      }
                    }}
                    onOpenNivaGuide={(topic) => {
                      setGuideTopic(topic || '');
                      setIsGuideOpen(true);
                    }}
                    onSelectReligion={(rel) => setUserReligion(rel)}
                  />
                )}

                {activeTab === 'music' && (
                  <MusicView
                    currentTrack={currentTrack}
                    isPlaying={isPlaying}
                    onPlayTrack={handlePlayTrack}
                    onTogglePlay={handleTogglePlay}
                    likedTrackIds={likedTrackIds}
                    onToggleLike={handleToggleLikeTrack}
                    onSelectPlaylist={handleSelectPlaylist}
                    onNavigateToBooks={() => setActiveTab('books')}
                  />
                )}

                {activeTab === 'books' && (
                  <HolyBooksView
                    onOpenNivaGuide={(topic) => {
                      setGuideTopic(topic || 'Sacred Scriptures');
                      setIsGuideOpen(true);
                    }}
                    onPlayPlaylist={(playlistId) => {
                      const pl = SACRED_PLAYLISTS.find((p) => p.id === playlistId);
                      if (pl) {
                        handleSelectPlaylist(pl);
                      }
                    }}
                    onGoToTab={(tab) => setActiveTab(tab)}
                  />
                )}

                {activeTab === 'shop' && (
                  <ShopView
                    onAddToCart={handleAddToCart}
                    onOpenCart={() => setIsCartOpen(true)}
                    cartCount={totalCartCount}
                    wishlistIds={wishlistIds}
                    onToggleWishlist={handleToggleWishlist}
                  />
                )}

                {activeTab === 'reels' && (
                  <ReelsView
                    onBookmarkReel={handleBookmarkReel}
                    savedReelIds={savedReelIds}
                  />
                )}

                {activeTab === 'profile' && (
                  <ProfileView
                    userName={userName}
                    userEmail={userEmail}
                    userCity={currentCity}
                    bookings={bookings}
                    orders={orders}
                    wishlistIds={wishlistIds}
                    savedReelIds={savedReelIds}
                    onOpenSettings={() => setIsSettingsOpen(true)}
                    onLogout={handleLogout}
                    onAddToCart={handleAddToCart}
                    onRemoveFromWishlist={handleToggleWishlist}
                    onOpenNivaFamily={() => setIsFamilyOpen(true)}
                    onOpenNivaGuide={() => {
                      setGuideTopic('');
                      setIsGuideOpen(true);
                    }}
                    onNavigateToHolyBooks={() => setActiveTab('books')}
                    userReligion={userReligion}
                    onOpenThemeModal={() => setIsDivineThemeOpen(true)}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* SPOTIFY DOCKED FLOATING MINI PLAYER */}
          <SpotifyMiniPlayer
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            playbackProgress={
              currentTrack
                ? (playbackSeconds / currentTrack.duration) * 100
                : 0
            }
            onTogglePlay={handleTogglePlay}
            onNextTrack={handleNextTrack}
            onOpenFullPlayer={() => setIsPlayerModalOpen(true)}
            isLiked={Boolean(currentTrack && likedTrackIds.includes(currentTrack.id))}
            onToggleLike={handleToggleLikeTrack}
          />

          {/* Floating NIVA Personal Guide Capsule */}
          <div
            className="absolute right-4 lg:right-10 z-30 pointer-events-auto transition-all duration-300"
            style={{
              bottom: currentTrack
                ? 'clamp(110px, 14vw, 130px)'
                : 'clamp(64px, 10vw, 76px)',
            }}
          >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setGuideTopic('');
                  setIsGuideOpen(true);
                }}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full glass-panel-elevated bg-white/10 hover:bg-white/20 border border-white/25 shadow-[0_12px_32px_rgba(0,0,0,0.6)] cursor-pointer group"
                title="Consult NIVA Guide"
              >
                <NivaLogo
                  variant="icon"
                  size={24}
                  glowColor={activeThemeConfig.accentGlow}
                  withGlow={true}
                  animated={true}
                  showStarTwinkle={true}
                />
                <span className="text-xs font-bold tracking-wide text-white group-hover:text-amber-200 transition-colors">
                  Ask NIVA
                </span>
              </motion.button>
          </div>

          {/* MOBILE VISIONOS FLOATING DOCK (< lg) */}
          <MobileBottomDock
            activeTab={activeTab}
            onChangeTab={(tab) => setActiveTab(tab)}
            cartCount={totalCartCount}
            isMusicPlaying={isPlaying}
            currentReligion={userReligion}
          />
        </div>
      </div>

      {/* MODALS & DRAWERS */}
      {/* 1. Hamburger Drawer */}
      <HamburgerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isLoggedIn={isLoggedIn}
        userName={userName}
        userEmail={userEmail}
        onNavigateToOrders={() => {
          setActiveTab('profile');
        }}
        onOpenCustomerCare={() => setIsCustomerCareOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenReviews={() => setIsReviewsOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenNivaFamily={() => setIsFamilyOpen(true)}
        onOpenNivaGuide={() => {
          setGuideTopic('');
          setIsGuideOpen(true);
        }}
        onNavigateToHolyBooks={() => setActiveTab('books')}
        currentReligion={userReligion}
        onOpenThemeModal={() => setIsDivineThemeOpen(true)}
        onOpenOnlinePuja={() => setIsOnlinePujaOpen(true)}
        onOpenLiveDonations={() => setIsLiveDonationsOpen(true)}
        onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
        currentLanguage={currentLanguage}
        onOpenOpeningPortal={() => {
          setIsMenuOpen(false);
          setShowOpeningPortal(true);
        }}
        onOpenNearbyPlaces={() => setIsNearbyPlacesOpen(true)}
      />

      {/* 2. 7-Step Booking Flow Wizard */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={initialBookingService}
        initialProvider={initialBookingProvider}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* 3. Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      {/* 4. Location Selector */}
      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        currentCity={currentCity}
        onSelectCity={(city) => setCurrentCity(city)}
      />

      {/* 4.5 Nearby Mandirs & Sacred Shrines Explorer Modal */}
      <NearbySpiritualPlacesModal
        isOpen={isNearbyPlacesOpen}
        onClose={() => setIsNearbyPlacesOpen(false)}
        currentCity={currentCity}
        currentReligion={userReligion}
        onSelectCity={(city) => setCurrentCity(city)}
        onBookAtMandir={(place) => {
          handleStartBooking();
        }}
      />

      {/* 5. Notifications Drawer */}
      <NotificationModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
      />

      {/* 6. Customer Care & Hotline Modal */}
      <CustomerCareModal
        isOpen={isCustomerCareOpen}
        onClose={() => setIsCustomerCareOpen(false)}
      />

      {/* 7. Settings Modal with Visual Effects Control */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentLanguage={currentLanguage}
        onSelectLanguage={setCurrentLanguage}
      />

      {/* 8. Community Reviews Modal */}
      <ReviewsModal
        isOpen={isReviewsOpen}
        onClose={() => setIsReviewsOpen(false)}
      />

      {/* 9. Login/Register Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialReligion={userReligion}
      />

      {/* Divine Theme & Spiritual Faith Custom Interface Modal */}
      <DivineThemeModal
        isOpen={isDivineThemeOpen}
        onClose={() => setIsDivineThemeOpen(false)}
        currentReligion={userReligion}
        onSelectReligion={handleSelectDivineTheme}
        onOpenOpeningPortal={() => setShowOpeningPortal(true)}
      />

      {/* Local Language Selector Modal across All Religions */}
      <LanguageModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        currentLanguage={currentLanguage}
        onSelectLanguage={setCurrentLanguage}
      />

      {/* Live Online Puja & Remote Sankalp Modal */}
      <OnlinePujaModal
        isOpen={isOnlinePujaOpen}
        onClose={() => setIsOnlinePujaOpen(false)}
        currentLanguage={currentLanguage}
        onNotify={(title, msg) => {
          setNotifications((prev) => [
            {
              id: `notif-${Date.now()}`,
              title,
              message: msg,
              time: 'Just now',
              unread: true,
              type: 'booking',
            },
            ...prev,
          ]);
        }}
      />

      {/* Live Stream & NGO Seva Donations Modal */}
      <LiveStreamDonationModal
        isOpen={isLiveDonationsOpen}
        onClose={() => setIsLiveDonationsOpen(false)}
        currentReligion={userReligion}
        onNotify={(title, msg) => {
          setNotifications((prev) => [
            {
              id: `notif-${Date.now()}`,
              title,
              message: msg,
              time: 'Just now',
              unread: true,
              type: 'general',
            },
            ...prev,
          ]);
        }}
      />

      {/* 10. Terms Modal */}
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />

      {/* 11. Spotify Full-Screen Now Playing Modal */}
      <SpotifyNowPlayingModal
        isOpen={isPlayerModalOpen}
        onClose={() => setIsPlayerModalOpen(false)}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        playbackSeconds={playbackSeconds}
        onTogglePlay={handleTogglePlay}
        onPreviousTrack={handlePreviousTrack}
        onNextTrack={handleNextTrack}
        onSeek={handleSeek}
        isLiked={Boolean(currentTrack && likedTrackIds.includes(currentTrack.id))}
        onToggleLike={handleToggleLikeTrack}
        playlistQueue={playlistQueue}
        onSelectQueueTrack={handlePlayTrack}
      />

      {/* 12. NIVA AI Spiritual Guide Modal */}
      <NivaGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        initialTopic={guideTopic}
        currentReligion={userReligion}
        onAddToCart={handleAddToCart}
        onStartBooking={(provider) => {
          handleStartBooking(undefined, provider);
        }}
        onPlayTrack={(track) => {
          handlePlayTrack(track);
        }}
        onNavigateToCalendar={() => {
          setIsGuideOpen(false);
          setActiveTab('calendar');
        }}
      />

      {/* 13. NIVA Family Occasions Modal */}
      <NivaFamilyModal
        isOpen={isFamilyOpen}
        onClose={() => setIsFamilyOpen(false)}
        onStartBooking={(provider) => {
          handleStartBooking(undefined, provider);
        }}
        onGoToShop={() => {
          setIsFamilyOpen(false);
          setActiveTab('shop');
        }}
        onGoToCalendar={() => {
          setIsFamilyOpen(false);
          setActiveTab('calendar');
        }}
      />

      {/* 14. Opening Religion Selection Portal */}
      <OpeningReligionPortal
        isOpen={showOpeningPortal}
        onSelectReligionAndEnter={handlePortalSelectReligion}
        currentLanguage={currentLanguage}
        onChangeLanguage={setCurrentLanguage}
        onClose={() => setShowOpeningPortal(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <EffectsProvider>
      <AppContent />
    </EffectsProvider>
  );
}
