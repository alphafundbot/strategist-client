// scripts/seed-historical-entropy.js
const admin = require('firebase-admin');
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin SDK (replace with your service account key path if not using GOOGLE_APPLICATION_CREDENTIALS)
// Ensure GOOGLE_APPLICATION_CREDENTIALS environment variable is set, or provide the path here
// if (!admin.apps.length) {
//   initializeApp({ credential: applicationDefault() });
// }

// Use applicationDefault() if GOOGLE_APPLICATION_CREDENTIALS is set
// Or explicitly provide serviceAccount:
// const serviceAccount = require('./path/to/your/serviceAccountKey.json');
// initializeApp({ credential: admin.credential.cert(serviceAccount) });

// Initialize if not already initialized
if (!admin.apps.length) {
    initializeApp({ credential: applicationDefault() });
}

const db = getFirestore();

const volatilityArchive = [
  {
    asset: 'AAPL',
    timestamp: 1721479200000,
    ewma: 0.68,
    stdDev: 0.72,
    value: 0.75,
  },
  {
    asset: 'TSLA',
    timestamp: 1721482800000,
    ewma: 0.54,
    stdDev: 0.88,
    value: 0.82,
  },
  {
    asset: 'BTC',
    timestamp: 1721486400000,
    ewma: 0.77,
    stdDev: 0.91,
    value: 0.86,
  },
];

async function seedVolatility() {
  const batch = db.batch();
  
  // Access collection and doc methods directly on the db object
  const archiveRef = db.collection('entropyMetrics').doc('volatility').collection('archive');

  for (const entry of volatilityArchive) {
    // Access doc method on the collection reference
    const docRef = archiveRef.doc(`${entry.asset}_${entry.timestamp}`);
    batch.set(docRef, entry);
  }

  await batch.commit();
  console.log('✅ Volatility archive seeded successfully!');
}

seedVolatility().catch(console.error);
