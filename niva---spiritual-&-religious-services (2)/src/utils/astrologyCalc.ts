// Vedic Astrology (Jyotish) Mathematical & Traditional Data Engine

export interface RashiInfo {
  id: number; // 1 to 12
  name: string;
  sanskritName: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  ruler: string;
  symbol: string;
  qualities: string;
}

export interface NakshatraInfo {
  id: number; // 1 to 27
  name: string;
  sanskritName: string;
  ruler: string;
  deity: string;
  symbol: string;
  gana: 'Deva' | 'Manushya' | 'Rakshasa';
  nadi: 'Aadi' | 'Madhya' | 'Antya';
  yoni: string;
  traits: string;
}

export interface PlanetPosition {
  name: string;
  sanskritName: string;
  rashiId: number; // 1-12
  rashiName: string;
  degree: number; // 0 - 30 deg
  house: number; // 1 - 12
  isRetrograde?: boolean;
  dignity: 'Exalted' | 'Moolatrikona' | 'Own Sign' | 'Friendly' | 'Neutral' | 'Debilitated' | 'Enemy';
  significance: string;
}

export interface BhavaInfo {
  houseNumber: number; // 1 to 12
  sanskritName: string;
  rashiId: number;
  rashiName: string;
  karaka: string;
  lifeAreas: string[];
  planetsHere: string[];
  traditionalDescription: string;
}

export interface DashaPeriod {
  planet: string;
  startYear: number;
  endYear: number;
  isCurrent: boolean;
  theme: string;
}

export interface KundliProfile {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  sunSign: string;
  moonSign: string;
  lagnaSign: string;
  lagnaDegree: number;
  nakshatra: NakshatraInfo;
  pada: number;
  planets: PlanetPosition[];
  houses: BhavaInfo[];
  currentMahadasha: string;
  currentAntardasha: string;
  dashaPeriods: DashaPeriod[];
  sadeSatiStatus: {
    inSadeSati: boolean;
    phase: string;
    description: string;
    traditionalRemedies: string[];
  };
  lifeThemes: {
    personality: string;
    careerAndDharma: string;
    educationAndKnowledge: string;
    relationshipsAndMarriage: string;
    spiritualGrowth: string;
  };
}

export const RASHIS: RashiInfo[] = [
  { id: 1, name: 'Aries', sanskritName: 'Mesha (मेष)', element: 'Fire', ruler: 'Mars (Mangala)', symbol: 'Ram', qualities: 'Pioneering, dynamic, courageous, forthright' },
  { id: 2, name: 'Taurus', sanskritName: 'Vrishabha (वृषभ)', element: 'Earth', ruler: 'Venus (Shukra)', symbol: 'Bull', qualities: 'Steadfast, sensual, grounded, resource-conscious' },
  { id: 3, name: 'Gemini', sanskritName: 'Mithuna (मिथुन)', element: 'Air', ruler: 'Mercury (Budha)', symbol: 'Twins', qualities: 'Inquisitive, communicative, versatile, intellectual' },
  { id: 4, name: 'Cancer', sanskritName: 'Karka (कर्क)', element: 'Water', ruler: 'Moon (Chandra)', symbol: 'Crab', qualities: 'Nurturing, intuitive, emotionally deep, protective' },
  { id: 5, name: 'Leo', sanskritName: 'Simha (सिंह)', element: 'Fire', ruler: 'Sun (Surya)', symbol: 'Lion', qualities: 'Noble, radiant, generous, natural leader, creative' },
  { id: 6, name: 'Virgo', sanskritName: 'Kanya (कन्या)', element: 'Earth', ruler: 'Mercury (Budha)', symbol: 'Maiden', qualities: 'Analytical, meticulous, service-oriented, discerning' },
  { id: 7, name: 'Libra', sanskritName: 'Tula (तुला)', element: 'Air', ruler: 'Venus (Shukra)', symbol: 'Scales', qualities: 'Harmonious, diplomatic, aesthetic, partnership-focused' },
  { id: 8, name: 'Scorpio', sanskritName: 'Vrishchika (वृश्चिक)', element: 'Water', ruler: 'Mars (Mangala)', symbol: 'Scorpion', qualities: 'Intense, transformative, investigative, perceptive' },
  { id: 9, name: 'Sagittarius', sanskritName: 'Dhanu (धनु)', element: 'Fire', ruler: 'Jupiter (Guru)', symbol: 'Archer / Centaur', qualities: 'Philosophical, optimistic, truth-seeking, expansive' },
  { id: 10, name: 'Capricorn', sanskritName: 'Makara (मकर)', element: 'Earth', ruler: 'Saturn (Shani)', symbol: 'Sea-Goat', qualities: 'Disciplined, persevering, pragmatic, dutiful' },
  { id: 11, name: 'Aquarius', sanskritName: 'Kumbha (कुम्भ)', element: 'Air', ruler: 'Saturn (Shani)', symbol: 'Water-Bearer', qualities: 'Humanitarian, progressive, independent, visionary' },
  { id: 12, name: 'Pisces', sanskritName: 'Meena (मीन)', element: 'Water', ruler: 'Jupiter (Guru)', symbol: 'Two Fishes', qualities: 'Compassionate, mystical, imaginative, receptive' },
];

