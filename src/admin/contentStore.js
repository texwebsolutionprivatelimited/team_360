import { useEffect, useState } from 'react';
import { auth, db, isFirebaseEnabled } from './firebaseConfig';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  where
} from 'firebase/firestore';

export const CONTENT_UPDATED_EVENT = 't360-content-updated-v5';

const STORAGE_KEYS = {
  courses: 't360_v9_courses',
  products: 't360_v5_products',
  blogs: 't360_v5_blogs',
  contacts: 't360_v5_contacts',
  users: 't360_v5_users',
  purchases: 't360_v5_purchases',
  settings: 't360_v5_settings',
};

// Default course modules data to pre-populate Quantum Jump
const DEFAULT_QUANTUM_JUMP_MODULES = [
  {
    id: "m1",
    title: "Module 1: Foundation & Energy Cleansing",
    sessions: [
      { id: "Bk2aXAlT7b0", title: "Session 1: Foundation & Energy Cleansing", desc: "Understanding the Gayatri Quantum energy, subconscious mind basics, and beginning the energy cleansing." },
      { id: "P7yXpiZnn-Q", title: "Session 2: Day 1 Part 2 - Subconscious Deep Dive", desc: "Advanced molecular water restructuring and element cleansing practice." },
      { id: "2OKTNA-bs9A", title: "Session 3: Day 2 - Releasing Emotional Blocks", desc: "Techniques to let go of old traumatic memories, fears, and guilt." },
      { id: "NJ729i3Pcuw", title: "Session 4: Day 3 - Chakra & GABA Activation (v1)", desc: "Sound frequency alignment for pituitary glands and GABA hormone activation." },
      { id: "v4iX39lrAI4", title: "Session 5: Day 3 - Chakra & GABA Activation (v2)", desc: "Integrating element purification, third eye meditation, and protective auric shielding." }
    ]
  },
  {
    id: "m2",
    title: "Module 2: Breath & Swar Vigyan Mastery",
    sessions: [
      { id: "vj27rqn3QzI", title: "Session 6: Breath & Swar Vigyan Mastery", desc: "Opening of nostrils (Ida, Pingala), breath control, and daily rhythm alignment." },
      { id: "SdWbL5ZwTGs", title: "Session 7: Subconscious Reprogramming", desc: "Advanced water glass technique, mirror work, and abundance manifestation." },
      { id: "Q9zkDdV0N5U", title: "Session 8: Hormones & Energy Realization", desc: "Activating Dopamine, Serotonin, and cosmic protection systems." }
    ]
  },
  {
    id: "m3",
    title: "Module 3: Gayatri Sadhana & Manifestation",
    sessions: [
      { id: "xR133xwucNs", title: "Session 9: Gayatri Mantra Deep Sadhana", desc: "Solar resonance, daily Savita meditation, and grounding practices." },
      { id: "COdEmqXCRps", title: "Session 10: Relational Cord Cleansing", desc: "Direct emotional cord cutting, healing family bonds, and attracting sweet relations." },
      { id: "w8LzEkBs9oc", title: "Session 11: Manifestation Mastery & Abundance", desc: "Finalizing RAS activation, clearing money limits, and attracting social contribution." }
    ]
  }
];

