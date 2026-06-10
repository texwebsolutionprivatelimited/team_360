import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BookOpen, Sparkles, Brain, Award, Wind, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { isPrivateSession, useAdminContent } from '../admin/contentStore';

export default function CoursesPage() {
  const [searchParams] = useSearchParams();
  const workshops = useAdminContent('courses');

  // Internal type filter coming from Navbar Query Parameter (e.g. ?type=Courses)
  const typeParam = searchParams.get('type') || 'All';

  // Screen Category tabs visible on the page (Abundance & Wealth, etc.)
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  // 1. Filter workshops matching the internal Navbar type
  const typeMatchedWorkshops = workshops.filter((w) => {
    if (typeParam !== 'All') {
      return (typeParam === 'Courses' && w.type === 'Course') ||
        (typeParam === 'Workshops' && w.type === 'Workshop') ||
        (typeParam === '1-to-1 Sessions' && isPrivateSession(w.type));
    }
    // If "All", show everything EXCEPT private '1-to-1 Session' products
    return !isPrivateSession(w.type);
  });

  // 2. Extract unique categories that actually have available items under this type
  const availableCategories = ['All', ...new Set(typeMatchedWorkshops.map((w) => w.category))];

  // 3. Reset selected Category tab to 'All' if the category is not available in the new type list
  useEffect(() => {
    if (!availableCategories.includes(selectedCategory)) {
      setSelectedCategory('All');
    }
  }, [typeParam]);

  // 4. Final filter representing the intersection of Navbar type & screen Category tab selection
  const filteredWorkshops = typeMatchedWorkshops.filter((w) => {
    if (selectedCategory !== 'All') {
      return w.category === selectedCategory;
    }
    return true;
  });

  // Scroll to hash sections on page load if present
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, []);

  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-[#FFF5EE] text-gray-900">
      {/* Immersive Page Header */}
      <div className="relative pt-4 pb-8 text-center overflow-hidden">
        {/* Soft light glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-white/40 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#6B2D17] uppercase mb-4 animate-tagline-blink">
            <BookOpen className="w-4 h-4 text-[#6B2D17] animate-pulse" />
            Certified Training &amp; Seminars
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2A0D04] leading-tight mb-4 drop-shadow-sm">
            Our Programs &amp; Workshops
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-medium">
            Explore our high-performance brain training courses, leadership workshops, and private 1-on-1 counseling sessions with Devendra Sharma (D.D. Sharma).
          </p>
        </div>
      </div>

      {/* Hide scrollbar utility class */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Categories Tabs Filter (Dynamically showing only categories that have items available) */}
      <div className="max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8 mb-6 sm:mb-12 relative z-10">
        <div className="flex flex-nowrap sm:flex-wrap items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar border-b border-amber-200 pb-3 sm:pb-6 px-1 sm:px-0">
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all duration-300 border uppercase tracking-wider whitespace-nowrap flex-shrink-0 ${selectedCategory === cat
                  ? 'bg-[#2A0D04] text-white border-transparent'
                  : 'bg-white/60 text-[#6B2D17]/80 border-amber-200 hover:bg-white hover:text-[#6B2D17]'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8 pb-16 relative z-10">
        {filteredWorkshops.length === 0 ? (
          <div className="text-center py-16 bg-white/40 border border-amber-100/50 rounded-[2rem] p-8 max-w-lg mx-auto shadow-sm">
            <BookOpen className="w-12 h-12 text-[#6B2D17]/60 mx-auto mb-4" />
            <h3 className="font-serif text-lg font-bold text-[#2A0D04] mb-2">No Matching Programs</h3>
            <p className="text-gray-600 text-xs sm:text-sm mb-4">
              We couldn't find any programs matching this specific combination of Navbar type and category tab.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
              }}
              className="bg-[#2A0D04] hover:bg-[#120502] text-white font-bold py-2.5 px-5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorkshops.map((w) => (
              <Link
                key={w.id}
                to={`/courses/${w.id}`}
                className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border-2 border-[#6B2D17]/50 p-4 sm:p-5 flex flex-col justify-between hover:border-[#6B2D17] hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1 text-left cursor-pointer animate-fade-in"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="relative h-48 sm:h-72 w-full rounded-xl sm:rounded-2xl overflow-hidden mb-4 bg-[#2A0D04] flex items-center justify-center">
                    <img
                      src={w.image}
                      alt={w.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-95"
                    />
                    <span className="absolute top-4 left-4 max-w-[calc(100%-2rem)] text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-[#2A0D04]/90 text-[#F5D28E] border border-[#F5D28E]/20 px-3 py-1.5 rounded-xl backdrop-blur-md whitespace-nowrap">
                      {w.category}
                    </span>
                  </div>

                  {/* Body */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2A0D04] group-hover:text-[#E25822] transition-colors leading-snug mb-1">
                    {w.title}
                  </h3>
                  <h4 className="text-[10px] font-bold text-[#2A0D04] uppercase tracking-widest mb-3">
                    {w.subtitle}
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
                    {w.description}
                  </p>
                </div>

                {/* View syllabus Link CTA */}
                <div
                  className="w-full border border-amber-200 group-hover:border-[#E25822] group-hover:bg-[#E25822]/5 text-[#6B2D17] font-bold py-3.5 rounded-xl text-center text-xs uppercase tracking-wider transition-all duration-300 block"
                >
                  View Details & Syllabus
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* 🌟 1. Core Program Outcomes / Benefits Grid */}
      <section className="bg-white/40 border-t border-b border-amber-100/60 py-16 relative z-10 mb-16">
        <div className="max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#6B2D17] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#6B2D17] animate-pulse" />
              Course Outcomes
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2A0D04]">
              What You Will Achieve
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#2A0D04] to-[#6B2D17] mx-auto rounded-full mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Wind className="w-6 h-6 text-[#E25822]" />,
                title: "Swar & Breath Mastery",
                description: "Align your Surya & Chandra swars to eliminate chronic stress, balance physical energy, and access peak cognitive capacity daily."
              },
              {
                icon: <Brain className="w-6 h-6 text-[#E25822]" />,
                title: "Gayatri Sound Science",
                description: "Awaken specific brain glands with 110k sound waves/sec frequency to stimulate GABA hormones and soothe overthinking."
              },
              {
                icon: <Award className="w-6 h-6 text-[#E25822]" />,
                title: "Certified Coach Pathway",
                description: "Build a highly lucrative professional coaching business with our authorized trainer certification programs."
              },
              {
                icon: <Sparkles className="w-6 h-6 text-[#E25822]" />,
                title: "Subconscious Wealth Codes",
                description: "Reprogram cellular memories at 8-12Hz (Alpha state) using practical techniques like the Water Glass manifestation method."
              }
            ].map((outcome, idx) => (
              <div key={idx} className="bg-white border border-amber-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-start">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-4">
                  {outcome.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2A0D04] mb-2">{outcome.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ❓ 2. Interactive FAQ Accordion Section */}
      <section className="max-w-[95%] sm:max-w-[70%] mx-auto px-3 sm:px-6 lg:px-8 pb-16 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#6B2D17] uppercase mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#6B2D17]" />
            Frequently Asked Questions
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#2A0D04]">
            Program &amp; Workshop Queries
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#2A0D04] to-[#6B2D17] mx-auto rounded-full mt-3" />
        </div>

        <div className="space-y-4">
          {[
            {
              q: "What is Swar Vigyan and how does it benefit my daily life?",
              a: "Swar Vigyan is the ancient Gayatri Science of breathing through specific nostrils (Surya/Ida and Chandra/Pingala). By understanding and aligning your nasal cycles, you can naturally regulate your body temperature, boost energy on demand, improve digestion, and enter a state of deep emotional balance."
            },
            {
              q: "How does chanting the Gayatri Mantra activate brain glands scientifically?",
              a: "Chanting the Gayatri Mantra at the correct speed generates approximately 110,000 sound wave vibrations per second. This specific resonance stimulates the pituitary, pineal, and thyroid glands. Scientific studies show it triggers the production of GABA hormones, which naturally soothe overthinking and anxiety."
            },
            {
              q: "Will I receive a certified teacher degree or coaching license?",
              a: "Yes! Our core training programs include structured training manuals and official certification. Successful graduates are certified as authorized mentors and trainers, enabling them to conduct workshops and explore high-earning opportunities in schools, institutions, and corporate coaching."
            },
            {
              q: "Are these workshops suitable for absolute beginners?",
              a: "Absolutely. Devendra Sharma (D.D. Sharma) Ji teaches every program starting from the foundational basics. Whether you are a business owner looking for stress relief, a student wanting to improve memory, or an aspiring coach, the course structure is designed to guide you step-by-step."
            },
            {
              q: "What formats are the courses conducted in?",
              a: "All programs are structured as online interactive bootcamps followed by extended guided daily practice (ranging from 15 to 45 days) to ensure the habits and techniques become permanently integrated into your subconscious mind."
            }
          ].map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div key={idx} className="bg-white border border-amber-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-serif font-bold text-xs xs:text-sm sm:text-base text-[#2A0D04] hover:bg-amber-50/35 transition-colors focus:outline-none"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 sm:w-5 h-5 text-[#6B2D17] flex-shrink-0 ml-2.5 sm:ml-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4 sm:w-5 h-5 text-[#6B2D17] flex-shrink-0 ml-2.5 sm:ml-4" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-gray-600 text-[11px] sm:text-sm leading-relaxed border-t border-amber-50/50 bg-amber-50/10 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 💼 3. VIP WhatsApp Counseling CTA Banner */}
      <section className="max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8 pb-24 relative z-10">
        <div className="bg-gradient-to-r from-[#2A0D04]/90 via-[#120502]/95 to-[#6B2D17]/90 border-2 border-[#FFD95A]/30 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden group">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#FFD95A]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#E68A3A]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#FFD95A]">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD95A] animate-pulse" />
              Personalized Guidance
            </span>
            <h2 className="font-serif text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
              Book a Private 1-on-1 Consultation
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-xs sm:text-sm sm:text-base leading-relaxed">
              Looking for direct, private counseling? Connect directly with Devendra Sharma (D.D. Sharma Ji) on WhatsApp to resolve mindset blocks, align your energy chakras, and design your personalized transformational pathway.
            </p>
            <div className="pt-2 flex justify-center">
              <a
                href="https://wa.me/916376779062?text=Hello%20Team%20360!%20I%20am%20visiting%20your%20website%20and%20would%20like%20to%20book%20a%20private%201-on-1%20consultation%20with%20D.D.%20Sharma%20Ji."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#25D366] to-[#20BA56] hover:brightness-110 text-white font-black py-4 px-8 rounded-xl text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-lg shadow-emerald-500/10 cursor-pointer w-fit"
              >
                <svg className="w-4 h-4 sm:w-5 h-5 fill-white text-white animate-pulse" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                Connect on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
