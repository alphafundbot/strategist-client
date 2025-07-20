require('firebase-admin').initializeApp();

async function testTyperBootstrap() {
  const db = require('firebase-admin').firestore();
  const ref = db.collection('system/protoTyper/wireframe');

  const testWireframe = {
    name: "AlphaVision Dashboard",
    components: ["Sidebar", "ROIWidget", "MutationFeed"],
    lastUpdated: Date.now(),
  };

  await ref.doc("test").set(testWireframe);
  console.log(JSON.stringify({
    status: "wireframe injected",
    documentId: "test",
    components: testWireframe.components,
    lastUpdated: new Date(testWireframe.lastUpdated).toISOString()
  }, null, 2));
}

testTyperBootstrap();