const DEFAULT_CONTENT = {
  courses: [
    {
      "id": "signature-program",
      "title": "Introductory & Signature Program",
      "subtitle": "3 Days Live Online & Offline (Jaipur) Workshop",
      "category": "Mind Programming & Abundance",
      "duration": "3 Days Workshop + 30 Days Practice Plan",
      "type": "Workshop",
      "description": "Reprogram your subconscious mind in Alpha state, activate 9 energy chakras, and learn practical Water Glass, Mirror, and Identity Notebook techniques for health, wealth, and non-linear growth.",
      "details": "What You Will Learn:\n* Vision Clarity: Visual Document & Vision Board creation\n* Mirror Technique: Releasing past pain & traumatic memories\n* Water Glass Technique: Molecular programming for positivity\n* Identity Notebook: Scripting and building a new positive identity\n* Panch Mahabhut Shodhan: Cleansing the five key elements\n* 9 Chakras & Alpha Mind Activation: 7 Habits subconscious scripting\n* Gratitude Writing, Money Meditation & Savita Meditation\n* 27 Days RAS Activation: Filtering success into the brain\n* Aura Protection Shield: Guarding positive daily energy\n\nProgram Objective:\n* Self-Empowerment Level 1 & Confidence Boost\n* Subconscious Mind Programming & Alpha Activation\n* Gaining non-verbal positive energy & happy hormones\n* Activating Money Magnet codes & Divine Blessings\n* Scientific Gayatri experiments that stimulate GABA hormones, calming tension and anxiety.",
      "benefits": [
        "Self-Empowerment Level 1 (खुद में शक्ति और क्षमता बढ़ाना)",
        "Healing Power (शरीर की बीमारियों को ठीक करने की क्षमता)",
        "Non-Linear Growth (जीवन में तेज़ and अचानक प्रोग्रेस)",
        "Non-Verbal Positive Energy (बिना बोले पॉजिटिव वाइब्स फैलाना)",
        "Happy Hormones Activation (हमेशा खुश, शांत और कूल रहना)",
        "Alpha Mind Activation (अच्छे विचार और योजनाएं आना)",
        "9 Chakras Activation (ऑरा मजबूत और चमकदार होना)",
        "RAS Activation (सही मौके और अवसर दिखना)",
        "Panch Tatva Shuddhi (मन, शरीर और बुद्धि की शुद्धि)",
        "Confidence Boost (खुद पर भरोसा और बड़े काम करने की हिम्मत)",
        "Self Image Growth (अपनी – इमेज और सोच का स्तर बढ़ना)",
        "Money Magnet + Divine Blessings (धन आकर्षण and ईश्वरीय कृपा)"
      ],
      "whoCanJoin": [
        "Anyone who wants to boost self-confidence and execute big plans",
        "Individuals facing mental blocks or financial hurdles",
        "Seekers wanting to align their 9 chakras and cleanse elements",
        "Professionals and students wanting to operate in Alpha brain state"
      ],
      "whyChoose": "This workshop is structured around highly practical and scientific techniques (Water Glass, Mirror, Alpha Activation) to deliver instant results.",
      "faqs": [
        { "q": "What is the program fee?", "a": "The total investment is ₹11,800." },
        { "q": "What are the bonuses included?", "a": "Bonuses include: Powerful Video Series (Value ₹5,500), 9 Energy Awakening Video Series (Value ₹5,000), 30 Days Mentorship, and Monthly Meditation Sessions." }
      ],
      "image": "/signature_program_art.png",
      "modules": []
    },
    {
      "id": "trainers-training-program",
      "title": "Trainer Program",
      "subtitle": "Signature Program Included",
      "category": "Trainer Certification & Brain Science",
      "duration": "6 Days Program (3 Hours/Day) + 90 Days Internship",
      "type": "Trainer Program",
      "description": "Become a certified Trainer with complete Signature Program mastery included. Learn 5 element purification, 9 energy chakra activation, 27 days RAS reprogramming, and build a lucrative professional training identity.",
      "details": "Program Objective:\n* Become a Certified Trainer with D.D. Sharma Ji\n* Speak in Central Schools as a Motivational Trainer\n* Conduct your own Workshops and Training Programs\n* Earn ₹1.5 to ₹5 Lakhs/month (Part-time or Full-time)\n* Gain National & International Recognition\n\nWhat is Taught in the Workshop:\n* पंच महाभूत का जागरण (Awakening of 5 elements)\n* नौ ऊर्जा चक्रों का जागरण (Awakening of 9 energy centers)\n* 27 मंत्र साधना व 27 दिन की तकनीक (27 mantra sadhana & 27 days techniques)\n* Water Energizing Technique\n* 111 Soham Meditation\n* Reconditioning of Subconscious Mind & Alpha Mind Activation\n* Inspiring Books study (The Magic of Thinking Big, The Power of Self Discipline, The 7 Habits, etc.)\n\nAlso Included:\n* Introduction Swar Vigyan & Element Science\n* Activation of Gayatri Energy in Spiritual Body\n* Map of Conscious Evolution from 20 Cal to 700 Cal\n* Manifestation & Healing by a Mentor, Group Healing Session, and Sixth Sense Activation\n* Build Your Professional Identity & Get Certified",
      "benefits": [
        "Opportunity to work as a Motivational Speaker in Central Schools",
        "Authority to conduct your own workshops and courses",
        "Trainer roles within official Team 360 programs",
        "Feature on D.D. Sharma Ji's YouTube Channel & Web Podcasts",
        "3 Days advanced workshop participation"
      ],
      "whoCanJoin": [
        "Aspiring motivational speakers and educators",
        "Spiritual coaches and healers wanting to scale their career",
        "Individuals wanting to earn ₹1.5 to ₹5 Lakhs/month",
        "Seekers wanting to master sixth sense activation and self-healing"
      ],
      "whyChoose": "This comprehensive Trainer certification includes the complete Signature Program, sixth sense activation, and direct opportunities to speak in Central Schools and join our official podcasts.",
      "faqs": [
        { "q": "What is the training investment?", "a": "The total training investment is ₹59,000." },
        { "q": "Can I do this part-time or full-time?", "a": "Yes, certified trainers can work either part-time or full-time, with potential earnings of ₹1.5 to ₹5 Lakhs per month." }
      ],
      "image": "/gayatri_sun.png",
      "modules": []
    },
    {
      "id": "gayatri-mentorship-program",
      "title": "Gayatri Mentorship Program",
      "subtitle": "Become a Certified Gayatri Mentor",
      "category": "Gayatri Sadhana & Mentorship",
      "duration": "15 Days Live Online Training + 2 Months Practice Internship",
      "type": "Mentorship Program",
      "description": "Become a certified Gayatri Mentor. Discover the scientific, practical, and spiritual dimensions of Gayatri Sadhana, activate the 24 quantum energy powers, and master Yagya therapy.",
      "details": "Program Objective:\n* गायत्री साधना की गहन समझ (Deep understanding of Gayatri Sadhana)\n* जीवन में शांति, समृद्धि, आरोग्यता एवं आत्मविकास (Peace, prosperity, health & self-growth)\n* गायत्री साधना के वैज्ञानिक, व्यावहारिक एवं आध्यात्मिक आयाम (Scientific, practical, and spiritual dimensions)\n\nWhat You Will Learn:\n* Gayatri Quantum Energy Mastery (गायत्री Quantum Energy की 24 शक्तियों का जागरण, धनवर्षा की प्रक्रिया, मधुर रिश्तों हेतु गायत्री साधना, आरोग्यता एवं ऊर्जा वृद्धि हेतु साधना, पद, प्रतिष्ठा एवं सफलता हेतु गायत्री साधना)\n* Advanced Spiritual Practices (यज्ञ थेरेपी, अनुष्ठान साधना, सामूहिक गायत्री साधना, विभिन्न देवताओं की गायत्री मंत्र साधना, सुरक्षा कवच साधना)\n* Authorization & Practical Training (दीक्षा देने की प्रक्रिया, दीक्षा हेतु अधिकृत किया जाना, आवश्यक परहेज एवं अनुशासन, साधना की सही विधि एवं अभ्यास, दैनिक जीवन में उपयोग)",
      "benefits": [
        "Direct guidance and initiation into authentic Gayatri Sadhana",
        "2 Months Guided practice and implementation internship",
        "Official Authorization to perform Diksha and guide group meditations",
        "Learn to apply Gayatri frequencies for health, wealth, and relationships",
        "Personal, Professional, and Spiritual growth"
      ],
      "whoCanJoin": [
        "Sadhaks wanting to deepen their Gayatri practice",
        "Seekers looking for peace, health, and prosperity in daily life",
        "Spiritual trainers and energy healers wanting to learn sound therapies",
        "Anyone looking to build a powerful protective auric shield"
      ],
      "whyChoose": "This comprehensive 15-day mentorship program provides authentic activation of the 24 powers of Gayatri Quantum Energy, Yagya therapy training, and official authorization to guide others.",
      "faqs": [
        { "q": "What is the program investment?", "a": "The total investment is ₹1,18,000 (₹1,00,000 program fee + ₹18,000 GST)." },
        { "q": "Will I get authorized to give Diksha?", "a": "Yes, this program includes official authorization and the process of giving Gayatri Diksha." }
      ],
      "image": "/gayatri_mentorship_art.png",
      "modules": []
    },
    {
      "id": "mentors-training-program",
      "title": "Mentor & Authorization Center Program",
      "subtitle": "Become a Certified Mentor, Trainer & Authorized Center Leader",
      "category": "Mentor & Center Leadership",
      "duration": "20 Days Intensive Training + 90 Days Guided Practice",
      "type": "Training Program",
      "description": "Become a certified Mentor, Trainer, and Authorized Center Leader. Learn signature program mastery, trainer techniques, diksha authorization, and group sadhana facilitation under direct guidance.",
      "details": "Program Objective:\n* Become a Certified Mentor & Trainer\n* Operate your own Authorized Training Center\n* Lead spiritual workshops and community consciousness\n* Partner with Team 360 for social & national transformation\n\nWhat You Will Learn:\n* Signature Program Mastery (सिग्नेचर प्रोग्राम की संपूर्ण ट्रेनिंग एवं प्रैक्टिकल समझ)\n* Trainers Trainer Certification (दूसरों को प्रशिक्षित करने की एडवांस तकनीक)\n* Diksha Authorization (गायत्री मंत्र दीक्षा देने हेतु अधिकृत किया जाना)\n* Yagya Vidhan Training (यज्ञ की संपूर्ण प्रक्रिया एवं व्यावहारिक प्रशिक्षण)\n* Group Gayatri Sadhana (सामूहिक साधना करवाने की संपूर्ण प्रैक्टिस)\n* Yagyopavit Process (यज्ञोपवीत प्रदान करने की प्रक्रिया एवं प्रशिक्षण)\n\nAdvanced Spiritual Leadership:\n* Self-Awakening & Panchakosha Activation (आत्मजागरण व पंचकोश जागरण प्रशिक्षण)\n* Spiritual Healing & Spiritual Realization Training\n* Peace, Prosperity & Spiritual Relationship Meditation\n* Blessings Meditation for humanity",
      "benefits": [
        "Direct guidance from experienced mentors",
        "90 Days internship & practical exposure",
        "Official recognition as an Authorized Mentor",
        "Comprehensive support for setting up your training center",
        "National & International networking opportunities",
        "Holistic personal, professional, and spiritual growth"
      ],
      "whoCanJoin": [
        "Anyone who wants to become a certified Mentor and Trainer",
        "Individuals looking to start and operate an Authorized Center",
        "Spiritual seekers wanting to contribute to community consciousness",
        "Leaders interested in advanced spiritual healing and meditation"
      ],
      "whyChoose": "This 20-Day intensive program provides complete signature program training, official authorization, center-setup guidance, and a 90-day internship.",
      "faqs": [
        { "q": "What career opportunities are available after completion?", "a": "Graduates can work as certified Mentors, Trainers, operate Authorized Centers, and conduct workshops globally." },
        { "q": "What is the program fee?", "a": "The program fee is ₹2,00,000 + 18% GST (₹36,000), making the total investment ₹2,36,000." }
      ],
      "image": "/pranayama_breath.png",
      "modules": []
    },
    {
      "id": "quantum-jump",
      "title": "Quantum Jump (Miracles of Gayatri Energy)",
      "subtitle": "5 Days Recorded Session (1.5 Hours/Day)",
      "category": "Gayatri Sadhana & Mentorship",
      "duration": "5 Days Recorded Course",
      "type": "Recorded Session",
      "isRecorded": true,
      "price": 35400,
      "description": "Experience the miracles of Gayatri Energy. Cleanse fear, guilt, grief, anger, and anxiety; trigger happy hormones (GABA, Dopamine); and manifest money abundance, sweet relations, and sound health.",
      "details": "What You Will Experience:\n* 1. Removal of Fear, Guilt & Grief\n* 2. Removal of Misery, Suffering & Anger\n* 3. Removal of Ego & Anxiety\n* 4. Reduction of Overthinking & Distress\n* 5. Relief from Obsessive Thought Patterns (OCD-like Tendencies)\n* 6. Relief from Emotional & Mental Pain\n\nSecretion of Happy Hormones:\n* Dopamine, Serotonin, Melatonin, Oxytocin, GABA, and Endorphins\n\nAttraction and Manifestation Power:\n* Abundance Money & Career Growth\n* Sweet Relationships & Harmony\n* Sound Health & Cure of Chronic Diseases\n* Recognition & Social Meaningful Contribution",
      "benefits": [
        "Removal of Fear, Guilt & Grief (भय, ग्लानि और शोक से मुक्ति)",
        "Removal of Anger, Ego & Anxiety (क्रोध, अहंकार और चिंता से मुक्ति)",
        "Reduction of Overthinking & OCD-like patterns (अत्यधिक सोचना और ओसीडी से राहत)",
        "Happy Hormones Secretion - Dopamine, Serotonin, GABA (हैप्पी हार्मोन्स एक्टिवेशन)",
        "Cure of Chronic Diseases & Health Challenges (पुरानी बीमारियों से राहत)",
        "Manifesting Money Abundance & Success (धन आकर्षण और समृद्धि)",
        "Sweet Relationships & Social Contribution (मधुर रिश्ते और सामाजिक योगदान)",
        "Power of Attraction & Recognition (आकर्षण शक्ति और सम्मान)"
      ],
      "whoCanJoin": [
        "Anyone suffering from overthinking, anxiety, or deep emotional pain",
        "Seekers wanting to overcome fear, guilt, anger, or ego blocks",
        "Individuals looking to cure chronic health challenges naturally",
        "People wanting to attract wealth, sweet relations, and social recognition"
      ],
      "whyChoose": "This 5-day recorded masterclass connects the spiritual frequencies of Gayatri Energy with biological hormone balance to deliver healing, peace, and abundance.",
      "faqs": [
        { "q": "What is the course investment?", "a": "The investment is ₹30,000 + 18% GST (₹5,400), making a total of ₹35,400." },
        { "q": "How do I purchase the recorded sessions?", "a": "You can sign up and purchase this course directly using UPI or Card payment options online, unlocking instant lifetime access." }
      ],
      "image": "/quantum_jump_gayatri.png",
      "modules": DEFAULT_QUANTUM_JUMP_MODULES
    }
  ],
  products: [
    {
      "id": "book-1",
      "title": "Kahani Padhey or Ameer Bane (Read Stories & Become Rich) By Devendra Dutt Sharma",
      "price": 495,
      "image": "https://m.media-amazon.com/images/I/41FAcKSQKsL._SY445_SX342_FMwebp_.jpg",
      "description": "A collection of inspiring stories that teach financial intelligence, spiritual mindset shifting, and subconscious reconditioning. Contains 50 powerful stories designed to awaken your abundance mindset.",
      "amazonLink": "https://amzn.in/d/00Rtv4o2",
      "badge": "Best Seller",
      "badgeColor": "bg-amber-100 text-amber-700",
      "tagline": "D.D. Sharma's flagship self-development book to transform your financial beliefs.",
      "accent": "from-[#ff7e5f] to-[#feb47b]",
      "rating": 5
    },
    {
      "id": "book-2",
      "title": "How to Become a Millionaire? / करोड़पति कैसे बनें? By Devendra Dutt Sharma",
      "price": 495,
      "image": "https://m.media-amazon.com/images/I/41tKXSKxu0L._SY445_SX342_FMwebp_.jpg",
      "description": "Learn the scientific and spiritual keys to awakening your inner energy. Reprogram your subconscious mind to align with wealth through 6th Sense activation techniques.",
      "amazonLink": "https://amzn.in/d/03CDKXGx",
      "badge": "Highly Rated",
      "badgeColor": "bg-amber-100 text-amber-700",
      "tagline": "Awaken your latent inner energy codes to naturally attract prosperity.",
      "accent": "from-[#ff7e5f] to-[#feb47b]",
      "rating": 5
    },
    {
      "id": "book-3",
      "title": "To be Billionaire – Every Indian's Right / अरबपति होना हर भारतीय का हक है By Devendra Dutt Sharma",
      "price": 989,
      "image": "https://m.media-amazon.com/images/I/41SiR6jRVjL._SY445_SX342_FMwebp_.jpg",
      "description": "A revolutionary book containing 47 inspiring stories to revive the financial consciousness of every Indian. Awaken your midbrain — the billionaire's brain — and dissolve all financial limitations.",
      "amazonLink": "https://amzn.in/d/048fee48",
      "badge": "New Release",
      "badgeColor": "bg-emerald-100 text-emerald-700",
      "tagline": "Declare abundance as your birthright and dissolve all limitations.",
      "accent": "from-[#43e97b] to-[#38f9d7]",
      "rating": 5
    },
    {
      "id": "book-4",
      "title": "How to Become a Multimillionaire? / बहु-करोड़पति कैसे बनें? By Devendra Dutt Sharma",
      "price": 886,
      "image": "https://m.media-amazon.com/images/I/41Rsyq4ttqL._SY445_SX342_FMwebp_.jpg",
      "description": "Advanced wealth programming through 7th Sense activation. Scale your success from millionaire to multimillionaire consciousness using Alpha state mastery and advanced subconscious reprogramming.",
      "amazonLink": "https://amzn.in/d/00ZXIrGv",
      "badge": "Advanced",
      "badgeColor": "bg-purple-100 text-purple-700",
      "tagline": "Shift your consciousness to multimillionaire levels and attract massive opportunities.",
      "accent": "from-[#a18cd1] to-[#fbc2eb]",
      "rating": 5
    },
    {
      "id": "book-5",
      "title": "Change Your Mindset and Become Rich / माइंडसेट बदलें और अमीर बनें By Devendra Dutt Sharma",
      "price": 990,
      "image": "https://m.media-amazon.com/images/I/41SUkQzUtbL._SY445_SX342_FMwebp_.jpg",
      "description": "Master the triple formula of Mindset, Skillset, and Toolset shifting for riches. A comprehensive guide to transforming your thinking patterns and activating the motivation mantras for wealth creation.",
      "amazonLink": "https://amzn.in/d/02lgYQOX",
      "badge": "Popular",
      "badgeColor": "bg-blue-100 text-blue-700",
      "tagline": "Choose the mindset of abundance and transition into absolute peak wealth.",
      "accent": "from-[#667eea] to-[#764ba2]",
      "rating": 5
    },
    {
      "id": "book-6",
      "title": "How Do We Gain from the Magic of Divine Bliss? / दिव्य कृपा का जादू By Devendra Dutt Sharma",
      "price": 990,
      "image": "https://m.media-amazon.com/images/I/41pxx3w2NIL._SY445_SX342_FMwebp_.jpg",
      "description": "Part 1 of the Divine Bliss series. Contains 31 inspiring stories to awaken your subconscious mind, a photo gallery to communicate divinity to your right brain, and activities to experience divine grace and gratitude.",
      "amazonLink": "https://amzn.in/d/0el0x8bW",
      "badge": "Spiritual",
      "badgeColor": "bg-amber-100 text-amber-700",
      "tagline": "Open your life to the magic of divine bliss, vibrating in gratitude and protection.",
      "accent": "from-[#f5af19] to-[#f12711]",
      "rating": 5
    },
    {
      "id": "book-7",
      "title": "आत्मज्ञान - पुष्पमाला (अध्यात्म ज्ञान सरल भाषा में) By Devendra Dutt Sharma",
      "price": 495,
      "image": "https://m.media-amazon.com/images/I/417JkJIcdQL._SY445_SX342_FMwebp_.jpg",
      "description": "Gayatri Science wisdom presented in simple, accessible Hindi language. A garland of spiritual knowledge flowers to elevate your consciousness and connect with your true inner self through self-realization practices.",
      "amazonLink": "https://amzn.in/d/08wEvQab",
      "badge": "Hindi Edition",
      "badgeColor": "bg-orange-100 text-orange-700",
      "tagline": "Connect with your true inner self and elevate your consciousness to divine truth.",
      "accent": "from-[#ff9a9e] to-[#fecfef]",
      "rating": 5
    },
    {
      "id": "book-8",
      "title": "Become Brain Engineering Expert (Theory Book with Page No Learn) By Devendra Dutt Sharma",
      "price": 1100,
      "image": "https://m.media-amazon.com/images/I/41THAMOKGAL._SY445_SX342_FMwebp_.jpg",
      "description": "A comprehensive theory book on brain engineering, speed reading techniques, and memory enhancement hacks. Optimize your brain capacity and learn with supreme speed and retention through scientific methods.",
      "amazonLink": "https://amzn.in/d/00gWmNLL",
      "badge": "Professional",
      "badgeColor": "bg-cyan-100 text-cyan-700",
      "tagline": "Optimize your brain capacity for supreme speed learning and retention.",
      "accent": "from-[#0093E9] to-[#80D0C7]",
      "rating": 5
    },
    {
      "id": "book-9",
      "title": "Become MIDBRAIN ACTIVATION Professional / How to Become MIDBRAIN ACTIVATION Professional By Devendra Dutt Sharma",
      "price": 1100,
      "image": "https://m.media-amazon.com/images/I/61TrnV1HguL._SY445_SX342_FMwebp_.jpg",
      "description": "Professional training guide for Midbrain Activation techniques. Learn the scientific methods to awaken genius intelligence in yourself and others through advanced coaching and child brain development practices.",
      "amazonLink": "https://amzn.in/d/0j97cM31",
      "badge": "Training Guide",
      "badgeColor": "bg-indigo-100 text-indigo-700",
      "tagline": "Channel the training codes of midbrain activation to awaken genius.",
      "accent": "from-[#4facfe] to-[#00f2fe]",
      "rating": 5
    },
    {
      "id": "book-10",
      "title": "Know Your Inborn Talent: Become DMIT Professional / How to Become DMIT Professional By Devendra Dutt Sharma",
      "price": 1690,
      "image": "https://m.media-amazon.com/images/I/51dwjeMIQwL._SY445_SX342_FMwebp_.jpg",
      "description": "The definitive guide to Dermatoglyphics Multiple Intelligence Test (DMIT) analysis. Learn to map fingerprint codes, discover natural talents, and build a professional career in DMIT counseling and talent mapping.",
      "amazonLink": "https://amzn.in/d/0bjoicbj",
      "badge": "Premium Guide",
      "badgeColor": "bg-rose-100 text-rose-700",
      "tagline": "Understand your inborn talents and direct your energy to your natural strengths.",
      "accent": "from-[#fa709a] to-[#fee140]",
      "rating": 5
    }
  ],
  blogs: [
    {
      "id": "1",
      "title": "The Scientific Power of Gayatri Mantra & GABA Hormones",
      "tagline": "How chanting the ancient solar mantra reduces stress, calms overthinking, and activates peak brain power.",
      "intro": "For thousands of years, the Gayatri Mantra has been revered as the supreme chant for wisdom and illumination. Modern scientific studies now reveal that its specific sound frequencies stimulate the production of GABA.",
      "author": "Devendra Sharma",
      "date": "June 7, 2026",
      "readTime": "5 mins read",
      "course": "Gayatri Science",
      "image": "",
      "quote": "The Gayatri Mantra is a universal prayer that aligns our conscious mind with the supreme solar intelligence.",
      "sections": [
        {
          "heading": "1. The Saffron Frequency of Sound",
          "paragraphs": [
            "Every syllable of the Gayatri Mantra is carefully structured to resonate with specific energy centers in the human body.",
            "This sound frequency acts as a natural stabilizer, shifting the brain from high-stress beta waves to relaxed alpha."
          ]
        },
        {
          "heading": "2. GABA Secretion & Neural Calming",
          "paragraphs": [
            "Scientific EEG studies show that rhythmic repetition of the 24 syllables triggers the pituitary gland.",
            "This increases Gamma-Aminobutyric Acid (GABA) levels, which naturally calms tension and cures anxiety."
          ]
        }
      ],
      "technique": {
        "title": "Daily Savita Meditation",
        "steps": [
          "Sit in a comfortable position, keeping your spine straight.",
          "Chant the Gayatri Mantra slowly and rhythmically 11 or 108 times."
        ]
      },
      "conclusion": "By integrating Gayatri Mantra chanting into your daily routine, you program your subconscious."
    },
    {
      "id": "2",
      "title": "The Water Glass Technique: Molecular Reprogramming for Abundance",
      "tagline": "How to use the molecular memory of water to program your subconscious mind for health, wealth, and success.",
      "intro": "Water is not just a chemical compound; it is a sensitive receiver and recorder of frequencies. By holding a glass of water and injecting specific positive intentions in an alpha state, you program its molecular structure.",
      "author": "Devendra Sharma",
      "date": "June 12, 2026",
      "readTime": "6 mins read",
      "course": "Subconscious Programming",
      "image": "",
      "quote": "Water holds memory and vibration. When you program it with gratitude and intention, you drink medicine.",
      "sections": [
        {
          "heading": "1. Dr. Masaru Emoto's Discovery on Water Memory",
          "paragraphs": [
            "Experiments show that water crystals change shape depending on the thoughts and words directed to them.",
            "Positive words like 'Love' and 'Gratitude' form beautiful, symmetrical hexagonal crystalline structures, while negative words form distorted patterns."
          ]
        },
        {
          "heading": "2. Step-by-Step Programming in Alpha State",
          "paragraphs": [
            "When you hold a glass of water, close your eyes and take deep breaths to enter the calm Alpha state of mind.",
            "Visualize your goal as already achieved and feel the joy of success, sending that vibration into the water before drinking it."
          ]
        }
      ],
      "technique": {
        "title": "The 21-Day Water Glass Practice",
        "steps": [
          "Take a glass of clean drinking water in your hands every morning.",
          "Look into the water and speak 5 powerful affirmations in the present tense.",
          "Drink the water slowly, feeling it saturate every cell with success."
        ]
      },
      "conclusion": "Water programming is a fast, scientifically supported way to align your biology with your subconscious goals."
    },
    {
      "id": "3",
      "title": "Awakening Your 9 Chakras & Kundalini Energy",
      "tagline": "The spiritual and physiological guide to opening energy pathways for non-linear life growth.",
      "intro": "The human body is equipped with nine major energy channels, commonly known as Chakras. When these centers are blocked, we experience stagnancy in our career, relationships, and health. Awakening them opens up quantum leaps.",
      "author": "Devendra Sharma",
      "date": "June 15, 2026",
      "readTime": "7 mins read",
      "course": "Chakra Science",
      "image": "",
      "quote": "Chakras are not physical organs, but swirling vortexes of energy that govern our physical and emotional reality.",
      "sections": [
        {
          "heading": "1. Cleansing the Five Elements (Panch Tatva)",
          "paragraphs": [
            "Before awakening the energy chakras, we must purify the five basic elements within us: Earth, Water, Fire, Air, and Space.",
            "Element purification clears physical toxins and mental anxiety, creating a strong foundation for energy flow."
          ]
        },
        {
          "heading": "2. The Kundalini Rise and Non-Linear Growth",
          "paragraphs": [
            "As the energy moves upwards from the root chakra to the crown, your level of consciousness rises from survival to divinity.",
            "This results in sudden, non-linear growth in external aspects of life, including fame, wealth, and intuitive intelligence."
          ]
        }
      ],
      "technique": {
        "title": "9 Chakras Breathing Attunement",
        "steps": [
          "Sit in a silent room and focus on the base of your spine.",
          "Inhale deeply, visualizing a golden light rising up to the top of your head.",
          "Exhale slowly, chanting a soft seed mantra to vibrate and open each chakra."
        ]
      },
      "conclusion": "Regular chakra attunement ensures a balanced mind, a healthy body, and a magnetic aura."
    },
    {
      "id": "4",
      "title": "Mastering the Alpha Brain State & Reticular Activating System (RAS)",
      "tagline": "How to program your brain's internal filter to manifest and recognize life-changing opportunities.",
      "intro": "Your Reticular Activating System (RAS) acts as the gatekeeper of your brain, filtering out millions of bits of unnecessary information. By entering the alpha brainwave state (8-12 Hz), you can write new instructions directly to your RAS.",
      "author": "Devendra Sharma",
      "date": "June 18, 2026",
      "readTime": "8 mins read",
      "course": "Mind Mastery",
      "image": "",
      "quote": "Your brain does not see the world as it is; it sees what your RAS has been programmed to look for.",
      "sections": [
        {
          "heading": "1. What is the Alpha Brain State?",
          "paragraphs": [
            "The brain operates on four primary wave frequencies. Alpha waves occur when you are deeply relaxed yet fully alert.",
            "In this state, the analytical conscious mind relaxes, allowing direct access to the subconscious storehouse."
          ]
        },
        {
          "heading": "2. Programming the RAS for Wealth and Opportunities",
          "paragraphs": [
            "If your RAS is programmed with fear or lack, it will only highlight problems and failures.",
            "By scripting your goals in an Alpha state, you instruct your RAS to highlight solutions, resources, and syns."
          ]
        }
      ],
      "technique": {
        "title": "Alpha Scripting in the Identity Notebook",
        "steps": [
          "Every night before sleeping, write down 3 goals as if they are already accomplished.",
          "Close your eyes, breathe slowly, and mentally play a 2-minute video of your successful self."
        ]
      },
      "conclusion": "By mastering your brainwaves, you take full control of what your mind filters, notices, and attracts."
    }
  ],
  contacts: [],
  users: [],
  purchases: [],
};