export const NAKSHATRAS: NakshatraInfo[] = [
  { id: 1, name: 'Ashwini', sanskritName: 'अश्विनी', ruler: 'Ketu', deity: 'Ashvini Kumaras (Healers of Gods)', symbol: 'Horse Head', gana: 'Deva', nadi: 'Aadi', yoni: 'Horse', traits: 'Swift, pioneering, natural healing talent, energetic' },
  { id: 2, name: 'Bharani', sanskritName: 'भरणी', ruler: 'Venus', deity: 'Yama (God of Dharma/Truth)', symbol: 'Yoni / Triangle', gana: 'Manushya', nadi: 'Madhya', yoni: 'Elephant', traits: 'Determined, passionate, transformative, deeply loyal' },
  { id: 3, name: 'Krittika', sanskritName: 'कृत्तिका', ruler: 'Sun', deity: 'Agni (Fire God)', symbol: 'Razor / Flame', gana: 'Rakshasa', nadi: 'Antya', yoni: 'Sheep', traits: 'Sharp, purifying, protective, courageous, fiery determination' },
  { id: 4, name: 'Rohini', sanskritName: 'रोहिणी', ruler: 'Moon', deity: 'Brahma / Prajapati', symbol: 'Chariot / Banyan Tree', gana: 'Manushya', nadi: 'Antya', yoni: 'Serpent', traits: 'Artistic, magnetic, fertile, charming, prosperity-oriented' },
  { id: 5, name: 'Mrigashira', sanskritName: 'मृगशिरा', ruler: 'Mars', deity: 'Soma (Moon God)', symbol: 'Deer Head', gana: 'Deva', nadi: 'Madhya', yoni: 'Serpent', traits: 'Curious, seeking truth, wanderer, sensitive, intelligent' },
  { id: 6, name: 'Ardra', sanskritName: 'आर्द्रा', ruler: 'Rahu', deity: 'Rudra (Storm God / Shiva)', symbol: 'Teardrop / Diamond', gana: 'Manushya', nadi: 'Aadi', yoni: 'Dog', traits: 'Emotionally intense, resilient through adversity, piercing intellect' },
  { id: 7, name: 'Punarvasu', sanskritName: 'पुनर्वसु', ruler: 'Jupiter', deity: 'Aditi (Cosmic Mother)', symbol: 'Bow and Quiver', gana: 'Deva', nadi: 'Aadi', yoni: 'Cat', traits: 'Benevolent, restorative, virtuous, adaptable, return of light' },
  { id: 8, name: 'Pushya', sanskritName: 'पुष्य', ruler: 'Saturn', deity: 'Brihaspati (Guru of Devas)', symbol: 'Cow Udder / Lotus', gana: 'Deva', nadi: 'Madhya', yoni: 'Sheep', traits: 'Nourishing, auspicious, spiritually inclined, dependable' },
  { id: 9, name: 'Ashlesha', sanskritName: 'अश्लेषा', ruler: 'Mercury', deity: 'Nagas (Serpent Deities)', symbol: 'Coiled Snake', gana: 'Rakshasa', nadi: 'Antya', yoni: 'Cat', traits: 'Intuitive, philosophical, deep psychological insight, hypnotic' },
  { id: 10, name: 'Magha', sanskritName: 'मघा', ruler: 'Ketu', deity: 'Pitris (Ancestral Spirits)', symbol: 'Royal Throne / Palanquin', gana: 'Rakshasa', nadi: 'Antya', yoni: 'Rat', traits: 'Regal, authoritative, ancestor-respecting, proud, principled' },
  { id: 11, name: 'Purva Phalguni', sanskritName: 'पूर्वा फाल्गुनी', ruler: 'Venus', deity: 'Bhaga (God of Fortune & Bliss)', symbol: 'Front legs of Bed / Hammock', gana: 'Manushya', nadi: 'Madhya', yoni: 'Rat', traits: 'Joyful, romantic, creative, generous, fond of social harmony' },
  { id: 12, name: 'Uttara Phalguni', sanskritName: 'उत्तरा फाल्गुनी', ruler: 'Sun', deity: 'Aryaman (God of Friendship & Contracts)', symbol: 'Back legs of Bed', gana: 'Manushya', nadi: 'Aadi', yoni: 'Cow', traits: 'Honorable, helpful, steadfast in partnerships, noble character' },
  { id: 13, name: 'Hasta', sanskritName: 'हस्त', ruler: 'Moon', deity: 'Savitr (Sun of Inspiration)', symbol: 'Open Hand / Fist', gana: 'Deva', nadi: 'Aadi', yoni: 'Buffalo', traits: 'Skilled with hands, crafty, humorous, industrious, clever' },
  { id: 14, name: 'Chitra', sanskritName: 'चित्रा', ruler: 'Mars', deity: 'Tvashtar / Vishwakarma (Cosmic Architect)', symbol: 'Bright Jewel / Pearl', gana: 'Rakshasa', nadi: 'Madhya', yoni: 'Tiger', traits: 'Architectural genius, charismatic, visually brilliant, perfectionist' },
  { id: 15, name: 'Swati', sanskritName: 'स्वाति', ruler: 'Rahu', deity: 'Vayu (Wind God)', symbol: 'Young Shoot of Plant', gana: 'Deva', nadi: 'Antya', yoni: 'Buffalo', traits: 'Independent, gentle, flexible, trade-savvy, freedom-loving' },
  { id: 16, name: 'Vishakha', sanskritName: 'विशाखा', ruler: 'Jupiter', deity: 'Indragni (Indra + Agni)', symbol: 'Triumphal Arch / Potter Wheel', gana: 'Rakshasa', nadi: 'Antya', yoni: 'Tiger', traits: 'Goal-driven, passionate, victorious, purposeful determination' },
  { id: 17, name: 'Anuradha', sanskritName: 'अनुराधा', ruler: 'Saturn', deity: 'Mitra (God of Friendship)', symbol: 'Lotus / Staff', gana: 'Deva', nadi: 'Madhya', yoni: 'Deer', traits: 'Devoted, friendly, organizer, spiritual seeker, bridge builder' },
  { id: 18, name: 'Jyeshtha', sanskritName: 'ज्येष्ठा', ruler: 'Mercury', deity: 'Indra (King of Gods)', symbol: 'Earring / Umbrella', gana: 'Rakshasa', nadi: 'Aadi', yoni: 'Deer', traits: 'Senior, protective elder, defensive, courageous, occult depth' },
  { id: 19, name: 'Mula', sanskritName: 'मूल', ruler: 'Ketu', deity: 'Nirriti (Goddess of Dissolution)', symbol: 'Tied Bunch of Roots', gana: 'Rakshasa', nadi: 'Aadi', yoni: 'Dog', traits: 'Investigates root causes, truth seeker, transformative, intense' },
  { id: 20, name: 'Purva Ashadha', sanskritName: 'पूर्वाषाढा', ruler: 'Venus', deity: 'Apas (Cosmic Waters)', symbol: 'Fan / Winnowing Basket', gana: 'Manushya', nadi: 'Madhya', yoni: 'Monkey', traits: 'Invincible, philosophically proud, purifying, eloquent speaker' },
  { id: 21, name: 'Uttara Ashadha', sanskritName: 'उत्तराषाढा', ruler: 'Sun', deity: 'Vishwadevas (Universal Cosmic Principles)', symbol: 'Elephant Tusk', gana: 'Manushya', nadi: 'Antya', yoni: 'Mongoose', traits: 'Enduring victory, humble leadership, duty-bound, patient' },
  { id: 22, name: 'Shravana', sanskritName: 'श्रवण', ruler: 'Moon', deity: 'Vishnu (Preserver of the Universe)', symbol: 'Ear / Three Footprints', gana: 'Deva', nadi: 'Antya', yoni: 'Monkey', traits: 'Deep listener, scholarly, knowledge preserver, observant, ethical' },
  { id: 23, name: 'Dhanishta', sanskritName: 'धनिष्ठा', ruler: 'Mars', deity: 'Eight Vasus (Deities of Abundance)', symbol: 'Mridangam Drum / Flute', gana: 'Rakshasa', nadi: 'Madhya', yoni: 'Lion', traits: 'Rhythmic, musical, wealthy, generous, courageous leader' },
  { id: 24, name: 'Shatabhisha', sanskritName: 'शतभिषा', ruler: 'Rahu', deity: 'Varuna (God of Cosmic Oceans & Law)', symbol: 'Empty Circle / 100 Physicians', gana: 'Rakshasa', nadi: 'Aadi', yoni: 'Horse', traits: 'Healer of complex ailments, secretive, visionary, unconventional' },
  { id: 25, name: 'Purva Bhadrapada', sanskritName: 'पूर्वभाद्रपदा', ruler: 'Jupiter', deity: 'Aja Ekapada (One-Footed Cosmic Serpent)', symbol: 'Front of Funeral Cot / Sword', gana: 'Manushya', nadi: 'Aadi', yoni: 'Lion', traits: 'Spiritual ascetic, intense idealism, dual perspective, passionate' },
  { id: 26, name: 'Uttara Bhadrapada', sanskritName: 'उत्तरभाद्रपदा', ruler: 'Saturn', deity: 'Ahirbhudhanya (Serpent of the Depths)', symbol: 'Back of Funeral Cot / Twins', gana: 'Manushya', nadi: 'Madhya', yoni: 'Cow', traits: 'Wise, meditative, restrained, profound inner peace, charitable' },
  { id: 27, name: 'Revati', sanskritName: 'रेवती', ruler: 'Mercury', deity: 'Pushan (Nourisher of Travelers & Herds)', symbol: 'Fish / Pair of Fish', gana: 'Deva', nadi: 'Antya', yoni: 'Elephant', traits: 'Gentle, artistic, guide to seekers, compassionate, spiritual liberation' },
];

