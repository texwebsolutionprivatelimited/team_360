import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Gem, Star, Shield, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAdminContent } from '../admin/contentStore';

export default function Products({ limit }) {
  const products = useAdminContent('products');
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 12;

  // Calculate pages and current page from search params (single source of truth)
  const pageParam = !limit ? searchParams.get('page') : null;
  let currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  if (isNaN(currentPage) || currentPage < 1) currentPage = 1;
  
  const totalPages = Math.ceil(products.length / itemsPerPage);
  if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

  // If limit is passed, slice to show only that many featured items (e.g. 4 on homepage)
  const displayedProducts = limit 
    ? products.slice(0, limit) 
    : products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (!limit) {
      setSearchParams({ page: pageNumber.toString() });
    }
    // Smooth scroll to top of products list
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getWhatsAppLink = (title, price) => {
    const msg = `Hello Team 360! I am interested in purchasing *${title}* (₹${price.toLocaleString('en-IN')}). Please guide me on payment and shipping details!`;
    return `https://wa.me/916376779062?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="products" className={`relative ${limit ? 'pt-12' : 'pt-2 sm:pt-4'} pb-2 sm:pb-4 bg-[#FFF5EE] overflow-hidden`}>

      {/* Soft cosmic glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 bg-white/40 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8 relative z-10">

        {/* Header - Only render if not inside catalog page (or render slightly adapted) */}
        {!limit ? null : (
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 text-[10px] xs:text-xs font-bold tracking-widest text-[#6B2D17] uppercase mb-3 animate-tagline-blink whitespace-nowrap">
              <Gem className="w-3.5 h-3.5" />
              Empowering Mindsets & Abundance
            </span>
            <h2 className="font-serif text-[21px] xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2A0D04] mb-3 whitespace-nowrap">
              Spiritual &amp; Motivational Books
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-[#2A0D04] to-[#6B2D17] mb-4" />
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-semibold">
              Explore motivational books and brain development guides written by Devendra Sharma (D.D. Sharma Ji) to transform your mindset and achieve peak performance.
            </p>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((p) => {
            // Price mapping helper
            const originalPrice = p.price === 1111 ? 2499
              : p.price === 899 ? 1999
              : p.price === 1299 ? 2999
              : p.price === 999 ? 2199
              : p.price === 1199 ? 2699
              : p.price === 1499 ? 3499
              : Math.round(p.price * 2.2);
            const discountPercent = Math.round(((originalPrice - p.price) / originalPrice) * 100);

            return (
              <div
                key={p.id}
                className="group bg-white rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl hover:shadow-[#FFD95A]/10 hover:-translate-y-1.5 transition-all duration-500 border-2 border-[#2A0D04]/30 hover:border-[#E25822] flex flex-col h-full"
              >
                {/* Image Container */}
                <a
                  href={p.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative h-64 sm:h-72 overflow-hidden flex-shrink-0 block bg-gradient-to-b from-[#2A0D04] to-[#120502] p-4 flex items-center justify-center cursor-pointer"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-700 rounded-lg shadow-md"
                  />
                  
                  {/* Gradient color overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />

                  {/* Sparkle Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_60%)] pointer-events-none" />

                  {/* Custom Badge */}
                  <span className="absolute top-3.5 left-3.5 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-gradient-to-r from-[#2A0D04] to-[#6B2D17] text-[#FFD95A] shadow-lg border border-white/30 backdrop-blur-sm drop-shadow-sm">
                    {p.badge}
                  </span>

                  {/* Floating Discount Badge */}
                  <span className="absolute top-3.5 right-3.5 text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md border border-white/20 animate-pulse">
                    {discountPercent}% OFF
                  </span>
                </a>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  
                  {/* Stars and Category */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex gap-0.5">
                      {[...Array(p.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[9px] font-bold text-[#6B2D17]/60 tracking-widest uppercase">
                      Best Seller
                    </span>
                  </div>

                  {/* Title */}
                  <a
                    href={p.amazonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3 className="font-serif font-black text-[#2A0D04] text-base leading-snug mb-1.5 group-hover:text-[#E25822] transition-colors duration-300">
                      {p.title}
                    </h3>
                  </a>

                  {/* Tagline */}
                  <p className="text-[11px] sm:text-xs text-[#6B2D17] font-bold tracking-wide mb-3">
                    {p.tagline}
                  </p>

                  {/* Brief description snippet */}
                  <p className="text-gray-500 text-xs leading-relaxed mb-5 line-clamp-2">
                    {p.description}
                  </p>

                  {/* Price & Primary CTA Container */}
                  <div className="mt-auto pt-4 border-t border-amber-50 flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[9px] font-bold text-[#6B2D17] line-through leading-none">
                          ₹{originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded uppercase leading-none tracking-wide">
                          {discountPercent}% OFF
                        </span>
                      </div>
                      <span className="text-lg font-black text-[#2A0D04] mt-0.5">
                        ₹{p.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      {p.amazonLink ? (
                        <a
                          href={p.amazonLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#FFD95A] to-[#F5A623] hover:brightness-110 text-[#0D0015] text-[10px] sm:text-xs font-black px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 tracking-widest uppercase hover:shadow-yellow-500/20"
                        >
                          Buy on Amazon
                        </a>
                      ) : (
                        <a
                          href={getWhatsAppLink(p.title, p.price)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:brightness-110 text-white text-[10px] sm:text-xs font-black px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 tracking-widest uppercase hover:shadow-emerald-500/20"
                        >
                          <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                          </svg>
                          Buy
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {!limit && totalPages > 1 && (
          <div className="mt-12 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 bg-white/40 backdrop-blur-md border border-[#2A0D04]/10 rounded-[1.5rem] p-3.5 sm:p-5 sm:px-6 sm:py-4 relative z-10 shadow-lg">
            {/* Info Text */}
            <p className="text-[10px] xs:text-[11px] sm:text-xs font-bold text-[#2A0D04]/75 text-center sm:text-left tracking-tight sm:tracking-normal">
              Showing <span className="text-[#2A0D04] font-black">{(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, products.length)}</span> of <span className="text-[#2A0D04] font-black">{products.length}</span> Premium Books
            </p>

            {/* Pagination buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Prev Button */}
              <button
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 sm:p-2.5 rounded-xl border border-[#2A0D04]/10 flex items-center justify-center transition-all ${
                  currentPage === 1
                    ? 'opacity-40 cursor-not-allowed text-[#2A0D04]/40 bg-amber-50/20'
                    : 'bg-white text-[#2A0D04] hover:bg-[#2A0D04] hover:text-white hover:shadow-md cursor-pointer active:scale-95'
                }`}
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Numbered buttons */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border font-bold text-[11px] sm:text-xs uppercase tracking-widest flex items-center justify-center transition-all active:scale-95 cursor-pointer ${
                    currentPage === pageNum
                      ? 'bg-[#2A0D04] border-transparent text-[#FFD95A] shadow-md shadow-[#2A0D04]/20 scale-105'
                      : 'bg-white border-[#2A0D04]/10 text-[#2A0D04] hover:bg-[#2A0D04] hover:text-white hover:shadow-md'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 sm:p-2.5 rounded-xl border border-[#2A0D04]/10 flex items-center justify-center transition-all ${
                  currentPage === totalPages
                    ? 'opacity-40 cursor-not-allowed text-[#2A0D04]/40 bg-amber-50/20'
                    : 'bg-white text-[#2A0D04] hover:bg-[#2A0D04] hover:text-white hover:shadow-md cursor-pointer active:scale-95'
                }`}
                aria-label="Next Page"
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Trust Badges - Single line swipeable track on mobile with tight vertical spacing */}
        {!limit && (
          <div className="mt-4 sm:mt-12 pt-2 sm:pt-8 flex flex-nowrap sm:flex-wrap items-center sm:justify-center gap-5 sm:gap-8 overflow-x-auto no-scrollbar pb-3.5 sm:pb-0 relative z-10">
            <span className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm font-extrabold sm:font-bold tracking-wide text-[#2A0D04]/60 whitespace-nowrap flex-shrink-0">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" /> 100% Genuine Books
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm font-extrabold sm:font-bold tracking-wide text-[#2A0D04]/60 whitespace-nowrap flex-shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-500/20 flex-shrink-0" /> Empowering Brain Seeding
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm font-extrabold sm:font-bold tracking-wide text-[#2A0D04]/60 whitespace-nowrap flex-shrink-0">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-yellow-500 flex-shrink-0" /> 5-Star Rated by 1000+ Readers
            </span>
          </div>
        )}

        {/* See More CTA - Only render on Homepage (when limit is passed) */}
        {limit && (
          <div className="mt-6 sm:mt-8 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[#2A0D04] hover:bg-[#6B2D17] text-white font-black text-xs sm:text-sm px-4 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#2A0D04]/15 active:scale-95 uppercase tracking-widest border border-white/10 whitespace-nowrap"
            >
              <span className="hidden sm:inline">Explore All Spiritual &amp; Motivational Books</span>
              <span className="inline sm:hidden">Explore Bookstore</span>
              <svg className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