// Safe parsing
const safeJsonParse = (value, fallback) => {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

// Initialize localStorage fallback database
export const initializeLocalStorage = () => {
  if (typeof window === 'undefined') return;
  Object.entries(DEFAULT_CONTENT).forEach(([key, value]) => {
    const storageKey = STORAGE_KEYS[key];
    if (!window.localStorage.getItem(storageKey)) {
      window.localStorage.setItem(storageKey, JSON.stringify(value));
    }
  });

  // Data migration: ensure 'quantum-jump' course has default modules if they are empty
  try {
    const coursesKey = STORAGE_KEYS.courses;
    const cachedCoursesRaw = window.localStorage.getItem(coursesKey);
    if (cachedCoursesRaw) {
      const cachedCourses = JSON.parse(cachedCoursesRaw);
      let updated = false;
      const newCourses = cachedCourses.map(course => {
        if (course.id === 'quantum-jump' && (!course.modules || course.modules.length === 0)) {
          updated = true;
          return {
            ...course,
            modules: DEFAULT_QUANTUM_JUMP_MODULES
          };
        }
        return course;
      });
      if (updated) {
        window.localStorage.setItem(coursesKey, JSON.stringify(newCourses));
      }
    }
  } catch (e) {
    console.error("Failed to migrate localStorage courses data:", e);
  }

  // Pre-populate settings with default values if not configured or missing keys
  try {
    const settingsKey = 't360_v5_settings';
    const existingRaw = window.localStorage.getItem(settingsKey);
    if (!existingRaw) {
      const defaultSettings = {
        firebase: {
          apiKey: "AIzaSyCEp45xgfqFqD55c6shvxO7_jxymXjHDts",
          authDomain: "ddsharma-3befe.firebaseapp.com",
          projectId: "ddsharma-3befe",
          storageBucket: "ddsharma-3befe.firebasestorage.app",
          messagingSenderId: "452928596721",
          appId: "1:452928596721:web:5f5423d5f540a3b7825750"
        },
        razorpayKey: "",
        imagekit: {
          urlEndpoint: "https://ik.imagekit.io/zk1gmjhtt",
          publicKey: "public_Y4lsHCnlEUNxsHMlG4dsLllVkAI=",
          authEndpoint: "/api/imagekit-auth"
        }
      };
      window.localStorage.setItem(settingsKey, JSON.stringify(defaultSettings));
    } else {
      const saved = JSON.parse(existingRaw);
      let changed = false;
      if (!saved.imagekit || !saved.imagekit.urlEndpoint) {
        saved.imagekit = {
          urlEndpoint: "https://ik.imagekit.io/zk1gmjhtt",
          publicKey: "public_Y4lsHCnlEUNxsHMlG4dsLllVkAI=",
          authEndpoint: "/api/imagekit-auth"
        };
        changed = true;
      }
      if (!saved.firebase || !saved.firebase.apiKey) {
        saved.firebase = {
          apiKey: "AIzaSyCEp45xgfqFqD55c6shvxO7_jxymXjHDts",
          authDomain: "ddsharma-3befe.firebaseapp.com",
          projectId: "ddsharma-3befe",
          storageBucket: "ddsharma-3befe.firebasestorage.app",
          messagingSenderId: "452928596721",
          appId: "1:452928596721:web:5f5423d5f540a3b7825750"
        };
        changed = true;
      }
      if (changed) {
        window.localStorage.setItem(settingsKey, JSON.stringify(saved));
      }
    }
  } catch (e) {
    console.error("Failed to populate default settings:", e);
  }
};
initializeLocalStorage();


// Sync functions that work with both Firebase (Firestore) and LocalStorage
export const getCollection = async (collName) => {
  if (isFirebaseEnabled && db) {
    try {
      const snap = await getDocs(collection(db, collName));
      
      // If collection is empty in Firestore, automatically seed it with default template content
      if (snap.empty) {
        const defaults = DEFAULT_CONTENT[collName] || [];
        if (defaults.length > 0) {
          console.log(`Firestore collection '${collName}' is empty. Seeding defaults...`);
          for (const item of defaults) {
            const id = String(item.id || item.email || item.date || Date.now());
            await setDoc(doc(db, collName, id), item);
          }
          // Cache locally
          window.localStorage.setItem(STORAGE_KEYS[collName], JSON.stringify(defaults));
          return defaults;
        }
      }
      
      const items = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Also cache locally
      window.localStorage.setItem(STORAGE_KEYS[collName], JSON.stringify(items));
      return items;
    } catch (e) {
      console.error(`Firebase fetch for ${collName} failed, fallback to cache:`, e);
    }
  }
  
  // Local fallback
  const local = window.localStorage.getItem(STORAGE_KEYS[collName]);
  return safeJsonParse(local, DEFAULT_CONTENT[collName] || []);
};

export const saveCollection = async (collName, items) => {
  // Sync to local storage
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEYS[collName], JSON.stringify(items));
    window.dispatchEvent(new Event(CONTENT_UPDATED_EVENT));
  }

  // Sync to Firebase
  if (isFirebaseEnabled && db) {
    try {
      for (const item of items) {
        const id = String(item.id || item.email || item.date || Date.now());
        await setDoc(doc(db, collName, id), item);
      }
    } catch (e) {
      console.error(`Firebase save collection for ${collName} failed:`, e);
    }
  }
};

