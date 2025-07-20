require('firebase-admin').initializeApp();
const db = require('firebase-admin').firestore();

const docPath = 'system/typerConfig';
const initialConfig = {
  "activeWireframe": "test",
  "components": {
    "Sidebar": {
      "status": "bound",
      "path": "src/components/layout/sidebar.tsx"
    },
    "ROIWidget": {
      "status": "missing"
    },
    "MutationFeed": {
      "status": "missing"
    }
  },
  "lastSyncedAt": new Date("2025-07-20T17:25:41.000Z") // Use Date object for timestamp
};

db.doc(docPath).set(initialConfig) // Use set to create the document if it doesn't exist
  .then(() => {
    console.log("✅ typerConfig document ensured to exist.");
    return db.doc(docPath).update({ // Then update the tier
      strategistTier: "Advisor"
    });
  })
  .then(() => {
    console.log("✅ strategistTier updated to Advisor in Firestore.");
  })
  .catch((error) => {
    console.error("Error updating strategistTier:", error);
  });