import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: 'Module 3: Subconscious Reconditioning & Abundance Codes (₹11,800)',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

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

    // Sync locally for instant snappiness/compatibility
    const existing = JSON.parse(localStorage.getItem('t360_v3_contacts') || '[]');
    localStorage.setItem('t360_v3_contacts', JSON.stringify([newQuery, ...existing]));
    window.dispatchEvent(new Event('t360-content-updated-v3'));

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
          program: 'Module 3: Subconscious Reconditioning & Abundance Codes (₹11,800)',
          message: ''
        });
        onClose();
      }, 3000);
    }, 1200);
  };

  const programs = [
    'Module 1: Swar Vigyan & Breath Science Mastery (₹2,36,000)',
    'Module 2: Gayatri Quantum Science & Brain Activation (₹59,000)',
    'Module 3: Subconscious Reconditioning & Abundance Codes (₹11,800)',
    '1-on-1 Private Consultation',
    'General Query / Guidance'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred Backdrop */}
      <div 
        className="absolute inset-0 bg-cosmic-darkest/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Box */}
      <div className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl border border-gold/20 animate-float-slow">
        
        {/* Glowing Background Auroras */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-cosmic-lavender/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-cosmic-cream/60 hover:text-gold transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-10 flex flex-col items-center justify-center animate-pulse-slow">
            <CheckCircle className="w-16 h-16 text-gold mb-4 animate-bounce" />
            <h3 className="font-serif text-2xl font-bold text-gold mb-2">Request Received!</h3>
            <p className="text-cosmic-light text-sm max-w-sm">
              Thank you, <span className="text-gold font-semibold">{formData.name}</span>. Your intention has been aligned. Team 360's team will contact you shortly via email or phone to complete your registration.
            </p>
            <div className="mt-6 flex items-center gap-1 text-xs text-gold/60">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Aligned to Peak Performance</span>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 border-b border-gold/10 pb-4">
              <div className="w-11 h-11 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center flex-shrink-0 text-gold">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-gold">Align Your Mind</h3>
                <p className="text-xs text-cosmic-light">Begin your transformation with D.D. Sharma Ji</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-gold/80 uppercase tracking-wider mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your name"
                  className="w-full bg-cosmic-dark/60 border border-gold/10 rounded-xl px-4 py-2.5 text-cosmic-cream placeholder:text-cosmic-light/40 focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gold/80 uppercase tracking-wider mb-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@example.com"
                    className="w-full bg-cosmic-dark/60 border border-gold/10 rounded-xl px-4 py-2.5 text-cosmic-cream placeholder:text-cosmic-light/40 focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gold/80 uppercase tracking-wider mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-cosmic-dark/60 border border-gold/10 rounded-xl px-4 py-2.5 text-cosmic-cream placeholder:text-cosmic-light/40 focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold/80 uppercase tracking-wider mb-1">Select Program / Consultation</label>
                <select 
                  value={formData.program}
                  onChange={(e) => setFormData({...formData, program: e.target.value})}
                  className="w-full bg-cosmic-dark border border-gold/10 rounded-xl px-4 py-2.5 text-cosmic-cream focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all text-sm appearance-none cursor-pointer"
                >
                  {programs.map((prog, idx) => (
                    <option key={idx} value={prog} className="bg-cosmic-dark text-cosmic-cream">
                      {prog}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold/80 uppercase tracking-wider mb-1">Your Goals / Query</label>
                <textarea 
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="What is your biggest roadblock or what would you like to achieve?"
                  className="w-full bg-cosmic-dark/60 border border-gold/10 rounded-xl px-4 py-2.5 text-cosmic-cream placeholder:text-cosmic-light/40 focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all text-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all shadow-md shadow-gold/10 hover:shadow-gold/25 mt-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-cosmic-darkest border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Alignment Request
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
