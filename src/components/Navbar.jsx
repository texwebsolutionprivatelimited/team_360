import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import {
  Menu, X, ShoppingCart, Sparkles, Trash2,
  Home, User, BookOpen, BookMarked,
  Newspaper, Phone
} from 'lucide-react';

export default function Navbar({ onOpenModal, cart = [], onRemoveFromCart, onClearCart, onAddToCart }) {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Track scroll state for compressed bg padding
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section from location path only — Home always active on /
  useEffect(() => {
    const path = location.pathname;

    if (path === '/about') {
      setActiveSection('About');
    } else if (path === '/books' || path.startsWith('/books/')) {
      setActiveSection('Books');
    } else if (path === '/blog' || path.startsWith('/blog/')) {
      setActiveSection('Blog');
    } else if (path === '/courses' || path.startsWith('/courses/') || path === '/counseling') {
      setActiveSection('Courses');
    } else if (path === '/contact') {
      setActiveSection('Contact');
    } else {
      setActiveSection('Home');
    }
  }, [location]);

  const firstLinks = [
    { name: 'Home', href: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'About', href: '/about', icon: <User className="w-5 h-5" /> },
    { name: 'Courses', href: '/courses', icon: <BookOpen className="w-5 h-5" /> },
    { name: 'Books', href: '/books', icon: <BookMarked className="w-5 h-5" /> },
  ];

  const secondLinks = [
    { name: 'Blog', href: '/blog', icon: <Newspaper className="w-5 h-5" /> },
    { name: 'Contact', href: '/contact', icon: <Phone className="w-5 h-5" /> },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 bg-[#2A0D04] ${isScrolled ? 'py-2 shadow-lg shadow-black/25' : 'py-3'}`}
      >
        <div className="w-full max-w-full sm:max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Left: Logo */}
            <a href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-white/40 group-hover:border-white/80 transition-all duration-300 shadow-md overflow-hidden flex items-center justify-center relative">
                <img
                  src={logoImg}
                  alt="Team 360 Logo"
                  className="w-full h-full object-contain scale-[1.8] transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif text-white font-extrabold text-sm sm:text-base tracking-wide uppercase leading-none">
                  Team 360
                </span>
                <span className="hidden sm:block text-[9px] text-white/60 tracking-widest uppercase font-semibold mt-0.5">
                  With D.D. Sharma
                </span>
              </div>
            </a>

            {/* Center: Desktop Nav */}
            <div className="hidden xl:flex items-center gap-3 lg:gap-5">

              {/* Home, Product */}
              {firstLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`group flex items-center gap-2 text-base font-semibold px-3 py-2 rounded-lg transition-all duration-200 ${activeSection === link.name
                      ? 'text-[#FFD95A] bg-white/10'
                      : 'text-white/80 hover:text-[#FFD95A] hover:bg-white/10'
                    }`}
                >
                  <span className={`transition-colors pointer-events-none ${activeSection === link.name ? 'text-[#FFD95A]' : 'text-white/60 group-hover:text-[#FFD95A]'
                    }`}>{link.icon}</span>
                  {link.name}
                </a>
              ))}



              {/* Blog, Contact */}
              {secondLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`group flex items-center gap-2 text-base font-semibold px-3 py-2 rounded-lg transition-all duration-200 ${activeSection === link.name
                      ? 'text-[#FFD95A] bg-white/10'
                      : 'text-white/80 hover:text-[#FFD95A] hover:bg-white/10'
                    }`}
                >
                  <span className={`transition-colors pointer-events-none ${activeSection === link.name ? 'text-[#FFD95A]' : 'text-white/60 group-hover:text-[#FFD95A]'
                    }`}>{link.icon}</span>
                  {link.name}
                </a>
              ))}

            </div>

            {/* Right: Enquire Now + Mobile Toggle */}
            <div className="flex items-center gap-3">

              {/* Enquire Now CTA */}
              <a
                href="https://wa.me/916376779062?text=Hello%20Team%20360!%20I%20would%20like%20to%20enquire%20about%20your%20spiritual%20courses%2C%20workshops%2C%20or%20books.%20Please%20guide%20me%20with%20more%20information!"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:flex items-center gap-1.5 border border-white/40 hover:border-white text-white font-semibold text-xs px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white hover:text-[#2A0D04] active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 pointer-events-none" />
                Enquire Now
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="xl:hidden text-white/80 hover:text-[#FFD95A] p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 pointer-events-none" />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-80 max-w-full bg-[#2A0D04] shadow-2xl p-6 flex flex-col justify-between border-r border-white/10 z-10 text-white overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full border-2 border-white/30 bg-white overflow-hidden flex items-center justify-center">
                    <img src={logoImg} alt="Logo" className="w-full h-full object-contain scale-[1.8]" />
                  </div>
                  <div>
                    <div className="font-serif text-white font-extrabold text-sm uppercase tracking-wide">Team 360</div>
                    <div className="text-[9px] text-white/50 tracking-widest uppercase">With D.D. Sharma</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white/60 hover:text-[#FFD95A] transition-colors"
                >
                  <X className="w-5 h-5 pointer-events-none" />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="flex flex-col gap-2">
                {/* 1. Home, 2. Product */}
                {firstLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group flex items-center gap-3 font-semibold py-3 px-4 rounded-xl transition-all border ${activeSection === link.name
                        ? 'text-[#FFD95A] bg-white/10 border-white/10'
                        : 'text-white/85 hover:text-[#FFD95A] hover:bg-white/10 border-transparent hover:border-white/10'
                      }`}
                  >
                    <span className={`p-1.5 rounded-lg transition-all pointer-events-none ${activeSection === link.name ? 'bg-[#FFD95A]/10 text-[#FFD95A]' : 'bg-white/10 group-hover:bg-[#FFD95A]/10 group-hover:text-[#FFD95A]'
                      }`}>{link.icon}</span>
                    {link.name}
                  </a>
                ))}


                {/* 5. Blog, 6. Contact */}
                {secondLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      if (link.action === 'contact') {
                        e.preventDefault();
                        onOpenModal();
                      }
                    }}
                    className={`group flex items-center gap-3 font-semibold py-3 px-4 rounded-xl transition-all border ${activeSection === link.name
                        ? 'text-[#FFD95A] bg-white/10 border-white/10'
                        : 'text-white/85 hover:text-[#FFD95A] hover:bg-white/10 border-transparent hover:border-white/10'
                      }`}
                  >
                    <span className={`p-1.5 rounded-lg transition-all pointer-events-none ${activeSection === link.name ? 'bg-[#FFD95A]/10 text-[#FFD95A]' : 'bg-white/10 group-hover:bg-[#FFD95A]/10 group-hover:text-[#FFD95A]'
                      }`}>{link.icon}</span>
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Enquire CTA */}
            <a
              href="https://wa.me/916376779062?text=Hello%20Team%20360!%20I%20would%20like%20to%20enquire%20about%20your%20spiritual%20courses%2C%20workshops%2C%20or%20books.%20Please%20guide%20me%20with%20more%20information!"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-6 border border-white/40 hover:border-white text-white w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm font-bold shadow-lg transition-all hover:bg-white hover:text-[#2A0D04] text-center block whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 inline-block mr-1.5 align-middle" />
              <span className="align-middle">Enquire Now</span>
            </a>
          </div>
        </div>
      )}

      {/* Cart Sidebar Panel */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="relative w-80 max-w-full bg-white shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Cart Header */}
            <div className="flex items-center justify-between p-5 border-b border-amber-100 bg-[#2A0D04] text-white">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <span className="font-serif font-bold text-base">Your Cart</span>
                {cart.length > 0 && (
                  <span className="bg-[#FFD95A] text-[#2A0D04] text-[10px] font-black px-2 py-0.5 rounded-full">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} items
                  </span>
                )}
              </div>
              <button onClick={() => setIsCartOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 p-4 space-y-3">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <ShoppingCart className="w-12 h-12 text-[#2A0D04]/20 mb-3" />
                  <p className="font-serif font-bold text-[#2A0D04] text-sm">Your cart is empty</p>
                  <p className="text-gray-500 text-xs mt-1">Add books to begin</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-3 bg-amber-50/50 border border-amber-100/60 rounded-2xl p-3">
                    <img src={item.image} alt={item.title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-amber-100" />
                    <div className="flex-1 min-w-0">
                      <p className="font-serif font-bold text-xs text-[#2A0D04] leading-snug line-clamp-2">{item.title}</p>
                      <p className="text-[#2A0D04] font-black text-sm mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => onRemoveFromCart(item.id)} className="w-6 h-6 rounded-full bg-[#2A0D04] text-white text-xs flex items-center justify-center hover:bg-[#6B2D17] transition-colors font-bold">
                          −
                        </button>
                        <span className="text-xs font-bold text-[#2A0D04]">{item.quantity}</span>
                        <button onClick={() => onAddToCart && onAddToCart(item)} className="w-6 h-6 rounded-full bg-[#2A0D04] text-white text-xs flex items-center justify-center hover:bg-[#6B2D17] transition-colors font-bold">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-amber-100 space-y-3">
                <div className="flex justify-between text-sm font-bold text-[#2A0D04]">
                  <span>Total</span>
                  <span className="text-[#2A0D04] font-black">₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString('en-IN')}</span>
                </div>
                <a
                  href={`https://wa.me/916376779062?text=Hello%20Team%20360!%20I%20would%20like%20to%20order:%20${cart.map(i => `${i.title}%20(x${i.quantity})`).join('%2C%20')}.%20Please%20guide%20me%20on%20payment%20and%20delivery.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-[#25D366] to-[#20BA56] text-white font-black py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-md transition-all hover:brightness-105 active:scale-[0.98] whitespace-nowrap"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                  Order on WhatsApp
                </a>
                <button
                  onClick={onClearCart}
                  className="w-full border border-amber-200 text-[#2A0D04]/70 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all hover:bg-amber-50 whitespace-nowrap"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
