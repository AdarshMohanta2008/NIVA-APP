import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Sparkles,
  Send,
  ShoppingBag,
  UserCheck,
  Music2,
  CheckCircle2,
  Bot,
  User,
  AlertCircle,
  RotateCw,
  Cpu,
  Copy,
  Check,
  BookOpen,
  Calendar,
  Flame,
  Scale,
  ShieldAlert,
  Compass,
  HeartHandshake,
  Clock,
  Leaf,
  ArrowRight,
  Mic,
  MicOff,
  Volume2,
} from 'lucide-react';
import { Product, ServiceProvider, MusicTrack, Religion } from '../../types';
import { PRODUCTS, SERVICE_PROVIDERS } from '../../data/mockData';
import { SACRED_TRACKS } from '../../data/musicData';
import { AyurvedaSection } from '../ayurveda/AyurvedaSection';
import { AstrologySection } from '../astrology/AstrologySection';
import { NivaLogo } from '../NivaLogo';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  providerUsed?: 'openai' | 'gemini' | 'curated';
  recommendedKit?: Product;
  recommendedProvider?: ServiceProvider;
  recommendedTrack?: MusicTrack;
  checklistItems?: string[];
  suggestedPromptFollowUps?: string[];
  isError?: boolean;
}

interface NivaGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
  currentReligion?: Religion;
  onAddToCart?: (product: Product) => void;
  onStartBooking?: (provider?: ServiceProvider) => void;
  onPlayTrack?: (track: MusicTrack) => void;
  onNavigateToCalendar?: () => void;
}

type AIProvider = 'openai' | 'gemini';

type GuideCategory =
  | 'pujas'
  | 'festivals'
  | 'rituals'
  | 'scriptures'
  | 'ayurveda'
  | 'astrology';

interface CategoryConfig {
  id: GuideCategory;
  label: string;
  icon: React.ReactNode;
  prompts: string[];
}

const CATEGORIES: CategoryConfig[] = [
  {
    id: 'pujas',
    label: 'Explore Puja',
    icon: <Flame className="w-3.5 h-3.5 text-amber-400" />,
    prompts: [
      'Explain Satyanarayan Puja step-by-step with samagri & precautions',
      'How to perform Kashi Vishwanath Maha Rudrabhishek at home?',
      'Griha Pravesh Hawan: Procedure, mantras & fire safety rules',
      'What are the 16 steps of Shodashopachara Puja?',
    ],
  },
  {
    id: 'festivals',
    label: 'Festivals',
    icon: <Calendar className="w-3.5 h-3.5 text-amber-400" />,
    prompts: [
      'When is Navratri 2026? Tithi, Ashtami muhurat & fasting rules',
      'Diwali 2026: Lakshmi Puja Pradosh Kaal auspicious muhurat',
      'Karwa Chauth 2026: Moonrise time, vrat rules & health precautions',
      'Fasting rules for Nirjala Ekadashi vs diabetic health safety',
    ],
  },
  {
    id: 'rituals',
    label: 'Rituals & Mantras',
    icon: <Sparkles className="w-3.5 h-3.5 text-amber-300" />,
    prompts: [
      'Gayatri Mantra: Sanskrit, accurate transliteration & word meaning',
      'Maha Mrityunjaya Mantra: Pronunciation, benefits & precautions',
      'Mool Mantar from Guru Granth Sahib with complete explanation',
      'What is the traditional ceremony for newborn naamkaran?',
    ],
  },
  {
    id: 'scriptures',
    label: 'Scriptures',
    icon: <BookOpen className="w-3.5 h-3.5 text-purple-400" />,
    prompts: [
      'Explain Bhagavad Gita Chapter 2 Verse 47 on Nishkama Karma',
      'What are the 4 Mahavakyas of the Upanishads and their meanings?',
      'Advaita Vedanta vs Dvaita: Core philosophical distinctions',
      'Surah Al-Fatiha & Ayat al-Kursi: Spiritual reflections',
    ],
  },
  {
    id: 'ayurveda',
    label: 'Ayurveda',
    icon: <Leaf className="w-3.5 h-3.5 text-emerald-400" />,
    prompts: [
      'What is the primary element of Vata?',
      'What are the qualities and functions of Vata, Pitta, and Kapha?',
      'Explain Prakriti (innate constitution) vs Vikriti (current imbalance)',
      'What are traditional Dinacharya morning practices in Ayurveda?',
    ],
  },
  {
    id: 'astrology',
    label: 'Vedic Astrology',
    icon: <Compass className="w-3.5 h-3.5 text-purple-400" />,
    prompts: [
      'What is the significance of Lagna, Moon sign and Nakshatra in Vedic Kundli?',
      'Explain the 12 houses (Bhavas) and their traditional life areas',
      'How does Ashtakoota 36 Guna Milan work for marriage compatibility?',
      'What is Shani Sade Sati and what are the traditional spiritual remedies?',
    ],
  },
];

