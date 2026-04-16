'use client';

import { Project, Bucket, ProjectType } from '@/lib/types';

interface ScoreBarProps {
  label: string;
  value: number;
  color?: string;
}

export function ScoreBar({ label, value, color = 'bg-primary-500' }: ScoreBarProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-600 w-20 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${(value / 10) * 100}%` }}
        />
      </div>
      <span className="text-xs font-medium text-gray-700 w-6">{value}</span>
    </div>
  );
}

interface ScoreDisplayProps {
  scores: {
    revenue: number;
    ease: number;
    roiSpeed: number;
    differentiation: number;
    total: number;
  };
}

export function ScoreDisplay({ scores }: ScoreDisplayProps) {
  if (!scores) {
    return <div className="text-sm text-gray-400">Loading scores...</div>;
  }
  const total = scores.total ?? ((scores.revenue + scores.ease + scores.roiSpeed + scores.differentiation) / 4);
  return (
    <div className="space-y-2">
      <ScoreBar label="Revenue" value={scores.revenue ?? 0} color="bg-green-500" />
      <ScoreBar label="Ease" value={scores.ease ?? 0} color="bg-blue-500" />
      <ScoreBar label="Time to ROI" value={scores.roiSpeed ?? 0} color="bg-purple-500" />
      <ScoreBar label="Differentiation" value={scores.differentiation ?? 0} color="bg-accent-500" />
      <div className="pt-2 mt-2 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Total Score</span>
          <span className="text-lg font-bold text-primary-600">{total?.toFixed(1) ?? '0.0'}/10</span>
        </div>
      </div>
    </div>
  );
}

// Bucket colors (April 2026)
const bucketColors: Record<Bucket, string> = {
  'Sales': 'bg-green-100 text-green-800',
  'Marketing': 'bg-pink-100 text-pink-800',
  'Fulfillment & Operations': 'bg-gray-100 text-gray-800',
  'Customer Experience & Retention': 'bg-red-100 text-red-800',
  'Intelligence & Reporting': 'bg-blue-100 text-blue-800'
};

// Project type badges
const projectTypeLabels: Record<ProjectType, string> = {
  'Internal': '🏠 Internal',
  'External-Resellable': '🔄 Resell to Clients',
  'Both': '♻️ Internal + Resell'
};

const projectTypeColors: Record<ProjectType, string> = {
  'Internal': 'bg-purple-100 text-purple-800',
  'External-Resellable': 'bg-orange-100 text-orange-800',
  'Both': 'bg-teal-100 text-teal-800'
};

interface ProjectCardProps {
  project: Project;
  isExpanded: boolean;
  onToggle: () => void;
}

export function ProjectCard({ project, isExpanded, onToggle }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
      {/* Header - always visible */}
      <button
        onClick={onToggle}
        className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${bucketColors[project.bucket]}`}>
              {project.bucket}
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${projectTypeColors[project.projectType]}`}>
              {projectTypeLabels[project.projectType]}
            </span>
            <span className="text-xs text-gray-500">#{project.priority} Priority</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{project.description}</p>
        </div>
        <div className="flex flex-col items-center shrink-0">
          <div className="w-12 h-12 rounded-xl overflow-hidden">
            <img src="/hirezim-icon.svg" alt="HireZim AI" className="w-full h-full" />
          </div>
          <div className="mt-1 text-xs font-bold text-gray-700">{project.scores?.total?.toFixed(1) ?? ((project.scores?.revenue + project.scores?.ease + project.scores?.roiSpeed + project.scores?.differentiation) / 4)?.toFixed(1) ?? '0.0'}</div>
          <svg 
            className={`w-5 h-5 text-gray-400 mt-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <div className="pt-4 space-y-6">
            {/* Problem */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">Problem Solved</h4>
              <p className="text-sm text-gray-600">{project.problem}</p>
            </div>

            {/* Scores */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Impact Scores</h4>
              <ScoreDisplay scores={project.scores} />
            </div>

            {/* Implementation */}
            {project.implementation && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Implementation Plan <span className="text-xs font-normal text-gray-500">(Using 3DX: Diagnose → Design → Deploy)</span></h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Overview</span>
                  <p className="text-sm text-gray-700 mt-1">{project.implementation.overview}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Tools Stack</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.implementation.tools.map((tool, i) => (
                      <span key={i} className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-700">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">3DX Implementation Steps</span>
                  <div className="mt-2 space-y-2">
                    {project.implementation.steps.map((step, i) => {
                      // Categorize steps by 3DX phase
                      const stepUpper = step.toUpperCase();
                      let icon = "•";
                      if (stepUpper.includes("DIAGNOSE")) icon = "🔍";
                      else if (stepUpper.includes("DESIGN")) icon = "🎨";
                      else if (stepUpper.includes("DEPLOY")) icon = "🚀";
                      else if (stepUpper.includes("EXECUTE")) icon = "⚡";
                      
                      return (
                        <p key={i} className="text-sm text-gray-700">
                          {icon} {step}
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Estimated ROI</span>
                  <p className="text-sm text-gray-700 mt-1">{project.implementation.roiEstimate}</p>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}