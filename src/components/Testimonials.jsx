import React, { useState, useEffect } from 'react';
import { Star, Quote, Sparkles, CheckCircle2, X } from 'lucide-react';

// Default export: Renders the seeker stories carousel slider
export default function Testimonials({ testimonialsList, activeIdx, setActiveIdx }) {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [modalTestimonial, setModalTestimonial] = useState(null);

  // Track window size for responsive item calculations
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getItemsPerPage = () => {
    if (windowWidth >= 1024) return 4;
    if (windowWidth >= 768) return 2;
    return 1;
  };

  const itemsPerPage = getItemsPerPage();
  const maxIdx = Math.max(0, testimonialsList.length - itemsPerPage);

  // Keep activeIdx within valid bounds
  useEffect(() => {
    if (activeIdx > maxIdx) {
      setActiveIdx(maxIdx);
    }
  }, [maxIdx, activeIdx]);

  // Auto-slide carousel every 5 seconds
  useEffect(() => {
    if (maxIdx === 0) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev >= maxIdx ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [maxIdx]);

  return (
    <section id="testimonials" className="relative pt-8 pb-4 bg-[#FFF5EE] text-gray-900 overflow-hidden">

      {/* Soft glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-white/30 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#6B2D17] uppercase mb-2 animate-tagline-blink">
            <Sparkles className="w-3.5 h-3.5" />
            Seeker Success Stories
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2A0D04] mb-3">
            Testimonials
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#2A0D04] to-[#6B2D17] mx-auto rounded-full" />
        </div>

        {/* Carousel Slider Frame */}
        <div className="relative overflow-hidden w-full mb-6">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-5"
            style={{
              transform: `translateX(calc(-${activeIdx * (100 / itemsPerPage)}% - ${activeIdx * (20 / itemsPerPage)}px))`
            }}
          >
            {testimonialsList.map((t, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-4.5 sm:p-5 border-2 border-[#6B2D17]/40 transition-all duration-300 flex flex-col justify-between flex-shrink-0"
                style={{
                  width: `calc(${100 / itemsPerPage}% - ${(itemsPerPage - 1) * 20 / itemsPerPage}px)`
                }}
              >
                {/* Watermark Quote Icon */}
                <Quote className="absolute top-3 right-4 w-8 h-8 text-[#6B2D17]/5 pointer-events-none" />

                <div>
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed mb-1.5 whitespace-pre-line">
                    "{t.content.length > 150 ? `${t.content.slice(0, 140)}...` : t.content}"
                  </p>
                  {t.content.length > 150 && (
                    <button
                      onClick={() => setModalTestimonial(t)}
                      className="text-[#6B2D17] hover:text-[#E25822] font-black text-[10px] uppercase tracking-widest mb-3.5 block cursor-pointer transition-colors text-left"
                    >
                      Read More &rarr;
                    </button>
                  )}
                </div>

                {/* Author */}
                <div className="border-t border-amber-100 pt-3 mt-auto">
                  <p className="font-serif font-bold text-xs sm:text-sm text-[#6B2D17]">{t.name}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dot Indicators underneath */}
        {maxIdx > 0 && (
          <div className="flex justify-center gap-2 mb-2 mt-6 relative z-20">
            {[...Array(maxIdx + 1)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`h-3 w-3 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIdx
                    ? 'bg-[#2A0D04] border border-[#6B2D17]/20 scale-110'
                    : 'bg-amber-300 hover:bg-[#6B2D17]/40 border border-amber-400/30'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </div>

      {/* Testimonial Full View Modal */}
      {modalTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setModalTestimonial(null)}
          />
          
          {/* Modal Card */}
          <div className="relative bg-white rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 border-2 border-[#6B2D17] max-w-[95%] sm:max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10 text-left animate-fade-in">
            {/* Close Button */}
            <button
              onClick={() => setModalTestimonial(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-[#2A0D04] p-1.5 sm:p-2 rounded-full bg-amber-50/50 hover:bg-amber-100/85 border border-amber-200/40 transition-all cursor-pointer active:scale-95"
              aria-label="Close modal"
            >
              <X className="w-4.5 h-4.5 sm:w-5 sm:h-5 pointer-events-none" />
            </button>

            {/* Stars */}
            <div className="flex gap-0.5 mb-4 pr-8">
              {[...Array(modalTestimonial.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-500" />
              ))}
            </div>

            {/* Quote icon watermark */}
            <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-[#6B2D17]/10 mb-2 sm:mb-3" />

            {/* Full testimonial text */}
            <p className="text-xs sm:text-sm md:text-base text-gray-800 italic leading-relaxed mb-6 whitespace-pre-line pr-2">
              "{modalTestimonial.content}"
            </p>

            {/* Author details */}
            <div className="border-t border-amber-100 pt-4 mt-6">
              <p className="font-serif font-black text-sm sm:text-base text-[#6B2D17]">{modalTestimonial.name}</p>
              <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">{modalTestimonial.role}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// Named Export: Renders the 2-column split review form card at the very bottom of the page
export function WriteTestimonialForm({ onAddTestimonial }) {
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleTestimonialSubmit = (e) => {
    e.preventDefault();
    if (!newName || !newRole || !newContent) return;

    const newTestimonial = {
      name: newName,
      role: newRole,
      content: newContent,
      rating: newRating,
    };

    onAddTestimonial(newTestimonial);
    setShowSuccess(true);

    // Reset fields
    setNewName('');
    setNewRole('');
    setNewContent('');
    setNewRating(5);

    // Clear success after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <section className="relative pb-6 bg-[#FFF5EE] text-gray-900 overflow-hidden">
      <div className="max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8 relative z-10">

        {/* Share Your Review Form Split Block */}
        <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-3.5 sm:p-8 border-2 border-[#6B2D17]/40 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Warm Call to Action Wording */}
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#6B2D17] uppercase bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-100">
                <Sparkles className="w-3.5 h-3.5 text-[#6B2D17]" /> Join the Circle
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2A0D04] leading-tight">
                Tell Us Your Story!
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-semibold">
                Your experience is a source of light for others! Share how these courses or workshops helped clear your mind, bring peace, or guide your life.
              </p>
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50/40 border border-amber-100/50 space-y-2">
                <span className="block text-xs font-black text-[#6B2D17] uppercase tracking-wider">Why Share?</span>
                <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                  Every story shared inspires another seeker to take their first step towards daily peace and self-improvement. Your words matter!
                </p>
              </div>
            </div>

            {/* Right Column: The Interactive Form */}
            <div className="lg:col-span-7">
              {showSuccess ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center text-emerald-950 shadow-sm">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <h5 className="font-serif text-base font-black mb-1">Thank You for Your Review!</h5>
                  <p className="text-xs font-semibold text-emerald-800 leading-relaxed">
                    Your review has been successfully added to our success wall. Thank you for sharing your experience with us!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleTestimonialSubmit} className="bg-amber-50/25 border border-amber-100/65 p-3.5 sm:p-6 rounded-xl sm:rounded-2xl space-y-4">
                  <h4 className="font-serif text-lg font-bold text-[#2A0D04] mb-1">Write Your Review</h4>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Please fill in your details below:</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="e.g. Shanti Sanap"
                        className="w-full bg-white border border-amber-200/80 rounded-xl px-4 py-3 text-xs font-bold text-[#2A0D04] placeholder-gray-400 focus:outline-none focus:border-[#6B2D17]/60 focus:ring-1 focus:ring-[#2A0D04]/20 transition-all shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Course or Workshop Name</label>
                      <input
                        type="text"
                        required
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        placeholder="e.g. Kundalini Yoga Course"
                        className="w-full bg-white border border-amber-200/80 rounded-xl px-4 py-3 text-xs font-bold text-[#2A0D04] placeholder-gray-400 focus:outline-none focus:border-[#6B2D17]/60 focus:ring-1 focus:ring-[#2A0D04]/20 transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Your Rating</label>
                    <div className="flex items-center gap-1.5 bg-white border border-amber-200/80 w-fit px-4 py-2.5 rounded-xl shadow-sm">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="text-amber-500 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                        >
                          <Star className={`w-5 h-5 ${star <= newRating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`} />
                        </button>
                      ))}
                      <span className="text-[10px] font-bold text-[#6B2D17] uppercase tracking-wider ml-2">{newRating} Stars</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Write Your Review</label>
                    <textarea
                      required
                      rows={4}
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      placeholder="Tell us how this course or workshop helped you and what you liked about it..."
                      className="w-full bg-white border border-amber-200/80 rounded-xl px-4 py-3 text-xs font-semibold text-[#2A0D04] placeholder-gray-400 focus:outline-none focus:border-[#6B2D17]/60 focus:ring-1 focus:ring-[#2A0D04]/20 transition-all shadow-sm leading-relaxed"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-gradient-to-r from-[#2A0D04] to-[#6B2D17] hover:from-[#120502] hover:to-[#2A0D04] text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-xl text-[10px] sm:text-xs uppercase tracking-widest shadow-md hover:shadow-lg active:scale-95 transition-all duration-300 cursor-pointer whitespace-nowrap"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
