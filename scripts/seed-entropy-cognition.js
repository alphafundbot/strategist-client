// scripts/seed-entropy-cognition.js

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK (replace with your service account key path)
// Ensure GOOGLE_APPLICATION_CREDENTIALS environment variable is set, or provide the path here
if (!admin.apps.length) {
  admin.initializeApp({
    // credential: admin.credential.applicationDefault(),
    // projectId: 'YOUR_PROJECT_ID', // Replace with your project ID if not using GOOGLE_APPLICATION_CREDENTIALS
  });
}

const db = admin.firestore();

async function seedData() {
  const batch = db.batch();
  const userId = 'mockUserId'; // Replace with a test user ID

  // Seed Risk Metrics
  const riskRefAAPL = db.collection('entropyMetrics').doc('risk').collection('latest').doc('AAPL');
  batch.set(riskRefAAPL, { value: 0.84, timestamp: new Date('2025-07-20T19:00:00Z').getTime() });

  const riskRefBTC = db.collection('entropyMetrics').doc('risk').collection('latest').doc('BTC');
  batch.set(riskRefBTC, { value: 0.91, timestamp: new Date('2025-07-20T19:00:00Z').getTime() });

  const riskRefTSLA = db.collection('entropyMetrics').doc('risk').collection('latest').doc('TSLA');
  batch.set(riskRefTSLA, { value: 0.75, timestamp: new Date('2025-07-20T19:00:00Z').getTime() });

  // Seed Volatility Metrics
  const volatilityRefAAPL = db.collection('entropyMetrics').doc('volatility').collection('latest').doc('AAPL');
  batch.set(volatilityRefAAPL, { ewma: 0.62, stdDev: 0.81, timestamp: new Date('2025-07-20T19:00:00Z').getTime() });

  const volatilityRefBTC = db.collection('entropyMetrics').doc('volatility').collection('latest').doc('BTC');
  batch.set(volatilityRefBTC, { ewma: 0.78, stdDev: 0.95, timestamp: new Date('2025-07-20T19:00:00Z').getTime() });

  const volatilityRefTSLA = db.collection('entropyMetrics').doc('volatility').collection('latest').doc('TSLA');
  batch.set(volatilityRefTSLA, { ewma: 0.55, stdDev: 0.72, timestamp: new Date('2025-07-20T19:00:00Z').getTime() });

  // Seed Liquidity Metrics
  const liquidityRefBTCUSD = db.collection('entropyMetrics').doc('liquidity').collection('latest').doc('BTC_USD'); // Corrected
  batch.set(liquidityRefBTCUSD, { spread: 0.0021, volume: 930000, timestamp: new Date('2025-07-20T19:00:00Z').getTime() });

  const liquidityRefETHUSDT = db.collection('entropyMetrics').doc('liquidity').collection('latest').doc('ETH_USDT'); // Corrected
  batch.set(liquidityRefETHUSDT, { spread: 0.0015, volume: 1200000, timestamp: new Date('2025-07-20T19:00:00Z').getTime() });

  // Seed Cognition Logs
  const cognitionLogRef1 = db.collection('geminiLogs').doc(userId).collection('entries').doc();
  batch.set(cognitionLogRef1, {
    epoch: '26',
    prompt: 'How can mutation bias be leveraged?',
    response: 'By embedding risk stratification within liquidity thresholds.',
    mutations: ['liquidity-trace', 'mutation-bias-adjust'],
    braidId: 'braid_alpha',
    timestamp: 1721482800000,
  });

   const cognitionLogRef2 = db.collection('geminiLogs').doc(userId).collection('entries').doc();
  batch.set(cognitionLogRef2, {
    epoch: '25',
    prompt: 'Analyze recent market volatility.',
    response: 'Identified elevated volatility in tech stocks.',
    mutations: ['volatility-analysis'],
    braidId: 'braid_beta',
    timestamp: Date.now() - 60000, // 1 minute ago
  });

  try {
    await batch.commit();
    console.log('✅ Firestore seeded successfully!');
  } catch (error) {
    console.error('Error seeding Firestore:', error);
  }
}

seedData();
