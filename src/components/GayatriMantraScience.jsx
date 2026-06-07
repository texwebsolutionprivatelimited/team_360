import React, { useState, useEffect, useRef } from 'react';
import { Sun, Sparkles, Brain, Heart, Play, Pause, Activity, Info, Award } from 'lucide-react';

const SYLLABLE_GLANDS = [
  { syllable: "तत् (Tat)", energy: "तापिनी (Tapini)", gland: "Thyroid Gland", impact: "Regulates metabolism, thyroid hormones, and overall body energy." },
  { syllable: "स (Sa)", energy: "सफलता (Saphalta)", gland: "Pituitary Gland", impact: "Governs growth, hormone production, and endocrine coordination." },
  { syllable: "वि (Vi)", energy: "विश्व (Vishwa)", gland: "Pineal Gland", impact: "Secretes melatonin, regulates circadian rhythm, and supports sleep cycles." },
  { syllable: "तुर् (Tur)", energy: "तुष्टि (Tushti)", gland: "Thymus Gland", impact: "Stimulates immune system response and T-cell activation." },
  { syllable: "व (Va)", energy: "वरदा (Varada)", gland: "Adrenal Gland", impact: "Regulates adrenaline, manages stress responses, and boosts stamina." },
  { syllable: "रे (Re)", energy: "रेवती (Revati)", gland: "Pancreas Gland", impact: "Maintains insulin levels, balancing sugar and digestive processes." },
  { syllable: "णि (Ni)", energy: "निष्कामा (Niskama)", gland: "Spleen Gland", impact: "Filters blood cells, supports lymphatic system, and immune defense." },
  { syllable: "यम् (Yam)", energy: "यमुना (Yamuna)", gland: "Reproductive Glands", impact: "Balances vital energy, hormone regulation, and physical strength." },
];

