import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminContent, useCurrentUser, checkEnrollment, purchaseCourse } from '../admin/contentStore';
import { Sparkles, Film, Check, ShieldCheck, CreditCard, QrCode, LogIn, ChevronRight, Award, Flame, X } from 'lucide-react';
import AuthModal from '../components/AuthModal';
import logoImg from '../assets/logo.png';

export default function RecordedCourses() {
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const courses = useAdminContent('courses');
  const [enrollments, setEnrollments] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Checkout Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPayModal, setShowPayModal] = useState(false);
  const [paymentType, setPaymentType] = useState('upi'); // 'upi' or 'card'
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [payLoading, setPayLoading] = useState(false);

  // Filter only recorded courses
  const recordedCourses = courses.filter(c => c.isRecorded || c.type === 'Recorded Session');

  // Load enrollment statuses
  useEffect(() => {
    const loadEnrollments = async () => {
      if (!currentUser || recordedCourses.length === 0) {
        setLoading(false);
        return;
      }
      
      const statuses = {};
      for (const course of recordedCourses) {
        statuses[course.id] = await checkEnrollment(currentUser, course.id);
      }
      setEnrollments(statuses);
      setLoading(false);
    };
    
    loadEnrollments();
  }, [currentUser, courses]);

  // Load Razorpay Checkout Script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBuyClick = (course) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setSelectedCourse(course);
    
    // Check if Razorpay Key exists in settings
    let rzpKey = import.meta.env.VITE_RAZORPAY_KEY_ID || '';
    try {
      const settings = JSON.parse(localStorage.getItem('t360_v5_settings') || '{}');
      if (settings && settings.razorpayKey) {
        rzpKey = settings.razorpayKey;
      }
    } catch(e) {}

    if (rzpKey) {
      // Trigger Real Razorpay Checkout
      triggerRazorpay(course, rzpKey);
    } else {
      // Open Mock Payment Modal
      setShowPayModal(true);
    }
  };

  const triggerRazorpay = async (course, rzpKey) => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert('Failed to load payment gateways. Please try again.');
      return;
    }

    setPayLoading(true);
    try {
      // 1. Create order on the backend
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: course.id,
          amount: course.price || 35400
        })
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.error || 'Failed to create payment order');
      }

      const options = {
        key: rzpKey,
        amount: (course.price || 35400) * 100, // in paisa
        currency: 'INR',
        name: 'Team 360',
        description: course.title,
        image: logoImg,
        order_id: orderData.orderId, // Bind the order ID
        handler: async function (response) {
          setPayLoading(true);
          try {
            // 2. Verify payment on the backend
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                userId: currentUser.uid || String(currentUser.id),
                userName: currentUser.name,
                userEmail: currentUser.email,
                courseId: course.id,
                amount: course.price || 35400
              })
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) {
              throw new Error(verifyData.error || 'Payment verification failed');
            }
            // Update local status
            setEnrollments(prev => ({ ...prev, [course.id]: true }));
            navigate(`/recorded-courses/${course.id}`);
          } catch (e) {
            alert('Payment verification failed: ' + e.message);
          } finally {
            setPayLoading(false);
          }
        },
        prefill: {
          name: currentUser.name,
          email: currentUser.email,
        },
        theme: {
          color: '#2A0D04'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e) {
      alert('Error initiating checkout: ' + e.message);
    } finally {
      setPayLoading(false);
    }
  };

  const handleMockPaymentSubmit = async (e) => {
    e.preventDefault();
    setPayLoading(true);

    // Simulate payment processing delay
    setTimeout(async () => {
      try {
        await purchaseCourse(currentUser, selectedCourse.id, {
          amount: selectedCourse.price || 35400,
          paymentId: `mock-pay-${Date.now()}`
        });
        setEnrollments(prev => ({ ...prev, [selectedCourse.id]: true }));
        setShowPayModal(false);
        navigate(`/recorded-courses/${selectedCourse.id}`);
      } catch (err) {
        alert('Failed to process mock purchase');
      } finally {
        setPayLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-24 min-h-screen bg-[#FFF5EE] text-gray-900 relative overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-[10%] left-[-15%] w-[45%] h-[40%] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[45%] h-[40%] rounded-full bg-amber-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-16">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-xs font-black tracking-widest text-[#6B2D17] uppercase bg-[#6B2D17]/5 border border-[#6B2D17]/10 px-3 py-1.5 rounded-full shadow-lg">
            <Film className="w-3.5 h-3.5 text-[#6B2D17]" />
            Self-Paced Learning Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#2A0D04] leading-tight">
            Recorded Video Courses
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#FFD95A] to-amber-700 mx-auto rounded-full mt-2" />
          <p className="text-gray-600 text-xs sm:text-sm font-semibold max-w-2xl mx-auto leading-relaxed">
            Gain immediate access to premium courses on subconscious mind programming, Gayatri Science, and happy hormone activation. Learn anytime, anywhere, at your own pace.
          </p>
        </div>

        {/* Catalog Grid */}
        {loading ? (
          <div className="py-24 text-center flex flex-col items-center">
            <span className="w-10 h-10 border-4 border-[#2A0D04] border-t-transparent rounded-full animate-spin"></span>
            <p className="text-gray-500 text-xs mt-4 font-semibold uppercase tracking-wider">Syncing course catalogs...</p>
          </div>
        ) : recordedCourses.length === 0 ? (
          <div className="py-20 text-center bg-white/40 border border-amber-100 rounded-3xl p-8 max-w-lg mx-auto">
            <Film className="w-12 h-12 text-[#2A0D04]/30 mx-auto mb-3" />
            <h4 className="font-serif text-lg font-bold text-[#2A0D04]">No Recorded Courses Available</h4>
            <p className="text-gray-500 text-xs mt-1">Please check back later or contact admin to publish courses.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recordedCourses.map((course) => {
              const isEnrolled = enrollments[course.id];
              return (
                <div 
                  key={course.id} 
                  className="bg-white border border-amber-100/60 rounded-[1.75rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col group text-left"
                >
                  {/* Course Image */}
                  <div 
                    onClick={() => navigate(`/courses/${course.id}`)}
                    className="relative aspect-video bg-gray-100 overflow-hidden border-b border-amber-50/50 cursor-pointer"
                  >
                    <img 
                      src={course.image || '/quantum_jump_gayatri.png'} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    <span className="absolute top-4 left-4 bg-[#2A0D04] text-[#FFD95A] text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#FFD95A]/20">
                      {course.category}
                    </span>
                    
                    {course.id === 'quantum-jump' && (
                      <span className="absolute top-4 right-4 bg-orange-600 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Flame className="w-3 h-3 fill-white" /> Popular
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4.5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 
                        onClick={() => navigate(`/courses/${course.id}`)}
                        className="font-serif text-lg sm:text-xl font-bold text-[#2A0D04] hover:text-[#6B2D17] transition-colors leading-snug line-clamp-2 cursor-pointer"
                      >
                        {course.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-bold leading-relaxed line-clamp-3">
                        {course.description}
                      </p>
                    </div>

                    {/* Quick Benefits list */}
                    {course.benefits && course.benefits.length > 0 && (
                      <div className="space-y-1.5 pt-1.5 border-t border-amber-50">
                        {course.benefits.slice(0, 3).map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[11px] text-gray-600 font-semibold leading-tight">
                            <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="truncate">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Price and Action Footer */}
                    <div className="pt-4 border-t border-amber-100 flex items-center justify-between gap-4">
                      <div>
                        <span className="block text-[8px] uppercase font-black text-gray-400 tracking-wider">Investment</span>
                        <span className="text-lg font-black text-[#2A0D04]">
                          ₹{(course.price || 35400).toLocaleString('en-IN')}
                        </span>
                      </div>
                      
                      {isEnrolled ? (
                        <button
                          onClick={() => navigate(`/recorded-courses/${course.id}`)}
                          className="bg-[#2A0D04] hover:bg-[#6B2D17] text-[#FFD95A] text-xs font-black uppercase tracking-widest px-4.5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95"
                        >
                          Watch Now
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBuyClick(course)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest px-4.5 py-2.5 rounded-xl transition-all cursor-pointer shadow-md shadow-emerald-500/10 active:scale-95 shrink-0"
                        >
                          Buy Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Benefits/Safety Oath */}
        <div className="bg-gradient-to-br from-[#2A0D04] via-[#6B2D17] to-[#120502] rounded-[1.75rem] sm:rounded-[2.5rem] p-6 sm:p-10 text-white border border-[#FFD95A]/20 text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFD95A]/10 border border-[#FFD95A]/30 flex items-center justify-center text-[#FFD95A] flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Lifetime Access</h4>
                <p className="text-white/60 text-xs mt-1 leading-relaxed font-semibold">Buy once, watch forever. Watch lessons at your own convenience without deadlines.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFD95A]/10 border border-[#FFD95A]/30 flex items-center justify-center text-[#FFD95A] flex-shrink-0">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">High Definition Videos</h4>
                <p className="text-white/60 text-xs mt-1 leading-relaxed font-semibold">Enjoy structured, step-by-step sessions with clear descriptions and guided practices.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFD95A]/10 border border-[#FFD95A]/30 flex items-center justify-center text-[#FFD95A] flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Secured Payments</h4>
                <p className="text-white/60 text-xs mt-1 leading-relaxed font-semibold">Protected payments. Instantly unlocks access to course videos upon confirmation.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Mock Checkout Modal */}
      {showPayModal && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setShowPayModal(false)} />
          
          <div className="relative my-auto w-full max-w-md bg-gradient-to-br from-[#2A0D04] via-[#1A0802] to-[#120502] border border-[#FFD95A]/25 rounded-2xl sm:rounded-3xl p-5 sm:p-8 overflow-hidden shadow-2xl text-left text-[#FCE7C2]">
            <button onClick={() => setShowPayModal(false)} className="absolute top-4 right-4 sm:top-5 sm:right-5 text-white/50 hover:text-white cursor-pointer z-10">
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="border-b border-white/10 pb-4 mb-5 flex items-center gap-3 pr-8">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Payment Checkout</h3>
                <span className="text-[10px] text-white/50 tracking-wider uppercase font-black">Demo Payment Gateway</span>
              </div>
            </div>

            {/* Course Summary */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1 mb-5">
              <span className="text-[9px] uppercase font-black text-[#FFD95A] tracking-wider">Course Selected</span>
              <h4 className="font-serif text-sm font-bold text-white">{selectedCourse.title}</h4>
              <div className="flex justify-between items-center pt-2 mt-2 border-t border-white/5 text-xs">
                <span className="text-white/60 font-semibold">Total Amount</span>
                <span className="font-black text-white text-base">₹{(selectedCourse.price || 35400).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Tabs (Card / UPI) */}
            <div className="flex bg-[#120502] p-1 rounded-xl mb-5 border border-white/5 text-xs">
              <button
                onClick={() => setPaymentType('upi')}
                className={`flex-1 py-2 rounded-lg font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  paymentType === 'upi' ? 'bg-[#FFD95A] text-[#2A0D04]' : 'text-white/60 hover:text-white'
                }`}
              >
                <QrCode className="w-4 h-4" /> UPI QR Code
              </button>
              <button
                onClick={() => setPaymentType('card')}
                className={`flex-1 py-2 rounded-lg font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  paymentType === 'card' ? 'bg-[#FFD95A] text-[#2A0D04]' : 'text-white/60 hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4" /> Credit Card
              </button>
            </div>

            {/* Payment Content */}
            <form onSubmit={handleMockPaymentSubmit} className="space-y-4">
              {paymentType === 'upi' ? (
                <div className="text-center py-4 flex flex-col items-center justify-center space-y-3">
                  <div className="bg-white p-3 rounded-2xl border border-amber-100 shadow-md">
                    {/* Simulated QR Code */}
                    <svg className="w-32 h-32 text-gray-900" viewBox="0 0 100 100">
                      <rect width="100" height="100" fill="white"/>
                      <rect x="10" y="10" width="20" height="20" fill="currentColor"/>
                      <rect x="70" y="10" width="20" height="20" fill="currentColor"/>
                      <rect x="10" y="70" width="20" height="20" fill="currentColor"/>
                      <rect x="15" y="15" width="10" height="10" fill="white"/>
                      <rect x="75" y="15" width="10" height="10" fill="white"/>
                      <rect x="15" y="75" width="10" height="10" fill="white"/>
                      <rect x="35" y="35" width="30" height="30" fill="currentColor"/>
                      <rect x="40" y="40" width="20" height="20" fill="white"/>
                      <rect x="45" y="45" width="10" height="10" fill="currentColor"/>
                      <rect x="75" y="75" width="15" height="15" fill="currentColor"/>
                      <rect x="10" y="40" width="10" height="20" fill="currentColor"/>
                      <rect x="40" y="10" width="20" height="10" fill="currentColor"/>
                    </svg>
                  </div>
                  <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider leading-relaxed">
                    Scan using any UPI App (GPay, PhonePe, Paytm)<br />
                    or click the button below to simulate payment success.
                  </p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-[9px] font-black text-[#FFD95A] uppercase tracking-widest mb-1">Card Number</label>
                    <input 
                      type="text" 
                      required
                      placeholder="4111 2222 3333 4444"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-[#120502]/60 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FFD95A]/60 text-xs font-bold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-black text-[#FFD95A] uppercase tracking-widest mb-1">Expiry Date</label>
                      <input 
                        type="text" 
                        required
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-[#120502]/60 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FFD95A]/60 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-[#FFD95A] uppercase tracking-widest mb-1">CVV</label>
                      <input 
                        type="password" 
                        required
                        maxLength="3"
                        placeholder="•••"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-[#120502]/60 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#FFD95A]/60 text-xs font-bold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={payLoading}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/10 mt-6 text-xs uppercase tracking-wider cursor-pointer"
              >
                {payLoading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <ShieldCheck className="w-4.5 h-4.5" />
                    Complete Payment Simulator
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Auth Modal Trigger */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => handleBuyClick(selectedCourse)}
      />
    </div>
  );
}
