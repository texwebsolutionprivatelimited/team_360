import React, { useState } from 'react';
import Products from '../components/Products';
import { BookOpen, Sparkles, Copy, Check, Book, Sun, CheckCircle } from 'lucide-react';

export default function ProductsPage() {
  // Calculator States
  const [auraName, setAuraName] = useState('');
  const [auraZodiac, setAuraZodiac] = useState('Aries');
  const [auraIntention, setAuraIntention] = useState('Wealth & Abundance');
  const [selectedBookId, setSelectedBookId] = useState('book-1');
  const [isAuraCalculating, setIsAuraCalculating] = useState(false);
  const [auraProgress, setAuraProgress] = useState(0);
  const [auraStageText, setAuraStageText] = useState('');
  const [auraResult, setAuraResult] = useState(null);
  const [isAffirmationCopied, setIsAffirmationCopied] = useState(false);
  const [activeRitualTab, setActiveRitualTab] = useState('alpha');

  const bookChoices = [
    {
      id: 'book-1',
      name: 'Kahani Padhey or Ameer Bane (Read Stories & Become Rich)',
      price: '₹495',
      intention: 'Wealth programming, success, and prosperity',
      affirmation: 'My mindset is aligned with infinite wealth, and I manifest prosperity daily.'
    },
    {
      id: 'book-2',
      name: 'How to Become a Millionaire? / करोड़पति कैसे बनें?',
      price: '₹495',
      intention: 'Expanding vision, confidence, and divine support',
      affirmation: 'I think big, act with courage, and receive absolute divine guidance.'
    },
    {
      id: 'book-3',
      name: 'To be Billionaire – Every Indian’s Right',
      price: '₹989',
      intention: 'Abundance declaration, citizen rights, and barrier clearance',
      affirmation: 'I declare abundance as my birthright, dissolving all limitations.'
    },
    {
      id: 'book-4',
      name: 'How to Become a Multimillionaire? / बहु-करोड़पति कैसे बनें?',
      price: '₹886',
      intention: 'Advanced wealth programming, Alpha state, scaling success',
      affirmation: 'My consciousness shifts to multimillionaire levels, attracting massive opportunities.'
    },
    {
      id: 'book-5',
      name: 'Change Your Mindset and Become Rich / माइंडसेट बदलें और अमीर बनें',
      price: '₹990',
      intention: 'Mindset, skillset, and toolset shifting for riches',
      affirmation: 'I choose the mindset of abundance and transition into absolute peak wealth.'
    },
    {
      id: 'book-6',
      name: 'How Do We Gain from the Magic of Divine Bliss? / दिव्य कृपा का जादू',
      price: '₹990',
      intention: 'Divine grace, gratitude, and aura protection',
      affirmation: 'I open my life to the magic of divine bliss, vibrating in gratitude and protection.'
    },
    {
      id: 'book-7',
      name: 'आत्मज्ञान - पुष्पमाला (अध्यात्म ज्ञान सरल भाषा में )',
      price: '₹495',
      intention: 'Vedic wisdom, self-realization, and consciousness elevation',
      affirmation: 'I connect with my true inner self, elevating my consciousness to divine truth.'
    },
    {
      id: 'book-8',
      name: 'Become Brain Engineering Expert (theory book with page no learn)',
      price: '₹1100',
      intention: 'Brain engineering, speed reading, and memory hacks',
      affirmation: 'My brain capacity is optimized, and I learn with supreme speed and retention.'
    },
    {
      id: 'book-9',
      name: 'Become MIDBRAIN ACTIVATION Professional, How to Become MIDBRAIN ACTIVATION Professional',
      price: '₹1100',
      intention: 'Midbrain activation training, coaching, and child intelligence',
      affirmation: 'I channel the training codes of midbrain activation to awaken genius in myself and others.'
    },
    {
      id: 'book-10',
      name: 'know Your Inborn Talent : Become DMIT Professional, How to Become DMIT Professional',
      price: '₹1690',
      intention: 'DMIT analysis, mapping fingerprint codes, natural talents',
      affirmation: 'I understand my inborn talents clearly and direct my energy to my natural strengths.'
    }
  ];

  const handleAuraCalculate = (e) => {
    e.preventDefault();
    if (!auraName.trim()) return;

    setIsAuraCalculating(true);
    setAuraProgress(0);
    setAuraResult(null);

    const stages = [
      { progress: 25, text: "Reading your zodiac sign and energy match..." },
      { progress: 60, text: "Matching publication frequency with your mind goals..." },
      { progress: 100, text: "Perfect match calculation complete!" }
    ];

    stages.forEach((stage, idx) => {
      setTimeout(() => {
        setAuraProgress(stage.progress);
        setAuraStageText(stage.text);
        if (stage.progress === 100) {
          setTimeout(() => {
            setIsAuraCalculating(false);
            const nameVal = auraName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const zodiacVal = auraZodiac.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const intentionVal = auraIntention.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const selectedChoice = bookChoices.find(b => b.id === selectedBookId);
            const bookIdx = bookChoices.indexOf(selectedChoice) + 1;
            const hash = (nameVal + zodiacVal + intentionVal + (bookIdx * 17)) % 100;
            const deterministicScore = 88 + (hash % 11) + (hash % 10) / 10 + Math.random() * 0.9;
            const finalScore = Math.min(99.9, deterministicScore).toFixed(1);
            
            let simpleMessage = `Dear ${auraName}, the book '${selectedChoice.name}' is an extraordinary match for your zodiac sign ${auraZodiac} with a ${finalScore}% resonance score! This book is uniquely structured to align with your goal of ${auraIntention}. Reading it daily will reprogram your subconscious mind, remove old blocks, and build your confidence.`;

            setAuraResult({
              score: finalScore,
              bookName: selectedChoice.name,
              message: simpleMessage,
              affirmation: selectedChoice.affirmation,
              price: selectedChoice.price
            });
          }, 600);
        }
      }, (idx + 1) * 800);
    });
  };

  const handleCopyAffirmation = (text) => {
    navigator.clipboard.writeText(text);
    setIsAffirmationCopied(true);
    setTimeout(() => {
      setIsAffirmationCopied(false);
    }, 2000);
  };

  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-[#FFF5EE]">
      {/* Page Header */}
      <div className="relative pt-4 pb-3 sm:pb-6 text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1.5 text-[10px] xs:text-xs font-bold tracking-widest text-[#6B2D17] uppercase mb-3 whitespace-nowrap">
            <BookOpen className="w-4 h-4 text-[#6B2D17]" />
            Official Bookstore &amp; Publications
          </span>
          <h1 className="font-serif text-[21px] xs:text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#2A0D04] leading-tight mb-3 whitespace-nowrap">
            Bookstore &amp; Publications
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-medium">
            Browse our collection of transformative books by D.D. Sharma Ji. Designed to reprogram your subconscious, activate solar energies, and guide you towards financial freedom and peak mental training.
          </p>
        </div>
      </div>

      {/* Render Products Grid Component */}
      <Products />

      {/* 🔮 Interactive Mindset Book Match Calculator */}
      <div className="hidden xs:block mt-6 sm:mt-12 bg-gradient-to-br from-[#2A0D04] via-[#6B2D17] to-[#120502] text-white rounded-[1.5rem] sm:rounded-[2.5rem] p-3.5 sm:p-10 lg:p-12 border-2 border-amber-500/30 relative overflow-hidden shadow-2xl w-[calc(100%_-_1.5rem)] sm:max-w-[95%] mx-auto mb-12 sm:mb-16">
        
        {/* Subtle sparkles & cosmic background elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-[#F5D28E] bg-white/5 border border-white/10 px-4 py-2 rounded-full uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#F5D28E]" />
              Mindset Book Match
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3">
              Find Your Perfect Book Match
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-[#F5D28E] to-amber-500 mx-auto rounded-full mt-3 mb-2" />
            <p className="text-white/70 text-xs sm:text-sm font-semibold max-w-2xl mx-auto leading-relaxed">
              Find which of D.D. Sharma Ji's books resonates best with your zodiac sign, goals, and current mental energy blockages.
            </p>
          </div>

          {/* Interactive Widget Block */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-8 border border-white/10 shadow-inner">
            
            {!isAuraCalculating && !auraResult && (
              /* Stage 1: The Input Form */
              <form onSubmit={handleAuraCalculate} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-[10px] font-black text-[#F5D28E] uppercase tracking-widest mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={auraName}
                      onChange={(e) => setAuraName(e.target.value)}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-xs font-bold text-white placeholder-white/30 focus:outline-none focus:border-[#F5D28E] focus:ring-1 focus:ring-[#F5D28E]/30 transition-all shadow-md"
                    />
                  </div>

                  {/* Choose Book Dropdown */}
                  <div>
                    <label className="block text-[10px] font-black text-[#F5D28E] uppercase tracking-widest mb-2">Select Book</label>
                    <select
                      value={selectedBookId}
                      onChange={(e) => setSelectedBookId(e.target.value)}
                      className="w-full bg-[#2A0D04] border border-white/15 rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-[#F5D28E] focus:ring-1 focus:ring-[#F5D28E]/30 transition-all shadow-md cursor-pointer"
                    >
                      {bookChoices.map((choice) => (
                        <option key={choice.id} value={choice.id} className="bg-[#2A0D04] text-white font-semibold">{choice.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Zodiac Selector */}
                  <div>
                    <label className="block text-[10px] font-black text-[#F5D28E] uppercase tracking-widest mb-2">Your Zodiac Sign</label>
                    <select
                      value={auraZodiac}
                      onChange={(e) => setAuraZodiac(e.target.value)}
                      className="w-full bg-[#2A0D04] border border-white/15 rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-[#F5D28E] focus:ring-1 focus:ring-[#F5D28E]/30 transition-all shadow-md cursor-pointer"
                    >
                      {['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map((z) => (
                        <option key={z} value={z} className="bg-[#2A0D04] text-white font-semibold">{z}</option>
                      ))}
                    </select>
                  </div>

                  {/* Primary Intention */}
                  <div>
                    <label className="block text-[10px] font-black text-[#F5D28E] uppercase tracking-widest mb-2">Main Goal / Dream</label>
                    <select
                      value={auraIntention}
                      onChange={(e) => setAuraIntention(e.target.value)}
                      className="w-full bg-[#2A0D04] border border-white/15 rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:border-[#F5D28E] focus:ring-1 focus:ring-[#F5D28E]/30 transition-all shadow-md cursor-pointer"
                    >
                      {['Wealth & Abundance', 'Deep Mental Peace', 'Safety & Protection', 'Success & Leadership', 'Spiritual Wisdom', 'Stress Relief'].map((item) => (
                        <option key={item} value={item} className="bg-[#2A0D04] text-white font-semibold">{item}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-gradient-to-r from-[#F5D28E] to-amber-500 hover:from-amber-400 hover:to-[#F5D28E] text-[#120502] font-black py-4 px-10 rounded-xl text-xs uppercase tracking-widest shadow-lg hover:shadow-amber-500/20 active:scale-95 transition-all duration-300 cursor-pointer"
                  >
                    Calculate Mindset Match
                  </button>
                </div>
              </form>
            )}

            {isAuraCalculating && (
              /* Stage 2: The Attunement Animation */
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-6">
                {/* Glowing frequency wheel */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-white/10 border-t-[#F5D28E] animate-spin" style={{ animationDuration: '1.2s' }} />
                  <div className="absolute w-16 h-16 rounded-full border border-dashed border-amber-400 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
                  <Sparkles className="w-6 h-6 text-[#F5D28E] animate-pulse" />
                </div>

                <div className="space-y-2 max-w-md">
                  <span className="block text-[#F5D28E] text-xs font-black uppercase tracking-widest animate-pulse">
                    Matching vibes... {auraProgress}%
                  </span>
                  <p className="text-xs font-bold text-white/80 leading-relaxed min-h-[32px] transition-all">
                    {auraStageText}
                  </p>
                </div>

                <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#F5D28E] to-amber-500 rounded-full transition-all duration-300"
                    style={{ width: `${auraProgress}%` }}
                  />
                </div>
              </div>
            )}

            {!isAuraCalculating && auraResult && (
              /* Stage 3: The Match Result */
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-4">
                {/* Left Circle: Compatibility Score Ring */}
                <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
                  <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[#120502] border-4 border-[#F5D28E]/30 flex flex-col items-center justify-center shadow-2xl mx-auto">
                    <div className="absolute inset-2 rounded-full border border-dashed border-[#F5D28E]/45 animate-spin pointer-events-none" style={{ animationDuration: '20s' }} />
                    <span className="text-[9px] sm:text-[10px] font-black text-[#F5D28E] uppercase tracking-widest">Resonance</span>
                    <span className="text-2xl sm:text-3xl font-black text-white mt-1">{auraResult.score}%</span>
                    <span className="text-[8px] sm:text-[9px] font-extrabold text-emerald-400 uppercase tracking-widest mt-1">Excellent Match</span>
                  </div>
                </div>

                {/* Right Content: Message & Custom Affirmation */}
                <div className="md:col-span-8 space-y-5 text-left">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                      Match Confirmed!
                    </span>
                    <p className="text-white/90 text-xs sm:text-sm font-semibold leading-relaxed">
                      {auraResult.message}
                    </p>
                  </div>

                  {/* Interactive Affirmation Widget */}
                  <div className="bg-[#120502]/60 border border-white/10 rounded-2xl p-5 relative overflow-hidden group">
                    <div className="relative sm:absolute flex justify-end mb-3 sm:mb-0 sm:top-3 sm:right-3">
                      <button
                        onClick={() => handleCopyAffirmation(auraResult.affirmation)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white hover:text-[#F5D28E] transition-all active:scale-90 cursor-pointer flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest"
                        title="Copy Affirmation"
                      >
                        {isAffirmationCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <span className="block text-[9px] font-black text-[#F5D28E] uppercase tracking-widest mb-2 flex items-center gap-1">
                      <Sun className="w-3 h-3 text-[#F5D28E]" /> Your Daily Mindset Affirmation:
                    </span>
                    <p className="text-white text-xs font-black leading-relaxed sm:pr-16 italic">
                      "{auraResult.affirmation}"
                    </p>
                    <span className="block text-[8px] font-bold text-white/35 mt-2.5 uppercase tracking-wide">
                      *Repeat this mindset affirmation 11 times every morning to align your subconscious.
                    </span>
                  </div>

                  {/* Call to Actions */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                    <a
                      href={`https://wa.me/916376779062?text=${encodeURIComponent("Hello! I calculated my mindset match for '" + auraResult.bookName + "' and got a wonderful " + auraResult.score + "% resonance score! I want to enquire about ordering this blessed book.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto text-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-white font-black text-[10px] sm:text-xs px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 uppercase tracking-widest flex items-center gap-2 cursor-pointer"
                    >
                      Enquire about this Book on WhatsApp
                    </a>
                    <button
                      onClick={() => {
                        setAuraResult(null);
                        setAuraName('');
                      }}
                      className="text-white/60 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      Try Another Book
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* 🧼 Daily Reading & Subconscious Integration Guide */}
      <div className="hidden xs:block mt-8 bg-white rounded-[1.5rem] sm:rounded-[2.5rem] p-3.5 sm:p-10 lg:p-12 border-2 border-amber-100/60 shadow-2xl w-[calc(100%_-_1.5rem)] sm:max-w-[95%] mx-auto mb-12 sm:mb-16 relative overflow-hidden">
        
        {/* Soft decorative background blurs */}
        <div className="absolute top-[-20%] left-[-20%] w-72 h-72 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#6B2D17] uppercase mb-3 animate-tagline-blink">
              <Sparkles className="w-3.5 h-3.5" />
              Mindset Study Guide
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2A0D04] leading-tight">
              Daily Study &amp; Mind Integration Ritual
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#E25822] to-[#6B2D17] mx-auto rounded-full mt-3 mb-2" />
            <p className="text-gray-600 text-xs sm:text-sm font-semibold max-w-2xl mx-auto leading-relaxed">
              Reading is only the first step. Cleanse your intellectual space and integrate these mind principles into your subconscious weekly using these 4 easy steps!
            </p>
          </div>

          {/* Interactive Ritual Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-8">
            {[
              { id: 'alpha', label: '1. ALPHA READING', desc: 'Morning Routine' },
              { id: 'journal', label: '2. IDENTITY NOTEBOOK', desc: 'Goal Integration' },
              { id: 'mantra', label: '3. MANTRA ALIGNMENT', desc: 'Vibe Programming' },
              { id: 'action', label: '4. DECISIVE MILESTONES', desc: 'Peak Execution' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveRitualTab(tab.id)}
                className={`p-2 sm:p-4 rounded-xl sm:rounded-2xl border text-center transition-all duration-300 cursor-pointer ${
                  activeRitualTab === tab.id
                    ? 'bg-[#6B2D17] text-white border-transparent shadow-lg shadow-amber-950/25 scale-[1.02]'
                    : 'bg-amber-50/50 text-[#6B2D17] border-amber-200 hover:bg-white'
                }`}
              >
                <span className="block text-[9px] sm:text-[10px] font-black uppercase tracking-wider">{tab.label}</span>
                <span className="block text-[8px] sm:text-[9px] font-bold opacity-60 mt-0.5">{tab.desc}</span>
              </button>
            ))}
          </div>

          {/* Tab Display Panel */}
          <div className="bg-amber-50/20 border-2 border-amber-100 rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
            {activeRitualTab === 'alpha' && (
              <>
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#2A0D04] to-[#6B2D17] flex items-center justify-center flex-shrink-0 text-white shadow-md">
                  <Sun className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div className="text-left space-y-2">
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#2A0D04]">1. Alpha State Morning Reading</h4>
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 leading-relaxed">
                    Read 10 to 15 pages of your book early in the morning immediately after waking up. Your brain is naturally in the Alpha frequency state, allowing knowledge to seep directly into your subconscious mind.
                  </p>
                  <span className="block text-[9px] font-black text-[#6B2D17] uppercase tracking-wider">*Ideal time: 5:00 AM to 6:30 AM.</span>
                </div>
              </>
            )}

            {activeRitualTab === 'journal' && (
              <>
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#2A0D04] to-[#6B2D17] flex items-center justify-center flex-shrink-0 text-white shadow-md">
                  <Book className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div className="text-left space-y-2">
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#2A0D04]">2. Identity Notebook Writing</h4>
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 leading-relaxed">
                    Keep a dedicated notebook. After reading a chapter, write down three key core insights as if they are already integrated into your identity (e.g., "I easily reprogram my beliefs for abundance").
                  </p>
                  <span className="block text-[9px] font-black text-[#6B2D17] uppercase tracking-wider">*Writing creates strong new neural networks.</span>
                </div>
              </>
            )}

            {activeRitualTab === 'mantra' && (
              <>
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#2A0D04] to-[#6B2D17] flex items-center justify-center flex-shrink-0 text-white shadow-md">
                  <Sparkles className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div className="text-left space-y-2">
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#2A0D04]">3. Mindset Affirmation Alignment</h4>
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 leading-relaxed">
                    Stand in front of a mirror or sit comfortably, hold the book in your left hand, and repeat the matched book affirmation 11 times. Close your eyes and feel the positive shift in your energy aura.
                  </p>
                  <span className="block text-[9px] font-black text-[#6B2D17] uppercase tracking-wider">*Connect sound waves with mental intent.</span>
                </div>
              </>
            )}

            {activeRitualTab === 'action' && (
              <>
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#2A0D04] to-[#6B2D17] flex items-center justify-center flex-shrink-0 text-white shadow-md">
                  <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div className="text-left space-y-2">
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#2A0D04]">4. Decisive Milestones &amp; Action</h4>
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 leading-relaxed">
                    Select one concrete mindset training technique from the book each week and break it into small daily action items. Maintain a visible scoreboard to hold yourself accountable to your goal.
                  </p>
                  <span className="block text-[9px] font-black text-[#6B2D17] uppercase tracking-wider">*Subconscious programming is sealed by real-world action.</span>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
