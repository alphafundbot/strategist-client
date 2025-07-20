// studio/narration/syncNarration.ts
import { getFirestore } from 'firebase-admin/firestore'; // Corrected import

export async function syncNarrationStatus() {
  const db = getFirestore();
  const ref = db.doc("system/narration/status");

  await ref.set({
    lastNarratedAt: Date.now(),
    tier: "Advisor",
    wireframe: "test",
    boundComponents: ["Sidebar"],
    missingComponents: ["ROIWidget", "MutationFeed"],
    summary: "Narration completed with partial component binding under Advisor tier."
  });

  console.log("✅ Narration status synced to Firestore.");
}