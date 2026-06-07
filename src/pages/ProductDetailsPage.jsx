import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Sparkles, Gem, CheckCircle2, ShieldCheck, HelpCircle, Plus, Minus, Gift, Scroll, MessageSquare, Copy, Check, Moon } from 'lucide-react';
import { useAdminContent } from '../admin/contentStore';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const products = useAdminContent('products');
  const fromPage = location.state?.fromPage || 1;
  const product = products.find((p) => String(p.id) === String(id));
  const isCombo = product?.title?.toLowerCase().includes('combo') || product?.subtitle?.toLowerCase().includes('combo');

  useEffect(() => {
    if (product) {
      document.title = `${product.title} | Team 360 Bookstore`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `${product.subtitle || ''} - Buy energized ${product.title} certified AAA grade crystal blessed and energized. Price: ₹${product.price}.`);
      }
    }
  }, [product]);
  
  // Price and discount calculations
  const originalPrice = product ? (product.price === 2500 ? 5999
    : product.price === 1111 ? 2499
    : product.price === 899 ? 1999
    : product.price === 1299 ? 2999
    : product.price === 999 ? 2199
    : product.price === 1199 ? 2699
    : product.price === 1499 ? 3499
    : Math.round(product.price * 2.2)) : 0;
  const discountPercent = product ? Math.round(((originalPrice - product.price) / originalPrice) * 100) : 0;

  const [openFaqIdx, setOpenFaqIdx] = useState(null);



  // Reviews State
  const [reviews, setReviews] = useState([
    {
      name: "Rakesh Singhal",
      city: "Mumbai",
      review: "The Tiger Eye Combo is a real powerhouse! Felt a massive boost in my decision-making confidence and protection within days. Got a major client deal signed within 2 weeks of wearing the pendant!",
      stars: 5,
      date: "2 weeks ago"
    },
    {
      name: "Priya Sharma",
      city: "Delhi",
      review: "I ordered the Rose Quartz Combo and Pyrite Combo. The peace of mind and abundance is unbelievable. My daily anxiety has vanished and there is so much calm and loving harmony in my house now.",
      stars: 5,
      date: "1 month ago"
    },
    {
      name: "Meera Nair",
      city: "Bangalore",
      review: "Highly recommend D.D. Sharma ji's crystal combos! You can literally feel the cool energetic vibration the moment you open the box. The packaging is absolutely divine and high quality.",
      stars: 5,
      date: "3 weeks ago"
    },
    {
      name: "Amit Patel",
      city: "Ahmedabad",
      review: "Perfect layout and very high quality crystals! I place the tree on my desk and wear the pendant wand every day. It helps me stay extremely focused and calm throughout the workday.",
      stars: 5,
      date: "4 weeks ago"
    },
    {
      name: "Sneha Reddy",
      city: "Hyderabad",
      review: "Beautiful Clear Quartz combo items. Received it in a lovely packaging with a sweet instruction card. Very happy with the purchase!",
      stars: 5,
      date: "5 days ago"
    }
  ]);

  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewCity, setNewReviewCity] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewStars, setNewReviewStars] = useState(5);
  const [showFormSuccess, setShowFormSuccess] = useState(false);

  // Carousel & Responsive Slider States
  const [activeIdx, setActiveIdx] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Track window size for responsive item calculations
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getItemsPerPage = () => {
    if (windowWidth >= 1024) return 4;
    if (windowWidth >= 768) return 2;
    return 1;
  };

  const itemsPerPage = getItemsPerPage();
  const maxIdx = Math.max(0, reviews.length - itemsPerPage);

  // Keep activeIdx within valid bounds
  useEffect(() => {
    if (activeIdx > maxIdx) {
      setActiveIdx(maxIdx);
    }
  }, [maxIdx, activeIdx]);

  // Auto-slide carousel every 5 seconds
  useEffect(() => {
    if (maxIdx === 0) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev >= maxIdx ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [maxIdx]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewName || !newReviewCity || !newReviewText) return;

    const newRev = {
      name: newReviewName,
      city: newReviewCity,
      review: newReviewText,
      stars: newReviewStars,
      date: "Just now"
    };

    setReviews((prev) => [newRev, ...prev]);
    setShowFormSuccess(true);

    // Reset fields
    setNewReviewName('');
    setNewReviewCity('');
    setNewReviewText('');
    setNewReviewStars(5);

    // Auto reset success message after 5 seconds
    setTimeout(() => {
      setShowFormSuccess(false);
    }, 5000);
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  if (!product) {
    return (
      <div className="pt-32 min-h-screen bg-[#FFF5EE] flex flex-col items-center justify-center px-4 text-center">
        <div className="bg-white border border-amber-200 rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
          <div className="absolute top-[-20%] left-[-20%] w-48 h-48 rounded-full bg-amber-100/50 blur-2xl pointer-events-none" />
          <Gem className="w-16 h-16 text-[#6B2D17] mx-auto mb-4 animate-bounce" />
          <h2 className="font-serif text-2xl font-black text-[#2A0D04] mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            We couldn't find the crystal product you are looking for. It may have been discontinued or updated.
          </p>
          <Link
            to={`/products?page=${fromPage}`}
            className="inline-flex items-center gap-2 bg-[#2A0D04] hover:bg-[#120502] text-white font-bold py-3.5 px-6 rounded-xl transition-all text-xs uppercase tracking-wider shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const getWhatsAppLink = () => {
    const itemType = isCombo ? 'crystal combo' : 'crystal bracelet';
    const msg = `Hello Team 360 Support! I would like to purchase the energized ${itemType}: *${product.title}* (₹${product.price.toLocaleString('en-IN')}). Please guide me on payment and shipping details!`;
    return `https://wa.me/916376779062?text=${encodeURIComponent(msg)}`;
  };

  const productFaqs = [
    {
      q: "How do I choose the right crystal bracelet for me?",
      a: "The most powerful way is to trust your inner intuition. Look at the crystals in our shop—the one that instantly catches your eye or brings a sense of attraction is usually what your energetic aura requires right now. Alternatively, you can choose based on specific goals: Tiger Eye for career luck, Rose Quartz for relationship harmony, or Tourmaline for ultimate protection."
    },
    {
      q: "Can I wear multiple crystal bracelets at the same time?",
      a: "Yes, definitely! You can wear multiple bracelets together. However, we advise wearing no more than 2 or 3 crystal bracelets simultaneously so that your body can easily absorb and harmonize with their individual vibrations. Grounding stones like Black Tourmaline pair exceptionally well with manifestation stones like Tiger Eye."
    },
    {
      q: "How are these crystals blessed and blessed and energized by Team 360?",
      a: "Every bracelet undergoes a thorough cleansing using a 528Hz sound frequency singing bowl to remove previous mining/handling vibrations. D.D. Sharma then conducts a sacred energy-infusing ritual during her live Maha Laxmi Wealth circles, programming the crystal with high-vibrational 5D abundance and protection codes."
    },
    {
      q: "Can others touch my energized crystal bracelet?",
      a: "Your crystal is highly responsive and gets calibrated to your unique auric field. It is highly recommended not to let others wear or touch your bracelet. If someone touches it accidentally, you can quickly reset its energy by placing it under running tap water or smudge it with camphor/incense smoke."
    },
    {
      q: "How do I cleanse or recharge my bracelet at home?",
      a: "To keep your bracelet vibrating at its peak frequency, cleanse it once a week. You can leave it overnight under the gentle light of the Full Moon, place it on a Selenite charging plate, or run sage/camphor smoke around the beads for 2 minutes."
    }
  ];

  const comboFaqs = [
    {
      q: "How do I arrange the different items in my crystal combo?",
      a: "Each item has a specific energetic role. Place the Crystal Tree in your home/office (North-East for wealth/wisdom, South-West for love) to continuously radiate positivity. Set the Crystal Angel and Crystal Ganesha on your main prayer altar or desk to invite divine protection and remove obstacles. Wear the Pendant/Bracelet for personal auric shielding, and keep the tumble/pyramid stones in your meditation corner or beside your bed."
    },
    {
      q: "Do I need to cleanse and charge all items in the combo individually?",
      a: "No, you can cleanse them together. Place all components in a glass, ceramic, or wooden tray, then pass sage, camphor, or incense smoke around them. To recharge, place them together under the gentle light of the Full Moon once a week, or position them around a Selenite charging plate."
    },
    {
      q: "Can multiple people in my household share the individual pieces?",
      a: "For maximum efficacy, the combo is designed to establish a unified energetic grid for one owner or a single home. We strongly recommend that the primary user claims the bracelet or pendant, while the tree, pyramid, and deities harmonize the shared household atmosphere. Sharing personal wear items like bracelets or pendants with people outside the immediate family can dilute the attunement."
    },
    {
      q: "How does Devendra Sharma (D.D. Sharma) bless and energize these crystal combos?",
      a: "Every item in the combo undergoes a deep vibrational cleansing with a 528Hz sound bowl. Devendra Sharma (D.D. Sharma) then performs a sacred energy attunement ritual, invoking specific high-frequency 5D grids (Abundance for Pyrite, Heart-Chakra/Love for Rose Quartz, Solar-Plexus/Protection for Tiger Eye, and Master Healing/Clarity for Clear Quartz) to make them absolute manifestation powerhouses."
    },
    {
      q: "How soon can I expect to feel the shifting energy?",
      a: "Energetic shifts begin the moment the package enters your home. Many seekers notice an immediate sense of lightness, mental clarity, or emotional relief. Give the crystals 14 to 21 days of daily integration to fully calibrate with your household energy field and support major manifestation breakthroughs."
    }
  ];

  const faqItems = (product && product.faqs && product.faqs.length > 0) ? product.faqs : (isCombo ? comboFaqs : productFaqs);

  const packageIncludes = isCombo ? [
    {
      title: "Genuine AAA-Grade Combo Set",
      desc: "Complete 6-piece energized set including Angel, Pendant/Bracelet, Tree, Deity, Pyramid, and Tumble.",
      icon: Gem
    },
    {
      title: "Cosmic Protection Box",
      desc: "An elegantly padded, sturdy protective storage box to shield your sacred items.",
      icon: Gift
    },
    {
      title: "Attunement & Ritual Card",
      desc: "Detailed guide showing your personal intention-setting ritual step-by-step.",
      icon: Scroll
    },
    {
      title: "Energy Purifying Incense",
      desc: "A highly-charged herbal incense cone for your crystal combo's weekly cleansing.",
      icon: Sparkles
    }
  ] : [
    {
      title: "Genuine Activated Bracelet",
      desc: "100% natural, A-Grade gemstone beads hand-calibrated to high vibrations.",
      icon: Gem
    },
    {
      title: "Eco Pouch & Protection",
      desc: "A soft, premium sustainable canvas pouch to store your bracelet safely.",
      icon: Gift
    },
    {
      title: "Attunement & Ritual Card",
      desc: "Detailed guide showing your personal intention-setting ritual step-by-step.",
      icon: Scroll
    },
    {
      title: "Energy Purifying Incense",
      desc: "A highly-charged herbal incense cone for your bracelet's weekly cleansing.",
      icon: Sparkles
    }
  ];



  const toggleFaq = (index) => {
    setOpenFaqIdx(openFaqIdx === index ? null : index);
  };


  return (
    <div className="pt-20 lg:pt-28 pb-12 sm:pb-20 min-h-screen bg-[#FFF5EE] relative overflow-hidden">
      {/* Background soft glowing blurs */}
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] rounded-full bg-white/40 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-200/50 blur-[130px] pointer-events-none" />

      <div className="max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8 relative z-10">

        {/* Back Link */}
        <Link
          to={`/products?page=${fromPage}`}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#6B2D17] hover:text-[#6B2D17] mb-4 sm:mb-8 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          Back to Energized Crystal Products
        </Link>

        {/* Product Details Container */}
        <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl border border-amber-100/50 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 p-3 sm:p-10 lg:p-12">

            {/* Left Column: Image Card */}
            <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-4">
              <div className="relative rounded-[1.25rem] sm:rounded-[2rem] overflow-hidden shadow-lg h-80 sm:h-[400px] bg-gradient-to-b from-[#2A0D04] to-[#120502] border border-amber-50 p-6 flex items-center justify-center group">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700 rounded-xl shadow-lg"
                />
                <span className="absolute top-3 left-3 sm:top-4 sm:left-4 text-[8.5px] sm:text-[10px] font-black uppercase tracking-widest px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#2A0D04] to-[#6B2D17] text-[#FFD95A] shadow-lg border border-white/30 backdrop-blur-sm">
                  {product.badge}
                </span>
                
                {/* Floating Discount Badge */}
                <span className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[8.5px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md border border-white/25 animate-pulse z-10">
                  {discountPercent}% OFF
                </span>
              </div>
            </div>

            {/* Right Column: Premium Product Info */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-start flex-wrap gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-extrabold tracking-widest text-[#6B2D17] uppercase bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                    <Sparkles className="w-3.5 h-3.5 text-[#6B2D17]" />
                    5D Energized Crystal
                  </span>

                  <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                    <span className="text-[10px] sm:text-xs font-black text-amber-900">5.0</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Titles */}
                <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-black text-[#2A0D04] leading-tight mb-3 sm:mb-5">
                  {product.title}
                </h1>
                {/* Price Label Block */}
                <div className="price-label-card mb-5 sm:mb-6 flex items-center justify-between sm:justify-start gap-3 sm:gap-6 bg-white p-3.5 sm:px-6 sm:py-4 rounded-[1.5rem] sm:rounded-3xl border-2 border-amber-100/80 w-full sm:w-fit shadow-sm">
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Original Price</span>
                    <span className="original-price-val text-xs sm:text-base font-extrabold text-red-700/90 line-through mt-1">
                      ₹{originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  
                  <div className="hidden sm:block w-[1px] h-8 bg-amber-200/60 self-center" />

                  <div className="flex flex-col text-left">
                    <span className="text-[9px] sm:text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none">Blessed Price</span>
                    <span className="blessed-price-val text-xl sm:text-3xl font-black text-[#6B2D17] mt-0.5">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="discount-badge-val bg-gradient-to-r from-rose-400 to-pink-500 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-3.5 py-2.5 rounded-full shadow-md shadow-pink-500/10">
                    {discountPercent}% OFF
                  </div>
                </div>

                {/* Product Description */}
                <div className="prose prose-amber max-w-none mb-6 sm:mb-8 text-left">
                  <p className="text-gray-600 text-xs sm:text-base leading-relaxed font-semibold">
                    {product.description}
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="mb-6 sm:mb-8 text-left">
                  <h3 className="text-[10px] sm:text-xs font-black text-[#2A0D04] uppercase tracking-widest mb-3.5 flex items-center gap-1.5">
                    <Gem className="w-4 h-4 text-[#6B2D17]" /> Divine Crystal Benefits:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                    {product.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#6B2D17] mt-0.5 flex-shrink-0" />
                        <span className="text-[11px] sm:text-xs font-bold text-gray-600 leading-snug">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Action Area */}
              <div className="pt-5 sm:pt-6 border-t border-amber-50 flex flex-col sm:flex-row items-stretch gap-3">
                {/* Secure Trust Stamp */}
                <div className="flex-1 p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100/60 flex items-center gap-2.5 text-left">
                  <ShieldCheck className="w-7 h-7 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h4 className="text-[10px] font-black text-emerald-950 uppercase tracking-wider">Certified Authenticity</h4>
                    <p className="text-[9px] font-bold text-emerald-800 leading-snug">100% natural, premium vibrational gemstones guaranteed.</p>
                  </div>
                </div>

                {/* Big WhatsApp Buy Button */}
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:brightness-110 text-white font-black text-[11px] sm:text-base px-4 py-3.5 sm:py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 uppercase tracking-widest flex items-center justify-center gap-2 animate-pulse hover:shadow-emerald-500/20 cursor-pointer"
                  style={{ animationDuration: '3s' }}
                >
                  <svg className="w-4.5 h-4.5 fill-white flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  Buy on WhatsApp
                </a>
              </div>

            </div>

          </div>
        </div>



        {/* Tabbed / Extra Details Blocks */}
        <div className="mt-6 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-left">
          <div className="bg-white rounded-[1.25rem] sm:rounded-[2rem] p-4.5 sm:p-8 border border-amber-100 shadow-md">
            <h3 className="font-serif text-lg sm:text-xl font-black text-[#2A0D04] mb-3 flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#6B2D17] animate-pulse" />
              Team 360 Attunement & Activation
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-semibold mb-4">
              Unlike normal crystals sold commercially, this gemstone {isCombo ? 'combo' : 'bracelet'} undergoes a careful, high-vibrational sacred activation:
            </p>
            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100 text-[11px] sm:text-xs font-semibold text-gray-700 leading-relaxed">
              {product.energization}
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-[1.25rem] sm:rounded-[2rem] p-4.5 sm:p-8 border border-amber-100 shadow-md flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-black text-[#2A0D04] mb-3 flex items-center gap-2">
                <HelpCircle className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#6B2D17]" />
                Crystal Specifications
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gemstone Material</span>
                  <p className="text-[11px] sm:text-xs font-bold text-[#2A0D04] mt-0.5">{product.specifications.material}</p>
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest">{isCombo ? "Items Included" : "Bead Dimensions"}</span>
                  <p className="text-[11px] sm:text-xs font-bold text-[#2A0D04] mt-0.5">{product.specifications.beadsSize}</p>
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest">{isCombo ? "Wearability" : "Bracelet Fit"}</span>
                  <p className="text-[11px] sm:text-xs font-bold text-[#2A0D04] mt-0.5">{product.specifications.elasticity}</p>
                </div>
                <div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mining Origin</span>
                  <p className="text-[11px] sm:text-xs font-bold text-[#2A0D04] mt-0.5">{product.specifications.origin}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What's Included in Sacred Box */}
        <div className="mt-6 sm:mt-8 bg-white rounded-[1.25rem] sm:rounded-[2rem] p-4.5 sm:p-8 border border-amber-100 shadow-md text-left">
          <h3 className="font-serif text-lg sm:text-xl font-black text-[#2A0D04] mb-5 sm:mb-6 flex items-center gap-2">
            <Gift className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#6B2D17]" />
            What is Included in Your Sacred Package?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {packageIncludes.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-3.5 sm:p-4 rounded-xl bg-amber-50/20 border border-amber-100/50 hover:shadow-md transition-all duration-300">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#2A0D04] to-[#6B2D17] flex items-center justify-center mb-3">
                    <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h4 className="text-[11px] sm:text-xs font-black text-[#2A0D04] uppercase tracking-wider mb-1">{item.title}</h4>
                  <p className="text-[9px] sm:text-[10px] font-bold text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* How to Use Block */}
        <div className="mt-6 sm:mt-8 bg-white rounded-[1.25rem] sm:rounded-[2rem] p-4.5 sm:p-8 border border-amber-100 shadow-md text-left">
          <h3 className="font-serif text-lg sm:text-xl font-black text-[#2A0D04] mb-5 sm:mb-6 flex items-center gap-2">
            <Gem className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#6B2D17]" />
            How to Wear, Attune & Care for your Crystal
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            {product.howToUse.map((step, idx) => (
              <div key={idx} className="relative p-3.5 sm:p-4 rounded-xl bg-amber-50/30 border border-amber-100/50 flex gap-3 sm:gap-4">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#2A0D04] text-white flex items-center justify-center font-black text-xs sm:text-sm flex-shrink-0">
                  {idx + 1}
                </span>
                <p className="text-[11px] sm:text-xs font-bold text-gray-600 leading-relaxed mt-0.5">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive FAQs Accordion */}
        <div className="mt-6 sm:mt-8 bg-white rounded-[1.25rem] sm:rounded-[2rem] p-4.5 sm:p-8 border border-amber-100 shadow-md text-left">
          <div className="mb-5 sm:mb-6">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold tracking-widest text-[#6B2D17] uppercase mb-1.5 animate-tagline-blink">
              <HelpCircle className="w-4 h-4 text-[#6B2D17]" />
              Got Questions?
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-black text-[#2A0D04]">
              {isCombo ? "Crystal Combo FAQ" : "Crystal Bracelet FAQ"}
            </h3>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqItems.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-amber-100 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left bg-amber-50/20 hover:bg-amber-50/50 flex items-center justify-between gap-4 transition-colors focus:outline-none"
                  >
                    <span className="text-[11px] sm:text-sm font-black text-[#2A0D04] leading-snug">
                      {faq.q}
                    </span>
                    <span className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-[#2A0D04]/5 flex items-center justify-center text-[#6B2D17] flex-shrink-0">
                      {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-500 overflow-hidden ${isOpen ? 'max-h-[300px] border-t border-amber-50 p-4 sm:p-5 bg-white' : 'max-h-0 p-0'
                      }`}
                  >
                    <p className="text-[11px] sm:text-sm font-semibold text-gray-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Real Seeker Reviews (Product Specific) */}
        <div className="mt-6 sm:mt-8 bg-white rounded-[1.25rem] sm:rounded-[2rem] p-4.5 sm:p-8 border border-amber-100 shadow-md text-left">
          <h3 className="font-serif text-lg sm:text-xl font-black text-[#2A0D04] mb-5 sm:mb-6 flex items-center gap-2">
            <MessageSquare className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#6B2D17]" />
            Customer Reviews
          </h3>
          
          {/* Carousel Slider Frame */}
          <div className="relative overflow-hidden w-full mb-6">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-5"
              style={{
                transform: `translateX(calc(-${activeIdx * (100 / itemsPerPage)}% - ${activeIdx * (20 / itemsPerPage)}px))`
              }}
            >
              {reviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-white border-2 border-[#6B2D17]/50 shadow-sm hover:border-[#6B2D17] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between flex-shrink-0"
                  style={{
                    width: `calc(${100 / itemsPerPage}% - ${(itemsPerPage - 1) * 20 / itemsPerPage}px)`
                  }}
                >
                  <div>
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(rev.stars)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-[11px] sm:text-xs font-semibold text-gray-600 leading-relaxed italic mb-4">
                      "{rev.review}"
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-amber-100/40 mt-auto">
                    <div>
                      <h5 className="text-[11px] sm:text-xs font-black text-[#2A0D04] leading-none mb-0.5">{rev.name}</h5>
                      <span className="text-[8px] sm:text-[9px] font-bold text-[#6B2D17]/60 uppercase tracking-widest">{rev.city}</span>
                    </div>
                    <span className="text-[8px] sm:text-[9px] font-bold text-gray-400">{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dot Indicators underneath */}
          {maxIdx > 0 && (
            <div className="flex justify-center gap-2 mb-2 mt-6 relative z-20">
              {[...Array(maxIdx + 1)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`h-3 w-3 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeIdx
                      ? 'bg-[#2A0D04] border border-[#6B2D17]/20 scale-110'
                      : 'bg-amber-300 hover:bg-[#6B2D17]/40 border border-amber-400/30'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Write a Review Form */}
          <div className="mt-8 border-t border-amber-100/60 pt-6 sm:pt-8 text-left">
            <h4 className="font-serif text-base sm:text-lg font-black text-[#2A0D04] mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#6B2D17]" /> Share Your Review
            </h4>
            
            {showFormSuccess ? (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center text-emerald-950 max-w-xl mx-auto shadow-sm">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h5 className="font-serif text-base font-black mb-1">Thank You for Your Review!</h5>
                <p className="text-xs font-semibold text-emerald-800 leading-relaxed">
                  Your review has been successfully submitted. Thank you for sharing your feedback!
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="max-w-2xl bg-amber-50/25 border border-amber-100/65 p-3.5 sm:p-8 rounded-2xl sm:rounded-[2rem] shadow-sm space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      placeholder="e.g. Rakesh Kumar"
                      className="w-full bg-white border border-amber-100/80 rounded-xl px-4 py-3 text-xs font-bold text-[#2A0D04] placeholder-gray-400 focus:outline-none focus:border-[#6B2D17]/60 focus:ring-1 focus:ring-[#2A0D04]/20 transition-all shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Your City</label>
                    <input
                      type="text"
                      required
                      value={newReviewCity}
                      onChange={(e) => setNewReviewCity(e.target.value)}
                      placeholder="e.g. Mumbai"
                      className="w-full bg-white border border-amber-100/80 rounded-xl px-4 py-3 text-xs font-bold text-[#2A0D04] placeholder-gray-400 focus:outline-none focus:border-[#6B2D17]/60 focus:ring-1 focus:ring-[#2A0D04]/20 transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Your Rating</label>
                  <div className="flex items-center gap-1.5 bg-white border border-amber-100/80 w-fit px-3 sm:px-4 py-2 rounded-xl shadow-sm">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewStars(star)}
                        className="text-amber-400 hover:scale-110 active:scale-95 transition-all cursor-pointer focus:outline-none"
                      >
                        <Star className={`w-4.5 h-4.5 sm:w-5 sm:h-5 ${star <= newReviewStars ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                      </button>
                    ))}
                    <span className="text-[9px] sm:text-[10px] font-bold text-[#6B2D17] uppercase tracking-wider ml-2">{newReviewStars} Stars</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Write Your Review</label>
                  <textarea
                    required
                    rows={4}
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    placeholder="Tell us what you think about this crystal bracelet..."
                    className="w-full bg-white border border-amber-100/80 rounded-xl px-4 py-3 text-xs font-semibold text-[#2A0D04] placeholder-gray-400 focus:outline-none focus:border-[#6B2D17]/60 focus:ring-1 focus:ring-[#2A0D04]/20 transition-all shadow-sm leading-relaxed"
                  />
                </div>

                <div className="pt-1.5">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-gradient-to-r from-[#2A0D04] to-[#6B2D17] hover:from-[#120502] hover:to-[#2A0D04] text-white font-bold py-3.5 px-8 rounded-xl text-xs uppercase tracking-widest shadow-md hover:shadow-lg active:scale-95 transition-all duration-300 cursor-pointer"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// Simple helper Star Component if not already declared
function Star({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
