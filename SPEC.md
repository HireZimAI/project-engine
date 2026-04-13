# AI PROJECT ENGINE - SPECIFICATION

**Project:** AI Project Engine for Marketing Agencies  
**Type:** SaaS Web Application (MVP)  
**Tech Stack:** Next.js, Tailwind CSS, Claude API  
**Target:** Marketing agencies seeking AI implementation guidance

---

## ARCHITECTURE

```
┌─────────────────────────────────────────────────┐
│                 FRONTEND                        │
│  ┌─────────┐  ┌─────────┐  ┌─────────────────┐  │
│  │ Input   │→ │ Results │→ │ Dashboard/      │  │
│  │ Form    │  │ Display │  │ Export          │  │
│  └─────────┘  └─────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────┘
                    ↓
              API Routes
                    ↓
┌─────────────────────────────────────────────────┐
│                 BACKEND                          │
│  ┌─────────────┐  ┌─────────────┐              │
│  │ Generate    │  │ Project     │              │
│  │ Projects    │  │ Scoring     │              │
│  └─────────────┘  └─────────────┘              │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│                   AI LAYER                      │
│              Claude API                         │
└─────────────────────────────────────────────────┘
```

---

## DATA FLOW

1. User fills input form
2. Submit → API route `/api/generate`
3. API sends to Claude with structured prompt
4. Claude returns JSON with 5-7 projects
5. Backend scores each project (algorithm)
6. Frontend renders sorted results
7. User can export/copy/save

---

## FILE STRUCTURE

```
ai-project-engine/
├── app/
│   ├── page.tsx              # Main landing/input
│   ├── results/page.tsx      # Results dashboard
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── InputForm.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectDetail.tsx
│   ├── ScoreBar.tsx
│   ├── ExportButtons.tsx
│   └── Header.tsx
├── lib/
│   ├── claude.ts             # Claude API client
│   ├── scoring.ts            # Project scoring logic
│   └── types.ts              # TypeScript interfaces
├── app/api/
│   └── generate/
│       └── route.ts          # POST endpoint
├── public/
│   └── ...
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── .env.local.example
```

---

## API RESPONSE FORMAT

```typescript
interface Project {
  id: string;
  name: string;
  category: 'Revenue' | 'Cost Saving' | 'Retention' | 'Automation' | 'New Service';
  description: string;
  problem: string;
  scores: {
    revenue: number;      // 1-10
    ease: number;        // 1-10
    roiSpeed: number;    // 1-10
    differentiation: number; // 1-10
    total: number;
  };
  priority: number;
  implementation: {
    overview: string;
    tools: string[];
    steps: string[];
    roiEstimate: string;
  };
}
```

---

## PAGES

### 1. Landing/Input (page.tsx)
- Hero section with value prop
- Input form (single page)
- Submit button → redirect to results

### 2. Results (results/page.tsx)
- Project list (sorted by total score)
- Expandable details per project
- Export/Copy buttons
- "Generate New" option

---

## ENVIRONMENT VARIABLES

```env
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## DEPLOYMENT

- Vercel (frontend + API routes)
- Or Railway + separate backend

---

*Spec complete. Now building.*