// Save a single item in a collection
export const saveItem = async (collName, item) => {
  const current = await getCollection(collName);
  const id = String(item.id || item.email || item.date || Date.now());
  
  const index = current.findIndex(x => String(x.id || x.email || x.date) === id);
  const updated = [...current];
  if (index >= 0) {
    updated[index] = item;
  } else {
    updated.push(item);
  }

  // Update local storage
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEYS[collName], JSON.stringify(updated));
    window.dispatchEvent(new Event(CONTENT_UPDATED_EVENT));
  }

  // Update Firebase
  if (isFirebaseEnabled && db) {
    try {
      await setDoc(doc(db, collName, id), item);
    } catch (e) {
      console.error(`Firebase save item failed for ${collName}:`, e);
    }
  }
};

// Delete a single item
export const deleteItem = async (collName, itemId) => {
  const current = await getCollection(collName);
  const updated = current.filter(x => String(x.id || x.email || x.date) !== String(itemId));

  // Update local storage
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEYS[collName], JSON.stringify(updated));
    window.dispatchEvent(new Event(CONTENT_UPDATED_EVENT));
  }

  // Update Firebase
  if (isFirebaseEnabled && db) {
    try {
      await deleteDoc(doc(db, collName, String(itemId)));
    } catch (e) {
      console.error(`Firebase delete item failed for ${collName}:`, e);
    }
  }
};

