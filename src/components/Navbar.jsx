import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import {
  Menu, X, ShoppingCart, Sparkles, Trash2,
  Home, User, BookOpen, BookMarked,
  Newspaper, Phone, LogIn, LogOut, LayoutDashboard, Film
} from 'lucide-react';
import { useCurrentUser, logoutUser, isUserAdmin, useAdminContent } from '../admin/contentStore';
import AuthModal from './AuthModal';

export default function Navbar({ onOpenModal, cart = [], onRemoveFromCart, onClearCart, onAddToCart }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Auth state
  const { currentUser, loading } = useCurrentUser();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Track scroll state for compressed bg padding
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const courses = useAdminContent('courses');

  // Track active section from location path
  useEffect(() => {
    const path = location.pathname;

    if (path === '/about') {
      setActiveSection('About');
    } else if (path === '/books' || path.startsWith('/books/')) {
      setActiveSection('Books');
    } else if (path === '/blog' || path.startsWith('/blog/')) {
      setActiveSection('Blog');
    } else if (path.startsWith('/courses/')) {
      const courseId = path.substring('/courses/'.length);
      const matchedCourse = courses.find(c => c.id === courseId);
      if (matchedCourse && (matchedCourse.isRecorded || matchedCourse.type === 'Recorded Session')) {
        setActiveSection('Recorded Courses');
      } else {
        setActiveSection('Courses');
      }
    } else if (path === '/courses' || path === '/counseling') {
      setActiveSection('Courses');
    } else if (path === '/recorded-courses' || path.startsWith('/recorded-courses/')) {
      setActiveSection('Recorded Courses');
    } else if (path === '/my-courses') {
      setActiveSection('My Courses');
    } else if (path === '/contact') {
      setActiveSection('Contact');
    } else {
      setActiveSection('Home');
    }
  }, [location, courses]);

  const firstLinks = [
    { name: 'Home', href: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'About', href: '/about', icon: <User className="w-4 h-4" /> },
    { name: 'Courses', href: '/courses', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Recorded Courses', href: '/recorded-courses', icon: <Film className="w-4 h-4" /> },
    { name: 'Books', href: '/books', icon: <BookMarked className="w-4 h-4" /> },
  ];

  const secondLinks = [
    { name: 'Blog', href: '/blog', icon: <Newspaper className="w-4 h-4" /> },
    { name: 'Contact', href: '/contact', icon: <Phone className="w-4 h-4" /> },
  ];

  const handleLogout = async () => {
    await logoutUser();
    setIsUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-45 transition-all duration-300 bg-[#2A0D04] ${isScrolled ? 'py-1 sm:py-2 shadow-lg shadow-black/25' : 'py-2 sm:py-3'}`}
      >
        <div className="w-full max-w-full sm:max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Left: Logo */}
            <a href="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white border-2 border-white/40 group-hover:border-white/80 transition-all duration-300 shadow-md overflow-hidden flex items-center justify-center relative">
                <img
                  src={logoImg}
                  alt="Team 360 Logo"
                  className="w-full h-full object-contain scale-[1.8] transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif text-white font-extrabold text-xs sm:text-base tracking-wide uppercase leading-none">
                  Team 360
                </span>
                <span className="hidden md:block text-[8px] sm:text-[9px] text-white/60 tracking-widest uppercase font-semibold mt-0.5">
                  With D.D. Sharma
                </span>
              </div>
            </a>

            {/* Center: Desktop Nav */}
            <div className="hidden xl:flex items-center gap-1.5 lg:gap-2.5">
              {firstLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`group flex items-center gap-1.5 text-sm font-semibold px-2.5 py-1.5 rounded-lg transition-all duration-200 ${activeSection === link.name
                      ? 'text-[#FFD95A] bg-white/10'
                      : 'text-white/85 hover:text-[#FFD95A] hover:bg-white/10'
                    }`}
                >
                  <span className={`transition-colors pointer-events-none ${activeSection === link.name ? 'text-[#FFD95A]' : 'text-white/60 group-hover:text-[#FFD95A]'
                    }`}>{link.icon}</span>
                  {link.name}
                </a>
              ))}

              {secondLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`group flex items-center gap-1.5 text-sm font-semibold px-2.5 py-1.5 rounded-lg transition-all duration-200 ${activeSection === link.name
                      ? 'text-[#FFD95A] bg-white/10'
                      : 'text-white/85 hover:text-[#FFD95A] hover:bg-white/10'
                    }`}
                >
                  <span className={`transition-colors pointer-events-none ${activeSection === link.name ? 'text-[#FFD95A]' : 'text-white/60 group-hover:text-[#FFD95A]'
                    }`}>{link.icon}</span>
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right: User Menu + Enquire Now + Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3.5">
              {/* User Account / Login State */}
              {!loading && (
                <div className="relative">
                  {currentUser ? (
                    <div>
                      <button
                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                        className="flex items-center gap-1.5 bg-white/5 border border-white/15 hover:border-[#FFD95A]/40 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                      >
                        <User className="w-3.5 h-3.5 text-[#FFD95A]" />
                        <span className="max-w-[70px] truncate">{currentUser.name}</span>
                      </button>
                      
                      {/* Dropdown Menu */}
                      {isUserDropdownOpen && (
                        <>
                          <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setIsUserDropdownOpen(false)}
                          />
                          <div className="absolute right-0 mt-2 w-48 bg-gradient-to-b from-[#2A0D04] to-[#1F0903] border border-[#FFD95A]/20 rounded-xl shadow-2xl p-2 z-20 text-left text-[#FCE7C2] animate-fade-in text-xs font-semibold">
                            <div className="px-3 py-2 border-b border-white/10 mb-1 text-[10px] text-white/50 tracking-wider uppercase font-black">
                              Account Menu
                            </div>
                            <a
                              href="/my-courses"
                              onClick={() => setIsUserDropdownOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                            >
                              <Film className="w-3.5 h-3.5 text-[#FFD95A]" />
                              My Purchased Courses
                            </a>
                            {isUserAdmin(currentUser) && (
                              <a
                                href="/admin-dashboard"
                                onClick={() => setIsUserDropdownOpen(false)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                              >
                                <LayoutDashboard className="w-3.5 h-3.5 text-[#FFD95A]" />
                                Admin Panel
                              </a>
                            )}
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-2 px-3 py-2 text-left rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors border-t border-white/5 mt-1 cursor-pointer"
                            >
                              <LogOut className="w-3.5 h-3.5" />
                              Logout
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsAuthModalOpen(true)}
                      className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-[#FFD95A] hover:brightness-105 text-[#2A0D04] font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all cursor-pointer shadow-md shadow-amber-500/10 active:scale-95"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      Login
                    </button>
                  )}
                </div>
              )}

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
                className="xl:hidden text-white/80 hover:text-[#FFD95A] p-2 rounded-lg hover:bg-white/10 transition-all duration-200 cursor-pointer"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 pointer-events-none" />
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
          <div className="relative w-80 max-w-full bg-[#2A0D04] shadow-2xl p-6 flex flex-col justify-between border-r border-white/10 z-50 text-white overflow-y-auto">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full border-2 border-white/30 bg-white overflow-hidden flex items-center justify-center">
                    <img src={logoImg} alt="Logo" className="w-full h-full object-contain scale-[1.8]" />
                  </div>
                  <div>
                    <div className="font-serif text-white font-extrabold text-sm uppercase tracking-wide">Team 360</div>
                    <div className="text-[9px] text-white/50 tracking-widest uppercase">With D.D. Sharma</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white/60 hover:text-[#FFD95A] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 pointer-events-none" />
                </button>
              </div>

              {/* User Profile Card for Mobile */}
              {currentUser && (
                <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-[#FFD95A] flex items-center justify-center text-[#2A0D04]">
                      <User className="w-4.5 h-4.5 font-bold" />
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
                      <div className="text-[10px] text-white/40 truncate">{currentUser.email}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1.5 pt-2.5 border-t border-white/5 text-xs font-semibold text-left">
                    <a
                      href="/my-courses"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all border ${
                        activeSection === 'My Courses'
                          ? 'text-[#FFD95A] bg-white/10 border-white/10'
                          : 'text-white/80 hover:text-white hover:bg-white/5 border-transparent'
                      }`}
                    >
                      <Film className="w-3.5 h-3.5 text-[#FFD95A]" />
                      My Purchased Courses
                    </a>
                    {isUserAdmin(currentUser) && (
                      <a
                        href="/admin-dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all border ${
                          activeSection === 'Admin Panel'
                            ? 'text-[#FFD95A] bg-white/10 border-white/10'
                            : 'text-white/80 hover:text-white hover:bg-white/5 border-transparent'
                        }`}
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-[#FFD95A]" />
                        Admin Dashboard
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Mobile Links */}
              <div className="flex flex-col gap-1.5">
                {firstLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group flex items-center gap-3 font-semibold py-2.5 px-4 rounded-xl transition-all border text-sm ${activeSection === link.name
                        ? 'text-[#FFD95A] bg-white/10 border-white/10'
                        : 'text-white/85 hover:text-[#FFD95A] hover:bg-white/10 border-transparent hover:border-white/10'
                      }`}
                  >
                    <span className={`p-1.5 rounded-lg transition-all pointer-events-none ${activeSection === link.name ? 'bg-[#FFD95A]/10 text-[#FFD95A]' : 'bg-white/10 group-hover:bg-[#FFD95A]/10 group-hover:text-[#FFD95A]'
                      }`}>{link.icon}</span>
                    {link.name}
                  </a>
                ))}

                {secondLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group flex items-center gap-3 font-semibold py-2.5 px-4 rounded-xl transition-all border text-sm ${activeSection === link.name
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

            {/* Bottom Menu Action */}
            <div className="mt-6 space-y-3">
              {currentUser ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full border border-red-500/30 text-red-400 hover:bg-red-500/10 py-3 rounded-xl flex items-center justify-center gap-2 text-xs uppercase font-bold tracking-wider cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full bg-[#FFD95A] text-[#2A0D04] py-3 rounded-xl flex items-center justify-center gap-2 text-xs uppercase font-bold tracking-wider cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  Login / Sign Up
                </button>
              )}

              <a
                href="https://wa.me/916376779062?text=Hello%20Team%20360!%20I%20would%20like%20to%20enquire%20about%20your%20spiritual%20courses%2C%20workshops%2C%20or%20books.%20Please%20guide%20me%20with%20more%20information!"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="border border-white/40 hover:border-white text-white w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold shadow-lg transition-all hover:bg-white hover:text-[#2A0D04] text-center uppercase tracking-wider block"
              >
                <Sparkles className="w-4 h-4" />
                Enquire Now
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Login / Sign Up Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={(user) => {
          console.log('Successfully authenticated:', user);
        }}
      />
    </>
  );
}
