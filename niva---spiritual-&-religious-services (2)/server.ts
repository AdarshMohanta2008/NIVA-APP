import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { GoogleGenAI } from '@google/genai';
import { COMPREHENSIVE_CALENDAR_EVENTS } from './src/data/calendarData.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Helper to sanitize text
function cleanText(text: string): string {
  return text.trim();
}

// Master System prompt for NIVA Guide — Natural, Intelligent Personal Guide
const NIVA_SYSTEM_INSTRUCTIONS = `You are NIVA, a natural, intelligent personal guide. You are not a generic chatbot or AI customer-support bot.

### CORE RULE: ALWAYS UNDERSTAND THE USER'S ACTUAL INTENT FIRST
Do NOT assume that every message is a request about religion, puja, Ayurveda, astrology, spirituality, festivals, or rituals.

Classify the user's message naturally as:
- Casual conversation
- Greeting
- Question
- Religious / spiritual request
- Puja / ritual request
- Festival request
- Ayurveda request
- Astrology request
- General knowledge
- App-related request
- Other

Then respond ONLY according to that intent.

If the user says something casual like "hello", "hi", "thanks", "okay", "bye", "what's up", etc., respond naturally and briefly.

NEVER attach unrelated religious information to casual messages.
For example, NEVER respond to "Hello" with:
- Puja information
- Puja samagri
- Festival information
- Religious quotes
- Astrology
- Ayurveda
- Spiritual recommendations
unless the user specifically asks for it.

### CONVERSATION EXAMPLES:
User: "Hello"
NIVA: "Hey! How can I help?"

User: "Hi NIVA"
NIVA: "Hey! 👋"

User: "How are you?"
NIVA: "I'm doing well! What can I help you with?"

User: "What's up?"
NIVA: "Not much — I'm here if you need anything."

User: "Thank you"
NIVA: "You're welcome!"

User: "Good morning"
NIVA: "Good morning! ☀️"

User: "Tell me about Diwali"
NIVA should then provide relevant information about Diwali.

User: "What is Vata?"
NIVA should explain Vata.

User: "What is my Rashi?"
NIVA should ask for the necessary birth information (date of birth, exact time of birth, and place of birth) if it is not already available.

### MOST IMPORTANT BEHAVIOR:
- Do not search for a reason to talk about NIVA's features.
- Do not force the conversation toward religion.
- Do not provide information that was not requested.
- Answer the user's message, not what you think the user might ask next.
- Think like a real person having a conversation:
  Understand → Respond appropriately → Stop.

### HOW YOU ACT:
1. **Answer exactly what the user asks.** Do not automatically add unrelated information.
2. **Never give unnecessary introductions, disclaimers, suggestions or follow-up questions** unless they are genuinely useful.
3. **Do not use repetitive phrases** like "Sure!", "Certainly!", "I'd be happy to help!", or "How can I assist you today?". Start directly with the answer.
4. **Do not sound robotic, scripted or like an AI customer-support bot.** Understand the user's intent and respond naturally, like a knowledgeable human guide.
5. **Keep simple questions short and direct.** (e.g. If asked "What is the primary element of Vata?", answer directly in 1-2 clear sentences. Do not write a 10-paragraph essay).
6. **Give detailed answers only when the user asks for detail or the question genuinely requires it** (e.g., explaining a complete ritual procedure, festival timings with tithis, or comparative philosophy).
7. **If the user asks for a specific format**, follow that format exactly.
8. **Do not repeat information** the user already knows or has provided.
9. **Remember the conversation context** and use it naturally.
10. **Ask a clarification question only** when the request genuinely cannot be answered accurately without it.
11. **Never invent information just to provide an answer.** Say when something is uncertain or regionally varied.
12. **Do not automatically recommend features, rituals, products or other topics** after every response.
13. **Do not turn every conversation into a lesson.**
14. **Do not force greetings, motivational messages or spiritual quotes** into unrelated conversations.

### PERSONALITY:
Calm, intelligent, warm, respectful, knowledgeable, and human.
You can be conversational and occasionally humorous when appropriate, but should never become overly casual or disrespectful.

### RELIGION & SPIRITUALITY:
When discussing religion, rituals, Ayurveda or astrology:
* Respect different beliefs and traditions. Never claim one religion or tradition is superior.
* Clearly distinguish traditional beliefs from historical facts and scientific evidence.
* Do not present supernatural or religious beliefs as scientifically proven facts.
* Never suggest rituals, astrology, or dosha balancing as replacements for professional medical diagnosis or clinical treatment.
* When providing mantras, provide accurate Sanskrit, transliteration, and meaning without inventing text.`;

export interface IntentClassification {
  category:
    | 'greeting'
    | 'casual_conversation'
    | 'gratitude'
    | 'farewell'
    | 'acknowledgment'
    | 'astrology_request'
    | 'ayurveda_request'
    | 'festival_request'
    | 'puja_ritual_request'
    | 'religious_spiritual_request'
    | 'general_knowledge'
    | 'app_related_request'
    | 'other';
  isCasual: boolean;
  directAnswer?: string;
  wantsCalendarGrounding: boolean;
}