// Reset collection to default
export const resetCollection = async (collName) => {
  await saveCollection(collName, DEFAULT_CONTENT[collName] || []);
};

// Reactive hook to fetch data with live update support
export const useAdminContent = (collName) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Initial fetch from cache/localStorage for speed
    const cache = window.localStorage.getItem(STORAGE_KEYS[collName]);
    if (cache) {
      setItems(safeJsonParse(cache, DEFAULT_CONTENT[collName] || []));
    } else {
      getCollection(collName).then(data => setItems(data));
    }

    // Subscribe
    if (isFirebaseEnabled && db) {
      const unsub = onSnapshot(collection(db, collName), (snap) => {
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(data);
        window.localStorage.setItem(STORAGE_KEYS[collName], JSON.stringify(data));
      }, (error) => {
        console.error(`Firestore real-time subscription failed for ${collName}:`, error);
      });
      return unsub;
    } else {
      // Local event listeners
      const syncLocal = () => {
        const local = window.localStorage.getItem(STORAGE_KEYS[collName]);
        setItems(safeJsonParse(local, DEFAULT_CONTENT[collName] || []));
      };
      window.addEventListener(CONTENT_UPDATED_EVENT, syncLocal);
      window.addEventListener('storage', syncLocal);
      // For backward compatibility with t360-content-updated-v3
      window.addEventListener('t360-content-updated-v3', syncLocal);

      return () => {
        window.removeEventListener(CONTENT_UPDATED_EVENT, syncLocal);
        window.removeEventListener('storage', syncLocal);
        window.removeEventListener('t360-content-updated-v3', syncLocal);
      };
    }
  }, [collName]);

  return items;
};

