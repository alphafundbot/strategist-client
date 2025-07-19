
'use server';

import { adminAuth } from './admin';

export async function createCustomToken(uid: string, claims = {}) {
  // Optionally attach custom claims:
  // await adminAuth.setCustomUserClaims(uid, { strategist: true });
  return adminAuth.createCustomToken(uid, claims);
}
