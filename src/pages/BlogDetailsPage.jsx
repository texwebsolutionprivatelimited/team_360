import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Award, Sparkles, Send, Heart, BookOpen } from 'lucide-react';
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

export default function BlogDetailsPage() {
  const { id } = useParams();
  const blogs = useAdminContent('blogs');
  const post = blogs.find((p) => String(p.id) === String(id));
  const currentIndex = blogs.findIndex((p) => String(p.id) === String(id));
  const companionPost = currentIndex >= 0 ? blogs[(currentIndex + 1) % blogs.length] : null;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Team 360 Bookstore`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `${post.tagline || ''} - Read this spiritual article by ${post.author} on ${post.course} alignment and manifestation.`);
      }
    }
  }, [post]);

  if (!post) {
    return (
      <div className="pt-32 min-h-screen bg-[#FFF5EE] flex flex-col items-center justify-center px-4 text-center">
        <div className="bg-white border border-amber-200 rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
          <div className="absolute top-[-20%] left-[-20%] w-48 h-48 rounded-full bg-amber-100/50 blur-2xl pointer-events-none" />
          <BookOpen className="w-16 h-16 text-[#6B2D17] mx-auto mb-4 animate-bounce" />
          <h2 className="font-serif text-2xl font-black text-[#2A0D04] mb-2">
            Article Not Found
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            We couldn't find the blog article you are looking for. It may have been renamed or rescheduled.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-[#2A0D04] hover:bg-[#120502] text-white font-bold py-3.5 px-6 rounded-xl transition-all text-xs uppercase tracking-wider shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  const getWhatsAppQuery = () => {
    const msg = `Hello Team 360 Support! I just read your beautiful blog article: *"${post.title}"* and felt deeply connected to the *${post.course}* path. I would like to learn more and enquire about upcoming registrations!`;
    return `https://wa.me/916376779062?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="pt-20 lg:pt-28 pb-12 sm:pb-20 min-h-screen bg-[#FFF5EE] relative overflow-hidden text-gray-900">

      {/* Floating Background Sparkles / Orbs */}
      <style>{`
        @keyframes float-slow {
          0% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 0.15; }
          50% { transform: translateY(-60px) rotate(180deg) scale(1.15); opacity: 0.35; }
          100% { transform: translateY(0px) rotate(360deg) scale(1); opacity: 0.15; }
        }
        .animate-float-slow {
          animation: float-slow 22s ease-in-out infinite;
        }
      `}</style>

      {/* Floating Aura Orbs Background Animation */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/35 animate-float-slow pointer-events-none"
          style={{
            width: `${Math.random() * 80 + 30}px`,
            height: `${Math.random() * 80 + 30}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${15 + Math.random() * 15}s`,
            filter: 'blur(30px)',
          }}
        />
      ))}

      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] rounded-full bg-white/40 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-200/50 blur-[130px] pointer-events-none" />

      <div className="max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8 relative z-10">

        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#6B2D17] hover:text-[#6B2D17] mb-4 sm:mb-8 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </Link>

        {/* Blog Reading Container - Premium glass card with elegant border and responsive corner rounding */}
        <div className="w-full bg-white/35 backdrop-blur-md rounded-[1.25rem] sm:rounded-[2.5rem] border border-[#6B2D17]/10 sm:border-amber-300/50 shadow-xl overflow-hidden relative z-10">

          {/* Article Header Details */}
          <div className="p-3 sm:p-12 pb-4 sm:pb-6 border-b border-amber-300/40 text-center sm:text-left">
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className="inline-flex items-center gap-1.5 text-[8.5px] sm:text-[10px] font-black tracking-widest text-[#6B2D17] uppercase bg-amber-50 px-2.5 sm:px-3.5 py-1.5 rounded-full border border-amber-100">
                <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#6B2D17]" /> {post.course}
              </span>

              <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-serif text-xl sm:text-4xl lg:text-5xl font-black text-[#2A0D04] leading-tight mb-4">
              {post.title}
            </h1>

            {/* Tagline */}
            <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed max-w-3xl italic">
              "{post.tagline}"
            </p>

            {/* Author */}
            <div className="flex items-center justify-center sm:justify-start gap-3 mt-5 sm:mt-6 pt-5 border-t border-amber-50/50">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#2A0D04] to-[#6B2D17] text-white flex items-center justify-center font-black text-xs shadow-md">
                DS
              </div>
              <div className="text-left leading-tight">
                <span className="block text-xs font-black text-[#2A0D04]">Curated by {post.author}</span>
                <span className="text-[8px] sm:text-[9px] font-bold text-gray-400 uppercase tracking-widest">Spiritual Guide</span>
              </div>
            </div>
          </div>

          {/* Side-by-Side Dual Images - Display two square illustrations naturally in a grid so space is beautifully filled */}
          <div className="p-3 sm:p-10 pb-0 flex justify-center w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 w-full max-w-5xl">
              {/* Card 1: Core Article Image */}
              <div className="relative w-full h-56 sm:h-auto sm:aspect-square bg-[#2A0D04] overflow-hidden rounded-[1rem] sm:rounded-[2rem] border border-amber-300/40 shadow-md">
                <img
                  src={post.image || imageMap[post.id]}
                  alt={post.title}
                  className="w-full h-full object-cover brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-[8.5px] sm:text-[10px] font-black bg-[#2A0D04]/80 text-white px-2.5 sm:px-3.5 py-1.5 rounded-full backdrop-blur-sm border border-white/10 tracking-widest uppercase">
                  Core Topic
                </span>
              </div>

              {/* Card 2: Related Course / Companion Attunement Image */}
              {companionPost && (
                <div className="hidden md:block relative w-full aspect-square bg-[#2A0D04] overflow-hidden rounded-[1.25rem] sm:rounded-[2rem] border border-amber-300/40 shadow-md">
                  <img
                    src={companionPost.image || imageMap[companionPost.id]}
                    alt={companionPost.title}
                    className="w-full h-full object-cover brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-4 left-4 text-[10px] font-black bg-[#6B2D17]/80 text-white px-3.5 py-1.5 rounded-full backdrop-blur-sm border border-white/10 tracking-widest uppercase">
                    Companion Vibe
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Article Body Content */}
          <div className="p-3 sm:p-12 pt-5 sm:pt-10 space-y-5 sm:space-y-8 font-medium text-gray-700 text-xs sm:text-sm leading-relaxed text-left">

            {/* Intro paragraph */}
            <p className="text-xs sm:text-base font-bold text-[#2A0D04]">
              {post.intro}
            </p>

            {/* Crystalline blockquote */}
            <div className="my-5 sm:my-6 border-l-4 border-[#6B2D17] bg-gradient-to-r from-[#2A0D04]/5 to-transparent p-4 sm:p-5 pl-5 sm:pl-8 rounded-r-xl text-left relative overflow-hidden">
              <span className="absolute right-4 bottom-[-10px] text-6xl sm:text-7xl font-serif text-[#6B2D17]/10 pointer-events-none select-none">”</span>
              <p className="font-serif text-xs sm:text-base font-black text-[#6B2D17] relative z-10 leading-relaxed italic">
                "{post.quote}"
              </p>
            </div>

            {/* Sections loops */}
            {post.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3 sm:space-y-4">
                <h3 className="font-serif text-base sm:text-xl font-black text-[#2A0D04] flex items-center gap-1.5 sm:gap-2">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6B2D17]" /> {sec.heading}
                </h3>
                {sec.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-gray-600 leading-relaxed font-semibold">
                    {para}
                  </p>
                ))}
              </div>
            ))}

            {/* Structured Technique / Exercise Card */}
            <div className="bg-[#2A0D04]/5 border border-amber-100 rounded-[1.25rem] sm:rounded-[2.25rem] p-3.5 sm:p-8 space-y-4 my-6">
              <div className="flex items-center gap-3 border-b border-amber-100 pb-3.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#2A0D04] to-[#6B2D17] flex items-center justify-center text-white shadow-md">
                  <Sparkles className="w-4.5 h-4.5 sm:w-5 sm:h-5 animate-pulse" />
                </div>
                <div>
                  <span className="text-[8px] sm:text-[9px] font-black uppercase text-[#6B2D17] tracking-widest leading-none">Spiritual Exercise</span>
                  <h4 className="font-serif text-sm sm:text-lg font-black text-[#2A0D04] mt-0.5">{post.technique.title}</h4>
                </div>
              </div>

              <div className="space-y-3.5">
                {post.technique.steps.map((step, sIdx) => (
                  <div key={sIdx} className="flex gap-3 sm:gap-4">
                    <span className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-[#2A0D04] text-white flex items-center justify-center text-[9px] sm:text-[10px] font-black flex-shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <p className="text-[11px] sm:text-xs font-bold text-gray-600 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conclusion text */}
            <div className="pt-5 sm:pt-6 border-t border-amber-50">
              <h4 className="font-serif text-base sm:text-lg font-black text-[#2A0D04] mb-2">Final Attunement Vibe</h4>
              <p className="text-gray-600 leading-relaxed font-semibold">
                {post.conclusion}
              </p>
            </div>

            {/* Action CTA: Register for attunement */}
            <div className="pt-6 sm:pt-8 border-t border-amber-50 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="text-center sm:text-left">
                <h4 className="font-serif text-sm sm:text-lg font-black text-[#2A0D04] flex items-center justify-center sm:justify-start gap-1.5">
                  <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#6B2D17] animate-pulse" /> Connect with this Path
                </h4>
                <p className="text-[9px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                  Enquire and attune with Devendra Sharma (D.D. Sharma) during live sessions
                </p>
              </div>

              <a
                href={getWhatsAppQuery()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-teal-600 hover:to-emerald-500 text-white font-black text-[10px] sm:text-xs px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 uppercase tracking-widest border border-white/10 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-white flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                Enquire via WhatsApp
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
