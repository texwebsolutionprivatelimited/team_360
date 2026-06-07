import { useEffect, useState } from 'react';

export const CONTENT_UPDATED_EVENT = 't360-content-updated-v3';

const STORAGE_KEYS = {
  courses: 't360_v3_courses',
  products: 't360_v3_products',
  blogs: 't360_v3_blogs',
  contacts: 't360_v3_contacts',
};

const DEFAULT_CONTENT = {
  courses: [
    {
      "id": "mentors-training-program",
      "title": "Swar Vigyan & Breath Science Mastery (Module 1)",
      "subtitle": "Module – 1: 15 Days Advanced Online Workshop & 45 Days Guided Practice",
      "category": "Breath Science & Elements",
      "duration": "15 Days Advanced Workshop + 45 Days Guided Practice",
      "type": "Workshop",
      "description": "Unlock the secret science of breathing (Swar Vigyan), Ida & Pingala nostril balance, and Panch Mahabhuta Shodhan (five elements purification) to balance your physical and mental energy.",
      "details": "Swar Vigyan & Breath Science:\n* Ida & Pingala nostril alignment\n* Activation of Surya & Chandra swar\n* Breath analysis for daily tasks\n* Panch Mahabhuta Shodhan (five elements purification)\n\nKey Practices:\nNadi Shodhana, Element concentration, Aura expansion, and Daily breath awareness.\n\nPeak Flow State Principles:\n* Shift from stress to flow state\n* Cleanse cellular memory with breathing\n* Align breath with widely important actions",
      "benefits": [
        "Opportunity for substantial monthly income as a certified breath coach",
        "Learn authentic tools for Swar Vigyan and element balancing",
        "Balance physical health, reduce chronic stress, and expand cognitive capacity",
        "Learn to read and direct your breath for manifestation and peak productivity"
      ],
      "whoCanJoin": [
        "Anyone looking to resolve stress and mental exhaustion",
        "Aspiring coaches and holistic healers",
        "Professionals wanting to stay in peak mental flow",
        "Spiritual seekers interested in ancient Vedic science"
      ],
      "whyChoose": "This program combines the exact science of nostrils (Swar) and element purification to put you in a state of high energy and peak performance.",
      "faqs": [
        {
          "q": "Is there a certificate provided?",
          "a": "Yes, this program includes certification as a Breath Coach & Authorized Mentor."
        },
        {
          "q": "Do I need prior experience in yoga?",
          "a": "No, this is started from the absolute basics of breath monitoring."
        }
      ],
      "image": "/src/assets/pranayama_breath.png"
    },
    {
      "id": "trainers-training-program",
      "title": "Gayatri Quantum Science & Brain Activation (Module 2)",
      "subtitle": "Module – 2: 6 Days Advanced Online Workshop & 30 Days Practice",
      "category": "Vedic Sound & Brain Science",
      "duration": "6 Days Advanced Workshop + 30 Days Practice",
      "type": "Workshop",
      "description": "Dive into the scientific power of the Gayatri Mantra. Discover how the 110,000 sound waves per second frequency stimulates the secretion of GABA hormones, calms overthinking, activates the brain, and aligns your energetic body.",
      "details": "Gayatri Quantum Science:\n* 110,000 sound waves/sec scientific impact\n* Stimulation of GABA hormones and happy hormones (dopamine, serotonin)\n* Vagus nerve stimulation and parasympathetic healing\n* Savita Solar Meditation (Solar Ray Brain Activation)\n\nSyllabus Highlights:\n* Activating Gayatri energy in the spiritual body\n* Sound healing and neurological resonance\n* 27 Mantra Sadhana & 27 Days RAS Activation\n* Map of Conscious Evolution (20 to 700 Cal)\n* Manifestation and healing by a Master",
      "benefits": [
        "Become a certified Trainer in Gayatri Quantum Science and Conduct workshops",
        "Get opportunities to speak in Central Schools as a motivational trainer",
        "Awaken the third eye center and clear cognitive blocks using solar rays",
        "Join D.D. Sharma Ji on our YouTube Channel and Web Podcasts",
        "Lifelong mentorship and handsome income (₹1.5 to ₹5 Lakhs/month)"
      ],
      "whoCanJoin": [
        "Aspiring motivational speakers and trainers",
        "Seekers interested in the intersection of science and Vedic mantras",
        "Students wanting to optimize brain capacity and memory retention",
        "Anyone looking to eliminate anxiety and chronic overthinking"
      ],
      "whyChoose": "This program uses scientific experiments of Gayatri Mantra (which increases GABA hormones) to eliminate stress and enhance internal performance.",
      "faqs": [
        {
          "q": "Will I get chances to speak in schools?",
          "a": "Yes, certified trainers get opportunities to work as speakers in Central Schools."
        }
      ],
      "image": "/src/assets/gayatri_sun.png"
    },
    {
      "id": "signature-program",
      "title": "Subconscious Reconditioning & Abundance Codes (Module 3)",
      "subtitle": "Module – 3: 3 Days Online Workshop & 15 Days Guided Practice",
      "category": "Mind Programming",
      "duration": "3 Days Online Workshop + 15 Days Guided Practice",
      "type": "Workshop",
      "description": "Learn to reprogram your subconscious mind at 8-12Hz (Alpha state) for infinite wealth and health. Master the Water Glass manifestation technique, Mirror work, Identity Notebook writing, and 9 Urja Chakras Activation.",
      "details": "Subconscious Reconditioning:\n* Subconscious programming via Alpha Mind Activation\n* Water Glass Technique (molecular memory encoding)\n* Mirror Work (releasing past trauma & old identities)\n* Identity Notebook (scripting your future self)\n\nSyllabus Highlights:\n* 9 Urja Chakras Activation & Aura shielding\n* Reticular Activating System (RAS) goal programming\n* Money Meditation & Saffron wealth codes\n* Gratitude scripting and protection shield activation",
      "benefits": [
        "Reprogram the mind to eliminate deep-seated scarcity beliefs",
        "Build a solid aura protection shield to block negative vibes",
        "Activate happy hormones and feel cool, calm, and composed daily",
        "Experience rapid, non-linear growth in business, career, and finance",
        "Learn to manifest goals effortlessly using the Water Glass Technique"
      ],
      "whoCanJoin": [
        "Anyone feeling stuck, anxious, or facing financial blocks",
        "Seekers wanting to tune and balance their 9 energy chakras",
        "Individuals looking to master the Law of Attraction scientifically",
        "Business owners aiming to scale their mindset for abundance"
      ],
      "whyChoose": "This workshop is structured around highly practical and scientific techniques (Water Glass, Mirror, Alpha Activation) to deliver instant results.",
      "faqs": [
        {
          "q": "What are the bonuses included?",
          "a": "Bonuses: Video Series (Value ₹5,500), 9 Energy Awakening Series (Value ₹5,000), 30 Days Mentorship, Monthly Meditation Sessions."
        }
      ],
      "image": "/src/assets/subconscious_mind_alpha.png"
    }
  ],
  products: [
    {
      "id": "book-1",
      "title": "Kahani Padhey or Ameer Bane (Read Stories & Become Rich) (Edition - Hindi ) By Devendra Dutt Sharma",
      "price": 495,
      "image": "https://m.media-amazon.com/images/I/41FAcKSQKsL._SY445_SX342_FMwebp_.jpg",
      "description": "A collection of inspiring stories that teach financial intelligence, spiritual mindset shifting, and subconscious reconditioning to attract wealth and abundance into daily life.",
      "amazonLink": "https://amzn.in/d/00Rtv4o2",
      "badge": "Best Seller",
      "badgeColor": "bg-amber-100 text-amber-700",
      "tagline": "D.D. Sharma's flagship self-development book to transform your financial beliefs.",
      "accent": "from-[#ff7e5f] to-[#feb47b]",
      "rating": 5
    },
    {
      "id": "book-2",
      "title": "How to Become a Millionaire? / करोड़पति कैसे बनें? : Awakening of Inner Energy (Hindi & English Edition) By Devendra Dutt Sharma",
      "price": 495,
      "image": "https://m.media-amazon.com/images/I/41tKXSKxu0L._SY445_SX342_FMwebp_.jpg",
      "description": "Learn the scientific and spiritual keys to awakening your inner energy. Reprogram your subconscious mind to align with the frequency of wealth and success.",
      "amazonLink": "https://amzn.in/d/03CDKXGx",
      "badge": "Highly Rated",
      "badgeColor": "bg-amber-100 text-amber-700",
      "tagline": "Awaken your latent inner energy codes to naturally attract prosperity.",
      "accent": "from-[#ff7e5f] to-[#feb47b]",
      "rating": 5
    },
    {
      "id": "book-3",
      "title": "To be Billionaire – Every Indian’s Right By Devendra Dutt Sharma",
      "price": 989,
      "image": "https://m.media-amazon.com/images/I/41SiR6jRVjL._SY445_SX342_FMwebp_.jpg",
      "description": "A revolutionary book proclaiming that abundance is the birthright of every citizen. Provides practical methods for financial planning, subconscious training, and clearing wealth blocks.",
      "amazonLink": "https://amzn.in/d/048fee48",
      "badge": "New Release",
      "badgeColor": "bg-amber-100 text-amber-700",
      "tagline": "A powerful declaration and manual on why abundance is your divine birthright.",
      "accent": "from-[#ff7e5f] to-[#feb47b]",
      "rating": 5
    },
    {
      "id": "book-4",
      "title": "How to Become a Multimillionaire? / बहु-करोड़पति कैसे बनें? By Devendra Dutt Sharma",
      "price": 886,
      "image": "https://m.media-amazon.com/images/I/41Rsyq4ttqL._SY445_SX342_FMwebp_.jpg",
      "description": "Take your financial goals to the next level. This book shares advanced mental frameworks, investment mindsets, and Alpha state programming to scale from a millionaire to a multimillionaire.",
      "amazonLink": "https://amzn.in/d/00ZXIrGv",
      "badge": "Divine Wisdom",
      "badgeColor": "bg-amber-100 text-amber-700",
      "tagline": "Take your financial goals to the next level with advanced mind-programming secrets.",
      "accent": "from-[#ff7e5f] to-[#feb47b]",
      "rating": 5
    },
    {
      "id": "book-5",
      "title": "Change Your Mindset and Become Rich / माइंडसेट बदलो और करोड़पति बनो : Motivation and Activation Mantra / मोटिवेशन एंड एक्टिवेशन मंत्र",
      "price": 990,
      "image": "https://m.media-amazon.com/images/I/41SUkQzUtbL._SY445_SX342_FMwebp_.jpg",
      "description": "To become rich, three changes are needed. First, Change of Mindset; second, Change of Skillset; and third, Change of Toolset. A person can be rich by making their mindset into one of abundance. The 50 stories given in this book are effective to change a poor person’s mind into a rich person’s mind as a rich mind attracts riches. The author has b...",
      "amazonLink": "https://amzn.in/d/02lgYQOX",
      "badge": "Must Read",
      "badgeColor": "bg-amber-100 text-amber-700",
      "tagline": "Unleash your mind's true capability through Vedic brain reconditioning.",
      "accent": "from-[#ff7e5f] to-[#feb47b]",
      "rating": 5
    },
    {
      "id": "book-6",
      "title": "How Do We Gain from the Magic of Divine Bliss? / दिव्य कृपा का जादू By Devendra Dutt Sharma",
      "price": 990,
      "image": "https://m.media-amazon.com/images/I/41pxx3w2NIL._SY445_SX342_FMwebp_.jpg",
      "description": "Learn the practices of gratitude, alignment, and divine connection. Attract continuous flow of success, health, and peace into your life by tapping into divine bliss frequencies.",
      "amazonLink": "https://amzn.in/d/0el0x8bW",
      "badge": "Self Excellence",
      "badgeColor": "bg-amber-100 text-amber-700",
      "tagline": "Align your energy centers and connect with the flow of divine grace.",
      "accent": "from-[#ff7e5f] to-[#feb47b]",
      "rating": 5
    },
    {
      "id": "book-7",
      "title": "आत्मज्ञान - पुष्पमाला (अध्यात्म ज्ञान सरल भाषा में ) By Devendra Dutt Sharma",
      "price": 495,
      "image": "https://m.media-amazon.com/images/I/417JkJIcdQL._SY445_SX342_FMwebp_.jpg",
      "description": "A collection of profound spiritual discourses explaining Vedic wisdom, self-realization, and the science of consciousness in simple, daily language.",
      "amazonLink": "https://amzn.in/d/08wEvQab",
      "badge": "Life Transformation",
      "badgeColor": "bg-amber-100 text-amber-700",
      "tagline": "Ancient Vedic wisdom and self-realization decoded in simple language.",
      "accent": "from-[#ff7e5f] to-[#feb47b]",
      "rating": 5
    },
    {
      "id": "book-8",
      "title": "Become Brain Engineering Expert (theory book with page no learn) By Devendra Dutt Sharma",
      "price": 1100,
      "image": "https://m.media-amazon.com/images/I/41THAMOKGAL._SY445_SX342_FMwebp_.jpg",
      "description": "A comprehensive guide on brain engineering, speed reading, mind mapping, and sensory integration. Get certified to teach brain sciences and memory training.",
      "amazonLink": "https://amzn.in/d/00gWmNLL",
      "badge": "Abundance",
      "badgeColor": "bg-amber-100 text-amber-700",
      "tagline": "Unlock peak learning speed, memory retention, and brain power.",
      "accent": "from-[#ff7e5f] to-[#feb47b]",
      "rating": 5
    },
    {
      "id": "book-9",
      "title": "Become MIDBRAIN ACTIVATION Professional, How to Become MIDBRAIN ACTIVATION Professional By Devendra Dutt Sharma",
      "price": 1100,
      "image": "https://m.media-amazon.com/images/I/61TrnV1HguL._SY445_SX342_FMwebp_.jpg",
      "description": "Unlock child genius potential by learning the step-by-step methods of Midbrain Activation. Build a highly successful and lucrative career in child psychology and brain training.",
      "amazonLink": "https://amzn.in/d/0j97cM31",
      "badge": "Practice Journal",
      "badgeColor": "bg-amber-100 text-amber-700",
      "tagline": "Establish a successful career in the booming field of child brain training.",
      "accent": "from-[#ff7e5f] to-[#feb47b]",
      "rating": 5
    },
    {
      "id": "book-10",
      "title": "know Your Inborn Talent : Become DMIT Professional, How to Become DMIT Professional By Devendra Dutt Sharma",
      "price": 1690,
      "image": "https://m.media-amazon.com/images/I/51dwjeMIQwL._SY445_SX342_FMwebp_.jpg",
      "description": "A comprehensive textbook detailing the science of Dermatoglyphics Multiple Intelligence Test (DMIT). Analyze fingerprint patterns to map natural talents and career paths.",
      "amazonLink": "https://amzn.in/d/0bjoicbj",
      "badge": "Deep Cleansing",
      "badgeColor": "bg-amber-100 text-amber-700",
      "tagline": "Discover inborn talents and build a rewarding career as a DMIT expert.",
      "accent": "from-[#ff7e5f] to-[#feb47b]",
      "rating": 5
    }
  ],
  blogs: [
    {
      "id": "gayatri-mantra-science",
      "title": "The Scientific Power of Gayatri Mantra & GABA Hormones",
      "tagline": "How chanting the ancient solar mantra reduces stress, calms overthinking, and activates peak brain power.",
      "intro": "For thousands of years, the Gayatri Mantra has been revered as the supreme chant for wisdom and illumination. Modern scientific studies now reveal that its specific sound frequencies stimulate the production of GABA (Gamma-Aminobutyric Acid), a neurotransmitter that naturally calms the nervous system.",
      "author": "Devendra Sharma",
      "date": "June 7, 2026",
      "readTime": "5 mins read",
      "course": "Gayatri Science",
      "image": "/src/assets/gayatri_sun.png",
      "quote": "The Gayatri Mantra is a universal prayer that aligns our conscious mind with the supreme solar intelligence, activating our inner wisdom.",
      "sections": [
        {
          "heading": "1. The Saffron Frequency of Sound",
          "paragraphs": [
            "Every syllable of the Gayatri Mantra is carefully structured to resonate with specific energy centers (chakras) in the human body. When chanted correctly, it creates sound vibrations that travel through the vagus nerve, sending calming signals to the brain.",
            "This sound frequency acts as a natural stabilizer, shifting the brain from high-stress beta waves to relaxed alpha and theta waves."
          ]
        },
        {
          "heading": "2. Activation of GABA & Happy Hormones",
          "paragraphs": [
            "Medical research shows that rhythmic chanting of the Gayatri Mantra increases the secretion of GABA hormones. GABA is crucial for reducing anxiety, controlling overthinking, and soothing the nervous system.",
            "At the same time, it stimulates dopamine and serotonin, the \"happy hormones\" that elevate mood, expand intelligence, and awaken inner peace."
          ]
        }
      ],
      "technique": {
        "title": "Daily Savita Meditation",
        "steps": [
          "Sit in a comfortable position, keeping your spine straight.",
          "Close your eyes and visualize the rising golden sun at your eyebrow center (Third Eye).",
          "Chant the Gayatri Mantra slowly and rhythmically 11 or 108 times.",
          "Feel the warm golden light purifying your mind and body."
        ]
      },
      "conclusion": "By integrating Gayatri Mantra chanting into your daily routine, you reprogram your subconscious mind, shield your aura, and unlock your true divine potential."
    },
    {
      "id": "subconscious-reprogramming-secrets",
      "title": "How to Reprogram Your Subconscious Mind for Wealth & Abundance",
      "tagline": "Unlock the Alpha state of mind and align your inner beliefs with the flow of infinite prosperity.",
      "intro": "Your subconscious mind acts like a supercomputer, executing the programs and beliefs installed since childhood. If you carry scarcity programming, you will struggle to attract wealth, regardless of your hard work. Reprogramming your mind is the key to effortless manifestation.",
      "author": "Devendra Sharma",
      "date": "June 5, 2026",
      "readTime": "6 mins read",
      "course": "Alpha Mind Activation",
      "image": "/src/assets/subconscious_mind_alpha.png",
      "quote": "Change your thoughts, and you change your destiny. Wealth is not a number; it is a state of mind.",
      "sections": [
        {
          "heading": "1. Entering the Alpha State",
          "paragraphs": [
            "The subconscious mind is most receptive when the brain slows down to Alpha waves (8-12 Hz). This naturally happens twice a day: right before you fall asleep and immediately after you wake up.",
            "By practicing visualization and positive affirmations during these windows, you bypass the critical conscious filter and implant new beliefs directly into the subconscious."
          ]
        },
        {
          "heading": "2. The Water Glass Technique",
          "paragraphs": [
            "Water is a powerful conductor of energy and intention. Holding a glass of water and speaking positive affirmations into it before drinking charges the water with your desired vibration.",
            "Consuming this energized water helps align your physical and energetic cells with the frequency of your goals."
          ]
        }
      ],
      "technique": {
        "title": "The 3-Step Mirror Technique",
        "steps": [
          "Stand in front of a mirror, look directly into your own eyes.",
          "Take three deep breaths, releasing all past pain and old identities.",
          "Affirm with absolute conviction: \"I am worthy, capable, and aligned with infinite abundance.\""
        ]
      },
      "conclusion": "Consistently reprogramming your subconscious mind transforms your outer reality, creating synchronicity, luck, and non-linear growth."
    },
    {
      "id": "law-of-attraction-and-9-chakras",
      "title": "The Law of Attraction & 9 Chakras Activation",
      "tagline": "Align your nine energy centers to turn your physical body into a powerful manifestation magnet.",
      "intro": "Traditional spiritual systems talk about the 7 major chakras. However, advanced spiritual science reveals the existence of 9 energy centers. When all nine chakras are activated and balanced, your personal electromagnetic aura becomes extraordinarily strong, amplifying your manifestation power tenfold.",
      "author": "Devendra Sharma",
      "date": "June 3, 2026",
      "readTime": "7 mins read",
      "course": "Chakra Activation",
      "image": "/src/assets/shree_vidya_mandala.png",
      "quote": "When your chakras are aligned, you no longer chase success; success is drawn to you like a magnet.",
      "sections": [
        {
          "heading": "1. The 9 Energy Centers",
          "paragraphs": [
            "Beyond the root to crown chakras, the 9-chakra system includes additional cosmic and grounding links that connect you to earth's core and divine intelligence.",
            "Cleansing these centers removes auric implants, subconscious blocks, and ancestral karma, restoring your natural state of flow."
          ]
        },
        {
          "heading": "2. RAS Activation for Opportunities",
          "paragraphs": [
            "Activating your chakras also stimulates the Reticular Activating System (RAS) in your brain. The RAS acts as a filter, highlighting the opportunities, resources, and connections that align with your dominant energetic state.",
            "This is the biological mechanism behind the Law of Attraction: you start seeing options that were previously invisible."
          ]
        }
      ],
      "technique": {
        "title": "Soham Breath & Chakra Alignment",
        "steps": [
          "Inhale deeply while mentally chanting \"So\", drawing energy up your spine.",
          "Exhale slowly while mentally chanting \"Ham\", letting the energy radiate from your crown.",
          "Focus on each of the nine chakras for a few breaths, visualizing them spinning as bright spheres of light."
        ]
      },
      "conclusion": "A strong, glowing aura acts as a protective shield and an abundance magnet, bringing non-verbal positive energy into every room you enter."
    },
    {
      "id": "positive-thinking-neuroscience",
      "title": "The Neuroscience of Positive Thinking & RAS",
      "tagline": "How optimistic thoughts physically rewire your brain to filter in success and prosperity.",
      "intro": "Optimism is not just a feel-good attitude; it is a cognitive strategy. Neurological science proves that our dominant thoughts physically shape our neural pathways through neuroplasticity. By training your mind to focus on solutions, you program your brain's filter to work for you.",
      "author": "Devendra Sharma",
      "date": "May 28, 2026",
      "readTime": "5 mins read",
      "course": "Positive Thinking",
      "image": "/src/assets/water_energizing.png",
      "quote": "Your brain is a filter. What you look for is exactly what you will find.",
      "sections": [
        {
          "heading": "1. The Brain's Gatekeeper: The RAS",
          "paragraphs": [
            "Every second, your brain is bombarded with millions of bits of sensory information. The Reticular Activating System (RAS) filters out 99% of it, letting in only what it deems important.",
            "If you focus on problems, your RAS filters in more problems. If you focus on your Widely Important Goals, your RAS filters in solutions and lucky opportunities."
          ]
        },
        {
          "heading": "2. Rewriting Your Inner Narrative",
          "paragraphs": [
            "The most effective way to guide your RAS is through an Identity Notebook. Writing down your goals as if they are already achieved teaches your brain to recognize them as important.",
            "This simple habit rewires neural networks, boosting confidence and prompting creative action."
          ]
        }
      ],
      "technique": {
        "title": "Daily Vision & Gratitude Journaling",
        "steps": [
          "Every morning, write down 5 things you are deeply grateful for.",
          "Write 3 goals for the future in the present tense (e.g., \"I am so happy that...\").",
          "Spend 2 minutes visualizing the feeling of achieving these goals."
        ]
      },
      "conclusion": "Positive thinking is the alignment of mind, emotion, and brain biology. When these three are synchronized, success becomes inevitable."
    }
  ],
  contacts: [],
};

