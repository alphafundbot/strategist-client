require('firebase-admin').initializeApp();
const db = require('firebase-admin').firestore();

const docPath = 'telemetry/ROIWidget/feed/mock';
const payload = {
  timestamp: Date.now(),
  strategistTier: "Advisor",
  roiValue: parseFloat((Math.random() * 15).toFixed(2)),
  signalStrength: "medium",
  injectedBy: "protoTyper"
};

db.doc(docPath).set(payload)
  .then(() => {
    console.log("✅ ROI telemetry pulse injected to Firestore.");
    console.log(JSON.stringify(payload, null, 2));
  })
  .catch((error) => {
    console.error("Error injecting ROI telemetry:", error);
  });