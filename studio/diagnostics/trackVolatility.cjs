const { exec } = require('child_process');
require('firebase-admin').initializeApp();
const db = require('firebase-admin').firestore();

const WINDOW_MS = 5 * 60 * 1000;
const now = Date.now();
const cutoff = now - WINDOW_MS;

db.collection('telemetry/MutationFeed/stream').get().then((snap) => {
  const recentMutations = snap.docs
    .map(doc => doc.data())
    .filter(m => m.timestamp >= cutoff);

  const volatility = recentMutations.length;

  console.log(`⚡ Mutation Volatility in last ${WINDOW_MS / 60000} mins: ${volatility}`);

  if (volatility >= 10) {
    console.log("📽️ High volatility detected — launching narration replay...");
    exec('node studio/narration/replayNarration.js', (err, stdout, stderr) => {
      if (err) {
        console.error("❌ Narration replay failed:", err);
      } else {
        console.log(stdout);
      }
    });

    const logPayload = {
      triggeredAt: now,
      volatilityLevel: volatility,
      replayTriggered: true,
      windowMs: WINDOW_MS,
      mutationsReviewed: recentMutations.map(m => m.mutationType)
    };

    // Corrected collection path for logging
    db.collection('mutationVolatilityLogs').add(logPayload)
      .then(() => {
        console.log("✅ Spike response logged to Firestore.");
      })
      .catch((error) => {
        console.error("❌ Failed to log spike response:", error);
      });
  }

  return db.doc('system/diagnostics/mutationVolatility/current').set({
    timestamp: now,
    volatility,
    windowMs: WINDOW_MS
  });
});