// Intent Classification Engine
export function classifyUserIntent(rawMessage: string): IntentClassification {
  const text = rawMessage.trim();
  const lower = text.toLowerCase();
  // Strip trailing punctuation & extra whitespace
  const normalized = lower.replace(/[!?.,;]+$/, '').replace(/\s+/g, ' ').trim();

  // --- 1. DIRECT GREETINGS & CASUAL MESSAGES ---
  if (normalized === 'hi niva' || normalized === 'hello niva' || normalized === 'hey niva') {
    return { category: 'greeting', isCasual: true, directAnswer: 'Hey! 👋', wantsCalendarGrounding: false };
  }
  if (
    normalized === 'hello' ||
    normalized === 'hi' ||
    normalized === 'hey' ||
    normalized === 'heya' ||
    normalized === 'hello there' ||
    normalized === 'hey there' ||
    normalized === 'hullo' ||
    normalized === 'hola'
  ) {
    return { category: 'greeting', isCasual: true, directAnswer: 'Hey! How can I help?', wantsCalendarGrounding: false };
  }
  if (
    normalized === 'how are you' ||
    normalized === 'how are you doing' ||
    normalized === 'how are you doing today' ||
    normalized === "how's it going" ||
    normalized === 'how is it going' ||
    normalized === 'how are you today' ||
    normalized === 'how have you been'
  ) {
    return {
      category: 'casual_conversation',
      isCasual: true,
      directAnswer: "I'm doing well! What can I help you with?",
      wantsCalendarGrounding: false,
    };
  }
  if (
    normalized === "what's up" ||
    normalized === 'whats up' ||
    normalized === 'sup' ||
    normalized === 'what is up' ||
    normalized === "what's going on"
  ) {
    return {
      category: 'casual_conversation',
      isCasual: true,
      directAnswer: "Not much — I'm here if you need anything.",
      wantsCalendarGrounding: false,
    };
  }
  if (
    normalized === 'thank you' ||
    normalized === 'thanks' ||
    normalized === 'thank you so much' ||
    normalized === 'thanks a lot' ||
    normalized === 'ty' ||
    normalized === 'thx' ||
    normalized === 'many thanks' ||
    normalized === 'appreciate it'
  ) {
    return { category: 'gratitude', isCasual: true, directAnswer: "You're welcome!", wantsCalendarGrounding: false };
  }
  if (
    normalized === 'good morning' ||
    normalized === 'morning' ||
    normalized === 'good morning niva'
  ) {
    return { category: 'greeting', isCasual: true, directAnswer: 'Good morning! ☀️', wantsCalendarGrounding: false };
  }
  if (normalized === 'good afternoon' || normalized === 'good afternoon niva') {
    return { category: 'greeting', isCasual: true, directAnswer: 'Good afternoon! How can I help?', wantsCalendarGrounding: false };
  }
  if (normalized === 'good evening' || normalized === 'good evening niva') {
    return { category: 'greeting', isCasual: true, directAnswer: 'Good evening! How can I help?', wantsCalendarGrounding: false };
  }
  if (normalized === 'good night' || normalized === 'night' || normalized === 'good night niva') {
    return { category: 'greeting', isCasual: true, directAnswer: 'Good night! Rest well.', wantsCalendarGrounding: false };
  }
  if (
    normalized === 'bye' ||
    normalized === 'goodbye' ||
    normalized === 'see you' ||
    normalized === 'see ya' ||
    normalized === 'cya' ||
    normalized === 'take care' ||
    normalized === 'bye niva' ||
    normalized === 'goodbye niva'
  ) {
    return { category: 'farewell', isCasual: true, directAnswer: 'Take care! See you next time.', wantsCalendarGrounding: false };
  }
  if (
    normalized === 'ok' ||
    normalized === 'okay' ||
    normalized === 'got it' ||
    normalized === 'understood' ||
    normalized === 'alright' ||
    normalized === 'cool' ||
    normalized === 'nice' ||
    normalized === 'great' ||
    normalized === 'perfect' ||
    normalized === 'sure'
  ) {
    return {
      category: 'acknowledgment',
      isCasual: true,
      directAnswer: 'Sounds good! Let me know if you need anything else.',
      wantsCalendarGrounding: false,
    };
  }

  // --- 2. ASTROLOGY INTENTS ---
  // "What is my Rashi?" -> ask for necessary birth info if not provided
  if (
    normalized === 'what is my rashi' ||
    normalized === "what's my rashi" ||
    normalized === 'tell me my rashi' ||
    normalized === 'find my rashi' ||
    normalized === 'check my rashi' ||
    normalized === 'calculate my rashi' ||
    normalized === 'what is my moon sign' ||
    normalized === "what's my moon sign" ||
    normalized === 'tell me my moon sign' ||
    (lower.includes('my rashi') && !lower.includes('born') && !lower.includes('19') && !lower.includes('20'))
  ) {
    const hasBirthDetails = /\b(19\d\d|20\d\d)\b/.test(lower) || /\b(am|pm)\b/i.test(lower);
    if (!hasBirthDetails) {
      return {
        category: 'astrology_request',
        isCasual: false,
        directAnswer: "To find your Rashi (Moon sign), I'll need your date of birth, exact time of birth, and place of birth.",
        wantsCalendarGrounding: false,
      };
    }
  }

  // --- 3. AYURVEDA INTENTS ---
  // "What is Vata?"
  if (
    normalized === 'what is vata' ||
    normalized === 'what is vata dosha' ||
    normalized === 'explain vata' ||
    normalized === 'tell me about vata' ||
    normalized === 'what does vata mean'
  ) {
    return {
      category: 'ayurveda_request',
      isCasual: false,
      directAnswer:
        'In Ayurveda, **Vata** is one of the three primary doshas, formed by the elements **Space (*Akasha*)** and **Air (*Vayu*)**. It governs all biological movement, respiration, circulation, nerve impulses, and tissue elimination.',
      wantsCalendarGrounding: false,
    };
  }

  // "What is Pitta?"
  if (
    normalized === 'what is pitta' ||
    normalized === 'what is pitta dosha' ||
    normalized === 'explain pitta' ||
    normalized === 'tell me about pitta'
  ) {
    return {
      category: 'ayurveda_request',
      isCasual: false,
      directAnswer:
        'In Ayurveda, **Pitta** is one of the three primary doshas, formed by the elements **Fire (*Tejas*)** and **Water (*Jala*)**. It governs metabolic transformation, digestion, body temperature, and intellectual discernment.',
      wantsCalendarGrounding: false,
    };
  }

  // "What is Kapha?"
  if (
    normalized === 'what is kapha' ||
    normalized === 'what is kapha dosha' ||
    normalized === 'explain kapha' ||
    normalized === 'tell me about kapha'
  ) {
    return {
      category: 'ayurveda_request',
      isCasual: false,
      directAnswer:
        'In Ayurveda, **Kapha** is one of the three primary doshas, formed by the elements **Water (*Jala*)** and **Earth (*Prithvi*)**. It governs bodily structure, cellular cohesion, lubrication of joints, and physical endurance.',
      wantsCalendarGrounding: false,
    };
  }

  // --- 4. FESTIVALS & RITUALS DETECTION ---
  const isFestivalQuery =
    lower.includes('diwali') ||
    lower.includes('deepavali') ||
    lower.includes('navratri') ||
    lower.includes('durga puja') ||
    lower.includes('holi') ||
    lower.includes('eid') ||
    lower.includes('ramadan') ||
    lower.includes('christmas') ||
    lower.includes('ganesh chaturthi') ||
    lower.includes('janmashtami') ||
    lower.includes('festival') ||
    lower.includes('muhurat') ||
    lower.includes('tithi') ||
    lower.includes('calendar') ||
    lower.includes('panchang');

  if (isFestivalQuery) {
    return { category: 'festival_request', isCasual: false, wantsCalendarGrounding: true };
  }

  const isRitualQuery =
    lower.includes('puja') ||
    lower.includes('pooja') ||
    lower.includes('hawan') ||
    lower.includes('havan') ||
    lower.includes('aarti') ||
    lower.includes('vrat') ||
    lower.includes('samagri') ||
    lower.includes('mantra') ||
    lower.includes('ritual') ||
    lower.includes('shodashopachara') ||
    lower.includes('satyanarayan');

  if (isRitualQuery) {
    return { category: 'puja_ritual_request', isCasual: false, wantsCalendarGrounding: false };
  }

  const isAyurvedaGeneral =
    lower.includes('ayurveda') ||
    lower.includes('dosha') ||
    lower.includes('prakriti') ||
    lower.includes('vikriti') ||
    lower.includes('dinacharya') ||
    lower.includes('agni') ||
    lower.includes('vata') ||
    lower.includes('pitta') ||
    lower.includes('kapha');

  if (isAyurvedaGeneral) {
    return { category: 'ayurveda_request', isCasual: false, wantsCalendarGrounding: false };
  }

  const isAstrologyGeneral =
    lower.includes('astrology') ||
    lower.includes('jyotish') ||
    lower.includes('kundli') ||
    lower.includes('kundali') ||
    lower.includes('rashi') ||
    lower.includes('nakshatra') ||
    lower.includes('lagna') ||
    lower.includes('horoscope') ||
    lower.includes('ashtakoota');

  if (isAstrologyGeneral) {
    return { category: 'astrology_request', isCasual: false, wantsCalendarGrounding: false };
  }

  const isReligiousGeneral =
    lower.includes('gita') ||
    lower.includes('upanishad') ||
    lower.includes('vedas') ||
    lower.includes('bible') ||
    lower.includes('quran') ||
    lower.includes('granth') ||
    lower.includes('dharma') ||
    lower.includes('karma') ||
    lower.includes('moksha') ||
    lower.includes('deity') ||
    lower.includes('shiva') ||
    lower.includes('vishnu') ||
    lower.includes('krishna') ||
    lower.includes('ganesha');

  if (isReligiousGeneral) {
    return { category: 'religious_spiritual_request', isCasual: false, wantsCalendarGrounding: false };
  }

  // Check if it's a short conversational string
  const casualTokens = ['hey', 'hi', 'hello', 'yo', 'sup', 'cool', 'nice', 'awesome', 'great', 'lol', 'haha', 'hmm', 'huh', 'wow', 'test', 'testing'];
  const words = normalized.split(/\s+/);
  if (words.length <= 4 && words.every((w) => casualTokens.includes(w))) {
    return { category: 'casual_conversation', isCasual: true, directAnswer: 'Hey! How can I help?', wantsCalendarGrounding: false };
  }

  return { category: 'other', isCasual: false, wantsCalendarGrounding: false };
}

