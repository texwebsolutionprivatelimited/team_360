import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdminContent, useCurrentUser, checkEnrollment } from '../admin/contentStore';
import { Play, Sparkles, Award, Shield, Key, MessageCircle, Heart, Star, Brain, ArrowRight, Lock, PlayCircle, Clock } from 'lucide-react';
import AuthModal from '../components/AuthModal';

export default function RecordedCourseViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const courses = useAdminContent('courses');
  
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState(true);
  const [activeSession, setActiveSession] = useState(null);
  
  // Find current course
  const course = courses.find(c => c.id === id);

  // Auth modal inside Lock Screen
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [payLoading, setPayLoading] = useState(false);

  // Check enrollment status
  useEffect(() => {
    const verifyEnrollment = async () => {
      if (!course) return;
      if (!currentUser) {
        setIsEnrolled(false);
        setCheckingEnrollment(false);
        return;
      }
      setCheckingEnrollment(true);
      const enrolled = await checkEnrollment(currentUser, course.id);
      setIsEnrolled(enrolled);
      setCheckingEnrollment(false);
    };

    verifyEnrollment();
  }, [currentUser, course]);

  // Set default active session when course loads or is updated
  useEffect(() => {
    if (course && course.modules && course.modules.length > 0) {
      // Find first session in first module
      const firstModule = course.modules[0];
      if (firstModule.sessions && firstModule.sessions.length > 0) {
        setActiveSession(firstModule.sessions[0]);
      }
    }
  }, [course]);

  // Page title and scroll
  useEffect(() => {
    if (course) {
      document.title = `Exclusive Vault: ${course.title} | Team 360`;
    }
    window.scrollTo(0, 0);
  }, [course]);

  if (checkingEnrollment) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-[#0D0302] text-[#FCE7C2] flex flex-col items-center justify-center">
        <span className="w-10 h-10 border-4 border-[#FFD95A] border-t-transparent rounded-full animate-spin"></span>
        <p className="text-[#FFD95A]/60 text-xs mt-4 font-semibold uppercase tracking-wider">Verifying access credentials...</p>
      </div>
    );
  }

  // If course not found
  if (!course) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-[#0D0302] text-[#FCE7C2] flex flex-col items-center justify-center text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-white">Course Not Found</h2>
        <p className="text-white/60 text-sm">The requested recorded course does not exist in our catalog.</p>
        <button 
          onClick={() => navigate('/recorded-courses')}
          className="bg-[#FFD95A] text-[#2A0D04] font-bold text-xs uppercase px-5 py-2.5 rounded-xl cursor-pointer"
        >
          Browse Courses
        </button>
      </div>
    );
  }

  // Lock Screen (if not enrolled)
  if (!isEnrolled) {
    return (
      <div className="pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-24 min-h-screen bg-[#0D0302] text-[#FCE7C2] relative overflow-hidden flex items-center justify-center">
        
        {/* Glow Effects */}
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[40%] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[40%] rounded-full bg-red-600/5 blur-[100px] pointer-events-none" />

        <div className="max-w-2xl mx-auto px-4 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 mb-2">
            <Lock className="w-8 h-8 animate-pulse" />
          </div>
          
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#FFD95A] bg-[#FFD95A]/5 border border-[#FFD95A]/15 px-3 py-1.5 rounded-full">
              Access Code Required
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Unlock {course.title}
            </h1>
            <p className="text-white/60 text-xs sm:text-sm font-semibold max-w-md mx-auto leading-relaxed mt-2">
              This premium dynamic recorded course vault is only accessible to enrolled members. Reprogram your subconscious mind today.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 sm:p-5 rounded-xl sm:rounded-2xl max-w-sm mx-auto text-left space-y-3.5">
            <h4 className="text-xs font-black uppercase text-[#FFD95A] tracking-wider border-b border-white/10 pb-2 flex items-center justify-between">
              <span>Member Privileges</span>
              <span>₹{(course.price || 35400).toLocaleString('en-IN')}</span>
            </h4>
            <div className="space-y-2 text-[11px] font-semibold text-white/70">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFD95A] mt-1.5 shrink-0" />
                <span>Lifetime access to all recorded sessions</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFD95A] mt-1.5 shrink-0" />
                <span>Structured video syllabus with lesson descriptions</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFD95A] mt-1.5 shrink-0" />
                <span>Complete workbook practices and instructions</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <button
              onClick={() => navigate('/recorded-courses')}
              className="w-full sm:w-auto border border-white/20 hover:border-white text-white font-bold text-xs uppercase px-6 py-3 rounded-xl transition-all cursor-pointer"
            >
              Back to Catalog
            </button>
            <button
              onClick={() => {
                if (!currentUser) {
                  setIsAuthModalOpen(true);
                } else {
                  // Direct them to buy on list page
                  navigate('/recorded-courses');
                }
              }}
              className="w-full sm:w-auto bg-[#FFD95A] hover:bg-amber-400 text-[#2A0D04] font-black text-xs uppercase px-6 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/10 cursor-pointer"
            >
              {currentUser ? 'Enroll & Unlock Now' : 'Login to Purchase'}
            </button>
          </div>
        </div>

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={() => navigate('/recorded-courses')}
        />
      </div>
    );
  }

  // Active video play (if user is enrolled)
  return (
    <div className="pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 min-h-screen bg-[#0D0302] text-[#FCE7C2] relative overflow-hidden">
      
      {/* Self-contained styling to hide scrollbars */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Glowing Orbs */}
      <div className="absolute top-[10%] left-[-10%] w-[50%] h-[40%] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[45%] rounded-full bg-amber-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-[95%] mx-auto px-2 sm:px-6 lg:px-8 relative z-10 space-y-6 sm:space-y-8 lg:space-y-12">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3 px-1">
          <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-xs font-black tracking-widest text-[#FFD95A] uppercase bg-white/5 border border-white/10 px-3 py-1.5 rounded-full shadow-lg">
            <Key className="w-3.5 h-3.5 text-[#FFD95A] animate-pulse" />
            Private Vault: Premium Enrollment
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFD95A] to-white leading-tight">
            {course.title}
          </h1>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-[#FFD95A] to-amber-700 mx-auto rounded-full mt-1.5" />
          <p className="text-white/60 text-[11px] sm:text-sm font-semibold leading-relaxed max-w-2xl mx-auto">
            {course.subtitle || 'Access your video playlist below. Reprogram your subconscious mind to align with wealth and abundance.'}
          </p>
        </div>

        {/* Video Player & Playlist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Main Video Box (8 cols on lg) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
            <div className="bg-white/5 border border-white/10 p-3 sm:p-5 rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl backdrop-blur-md relative overflow-hidden flex flex-col justify-start">
              
              {/* YouTube Responsive Frame */}
              <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-white/10 shadow-inner">
                {activeSession ? (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${activeSession.id}?rel=0&modestbranding=1`}
                    title={activeSession.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-2">
                    <PlayCircle className="w-12 h-12 text-[#FFD95A]/30" />
                    <p className="text-white/50 text-xs font-bold uppercase tracking-wider">No Video Selected</p>
                  </div>
                )}
              </div>

              {/* Session Meta Description */}
              {activeSession && (
                <div className="mt-4 sm:mt-6 text-left space-y-1.5 px-0.5 animate-fade-in">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase text-[#FFD95A] tracking-wider block">
                    Now Playing
                  </span>
                  <h2 className="font-serif text-base sm:text-2xl font-bold text-white leading-tight">
                    {activeSession.title}
                  </h2>
                  <p className="text-white/70 text-xs sm:text-sm font-medium leading-relaxed">
                    {activeSession.desc || activeSession.description || 'Practice daily instructions to lock the subconscious alignments.'}
                  </p>
                </div>
              )}

            </div>

            {/* Quick Member Assistance Widget */}
            <div className="bg-gradient-to-r from-[#2A0D04]/60 via-[#120502]/80 to-[#6B2D17]/60 border border-[#FFD95A]/25 p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              <div className="space-y-1">
                <h4 className="font-serif font-black text-[#FFD95A] text-sm uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
                  <Shield className="w-4 h-4 text-[#FFD95A] flex-shrink-0" /> Dynamic Mentorship Desk
                </h4>
                <p className="text-white/60 text-xs font-semibold leading-relaxed">
                  Need direct assistance integrating lessons or facing issues with loading? Connect with our support team.
                </p>
              </div>
              <a
                href="https://wa.me/916376779062?text=Hello%20Team%20360!%20I%20am%20enrolled%20in%20your%20recorded%20course%20and%20need%20mentorship%20support."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto bg-[#25D366] hover:bg-[#20BA56] text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-5 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap active:scale-[0.98] shadow-md shadow-emerald-500/10 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white flex-shrink-0" />
                Contact Team on WhatsApp
              </a>
            </div>
          </div>

          {/* Sidebar Playlist Box (4 cols on lg) */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-5 flex flex-col shadow-2xl backdrop-blur-md relative overflow-hidden h-[380px] sm:h-[450px] lg:h-[620px]">
            <div className="border-b border-white/10 pb-3 mb-3 sm:pb-4 sm:mb-4 text-left flex items-center justify-between">
              <div>
                <h3 className="font-serif text-sm sm:text-base font-bold text-white">Course Modules</h3>
                <span className="text-[8px] sm:text-[9px] font-black text-[#FFD95A] uppercase tracking-wider">
                  {course.modules ? course.modules.reduce((acc, m) => acc + (m.sessions ? m.sessions.length : 0), 0) : 0} Video Lessons
                </span>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-[#FFD95A] animate-pulse flex-shrink-0" />
            </div>

            {/* Scrollable Grouped List */}
            <div className="flex-1 overflow-y-auto space-y-5 pr-1 no-scrollbar text-left" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {course.modules && course.modules.length > 0 ? (
                course.modules.map((mod, modIdx) => (
                  <div key={mod.id || modIdx} className="space-y-2.5">
                    <div className="text-[9px] font-black text-[#FFD95A]/70 uppercase tracking-widest pl-2 border-l-2 border-[#FFD95A]/30">
                      {mod.title}
                    </div>
                    <div className="space-y-2">
                      {mod.sessions && mod.sessions.map((session, sIdx) => {
                        const isActive = activeSession && activeSession.id === session.id;
                        return (
                          <button
                            key={session.id || sIdx}
                            onClick={() => setActiveSession(session)}
                            className={`w-full text-left p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition-all duration-300 flex items-start gap-2.5 sm:gap-3 group/item cursor-pointer ${
                              isActive 
                                ? 'bg-[#FFD95A] border-transparent text-[#2A0D04]' 
                                : 'bg-white/5 border-white/5 text-white/80 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            <div className={`w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 border transition-all duration-300 ${
                              isActive 
                                ? 'bg-[#2A0D04] text-[#FFD95A] border-transparent' 
                                : 'bg-white/10 text-white/50 border-white/10 group-hover/item:border-white/20'
                            }`}>
                              <Play className="w-2.5 h-2.5 fill-current" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className={`text-xs font-bold leading-snug line-clamp-2 ${
                                isActive ? 'text-[#2A0D04]' : 'text-white group-hover/item:text-[#FFD95A]'
                              }`}>
                                {session.title}
                              </h4>
                              <p className={`text-[9px] sm:text-[10px] leading-relaxed line-clamp-1 mt-0.5 ${
                                isActive ? 'text-[#2A0D04]/70 font-semibold' : 'text-white/50 group-hover/item:text-white/80'
                              }`}>
                                {session.desc || session.description || 'Guided practice.'}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-white/40 text-xs font-semibold">
                  No modules published yet.
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Course Info Cards */}
        <div className="bg-white/5 border border-white/10 rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-10 shadow-2xl backdrop-blur-md text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            <div className="space-y-4">
              <h3 className="font-serif text-base sm:text-xl font-bold text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-[#FFD95A] fill-[#FFD95A]" /> Course Syllabus &amp; Overview
              </h3>
              <div className="w-16 h-0.5 bg-[#FFD95A]/40 rounded-full" />
              <p className="text-white/70 text-xs sm:text-sm font-medium leading-relaxed">
                {course.details || 'This recorded program guides you through subconscious mind programming. Ensure you watch sessions in sequential order, complete the exercises inside your Identity Notebook, and practice Mirror and Water glass techniques daily.'}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-base sm:text-xl font-bold text-white flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#FFD95A]" /> Core Objectives
              </h3>
              <div className="w-16 h-0.5 bg-[#FFD95A]/40 rounded-full" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-semibold text-white/70">
                {course.benefits && course.benefits.length > 0 ? (
                  course.benefits.slice(0, 6).map((b, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-white/5 border border-white/5 rounded-xl">
                      <span className="w-1.5 h-1.5 bg-[#FFD95A] rounded-full flex-shrink-0" />
                      <span className="truncate">{b}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-white/50 text-xs">Dynamic alignment training.</p>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
