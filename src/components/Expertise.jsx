import React from 'react';
import { Sparkles, Trophy, Award, Star, Users } from 'lucide-react';

// Import local premium AI-generated artworks
import mahaLaxmiImg from '../assets/maha_laxmi_wealth.png';
import angelicHealingImg from '../assets/angelic_healing.png';
import unicornHealingImg from '../assets/unicorn_healing.png';
import dragonProtectionImg from '../assets/dragon_protection.png';
import akashicRecordsImg from '../assets/akashic_records.png';
import kundaliniKriyaImg from '../assets/kundalini_kriya.png';
import saraswatiWisdomImg from '../assets/saraswati_wisdom.png';
import kaliProtectionImg from '../assets/kali_protection.png';
import pranayamaBreathImg from '../assets/pranayama_breath.png';
import ancestralKarmaImg from '../assets/ancestral_karma.png';
import auraShieldImg from '../assets/aura_shield.png';
import ddSharmaPortrait from '../assets/dd_sharma_portrait.jpg';
import gayatriSunImg from '../assets/gayatri_sun.png';
import shreeVidyaImg from '../assets/shree_vidya_mandala.png';
import subconsciousImg from '../assets/subconscious_mind_alpha.png';
import waterEnergizingImg from '../assets/water_energizing.png';
import signatureProgramArt from '../assets/signature_program_art.png';
import gayatriMentorshipArt from '../assets/gayatri_mentorship_art.png';

