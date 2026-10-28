import { Religion } from '../types';

export interface VerifiedNGO {
  id: string;
  name: string;
  category:
    | 'Annadanam & Langar'
    | 'Gau Seva & Animal Compassion'
    | 'Temple & Shrine Preservation'
    | 'Vedic Vidyalaya & Child Education'
    | 'Elder Care & Medical Relief'
    | 'Interfaith Harmony & Peace';
  religion: Religion;
  logo: string;
  coverImage: string;
  tagline: string;
  description: string;
  location: string;
  registrationNumber: string;
  taxExempt80G: boolean;
  impactMetric: string;
  raisedAmount: number;
  targetAmount: number;
  donorsCount: number;
  upiId: string;
  verifiedTrust: boolean;
  presetAmounts: number[];
  transparencyScore: number; // e.g. 98%
  activeLiveStreamId?: string;
  bankOrTrustName: string;
}

export interface LiveRitualStream {
  id: string;
  title: string;
  shrineOrNgo: string;
  location: string;
  religion: Religion;
  streamType: 'Puja / Aarti' | 'Langar / Annadanam' | 'Gau Seva' | 'Chants / Kirtan';
  thumbnail: string;
  viewersCount: number;
  isLive: boolean;
  startTime: string;
  associatedNgoId?: string;
  audioPreset: 'tanpura-om' | 'flute-bells' | 'singing-bowl' | 'sufi-drone' | 'choir-chime' | 'gurbani-raag';
  recentDonations: { donorName: string; amount: number; timeAgo: string; message?: string }[];
  currentRitualStep: string;
}

export interface UserDonationRecord {
  id: string;
  ngoId: string;
  ngoName: string;
  amount: number;
  date: string;
  cause: string;
  donorName: string;
  donorEmail: string;
  taxReceiptNo: string;
  taxExemptionEligible: boolean;
  paymentMode: 'UPI' | 'Card' | 'NetBanking';
  status: 'Completed';
}

