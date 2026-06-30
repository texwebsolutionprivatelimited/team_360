import crypto from 'crypto';
import { getAdminDb } from './firebase-admin.js';

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

  const secret = process.env.RAZORPAY_KEY_SECRET;
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

    const db = getAdminDb();
    await db.collection('purchases').doc(purchaseId).set(purchaseDoc);

    return res.status(200).json({ success: true, purchase: purchaseDoc });
  } catch (error) {
    console.error('Error saving purchase to Firestore:', error);
    return res.status(500).json({ 
      error: `Payment verified, but failed to save enrollment. Error: ${error.message || error}. Please contact support.` 
    });
  }
}