// Helper to look up relevant calendar events from the dataset
function findRelevantCalendarEvents(query: string, currentMonthYear: string = 'September 2026'): any[] {
  const lower = query.toLowerCase();
  const matched = COMPREHENSIVE_CALENDAR_EVENTS.filter((e) => {
    const titleMatch = e.title.toLowerCase().includes(lower) || lower.includes(e.title.toLowerCase().split(' ')[0]);
    const descMatch = e.description.toLowerCase().includes(lower) || e.significance.toLowerCase().includes(lower);
    return titleMatch || descMatch;
  });

  if (matched.length > 0) {
    return matched.slice(0, 3);
  }

  // If asking about "festivals this month" or "upcoming festivals"
  if (lower.includes('upcoming') || lower.includes('festival') || lower.includes('this month') || lower.includes('calendar') || lower.includes('tithi')) {
    return COMPREHENSIVE_CALENDAR_EVENTS.slice(0, 4);
  }

  return [];
}

// Catalog recommendation deduction — ONLY recommend items/priests/music when user specifically asks for items, kits, booking, or shopping!
function deduceCatalogRecommendations(query: string, responseText: string, isCasual: boolean = false) {
  if (isCasual) {
    return {
      recommendedKitId: undefined,
      recommendedProviderId: undefined,
      recommendedTrackId: undefined,
      checklistItems: undefined,
      suggestedPromptFollowUps: undefined,
    };
  }

  const qLower = query.toLowerCase();

  // Check if user actually asked for products, samagri, kits, shopping, priests, or music
  const wantsShoppingOrKit =
    qLower.includes('samagri') ||
    qLower.includes('kit') ||
    qLower.includes('buy') ||
    qLower.includes('shop') ||
    qLower.includes('items needed') ||
    qLower.includes('materials') ||
    qLower.includes('what to buy');

  const wantsPriest =
    qLower.includes('book priest') ||
    qLower.includes('book pandit') ||
    qLower.includes('find priest') ||
    qLower.includes('hire') ||
    qLower.includes('officiant');

  const wantsMusic =
    qLower.includes('play music') ||
    qLower.includes('chants') ||
    qLower.includes('bhajan') ||
    qLower.includes('audio') ||
    qLower.includes('song');

  const combined = (query + ' ' + responseText).toLowerCase();

  let recommendedKitId: string | undefined;
  let recommendedProviderId: string | undefined;
  let recommendedTrackId: string | undefined;
  let checklistItems: string[] | undefined;

  // Only assign kit/checklist if user asked for items/samagri/kit
  if (wantsShoppingOrKit) {
    if (combined.includes('ganesh') || combined.includes('chaturthi')) {
      recommendedKitId = 'prod-9';
      checklistItems = [
        'Eco-Friendly Shadu Clay Idol',
        '21 fresh Durva grass blades',
        '21 Red Hibiscus blossoms',
        'Brass Diya with pure cow ghee & camphor',
        '21 Steamed Ukadiche Modaks for Naivedya',
      ];
    } else if (combined.includes('satyanarayan') || combined.includes('vishnu')) {
      recommendedKitId = 'prod-1';
      checklistItems = [
        'Lord Satyanarayan photo / Shaligram',
        '4 fresh banana stems for altar pillars',
        'Panchamrit (Milk, Curd, Ghee, Honey, Sugar)',
        'Wheat flour / semolina panjiri with Tulsi',
        'Kalash with mango leaves & peeled coconut',
      ];
    } else if (combined.includes('griha') || combined.includes('hawan') || combined.includes('vastu')) {
      recommendedKitId = 'prod-1';
      checklistItems = [
        'Navagraha 9 sacred samidha woods',
        'A2 Pure Cow Ghee (1 Liter)',
        'Brass Kalash with fresh mango leaves',
        'Gangajal & Panchamrit ingredients',
        'Hawan Kund & Bhimseni Camphor',
      ];
    } else if (combined.includes('navratri') || combined.includes('durga')) {
      recommendedKitId = 'prod-7';
      checklistItems = [
        'Clay pot with clean earth and barley seeds (Jowar)',
        'Akhand Jyot brass diya with cow ghee',
        'Red chunri & shringar offerings',
        'Hawan samagri with dry fruits & camphor',
      ];
    } else if (combined.includes('diwali') || combined.includes('lakshmi')) {
      recommendedKitId = 'prod-11';
      checklistItems = [
        'Terracotta Diyas with pure mustard oil / ghee',
        'Silver Lakshmi-Ganesha coin or idols',
        'Lotus blossoms, Kheel, and Batasha',
        'Roli, Kumkum, Akshat, and Sandalwood paste',
      ];
    }
  }

  // Only assign priest if user asked for booking/officiant
  if (wantsPriest) {
    if (combined.includes('nikah') || combined.includes('islam')) {
      recommendedProviderId = 'prov-2';
    } else if (combined.includes('church') || combined.includes('christian') || combined.includes('pastor')) {
      recommendedProviderId = 'prov-3';
    } else if (combined.includes('sikh') || combined.includes('granthi')) {
      recommendedProviderId = 'prov-10';
    } else {
      recommendedProviderId = 'prov-1';
    }
  }

  // Only assign audio if user asked for music/chants
  if (wantsMusic) {
    if (combined.includes('ganesh')) recommendedTrackId = 'track-1';
    else if (combined.includes('shiva') || combined.includes('rudra')) recommendedTrackId = 'track-2';
    else if (combined.includes('durga') || combined.includes('navratri')) recommendedTrackId = 'track-4';
    else recommendedTrackId = 'track-1';
  }

  return {
    recommendedKitId,
    recommendedProviderId,
    recommendedTrackId,
    checklistItems,
    suggestedPromptFollowUps: undefined, // Do not force follow-up suggestions unless natural
  };
}

// -------------------------------------------------------------
// API: /api/niva-guide/status
// -------------------------------------------------------------
app.get('/api/niva-guide/status', (_req: Request, res: Response) => {
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim() !== '');
  const hasGemini = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '');

  res.json({
    hasOpenAI,
    hasGemini,
    defaultProvider: hasOpenAI ? 'openai' : hasGemini ? 'gemini' : 'curated',
    currentDate: '2026-09-26',
    availableFestivalsCount: COMPREHENSIVE_CALENDAR_EVENTS.length,
  });
});

