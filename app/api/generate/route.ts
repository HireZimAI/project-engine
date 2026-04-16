import { NextRequest, NextResponse } from 'next/server';
import { generateProjectsWithClaude } from '@/lib/claude';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Updated input (April 2026): agencyType removed - inferred from services
    const { clientNiches, revenueRange, currentServices, techStack, painPoints, goals } = body;

    // Validate required fields
    if (!clientNiches || !revenueRange || !currentServices || !painPoints || !goals) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await generateProjectsWithClaude({
      clientNiches,
      revenueRange,
      currentServices,
      techStack,
      painPoints,
      goals
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate projects' },
      { status: 500 }
    );
  }
}