export const BHAVAS_INFO = [
  { house: 1, name: 'Tanu Bhava (Lagna)', karaka: 'Sun', areas: ['Self', 'Physical Body', 'Constitution', 'General Vitality', 'Appearance', 'Destiny'] },
  { house: 2, name: 'Dhana Bhava', karaka: 'Jupiter', areas: ['Wealth', 'Speech', 'Family Lineage', 'Food Habits', 'Assets', 'Early Education'] },
  { house: 3, name: 'Sahaja Bhava', karaka: 'Mars', areas: ['Younger Siblings', 'Courage', 'Initiative', 'Short Travels', 'Writing & Communication', 'Hands'] },
  { house: 4, name: 'Sukha Bhava', karaka: 'Moon & Venus', areas: ['Mother', 'Inner Contentment', 'Home & Real Estate', 'Vehicles', 'Heart', 'Ancestral Roots'] },
  { house: 5, name: 'Putra Bhava', karaka: 'Jupiter', areas: ['Children', 'Intellect (Buddhi)', 'Purva Punya (Past Karma)', 'Creativity', 'Mantras & Speculation'] },
  { house: 6, name: 'Ari / Shatru Bhava', karaka: 'Mars & Saturn', areas: ['Overcoming Enemies', 'Daily Work', 'Service', 'Health Challenges', 'Debts', 'Litigation'] },
  { house: 7, name: 'Yuvati Bhava', karaka: 'Venus', areas: ['Spouse & Marriage', 'Business Partnerships', 'Public Interactions', 'Foreign Travel'] },
  { house: 8, name: 'Randhra Bhava', karaka: 'Saturn', areas: ['Longevity (Ayush)', 'Transformation', 'Occult & Mysticism', 'Inheritance', 'Unearned Wealth', 'Secrets'] },
  { house: 9, name: 'Dharma Bhava', karaka: 'Jupiter & Sun', areas: ['Higher Wisdom', 'Guru / Father', 'Dharma', 'Long Journeys', 'Fortunes (Bhagya)', 'Scriptures'] },
  { house: 10, name: 'Karma Bhava', karaka: 'Sun, Saturn, Mercury', areas: ['Profession', 'Public Status', 'Career Milestones', 'Reputation', 'Leadership Role'] },
  { house: 11, name: 'Labha Bhava', karaka: 'Jupiter', areas: ['Gains & Income', 'Elder Siblings', 'Aspirations & Hopes', 'Social Networks', 'Wishes Fulfilled'] },
  { house: 12, name: 'Vyaya Bhava', karaka: 'Saturn & Ketu', areas: ['Expenditures', 'Moksha (Liberation)', 'Foreign Lands', 'Subconscious & Sleep', 'Solitude', 'Ashrams'] },
];

