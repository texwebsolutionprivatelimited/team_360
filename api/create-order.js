import crypto from 'crypto';

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

  const { courseId, amount } = req.body;
  
  if (!courseId || !amount) {
    return res.status(400).json({ error: 'Missing courseId or amount' });
  }

  const keyId = process.env.VITE_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET || process.env.VITE_RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return res.status(500).json({ error: 'Razorpay API credentials not configured on server.' });
  }

  try {
    const finalAmount = Math.round(Number(amount) * 100); // in paisa

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(keyId + ':' + keySecret).toString('base64')
      },
      body: JSON.stringify({
        amount: finalAmount,
        currency: 'INR',
        receipt: `receipt_${courseId}_${Date.now()}`
      })
    });

    const orderData = await response.json();
    if (!response.ok) {
      throw new Error(orderData.error?.description || 'Failed to create order via Razorpay API');
    }

    return res.status(200).json({ orderId: orderData.id });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({ error: error.message });
  }
}
