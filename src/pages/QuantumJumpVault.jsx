import React, { useState, useEffect } from 'react';
import { Play, Sparkles, Award, Shield, Key, MessageCircle, Heart, Star, Brain, ArrowRight } from 'lucide-react';

const SESSIONS = [
  // Batch 1 (May 8 - May 12)
  {
    id: "Bk2aXAlT7b0",
    title: "Session 1: Day 1 - Foundation & Energy Cleansing",
    desc: "Understanding the Gayatri Quantum energy, subconscious mind basics, and beginning the energy cleansing.",
    batch: "Batch 1 (May 8 - May 12, 2026)"
  },
  {
    id: "P7yXpiZnn-Q",
    title: "Session 2: Day 1 Part 2 - Subconscious Deep Dive",
    desc: "Advanced molecular water restructuring and element cleansing practice.",
    batch: "Batch 1 (May 8 - May 12, 2026)"
  },
  {
    id: "2OKTNA-bs9A",
    title: "Session 3: Day 2 - Releasing Emotional Blocks",
    desc: "Techniques to let go of old traumatic memories, fears, and guilt.",
    batch: "Batch 1 (May 8 - May 12, 2026)"
  },
  {
    id: "NJ729i3Pcuw",
    title: "Session 4: Day 3 - Chakra & GABA Activation (v1)",
    desc: "Sound frequency alignment for pituitary glands and GABA hormone activation.",
    batch: "Batch 1 (May 8 - May 12, 2026)"
  },
  {
    id: "v4iX39lrAI4",
    title: "Session 5: Day 3 - Chakra & GABA Activation (v2)",
    desc: "Integrating element purification, third eye meditation, and protective auric shielding.",
    batch: "Batch 1 (May 8 - May 12, 2026)"
  },
  // Batch 2 (May 25 - May 27)
  {
    id: "vj27rqn3QzI",
    title: "Session 6: Day 1 - Breath & Swar Vigyan Mastery",
    desc: "Opening of nostrils (Ida, Pingala), breath control, and daily rhythm alignment.",
    batch: "Batch 2 (May 25 - May 27, 2026)"
  },
  {
    id: "SdWbL5ZwTGs",
    title: "Session 7: Day 2 - Subconscious Reprogramming",
    desc: "Advanced water glass technique, mirror work, and abundance manifestation.",
    batch: "Batch 2 (May 25 - May 27, 2026)"
  },
  {
    id: "Q9zkDdV0N5U",
    title: "Session 8: Day 3 - Hormones & Energy Realization",
    desc: "Activating Dopamine, Serotonin, and cosmic protection systems.",
    batch: "Batch 2 (May 25 - May 27, 2026)"
  },
  // Batch 3 (June 8 - June 10)
  {
    id: "xR133xwucNs",
    title: "Session 9: Day 1 - Gayatri Mantra Deep Sadhana",
    desc: "Solar resonance, daily Savita meditation, and grounding practices.",
    batch: "Batch 3 (June 8 - June 10, 2026)"
  },
  {
    id: "COdEmqXCRps",
    title: "Session 10: Day 2 - Relational Cord Cleansing",
    desc: "Direct emotional cord cutting, healing family bonds, and attracting sweet relations.",
    batch: "Batch 3 (June 8 - June 10, 2026)"
  },
  {
    id: "w8LzEkBs9oc",
    title: "Session 11: Day 3 - Manifestation Mastery & Abundance",
    desc: "Finalizing RAS activation, clearing money limits, and attracting social contribution.",
    batch: "Batch 3 (June 8 - June 10, 2026)"
  }
];