// Helper to determine planet dignity
function getDignity(planetName: string, rashiId: number): 'Exalted' | 'Moolatrikona' | 'Own Sign' | 'Friendly' | 'Neutral' | 'Debilitated' | 'Enemy' {
  // Exaltation / Debilitation
  if (planetName === 'Sun') {
    if (rashiId === 1) return 'Exalted';
    if (rashiId === 7) return 'Debilitated';
    if (rashiId === 5) return 'Own Sign';
    if ([9, 12, 4].includes(rashiId)) return 'Friendly';
  }
  if (planetName === 'Moon') {
    if (rashiId === 2) return 'Exalted';
    if (rashiId === 8) return 'Debilitated';
    if (rashiId === 4) return 'Own Sign';
    if ([1, 5, 9].includes(rashiId)) return 'Friendly';
  }
  if (planetName === 'Mars') {
    if (rashiId === 10) return 'Exalted';
    if (rashiId === 4) return 'Debilitated';
    if ([1, 8].includes(rashiId)) return 'Own Sign';
    if ([5, 9, 12].includes(rashiId)) return 'Friendly';
  }
  if (planetName === 'Mercury') {
    if (rashiId === 6) return 'Exalted';
    if (rashiId === 12) return 'Debilitated';
    if (rashiId === 3) return 'Own Sign';
    if ([2, 7, 10, 11].includes(rashiId)) return 'Friendly';
  }
  if (planetName === 'Jupiter') {
    if (rashiId === 4) return 'Exalted';
    if (rashiId === 10) return 'Debilitated';
    if ([9, 12].includes(rashiId)) return 'Own Sign';
    if ([1, 5, 8].includes(rashiId)) return 'Friendly';
  }
  if (planetName === 'Venus') {
    if (rashiId === 12) return 'Exalted';
    if (rashiId === 6) return 'Debilitated';
    if ([2, 7].includes(rashiId)) return 'Own Sign';
    if ([3, 10, 11].includes(rashiId)) return 'Friendly';
  }
  if (planetName === 'Saturn') {
    if (rashiId === 7) return 'Exalted';
    if (rashiId === 1) return 'Debilitated';
    if ([10, 11].includes(rashiId)) return 'Own Sign';
    if ([2, 3, 6].includes(rashiId)) return 'Friendly';
  }
  if (planetName === 'Rahu') {
    if (rashiId === 2 || rashiId === 3) return 'Exalted';
    if (rashiId === 8 || rashiId === 9) return 'Debilitated';
  }
  if (planetName === 'Ketu') {
    if (rashiId === 8 || rashiId === 9) return 'Exalted';
    if (rashiId === 2 || rashiId === 3) return 'Debilitated';
  }
  return 'Neutral';
}

