import { NextRequest, NextResponse } from 'next/server';
import { generateProjectsWithClaude } from '@/lib/claude';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { agencyType, clientNiches, revenueRange, currentServices, techStack, painPoints, goals } = body;

    // Validate required fields
    if (!agencyType || !clientNiches || !revenueRange || !currentServices || !painPoints || !goals) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await generateProjectsWithClaude({
      agencyType,
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