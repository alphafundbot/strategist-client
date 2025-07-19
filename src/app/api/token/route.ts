
import { NextRequest, NextResponse } from 'next/server';
import { createCustomToken } from '@/lib/auth-actions';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const uid = searchParams.get('uid')

  if (!uid) {
    return NextResponse.json({ error: 'Missing uid' }, { status: 400 });
  }

  try {
    const token = await createCustomToken(uid);
    return NextResponse.json({ token });
  } catch (e) {
    const error = e as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
