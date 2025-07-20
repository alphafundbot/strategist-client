require('firebase-admin').initializeApp();
const db = require('firebase-admin').firestore();

const docPath = 'telemetry/MutationFeed/stream/mock';
const payload = {
  timestamp: Date.now(),
  strategistTier: "Advisor",
  mutationType: "strategy-adjustment",
  mutationDetail: "Adjusted portfolio volatility threshold to 0.8",
  confidenceLevel: "high",
  injectedBy: "protoTyper"
};

db.doc(docPath).set(payload)
  .then(() => {
    console.log("✅ MutationFeed telemetry pulse injected to Firestore.");
    console.log(JSON.stringify(payload, null, 2));
  })
  .catch((error) => {
    console.error("Error injecting MutationFeed telemetry:", error);
  });