// Generates a comprehensive, deterministic Vedic astrology profile
export function calculateKundliProfile(
  name: string,
  birthDate: string, // YYYY-MM-DD
  birthTime: string, // HH:mm
  birthPlace: string
): KundliProfile {
  const [yearStr, monthStr, dayStr] = birthDate.split('-');
  const [hourStr, minStr] = birthTime.split(':');

  const year = parseInt(yearStr, 10) || 1995;
  const month = parseInt(monthStr, 10) || 5;
  const day = parseInt(dayStr, 10) || 15;
  const hour = parseInt(hourStr, 10) || 10;
  const minute = parseInt(minStr, 10) || 30;

  // Compute a deterministic seed based on date and time
  const seed = (year * 365 + month * 31 + day + hour * 7 + minute * 13 + birthPlace.length * 17) % 10000;

  // 1. Sun Sign (Nirayana Sidereal approximation)
  // Sun transitions around 14th-15th of each month (Sankranti)
  let sunRashiId = month;
  if (day < 14) {
    sunRashiId = month === 1 ? 12 : month - 1;
  }
  const sunRashi = RASHIS.find((r) => r.id === sunRashiId) || RASHIS[0];

  // 2. Lagna (Ascendant): Rises 1 rashi approximately every 2 hours
  // Sun sign rises at sunrise (~6 AM)
  const hoursSinceSunrise = (hour - 6 + 24) % 24;
  const lagnaOffset = Math.floor(hoursSinceSunrise / 2);
  const lagnaRashiId = ((sunRashiId - 1 + lagnaOffset) % 12) + 1;
  const lagnaRashi = RASHIS.find((r) => r.id === lagnaRashiId) || RASHIS[0];
  const lagnaDegree = Number(((minute / 60) * 30 + ((hoursSinceSunrise % 2) * 15)).toFixed(1)) % 30;

  // 3. Moon Sign & Nakshatra
  // Moon traverses ~1 rashi in 2.25 days (approx 13 deg 20 min per day = 1 Nakshatra)
  const moonSeed = (day * 27 + month * 12 + year) % 27;
  const nakshatraIndex = moonSeed; // 0 to 26
  const nakshatra = NAKSHATRAS[nakshatraIndex];

  // Moon Rashi from Nakshatra:
  // 27 Nakshatras span 12 Rashis (each Rashi has 2.25 Nakshatras or 9 Padas)
  const totalPadas = nakshatraIndex * 4 + ((minute + day) % 4);
  const moonRashiId = (Math.floor(totalPadas / 9) % 12) + 1;
  const moonRashi = RASHIS.find((r) => r.id === moonRashiId) || RASHIS[3];
  const pada = (((minute + day) % 4) + 1);

  // 4. Calculate 9 Planets and their Houses relative to Lagna
  const rawPlanets = [
    { name: 'Sun', sanskrit: 'Surya (सूर्य)', rashiId: sunRashiId, deg: (day * 1.05 + minute * 0.1) % 29.5 },
    { name: 'Moon', sanskrit: 'Chandra (चन्द्र)', rashiId: moonRashiId, deg: ((totalPadas % 9) * 3.33 + 1.5) % 29.5 },
    { name: 'Mars', sanskrit: 'Mangala (मङ्गल)', rashiId: ((sunRashiId + 2 + (seed % 3)) % 12) + 1, deg: (seed * 3.1) % 29.5 },
    { name: 'Mercury', sanskrit: 'Budha (बुध)', rashiId: ((sunRashiId + (seed % 2 === 0 ? 0 : 1)) % 12) + 1, deg: (seed * 5.2) % 29.5 },
    { name: 'Jupiter', sanskrit: 'Guru (बृहस्पति)', rashiId: ((year + month) % 12) + 1, deg: (seed * 2.7) % 29.5 },
    { name: 'Venus', sanskrit: 'Shukra (शुक्र)', rashiId: ((sunRashiId + (seed % 3 === 0 ? -1 : 1) + 12) % 12) + 1, deg: (seed * 4.3) % 29.5 },
    { name: 'Saturn', sanskrit: 'Shani (शनि)', rashiId: (Math.floor(year / 2.5) % 12) + 1, deg: (seed * 1.8) % 29.5 },
    { name: 'Rahu', sanskrit: 'Rahu (राहु)', rashiId: ((seed % 12) + 1), deg: (seed * 7.1) % 29.5, isRetrograde: true },
    { name: 'Ketu', sanskrit: 'Ketu (केतु)', rashiId: (((seed + 6) % 12) + 1), deg: (seed * 7.1) % 29.5, isRetrograde: true },
  ];

  const planets: PlanetPosition[] = rawPlanets.map((p) => {
    // House relative to Lagna: House 1 = Lagna Rashi
    const house = ((p.rashiId - lagnaRashiId + 12) % 12) + 1;
    const rInfo = RASHIS.find((r) => r.id === p.rashiId) || RASHIS[0];
    const dignity = getDignity(p.name, p.rashiId);

    let significance = '';
    if (p.name === 'Sun') significance = 'Soul, ego, father, vitality, leadership, government authority.';
    else if (p.name === 'Moon') significance = 'Mind, emotional state, mother, memory, intuitive perception.';
    else if (p.name === 'Mars') significance = 'Willpower, courage, siblings, energy, property, technical skill.';
    else if (p.name === 'Mercury') significance = 'Intellect, speech, commerce, analytical reasoning, humor.';
    else if (p.name === 'Jupiter') significance = 'Wisdom, Dharma, spiritual teacher (Guru), children, wealth, expansion.';
    else if (p.name === 'Venus') significance = 'Love, arts, aesthetics, spouse, luxuries, devotion (Bhakti).';
    else if (p.name === 'Saturn') significance = 'Discipline, longevity, duty, patience, perseverance, karmic lessons.';
    else if (p.name === 'Rahu') significance = 'Obsession, foreign lands, material innovation, worldly desire.';
    else if (p.name === 'Ketu') significance = 'Moksha, detachment, mysticism, spiritual insight, liberation.';

    return {
      name: p.name,
      sanskritName: p.sanskrit,
      rashiId: p.rashiId,
      rashiName: rInfo.name,
      degree: Number(p.deg.toFixed(1)),
      house,
      isRetrograde: p.isRetrograde,
      dignity,
      significance,
    };
  });

  // 5. Build 12 Houses
  const houses: BhavaInfo[] = BHAVAS_INFO.map((bhava) => {
    const houseRashiId = ((lagnaRashiId - 1 + (bhava.house - 1)) % 12) + 1;
    const rInfo = RASHIS.find((r) => r.id === houseRashiId) || RASHIS[0];
    const planetsInHouse = planets.filter((p) => p.house === bhava.house).map((p) => p.name);

    return {
      houseNumber: bhava.house,
      sanskritName: bhava.name,
      rashiId: houseRashiId,
      rashiName: rInfo.name,
      karaka: bhava.karaka,
      lifeAreas: bhava.areas,
      planetsHere: planetsInHouse,
      traditionalDescription: `${bhava.name} in ${rInfo.name}. Signifies ${bhava.areas.slice(0, 3).join(', ')}.`,
    };
  });

  // 6. Vimshottari Dasha calculation
  const dashaLords = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
  const dashaDurations: Record<string, number> = {
    Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7, Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17
  };

  // Starting Dasha based on Nakshatra Ruler
  const startLordIndex = dashaLords.indexOf(nakshatra.ruler);
  const startingLord = startLordIndex >= 0 ? dashaLords[startLordIndex] : 'Jupiter';

  let currentYear = new Date().getFullYear();
  let accumulatedYear = year;
  const dashaPeriods: DashaPeriod[] = [];
  let currentMahadasha = startingLord;

  for (let i = 0; i < 9; i++) {
    const lord = dashaLords[(startLordIndex + i) % 9];
    const dur = dashaDurations[lord];
    const start = accumulatedYear;
    const end = accumulatedYear + dur;
    const isCurrent = currentYear >= start && currentYear < end;

    if (isCurrent) {
      currentMahadasha = lord;
    }

    let theme = '';
    if (lord === 'Jupiter') theme = 'Period of learning, spiritual expansion, family growth & prosperity.';
    else if (lord === 'Saturn') theme = 'Period of disciplined hard work, structural foundations & karmic maturity.';
    else if (lord === 'Mercury') theme = 'Period of commerce, communication, intellectual achievements & trade.';
    else if (lord === 'Ketu') theme = 'Period of introspection, detachment, spiritual seeking & inner wisdom.';
    else if (lord === 'Venus') theme = 'Period of artistic flourishing, relationships, luxury & celebration.';
    else if (lord === 'Sun') theme = 'Period of leadership, public recognition, self-sovereignty & career rise.';
    else if (lord === 'Moon') theme = 'Period of emotional maturation, home focus, travel & public relations.';
    else if (lord === 'Mars') theme = 'Period of intense courage, land ventures, energy & bold initiatives.';
    else if (lord === 'Rahu') theme = 'Period of rapid unconventional change, foreign connections & worldly ambition.';

    dashaPeriods.push({
      planet: lord,
      startYear: start,
      endYear: end,
      isCurrent,
      theme,
    });

    accumulatedYear = end;
  }

  // Antardasha estimation
  const antardashaOrder = dashaLords;
  const currSubIndex = (year + month) % 9;
  const currentAntardasha = antardashaOrder[currSubIndex];

  // 7. Sade Sati calculation:
  // In 2026, Saturn is transiting Pisces (Meena Rashi).
  // Sade Sati affects Aquarius (setting phase), Pisces (peak phase), Aries (rising phase).
  let inSadeSati = false;
  let phase = 'Not in Sade Sati';
  let description = 'Currently free of the major 7.5 year transit of Shani (Saturn) over the natal Moon.';

  if (moonRashi.id === 11) {
    inSadeSati = true;
    phase = 'Setting Phase (Third Dhalaiyya / Desh)';
    description = 'Saturn is departing your 12th/1st/2nd house cluster. Focus on consolidating lessons, financial stability, and steady perseverance.';
  } else if (moonRashi.id === 12) {
    inSadeSati = true;
    phase = 'Peak Phase (Janma Shani)';
    description = 'Saturn is transiting directly over your natal Moon sign. High focus on emotional resilience, mental discipline, and patient duty.';
  } else if (moonRashi.id === 1) {
    inSadeSati = true;
    phase = 'Rising Phase (First Dhalaiyya)';
    description = 'Saturn is transiting the 12th house from your natal Moon. Encourages release of unnecessary attachments, inner meditation, and mindful spending.';
  }

  const traditionalRemedies = [
    'Recite the Hanuman Chalisa on Tuesdays and Saturdays for courage and spiritual protection.',
    'Light a pure mustard oil or sesame oil diya under a Peepal tree or near a Shani shrine on Saturday evenings.',
    'Practice selfless service (Seva) and donate black sesame, whole urad dal, or warm clothes to laborers and elderly people in need.',
    'Maintain strict truthfulness, ethical business conduct, and patience during delays.',
  ];

  // 8. Life Themes Synthesis
  const personality = `${lagnaRashi.name} Lagna bestows a ${lagnaRashi.qualities.toLowerCase()} approach to life. With your Moon in ${moonRashi.name} (${nakshatra.name} Nakshatra, Pada ${pada}), your emotional core is characterized as ${nakshatra.traits.toLowerCase()}.`;

  const careerAndDharma = `Your 10th house is rooted in ${houses[9].rashiName}, governed by ${RASHIS.find(r => r.name === houses[9].rashiName)?.ruler || 'Mars'}. Classical texts associate this placement with success in fields requiring strategic focus, ethical leadership, and sustained discipline.`;

  const educationAndKnowledge = `The 5th house of intellect is in ${houses[4].rashiName}. You possess a naturally inquiring mind capable of assimilating traditional wisdom and technical knowledge, guided by ${nakshatra.deity}.`;

  const relationshipsAndMarriage = `The 7th house of partnerships resides in ${houses[6].rashiName}. Traditional Vedic guidance suggests seeking a partner with complementary qualities who values mutual respect, steady emotional maturity, and shared spiritual ethics.`;

  const spiritualGrowth = `Your Nakshatra Lord is ${nakshatra.ruler} and your Gana is ${nakshatra.gana}. Classical Jyotish highlights a life path of purifying karma through mindful action, selfless service (*Nishkama Karma*), and devotion.`;

  return {
    name: name || 'Seeker',
    birthDate,
    birthTime,
    birthPlace: birthPlace || 'Sacred Coordinates',
    sunSign: `${sunRashi.name} (${sunRashi.sanskritName})`,
    moonSign: `${moonRashi.name} (${moonRashi.sanskritName})`,
    lagnaSign: `${lagnaRashi.name} (${lagnaRashi.sanskritName})`,
    lagnaDegree,
    nakshatra,
    pada,
    planets,
    houses,
    currentMahadasha,
    currentAntardasha,
    dashaPeriods,
    sadeSatiStatus: {
      inSadeSati,
      phase,
      description,
      traditionalRemedies,
    },
    lifeThemes: {
      personality,
      careerAndDharma,
      educationAndKnowledge,
      relationshipsAndMarriage,
      spiritualGrowth,
    },
  };
}

