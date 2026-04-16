export interface AgencyInput {
  businessName: string;
  clientNiches: string;
  revenueRange: string;
  currentServices: string[];
  techStack: string;
  painPoints: string;
  goals: string;
}

// Inferred from services if agencyType not provided
export type AgencyType = 
  | 'Digital Marketing Agency'
  | 'Creative Agency'
  | 'Full-Service Agency'
  | 'SEO/PPC Agency'
  | 'Social Media Agency'
  | 'Content Marketing Agency'
  | 'Web Design/Development Agency'
  | 'Media Buying Agency'
  | 'Direct Mail Agency'
  | 'CTV/Connected TV Agency'
  | 'TikTok Ads Agency'
  | 'AI Search/GEO Agency'
  | 'SMS Marketing Agency'
  | 'Reputation Management Agency'
  | 'Podcast/Video Production Agency'
  | 'PR/Earned Media Agency'
  | 'Other';

// Five business buckets (replaces old categories)
export type Bucket = 
  | 'Sales'
  | 'Marketing'
  | 'Fulfillment & Operations'
  | 'Customer Experience & Retention'
  | 'Intelligence & Reporting';

// Project type: Internal (own ops) vs External (resellable to clients)
export type ProjectType = 'Internal' | 'External-Resellable' | 'Both';

export interface ProjectScores {
  revenue: number;
  ease: number;
  roiSpeed: number;
  differentiation: number;
  total: number;
}

export interface ProjectImplementation {
  overview: string;
  tools: string[];
  steps: string[];
  roiEstimate: string;
}

export interface Project {
  id: string;
  name: string;
  bucket: Bucket;
  projectType: ProjectType;
  description: string;
  problem: string;
  scores: ProjectScores;
  priority: number;
  implementation: ProjectImplementation;
  // For novel agency handling
  isValidated?: boolean;
}

export interface GenerateResponse {
  projects: Project[];
}