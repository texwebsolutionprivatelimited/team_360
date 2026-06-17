import React, { useState, useRef, useEffect } from 'react';
import { Newspaper, X, ChevronLeft, ChevronRight, Sparkles, ZoomIn } from 'lucide-react';

// Import all 10 newspaper clippings
import news1 from '../assets/news_coverage_1.png';
import news2 from '../assets/news_coverage_2.png';
import news3 from '../assets/news_coverage_3.png';
import news4 from '../assets/news_coverage_4.jpg';
import news5 from '../assets/news_coverage_5.png';
import news6 from '../assets/news_coverage_6.png';
import news7 from '../assets/news_coverage_7.png';
import news8 from '../assets/news_coverage_8.jpg';
import news9 from '../assets/news_coverage_9.jpg';
import news10 from '../assets/news_coverage_10.png';

export default function NewsTestimonials() {
  const [activeImageIdx, setActiveImageIdx] = useState(null);
  const [activeDot, setActiveDot] = useState(0);
  const scrollRef = useRef(null);

  const newsItems = [
    {
      src: news4,
      tag: "Gayatri Science Wealth Mission",
      title: "Awakening Financial Consciousness: D.D. Sharma Pattern",
      desc: "Awakening financial consciousness in every Indian and helping them manifest wealth using the Team 360 pattern.",
      alt: "Newspaper clipping: Awakening Financial Consciousness in every Indian under D.D. Sharma Pattern"
    },
    {
      src: news6,
      tag: "Franchise Milestone",
      title: "Record 940+ Franchises Awarded Nationally",
      desc: "Team 360 sets a national record by successfully awarding 940+ training franchises across states.",
      alt: "Newspaper clipping: Team 360 set record by giving 940+ franchises"
    },
    {
      src: news7,
      tag: "Holistic Growth",
      title: "Holistic 5D Development Programs Launched",
      desc: "Initiatives launched for complete physical, mental, emotional, spiritual, and financial development.",
      alt: "Newspaper clipping: Programs launched for holistic 5D development"
    },
    {
      src: news8,
      tag: "Employment Drive",
      title: "Skilling 3 Lakh Graduates as Master Trainers",
      desc: "An unprecedented project to train 3 lakh unemployed graduates as master trainers and provide careers.",
      alt: "Newspaper clipping: Skilling 3 lakh graduates as master trainers under Team 360"
    },
    {
      src: news9,
      tag: "VIP Guest Sessions",
      title: "International Speaker Harshvardhan Jain Visits Team 360",
      desc: "Renowned international motivational speaker Harshvardhan Jain visits the Team 360 head office.",
      alt: "Newspaper clipping: International speaker Harshvardhan Jain visiting Team 360 office"
    },
    {
      src: news10,
      tag: "NLP & Communication",
      title: "Active Listening & 7 Habits of Effective People",
      desc: "Scientific column by D.D. Sharma Ji on the power of listening, subconscious training, and 7 habits.",
      alt: "Newspaper clipping: D.D. Sharma Ji article on active listening and effective habits"
    },
    {
      src: news2,
      tag: "Trainer Franchise Model",
      title: "Team 360 Franchise Model: Earn 36 Lakhs Annually",
      desc: "An outline of the Team 360 franchise network, offering training and financial independence opportunities.",
      alt: "Newspaper clipping: Invest 70k and earn 36 lakhs annually with Team 360"
    },
    {
      src: news3,
      tag: "Skill Development",
      title: "Skill India Development: Monthly Employment for 100 People",
      desc: "Under the Skill India Development initiative, Team 360 projects aim to provide monthly employment to 100 people.",
      alt: "Newspaper clipping: Monthly employment for 100 people under Skill India Development"
    },
    {
      src: news1,
      tag: "Welfare & Covid Support",
      title: "Corona Relief Psychological & Financial Support Project",
      desc: "Welfare and support projects built by Team 360 to provide financial and mental aid to corona-affected families.",
      alt: "Newspaper clipping: Team 360 built welfare project for corona affected families"
    },
    {
      src: news5,
      tag: "Brain Activation & Study Mastery",
      title: "Competitive Exam Preparation: Memorize Books in 7 Days",
      desc: "A golden opportunity for students and competitive exam aspirants to activate brain potential and speed-read.",
      alt: "Newspaper clipping: Golden opportunity for competitive exam aspirants with Team 360"
    }
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.scrollWidth / newsItems.length;
      const index = Math.round(container.scrollLeft / cardWidth);
      if (index >= 0 && index < newsItems.length) {
        setActiveDot(index);
      }
    }
  };

  const scrollToCard = (idx) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.scrollWidth / newsItems.length;
      container.scrollTo({
        left: idx * cardWidth,
        behavior: 'smooth'
      });
      setActiveDot(idx);
    }
  };

  const slideLeft = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.scrollWidth / newsItems.length;
      container.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const slideRight = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.scrollWidth / newsItems.length;
      container.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const handlePrevLightbox = (e) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev === 0 ? newsItems.length - 1 : prev - 1));
  };

  const handleNextLightbox = (e) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev === newsItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="news-testimonials" className="relative py-12 sm:py-20 bg-[#FAF7F2] overflow-hidden">
      
      {/* Decorative ambient background overlays */}
      <div className="absolute top-1/4 left-[-10%] w-96 h-96 rounded-full bg-amber-100/30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 rounded-full bg-white/40 blur-[130px] pointer-events-none" />

      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#6B2D17] uppercase mb-3 animate-tagline-blink">
            <Newspaper className="w-4 h-4 text-[#6B2D17]" />
            National Media Coverage
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2A0D04] leading-tight">
            News Testimonials
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#2A0D04] to-[#6B2D17] mx-auto rounded-full mt-3 mb-4" />
          <p className="text-gray-700 text-xs sm:text-sm font-semibold max-w-2xl mx-auto leading-relaxed">
            Discover Team 360 and D.D. Sharma Ji's social and financial transformation projects as highlighted in leading national newspapers and print media.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {newsItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-shrink-0 snap-start bg-white rounded-[2rem] overflow-hidden border-2 border-[#6B2D17]/40 hover:border-[#6B2D17] shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 cursor-pointer group flex flex-col justify-between"
              >
                {/* Clip Image Box */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-amber-950/5 flex items-center justify-center border-b border-[#6B2D17]/10">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 brightness-95 group-hover:brightness-100"
                  />
                  
                  {/* Elegant hover overlay */}
                  <div className="absolute inset-0 bg-[#2A0D04]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                    <div className="p-3.5 rounded-full bg-white/90 backdrop-blur-md text-[#2A0D04] shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <ZoomIn className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Tag Overlay */}
                  <span className="absolute top-4 left-4 text-[9px] font-black uppercase tracking-widest bg-[#2A0D04]/90 text-[#FCE7C2] border border-[#FCE7C2]/20 px-3 py-1.5 rounded-xl backdrop-blur-md whitespace-nowrap z-10">
                    {item.tag}
                  </span>
                </div>

                {/* Card Footer Information */}
                <div className="p-5 sm:p-6 text-left flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#2A0D04] group-hover:text-[#6B2D17] transition-colors leading-snug mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-3 mb-4">
                      {item.desc}
                    </p>
                  </div>
                  
                  <span className="text-[10px] font-black text-[#6B2D17] uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1.5 transition-transform duration-300">
                    Read Article &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Left/Right Arrow controls positioned on the sides */}
          <button
            onClick={slideLeft}
            className="absolute left-[-10px] md:left-[-20px] top-[40%] -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full md:rounded-2xl bg-white border-2 border-[#6B2D17]/20 hover:border-[#6B2D17] text-[#2A0D04] hover:bg-[#6B2D17]/5 flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer active:scale-95 z-20"
            aria-label="Previous slide"
            title="Slide Left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={slideRight}
            className="absolute right-[-10px] md:right-[-20px] top-[40%] -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full md:rounded-2xl bg-white border-2 border-[#6B2D17]/20 hover:border-[#6B2D17] text-[#2A0D04] hover:bg-[#6B2D17]/5 flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer active:scale-95 z-20"
            aria-label="Next slide"
            title="Slide Right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* 🔘 Dot-Type Carousel Indicators (Dot navigation) */}
        <div className="flex items-center justify-center gap-2.5 mt-8">
          {newsItems.map((_, dotIdx) => {
            const isActive = activeDot === dotIdx;
            return (
              <button
                key={dotIdx}
                onClick={() => scrollToCard(dotIdx)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#6B2D17] shadow-sm scale-110'
                    : 'bg-[#6B2D17]/25 hover:bg-[#6B2D17]/50'
                }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            );
          })}
        </div>

      </div>

      {/* 🌌 Lightbox Overlay for reading clips */}
      {activeImageIdx !== null && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveImageIdx(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveImageIdx(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full backdrop-blur-md border border-white/15 transition-all shadow-md active:scale-95"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 pointer-events-none" />
          </button>

          {/* Slider Content */}
          <div className="relative max-w-4xl w-full flex flex-col items-center gap-4">
            
            {/* Image Box */}
            <div className="relative max-h-[75vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white">
              <img
                src={newsItems[activeImageIdx].src}
                alt={newsItems[activeImageIdx].alt}
                className="max-h-[75vh] w-auto max-w-full object-contain pointer-events-none mx-auto"
              />
            </div>

            {/* Navigation Controls */}
            <button
              onClick={handlePrevLightbox}
              className="absolute left-2 sm:-left-16 top-1/2 -translate-y-1/2 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md border border-white/15 transition-all shadow-md active:scale-95"
              aria-label="Previous clipping"
            >
              <ChevronLeft className="w-5 h-5 pointer-events-none" />
            </button>
            <button
              onClick={handleNextLightbox}
              className="absolute right-2 sm:-right-16 top-1/2 -translate-y-1/2 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md border border-white/15 transition-all shadow-md active:scale-95"
              aria-label="Next clipping"
            >
              <ChevronRight className="w-5 h-5 pointer-events-none" />
            </button>

            {/* Captions and descriptions */}
            <div className="text-center text-white max-w-2xl px-4 mt-2">
              <span className="inline-flex items-center gap-1 text-[9px] font-black text-[#FFD95A] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full mb-2">
                <Sparkles className="w-3 h-3 text-[#FFD95A] animate-pulse" />
                {newsItems[activeImageIdx].tag} • {activeImageIdx + 1} of {newsItems.length}
              </span>
              <h3 className="font-serif font-black text-lg sm:text-xl text-white">{newsItems[activeImageIdx].title}</h3>
              <p className="text-white/80 text-xs mt-1 leading-relaxed">{newsItems[activeImageIdx].desc}</p>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
