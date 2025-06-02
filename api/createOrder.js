import { initializeApp } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { getAuth } from 'firebase-admin/auth';
import { onRequest } from 'firebase-functions/v2/https';
import { getApps, cert } from 'firebase-admin/app';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    databaseURL: "https://YOUR_PROJECT.firebaseio.com"
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end("Only POST allowed");
  const { uid, nama, pesanan } = req.body;

  const db = getDatabase();
  const ref = db.ref('antrian');
  const newRef = ref.push();
  await newRef.set({ uid, nama, pesanan, status: 'menunggu', waktu: Date.now() });

  res.status(200).json({ success: true, id: newRef.key });
}
