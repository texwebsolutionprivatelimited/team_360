import React, { useState, useEffect, useRef } from 'react';
import { Sun, Sparkles, Brain, Heart, Play, Pause, Activity, Info, Award } from 'lucide-react';

const SYLLABLE_GLANDS = [
  { num: 1, syllable: "तत् (Tat)", energy: "आध्या (Aadhya)", gland: "Tapini / Pineal Gland", impact: "Awakens primordial consciousness, spiritual insight, and deep cosmic wisdom.", x: 50, y: 15 },
  { num: 2, syllable: "स (Sa)", energy: "ब्राह्मी (Brahmi)", gland: "Pituitary Gland", impact: "Enhances intellect, logical memory, concentration, and endocrine coordination.", x: 50, y: 20 },
  { num: 3, syllable: "वि (Vi)", energy: "वैष्णवी (Vaishnavi)", gland: "Pineal / Thalamus", impact: "Governs intuition, sleep cycles, cell rejuvenation, and aura harmony.", x: 50, y: 17 },
  { num: 4, syllable: "तु (Tu)", energy: "शाम्भवी (Shambhavi)", gland: "Thymus Gland", impact: "Boosts immune system, emotional stability, compassion, and heart chakra energy.", x: 50, y: 45 },
  { num: 5, syllable: "व (Va)", energy: "वेदमाता (Vedmata)", gland: "Adrenal Glands", impact: "Regulates stress hormones, fight-or-flight stability, and bodily stamina.", x: 50, y: 65 },
  { num: 6, syllable: "रे (Re)", energy: "देवमाता (Devmata)", gland: "Pancreas Gland", impact: "Governs blood sugar, metabolic regulation, and digestive fire.", x: 50, y: 70 },
  { num: 7, syllable: "णि (Ni)", energy: "विश्वमाता (Vishwamata)", gland: "Spleen Gland", impact: "Filters cellular toxins, purifies blood, and expands life-force vitality.", x: 43, y: 62 },
  { num: 8, syllable: "यम् (Yam)", energy: "मंदंभरा (Mandambhara)", gland: "Reproductive Gland", impact: "Balances creative potential, structural stability, and life energy reserves.", x: 50, y: 90 },
  { num: 9, syllable: "भूर् (Bhur)", energy: "मन्दाकिनी (Mandakini)", gland: "Submandibular Gland", impact: "Purifies words, speech resonance, verbal authority, and expression.", x: 50, y: 30 },
  { num: 10, syllable: "गो (Go)", energy: "अजपा (Ajapa)", gland: "Thyroid Gland", impact: "Regulates body metabolic rate, vocal strength, and throat chakra balance.", x: 50, y: 33 },
  { num: 11, syllable: "दे (De)", energy: "ऋद्धि (Riddhi)", gland: "Parathyroid Gland", impact: "Governs bone calcium absorption, density, and physical structure integrity.", x: 50, y: 36 },
  { num: 12, syllable: "व (Va)", energy: "सिद्धि (Siddhi)", gland: "Thymus Cortex", impact: "Speeds up physical self-healing, cellular tissue recovery, and adaptation.", x: 50, y: 48 },
  { num: 13, syllable: "स्य (Sya)", energy: "सावित्री (Savitri)", gland: "Hypothalamus", impact: "Coordinates body temperature, autonomic balance, and neural safety pathways.", x: 50, y: 23 },
  { num: 14, syllable: "धी (Dhi)", energy: "सरस्वती (Saraswati)", gland: "Temporal Lobe Glands", impact: "Awakens speed reading, creative vision, memory retention, and art talents.", x: 44, y: 19 },
  { num: 15, syllable: "म (Ma)", energy: "लक्ष्मी (Lakshmi)", gland: "Cardiac Plexus", impact: "Attracts financial prosperity, flow of wealth, love, and heart health.", x: 50, y: 52 },
  { num: 16, syllable: "हि (Hi)", energy: "दुर्गा (Durga)", gland: "Solar Plexus", impact: "Awakens courage, protection shield, gut instincts, and inner confidence.", x: 50, y: 75 },
  { num: 17, syllable: "धि (Dhi)", energy: "कुण्डलिनी (Kundalini)", gland: "Sacral Plexus Gland", impact: "Awakens latent kundalini energy, vital strength, and spiritual flow.", x: 50, y: 95 },
  { num: 18, syllable: "यो (Yo)", energy: "प्रज्ञानी (Pragyani)", gland: "Prefrontal Cortex", impact: "Sharpens logical decision-making, executive focus, and deep learning.", x: 50, y: 12 },
  { num: 19, syllable: "यो (Yo)", energy: "भवानी (Bhavani)", gland: "Medulla Oblongata", impact: "Restores deep rhythmic breathing, heart rate control, and autonomic ease.", x: 50, y: 25 },
  { num: 20, syllable: "नः (Nah)", energy: "भुवनेश्वरी (Bhuvaneshwari)", gland: "Lymphatic System Nodes", impact: "Promotes detoxification, cell renewal, and overall body immunity.", x: 50, y: 58 },
  { num: 21, syllable: "प्र (Pra)", energy: "अन्नपूर्णा (Annapurna)", gland: "Gastric Plexus", impact: "Regulates nutrient assimilation, digestive comfort, and physical satiety.", x: 50, y: 80 },
  { num: 22, syllable: "चो (Cho)", energy: "महामाया (Mahamaya)", gland: "Amygdala Glands", impact: "Dissolves mental fear, anxiety, and coordinates emotional stability.", x: 48, y: 18 },
  { num: 23, syllable: "द (Da)", energy: "पयस्विनी (Payaswini)", gland: "Thoracic / Mammary Gland", impact: "Fosters motherly love, compassion, stress relief, and heart openness.", x: 50, y: 42 },
  { num: 24, syllable: "यात् (Yat)", energy: "त्रिपुरा (Tripura)", gland: "Coccygeal / Root Gland", impact: "Enhances grounding, root chakra security, absolute fearlessness, and core stability.", x: 50, y: 105 }
];

