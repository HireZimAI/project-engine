export interface AgencyInput {
  businessName: string;
  agencyType: string;
  clientNiches: string;
  revenueRange: string;
  currentServices: string[];
  techStack: string;
  painPoints: string;
  goals: string;
}

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
  category: 'Revenue' | 'Cost Saving' | 'Retention' | 'Automation' | 'New Service';
  description: string;
  problem: string;
  scores: ProjectScores;
  priority: number;
  implementation: ProjectImplementation;
}

export interface GenerateResponse {
  projects: Project[];
}