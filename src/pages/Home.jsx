import React, { useState } from 'react';
import Hero from '../components/Hero';
import AboutBrief from '../components/AboutBrief';
import PhotoGallery from '../components/PhotoGallery';
import Expertise from '../components/Expertise';
import Offerings from '../components/Offerings';
import FeaturesGrid from '../components/FeaturesGrid';
import GayatriMantraScience from '../components/GayatriMantraScience';
import Products from '../components/Products';
import VideoReviews from '../components/VideoReviews';
import Testimonials, { WriteTestimonialForm } from '../components/Testimonials';
import Blog from '../components/Blog';
import NewsTestimonials from '../components/NewsTestimonials';

export default function Home({ onOpenModal, onAddToCart }) {
  // Testimonials State lifted up to Home Page level
  const [testimonialsList, setTestimonialsList] = useState([
    {
      name: 'Neetu Shree',
      role: 'Signature Program Graduate',
      content: 'अनंत यात्रा की मुझे दिख रही हैं झांकी। अब मुझे हो गया हैं पूरा यकीन, ईश्वर ने सुन ली हैं मेरे दिल की पुकार, गुरुजी उन्होंने आपको भेजकर, कर दिया हैं मेरा \'बेडा पार\'। सादर प्रणाम गुरुदेव!',
      rating: 5,
    },
    {
      name: 'Rajesh K. Varma',
      role: 'Mentors Training Graduate (Module 1)',
      content: 'D.D. Sharma Ji\'s Leadership framework changed how I run my company. The focus on Widely Important Goals and maintaining a Scoreboard helped our business grow 3x in 3 months! Peak performance is now our daily habit.',
      rating: 5,
    },
    {
      name: 'Sunita Deshmukh',
      role: 'Trainers Training Graduate (Module 2)',
      content: 'After completing Module 2, I started conducting my own workshops and got selected as a motivational speaker in central schools. Reprogramming my subconscious mind using Alpha activation has made me financially independent.',
      rating: 5,
    },
    {
      name: 'Amit Choudhary',
      role: 'Swar Vigyan & Element Science Seeker',
      content: 'Learning Swar Vigyan and element science has cured my chronic stress. The Water Glass Technique and mirror work rewrote my identity. My focus is incredibly sharp, and positive vibes surround me.',
      rating: 5,
    },
  ]);

  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <main>
      <Hero onOpenModal={onOpenModal} />
      <Expertise onOpenModal={onOpenModal} />
      <Offerings onOpenModal={onOpenModal} />
      <FeaturesGrid />
      <GayatriMantraScience />
      <Products limit={4} />
      <AboutBrief />
      <PhotoGallery />
      <NewsTestimonials />
      <VideoReviews />
      
      {/* Testimonials Slider (Placed right below video reviews) */}
      <Testimonials 
        testimonialsList={testimonialsList}
        activeIdx={activeIdx}
        setActiveIdx={setActiveIdx}
      />
      
      <Blog limit={4} />

      {/* Share Your Review Split Form (Placed at the very bottom of the page) */}
      <WriteTestimonialForm 
        onAddTestimonial={(newTestimonial) => {
          setTestimonialsList((prev) => [newTestimonial, ...prev]);
          setActiveIdx(0); // Instantly slide slider to the newly added review

          // Smoothly scroll the user back to the Testimonials slider so they can see their review live
          const el = document.getElementById('testimonials');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
    </main>
  );
}
