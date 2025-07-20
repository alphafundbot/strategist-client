import { NextResponse } from 'next/server';
import { runEpochPrompt } from '@/lib/vertex';
import { getUserTier } from '@/lib/auth'; // your existing tier‐lookup
import admin from 'firebase-admin';

// Initialize admin if not already
if (!admin.apps.length) {
  admin.initializeApp();
}
const dbAdmin = admin.firestore();

export async function POST(request: Request) {
  const { userId, input } = await request.json();
  const tier = await getUserTier(userId);

  if (tier === 'Observer') {
    return NextResponse.json(
      { error: 'Upgrade to Advisor to run Epoch-25 synthesis.' },
      { status: 403 }
    );
  }

  // Execute the prompt
  const result = await runEpochPrompt(input);

  // Audit-trail write
  await dbAdmin.collection('epochRuns').add({
    userId,
    tier,
    input,
    result,
    timestamp: Date.now(),
  });

  return NextResponse.json({ result });
}
