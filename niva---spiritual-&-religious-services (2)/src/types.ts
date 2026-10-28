export type Religion =
  | 'All'
  | 'Hinduism'
  | 'Islam'
  | 'Christianity'
  | 'Sikhism'
  | 'Buddhism'
  | 'Jainism'
  | 'Judaism';

export type ServiceCategory =
  | 'Puja & Rituals'
  | 'Weddings'
  | 'House Blessing'
  | 'Funeral Services'
  | 'Religious Guidance'
  | 'Festival Services';

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  religion: Religion;
  shortDesc: string;
  duration: string;
  startingPrice: number;
  image: string;
  popular?: boolean;
}

export interface ServiceProvider {
  id: string;
  name: string;
  title: string;
  religion: Religion;
  photo: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  languages: string[];
  specialties: string[];
  bio: string;
  startingPrice: number;
  verified: boolean;
  location: string;
  badge?: string;
}

export interface PujaItem {
  id: string;
  name: string;
  hindiOrTraditionalName?: string;
  quantity: string;
  purpose: string;
  category: 'Essentials' | 'Sacred Offerings' | 'Fragrance & Lamps' | 'Vessels & Sacred Cloth';
  inStock?: boolean;
}

export interface OccasionPriestSuggestion {
  religion: Religion;
  providerId: string;
  ceremonyType: string;
  note: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  religion: Religion;
  date: string; // YYYY-MM-DD
  dayNumber: number;
  monthName: string;
  description: string;
  significance: string;
  recommendedRituals?: string[];
  auspiciousTimings?: string;
  // Extended details for date inspection
  storyAndHistory?: string;
  howToCelebrate?: string[];
  fastingAndDiet?: string;
  sacredMantras?: {
    name: string;
    mantra: string;
    translation: string;
  }[];
  pujaItems?: PujaItem[];
  kitProduct?: {
    id: string;
    name: string;
    price: number;
    image: string;
    rating: number;
    reviewsCount: number;
    description: string;
  };
  primaryPanditId?: string;
  otherFaithPriests?: OccasionPriestSuggestion[];
  relatedServiceIds?: string[];
  ceremonyPlaylistId?: string;
  ceremonyPlaylistTitle?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Ceremony Kits' | 'Sacred Idols & Crosses' | 'Holy Books' | 'Incense & Fragrance' | 'Spiritual Gifts';
  religion: Religion;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  inStock: boolean;
  isBestseller?: boolean;
}

export interface ReelComment {
  id: string;
  userName: string;
  userAvatar: string;
  comment: string;
  timeAgo: string;
  likes: number;
}

export interface Reel {
  id: string;
  title: string;
  caption: string;
  creatorName: string;
  creatorAvatar: string;
  religion: Religion;
  videoUrl: string; // Video preview URL or animated canvas
  thumbnail: string;
  audioTitle: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
  comments: ReelComment[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  providerId: string;
  providerName: string;
  providerPhoto: string;
  providerTitle: string;
  religion: Religion;
  date: string;
  timeSlot: string;
  locationType: 'Home' | 'Temple/Venue' | 'Virtual Video';
  address: string;
  packageType: 'Basic' | 'Standard' | 'Grand';
  packageName: string;
  totalPrice: number;
  status: 'Confirmed' | 'Completed' | 'In Progress' | 'Cancelled';
  createdAt: string;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  items: { productName: string; quantity: number; price: number; image: string }[];
  total: number;
  status: 'Delivered' | 'In Transit' | 'Processing';
}

export interface UserNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'booking' | 'occasion' | 'order' | 'general' | 'theme';
}

export type MusicCategoryType =
  | 'Morning Mantras'
  | 'Meditation & Zen'
  | 'Kirtan & Chants'
  | 'Sufi & Qawwali'
  | 'Hymns & Choirs'
  | 'Gurbani'
  | 'Peace & Sleep';

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  religion: Religion;
  album: string;
  category: MusicCategoryType;
  coverArt: string;
  duration: number; // in seconds
  playsCount: number;
  audioFrequency?: string; // e.g. "432 Hz Healing", "Vedic 108", "Ghazal Raga"
  soundPreset: 'tanpura-om' | 'flute-bells' | 'singing-bowl' | 'sufi-drone' | 'choir-chime' | 'gurbani-raag';
  lyricsOriginal: string;
  lyricsTransliteration: string;
  lyricsTranslation: string;
  tags: string[];
}

export interface MusicPlaylist {
  id: string;
  title: string;
  description: string;
  coverArt: string;
  religion: Religion | 'All';
  tracksCount: number;
  trackIds: string[];
  gradient: string;
}

export interface ReviewItem {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  serviceTitle: string;
  providerName: string;
  religion: Religion;
  date: string;
  comment: string;
  verified: boolean;
}

export interface FamilyOccasion {
  id: string;
  title: string;
  date: string;
  dayBadge: string;
  familyMembers: string[];
  religion: Religion;
  preparationStatus: {
    priestBooked: boolean;
    priestName?: string;
    itemsOrdered: boolean;
    itemsCount?: number;
    musicSelected: boolean;
    musicPlaylist?: string;
  };
  reminders: string[];
}