export default function QuantumJumpVault() {
  const [activeSession, setActiveSession] = useState(SESSIONS[0]);

  useEffect(() => {
    document.title = "Exclusive Video Vault: Quantum Jump | Team 360";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 min-h-screen bg-[#0D0302] text-[#FCE7C2] relative overflow-hidden">
      
      {/* Self-contained styling to hide scrollbars */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Immersive Glowing Orbs */}
      <div className="absolute top-[10%] left-[-10%] w-[50%] h-[40%] rounded-full bg-amber-500/5 blur-[100px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[45%] rounded-full bg-amber-600/10 blur-[120px] sm:blur-[150px] pointer-events-none" />

      <div className="max-w-[95%] mx-auto px-2 sm:px-6 lg:px-8 relative z-10 space-y-6 sm:space-y-8 lg:space-y-12">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3 px-1">
          <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-xs font-black tracking-widest text-[#FFD95A] uppercase bg-white/5 border border-white/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg">
            <Key className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFD95A] animate-pulse" />
            Private Portal: Paid Member Vault
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFD95A] to-white leading-tight">
            Quantum Jump Recorded Sessions
          </h1>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-[#FFD95A] to-amber-700 mx-auto rounded-full mt-1.5" />
          <p className="text-white/60 text-[11px] sm:text-sm font-semibold leading-relaxed max-w-2xl mx-auto">
            Welcome to your exclusive dashboard. Access all 11 recorded sessions on the Miracles of Gayatri Energy, happy hormone activation, and subconscious rewiring.
          </p>
        </div>

        {/* Video Player & Playlist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Main Video Box (8 cols on lg) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
            <div className="bg-white/5 border border-white/10 p-3 sm:p-5 rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl backdrop-blur-md relative overflow-hidden flex flex-col justify-start">
              
              {/* YouTube Responsive Frame */}
              <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-white/10 shadow-inner">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${activeSession.id}?rel=0&modestbranding=1`}
                  title={activeSession.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Session Meta Description */}
              <div className="mt-4 sm:mt-6 text-left space-y-1.5 px-0.5">
                <span className="text-[9px] sm:text-[10px] font-black uppercase text-[#FFD95A] tracking-wider block">
                  Now Playing
                </span>
                <h2 className="font-serif text-base sm:text-2xl font-bold text-white leading-tight">
                  {activeSession.title}
                </h2>
                <p className="text-white/70 text-xs sm:text-sm font-medium leading-relaxed">
                  {activeSession.desc}
                </p>
              </div>

            </div>

            {/* Quick Member Assistance Widget */}
            <div className="bg-gradient-to-r from-[#2A0D04]/60 via-[#120502]/80 to-[#6B2D17]/60 border border-[#FFD95A]/25 p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              <div className="space-y-1">
                <h4 className="font-serif font-black text-[#FFD95A] text-sm uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
                  <Shield className="w-4 h-4 text-[#FFD95A] flex-shrink-0" /> Member Support
                </h4>
                <p className="text-white/60 text-xs font-semibold leading-relaxed">
                  Having trouble loading the play sessions or need help with homework integration? Reach out directly.
                </p>
              </div>
              <a
                href="https://wa.me/916376779062?text=Hello%20Team%20360!%20I%20am%20a%20member%20of%20the%20Quantum%20Jump%20course%20and%20need%20support%20regarding%20recorded%20sessions."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto bg-[#25D366] hover:bg-[#20BA56] text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-5 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap active:scale-[0.98] shadow-md shadow-emerald-500/10 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white flex-shrink-0" />
                Contact Team on WhatsApp
              </a>
            </div>
          </div>

          {/* Sidebar Playlist Box (4 cols on lg) */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-5 flex flex-col shadow-2xl backdrop-blur-md relative overflow-hidden h-[380px] sm:h-[450px] lg:h-[620px]">
            <div className="border-b border-white/10 pb-3 mb-3 sm:pb-4 sm:mb-4 text-left flex items-center justify-between">
              <div>
                <h3 className="font-serif text-sm sm:text-base font-bold text-white">Course Syllabus</h3>
                <span className="text-[8px] sm:text-[9px] font-black text-[#FFD95A] uppercase tracking-wider">11 Video Sessions</span>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-[#FFD95A] animate-pulse flex-shrink-0" />
            </div>

            {/* Scrollable Grouped List */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 no-scrollbar text-left" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {Object.entries(
                SESSIONS.reduce((groups, session) => {
                  const group = groups[session.batch] || [];
                  group.push(session);
                  groups[session.batch] = group;
                  return groups;
                }, {})
              ).map(([batchName, sessionsInBatch]) => (
                <div key={batchName} className="space-y-2">
                  <div className="text-[9px] font-black text-[#FFD95A]/60 uppercase tracking-widest pl-2 border-l-2 border-[#FFD95A]/30">
                    {batchName}
                  </div>
                  <div className="space-y-2">
                    {sessionsInBatch.map((session) => {
                      const isActive = activeSession.id === session.id;
                      return (
                        <button
                          key={session.id}
                          onClick={() => setActiveSession(session)}
                          className={`w-full text-left p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition-all duration-300 flex items-start gap-2.5 sm:gap-3 group/item cursor-pointer ${
                            isActive 
                              ? 'bg-[#FFD95A] border-transparent text-[#2A0D04]' 
                              : 'bg-white/5 border-white/5 text-white/80 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <div className={`w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 border transition-all duration-300 ${
                            isActive 
                              ? 'bg-[#2A0D04] text-[#FFD95A] border-transparent' 
                              : 'bg-white/10 text-white/50 border-white/10 group-hover/item:border-white/20'
                          }`}>
                            <Play className="w-3 h-3 fill-current" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-bold leading-snug line-clamp-2">
                              {session.title.replace(/^Session \d+:\s*/, "")}
                            </h4>
                            <p className={`text-[9px] sm:text-[10px] leading-relaxed line-clamp-1 mt-0.5 ${
                              isActive ? 'text-[#2A0D04]/70 font-semibold' : 'text-white/40'
                            }`}>
                              {session.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Miracles of Gayatri & Hormones reference summary */}
        <div className="bg-white/5 border border-white/10 rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
            
            {/* Miracles list */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-serif text-base sm:text-xl font-bold text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-[#FFD95A] fill-[#FFD95A] flex-shrink-0" /> The 10 Miracles & Removals
              </h3>
              <div className="w-16 h-0.5 bg-[#FFD95A]/40 rounded-full" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-semibold text-white/70">
                {[
                  "1. Removal of Fear (भय मुक्ति)",
                  "2. Removal of Guilt (ग्लानि से राहत)",
                  "3. Removal of Grief (शोक से मुक्ति)",
                  "4. Removal of Misery & Suffering",
                  "5. Removal of Anger (क्रोध निवारण)",
                  "6. Removal of Ego (अहंकार निवारण)",
                  "7. Removal of Anxiety (चिंता मुक्ति)",
                  "8. Reduction of Overthinking",
                  "9. Relief from OCD Patterns",
                  "10. Relief from Mental/Emotional Pain"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-white/5 border border-white/5 rounded-xl">
                    <span className="w-1.5 h-1.5 bg-[#FFD95A] rounded-full flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hormone & Abundance Section */}
            <div className="space-y-6">
              
              {/* Happy Hormones */}
              <div className="space-y-2 sm:space-y-3">
                <h4 className="font-serif text-xs sm:text-base font-black text-white flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-[#FFD95A] flex-shrink-0" /> Secretion of Happy Hormones
                </h4>
                <div className="flex flex-wrap gap-1.5 text-[9px] sm:text-xs font-bold text-white/80">
                  {["Dopamine", "Serotonin", "Melatonin", "Oxytocin", "GABA", "Endorphins"].map((hormone) => (
                    <span key={hormone} className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                      {hormone}
                    </span>
                  ))}
                </div>
              </div>

              {/* 5 Powers */}
              <div className="space-y-2 sm:space-y-3">
                <h4 className="font-serif text-xs sm:text-base font-black text-white flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#FFD95A] flex-shrink-0" /> The 5 Manifestation Powers
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-white/70">
                  {[
                    "• Abundance Money & Career",
                    "• Sweet Relationships & Peace",
                    "• Sound Health & Vitality",
                    "• Recognition & Respect",
                    "• Social Meaningful Contribution"
                  ].map((pow) => (
                    <span key={pow} className="font-semibold block">{pow}</span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
