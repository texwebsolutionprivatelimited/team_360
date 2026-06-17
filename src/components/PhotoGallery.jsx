import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Sparkles, ZoomIn } from 'lucide-react';

// Import the 5 newly uploaded high-quality photos
import gallery1 from '../assets/dd_sharma_gallery_1.jpg';
import gallery2 from '../assets/dd_sharma_gallery_2.jpg';
import gallery3 from '../assets/dd_sharma_gallery_3.jpg';
import gallery4 from '../assets/dd_sharma_gallery_4.jpg';
import gallery5 from '../assets/dd_sharma_gallery_5.jpg';

export default function PhotoGallery() {
  const [activeImageIdx, setActiveImageIdx] = useState(null);

  const images = [
    {
      src: gallery1,
      tag: "Podcast Session",
      alt: "Devendra Sharma Ji speaking into a microphone during a podcast recording session",
      title: "Wisdom Sharing Podcast",
      desc: "Devendra Sharma Ji delivering deep guidance on subconscious reprogramming and Gayatri science in a live podcast studio session."
    },
    {
      src: gallery2,
      tag: "Book Launch",
      alt: "D.D. Sharma presenting his book to an elder guest alongside a Team 360 female member",
      title: "Launching 'Read Stories & Become Rich'",
      desc: "D.D. Sharma Ji presenting his popular book to a senior dignitary and Team 360 member, facilitating spiritual and financial literacy."
    },
    {
      src: gallery3,
      tag: "Author Presentation",
      alt: "D.D. Sharma presenting Atmagyan-Pushpamala book to a guest in blue blazer with pink garland",
      title: "Presenting 'Atmagyan-Pushpamala'",
      desc: "Honoring guests and seekers by presenting spiritual books to guide their journey toward peak performance and self-realization."
    },
    {
      src: gallery4,
      tag: "International Award",
      alt: "Poster showing D.D. Sharma receiving the USA Gold Star Award in Florida",
      title: "USA Gold Star Recognition",
      desc: "D.D. Sharma Ji receiving the prestigious Gold Star Award from Dr. Howard Jacobson in Orlando, Florida, for his contributions to brain training."
    },
    {
      src: gallery5,
      tag: "Felicitation Ceremony",
      alt: "D.D. Sharma Ji draping a white shawl over a guest wearing a pink garland",
      title: "Honoring Sacred Seekers",
      desc: "Felicitation and welcoming ceremony where D.D. Sharma Ji honors students, trainers, and guests with a traditional shawl and garland."
    }
  ];

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="relative pt-3 pb-4 sm:pt-8 sm:pb-10 lg:pt-10 lg:pb-14 bg-[#FFF5EE] overflow-hidden">
      
      {/* Dynamic ambient glowing light bubbles */}
      <div className="absolute top-1/3 right-[-10%] w-96 h-96 rounded-full bg-white/40 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-15%] w-80 h-80 rounded-full bg-amber-100/40 blur-[120px] pointer-events-none" />

      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest text-[#6B2D17] uppercase mb-4 animate-tagline-blink">
            <Camera className="w-4 h-4 text-[#6B2D17]" />
            Moments of Magic & Connection
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2A0D04] leading-tight">
            Photo Gallery
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#2A0D04] to-[#6B2D17] mx-auto rounded-full mt-3 mb-4" />
          <p className="text-gray-700 text-xs sm:text-sm font-semibold max-w-2xl mx-auto leading-relaxed">
            Peek into Devendra Sharma (D.D. Sharma)'s high-energy studio recordings, podcast sessions, and spiritual workshops where seekers gather to raise their vibrations.
          </p>
        </div>

        {/* Premium Masonry-Style Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Large Featured Left block (Spans 5 cols on lg) */}
          <div 
            onClick={() => setActiveImageIdx(0)}
            className="lg:col-span-5 relative rounded-[2rem] overflow-hidden border-2 border-[#6B2D17]/40 hover:border-[#6B2D17] shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer group h-[20rem] sm:h-auto"
          >
            <img 
              src={images[0].src} 
              alt={images[0].alt} 
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 brightness-95"
            />
            {/* Elegant Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
            
            {/* Interactive Zoom Badge */}
            <div className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm z-20">
              <ZoomIn className="w-4 h-4 text-[#FFD95A]" />
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 z-20 text-left space-y-1">
              <span className="text-[9px] font-black uppercase text-[#FFD95A] tracking-wider block">{images[0].tag}</span>
              <h3 className="font-serif text-white font-black text-sm sm:text-base leading-snug group-hover:text-[#FFD95A] transition-colors duration-300">{images[0].title}</h3>
              <p className="text-white/70 text-[10px] sm:text-xs leading-relaxed max-w-sm hidden sm:block">{images[0].desc}</p>
            </div>
          </div>

          {/* Right Side Complex: 7 cols grid on lg */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {images.slice(1).map((img, idx) => {
              const realIndex = idx + 1;
              return (
                <div 
                  key={realIndex}
                  onClick={() => setActiveImageIdx(realIndex)}
                  className="relative rounded-[2rem] overflow-hidden border-2 border-[#6B2D17]/40 hover:border-[#6B2D17] shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer group h-72 sm:h-80"
                >
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 brightness-95"
                  />
                  {/* Elegant Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

                  {/* Interactive Zoom Badge */}
                  <div className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm z-20">
                    <ZoomIn className="w-4 h-4 text-[#FFD95A]" />
                  </div>

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6 z-20 text-left space-y-0.5">
                    <span className="text-[8px] sm:text-[9px] font-black uppercase text-[#FFD95A] tracking-wider block">
                      {img.tag}
                    </span>
                    <h3 className="font-serif text-white font-black text-xs sm:text-sm leading-snug group-hover:text-[#FFD95A] transition-colors duration-300">{img.title}</h3>
                    <p className="text-white/70 text-[9px] sm:text-[10px] leading-relaxed hidden sm:block line-clamp-1">{img.desc}</p>
                  </div>
                </div>
              );
            })}

          </div>

        </div>

      </div>

      {/* 🌌 Premium Lightbox Overlay (Full Screen Slider) */}
      {activeImageIdx !== null && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveImageIdx(null)}
        >
          {/* Close button */}
          <button 
            onClick={() => setActiveImageIdx(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full backdrop-blur-md border border-white/15 transition-all shadow-md active:scale-95"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6 pointer-events-none" />
          </button>

          {/* Slider Container */}
          <div className="relative max-w-4xl w-full flex flex-col items-center gap-4">
            
            {/* Main Image Box */}
            <div className="relative max-h-[70vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src={images[activeImageIdx].src} 
                alt={images[activeImageIdx].alt} 
                className="max-h-[70vh] w-auto max-w-full object-contain pointer-events-none"
              />
            </div>

            {/* Prev/Next Buttons */}
            <button 
              onClick={handlePrev}
              className="absolute left-2 sm:-left-16 top-1/2 -translate-y-1/2 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md border border-white/15 transition-all shadow-md active:scale-95"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5 pointer-events-none" />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-2 sm:-right-16 top-1/2 -translate-y-1/2 text-white/75 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md border border-white/15 transition-all shadow-md active:scale-95"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5 pointer-events-none" />
            </button>

            {/* Captions and descriptions at bottom of lightbox */}
            <div className="text-center text-white max-w-2xl px-4 mt-2">
              <span className="inline-flex items-center gap-1 text-[9px] font-black text-[#FFD95A] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full mb-2">
                <Sparkles className="w-3 h-3 text-[#FFD95A] animate-pulse" />
                {images[activeImageIdx].tag} • {activeImageIdx + 1} of {images.length}
              </span>
              <h3 className="font-serif font-black text-lg sm:text-xl text-white">{images[activeImageIdx].title}</h3>
              <p className="text-white/80 text-xs mt-1 leading-relaxed">{images[activeImageIdx].desc}</p>
            </div>

          </div>

        </div>
      )}

    </section>
  );
}