export type AppLanguage =
  | 'en' // English (Universal)
  | 'hi' // Hindi (हिन्दी - Sanatana / Vedic)
  | 'ur' // Urdu (اردو - Islamic South Asian)
  | 'pa' // Punjabi (ਪੰਜਾਬੀ - Sikh Gurmukhi)
  | 'sa' // Sanskrit (संस्कृतम् - Deva Bhasha)
  | 'ta' // Tamil (தமிழ் - Dravidian Hindu & Christian)
  | 'gu' // Gujarati (ગુજરાતી - Jain & Vaishnav)
  | 'bn' // Bengali (বাংলা - Eastern Vedic & Sufi)
  | 'ar' // Arabic (العربية - Islamic Sacred)
  | 'he' // Hebrew (עברית - Jewish Tradition)
  | 'es' // Spanish (Español - Christian Tradition)
  | 'ml'; // Malayalam (മലയാളം - Kerala Traditions)

export interface SacredVerse {
  id: string;
  bookId: string;
  chapterNumber?: number;
  chapterTitle?: string;
  verseNumber: string; // e.g. "Chapter 2, Verse 47", "Surah 1:1-7", "Psalm 23:1-4"
  scriptOriginal: string; // Sanskrit, Arabic, Gurmukhi, Hebrew, Pali, Greek
  transliteration: string; // Pronunciation guide
  translation: string; // English translation
  localTranslations?: Record<string, string>; // Local language translations: hi, ur, pa, ta, gu, bn, ar, he, es, ml, etc.
  commentary: string; // Meaning & spiritual application
  localCommentaries?: Record<string, string>; // Local language commentaries
  audioPreset?: 'tanpura-om' | 'flute-bells' | 'singing-bowl' | 'sufi-drone' | 'choir-chime' | 'gurbani-raag';
  theme: 'Peace' | 'Duty & Courage' | 'Love & Compassion' | 'Wisdom & Truth' | 'Devotion & Faith' | 'Healing & Comfort';
}

// ----------------------------------------------------------------------------
// ONLINE PUJA & VIRTUAL RITUAL SYSTEM
// ----------------------------------------------------------------------------
export interface OnlinePujaItem {
  id: string;
  title: string;
  deityOrTheme: string;
  templeOrShrine: string;
  location: string;
  religion: Religion;
  image: string;
  bannerImage?: string;
  shortDesc: string;
  significance: string;
  benefits: string[];
  startingPrice: number;
  upcomingDate: string;
  auspiciousTithi: string;
  leadPriest: {
    name: string;
    title: string;
    experience: string;
    photo: string;
  };
  duration: string;
  isLiveNow?: boolean;
  liveViewersCount?: number;
  includesPrasad: boolean;
  prasadItems: string[];
  videoCallOption: boolean;
  packages: {
    id: string;
    name: string;
    price: number;
    description: string;
    features: string[];
  }[];
}

export interface OnlinePujaBooking {
  id: string;
  pujaId: string;
  pujaTitle: string;
  templeOrShrine: string;
  deityOrTheme: string;
  devoteeName: string;
  gotra: string;
  familyMembers: string[];
  sankalpWish: string;
  date: string;
  timeSlot: string;
  packageType: string;
  pricePaid: number;
  status: 'Confirmed' | 'Live Today' | 'Completed' | 'Prasad Shipped';
  videoStreamUrl?: string;
  prasadTrackingNumber?: string;
  createdAt: string;
  sankalpRecordingUrl?: string;
}

export interface HolyBookChapter {
  id: string;
  chapterNumber: number;
  titleOriginal: string;
  titleEnglish: string;
  summary: string;
  verses: SacredVerse[];
}

export interface HolyBook {
  id: string;
  title: string;
  nativeTitle: string;
  religion: Religion;
  languageOrigin: string;
  periodOrEra: string;
  coverImage: string;
  description: string;
  spiritualEssence: string;
  chaptersCount: number;
  versesCount: string;
  popularChapters: string[];
  chapters: HolyBookChapter[];
  keyThemes: string[];
  accentColor: string;
  linkedPlaylistId?: string;
}

export interface AudioBookChapter {
  id: string;
  chapterNumber: number;
  title: string;
  duration: number; // in seconds
  narrator: string;
  summary: string;
  soundPreset: 'tanpura-om' | 'flute-bells' | 'singing-bowl' | 'sufi-drone' | 'choir-chime' | 'gurbani-raag';
}

export interface AudioBook {
  id: string;
  title: string;
  nativeTitle: string;
  religion: Religion;
  authorOrSage: string;
  narrator: string;
  coverArt: string;
  totalDuration: string;
  totalChapters: number;
  description: string;
  spiritualTakeaway: string;
  rating: number;
  listensCount: number;
  chapters: AudioBookChapter[];
  tags: string[];
}
