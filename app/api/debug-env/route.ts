import { NextResponse } from 'next/server';

export async function GET() {
  // Get all env vars (masked except first few chars)
  const envVars: Record<string, string> = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value && key.toLowerCase().includes('key')) {
      envVars[key] = value.substring(0, 8) + '...' + value.substring(value.length - 4);
    } else if (value) {
      envVars[key] = value;
    }
  }
  
  return NextResponse.json({
    apiKeyPresent: !!process.env.ANTHROPIC_API_KEY,
    allEnvKeys: Object.keys(process.env).filter(k => k.toLowerCase().includes('key')),
    nodeEnv: process.env.NODE_ENV,
    railwayVars: envVars,
  });
}