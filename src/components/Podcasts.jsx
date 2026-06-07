import React, { useState } from 'react';
import { Play, X, Headphones, Sparkles } from 'lucide-react';

export default function Podcasts() {
  const [activeVideoId, setActiveVideoId] = useState(null);

  // All video IDs are from the official @meditationmagic33 YouTube channel
  const podcastVideos = [
    {
      id: 'Z5BWDanryH0',
      title: 'Receive Divine Healing Now: पुरानी से पुरानी बीमारी को Angels की मदद से ठीक करें 🧘‍♀️',
      tag: 'Divine Healing',
    },
    {
      id: '_5A5Sd9uXKw',
      title: 'Heal Your Finances with Golden Dragons | Live Podcast on Dragon Therapy level -1',
      tag: 'Dragon Therapy',
    },
    {
      id: '_tpJuBPABUQ',
      title: 'Elemental Unicorn Energy Activation 🦄✨ | Chakra Healing & Live Podcast | By Sr.Master Devendra Sharma (D.D. Sharma)',
      tag: 'Unicorn Activation',
    },
    {
      id: 'PzWuTo5N2xI',
      title: 'Glimpse of Offline Cord Cutting Workshop | PMC Gujarat | Sr. Master Devendra Sharma (D.D. Sharma) & Bhavya Chudasama',
      tag: 'Cord Cutting',
    },
    {
      id: '-_HNRZ8occ0',
      title: 'Live Testimonials: Akashic Financial Healing Results 💰 | Real Abundance Stories',
      tag: 'Akashic Healing',
    },
    {
      id: 'F5WK17Jdw3Y',
      title: 'From Fear to Power 🔥 Solar Plexus Chakra Healing Testimonials | Real Transformations',
      tag: 'Solar Plexus',
    },
    {
      id: 'v_CxJakdI1s',
      title: 'CLEAR NEGATIVE ENERGIES WITH SHESHNAAG & DRAGONS THERAPY LEVEL- 2 PODCAST BY SR MASTER DEVENDRA SHARMA (D.D. SHARMA)',
      tag: 'Sheshnaag & Dragon',
    },
    {
      id: '6BAY3blG1PY',
      title: 'Money Magnet Activation 🔥 Laxmi Maa & Kuber Ji Prosperity Podcast”',
      tag: 'Money Magnet',
    },
  ];

  return (
    <section id="podcasts" className="relative pt-8 pb-8 bg-[#FFF5EE] text-gray-900 overflow-hidden">

      {/* Soft glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 bg-white/30 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="inline-flex items-center justify-center gap-1.5 text-xs font-bold tracking-widest text-[#6B2D17] uppercase mb-3 animate-tagline-blink">
            <Headphones className="w-4 h-4" />
            Live Class & Workshop Highlights
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2A0D04] mb-4">
            Watch Our Spiritual Journeys
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#2A0D04] to-[#6B2D17] mx-auto rounded-full" />
          <p className="mt-4 text-sm text-gray-600 font-medium">
            Watch live energy healing sessions, spiritual activations, and real success stories recorded from our sacred classes on{' '}
            <a
              href="https://www.youtube.com/@meditationmagic33"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B2D17] font-bold underline underline-offset-2 hover:text-[#6B2D17] transition-colors"
            >
              @meditationmagic33
            </a>
          </p>
        </div>

        {/* Podcast Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {podcastVideos.map((video, idx) => (
            <div
              key={idx}
              onClick={() => setActiveVideoId(video.id)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border-2 border-[#6B2D17]/40 hover:border-[#6B2D17] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover brightness-90 group-hover:scale-105 group-hover:brightness-75 transition-all duration-500"
                />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-3 rounded-full bg-red-600 group-hover:bg-red-500 text-white shadow-lg group-hover:scale-110 transition-all duration-300 border-2 border-white/30">
                    <Play className="w-4 h-4 fill-white text-white" />
                  </div>
                </div>

                {/* Tag badge */}
                <span className="absolute top-2 left-2 text-[9px] font-bold bg-[#2A0D04]/80 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                  {video.tag}
                </span>
              </div>

              {/* Info */}
              <div className="p-3">
                <h4 className="font-serif font-bold text-xs sm:text-sm text-[#2A0D04] leading-snug group-hover:text-[#E25822] transition-colors line-clamp-2">
                  {video.title}
                </h4>
                <p className="text-[10px] text-[#6B2D17] mt-1 font-semibold">
                  Team 360
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* YouTube CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://www.youtube.com/@meditationmagic33"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-7 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Subscribe on YouTube
          </a>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[#6B2D17]/50 font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>New healing sessions every week</span>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
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
              title="Podcast YouTube Player"
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
