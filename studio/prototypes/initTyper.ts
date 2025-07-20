// studio/prototypes/initTyper.ts
import { getFirestore } from 'firebase-admin';

export async function testTyperBootstrap() {
  const db = getFirestore();
  const ref = db.collection('system/protoTyper/wireframe');

  const testWireframe = {
    name: "AlphaVision Dashboard",
    components: ["Sidebar", "ROIWidget", "MutationFeed"],
    lastUpdated: Date.now(),
  };

  await ref.doc("test").set(testWireframe);
  console.log("✅ Wireframe test injected");
}
