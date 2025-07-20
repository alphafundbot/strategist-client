import * as admin from "firebase-admin";
import { GenerativeModel } from "@google-cloud/vertexai";

const model = new GenerativeModel({
  model: "gemini-1.5-pro",
  project: "kasik-alpha-trade",
  location: "us-central1",
});

export async function narrateAndWrite(uid: string, mutationId: string, payload: {
  strategyName: string;
  fillRate: number;
  signalEntropy: number;
  venueLatency: number;
}) {
  const prompt = `Narrate strategic clarity and mutation efficiency for strategy ${payload.strategyName}: fillRate=${payload.fillRate}, signalEntropy=${payload.signalEntropy}, venueLatency=${payload.venueLatency}ms.`

  const response = await model.generateContent(prompt);
  const narration = response.text;

  await admin
    .firestore()
    .collection("mutations")
    .doc(mutationId)
    .set({ narration, updatedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });

  console.log(`Narration saved for mutation ${mutationId}`);
}