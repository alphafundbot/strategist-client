require('firebase-admin').initializeApp();
const db = require('firebase-admin').firestore();

db.doc('system/protoTyper/status/current').get().then((d) => {
  if (!d.exists) {
    console.log(JSON.stringify({ error: 'status document not found' }));
    return;
  }
  console.log(
    JSON.stringify(
      {
        engineStatus: d.get('engineStatus'),
        modules: d.get('modules'),
        lastCompiledAt: d.get('lastCompiledAt')?.toDate().toISOString(),
        stalledModules: d.get('stalledModules'),
      },
      null,
      2
    )
  );
});