// Ashtakoota 36-Point Compatibility Calculator (Guna Milan)
export interface CompatibilityResult {
  varna: { score: number; max: 1; desc: string };
  vashya: { score: number; max: 2; desc: string };
  tara: { score: number; max: 3; desc: string };
  yoni: { score: number; max: 4; desc: string };
  grahaMaitri: { score: number; max: 5; desc: string };
  gana: { score: number; max: 6; desc: string };
  bhakoot: { score: number; max: 7; desc: string };
  nadi: { score: number; max: 8; desc: string };
  totalScore: number; // out of 36
  verdict: 'Excellent' | 'Good' | 'Moderate' | 'Challenging';
  traditionalSummary: string;
}

export function calculateAshtakootaMilan(
  person1NakshatraId: number,
  person1MoonRashiId: number,
  person2NakshatraId: number,
  person2MoonRashiId: number
): CompatibilityResult {
  const nak1 = NAKSHATRAS.find((n) => n.id === person1NakshatraId) || NAKSHATRAS[0];
  const nak2 = NAKSHATRAS.find((n) => n.id === person2NakshatraId) || NAKSHATRAS[3];

  // 1. Varna (1 pt)
  const varnaScore = 1;
  const varnaDesc = 'Mental and spiritual temperamental alignment.';

  // 2. Vashya (2 pts)
  const vashyaScore = person1MoonRashiId === person2MoonRashiId ? 2 : 1;
  const vashyaDesc = 'Mutual magnetic attraction and natural harmony.';

  // 3. Tara (3 pts)
  const taraDist = (Math.abs(person1NakshatraId - person2NakshatraId) % 9);
  const taraScore = [1, 2, 4, 6, 8].includes(taraDist) ? 3 : 1.5;
  const taraDesc = 'Destiny, health, and mutual longevity harmony.';

  // 4. Yoni (4 pts)
  const yoniScore = nak1.yoni === nak2.yoni ? 4 : nak1.gana === nak2.gana ? 3 : 2;
  const yoniDesc = `Physical & intimate compatibility between ${nak1.yoni} and ${nak2.yoni} traits.`;

  // 5. Graha Maitri (5 pts)
  const lordDist = Math.abs(person1MoonRashiId - person2MoonRashiId);
  const grahaMaitriScore = [0, 4, 8, 3, 5, 9].includes(lordDist) ? 5 : [1, 7].includes(lordDist) ? 3 : 1;
  const grahaMaitriDesc = 'Friendship and intellectual understanding of the planetary rulers.';

  // 6. Gana (6 pts)
  let ganaScore = 6;
  if (nak1.gana === nak2.gana) ganaScore = 6;
  else if ((nak1.gana === 'Deva' && nak2.gana === 'Manushya') || (nak1.gana === 'Manushya' && nak2.gana === 'Deva')) ganaScore = 5;
  else ganaScore = 1;
  const ganaDesc = `Temperament compatibility (${nak1.gana} and ${nak2.gana}).`;

  // 7. Bhakoot (7 pts)
  const rashiDiff = ((person2MoonRashiId - person1MoonRashiId + 12) % 12);
  const isBhakootDosha = [5, 7, 1, 11, 8, 4].includes(rashiDiff);
  const bhakootScore = isBhakootDosha ? 0 : 7;
  const bhakootDesc = isBhakootDosha ? '6/8 or 2/12 rashi positioning; traditional guidance recommends patience and mutual compromise.' : 'Auspicious mutual rashi flow promoting emotional and financial well-being.';

  // 8. Nadi (8 pts)
  const isNadiDosha = nak1.nadi === nak2.nadi;
  const nadiScore = isNadiDosha ? 0 : 8;
  const nadiDesc = isNadiDosha ? `Both share ${nak1.nadi} Nadi. Classical texts suggest remedies (Maha Mrityunjaya japa / donation) to balance biological vitality.` : `Distinct Nadis (${nak1.nadi} & ${nak2.nadi}) indicating genetic health and longevity vigor.`;

  const totalScore = Number((varnaScore + vashyaScore + taraScore + yoniScore + grahaMaitriScore + ganaScore + bhakootScore + nadiScore).toFixed(1));

  let verdict: 'Excellent' | 'Good' | 'Moderate' | 'Challenging' = 'Moderate';
  let traditionalSummary = '';

  if (totalScore >= 28) {
    verdict = 'Excellent';
    traditionalSummary = 'High Ashtakoota harmony (Above 28 points). Indicates profound natural accord in values, emotional understanding, and mutual spiritual growth.';
  } else if (totalScore >= 18) {
    verdict = 'Good';
    traditionalSummary = 'Auspicious compatibility (Above 18 points). Indicates a solid foundation for companionship, shared familial duties, and mutual growth.';
  } else if (totalScore >= 12) {
    verdict = 'Moderate';
    traditionalSummary = 'Moderate compatibility. Indicates complementary strengths with occasional differences in temperament; open communication and shared spiritual goals foster harmony.';
  } else {
    verdict = 'Challenging';
    traditionalSummary = 'Traditional indicators suggest divergent constitutional traits; classical astrologers recommend conscious mutual effort, patience, and spiritual remedies.';
  }

  return {
    varna: { score: varnaScore, max: 1, desc: varnaDesc },
    vashya: { score: vashyaScore, max: 2, desc: vashyaDesc },
    tara: { score: taraScore, max: 3, desc: taraDesc },
    yoni: { score: yoniScore, max: 4, desc: yoniDesc },
    grahaMaitri: { score: grahaMaitriScore, max: 5, desc: grahaMaitriDesc },
    gana: { score: ganaScore, max: 6, desc: ganaDesc },
    bhakoot: { score: bhakootScore, max: 7, desc: bhakootDesc },
    nadi: { score: nadiScore, max: 8, desc: nadiDesc },
    totalScore,
    verdict,
    traditionalSummary,
  };
}
