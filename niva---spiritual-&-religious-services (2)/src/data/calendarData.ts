import { CalendarEvent } from '../types';

export const COMPREHENSIVE_CALENDAR_EVENTS: CalendarEvent[] = [
  // --- SEPTEMBER 2026 ---
  {
    id: 'ev-10',
    title: 'Ganesh Chaturthi (Vinayaka Chavithi)',
    religion: 'Hinduism',
    date: '2026-09-14',
    dayNumber: 14,
    monthName: 'September 2026',
    description: 'The grand advent of Lord Ganesha, the revered Remover of Obstacles (Vighnaharta) and embodiment of intellect, wisdom, and auspicious beginnings.',
    significance: 'Dispels spiritual obstacles, ushers in intellect, prosperity, and sanctifies homes with joyful devotion.',
    auspiciousTimings: 'Madhyahna Ganesha Puja Muhurat (11:08 AM - 01:34 PM)',
    storyAndHistory: 'Recorded in the Shiva Purana and Ganesha Purana: Goddess Parvati created Ganesha from sacred sandalwood paste to guard her inner sanctum. When Lord Shiva tested him, Ganesha stood firm in filial duty. Recognizing his pure devotion, Shiva restored him with the sacred elephant head and bestowed the boon that Ganesha shall be worshipped first (Prathama Pujya) before any auspicious ritual or venture on Earth.',
    howToCelebrate: [
      'Install the consecrated clay Ganesha idol on an elevated wooden chowki decorated with rangoli',
      'Perform Shodashopachara Puja (16 sacred offerings) led by a Vedic priest',
      'Offer 21 blades of fresh Durva grass and 21 red hibiscus flowers (Jaswand)',
      'Offer 21 freshly steamed Modaks, laddus, bananas, and coconut prasad',
      'Chant the sacred Ganesha Atharvashirsha Upanishad in unison with family',
      'Perform the vibrant evening Aarti with camphor flames and cymbals'
    ],
    fastingAndDiet: 'Devotees observe a sattvic fast until the Madhyahna puja concludes. Steamed Ukadiche Modaks made of rice flour, jaggery, coconut and cardamom are distributed as divine prasad.',
    sacredMantras: [
      {
        name: 'Ganesha Invocation Shloka',
        mantra: 'Vakratuṇḍa Mahākāya Sūryakoṭi Samaprabha | Nirvighnaṁ Kuru Mē Dēva Sarvakāryēṣu Sarvadā ||',
        translation: 'O Lord of curved trunk and immense radiant body, whose brilliance equals ten million suns, please make all my endeavors free of obstacles, always.'
      },
      {
        name: 'Ganesha Beeja Mantra',
        mantra: 'Oṁ Gaṁ Gaṇapatayē Namaḥ ||',
        translation: 'I bow in sacred reverence to Lord Ganapati, the universal sovereign of intellect and cosmic awareness.'
      }
    ],
    pujaItems: [
      {
        id: 'pj-gan-1',
        name: 'Fresh Red Hibiscus Flowers & Garlands',
        hindiOrTraditionalName: 'Rakta Pushpa (Jaswand)',
        quantity: '21 Flowers + 1 Mala',
        purpose: 'Lord Ganesha’s sacred blossom invoking planetary vitality and joy.',
        category: 'Essentials',
        inStock: true
      },
      {
        id: 'pj-gan-2',
        name: 'Sacred Durva Grass (Three-leaf Blades)',
        hindiOrTraditionalName: 'Durva Tri-patra',
        quantity: '21 Bunches',
        purpose: 'Cooling medicinal grass offering that pleases the divine belly of Ganesha.',
        category: 'Sacred Offerings',
        inStock: true
      },
      {
        id: 'pj-gan-3',
        name: 'Pure Desi Ghee & Solid Brass Aarti Diya',
        hindiOrTraditionalName: 'Karpura & Brass Diya',
        quantity: '1 Set + 500g Ghee',
        purpose: 'Dispels spiritual darkness and carries devotion into the ether.',
        category: 'Fragrance & Lamps',
        inStock: true
      },
      {
        id: 'pj-gan-4',
        name: 'Freshly Steamed Ukadiche Modaks & Sweets',
        hindiOrTraditionalName: 'Naivedya Modaks',
        quantity: '21 Pieces',
        purpose: 'Favorite ambrosial treat of Lord Ganesha symbolizing the sweet nectar of supreme wisdom.',
        category: 'Sacred Offerings',
        inStock: true
      },
      {
        id: 'pj-gan-5',
        name: 'Eco-Friendly Solitary Clay Ganesha Idol',
        hindiOrTraditionalName: 'Shuddha Shadu Mati Murti',
        quantity: '1 Sacred Murti',
        purpose: 'Traditional natural clay idol for Prana Pratishtha and environmentally pure Visarjan.',
        category: 'Essentials',
        inStock: true
      }
    ],
    kitProduct: {
      id: 'prod-kit-ganesh',
      name: 'Complete Ganesh Chaturthi Eco-Clay Idol & Samagri Kit',
      price: 48.0,
      image: 'https://images.unsplash.com/photo-1567591974584-f1832dfa6291?auto=format&fit=crop&w=500&q=80',
      rating: 4.98,
      reviewsCount: 420,
      description: 'Includes 100% natural clay Ganesha idol, 21 durva bunches, rakta pushpam, janeu, gangajal, kapoor, dhoop cones, and step-by-step puja guide book.'
    },
    primaryPanditId: 'prov-1',
    otherFaithPriests: [
      {
        religion: 'Islam',
        providerId: 'prov-2',
        ceremonyType: 'Dua of Divine Ease & Prosperity (Barkat)',
        note: 'Supplication for removing difficulties and blessing household endeavors with righteous success.'
      },
      {
        religion: 'Christianity',
        providerId: 'prov-3',
        ceremonyType: 'Family House Benediction & Grace Blessing',
        note: 'Prayer invoking divine wisdom, protective love, and mutual family warmth.'
      },
      {
        religion: 'Sikhism',
        providerId: 'prov-4',
        ceremonyType: 'Sarbat Da Bhala Ardas (Universal Well-being)',
        note: 'Sacred prayer to Akal Purakh for collective harmony, courage, and barrier removal.'
      },
      {
        religion: 'Buddhism',
        providerId: 'prov-5',
        ceremonyType: 'Paritta Blessing for Peace & Mindful Action',
        note: 'Ancient Pali chants wishing freedom from harm, emotional stability, and radiant metta.'
      }
    ],
    relatedServiceIds: ['srv-1', 'srv-10'],
    ceremonyPlaylistId: 'pl-1',
    ceremonyPlaylistTitle: 'Ganesh Devotional & Morning Ragas'
  },
  {
    id: 'ev-5',
    title: 'Paryushana Parva Mahaparva',
    religion: 'Jainism',
    date: '2026-09-08',
    dayNumber: 8,
    monthName: 'September 2026',
    description: 'The holiest period of spiritual purification, rigorous fasting, Kalpasutra recitation, and universal forgiveness (Michhami Dukkadam).',
    significance: 'Total detachment from material desires, cleansing accumulated karma, and seeking humble forgiveness from all living beings.',
    auspiciousTimings: '05:45 AM - 08:30 AM (Chaitya Vandan & Morning Pratikraman)',
    storyAndHistory: 'Paryushana translates to "abiding or staying in spiritual communion." Instituted by Bhagwan Mahavira, it is celebrated for 8 days (Swetambara) and 10 days (Das Lakshana by Digambara). The climax culminates in Samvatsari, the Day of Universal Forgiveness, where Jains greet all souls with "Michhami Dukkadam"—forgiving all offenses committed knowingly or unknowingly.',
    howToCelebrate: [
      'Observe Upvas (fasting from sunrise to sunset with boiled water only) or Ayambil',
      'Perform Samvatsari Pratikraman (introspection and repentance of transgressions)',
      'Recite 108 malas of the sacred Navkar Mantra',
      'Practice Ahimsa (complete non-violence) in thought, speech, and deeds',
      'Utter "Michhami Dukkadam" to family, friends, and adversaries'
    ],
    fastingAndDiet: 'Boiled water consumed only before sunset. Strict avoidance of root vegetables (potatoes, onions, garlic) and green leafy vegetables during the Mahaparva.',
    sacredMantras: [
      {
        name: 'Ṇamōkāra Mahamantra',
        mantra: 'Ṇamō Arihantāṇaṁ, Ṇamō Siddhāṇaṁ, Ṇamō Āyariyāṇaṁ, Ṇamō Uvajjhāyāṇaṁ, Ṇamō Lōē Savva Sāhūṇaṁ',
        translation: 'I bow to the enlightened souls (Arihants), the liberated souls (Siddhas), the spiritual teachers (Acharyas), the instructors (Upadhyayas), and all monks who follow the spiritual path.'
      },
      {
        name: 'Universal Forgiveness Shloka',
        mantra: 'Khāmemi Savva Jīvē, Savvē Jīvā Khamantu Mē | Mettī Mē Savva Bhūēsu, Vēraṁ Majjhaṁ Na Kēṇai ||',
        translation: 'I grant forgiveness to all living beings, and may all beings forgive me. I have friendship with all creatures, and enmity towards none.'
      }
    ],
    pujaItems: [
      {
        id: 'pj-101',
        name: 'Kesar & Sandalwood Paste',
        hindiOrTraditionalName: 'Kesar Chandan',
        quantity: '50g',
        purpose: 'For ceremonial tilak and anointing sacred Tirthankar pratima.',
        category: 'Essentials',
        inStock: true
      },
      {
        id: 'pj-102',
        name: 'Akshat (Unbroken Clean Rice)',
        hindiOrTraditionalName: 'Chokha / Akshat',
        quantity: '250g',
        purpose: 'Used to form the sacred Swastika, Ratnatraya (three jewels), and Siddhashila offerings.',
        category: 'Sacred Offerings',
        inStock: true
      },
      {
        id: 'pj-103',
        name: 'Pure Desi Ghee Deepak & Wicks',
        hindiOrTraditionalName: 'Ghee Ka Diya',
        quantity: '1 Set',
        purpose: 'Symbolizes shedding light on spiritual ignorance and invoking inner radiance.',
        category: 'Fragrance & Lamps',
        inStock: true
      },
      {
        id: 'pj-104',
        name: 'Silver/Brass Thali & Puja Cloth',
        hindiOrTraditionalName: 'Puja Thali',
        quantity: '1 Set',
        purpose: 'Pure ceremonial thali to arrange the Ashta-Prakari offerings.',
        category: 'Vessels & Sacred Cloth',
        inStock: true
      },
      {
        id: 'pj-105',
        name: 'Sandalwood Incense & Camphor',
        hindiOrTraditionalName: 'Dhoop & Kapoor',
        quantity: '1 Box',
        purpose: 'Purifying the meditation space and calming the breath during Pratikraman.',
        category: 'Fragrance & Lamps',
        inStock: true
      }
    ],
    kitProduct: {
      id: 'prod-kit-jain',
      name: 'Paryushana & Samvatsari Ashta-Prakari Puja Kit',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1620619767323-b95a89183081?auto=format&fit=crop&w=500&q=80',
      rating: 4.95,
      reviewsCount: 148,
      description: 'Contains authentic Kesar Chandan, unbroken akshat, pure cow ghee diya, raw supari, dry fruits, and Swastika guide.'
    },
    primaryPanditId: 'prov-1', // Vedic/Jain rites
    otherFaithPriests: [
      {
        religion: 'Buddhism',
        providerId: 'prov-5',
        ceremonyType: 'Ahimsa & Metta Mindfulness Blessing',
        note: 'Buddhist Karuna and Metta chants beautifully harmonize with Jain vows of universal non-violence.'
      },
      {
        religion: 'Christianity',
        providerId: 'prov-3',
        ceremonyType: 'Sacred Forgiveness & Family Peace Prayer',
        note: 'Pastoral service centered on reconciliation, cleansing of old grievances, and heartfelt forgiveness.'
      },
      {
        religion: 'Islam',
        providerId: 'prov-2',
        ceremonyType: 'Istighfar & Tauba (Seeking Divine Pardon)',
        note: 'Spiritual supplications focused on sincere repentance, humility, and peace with one’s fellow human beings.'
      },
      {
        religion: 'Sikhism',
        providerId: 'prov-4',
        ceremonyType: 'Sarbat Da Bhala Ardas & Shabad',
        note: 'Guru Granth Sahib prayers invoking universal goodwill, humility, and protection for all living creatures.'
      }
    ],
    recommendedRituals: ['Samvatsari Pratikraman', 'Upvas Fasting', 'Chaitya Vandan']
  },

  {
    id: 'ev-15',
    title: 'Anant Chaturdashi & Ganesh Visarjan',
    religion: 'Hinduism',
    date: '2026-09-15',
    dayNumber: 15,
    monthName: 'September 2026',
    description: 'The grand concluding day of Ganeshotsav and worship of Lord Ananta (Vishnu) with the 14-knot sacred protection thread.',
    significance: 'Surrendering to the infinite cosmic cycles of preservation and bidding farewell to Lord Ganesha with joyous prayers for his return.',
    auspiciousTimings: '06:08 AM - 11:45 AM (Visarjan Muhurat) & 04:30 PM - 06:15 PM (Pradosh Kaal)',
    storyAndHistory: 'Celebrated on the 14th day of the waxing moon in Bhadrapada. Pandavas in exile performed the Ananta Vrata under Lord Krishna’s guidance to regain their lost kingdom and peace. Simultaneously, communities take Lord Ganesha’s clay idols in musical processions to natural water bodies for immersion, returning the earth element back to nature.',
    howToCelebrate: [
      'Tie the sacred 14-knot red-yellow Ananta Sutra on the right arm (men) or left arm (women)',
      'Perform Shodashopachara puja of Lord Vishnu reclining on Sheshnaag',
      'Offer 14 pooris, sweet kheer, and 14 fruits as naivedya',
      'Conduct the final Uttar Puja and farewell Aarti for Lord Ganesha before Visarjan',
      'Chant "Ganpati Bappa Morya, Pudhchya Varshi Lavkar Ya!" during the immersion'
    ],
    fastingAndDiet: 'Devotees observe a single-meal sattvic fast. Salt is avoided until after the Ananta Vrata pooja is concluded.',
    sacredMantras: [
      {
        name: 'Lord Ananta Vrata Mantra',
        mantra: 'Ananta Saṁsāra Mahāsamudrē Magnān Samabhyuddhara Vāsudēva | Anantarūpē Viniyōjitātmā Hy Anantarūpāya Namō Namastē ||',
        translation: 'O Lord Vasudeva, lift us who are drowned in the infinite ocean of worldliness. You of boundless divine form, I dedicate my soul to Your eternal mercy.'
      },
      {
        name: 'Ganesh Visarjan Prarthana',
        mantra: 'Yāntu Dēvagaṇāḥ Sarvē Pūjāmādāya Māmakīm | Iṣṭakāma Samṛddhyarthaṁ Punarāgamanāya Ca ||',
        translation: 'O divine Lord Ganesha, accept our loving offerings, fulfill our noble desires, and return to us again next year.'
      }
    ],
    pujaItems: [
      {
        id: 'pj-151',
        name: 'Ananta Sutra (14-knot Silk Thread)',
        hindiOrTraditionalName: 'Anant Dhaga',
        quantity: '2 Pieces',
        purpose: 'Sanctified 14-knot sacred thread imbued with protective Vishnu mantras.',
        category: 'Essentials',
        inStock: true
      },
      {
        id: 'pj-152',
        name: 'Durva Grass & Modak Sweets',
        hindiOrTraditionalName: 'Durva & Ukadiche Modak',
        quantity: '21 Blades + 1 Box',
        purpose: 'Favorite cooling offering of Lord Ganesha for Uttar Puja.',
        category: 'Sacred Offerings',
        inStock: true
      },
      {
        id: 'pj-153',
        name: 'Camphor & Brass Aarti Thali',
        hindiOrTraditionalName: 'Kapoor & Aarti Diya',
        quantity: '1 Set',
        purpose: 'For performing the grand farewell Maha Aarti.',
        category: 'Fragrance & Lamps',
        inStock: true
      },
      {
        id: 'pj-154',
        name: 'Panchamrit (Milk, Curd, Ghee, Honey, Sugar)',
        hindiOrTraditionalName: 'Panchamrit Set',
        quantity: '1 Bowl',
        purpose: 'Ceremonial bath of Lord Vishnu and sacred Shaligram shila.',
        category: 'Sacred Offerings',
        inStock: true
      },
      {
        id: 'pj-155',
        name: 'Red Cloth & Janeu Sacred Thread',
        hindiOrTraditionalName: 'Lal Vastra & Janeu',
        quantity: '1.25 Meters + 2 Pairs',
        purpose: 'Altar decoration and offerings to Brahmin priests conducting the vrata.',
        category: 'Vessels & Sacred Cloth',
        inStock: true
      }
    ],
    kitProduct: {
      id: 'prod-kit-anant',
      name: 'Anant Chaturdashi & Visarjan Complete Samagri Box',
      price: 45.0,
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=500&q=80',
      rating: 4.96,
      reviewsCount: 310,
      description: 'Includes consecrated 14-knot Anant threads, Gangajal, fresh durva, pure hawan samagri, brass diya, and dhoop.'
    },
    primaryPanditId: 'prov-1',
    otherFaithPriests: [
      {
        religion: 'Christianity',
        providerId: 'prov-3',
        ceremonyType: 'Eucharistic Thanksgiving & Family Benediction',
        note: 'Expressing heartfelt gratitude for answered prayers and season harvest blessings.'
      },
      {
        religion: 'Buddhism',
        providerId: 'prov-5',
        ceremonyType: 'Impermanence (Anicca) & Water Cleansing Rite',
        note: 'Buddhist reflection on cyclical existence, release of attachments, and inner clarity.'
      },
      {
        religion: 'Sikhism',
        providerId: 'prov-4',
        ceremonyType: 'Chaupai Sahib Paath & Anand Sahib Kirtan',
        note: 'Prayers of supreme protection against obstacles and celebrating Divine victory.'
      },
      {
        religion: 'Islam',
        providerId: 'prov-2',
        ceremonyType: 'Shukrana (Gratitude) Dua & Needy Feeding',
        note: 'Expressing praise to the Almighty for blessings, health, and family prosperity.'
      }
    ],
    recommendedRituals: ['Ananta Vrata Sankalp', '14-Knot Sutra Bandhan', 'Visarjan Aarti']
  },

  {
    id: 'ev-6',
    title: 'Yom Kippur (The Day of Atonement)',
    religion: 'Judaism',
    date: '2026-09-21',
    dayNumber: 21,
    monthName: 'September 2026',
    description: 'The holiest Sabbath of Sabbaths in the Jewish calendar, dedicated to total fasting, intense introspection, and divine forgiveness.',
    significance: 'Spiritual rebirth through repentance (Teshuvah), prayer (Tefillah), and charity (Tzedakah), culminating in being inscribed in the Book of Life.',
    auspiciousTimings: 'Candle lighting at 06:12 PM (Sundown to Sundown 25-hour fast)',
    storyAndHistory: 'Originating in Leviticus 16, Yom Kippur was the single day of the year when the High Priest entered the Holy of Holies in the Temple of Jerusalem to make atonement for all people. Today, Jews worldwide wear white (symbolizing purity and equality) and participate in five distinct synagogue prayer services, ending with the dramatic blast of the Shofar.',
    howToCelebrate: [
      'Observe complete fast from food and drink for 25 consecutive hours',
      'Light the Yahrzeit memorial candle and holiday candles before sunset',
      'Attend the Kol Nidre service in synagogue dressed in white (Kittel)',
      'Recite the Vidui (communal confession of sins) with a contrite heart',
      'Listen to the Neilah service and final triumphant Shofar sounding'
    ],
    fastingAndDiet: 'Complete abstention from all food, water, bathing, and leather footwear from sunset on 9 Tishrei until nightfall on 10 Tishrei. Pre-fast meal (Seudah Hamafseket) is nourishing and gentle.',
    sacredMantras: [
      {
        name: 'The Shema Yisrael',
        mantra: 'Shema Yisrael, Adonai Eloheinu, Adonai Echad | Baruch Shem Kevod Malchuto Le’olam Va’ed',
        translation: 'Hear, O Israel: The Lord is our God, the Lord is One. Blessed is the Name of His glorious kingdom forever and ever.'
      },
      {
        name: 'Atonement Inscription Blessing',
        mantra: 'Gmar Chatimah Tovah',
        translation: 'May you be sealed for a good year in the Book of Life.'
      }
    ],
    pujaItems: [
      {
        id: 'pj-601',
        name: 'Yahrzeit 26-Hour Memorial Candle',
        hindiOrTraditionalName: 'Yahrzeit Light',
        quantity: '2 Glasses',
        purpose: 'To honor the souls of departed ancestors and illuminate the sacred sanctuary.',
        category: 'Fragrance & Lamps',
        inStock: true
      },
      {
        id: 'pj-602',
        name: 'Machzor (Yom Kippur Prayer Book)',
        hindiOrTraditionalName: 'Machzor',
        quantity: '1 Book',
        purpose: 'Comprehensive liturgy for Kol Nidre, Shacharit, Musaf, and Neilah prayers.',
        category: 'Essentials',
        inStock: true
      },
      {
        id: 'pj-603',
        name: 'White Linen Kittel & Tallit',
        hindiOrTraditionalName: 'White Robe & Prayer Shawl',
        quantity: '1 Set',
        purpose: 'Worn during services as a symbol of angelic purity and humility before God.',
        category: 'Vessels & Sacred Cloth',
        inStock: true
      },
      {
        id: 'pj-604',
        name: 'Natural Ram Horn Shofar',
        hindiOrTraditionalName: 'Shofar',
        quantity: '1 Piece',
        purpose: 'Sounded at the conclusion of the fast to announce divine forgiveness and renewal.',
        category: 'Essentials',
        inStock: true
      },
      {
        id: 'pj-605',
        name: 'Kosher Havdalah Spices & Braided Candle',
        hindiOrTraditionalName: 'Besamim & Ner',
        quantity: '1 Set',
        purpose: 'To conclude the holy fast at nightfall with fragrant spice benedictions.',
        category: 'Fragrance & Lamps',
        inStock: true
      }
    ],
    kitProduct: {
      id: 'prod-kit-jewish',
      name: 'High Holidays Yom Kippur Preparation Set',
      price: 52.0,
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=80',
      rating: 4.97,
      reviewsCount: 165,
      description: 'Includes 26-hour memorial glass candles, silver-accent Havdalah spice container, cloves, and Hebrew-English Machzor guide.'
    },
    primaryPanditId: 'prov-6',
    otherFaithPriests: [
      {
        religion: 'Christianity',
        providerId: 'prov-3',
        ceremonyType: 'Sacrament of Reconciliation & Grace',
        note: 'Reflective scripture readings on atonement, mercy, and peace through Christ.'
      },
      {
        religion: 'Islam',
        providerId: 'prov-2',
        ceremonyType: 'Yom-e-Ashoora & Tauba Supplication',
        note: 'Islamic fasting traditions commemorating the deliverance of Prophet Moses and seeking forgiveness.'
      },
      {
        religion: 'Hinduism',
        providerId: 'prov-1',
        ceremonyType: 'Prayashchitta & Shanti Havan',
        note: 'Vedic rituals of self-expiation, purification of karmic debt, and inner tranquility.'
      },
      {
        religion: 'Buddhism',
        providerId: 'prov-5',
        ceremonyType: 'Uposatha Observance & Karmic Cleansing',
        note: 'Full-day monastic retreat on ethical renewal, mindfulness, and releasing resentment.'
      }
    ],
    recommendedRituals: ['Kol Nidre Service', '25-hour Fast', 'Neilah Benediction']
  },

  {
    id: 'ev-2',
    title: 'Mawlid al-Nabi (Milad un-Nabi)',
    religion: 'Islam',
    date: '2026-09-25',
    dayNumber: 25,
    monthName: 'September 2026',
    description: 'The joyous commemoration of the birth and teachings of Prophet Muhammad (PBUH), sent as a mercy to all creations.',
    significance: 'Reflecting upon the noble character (Akhlaq), generosity, compassion, and peace taught by the Messenger of God.',
    auspiciousTimings: 'After Maghrib through late night (12th Rabi al-Awwal)',
    storyAndHistory: 'Observed on the 12th of Rabi al-Awwal across the Muslim world. Communities gather in homes and mosques to recite Qasida al-Burdah, recount stories of the Prophet’s compassion towards the poor, animals, and strangers, and feed the hungry generously.',
    howToCelebrate: [
      'Recite Salawat (Durood Sharif) upon the Prophet with family and congregation',
      'Listen to Seerah lectures recounting his life, compassion, and peacemaking',
      'Distribute sweet treats, sherbet, and warm meals to neighbors and the poor',
      'Adorn homes and streets with respectful green, white, and golden lights',
      'Engage in extra voluntary charity (Sadaqah) and humanitarian service'
    ],
    fastingAndDiet: 'Voluntary daytime fast (Sunnah) followed by a festive community dinner with sweet halwa, fragrant biryani, and dates.',
    sacredMantras: [
      {
        name: 'Durood-e-Ibrahimi (Salawat)',
        mantra: 'Allāhumma ṣalli ‘alā Muḥammadin wa ‘alā āli Muḥammadin, kamā ṣallayta ‘alā Ibrāhīma wa ‘alā āli Ibrāhīma, innaka Ḥamīdun Majīd.',
        translation: 'O Allah, bestow peace upon Muhammad and the family of Muhammad, as You bestowed peace upon Abraham and his family. Truly You are Praiseworthy, Glorious.'
      },
      {
        name: 'Quranic Verse of Mercy',
        mantra: 'Wa mā arsalnāka illā raḥmatan lil-‘ālamīn (Surah Al-Anbiya 21:107)',
        translation: 'And We have not sent you, [O Muhammad], except as a mercy to the worlds.'
      }
    ],
    pujaItems: [
      {
        id: 'pj-201',
        name: 'Pure Non-Alcoholic Attar (Rose & Sandalwood)',
        hindiOrTraditionalName: 'Ruh Gulab Attar',
        quantity: '12ml Bottle',
        purpose: 'Applied before entering the prayer gathering as per Islamic Sunnah etiquette.',
        category: 'Fragrance & Lamps',
        inStock: true
      },
      {
        id: 'pj-202',
        name: 'Deluxe Oud Bakhoor & Charcoal Burner',
        hindiOrTraditionalName: 'Oud Bakhoor Set',
        quantity: '1 Box + Burner',
        purpose: 'Infuses the home with soothing, heavenly sacred aroma during Durood recitation.',
        category: 'Fragrance & Lamps',
        inStock: true
      },
      {
        id: 'pj-203',
        name: 'Handcrafted Olive Wood Tasbeeh (Prayer Beads)',
        hindiOrTraditionalName: '100-Bead Tasbih',
        quantity: '1 Piece',
        purpose: 'To count 1,000 recitations of Salawat upon the Messenger.',
        category: 'Essentials',
        inStock: true
      },
      {
        id: 'pj-204',
        name: 'Rosewater Sprinkler (Gulabpash)',
        hindiOrTraditionalName: 'Gulab-pash',
        quantity: '1 Brass Vessel',
        purpose: 'Traditional welcoming of guests and attendees with fragrant holy rosewater.',
        category: 'Vessels & Sacred Cloth',
        inStock: true
      },
      {
        id: 'pj-205',
        name: 'Medina Ajwa Dates & Sweet Mithai Box',
        hindiOrTraditionalName: 'Tabarruk Sweets',
        quantity: '500g',
        purpose: 'Blessed food distributed to all seekers and family members.',
        category: 'Sacred Offerings',
        inStock: true
      }
    ],
    kitProduct: {
      id: 'prod-kit-islam',
      name: 'Mawlid Celebration & Durood Gathering Gift Box',
      price: 44.0,
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=500&q=80',
      rating: 4.98,
      reviewsCount: 220,
      description: 'Includes premium natural Taif rose attar, amber bakhoor chips, metallic burner, olive wood 99-bead tasbih, and Seerah booklet.'
    },
    primaryPanditId: 'prov-2',
    otherFaithPriests: [
      {
        religion: 'Christianity',
        providerId: 'prov-3',
        ceremonyType: 'Prophetic Peace & Fellowship Gathering',
        note: 'Honoring monotheistic heritage, Abrahamic lineage, and neighborly love.'
      },
      {
        religion: 'Sikhism',
        providerId: 'prov-4',
        ceremonyType: 'Sufi-Bhakti Interfaith Shabad Kirtan',
        note: 'Reciting verses of Baba Farid and saint-poets preserved in Guru Granth Sahib.'
      },
      {
        religion: 'Hinduism',
        providerId: 'prov-1',
        ceremonyType: 'Universal Vasudhaiva Kutumbakam Peace Yajna',
        note: 'Vedic invocation for world peace, communal amity, and the welfare of all humanity.'
      },
      {
        religion: 'Buddhism',
        providerId: 'prov-5',
        ceremonyType: 'Loving-Kindness (Metta) Blessing',
        note: 'Chanting for universal harmony, compassionate coexistence, and relief of suffering.'
      }
    ],
    recommendedRituals: ['Salawat Recitation', 'Feeding the Needy', 'Quran Tilawat']
  },

  {
    id: 'ev-3',
    title: 'Feast of Saint Michael & All Archangels',
    religion: 'Christianity',
    date: '2026-09-29',
    dayNumber: 29,
    monthName: 'September 2026',
    description: 'Michaelmas honors the leader of the heavenly host who champions divine light, justice, and spiritual defense.',
    significance: 'Courage in times of adversity, divine protection against malice, and harvest gratitude.',
    auspiciousTimings: '10:00 AM (Solemn High Mass) & Sunset Family Grace',
    storyAndHistory: 'Recorded in the Book of Revelation (12:7-9), Archangel Michael cast down the dragon of pride and falsehood. Throughout the Middle Ages, Michaelmas was an essential quarter day marking seasonal transition, tenant renewals, and autumn harvest thanksgiving with Michaelmas daisies and roast bread.',
    howToCelebrate: [
      'Attend Holy Communion or church service dedicated to the Holy Angels',
      'Light a white altar candle and pray the St. Michael Prayer for family protection',
      'Bake traditional St. Michael Bannock or blackberry autumn pie',
      'Donate food hampers to local shelters in thanksgiving for the harvest',
      'Perform acts of moral courage and defense of vulnerable community members'
    ],
    fastingAndDiet: 'Festive family dinner featuring autumn apples, rustic wheat bread, roasted vegetables, and honeyed pastries.',
    sacredMantras: [
      {
        name: 'Saint Michael the Archangel Prayer',
        mantra: 'Sancte Michael Archangele, defende nos in proelio, contra nequitiam et insidias diaboli esto praesidium.',
        translation: 'Saint Michael the Archangel, defend us in battle; be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray.'
      },
      {
        name: 'The Seraphic Hymn (Sanctus)',
        mantra: 'Sanctus, Sanctus, Sanctus Dominus Deus Sabaoth. Pleni sunt caeli et terra gloria tua. Hosanna in excelsis.',
        translation: 'Holy, Holy, Holy Lord God of hosts. Heaven and earth are full of your glory. Hosanna in the highest.'
      }
    ],
    pujaItems: [
      {
        id: 'pj-301',
        name: 'Beeswax Altar Pillar Candles',
        hindiOrTraditionalName: 'Sanctuary Tapers',
        quantity: 'Pair of 2',
        purpose: 'Symbol of Christ the Light of the World and the angelic flame of Michael.',
        category: 'Fragrance & Lamps',
        inStock: true
      },
      {
        id: 'pj-302',
        name: 'Frankincense & Myrrh Church Resin',
        hindiOrTraditionalName: 'Holy Incense',
        quantity: '100g',
        purpose: 'Incense smoke carrying the prayers of the saints to the throne of God.',
        category: 'Fragrance & Lamps',
        inStock: true
      },
      {
        id: 'pj-303',
        name: 'Olive Wood Jerusalem Holding Cross',
        hindiOrTraditionalName: 'Pocket Cross',
        quantity: '1 Piece',
        purpose: 'Personal devotion, tactile prayer, and symbol of unshakeable faith.',
        category: 'Essentials',
        inStock: true
      },
      {
        id: 'pj-304',
        name: 'Lourdes / Blessed Holy Water Phial',
        hindiOrTraditionalName: 'Holy Water',
        quantity: '50ml',
        purpose: 'Sprinkling of thresholds, doors, and family members for spiritual grace.',
        category: 'Sacred Offerings',
        inStock: true
      },
      {
        id: 'pj-305',
        name: 'Pure White Linen Altar Runner',
        hindiOrTraditionalName: 'Altar Cloth',
        quantity: '1 Piece',
        purpose: 'Draped upon home shrines honoring the angelic realm.',
        category: 'Vessels & Sacred Cloth',
        inStock: true
      }
    ],
    kitProduct: {
      id: 'prod-kit-christian',
      name: 'Archangel Michael Family Protection & Blessing Kit',
      price: 48.0,
      image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=500&q=80',
      rating: 4.96,
      reviewsCount: 190,
      description: 'Features solid olive wood crucifix, pure beeswax sanctuary candles, Jerusalem frankincense, brass charcoal censer, and Latin/English prayer card.'
    },
    primaryPanditId: 'prov-3',
    otherFaithPriests: [
      {
        religion: 'Hinduism',
        providerId: 'prov-1',
        ceremonyType: 'Kavacha Paath & Raksha Havan',
        note: 'Vedic protective incantations (Durga / Narasimha Kavacha) for safeguarding homes from negativity.'
      },
      {
        religion: 'Judaism',
        providerId: 'prov-6',
        ceremonyType: 'Birkat HaBayit (Home Blessing & Mezuzah Check)',
        note: 'Traditional Hebrew blessings dedicating the home to peace, health, and guardian angels.'
      },
      {
        religion: 'Islam',
        providerId: 'prov-2',
        ceremonyType: 'Surah Al-Falaq & An-Nas Protection Dua',
        note: 'Recitations of the protective Mu’awwidhatayn asking for divine refuge and shelter.'
      },
      {
        religion: 'Sikhism',
        providerId: 'prov-4',
        ceremonyType: 'Chandi Di Var & Bir Ras Gurbani Recitation',
        note: 'Hymns of spiritual valor, fearless courage, and overcoming mental doubts.'
      }
    ],
    recommendedRituals: ['Holy Communion', 'Prayer for Protection', 'Family Feast']
  },

  // --- OCTOBER 2026 ---
  {
    id: 'ev-1',
    title: 'Maha Navratri & Durga Ashtami',
    religion: 'Hinduism',
    date: '2026-10-18',
    dayNumber: 18,
    monthName: 'October 2026',
    description: 'The triumph of Divine Mother Durga over demon Mahishasura, celebrated with Kanya Puja, Sandhi Puja, and Chandi Paath.',
    significance: 'Awakening of dormant Shakti, slaying ego and inner demons, and honoring divine feminine energy.',
    auspiciousTimings: '06:14 AM - 09:30 AM (Ashtami Puja) & 07:15 PM (Sandhi Puja Muhurat)',
    storyAndHistory: 'Devi Durga was manifested through the combined effulgence of Brahma, Vishnu, and Shiva when Mahishasura became invincible through celestial boons. For nine fierce nights and days, the Goddess fought with celestial weapons until Ashtami and Navami when the demon was vanquished. Ashtami specifically venerates Goddess Mahagauri, representing boundless forgiveness and pure illumination.',
    howToCelebrate: [
      'Perform Kanya Pujan: invite nine young girls, wash their feet, and offer them halwa, puri, chana, and gifts',
      'Conduct Sandhi Puja at the juncture between Ashtami and Navami with 108 lotus flowers and 108 earthen lamps',
      'Recite the Durga Saptashati (Devi Mahatmyam) chapters 1 to 13',
      'Perform the sacred Hawan offering dry fruits, ghee, and samagri into Agni Dev',
      'Observe Vrat with falahari fruits and sabudana khichdi'
    ],
    fastingAndDiet: 'Strict falahari fast: singhara (water chestnut) flour, buckwheat (kuttu), rock salt (sendha namak), milk, curd, and seasonal fruits. No grains, pulses, onion, or garlic.',
    sacredMantras: [
      {
        name: 'Navarna Mantra (Supreme Shakti Chants)',
        mantra: 'Oṁ Aiṁ Hrīṁ Klīṁ Cāmuṇḍāyai Viccē ||',
        translation: 'Salutations to the Supreme Goddess who combines the energies of Mahasaraswati (creation), Mahalakshmi (preservation), and Mahakali (liberation).'
      },
      {
        name: 'Devi Sarva Mangala Shloka',
        mantra: 'Sarva Maṅgala Māṅgalyē Śivē Sarvārtha Sādhikē | Śaraṇyē Tryambakē Gaurī Nārāyaṇī Namō’stu Tē ||',
        translation: 'O auspiciousness of all that is auspicious, O gentle one, the fulfiller of all aims, the refuge, the three-eyed one, O Gauri, praise be to You, Divine Mother Narayani!'
      }
    ],
    pujaItems: [
      {
        id: 'pj-1001',
        name: 'Organic Hawan Samagri & Samidha Wood',
        hindiOrTraditionalName: 'Hawan Samagri & Mango Wood',
        quantity: '500g + 1 Bundle',
        purpose: 'Sacred oblations offered into the holy fire during Ashtami Havan.',
        category: 'Essentials',
        inStock: true
      },
      {
        id: 'pj-1002',
        name: 'Red Chunri, Bindi & Shringar Set',
        hindiOrTraditionalName: 'Mata Ki Chunri & Shringar',
        quantity: '1 Set of 16 Items',
        purpose: 'Offerings to Divine Mother and gifts for the 9 young girls during Kanya Puja.',
        category: 'Vessels & Sacred Cloth',
        inStock: true
      },
      {
        id: 'pj-1003',
        name: 'Pure Desi Cow Ghee & Camphor (Kapoor)',
        hindiOrTraditionalName: 'Desi Ghee & Bhimseni Kapoor',
        quantity: '500ml + 50g',
        purpose: 'Feeding the eternal Akhand Diya and continuous sacred fire offerings.',
        category: 'Fragrance & Lamps',
        inStock: true
      },
      {
        id: 'pj-1004',
        name: '108 Fresh Red Hibiscus / Lotus Flowers',
        hindiOrTraditionalName: 'Gudhal / Kamal Pushpa',
        quantity: '108 Flowers',
        purpose: 'Dedicated to Maa Durga during the intense Sandhi Puja moment.',
        category: 'Sacred Offerings',
        inStock: true
      },
      {
        id: 'pj-1005',
        name: 'Gangajal, Kumkum, Roli & Mauli',
        hindiOrTraditionalName: 'Gangajal & Kalawa',
        quantity: '1 Complete Box',
        purpose: 'Purifying the altar, drawing the Ashtadal lotus yantra, and tying protective wristbands.',
        category: 'Essentials',
        inStock: true
      }
    ],
    kitProduct: {
      id: 'prod-kit-navratri',
      name: 'Maha Navratri & Durga Ashtami Hawan Kit',
      price: 54.99,
      image: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=500&q=80',
      rating: 4.99,
      reviewsCount: 420,
      description: 'Complete 36-item kit containing pure desi cow ghee, Bhimseni camphor, 9-herb Navagraha wood, dry fruits, Mata Chunri, and brass Havan Kund.'
    },
    primaryPanditId: 'prov-1',
    otherFaithPriests: [
      {
        religion: 'Sikhism',
        providerId: 'prov-4',
        ceremonyType: 'Chandi Di Var & Universal Shakti Recitation',
        note: 'Tenth Master Guru Gobind Singh’s heroic poetry honoring the celestial triumph over tyrannical darkness.'
      },
      {
        religion: 'Christianity',
        providerId: 'prov-3',
        ceremonyType: 'Magnificat & Blessed Mother Mary Benediction',
        note: 'Christian honoring of divine motherhood, humility, and the uplifting of the lowly.'
      },
      {
        religion: 'Buddhism',
        providerId: 'prov-5',
        ceremonyType: 'Green Tara Compassion & Protection Dharani',
        note: 'Invoking the Mother of all Buddhas to liberate living souls from fear, pride, and sorrow.'
      },
      {
        religion: 'Islam',
        providerId: 'prov-2',
        ceremonyType: 'Dua for Mothers & Daughters (Izzat-o-Barkat)',
        note: 'Special prayer honoring maternal blessings and conferring honor upon girl children.'
      }
    ],
    recommendedRituals: ['Kanya Puja', 'Hawan', 'Saraswati Puja']
  },

  {
    id: 'ev-7',
    title: 'Pavarana & Kathina Day',
    religion: 'Buddhism',
    date: '2026-10-26',
    dayNumber: 26,
    monthName: 'October 2026',
    description: 'Conclusion of the 3-month monastic Vassa retreat and the joyous lay community offering of Kathina robes.',
    significance: 'Mutual support between monastics and laypeople, generosity (Dana), humility, and reciprocal spiritual care.',
    auspiciousTimings: '07:30 AM (Alms Giving Pindapata) & 02:00 PM (Kathina Civara Ceremony)',
    storyAndHistory: 'Instituted by Gautama Buddha while residing at Jetavana monastery in Savatthi. Thirty monks traveling through torrential monsoon rains arrived with mud-soaked robes. Moved by their discipline, the Buddha permitted lay disciples to weave and present new saffron robes to the monastic Sangha during a 1-month post-rains window.',
    howToCelebrate: [
      'Offer early morning alms (Pindapata food) to Buddhist monks and nuns',
      'Present the ceremonial yellow Kathina Civara robe to the Sangha community',
      'Practice Vipassana silent sitting meditation and Metta (loving-kindness) radiation',
      'Clean and beautify the Vihara / temple grounds alongside fellow disciples',
      'Listen to the Dhammacakkappavattana Sutta on the Four Noble Truths'
    ],
    fastingAndDiet: 'Vegetarian meals consumed before noon (monastic timing), followed by herbal tea and light fruit juices in the evening.',
    sacredMantras: [
      {
        name: 'The Ti-Sarana (Three Refuges)',
        mantra: 'Buddhaṁ saraṇaṁ gacchāmi. Dhammaṁ saraṇaṁ gacchāmi. Saṅghaṁ saraṇaṁ gacchāmi.',
        translation: 'I take refuge in the Buddha (the Awakened One). I take refuge in the Dhamma (the Truth). I take refuge in the Sangha (the Community of Seekers).'
      },
      {
        name: 'Kathina Dana Dedication',
        mantra: 'Imaṁ kathina-dussaṁ saṅghassa dema. Kathinattharāya.',
        translation: 'We offer this Kathina cloth to the Sangha for the formal ceremony of robe-making. May it bring boundless merit to all beings.'
      }
    ],
    pujaItems: [
      {
        id: 'pj-701',
        name: 'Saffron Monastic Civara Robe Cloth',
        hindiOrTraditionalName: 'Kathina Civara',
        quantity: '1 Set of 3 Pieces',
        purpose: 'The central auspicious offering made to the resident Buddhist monastic order.',
        category: 'Vessels & Sacred Cloth',
        inStock: true
      },
      {
        id: 'pj-702',
        name: 'Pure Sandalwood Meditation Incense',
        hindiOrTraditionalName: 'Tibetan Sandalwood Sticks',
        quantity: '1 Roll of 35 Sticks',
        purpose: 'Scenting the meditation hall and supporting alert, calm breath awareness.',
        category: 'Fragrance & Lamps',
        inStock: true
      },
      {
        id: 'pj-703',
        name: 'Brass Lotus Water Offering Bowls',
        hindiOrTraditionalName: 'Water Offering Set',
        quantity: 'Set of 7 Bowls',
        purpose: 'Symbolizes the seven pure qualities of mind: purity, generosity, patience, and joy.',
        category: 'Vessels & Sacred Cloth',
        inStock: true
      },
      {
        id: 'pj-704',
        name: 'White Lotus Flowers & Jasmine Garland',
        hindiOrTraditionalName: 'Lotus Offerings',
        quantity: '12 Blossoms',
        purpose: 'Symbolizes spiritual awakening rising untainted from worldly mud.',
        category: 'Sacred Offerings',
        inStock: true
      },
      {
        id: 'pj-705',
        name: 'Tea, Medicine & Monastic Requisites Pack',
        hindiOrTraditionalName: 'Dana Requisites Kit',
        quantity: '1 Box',
        purpose: 'Practical daily sustenance items offered to support the monks’ health.',
        category: 'Essentials',
        inStock: true
      }
    ],
    kitProduct: {
      id: 'prod-kit-buddhism',
      name: 'Kathina Day Monastic Dana & Alms Ceremony Set',
      price: 49.0,
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=500&q=80',
      rating: 4.97,
      reviewsCount: 154,
      description: 'Includes premium saffron robe fabric, 7 brass offering bowls, Sandalwood temple incense, and Pali chanting handbook.'
    },
    primaryPanditId: 'prov-5',
    otherFaithPriests: [
      {
        religion: 'Hinduism',
        providerId: 'prov-1',
        ceremonyType: 'Bhiksha Vandana & Sadhu Seva Blessing',
        note: 'Vedic honoring of renunciates and ascetics who sacrifice worldly comforts for cosmic welfare.'
      },
      {
        religion: 'Christianity',
        providerId: 'prov-3',
        ceremonyType: 'Franciscan Blessing of Simplicity & Charity',
        note: 'In the spirit of Saint Francis of Assisi, celebrating detachment and universal brotherhood.'
      },
      {
        religion: 'Sikhism',
        providerId: 'prov-4',
        ceremonyType: 'Dasvandh & Community Langar Blessing',
        note: 'Sikh practice of giving 10% of earnings towards serving humanity with open hearts.'
      },
      {
        religion: 'Judaism',
        providerId: 'prov-6',
        ceremonyType: 'Tzedakah & Gemilut Hasadim Dedication',
        note: 'Biblical commandments of righteous giving and acts of loving-kindness.'
      }
    ],
    recommendedRituals: ['Civara Robe Offering', 'Metta Meditation', 'Chanting']
  },

  // --- NOVEMBER 2026 ---
  {
    id: 'ev-8',
    title: 'Diwali (Deepawali & Maha Lakshmi Puja)',
    religion: 'Hinduism',
    date: '2026-11-08',
    dayNumber: 8,
    monthName: 'November 2026',
    description: 'The sublime Festival of Lights celebrating the victory of divine light over ignorance, welcoming Goddess Lakshmi and Lord Ganesha.',
    significance: 'Spiritual illumination of the inner soul, welcoming cosmic prosperity, ethical commerce, and auspicious new beginnings.',
    auspiciousTimings: '05:42 PM - 07:38 PM (Pradosh Kaal) & 11:39 PM - 12:31 AM (Maha Nishita Kaal)',
    storyAndHistory: 'Diwali celebrates the joyous return of Maryada Purushottam Lord Rama, Sita, and Lakshmana to Ayodhya after 14 years of exile and the defeat of Ravana. The citizens illuminated every courtyard with earthen lamps. Furthermore, during the churning of the cosmic ocean (Samudra Manthan), Goddess Lakshmi emerged on this Kartik Amavasya to bestow abundance upon the world.',
    howToCelebrate: [
      'Draw vibrant colored rice powder Rangoli at the home entrance to invite Goddess Lakshmi',
      'Place lighted clay diyas filled with pure mustard oil or cow ghee in every room, balcony, and doorstep',
      'Perform the sacred Lakshmi-Ganesh Shodashopachara Puja during Pradosh Kaal',
      'Conduct Chopda Pujan (consecration of new business account books and pens)',
      'Exchange sweets (mithai) and gifts with loved ones, forgiving past animosities'
    ],
    fastingAndDiet: 'Devotees keep a fast during daytime, concluding after the evening Lakshmi Puja with sweet saffron kheer, dry fruit laddoos, and a festive family feast.',
    sacredMantras: [
      {
        name: 'Maha Lakshmi Beej Mantra',
        mantra: 'Oṁ Śrīṁ Klīṁ Mahālakṣmyai Namaḥ | Oṁ Hrīṁ Śrīṁ Lakṣmībhyō Namaḥ ||',
        translation: 'Salutations to the Supreme Goddess Lakshmi, the radiant embodiment of divine abundance, good fortune, and spiritual wealth.'
      },
      {
        name: 'Deepa Jyoti Invocational Shloka',
        mantra: 'Śubhaṁ Karōti Kalyāṇam Ārōgyaṁ Dhana Sampadā | Śatru Buddhi Vināśāya Dīpa Jyōtir Namō’stu Tē ||',
        translation: 'I bow to the flame of the sacred lamp, which bestows auspiciousness, prosperity, health, and destroys dark, adversarial thoughts.'
      }
    ],
    pujaItems: [
      {
        id: 'pj-801',
        name: 'Handcrafted Terracotta Clay Diyas & Cotton Wicks',
        hindiOrTraditionalName: 'Mitti Ke Diye & Phool Batti',
        quantity: 'Pack of 31 Diyas',
        purpose: 'Illuminating all corners of the home to welcome Divine Mother Lakshmi.',
        category: 'Fragrance & Lamps',
        inStock: true
      },
      {
        id: 'pj-802',
        name: 'Pure Silver Lakshmi-Ganesh Consecrated Coin',
        hindiOrTraditionalName: 'Shri Chandi Ka Sikka',
        quantity: '10g (999 Pure)',
        purpose: 'Kept in the puja thali and safe vault as a permanent magnet for prosperity.',
        category: 'Essentials',
        inStock: true
      },
      {
        id: 'pj-803',
        name: 'Lotus Seeds (Kamalgatta) & Yellow Cowries',
        hindiOrTraditionalName: 'Kamalgatta Mala & Peeli Kodi',
        quantity: '1 Mala + 11 Kodis',
        purpose: 'Sacred to Goddess Lakshmi, used for wealth-attracting mantra japa.',
        category: 'Sacred Offerings',
        inStock: true
      },
      {
        id: 'pj-804',
        name: 'Batasha, Puffed Rice (Kheel) & Motichoor Laddoo',
        hindiOrTraditionalName: 'Kheel Batashe & Laddoo',
        quantity: '500g Assorted',
        purpose: 'Traditional harvest naivedya offered during Diwali evening aarti.',
        category: 'Sacred Offerings',
        inStock: true
      },
      {
        id: 'pj-805',
        name: 'Red & Yellow Velvet Altar Asana',
        hindiOrTraditionalName: 'Puja Chawki Vastra',
        quantity: '1 Embroidered Cloth',
        purpose: 'Draped upon the wooden altar chowki for placing the divine deities.',
        category: 'Vessels & Sacred Cloth',
        inStock: true
      }
    ],
    kitProduct: {
      id: 'prod-kit-diwali',
      name: 'Deluxe Diwali Deepawali Maha Lakshmi Puja Box',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80',
      rating: 4.99,
      reviewsCount: 580,
      description: 'Contains 31 clay diyas, 999 pure silver Lakshmi-Ganesh coin, Kamalgatta mala, 11 Peeli Kodis, brass aarti thali, pure desi ghee, and red velvet asana.'
    },
    primaryPanditId: 'prov-1',
    otherFaithPriests: [
      {
        religion: 'Sikhism',
        providerId: 'prov-4',
        ceremonyType: 'Bandi Chhor Divas Celebration & Kirtan',
        note: 'Sikh festival on the same night celebrating Guru Hargobind Ji’s release of 52 innocent kings from Gwalior Fort.'
      },
      {
        religion: 'Jainism',
        providerId: 'prov-1',
        ceremonyType: 'Bhagwan Mahavira Nirvana & Kevalgyan Puja',
        note: 'Commemorating the liberation and supreme enlightenment of Bhagwan Mahavira on Diwali morning.'
      },
      {
        religion: 'Christianity',
        providerId: 'prov-3',
        ceremonyType: 'Festival of Lights & Universal Peace Benediction',
        note: 'Scriptural prayer on Christ as the Light of the World, promoting fellowship among all neighbors.'
      },
      {
        religion: 'Islam',
        providerId: 'prov-2',
        ceremonyType: 'Dua-e-Barkat for Honest Commerce & Peace',
        note: 'Supplications for integrity in business transactions, abundance, and friendly communal ties.'
      }
    ],
    recommendedRituals: ['Diyas Lighting', 'Lakshmi-Ganesh Puja', 'Sweet Distribution']
  },

  {
    id: 'ev-4',
    title: 'Guru Nanak Dev Ji Gurpurab',
    religion: 'Sikhism',
    date: '2026-11-24',
    dayNumber: 24,
    monthName: 'November 2026',
    description: 'Prakash Utsav marking the 557th birth anniversary of Guru Nanak Dev Ji, champion of universal oneness, seva, and equality.',
    significance: 'Promoting "Naam Japna" (meditation on God), "Kirat Karo" (honest living), and "Vand Chhako" (selfless sharing with the needy).',
    auspiciousTimings: 'Amrit Vela (04:00 AM - 06:30 AM) & Night Prakash Samagam (11:30 PM)',
    storyAndHistory: 'Born at Rai Bhoi Di Talwandi (Nankana Sahib) in 1469, Guru Nanak Dev Ji proclaimed "Na koi hindu, na koi musalman"—recognizing all humanity as the single creation of the One Universal Creator (Ik Onkar). He traveled thousands of miles across Asia on four long journeys (Udasis) dispelling superstition, championing women’s dignity, and establishing the community kitchen (Langar).',
    howToCelebrate: [
      'Join the early morning Prabhat Pheri musical procession singing Gurbani hymns',
      'Attend the concluding Bhog ceremony of the 48-hour continuous Akhand Path',
      'Prepare and offer hot Karah Prasad cooked with equal parts wheat flour, desi ghee, and sugar',
      'Engage in selfless voluntary community service (Seva) in the Gurdwara Langar hall',
      'Light candles and oil lamps around the home in honor of the dispeller of darkness'
    ],
    fastingAndDiet: 'In Sikhism, fasting is not required; instead, devotees partake in communal Langar: wholesome vegetarian dal, roti, kheer, and seasonal vegetables eaten sitting together on equal floor mats.',
    sacredMantras: [
      {
        name: 'The Mool Mantar',
        mantra: 'Ik Oaṅkār Sat Nām Kartā Purakh Nirbhau Nirvair Akāl Mūrat Ajūnī Saibhaṅ Gur Prasād | Jap || Ād Sach Jugād Sach | Hai Bhī Sach Nānak Hosī Bhī Sach ||',
        translation: 'There is One Universal Creator. Truth is His Name. He is the Creator, fearless, devoid of malice, immortal, unborn, self-existent. Attained by the Grace of the True Guru. True in the beginning, True through the ages, True even now, O Nanak, He shall ever be True!'
      },
      {
        name: 'The Universal Salok',
        mantra: 'Pawan Gurū Pāṇī Pitā Mātā Dharat Mahat | Divas Rāt Dui Dāī Dāiā Khēlat Sagal Jagat ||',
        translation: 'Air is the Guru, Water is the Father, and Earth is the Great Mother of all. Day and night are the two nurses in whose lap the whole world plays.'
      }
    ],
    pujaItems: [
      {
        id: 'pj-401',
        name: 'Ingredients for Sacred Karah Prasad',
        hindiOrTraditionalName: 'Karah Prasad Samagri',
        quantity: '500g Ghee + Flour + Sugar',
        purpose: 'Prepared with continuous recitation of Japji Sahib, distributed as blessed grace.',
        category: 'Sacred Offerings',
        inStock: true
      },
      {
        id: 'pj-402',
        name: 'Silk Embroidered Rumala Sahib Set',
        hindiOrTraditionalName: 'Rumala Sahib',
        quantity: '1 Double Set',
        purpose: 'Reverently draped over Sri Guru Granth Sahib Ji during Parkash.',
        category: 'Vessels & Sacred Cloth',
        inStock: true
      },
      {
        id: 'pj-403',
        name: 'Silver Handle Peacock Feather Chaur Sahib',
        hindiOrTraditionalName: 'Chaur Sahib',
        quantity: '1 Piece',
        purpose: 'Waved respectfully over the sacred scripture as a symbol of divine sovereignty.',
        category: 'Essentials',
        inStock: true
      },
      {
        id: 'pj-404',
        name: 'Traditional Pure Ghee Lamps & Candles',
        hindiOrTraditionalName: 'Gurpurab Deepam',
        quantity: 'Box of 21',
        purpose: 'Illuminating courtyards in joyful celebration of the divine light arriving into the world.',
        category: 'Fragrance & Lamps',
        inStock: true
      },
      {
        id: 'pj-405',
        name: 'Rosewater Essence & Fresh Marigold Petals',
        hindiOrTraditionalName: 'Kevda & Phool Chhidkav',
        quantity: '1 Set',
        purpose: 'Welcoming the Palki Sahib and sacred Gurbani procession.',
        category: 'Sacred Offerings',
        inStock: true
      }
    ],
    kitProduct: {
      id: 'prod-kit-sikhism',
      name: 'Gurpurab Prakash Samagam & Ardas Kit',
      price: 46.0,
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80',
      rating: 4.98,
      reviewsCount: 275,
      description: 'Contains double embroidered golden Rumala Sahib, pure cow ghee for Karah Prasad, brass deepak, rosewater sprinkler, and Nitnem prayer book.'
    },
    primaryPanditId: 'prov-4',
    otherFaithPriests: [
      {
        religion: 'Islam',
        providerId: 'prov-2',
        ceremonyType: 'Sufi Tauheed & Bhai Mardana Tribute Dua',
        note: 'Commemorating the lifelong musical and spiritual companionship of Guru Nanak and Bhai Mardana.'
      },
      {
        religion: 'Hinduism',
        providerId: 'prov-1',
        ceremonyType: 'Bhakti Sant Samagam & Shanti Paath',
        note: 'Vedic and Sant Parampara verses honoring Guru Nanak as a supreme saint of divine wisdom.'
      },
      {
        religion: 'Christianity',
        providerId: 'prov-3',
        ceremonyType: 'Ecumenical Prayer for Peacemakers & Equality',
        note: 'Honoring champions who break caste, racial, and gender divisions through selfless love.'
      },
      {
        religion: 'Buddhism',
        providerId: 'prov-5',
        ceremonyType: 'Inter-Religious Harmony & Compassion Chanting',
        note: 'Shared appreciation for casteless equality, ethical living, and compassionate mindfulness.'
      }
    ],
    recommendedRituals: ['Prabhat Pheri', 'Akhand Path Bhog', 'Community Langar']
  }
];