/* ==========================================================================
   USER AUTHENTICATION LOGIC (Firebase + Mock Fallback)
   ========================================================================== */

// Check if user is Admin
export const isUserAdmin = (user) => {
  if (!user) return false;
  return user.role === 'admin' || user.email === 'admin@team360.com';
};

// Register user
export const registerUser = async (name, email, password) => {
  const normalizedEmail = email.toLowerCase().trim();

  if (isFirebaseEnabled && auth) {
    const cred = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
    await updateProfile(cred.user, { displayName: name });
    
    // Save additional profile info in Firestore
    const userDoc = {
      uid: cred.user.uid,
      name,
      email: normalizedEmail,
      role: 'user', // Default role
      createdAt: new Date().toISOString()
    };
    await setDoc(doc(db, 'users', cred.user.uid), userDoc);
    return userDoc;
  }

  // Local fallback
  const users = await getCollection('users');
  if (users.find(u => u.email === normalizedEmail)) {
    throw new Error('User already exists');
  }

  const newUser = {
    id: Date.now(),
    uid: String(Date.now()),
    name,
    email: normalizedEmail,
    password, // Stored in plain text only for mock local demonstration!
    role: normalizedEmail === 'admin@team360.com' ? 'admin' : 'user',
    createdAt: new Date().toISOString()
  };

  await saveItem('users', newUser);
  
  // Set current user session
  window.localStorage.setItem('t360_v5_current_user', JSON.stringify(newUser));
  window.dispatchEvent(new Event('t360-auth-changed'));
  return newUser;
};