// -------------------------------------------------------------
// API: /api/niva-guide/chat
// Supports OpenAI Responses API as primary, with Gemini fallback
// Grounded with live calendar events, user location & timezone
// -------------------------------------------------------------
app.post('/api/niva-guide/chat', async (req: Request, res: Response) => {
  try {
    const {
      message,
      conversationHistory = [],
      religion = 'Hinduism',
      provider = 'openai',
      clientDate,
      clientTimezone = 'UTC',
    } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      res.status(400).json({ error: 'Message text is required.' });
      return;
    }

    const trimmedMessage = cleanText(message);
    const intentInfo = classifyUserIntent(trimmedMessage);

    // Instant-Path for Direct Canonical Greetings & Specific Simple Requests:
    // Guarantees immediate (<5ms), 100% faithful answers matching the persona rules
    if (intentInfo.directAnswer) {
      res.json({
        success: true,
        text: intentInfo.directAnswer,
        provider: 'curated',
      });
      return;
    }

    const hasOpenAIKey = Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim() !== '');
    const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== '');

    // Extract calendar context ONLY if festival/tithi/calendar grounding is needed
    let calendarContextSnippet = '';
    if (intentInfo.wantsCalendarGrounding) {
      const calendarMatches = findRelevantCalendarEvents(trimmedMessage);
      if (calendarMatches.length > 0) {
        calendarContextSnippet = `\n[VERIFIED 2026 CALENDAR DATABASE INFO FOR THIS QUERY]:\n` +
          calendarMatches
            .map(
              (c) =>
                `- Event: ${c.title} (${c.religion})\n  Exact Date: ${c.date} (${c.monthName})\n  Auspicious Timings/Muhurat: ${c.auspiciousTimings || 'Standard Tithi'}\n  Scripture/Story: ${c.storyAndHistory || c.description}\n  Fasting: ${c.fastingAndDiet || 'Traditional sattvic diet'}`
            )
            .join('\n\n');
      }
    }

    // Only inject religious/temporal context prefix when NOT casual conversation
    const contextPrefix = intentInfo.isCasual
      ? ''
      : `[Current Context: Local System Date is Saturday, September 26, 2026. User Timezone: ${clientTimezone}. User Religion Focus: ${religion}. ISO: ${clientDate || '2026-09-26'}]${calendarContextSnippet}\n\n`;

    let aiResponseText = '';
    let providerUsed: 'openai' | 'gemini' | 'curated' = 'openai';
    let errorMessage: string | null = null;

    const tryOpenAI = provider === 'openai' || (provider === 'auto' && hasOpenAIKey);

    // 1. ATTEMPT OPENAI RESPONSES API
    if (tryOpenAI && hasOpenAIKey) {
      try {
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
          timeout: 9000, // 9 second graceful timeout
          maxRetries: 0,
        });

        const inputMessages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }> = [];

        if (Array.isArray(conversationHistory)) {
          const recentHistory = conversationHistory.slice(-8);
          for (const item of recentHistory) {
            if (item && item.text) {
              inputMessages.push({
                role: item.sender === 'user' ? 'user' : 'assistant',
                content: String(item.text),
              });
            }
          }
        }

        inputMessages.push({
          role: 'user',
          content: `${contextPrefix}${trimmedMessage}`,
        });

        const response = await openai.responses.create({
          model: 'gpt-4o-mini',
          input: inputMessages,
          instructions: NIVA_SYSTEM_INSTRUCTIONS,
        });

        if (response && response.output_text) {
          aiResponseText = response.output_text;
          providerUsed = 'openai';
        } else if (response && (response as any).output && Array.isArray((response as any).output)) {
          const textItems = (response as any).output
            .filter((item: any) => item.type === 'message' && item.content)
            .map((item: any) => {
              if (typeof item.content === 'string') return item.content;
              if (Array.isArray(item.content)) {
                return item.content.map((c: any) => c.text || '').join('');
              }
              return '';
            })
            .join('\n');
          if (textItems) {
            aiResponseText = textItems;
            providerUsed = 'openai';
          }
        }
      } catch (openAiError: any) {
        console.warn('OpenAI Responses API encountered:', openAiError?.message || openAiError);
        errorMessage = `OpenAI API: ${openAiError?.message || 'Connection issue'}`;
      }
    }

    // 2. ATTEMPT GEMINI FALLBACK (if OpenAI failed or if Gemini was explicitly requested)
    if (!aiResponseText && hasGeminiKey) {
      try {
        const ai = new GoogleGenAI();
        const geminiContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

        if (Array.isArray(conversationHistory)) {
          const recent = conversationHistory.slice(-8);
          for (const item of recent) {
            if (item && item.text) {
              geminiContents.push({
                role: item.sender === 'user' ? 'user' : 'model',
                parts: [{ text: String(item.text) }],
              });
            }
          }
        }

        geminiContents.push({
          role: 'user',
          parts: [{ text: `${contextPrefix}${trimmedMessage}` }],
        });

        const geminiRes = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: geminiContents,
          config: {
            systemInstruction: NIVA_SYSTEM_INSTRUCTIONS,
          },
        });

        if (geminiRes && geminiRes.text) {
          aiResponseText = geminiRes.text;
          providerUsed = 'gemini';
        }
      } catch (geminiError: any) {
        console.warn('Gemini fallback encountered:', geminiError?.message || geminiError);
      }
    }

    // 3. CURATED COMPREHENSIVE SPIRITUAL ENGINE (if remote APIs fail/offline)
    if (!aiResponseText) {
      providerUsed = 'curated';
      const recommendations = deduceCatalogRecommendations(trimmedMessage, '', intentInfo.isCasual);

      // Build an authoritative, respectful, fully structured response
      const lower = trimmedMessage.toLowerCase();

      // Check for casual queries in curated fallback
      if (intentInfo.isCasual) {
        aiResponseText = "Hey! What can I help you with?";
      } else if (lower.includes('element') && lower.includes('vata')) {
        aiResponseText = `The primary elements of **Vata** are **Space (*Akasha*)** and **Air (*Vayu*)**. Together, they govern all biological movement, nerve impulses, respiration, and circulation in the body.`;
      } else if (lower.includes('element') && lower.includes('pitta')) {
        aiResponseText = `The primary elements of **Pitta** are **Fire (*Tejas*)** and **Water (*Jala*)**. They govern biological transformation, digestion, metabolic heat, and intellectual discernment.`;
      } else if (lower.includes('element') && lower.includes('kapha')) {
        aiResponseText = `The primary elements of **Kapha** are **Water (*Jala*)** and **Earth (*Prithvi*)**. They govern bodily structure, joint lubrication, tissue cohesion, and immune vitality (*Ojas*).`;
      } else if (lower.includes('what is lagna') || lower.includes('what is ascendant')) {
        aiResponseText = `In Vedic astrology (Jyotish), **Lagna** (Ascendant) is the zodiac sign that was rising on the eastern horizon at the exact time and geographical coordinates of birth. It defines the 1st House of the birth chart, representing physical appearance, temperament, general health, and foundational vitality.`;
      } else if (lower.includes('what is nakshatra') || lower.includes('nakshatra meaning')) {
        aiResponseText = `A **Nakshatra** is a lunar mansion in Vedic astrology. The 360° zodiac is divided into 27 equal Nakshatras of 13°20' each (starting with Ashwini and ending with Revati). In Vedic tradition, the Nakshatra where the Moon is situated at birth is considered central to understanding mental nature, emotional tendencies, and life timing via the Vimshottari Dasha system.`;
      } else if (lower.includes('what is rashi') || lower.includes('moon sign meaning')) {
        aiResponseText = `In Vedic astrology, **Rashi** refers to a zodiac sign (one of the 12 divisions of 30°). Your **Chandra Rashi** (Moon sign) is the constellation the Moon occupied at birth, which Vedic tradition holds as reflective of your subconscious mind, emotional nature, and instinctive reactions.`;
      } else if (lower.includes('prakriti vs vikriti') || lower.includes('difference between prakriti and vikriti')) {
        aiResponseText = `In Ayurveda:
* **Prakriti** is your innate, inborn constitution established at conception, composed of your unique baseline ratio of Vata, Pitta, and Kapha. It remains constant throughout life.
* **Vikriti** is your current, temporary state of doshic imbalance caused by diet, stress, seasonal changes, or lifestyle.

The objective of Ayurvedic lifestyle and dinacharya is not to alter your Prakriti, but to gently guide your transient Vikriti back to your natural Prakriti.`;
      } else if (lower.includes('what is agni') || lower.includes('digestive fire')) {
        aiResponseText = `In Ayurveda, **Agni** is the biological fire governing digestion, absorption, and cellular transformation. Balanced digestive fire (*Sama Agni*) assimilates nutrients cleanly and produces vitality (*Ojas*), whereas impaired Agni produces metabolic residue (*Ama*), which traditional texts describe as the root of disease.`;
      } else if (lower.includes('namaste meaning') || lower.includes('what does namaste mean')) {
        aiResponseText = `**Namaste** is a Sanskrit greeting composed of *namah* (to bow or pay reverent homage) and *te* (to you). It traditionally translates to: *"I bow to the divine presence within you."* It expresses mutual respect and the spiritual recognition of a shared divine essence in all beings.`;
      } else if (lower.includes('what is karma') || lower.includes('karma yoga')) {
        aiResponseText = `In Indian philosophy, **Karma** (from the Sanskrit root *kṛ*, meaning 'to act') is the law of cause and effect: every intentional action creates impressions (*samskaras*) that shape future tendencies and experiences. **Karma Yoga**, as outlined in the *Bhagavad Gita* (2:47), is the practice of performing one's duties wholeheartedly with purity of intention, while releasing attachment to personal outcomes.`;
      } else if (lower.includes('36 gunas') || lower.includes('kundli matching') || lower.includes('ashtakoota')) {
        aiResponseText = `**Ashtakoota Milan** is a traditional Vedic astrology system for marriage compatibility that evaluates 8 astrological parameters based on the birth constellations (Nakshatras) of the prospective partners:
1. **Varna** (Spiritual compatibility – 1 pt)
2. **Vashya** (Mutual affinity – 2 pts)
3. **Tara** (Destiny & longevity – 3 pts)
4. **Yoni** (Biological & temperamental compatibility – 4 pts)
5. **Graha Maitri** (Mental friendship & outlook – 5 pts)
6. **Gana** (Behavioral temperament: Deva, Manushya, Rakshasa – 6 pts)
7. **Bhakoot** (Emotional happiness & family prosperity – 7 pts)
8. **Nadi** (Physiological harmony & genetic health – 8 pts)

The total score is 36 points. Traditionally, 18 or more points is considered acceptable, with special weight placed on Nadi and Bhakoot. In modern practice, compatibility is considered a cultural guideline rather than a deterministic verdict.`;
      } else if (lower.includes('satyanarayan')) {
        aiResponseText = `### **Shri Satyanarayan Maha Puja & Katha: Complete Guide**

#### 1. What It Is & Core Purpose
Shri Satyanarayan Puja is dedicated to Lord Vishnu in His embodiment as eternal truth (*Satya*). Devotees perform this sacred ceremony to cultivate truthfulness, celebrate family milestones (housewarmings, weddings, career blessings, recovery from hardship), and express deep gratitude (*Kritajnata*) to the Divine.

#### 2. Story, History & Religious Significance
* **[Scripture / Shastra]:** Chronicled in the **Reva Khanda** of the **Skanda Purana**.
* **Sacred Story:** Sage Narada approached Lord Vishnu, lamenting human suffering in Kali Yuga. Lord Vishnu revealed that performing the Satyanarayan Vrata—with pure devotion and without ostentation—swiftly dissolves sorrow, clears mental illusions, and brings righteousness (*Dharma*) and liberation (*Moksha*).

#### 3. When, Where & How to Perform
* **Auspicious Timing (Muhurat):** Most auspicious on **Purnima (Full Moon)**, **Ekadashi**, Thursdays, or Sankranti in the late afternoon/evening (Pradosh Kaal).
* **Location:** A clean home altar facing East or North, framed with fresh banana stems symbolizing life and abundance.
* **Preparation:** Bathe, wear unstitched clean traditional attire (dhoti/kurta or saree in yellow/white), and keep a tranquil mind.

#### 4. Required Items (Samagri Checklist)
* **Idol / Image:** Consecrated murti or photo of Lord Satyanarayan and Shaligram Shila.
* **Altar Elements:** Red or yellow silk cloth, 4 banana stalks, mango leaves, copper/brass Kalash, coconut, Janeu.
* **Offerings:** Akshat (unbroken rice), Roli/Kumkum, Sandalwood paste, Turmeric, Betel leaves (Paan), Supari, Cloves, Cardamom.
* **Prasad:** *Panchamrit* (Milk, Yogurt, Ghee, Honey, Sugar) and *Sapasad Bhog* (roasted wheat flour or semolina, pure cow ghee, sugar/jaggery, chopped banana, and fresh Tulsi leaves).

#### 5. Step-by-Step Procedure
1. **Shuddhi & Deepa Prajvalana:** Purify hands and altar with Gangajal. Light the pure ghee lamp (*Deepa*).
2. **Achamana & Pranayama:** Sip water 3 times with *Keshavaya Namah, Narayanaya Namah, Madhavaya Namah*.
3. **Sankalpa:** Hold water, flowers, supari, and rice; chant your Name, Gotra, Tithi, and prayer intention.
4. **Ganesha & Navagraha Puja:** Invoke Lord Ganesha to remove obstacles and the nine planetary deities for cosmic balance.
5. **Kalash Sthapana:** Place water, supari, coin, and mango leaves topped with a peeled coconut inside the kalash.
6. **Shodashopachara Puja:** Offer 16 traditional hospitalities to Lord Satyanarayan (Asana, Padya, Arghya, Snana with Panchamrit, Vastra, Janeu, Chandan, Pushpa, Dhoop, Deepa, Naivedya).
7. **Katha Recitation:** Read or listen with devoted attention to the 5 chapters of Satyanarayan Katha.
8. **Maha Aarti:** Circle the camphor flame singing *Jai Lakshmi Ramana* with bells and cymbals.
9. **Kshama Prarthana:** Apologize for any inadvertent shortcomings in ritual recitation.
10. **Prasad Distribution:** Share the sacred sheera and panchamrit with all family members and neighbors.

#### 6. Mantras & Prayers with Meaning
* **Invocation Mantra:**
  * **Sanskrit:** सत्यनारायणं देवं वन्देऽहं कामदं प्रभुम् । लीलया धृतभूभारं लोकसंरक्षणक्षमम् ॥
  * **Transliteration:** *Satyanārāyaṇaṁ dēvaṁ vandē’haṁ kāmadaṁ prabhum | Līlayā dhṛtabhūbhāraṁ lōkasaṁrakṣaṇakṣamam ||*
  * **Meaning:** "I bow to Lord Satyanarayan, the divine master who fulfills righteous desires, who effortlessly bears the weight of the universe and safeguards all cosmic realms."
* **Vishnu Gayatri Mantra:**
  * **Transliteration:** *Oṁ Nārāyaṇāya Vidmahē Vāsudēvāya Dhīmahi | Tanno Viṣṇuḥ Pracōdayāt ||*
  * **Meaning:** "May we realize the Supreme Divine Narayana; we meditate upon Lord Vasudeva. May that all-pervading Vishnu inspire our intellect."

#### 7. Traditional Beliefs & Spiritual Benefits
Tradition holds that conducting this puja brings peace of mind (*Shanti*), removes poverty of spirit, dispels negative karma, and restores domestic harmony.

#### 8. Possible Disadvantages, Risks & Precautions
* **Fire Safety:** Keep lit ghee lamps and camphor away from cotton drapery, silk clothing, and flammable decorations. Keep water nearby.
* **Allergy & Smoke Precautions:** Ensure windows are open when burning camphor and dhoop. Those with asthma or dust sensitivity should sit upwind.
* **Fasting Caution:** Fasting is meant to be joyful. Pregnant mothers, nursing women, diabetics, elderly, and those on vital medication should consume milk, fruits, and hydration freely and NEVER engage in rigid fasting.

#### 9. Scientific Evidence vs. Religious Beliefs
* **[Scientific & Psychological Evidence]:** Psychological research shows that structured communal ceremonies reduce cortisol, enhance interpersonal bonding, and stimulate mindfulness through auditory chanting and rhythmic repetition.
* **[Religious / Metaphysical Belief]:** Scriptural texts describe the direct mitigation of past-life karmas and divine celestial boons.
* **CRITICAL HEALTH BOUNDARY:** This ritual is a sacred spiritual and cultural practice. It is NEVER a substitute for medical diagnosis or clinical treatment.

#### 10. Regional & Sect-Specific Differences
* **North India:** Focuses heavily on the five narrative chapters read in Hindi or Sanskrit, accompanied by wheat flour panjiri.
* **South India (Satyanarayana Vratham):** Extensively performed in Andhra Pradesh, Telangana (Annavaram temple tradition), and Tamil Nadu with detailed Vedic Suktam chanting and banana/rava prasadam.
* **Bengal:** Known as *Satyanarayan/Satya Pirer Puja*, featuring unique syncretic folk heritage and uncooked rice flour paste (Shinni) offerings.`;
      } else if (lower.includes('navratri') || lower.includes('durga') || lower.includes('ashtami')) {
        aiResponseText = `### **Sharad Navratri 2026: Complete Ritual, Tithi & Fasting Guide**

#### 1. What It Is & Dates for 2026
* **Dates in 2026:** **October 11, 2026 (Ghatasthapana) to October 19, 2026 (Maha Navami)**.
* **Maha Ashtami / Durga Ashtami Date:** **Sunday, October 18, 2026**.
* **Vijayadashami (Dussehra):** **Tuesday, October 20, 2026**.
* **Auspicious Timings:**
  * Ghatasthapana Muhurat: 06:18 AM – 10:14 AM (October 11, 2026)
  * Durga Ashtami Puja: 06:14 AM – 09:30 AM (October 18, 2026)
  * Sandhi Puja Muhurat: 07:15 PM – 08:03 PM (Juncture of Ashtami and Navami)

#### 2. Story, History & Religious Significance
* **[Scripture / Shastra]:** Detailed in the **Devi Mahatmyam** (Durga Saptashati) from the **Markandeya Purana**.
* **Sacred Story:** The demon Mahishasura was blessed with invincibility against gods and men. The combined divine effulgence (*Tejas*) of the Trimurti and devas manifested the multi-armed Goddess Durga. Over nine fierce nights, the Goddess fought his legions, slaying Mahishasura on the tenth day (Vijayadashami).
* **Theological Significance:** Represents the triumph of consciousness over ego, lust, and delusion (*Asuric* vrittis).

#### 3. Preparation & Fasting Guidelines
* **Fasting (Vrat):**
  * Allowed: Water chestnut flour (*singhara*), buckwheat (*kuttu*), amaranth (*rajgira*), rock salt (*sendha namak*), seasonal fruits, milk, and curd.
  * Strictly Avoided: Grains, pulses, table salt, onions, garlic, alcohol, and non-vegetarian food.
* **Home Altar:** Sow barley (*Jowar*) in a clean earthen pot on Day 1. Maintain an uninterrupted brass ghee lamp (*Akhand Jyot*).

#### 4. Step-by-Step Puja & Kanya Pujan Procedure
1. **Ghatasthapana:** Consecrate water pot with mango leaves, coins, and raw rice.
2. **Daily Saptashati Recitation:** Chant the Argala, Kilaka, Kavacha, and chapters 1-13.
3. **Maha Ashtami Kanya Pujan:** Invite 9 young girls (representing the Navadurgas) and 1 young boy (representing Batuk Bhairav). Wash their feet, apply tilak, tie sacred mauli thread, and serve sanctified halwa, poori, and black chana.
4. **Hawan (Sacred Fire):** Conclude Ashtami with a hawan offering dry fruits, ghee, and samagri.

#### 5. Authentic Mantras with Pronunciation & Meaning
* **Navarna Mantra (Supreme Shakti Chants):**
  * **Sanskrit:** ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे ॥
  * **Transliteration:** *Oṁ Aiṁ Hrīṁ Klīṁ Cāmuṇḍāyai Viccē ||*
  * **Meaning:** "I bow to the Divine Mother who encompasses Mahasaraswati (creation / wisdom), Mahalakshmi (preservation / prosperity), and Mahakali (destruction of ignorance)."
* **Sarva Mangala Shloka:**
  * **Transliteration:** *Sarva Maṅgala Māṅgalyē Śivē Sarvārtha Sādhikē | Śaraṇyē Tryambakē Gaurī Nārāyaṇī Namō’stu Tē ||*
  * **Meaning:** "O Auspiciousness of all that is auspicious, O fulfiller of all righteous desires, O three-eyed Mother Gauri and Narayani, I offer my humble reverences to You."

#### 6. Possible Disadvantages, Risks & Precautions
* **Fire Safety:** Akhand Jyot must be protected with a glass chimney (*chimney diya*) and kept away from curtains or bedsheets.
* **Fasting Health Risks:** Strict waterless or zero-carbohydrate fasts are dangerous for diabetics (risk of hypoglycemia), pregnant or lactating women, elderly people, and those with renal conditions. Consume sufficient fluids, coconut water, and nuts.

#### 7. Scientific Perspective vs Religious Beliefs
* **[Scientific Evidence]:** Seasonal fasting aligned with equinox transitions allows metabolic rest, autophagy, and cellular rejuvenation through reduced processed sugars. Communal dance (Garba/Dandiya) serves as cardiovascular exercise and social bonding.
* **[Religious Belief]:** Invokes cosmic feminine energy (*Kundalini Shakti*) and purges accumulated karmas.
* **CRITICAL HEALTH BOUNDARY:** Fasting and rituals are devotional; they are never a treatment for physiological or psychiatric illnesses.

#### 8. Regional & Cultural Variations
* **West Bengal & East:** Celebrated as the grand **Durga Puja** with majestic clay pandals, *Dhunuchi Naach*, and *Sindoor Khela*.
* **Gujarat & West:** Nine nights of devotional **Garba** and **Dandiya Raas** around the consecrated clay lantern (*Garbha Deep*).
* **South India (Tamil Nadu/Karnataka):** Arranging **Golu** (stepped doll exhibitions) and celebrating Saraswati Puja on Navami.`;
      } else if (lower.includes('diwali') || lower.includes('lakshmi') || lower.includes('deepavali')) {
        aiResponseText = `### **Deepavali & Shri Maha Lakshmi Puja 2026: Complete Guide**

#### 1. What It Is & Dates for 2026
* **Diwali (Lakshmi Puja):** **Sunday, November 8, 2026**.
* **Dhanteras (Dhanatrayodashi):** **Friday, November 6, 2026**.
* **Govardhan Puja & Gujarati New Year:** **Monday, November 9, 2026**.
* **Bhai Dooj:** **Tuesday, November 10, 2026**.
* **Auspicious Timings (Muhurat for Nov 8, 2026):**
  * Pradosh Kaal Muhurat: 05:32 PM – 07:48 PM (Most auspicious for home altar)
  * Vrishabha Lagna: 06:05 PM – 08:02 PM
  * Nishita Kaal (Midnight Tantric & Shastra Puja): 11:38 PM – 12:31 AM

#### 2. Story, History & Religious Significance
* **[Scripture / Shastra]:** Celebrated across the **Ramayana**, **Padma Purana**, and **Skanda Purana**.
* **Sacred Stories:**
  1. **Lord Rama’s Return:** Welcoming Lord Rama, Mother Sita, and Lakshmana back to Ayodhya after 14 years of exile and the defeat of Ravana, with Ayodhya illuminated by countless oil lamps.
  2. **Samudra Manthan:** Goddess Lakshmi emerged from the churning of the cosmic milk ocean on Kartika Amavasya and chose Lord Vishnu as Her consort.

#### 3. Step-by-Step Lakshmi-Ganesha Puja Procedure
1. **Purification:** Clean the home thoroughly; draw a vibrant rice-powder or flower rangoli at the threshold.
2. **Altar Setup:** Spread red silk cloth; place idols of Lord Ganesha on the left and Goddess Lakshmi on the right.
3. **Kalash Sthapana:** Copper/brass kalash filled with Gangajal, betel nut, raw turmeric, coin, and mango leaves topped with coconut.
4. **Shodashopachara Offering:** Offer lotus blossoms, rose petals, kheer, batasha, unbroken akshat, and silver coins.
5. **Lighting the Diyas:** Light 5 primary ghee diyas first, then illuminate the perimeter of the home with terracotta mustard-oil diyas.
6. **Maha Aarti:** Recite *Om Jai Lakshmi Mata* and *Jai Ganesh Deva*.

#### 4. Authentic Mantras & Meaning
* **Maha Lakshmi Beeja Mantra:**
  * **Sanskrit:** ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद श्रीं ह्रीं श्रीं ॐ महालक्ष्म्यै नमः ॥
  * **Transliteration:** *Oṁ Śrīṁ Hrīṁ Śrīṁ Kamalē Kamalālayē Prasīda Prasīda Śrīṁ Hrīṁ Śrīṁ Oṁ Mahālakṣmyai Namaḥ ||*
  * **Meaning:** "O Supreme Goddess Lakshmi, who resides within the divine lotus, bestow Your grace, spiritual radiance, and limitless benevolence upon us."

#### 5. Safety Precautions & Disadvantages
* **Fire Safety:** Never leave terracotta diyas near synthetic curtains or footpaths. Ensure wicks do not flare uncontrollably.
* **Eco & Health Precaution:** Heavy chemical fireworks generate toxic particulate matter (PM2.5) harmful to children, the elderly, asthmatics, and household pets. Opt for green or light-based celebrations.

#### 6. Scientific Perspective vs Traditional Beliefs
* **[Scientific Observation]:** Thorough pre-Diwali home cleaning and ventilation eliminates seasonal allergens, mold, and dust mites after the monsoon. Mustard oil fumes contain mild insect-repellent properties.
* **[Traditional Belief]:** Lighting lamps dispels *Alakshmi* (poverty, discord) and invites *Lakshmi* (purity, prosperity).
* **CRITICAL HEALTH BOUNDARY:** Spiritual worship brings peace of mind; it is never a substitute for medical or financial counsel.`;
      } else if (lower.includes('gayatri')) {
        aiResponseText = `### **The Sacred Gayatri Mantra: Scripture, Pronunciation & Science**

#### 1. What It Is & Scriptural Origin
* **[Scripture / Shastra]:** First revealed in the **Rigveda (Mandala 3, Sukta 62, Verse 10)** by Brahmarshi Vishvamitra. Also honored in the *Yajurveda*, *Samaveda*, and praised in the *Bhagavad Gita* (10:35) where Lord Krishna declares: *"Of poetic meters, I am the Gayatri."*
* **Presiding Principle:** **Savitr**—the luminous cosmic principle that vivifies the sun and awakens the human intellect (*Dhi*).

#### 2. Authentic Sanskrit & Accurate Transliteration
* **Sanskrit:**
  ॐ भूर्भुवः स्वः ।
  तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि ।
  धियो यो नः प्रचोदयात् ॥
* **IAST Transliteration:**
  *Oṁ Bhūr Bhuvaḥ Svaḥ |*
  *Tat Savitur Varēṇyaṁ Bhargō Dēvasya Dhīmahi |*
  *Dhiyō Yō Naḥ Pracōdayāt ||*

#### 3. Word-by-Word Meaning
* **Oṁ:** The primordial sound of the Supreme Cosmic Reality.
* **Bhūr:** The physical plane of existence (Earth).
* **Bhuvaḥ:** The mental / vital astral plane.
* **Svaḥ:** The celestial spiritual realm.
* **Tat:** That ultimate Transcendent Source.
* **Savitur:** Of the Divine Sun / Cosmic Creator.
* **Varēṇyaṁ:** Most adorable, venerable, and supreme.
* **Bhargaḥ:** The radiant effulgence that purges spiritual darkness and impurities.
* **Dēvasya:** Of the Divine Lord.
* **Dhīmahi:** We meditate and absorb within ourselves.
* **Dhiyaḥ:** The intellect, wisdom, and cognitive faculties.
* **Yaḥ:** Who (that Divine Light).
* **Naḥ:** Our (collective).
* **Pracōdayāt:** May inspire, illuminate, and guide onward.

*Faithful English Translation:*
"We meditate upon the venerable effulgence of that Divine Creator, the Sun of cosmic illumination. May that sacred light illuminate and guide our intellect toward supreme truth."

#### 4. How & When to Chant (Sandhyavandanam)
* **Ideal Timing (Trisandhya):**
  1. *Pratah Sandhya:* Dawn before sunrise.
  2. *Madhyahna Sandhya:* Noon when the sun is at zenith.
  3. *Sayam Sandhya:* Sunset dusk.
* **Posture:** Sit in Padmasana or Sukhasana facing East in the morning and West in the evening.
* **Repetition:** Traditionally 27, 54, or 108 times using a consecrated Rudraksha, Tulsi, or Sandalwood Japa Mala.

#### 5. Scientific Evidence vs Traditional Beliefs
* **[Scientific & Neurological Observations]:**
  * Electroencephalogram (EEG) research reveals that rhythmic recitation of the Gayatri meter (24 syllables in 8-8-8 tripartite cadence) increases alpha brainwave activity, promoting relaxed alertness.
  * Slow rhythmic breathing during chanting activates the vagus nerve, reducing resting heart rate and blood pressure.
* **[Traditional Metaphysical Belief]:**
  * Stimulates the *Ajna* (brow) and *Sahasrara* (crown) chakras, dissolving karmic samskaras and awakening intuitive discernment (*Viveka*).
* **MEDICAL DISCLAIMER:** Chanting is a meditative, spiritual discipline; it is not clinical therapy or medical treatment for neurological conditions.

#### 6. Precautions & Etiquette
* Pronounce each syllable clearly without rushing.
* Maintain internal silence for a few moments after concluding the japa.`;
      } else if (lower.includes('diya') || lower.includes('science') || lower.includes('flame')) {
        aiResponseText = `### **Lighting a Pure Cow Ghee Diya: Scientific Evidence vs. Traditional Beliefs**

#### 1. What It Is & Spiritual Meaning
In Sanatana Dharma, lighting a lamp (*Deepa Prajvalana*) is the mandatory preliminary to any auspicious ceremony. The flame represents the dispelling of spiritual ignorance (*Tamas*) by the illumination of divine knowledge (*Jyoti*).

* **Traditional Shloka:**
  * दीपज्योतिः परब्रह्म दीपज्योतिर्जनार्दनः । दीपो हरतु मे पापं दीपज्योतिर्नमोऽस्तु ते ॥
  * *Meaning:* "The light of the lamp is the Supreme Absolute; the light of the lamp is Lord Janardana. May this light remove my moral transgressions; salutations to the sacred flame."

#### 2. Scientific Analysis & Empirical Observations
* **1. Particulate Emission Comparison:**
  * Pure A2 cow ghee burns significantly cleaner than petroleum-based paraffin candles. Paraffin releases alkanes, alkenes, and toluene (volatile organic compounds). High-grade cow ghee produces virtually zero toxic soot when fitted with a natural, unbleached cotton wick.
* **2. Photobiology & Visual Calming:**
  * Ghee lamp flames burn at a warm color temperature (approx. 1800K–2000K), emitting warm amber wavelengths free of blue light. This stimulates melatonin release and reduces ocular strain, fostering a calm, meditative state.
* **3. Aromatherapy & Atmosphere:**
  * High-grade cow ghee contains beneficial fatty acids that, when volatilized, release a delicate, soothing fragrance that promotes sensory grounding.

#### 3. Traditional Beliefs vs Scientific Reality
* **[Tradition / Metaphysics]:**
  * Believed to attract *Sattva Guna* (purity) and emit subtle positive spiritual vibrations (*chaitanya*) that repel negative unseen entities.
* **[Scientific Reality]:**
  * Ghee flames do NOT possess supernatural anti-radiation shields or cure airborne viruses as popular pseudo-science myths claim. They are simply an eco-friendly, soot-free, natural source of tranquil amber light and psychological focus.
* **MEDICAL CAUTION:** Lighting diyas or inhaling vapor is a peaceful cultural practice; it should never be treated as medical treatment for lung ailments or infections.

#### 4. Safety Precautions
* **Fire Safety:** Never leave a lit diya unattended on wooden surfaces or near curtains.
* **Ventilation:** Burn in a ventilated room to maintain oxygen levels.
* **Purity:** Use only pure natural cotton wicks and unadulterated ghee without synthetic waxes.`;
      } else if (
        lower.includes('ayurveda') ||
        lower.includes('dosha') ||
        lower.includes('vata') ||
        lower.includes('pitta') ||
        lower.includes('kapha') ||
        lower.includes('prakriti') ||
        lower.includes('vikriti') ||
        lower.includes('dinacharya')
      ) {
        aiResponseText = `### **Ayurveda & Tridosha (Vata, Pitta, Kapha): Comprehensive Guide**

#### 1. What Are Vata, Pitta & Kapha (Tridosha)?
In classical Ayurveda (rooted in the *Charaka Samhita*, *Sushruta Samhita*, and *Ashtanga Hridaya*), the universe and human physiology are composed of the five great elements (*Panchamahabhutas*). These elements combine into three functional biological forces called **Tridoshas**:
* **Vata (Space + Air):** The principle of kinetic movement, nerve transmission, respiration, circulation, and elimination.
* **Pitta (Fire + Water):** The principle of transformation, enzymatic digestion, metabolism, body heat, and intellect (*Buddhi*).
* **Kapha (Water + Earth):** The principle of structure, cellular cohesion, lubrication of joints, physical stamina, and immunity (*Ojas*).

#### 2. Prakriti (Constitution) vs. Vikriti (Imbalance)
* **Prakriti (प्रकृति):** Your unique, innate baseline established at conception. It does not change throughout life.
* **Vikriti (विकृति):** Your current transient state of imbalance, influenced by dietary lapses, chronic stress, seasonal shifts (*Ritu Sandhi*), and lack of sleep.
* **The Ayurvedic Goal:** Not to change your original Prakriti, but to gently return your transient Vikriti back to its balanced state.

#### 3. Traditional Qualities & Characteristics
* **Vata:** Dry, cold, light, rough, mobile. *Balanced:* Creative, vivacious, agile. *Imbalanced:* Anxiety, dry skin, insomnia, constipation, cold extremities.
* **Pitta:** Hot, sharp, light, oily, penetrating. *Balanced:* Sharp intellect, strong digestion, radiant energy. *Imbalanced:* Acid reflux, skin redness, anger, impatience.
* **Kapha:** Heavy, slow, cool, oily, smooth, stable. *Balanced:* Loving, patient, high endurance, sound sleep. *Imbalanced:* Lethargy, slow metabolism, congestion, stubbornness.

#### 4. Traditional Lifestyle & Daily Routine (Dinacharya)
1. **Brahma Muhurta (Wake before 6:00 AM):** Aligns internal biological rhythms with natural light cycles.
2. **Jihwa Nirlekhana (Tongue Scraping):** Clears overnight toxins (*Ama*) and awakens digestive enzyme signals.
3. **Abhyanga (Self-Massage):** Warm sesame oil for Vata, coconut/sunflower oil for Pitta, or dry-brushing (*Garshana*) for Kapha.
4. **Agni Balancing:** Consume the main, heaviest meal at solar noon (12:00 PM – 1:30 PM) when digestive fire is naturally at its zenith.

#### 5. Scientific Perspective vs. Traditional Ayurvedic Lore
* **[Scientific Observations]:** Peer-reviewed research (including Ayurgenomics studies by CSIR India) has shown correlations between classical Prakriti phenotypes and specific gene expressions, metabolic enzyme profiles, and lipid metabolism. Modern chronobiology (Nobel Prize 2017) validates that circadian biological clocks govern metabolic efficiency, mirroring Ayurveda's 4-hour doshic cycles.
* **[Traditional Philosophy]:** Ayurveda views health (*Swastha*) as the harmonious equilibrium of doshas, balanced digestive fire (*Sama Agni*), healthy tissues (*Dhatus*), and a joyful, tranquil soul (*Prasanna Atma-Indriya-Manah*).
* **CRITICAL HEALTH & SAFETY BOUNDARY:** Ayurveda lifestyle practices, yoga, and dietary mindfulness support general wellness. They are **never** a replacement for modern medical diagnosis, clinical pharmacology, emergency treatment, or oncology care. Always consult licensed medical doctors for any medical concerns.`;
      } else {
        // Direct, neutral, helpful response without forcing religion, rituals or assumptions
        aiResponseText = `I'm here to help with your question regarding "${trimmedMessage}". What specific details would you like to explore?`;
      }

      res.json({
        success: true,
        text: aiResponseText,
        provider: providerUsed,
        warning: errorMessage ? 'Notice: Served with NIVA Knowledge Base.' : undefined,
        ...recommendations,
      });
      return;
    }

    const recommendations = deduceCatalogRecommendations(trimmedMessage, aiResponseText, intentInfo.isCasual);

    res.json({
      success: true,
      text: aiResponseText,
      provider: providerUsed,
      warning: errorMessage && providerUsed !== 'openai' ? `Note: Handled gracefully via ${providerUsed} fallback.` : undefined,
      ...recommendations,
    });
  } catch (err: any) {
    console.error('Fatal /api/niva-guide/chat error:', err);
    res.status(200).json({
      success: true,
      text: "I had trouble processing that request just now. Please ask again.",
      provider: 'curated',
    });
  }
});

// -------------------------------------------------------------
// Vite Middleware in Dev & Static Hosting in Prod
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NIVA Religion & Spirituality Guide listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
