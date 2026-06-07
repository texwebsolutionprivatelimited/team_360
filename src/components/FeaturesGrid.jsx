import React, { useState } from 'react';
import logoImg from '../assets/logo.jpg';
import { 
  Sparkles, Sun, Wind, Flame, Brain, GlassWater, 
  Heart, TrendingUp, Target, PenTool, Eye, SunDim 
} from 'lucide-react';

const leftFeatures = [
  { title: 'Gayatri Quantum Science',     sub: 'GABA Hormone & Mind Calming', icon: <Sun className="w-5 h-5" /> },
  { title: 'Swar Vigyan Breath Science',  sub: 'Ida & Pingala Nostril Balance', icon: <Wind className="w-5 h-5" /> },
  { title: 'Panch Mahabhuta Shodhan',     sub: 'Five Sacred Elements Purifying', icon: <Flame className="w-5 h-5" /> },
  { title: '9 Urja Chakras Activation',   sub: 'Kundalini Awakening Aura', icon: <Sparkles className="w-5 h-5" /> },
  { title: 'Subconscious Reconditioning',  sub: 'Mirror Work & Memory Erasure', icon: <Brain className="w-5 h-5" /> },
  { title: 'Water Glass Manifestation',   sub: 'Vibrational Mind Reprogramming', icon: <GlassWater className="w-5 h-5" /> },
];

const rightFeatures = [
  { title: '111 Soham Meditation',        sub: 'Cosmic Resonance Breathing', icon: <Heart className="w-5 h-5" /> },
  { title: 'Conscious Evolution Scale',   sub: 'Consciousness 20 to 700 Cal', icon: <TrendingUp className="w-5 h-5" /> },
  { title: '27 Days RAS Activation',      sub: 'Reticular Activating Focus', icon: <Target className="w-5 h-5" /> },
  { title: 'Identity Notebook Writing',   sub: 'New Self-Image Scripting', icon: <PenTool className="w-5 h-5" /> },
  { title: 'Sixth Sense Awakening',       sub: 'Intuition & ESP Training', icon: <Eye className="w-5 h-5" /> },
  { title: 'Savita Solar Meditation',     sub: 'Solar Ray Brain Activation', icon: <SunDim className="w-5 h-5" /> },
];

// Card vertical centers inside a 540px-high flex-column with justify-around
const cardY = [45, 135, 225, 315, 405, 495];
const CX = 500; // center X in 1000-wide viewBox
const CY = 270; // center Y in 540-high viewBox
const LX = 332; // right edge of left column (33% of 1000)
const RX = 668; // left edge of right column (67% of 1000)

// Bezier curve: left card right-edge → center
const leftPaths = cardY.map(y => `M ${LX},${y} C ${LX + 100},${y} ${CX - 100},${CY} ${CX},${CY}`);
// Bezier curve: center → right card left-edge
const rightPaths = cardY.map(y => `M ${CX},${CY} C ${CX + 100},${CY} ${RX - 100},${y} ${RX},${y}`);

