import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, Star, Award, Shield, Heart, Compass,
  Check, Play, HelpCircle, ChevronDown, Clock, Video, MapPin, Brain
} from 'lucide-react';
import ddSharmaPortrait from '../assets/dd_sharma_portrait.jpg';
import { isPrivateSession, useAdminContent } from '../admin/contentStore';

// High-quality custom WhatsApp SVG Logo icon component
const WhatsAppIcon = ({ className = "w-4 h-4 fill-current" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

export default function CounselingPage() {
  const workshops = useAdminContent('courses');
  const privateSessions = workshops.filter((w) => isPrivateSession(w.type));

  // State for interactive FAQ accordion
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // FAQ Mappings with easy English words and embedded WhatsApp logos
  const faqItems = [
    {
      q: 'What is the difference between Inner Shift and Deep Consultation?',
      a: 'Inner Shift is a quick 30-minute session to find immediate blockages and get fast, helpful life advice. Deep Consultation is a full 60-minute session that does a deep clean of negative energy, balances your body chakras, and builds a detailed roadmap for your life goals.'
    },
    {
      q: 'Can I record our personal session?',
      a: 'Yes, for the 60-minute Deep Consultation, we will send you a private audio recording of the session so you can listen to the advice anytime. The 30-minute session is short and does not include a recording.'
    },
    {
      q: 'What happens during a Face-to-Face session?',
      a: 'You meet Devendra Sharma (D.D. Sharma Ji) in person in a calm, beautiful space. He guides you directly with personalized counseling, direct energy healing, and custom mind reprogramming to bring peace to your mind.'
    },
    {
      q: 'How do I book a slot after making the payment?',
      a: (
        <span>
          Once you click the booking button, it will open{' '}
          <span className="inline-flex items-center gap-1 font-bold text-[#20BA56] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100/50">
            <WhatsAppIcon className="w-3.5 h-3.5 fill-[#20BA56]" />
            WhatsApp
          </span>{' '}
          to message our friendly team. After confirming your session, our team will share the available date and time slots so you can choose the best time for you.
        </span>
      )
    },
    {
      q: 'Is my session kept private?',
      a: 'Absolutely. Everything you share during the session is 100% private and confidential. Your safety and trust are our highest priorities.'
    },
    {
      q: 'Can I change my session time if I am busy?',
      a: 'Yes, you can easily change your session time up to 24 hours before the call. Rescheduling is not possible if you inform us in less than 24 hours.'
    },
    {
      q: 'Do I need to know meditation before booking?',
      a: 'No, you do not need any past experience in meditation. D.D. Sharma Ji will guide you very simply and easily. You only need to sit comfortably and listen with an open mind.'
    }
  ];

  return (
    <div className="pt-20 lg:pt-28 pb-20 min-h-screen bg-[#FFF5EE] relative overflow-hidden text-gray-900">

      {/* 🌌 Soft background glowing spheres for visual wonder */}
      <div className="absolute top-[5%] left-[-10%] w-[45%] h-[45%] rounded-full bg-amber-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-15%] w-[50%] h-[50%] rounded-full bg-amber-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-amber-500/5 blur-[130px] pointer-events-none" />

      {/* Container to restrict maximum width and keep uniform left/right spaces */}
      <div className="max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16 lg:space-y-20">

        {/* 🔮 Hero Heading */}
        <section className="text-center max-w-3xl mx-auto px-2">
          <div className="space-y-3 sm:space-y-4 animate-fade-in">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black tracking-widest text-[#6B2D17] uppercase bg-white/50 px-4 py-2 rounded-full border border-amber-200/60 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#6B2D17] animate-pulse" />
              Private 1-on-1 Sessions
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#2A0D04] leading-tight">
              Personal Guidance & Life Healing
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-[#E25822] to-[#6B2D17] mx-auto rounded-full" />
            <p className="text-gray-700 text-xs sm:text-sm font-semibold max-w-2xl mx-auto leading-relaxed">
              Get personal guidance from D.D. Sharma Ji to heal emotional pain, clear life blockages, and invite success and happiness into your career, family, and relationships.
            </p>
          </div>
        </section>

        {/* 💳 Section 1: Dynamic 1-to-1 Sessions Card Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {privateSessions.length > 0 ? (
            privateSessions.map((w) => (
              <Link
                key={w.id}
                to={`/courses/${w.id}`}
                className="bg-white rounded-[1.5rem] sm:rounded-[2rem] border-2 border-[#6B2D17]/20 p-4 sm:p-5 flex flex-col justify-between hover:border-[#E25822] hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1 text-left cursor-pointer animate-fade-in"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="relative h-48 sm:h-72 w-full rounded-xl sm:rounded-2xl overflow-hidden mb-4 bg-amber-950 flex items-center justify-center">
                    <img
                      src={w.image}
                      alt={w.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-90"
                    />
                    <span className="absolute top-4 left-4 max-w-[calc(100%-2rem)] text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-[#2A0D04]/90 text-[#FFF5EE] border border-[#FFF5EE]/20 px-3 py-1.5 rounded-xl backdrop-blur-md whitespace-nowrap">
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

                {/* View syllabus / Book Session Link CTA */}
                <div
                  className="w-full border border-amber-200 group-hover:border-[#E25822] group-hover:bg-[#E25822]/5 text-[#6B2D17] group-hover:text-[#E25822] font-bold py-3.5 rounded-xl text-center text-xs uppercase tracking-wider transition-all duration-300 block"
                >
                  View Details &amp; Book Session
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-amber-100">
              <h3 className="font-serif text-xl font-bold text-[#2A0D04] mb-2">No Private Sessions Available</h3>
              <p className="text-gray-500 text-sm">Please enquire directly on WhatsApp for personal counseling bookings.</p>
              <a
                href="https://wa.me/916376779062?text=Hello%20Team%20360!%20I%20want%20to%20book%20a%20private%201-on-1%20counseling%20session%20with%20D.D.%20Sharma%20Ji."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA56] text-white font-bold text-xs px-6 py-3 rounded-xl transition-all duration-300"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                Book via WhatsApp
              </a>
            </div>
          )}
        </section>

        {/* 🏢 Section 2: Corporate wellness Callout banner */}
        <section className="relative z-10">
          <div className="bg-gradient-to-r from-[#2A0D04] via-[#6B2D17] to-[#120502] rounded-[1.75rem] sm:rounded-[2.5rem] p-4.5 sm:p-10 lg:p-12 border border-[#F5D28E]/30 shadow-2xl relative overflow-hidden group">
            {/* Ambient glows inside corporate card */}
            <div className="absolute -top-12 -left-12 w-28 h-28 bg-[#F5D28E]/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center lg:text-left max-w-2xl">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#F5D28E]">
                  <Award className="w-3.5 h-3.5" />
                  Corporate & Group Healing
                </span>
                <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">
                  Want Group Sessions or Corporate Training?
                </h3>
                <p className="text-amber-100/80 text-xs sm:text-sm font-semibold leading-relaxed">
                  Reduce stress, improve team focus, and bring positivity to your office. D.D. Sharma Ji designs special group meditation and mind programming sessions for companies, events, and business leaders.
                </p>
              </div>

              <a
                href="https://wa.me/916376779062?text=Hello%20Team%20360!%20I%20want%20to%20inquire%20about%20group%20meditation%20sessions%20or%20corporate%20wellness%20training."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full lg:w-auto px-6 py-3 sm:py-3.5 bg-[#25D366] hover:bg-[#20BA56] text-white text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 shrink-0 whitespace-nowrap active:scale-[0.98] cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Inquire For Corporate</span>
              </a>
            </div>
          </div>
        </section>

        {/* 🎬 Section 3: Large Responsive Video Trailer Showcase */}
        <section className="relative z-10 space-y-4 sm:space-y-6">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-bold tracking-widest text-[#6B2D17] uppercase bg-white/50 px-4 py-2 rounded-full border border-amber-200/60 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-[#6B2D17]" />
              Video Introduction
            </span>
            <h2 className="font-serif text-xl sm:text-3xl font-extrabold text-[#2A0D04]">
              Learn How Subconscious Training Works
            </h2>
            <div className="w-16 h-1 bg-[#6B2D17] mx-auto rounded-full" />
            <p className="text-gray-700 text-xs sm:text-sm font-semibold max-w-2xl mx-auto leading-relaxed px-2">
              Watch this short news feature to understand how Team 360 programs help you reprogram your mind, remove stress, and activate peak potential.
            </p>
          </div>

          <div className="relative aspect-video rounded-[1.75rem] sm:rounded-[2.5rem] overflow-hidden bg-black border-2 border-white shadow-xl shadow-amber-950/10">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/Dru7SvQB52w"
              title="Team 360 Introduction Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </section>

        {/* 🧘 Section 4: Why Choose Us Split Benefits / Portrait Card */}
        <section className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] p-4.5 sm:p-10 border border-amber-100/60 shadow-lg relative overflow-hidden text-left">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full blur-2xl" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            {/* Left Column: Benefits Content */}
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black tracking-widest text-[#6B2D17] uppercase">
                  <Compass className="w-4 h-4 text-[#6B2D17]" />
                  Trusted Guidance
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2A0D04] leading-snug">
                  Why Choose D.D. Sharma Ji as Your Guide?
                </h3>
                <div className="w-16 h-1 bg-[#6B2D17] rounded-full" />
              </div>

              <div className="space-y-5 text-gray-800 text-xs sm:text-sm font-semibold leading-relaxed">
                <p>
                  These personal calls are simple, practical, and highly effective. They are built to help you solve real-life problems like family stress, career path choices, and money blockages using scientific mind training.
                </p>
                
                {/* 3 Core Strengths list */}
                <div className="space-y-4 pt-2">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#6B2D17] border border-amber-100 shrink-0">
                      <Star className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-black text-sm sm:text-base text-[#2A0D04]">32+ Years of Trusted Experience</h4>
                      <p className="text-[11px] sm:text-xs text-gray-600 font-semibold mt-0.5">
                        Guided thousands of corporate leaders and seekers around the world to find peace, health, and complete success.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#6B2D17] border border-amber-100 shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-black text-sm sm:text-base text-[#2A0D04]">Fully Customized Solutions</h4>
                      <p className="text-[11px] sm:text-xs text-gray-600 font-semibold mt-0.5">
                        Every single session is uniquely personalized to focus on your specific problems, brain activation, and life situation.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#6B2D17] border border-amber-100 shrink-0">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-black text-sm sm:text-base text-[#2A0D04]">Safe & 100% Private Call</h4>
                      <p className="text-[11px] sm:text-xs text-gray-600 font-semibold mt-0.5">
                        Enjoy absolute safety and complete secrecy. You can share your feelings and heart out with total peace.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Premium Framed Portrait */}
            <div className="relative flex justify-center">
              {/* Decorative back orbits */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#2A0D04]/5 to-amber-500/10 rounded-3xl -rotate-2 transform scale-102" />
              <div className="absolute inset-0 w-full h-full border-2 border-dashed border-[#6B2D17]/20 rounded-3xl rotate-2 transform scale-98 pointer-events-none" />

              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white max-w-xs w-full">
                <img
                  src={ddSharmaPortrait}
                  alt="D.D. Sharma Ji Portrait"
                  className="w-full h-auto object-cover hover:scale-103 transition-transform duration-750"
                />
                
                {/* Bottom title block */}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-5 text-white">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#F5D28E]">Mind Trainer & Spiritual Coach</span>
                  <h4 className="font-serif font-extrabold text-sm sm:text-base text-white tracking-wide mt-1">Devendra Sharma</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ❓ Section 5: Premium Interactive FAQ Accordion */}
        <section className="space-y-6">
          <div className="text-center space-y-3">
            <span className="inline-flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-bold tracking-widest text-[#6B2D17] uppercase bg-white/50 px-4 py-2 rounded-full border border-amber-200/60 shadow-sm">
              <HelpCircle className="w-3.5 h-3.5 text-[#6B2D17]" />
              Questions & Answers
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2A0D04]">
              Frequently Asked Questions
            </h2>
            <div className="w-16 h-1 bg-[#6B2D17] mx-auto rounded-full" />
            <p className="text-gray-700 text-xs sm:text-sm font-semibold max-w-2xl mx-auto leading-relaxed px-2">
              Got questions about booking your personal session? Read our simple answers below.
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white border border-amber-100 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-4 py-3.5 sm:px-6 sm:py-5 flex items-center justify-between text-left gap-4"
                  >
                    <span className="font-serif font-extrabold text-xs sm:text-sm md:text-base text-[#2A0D04] leading-snug">
                      {item.q}
                    </span>
                    <span className={`p-1.5 rounded-full border border-amber-50 transition-all ${
                      isOpen ? 'bg-[#2A0D04] text-[#F5D28E] rotate-180' : 'bg-amber-50/50 text-[#2A0D04]'
                    }`}>
                      <ChevronDown className="w-4 h-4 pointer-events-none" />
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100 border-t border-amber-50' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="px-4 py-3.5 sm:px-6 sm:py-5 text-gray-800 text-xs sm:text-sm font-semibold leading-relaxed bg-amber-50/10">
                      {item.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
