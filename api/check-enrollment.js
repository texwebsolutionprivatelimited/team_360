import { getAdminDb } from './firebase-admin.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userId, userEmail, courseId } = req.body || {};

  if (!courseId || (!userId && !userEmail)) {
    return res.status(400).json({ error: 'Missing courseId or user identifier.' });
  }

  try {
    const db = getAdminDb();
    const purchases = db.collection('purchases');
    const normalizedEmail = userEmail ? String(userEmail).toLowerCase().trim() : '';

    if (normalizedEmail) {
      const emailSnap = await purchases
        .where('courseId', '==', String(courseId))
        .where('userEmail', '==', normalizedEmail)
        .limit(1)
        .get();

      if (!emailSnap.empty) {
        return res.status(200).json({ enrolled: true });
      }
    }

    if (userId) {
      const userSnap = await purchases
        .where('courseId', '==', String(courseId))
        .where('userId', '==', String(userId))
        .limit(1)
        .get();

      if (!userSnap.empty) {
        return res.status(200).json({ enrolled: true });
      }
    }

    return res.status(200).json({ enrolled: false });
  } catch (error) {
    console.error('Error checking enrollment:', error);
    return res.status(500).json({ error: error.message || 'Failed to check enrollment.' });
  }
}