const WORD_GROUPS = [
  { name: "तत्सवितुर्वरेण्यं", translation: "Tat Savitur Varenyam", syllables: [1, 2, 3, 4, 5, 6, 7, 8] },
  { name: "भर्गो देवस्य", translation: "Bhargo Devasya", syllables: [9, 10, 11, 12, 13] },
  { name: "धीमहि", translation: "Dhimahi", syllables: [14, 15, 16] },
  { name: "धियो यो नः", translation: "Dhiyo Yo Nah", syllables: [17, 18, 19, 20] },
  { name: "प्रचोदयात्", translation: "Prachodayat", syllables: [21, 22, 23, 24] }
];

export default function GayatriMantraScience() {
  const [selectedSyllable, setSelectedSyllable] = useState(SYLLABLE_GLANDS[0]);

  return (
    <section className="relative py-12 sm:py-20 bg-gradient-to-b from-[#120502] via-[#2A0D04] to-[#120502] text-white overflow-hidden">
      
      {/* Background Mandala overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03] text-[#FFD95A] pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <circle cx="50" cy="50" r="45" strokeWidth="0.2" />
          <circle cx="50" cy="50" r="35" strokeWidth="0.2" />
          <circle cx="50" cy="50" r="25" strokeWidth="0.2" />
          {[...Array(36)].map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={50 + 45 * Math.cos((i * 10 * Math.PI) / 180)}
              y2={50 + 45 * Math.sin((i * 10 * Math.PI) / 180)}
              strokeWidth="0.1"
            />
          ))}
        </svg>
      </div>

      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#FFD95A] uppercase mb-3 animate-tagline-blink">
            <Sun className="w-3.5 h-3.5 animate-pulse text-[#FFD95A]" />
            Quantum Sound &amp; Gayatri Science
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            The Scientific Power of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD95A] to-[#F5A623] star-glow">
              Gayatri Mantra
            </span>
          </h2>
          <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-[#FFD95A] to-[#F5A623] mb-5" />
          <p className="text-white/70 text-sm sm:text-base leading-relaxed font-semibold">
            Gayatri Science chanting is not just belief; it is a physical and biological energy grid. Chanting the Gayatri Mantra generates 110,000 distinct sound wave frequencies per second, triggering profound neural and hormonal shifts in your body.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Column 1: Gland Visualizer Silhouette (4 Cols) */}
          <div className="md:col-span-5 lg:col-span-4 glass-card rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-6 border border-white/10 flex flex-col justify-between items-center text-center relative overflow-hidden min-h-[350px] sm:min-h-[400px]">
            <div className="flex items-center gap-1.5 self-start">
              <Activity className="w-4 h-4 text-[#FFD95A]" />
              <span className="text-[10px] font-black uppercase text-[#FFD95A] tracking-wider">Biological Alignment</span>
            </div>
            
            <div className="relative w-full flex-1 flex items-center justify-center py-4">
              {/* Human Silhouette SVG */}
              <svg viewBox="0 0 100 120" className="w-auto h-full max-h-[350px] opacity-90 transition-all duration-500">
                <defs>
                  <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255, 217, 90, 0.4)" />
                    <stop offset="50%" stopColor="rgba(226, 88, 34, 0.3)" />
                    <stop offset="100%" stopColor="rgba(42, 13, 4, 0.1)" />
                  </linearGradient>
                  <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFD95A" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#E25822" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#2A0D04" stopOpacity="0" />
                  </radialGradient>
                </defs>
                
                {/* Central Sushumna Channel */}
                <line x1="50" y1="10" x2="50" y2="110" stroke="rgba(255,217,90,0.15)" strokeWidth="1" strokeDasharray="3 3" />

                {/* Human Silhouette path */}
                <path 
                  d="M 50,8 
                     C 44,8 40,11 40,16 
                     C 40,21 44,24 50,24 
                     C 56,24 60,21 60,16 
                     C 60,11 56,8 50,8 Z 
                     M 48,24 
                     C 43,26 35,28 30,35 
                     C 25,42 24,52 26,62 
                     C 27,67 29,72 29,82 
                     C 29,88 27,95 29,110
                     L 71,110 
                     C 73,95 71,88 71,82 
                     C 71,72 73,67 74,62 
                     C 76,52 75,42 70,35 
                     C 65,28 57,26 52,24 Z" 
                  fill="url(#bodyGradient)" 
                  stroke="rgba(255, 217, 90, 0.25)" 
                  strokeWidth="1.2"
                />

                {/* Gland points network mapping */}
                {SYLLABLE_GLANDS.map((gland) => {
                  const isCurrent = selectedSyllable.num === gland.num;
                  return (
                    <g key={gland.num}>
                      {/* Draw dots */}
                      <circle
                        cx={gland.x}
                        cy={gland.y}
                        r={isCurrent ? "4.5" : "2"}
                        fill={isCurrent ? "#FFD95A" : "rgba(255, 255, 255, 0.25)"}
                        className="transition-all duration-300"
                      />
                      {isCurrent && (
                        <>
                          <circle
                            cx={gland.x}
                            cy={gland.y}
                            r="12"
                            fill="url(#glow)"
                            className="animate-ping"
                          />
                          <line 
                            x1={gland.x} 
                            y1={gland.y} 
                            x2={gland.x > 50 ? gland.x - 15 : gland.x + 15} 
                            y2={gland.y} 
                            stroke="#FFD95A" 
                            strokeWidth="0.5" 
                            strokeDasharray="2 2"
                          />
                        </>
                      )}
                      </g>
                    );
                  })}
                </svg>
              </div>
              
              {/* Mini gland label indicator */}
              <div className="bg-[#120502]/60 border border-white/5 rounded-xl px-3 py-2 w-full text-center mt-2">
                <span className="text-[8px] text-white/50 block font-bold uppercase">Stimulus Target Gland</span>
                <span className="text-xs text-[#FFD95A] font-black uppercase tracking-wider">{selectedSyllable.gland.split('/')[0]}</span>
              </div>
            </div>
  
            {/* Column 2: Word-by-Word Syllable Flow (8 Cols) */}
            <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between gap-4 sm:gap-6">
              
              {/* Syllables block */}
              <div className="glass-card rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-6 border border-white/10 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#FFD95A]" />
                    <h3 className="font-serif text-lg font-black text-white">Mantra Gland Activation</h3>
                  </div>
                  <p className="text-white/60 text-xs font-semibold leading-relaxed">
                    Click each syllable within the natural word groupings of the Gayatri Mantra to trace its target biological gland and physiological impact:
                  </p>
  
                  {/* Sanskrit Words Flow */}
                  <div className="space-y-3">
                    {WORD_GROUPS.map((word, wIdx) => (
                      <div key={wIdx} className="bg-white/5 border border-white/5 rounded-2xl p-3 sm:p-3.5 space-y-2 sm:space-y-2.5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-white/5 pb-1.5">
                          <span className="font-serif text-sm font-black text-[#FFD95A] tracking-wide">{word.name}</span>
                          <span className="text-[9px] text-white/40 font-bold uppercase tracking-wider">{word.translation}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {word.syllables.map((sNum) => {
                            const item = SYLLABLE_GLANDS.find(s => s.num === sNum);
                            if (!item) return null;
                            const isSelected = selectedSyllable.num === item.num;
                            return (
                              <button
                                key={item.num}
                                onClick={() => setSelectedSyllable(item)}
                                className={`h-10 sm:h-11 px-2.5 sm:px-3.5 rounded-lg sm:rounded-xl border flex flex-col items-center justify-center transition-all duration-350 cursor-pointer active:scale-95 ${
                                  isSelected
                                    ? 'bg-[#E25822] border-[#FFD95A] text-white font-black shadow-md shadow-[#E25822]/30 scale-[1.04]'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/70 hover:text-white'
                                }`}
                              >
                                <span className="text-[11px] sm:text-xs font-extrabold leading-none">{item.syllable.split(' ')[0]}</span>
                                <span className="text-[8px] opacity-40 font-bold mt-0.5 sm:mt-1 leading-none">{item.num}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
  
                {/* Selected Syllable Details Display */}
                <div className="bg-[#120502]/70 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col sm:flex-row items-start gap-3 sm:gap-4 animate-fade-in mt-4 sm:mt-6">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#FFD95A] to-[#F5A623] text-[#2A0D04] flex items-center justify-center flex-shrink-0 font-black text-base sm:text-lg shadow-md">
                    {selectedSyllable.syllable[0]}
                  </div>
                  <div className="text-left space-y-1 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <span className="text-[11px] sm:text-xs font-black text-[#FFD95A] uppercase tracking-wide">Syllable: {selectedSyllable.syllable}</span>
                      <span className="text-[8px] sm:text-[9px] font-black text-emerald-400 bg-emerald-500/10 px-2 sm:px-2.5 py-0.5 rounded-full uppercase tracking-wider self-start sm:self-auto">Gland: {selectedSyllable.gland}</span>
                    </div>
                    <div className="text-[10px] font-bold text-white/90">Energy/Shakti Shodhan: <span className="text-[#FFD95A]">{selectedSyllable.energy}</span></div>
                    <p className="text-[11px] sm:text-xs text-white/60 leading-relaxed font-semibold">
                      {selectedSyllable.impact}
                    </p>
                  </div>
                </div>
              </div>
  
            </div>
  
          </div>
  
        </div>
  
      </section>
    );
}
