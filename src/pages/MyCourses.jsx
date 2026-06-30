import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser, useAdminContent, checkEnrollment } from '../admin/contentStore';
import { Sparkles, Film, PlayCircle, LogIn, ChevronRight, Bookmark, ArrowRight, Award } from 'lucide-react';
import AuthModal from '../components/AuthModal';

export default function MyCourses() {
  const navigate = useNavigate();
  const { currentUser, loading } = useCurrentUser();
  const courses = useAdminContent('courses');
  
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loadingEnrollments, setLoadingEnrollments] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Filter only recorded courses
  const recordedCourses = courses.filter(c => c.isRecorded || c.type === 'Recorded Session');

  // Load user enrollments
  useEffect(() => {
    const fetchUserCourses = async () => {
      if (!currentUser) {
        setPurchasedCourses([]);
        setLoadingEnrollments(false);
        return;
      }

      setLoadingEnrollments(true);
      const enrolledList = [];
      for (const course of recordedCourses) {
        const hasAccess = await checkEnrollment(currentUser, course.id);
        if (hasAccess) {
          enrolledList.push(course);
        }
      }
      setPurchasedCourses(enrolledList);
      setLoadingEnrollments(false);
    };

    fetchUserCourses();
  }, [currentUser, courses]);

  // Page title
  useEffect(() => {
    document.title = "My Courses Dashboard | Team 360";
  }, []);

  if (loading || loadingEnrollments) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-[#FFF5EE] text-gray-900 flex flex-col items-center justify-center">
        <span className="w-10 h-10 border-4 border-[#2A0D04] border-t-transparent rounded-full animate-spin"></span>
        <p className="text-gray-500 text-xs mt-4 font-semibold uppercase tracking-wider">Loading your dashboard...</p>
      </div>
    );
  }

  // Not Logged In View
  if (!currentUser) {
    return (
      <div className="pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-24 min-h-screen bg-[#FFF5EE] text-gray-900 relative overflow-hidden flex items-center justify-center">
        
        {/* Glow Details */}
        <div className="absolute top-[10%] left-[-15%] w-[45%] h-[40%] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-15%] w-[45%] h-[40%] rounded-full bg-amber-600/5 blur-[120px] pointer-events-none" />

        <div className="max-w-md mx-auto px-4 relative z-10 text-center space-y-6">
          <div className="w-16 h-16 rounded-full border border-amber-200 bg-amber-50 flex items-center justify-center text-[#6B2D17] mx-auto">
            <Bookmark className="w-7 h-7" />
          </div>
          
          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2A0D04]">
              Access Your Dashboard
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm font-semibold max-w-sm mx-auto leading-relaxed">
              Please log in to your account to view your purchased courses, live workshops, and active training sessions.
            </p>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full bg-[#2A0D04] hover:bg-[#6B2D17] text-[#FFD95A] font-black text-xs uppercase py-3.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4.5 h-4.5" />
            Login to Dashboard
          </button>
        </div>

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={() => navigate('/my-courses')}
        />
      </div>
    );
  }

  return (
    <div className="pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-24 min-h-screen bg-[#FFF5EE] text-gray-900 relative overflow-hidden text-left">
      {/* Decorative Orbs */}
      <div className="absolute top-[10%] left-[-15%] w-[45%] h-[40%] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[45%] h-[40%] rounded-full bg-amber-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-12">
        
        {/* Header */}
        <div className="border-b border-amber-100 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="text-[9px] sm:text-xs font-black tracking-widest text-[#6B2D17] uppercase flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> Active Member
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#2A0D04] mt-1.5">
              My Purchased Courses
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm font-semibold mt-1">
              Welcome back, <span className="text-[#6B2D17] font-black">{currentUser.name}</span>. Start where you left off.
            </p>
          </div>
        </div>

        {/* Dashboard Content */}
        {purchasedCourses.length === 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Blank State (8 cols) */}
            <div className="lg:col-span-8 bg-white border border-amber-100/60 rounded-[1.75rem] p-5 sm:p-12 text-center shadow-xl space-y-6">
              <div className="w-16 h-16 rounded-full border border-amber-200 bg-amber-50 flex items-center justify-center text-[#6B2D17] mx-auto">
                <Film className="w-7 h-7" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2A0D04]">No Enrolled Courses Yet</h3>
                <p className="text-gray-500 text-xs sm:text-sm font-semibold max-w-md mx-auto leading-relaxed">
                  You haven't purchased or enrolled in any recorded training programs yet. Unlock your path to subconscious abundance.
                </p>
              </div>

              <button
                onClick={() => navigate('/recorded-courses')}
                className="bg-[#2A0D04] hover:bg-[#6B2D17] text-[#FFD95A] text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
              >
                Browse Video Catalog
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Side Suggestions (4 cols) */}
            <div className="lg:col-span-4 bg-white/50 border border-amber-100 rounded-3xl p-5 space-y-4">
              <h3 className="font-serif text-sm font-black text-[#2A0D04] uppercase tracking-wider flex items-center gap-1.5 border-b border-amber-100 pb-2">
                <Sparkles className="w-4 h-4 text-[#FFD95A] fill-[#FFD95A]" /> Recommended For You
              </h3>
              
              <div className="space-y-3">
                {recordedCourses.slice(0, 2).map((c) => (
                  <div key={c.id} className="bg-white border border-amber-50 rounded-2xl p-3 flex gap-3">
                    <img src={c.image} alt={c.title} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                    <div className="min-w-0 flex-1 flex flex-col justify-between py-0.5 text-left">
                      <h4 className="font-serif font-black text-xs text-[#2A0D04] line-clamp-1">{c.title}</h4>
                      <p className="text-[10px] text-gray-500 line-clamp-1 mt-0.5 font-semibold">{c.description}</p>
                      <button 
                        onClick={() => navigate('/recorded-courses')}
                        className="text-[10px] text-[#6B2D17] font-black hover:text-[#2A0D04] transition-colors mt-2 text-left flex items-center gap-0.5 uppercase tracking-wider cursor-pointer"
                      >
                        Explore <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* Purchased Courses Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {purchasedCourses.map((course) => (
              <div 
                key={course.id} 
                className="bg-white border border-amber-100/60 rounded-[1.75rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-video bg-gray-100 overflow-hidden border-b border-amber-50">
                    <img 
                      src={course.image || '/quantum_jump_gayatri.png'} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                    <span className="absolute top-4 left-4 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-emerald-500/20">
                      Purchased
                    </span>
                  </div>

                  <div className="p-4 sm:p-6 space-y-2">
                    <h3 className="font-serif text-lg font-bold text-[#2A0D04] line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-bold leading-relaxed line-clamp-2">
                      {course.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 sm:p-6 pt-0">
                  <button
                    onClick={() => navigate(`/recorded-courses/${course.id}`)}
                    className="w-full bg-[#2A0D04] hover:bg-[#6B2D17] text-[#FFD95A] text-xs font-black uppercase tracking-widest py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.98]"
                  >
                    <PlayCircle className="w-4.5 h-4.5" />
                    Start Watching Lessons
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
