import React from 'react';
import Blog from '../components/Blog';
import { Newspaper } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="pt-16 lg:pt-24 pb-16 min-h-screen bg-[#FFF5EE] relative overflow-hidden text-gray-900">

      {/* 🌌 Background soft ambient blurs matching light spiritual style */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] rounded-full bg-white/40 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-200/50 blur-[130px] pointer-events-none" />

      {/* Seamless Cosmic Page Header */}
      <div className="relative pt-4 pb-8 text-center overflow-hidden z-10">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#6B2D17] uppercase mb-3 animate-tagline-blink">
            <Newspaper className="w-4 h-4 text-[#6B2D17]" />
            Spiritual Knowledge &amp; Cosmic Wisdom
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-[#2A0D04] leading-tight mb-4">
            Spiritual Blog
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#2A0D04] to-[#6B2D17] mx-auto rounded-full mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto text-xs sm:text-sm font-semibold leading-relaxed">
            Read daily vibrational updates, science-backed spiritual studies, and deep manifestation guides curated to help reprogram your subconscious mind.
          </p>
        </div>
      </div>

      {/* Render Blog component with Centered Solar System Orbits & Same bg color */}
      <Blog />

    </div>
  );
}
