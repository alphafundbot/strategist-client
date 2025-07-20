require('firebase-admin').initializeApp();
const db = require('firebase-admin').firestore();

const docPath = 'system/mutationController/status/current_status';
const payload = {
  lastActivatedAt: Date.now(),
  activeModules: ["Sidebar"],
  strategistTier: "Observer",
  sourceWireframe: "test"
};

db.doc(docPath).get().then((d) => {
  if (d.exists) {
    const data = d.data();
    console.log(JSON.stringify(Object.keys(data).reduce((acc, key) => {
      acc[key] = typeof data[key];
      if (data[key] instanceof Date) {
        acc[key] = 'Date';
      } else if (Array.isArray(data[key])) {
        acc[key] = 'Array';
      }
      return acc;
    }, {}), null, 2));
  } else {
    db.doc(docPath).set(payload).then(() => {
      console.log(JSON.stringify(payload, null, 2));
    }).catch((error) => {
      console.error("Error creating document:", error);
    });
  }
}).catch((error) => {
  console.error("Error fetching document:", error);
});