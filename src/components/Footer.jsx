import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Sparkles, ChevronRight, Heart } from 'lucide-react';
import logoImg from '../assets/logo.jpg';

export default function Footer({ onOpenModal }) {

  return (
    <footer id="contact" className="relative bg-gradient-to-b from-[#2A0D04] via-[#120502] to-[#0D0302] text-white/60 pt-10 pb-8 overflow-hidden z-10">
      
      {/* 🌌 Cosmic background stars and sparkles */}
      <style>{`
        @keyframes footerTwinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }
        .animate-footer-twinkle {
          animation: footerTwinkle 5s ease-in-out infinite;
        }
      `}</style>

      {[...Array(12)].map((_, i) => (
        <div
          key={`fstar-${i}`}
          className="absolute rounded-full bg-[#FFD95A]/25 animate-footer-twinkle pointer-events-none"
          style={{
            width: `${Math.random() * 3 + 2}px`,
            height: `${Math.random() * 3 + 2}px`,
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 95}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}

      {/* Decorative top aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#FFD95A]/40 to-transparent pointer-events-none" />

      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* 🌟 Premium Spiritual Blessing Banner at the top of the Footer */}
        <div className="bg-gradient-to-r from-[#2A0D04]/60 via-[#120502]/80 to-[#6B2D17]/60 border-2 border-[#FFD95A]/30 rounded-3xl p-6 sm:p-8 text-center max-w-4xl mx-auto mb-14 shadow-2xl relative overflow-hidden group">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#FFD95A]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#E68A3A]/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-3">
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#FFD95A]">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD95A] animate-pulse" />
              Daily Blessing & Intention
            </span>
            <p className="font-serif text-white font-medium text-sm sm:text-base md:text-lg italic leading-relaxed">
              "Mindset Badlo Aur Crorepatibano. Reprogram your subconscious mind to align with the cosmic vibrations of wealth, abundance, and self-realization."
            </p>
            <div className="flex items-center justify-center gap-1 text-[10px] text-white/45 font-bold uppercase tracking-wider">
              <span>May all beings be happy, healthy, and free</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">

          {/* Column 1: Brand details with glowing social icons */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="Team 360" className="w-12 h-12 rounded-full object-cover border-2 border-[#FFD95A]/30 shadow-lg" />
              <div>
                <h3 className="font-serif text-white font-black text-sm uppercase tracking-wider leading-none">Team 360</h3>
                <span className="text-[9px] text-[#FFD95A] font-black tracking-widest uppercase mt-1 block">With D.D. Sharma</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-white/50">
              India's leading training and spiritual transformation platform. We offer modules in organizational leadership, peak performance, and subconscious mind reprogramming under the guidance of international trainer Devendra Sharma (D.D. Sharma Ji).
            </p>
            
            {/* Beautiful Social Media Icons with high-quality direct inline SVGs */}
            <div className="flex items-center gap-3.5 pt-2">
              <a
                href="https://www.youtube.com/@TheMagicOfThinkingBig26"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:border-red-500/40 hover:bg-red-500/5 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shadow-md cursor-pointer group"
                title="YouTube - D.D. Sharma"
              >
                <svg className="w-5 h-5 fill-white group-hover:fill-[#FF0000] transition-colors" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.002 3.002 0 0 0 2.11 2.108C4.48 20.5 12 20.5 12 20.5s7.52 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
              <a
                href="https://www.youtube.com/@ManifesthroughGayatriMantra"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:border-red-500/40 hover:bg-red-500/5 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shadow-md cursor-pointer group"
                title="YouTube - Gayatri Manifest"
              >
                <svg className="w-5 h-5 fill-white group-hover:fill-[#E63946] transition-colors" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.002 3.002 0 0 0 2.11 2.108C4.48 20.5 12 20.5 12 20.5s7.52 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
              <a
                href="https://www.instagram.com/themagicofthinkingbig26/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:border-rose-400/40 hover:bg-rose-400/5 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shadow-md cursor-pointer group"
                title="Instagram"
              >
                <svg className="w-5 h-5 fill-white group-hover:fill-[#E1306C] transition-colors" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
              </a>
              <a
                href="https://www.facebook.com/Themagicofthinkingbig26/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:border-blue-500/40 hover:bg-blue-500/5 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shadow-md cursor-pointer group"
                title="Facebook"
              >
                <svg className="w-5 h-5 fill-white group-hover:fill-[#1877F2] transition-colors" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a
                href="https://wa.me/916376779062?text=Hello%20Team%20360%20Support!%20I%20would%20like%20to%20enquire%20about%20your%20spiritual%20courses%2C%20workshops%2C%20or%20blessed%20crystal%20products.%20Please%20guide%20me!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shadow-md cursor-pointer group"
                title="WhatsApp"
              >
                <svg className="w-5 h-5 fill-white group-hover:fill-[#25D366] transition-colors" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (SPA instant Routing) */}
          <div>
            <h3 className="text-white font-serif font-black text-sm uppercase tracking-widest mb-6 relative w-fit">
              Quick Links
              <span className="absolute bottom-[-6px] left-0 w-8 h-[2px] bg-[#FFD95A] rounded-full" />
            </h3>
            <ul className="space-y-3.5 text-xs font-bold uppercase tracking-wider">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'All Courses', href: '/courses' },
                { label: 'Bookstore', href: '/products' },
                { label: 'Blog', href: '/blog' },
                { label: 'Contact', href: '/contact' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="hover:text-[#FFD95A] transition-colors duration-200 flex items-center gap-1 group w-fit"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#FFD95A]/40 group-hover:text-[#FFD95A] group-hover:translate-x-0.5 transition-all duration-200" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Featured Programs */}
          <div>
            <h3 className="text-white font-serif font-black text-sm uppercase tracking-widest mb-6 relative w-fit">
              Our Programs
              <span className="absolute bottom-[-6px] left-0 w-8 h-[2px] bg-[#FFD95A] rounded-full" />
            </h3>
            <ul className="space-y-3.5 text-xs font-bold uppercase tracking-wider">
              {[
                { label: 'Mentors Training Program (M-1)', href: '/courses/mentors-training-program' },
                { label: 'Trainers Training Program (M-2)', href: '/courses/trainers-training-program' },
                { label: 'Signature Program (M-3)', href: '/courses/signature-program' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="hover:text-[#FFD95A] transition-colors duration-200 flex items-center gap-1 group w-fit"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#FFD95A]/40 group-hover:text-[#FFD95A] group-hover:translate-x-0.5 transition-all duration-200" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & WhatsApp Action */}
          <div>
            <h3 className="text-white font-serif font-black text-sm uppercase tracking-widest mb-6 relative w-fit">
              Contact Us
              <span className="absolute bottom-[-6px] left-0 w-8 h-[2px] bg-[#FFD95A] rounded-full" />
            </h3>
            <div className="space-y-4 text-xs font-bold mb-6">
              <a href="tel:+916376779062" className="flex items-center gap-2.5 hover:text-white transition-colors duration-200 w-fit">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#FFD95A] border border-white/10">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>+91 63767 79062</span>
              </a>
              <a href="mailto:mindsetbadloaurcrorepatibano@gmail.com" className="flex items-center gap-2.5 hover:text-white transition-colors duration-200 w-fit">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#FFD95A] border border-white/10">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="break-all">mindsetbadloaurcrorepatibano@gmail.com</span>
              </a>
            </div>

            <div className="space-y-2.5">
              <a
                href="https://www.youtube.com/@TheMagicOfThinkingBig26"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-red-600 hover:bg-red-700 text-white font-black py-3 px-4 rounded-xl text-[10px] uppercase tracking-wider transition-colors duration-300 block shadow-md hover:shadow-lg hover:shadow-red-600/10 cursor-pointer"
                title="D.D. Sharma Ji's Official YouTube Channel"
              >
                Subscribe: D.D. Sharma (YT)
              </a>
              <a
                href="https://www.youtube.com/@ManifesthroughGayatriMantra"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-rose-600 hover:bg-rose-700 text-white font-black py-3 px-4 rounded-xl text-[10px] uppercase tracking-wider transition-colors duration-300 block shadow-md hover:shadow-lg hover:shadow-rose-600/10 cursor-pointer"
                title="Manifest Through Gayatri Mantra YouTube Channel"
              >
                Subscribe: Gayatri Manifest (YT)
              </a>
              <a
                href={`https://wa.me/916376779062?text=${encodeURIComponent("Hello Team 360! I would like to enquire about your modules, workshops, and books. Please guide me!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:brightness-110 text-white font-black py-3 px-4 rounded-xl text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                Enquire via WhatsApp
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom — 3 column layout */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 items-center gap-4 text-[10px] text-white/30 font-black uppercase tracking-widest pt-4">

          {/* Left: Copyright */}
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Team 360. All Rights Reserved.
          </p>

          {/* Center: Made with love */}
          <span className="inline-flex items-center justify-center gap-1 text-white/25">
            Made with
            <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" style={{ animationDuration: '0.8s' }} />
            by&nbsp;
            <a
              href="https://internshipcatalyst.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#FFD95A] transition-colors duration-300 underline underline-offset-2"
            >
              Internship Catalyst
            </a>
          </span>

          {/* Right: Policy Links */}
          <div className="flex items-center justify-center sm:justify-end gap-4 flex-wrap">
            <Link to="/privacy-policy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link to="/refund-policy" className="hover:text-white/60 transition-colors">Refund Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-white/60 transition-colors">Terms &amp; Conditions</Link>
          </div>

        </div>

      </div>
    </footer>
  );
}
