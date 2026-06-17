import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Star, Award, Compass, ArrowRight, ShieldCheck } from 'lucide-react';
import ddSharmaPortrait from '../assets/dd_sharma_portrait.jpg';

export default function AboutBrief() {
  return (
    <section id="about-brief" className="relative pt-12 pb-3 sm:pt-20 sm:pb-8 bg-[#FFF5EE] overflow-hidden">
      
      {/* Self-contained animations */}
      <style>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-reverse-slow {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes float-badge {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }
        @keyframes float-badge-reverse {
          0% { transform: translateY(0px); }
          50% { transform: translateY(6px); }
          100% { transform: translateY(0px); }
        }
        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 35s linear infinite;
        }
        .animate-float-badge {
          animation: float-badge 4s ease-in-out infinite;
        }
        .animate-float-badge-reverse {
          animation: float-badge-reverse 4.5s ease-in-out infinite;
        }
      `}</style>

      {/* Background glowing gradients */}
      <div className="absolute top-1/2 left-[-15%] w-[450px] h-[450px] rounded-full bg-white/40 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-15%] w-[450px] h-[450px] rounded-full bg-amber-200/50 blur-[130px] pointer-events-none" />

      <div className="max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Image + Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Stellar Astrolabe Rotating Portrait Frame (Desktop/Tablet ONLY) */}
          <div className="hidden sm:flex lg:col-span-5 flex-col items-center justify-center relative min-h-[320px] sm:min-h-[420px] max-w-full overflow-hidden">
            
            {/* Concentric Cosmic Astrolabe Rings */}
            <div className="absolute w-[260px] h-[260px] sm:w-[400px] sm:h-[400px] rounded-full border border-dashed border-[#2A0D04]/15 animate-spin-slow pointer-events-none" />
            <div className="absolute w-[220px] h-[220px] sm:w-[350px] sm:h-[350px] rounded-full border border-double border-[#6B2D17]/10 animate-spin-reverse-slow pointer-events-none" style={{ borderWidth: '3px' }} />
            <div className="absolute w-[180px] h-[180px] sm:w-[300px] sm:h-[300px] rounded-full border border-dashed border-[#FFD95A]/20 animate-spin-slow pointer-events-none" />

            {/* Glowing background behind photo */}
            <div className="absolute w-44 h-44 sm:w-60 sm:h-60 rounded-full bg-gradient-to-tr from-[#6B2D17] to-[#2A0D04] opacity-20 blur-3xl pointer-events-none" />

            {/* Core Circular Portrait Frame */}
            <div className="relative z-10 p-2 sm:p-3 rounded-full bg-white/45 backdrop-blur-md shadow-2xl border border-white/60 hover:scale-[1.03] transition-transform duration-500 shadow-[0_0_35px_rgba(255,217,90,0.2)]">
              
              {/* Floating Mini Shield Tag (Verified Guide) */}
              <div className="absolute -top-2 left-[-24px] sm:top-8 sm:left-[-48px] z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl border border-amber-100 shadow-md flex items-center gap-1.5 hover:-translate-y-1 transition-transform animate-float-badge">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-[9px] sm:text-[10px] font-black text-gray-700 uppercase tracking-wider">Verified Trainer</span>
              </div>

              <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden ring-4 ring-[#FFD95A]/30 sm:ring-[#2A0D04]/15 shadow-inner">
                <img
                  src={ddSharmaPortrait}
                  alt="D.D. Sharma"
                  className="w-full h-full object-cover"
                />
                
                {/* Spiritual Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A0D04]/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Float Star Badge */}
              <div className="absolute -bottom-2 right-2 sm:bottom-0 sm:right-4 bg-gradient-to-r from-[#FFD95A] to-[#F5A623] text-[#0D0015] font-black text-[8px] sm:text-[9px] uppercase tracking-widest px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg shadow-[#FFD95A]/25 border border-white/30 flex items-center gap-1 z-20 animate-float-badge-reverse">
                <Sparkles className="w-3 h-3 text-[#0d0015]" /> Team 360
              </div>
            </div>

          </div>

          {/* Right Column: Premium Cosmic Gradient Content Card */}
          <div className="lg:col-span-7 relative rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-[#2A0D04] via-[#120502] to-[#0D0302] p-4.5 sm:p-12 shadow-2xl overflow-hidden border-2 border-[#FFD95A]/20 sm:border border-[#FFD95A]/15 text-white">
            
            {/* Corner Decorative Aura */}
            <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#FFD95A]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Mobile-only centered portrait inside the card (Mobile ONLY) */}
            <div className="flex sm:hidden flex-col items-center justify-center relative min-h-[220px] max-w-full mb-6">
              {/* Concentric Cosmic Astrolabe Rings */}
              <div className="absolute w-[210px] h-[210px] rounded-full border border-dashed border-white/10 animate-spin-slow pointer-events-none" />
              <div className="absolute w-[180px] h-[180px] rounded-full border border-double border-white/5 animate-spin-reverse-slow pointer-events-none" style={{ borderWidth: '2px' }} />
              
              {/* Glowing background */}
              <div className="absolute w-40 h-40 rounded-full bg-gradient-to-tr from-[#6B2D17]/40 to-[#2A0D04]/40 opacity-40 blur-3xl pointer-events-none" />

              {/* Core Portrait Frame */}
              <div className="relative z-10 p-2 rounded-full bg-white/15 backdrop-blur-md shadow-2xl border border-white/20 hover:scale-[1.03] transition-transform duration-500 shadow-[0_0_25px_rgba(255,217,90,0.15)]">
                
                {/* Verified Guide Badge */}
                <div className="absolute -top-2 left-[-48px] z-20 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-amber-100 shadow-md flex items-center gap-1 animate-float-badge">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[8px] font-black text-gray-700 uppercase tracking-wider">Verified Trainer</span>
                </div>

                <div className="relative w-36 h-36 rounded-full overflow-hidden ring-4 ring-[#FFD95A]/30 shadow-inner">
                  <img
                    src={ddSharmaPortrait}
                    alt="D.D. Sharma"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A0D04]/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Float Star Badge */}
                <div className="absolute -bottom-2 right-1 bg-gradient-to-r from-[#FFD95A] to-[#F5A623] text-[#0D0015] font-black text-[7px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-[#FFD95A]/25 border border-white/30 flex items-center gap-1 z-20 animate-float-badge-reverse">
                  <Sparkles className="w-2.5 h-2.5 text-[#0d0015]" /> Team 360
                </div>
              </div>
            </div>

            <div className="space-y-6 relative z-10 text-center lg:text-left">
              
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold tracking-widest text-[#FFD95A] uppercase bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
                  <Award className="w-3.5 h-3.5 text-[#FFD95A] animate-pulse" /> Meet Your Lead Trainer
                </span>
                
                <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFD95A] to-white leading-tight drop-shadow-sm">
                  Devendra Sharma (D.D. Sharma Ji)
                </h2>
                
                <p className="text-white/85 text-xs sm:text-sm font-bold tracking-wide uppercase">
                  Founder of Team 360 & International Mind & Memory Trainer
                </p>
              </div>

              <div className="w-16 h-1 bg-gradient-to-r from-[#FFD95A] to-[#F5A623] mx-auto lg:mx-0 rounded-full" />

              <p className="text-white/70 text-xs sm:text-sm font-semibold leading-relaxed">
                Devendra Sharma (D.D. Sharma Ji) is a world-renowned mind trainer, memory coach, and founder of Team 360. With over 32 years of experience as a senior government officer and international mind trainer, he is a certified Silva Ultramind facilitator, Alpha Mind power expert, and 7 Habits practitioner. He has been honored with prestigious recognitions, including the Gold Star Award (USA) and the CEO Burj Award (Dubai) for his outstanding contribution to brain empowerment, peak performance, and subconscious programming.
              </p>

              {/* Unique bullet features with golden badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 pt-2 max-w-lg mx-auto lg:mx-0 text-left">
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl backdrop-blur-sm shadow-sm hover:bg-white/10 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                    <Compass className="w-4 h-4 text-[#FFD95A]" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-white/80">32+ Years as Senior Gov. Officer</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl backdrop-blur-sm shadow-sm hover:bg-white/10 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                    <Star className="w-4 h-4 text-[#FFD95A] fill-[#FFD95A]" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-white/80">Thousands of Brains Empowered</span>
                </div>
              </div>

              {/* Read More button linking to About page */}
              <div className="pt-4 flex justify-center lg:justify-start">
                <Link
                  to="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFD95A] hover:bg-[#F5A623] text-[#0D0015] font-black text-[10px] sm:text-xs px-4 sm:px-7 py-3 sm:py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#FFD95A]/15 active:scale-95 uppercase tracking-widest group border border-white/10 whitespace-nowrap"
                >
                  Read His Full Journey
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#0d0015]" />
                </Link>
              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
