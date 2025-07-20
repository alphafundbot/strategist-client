import { NextResponse } from 'next/server';
import { runEpoch26 } from '@/lib/vertex';
import { getUserTier } from '@/lib/auth';
import admin from 'firebase-admin';

if (!admin.apps.length) admin.initializeApp();
const db = admin.firestore();

export async function POST(request: Request) {
  const { userId, input } = await request.json();
  const tier = await getUserTier(userId);

  if (tier === 'Observer')
    return new NextResponse('Upgrade to Advisor for Epoch-26', {
      status: 403,
    });

  const result = await runEpoch26(input);
  // Audit log
  await db.collection('epoch26Runs').add({
    userId,
    tier,
    input,
    result,
    timestamp: Date.now(),
  });

  return NextResponse.json({ result });
}