export const VERIFIED_NGOS: VerifiedNGO[] = [
  {
    id: 'ngo-akshaya-annadanam',
    name: 'Sri Venkateshwara Nitya Annadanam & Food Relief',
    category: 'Annadanam & Langar',
    religion: 'Hinduism',
    logo: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    tagline: 'No pilgrim or hungry soul leaves without a warm sanctified meal',
    description: 'Serving hot, nutritious, satvik prasad meals daily to thousands of pilgrims, sadhus, and underprivileged families near temple shrines. 100% of donations directly procure pure grain, vegetables, and ghee.',
    location: 'Tirupati & Varanasi, 🇮🇳',
    registrationNumber: 'TRUST-80G-AACT2981E',
    taxExempt80G: true,
    impactMetric: 'Over 3,50,000 sanctified satvik meals served annually',
    raisedAmount: 1845000,
    targetAmount: 2500000,
    donorsCount: 4210,
    upiId: 'annadanam.seva@oksbi',
    verifiedTrust: true,
    presetAmounts: [251, 501, 1100, 2100, 5100],
    transparencyScore: 99,
    activeLiveStreamId: 'stream-annadanam-live',
    bankOrTrustName: 'Sri Venkateshwara Charitable Food Trust',
  },
  {
    id: 'ngo-vrindavan-gau',
    name: 'Shree Krishna Vrindavan Surabhi Gau Seva Sansthan',
    category: 'Gau Seva & Animal Compassion',
    religion: 'Hinduism',
    logo: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
    tagline: 'Lifetime shelter, nutritious green fodder & veterinary ICU for abandoned Desi cows',
    description: 'Home to over 1,400 abandoned, elderly, and ailing Gomata in the sacred land of Braj Dham. We run a 24-hour ambulance and medical rehabilitation center with daily Gau Aarti.',
    location: 'Vrindavan, Mathura, UP, 🇮🇳',
    registrationNumber: 'GAU-REG-80G-UP7810',
    taxExempt80G: true,
    impactMetric: '1,420 cows protected, fed 8 tons of green fodder daily',
    raisedAmount: 960000,
    targetAmount: 1500000,
    donorsCount: 2890,
    upiId: 'vrindavan.gauseva@icici',
    verifiedTrust: true,
    presetAmounts: [300, 750, 1500, 3100, 7500],
    transparencyScore: 98,
    activeLiveStreamId: 'stream-gauseva-live',
    bankOrTrustName: 'Vrindavan Surabhi Gau Kalyan Trust',
  },
  {
    id: 'ngo-amritsar-langar',
    name: 'Guru Ram Das 24/7 Langar & Community Seva Society',
    category: 'Annadanam & Langar',
    religion: 'Sikhism',
    logo: 'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&w=800&q=80',
    tagline: 'Equality, brotherhood and selfless feeding regardless of caste, creed or faith',
    description: 'Providing round-the-clock free Langar, warm blankets during winter, and emergency disaster relief camps upholding the supreme Sikh value of Vand Chhako (share your blessings).',
    location: 'Amritsar & Delhi, 🇮🇳',
    registrationNumber: 'SEVA-SOCIETY-80G-PB104',
    taxExempt80G: true,
    impactMetric: 'Over 1,00,000 people fed without discrimination every week',
    raisedAmount: 2210000,
    targetAmount: 3000000,
    donorsCount: 5630,
    upiId: 'langarseva.grd@hdfcbank',
    verifiedTrust: true,
    presetAmounts: [250, 500, 1100, 2500, 5000],
    transparencyScore: 99,
    activeLiveStreamId: 'stream-golden-temple-langar',
    bankOrTrustName: 'Guru Ram Das Charitable Langar Foundation',
  },
  {
    id: 'ngo-ganga-preservation',
    name: 'Clean Ganga & Kashi Ancient Ghats Preservation Mission',
    category: 'Temple & Shrine Preservation',
    religion: 'Hinduism',
    logo: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    tagline: 'Restoring sacred stone heritage, ghat cleanliness & solar lighting for pilgrims',
    description: 'Volunteers and dedicated staff working across 84 historic ghats of Varanasi and Haridwar to remove plastic, restore millennia-old temple stonework, and preserve sacred river ecology.',
    location: 'Varanasi & Haridwar, 🇮🇳',
    registrationNumber: 'HERITAGE-80G-VNS902',
    taxExempt80G: true,
    impactMetric: '84 Ghats cleaned daily, 24 ancient shrines renovated',
    raisedAmount: 1420000,
    targetAmount: 2000000,
    donorsCount: 3120,
    upiId: 'gangaseva.kashi@axisbank',
    verifiedTrust: true,
    presetAmounts: [500, 1000, 2100, 5100, 11000],
    transparencyScore: 97,
    bankOrTrustName: 'Ganga Ghat Heritage & Environmental Trust',
  },
  {
    id: 'ngo-ajmer-khwaja-relief',
    name: 'Chishty Foundation Deg Langar & Free Medical Dispensary',
    category: 'Annadanam & Langar',
    religion: 'Islam',
    logo: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
    tagline: 'Love toward all, malice toward none: daily cauldrons of sweet rice & medical care',
    description: 'Continuing the 800-year legacy of Khwaja Moinuddin Chishti by preparing the historic big Deg cauldrons of fragrant rice and distributing free medicines to destitute patients and travelers.',
    location: 'Dargah Bazaar, Ajmer, Rajasthan, 🇮🇳',
    registrationNumber: 'CHISHTY-80G-RAJ441',
    taxExempt80G: true,
    impactMetric: '2,400 kg of sweet saffron rice prepared & distributed every week',
    raisedAmount: 890000,
    targetAmount: 1200000,
    donorsCount: 1980,
    upiId: 'deglangar.ajmer@paytm',
    verifiedTrust: true,
    presetAmounts: [300, 786, 1500, 3100, 7860],
    transparencyScore: 98,
    activeLiveStreamId: 'stream-ajmer-dua-live',
    bankOrTrustName: 'Chishty Foundation Interfaith Seva Trust',
  },
  {
    id: 'ngo-jain-jivdaya',
    name: 'Shree Mahavira Jivdaya Panjrapole & Bird Hospital',
    category: 'Gau Seva & Animal Compassion',
    religion: 'Jainism',
    logo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    tagline: 'Ahimsa in action: medical treatment and sanctuary for injured birds and animals',
    description: 'Operates emergency bird ambulances across Ahmedabad and Mumbai, feeding over 5,000 birds daily and providing lifelong compassionate sanctuary for disabled animals.',
    location: 'Palitana & Ahmedabad, Gujarat, 🇮🇳',
    registrationNumber: 'JIVDAYA-80G-GUJ119',
    taxExempt80G: true,
    impactMetric: 'Over 8,000 injured birds & animals treated free of cost per year',
    raisedAmount: 740000,
    targetAmount: 1000000,
    donorsCount: 1640,
    upiId: 'jivdaya.trust@sbi',
    verifiedTrust: true,
    presetAmounts: [250, 500, 1100, 2500, 5000],
    transparencyScore: 99,
    bankOrTrustName: 'Shree Mahavir Jivdaya Charitable Trust',
  },
  {
    id: 'ngo-compassion-elders',
    name: 'St. Vincent de Paul Elder Home & Palliative Hospice',
    category: 'Elder Care & Medical Relief',
    religion: 'Christianity',
    logo: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=200&q=80',
    coverImage: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=800&q=80',
    tagline: 'Dignified shelter, compassionate hospice & medical care for abandoned seniors',
    description: 'Providing loving shelter, palliative medical treatment, and joyful spiritual fellowship to 180 abandoned elderly mothers and fathers with 24-hour nursing care.',
    location: 'Kochi & Bengaluru, 🇮🇳',
    registrationNumber: 'COMPASSION-80G-KL309',
    taxExempt80G: true,
    impactMetric: '180 destitute senior citizens sheltered and medically cared for',
    raisedAmount: 1120000,
    targetAmount: 1600000,
    donorsCount: 2450,
    upiId: 'svdp.hospice@federalbank',
    verifiedTrust: true,
    presetAmounts: [500, 1000, 2500, 5000, 10000],
    transparencyScore: 98,
    bankOrTrustName: 'St. Vincent de Paul Charitable Society',
  },
];

