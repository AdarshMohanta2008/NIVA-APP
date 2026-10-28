import React, { useState } from 'react';
import {
  Wind,
  Flame,
  Droplets,
  Leaf,
  Activity,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  AlertCircle,
  BookOpen,
  Compass,
  ChevronRight,
  Scale,
  Heart,
  Shield,
  Info,
  ArrowRight,
  Sun,
  Moon,
  Coffee,
  Apple,
} from 'lucide-react';

interface AyurvedaSectionProps {
  onAskInChat: (query: string) => void;
}

type AyurvedaTab = 'explorer' | 'quiz' | 'comparison' | 'prakriti' | 'science';
type DoshaType = 'vata' | 'pitta' | 'kapha';

interface QuizQuestion {
  id: number;
  question: string;
  category: string;
  options: {
    text: string;
    dosha: DoshaType;
    hint: string;
  }[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'How would you describe your natural physical body frame and bone structure?',
    category: 'Physical Structure',
    options: [
      { text: 'Slender, lean, or light frame; prominent joints or tall/petite', dosha: 'vata', hint: 'Hard to gain weight, quick movements' },
      { text: 'Medium, proportionate, athletic build with good muscle tone', dosha: 'pitta', hint: 'Easily gains or loses weight with effort' },
      { text: 'Sturdy, broad-shouldered, solid or heavier frame with soft curves', dosha: 'kapha', hint: 'Gains weight easily, loses weight slowly' },
    ],
  },
  {
    id: 2,
    question: 'How does your skin typically feel across different seasons?',
    category: 'Skin Characteristics',
    options: [
      { text: 'Dry, thin, slightly rough or easily prone to chapping in cold weather', dosha: 'vata', hint: 'Cool to touch, requires frequent moisturizer' },
      { text: 'Warm, sensitive, slightly oily in T-zone, prone to redness, moles, or freckles', dosha: 'pitta', hint: 'Burns easily in strong sunlight' },
      { text: 'Thick, smooth, well-hydrated, soft, and naturally supple', dosha: 'kapha', hint: 'Can tend toward excessive oiliness or coolness' },
    ],
  },
  {
    id: 3,
    question: 'What is your typical digestion and appetite pattern (Agni)?',
    category: 'Digestive Fire',
    options: [
      { text: 'Variable and erratic; sometimes very hungry, sometimes forget to eat; prone to gas/bloating', dosha: 'vata', hint: 'Vishama Agni' },
      { text: 'Strong and intense; get irritable if meals are missed; digests food very quickly', dosha: 'pitta', hint: 'Tikshna Agni' },
      { text: 'Slow, steady, and moderate; can easily skip a meal without distress, but digests slowly', dosha: 'kapha', hint: 'Manda Agni' },
    ],
  },
  {
    id: 4,
    question: 'How do you respond to weather and ambient temperatures?',
    category: 'Climate Sensitivity',
    options: [
      { text: 'Dislike cold, windy, or dry weather; love warm sunshine, blankets, and hot drinks', dosha: 'vata', hint: 'Prone to cold hands and feet' },
      { text: 'Dislike excessive heat, humidity, or harsh sun; crave cool breezes and shade', dosha: 'pitta', hint: 'Sweats easily, body feels warm' },
      { text: 'Dislike cold, wet, damp, or foggy days; comfortable in warm and dry weather', dosha: 'kapha', hint: 'Prefers movement and dry warmth' },
    ],
  },
  {
    id: 5,
    question: 'What describes your typical sleep pattern and dream nature?',
    category: 'Sleep & Dreams',
    options: [
      { text: 'Light, interrupted, or easily awakened by slight noises; active or flying dreams', dosha: 'vata', hint: 'Tendency to wake up between 2-6 AM' },
      { text: 'Moderate, sound (6-7 hours); colorful, dramatic, fiery, or problem-solving dreams', dosha: 'pitta', hint: 'Wakes up alert and ready to work' },
      { text: 'Deep, sound, and heavy (8+ hours); slow to wake up in morning; calm or water dreams', dosha: 'kapha', hint: 'Can feel groggy if oversleeping' },
    ],
  },
  {
    id: 6,
    question: 'How does your mind process new information and make decisions?',
    category: 'Cognitive Style',
    options: [
      { text: 'Quick to learn and grasp concepts, highly creative, but quick to forget; changes mind often', dosha: 'vata', hint: 'Enthusiastic and expressive' },
      { text: 'Sharp, critical, precise, ambitious, highly logical; makes decisions firmly and swiftly', dosha: 'pitta', hint: 'Organized and goal-oriented' },
      { text: 'Methodical, steady, takes time to learn but retains permanently; calm, patient, rarely flustered', dosha: 'kapha', hint: 'Dependable and compassionate' },
    ],
  },
  {
    id: 7,
    question: 'How do you typically react when experiencing acute emotional stress or pressure?',
    category: 'Stress Response',
    options: [
      { text: 'Anxiety, worry, overthinking, agitation, restlessness, and feeling overwhelmed', dosha: 'vata', hint: 'Nervous energy, difficulty concentrating' },
      { text: 'Irritability, frustration, impatience, fiery temper, critical speech, or anger', dosha: 'pitta', hint: 'Demands quick results, high perfectionism' },
      { text: 'Withdrawal, emotional inertia, resistance to change, comfort eating, or complacency', dosha: 'kapha', hint: 'Needs gentle motivation and encouragement' },
    ],
  },
  {
    id: 8,
    question: 'What is your typical speech and conversation tempo?',
    category: 'Communication',
    options: [
      { text: 'Fast-paced, animated, talkative, wanders between diverse subjects quickly', dosha: 'vata', hint: 'Expressive hand gestures and vocal modulation' },
      { text: 'Articulate, direct, convincing, sharp, and purposeful; persuasive speaker', dosha: 'pitta', hint: 'Loves intellectual debate and clear facts' },
      { text: 'Slow, melodious, calm, thoughtful, soft-spoken; listens more than speaking', dosha: 'kapha', hint: 'Gentle, comforting, and empathetic presence' },
    ],
  },
];

