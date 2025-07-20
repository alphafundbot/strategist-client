require('firebase-admin').initializeApp();

async function runMutationController() {
  const db = require('firebase-admin').firestore();
  const config = await db.doc('system/typerConfig').get();
  // Corrected path to the wireframe document
  const wireframe = await db.doc('system/protoTyper/wireframe/test').get();

  const modules = wireframe.get('components') || [];
  const bound = config.get('components') || {};

  const activeModules = modules.filter(m => bound[m]?.status === 'bound');

  // Corrected path to the mutationController status document
  await db.doc('system/mutationController/status/current_status').set({
    lastActivatedAt: Date.now(),
    activeModules,
    strategistTier: config.get('strategistTier') || 'Observer',
    sourceWireframe: config.get('activeWireframe')
  });

  console.log(`✅ mutationController activated: ${activeModules.join(', ')}`);
}

runMutationController();