export const LIVE_RITUAL_STREAMS: LiveRitualStream[] = [
  {
    id: 'stream-kashi-rudra-live',
    title: 'Kashi Vishwanath Sandhya Ganga Aarti & Rudrabhishek',
    shrineOrNgo: 'Dashashwamedh Ghat & Kashi Vishwanath Parishad',
    location: 'Varanasi, Uttar Pradesh',
    religion: 'Hinduism',
    streamType: 'Puja / Aarti',
    thumbnail: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    viewersCount: 6420,
    isLive: true,
    startTime: 'Live Now (Began at 6:30 PM)',
    associatedNgoId: 'ngo-akshaya-annadanam',
    audioPreset: 'tanpura-om',
    currentRitualStep: 'Maha Deeparadhana with multi-tiered brass camphor lamp',
    recentDonations: [
      { donorName: 'Suresh Iyer (Chennai)', amount: 1100, timeAgo: '2m ago', message: 'Har Har Mahadev! Prayers for mother’s health.' },
      { donorName: 'Meenakshi Sundaram', amount: 501, timeAgo: '4m ago', message: 'In memory of late father.' },
      { donorName: 'Vikram Rajput (Jaipur)', amount: 2100, timeAgo: '7m ago', message: 'Sankalp for family welfare.' },
      { donorName: 'Anonymous Devotee', amount: 500, timeAgo: '9m ago' },
    ],
  },
  {
    id: 'stream-golden-temple-langar',
    title: 'Sri Harmandir Sahib Live Rehras Sahib Kirtan & Langar Seva',
    shrineOrNgo: 'Guru Ram Das Langar Seva Trust',
    location: 'Golden Temple, Amritsar',
    religion: 'Sikhism',
    streamType: 'Langar / Annadanam',
    thumbnail: 'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&w=800&q=80',
    viewersCount: 8850,
    isLive: true,
    startTime: 'Live Now',
    associatedNgoId: 'ngo-amritsar-langar',
    audioPreset: 'gurbani-raag',
    currentRitualStep: 'Shabad Kirtan in Raag Kalyan followed by evening Sukhasan',
    recentDonations: [
      { donorName: 'Harpreet Singh (UK)', amount: 5100, timeAgo: '1m ago', message: 'Waheguru Ji Ka Khalsa! Langar daan for 200 devotees.' },
      { donorName: 'Simran Kaur (Chandigarh)', amount: 1100, timeAgo: '3m ago', message: 'Shukrana on son’s birthday.' },
      { donorName: 'Gurdeep Singh', amount: 2500, timeAgo: '6m ago' },
    ],
  },
  {
    id: 'stream-gauseva-live',
    title: 'Vrindavan Gau Surabhi Sandhya Seva & Aarti Feed',
    shrineOrNgo: 'Shree Krishna Vrindavan Surabhi Gau Seva Sansthan',
    location: 'Vrindavan Dham',
    religion: 'Hinduism',
    streamType: 'Gau Seva',
    thumbnail: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
    viewersCount: 2310,
    isLive: true,
    startTime: 'Live Now',
    associatedNgoId: 'ngo-vrindavan-gau',
    audioPreset: 'flute-bells',
    currentRitualStep: 'Feeding fresh jaggery & green fodder during evening flute recital',
    recentDonations: [
      { donorName: 'Priya Agarwal (Delhi)', amount: 1500, timeAgo: '3m ago', message: 'Gau Seva on Ekadashi tithi.' },
      { donorName: 'Gaurav Khandelwal', amount: 750, timeAgo: '8m ago', message: 'Jai Shree Radhe!' },
    ],
  },
  {
    id: 'stream-ajmer-dua-live',
    title: 'Ajmer Sharif Khwaja Gharib Nawaz Sandhya Dua & Sufi Mehfil',
    shrineOrNgo: 'Chishty Foundation Deg Langar Trust',
    location: 'Ajmer Dargah, Rajasthan',
    religion: 'Islam',
    streamType: 'Puja / Aarti',
    thumbnail: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
    viewersCount: 3190,
    isLive: true,
    startTime: 'Live Now',
    associatedNgoId: 'ngo-ajmer-khwaja-relief',
    audioPreset: 'sufi-drone',
    currentRitualStep: 'Chauki Qawwali and lighting of sacred candles (Roshni ceremony)',
    recentDonations: [
      { donorName: 'Mohammad Farooq (Hyderabad)', amount: 786, timeAgo: '2m ago', message: 'Dua-e-Khair for daughter’s recovery.' },
      { donorName: 'Zainab Begum (Mumbai)', amount: 1500, timeAgo: '5m ago' },
      { donorName: 'Amir Khan', amount: 786, timeAgo: '11m ago' },
    ],
  },
];

export const INITIAL_USER_DONATIONS: UserDonationRecord[] = [
  {
    id: 'don-001',
    ngoId: 'ngo-amritsar-langar',
    ngoName: 'Guru Ram Das 24/7 Langar & Community Seva Society',
    amount: 1100,
    date: '2026-09-20',
    cause: 'Sponsoring 100 free nutritious meals at community kitchen',
    donorName: 'Rohan Sharma',
    donorEmail: 'rohan.sharma@niva.faith',
    taxReceiptNo: '80G-SEVA-2026-88912',
    taxExemptionEligible: true,
    paymentMode: 'UPI',
    status: 'Completed',
  },
];
