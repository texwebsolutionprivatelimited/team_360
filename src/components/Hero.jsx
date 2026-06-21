import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ddSharmaPortrait from '../assets/dd_sharma_portrait.jpg';
import gayatriSunImg from '../assets/gayatri_sun.png';
import shreeVidyaImg from '../assets/shree_vidya_mandala.png';
import subconsciousImg from '../assets/subconscious_mind_alpha.png';
import waterEnergizingImg from '../assets/water_energizing.png';
import signatureProgramArt from '../assets/signature_program_art.png';
import gayatriMentorshipArt from '../assets/gayatri_mentorship_art.png';

export default function Hero({ onOpenModal }) {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState('g'); // 'g' (D.D. Sharma) active by default

  const panels = [
    {
      id: 'm',
      title: 'Mentor & Center Program',
      letter: 'T',
      desc: 'Become a Certified Mentor, Trainer & Authorized Center Leader. Learn center leadership, diksha authorization, and group sadhana facilitation.',
      image: shreeVidyaImg,
      path: '/courses/mentors-training-program',
      icons: (
        <svg className="w-16 h-40 filter drop-shadow-[0_0_8px_rgba(255,217,90,0.8)]" viewBox="0 0 100 240" xmlns="http://www.w3.org/2000/svg">
          {/* Sacred geometry feel */}
          <circle cx="50" cy="120" r="30" fill="none" stroke="#FFD95A" strokeWidth="2" />
          <polygon points="50,90 76,135 24,135" fill="none" stroke="#FFD95A" strokeWidth="2" />
          <polygon points="50,150 76,105 24,105" fill="none" stroke="#FFD95A" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 't',
      title: 'Trainer Program',
      letter: 'E',
      desc: 'Become a Certified Trainer with D.D. Sharma Ji. Includes complete Signature Program mastery, 5 elements awakening, and motivational school speaker opportunities.',
      image: subconsciousImg,
      path: '/courses/trainers-training-program',
      icons: (
        <svg className="w-16 h-40 filter drop-shadow-[0_0_8px_rgba(255,217,90,0.8)]" viewBox="0 0 100 240" xmlns="http://www.w3.org/2000/svg">
          {/* Mind/Brain glow symbol */}
          <path d="M50 80 C35 80, 25 90, 25 105 C25 120, 35 125, 45 130 C48 132, 50 135, 50 140 L50 150 L40 150 L40 160 L60 160 L60 150 L50 150 L50 140 C50 135, 52 132, 55 130 C65 125, 75 120, 75 105 C75 90, 65 80, 50 80 Z" fill="none" stroke="#FFD95A" strokeWidth="2.5" />
          <circle cx="50" cy="105" r="8" fill="none" stroke="#FFD95A" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'g',
      title: 'D.D. Sharma Ji',
      letter: 'A',
      desc: 'Founder of Team 360 & Peak Mind Trainer. Empowerment guide helping thousands unlock sub-conscious alpha levels.',
      image: ddSharmaPortrait,
      path: '/about',
      icons: null // Focus on the teacher profile portrait
    },
    {
      id: 'y',
      title: 'Gayatri Mentorship Program',
      letter: 'M',
      desc: 'Become a Certified Gayatri Mentor. Wake up the 24 quantum energy powers, master Yagya therapy, and learn Diksha authorization.',
      image: gayatriMentorshipArt,
      path: '/courses/gayatri-mentorship-program',
      icons: (
        <svg className="w-16 h-40 filter drop-shadow-[0_0_8px_rgba(255,217,90,0.8)]" viewBox="0 0 100 240" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="120" r="24" fill="none" stroke="#FFD95A" strokeWidth="2" />
          <circle cx="50" cy="120" r="14" fill="none" stroke="#FFD95A" strokeWidth="1.5" />
          <line x1="50" y1="88" x2="50" y2="94" stroke="#FFD95A" strokeWidth="2" />
          <line x1="50" y1="146" x2="50" y2="152" stroke="#FFD95A" strokeWidth="2" />
          <line x1="18" y1="120" x2="24" y2="120" stroke="#FFD95A" strokeWidth="2" />
          <line x1="76" y1="120" x2="82" y2="120" stroke="#FFD95A" strokeWidth="2" />
          <line x1="28" y1="98" x2="33" y2="103" stroke="#FFD95A" strokeWidth="1.5" />
          <line x1="72" y1="142" x2="67" y2="137" stroke="#FFD95A" strokeWidth="1.5" />
          <line x1="28" y1="142" x2="33" y2="137" stroke="#FFD95A" strokeWidth="1.5" />
          <line x1="72" y1="98" x2="67" y2="103" stroke="#FFD95A" strokeWidth="1.5" />
        </svg>
      )
    },
    {
      id: 's',
      title: 'Introductory & Signature Program',
      letter: 'S',
      desc: '3 Days Live Online & Offline (Jaipur) Workshop. Reprogram subconscious mind, activate 9 energy chakras, and learn Alpha state scripting.',
      image: signatureProgramArt,
      path: '/courses/signature-program',
      icons: (
        <svg className="w-24 h-40 filter drop-shadow-[0_0_8px_rgba(255,217,90,0.8)]" viewBox="0 0 120 240" xmlns="http://www.w3.org/2000/svg">
          {/* Sunburst glowing arrow */}
          <path d="M60 180 L60 60" stroke="#FFD95A" strokeWidth="3" strokeLinecap="round" />
          <path d="M45 75 L60 60 L75 75" fill="none" stroke="#FFD95A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="60" cy="120" r="16" fill="none" stroke="#FFD95A" strokeWidth="2.5" />
        </svg>
      )
    }
  ];

  const desktopPanels = panels;
  const mobilePanels = panels;

  return (
    <>
      <style>{`
        @keyframes marquee-sanskrit {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-sanskrit {
          display: flex;
          width: max-content;
          animation: marquee-sanskrit 50s linear infinite;
        }
        @keyframes marquee-hindi-opposite {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-hindi-opposite {
          display: flex;
          width: max-content;
          animation: marquee-hindi-opposite 65s linear infinite;
        }
        .collapsed-title {
          writing-mode: horizontal-tb;
          transform: none;
          white-space: nowrap;
        }
        @media (min-width: 768px) {
          .collapsed-title {
            writing-mode: vertical-rl;
            transform: rotate(180deg);
          }
        }
      `}</style>

      {/* ─── DESKTOP/LAPTOP VERSION (100% Original Layout & Titles) ─── */}
      <section className="hidden lg:flex relative w-full h-[calc(100vh-64px)] mt-[64px] flex-row overflow-hidden bg-cosmic-darkest">
        {desktopPanels.map((p) => (
          <div
            key={p.id}
            className="relative w-1/5 h-full flex flex-col justify-end p-4 sm:p-6 pb-8 sm:pb-12 text-center group border-r border-white/5 transition-all duration-700 hover:w-[28%] overflow-hidden cursor-pointer"
            onClick={() => navigate(p.path)}
          >
            {/* Panel Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover filter brightness-[0.35] group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
              />
              {/* Rich dark overlay gradient for maximum text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20"></div>
            </div>

            {/* Central Neon Icons Overlay */}
            {p.icons && (
              <div className="absolute inset-0 flex items-center justify-center pb-24 z-10 pointer-events-none group-hover:scale-105 transition-transform duration-700">
                {p.icons}
              </div>
            )}

            {/* Bottom Text and Labels */}
            <div className="relative z-10 flex flex-col items-center justify-end space-y-2 mt-auto">
              {/* Title & Abbreviation */}
              <h3 className="font-serif text-lg sm:text-2xl font-extrabold text-white tracking-wide leading-tight group-hover:text-gold transition-colors duration-300">
                {p.title}
              </h3>

              <span className="font-serif text-lg font-bold text-gold tracking-widest block">
                ({p.letter})
              </span>

              {/* Description Paragraph */}
              <p className="text-[11px] text-white/95 font-medium leading-relaxed max-w-[240px] mx-auto mt-2">
                {p.desc}
              </p>
            </div>

            {/* Golden Hover Indicator Bar at the bottom */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-gold/50 via-gold to-gold/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
          </div>
        ))}
      </section>

      {/* ─── MOBILE/TABLET VERSION (Interactive Tab Accordion & M.A.G.I.C. Pillars) ─── */}
      <section className="relative w-full h-[46vh] min-h-[300px] md:h-[58vh] md:min-h-[420px] mt-[46px] flex lg:hidden flex-row overflow-hidden bg-[#1E003B]">
        {mobilePanels.map((p) => {
          const isActive = activeId === p.id;
          return (
            <div
              key={p.id}
              onMouseEnter={() => setActiveId(p.id)}
              onClick={(e) => {
                if (activeId !== p.id) {
                  e.preventDefault();
                  setActiveId(p.id);
                } else {
                  navigate(p.path);
                }
              }}
              className={`relative flex flex-col justify-end text-center transition-all duration-700 ease-out cursor-pointer overflow-hidden border-r border-white/5 last:border-r-0 ${
                isActive ? 'p-2 sm:p-4 pb-5 sm:pb-12' : 'px-0.5 sm:px-4 py-2 sm:py-4 pb-5 sm:pb-12'
              }`}
              style={{
                flexGrow: isActive ? 5.2 : 0.6,
                flexShrink: 1,
                flexBasis: '0%',
              }}
            >
              {/* Panel Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={p.image}
                  alt={p.title}
                  className={`w-full h-full object-cover filter transition-all duration-700 ease-out ${isActive ? 'brightness-[0.75] scale-105' : 'brightness-[0.25] scale-100'
                    }`}
                />
                {/* Rich dark overlay gradient for maximum text contrast */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/10 transition-opacity duration-700 ease-out ${isActive ? 'opacity-90' : 'opacity-65'
                  }`}></div>
              </div>

              {/* Central Neon Icons Overlay */}
              {p.icons && (
                <div className={`absolute inset-0 flex items-center justify-center pb-24 z-10 pointer-events-none transition-all duration-700 ease-out ${isActive ? 'opacity-100 scale-100' : 'opacity-20 scale-75'
                  }`}>
                  {p.icons}
                </div>
              )}

              {/* Bottom Text and Labels */}
              <div className="relative z-10 flex flex-col items-center justify-end h-full w-full mt-auto">
                {isActive ? (
                  // Expanded Active Content Layout
                  <div className="flex flex-col items-center space-y-2 animate-fade-in w-full px-1.5 pb-4 sm:pb-12">
                    <h3 className="font-serif text-[10px] sm:text-xl md:text-2xl font-extrabold text-white tracking-wide leading-tight group-hover:text-gold transition-colors duration-300">
                      {p.title}
                    </h3>
                    <span className="font-serif text-[10px] sm:text-lg font-bold text-gold tracking-widest block">
                      ({p.letter})
                    </span>
                    <p className="text-[8.5px] sm:text-xs text-white/90 font-medium leading-snug sm:leading-relaxed max-w-[200px] mx-auto mt-1">
                      {p.desc}
                    </p>
                  </div>
                ) : (
                  // Collapsed Inactive Content Layout (Vertical Rotation) - Aligned to bottom (justify-end)
                  <div className="flex flex-col items-center justify-end space-y-4 h-full animate-fade-in select-none w-full pb-2 sm:pb-4">
                    <div className="w-full flex justify-center items-center">
                      <div 
                        className="font-serif text-[8.5px] sm:text-base font-bold text-white/70 tracking-widest uppercase text-center"
                        style={{
                          writingMode: 'vertical-rl',
                          transform: 'rotate(180deg)',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {p.title}
                      </div>
                    </div>
                    <span className="font-serif text-[10px] sm:text-sm font-extrabold text-gold/60 tracking-widest block text-center">
                      ({p.letter})
                    </span>
                  </div>
                )}
              </div>

              {/* Golden Active Indicator Bar at the bottom */}
              <div className={`absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-gold/50 via-gold to-gold/50 transition-transform duration-500 origin-center ${isActive ? 'scale-x-100' : 'scale-x-0'
                }`}></div>

            </div>
          );
        })}
      </section>

      {/* Unified Marquee Divider Banners (Sanskrit & Hindi Translation in Opposite Directions) */}
      <div className="w-full bg-[#1A002C] py-3.5 border-y border-[#FFD95A]/20 overflow-hidden relative z-20 shadow-[0_4px_20px_rgba(0,0,0,0.4)] space-y-2.5">
        {/* Sanskrit - Right to Left */}
        <div className="animate-marquee-sanskrit gap-8 text-[10px] sm:text-xs font-serif font-bold tracking-widest text-[#FFD95A]/80 uppercase">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="mx-4 whitespace-nowrap">
              ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥
            </span>
          ))}
        </div>
        
        {/* Divider Line */}
        <div className="h-[1px] w-full bg-[#FFD95A]/10" />

        {/* Hindi Translation - Left to Right (Opposite Direction) */}
        <div className="animate-marquee-hindi-opposite gap-8 text-[10px] sm:text-xs font-serif font-bold tracking-widest text-[#FFD95A]/80">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="mx-4 whitespace-nowrap">
              मैं प्राण स्वरूप, दुःख नाशक, सुख स्वरूप, तेजस्वी, श्रेष्ठ, पाप नाशक, व दिव्य इन गुणों का मैं चिंतन करता हूँ व धारण करता हूँ, यह गुण मेरी बुद्धि को प्रखर व निश्चयात्मक बनाते हैं।
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
