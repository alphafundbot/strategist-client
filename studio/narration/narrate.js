// narrate.ts
import { getFirestore } from 'firebase-admin/firestore'; // Corrected import
export async function runNarration() {
    const db = getFirestore();
    const configSnap = await db.doc('system/typerConfig').get();
    const config = configSnap.data(); // Type assertion
    if (!config) {
        console.error("⚠️ typerConfig not found.");
        return;
    }
    console.log(`🎙️ Narrating interface for tier: ${config.strategistTier}`);
    console.log(`📎 Active wireframe: ${config.activeWireframe}`);
    console.log(`🧠 Components loaded:`);
    if (config.components) { // Added check
        Object.entries(config.components).forEach(([name, meta]) => {
            const status = meta.status === "bound" ? "✅ Bound" : "⚠️ Missing";
            console.log(`  • ${name} → ${status}`);
        });
    }
}