export default function FeaturesGrid() {
  const [hoveredCard, setHoveredCard] = useState(null); // { side: 'left' | 'right', index: number }

  const isAnyHovered = hoveredCard !== null;

  return (
    <section id="features" className="relative pt-8 pb-16 sm:pt-12 sm:pb-20 overflow-hidden bg-gradient-to-b from-[#120502] via-[#2A0D04] to-[#120502]">

      {/* Starfield dots */}
      {[...Array(35)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/20 animate-pulse"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Self-contained slow spin animation for solar rays */}
      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 40s linear infinite;
        }
      `}</style>

      {/* Radial glow behind center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[60%] bg-[#6B2D17]/25 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#FFD95A] uppercase mb-3 animate-tagline-blink">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Spiritual Healing &amp; Energy Activation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            What You Will{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD95A] to-[#F5A623] star-glow">
              Experience &amp; Transform
            </span>
          </h2>
          <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-[#FFD95A] to-[#F5A623] mb-5" />
          <p className="text-white/60 text-sm sm:text-base leading-relaxed font-medium">
            Each session with Devendra Sharma (D.D. Sharma) brings deep energetic shifts — clearing karmic blocks,
            activating abundance codes, and aligning your soul with its highest divine purpose.
          </p>
        </div>

        {/* ─── DESKTOP: SVG Energy Web Layout ─── */}
        <div className="hidden lg:block">
          <div className="relative h-[540px] grid grid-cols-12">

            {/* ── Absolute SVG Overlay ── */}
            <svg
              className="absolute inset-0 w-full h-full z-0 pointer-events-none"
              viewBox="0 0 1000 540"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="glow" x="-35%" y="-35%" width="170%" height="170%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glowActive" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feColorMatrix type="matrix" values="1 0 0 0 1  0 1 0 0 0.6  0 0 1 0 0.2  0 0 0 1 0" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFD95A" stopOpacity="0.4" />
                  <stop offset="60%" stopColor="#E25822" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#E25822" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="leftToCenterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFD95A" />
                  <stop offset="70%" stopColor="#E25822" />
                  <stop offset="100%" stopColor="#D48C37" />
                </linearGradient>
                <linearGradient id="centerToRightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D48C37" />
                  <stop offset="30%" stopColor="#E25822" />
                  <stop offset="100%" stopColor="#FFD95A" />
                </linearGradient>
              </defs>

              {/* Center radial glow */}
              <ellipse cx={CX} cy={CY} rx={isAnyHovered ? "110" : "80"} ry={isAnyHovered ? "110" : "80"} fill="url(#centerGlow)" className="transition-all duration-500" />

              {/* Symmetrical Solar Rays / Mandala background rotating */}
              <g className="animate-spin-slow origin-center" style={{ transformOrigin: '500px 270px', animationDuration: isAnyHovered ? '25s' : '45s' }}>
                <circle cx={CX} cy={CY} r="95" fill="none" stroke="#FFD95A" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
                <circle cx={CX} cy={CY} r="115" fill="none" stroke="#E25822" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.2" />
                {[...Array(12)].map((_, i) => (
                  <line
                    key={i}
                    x1={CX}
                    y1={CY}
                    x2={CX + 140 * Math.cos((i * 30 * Math.PI) / 180)}
                    y2={CY + 140 * Math.sin((i * 30 * Math.PI) / 180)}
                    stroke="#FFD95A"
                    strokeWidth="0.5"
                    opacity="0.2"
                    strokeDasharray="4 4"
                  />
                ))}
              </g>

              {/* LEFT: soft glow duplicate paths */}
              {leftPaths.map((d, i) => {
                const isHovered = hoveredCard && hoveredCard.side === 'left' && hoveredCard.index === i;
                return (
                  <path
                    key={`lg-${i}`}
                    d={d}
                    fill="none"
                    stroke={isHovered ? '#E25822' : '#FFD95A'}
                    strokeWidth={isHovered ? '9' : '4'}
                    opacity={isHovered ? '0.3' : '0.08'}
                    filter={isHovered ? 'url(#glowActive)' : 'url(#glow)'}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* LEFT: animated dashed paths */}
              {leftPaths.map((d, i) => {
                const isHovered = hoveredCard && hoveredCard.side === 'left' && hoveredCard.index === i;
                return (
                  <path
                    key={`lp-${i}`}
                    d={d}
                    fill="none"
                    stroke={isHovered ? 'url(#leftToCenterGrad)' : '#FFD95A'}
                    strokeWidth={isHovered ? '2.5' : '1.2'}
                    strokeDasharray={isHovered ? '5 2' : '6 4'}
                    opacity={isHovered ? '0.95' : '0.45'}
                    className="transition-all duration-300"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="200"
                      to="0"
                      dur={isHovered ? '0.8s' : `${1.8 + i * 0.15}s`}
                      repeatCount="indefinite"
                    />
                  </path>
                );
              })}

              {/* LEFT: traveling glow particles */}
              {leftPaths.map((d, i) => {
                const isHovered = hoveredCard && hoveredCard.side === 'left' && hoveredCard.index === i;
                return (
                  <circle
                    key={`lc-${i}`}
                    r={isHovered ? '6.5' : '4'}
                    fill={isHovered ? '#FFF5EE' : '#FFD95A'}
                    filter="url(#glow)"
                    opacity={isHovered ? '1.0' : '0.85'}
                    className="transition-all duration-300"
                  >
                    <animateMotion
                      dur={isHovered ? '0.9s' : `${2.2 + i * 0.25}s`}
                      repeatCount="indefinite"
                      path={d}
                    />
                  </circle>
                );
              })}

              {/* RIGHT: soft glow duplicate paths */}
              {rightPaths.map((d, i) => {
                const isHovered = hoveredCard && hoveredCard.side === 'right' && hoveredCard.index === i;
                return (
                  <path
                    key={`rg-${i}`}
                    d={d}
                    fill="none"
                    stroke={isHovered ? '#E25822' : '#FFD95A'}
                    strokeWidth={isHovered ? '9' : '4'}
                    opacity={isHovered ? '0.3' : '0.08'}
                    filter={isHovered ? 'url(#glowActive)' : 'url(#glow)'}
                    className="transition-all duration-300"
                  />
                );
              })}

              {/* RIGHT: animated dashed paths */}
              {rightPaths.map((d, i) => {
                const isHovered = hoveredCard && hoveredCard.side === 'right' && hoveredCard.index === i;
                return (
                  <path
                    key={`rp-${i}`}
                    d={d}
                    fill="none"
                    stroke={isHovered ? 'url(#centerToRightGrad)' : '#FFD95A'}
                    strokeWidth={isHovered ? '2.5' : '1.2'}
                    strokeDasharray={isHovered ? '5 2' : '6 4'}
                    opacity={isHovered ? '0.95' : '0.45'}
                    className="transition-all duration-300"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="200"
                      dur={isHovered ? '0.8s' : `${1.8 + i * 0.15}s`}
                      repeatCount="indefinite"
                    />
                  </path>
                );
              })}

              {/* RIGHT: traveling glow particles */}
              {rightPaths.map((d, i) => {
                const isHovered = hoveredCard && hoveredCard.side === 'right' && hoveredCard.index === i;
                return (
                  <circle
                    key={`rc-${i}`}
                    r={isHovered ? '6.5' : '4'}
                    fill={isHovered ? '#FFF5EE' : '#FFD95A'}
                    filter="url(#glow)"
                    opacity={isHovered ? '1.0' : '0.85'}
                    className="transition-all duration-300"
                  >
                    <animateMotion
                      dur={isHovered ? '0.9s' : `${2.2 + i * 0.25}s`}
                      repeatCount="indefinite"
                      path={d}
                    />
                  </circle>
                );
              })}

              {/* Glowing dots at left connection points */}
              {cardY.map((y, i) => {
                const isHovered = hoveredCard && hoveredCard.side === 'left' && hoveredCard.index === i;
                return (
                  <g key={`ld-${i}`}>
                    <circle cx={LX} cy={y} r={isHovered ? "12" : "7"} fill={isHovered ? "#E25822" : "#FFD95A"} opacity={isHovered ? "0.3" : "0.08"} filter="url(#glow)" className="transition-all duration-300" />
                    <circle cx={LX} cy={y} r={isHovered ? "5" : "3.5"} fill={isHovered ? "#FFF" : "#FFD95A"} opacity="0.95" className="transition-all duration-300" />
                  </g>
                );
              })}

              {/* Glowing dots at right connection points */}
              {cardY.map((y, i) => {
                const isHovered = hoveredCard && hoveredCard.side === 'right' && hoveredCard.index === i;
                return (
                  <g key={`rd-${i}`}>
                    <circle cx={RX} cy={y} r={isHovered ? "12" : "7"} fill={isHovered ? "#E25822" : "#FFD95A"} opacity={isHovered ? "0.3" : "0.08"} filter="url(#glow)" className="transition-all duration-300" />
                    <circle cx={RX} cy={y} r={isHovered ? "5" : "3.5"} fill={isHovered ? "#FFF" : "#FFD95A"} opacity="0.95" className="transition-all duration-300" />
                  </g>
                );
              })}

              {/* Center convergence ring */}
              <circle cx={CX} cy={CY} r={isAnyHovered ? "18" : "12"} fill="none" stroke={isAnyHovered ? "#E25822" : "#FFD95A"} strokeWidth={isAnyHovered ? "1.8" : "1"} opacity={isAnyHovered ? "0.8" : "0.3"} className="transition-all duration-300">
                <animate attributeName="r" values={isAnyHovered ? "15;22;15" : "10;16;10"} dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite" />
              </circle>
            </svg>

            {/* ── LEFT Feature Cards ── */}
            <div className="col-span-4 relative z-10 flex flex-col justify-around py-2 pr-6">
              {leftFeatures.map((feat, i) => {
                const isHovered = hoveredCard && hoveredCard.side === 'left' && hoveredCard.index === i;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredCard({ side: 'left', index: i })}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`group flex items-center gap-3.5 px-4 py-3 rounded-2xl
                      backdrop-blur-sm border transition-all duration-300 cursor-pointer ${
                        isHovered 
                          ? 'bg-gradient-to-r from-white/12 to-white/6 border-[#FFD95A] shadow-[0_0_25px_rgba(255,217,90,0.25)] scale-[1.03] -translate-x-1.5' 
                          : 'bg-white/5 border-white/10 hover:border-[#FFD95A]/40 shadow-lg'
                      }`}
                  >
                    <div className={`flex-shrink-0 w-9.5 h-9.5 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                      isHovered 
                        ? 'bg-gradient-to-br from-[#FFF] to-[#FFD95A] text-[#2A0D04] scale-110 shadow-[#FFD95A]/30' 
                        : 'bg-gradient-to-br from-[#FFD95A] to-[#F5A623] text-[#0D0015]'
                    }`}>
                      {feat.icon}
                    </div>
                    <div className="min-w-0">
                      <div className={`text-xs font-bold leading-snug transition-colors duration-300 ${isHovered ? 'text-[#FFD95A]' : 'text-white/90'}`}>
                        {feat.title}
                      </div>
                      <div className={`text-[10px] font-semibold transition-colors duration-300 ${isHovered ? 'text-white/50' : 'text-white/35'}`}>{feat.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── CENTER Logo Orb ── */}
            <div className="col-span-4 relative z-10 flex flex-col items-center justify-center gap-5">
              {/* Spinning decorative rings */}
              <div 
                className={`absolute w-56 h-56 rounded-full border border-dashed border-[#FFD95A]/15 animate-spin transition-all duration-500 ${
                  isAnyHovered ? 'border-[#E25822]/40 scale-105' : 'opacity-60 border-dashed border-[#FFD95A]/10'
                }`} 
                style={{ animationDuration: isAnyHovered ? '18s' : '50s' }} 
              />
              <div 
                className={`absolute w-44 h-44 rounded-full border border-[#FFD95A]/10 animate-spin transition-all duration-500 ${
                  isAnyHovered ? 'border-[#FFD95A]/30 scale-95' : 'opacity-50 border-[#FFD95A]/5'
                }`} 
                style={{ animationDuration: isAnyHovered ? '12s' : '30s', animationDirection: 'reverse' }} 
              />

              {/* Glowing Aura Ring */}
              <div className={`absolute w-36 h-36 rounded-full bg-gradient-to-tr from-[#E25822]/15 to-[#FFD95A]/15 blur-xl transition-all duration-500 ${isAnyHovered ? 'scale-125 opacity-100' : 'scale-100 opacity-60'}`} />

              {/* Logo orb */}
              <div
                className={`relative z-10 p-[3px] rounded-full shadow-2xl transition-all duration-500 ${
                  isAnyHovered ? 'scale-105 shadow-[0_0_35px_rgba(255,217,90,0.45)]' : 'scale-100'
                }`}
                style={{
                  background: isAnyHovered
                    ? 'linear-gradient(135deg, #E25822, #FFD95A, #E25822, #FFF5EE)'
                    : 'linear-gradient(135deg, #FFD95A, #F5A623, #6B2D17, #FFD95A)'
                }}
              >
                <div className="p-2.5 bg-[#2A0D04] rounded-full">
                  <div className="w-28 h-28 rounded-full overflow-hidden ring-2 ring-[#FFD95A]/20 shadow-inner">
                    <img src={logoImg} alt="Team 360" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Label pill */}
              <div className={`relative z-10 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FFD95A] to-[#F5A623] shadow-lg transition-all duration-300 ${isAnyHovered ? 'shadow-[#FFD95A]/30 scale-105' : 'shadow-[#FFD95A]/10'}`}>
                <span className="text-[9px] font-extrabold text-[#0D0015] tracking-widest uppercase flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 animate-pulse" /> Team 360
                </span>
              </div>
            </div>

            {/* ── RIGHT Feature Cards ── */}
            <div className="col-span-4 relative z-10 flex flex-col justify-around py-2 pl-6">
              {rightFeatures.map((feat, i) => {
                const isHovered = hoveredCard && hoveredCard.side === 'right' && hoveredCard.index === i;
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredCard({ side: 'right', index: i })}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`group flex items-center gap-3.5 px-4 py-3 rounded-2xl flex-row-reverse
                      backdrop-blur-sm border transition-all duration-300 cursor-pointer text-right ${
                        isHovered 
                          ? 'bg-gradient-to-r from-white/6 to-white/12 border-[#FFD95A] shadow-[0_0_25px_rgba(255,217,90,0.25)] scale-[1.03] translate-x-1.5' 
                          : 'bg-white/5 border-white/10 hover:border-[#FFD95A]/40 shadow-lg'
                      }`}
                  >
                    <div className={`flex-shrink-0 w-9.5 h-9.5 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                      isHovered 
                        ? 'bg-gradient-to-br from-[#FFF] to-[#FFD95A] text-[#2A0D04] scale-110 shadow-[#FFD95A]/30' 
                        : 'bg-gradient-to-br from-[#FFD95A] to-[#F5A623] text-[#0D0015]'
                    }`}>
                      {feat.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`text-xs font-bold leading-snug transition-colors duration-300 ${isHovered ? 'text-[#FFD95A]' : 'text-white/90'}`}>
                        {feat.title}
                      </div>
                      <div className={`text-[10px] font-semibold transition-colors duration-300 ${isHovered ? 'text-white/50' : 'text-white/35'}`}>{feat.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* ─── MOBILE fallback (Symmetrical 6-Logo-6 Layout for Mobile/Tablet ONLY) ─── */}
        <div className="lg:hidden space-y-8">

          {/* Top 6 Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {leftFeatures.map((feat, i) => (
              <div
                key={i}
                className="group flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FFD95A]/60 hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,217,90,0.15)] cursor-pointer active:scale-[0.98]"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFD95A] to-[#F5A623] text-[#0D0015] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  {feat.icon}
                </div>
                <div>
                  <div className="text-white text-xs font-bold group-hover:text-[#FFD95A] transition-colors duration-300">{feat.title}</div>
                  <div className="text-white/40 text-[10px] font-medium">{feat.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Centered Mobile Logo Orb in the middle */}
          <div className="flex flex-col items-center py-6 relative">
            {/* Pulsing glow background */}
            <div className="absolute w-40 h-40 rounded-full bg-gradient-to-tr from-[#E25822]/10 to-[#FFD95A]/10 blur-xl animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute w-48 h-48 rounded-full border border-dashed border-[#FFD95A]/5 animate-spin" style={{ animationDuration: '30s' }} />
            
            <div className="p-[3px] rounded-full shadow-2xl relative z-10 animate-bounce" style={{ background: 'linear-gradient(135deg, #FFD95A, #F5A623, #6B2D17)', animationDuration: '6s' }}>
              <div className="p-2.5 bg-[#2A0D04] rounded-full">
                <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-[#FFD95A]/10 shadow-inner">
                  <img src={logoImg} alt="Team 360" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            
            <div className="mt-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FFD95A] to-[#F5A623] shadow-lg shadow-[#FFD95A]/10 relative z-10">
              <span className="text-[9px] font-extrabold text-[#0D0015] tracking-widest uppercase flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 animate-pulse" /> Team 360 Mind Training
              </span>
            </div>
          </div>

          {/* Bottom 6 Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rightFeatures.map((feat, i) => (
              <div
                key={i}
                className="group flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FFD95A]/60 hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,217,90,0.15)] cursor-pointer active:scale-[0.98]"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FFD95A] to-[#F5A623] text-[#0D0015] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  {feat.icon}
                </div>
                <div>
                  <div className="text-white text-xs font-bold group-hover:text-[#FFD95A] transition-colors duration-300">{feat.title}</div>
                  <div className="text-white/40 text-[10px] font-medium">{feat.sub}</div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
