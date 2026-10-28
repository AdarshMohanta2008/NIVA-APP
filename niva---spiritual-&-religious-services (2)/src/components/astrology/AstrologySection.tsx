import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Scale,
  RotateCcw,
  ArrowRight,
  Sun,
  Moon,
  Info,
  Heart,
  Briefcase,
  GraduationCap,
  Users,
  ShieldAlert,
  ChevronRight,
  Eye,
  Award,
  Globe,
} from 'lucide-react';
import {
  calculateKundliProfile,
  calculateAshtakootaMilan,
  KundliProfile,
  PlanetPosition,
  RASHIS,
  NAKSHATRAS,
  CompatibilityResult,
} from '../../utils/astrologyCalc';

interface AstrologySectionProps {
  onAskInChat: (query: string) => void;
}

type AstroSubTab = 'chart' | 'nakshatra' | 'dasha' | 'lifethemes' | 'matching';

export const AstrologySection: React.FC<AstrologySectionProps> = ({ onAskInChat }) => {
  // Input form state
  const [name, setName] = useState('Devotee');
  const [birthDate, setBirthDate] = useState('1996-10-18');
  const [birthTime, setBirthTime] = useState('06:30');
  const [birthPlace, setBirthPlace] = useState('Varanasi, India');
  const [hasCalculated, setHasCalculated] = useState(true);

  // Active sub-navigation
  const [activeTab, setActiveTab] = useState<AstroSubTab>('chart');
  const [selectedHouse, setSelectedHouse] = useState<number>(1);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetPosition | null>(null);

  // Kundli profile calculation
  const [profile, setProfile] = useState<KundliProfile>(() =>
    calculateKundliProfile('Devotee', '1996-10-18', '06:30', 'Varanasi, India')
  );

  // Kundli Matching State
  const [partnerNakshatraId, setPartnerNakshatraId] = useState<number>(4); // Rohini
  const [partnerMoonRashiId, setPartnerMoonRashiId] = useState<number>(2); // Taurus
  const [partnerName, setPartnerName] = useState('Partner');
  const [matchResult, setMatchResult] = useState<CompatibilityResult | null>(() =>
    calculateAshtakootaMilan(profile.nakshatra.id, profile.planets.find(p => p.name === 'Moon')?.rashiId || 4, 4, 2)
  );

  const handleCalculateProfile = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const newProfile = calculateKundliProfile(name, birthDate, birthTime, birthPlace);
    setProfile(newProfile);
    setHasCalculated(true);
    setSelectedHouse(1);
    setSelectedPlanet(null);

    // Recalculate compatibility
    const moonPlanet = newProfile.planets.find((p) => p.name === 'Moon');
    const userMoonRashiId = moonPlanet ? moonPlanet.rashiId : 4;
    setMatchResult(
      calculateAshtakootaMilan(newProfile.nakshatra.id, userMoonRashiId, partnerNakshatraId, partnerMoonRashiId)
    );
  };

  const handleMatchCalculation = () => {
    const moonPlanet = profile.planets.find((p) => p.name === 'Moon');
    const userMoonRashiId = moonPlanet ? moonPlanet.rashiId : 4;
    const res = calculateAshtakootaMilan(
      profile.nakshatra.id,
      userMoonRashiId,
      partnerNakshatraId,
      partnerMoonRashiId
    );
    setMatchResult(res);
  };

  const loadPreset = (presetName: string, date: string, time: string, place: string) => {
    setName(presetName);
    setBirthDate(date);
    setBirthTime(time);
    setBirthPlace(place);
    const newProfile = calculateKundliProfile(presetName, date, time, place);
    setProfile(newProfile);
    setHasCalculated(true);
    setSelectedHouse(1);
    setSelectedPlanet(null);

    const moonPlanet = newProfile.planets.find((p) => p.name === 'Moon');
    const userMoonRashiId = moonPlanet ? moonPlanet.rashiId : 4;
    setMatchResult(
      calculateAshtakootaMilan(newProfile.nakshatra.id, userMoonRashiId, partnerNakshatraId, partnerMoonRashiId)
    );
  };

  // Selected house object
  const selectedHouseData = profile.houses.find((h) => h.houseNumber === selectedHouse) || profile.houses[0];
  const planetsInSelectedHouse = profile.planets.filter((p) => p.house === selectedHouse);

  // Traditional North Indian Diamond SVG coordinate mappings
  const HOUSE_POLYGONS: Record<number, { points: string; textX: number; textY: number }> = {
    1: { points: '200,0 300,100 200,200 100,100', textX: 200, textY: 100 },
    2: { points: '100,0 200,0 100,100', textX: 133, textY: 33 },
    3: { points: '0,0 100,0 0,100', textX: 33, textY: 33 },
    4: { points: '0,100 100,100 200,200 100,300 0,200', textX: 100, textY: 200 },
    5: { points: '0,300 100,400 0,400', textX: 33, textY: 367 },
    6: { points: '100,400 200,400 100,300', textX: 133, textY: 367 },
    7: { points: '200,200 300,300 200,400 100,300', textX: 200, textY: 300 },
    8: { points: '200,400 300,400 300,300', textX: 267, textY: 367 },
    9: { points: '300,400 400,400 400,300', textX: 367, textY: 367 },
    10: { points: '200,200 300,100 400,200 300,300', textX: 300, textY: 200 },
    11: { points: '400,100 400,0 300,0', textX: 367, textY: 33 },
    12: { points: '300,0 200,0 300,100', textX: 267, textY: 33 },
  };

  const getPlanetShort = (name: string): string => {
    switch (name) {
      case 'Sun': return 'Su';
      case 'Moon': return 'Mo';
      case 'Mars': return 'Ma';
      case 'Mercury': return 'Me';
      case 'Jupiter': return 'Ju';
      case 'Venus': return 'Ve';
      case 'Saturn': return 'Sa';
      case 'Rahu': return 'Ra';
      case 'Ketu': return 'Ke';
      default: return name.slice(0, 2);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto text-xs text-white p-2 sm:p-3 space-y-4">
      {/* Top Disclaimer Banner - visionOS Glass Notice */}
      <div className="glass-panel p-3.5 rounded-2xl border border-white/15 flex items-start gap-3 shrink-0 shadow-lg">
        <Scale className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-[11px] text-white/80 leading-relaxed font-normal">
          <strong className="text-amber-300 font-semibold">Traditional Vedic Knowledge Notice:</strong>{' '}
          Vedic astrology (*Jyotish*) is an ancient symbolic, cultural, and spiritual discipline rooted in the *Vedangas*. It is <strong>not</strong> an empirical science. Astrological interpretations represent traditional perspectives and symbolic reflections—never deterministic fate or guaranteed outcomes. It should never serve as a substitute for professional medical, legal, or financial counsel.
        </div>
      </div>

      {/* Birth Details Input Header Strip */}
      <div className="glass-panel p-4 rounded-3xl border border-white/15 shrink-0 space-y-3 shadow-xl">
        <form onSubmit={handleCalculateProfile} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="text-[11px] font-medium text-white/70 uppercase flex items-center gap-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full mt-1 bg-white/[0.06] border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 font-normal focus:outline-hidden focus:border-purple-400 focus:bg-white/[0.1] transition-all"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-white/70 uppercase flex items-center gap-1">
                Date of Birth
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full mt-1 bg-white/[0.06] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-normal focus:outline-hidden focus:border-purple-400 focus:bg-white/[0.1] transition-all"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-white/70 uppercase flex items-center gap-1">
                Exact Time of Birth
              </label>
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full mt-1 bg-white/[0.06] border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-normal focus:outline-hidden focus:border-purple-400 focus:bg-white/[0.1] transition-all"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-white/70 uppercase flex items-center gap-1">
                Birthplace
              </label>
              <input
                type="text"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                placeholder="City, Country"
                className="w-full mt-1 bg-white/[0.06] border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 font-normal focus:outline-hidden focus:border-purple-400 focus:bg-white/[0.1] transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 flex-wrap pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 text-[11px] text-white/60 overflow-x-auto no-scrollbar">
              <span className="font-medium text-white/75">Sample Profiles:</span>
              <button
                type="button"
                onClick={() => loadPreset('Spiritual Seeker', '1992-07-21', '05:45', 'Varanasi, India')}
                className="hover:text-amber-300 underline transition-colors cursor-pointer"
              >
                Varanasi (Cancer)
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => loadPreset('Visionary Leader', '1998-04-14', '08:15', 'New Delhi, India')}
                className="hover:text-amber-300 underline transition-colors cursor-pointer"
              >
                Delhi (Aries)
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => loadPreset('Creative Thinker', '2001-11-28', '14:20', 'New York, USA')}
                className="hover:text-amber-300 underline transition-colors cursor-pointer"
              >
                New York (Aquarius)
              </button>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white rounded-xl font-bold text-xs shadow-md border border-white/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Recalculate Kundli</span>
            </button>
          </div>
        </form>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="px-2 py-1 overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
        <button
          onClick={() => setActiveTab('chart')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'chart'
              ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-white/30'
              : 'bg-white/[0.08] text-white/70 hover:bg-white/[0.15] hover:text-white border border-white/10'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Lagna Kundli Chart</span>
        </button>

        <button
          onClick={() => setActiveTab('nakshatra')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'nakshatra'
              ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-white/30'
              : 'bg-white/[0.08] text-white/70 hover:bg-white/[0.15] hover:text-white border border-white/10'
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
          <span>Birth Nakshatra</span>
        </button>

        <button
          onClick={() => setActiveTab('dasha')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'dasha'
              ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-white/30'
              : 'bg-white/[0.08] text-white/70 hover:bg-white/[0.15] hover:text-white border border-white/10'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Vimshottari Dasha</span>
        </button>

        <button
          onClick={() => setActiveTab('lifethemes')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'lifethemes'
              ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-white/30'
              : 'bg-white/[0.08] text-white/70 hover:bg-white/[0.15] hover:text-white border border-white/10'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Dharma & Life Themes</span>
        </button>

        <button
          onClick={() => setActiveTab('matching')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'matching'
              ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-white/30'
              : 'bg-white/[0.08] text-white/70 hover:bg-white/[0.15] hover:text-white border border-white/10'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Kundli Milan (Matching)</span>
        </button>
      </div>

      {/* Main Tab Content Display */}
      <div className="space-y-4">
        {/* ============================================================== */}
        {/* 1. LAGNA KUNDLI INTERACTIVE CHART */}
        {/* ============================================================== */}
        {activeTab === 'chart' && (
          <div className="space-y-4">
            {/* Quick Key Signifiers Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="glass-card p-3 rounded-2xl border border-white/15 shadow-md">
                <span className="text-[10px] font-bold text-white/50 uppercase">Lagna (Rising Sign)</span>
                <div className="font-extrabold text-white text-xs mt-0.5 truncate">
                  {profile.lagnaSign} ({profile.lagnaDegree}°)
                </div>
                <div className="text-[10px] text-amber-300">Lord: {RASHIS.find((r) => r.name === profile.lagnaSign)?.ruler || 'Kendra'}</div>
              </div>

              <div className="glass-card p-3 rounded-2xl border border-white/15 shadow-md">
                <span className="text-[10px] font-bold text-white/50 uppercase">Moon Sign (Chandra)</span>
                <div className="font-extrabold text-white text-xs mt-0.5 truncate">
                  {profile.moonSign}
                </div>
                <div className="text-[10px] text-sky-300">{profile.nakshatra.name} Star</div>
              </div>

              <div className="glass-card p-3 rounded-2xl border border-white/15 shadow-md">
                <span className="text-[10px] font-bold text-white/50 uppercase">Sun Sign (Surya)</span>
                <div className="font-extrabold text-white text-xs mt-0.5 truncate">
                  {profile.sunSign}
                </div>
                <div className="text-[10px] text-amber-300">Soul Purpose (Atman)</div>
              </div>

              <div className="glass-card p-3 rounded-2xl border border-white/15 shadow-md">
                <span className="text-[10px] font-bold text-white/50 uppercase">Janma Nakshatra</span>
                <div className="font-extrabold text-white text-xs mt-0.5 truncate">
                  {profile.nakshatra.name} (Pada {profile.pada})
                </div>
                <div className="text-[10px] text-purple-300">{profile.nakshatra.deity}</div>
              </div>
            </div>

            {/* Visual Chart + House Detail Split View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* North Indian Diamond Kundli Chart */}
              <div className="lg:col-span-7 glass-panel p-4 rounded-3xl border border-white/20 shadow-2xl flex flex-col items-center">
                <div className="flex items-center justify-between w-full mb-3">
                  <div className="flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <span className="font-extrabold text-xs text-white">
                      Lagna Kundli (North Indian Chakra)
                    </span>
                  </div>
                  <span className="text-[10px] text-white/50 font-medium">Tap any house to inspect</span>
                </div>

                <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center my-2">
                  {/* Celestial Orbiting Zodiac Rings */}
                  <div className="absolute -inset-4 sm:-inset-6 pointer-events-none flex items-center justify-center overflow-visible">
                    <div className="w-full h-full rounded-full border border-dashed border-amber-400/25 animate-[spin_60s_linear_infinite]" />
                    <div className="absolute w-[114%] h-[114%] rounded-full border border-dotted border-purple-400/20 animate-[spin_90s_linear_infinite_reverse]" />
                    {/* Orbiting celestial planet nodes */}
                    <div className="absolute w-full h-full animate-[spin_45s_linear_infinite]">
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-300 shadow-[0_0_6px_#A855F7]" />
                    </div>
                  </div>

                  <svg
                    viewBox="0 0 400 400"
                    className="w-full h-full drop-shadow-md select-none relative z-10"
                  >
                    {/* Background boundary */}
                    <rect x="0" y="0" width="400" height="400" fill="rgba(18, 10, 36, 0.6)" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="2" />

                    {/* Outer diagonal X lines */}
                    <line x1="0" y1="0" x2="400" y2="400" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" />
                    <line x1="400" y1="0" x2="0" y2="400" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" />

                    {/* Inner Diamond connecting midpoints */}
                    <polygon points="200,0 400,200 200,400 0,200" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" />

                    {/* Render Interactive Clickable House Polygons */}
                    {Object.entries(HOUSE_POLYGONS).map(([hNumStr, poly]) => {
                      const hNum = parseInt(hNumStr, 10);
                      const isSelected = selectedHouse === hNum;
                      const houseData = profile.houses.find((h) => h.houseNumber === hNum);
                      const rashiId = houseData?.rashiId || 1;
                      const planetsInThisHouse = profile.planets.filter((p) => p.house === hNum);

                      return (
                        <g
                          key={hNum}
                          onClick={() => setSelectedHouse(hNum)}
                          className="cursor-pointer transition-all group"
                        >
                          <polygon
                            points={poly.points}
                            className={`transition-colors ${
                              isSelected
                                ? 'fill-amber-500/30 stroke-amber-400'
                                : 'fill-transparent hover:fill-white/10 stroke-white/10'
                            }`}
                          />

                          {/* House Identifier & Rashi Sign Number */}
                          <text
                            x={poly.textX}
                            y={poly.textY - 8}
                            textAnchor="middle"
                            className="text-[10px] font-black fill-white/50 group-hover:fill-amber-300 pointer-events-none"
                          >
                            H{hNum} ({rashiId})
                          </text>

                          {/* Occupying Planets */}
                          {planetsInThisHouse.length > 0 ? (
                            <text
                              x={poly.textX}
                              y={poly.textY + 10}
                              textAnchor="middle"
                              className="text-[11px] font-black fill-amber-300 pointer-events-none tracking-tight"
                            >
                              {planetsInThisHouse.map((p) => getPlanetShort(p.name)).join(' ')}
                            </text>
                          ) : (
                            <text
                              x={poly.textX}
                              y={poly.textY + 8}
                              textAnchor="middle"
                              className="text-[9px] fill-white/20 pointer-events-none"
                            >
                              —
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>

                <div className="flex items-center justify-center gap-3 text-[10px] text-white/60 mt-3 flex-wrap">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
                    <span>Selected House: <strong>House {selectedHouse}</strong></span>
                  </span>
                  <span>Number in parentheses = Zodiac Sign (*Rashi*)</span>
                </div>
              </div>

              {/* Inspected House & Planet Details Panel */}
              <div className="lg:col-span-5 space-y-3">
                <div className="glass-card p-4 rounded-3xl border border-white/15 shadow-xl space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                        House {selectedHouseData.houseNumber}
                      </span>
                      <h4 className="font-extrabold text-white text-sm mt-1">
                        {selectedHouseData.sanskritName}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-white/50 font-bold">Rashi in House</span>
                      <div className="font-extrabold text-amber-300 text-xs">
                        {selectedHouseData.rashiName}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-[11px]">
                    <div className="text-white/70">
                      <strong>Sign Karaka:</strong> {selectedHouseData.karaka}
                    </div>
                    <div className="text-white/80">
                      <strong>Life Areas:</strong> {selectedHouseData.lifeAreas.join(', ')}
                    </div>
                  </div>

                  {/* Planets residing in this house */}
                  <div className="pt-2 border-t border-white/10 space-y-2">
                    <span className="text-[10px] font-bold text-white/50 uppercase block">
                      Occupying Grahas ({planetsInSelectedHouse.length})
                    </span>

                    {planetsInSelectedHouse.length === 0 ? (
                      <div className="text-white/40 italic text-[11px] p-2 bg-white/[0.04] rounded-xl border border-white/10">
                        No planets currently positioned in this house. The house is governed directly by {selectedHouseData.karaka}.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {planetsInSelectedHouse.map((p) => (
                          <div
                            key={p.name}
                            className="p-2.5 bg-white/[0.05] rounded-xl border border-white/10 space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white text-xs flex items-center gap-1">
                                {p.name} ({p.sanskritName.split(' ')[0]})
                                {p.isRetrograde && (
                                  <span className="text-[9px] bg-purple-500/30 text-purple-200 border border-purple-400/40 px-1 py-0.2 rounded font-bold">
                                    Vakri (R)
                                  </span>
                                )}
                              </span>
                              <span className="text-[10px] font-mono text-amber-300">{p.degree}°</span>
                            </div>
                            <div className="text-[10px] text-white/60">
                              Dignity: <strong className="text-white/90">{p.dignity}</strong> • Sign: {p.rashiName}
                            </div>
                            <p className="text-[10px] text-white/75 leading-relaxed">
                              {p.significance}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Planetary Positions Table */}
            <div className="glass-card rounded-2xl border border-white/15 p-4 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-white text-xs flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Navagraha (9 Planetary Positions & Degrees)</span>
                </h4>
                <span className="text-[10px] text-white/50">Nirayana Sidereal Zodiac</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/15 bg-white/[0.06] text-white/80">
                      <th className="p-2 font-bold">Planet (Graha)</th>
                      <th className="p-2 font-bold">Sign (Rashi)</th>
                      <th className="p-2 font-bold">Degree</th>
                      <th className="p-2 font-bold">House (Bhava)</th>
                      <th className="p-2 font-bold">Dignity</th>
                      <th className="p-2 font-bold">Significance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-white/80">
                    {profile.planets.map((p) => (
                      <tr key={p.name} className="hover:bg-white/[0.06] transition-colors">
                        <td className="p-2 font-bold text-white flex items-center gap-1">
                          <span>{p.name}</span>
                          <span className="text-[10px] text-white/50">({p.sanskritName.split(' ')[0]})</span>
                          {p.isRetrograde && <span className="text-[9px] text-purple-300 font-black">(R)</span>}
                        </td>
                        <td className="p-2">{p.rashiName}</td>
                        <td className="p-2 font-mono text-[10px] text-amber-300">{p.degree}°</td>
                        <td className="p-2 font-bold text-amber-300">House {p.house}</td>
                        <td className="p-2">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                            p.dignity === 'Exalted' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' :
                            p.dignity === 'Debilitated' ? 'bg-rose-500/20 text-rose-300 border-rose-400/30' :
                            p.dignity === 'Own Sign' ? 'bg-sky-500/20 text-sky-300 border-sky-400/30' :
                            'bg-white/10 text-white/70 border-white/15'
                          }`}>
                            {p.dignity}
                          </span>
                        </td>
                        <td className="p-2 text-[10px] text-white/60 max-w-xs truncate">{p.significance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 2. JANMA NAKSHATRA & COSMIC IDENTITY */}
        {/* ============================================================== */}
        {activeTab === 'nakshatra' && (
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="glass-panel p-5 rounded-3xl border border-white/20 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-sky-300 bg-sky-500/20 px-2.5 py-0.5 rounded-full border border-sky-400/30">
                    Your Birth Star (Janma Nakshatra)
                  </span>
                  <h3 className="text-lg font-black text-white mt-1">
                    {profile.nakshatra.name} ({profile.nakshatra.sanskritName})
                  </h3>
                  <p className="text-[11px] text-white/60">
                    Pada {profile.pada} • Ruled by <strong className="text-white">{profile.nakshatra.ruler}</strong>
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 shrink-0 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                  <Moon className="w-6 h-6" />
                </div>
              </div>

              {/* Nakshatra Pillars Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="bg-white/[0.04] p-2.5 rounded-xl border border-white/10">
                  <span className="text-[9px] font-bold text-white/40 uppercase">Presiding Deity</span>
                  <div className="font-bold text-white mt-0.5 truncate">{profile.nakshatra.deity}</div>
                </div>

                <div className="bg-white/[0.04] p-2.5 rounded-xl border border-white/10">
                  <span className="text-[9px] font-bold text-white/40 uppercase">Sacred Symbol</span>
                  <div className="font-bold text-white mt-0.5 truncate">{profile.nakshatra.symbol}</div>
                </div>

                <div className="bg-white/[0.04] p-2.5 rounded-xl border border-white/10">
                  <span className="text-[9px] font-bold text-white/40 uppercase">Gana (Temperament)</span>
                  <div className="font-bold text-white mt-0.5">{profile.nakshatra.gana}</div>
                </div>

                <div className="bg-white/[0.04] p-2.5 rounded-xl border border-white/10">
                  <span className="text-[9px] font-bold text-white/40 uppercase">Nadi & Yoni</span>
                  <div className="font-bold text-white mt-0.5">{profile.nakshatra.nadi} • {profile.nakshatra.yoni}</div>
                </div>
              </div>

              {/* Psychological & Spiritual Traits */}
              <div className="space-y-2">
                <span className="text-[11px] font-extrabold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Traditional Character & Mental Archetype</span>
                </span>
                <p className="text-[11px] text-white/80 leading-relaxed bg-white/[0.04] p-3 rounded-2xl border border-white/10">
                  {profile.nakshatra.traits}. In Vedic symbology, souls born under {profile.nakshatra.name} express natural affinity for the divine qualities of {profile.nakshatra.deity}. The {profile.pada}th Pada imbues the native with specific focus on spiritual ethics and inner resilience.
                </p>
              </div>

              {/* Lunar & Solar Signs Exploration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-sky-500/10 p-3.5 rounded-2xl border border-sky-400/25 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-sky-200 text-xs">
                    <Moon className="w-3.5 h-3.5 text-sky-400" />
                    <span>Chandra Rashi (Moon Sign): {profile.moonSign}</span>
                  </div>
                  <p className="text-[10px] text-white/65 leading-relaxed">
                    Governs the internal emotional landscape, intuitive memory, instincts, and relationship with maternal warmth.
                  </p>
                </div>

                <div className="bg-amber-500/10 p-3.5 rounded-2xl border border-amber-400/25 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-200 text-xs">
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Surya Rashi (Sun Sign): {profile.sunSign}</span>
                  </div>
                  <p className="text-[10px] text-white/65 leading-relaxed">
                    Governs the conscious soul purpose (*Atman*), social authority, vitality, father figure, and outward purpose.
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  onAskInChat(
                    `My Janma Nakshatra is ${profile.nakshatra.name} (Pada ${profile.pada}, deity: ${profile.nakshatra.deity}, ruler: ${profile.nakshatra.ruler}). What are the classical spiritual practices, deity mantras, and traditional remedies for this Nakshatra?`
                  )
                }
                className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg border border-white/20 cursor-pointer"
              >
                <span>Discuss {profile.nakshatra.name} with NIVA Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 3. VIMSHOTTARI DASHA & SHANI (SADE SATI) */}
        {/* ============================================================== */}
        {activeTab === 'dasha' && (
          <div className="space-y-4 max-w-2xl mx-auto">
            {/* Current Active Dasha Banner */}
            <div className="glass-panel text-white p-4 sm:p-5 rounded-3xl shadow-xl space-y-2 border border-purple-400/30 bg-gradient-to-br from-purple-900/40 via-purple-950/30 to-[#07030F]">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-300 bg-white/10 px-2.5 py-0.5 rounded-full border border-purple-400/30">
                Vimshottari Dasha (120-Year Planetary Cycles)
              </span>
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="text-lg font-black text-amber-300">
                  {profile.currentMahadasha} Mahadasha
                </h3>
                <span className="text-xs text-purple-200 font-semibold">
                  / {profile.currentAntardasha} Antardasha
                </span>
              </div>
              <p className="text-[11px] text-white/80 leading-relaxed">
                In Parashari Jyotish, Vimshottari Dasha maps how planetary karmas unfold over 120 years. Your life is currently operating under the primary influence of <strong>{profile.currentMahadasha}</strong>.
              </p>
            </div>

            {/* Dasha Timeline List */}
            <div className="glass-card p-4 rounded-3xl border border-white/15 space-y-2.5 shadow-xl">
              <span className="text-[11px] font-extrabold text-white flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>Planetary Dasha Sequence</span>
              </span>

              <div className="space-y-2">
                {profile.dashaPeriods.map((dp) => (
                  <div
                    key={dp.planet}
                    className={`p-3 rounded-xl border transition-all flex items-start justify-between gap-2 ${
                      dp.isCurrent
                        ? 'bg-purple-500/20 border-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                        : 'bg-white/[0.04] border-white/10 text-white/70'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-xs text-white">{dp.planet} Mahadasha</span>
                        {dp.isCurrent && (
                          <span className="text-[9px] bg-gradient-to-r from-purple-600 to-amber-500 text-white px-2 py-0.2 rounded-full font-black uppercase shadow-xs">
                            Currently Active
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-white/50 mt-0.5">{dp.theme}</p>
                    </div>

                    <div className="text-right text-[10px] font-bold text-amber-300 shrink-0">
                      {dp.startYear} – {dp.endYear}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shani Sade Sati Status Card */}
            <div className="glass-card p-4 rounded-3xl border border-white/15 space-y-3 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <h4 className="font-extrabold text-xs text-white">
                    Shani Sade Sati Analysis (Saturn in Pisces Transit)
                  </h4>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                  profile.sadeSatiStatus.inSadeSati
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                }`}>
                  {profile.sadeSatiStatus.inSadeSati ? 'Active Phase' : 'Inactive'}
                </span>
              </div>

              <div className="text-[11px] text-white/80 space-y-1">
                <div><strong>Current Phase:</strong> {profile.sadeSatiStatus.phase}</div>
                <p className="text-[10px] text-white/60 leading-relaxed">
                  {profile.sadeSatiStatus.description}
                </p>
              </div>

              {/* Traditional Remedies */}
              <div className="bg-white/[0.04] p-3 rounded-2xl border border-white/10 space-y-1.5">
                <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider">
                  Traditional Spiritual Harmonizing Practices
                </span>
                <ul className="space-y-1 text-[10px] text-white/70">
                  {profile.sadeSatiStatus.traditionalRemedies.map((rem, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{rem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() =>
                  onAskInChat(
                    `In my Kundli, my active Mahadasha is ${profile.currentMahadasha} and my Moon sign is ${profile.moonSign}. Can you provide traditional spiritual guidance and stotrams to practice during this period?`
                  )
                }
                className="w-full py-2 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white rounded-xl font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-md border border-white/20 cursor-pointer"
              >
                <span>Consult NIVA Guide on Dasha & Saturn Rites</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 4. LIFE THEMES & DHARMA */}
        {/* ============================================================== */}
        {activeTab === 'lifethemes' && (
          <div className="space-y-3.5 max-w-2xl mx-auto">
            <div className="glass-card p-4 rounded-3xl border border-white/15 shadow-xl space-y-1">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span>Life Pillars & Classical Vedic Themes</span>
              </h3>
              <p className="text-[11px] text-white/60">
                Synthesis of Lagna, 10th House (Karma), 5th House (Vidya), and 7th House (Partnerships).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              <div className="glass-card p-3.5 rounded-2xl border border-white/15 shadow-md space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>Personality & Vitality (Lagna)</span>
                </div>
                <p className="text-[10px] text-white/60 leading-relaxed">
                  {profile.lifeThemes.personality}
                </p>
              </div>

              <div className="glass-card p-3.5 rounded-2xl border border-white/15 shadow-md space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Career & Vocation (10th House)</span>
                </div>
                <p className="text-[10px] text-white/60 leading-relaxed">
                  {profile.lifeThemes.careerAndDharma}
                </p>
              </div>

              <div className="glass-card p-3.5 rounded-2xl border border-white/15 shadow-md space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
                  <span>Intellect & Higher Wisdom (5th/9th House)</span>
                </div>
                <p className="text-[10px] text-white/60 leading-relaxed">
                  {profile.lifeThemes.educationAndKnowledge}
                </p>
              </div>

              <div className="glass-card p-3.5 rounded-2xl border border-white/15 shadow-md space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <Users className="w-3.5 h-3.5 text-rose-400" />
                  <span>Relationships & Companionship (7th House)</span>
                </div>
                <p className="text-[10px] text-white/60 leading-relaxed">
                  {profile.lifeThemes.relationshipsAndMarriage}
                </p>
              </div>
            </div>

            <div className="glass-card p-3.5 rounded-2xl border border-amber-400/25 bg-amber-500/10 space-y-1.5">
              <span className="font-bold text-amber-200 text-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Spiritual Growth & Karmic Direction</span>
              </span>
              <p className="text-[10px] text-white/80 leading-relaxed">
                {profile.lifeThemes.spiritualGrowth}
              </p>
            </div>

            <button
              onClick={() =>
                onAskInChat(
                  `Based on my Vedic Kundli with ${profile.lagnaSign} and Moon in ${profile.moonSign}, what are the most auspicious spiritual disciplines, fasting days, and charities recommended in traditional Shastras?`
                )
              }
              className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg border border-white/20 cursor-pointer"
            >
              <span>Explore My Life Themes in NIVA Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* 5. ASHTAKOOTA 36-GUNA MATCHING (KUNDLI COMPATIBILITY) */}
        {/* ============================================================== */}
        {activeTab === 'matching' && (
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="glass-panel p-4 rounded-3xl border border-white/20 shadow-2xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-400" />
                  <h3 className="font-extrabold text-sm text-white">
                    Ashtakoota 36-Point Compatibility (Guna Milan)
                  </h3>
                </div>
                <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-400/30 px-2 py-0.5 rounded-full font-bold">
                  Traditional Marriage Matching
                </span>
              </div>

              {/* Partner Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                <div className="glass-card p-3 rounded-xl border border-white/15">
                  <span className="text-[10px] font-bold text-white/50 uppercase block mb-1">
                    Your Birth Moon & Nakshatra
                  </span>
                  <div className="font-extrabold text-white">{profile.name}</div>
                  <div className="text-[10px] text-white/60 mt-0.5">
                    {profile.moonSign} • {profile.nakshatra.name} ({profile.nakshatra.gana} Gana)
                  </div>
                </div>

                <div className="glass-card p-3 rounded-xl border border-white/15 space-y-1.5">
                  <span className="text-[10px] font-bold text-white/50 uppercase block">
                    Partner's Moon & Nakshatra
                  </span>

                  <div className="grid grid-cols-2 gap-1.5">
                    <select
                      value={partnerMoonRashiId}
                      onChange={(e) => setPartnerMoonRashiId(parseInt(e.target.value, 10))}
                      className="bg-[#1A1230] border border-white/20 rounded-xl p-1.5 text-[10px] text-white font-medium outline-none focus:border-amber-400"
                    >
                      {RASHIS.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>

                    <select
                      value={partnerNakshatraId}
                      onChange={(e) => setPartnerNakshatraId(parseInt(e.target.value, 10))}
                      className="bg-[#1A1230] border border-white/20 rounded-xl p-1.5 text-[10px] text-white font-medium outline-none focus:border-amber-400"
                    >
                      {NAKSHATRAS.map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={handleMatchCalculation}
                    className="w-full py-1.5 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white rounded-lg text-[10px] font-bold transition-all shadow-md border border-white/20 cursor-pointer"
                  >
                    Recalculate Guna Score
                  </button>
                </div>
              </div>

              {/* Match Result Display */}
              {matchResult && (
                <div className="glass-card p-4 rounded-2xl border border-rose-400/30 bg-rose-500/10 space-y-3 mt-2">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div>
                      <span className="text-[10px] font-bold text-white/50 uppercase">
                        Total Compatibility Score
                      </span>
                      <div className="text-xl font-black text-rose-300">
                        {matchResult.totalScore} / 36 Gunas
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-black border ${
                      matchResult.verdict === 'Excellent' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' :
                      matchResult.verdict === 'Good' ? 'bg-sky-500/20 text-sky-300 border-sky-400/30' :
                      matchResult.verdict === 'Moderate' ? 'bg-amber-500/20 text-amber-300 border-amber-400/30' :
                      'bg-rose-500/20 text-rose-300 border-rose-400/30'
                    }`}>
                      {matchResult.verdict} Accord
                    </span>
                  </div>

                  <p className="text-[10px] text-white/80 leading-relaxed font-medium">
                    {matchResult.traditionalSummary}
                  </p>

                  {/* 8 Koota Breakdown Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px]">
                    <div className="bg-white/[0.04] p-2 rounded-lg border border-white/10">
                      <div className="flex justify-between font-bold text-white">
                        <span>Varna</span>
                        <span className="text-amber-300">{matchResult.varna.score}/{matchResult.varna.max}</span>
                      </div>
                      <div className="text-[9px] text-white/50 mt-0.5 truncate">{matchResult.varna.desc}</div>
                    </div>

                    <div className="bg-white/[0.04] p-2 rounded-lg border border-white/10">
                      <div className="flex justify-between font-bold text-white">
                        <span>Vashya</span>
                        <span className="text-amber-300">{matchResult.vashya.score}/{matchResult.vashya.max}</span>
                      </div>
                      <div className="text-[9px] text-white/50 mt-0.5 truncate">{matchResult.vashya.desc}</div>
                    </div>

                    <div className="bg-white/[0.04] p-2 rounded-lg border border-white/10">
                      <div className="flex justify-between font-bold text-white">
                        <span>Tara</span>
                        <span className="text-amber-300">{matchResult.tara.score}/{matchResult.tara.max}</span>
                      </div>
                      <div className="text-[9px] text-white/50 mt-0.5 truncate">{matchResult.tara.desc}</div>
                    </div>

                    <div className="bg-white/[0.04] p-2 rounded-lg border border-white/10">
                      <div className="flex justify-between font-bold text-white">
                        <span>Yoni</span>
                        <span className="text-amber-300">{matchResult.yoni.score}/{matchResult.yoni.max}</span>
                      </div>
                      <div className="text-[9px] text-white/50 mt-0.5 truncate">{matchResult.yoni.desc}</div>
                    </div>

                    <div className="bg-white/[0.04] p-2 rounded-lg border border-white/10">
                      <div className="flex justify-between font-bold text-white">
                        <span>Maitri</span>
                        <span className="text-amber-300">{matchResult.grahaMaitri.score}/{matchResult.grahaMaitri.max}</span>
                      </div>
                      <div className="text-[9px] text-white/50 mt-0.5 truncate">{matchResult.grahaMaitri.desc}</div>
                    </div>

                    <div className="bg-white/[0.04] p-2 rounded-lg border border-white/10">
                      <div className="flex justify-between font-bold text-white">
                        <span>Gana</span>
                        <span className="text-amber-300">{matchResult.gana.score}/{matchResult.gana.max}</span>
                      </div>
                      <div className="text-[9px] text-white/50 mt-0.5 truncate">{matchResult.gana.desc}</div>
                    </div>

                    <div className="bg-white/[0.04] p-2 rounded-lg border border-white/10">
                      <div className="flex justify-between font-bold text-white">
                        <span>Bhakoot</span>
                        <span className="text-amber-300">{matchResult.bhakoot.score}/{matchResult.bhakoot.max}</span>
                      </div>
                      <div className="text-[9px] text-white/50 mt-0.5 truncate">{matchResult.bhakoot.desc}</div>
                    </div>

                    <div className="bg-white/[0.04] p-2 rounded-lg border border-white/10">
                      <div className="flex justify-between font-bold text-white">
                        <span>Nadi</span>
                        <span className="text-amber-300">{matchResult.nadi.score}/{matchResult.nadi.max}</span>
                      </div>
                      <div className="text-[9px] text-white/50 mt-0.5 truncate">{matchResult.nadi.desc}</div>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() =>
                  onAskInChat(
                    `We calculated an Ashtakoota Guna Milan score of ${matchResult?.totalScore}/36 (${matchResult?.verdict}) between ${profile.nakshatra.name} and ${NAKSHATRAS.find(n => n.id === partnerNakshatraId)?.name}. What are the traditional considerations for Nadi, Bhakoot, and Manglik Dosha in Vedic marriage compatibility?`
                  )
                }
                className="w-full py-2 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white rounded-xl font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all shadow-md border border-white/20 cursor-pointer"
              >
                <span>Discuss Matching & Remedies with NIVA Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
