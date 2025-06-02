import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

// Baca dari env (pastikan di set di Vercel atau servermu)
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
  if (req.method !== 'GET') return res.status(405).end('Only GET allowed');

  try {
    const db = getDatabase();
    const ref = db.ref('antrian');

    const snapshot = await ref.once('value');
    const data = snapshot.val() || {};

    const list = Object.entries(data).map(([id, item]) => ({
      id,
      ...item,
    }));

    list.sort((a, b) => a.waktu - b.waktu);

    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch queue', detail: error.message });
  }
}
