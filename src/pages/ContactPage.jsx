import React, { useState } from 'react';
import { Mail, Phone, Sparkles, Send, CheckCircle, Shield, Award, HelpCircle, Heart } from 'lucide-react';
import ddSharmaPortrait from '../assets/dd_sharma_portrait.jpg';
import { saveItem } from '../admin/contentStore';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: 'Introductory & Signature Program (₹11,800)',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const queryId = String(Date.now());
    const newQuery = {
      id: Number(queryId),
      date: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      program: formData.program,
      message: formData.message.trim()
    };

    try {
      await saveItem('contacts', newQuery);

      // Trigger Google Ads Conversion Event
      const conversionLabel = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL || 'conversion';
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          'send_to': `AW-18148455939/${conversionLabel}`
        });
      }
    } catch (err) {
      console.error('Failed to save query:', err);
    }

    // Simulate API request delay for manifestation confirmation UX
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          program: 'Introductory & Signature Program (₹11,800)',
          message: ''
        });
      }, 5000);
    }, 1500);
  };

  const programs = [
    'Mentor & Authorization Center Program (₹2,36,000)',
    'Trainer Program (₹59,000)',
    'Gayatri Mentorship Program (₹1,18,000)',
    'Introductory & Signature Program (₹11,800)',
    'Quantum Jump (Recorded Session) (₹35,400)',
    '1-on-1 Private Consultation',
    'General Query / Guidance'
  ];

  return (
    <div className="pt-16 lg:pt-24 pb-20 min-h-screen bg-[#FFF5EE] text-gray-900 relative overflow-hidden">

      {/* Sacred Mandala SVG Background Pattern */}
      <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.04] text-[#6B2D17] pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <circle cx="50" cy="50" r="45" strokeWidth="0.2" />
        <circle cx="50" cy="50" r="35" strokeWidth="0.2" />
        <circle cx="50" cy="50" r="25" strokeWidth="0.2" />
        <circle cx="50" cy="50" r="15" strokeWidth="0.2" />
        {[...Array(24)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={50 + 45 * Math.cos((i * 15 * Math.PI) / 180)}
            y2={50 + 45 * Math.sin((i * 15 * Math.PI) / 180)}
            strokeWidth="0.1"
          />
        ))}
      </svg>

      {/* Glowing backdrops */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[130px] pointer-events-none" />

      {/* Page Header */}
      <div className="relative pt-4 pb-8 text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#6B2D17] uppercase mb-3 animate-tagline-blink">
            <Sparkles className="w-4 h-4 text-[#6B2D17] animate-pulse" />
            We are here to help you
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-[#2A0D04] leading-tight mb-3">
            Contact Us
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#E25822] to-[#6B2D17] mx-auto rounded-full mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto text-xs sm:text-sm font-semibold leading-relaxed">
            Have questions about our training programs, daily workshops, book purchases, or personal consultations? Get in touch with our friendly support team today.
          </p>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Block: Image + Contact Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Portrait Card of Devendra Sharma */}
            <div className="relative rounded-[1.75rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/60 w-full h-[260px] sm:h-[520px] lg:h-[480px] group bg-[#120502]">
              <img
                src={ddSharmaPortrait}
                alt="Devendra Sharma Spiritual Guide"
                className="w-full h-full object-cover object-[center_28%] group-hover:scale-105 transition-transform duration-[10s] brightness-95"
              />
              
              {/* Saffron aura glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A0D04]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,138,58,0.1)_0%,transparent_70%)] animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />

              {/* elegant static portrait label */}
              <span className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 inline-flex items-center gap-1.2 sm:gap-1.5 text-[8.5px] sm:text-[10px] font-black uppercase tracking-widest text-[#F5D28E] bg-[#2A0D04]/85 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full border border-amber-500/25 shadow-lg backdrop-blur-sm z-10">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F5D28E]" /> Devendra Sharma - Founder &amp; Coach
              </span>
            </div>

            {/* Contact Details Card */}
            <div className="flex-1 flex flex-col justify-between bg-gradient-to-br from-[#2A0D04] via-[#6B2D17] to-[#120502] text-white rounded-[1.75rem] sm:rounded-[2.5rem] p-4 sm:p-10 shadow-2xl border border-amber-500/15 relative overflow-hidden group">

              {/* Top decorative glow */}
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-8 relative z-10">
                <div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-[#F5D28E] tracking-widest mb-2">
                    🔱 Contact Channels
                  </span>
                  <h2 className="font-serif text-xl sm:text-3xl font-extrabold text-white leading-tight">
                    Get in Touch
                  </h2>
                  <p className="text-white/60 text-xs sm:text-sm font-medium leading-relaxed mt-2">
                    Our supportive team is here to help answer your questions, assist with course bookings, or guide your book purchases.
                  </p>
                </div>

                {/* Trust Alignment Oath */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-[10px] font-black text-[#F5D28E] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 fill-[#F5D28E]/20" /> Safe &amp; Trusted
                  </h4>
                  <p className="text-[11px] text-white/70 leading-relaxed font-bold">
                    Every message is kept 100% private. We value your trust and ensure your personal details are fully secure, confidential, and protected.
                  </p>
                </div>

                {/* Direct WhatsApp CTA */}
                <div className="pt-2">
                  <a
                    href="https://wa.me/916376779062?text=Hello%20Team%20360!%20I%20would%20like%20to%20connect%20for%20mindset%20and%20performance%20coaching."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-teal-600 hover:to-emerald-500 text-white font-black text-[10px] sm:text-xs px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] uppercase tracking-widest flex items-center justify-center gap-1.5 sm:gap-2 border border-white/10"
                  >
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    Connect via WhatsApp
                  </a>
                </div>

              </div>

              {/* Bottom trust line */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-3 sm:gap-4 relative z-10 text-[8px] sm:text-[9px] font-extrabold uppercase text-white/50 tracking-widest">
                <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#F5D28E]" /> 100% Confidential</span>
                <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-[#F5D28E]" /> Certified Training</span>
              </div>

            </div>

          </div>

          {/* Right Block: Contact Form Card */}
          <div className="lg:col-span-7 bg-white/90 backdrop-blur-md rounded-[1.75rem] sm:rounded-[2.5rem] p-4 sm:p-10 border border-amber-100/60 shadow-2xl relative overflow-hidden flex flex-col justify-start">

            {isSubmitted ? (
              <div className="text-center py-16 flex flex-col items-center justify-center animate-fade-in text-gray-800">
                <div className="w-20 h-20 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[#6B2D17] mb-6">
                  <CheckCircle className="w-10 h-10 animate-pulse" />
                </div>
                <h3 className="font-serif text-3xl font-black text-[#2A0D04] mb-3">Message Received!</h3>
                <p className="text-gray-600 text-xs sm:text-sm font-semibold max-w-md leading-relaxed mx-auto">
                  Thank you, <span className="text-[#6B2D17] font-black">{formData.name}</span>. We have received your query. Team 360 support will get back to you via email or phone within 24 hours.
                </p>
                <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-[#6B2D17]/60 uppercase tracking-widest font-black">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Sent Successfully</span>
                </div>
              </div>
            ) : (
              <>
                {/* Divine Manifestation Gateway Banner */}
                <div className="p-3.5 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-amber-100/30 border border-amber-100/70 mb-5 relative overflow-hidden flex items-start gap-3 shadow-sm">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                  <div className="w-10 h-10 rounded-full bg-[#E25822] flex items-center justify-center flex-shrink-0 text-white shadow-md">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-[#2A0D04] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                      🔮 Reach Out to Us
                    </h4>
                    <p className="text-[11px] text-gray-500 font-bold leading-relaxed">
                      Fill out this simple form to ask your questions about our programs, upcoming abundance programs, or spiritual and motivational books. We are happy to help!
                    </p>
                  </div>
                </div>

                {/* Form Header */}
                <div className="flex items-center gap-3 mb-5 border-b border-amber-100 pb-4">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl border border-amber-200 bg-amber-50 flex items-center justify-center text-[#6B2D17] flex-shrink-0">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-black text-[#2A0D04] leading-none mb-1">Send a Message</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Fill out this form to connect with our team</p>
                  </div>
                </div>

                {/* Form Elements */}
                <form onSubmit={handleSubmit} className="space-y-5">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-[10px] font-black text-[#6B2D17] uppercase tracking-widest mb-1.5">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full bg-amber-50/10 border border-amber-100 rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#E25822] focus:ring-1 focus:ring-[#E25822]/30 transition-all text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-[#6B2D17] uppercase tracking-widest mb-1.5">WhatsApp / Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-amber-50/10 border border-amber-100 rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#E25822] focus:ring-1 focus:ring-[#E25822]/30 transition-all text-xs font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-[#6B2D17] uppercase tracking-widest mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-amber-50/10 border border-amber-100 rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#E25822] focus:ring-1 focus:ring-[#E25822]/30 transition-all text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-[#6B2D17] uppercase tracking-widest mb-1.5">Select Modality / Consultation</label>
                    <div className="relative">
                      <select
                        value={formData.program}
                        onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                        className="w-full bg-amber-50/10 border border-amber-100 rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 text-gray-900 focus:outline-none focus:border-[#E25822] focus:ring-1 focus:ring-[#E25822]/30 transition-all text-xs font-semibold appearance-none cursor-pointer"
                      >
                        {programs.map((prog, idx) => (
                          <option key={idx} value={prog} className="bg-white text-gray-900">
                            {prog}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-[#6B2D17] uppercase tracking-widest mb-1.5">Your Messages or Questions</label>
                    <textarea
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please write your questions, queries, or course topics you would like to know more about..."
                      className="w-full bg-amber-50/10 border border-amber-100 rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#E25822] focus:ring-1 focus:ring-[#E25822]/30 transition-all text-xs font-semibold resize-none"
                    ></textarea>
                  </div>

                  {/* Spiritual Assurance and Submit Button Group */}
                  <div className="space-y-4 pt-4">
                    <p className="text-[9px] sm:text-[10px] text-[#6B2D17] font-bold text-center leading-relaxed bg-amber-50/60 border border-amber-100/50 p-3 sm:p-3.5 rounded-xl shadow-inner flex items-center justify-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse flex-shrink-0" />
                      <span>Your request undergoes brain training compatibility checks prior to intake scheduling.</span>
                    </p>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 sm:py-4.5 rounded-xl flex items-center justify-center gap-2 bg-[#E25822] hover:bg-[#6B2D17] text-white font-black transition-all duration-300 shadow-md hover:shadow-lg text-[10px] sm:text-xs uppercase tracking-widest"
                    >
                      {loading ? (
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>

                    {/* Quick Direct Support Channels */}
                    <div className="pt-3.5 border-t border-amber-100 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs font-semibold text-gray-600">
                      <a href="tel:+916376779062" className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/20 border border-amber-100/50 hover:bg-amber-50/40 transition-colors group/tel">
                        <div className="w-8 h-8 rounded-lg bg-[#2A0D04] text-[#F5D28E] flex items-center justify-center flex-shrink-0 group-hover/tel:scale-105 transition-transform duration-300">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-[8px] uppercase font-black text-gray-400 tracking-wider">Phone Support</span>
                          <span className="text-xs font-black text-[#2A0D04]">+91 63767 79062</span>
                        </div>
                      </a>

                      <a href="mailto:mindsetbadloaurcrorepatibano@gmail.com" className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/20 border border-amber-100/50 hover:bg-amber-50/40 transition-colors group/mail">
                        <div className="w-8 h-8 rounded-lg bg-[#2A0D04] text-[#F5D28E] flex items-center justify-center flex-shrink-0 group-hover/mail:scale-105 transition-transform duration-300">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-[9px] uppercase font-black text-gray-400 tracking-wider">Email Address</span>
                          <span className="text-[10px] sm:text-xs font-black text-[#2A0D04] break-all sm:truncate block">mindsetbadloaurcrorepatibano@gmail.com</span>
                        </div>
                      </a>
                    </div>
                  </div>

                </form>
              </>
            )}

          </div>

        </div>

        {/* Global Spiritual Stamps bottom trust builder */}
        <div className="mt-12 sm:mt-20 bg-gradient-to-br from-[#2A0D04] via-[#6B2D17] to-[#120502] backdrop-blur-md rounded-[2rem] sm:rounded-[3rem] p-4.5 sm:p-12 border border-amber-500/30 shadow-2xl text-center w-full relative overflow-hidden group">
          
          {/* Background glow layers */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/15 rounded-full blur-[80px] pointer-events-none group-hover:scale-150 transition-transform duration-1000" />

          {/* Golden Seal Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#120502]/60 border border-amber-500/25 backdrop-blur-sm mb-6 shadow-lg animate-pulse" style={{ animationDuration: '4s' }}>
            <span className="text-base">🧘</span>
            <span className="text-[9px] sm:text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#F5D28E]">
              Team 360 Mind Academy
            </span>
          </div>

          {/* Main heading */}
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F5D28E] to-white leading-tight mb-4 drop-shadow-sm">
            The Team 360 Guarantee
          </h2>
          
          <p className="text-white/70 text-[11px] sm:text-sm font-semibold max-w-3xl mx-auto mb-6 sm:mb-10 leading-relaxed">
            Every course, training program, and book is guided and authorized under D.D. Sharma Ji's direction. We promise to support your transformation with complete dedication, scientific frameworks, and over 32+ years of experience as a senior government officer and mind trainer.
          </p>

          {/* Three Crystalline Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full border-t border-white/10 pt-6 sm:pt-10">
            
            {/* Card 1: Private & Secure */}
            <div className="p-4 sm:p-5 rounded-[1.75rem] sm:rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-amber-500/45 hover:bg-white/10 transition-all duration-500 text-left relative overflow-hidden group/item flex flex-col justify-between hover:shadow-xl hover:shadow-amber-500/5">
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-bl-[2rem] group-hover/item:scale-110 transition-transform" />
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#F5D28E] text-[#120502] flex items-center justify-center shadow-lg shadow-amber-500/15 group-hover/item:scale-105 transition-transform duration-300">
                  <Shield className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    100% Private &amp; Secure
                  </h4>
                  <p className="text-[11px] font-bold text-white/50 mt-2 leading-relaxed">
                    Your details and personal goals are kept strictly confidential and protected in our secure records.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Kind support & Advice */}
            <div className="p-4 sm:p-5 rounded-[1.75rem] sm:rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-amber-500/45 hover:bg-white/10 transition-all duration-500 text-left relative overflow-hidden group/item flex flex-col justify-between hover:shadow-xl hover:shadow-amber-500/5">
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-bl-[2rem] group-hover/item:scale-110 transition-transform" />
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#F5D28E] text-[#120502] flex items-center justify-center shadow-lg shadow-amber-500/15 group-hover/item:scale-105 transition-transform duration-300">
                  <Sparkles className="w-5.5 h-5.5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    Expert Team Support
                  </h4>
                  <p className="text-[11px] font-bold text-white/50 mt-2 leading-relaxed">
                    Our support team coordinates directly with D.D. Sharma Ji's office to answer your questions and guide your path.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Experience */}
            <div className="p-4 sm:p-5 rounded-[1.75rem] sm:rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-amber-500/45 hover:bg-white/10 transition-all duration-500 text-left relative overflow-hidden group/item flex flex-col justify-between hover:shadow-xl hover:shadow-amber-500/5">
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-bl-[2rem] group-hover/item:scale-110 transition-transform" />
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#F5D28E] text-[#120502] flex items-center justify-center shadow-lg shadow-amber-500/15 group-hover/item:scale-105 transition-transform duration-300">
                  <Award className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    32+ Years as Senior Gov. Officer
                  </h4>
                  <p className="text-[11px] font-bold text-white/50 mt-2 leading-relaxed">
                    Access over 32 years of experience as a senior government officer combined with international mindset coaching.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
