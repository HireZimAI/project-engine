import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_KEY,
});

console.log('API Key present:', !!process.env.ANTHROPIC_API_KEY);
console.log('API Key prefix:', process.env.ANTHROPIC_API_KEY?.substring(0, 10) || 'NONE');

// Infer agency type from services (April 2026 update)
function inferAgencyType(services: string[]): string {
  const s = services.map(sv => sv.toLowerCase());
  
  if (s.includes('direct mail')) return 'Direct Mail Agency';
  if (s.includes('ctv/connected tv')) return 'CTV/Connected TV Agency';
  if (s.includes('tiktok ads')) return 'TikTok Ads Agency';
  if (s.includes('ai search/geo')) return 'AI Search/GEO Agency';
  if (s.includes('sms marketing')) return 'SMS Marketing Agency';
  if (s.includes('reputation management')) return 'Reputation Management Agency';
  if (s.includes('podcast production')) return 'Podcast Production Agency';
  if (s.includes('pr/earned media')) return 'PR/Earned Media Agency';
  if (s.includes('video production') && s.length <= 2) return 'Video Production Agency';
  if (s.includes('web design')) return 'Web Design/Development Agency';
  if (s.includes('seo') && s.includes('ppc/paid ads')) return 'SEO/PPC Agency';
  if (s.includes('social media management')) return 'Social Media Agency';
  if (s.includes('content marketing')) return 'Content Marketing Agency';
  if (s.includes('branding')) return 'Creative Agency';
  if (s.includes('analytics/reporting')) return 'Digital Marketing Agency';
  
  return 'Full-Service Agency';
}

// Sample projects as fallback (updated to 5 buckets + projectType)
const sampleProjects = {
  projects: [
    {
      name: "AI Lead Follow-Up Automation",
      bucket: "Customer Experience & Retention",
      projectType: "Internal",
      description: "Deploy AI-driven follow-up that nurtures leads through personalized email/SMS sequences.",
      problem: "Leads go cold due to slow follow-up, costing revenue.",
      scores: { revenue: 8, ease: 8, roiSpeed: 9, differentiation: 6 },
      implementation: {
        overview: "Automated lead nurture workflow in GHL with AI-generated messaging.",
        tools: ["GoHighLevel", "Make", "ChatGPT API", "Twilio"],
        steps: ["DIAGNOSE: Audit lead stages", "DESIGN: Create AI prompts", "DEPLOY: Build automation", "DEPLOY: Set lead scoring", "EXECUTE: A/B test sequences"],
        roiEstimate: "30-50% increase in lead-to-client conversion"
      }
    },
    {
      name: "AI Content Engine for E-commerce",
      bucket: "Marketing",
      projectType: "External-Resellable",
      description: "Generate SEO-optimized product descriptions and content at scale for client e-commerce stores.",
      problem: "Manual content creation too slow to scale for e-commerce clients.",
      scores: { revenue: 9, ease: 7, roiSpeed: 8, differentiation: 7 },
      implementation: {
        overview: "AI content pipeline with human editorial review, packaged as monthly tiers.",
        tools: ["ChatGPT API", "SurferSEO", "Make", "Notion"],
        steps: ["DIAGNOSE: Extract client keywords", "DESIGN: Build content prompts", "DEPLOY: Create production pipeline", "DEPLOY: Review workflow", "EXECUTE: Package service tiers"],
        roiEstimate: "$120K annual recurring at 70%+ margins"
      }
    },
    {
      name: "Automated Client Reporting",
      bucket: "Intelligence & Reporting",
      projectType: "Both",
      description: "AI-powered monthly reports with narrative insights delivered automatically to client inboxes.",
      problem: "Manual reporting consumes 5-15 hours per client monthly.",
      scores: { revenue: 6, ease: 8, roiSpeed: 9, differentiation: 7 },
      implementation: {
        overview: "Automated reporting pipeline with AI-generated insights and branded dashboards.",
        tools: ["Make", "GA4", "ChatGPT API", "Looker Studio"],
        steps: ["DIAGNOSE: Connect data sources", "DESIGN: Build AI insight prompts", "DEPLOY: Create report template", "DEPLOY: Schedule automation", "EXECUTE: Track engagement"],
        roiEstimate: "Saves 8-12 hours/month per client"
      }
    },
    {
      name: "AI Outbound Prospecting System",
      bucket: "Sales",
      projectType: "Internal",
      description: "Automated outbound system with personalized research and cold outreach at scale.",
      problem: "No consistent new business engine to double revenue.",
      scores: { revenue: 9, ease: 7, roiSpeed: 7, differentiation: 7 },
      implementation: {
        overview: "Prospect database + AI research + personalized outreach = outbound engine.",
        tools: ["Apollo.io", "ChatGPT API", "GoHighLevel", "Make"],
        steps: ["DIAGNOSE: Build prospect list", "DESIGN: AI research workflow", "DEPLOY: Email sequences", "DEPLOY: Response handling", "EXECUTE: Track metrics"],
        roiEstimate: "$30K-$60K new ARR in 6 months"
      }
    },
    {
      name: "Revenue Attribution Dashboard",
      bucket: "Intelligence & Reporting",
      projectType: "External-Resellable",
      description: "Connect SEO rankings directly to product sales and revenue outcomes for clients.",
      problem: "Clients can't see SEO-to-revenue connection, leading to budget cuts.",
      scores: { revenue: 9, ease: 5, roiSpeed: 6, differentiation: 9 },
      implementation: {
        overview: "Integrated dashboard merging SEO + e-commerce data with AI insights.",
        tools: ["Shopify", "GA4", "Looker Studio", "ChatGPT API"],
        steps: ["DIAGNOSE: Integrate store data", "DESIGN: Build unified dataset", "DEPLOY: Create dashboard", "DEPLOY: Add AI insights", "EXECUTE: Package as add-on service"],
        roiEstimate: "$96K/year at $1K/month avg"
      }
    },
    {
      name: "AI Proposal & Closing Accelerator",
      bucket: "Sales",
      projectType: "Internal",
      description: "AI-powered proposal generation that customizes pitch decks in minutes vs days.",
      problem: "Sales cycles drag because proposal creation is manual and slow.",
      scores: { revenue: 8, ease: 9, roiSpeed: 9, differentiation: 8 },
      implementation: {
        overview: "Template library + AI personalization = proposal in minutes.",
        tools: ["ChatGPT API", "Google Slides", "Make", "HubSpot"],
        steps: ["DIAGNOSE: Audit current proposal process", "DESIGN: Build template library", "DEPLOY: Create AI personalization prompts", "DEPLOY: Integrate with CRM", "EXECUTE: Track close rates"],
        roiEstimate: "50% reduction in proposal time, 20% higher close rate"
      }
    },
    {
      name: "AI Workflow Orchestration Layer",
      bucket: "Fulfillment & Operations",
      projectType: "Internal",
      description: "Central AI layer that orchestrates multiple tools into unified workflows.",
      problem: "Too many disconnected tools, manual handoffs, team overwhelmed.",
      scores: { revenue: 7, ease: 6, roiSpeed: 8, differentiation: 9 },
      implementation: {
        overview: "Unified workflow layer connecting CRM, email, ads, and reporting.",
        tools: ["Make", "GoHighLevel", "ChatGPT API", "Zapier"],
        steps: ["DIAGNOSE: Map current tool ecosystem", "DESIGN: Architect workflow connections", "DEPLOY: Build AI orchestration layer", "DEPLOY: Test handoffs", "EXECUTE: Train team"],
        roiEstimate: "10-20 hours/week saved in manual handoffs"
      }
    }
  ]
};

