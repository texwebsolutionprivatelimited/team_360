import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import crypto from 'crypto';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyCEp45xgfqFqD55c6shvxO7_jxymXjHDts",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "ddsharma-3befe.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "ddsharma-3befe",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "ddsharma-3befe.firebasestorage.app",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "452928596721",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:452928596721:web:5f5423d5f540a3b7825750",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { 
    razorpay_payment_id, 
    razorpay_order_id, 
    razorpay_signature,
    userId,
    userName,
    userEmail,
    courseId,
    amount
  } = req.body;

  const secret = process.env.RAZORPAY_KEY_SECRET || process.env.VITE_RAZORPAY_KEY_SECRET || "9tP138vy6JBPMmWaCR74jJVG";
  if (!secret) {
    return res.status(500).json({ error: 'Razorpay Secret Key not configured on server.' });
  }

  // 1. Verify Razorpay Signature
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
  const generatedSignature = hmac.digest('hex');

  if (generatedSignature !== razorpay_signature) {
    return res.status(400).json({ error: 'Payment signature verification failed. Invalid transaction.' });
  }

  // 2. Save Purchase to Firestore
  try {
    const purchaseId = `purchase-${Date.now()}`;
    const purchaseDoc = {
      id: purchaseId,
      userId: userId || 'unknown',
      userName: userName || 'unknown',
      userEmail: userEmail ? userEmail.toLowerCase() : '',
      courseId: courseId || '',
      amount: Number(amount) || 0,
      paymentId: razorpay_payment_id,
      date: new Date().toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
      }),
      status: 'completed'
    };

    // Save to Firestore purchases
    await setDoc(doc(db, 'purchases', purchaseId), purchaseDoc);

    return res.status(200).json({ success: true, purchase: purchaseDoc });
  } catch (error) {
    console.error('Error saving purchase to Firestore:', error);
    return res.status(500).json({ error: 'Payment verified, but failed to save enrollment. Please contact support.' });
  }
}
