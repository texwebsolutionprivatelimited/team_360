import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Helper to get settings from localStorage
const getStoredSettings = () => {
  if (typeof window === 'undefined') return null;
  try {
    const saved = window.localStorage.getItem('t360_v5_settings');
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.error('Error reading settings from localStorage:', e);
    return null;
  }
};

const getFirebaseConfig = () => {
  const stored = getStoredSettings();
  if (stored && stored.firebase && stored.firebase.apiKey) {
    return stored.firebase;
  }
  
  // Fallback to Vite env variables
  if (import.meta.env.VITE_FIREBASE_API_KEY) {
    return {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };
  }
  
  // Ultimate default fallback credentials provided by user
  return {
    apiKey: "AIzaSyCEp45xgfqFqD55c6shvxO7_jxymXjHDts",
    authDomain: "ddsharma-3befe.firebaseapp.com",
    projectId: "ddsharma-3befe",
    storageBucket: "ddsharma-3befe.firebasestorage.app",
    messagingSenderId: "452928596721",
    appId: "1:452928596721:web:5f5423d5f540a3b7825750"
  };
};

const config = getFirebaseConfig();

let app = null;
let auth = null;
let db = null;
let isFirebaseEnabled = false;

if (config) {
  try {
    app = getApps().length === 0 ? initializeApp(config) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    isFirebaseEnabled = true;
    console.log('Firebase initialized successfully.');
  } catch (error) {
    console.error('Firebase initialization failed:', error);
  }
} else {
  console.log('Firebase credentials not found. Operating in local storage Demo Mode.');
}

export { auth, db, isFirebaseEnabled };
