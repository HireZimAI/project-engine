import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_KEY,
});

console.log('API Key present:', !!process.env.ANTHROPIC_API_KEY);
console.log('API Key prefix:', process.env.ANTHROPIC_API_KEY?.substring(0, 10) || 'NONE');

// Sample projects as fallback
const sampleProjects = {
  projects: [
    {
      name: "AI Lead Follow-Up Automation",
      category: "Automation",
      description: "Deploy AI-driven follow-up that nurtures leads through personalized email/SMS sequences.",
      problem: "Leads go cold due to slow follow-up, costing revenue.",
      scores: { revenue: 8, ease: 8, roiSpeed: 9, differentiation: 6 },
      implementation: {
        overview: "Automated lead nurture workflow in HubSpot with AI-generated messaging.",
        tools: ["HubSpot", "Make", "ChatGPT API", "Twilio"],
        steps: ["Audit lead stages", "Create AI prompts", "Build automation", "Set lead scoring", "A/B test"],
        roiEstimate: "30-50% increase in lead-to-client conversion"
      }
    },
    {
      name: "AI Content Engine for E-commerce",
      category: "New Service",
      description: "Generate SEO-optimized product descriptions and content at scale.",
      problem: "Manual content creation too slow to scale for e-commerce clients.",
      scores: { revenue: 9, ease: 7, roiSpeed: 8, differentiation: 7 },
      implementation: {
        overview: "AI content pipeline with human editorial review, packaged as monthly tiers.",
        tools: ["ChatGPT API", "Surfer SEO", "Make", "Notion"],
        steps: ["Extract keywords", "Build prompts", "Create pipeline", "Review workflow", "Package tiers"],
        roiEstimate: "$120K annual recurring at 70%+ margins"
      }
    },
    {
      name: "Automated Client Reporting",
      category: "Cost Saving",
      description: "AI-powered monthly reports with narrative insights delivered automatically.",
      problem: "Manual reporting consumes 5-15 hours per client monthly.",
      scores: { revenue: 6, ease: 8, roiSpeed: 9, differentiation: 7 },
      implementation: {
        overview: "Automated reporting pipeline with AI-generated insights and branded dashboards.",
        tools: ["Make", "GA4", "ChatGPT API", "Looker Studio"],
        steps: ["Connect data sources", "Build AI prompts", "Design template", "Schedule automation", "Track engagement"],
        roiEstimate: "Saves 8-12 hours/month per client"
      }
    },
    {
      name: "AI Outbound Prospecting System",
      category: "Revenue",
      description: "Automated outbound system with personalized research and cold outreach at scale.",
      problem: "No consistent new business engine to double revenue.",
      scores: { revenue: 9, ease: 7, roiSpeed: 7, differentiation: 7 },
      implementation: {
        overview: "Prospect database + AI research + personalized outreach = outbound engine.",
        tools: ["Apollo.io", "ChatGPT API", "Make", "HubSpot"],
        steps: ["Build prospect list", "AI research workflow", "Email sequences", "Response handling", "Track metrics"],
        roiEstimate: "$30K-$60K new ARR in 6 months"
      }
    },
    {
      name: "Revenue Attribution Dashboard",
      category: "New Service",
      description: "Connect SEO rankings directly to product sales and revenue outcomes.",
      problem: "Clients can't see SEO-to-revenue connection, leading to budget cuts.",
      scores: { revenue: 9, ease: 5, roiSpeed: 6, differentiation: 9 },
      implementation: {
        overview: "Integrated dashboard merging SEO + e-commerce data with AI insights.",
        tools: ["Shopify", "GA4", "Looker Studio", "ChatGPT API", "BigQuery"],
        steps: ["Integrate store data", "Build unified dataset", "Create dashboard", "Add AI insights", "Package add-on"],
        roiEstimate: "$96K/year at $1K/month avg"
      }
    }
  ]
};

export async function generateProjectsWithClaude(input: {
  agencyType: string;
  clientNiches: string;
  revenueRange: string;
  currentServices: string[];
  techStack: string;
  painPoints: string;
  goals: string;
}): Promise<any> {
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

Generate exactly 5-7 AI project ideas based on the agency details provided.

For each project, include:
- Project Name (clear, actionable)
- Category: one of "Revenue", "Cost Saving", "Retention", "Automation", "New Service"
- Description (2-3 sentences)
- Problem it solves (specific pain point)

Then for each project, provide scores 1-10:
- Revenue Impact: How much revenue could this generate?
- Ease of Implementation: How hard to build/run?
- Time to ROI: How fast to see returns?
- Differentiation: How unique is this for clients?

Finally, for each project, include implementation using the 3DX FRAMEWORK:
- AI Solution Overview
- Recommended Tools (specific names)
- Implementation Plan (use 3DX: DIAGNOSE → DESIGN → DEPLOY with specific steps under each)
- Estimated ROI impact (quantified or qualitative)

Output ONLY valid JSON in this exact format:
{"projects":[{"name":"Project Name","category":"Category","description":"Description","problem":"Problem solved","scores":{"revenue":1,"ease":1,"roiSpeed":1,"differentiation":1},"implementation":{"overview":"Overview","tools":["tool1"],"steps":["step1"],"roiEstimate":"ROI"}}]}`;

  const userPrompt = `Agency Type: ${input.agencyType}
Client Niches: ${input.clientNiches}
Revenue Range: ${input.revenueRange}
Current Services: ${input.currentServices.join(', ')}
Tech Stack: ${input.techStack}
Pain Points: ${input.painPoints}
Goals: ${input.goals}

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