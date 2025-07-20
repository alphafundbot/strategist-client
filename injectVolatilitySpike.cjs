require('firebase-admin').initializeApp();
const db = require('firebase-admin').firestore();

const mutations = Array.from({ length: 12 }).map((_, idx) => ({
  mutationType: `volatility-test-${idx}`,
  mutationDetail: `Synthetic mutation event ${idx}`,
  confidenceLevel: ["low", "medium", "high"][idx % 3],
  strategistTier: "Advisor",
  timestamp: Date.now() - Math.floor(Math.random() * 4 * 60 * 1000), // within 4 mins
  injectedBy: "volatilitySpike"
}));

const batch = db.batch();
mutations.forEach((m, i) => {
  const ref = db.collection("telemetry/MutationFeed/stream").doc(`spike-${Date.now()}-${i}`);
  batch.set(ref, m);
});

batch.commit().then(() => {
  console.log(`✅ Injected ${mutations.length} spike mutations`);
});