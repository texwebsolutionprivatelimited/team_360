import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import Home from './pages/Home';
import About from './pages/About';
import BooksPage from './pages/BooksPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import ScrollToTop from './components/ScrollToTop';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import CounselingPage from './pages/CounselingPage';
import RecordedCourses from './pages/RecordedCourses';
import RecordedCourseViewer from './pages/RecordedCourseViewer';
import MyCourses from './pages/MyCourses';
import AdminDashboard from './pages/AdminDashboard';


export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Cart Handlers
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevCart.filter((item) => item.id !== productId);
    });
  };

  const handleClearCart = () => setCart([]);

  return (
    <div className="relative min-h-screen bg-[#FFF5EE] text-cosmic-cream font-sans overflow-x-hidden selection:bg-gold/30 selection:text-gold">
        {/* Global Scroll to Top on Navigation */}
        <ScrollToTop />

        {/* Centered Logo Navbar Header with Cart States */}
        <Navbar 
          onOpenModal={handleOpenModal} 
          cart={cart}
          onRemoveFromCart={handleRemoveFromCart}
          onClearCart={handleClearCart}
          onAddToCart={handleAddToCart}
        />

        <Routes>
          <Route path="/" element={<Home onOpenModal={handleOpenModal} onAddToCart={handleAddToCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/courses" element={<CoursesPage onOpenModal={handleOpenModal} />} />
          <Route path="/courses/:id" element={<CourseDetailsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/counseling" element={<CounselingPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/recorded-courses" element={<RecordedCourses />} />
          <Route path="/recorded-courses/:id" element={<RecordedCourseViewer />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>

        {/* Footnote Footer */}
        <Footer onOpenModal={handleOpenModal} />

        {/* Global Enquire Now Pop-up Modal Form */}
        <ContactModal isOpen={isModalOpen} onClose={handleCloseModal} />

        {/* Global Floating WhatsApp Widget */}
        <style>{`
          @keyframes floatingWhatsApp {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-8px) scale(1.02); }
          }
          .animate-whatsapp-float {
            animation: floatingWhatsApp 3s ease-in-out infinite;
          }
        `}</style>
        <a
          href="https://wa.me/916376779062?text=Hello%20Team%20360!%20I%20am%20visiting%20your%20website%20and%20would%20like%20to%20enquire%20about%20your%20mind%20training%20courses%2C%20workshops%2C%20or%20spiritual%20and%20motivational%20books.%20Please%20guide%20me!"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BA56] text-white rounded-full flex items-center justify-center shadow-xl shadow-black/30 hover:scale-110 active:scale-95 transition-all duration-300 hover:rotate-6 flex-shrink-0 cursor-pointer animate-whatsapp-float"
          title="Chat on WhatsApp"
        >
          <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
        </a>
      </div>
  );
}