export default function Expertise({ onOpenModal }) {
  const expertiseItems = [
    {
      title: 'Gayatri Mantra & GABA Hormones',
      image: gayatriSunImg,
      cta: 'Explore Science'
    },
    {
      title: 'Shree Vidya & 9 Chakras Activation',
      image: shreeVidyaImg,
      cta: 'Join Workshop'
    },
    {
      title: 'Subconscious Reprogramming Secrets',
      image: subconsciousImg,
      cta: 'Explore Program'
    },
    {
      title: 'Swar Vigyan & Breath Mastery',
      image: pranayamaBreathImg,
      cta: 'Join Workshop'
    },
    {
      title: 'Water Energizing Abundance Technique',
      image: waterEnergizingImg,
      cta: 'Explore Science'
    },
    {
      title: 'Mentor & Center Program',
      image: shreeVidyaImg,
      cta: 'Join Program'
    },
    {
      title: 'Gayatri Mentorship Program',
      image: gayatriMentorshipArt,
      cta: 'Join Program'
    },
    {
      title: 'Trainer Program',
      image: subconsciousImg,
      cta: 'Join Program'
    },
    {
      title: 'Introductory & Signature Program',
      image: signatureProgramArt,
      cta: 'Join Program'
    },
    {
      title: 'Alpha State Meditation Activation',
      image: subconsciousImg,
      cta: 'Book Session'
    },
    {
      title: 'Peak Performance & Leadership',
      image: shreeVidyaImg,
      cta: 'Explore Course'
    },
    {
      title: '1-on-1 Personal Mind Counseling',
      image: ddSharmaPortrait,
      cta: 'Book Session'
    },
    {
      title: 'Brain Optimization & Memory Mastery',
      image: subconsciousImg,
      cta: 'Join Workshop'
    }
  ];

  const getWhatsAppLink = (title, cta) => {
    const msg = `Hello Team 360! I would like to enquire about: *${title}* (${cta}). Please share the booking details and schedule!`;
    return `https://wa.me/916376779062?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="expertise" className="relative pt-6 sm:pt-8 lg:pt-16 pb-8 bg-[#FFF5EE] text-gray-900 overflow-hidden">

      {/* Self-contained style tag for infinite marquee animation */}
      <style>{`
        @keyframes marquee-rtl {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-rtl {
          display: flex;
          width: max-content;
          animation: marquee-rtl 45s linear infinite;
        }
        .marquee-container:hover .animate-marquee-rtl {
          animation-play-state: paused;
        }
      `}</style>

      {/* 🏆 Honors & Achievements Section */}
      <div className="max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8 relative z-10 mb-10 sm:mb-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          <span className="text-[10px] xs:text-xs font-bold tracking-widest text-[#6B2D17] uppercase block mb-2 sm:mb-3 flex items-center justify-center gap-1.5 animate-tagline-blink">
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6B2D17]" />
            Global Accolades & Milestones
          </span>
          <h2 className="font-serif text-[21px] xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2A0D04] mb-3">
            Honors &amp; Recognitions
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#2A0D04] to-[#6B2D17] mx-auto rounded-full"></div>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-semibold mt-3 max-w-2xl mx-auto">
            Under D.D. Sharma Ji's direction, Team 360 has been recognized globally for research and execution in subconscious training and child brain development.
          </p>
        </div>

        {/* Accolades Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              icon: <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD95A]" />,
              title: "Burj CEO Award (Dubai)",
              desc: "Honored internationally in Dubai for outstanding contribution to global education and brain empowerment training."
            },
            {
              icon: <Star className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD95A] fill-[#FFD95A]/15" />,
              title: "Gold Star Award (USA)",
              desc: "Awarded the prestigious USA Gold Star for innovative research and coaching in subconscious mind control and Alpha reconditioning."
            },
            {
              icon: <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD95A]" />,
              title: "940+ National Franchises",
              desc: "Set a nationwide record by establishing over 940 successful brain training and DMIT franchises across India."
            },
            {
              icon: <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFD95A]" />,
              title: "32+ Years as Senior Gov. Officer",
              desc: "Retired senior government officer with over 32 years of service, dedicating his life to training and empowering seekers globally."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#2A0D04] via-[#6B2D17] to-[#120502] text-white rounded-2xl sm:rounded-[2rem] p-5 sm:p-6 border-2 border-amber-500/20 shadow-xl relative overflow-hidden group hover:border-[#FFD95A]/50 transition-all duration-300"
            >
              {/* Decorative light reflection on hover */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-[2.5rem] pointer-events-none group-hover:scale-110 transition-transform" />

              {/* Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mb-3 sm:mb-4 shadow-inner">
                {item.icon}
              </div>

              {/* Title & Desc */}
              <h3 className="font-serif font-black text-xs sm:text-sm md:text-base text-[#FFD95A] mb-1.5 leading-tight">
                {item.title}
              </h3>
              <p className="text-[10px] sm:text-xs text-white/70 font-semibold leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-3">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-[#6B2D17] uppercase block mb-3 flex items-center justify-center gap-1.5 animate-tagline-blink">
            <Sparkles className="w-4 h-4 text-[#6B2D17]" />
            Areas of Mastery & Growth
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2A0D04] mb-4">
            Pillars of Growth
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#2A0D04] to-[#6B2D17] mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Marquee Container wrapping the single row, restricted to max-w-[95%] and centered */}
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 marquee-container overflow-hidden relative">

        {/* Single Row: Right to Left */}
        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee-rtl gap-6 py-4">
            {/* Render items twice for seamless loop */}
            {[...expertiseItems, ...expertiseItems].map((exp, idx) => {
              const waLink = getWhatsAppLink(exp.title, exp.cta);
              return (
                <a
                  key={idx}
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-60 h-[17.5rem] sm:w-64 sm:h-[18.5rem] rounded-[28px] border border-white/15 flex flex-col justify-end p-5 shadow-md hover:shadow-[0_15px_35px_rgba(107,23,54,0.25)] hover:-translate-y-1.5 transition-all duration-500 flex-shrink-0 overflow-hidden cursor-pointer"
                >
                  {/* Full Bleed Background Image */}
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.72] group-hover:brightness-[0.92] group-hover:scale-108 transition-all duration-700 ease-out"
                  />

                  {/* Rich Gradient Overlay for maximum text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10" />

                  {/* Elegant Sparkle Icon Badge appearing on hover */}
                  <div className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm z-20">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFD95A]" />
                  </div>

                  {/* Card Content Overlay */}
                  <div className="relative z-20 space-y-3.5 text-left">
                    {/* Title */}
                    <h3 className="font-serif font-extrabold text-white group-hover:text-[#FFD95A] text-center text-xs sm:text-sm leading-snug line-clamp-2 px-1 transition-colors duration-300">
                      {exp.title}
                    </h3>

                    {/* Action Button */}
                    <div
                      className="w-full bg-[#FFD95A] text-[#6B2D17] hover:bg-white hover:text-[#6B2D17] font-bold py-2.5 px-4 rounded-xl text-[10px] tracking-wider uppercase transition-all duration-300 transform active:scale-95 shadow-md border border-transparent text-center block"
                    >
                      {exp.cta}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

      </div>

    </section>
  );
}
