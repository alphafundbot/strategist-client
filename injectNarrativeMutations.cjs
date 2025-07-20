require('firebase-admin').initializeApp();
const db = require('firebase-admin').firestore();

const mutations = [
  {
    mutationType: "risk-threshold",
    mutationDetail: "Lowered compliance threshold for Tier-II anomalies",
    confidenceLevel: "medium"
  },
  {
    mutationType: "portfolio-rebalance",
    mutationDetail: "Shifted asset weight from equities to futures",
    confidenceLevel: "high"
  },
  {
    mutationType: "alert-calibration",
    mutationDetail: "Muted volatility spike alerts under 0.6 threshold",
    confidenceLevel: "low"
  }
].map((payload, idx) => ({
  ...payload,
  timestamp: Date.now() + idx * 1000,
  strategistTier: "Advisor",
  injectedBy: "protoTyper"
}));

async function injectMutations() {
  const collectionRef = db.collection('telemetry/MutationFeed/stream');

  for (const mutation of mutations) {
    await collectionRef.add(mutation);
    console.log("✅ Injected mutation:", mutation.mutationType);
  }
  console.log("✅ Batch mutation injection complete.");
}

injectMutations();