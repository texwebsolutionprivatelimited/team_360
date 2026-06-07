import React, { useState } from 'react';
import { Play, X, Sparkles, Star, ThumbsUp } from 'lucide-react';

const videos = [
  {
    id: 'Dru7SvQB52w',
    title: 'Team 360 National News Coverage & Scientific Testimonials',
    tag: 'News Testimonial',
    stars: 5,
  },
  {
    id: 'rfK_DqIcO24',
    title: 'Subconscious Mind Reprogramming & Peak Performance Secrets',
    tag: 'YouTube Short',
    stars: 5,
  },
  {
    id: 'gz3M0XHZHWc',
    title: 'The Quantum Science of Gayatri Mantra & Alpha Activation',
    tag: 'YouTube Short',
    stars: 5,
  },
  {
    id: 'BITJIn4VXoo',
    title: 'Attracting Wealth & Brain Frequency Tuning (Alpha State)',
    tag: 'YouTube Short',
    stars: 5,
  },
  {
    id: 'qEkTf_t3aGU',
    title: 'Reprogramming Your RAS for Infinite Positive Success',
    tag: 'YouTube Short',
    stars: 5,
  },
  {
    id: 'hPIstKDE3U4',
    title: 'Gayatri Quantum Physics: Unlocking Core Spiritual Energies',
    tag: 'YouTube Short',
    stars: 5,
  },
  {
    id: 'azaO23ZIYOc',
    title: 'Scientific Impact of Gayatri Mantra Vibrations on Mind & Hormones',
    tag: 'YouTube Short',
    stars: 5,
  },
  {
    id: 'dVaj15CPdeE',
    title: 'Understanding Swar Vigyan & Ancient Element Science',
    tag: 'YouTube Short',
    stars: 5,
  },
];

export default function VideoReviews() {
  const [activeVideoId, setActiveVideoId] = useState(null);

  return (
    <section id="videos" className="relative pt-2 sm:pt-6 pb-4 bg-[#FFF5EE] text-gray-900 overflow-hidden">

      {/* Soft glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8 relative z-10">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="inline-flex items-center justify-center gap-1.5 text-xs font-bold tracking-widest text-[#6B2D17] uppercase mb-3 animate-tagline-blink">
            <Sparkles className="w-3.5 h-3.5" />
            Watch Real Seeker Success
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2A0D04] mb-4">
            Live Seeker Testimonials
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#E25822] to-[#6B2D17] mx-auto rounded-full" />
          <p className="mt-4 text-sm text-gray-600 font-medium">
            Listen to real reviews from seekers who experienced deep emotional healing, money abundance activation, and strong positive shifts during our live sessions!
          </p>
        </div>

        {/* Video Cards Grid - Clean 4-Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {videos.map((v) => (
            <div
              key={v.id}
              className="group bg-white rounded-2xl overflow-hidden border border-amber-200/80 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
              onClick={() => setActiveVideoId(v.id)}
            >
              {/* Thumbnail Frame */}
              <div>
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                    alt={v.title}
                    className="w-full h-full object-cover brightness-95 group-hover:brightness-75 group-hover:scale-105 transition-all duration-500"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600/90 group-hover:bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300 border-2 border-white/30">
                      <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                    </div>
                  </div>

                  {/* Tag */}
                  <span className="absolute top-2 left-2 text-[8px] font-bold bg-[#2A0D04]/80 text-[#FFF5EE] px-2.5 py-1 rounded-full backdrop-blur-sm border border-amber-500/20">
                    {v.tag}
                  </span>
                </div>

                {/* Info Card Content */}
                <div className="p-3.5 sm:p-4">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(v.stars)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  <h4 className="font-serif font-bold text-sm text-[#2A0D04] leading-snug group-hover:text-[#E25822] transition-colors mb-3">
                    {v.title}
                  </h4>
                </div>
              </div>

              {/* Verified Footer */}
              <div className="p-3.5 sm:p-4 pt-0 border-t border-amber-50 mt-auto flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#6B2D17]">
                  Team 360
                </span>
                <span className="inline-flex items-center gap-1 text-[8px] font-bold text-gray-400 uppercase">
                  <ThumbsUp className="w-2.5 h-2.5" /> Verified Review
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* See More CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://www.youtube.com/@TheMagicOfThinkingBig26"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#E25822] hover:bg-[#6B2D17] text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 uppercase tracking-wider whitespace-nowrap"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            <span>D.D. Sharma YouTube</span>
          </a>
          <a
            href="https://www.youtube.com/@ManifesthroughGayatriMantra"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 uppercase tracking-wider whitespace-nowrap"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            <span>Gayatri Manifest YouTube</span>
          </a>
        </div>

      </div>

      {/* Lightbox Frame Modal */}
      {activeVideoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={() => setActiveVideoId(null)}
          />
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10">
            <button
              onClick={() => setActiveVideoId(null)}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 text-white hover:text-red-400 border border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}

    </section>
  );
}
