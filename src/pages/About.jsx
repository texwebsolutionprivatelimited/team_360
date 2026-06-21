import React from 'react';
import {
  Sparkles, Heart, Star, Shield,
  Compass, Flame, Award, Sun, Zap, Brain, Users
} from 'lucide-react';
import ddSharmaPortrait from '../assets/dd_sharma_portrait.jpg';
import logoImg from '../assets/logo.png';
import anjaliPortrait from '../assets/anjali_ajadiwal.jpg';
import anjuPortrait from '../assets/anju_jangid.jpg';
import hemaPortrait from '../assets/hema_alwani.jpg';
import umaPortrait from '../assets/uma_tailor.jpg';
import vineetPortrait from '../assets/vineet_sharma.jpg';
import vipulPortrait from '../assets/vipul_sharma.png';
import deepakPortrait from '../assets/deepak_shakya.jpg';

// Custom Youtube Icon SVG to avoid lucide-react version export issues
const Youtube = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.002 3.002 0 0 0 2.11 2.108C4.48 20.5 12 20.5 12 20.5s7.52 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function About() {
  const team = [
    {
      name: "Vineet Sharma",
      designation: "Director",
      organization: "TEAM 360",
      image: vineetPortrait
    },
    {
      name: "Vipul Sharma",
      designation: "Director",
      organization: "TEAM 360",
      image: vipulPortrait
    },
    {
      name: "Anjali Ajadiwal",
      designation: "Managing Director",
      organization: "TEAM 360",
      image: anjaliPortrait
    },
    {
      name: "Anju Jangid",
      designation: "Project Director",
      organization: "TEAM 360",
      image: anjuPortrait
    },
    {
      name: "Hema Alwani",
      designation: "Project Manager",
      organization: "TEAM 360",
      image: hemaPortrait
    },
    {
      name: "Uma Tailor",
      designation: "Marketing Manager",
      organization: "TEAM 360",
      image: umaPortrait
    },
    {
      name: "Deepak Shakya",
      designation: "Digital Marketing Manager",
      organization: "TEAM 360",
      image: deepakPortrait
    }
  ];

  const modalities = [
    {
      title: 'Brain Training & Midbrain Activation',
      description: 'Enhance focus, concentration, and memory using advanced sensory exercises and alpha wave sound frequencies to unlock superconscious learning.',
      icon: <Brain className="w-5 h-5 text-amber-500" />,
      tag: 'Mental Excellence'
    },
    {
      title: 'Swar Vigyan & Element Science',
      description: 'Master the ancient science of breath nostrils (Ida, Pingala, Sushumna) and the five base elements (Panch Tatva) to control bodily energy levels.',
      icon: <WindIcon className="w-5 h-5 text-emerald-500" />,
      tag: 'Breath Mastery'
    },
    {
      title: 'Swara Yoga & Cosmic Alignment',
      description: 'Synchronize your daily actions and decisions with biological rhythms and planetary cycles for natural ease and barrier-free success.',
      icon: <Compass className="w-5 h-5 text-rose-500" />,
      tag: 'Cosmic Cycles'
    },
    {
      title: 'Gayatri Quantum Science & GABA Activation',
      description: 'Trigger the production of calming GABA hormones and quiet overthinking by aligning with specific solar resonance and mantra sound waves.',
      icon: <Sun className="w-5 h-5 text-amber-500" />,
      tag: 'Solar Resonance'
    },
    {
      title: 'Subconscious Mind Reprogramming',
      description: 'Utilize the Mirror Technique, Water Glass Technique, and Identity journaling to erase negative habits and program wealth code patterns.',
      icon: <Zap className="w-5 h-5 text-indigo-500" />,
      tag: 'Mind Reconditioning'
    },
    {
      title: '9 Chakras & Kundalini Activation',
      description: 'Activate the nine energy centers and strengthen your auric shield for high-frequency protection and non-verbal positive impact.',
      icon: <Sparkles className="w-5 h-5 text-amber-600" />,
      tag: 'Aura Strengthening'
    }
  ];

  return (
    <div className="pt-16 lg:pt-24 pb-20 min-h-screen bg-[#FFF5EE] relative overflow-hidden">

      {/* Background gradients and visual sparkles */}
      <div className="absolute top-[10%] left-[-15%] w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[50%] h-[50%] rounded-full bg-amber-500/10 blur-[150px] pointer-events-none" />

      {/* Immersive Page Header */}
      <div className="relative pt-4 pb-8 text-center overflow-hidden z-10">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="text-center space-y-3 max-w-3xl mx-auto animate-fade-in">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#6B2D17] uppercase">
              <Award className="w-4 h-4 text-[#6B2D17] animate-pulse" />
              Spiritual Coach & Team 360
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2A0D04] leading-tight">
              Meet Our Founder
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-[#E25822] to-[#6B2D17] mx-auto rounded-full" />
            <p className="text-gray-600 text-xs sm:text-sm font-semibold max-w-2xl mx-auto">
              Meet Devendra Sharma (D.D. Sharma Ji) and our national network of certified trainers dedicated to expanding human consciousness and performance.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-16 lg:space-y-20">

        {/* Profiles Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* Card 1: D.D. Sharma Ji */}
          <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] p-3.5 sm:p-10 border border-amber-100/60 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between relative overflow-hidden group">
            {/* Top decorative glow */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-amber-50/40 rounded-full blur-2xl group-hover:scale-150 transition-all duration-500" />

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Photo Frame */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-[#E25822]/10 shadow-xl flex-shrink-0">
                  <img
                    src={ddSharmaPortrait}
                    alt="Devendra Sharma (D.D. Sharma Ji)"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="text-center sm:text-left space-y-1.5">
                  <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#2A0D04]">
                    Devendra Sharma
                  </h3>
                  <p className="text-[#6B2D17] text-xs sm:text-sm font-black tracking-widest uppercase">
                    Founder & Mind Trainer (D.D. Sharma)
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-0.5 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-gray-600 text-xs sm:text-sm font-medium leading-relaxed">
                <p className="font-bold text-[#2A0D04] text-sm sm:text-base">
                  Devendra Sharma (D.D. Sharma Ji) is a highly respected mind trainer, spiritual guide, and former senior government officer with over 32 years of experience.
                </p>
                <p>
                  Recipient of the Gold Star Award (USA) and the CEO Burj Award (Dubai), he has spent decades integrating the ancient science of Gayatri Quantum Energy, Swar Vigyan, and elements with modern mind training systems like Silva Ultramind and Alpha Mind control.
                </p>
                <p className="italic text-[#6B2D17] bg-amber-50/50 p-4 rounded-2xl border border-amber-100/60 font-semibold">
                  "Peak performance is not a matter of luck; it is a science of reprogramming the subconscious mind, balancing hormones, and aligning with solar frequencies."
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-amber-50 flex flex-col sm:flex-row gap-2 items-center justify-between text-[9px] sm:text-[10px] text-gray-400 font-extrabold tracking-normal sm:tracking-widest uppercase text-center sm:text-left">
              <span>USA Gold Star & Burj Awardee</span>
              <span className="text-[#6B2D17]">Founder</span>
            </div>
          </div>

          {/* Card 2: Team 360 Certified Trainers */}
          <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] p-3.5 sm:p-10 border border-amber-100/60 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between relative overflow-hidden group">
            {/* Top decorative glow */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-amber-50/40 rounded-full blur-2xl group-hover:scale-150 transition-all duration-500" />

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Photo Frame */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-[#E25822]/10 bg-white shadow-xl flex-shrink-0 flex items-center justify-center">
                  <img
                    src={logoImg}
                    alt="Team 360 Network"
                    className="w-full h-full object-contain scale-[1.8] group-hover:scale-[1.95] transition-transform duration-700"
                  />
                </div>
                <div className="text-center sm:text-left space-y-1.5">
                  <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#2A0D04]">
                    Team 360 Network
                  </h3>
                  <p className="text-[#6B2D17] text-xs sm:text-sm font-black tracking-widest uppercase">
                    Authorized Mentors & Speakers
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-0.5 text-amber-500">
                    <Users className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold text-gray-500 ml-1">National Network</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-gray-600 text-xs sm:text-sm font-medium leading-relaxed">
                <p className="font-bold text-[#2A0D04] text-sm sm:text-base">
                  Team 360 is our national community of certified Trainers and authorized Mentors trained directly under D.D. Sharma Ji.
                </p>
                <p>
                  Our trainers are empowered to conduct workshops, deliver motivational speeches in Central Schools, and guide seekers through 15-day and 45-day practice plans. Together, we help communities build focus, confidence, and financial growth.
                </p>
                <p className="italic text-[#6B2D17] bg-amber-50/50 p-4 rounded-2xl border border-amber-100/60 font-semibold">
                  "Our mission is to create thousands of certified leaders who can help others activate their alpha mind state and manifest peak potential."
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-amber-50 flex flex-col sm:flex-row gap-2 items-center justify-between text-[9px] sm:text-[10px] text-gray-400 font-extrabold tracking-normal sm:tracking-widest uppercase text-center sm:text-left">
              <span>National Mentoring Center</span>
              <span className="text-[#6B2D17]">Certified Team</span>
            </div>
          </div>

        </div>

        {/* Core Leadership Team */}
        <div className="space-y-10 pt-10 border-t border-amber-100/40">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#6B2D17] uppercase">
              <Users className="w-4 h-4 text-[#6B2D17]" />
              Core Leadership
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2A0D04]">
              Meet the Pillars of Team 360
            </h3>
            <div className="w-16 h-1 bg-[#6B2D17] mx-auto rounded-full" />
            <p className="text-gray-600 text-xs sm:text-sm font-semibold max-w-2xl mx-auto">
              Our core team members and management executives dedicated to facilitating the smooth operation of Team 360 programs globally.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-4">
            {team.map((member, idx) => (
              <div 
                key={idx} 
                className="w-full max-w-[280px] sm:max-w-none mx-auto bg-white/90 backdrop-blur-md rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-6 border border-amber-100/60 shadow-md hover:shadow-2xl hover:border-amber-500/20 transition-all duration-500 ease-out hover:-translate-y-2 flex flex-col items-center text-center group relative overflow-hidden"
              >
                {/* Top corner glow effect on hover */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E25822]/40 via-amber-400/50 to-[#6B2D17]/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="absolute -right-12 -top-12 w-24 h-24 bg-gradient-to-br from-[#E25822]/5 to-amber-500/5 rounded-full blur-xl group-hover:scale-150 transition-all duration-770 ease-out" />
                
                {/* Unique Arch-shaped Image Frame */}
                <div className="relative w-40 h-52 sm:w-44 sm:h-56 rounded-t-[3rem] sm:rounded-t-[4rem] rounded-b-[1.25rem] sm:rounded-b-[1.5rem] overflow-hidden mb-6 ring-4 ring-[#E25822]/5 group-hover:ring-[#E25822]/15 shadow-lg group-hover:shadow-amber-500/5 transition-all duration-500 flex-shrink-0 bg-gradient-to-tr from-[#FFF5EE] via-[#FFEFE4] to-[#FFE4D6]">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Seniority badge overlay */}
                  {(member.designation.includes("Director") || member.designation.includes("MD")) && (
                    <div className="absolute top-4 left-4 z-20 bg-amber-500/90 text-white p-1.5 rounded-full shadow-md backdrop-blur-sm border border-amber-300/30 group-hover:rotate-12 transition-transform duration-500">
                      <Award className="w-3.5 h-3.5 fill-current text-white" />
                    </div>
                  )}
                  {/* Subtle vignette layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A0D04]/10 via-transparent to-transparent pointer-events-none" />
                </div>
                
                <div className="flex-grow flex flex-col justify-between items-center w-full">
                  <div>
                    <h4 className="font-serif text-xl sm:text-2xl font-black text-[#2A0D04] tracking-tight group-hover:text-[#6B2D17] transition-colors duration-300 leading-snug">
                      {member.name}
                    </h4>
                    
                    {/* Unique thin decorative divider */}
                    <div className="w-10 h-[2px] bg-gradient-to-r from-transparent via-amber-300 to-transparent my-3.5 group-hover:w-16 transition-all duration-500 mx-auto rounded-full" />
                    
                    <p className="text-[#E25822] text-xs sm:text-[13px] font-black tracking-widest uppercase">
                      {member.designation}
                    </p>
                  </div>
                  
                  <span className="text-[10px] text-[#6B2D17]/80 font-black tracking-widest uppercase mt-4 bg-[#FFF5EE] border border-amber-100/60 px-3.5 py-1 rounded-full group-hover:bg-[#E25822]/15 group-hover:text-[#E25822] transition-colors duration-300">
                    {member.organization}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Modalities Section */}
        <div className="space-y-10">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#6B2D17] uppercase">
              <Compass className="w-4 h-4 text-[#6B2D17]" />
              Sacred Modalities
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2A0D04]">
              Advanced Mind & Energy Sciences
            </h3>
            <div className="w-16 h-1 bg-[#6B2D17] mx-auto rounded-full" />
            <p className="text-gray-600 text-xs sm:text-sm font-semibold max-w-2xl mx-auto">
              Explore the unique high-vibrational energetic and scientific modalities that D.D. Sharma Ji integrates to clear old subconscious programming.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modalities.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[1.25rem] sm:rounded-[2rem] p-3.5 sm:p-8 border border-amber-100 hover:border-[#6B2D17]/40 hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between text-left"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="p-3 bg-amber-50 rounded-xl text-white group-hover:bg-[#6B2D17]/10 transition-all">
                      {item.icon}
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-wider text-[#6B2D17] bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-full">
                      {item.tag}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-black text-[#2A0D04] group-hover:text-[#E25822] transition-colors leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom line glow */}
                <div className="h-0.5 w-0 group-hover:w-full bg-[#6B2D17] transition-all duration-300 mt-6 rounded-full opacity-50" />
              </div>
            ))}
          </div>
        </div>

        {/* YouTube Spotlight Channel Card */}
        <div className="relative rounded-[1.25rem] sm:rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-[#2A0D04] via-[#6B2D17] to-[#120502] p-4 sm:p-12 border border-white/10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 group">
          {/* Subtle overlay decorative grid */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

          <div className="space-y-4 max-w-2xl text-center lg:text-left relative z-10">
            <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-xs font-black tracking-widest text-[#F5D28E] uppercase bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <Youtube className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              Official YouTube Channel
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              Subscribe to <span className="text-[#D48C37] font-bold">The Magic Of Thinking Big</span> on YouTube
            </h3>
            <p className="text-white/75 text-xs sm:text-sm font-semibold leading-relaxed">
              Unlock a treasure trove of guided alpha meditations, Gayatri Mantra quantum science, subconscious reprogramming secrets, Swar Vigyan, and live spiritual podcasts.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-[10px] sm:text-xs font-bold text-white/60 pt-2">
              <span className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-red-500 fill-red-500" /> Subconscious Mind
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-[#F5D28E] fill-[#F5D28E]" /> Gayatri Quantum Science
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-[#D48C37] fill-[#D48C37]" /> Swar Vigyan Lectures
              </span>
            </div>
          </div>

          <div className="relative z-10 flex-shrink-0 w-full lg:w-auto flex flex-col sm:flex-row gap-3.5 justify-center">
            <a
              href="https://www.youtube.com/@TheMagicOfThinkingBig26"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto justify-center flex items-center gap-2 bg-[#E25822] hover:bg-red-700 text-white font-black px-6 sm:px-8 py-3.5 sm:py-4.5 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-[10px] sm:text-sm uppercase tracking-wider group-hover:shadow-red-600/20 cursor-pointer"
            >
              <Youtube className="w-4.5 h-4.5 fill-current" />
              Subscribe: D.D. Sharma
            </a>
            <a
              href="https://www.youtube.com/@ManifesthroughGayatriMantra"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto justify-center flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-black px-6 sm:px-8 py-3.5 sm:py-4.5 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-[10px] sm:text-sm uppercase tracking-wider group-hover:shadow-rose-600/20 cursor-pointer"
            >
              <Youtube className="w-4.5 h-4.5 fill-current" />
              Subscribe: Gayatri Manifest
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

// Simple WindIcon svg component to represent breath
const WindIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
  </svg>
);

