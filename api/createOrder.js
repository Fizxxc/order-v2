import { initializeApp } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { getAuth } from 'firebase-admin/auth';
import { onRequest } from 'firebase-functions/v2/https';
import { getApps, cert } from 'firebase-admin/app';

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // Private key harus di-replace newline-nya dari literal "\n" jadi actual newline
  privateKey: process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined,
};

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
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
