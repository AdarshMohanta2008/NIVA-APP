import { AudioBook } from '../types';

export const SACRED_AUDIO_BOOKS: AudioBook[] = [
  {
    id: 'ab-gita',
    title: 'The Bhagavad Gita: The Song Divine',
    nativeTitle: 'श्रीमद्भगवद्गीता',
    religion: 'Hinduism',
    authorOrSage: 'Maharshi Ved Vyasa',
    narrator: 'Swami Sarvapriyananda & Pandit Jasraj',
    coverArt: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    totalDuration: '4h 35m',
    totalChapters: 6,
    description:
      'Immerse yourself in Lord Krishna’s dialogue with warrior prince Arjuna on the battlefield of Kurukshetra. An auditory meditation on duty, selfless action (Karma Yoga), meditation (Dhyana Yoga), and supreme devotion (Bhakti Yoga).',
    spiritualTakeaway:
      'You have a right to your prescribed duty, but never to the fruits of your actions. Act without anxiety for success or failure.',
    rating: 4.96,
    listensCount: 384000,
    tags: ['Yoga', 'Karma', 'Krishna', 'Dharma', 'Meditation'],
    chapters: [
      {
        id: 'ab-gita-ch1',
        chapterNumber: 1,
        title: 'Arjuna Vishada Yoga: The Despair of the Warrior',
        duration: 1840, // 30m 40s
        narrator: 'Swami Sarvapriyananda',
        summary:
          'Arjuna surveys the two armies and breaks down in moral despondency, casting aside his bow and seeking supreme guidance.',
        soundPreset: 'tanpura-om',
      },
      {
        id: 'ab-gita-ch2',
        chapterNumber: 2,
        title: 'Sankhya Yoga: The Eternal Atman & Nishkama Karma',
        duration: 2450, // 40m 50s
        narrator: 'Swami Sarvapriyananda',
        summary:
          'Krishna teaches that the Soul is imperishable, untouched by sword or flame, and unveils the supreme secret of selfless action.',
        soundPreset: 'tanpura-om',
      },
      {
        id: 'ab-gita-ch3',
        chapterNumber: 3,
        title: 'Karma Yoga: Transforming Action into Sacred Offering',
        duration: 1980,
        narrator: 'Swami Sarvapriyananda',
        summary:
          'Why action is superior to inaction, and how fulfilling ones societal role without selfish craving cleanses the inner mirror.',
        soundPreset: 'flute-bells',
      },
      {
        id: 'ab-gita-ch4',
        chapterNumber: 4,
        title: 'Jnana Karma Sannyasa Yoga: Wisdom & Divine Incarnation',
        duration: 2100,
        narrator: 'Swami Sarvapriyananda',
        summary:
          'Whenever righteousness declines and chaos increases, the Divine manifests. Fire of knowledge that burns all karma.',
        soundPreset: 'tanpura-om',
      },
      {
        id: 'ab-gita-ch9',
        chapterNumber: 5,
        title: 'Raja Vidya Yoga: The Royal Secret of Devotion',
        duration: 2260,
        narrator: 'Pandit Jasraj',
        summary:
          'Even a leaf, a flower, a fruit or water offered with loving surrender is received with delight by the Supreme.',
        soundPreset: 'flute-bells',
      },
      {
        id: 'ab-gita-ch18',
        chapterNumber: 6,
        title: 'Moksha Sannyasa Yoga: Supreme Surrender & Liberation',
        duration: 2800,
        narrator: 'Swami Sarvapriyananda',
        summary:
          'Abandon all subordinate dogmas and take refuge in Me alone; I shall liberate you from all sorrow. Do not grieve.',
        soundPreset: 'tanpura-om',
      },
    ],
  },
  {
    id: 'ab-quran-stories',
    title: 'Stories of the Prophets: Lessons of Faith & Mercy',
    nativeTitle: 'قَصَصُ الأَنْبِيَاءِ',
    religion: 'Islam',
    authorOrSage: 'Imam Ibn Kathir',
    narrator: 'Sheikh Omar Suleiman & Ustad Tariq',
    coverArt: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=600&q=80',
    totalDuration: '5h 10m',
    totalChapters: 5,
    description:
      'A soulful audio exploration of the sacred journeys of the prophets: Abraham (Ibrahim), Moses (Musa), Joseph (Yusuf), and Muhammad (peace be upon them all). Narrated with serene ambient nay and oud reflections.',
    spiritualTakeaway:
      'Verily, with hardship comes ease. Trust in the Divine plan even when the road seems shrouded in trials.',
    rating: 4.98,
    listensCount: 421000,
    tags: ['Prophets', 'Patience', 'Quran', 'Wisdom', 'Sabr'],
    chapters: [
      {
        id: 'ab-qur-ch1',
        chapterNumber: 1,
        title: 'The Patriarch of Monotheism: Prophet Ibrahim’s Steadfastness',
        duration: 2340,
        narrator: 'Sheikh Omar Suleiman',
        summary:
          'Examining Ibrahim’s search for the Creator, his fearless confrontation with tyranny, and building the Kaaba in Mecca.',
        soundPreset: 'sufi-drone',
      },
      {
        id: 'ab-qur-ch2',
        chapterNumber: 2,
        title: 'Surah Yusuf: The Beauty of Patience in the Well & Palace',
        duration: 2750,
        narrator: 'Sheikh Omar Suleiman',
        summary:
          'The best of stories: Betrayal by brothers, wrongful imprisonment, and royal restoration governed by deep forgiveness.',
        soundPreset: 'sufi-drone',
      },
      {
        id: 'ab-qur-ch3',
        chapterNumber: 3,
        title: 'Prophet Musa: Speaking with the Divine at Mount Sinai',
        duration: 2500,
        narrator: 'Sheikh Omar Suleiman',
        summary:
          'From the floating reed basket on the Nile to the parting of the Red Sea and receiving the sacred tablets of law.',
        soundPreset: 'sufi-drone',
      },
      {
        id: 'ab-qur-ch4',
        chapterNumber: 4,
        title: 'Mary & Jesus (Maryam & Isa): Miracles of Divine Grace',
        duration: 2180,
        narrator: 'Ustad Tariq',
        summary:
          'The chaste piety of Maryam, the birth of Isa under the date palm, and his gospel of healing, humility, and love.',
        soundPreset: 'sufi-drone',
      },
      {
        id: 'ab-qur-ch5',
        chapterNumber: 5,
        title: 'The Seal of Prophets: Mercy unto the Worlds (Rahmatul-lil-Alameen)',
        duration: 3100,
        narrator: 'Sheikh Omar Suleiman',
        summary:
          'The revelation in Cave Hira, the farewell pilgrimage sermon, and the universal charter of human equality and compassion.',
        soundPreset: 'sufi-drone',
      },
    ],
  },
  {
    id: 'ab-confessions',
    title: 'The Confessions of Saint Augustine',
    nativeTitle: 'Confessiones',
    religion: 'Christianity',
    authorOrSage: 'Saint Augustine of Hippo',
    narrator: 'Father David Steindl-Rast & Oxford Cathedral Voice',
    coverArt: 'https://images.unsplash.com/photo-1548625361-1956637e1088?auto=format&fit=crop&w=600&q=80',
    totalDuration: '3h 45m',
    totalChapters: 4,
    description:
      'The foundational Christian spiritual autobiography. Saint Augustine chronicles his tumultuous youth, intellectual restlessness, and miraculous conversion under the fig tree in Milan.',
    spiritualTakeaway:
      'You have made us for Yourself, O Lord, and our hearts are restless until they find rest in You.',
    rating: 4.92,
    listensCount: 162000,
    tags: ['Grace', 'RestlessHeart', 'ChristianClassics', 'Contemplation'],
    chapters: [
      {
        id: 'ab-conf-ch1',
        chapterNumber: 1,
        title: 'Book I: Childhood, Longing & The Restless Soul',
        duration: 1980,
        narrator: 'Father David Steindl-Rast',
        summary:
          'Augustine reflects on the gift of breath and early education, probing why human thirst can never be quenched by finite things.',
        soundPreset: 'choir-chime',
      },
      {
        id: 'ab-conf-ch2',
        chapterNumber: 2,
        title: 'Book IV: Grief, Friendship & The Transience of Earthly Joys',
        duration: 2150,
        narrator: 'Oxford Cathedral Voice',
        summary:
          'The heartbreaking loss of a dear childhood friend, leading Augustine into a profound meditation on impermanence.',
        soundPreset: 'choir-chime',
      },
      {
        id: 'ab-conf-ch3',
        chapterNumber: 3,
        title: 'Book VIII: Tolle Lege (Take and Read) — The Conversion',
        duration: 2600,
        narrator: 'Father David Steindl-Rast',
        summary:
          'In a garden in Milan, weeping under the agony of divided desires, a child’s song urges him to take up Saint Paul’s letters.',
        soundPreset: 'choir-chime',
      },
      {
        id: 'ab-conf-ch4',
        chapterNumber: 4,
        title: 'Book IX: Vision at Ostia & Mother Monica’s Departure',
        duration: 2400,
        narrator: 'Father David Steindl-Rast',
        summary:
          'Augustine and his mother Monica gaze through the window overlooking the sea, touched by mystical stillness of eternal presence.',
        soundPreset: 'choir-chime',
      },
    ],
  },
  {
    id: 'ab-guru-nanak',
    title: 'The Divine Journey of Sri Guru Nanak Dev Ji',
    nativeTitle: 'ਸ੍ਰੀ ਗੁਰੂ ਨਾਨਕ ਦੇਵ ਜੀ ਦੀਆਂ ਸਾਖੀਆਂ',
    religion: 'Sikhism',
    authorOrSage: 'Bhai Gurdas & The Janamsakhis',
    narrator: 'Giani Sant Singh & Bhai Nirmal Singh (Rabab & Sarangi)',
    coverArt: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=600&q=80',
    totalDuration: '4h 15m',
    totalChapters: 4,
    description:
      'Heart-stirring audible accounts of Guru Nanak’s four great journeys (Udasis) across India, Tibet, Mecca, and Baghdad. Teaching unity of humankind, honest living, and selfless sharing.',
    spiritualTakeaway:
      'Truth is the highest virtue, but higher still is truthful living. See the light of the Creator shining in every soul.',
    rating: 4.97,
    listensCount: 298000,
    tags: ['GuruNanak', 'Gurbani', 'IkOnkar', 'Sakhian', 'Simran'],
    chapters: [
      {
        id: 'ab-nanak-ch1',
        chapterNumber: 1,
        title: 'Sacha Sauda: The True Bargain of Feeding the Hungry',
        duration: 2100,
        narrator: 'Giani Sant Singh',
        summary:
          'Young Nanak is given 20 rupees by his father to conduct trade, but uses it to feed starving ascetics, calling it the only true investment.',
        soundPreset: 'gurbani-raag',
      },
      {
        id: 'ab-nanak-ch2',
        chapterNumber: 2,
        title: 'The River Bein & The Cosmic Revelation: Na Koi Hindu, Na Musalman',
        duration: 2480,
        narrator: 'Giani Sant Singh',
        summary:
          'Emerging from the sacred waters of the Bein after three days of meditation, proclaiming universal brotherhood under One Light.',
        soundPreset: 'gurbani-raag',
      },
      {
        id: 'ab-nanak-ch3',
        chapterNumber: 3,
        title: 'Malik Bhago vs. Bhai Lalo: The Bread of Honest Sweat',
        duration: 2300,
        narrator: 'Giani Sant Singh',
        summary:
          'Squeezing the poor carpenter Lalo’s dry roti produces milk, while rich Bhago’s lavish feast bleeds blood of exploitation.',
        soundPreset: 'gurbani-raag',
      },
      {
        id: 'ab-nanak-ch4',
        chapterNumber: 4,
        title: 'Japji Sahib: The Morning Song of Cosmic Wonder (Vichar)',
        duration: 2850,
        narrator: 'Bhai Nirmal Singh',
        summary:
          'A deeply poetic philosophical audio commentary on the 38 Pauris of Japji Sahib, from Soch to Sach Khand.',
        soundPreset: 'gurbani-raag',
      },
    ],
  },
  {
    id: 'ab-dhammapada',
    title: 'The Dhammapada: The Noble Path of Mindfulness & Awakening',
    nativeTitle: 'धम्मपद',
    religion: 'Buddhism',
    authorOrSage: 'Gautama Buddha',
    narrator: 'Jack Kornfield & Tibetan Singing Bowls Ensemble',
    coverArt: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=600&q=80',
    totalDuration: '2h 50m',
    totalChapters: 4,
    description:
      'The quintessential handbook of Buddhist mindfulness, translated and narrated with gentle lucidity and accompanied by 432 Hz healing Tibetan bowls. Explores mind mastery, non-attachment, and inner peace.',
    spiritualTakeaway:
      'Hatred does not cease by hatred at any time; hatred ceases by love alone. This is an eternal law.',
    rating: 4.95,
    listensCount: 312000,
    tags: ['Mindfulness', 'Buddha', 'Zen', 'InnerPeace', 'Vipassana'],
    chapters: [
      {
        id: 'ab-dham-ch1',
        chapterNumber: 1,
        title: 'Yamaka-Vagga: The Twin Verses of Cause & Effect',
        duration: 1850,
        narrator: 'Jack Kornfield',
        summary:
          'What we are today comes from our thoughts of yesterday. If one speaks or acts with a pure mind, joy follows like a shadow that never leaves.',
        soundPreset: 'singing-bowl',
      },
      {
        id: 'ab-dham-ch2',
        chapterNumber: 2,
        title: 'Appamada-Vagga: The Path of Vigilance & Awareness',
        duration: 1720,
        narrator: 'Jack Kornfield',
        summary:
          'Heedfulness is the path to the deathless; heedlessness is the path to death. The watchful do not die; the unaware are as if already dead.',
        soundPreset: 'singing-bowl',
      },
      {
        id: 'ab-dham-ch3',
        chapterNumber: 3,
        title: 'Citta-Vagga: Taming the Wandering Mind',
        duration: 1940,
        narrator: 'Jack Kornfield',
        summary:
          'As an archer straightens an arrow, so the discerning one straightens the flickering, flighty mind which is hard to guard and subdue.',
        soundPreset: 'singing-bowl',
      },
      {
        id: 'ab-dham-ch4',
        chapterNumber: 4,
        title: 'Magga-Vagga: The Eightfold Noble Path to Nirvana',
        duration: 2200,
        narrator: 'Jack Kornfield',
        summary:
          'Right view, right resolve, right speech, right action, right livelihood, right effort, right mindfulness, and right concentration.',
        soundPreset: 'singing-bowl',
      },
    ],
  },
  {
    id: 'ab-tattvartha',
    title: 'The Tattvartha Sutra: The Science of Soul & Non-Violence',
    nativeTitle: 'तत्त्वार्थ सूत्र',
    religion: 'Jainism',
    authorOrSage: 'Acharya Umasvati',
    narrator: 'Muni Shri Tarun Sagar & Bamboo Flute Meditation',
    coverArt: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    totalDuration: '3h 10m',
    totalChapters: 3,
    description:
      'The foundational authoritative text accepted by both Digambara and Svetambara Jain traditions. Explores Samyag Darshana (Right Faith), Samyag Jnana (Right Knowledge), and Samyag Charitra (Right Conduct).',
    spiritualTakeaway:
      'Parasparopagraho Jīvānām — All souls are bound together by mutual assistance and compassion.',
    rating: 4.93,
    listensCount: 145000,
    tags: ['Ahimsa', 'Jainism', 'KarmaTheory', 'Moksha', 'Anekantavada'],
    chapters: [
      {
        id: 'ab-tat-ch1',
        chapterNumber: 1,
        title: 'The Triple Gems (Ratnatraya): The Direct Path to Freedom',
        duration: 2150,
        narrator: 'Muni Shri Tarun Sagar',
        summary:
          'Right faith, right knowledge, and right conduct collectively form the unerring path to liberation from earthly delusion.',
        soundPreset: 'flute-bells',
      },
      {
        id: 'ab-tat-ch2',
        chapterNumber: 2,
        title: 'Jiva & Ajiva: Consciousness & The Cosmic Inanimate',
        duration: 2300,
        narrator: 'Muni Shri Tarun Sagar',
        summary:
          'Analyzing the infinite sentient beings inhabiting water, earth, air, and plant life, forming the basis for radical Ahimsa.',
        soundPreset: 'flute-bells',
      },
      {
        id: 'ab-tat-ch3',
        chapterNumber: 3,
        title: 'Ashrava, Bandha & Samvara: Influx & Dissolution of Karmic Particles',
        duration: 2540,
        narrator: 'Muni Shri Tarun Sagar',
        summary:
          'How passionate desires draw subtle matter to the soul, and how mindful austerities and equanimity wash the slate clean.',
        soundPreset: 'flute-bells',
      },
    ],
  },
  {
    id: 'ab-pirkei-avot',
    title: 'Ethics of the Fathers (Pirkei Avot): Timeless Moral Wisdom',
    nativeTitle: 'פִּרְקֵי אָבוֹת',
    religion: 'Judaism',
    authorOrSage: 'Rabbi Yehuda HaNasi & The Tannaim',
    narrator: 'Rabbi Jonathan Sacks & Meditative Harp',
    coverArt: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    totalDuration: '3h 25m',
    totalChapters: 3,
    description:
      'The crowning ethical tractate of the Mishna. Recorded across centuries by Jewish sages, offering practical life precepts on humility, human dignity, charitable giving, and personal integrity.',
    spiritualTakeaway:
      'It is not your duty to complete the work, but neither are you free to desist from it. Love your fellow humans and bring them close to truth.',
    rating: 4.96,
    listensCount: 182000,
    tags: ['Torah', 'Ethics', 'TikkunOlam', 'Wisdom', 'Mishna'],
    chapters: [
      {
        id: 'ab-avot-ch1',
        chapterNumber: 1,
        title: 'Chapter 1: The Golden Chain of Tradition & Three Pillars of the World',
        duration: 2180,
        narrator: 'Rabbi Jonathan Sacks',
        summary:
          'On three things the world stands: on the Torah, on divine service (prayer), and on deeds of loving-kindness (Gemilut Chasadim).',
        soundPreset: 'choir-chime',
      },
      {
        id: 'ab-avot-ch2',
        chapterNumber: 2,
        title: 'Chapter 2: Hillel’s Maxim & What Constitutes a Good Heart',
        duration: 2360,
        narrator: 'Rabbi Jonathan Sacks',
        summary:
          'If I am not for myself, who will be for me? If I am only for myself, what am I? And if not now, when?',
        soundPreset: 'choir-chime',
      },
      {
        id: 'ab-avot-ch3',
        chapterNumber: 3,
        title: 'Chapter 4: Who Is Truly Rich? The Joy of Contentment',
        duration: 2420,
        narrator: 'Rabbi Jonathan Sacks',
        summary:
          'Who is wise? One who learns from every person. Who is strong? One who conquers their own impulse. Who is rich? One who rejoices in their portion.',
        soundPreset: 'choir-chime',
      },
    ],
  },
  {
    id: 'ab-autobiography-yogi',
    title: 'Autobiography of a Yogi: Sacred Audio Excerpts',
    nativeTitle: 'एक योगी की आत्मकथा',
    religion: 'All' as any,
    authorOrSage: 'Paramahansa Yogananda',
    narrator: 'Sir Ben Kingsley & Swarpeti Ambient Tone',
    coverArt: 'https://images.unsplash.com/photo-1609137144822-ef971b305d21?auto=format&fit=crop&w=600&q=80',
    totalDuration: '5h 40m',
    totalChapters: 4,
    description:
      'The spiritual masterpiece named one of the 100 best spiritual books of the 20th century. Follow Yogananda’s quest among India’s saints, sages, and Christ-like masters, explaining Kriya Yoga to the modern world.',
    spiritualTakeaway:
      'You do not have to struggle to reach God; you only have to quiet your thoughts and realize He was never away from you.',
    rating: 4.99,
    listensCount: 512000,
    tags: ['KriyaYoga', 'Yogananda', 'Meditation', 'SelfRealization', 'Interfaith'],
    chapters: [
      {
        id: 'ab-yogi-ch1',
        chapterNumber: 1,
        title: 'My Parents and Early Life: Seeds of Spiritual Thirst',
        duration: 2400,
        narrator: 'Sir Ben Kingsley',
        summary:
          'The blessing of Lahiri Mahasaya over the infant child: A little engine of spirituality will carry thousands of souls to God’s kingdom.',
        soundPreset: 'tanpura-om',
      },
      {
        id: 'ab-yogi-ch2',
        chapterNumber: 2,
        title: 'The Master: Meeting Sri Yukteswar in Varanasi',
        duration: 2700,
        narrator: 'Sir Ben Kingsley',
        summary:
          'The momentous meeting in the narrow bazaar of Serampore; instantaneous recognition of the destined guru-disciple bond.',
        soundPreset: 'tanpura-om',
      },
      {
        id: 'ab-yogi-ch3',
        chapterNumber: 3,
        title: 'The Science of Kriya Yoga: Breath & Astral Awakening',
        duration: 2650,
        narrator: 'Sir Ben Kingsley',
        summary:
          'A lucid scientific explanation of how breath control decelerates decay in tissues and opens the spiritual spine to cosmic energy.',
        soundPreset: 'flute-bells',
      },
      {
        id: 'ab-yogi-ch4',
        chapterNumber: 4,
        title: 'An Experience in Cosmic Consciousness (Samadhi)',
        duration: 3100,
        narrator: 'Sir Ben Kingsley',
        summary:
          'A gentle tap on the chest from Sri Yukteswar unlocks the boundless oceanic ecstasy of omnipresent Divine Awareness.',
        soundPreset: 'tanpura-om',
      },
    ],
  },
];
