import { useEffect, useState } from 'react';

export const CONTENT_UPDATED_EVENT = 't360-content-updated-v5';

const STORAGE_KEYS = {
  courses: 't360_v9_courses',
  products: 't360_v5_products',
  blogs: 't360_v5_blogs',
  contacts: 't360_v5_contacts',
};

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
        "Healing Power (शरीर की बीमारियों को ठीक करने की क्षमता - डॉक्टर की सलाह जरूरी)",
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
        {
          "q": "What is the program fee?",
          "a": "The total investment is ₹11,800."
        },
        {
          "q": "What are the bonuses included?",
          "a": "Bonuses include: Powerful Video Series (Value ₹5,500), 9 Energy Awakening Video Series (Value ₹5,000), 30 Days Mentorship, and Monthly Meditation Sessions."
        }
      ],
      "image": "/signature_program_art.png"
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
        {
          "q": "What is the training investment?",
          "a": "The total training investment is ₹59,000."
        },
        {
          "q": "Can I do this part-time or full-time?",
          "a": "Yes, certified trainers can work either part-time or full-time, with potential earnings of ₹1.5 to ₹5 Lakhs per month."
        }
      ],
      "image": "/gayatri_sun.png"
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
        {
          "q": "What is the program investment?",
          "a": "The total investment is ₹1,18,000 (₹1,00,000 program fee + ₹18,000 GST)."
        },
        {
          "q": "Will I get authorized to give Diksha?",
          "a": "Yes, this program includes official authorization and the process of giving Gayatri Diksha."
        }
      ],
      "image": "/gayatri_mentorship_art.png"
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
        {
          "q": "What career opportunities are available after completion?",
          "a": "Graduates can work as certified Mentors, Trainers, operate Authorized Centers, and conduct workshops globally."
        },
        {
          "q": "What is the program fee?",
          "a": "The program fee is ₹2,00,000 + 18% GST (₹36,000), making the total investment ₹2,36,000."
        }
      ],
      "image": "/pranayama_breath.png"
    },
    {
      "id": "quantum-jump",
      "title": "Quantum Jump (Miracles of Gayatri Energy)",
      "subtitle": "5 Days Recorded Session (1.5 Hours/Day)",
      "category": "Gayatri Sadhana & Mentorship",
      "duration": "5 Days Recorded Course",
      "type": "Recorded Session",
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
        {
          "q": "What is the course investment?",
          "a": "The investment is ₹30,000 + 18% GST (₹5,400), making a total of ₹35,400."
        },
        {
          "q": "How do I purchase the recorded sessions?",
          "a": "Click the register button to connect with our team on WhatsApp. Once payment is confirmed, you will receive lifetime access to the recordings."
        }
      ],
      "image": "/quantum_jump_gayatri.png"
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
      "tagline": "Unleash your mind's true capability through Gayatri Science brain reconditioning.",
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
      "description": "A collection of profound spiritual discourses explaining Gayatri Science wisdom, self-realization, and the science of consciousness in simple, daily language.",
      "amazonLink": "https://amzn.in/d/08wEvQab",
      "badge": "Life Transformation",
      "badgeColor": "bg-amber-100 text-amber-700",
      "tagline": "Ancient Gayatri Science wisdom and self-realization decoded in simple language.",
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
      "image": "/gayatri_sun.png",
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
      "image": "/subconscious_mind_alpha.png",
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
      "image": "/shree_vidya_mandala.png",
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
      "image": "/water_energizing.png",
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
  return safeJsonParse(window.localStorage.getItem('t360_v5_account'), null);
};

export const saveAdminAccount = (account) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('t360_v5_account', JSON.stringify(account));
  }
};

export const isAdminLoggedIn = () => {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem('t360_v5_session') === 'active';
};

export const setAdminSession = (isActive) => {
  if (typeof window !== 'undefined') {
    if (isActive) {
      window.localStorage.setItem('t360_v5_session', 'active');
    } else {
      window.localStorage.removeItem('t360_v5_session');
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
