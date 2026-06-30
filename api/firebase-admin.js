import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const parseServiceAccount = () => {
  const raw =
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY ||
    process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

  if (!raw) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not configured.');
  }

  const json = raw.trim().startsWith('{')
    ? raw
    : Buffer.from(raw, 'base64').toString('utf8');

  const serviceAccount = JSON.parse(json);

  if (serviceAccount.private_key) {
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
  }

  return serviceAccount;
};

export const getAdminDb = () => {
  if (!getApps().length) {
    initializeApp({
      credential: cert(parseServiceAccount()),
    });
  }

  return getFirestore();
};