export const AyurvedaSection: React.FC<AyurvedaSectionProps> = ({ onAskInChat }) => {
  const [activeTab, setActiveTab] = useState<AyurvedaTab>('explorer');
  const [selectedDosha, setSelectedDosha] = useState<DoshaType>('vata');

  // Interactive Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, DoshaType>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const handleSelectAnswer = (questionId: number, dosha: DoshaType) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: dosha }));
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const answeredCount = Object.keys(quizAnswers).length;
  const isQuizComplete = answeredCount === QUIZ_QUESTIONS.length;

  // Calculate Dosha Percentages
  const tally = { vata: 0, pitta: 0, kapha: 0 };
  Object.values(quizAnswers).forEach((d) => {
    tally[d] += 1;
  });

  const totalAnswered = answeredCount || 1;
  const vataPct = Math.round((tally.vata / totalAnswered) * 100);
  const pittaPct = Math.round((tally.pitta / totalAnswered) * 100);
  const kaphaPct = Math.round((tally.kapha / totalAnswered) * 100);

  // Dominant Prakriti Determination
  const scores = [
    { dosha: 'vata' as const, score: tally.vata, label: 'Vata' },
    { dosha: 'pitta' as const, score: tally.pitta, label: 'Pitta' },
    { dosha: 'kapha' as const, score: tally.kapha, label: 'Kapha' },
  ].sort((a, b) => b.score - a.score);

  let dominantPrakriti = 'Balanced Tridoshic';
  let dominantKey: DoshaType = 'vata';
  if (scores[0].score >= 5) {
    dominantPrakriti = `${scores[0].label} Dominant (Ekadoshaja)`;
    dominantKey = scores[0].dosha;
  } else if (scores[0].score === scores[1].score && scores[1].score === scores[2].score) {
    dominantPrakriti = 'Tridoshic Balance (Sama Dosha)';
    dominantKey = scores[0].dosha;
  } else {
    dominantPrakriti = `${scores[0].label}-${scores[1].label} Dual Constitution`;
    dominantKey = scores[0].dosha;
  }

  return (
    <div className="flex-1 flex flex-col overflow-y-auto text-xs text-white p-2 sm:p-3 space-y-4">
      {/* Top Educational & Medical Disclaimer */}
      <div className="glass-panel p-3.5 rounded-2xl border border-white/15 flex items-start gap-3 shrink-0 shadow-lg">
        <Scale className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-[11px] text-white/80 leading-relaxed font-normal">
          <strong className="text-amber-300 font-semibold">Educational & Wellness Notice:</strong>{' '}
          This section and interactive assessment reflect traditional Ayurvedic philosophy (*Tridosha, Prakriti & Vikriti*). They are presented strictly for personal educational exploration and contemplative wellness. They do <strong>not</strong> constitute medical diagnosis, clinical evaluation, or therapy. Always consult a qualified medical professional for health inquiries.
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="px-2 py-1 overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
        <button
          onClick={() => setActiveTab('explorer')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'explorer'
              ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-white/30'
              : 'bg-white/[0.08] text-white/70 hover:bg-white/[0.15] hover:text-white border border-white/10'
          }`}
        >
          <Leaf className="w-3.5 h-3.5 text-emerald-400" />
          <span>Tridosha Explorer</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'quiz'
              ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-white/30'
              : 'bg-white/[0.08] text-white/70 hover:bg-white/[0.15] hover:text-white border border-white/10'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>Interactive Dosha Quiz</span>
          {answeredCount > 0 && !quizSubmitted && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B] animate-pulse" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('comparison')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'comparison'
              ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-white/30'
              : 'bg-white/[0.08] text-white/70 hover:bg-white/[0.15] hover:text-white border border-white/10'
          }`}
        >
          <Scale className="w-3.5 h-3.5 text-white/60" />
          <span>Visual Comparison</span>
        </button>

        <button
          onClick={() => setActiveTab('prakriti')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'prakriti'
              ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-white/30'
              : 'bg-white/[0.08] text-white/70 hover:bg-white/[0.15] hover:text-white border border-white/10'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-white/60" />
          <span>Prakriti vs Vikriti</span>
        </button>

        <button
          onClick={() => setActiveTab('science')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'science'
              ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-white/30'
              : 'bg-white/[0.08] text-white/70 hover:bg-white/[0.15] hover:text-white border border-white/10'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-sky-400" />
          <span>Science & Ayurveda</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="space-y-4">
        {/* ============================================================== */}
        {/* 1. TRIDOSHA EXPLORER TAB */}
        {/* ============================================================== */}
        {activeTab === 'explorer' && (
          <div className="space-y-4 max-w-xl mx-auto">
            {/* Quick 3-Pill Switcher */}
            <div className="grid grid-cols-3 gap-2 p-1.5 glass-dock border border-white/15">
              <button
                onClick={() => setSelectedDosha('vata')}
                className={`py-2 px-2.5 rounded-full font-black text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  selectedDosha === 'vata'
                    ? 'bg-sky-500/30 text-sky-200 border border-sky-400/40 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Wind className="w-4 h-4 text-sky-400" />
                <span>Vata (वात)</span>
              </button>

              <button
                onClick={() => setSelectedDosha('pitta')}
                className={`py-2 px-2.5 rounded-full font-black text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  selectedDosha === 'pitta'
                    ? 'bg-amber-500/30 text-amber-200 border border-amber-400/40 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Pitta (पित्त)</span>
              </button>

              <button
                onClick={() => setSelectedDosha('kapha')}
                className={`py-2 px-2.5 rounded-full font-black text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  selectedDosha === 'kapha'
                    ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Droplets className="w-4 h-4 text-emerald-400" />
                <span>Kapha (कफ)</span>
              </button>
            </div>

            {/* Individual Dosha Card */}
            {selectedDosha === 'vata' && (
              <div className="glass-panel rounded-3xl border border-sky-400/30 p-5 space-y-3.5 shadow-2xl animate-dosha-breathe">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-sky-300 bg-sky-500/20 px-2.5 py-0.5 rounded-full border border-sky-400/30">
                      Space (Akasha) + Air (Vayu)
                    </span>
                    <h3 className="text-base font-extrabold text-white mt-1">
                      Vata Dosha — Principle of Movement & Life Force
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 shrink-0 shadow-[0_0_12px_rgba(56,189,248,0.3)]">
                    <Wind className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-[11px] text-white/80 leading-relaxed">
                  In classical Ayurveda, Vata is considered the <em>King of the Doshas</em> because it is the primary motor force that moves everything in the body and cosmos. Without Vata, Pitta and Kapha are considered immobile (*Pangu*).
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-sky-500/10 p-2.5 rounded-xl border border-sky-400/20">
                    <span className="text-[10px] font-black text-sky-300 uppercase">Qualities (Gunas)</span>
                    <p className="text-white/80 mt-0.5 font-medium">Dry (*Ruksha*), Light (*Laghu*), Cold (*Sheeta*), Rough (*Khara*), Subtle (*Sukshma*), Mobile (*Chala*).</p>
                  </div>
                  <div className="bg-sky-500/10 p-2.5 rounded-xl border border-sky-400/20">
                    <span className="text-[10px] font-black text-sky-300 uppercase">Bodily Seat (Sthana)</span>
                    <p className="text-white/80 mt-0.5 font-medium">Colon (*Pakwashaya*), pelvis, bones, joints, ears, skin, and central nervous system.</p>
                  </div>
                </div>

                {/* Balanced vs Imbalance */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="bg-emerald-500/15 p-3 rounded-xl border border-emerald-400/25">
                    <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-[11px] mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>When Balanced (Sama)</span>
                    </div>
                    <ul className="text-[11px] text-white/80 space-y-1">
                      <li>• Creativity, inspiration, and lively imagination</li>
                      <li>• Light, flexible body and swift reflexes</li>
                      <li>• Enthusiasm, joy, and emotional adaptability</li>
                      <li>• Regular elimination and healthy circulation</li>
                    </ul>
                  </div>

                  <div className="bg-amber-500/15 p-3 rounded-xl border border-amber-400/25">
                    <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px] mb-1">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                      <span>When Imbalanced (Vriddhi)</span>
                    </div>
                    <ul className="text-[11px] text-white/80 space-y-1">
                      <li>• Mental restlessness, anxiety, and scattered thoughts</li>
                      <li>• Insomnia or waking between 2:00 AM – 6:00 AM</li>
                      <li>• Dry, rough skin, cracked lips, and brittle nails</li>
                      <li>• Constipation, gas, bloating, and cold extremities</li>
                    </ul>
                  </div>
                </div>

                {/* Pacifying Guidelines */}
                <div className="bg-white/[0.04] p-3 rounded-xl border border-white/10 space-y-2">
                  <h4 className="font-bold text-[11px] text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Traditional Vata Harmonizing Guidelines</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-white/75">
                    <div>
                      <strong className="text-white">Diet:</strong> Warm, unctuous, grounding foods; soups, kitchari, cooked grains, root vegetables, pure cow ghee, and warming spices (ginger, cinnamon, cardamom). Pacifying tastes: Sweet, Sour, Salty.
                    </div>
                    <div>
                      <strong className="text-white">Lifestyle:</strong> Strict regular daily schedule; daily warm sesame oil massage (*Abhyanga*); grounding yoga postures; alternate nostril breathing (*Nadi Shodhana*).
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onAskInChat('How do I balance excess Vata dosha during autumn and winter with diet and dinacharya?')}
                  className="w-full py-2 bg-gradient-to-r from-sky-600 to-purple-600 hover:from-sky-500 hover:to-purple-500 text-white rounded-xl font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-md border border-white/20 cursor-pointer"
                >
                  <span>Ask NIVA Guide about Vata Rituals & Care</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {selectedDosha === 'pitta' && (
              <div className="glass-panel rounded-3xl border border-amber-400/30 p-5 space-y-3.5 shadow-2xl animate-dosha-breathe">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                      Fire (Tejas) + Water (Jala)
                    </span>
                    <h3 className="text-base font-extrabold text-white mt-1">
                      Pitta Dosha — Principle of Transformation & Metabolism
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                    <Flame className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-[11px] text-white/80 leading-relaxed">
                  Pitta governs all biochemical transformations in the body—enzymatic digestion, metabolic heat, optical perception, hormonal regulation, and intellectual discrimination (*Buddhi*).
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-400/20">
                    <span className="text-[10px] font-black text-amber-300 uppercase">Qualities (Gunas)</span>
                    <p className="text-white/80 mt-0.5 font-medium">Hot (*Ushna*), Sharp (*Tikshna*), Light (*Laghu*), Liquid (*Sara*), Slightly Oily (*Sasneha*).</p>
                  </div>
                  <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-400/20">
                    <span className="text-[10px] font-black text-amber-300 uppercase">Bodily Seat (Sthana)</span>
                    <p className="text-white/80 mt-0.5 font-medium">Small intestine, stomach, liver, gall bladder, spleen, blood (*Rakta*), eyes, and skin.</p>
                  </div>
                </div>

                {/* Balanced vs Imbalance */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="bg-emerald-500/15 p-3 rounded-xl border border-emerald-400/25">
                    <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-[11px] mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>When Balanced (Sama)</span>
                    </div>
                    <ul className="text-[11px] text-white/80 space-y-1">
                      <li>• Sharp intellect, clarity of purpose, strong focus</li>
                      <li>• Excellent digestion and healthy metabolic rate</li>
                      <li>• Radiant complexion, natural warmth, and confidence</li>
                      <li>• Strong leadership and organizational capability</li>
                    </ul>
                  </div>

                  <div className="bg-rose-500/15 p-3 rounded-xl border border-rose-400/25">
                    <div className="flex items-center gap-1.5 text-rose-300 font-bold text-[11px] mb-1">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                      <span>When Imbalanced (Vriddhi)</span>
                    </div>
                    <ul className="text-[11px] text-white/80 space-y-1">
                      <li>• Irritability, anger, criticism, and impatient reactions</li>
                      <li>• Acid reflux, heartburn, indigestion, or loose stools</li>
                      <li>• Inflammatory skin conditions, rashes, or acne</li>
                      <li>• Intolerance to hot weather and burning sensations</li>
                    </ul>
                  </div>
                </div>

                {/* Pacifying Guidelines */}
                <div className="bg-white/[0.04] p-3 rounded-xl border border-white/10 space-y-2">
                  <h4 className="font-bold text-[11px] text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Traditional Pitta Harmonizing Guidelines</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-white/75">
                    <div>
                      <strong className="text-white">Diet:</strong> Cooling, refreshing foods; cucumber, sweet fruits (melons, grapes), ghee, coconut water, coriander, mint, fennel, and basmati rice. Pacifying tastes: Sweet, Bitter, Astringent.
                    </div>
                    <div>
                      <strong className="text-white">Lifestyle:</strong> Avoid intense heat and midday sun; non-competitive recreation; cooling pranayama (*Sheetali / Sitkari*); coconut oil massage; moonlight walks.
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onAskInChat('What are traditional cooling foods and yoga practices to pacify Pitta dosha?')}
                  className="w-full py-2 bg-gradient-to-r from-amber-600 to-purple-600 hover:from-amber-500 hover:to-purple-500 text-white rounded-xl font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-md border border-white/20 cursor-pointer"
                >
                  <span>Ask NIVA Guide about Pitta Balancing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {selectedDosha === 'kapha' && (
              <div className="glass-panel rounded-3xl border border-emerald-400/30 p-5 space-y-3.5 shadow-2xl animate-dosha-breathe">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                      Water (Jala) + Earth (Prithvi)
                    </span>
                    <h3 className="text-base font-extrabold text-white mt-1">
                      Kapha Dosha — Principle of Structure, Lubrication & Stamina
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                    <Droplets className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-[11px] text-white/80 leading-relaxed">
                  Kapha provides structural cohesion, cellular hydration, lubrication for bones and joints (*Sleshaka Kapha*), physical mass, mental serenity, and biological immunity (*Ojas*).
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-400/20">
                    <span className="text-[10px] font-black text-emerald-300 uppercase">Qualities (Gunas)</span>
                    <p className="text-white/80 mt-0.5 font-medium">Heavy (*Guru*), Slow (*Manda*), Cool (*Sheeta*), Oily (*Snigdha*), Smooth (*Slakshna*), Stable (*Sthira*).</p>
                  </div>
                  <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-400/20">
                    <span className="text-[10px] font-black text-emerald-300 uppercase">Bodily Seat (Sthana)</span>
                    <p className="text-white/80 mt-0.5 font-medium">Chest (*Uras*), lungs, throat, head, joints, stomach, plasma (*Rasa*), and fat (*Meda*).</p>
                  </div>
                </div>

                {/* Balanced vs Imbalance */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="bg-emerald-500/15 p-3 rounded-xl border border-emerald-400/25">
                    <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-[11px] mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>When Balanced (Sama)</span>
                    </div>
                    <ul className="text-[11px] text-white/80 space-y-1">
                      <li>• Unshakeable calm, patience, loyalty, and deep love</li>
                      <li>• High physical stamina and resistance to fatigue</li>
                      <li>• Smooth, glowing skin and thick, lustrous hair</li>
                      <li>• Deep, refreshing, rejuvenating sleep</li>
                    </ul>
                  </div>

                  <div className="bg-amber-500/15 p-3 rounded-xl border border-amber-400/25">
                    <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px] mb-1">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                      <span>When Imbalanced (Vriddhi)</span>
                    </div>
                    <ul className="text-[11px] text-white/80 space-y-1">
                      <li>• Heavy lethargy, procrastination, and excessive sleep</li>
                      <li>• Sluggish metabolism, slow digestion, and weight retention</li>
                      <li>• Respiratory mucus, morning sinus congestion</li>
                      <li>• Emotional stubbornness, attachment, and resistance to change</li>
                    </ul>
                  </div>
                </div>

                {/* Pacifying Guidelines */}
                <div className="bg-white/[0.04] p-3 rounded-xl border border-white/10 space-y-2">
                  <h4 className="font-bold text-[11px] text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Traditional Kapha Harmonizing Guidelines</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-white/75">
                    <div>
                      <strong className="text-white">Diet:</strong> Warm, light, dry, spicy foods; legumes, steamed leafy greens, barley, quinoa, raw honey in warm water, and pungent spices (black pepper, ginger, cayenne). Pacifying tastes: Pungent, Bitter, Astringent.
                    </div>
                    <div>
                      <strong className="text-white">Lifestyle:</strong> Rise early before 6:00 AM; vigorous dynamic exercise (Surya Namaskar); dry silk glove massage (*Garshana*); stimulating breathwork (*Kapalabhati* / *Bhastrika*); avoid daytime naps.
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onAskInChat('How do I reduce Kapha lethargy and boost metabolic fire in the morning?')}
                  className="w-full py-2 bg-gradient-to-r from-emerald-600 to-purple-600 hover:from-emerald-500 hover:to-purple-500 text-white rounded-xl font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-md border border-white/20 cursor-pointer"
                >
                  <span>Ask NIVA Guide about Kapha Revitalization</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* 2. INTERACTIVE DOSHA QUIZ (PRAKRITI ESTIMATION) */}
        {/* ============================================================== */}
        {activeTab === 'quiz' && (
          <div className="space-y-4 max-w-xl mx-auto">
            {!quizSubmitted ? (
              <div className="space-y-4">
                <div className="glass-panel p-4 rounded-3xl border border-white/15 shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-amber-400" />
                      <h3 className="font-extrabold text-white text-sm">
                        Ayurvedic Prakriti (Constitution) Assessment
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                      {answeredCount} / {QUIZ_QUESTIONS.length} Answered
                    </span>
                  </div>
                  <p className="text-[11px] text-white/70 leading-relaxed">
                    Answer according to your lifelong, baseline tendencies (how your body and mind are naturally, not during temporary illness).
                  </p>
                </div>

                {/* Question Cards */}
                <div className="space-y-3">
                  {QUIZ_QUESTIONS.map((q) => {
                    const currentSelection = quizAnswers[q.id];
                    return (
                      <div
                        key={q.id}
                        className="glass-card p-4 rounded-2xl border border-white/15 space-y-2.5 shadow-md"
                      >
                        <div className="flex items-center justify-between text-[10px] font-black text-amber-300 uppercase tracking-wider">
                          <span>Question {q.id}</span>
                          <span className="text-white/40 font-semibold">{q.category}</span>
                        </div>
                        <h4 className="text-[12px] font-bold text-white">
                          {q.question}
                        </h4>

                        <div className="space-y-1.5 pt-1">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = currentSelection === opt.dosha;
                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleSelectAnswer(q.id, opt.dosha)}
                                className={`w-full text-left p-3 rounded-xl border text-[11px] transition-all flex items-start gap-2.5 cursor-pointer ${
                                  isSelected
                                    ? 'bg-gradient-to-r from-purple-600/40 to-amber-500/40 border-amber-400/60 text-white font-bold shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                                    : 'bg-white/[0.04] hover:bg-white/[0.1] border-white/10 text-white/80'
                                }`}
                              >
                                <div
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                    isSelected
                                      ? 'border-amber-400 bg-amber-400 text-[#07030F] shadow-xs'
                                      : 'border-white/30 bg-white/10'
                                  }`}
                                >
                                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#07030F]" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div>{opt.text}</div>
                                  <div className="text-[9px] text-white/40 font-normal mt-0.5">
                                    {opt.hint}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Submit Quiz Action */}
                <div className="pt-2">
                  <button
                    onClick={() => setQuizSubmitted(true)}
                    disabled={!isQuizComplete}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 disabled:opacity-40 text-white rounded-2xl font-black text-xs shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:cursor-not-allowed border border-white/20"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>
                      {isQuizComplete
                        ? 'Reveal My Tridosha Prakriti Profile'
                        : `Complete All Questions (${answeredCount}/${QUIZ_QUESTIONS.length})`}
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              /* Quiz Results View */
              <div className="glass-panel p-5 rounded-3xl border border-white/20 space-y-4 shadow-2xl">
                <div className="text-center space-y-1.5 border-b border-white/10 pb-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 px-3 py-0.5 rounded-full border border-amber-400/30">
                    Your Estimated Ayurvedic Constitution
                  </span>
                  <h3 className="text-lg font-black text-white">
                    {dominantPrakriti}
                  </h3>
                  <p className="text-[11px] text-white/65 max-w-md mx-auto">
                    Based on your responses, here is your approximate balance of the three vital doshas.
                  </p>
                </div>

                {/* Score Breakdown Bars */}
                <div className="space-y-3 bg-white/[0.04] p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-black text-white/50 uppercase tracking-wider">
                    Doshic Balance Breakdown
                  </span>

                  {/* Vata Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-sky-200">
                      <span className="flex items-center gap-1">
                        <Wind className="w-3 h-3 text-sky-400" /> Vata (Movement & Air)
                      </span>
                      <span>{vataPct}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-sky-500 rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                        style={{ width: `${vataPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Pitta Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-amber-200">
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-400" /> Pitta (Transformation & Fire)
                      </span>
                      <span>{pittaPct}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                        style={{ width: `${pittaPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Kapha Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-emerald-200">
                      <span className="flex items-center gap-1">
                        <Droplets className="w-3 h-3 text-emerald-400" /> Kapha (Structure & Water)
                      </span>
                      <span>{kaphaPct}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                        style={{ width: `${kaphaPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Personalized Recommendations Card */}
                <div className="space-y-3 pt-1">
                  <h4 className="font-extrabold text-xs text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Personalized Lifestyle Guidance for {dominantPrakriti}</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="p-3 bg-white/[0.04] rounded-xl border border-white/10 space-y-1">
                      <strong className="text-amber-300 font-bold flex items-center gap-1">
                        <Apple className="w-3 h-3 text-amber-400" /> Diet & Nutrition
                      </strong>
                      <p className="text-white/70 text-[10px] leading-relaxed">
                        {dominantKey === 'vata'
                          ? 'Prioritize warm, cooked, nourishing meals (stews, kitchari, ghee, warm milk). Favor sweet, sour, and salty tastes. Minimize cold salads and raw dry crackers.'
                          : dominantKey === 'pitta'
                          ? 'Prioritize cooling, fresh foods (melons, cucumber, ghee, leafy greens, coconut water). Favor sweet, bitter, and astringent tastes. Minimize spicy chili and fermented vinegar.'
                          : 'Prioritize warm, light, spicy, stimulating foods (steamed greens, lentils, warm ginger water). Favor pungent, bitter, and astringent tastes. Minimize heavy sweets and dairy.'}
                      </p>
                    </div>

                    <div className="p-3 bg-white/[0.04] rounded-xl border border-white/10 space-y-1">
                      <strong className="text-amber-300 font-bold flex items-center gap-1">
                        <Sun className="w-3 h-3 text-amber-400" /> Daily Dinacharya
                      </strong>
                      <p className="text-white/70 text-[10px] leading-relaxed">
                        {dominantKey === 'vata'
                          ? 'Stick to a steady sleep and eating schedule. Practice warm sesame oil self-massage (Abhyanga) before warm showers to anchor the nervous system.'
                          : dominantKey === 'pitta'
                          ? 'Avoid skipping meals; do not exercise in harsh midday sun. Practice cooling self-massage with coconut or sunflower oil and enjoy tranquil nature walks.'
                          : 'Wake up early before 6:00 AM (Brahma Muhurta). Practice dry silk-glove brushing (Garshana) and vigorous daily morning cardio exercise.'}
                      </p>
                    </div>

                    <div className="p-3 bg-white/[0.04] rounded-xl border border-white/10 space-y-1">
                      <strong className="text-amber-300 font-bold flex items-center gap-1">
                        <Heart className="w-3 h-3 text-amber-400" /> Yoga & Asanas
                      </strong>
                      <p className="text-white/70 text-[10px] leading-relaxed">
                        {dominantKey === 'vata'
                          ? 'Gentle, grounding, slow-paced yoga (Tadasana, Vrikshasana, Paschimottanasana) with prolonged deep breathing. Avoid rapid jarring sequences.'
                          : dominantKey === 'pitta'
                          ? 'Moderate, non-striving, heart-opening postures (Chandra Namaskar, Matsyasana, Bhujangasana). Practice cooling Sheetali pranayama.'
                          : 'Vigorous, dynamic, heat-generating yoga (Surya Namaskar, Virabhadrasana, Utkatasana) followed by stimulating Kapalabhati breathwork.'}
                      </p>
                    </div>

                    <div className="p-3 bg-white/[0.04] rounded-xl border border-white/10 space-y-1">
                      <strong className="text-amber-300 font-bold flex items-center gap-1">
                        <Moon className="w-3 h-3 text-amber-400" /> Evening Meditation
                      </strong>
                      <p className="text-white/70 text-[10px] leading-relaxed">
                        {dominantKey === 'vata'
                          ? 'Warm spiced milk with nutmeg at bedtime; silent breath awareness meditation in a softly lit, cozy space; early sleep by 10:00 PM.'
                          : dominantKey === 'pitta'
                          ? 'Loving-kindness (Metta) meditation; diffuse sandalwood or jasmine; surrender work screens by 9:00 PM to calm cognitive fire.'
                          : 'Light evening activities; meditate sitting upright to prevent falling asleep; wake up early without lingering in bed.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions: Send to Chat & Retake */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <button
                    onClick={() =>
                      onAskInChat(
                        `My estimated Ayurvedic Prakriti quiz result is ${dominantPrakriti} (Vata: ${vataPct}%, Pitta: ${pittaPct}%, Kapha: ${kaphaPct}%). Can you explain how I can structure my daily Dinacharya and seasonal routine according to classical Ayurveda?`
                      )
                    }
                    className="flex-1 py-2.5 px-4 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md border border-white/20 transition-all cursor-pointer"
                  >
                    <span>Discuss My Results with NIVA Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleResetQuiz}
                    className="py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/15"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* 3. VISUAL TRIDOSHA COMPARISON TAB */}
        {/* ============================================================== */}
        {activeTab === 'comparison' && (
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="glass-panel p-4 rounded-2xl border border-white/15 shadow-xl">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2 mb-1">
                <Scale className="w-4 h-4 text-amber-400" />
                <span>Tridosha Matrix Comparison</span>
              </h3>
              <p className="text-[11px] text-white/70">
                A quick, comprehensive side-by-side reference of Vata, Pitta, and Kapha across classical physiological and behavioral dimensions.
              </p>
            </div>

            <div className="overflow-x-auto glass-card rounded-2xl border border-white/15 shadow-xl">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-white/15 bg-white/[0.06]">
                    <th className="p-3 font-extrabold text-white w-1/4">Aspect</th>
                    <th className="p-3 font-extrabold text-sky-300 w-1/4 bg-sky-500/10">
                      <span className="flex items-center gap-1"><Wind className="w-3 h-3 text-sky-400" /> Vata</span>
                    </th>
                    <th className="p-3 font-extrabold text-amber-300 w-1/4 bg-amber-500/10">
                      <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-amber-400" /> Pitta</span>
                    </th>
                    <th className="p-3 font-extrabold text-emerald-300 w-1/4 bg-emerald-500/10">
                      <span className="flex items-center gap-1"><Droplets className="w-3 h-3 text-emerald-400" /> Kapha</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white/80">
                  <tr>
                    <td className="p-2.5 font-bold text-white">Elements</td>
                    <td className="p-2.5 bg-sky-500/5">Space + Air (Akasha + Vayu)</td>
                    <td className="p-2.5 bg-amber-500/5">Fire + Water (Tejas + Jala)</td>
                    <td className="p-2.5 bg-emerald-500/5">Water + Earth (Jala + Prithvi)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">Core Principle</td>
                    <td className="p-2.5 bg-sky-500/5">Kinetic Movement & Impulse</td>
                    <td className="p-2.5 bg-amber-500/5">Metabolic Transformation</td>
                    <td className="p-2.5 bg-emerald-500/5">Structure & Lubrication</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">Primary Seat</td>
                    <td className="p-2.5 bg-sky-500/5">Colon, Bones, Nervous System</td>
                    <td className="p-2.5 bg-amber-500/5">Small Intestine, Liver, Blood</td>
                    <td className="p-2.5 bg-emerald-500/5">Chest, Lungs, Joints</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">Digestive Fire (*Agni*)</td>
                    <td className="p-2.5 bg-sky-500/5">Erratic / Variable (*Vishama*)</td>
                    <td className="p-2.5 bg-amber-500/5">Sharp / Intense (*Tikshna*)</td>
                    <td className="p-2.5 bg-emerald-500/5">Slow / Steady (*Manda*)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">Peak Season</td>
                    <td className="p-2.5 bg-sky-500/5">Autumn & Early Winter</td>
                    <td className="p-2.5 bg-amber-500/5">Late Spring & Summer</td>
                    <td className="p-2.5 bg-emerald-500/5">Late Winter & Early Spring</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">Peak Daily Hours</td>
                    <td className="p-2.5 bg-sky-500/5">2:00–6:00 AM & PM</td>
                    <td className="p-2.5 bg-amber-500/5">10:00 AM–2:00 PM & PM</td>
                    <td className="p-2.5 bg-emerald-500/5">6:00–10:00 AM & PM</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">Balanced Mind</td>
                    <td className="p-2.5 bg-sky-500/5">Creative, Joyful, Adaptable</td>
                    <td className="p-2.5 bg-amber-500/5">Insightful, Focused, Courageous</td>
                    <td className="p-2.5 bg-emerald-500/5">Calm, Loving, Patient</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">Imbalance State</td>
                    <td className="p-2.5 bg-sky-500/5">Anxiety, Dryness, Insomnia</td>
                    <td className="p-2.5 bg-amber-500/5">Irritability, Acid Reflux, Heat</td>
                    <td className="p-2.5 bg-emerald-500/5">Lethargy, Congestion, Stubbornness</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">Pacifying Tastes</td>
                    <td className="p-2.5 bg-sky-500/5">Sweet, Sour, Salty</td>
                    <td className="p-2.5 bg-amber-500/5">Sweet, Bitter, Astringent</td>
                    <td className="p-2.5 bg-emerald-500/5">Pungent, Bitter, Astringent</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">Ideal Exercise</td>
                    <td className="p-2.5 bg-sky-500/5">Gentle walking, restorative yoga</td>
                    <td className="p-2.5 bg-amber-500/5">Swimming, non-competitive sport</td>
                    <td className="p-2.5 bg-emerald-500/5">Brisk running, dynamic vinyasa</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 4. PRAKRITI VS VIKRITI TAB */}
        {/* ============================================================== */}
        {activeTab === 'prakriti' && (
          <div className="space-y-4 max-w-xl mx-auto">
            <div className="glass-panel p-4 rounded-2xl border border-white/15 space-y-2 shadow-xl">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Prakriti (Constitution) vs. Vikriti (Imbalance)</span>
              </h3>
              <p className="text-[11px] text-white/70 leading-relaxed">
                One of the most foundational principles in classical Ayurveda is the distinction between who you are at your baseline (*Prakriti*) and where your doshas currently stand (*Vikriti*).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Prakriti Card */}
              <div className="glass-card p-4 rounded-2xl border border-white/15 space-y-2 shadow-md">
                <div className="flex items-center gap-1.5 text-amber-300 font-black text-xs">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>1. Prakriti (प्रकृति)</span>
                </div>
                <div className="text-[10px] text-white/50 font-bold uppercase tracking-wider">
                  Innate Lifelong Blueprint
                </div>
                <p className="text-[11px] text-white/80 leading-relaxed">
                  *Prakriti* is established at the precise moment of conception (*Shukra-Shonita Samyoga*). It represents your genetic and phenotypic baseline—your bone structure, natural eye color, inherent metabolic tempo, and innate psychological temperament.
                </p>
                <div className="bg-amber-500/15 p-2 rounded-xl text-[10px] text-amber-200 border border-amber-400/25">
                  <strong>Key Takeaway:</strong> Your Prakriti does not change throughout your life. It is your unique natural perfection.
                </div>
              </div>

              {/* Vikriti Card */}
              <div className="glass-card p-4 rounded-2xl border border-white/15 space-y-2 shadow-md">
                <div className="flex items-center gap-1.5 text-rose-300 font-black text-xs">
                  <Activity className="w-4 h-4 text-rose-400" />
                  <span>2. Vikriti (विकृति)</span>
                </div>
                <div className="text-[10px] text-white/50 font-bold uppercase tracking-wider">
                  Current Fluctuation / Imbalance
                </div>
                <p className="text-[11px] text-white/80 leading-relaxed">
                  *Vikriti* represents your current state of doshic balance or deviation. It is continually influenced by diet, stress, sleep deprivation, environmental pollutants, emotional trauma, and the change of seasons (*Ritu Sandhi*).
                </p>
                <div className="bg-white/[0.06] p-2 rounded-xl text-[10px] text-white/80 border border-white/10">
                  <strong>Key Takeaway:</strong> When you feel anxious, inflamed, or sluggish, that is your Vikriti speaking.
                </div>
              </div>
            </div>

            {/* Classical Goal */}
            <div className="glass-panel p-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 space-y-2 text-[11px] text-white/85 shadow-lg">
              <h4 className="font-extrabold text-xs text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>The Classical Ayurvedic Goal: Realigning Vikriti to Prakriti</span>
              </h4>
              <p className="leading-relaxed">
                The objective of Ayurvedic lifestyle (*Dinacharya*), herbal nutrition, and seasonal adaptation (*Ritucharya*) is not to change your innate Prakriti, but to gently bring your current transient imbalance (*Vikriti*) back into alignment with your original, healthy blueprint.
              </p>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 5. SCIENCE VS TRADITION TAB */}
        {/* ============================================================== */}
        {activeTab === 'science' && (
          <div className="space-y-4 max-w-xl mx-auto">
            <div className="glass-panel p-4 rounded-2xl border border-white/15 shadow-xl space-y-2">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-sky-400" />
                <span>Ayurveda & Modern Science: An Objective Comparison</span>
              </h3>
              <p className="text-[11px] text-white/70 leading-relaxed">
                At NIVA, we clearly distinguish between classical philosophical frameworks, modern scientific research, and health boundaries.
              </p>
            </div>

            {/* Classical Perspective Card */}
            <div className="glass-card p-4 rounded-2xl border border-white/15 space-y-2 shadow-md">
              <h4 className="font-bold text-xs text-amber-300 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>1. Classical Ayurvedic Framework (Charaka & Sushruta Samhita)</span>
              </h4>
              <ul className="text-[11px] text-white/80 space-y-1.5 pl-2">
                <li>• <strong>Panchamahabhutas:</strong> The physical universe and human physiology are composed of 5 basic energetic elements: Space, Air, Fire, Water, and Earth.</li>
                <li>• <strong>Tridosha:</strong> Functional biological humors (Vata, Pitta, Kapha) that govern all cellular movement, metabolism, and structure.</li>
                <li>• <strong>Agni & Ama:</strong> Proper digestive and metabolic fire (*Agni*) prevents the accumulation of toxic metabolic residue (*Ama*).</li>
              </ul>
            </div>

            {/* Scientific Perspective Card */}
            <div className="glass-card p-4 rounded-2xl border border-white/15 space-y-2 shadow-md">
              <h4 className="font-bold text-xs text-sky-300 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-sky-400" />
                <span>2. Modern Scientific & Biomedical Research</span>
              </h4>
              <ul className="text-[11px] text-white/80 space-y-1.5 pl-2">
                <li>• <strong>Ayurgenomics & Phenotyping:</strong> Landmark research published in peer-reviewed journals (including the Indian Council of Medical Research / CSIR) has identified correlations between classical Prakriti classifications and specific gene expression profiles, inflammatory markers, and metabolic enzyme pathways.</li>
                <li>• <strong>Circadian Biology (Nobel Prize 2017):</strong> Modern circadian medicine validates the Ayurvedic *Dinacharya* concept—the body’s metabolic rate, digestive enzyme production, cortisol, and melatonin cycles fluctuate in predictable 4-hour biological windows corresponding directly to the classical dosha clocks.</li>
                <li>• <strong>Autonomic Nervous System Tone:</strong> Vata correlates closely with sympathetic nervous system sensitivity, Pitta with metabolic and inflammatory rate, and Kapha with parasympathetic and anabolic dominance.</li>
              </ul>
            </div>

            {/* Strict Medical Boundary Notice */}
            <div className="glass-panel p-4 rounded-2xl border border-rose-400/30 bg-rose-500/10 space-y-2 text-[11px] text-rose-200 shadow-lg">
              <h4 className="font-bold text-xs text-rose-300 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-rose-400" />
                <span>Strict Clinical & Medical Boundaries</span>
              </h4>
              <p className="leading-relaxed text-white/85">
                Ayurvedic lifestyle guidance, yoga, and dosha self-assessments are traditional holistic wellness practices. They are <strong>never</strong> a substitute for clinical diagnostics, prescription medicine, oncology care, surgery, or emergency healthcare. Always consult licensed medical doctors for any medical concerns.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
