import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    apiKeyPresent: !!process.env.ANTHROPIC_API_KEY,
    apiKeyPrefix: process.env.ANTHROPIC_API_KEY?.substring(0, 10) || 'NONE',
    nodeEnv: process.env.NODE_ENV,
  });
}