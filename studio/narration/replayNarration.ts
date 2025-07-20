import { getFirestore } from 'firebase-admin/firestore'; // Corrected import

export async function replayNarration() {
  const db = getFirestore();
  const ref = db.collection('telemetry/MutationFeed/stream'); // Use collection method on db instance

  const snap = await ref.get(); // Use get method on collection reference
  const mutations = snap.docs
    .map(doc => doc.data())
    .sort((a, b) => a.timestamp - b.timestamp); // Sort chronologically

  console.log(`📽️ Strategist Cockpit Replay
`);

  mutations.forEach((m, i) => {
    console.log(`🔁 [${i + 1}] ${new Date(m.timestamp).toLocaleTimeString()}`);
    console.log(`• Type: ${m.mutationType}`);
    console.log(`• Detail: ${m.mutationDetail}`);
    console.log(`• Confidence: ${m.confidenceLevel}`);
    console.log(`• Tier: ${m.strategistTier}`);
    console.log('');
  });

  console.log(`✅ Replay complete. Total mutations: ${mutations.length}`);
}