// Login user
export const loginUser = async (email, password) => {
  const normalizedEmail = email.toLowerCase().trim();

  if (isFirebaseEnabled && auth) {
    const cred = await signInWithEmailAndPassword(auth, normalizedEmail, password);
    const userDocRef = doc(db, 'users', cred.user.uid);
    const userDocSnap = await getDoc(userDocRef);
    const isDefaultAdmin = normalizedEmail === 'admin@team360.com';
    if (userDocSnap.exists()) {
      const data = userDocSnap.data();
      return { uid: cred.user.uid, ...data, role: data.role || (isDefaultAdmin ? 'admin' : 'user') };
    }
    return {
      uid: cred.user.uid,
      name: cred.user.displayName || (isDefaultAdmin ? 'Administrator' : 'User'),
      email: cred.user.email,
      role: isDefaultAdmin ? 'admin' : 'user'
    };
  }

  // Local fallback
  const users = await getCollection('users');
  
  // Check for admin default login
  if (normalizedEmail === 'admin@team360.com' && password === 'admin123') {
    const adminUser = {
      uid: 'admin-uid',
      name: 'Administrator',
      email: 'admin@team360.com',
      role: 'admin'
    };
    window.localStorage.setItem('t360_v5_current_user', JSON.stringify(adminUser));
    window.localStorage.setItem('t360_v5_session', 'active'); // Admin legacy support
    window.dispatchEvent(new Event('t360-auth-changed'));
    return adminUser;
  }

  const found = users.find(u => u.email === normalizedEmail && u.password === password);
  if (!found) {
    throw new Error('Invalid email or password');
  }

  window.localStorage.setItem('t360_v5_current_user', JSON.stringify(found));
  if (found.role === 'admin') {
    window.localStorage.setItem('t360_v5_session', 'active');
  }
  window.dispatchEvent(new Event('t360-auth-changed'));
  return found;
};

// Logout user
export const logoutUser = async () => {
  if (isFirebaseEnabled && auth) {
    await signOut(auth);
  }
  
  window.localStorage.removeItem('t360_v5_current_user');
  window.localStorage.removeItem('t360_v5_session');
  window.dispatchEvent(new Event('t360-auth-changed'));
};

// Reset user password
export const resetUserPassword = async (email) => {
  const normalizedEmail = email.toLowerCase().trim();

  if (isFirebaseEnabled && auth) {
    await sendPasswordResetEmail(auth, normalizedEmail);
    return;
  }

  // Local fallback mock behavior
  const users = await getCollection('users');
  const found = users.find(u => u.email === normalizedEmail);
  if (!found) {
    throw new Error('No user found with this email address.');
  }
  return;
};

// Hook for accessing the current user auth state reactively
export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial fetch from localStorage
    const getLocalUser = () => {
      const saved = window.localStorage.getItem('t360_v5_current_user');
      return saved ? safeJsonParse(saved, null) : null;
    };
    
    setCurrentUser(getLocalUser());

    if (isFirebaseEnabled && auth) {
      const unsubAuth = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          try {
            const userDocSnap = await getDoc(doc(db, 'users', firebaseUser.uid));
            const isDefaultAdmin = firebaseUser.email?.toLowerCase().trim() === 'admin@team360.com';
            if (userDocSnap.exists()) {
              const data = userDocSnap.data();
              const fullUser = { uid: firebaseUser.uid, ...data, role: data.role || (isDefaultAdmin ? 'admin' : 'user') };
              setCurrentUser(fullUser);
              window.localStorage.setItem('t360_v5_current_user', JSON.stringify(fullUser));
            } else {
              const defaultUser = {
                uid: firebaseUser.uid,
                name: firebaseUser.displayName || (isDefaultAdmin ? 'Administrator' : 'User'),
                email: firebaseUser.email,
                role: isDefaultAdmin ? 'admin' : 'user'
              };
              setCurrentUser(defaultUser);
              window.localStorage.setItem('t360_v5_current_user', JSON.stringify(defaultUser));
            }
          } catch (e) {
            console.error('Error fetching user metadata:', e);
          }
        } else {
          setCurrentUser(null);
          window.localStorage.removeItem('t360_v5_current_user');
        }
        setLoading(false);
      });
      return unsubAuth;
    } else {
      setLoading(false);
      const handleAuthChange = () => {
        setCurrentUser(getLocalUser());
      };
      window.addEventListener('t360-auth-changed', handleAuthChange);
      return () => {
        window.removeEventListener('t360-auth-changed', handleAuthChange);
      };
    }
  }, []);

  return { currentUser, loading };
};