export default function GayatriMantraScience() {
  const [activeTab, setActiveTab] = useState('gaba');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSyllable, setSelectedSyllable] = useState(SYLLABLE_GLANDS[0]);
  const [waveHeightMultiplier, setWaveHeightMultiplier] = useState(1);

  // Audio refs for Web Audio API synthesis
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const oscillatorsRef = useRef([]);

  const startAudio = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0, ctx.currentTime);
      mainGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.5);
      mainGain.connect(ctx.destination);
      gainNodeRef.current = mainGain;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, ctx.currentTime);
      filter.connect(mainGain);

      const baseFreq = 136.10; // Cosmic OM / Sadhana frequency
      const freqs = [baseFreq, baseFreq * 2, baseFreq * 1.5]; // Fundamental, Octave, Perfect Fifth
      const oscs = [];

      freqs.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        osc.type = index === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        if (index > 0) {
          osc.detune.setValueAtTime((index === 1 ? 4 : -4), ctx.currentTime);
        }
        
        osc.connect(filter);
        osc.start(0);
        oscs.push(osc);
      });

      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.2, ctx.currentTime);
      
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(100, ctx.currentTime);
      
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start(0);

      oscillatorsRef.current = [...oscs, lfo];
    } catch (e) {
      console.warn("Failed to initialize Web Audio API:", e);
    }
  };

  const stopAudio = () => {
    try {
      const ctx = audioCtxRef.current;
      const gainNode = gainNodeRef.current;
      const oscs = oscillatorsRef.current;

      if (ctx && gainNode) {
        gainNode.gain.setValueAtTime(gainNode.gain.value, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.0);
        
        setTimeout(() => {
          oscs.forEach(osc => {
            try { osc.stop(); } catch (err) {}
          });
          try { ctx.close(); } catch (err) {}
          
          if (audioCtxRef.current === ctx) {
            audioCtxRef.current = null;
            gainNodeRef.current = null;
            oscillatorsRef.current = [];
          }
        }, 1100);
      }
    } catch (e) {
      console.warn("Error stopping Web Audio:", e);
    }
  };

  // Animate sound waves and control sound play
  useEffect(() => {
    let interval;
    if (isPlaying) {
      startAudio();
      interval = setInterval(() => {
        setWaveHeightMultiplier(Math.random() * 1.5 + 0.5);
      }, 1500);
    } else {
      stopAudio();
      setWaveHeightMultiplier(1);
    }
    return () => {
      clearInterval(interval);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        const currentCtx = audioCtxRef.current;
        oscillatorsRef.current.forEach(osc => {
          try { osc.stop(); } catch (err) {}
        });
        try { currentCtx.close(); } catch (err) {}
      }
    };
  }, [isPlaying]);

  return (
    <section className="relative py-12 sm:py-20 bg-gradient-to-b from-[#120502] via-[#2A0D04] to-[#120502] text-white overflow-hidden">
      
      {/* Background Mandala overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03] text-gold pointer-events-none">
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
            Quantum Sound &amp; Vedic Science
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            The Scientific Power of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD95A] to-[#F5A623] star-glow">
              Gayatri Mantra
            </span>
          </h2>
          <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-[#FFD95A] to-[#F5A623] mb-5" />
          <p className="text-white/70 text-sm sm:text-base leading-relaxed font-semibold">
            Vedic chanting is not just belief; it is a physical and biological energy grid. Chanting the Gayatri Mantra generates 110,000 distinct sound wave frequencies per second, triggering profound neural and hormonal shifts in your body.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* 1. Left Panel: Rotating Mandala & Audio Wave (5 Cols) */}
          <div className="lg:col-span-5 glass-card rounded-[2.5rem] p-6 sm:p-8 border border-white/10 flex flex-col justify-between items-center text-center relative overflow-hidden">
            
            {/* Spinning decorative solar background */}
            <div className="absolute w-64 h-64 rounded-full border border-dashed border-[#FFD95A]/5 animate-spin" style={{ animationDuration: '40s' }} />
            
            {/* Pulsing Sun Globe */}
            <div className="relative w-44 h-44 rounded-full bg-gradient-to-tr from-[#E25822]/15 to-[#FFD95A]/15 flex items-center justify-center p-2 mt-4 animate-float-slow">
              {/* Rotating Solar Rays */}
              <div 
                className={`absolute inset-0 rounded-full border-2 border-dashed border-[#FFD95A]/20 transition-all duration-1000 ${isPlaying ? 'rotate-180 scale-110 border-[#E25822]/40' : ''}`}
                style={{ transform: isPlaying ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
              
              <div className="w-36 h-36 rounded-full bg-[#2A0D04] flex flex-col items-center justify-center border-2 border-[#FFD95A]/50 shadow-2xl relative">
                <Sun className={`w-14 h-14 text-[#FFD95A] ${isPlaying ? 'scale-110 animate-pulse text-[#E25822]' : 'scale-100'} transition-all duration-500`} />
                <span className="text-[10px] font-black uppercase text-[#FFD95A] tracking-widest mt-2">Savita Solar</span>
                <span className="text-[8px] text-white/50 tracking-wider">110,000 Waves/s</span>
              </div>
            </div>

            {/* Sound Wave Animation */}
            <div className="w-full space-y-4 my-6">
              <div className="h-16 flex items-center justify-center gap-1">
                {[20, 32, 45, 28, 55, 64, 40, 15, 38, 48, 52, 60, 34, 44, 25, 50, 42, 30, 22].map((height, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-[#E25822] to-[#FFD95A] rounded-full transition-all duration-150"
                    style={{
                      height: isPlaying 
                        ? `${Math.max(4, Math.min(64, height * waveHeightMultiplier * (i % 2 === 0 ? 1.2 : 0.8)))}px`
                        : '8px'
                    }}
                  />
                ))}
              </div>

              {/* Mantra Audio Control Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FFD95A] to-[#F5A623] hover:brightness-110 text-[#2A0D04] font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-[#FFD95A]/20 cursor-pointer active:scale-95"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-[#2A0D04]" /> Stop sound resonance
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-[#2A0D04]" /> Simulate sound resonance
                  </>
                )}
              </button>
            </div>

            <div className="bg-[#120502]/60 border border-white/5 rounded-2xl p-4 w-full">
              <span className="text-[9px] font-black text-[#FFD95A] tracking-wider uppercase block mb-1">Resonating Mantra</span>
              <p className="font-serif text-sm leading-relaxed text-white font-medium">
                ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥
              </p>
              <p className="text-[10px] text-white/50 font-bold mt-2">
                "OM Bhur Bhuvah Svah, Tat Savitur Varenyam..."
              </p>
            </div>

          </div>

          {/* 2. Middle Panel: Interactive Syllable gland mapping (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            
            {/* Interactive Syllables Box */}
            <div className="glass-card rounded-[2.5rem] p-6 sm:p-8 border border-white/10 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-5 h-5 text-[#FFD95A]" />
                  <h3 className="font-serif text-lg font-black text-white">Syllable Gland Activation Grid</h3>
                </div>
                <p className="text-white/60 text-xs font-semibold mb-6">
                  Each of the 24 syllables of the Gayatri Mantra acts as a key to turn on a corresponding gland in the endocrine and autonomic systems. Click a syllable below to view its specific biological impact:
                </p>

                {/* Syllable Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-4 gap-2.5 mb-6">
                  {SYLLABLE_GLANDS.map((item, idx) => {
                    const isSelected = selectedSyllable.syllable === item.syllable;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedSyllable(item)}
                        className={`py-3 px-1 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? 'bg-[#E25822]/80 border-[#FFD95A] text-white scale-[1.03] shadow-md shadow-[#E25822]/20'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/80'
                        }`}
                      >
                        <span className="block text-xs font-black tracking-wide">{item.syllable}</span>
                        <span className="block text-[8px] opacity-60 font-semibold mt-0.5">{item.energy}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Syllable Details Display */}
              <div className="bg-[#120502]/70 border border-white/10 rounded-2xl p-4 sm:p-5 flex items-start gap-4 animate-fade-in">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD95A] to-[#F5A623] text-[#2A0D04] flex items-center justify-center flex-shrink-0 font-black text-base shadow-md">
                  {selectedSyllable.syllable[0]}
                </div>
                <div className="text-left space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                    <span className="text-xs font-black text-[#FFD95A] uppercase tracking-wide">Syllable: {selectedSyllable.syllable}</span>
                    <span className="hidden sm:inline text-white/30 text-xs">|</span>
                    <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Gland: {selectedSyllable.gland}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white/90">Energy Shodhan: {selectedSyllable.energy}</h4>
                  <p className="text-[11px] sm:text-xs text-white/60 leading-relaxed font-semibold">
                    {selectedSyllable.impact}
                  </p>
                </div>
              </div>
            </div>

            {/* Scientific Tabs Panel */}
            <div className="glass-card rounded-[2.5rem] p-6 sm:p-8 border border-white/10">
              {/* Tab Navigation */}
              <div className="flex border-b border-white/10 gap-2 mb-6 overflow-x-auto no-scrollbar">
                {[
                  { id: 'gaba', label: 'GABA HORMONES', icon: Brain },
                  { id: 'alpha', label: 'ALPHA MIND STATE', icon: Sun },
                  { id: 'vagus', label: 'VAGUS NERVE CALM', icon: Heart }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 pb-3.5 px-1 border-b-2 font-black text-[10px] sm:text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'border-[#FFD95A] text-[#FFD95A]'
                          : 'border-transparent text-white/40 hover:text-white/70'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Display */}
              <div className="min-h-[100px] text-left animate-fade-in">
                {activeTab === 'gaba' && (
                  <div className="space-y-2">
                    <h4 className="text-[#FFD95A] font-serif text-sm sm:text-base font-extrabold flex items-center gap-1.5">
                      <Brain className="w-4 h-4" /> Neural Transmitter Stimulation
                    </h4>
                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-semibold">
                      Chanting the specific sound phonetics of the Gayatri Mantra vibrates the hard palate, activating the adjacent pituitary gland. Medical research confirms that rhythmic Vedic chanting increases the release of <strong>GABA (Gamma-Aminobutyric Acid)</strong>. GABA is the primary inhibitory neurotransmitter that filters out excessive mental noise, reduces stress, and stops overthinking.
                    </p>
                  </div>
                )}
                {activeTab === 'alpha' && (
                  <div className="space-y-2">
                    <h4 className="text-[#FFD95A] font-serif text-sm sm:text-base font-extrabold flex items-center gap-1.5">
                      <Sun className="w-4 h-4" /> 8-12Hz Subconscious Gateway
                    </h4>
                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-semibold">
                      Chanting slow, rhythmic mantras with breath control naturally shifts brainwave patterns from high-frequency alert Beta waves down to relaxed, coherent <strong>Alpha and Theta waves (8-12 Hz)</strong>. This state opens the gateway to your subconscious mind, making it exceptionally receptive to positive visualization, memory consolidation, and deep manifestation coding.
                    </p>
                  </div>
                )}
                {activeTab === 'vagus' && (
                  <div className="space-y-2">
                    <h4 className="text-[#FFD95A] font-serif text-sm sm:text-base font-extrabold flex items-center gap-1.5">
                      <Heart className="w-4 h-4" /> Parasympathetic Nervous Response
                    </h4>
                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-semibold">
                      The vocal chord vibrations generated during Gayatri chanting stimulate the <strong>Vagus Nerve</strong>, which runs through the throat, lungs, and heart. Activating the vagus nerve signals the autonomic nervous system to exit the fight-or-flight stress mode and enter the parasympathetic rest-and-digest mode, slowing down the pulse rate and restoring biological harmony.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