export async function generateProjectsWithClaude(input: {
  clientNiches: string;
  revenueRange: string;
  currentServices: string[];
  techStack: string;
  painPoints: string;
  goals: string;
}): Promise<any> {
  // Infer agency type from services (for logging/retraining)
  const inferredAgencyType = inferAgencyType(input.currentServices);
  
  const knowledgeBase = `
CURRENT HIREZIM AI TRENDS (from Pulse Meetings + Research):

1. GHL Agent Studio: New AI agent capability in GoHighLevel that enables non-deterministic workflows (context-aware, adaptive). Can replace N8N for GHL-centric projects. Currently free (will go token-based). Features: Native CRM access, conversation memory, voice AI (Retell-powered).

2. Claude Performance Issues: Recent quality degradation + faster token consumption. Workarounds: start new chats, use /compact command.

3. Local AI for Privacy: Open-source models (Google Gemma, Meta Muse) run on-premise for HIPAA/compliance clients.

4. AI as Marketing Copilot: AI builds flows, tests variations, personalizes messages at scale. Recommends triggers after spotting trends.

5. Autonomous Orchestration: Moving from scheduled workflows to self-optimizing systems that plan, execute, adjust in real time.

6. Key Use Cases: Automated reporting, anomaly detection, budget pacing, cross-client benchmarking, AI SEO, content diversification.

7. Tools Gaining: Salesforce Agentforce, HubSpot Breeze AI Agents, Canva Simtheory, Adobe Agent Orchestrator.

IMPORTANT: Use the 3DX framework for implementation steps:
- DIAGNOSE: Understand current state, pain points, gaps
- DESIGN: Architect solution, select tools, plan the build  
- DEPLOY: Execute, test, train, hand off
- EXECUTE: Ongoing optimization, scaling, iteration
`;

  const systemPrompt = `You are an AI Strategist helping marketing agencies identify high-ROI AI opportunities. Use structured thinking and prioritize business outcomes.

You have access to the HireZim AI knowledge base with recent Pulse meeting insights. When appropriate, reference these trends and use cases in your recommendations.

${knowledgeBase}

Generate 5-7 AI project ideas (at least ONE per bucket) based on the agency details provided.

IMPORTANT: You must output projects across ALL FIVE business buckets:
1. Sales — Lead generation, pipeline management, conversion optimization, closing systems
2. Marketing — Brand, content, campaigns, paid ads, awareness, positioning
3. Fulfillment & Operations — Delivery, capacity, workflow automation, team efficiency, SOPs
4. Customer Experience & Retention — Onboarding, communication, churn prevention, satisfaction, upsells
5. Intelligence & Reporting — Dashboards, data pipelines, performance insights, decision-making tools

For EACH project, include:
- Project Name (clear, actionable)
- Bucket: one of "Sales", "Marketing", "Fulfillment & Operations", "Customer Experience & Retention", "Intelligence & Reporting"
- ProjectType: "Internal" (for your own agency), "External-Resellable" (to offer clients), or "Both"
- Description (2-3 sentences)
- Problem it solves (specific pain point)

Then for each project, provide scores 1-10:
- Revenue Impact: How much revenue could this generate?
- Ease of Implementation: How hard to build/run?
- Time to ROI: How fast to see returns?
- Differentiation: How unique is this for clients?

Finally, for each project, include implementation using the 3DX FRAMEWORK:
- AI Solution Overview
- Recommended Tools (specific names - ONLY use tools you know exist)
- Implementation Plan (use 3DX: DIAGNOSE → DESIGN → DEPLOY with specific steps under each)
- Estimated ROI impact (quantified or qualitative)

ANTI-HALLUCINATION PROTOCOL:
- If you cannot confidently recommend tools or ROI for a niche/service combo, flag it
- Never invent tools that don't exist
- If unknown niche: ask clarifying question or tag as "⚠️ General recommendation — not yet validated for this niche"

Output ONLY valid JSON in this exact format:
{"projects":[{"name":"Project Name","bucket":"Sales","projectType":"Internal|External-Resellable|Both","description":"Description","problem":"Problem solved","scores":{"revenue":1,"ease":1,"roiSpeed":1,"differentiation":1},"implementation":{"overview":"Overview","tools":["tool1"],"steps":["step1"],"roiEstimate":"ROI"}}]}`;

  const userPrompt = `Inferred Agency Type: ${inferredAgencyType}
Client Niches: ${input.clientNiches}
Revenue Range: ${input.revenueRange}
Current Services: ${input.currentServices.join(', ')}
Tech Stack: ${input.techStack}
Pain Points: ${input.painPoints}
Goals: ${input.goals}

IMPORTANT: Output at least ONE project per bucket (5 buckets total).
Tag each project as "Internal", "External-Resellable", or "Both".

Output ONLY valid JSON.`;

  try {
    console.log('Calling Claude API with model: claude-sonnet-4-20250514');
    
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
      console.log('Request timed out after 90s');
    }, 90000); // 90 second timeout
    
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 5000,
      system: systemPrompt,
      messages: [
        { role: 'user', content: userPrompt }
      ]
    }, {
      signal: controller.signal
    });

    clearTimeout(timeout);

    const responseText = message.content[0].type === 'text' 
      ? message.content[0].text 
      : '';

    if (!responseText || responseText.length < 50) {
      return sampleProjects;
    }

    // Extract JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.log('No JSON found in response:', responseText.substring(0, 500));
      return sampleProjects;
    }
    
    let parsed;
    try {
      parsed = JSON.parse(jsonMatch[0]);
    } catch (parseError: any) {
      console.log('JSON parse failed, raw response:', responseText.substring(0, 1000));
      return sampleProjects;
    }
    
    // Add IDs and calculate totals
    if (parsed.projects && Array.isArray(parsed.projects)) {
      parsed.projects = parsed.projects.map((p: any, index: number) => ({
        ...p,
        id: `project-${index + 1}`,
        priority: index + 1,
        scores: {
          ...p.scores,
          total: (
            (p.scores.revenue || 0) +
            (p.scores.ease || 0) +
            (p.scores.roiSpeed || 0) +
            (p.scores.differentiation || 0)
          ) / 4
        }
      }));

      // Sort by total score
      parsed.projects.sort((a: any, b: any) => b.scores.total - a.scores.total);
      
      // Reassign priority after sort
      parsed.projects = parsed.projects.map((p: any, index: number) => ({
        ...p,
        priority: index + 1
      }));
    }

    return parsed;
  } catch (error: any) {
    console.error('Claude API error:', error.message || error);
    return sampleProjects;
  }
}