/* ==========================================================================
   ENROLLMENT / PURCHASE SYSTEM
   ========================================================================== */

// Check if user is enrolled in a course
export const checkEnrollment = async (userIdOrEmail, courseId) => {
  if (!userIdOrEmail) return false;
  
  if (isFirebaseEnabled && db) {
    try {
      const q = query(
        collection(db, 'purchases'), 
        where('courseId', '==', courseId),
        where('userEmail', '==', String(userIdOrEmail).toLowerCase())
      );
      const snap = await getDocs(q);
      if (!snap.empty) return true;

      const q2 = query(
        collection(db, 'purchases'), 
        where('courseId', '==', courseId),
        where('userId', '==', userIdOrEmail)
      );
      const snap2 = await getDocs(q2);
      return !snap2.empty;
    } catch (e) {
      console.error('Error checking Firebase enrollment:', e);
    }
  }

  // Local fallback
  const purchases = await getCollection('purchases');
  return purchases.some(p => 
    String(p.courseId) === String(courseId) && 
    (String(p.userId) === String(userIdOrEmail) || String(p.userEmail).toLowerCase() === String(userIdOrEmail).toLowerCase())
  );
};

// Purchase a course
export const purchaseCourse = async (user, courseId, paymentDetails = {}) => {
  if (!user) throw new Error('User must be logged in to purchase');

  const purchaseDoc = {
    id: `purchase-${Date.now()}`,
    userId: user.uid || String(user.id),
    userName: user.name,
    userEmail: user.email.toLowerCase(),
    courseId,
    amount: paymentDetails.amount || 0,
    paymentId: paymentDetails.paymentId || `mock-pay-${Date.now()}`,
    date: new Date().toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }),
    status: 'completed'
  };

  await saveItem('purchases', purchaseDoc);
  return purchaseDoc;
};

// Admin manually adds enrollment
export const adminAddEnrollment = async (email, courseId) => {
  const normalizedEmail = email.toLowerCase().trim();
  
  // Find user by email to get their details
  const users = await getCollection('users');
  const user = users.find(u => u.email === normalizedEmail) || {
    uid: `guest-${Date.now()}`,
    name: normalizedEmail.split('@')[0],
    email: normalizedEmail
  };

  const purchaseDoc = {
    id: `enroll-${Date.now()}`,
    userId: user.uid,
    userName: user.name,
    userEmail: normalizedEmail,
    courseId,
    amount: 0,
    paymentId: `manual-admin-${Date.now()}`,
    date: new Date().toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }),
    status: 'completed'
  };

  await saveItem('purchases', purchaseDoc);
};

// Admin manually revokes enrollment
export const adminRemoveEnrollment = async (purchaseId) => {
  await deleteItem('purchases', purchaseId);
};

/* ==========================================================================
   LEGACY COMPATIBILITY LOGIC & UTILITIES
   ========================================================================== */
export const getAdminAccount = () => {
  if (typeof window === 'undefined') return null;
  return safeJsonParse(window.localStorage.getItem('t360_v5_account'), null);
};

export const saveAdminAccount = (account) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('t360_v5_account', JSON.stringify(account));
  }
};

export const isAdminLoggedIn = () => {
  if (typeof window === 'undefined') return false;
  // Dynamic check: checks current session or legacy token
  const curUser = safeJsonParse(window.localStorage.getItem('t360_v5_current_user'), null);
  if (curUser && curUser.role === 'admin') return true;
  return window.localStorage.getItem('t360_v5_session') === 'active';
};

export const setAdminSession = (isActive) => {
  if (typeof window !== 'undefined') {
    if (isActive) {
      window.localStorage.setItem('t360_v5_session', 'active');
      const curUser = safeJsonParse(window.localStorage.getItem('t360_v5_current_user'), null);
      if (!curUser) {
        window.localStorage.setItem('t360_v5_current_user', JSON.stringify({
          uid: 'admin-uid',
          name: 'Administrator',
          email: 'admin@team360.com',
          role: 'admin'
        }));
      }
    } else {
      window.localStorage.removeItem('t360_v5_session');
      const curUser = safeJsonParse(window.localStorage.getItem('t360_v5_current_user'), null);
      if (curUser && curUser.role === 'admin') {
        window.localStorage.removeItem('t360_v5_current_user');
      }
    }
    window.dispatchEvent(new Event('t360-auth-changed'));
  }
};

export const createSlug = (value) => {
  const slug = String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || `item-${Date.now()}`;
};

export const emptyItemFor = (collection) => {
  if (collection === 'products') {
    return {
      id: Date.now(),
      title: '',
      price: 0,
      rating: 5,
      badge: 'New',
      badgeColor: 'bg-amber-100 text-amber-700',
      tagline: '',
      accent: 'from-[#a78bfa] to-[#7c3aed]',
      image: '',
      subtitle: '',
      description: '',
      benefits: [],
      specifications: {
        material: '',
        beadsSize: '',
        elasticity: '',
        origin: '',
      },
      howToUse: [],
      energization: '',
    };
  }

  if (collection === 'blogs') {
    return {
      id: Date.now(),
      title: '',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      image: '',
      course: '',
      tagline: '',
      author: 'Devendra Sharma (D.D. Sharma)',
      readTime: '5 mins read',
      intro: '',
      quote: '',
      sections: [
        { heading: '', paragraphs: [''] }
      ],
      technique: {
        title: '',
        steps: [''],
      },
      conclusion: '',
    };
  }

  return {
    id: '',
    title: '',
    subtitle: '',
    category: 'Spiritual Healing',
    duration: '',
    type: 'Course',
    description: '',
    details: '',
    benefits: [],
    whoCanJoin: [],
    whyChoose: '',
    faqs: [],
    image: '',
    modules: [],
  };
};

export const COLLECTION_LABELS = {
  courses: 'Courses / Workshops',
  products: 'Products',
  blogs: 'Blogs',
  contacts: 'Contact Queries',
};

export const PRIVATE_SESSION_TYPES = ['1-to-1 Session', 'Private Session'];

export const isPrivateSession = (type) => PRIVATE_SESSION_TYPES.includes(type);
