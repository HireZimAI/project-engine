# AI Project Engine for Marketing Agencies

A web-based SaaS tool that helps marketing agencies discover, prioritize, and plan AI implementation projects that drive revenue, efficiency, and client results.

## 🚀 Quick Start

### 1. Clone & Install

```bash
cd ai-project-engine
npm install
```

### 2. Configure Environment

```bash
cp .env.local.example .env.local
# Edit .env.local and add your Anthropic API key
```

Get your API key from: https://console.anthropic.com/

### 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

---

## 📦 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add `ANTHROPIC_API_KEY` in Vercel environment variables
4. Deploy

### Railway

1. Connect GitHub repo
2. Add environment variables
3. Deploy

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **AI:** Claude API (Anthropic)
- **Deployment:** Vercel / Railway

---

## 📁 Project Structure

```
ai-project-engine/
├── app/
│   ├── api/generate/route.ts   # API endpoint
│   ├── page.tsx                # Input form
│   ├── results/page.tsx        # Results dashboard
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── InputForm.tsx
│   ├── ProjectCard.tsx
│   ├── ExportButtons.tsx
│   └── Header.tsx
├── lib/
│   ├── claude.ts               # Claude API client
│   └── types.ts                # TypeScript types
├── SPEC.md                     # Full specification
└── README.md
```

---

## 🎯 Features

- ✅ Agency input form (7 fields)
- ✅ AI project generation (5-7 projects per run)
- ✅ Project scoring (revenue, ease, ROI, differentiation)
- ✅ Implementation breakdown (tools, steps, ROI)
- ✅ Results dashboard with filtering
- ✅ Export to text file
- ✅ Copy to clipboard
- ✅ Top 3 projects highlight
- ✅ Mobile responsive

---

## 💰 Cost

- **Compute:** Free on Vercel (generous free tier)
- **AI:** ~$0.01-0.03 per project generation (Claude Sonnet)

---

## 🔧 Customization

### Change AI Model

In `lib/claude.ts`, change:
```typescript
model: 'claude-3-5-sonnet-20241022'
```
to:
```typescript
model: 'claude-3-haiku-20240307'  // Cheaper
model: 'claude-3-opus-20240229'    // More powerful
```

### Add More Questions

1. Update `lib/types.ts` → `AgencyInput` interface
2. Update `components/InputForm.tsx` → add fields
3. Update `lib/claude.ts` → include in prompt

---

## 📄 License

MIT - Built by HireZim AI