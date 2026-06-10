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
      name: 'नीतूश्री (Neetu Shree)',
      role: 'Signature Program Graduate',
      content: `आदरणीय गुरुजी, 
सादर प्रणाम।
आपने मुझे सही रास्ता दिखाकर मुझ पर बहुत उपकार किया है, इसके लिए मैं हमेशा आपकी शुक्रगुज़ार रहूँगी। आपके अनमोल ज्ञान ने मेरी ज़िंदगी को एक सही दिशा दी है। मैंने कविता की कुछ लाइनों के ज़रिए अपने दिल की बात बयाँ करने की कोशिश की है। मुझे उम्मीद है कि मेरी यह कोशिश आपको ज़रूर पसंद आएगी।

कविता :- गुरुजी 👏

गुरुजी, आपने मुझको दिया है, 
अत्यधिक अनमोल उपहार, 
गायत्री मंत्र की 'दीक्षा' देकर, 
आपने किया है मुझ पर उपकार।

करती थी हर वक्त प्रार्थना, 
मुझे भी मिल जायें मार्गदर्शक,
मनुष्य योनि में मिला यह जीवन, 
मेरा भी हो जाये सफल सार्थक।

अब आपके सानिध्य में मिल जायेगा, 
मुझे अमूल्य आत्मा का ज्ञान,
इसी ज्ञान के सहयोग से मैं,
कर सकूंगी स्वयं की पहचान।

आधा जीवन गुजर चुका है मेरा,
बस अब आधा ही है बाकी,
जब आप मेरे बन चुके हैं पथदर्शक,
अनंत यात्रा की मुझे दिख रही है झांकी।

अब मुझे हो गया है पूरा यक़ीन,
ईश्वर ने सुन ली है मेरे दिल की पुकार,
गुरुजी उन्होंने आपको भेजकर,
कर दिया है मेरा 'बेड़ा पार'।

आपकी शिष्या 👏 नीतूश्री ✍️`,
      rating: 5,
    },
    {
      name: 'Rajesh K. Varma',
      role: 'Mentor & Center Program Graduate',
      content: 'D.D. Sharma Ji\'s Leadership framework changed how I run my company. The focus on Widely Important Goals and maintaining a Scoreboard helped our business grow 3x in 3 months! Peak performance is now our daily habit.',
      rating: 5,
    },
    {
      name: 'Sunita Deshmukh',
      role: 'Trainer Program Graduate',
      content: 'After completing the trainer program, I started conducting my own workshops and got selected as a motivational speaker in central schools. Reprogramming my subconscious mind using Alpha activation has made me financially independent.',
      rating: 5,
    },
    {
      name: 'Amit Choudhary',
      role: 'Swar Vigyan & Element Science Seeker',
      content: 'Learning Swar Vigyan and element science has cured my chronic stress. The Water Glass Technique and mirror work rewrote my identity. My focus is incredibly sharp, and positive vibes surround me.',
      rating: 5,
    },
    {
      name: 'Dr. Meera Chawla',
      role: 'Midbrain Activation & DMIT Graduate',
      content: 'Team 360’s DMIT and Midbrain training has added immense value to my child counseling practice. The fingerprint mapping scientific patterns are extremely accurate, and parents are amazed by the results. D.D. Sharma Ji\'s training manual is incredibly structured!',
      rating: 5,
    },
    {
      name: 'Vikramaditya Singh',
      role: 'Brain Engineering Expert Graduate',
      content: 'The speed reading and memory retention techniques from the Brain Engineering book are phenomenal. I was able to optimize my learning capacity and double my reading speed in just 10 days. The Alpha state goal programming methods really work.',
      rating: 5,
    },
    {
      name: 'Sadhvi Pragya Bharti',
      role: 'Gayatri Quantum Science Seeker',
      content: 'Gayatri Mantra chanting\'s connection with the pituitary gland and GABA hormones explained by D.D. Sharma Ji is a pathbreaking synthesis of science and spirituality. It helped me activate my third eye energy and find deep mental calm.',
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