export const NivaGuideModal: React.FC<NivaGuideModalProps> = ({
  isOpen,
  onClose,
  initialTopic,
  currentReligion = 'Hinduism',
  onAddToCart,
  onStartBooking,
  onPlayTrack,
}) => {
  const [viewMode, setViewMode] = useState<'chat' | 'ayurveda' | 'astrology'>('chat');
  const [selectedCategory, setSelectedCategory] = useState<GuideCategory>('pujas');
  const [activeProvider, setActiveProvider] = useState<AIProvider>('openai');
  const [checkedChecklistItems, setCheckedChecklistItems] = useState<Record<string, boolean>>({});
  const [copiedMantraId, setCopiedMantraId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: `I am **NIVA**, your guide on religion, sacred scriptures, Ayurveda, and traditions.

Ask me anything directly—from quick questions regarding mantras, doshas, and dates, to step-by-step procedures for ceremonies and philosophical reflections.`,
      timestamp: 'Just now',
      providerUsed: 'openai',
      suggestedPromptFollowUps: [
        'What is the primary element of Vata?',
        'Satyanarayan Puja steps & samagri',
        'When is Navratri 2026? Tithi & fasting',
        'Gayatri Mantra transliteration & meaning',
      ],
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastFailedQuery, setLastFailedQuery] = useState<string | null>(null);
  const [requestError, setRequestError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Client time and timezone for Muhurat calculations
  const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local';
  const currentDateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  useEffect(() => {
    if (initialTopic && isOpen) {
      handleAskQuery(`Tell me how to observe and prepare for ${initialTopic}`);
    }
  }, [initialTopic, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  // Voice speech synthesis toggle
  const handleToggleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Voice microphone recognition
  const handleToggleListen = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputQuery(transcript);
        }
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleAskQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    const trimmed = queryText.trim();
    const userMsg: Message = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: 'Just now',
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputQuery('');
    setIsTyping(true);
    setRequestError(null);
    setLastFailedQuery(null);

    const conversationHistory = updatedMessages.map((m) => ({
      sender: m.sender,
      text: m.text,
    }));

    try {
      const response = await fetch('/api/niva-guide/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: trimmed,
          conversationHistory,
          religion: currentReligion,
          provider: activeProvider,
          clientDate: new Date().toISOString(),
          clientTimezone,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with HTTP ${response.status}`);
      }

      const data = await response.json();

      const recommendedKit = data.recommendedKitId
        ? PRODUCTS.find((p) => p.id === data.recommendedKitId) || PRODUCTS[0]
        : undefined;

      const recommendedProvider = data.recommendedProviderId
        ? SERVICE_PROVIDERS.find((p) => p.id === data.recommendedProviderId)
        : undefined;

      const recommendedTrack = data.recommendedTrackId
        ? SACRED_TRACKS.find((t) => t.id === data.recommendedTrackId)
        : undefined;

      const aiMsg: Message = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: data.text || 'May peace and divine blessings be upon you.',
        timestamp: 'Just now',
        providerUsed: data.provider || activeProvider,
        recommendedKit,
        recommendedProvider,
        recommendedTrack,
        checklistItems: data.checklistItems,
        suggestedPromptFollowUps: data.suggestedPromptFollowUps,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error('NIVA Guide Chat Error:', err);
      setLastFailedQuery(trimmed);
      setRequestError(
        'NIVA Guide encountered a transient connection challenge. You can tap Retry or consult the curated guidance below.'
      );

      const fallbackMsg: Message = {
        id: `msg-ai-fallback-${Date.now()}`,
        sender: 'ai',
        text: 'I ran into a connection issue just now. Please tap **Retry** or ask again.',
        timestamp: 'Just now',
        providerUsed: 'curated',
        isError: true,
      };

      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRetryLast = () => {
    if (lastFailedQuery) {
      handleAskQuery(lastFailedQuery);
    }
  };

  const handleToggleChecklistItem = (item: string) => {
    setCheckedChecklistItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMantraId(id);
    setTimeout(() => {
      setCopiedMantraId(null);
    }, 2000);
  };

  // Helper to render formatted markdown-like text with clean editorial layouts
  const renderMessageContent = (text: string, msgId: string) => {
    const lines = text.split('\n');

    return (
      <div className="space-y-3 leading-relaxed text-white/90 font-sans text-xs">
        {lines.map((line, idx) => {
          const trimmedLine = line.trim();

          // Section Header 3: ###
          if (trimmedLine.startsWith('### ')) {
            return (
              <h3
                key={idx}
                className="font-serif text-sm sm:text-base font-semibold text-white border-b border-white/10 pb-1.5 mt-3 pt-1 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                <span>{trimmedLine.replace('### ', '')}</span>
              </h3>
            );
          }

          // Section Header 4: ####
          if (trimmedLine.startsWith('#### ')) {
            const headerTitle = trimmedLine.replace('#### ', '');
            return (
              <h4
                key={idx}
                className="font-medium text-xs text-amber-300 mt-2 flex items-center gap-1.5"
              >
                <span className="text-amber-400">·</span>
                <span>{headerTitle}</span>
              </h4>
            );
          }

          // Bullet points
          if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
            const content = trimmedLine.slice(2);
            return (
              <div key={idx} className="flex items-start gap-2 pl-1.5 text-white/80">
                <span className="text-purple-400 font-serif leading-none mt-1">―</span>
                <span className="flex-1 font-normal">
                  {formatInlineText(content)}
                </span>
              </div>
            );
          }

          // Numbered items
          const numMatch = trimmedLine.match(/^(\d+)\.\s+(.*)/);
          if (numMatch) {
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-1 text-white/80">
                <span className="font-serif text-amber-300/80 font-semibold text-xs shrink-0 mt-0.5">
                  {numMatch[1]}.
                </span>
                <span className="flex-1 font-normal">
                  {formatInlineText(numMatch[2])}
                </span>
              </div>
            );
          }

          // Empty line
          if (!trimmedLine) {
            return <div key={idx} className="h-0.5" />;
          }

          // Standard paragraph
          return (
            <p key={idx} className="leading-relaxed font-normal text-white/85">
              {formatInlineText(line)}
            </p>
          );
        })}

        {/* Quick action bar for message (Text-to-speech + Copy) */}
        <div className="pt-2 flex items-center justify-end gap-2 text-white/40">
          <button
            onClick={() => handleToggleSpeak(text)}
            className="text-[11px] text-white/50 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            title="Read aloud"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'text-amber-400 animate-pulse' : ''}`} />
            <span>{isSpeaking ? 'Playing' : 'Listen'}</span>
          </button>

          <span aria-hidden="true">·</span>

          <button
            onClick={() => handleCopyText(text, msgId)}
            className="text-[11px] text-white/50 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            title="Copy text"
          >
            {copiedMantraId === msgId ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  // Helper for bold and italic inline formatting
  const formatInlineText = (str: string) => {
    if (str.includes('[Scripture') || str.includes('[Shastra]')) {
      return (
        <span className="text-amber-300 font-serif italic mr-1">
          [Scripture]
        </span>
      );
    }
    if (str.includes('[Scientific') || str.includes('[Psychological')) {
      return (
        <span className="text-white/50 font-mono text-[10px] mr-1">
          [Scientific distinction]
        </span>
      );
    }
    if (str.includes('CRITICAL HEALTH BOUNDARY') || str.includes('NEVER a substitute')) {
      return (
        <span className="block border-l-2 border-amber-400/50 pl-2 text-amber-200/90 text-[11px] my-1 font-normal italic bg-amber-500/10 p-2 rounded-r-xl">
          Sacred rituals are devotional practices of peace; they are never a substitute for professional medical care.
        </span>
      );
    }

    const parts = str.split('**');
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className="font-semibold text-white">
          {part}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const currentCategoryConfig = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#07030F]/80 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="glass-panel bg-[#0D071E]/95 w-full max-w-2xl rounded-3xl shadow-[0_0_80px_rgba(168,85,247,0.3)] border border-white/20 flex flex-col h-[92vh] max-h-[850px] overflow-hidden text-white">
        {/* Editorial Top Bar Contract */}
        <div className="bg-white/[0.05] text-white px-4 sm:px-5 py-3.5 flex items-center justify-between shrink-0 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <NivaLogo
                variant="icon"
                size={36}
                glowColor="#F59E0B"
                withGlow={true}
                animated={true}
                showStarTwinkle={true}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0D071E]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-base sm:text-lg font-medium tracking-wide text-white">
                  NIVA Guide
                </h2>
                <span className="text-[10px] text-amber-300 font-semibold bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                  Sacred Intelligence
                </span>
              </div>
              <p className="text-[11px] text-white/50 font-normal leading-tight hidden sm:block">
                Pujas · Festivals · Rituals · Scriptures · Ayurveda · Astrology
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* AI Engine Switcher */}
            <button
              onClick={() => setActiveProvider((prev) => (prev === 'openai' ? 'gemini' : 'openai'))}
              className="text-[11px] text-white/70 hover:text-white px-2.5 py-1 rounded-full border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] transition-colors flex items-center gap-1.5 font-mono cursor-pointer"
              title="Toggle AI Engine"
            >
              <Cpu className="w-3 h-3 text-amber-400" />
              <span>{activeProvider === 'openai' ? 'OpenAI' : 'Gemini'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
              aria-label="Close Guide"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs: Guide AI vs Ayurveda vs Astrology */}
        <div className="flex border-b border-white/10 bg-white/[0.03] shrink-0 p-1 gap-1">
          <button
            onClick={() => setViewMode('chat')}
            className={`flex-1 py-2 px-3 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'chat'
                ? 'bg-purple-600/40 text-white border border-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-purple-400" />
            <span>Ask NIVA</span>
          </button>

          <button
            onClick={() => setViewMode('ayurveda')}
            className={`flex-1 py-2 px-3 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'ayurveda'
                ? 'bg-emerald-600/40 text-white border border-emerald-400/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ayurveda & Tridosha</span>
          </button>

          <button
            onClick={() => setViewMode('astrology')}
            className={`flex-1 py-2 px-3 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'astrology'
                ? 'bg-amber-600/40 text-white border border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Vedic Astrology</span>
          </button>
        </div>

        {viewMode === 'ayurveda' ? (
          <AyurvedaSection
            onAskInChat={(query) => {
              setViewMode('chat');
              handleAskQuery(query);
            }}
          />
        ) : viewMode === 'astrology' ? (
          <AstrologySection
            onAskInChat={(query) => {
              setViewMode('chat');
              handleAskQuery(query);
            }}
          />
        ) : (
          <>
            {/* Quick Actions Bar: Explore Puja, Festivals, Rituals, Scriptures */}
            <div className="px-3 py-2 bg-white/[0.02] border-b border-white/10 overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider shrink-0">
                Quick Actions:
              </span>
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white border border-white/30 shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                        : 'text-white/70 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10'
                    }`}
                  >
                    {cat.icon}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Error Banner if any */}
            {requestError && (
              <div className="bg-rose-500/20 border-b border-rose-500/30 px-4 py-2 text-xs text-rose-200 flex items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span className="text-[11px] font-medium">{requestError}</span>
                </div>
                {lastFailedQuery && (
                  <button
                    onClick={handleRetryLast}
                    className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-semibold flex items-center gap-1 hover:bg-rose-500 transition-colors cursor-pointer"
                  >
                    <RotateCw className="w-2.5 h-2.5" />
                    <span>Retry</span>
                  </button>
                )}
              </div>
            )}

            {/* Chat Stream Area — Clean visionOS Glass Typography */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'ai' && (
                    <NivaLogo
                      variant="icon"
                      size={28}
                      glowColor="#F59E0B"
                      withGlow={false}
                      className="shrink-0 mt-0.5"
                    />
                  )}

                  <div
                    className={`max-w-[90%] sm:max-w-[85%] rounded-2xl p-4 space-y-3 ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-purple-600/40 to-indigo-600/40 border border-purple-400/30 text-white shadow-lg'
                        : 'glass-card bg-white/[0.05] border border-white/15 text-white/90 shadow-xl'
                    }`}
                  >
                    {/* Message Body */}
                    {renderMessageContent(msg.text, msg.id)}

                    {/* Interactive Checklist if provided */}
                    {msg.checklistItems && msg.checklistItems.length > 0 && (
                      <div className="glass-panel p-3.5 rounded-xl border border-white/10 space-y-2 mt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                            Essential Samagri Checklist
                          </span>
                          <span className="text-[10px] text-white/50">
                            {
                              msg.checklistItems.filter(
                                (item) => checkedChecklistItems[`${msg.id}-${item}`]
                              ).length
                            }
                            /{msg.checklistItems.length} gathered
                          </span>
                        </div>

                        <ul className="space-y-1.5 mt-1">
                          {msg.checklistItems.map((item, i) => {
                            const isChecked = Boolean(
                              checkedChecklistItems[`${msg.id}-${item}`]
                            );
                            return (
                              <li
                                key={i}
                                onClick={() =>
                                  handleToggleChecklistItem(`${msg.id}-${item}`)
                                }
                                className={`text-xs p-2 rounded-lg flex items-center gap-2 cursor-pointer transition-colors ${
                                  isChecked
                                    ? 'text-white/40 line-through bg-white/[0.02]'
                                    : 'text-white/85 hover:bg-white/[0.06]'
                                }`}
                              >
                                <div
                                  className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                                    isChecked
                                      ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_8px_rgba(168,85,247,0.4)]'
                                      : 'border-white/20 bg-white/[0.06]'
                                  }`}
                                >
                                  {isChecked && <Check className="w-3 h-3" />}
                                </div>
                                <span>{item}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}

                    {/* Suggested Follow-up Prompts */}
                    {msg.suggestedPromptFollowUps && msg.suggestedPromptFollowUps.length > 0 && (
                      <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                        {msg.suggestedPromptFollowUps.map((p, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleAskQuery(p)}
                            className="text-[11px] bg-white/[0.06] hover:bg-white/[0.12] text-white/80 hover:text-white border border-white/15 px-3 py-1 rounded-full transition-all text-left cursor-pointer"
                          >
                            {p} →
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2.5 text-white/50 text-xs">
                  <NivaLogo
                    variant="icon"
                    size={28}
                    glowColor="#F59E0B"
                    withGlow={false}
                    className="shrink-0"
                  />
                  <div className="glass-card px-4 py-2.5 rounded-2xl border border-white/15 flex items-center gap-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[11px] text-white/60 ml-1.5 font-normal">
                      NIVA is reflecting...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Inquiries Tray for Selected Category */}
            <div className="px-4 py-2 border-t border-white/10 bg-white/[0.02] overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-semibold text-white/50 shrink-0">
                {currentCategoryConfig.label}:
              </span>
              {currentCategoryConfig.prompts.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAskQuery(q)}
                  className="text-xs whitespace-nowrap px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/70 hover:text-white hover:bg-white/[0.1] hover:border-white/20 transition-all shrink-0 cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Query Input Box with Voice & Send Controls */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAskQuery(inputQuery);
              }}
              className="p-3 bg-white/[0.04] border-t border-white/10 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask NIVA about pujas, festivals, rituals, scriptures, Ayurveda, astrology..."
                className="flex-1 bg-white/[0.06] border border-white/15 rounded-2xl px-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-hidden focus:border-purple-400 focus:bg-white/[0.1] transition-all"
              />

              {/* Voice recognition affordance */}
              <button
                type="button"
                onClick={handleToggleListen}
                className={`p-2.5 rounded-2xl border transition-colors shrink-0 cursor-pointer ${
                  isListening
                    ? 'bg-rose-500/20 text-rose-300 border-rose-400/40 animate-pulse'
                    : 'bg-white/[0.06] text-white/60 hover:text-white border-white/15 hover:bg-white/[0.1]'
                }`}
                title={isListening ? 'Listening...' : 'Voice input'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <button
                type="submit"
                disabled={!inputQuery.trim() || isTyping}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-amber-500 hover:brightness-110 disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-lg shadow-purple-600/30 shrink-0 cursor-pointer border border-white/20"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
