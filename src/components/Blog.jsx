import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, ArrowRight, Clock, Award, Flame, Sun, Gem, Heart, Shield, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAdminContent } from '../admin/contentStore';

// Import local premium spiritual images matching course themes
import mahaLaxmiImg from '../assets/maha_laxmi_wealth.png';
import angelicHealingImg from '../assets/angelic_healing.png';
import solarPlexusSunImg from '../assets/solar_plexus_sun.png';
import kundaliniKriyaImg from '../assets/kundalini_kriya.png';
import saraswatiWisdomImg from '../assets/saraswati_wisdom.png';
import waterManifestationImg from '../assets/water_manifestation.png';

const imageMap = {
  1: saraswatiWisdomImg,
  2: solarPlexusSunImg,
  3: kundaliniKriyaImg,
  4: mahaLaxmiImg,
  5: waterManifestationImg,
  6: angelicHealingImg
};

const iconMap = {
  1: Sparkles,
  2: Flame,
  3: Sun,
  4: Gem,
  5: Heart,
  6: Shield
};

export default function Blog({ limit }) {
  const blogs = useAdminContent('blogs');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(blogs.length / postsPerPage);

  // Get displayed posts for the current page
  const startIndex = (currentPage - 1) * postsPerPage;
  const displayedPosts = limit 
    ? blogs.slice(0, limit) 
    : blogs.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const blogSection = document.getElementById('blog');
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="blog" className="relative py-8 overflow-hidden bg-[#FFF5EE] text-gray-900 z-10">
      
      {/* Self-contained keyframe animations for Stars and Cosmic Nebulae */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.7); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }
        @keyframes sparkleTwinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.6) rotate(0deg); }
          50% { opacity: 0.7; transform: scale(1.2) rotate(90deg); }
        }
        @keyframes drift {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
        }
        @keyframes rotateSolar {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes rotateSolarReverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes shootStar {
          0% { transform: translate(-100px, -100px) rotate(45deg); opacity: 0; }
          2% { opacity: 0.8; }
          12% { transform: translate(110vw, 110vh) rotate(45deg); opacity: 0; }
          100% { transform: translate(110vw, 110vh) rotate(45deg); opacity: 0; }
        }
        .animate-twinkle {
          animation: twinkle 4s ease-in-out infinite;
        }
        .animate-sparkle {
          animation: sparkleTwinkle 6s ease-in-out infinite;
        }
        .animate-drift {
          animation: drift 30s ease-in-out infinite;
        }
        .animate-solar-cw {
          animation: rotateSolar 50s linear infinite;
        }
        .animate-solar-ccw {
          animation: rotateSolarReverse 70s linear infinite;
        }
        .animate-shooting-1 {
          animation: shootStar 15s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        }
        .animate-shooting-2 {
          animation: shootStar 22s cubic-bezier(0.25, 1, 0.5, 1) infinite;
          animation-delay: 7s;
        }
      `}</style>

      {/* 🌌 Shooting Stars (Light Spiritual Tone) */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-gradient-to-r from-[#6B2D17] to-transparent rounded-full animate-shooting-1 pointer-events-none shadow-[0_0_10px_2px_rgba(107,23,54,0.2)]" style={{ transform: 'rotate(45deg)' }} />
      <div className="absolute top-0 left-0 w-2.5 h-2.5 bg-gradient-to-r from-[#2A0D04] to-transparent rounded-full animate-shooting-2 pointer-events-none shadow-[0_0_10px_2px_rgba(62,8,68,0.2)]" style={{ transform: 'rotate(45deg)' }} />

      {/* 🌌 High-density Starfield (Twinkling Soft Stars) */}
      {[...Array(45)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full bg-[#6B2D17]/15 animate-twinkle pointer-events-none"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 5}s`,
          }}
        />
      ))}

      {/* ⭐ Golden/Purple Sparkle Stars (4-point Stars) */}
      {[...Array(8)].map((_, i) => (
        <svg
          key={`sparkle-${i}`}
          className="absolute text-[#6B2D17]/25 animate-sparkle pointer-events-none drop-shadow-[0_0_6px_rgba(107,23,54,0.15)]"
          style={{
            width: `${Math.random() * 20 + 14}px`,
            height: `${Math.random() * 20 + 14}px`,
            top: `${Math.random() * 90 + 5}%`,
            left: `${Math.random() * 90 + 5}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 6}s`,
          }}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12,2L14.8,9.2L22,12L14.8,14.8L12,22L9.2,14.8L2,12L9.2,9.2Z" />
        </svg>
      ))}

      {/* 🪐 Cosmic Solar System Orbit - Centered & Optimized for Light Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] pointer-events-none z-0 hidden md:block" style={{ perspective: '1000px' }}>
        <div className="relative w-full h-full transform-gpu" style={{ transform: 'rotateX(72deg) rotateY(6deg)' }}>
          {/* Centered Sun Core (Solar Plexus) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-gradient-to-br from-[#6B2D17]/15 via-[#2A0D04]/15 to-[#FFF5EE] opacity-35 blur-[50px] animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#6B2D17]/10 border border-[#6B2D17]/25 shadow-[0_0_20px_rgba(107,23,54,0.1)]" />
          
          {/* Orbit 1 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full border border-dashed border-[#6B2D17]/20 animate-solar-cw">
            {/* Orbiting Planet Node */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#6B2D17]/60 shadow-[0_0_8px_rgba(107,23,54,0.3)]" />
          </div>

          {/* Orbit 2 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-dotted border-amber-400/25 animate-solar-ccw">
            {/* Orbiting Planet Node */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#E25822]/70 shadow-[0_0_8px_rgba(226,88,34,0.3)]" />
          </div>

          {/* Orbit 3 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-dashed border-[#6B2D17]/10 animate-solar-cw">
            {/* Orbiting Planet Node */}
            <div className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-500/60 shadow-[0_0_8px_rgba(245,210,142,0.3)]" />
          </div>
        </div>
      </div>

      {/* 🕸️ Cosmic Solar Grid / Constellation Mesh Network ("Solar Panel" grid lines) */}
      <svg className="absolute inset-0 w-full h-full text-[#6B2D17]/5 opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="solarGridLight" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="60" cy="60" r="1.5" fill="#6B2D17" opacity="0.2" />
            <path d="M 120 0 L 0 120 M 0 0 L 120 120" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.1" />
            <circle cx="0" cy="0" r="1" fill="#6B2D17" opacity="0.15" />
            <circle cx="120" cy="0" r="1" fill="#6B2D17" opacity="0.15" />
            <circle cx="0" cy="120" r="1" fill="#6B2D17" opacity="0.15" />
            <circle cx="120" cy="120" r="1" fill="#6B2D17" opacity="0.15" />
            <path d="M 60 0 L 60 120 M 0 60 L 120 60" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="3,3" opacity="0.08" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#solarGridLight)" />
      </svg>

      {/* Shifting Colorful Cosmic Nebulae (Light Spiritual Soft Tones) */}
      <div className="absolute top-[15%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-amber-200/30 to-transparent blur-[120px] pointer-events-none animate-drift" />
      <div className="absolute bottom-[20%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-orange-200/30 to-transparent blur-[120px] pointer-events-none animate-drift" style={{ animationDelay: '6s' }} />
      <div className="absolute top-[45%] left-[30%] w-[35vw] h-[35vw] rounded-full bg-white/30 blur-[100px] pointer-events-none" />

      <div className="max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8 relative z-10">

        {/* Header - Only render if limit is passed (homepage view) */}
        {limit && (
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#6B2D17] uppercase mb-3 animate-tagline-blink">
              <BookOpen className="w-3.5 h-3.5 animate-pulse text-[#6B2D17]" />
              Spiritual Wisdom &amp; Course Insights
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2A0D04] mb-4">
              Our Blogs
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#2A0D04] to-[#6B2D17] mx-auto rounded-full mb-5" />
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-semibold">
              Read daily vibrational updates, science-backed spiritual studies, and deep manifestation guides curated to help reprogram your subconscious mind.
            </p>
          </div>
        )}

        {/* Asymmetric Zig-Zag Layout Stack */}
        <div className="space-y-16 lg:space-y-24">
          {displayedPosts.map((post, idx) => {
            const isEven = idx % 2 === 0;
            const TopicIcon = iconMap[post.id] || Sparkles;

            return (
              <div 
                key={post.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
              >
                
                {/* Image Card Column - Left on Even, Right on Odd */}
                <div 
                  className={`lg:col-span-5 flex justify-center ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="relative group w-full max-w-md">
                    {/* Visual decorative auric rings */}
                    <div className="absolute inset-0 bg-[#6B2D17]/5 rounded-[2.5rem] transform rotate-2 scale-[1.02] opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    <div className="absolute inset-0 bg-amber-500/5 rounded-[2.5rem] transform -rotate-2 scale-[1.02] opacity-0 group-hover:opacity-100 transition-all duration-700" />

                    {/* Main Image Frame - Perfect aspect-square (1:1) card to match original illustrations */}
                    <div className="relative z-10 rounded-[1.75rem] sm:rounded-[2.5rem] overflow-hidden shadow-xl border border-amber-100/50 aspect-square bg-amber-50 w-full">
                      <Link to={`/blog/${post.id}`} className="w-full h-full block">
                        <img
                          src={post.image || imageMap[post.id]}
                          alt={post.title}
                          className="w-full h-full object-cover object-top filter brightness-95 group-hover:scale-105 group-hover:brightness-90 transition-transform duration-[8s]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2A0D04]/20 via-transparent to-transparent pointer-events-none" />
                      </Link>

                      {/* Topic Icon Badge */}
                      <div className="absolute top-4 left-4 w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-md border border-amber-100 flex items-center justify-center text-[#6B2D17] shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <TopicIcon className="w-5 h-5 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Block Column - Right on Even, Left on Odd */}
                <div 
                  className={`lg:col-span-7 space-y-6 text-center lg:text-left ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Course Category Badge */}
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#6B2D17] bg-[#6B2D17]/10 border border-[#6B2D17]/25 px-4 py-2 rounded-full">
                      <Award className="w-3 h-3 text-[#6B2D17]" /> {post.course}
                    </span>

                    {/* Title */}
                    <Link to={`/blog/${post.id}`} className="block">
                      <h3 className="font-serif text-xl sm:text-3xl font-extrabold text-[#2A0D04] leading-snug hover:text-[#6B2D17] transition-colors duration-300">
                        {post.title}
                      </h3>
                    </Link>

                    {/* Date / Read time */}
                    <div className="flex items-center justify-center lg:justify-start gap-4 text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                    </div>
                  </div>

                  {/* Summary content */}
                  <div className="space-y-4">
                    <p className="text-[#6B2D17] text-xs sm:text-sm font-bold tracking-wide italic max-w-xl mx-auto lg:mx-0">
                      "{post.tagline}"
                    </p>
                    <p className="text-gray-600 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                      {post.intro}
                    </p>
                  </div>

                  {/* Read Article Button */}
                  <div className="pt-2">
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 bg-[#2A0D04] hover:bg-[#120502] text-white font-black text-[10px] sm:text-xs px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-[#6B2D17]/10 active:scale-95 uppercase tracking-widest group/btn border border-white/10 cursor-pointer"
                    >
                      Read Article
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform text-white" />
                    </Link>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* See More CTA - Only render on Homepage (when limit is passed) */}
        {limit && (
          <div className="mt-20 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2A0D04] to-[#6B2D17] hover:from-[#6B2D17] hover:to-[#2A0D04] text-white font-black text-xs sm:text-sm px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all duration-300 shadow-lg active:scale-95 uppercase tracking-widest border border-white/10"
            >
              Explore Our Spiritual Blog
              <svg className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}

        {/* Pagination Controls - Only render on Blog Listing page when no limit is provided */}
        {!limit && (
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-amber-200/60 pt-6">
            {/* Status Info */}
            <span className="text-xs font-semibold text-gray-500">
              Showing <span className="font-extrabold text-[#6B2D17]">{startIndex + 1}</span> to{' '}
              <span className="font-extrabold text-[#6B2D17]">{Math.min(startIndex + postsPerPage, blogs.length)}</span> of{' '}
              <span className="font-extrabold text-[#6B2D17]">{blogs.length}</span> articles
            </span>

            {/* Navigation buttons */}
            {totalPages > 1 ? (
              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`inline-flex items-center justify-center p-2.5 rounded-xl border transition-all duration-300 ${currentPage === 1
                      ? 'border-amber-200/40 text-gray-400 cursor-not-allowed'
                      : 'border-amber-200 text-[#6B2D17] hover:bg-white hover:border-amber-300 active:scale-90 cursor-pointer shadow-sm hover:shadow'
                    }`}
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page Number Buttons */}
                {[...Array(totalPages)].map((_, pageIdx) => {
                  const pageNum = pageIdx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-9 h-9 rounded-xl border text-xs font-black transition-all duration-300 ${currentPage === pageNum
                          ? 'bg-[#2A0D04] border-[#6B2D17] text-[#F5D28E] shadow-[0_0_12px_rgba(62,8,68,0.15)]'
                          : 'bg-transparent border-amber-200 text-gray-700 hover:bg-white hover:border-amber-300 hover:text-[#6B2D17] cursor-pointer'
                        }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`inline-flex items-center justify-center p-2.5 rounded-xl border transition-all duration-300 ${currentPage === totalPages
                      ? 'border-amber-200/40 text-gray-400 cursor-not-allowed'
                      : 'border-amber-200 text-[#6B2D17] hover:bg-white hover:border-amber-300 active:scale-90 cursor-pointer shadow-sm hover:shadow'
                    }`}
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <span className="text-[10px] font-black uppercase text-[#6B2D17] bg-[#6B2D17]/10 border border-[#6B2D17]/20 px-4 py-1.5 rounded-full tracking-widest leading-none">
                All articles loaded
              </span>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