// Local storage caching helpers for instant load (Stale-While-Revalidate UX pattern)
const safeJsonParse = (value, fallback) => {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export const getCollection = (collName) => {
  if (typeof window === 'undefined') return DEFAULT_CONTENT[collName] || [];
  const local = window.localStorage.getItem(STORAGE_KEYS[collName]);
  if (!local) {
    window.localStorage.setItem(STORAGE_KEYS[collName], JSON.stringify(DEFAULT_CONTENT[collName] || []));
    return DEFAULT_CONTENT[collName] || [];
  }
  return safeJsonParse(local, DEFAULT_CONTENT[collName] || []);
};

export const saveCollection = async (collName, items) => {
  // Update local storage synchronously so the user feels instant snappiness
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEYS[collName], JSON.stringify(items));
    window.dispatchEvent(new Event(CONTENT_UPDATED_EVENT));
  }
};

export const resetCollection = async (collName) => {
  await saveCollection(collName, DEFAULT_CONTENT[collName] || []);
};

export const useAdminContent = (collName) => {
  const [items, setItems] = useState(() => getCollection(collName));

  useEffect(() => {
    // Keep local storage event sync (in case other tabs update local storage)
    const syncLocal = () => {
      setItems(getCollection(collName));
    };
    window.addEventListener(CONTENT_UPDATED_EVENT, syncLocal);
    window.addEventListener('storage', syncLocal);

    return () => {
      window.removeEventListener(CONTENT_UPDATED_EVENT, syncLocal);
      window.removeEventListener('storage', syncLocal);
    };
  }, [collName]);

  return items;
};

// Legacy auth status checks for backward compatibility
export const getAdminAccount = () => {
  if (typeof window === 'undefined') return null;
  return safeJsonParse(window.localStorage.getItem('t360_v3_account'), null);
};

export const saveAdminAccount = (account) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('t360_v3_account', JSON.stringify(account));
  }
};

export const isAdminLoggedIn = () => {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem('t360_v3_session') === 'active';
};

export const setAdminSession = (isActive) => {
  if (typeof window !== 'undefined') {
    if (isActive) {
      window.localStorage.setItem('t360_v3_session', 'active');
    } else {
      window.localStorage.removeItem('t360_v3_session');
    }
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
      sections: [],
      technique: {
        title: '',
        steps: [],
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
