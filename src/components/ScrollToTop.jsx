import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO_MAP = {
  '/': {
    title: 'Team 360 with D.D. Sharma Ji | Subconscious Mind Training & Gayatri Science',
    desc: 'Reprogram your subconscious mind, learn Gayatri Quantum Science, Swar Vigyan, and manifest your highest potential through brain training programs with Devendra Sharma (D.D. Sharma Ji) and Team 360.'
  },
  '/about': {
    title: 'About D.D. Sharma Ji | Founder of Team 360',
    desc: 'Meet Devendra Sharma (D.D. Sharma Ji), USA Gold Star Awardee, Burj Awardee, and former senior government officer with over 32+ years of experience.'
  },
  '/courses': {
    title: 'Training Programs & Workshops | Team 360',
    desc: 'Explore advanced training programs: Mentor & Center Program, Trainer Program, Gayatri Mentorship Program, and Introductory & Signature Program by Team 360.'
  },
  '/counseling': {
    title: '1-to-1 Subconscious & Mind Coaching | D.D. Sharma Ji',
    desc: 'Book a private personal coaching session with D.D. Sharma Ji to reprogram your mind, resolve life goals, and build peak leadership skills.'
  },
  '/products': {
    title: 'Spiritual & Motivational Books | Team 360 Bookstore',
    desc: 'Shop spiritual and motivational books by D.D. Sharma Ji including Mindset Badlo Aur Crorepatibano, Gayatri Quantum Energy, and daily journals.'
  },
  '/blog': {
    title: 'Subconscious & Gayatri Science Blog | Team 360',
    desc: 'Read articles on GABA hormone activation, Gayatri mantra sound vibrations, Swar Vigyan, and subconscious rewiring by D.D. Sharma Ji.'
  },
  '/contact': {
    title: 'Connect & Inquire | Team 360 with D.D. Sharma Ji',
    desc: 'Submit your queries or register for our advanced training programs, workshops, and books. Connect with our team today.'
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Team 360',
    desc: 'Read the privacy policy and data protection terms for Team 360.'
  },
  '/refund-policy': {
    title: 'Refund & Cancellation Policy | Team 360',
    desc: 'Read the refund policy and course/product cancellation terms for Team 360.'
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | Team 360',
    desc: 'Read the terms of use and service agreements for Team 360.'
  }
};

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Scroll to the top of the viewport
    window.scrollTo(0, 0);

    // 2. Set dynamic Google SEO values for static pages
    // (Details pages like /courses/:id, /products/:id, /blog/:id manage their own titles dynamically)
    if (SEO_MAP[pathname]) {
      const { title, desc } = SEO_MAP[pathname];
      document.title = title;

      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', desc);
      }
    }
  }, [pathname]);

  return null;
}
