import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ddSharmaPortrait from '../assets/dd_sharma_portrait.jpg';
import { BookOpen, Check, Shield, Award, MessageCircle, ArrowLeft, Calendar, Sparkles, AlertCircle, Heart, Star, Coins, Flame, Sun } from 'lucide-react';
import { isPrivateSession, useAdminContent } from '../admin/contentStore';

const WhatsAppIcon = ({ className = "w-4 h-4 fill-white" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

export default function CourseDetailsPage() {
  const { id } = useParams();
  const workshops = useAdminContent('courses');

  // Find the matching workshop
  const workshop = workshops.find((w) => w.id === id);

  useEffect(() => {
    if (workshop) {
      document.title = `${workshop.title} | Team 360 Bookstore`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `${workshop.subtitle || ''} - Learn more about ${workshop.title} guided by Devendra Sharma (D.D. Sharma). category: ${workshop.category}.`);
      }
    }
  }, [workshop]);

  // Dynamic styling helper for "Who Can Join" card based on course category
  const getWhoCanJoinStyle = (category) => {
    const baseStyle = {
      cardBg: 'bg-white border-2 border-amber-300 shadow-2xl',
      glowBg: 'bg-amber-100/40',
      titleColor: 'text-[#2A0D04]',
      bulletColor: 'bg-[#6B2D17]',
      itemBg: 'bg-amber-50/40 hover:bg-amber-50/70 border border-amber-200',
    };

    switch (category) {
      case 'Abundance & Wealth':
        return {
          ...baseStyle,
          iconColor: 'text-[#D4AF37]',
          iconName: 'Coins',
        };
      case 'Angels & Dragons':
        return {
          ...baseStyle,
          iconColor: 'text-[#7C3AED]',
          iconName: 'Flame',
        };
      case 'Yoga & Consciousness':
        return {
          ...baseStyle,
          iconColor: 'text-emerald-600',
          iconName: 'Sun',
        };
      case 'Spiritual Healing':
      default:
        return {
          ...baseStyle,
          iconColor: 'text-rose-500',
          iconName: 'Heart',
        };
    }
  };

  const cardStyle = workshop ? getWhoCanJoinStyle(workshop.category) : {};

  // Dynamic icon component resolver
  const renderCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Coins':
        return <Coins className={`w-4 h-4 ${cardStyle.iconColor} flex-shrink-0 animate-pulse`} />;
      case 'Flame':
        return <Flame className={`w-4 h-4 ${cardStyle.iconColor} flex-shrink-0 animate-pulse`} />;
      case 'Sun':
        return <Sun className={`w-4 h-4 ${cardStyle.iconColor} flex-shrink-0 animate-pulse`} />;
      case 'Heart':
      default:
        return <Heart className={`w-4 h-4 ${cardStyle.iconColor} flex-shrink-0 animate-pulse`} />;
    }
  };

  // Dynamic helper for unique "Sacred Frequency Seal" based on course category
  const getSacredSeal = (category) => {
    switch (category) {
      case 'Abundance & Wealth':
        return {
          title: 'Maha Laxmi & Kuber Blessing Seal',
          desc: 'This special session brings the blessings of Goddess Laxmi and Lord Kuber. It helps you clear your money worries, remove financial blocks, and attract wealth and success in life.',
          glowBg: 'bg-amber-100/40',
          svg: (
            <svg className="w-16 h-16 text-[#D4AF37] animate-[spin_50s_linear_infinite]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(45 50 50)" />
              <rect x="28" y="28" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <polygon points="50,38 60,56 40,56" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <polygon points="50,62 60,44 40,44" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="4" fill="currentColor" />
            </svg>
          )
        };
      case 'Angels & Dragons':
        return {
          title: 'Angel & Dragon Protection Seal',
          desc: 'This session connects you with powerful angels and helpful energy guides. It keeps you safe from negative energies, clears fear, and builds a strong positive shield around you.',
          glowBg: 'bg-amber-100/40',
          svg: (
            <svg className="w-16 h-16 text-[#7C3AED] animate-[spin_35s_linear_infinite]" viewBox="0 0 100 100">
              <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="none" stroke="currentColor" strokeWidth="2" />
              <polygon points="50,22 74,36 74,64 50,78 26,64 26,36" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
              <polygon points="50,10 85,70 15,70" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <polygon points="50,90 85,30 15,30" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="10" r="3" fill="currentColor" />
              <circle cx="85" cy="30" r="3" fill="currentColor" />
              <circle cx="85" cy="70" r="3" fill="currentColor" />
              <circle cx="50" cy="90" r="3" fill="currentColor" />
              <circle cx="15" cy="70" r="3" fill="currentColor" />
              <circle cx="15" cy="30" r="3" fill="currentColor" />
              <circle cx="50" cy="50" r="3" fill="currentColor" />
            </svg>
          )
        };
      case 'Yoga & Consciousness':
        return {
          title: 'Babaji Kriya Yoga Blessings',
          desc: 'This is a sacred energy session under the guidance of Mahavatar Babaji. It helps you improve focus, learn simple spiritual exercises, and keep your mind and body calm.',
          glowBg: 'bg-emerald-100/40',
          svg: (
            <svg className="w-16 h-16 text-[#059669] animate-[pulse_3s_ease-in-out_infinite]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" />
              <path d="M50,20 C55,35 65,35 50,50 C35,35 45,35 50,20 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M50,80 C55,65 65,65 50,50 C35,65 45,65 50,80 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M20,50 C35,55 35,65 50,50 C35,35 35,45 20,50 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M80,50 C65,55 65,65 50,50 C65,35 65,45 80,50 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="3" fill="currentColor" />
            </svg>
          )
        };
      case 'Spiritual Healing':
      default:
        return {
          title: 'Deep Healing & Peace Seal',
          desc: 'This session uses pure healing energy to remove old emotional pain, heal childhood worries, clear stressful thoughts, and bring deep peace and joy to your heart.',
          glowBg: 'bg-rose-100/40',
          svg: (
            <svg className="w-16 h-16 text-[#E11D48] animate-[spin_60s_linear_infinite]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="35" r="20" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="50" cy="65" r="20" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="35" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="65" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="39.5" cy="39.5" r="20" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2,2" />
              <circle cx="60.5" cy="39.5" r="20" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2,2" />
              <circle cx="39.5" cy="60.5" r="20" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2,2" />
              <circle cx="60.5" cy="60.5" r="20" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2,2" />
              <circle cx="50" cy="50" r="5" fill="currentColor" />
            </svg>
          )
        };
    }
  };

  const sealData = workshop ? getSacredSeal(workshop.category) : {};

  // Dynamic helper for unique bottom banner footer action card based on category
  const getBottomBanner = (category) => {
    switch (category) {
      case 'Abundance & Wealth':
        return {
          title: 'Ready to Attract Wealth & Prosperity?',
          desc: "Message us on WhatsApp to book your seat, get class timings, and learn how to attract wealth and success today.",
          glowBg: 'bg-amber-100/40',
        };
      case 'Angels & Dragons':
        return {
          title: 'Want to feel safe and positive?',
          desc: "Start your protective angel and dragon energy training. Message us on WhatsApp to secure your seat and class slot.",
          glowBg: 'bg-amber-100/40',
        };
      case 'Yoga & Consciousness':
        return {
          title: 'Ready to learn simple Kriya Yoga?',
          desc: "Take your next step to learn daily yoga exercises for mental peace. Connect with us on WhatsApp to book your class seat.",
          glowBg: 'bg-emerald-100/40',
        };
      case 'Spiritual Healing':
      default:
        return {
          title: 'Ready to clear stress and feel happy?',
          desc: "Start your personal healing or soul reading class. Connect with us on WhatsApp to check available dates and book your seat.",
          glowBg: 'bg-rose-100/40',
        };
    }
  };

  const bottomData = workshop ? getBottomBanner(workshop.category) : {};

  // Scroll to top on mount / change of id
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  // States for FAQs
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const defaultFaqs = [
    {
      q: "What is a spiritual attunement or activation session?",
      a: "An attunement is a direct vibrational frequency alignment that cleanses the subtle energy bodies (aura, chakras, etheric pathways). D.D. Sharma channels high-vibrational guidance to clear deep-rooted karmic blocks and align you with your higher self's infinite potential."
    },
    {
      q: "Do I need any prior meditation or spiritual experience?",
      a: "No. All programs are open to seekers at any stage of their spiritual journey. D.D. Sharma guides you step-by-step through the meditation alignments, mantras, mudras, and energetic shielding exercises."
    },
    {
      q: "How long does the integration take?",
      a: "Spiritual frequencies usually settle into your energetic blueprint over a 21-day cycle. You may feel immediate lightheartedness, temporary emotional release, or enhanced clarity as the attunement integrates."
    },
    {
      q: "Are live recordings provided if I miss a workshop session?",
      a: "Yes, complete high-definition recordings of the attunement sessions are provided to all registered participants for lifetime practice, integration, and repeat activations."
    },
    {
      q: "How do I book a private 1-on-1 session?",
      a: "You can tap any of the WhatsApp registration buttons. D.D. Sharma's office will check current calendar slots and assign a personalized time suited to your timezone and energetic requirements."
    }
  ];

  const faqItems = (workshop && workshop.faqs) ? workshop.faqs : defaultFaqs;

  if (!workshop) {
    return (
      <div className="pt-32 min-h-screen bg-[#FFF5EE] flex flex-col items-center justify-center px-4 text-center">
        <div className="bg-white border border-amber-200 rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
          <div className="absolute top-[-20%] left-[-20%] w-48 h-48 rounded-full bg-amber-100/50 blur-2xl pointer-events-none" />
          <BookOpen className="w-16 h-16 text-[#6B2D17] mx-auto mb-4 animate-bounce" />
          <h2 className="font-serif text-2xl font-black text-[#2A0D04] mb-2">
            Offering Not Found
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            We couldn't find the program you are looking for. It may have been renamed or rescheduled.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 bg-[#2A0D04] hover:bg-[#120502] text-white font-bold py-3.5 px-6 rounded-xl transition-all text-xs uppercase tracking-wider shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  // Get suggestions of the same general type (group program vs 1-to-1 session)
  const isOneOnOne = isPrivateSession(workshop.type);

  const related = workshops.filter((w) => {
    const typeMatch = isOneOnOne ? isPrivateSession(w.type) : !isPrivateSession(w.type);
    return typeMatch && w.category === workshop.category && w.id !== workshop.id;
  });

  let suggestions = [...related];
  if (suggestions.length < 3) {
    const remaining = workshops.filter((w) => {
      const typeMatch = isOneOnOne ? isPrivateSession(w.type) : !isPrivateSession(w.type);
      return typeMatch && w.id !== workshop.id && !suggestions.some(s => s.id === w.id);
    });
    suggestions = [...suggestions, ...remaining].slice(0, 3);
  } else {
    suggestions = suggestions.slice(0, 3);
  }

  // Dynamic suggestions section heading
  let suggestionsHeading = "More Workshops For You";
  if (workshop.type === 'Course') {
    suggestionsHeading = "More Courses For You";
  } else if (isPrivateSession(workshop.type)) {
    suggestionsHeading = "More 1-to-1 Sessions For You";
  }

  // Clean markers (bullets, asterisk, leading numbers like 1., 2.) from text
  const cleanTextLine = (text) => {
    if (!text) return '';
    return text
      .replace(/^[*\-\u27A1\u2192\u25C6\u2022]\s*/g, '') // Remove bullets/stars/arrows
      .replace(/^\d+[\.\)\-]\s*/g, '')                 // Remove list numbers
      .trim();
  };

  // Helper to parse double newlines or newlines into structural roadmap blocks
  const parseDetailsToBlocks = (detailsText) => {
    if (!detailsText) return [];
    // Split by newlines and clean empty lines
    const rawLines = detailsText.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    return rawLines.map((line) => {
      // Find splits like ":" or "—" or "–" to identify headings
      const splitChar = line.includes(':') ? ':' : (line.includes('—') ? '—' : (line.includes('–') ? '–' : ''));
      if (splitChar) {
        const index = line.indexOf(splitChar);
        return {
          title: cleanTextLine(line.substring(0, index)),
          desc: cleanTextLine(line.substring(index + 1))
        };
      }
      return {
        title: '',
        desc: cleanTextLine(line)
      };
    });
  };

  const curriculumBlocks = parseDetailsToBlocks(workshop.details);

  return (
    <div className="pt-20 lg:pt-28 min-h-screen bg-[#FFF5EE] text-gray-900 pb-16 sm:pb-24">
      {/* Decorative backdrop glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[40%] rounded-full bg-white/30 blur-[130px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8 relative z-10">

        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-[#6B2D17] hover:text-[#2A0D04] font-bold text-[10px] sm:text-sm uppercase tracking-wider transition-colors bg-white/60 border border-amber-200/50 px-4 py-2 rounded-full"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Back to Catalog
          </Link>
        </div>

        {/* Row 1: Full-Width Glassmorphic Hero Header */}
        <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] p-3.5 sm:p-10 border border-amber-100 shadow-2xl relative overflow-hidden mb-5 sm:mb-8">
          <div className="absolute top-[-20%] right-[-10%] w-80 h-80 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 rounded-full bg-white/40 blur-2xl pointer-events-none" />

          <div className="relative z-10 border-b border-amber-100 pb-5 sm:pb-6 mb-5 sm:mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[9px] font-black uppercase tracking-widest text-[#6B2D17] bg-[#6B2D17]/5 border border-[#6B2D17]/15 px-3 py-1 rounded-full">
                {workshop.category}
              </span>
            </div>
            <p className="text-[#6B2D17] text-[10px] sm:text-xs font-black uppercase tracking-widest mb-1.5 animate-pulse">
              {workshop.subtitle}
            </p>
            <h1 className="font-serif text-xl sm:text-4xl font-extrabold text-[#2A0D04] leading-tight drop-shadow-sm">
              {workshop.title}
            </h1>
          </div>

          <div className="relative z-10 space-y-4 text-gray-700 text-xs sm:text-base leading-relaxed">
            <p className="font-semibold text-gray-800 text-sm sm:text-lg">
              {workshop.description}
            </p>
          </div>
        </div>

        {/* Row 2: Split Columns for Core Details (Left 5-cols, Right 7-cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start mb-6 sm:mb-8">

          {/* LEFT SIDE: Sidebar image & action elements (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] p-3 sm:p-6 border border-amber-100 shadow-2xl relative overflow-hidden group">
              {/* Image Box */}
              <div className="relative h-44 sm:h-80 w-full rounded-[1.25rem] sm:rounded-[1.75rem] overflow-hidden mb-4 sm:mb-6 bg-[#2A0D04] shadow-inner border-2 border-amber-300/80">
                <img
                  src={workshop.image}
                  alt={workshop.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-wider bg-[#2A0D04]/90 text-[#F5D28E] border border-[#F5D28E]/25 px-4 py-2 rounded-full backdrop-blur-md">
                  {workshop.category}
                </span>
              </div>

              {/* Quick stats grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="bg-amber-50/60 p-2.5 sm:p-4 rounded-2xl border-2 border-amber-300/80 flex flex-col justify-between hover:bg-amber-50/80 hover:scale-[1.02] transition-all duration-300">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B2D17] mb-1.5 sm:mb-2" />
                  <div>
                    <span className="block text-[8px] sm:text-[9px] font-black text-[#6B2D17] uppercase tracking-wider">Format</span>
                    <span className="font-bold text-[10px] sm:text-sm text-[#2A0D04] leading-tight block">{workshop.duration}</span>
                  </div>
                </div>

                <div className="bg-amber-50/60 p-2.5 sm:p-4 rounded-2xl border-2 border-amber-300/80 flex flex-col justify-between hover:bg-amber-50/80 hover:scale-[1.02] transition-all duration-300">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B2D17] mb-1.5 sm:mb-2" />
                  <div>
                    <span className="block text-[8px] sm:text-[9px] font-black text-[#6B2D17] uppercase tracking-wider">Classification</span>
                    <span className="font-bold text-[10px] sm:text-sm text-[#2A0D04] leading-tight block">{workshop.type}</span>
                  </div>
                </div>
              </div>

              {/* Registration and Whatsapp Actions */}
              <div className="bg-amber-50/30 border border-amber-200 p-3.5 sm:p-5 rounded-2xl space-y-4 shadow-sm">
                <a
                  href={`https://wa.me/916376779062?text=Hello%20Team%20360%20Support,%20I%20am%20very%20interested%20in%20registering%20for%20the%20${encodeURIComponent(workshop.title)}.%20Please%20guide%20me%20on%20the%20registration%20details!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-[#25D366] to-[#20BA56] hover:brightness-105 text-white font-black py-3 sm:py-4 px-2 sm:px-4 rounded-xl flex items-center justify-center gap-1.5 sm:gap-2.5 text-[10px] sm:text-xs uppercase tracking-wider shadow-md transition-all active:scale-[0.98] cursor-pointer"
                >
                  <WhatsAppIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-white animate-bounce flex-shrink-0" />
                  Register via WhatsApp
                </a>
                <p className="text-[9px] sm:text-[10px] text-gray-500 text-center font-medium leading-relaxed">
                  Deep activations involve precise cosmic timings. Tap above to connect with D.D. Sharma's office on WhatsApp for slot allocations, pricing structures, and joining links.
                </p>
              </div>
            </div>

            {/* Who Can Join Details Card in Sidebar for Spacing Balance */}
            {workshop.whoCanJoin && workshop.whoCanJoin.length > 0 && (
              <div className={`rounded-[1.5rem] sm:rounded-[2.5rem] p-4 sm:p-6 border shadow-2xl relative overflow-hidden text-left transition-all duration-300 hover:scale-[1.01] ${cardStyle.cardBg}`}>
                <div className={`absolute top-[-20%] left-[-20%] w-32 h-32 rounded-full blur-2xl pointer-events-none z-0 ${cardStyle.glowBg}`} />
                <div className="relative z-10">
                  <h3 className={`font-serif text-xs sm:text-sm font-black flex items-center gap-2 mb-3 border-b border-amber-100/25 pb-2 ${cardStyle.titleColor}`}>
                    {renderCategoryIcon(cardStyle.iconName)}
                    Who Can Join?
                  </h3>
                  <div className="space-y-2">
                    {workshop.whoCanJoin.map((who, idx) => (
                      <div key={idx} className={`flex gap-2 text-[10px] sm:text-[11px] leading-relaxed font-semibold p-2.5 sm:p-3 rounded-xl border transition-all duration-200 ${cardStyle.titleColor} ${cardStyle.itemBg}`}>
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${cardStyle.bulletColor}`} />
                        <span>{who}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Unique Portal Element: Mandalic Sacred Geometry SVG Seal */}
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] p-4 sm:p-6 border-2 border-amber-300/80 shadow-2xl relative overflow-hidden text-center transition-all duration-300 hover:scale-[1.01]">
              <div className={`absolute top-[-20%] left-[-20%] w-32 h-32 rounded-full blur-2xl pointer-events-none z-0 ${sealData.glowBg}`} />
              <div className="relative z-10">
                <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-4 relative flex items-center justify-center bg-amber-50 rounded-full border border-[#FFF5EE]">
                  {sealData.svg}
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F5D28E] absolute animate-pulse" />
                </div>
                <h4 className="font-serif font-black text-[#2A0D04] text-xs sm:text-sm uppercase tracking-widest mb-1.5">
                  {sealData.title}
                </h4>
                <p className="text-[10px] sm:text-[11px] text-gray-600 leading-relaxed max-w-xs mx-auto font-semibold">
                  {sealData.desc}
                </p>
              </div>
            </div>


          </div>

          {/* RIGHT SIDE: Core Curriculum, Benefits & Who Can Join (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-8">
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] p-4 sm:p-10 border border-amber-100 shadow-2xl relative overflow-hidden">
              <div className="absolute top-[-5%] right-[-5%] w-64 h-64 rounded-full bg-amber-100/30 blur-3xl pointer-events-none" />

              {/* Sacred Roadmap / Curriculum Timeline */}
              {curriculumBlocks.length > 0 && (
                <div className="space-y-6 mb-8">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2A0D04] flex items-center gap-2 mb-4">
                    <BookOpen className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#6B2D17]" />
                    Program Roadmap & Curriculum
                  </h3>

                  <div className="relative pl-5 sm:pl-8 border-l-2 border-amber-300/80 ml-1.5 sm:ml-2 space-y-6">
                    {curriculumBlocks.map((block, idx) => (
                      <div key={idx} className="relative group/timeline">
                        {/* Timeline Node dot */}
                        <span className="absolute left-[-29px] sm:left-[-41px] top-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#2A0D04] border-4 border-white shadow-md group-hover/timeline:scale-110 transition-transform duration-300 flex items-center justify-center z-10" />

                        <div className="bg-amber-50/40 border-2 border-amber-300/80 p-3.5 sm:p-5 rounded-2xl group-hover/timeline:border-[#6B2D17]/40 group-hover/timeline:bg-amber-50/70 transition-all duration-300">
                          {block.title ? (
                            <>
                              <h4 className="font-serif font-black text-xs sm:text-base text-[#2A0D04] mb-1.5">
                                {block.title}
                              </h4>
                              <p className="text-gray-700 text-[11px] sm:text-sm leading-relaxed font-medium">
                                {block.desc}
                              </p>
                            </>
                          ) : (
                            <p className="text-gray-700 text-[11px] sm:text-sm leading-relaxed font-medium">
                              {block.desc}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Benefits Grid */}
              {workshop.benefits && workshop.benefits.length > 0 && (
                <div className="space-y-4 border-t border-amber-100 pt-6 sm:pt-8 mb-8">
                  <h3 className="font-serif text-base sm:text-xl font-bold text-[#2A0D04] flex items-center gap-2">
                    <Award className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#6B2D17] flex-shrink-0" />
                    Key Benefits of This Attunement
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {workshop.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex gap-2 text-[11px] sm:text-sm text-gray-700 leading-relaxed font-semibold bg-amber-50/40 border-2 border-amber-300/80 p-3.5 sm:p-4 rounded-2xl hover:bg-amber-50/70 hover:scale-[1.01] transition-all duration-300">
                        <Check className="w-3.5 h-3.5 text-[#6B2D17] flex-shrink-0 mt-0.5" />
                        <span>{cleanTextLine(benefit)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Row 3: Full-Width Meet Your Facilitator Banner (Spans 12 columns) */}
        <div className="bg-white/85 rounded-[1.5rem] sm:rounded-[2.5rem] p-4 sm:p-10 shadow-2xl relative overflow-hidden border border-amber-200/60 mb-8">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#FFF5EE]/50 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-amber-50 blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-6 sm:gap-10 items-center md:items-start relative z-10">
            {/* Left side: Beautiful large styled portrait photo of D.D. Sharma */}
            <div className="w-32 h-32 sm:w-60 sm:h-60 rounded-2xl sm:rounded-3xl bg-[#FFF5EE] p-1 shadow-2xl border-2 border-amber-300/80 relative group overflow-hidden">
              <img
                src={ddSharmaPortrait}
                alt="Devendra Sharma (D.D. Sharma)"
                className="w-full h-full object-cover rounded-xl sm:rounded-2xl group-hover:scale-105 transition-transform duration-700 brightness-95"
              />
              <div className="absolute inset-0 border border-[#F5D28E]/20 rounded-xl sm:rounded-2xl pointer-events-none" />
            </div>

            {/* Right side: Detailed spiritual Facilitator Bio directly matching user image content */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <p className="text-[#6B2D17] text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1 animate-pulse">
                  Spiritual Master | Divine Channel | Founder of Team 360
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2A0D04] leading-tight">
                  About Team 360
                </h3>
              </div>

              <div className="space-y-3.5 text-gray-700 text-xs sm:text-sm leading-relaxed font-medium">
                <p className="text-[#6B2D17] font-semibold text-sm sm:text-base border-l-4 border-[#6B2D17]/40 pl-3">
                  Devendra Sharma (D.D. Sharma) is not just a healer—she is a direct channel of divine intelligence, working beyond traditional spirituality to create real, measurable transformation in people's lives.
                </p>
                <p className="text-[#2A0D04]/80">
                  With a rare natural ability to access higher realms, D.D. Sharma connects effortlessly with Angels, Unicorns, Dragons, and divine consciousness, bringing through high-frequency energies that activate healing at the soul, timeline, and reality level.
                </p>
                <p className="text-[#6B2D17] font-semibold">
                  Her work is deeply experiential—clients don't just learn spirituality, they experience energetic shifts, breakthroughs, and life changes in real time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 4: Collapsible FAQs Accordion (Full Width) */}
        <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] p-4 sm:p-10 border border-amber-200 shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 rounded-full bg-amber-50 blur-3xl pointer-events-none z-0" />

          <div className="relative z-10">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2A0D04] flex items-center gap-2 mb-6">
              <Star className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#6B2D17] flex-shrink-0 animate-pulse" />
              Frequently Asked Questions
            </h3>

            <div className="space-y-3">
              {faqItems.map((item, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="bg-amber-50/40 border border-amber-200 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-amber-50/60"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full text-left p-3.5 sm:p-5 flex justify-between items-center gap-4 focus:outline-none hover:bg-amber-50/50 transition-colors"
                    >
                      <span className="font-serif font-bold text-xs sm:text-sm text-[#2A0D04]">
                        {item.q}
                      </span>
                      <span className={`text-[#6B2D17] transition-transform duration-300 font-black text-xs ${isOpen ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </button>

                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] border-t border-amber-100 p-3.5 sm:p-5 bg-white/40' : 'max-h-0'
                        }`}
                    >
                      <p className="text-[11px] sm:text-xs text-gray-700 leading-relaxed font-medium">
                        {item.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Row 5: Balanced Bottom Footer Actions */}
        <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] p-4 sm:p-6 border border-amber-200 shadow-2xl relative overflow-hidden mb-6 sm:mb-12 max-w-2xl mx-auto text-center transition-all duration-300 hover:scale-[1.01]">
          <div className={`absolute top-[-30%] left-[-30%] w-32 h-32 rounded-full blur-2xl pointer-events-none ${bottomData.glowBg}`} />
          <h4 className="font-serif font-bold text-[#2A0D04] text-sm sm:text-base mb-2">
            {bottomData.title}
          </h4>
          <p className="text-gray-600 text-xs mb-5 font-semibold leading-relaxed">
            {bottomData.desc}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center">
            <a
              href={`https://wa.me/916376779062?text=Hello%20Team%20360%20Support,%20I%20am%20very%20interested%20in%20registering%20for%20the%20${encodeURIComponent(workshop.title)}.%20Please%20guide%20me%20on%20the%20registration%20details!`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-64 bg-[#2A0D04] hover:bg-[#120502] text-white font-black py-3.5 sm:py-4 rounded-2xl flex items-center justify-center gap-2 text-[10px] sm:text-xs uppercase tracking-wider shadow-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              <WhatsAppIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-white" />
              Connect for Booking
            </a>
            <Link
              to="/courses"
              className="w-full sm:w-auto border border-amber-200 hover:bg-gray-50 text-gray-800 font-bold py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl text-center text-[10px] sm:text-xs uppercase tracking-wider transition-all"
            >
              Return to Catalog
            </Link>
          </div>
        </div>

        {/* Row 6: Suggestion Section (More Like This) */}
        <div className="border-t border-amber-200/60 pt-6 sm:pt-12 lg:pt-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2A0D04] leading-tight mb-2">
                {suggestionsHeading}
              </h2>
              <p className="text-gray-700 text-xs sm:text-sm font-medium">
                Expand your spiritual practice and align with higher vibrational consciousness.
              </p>
            </div>
            <Link
              to="/courses"
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#6B2D17] hover:text-[#6B2D17] transition-colors"
            >
              Explore All <Sparkles className="w-4 h-4 text-[#6B2D17] animate-pulse" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {suggestions.map((s) => (
              <Link
                key={s.id}
                to={`/courses/${s.id}`}
                className="bg-white rounded-[2rem] border border-amber-100 p-5 flex flex-col justify-between hover:border-[#6B2D17]/30 hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-1 text-left cursor-pointer animate-fade-in animate-duration-500"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div className="relative h-52 sm:h-72 w-full rounded-2xl overflow-hidden mb-4 bg-[#2A0D04]">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider bg-[#2A0D04]/80 text-[#F5D28E] border border-[#F5D28E]/20 px-3 py-1.5 rounded-full backdrop-blur-md">
                      {s.category}
                    </span>
                  </div>

                  {/* Body */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2A0D04] group-hover:text-[#E25822] transition-colors leading-snug mb-1">
                    {s.title}
                  </h3>
                  <h4 className="text-[10px] font-bold text-[#2A0D04] uppercase tracking-widest mb-3">
                    {s.subtitle}
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
                    {s.description}
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
        </div>

      </div>
    </div>
  );
}
