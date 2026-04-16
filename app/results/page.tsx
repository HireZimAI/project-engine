'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Project, AgencyInput, Bucket, ProjectType } from '@/lib/types';
import { ProjectCard } from '@/components/ProjectCard';
import ExportButtons from '@/components/ExportButtons';
import Header from '@/components/Header';

// Five business buckets (April 2026)
const BUCKETS: Bucket[] = [
  'Sales',
  'Marketing', 
  'Fulfillment & Operations',
  'Customer Experience & Retention',
  'Intelligence & Reporting'
];

const BUCKET_LABELS: Record<Bucket, string> = {
  'Sales': '💰 Sales',
  'Marketing': '📣 Marketing',
  'Fulfillment & Operations': '⚙️ Fulfillment & Ops',
  'Customer Experience & Retention': '❤️ CX & Retention',
  'Intelligence & Reporting': '📊 Intelligence'
};

export default function ResultsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [input, setInput] = useState<AgencyInput | null>(null);
  const [expandedId, setExpandedId] = useState<string>('project-1');
  const [filter, setFilter] = useState<Bucket | 'All'>('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve from localStorage
    const storedProjects = localStorage.getItem('projects');
    const storedInput = localStorage.getItem('agencyInput');

    if (!storedProjects || !storedInput) {
      router.push('/');
      return;
    }

    try {
      const parsed = JSON.parse(storedProjects);
      setProjects(parsed.projects || []);
      setInput(JSON.parse(storedInput));
      setIsLoading(false);
    } catch (e) {
      router.push('/');
    }
  }, [router]);

  // Don't render redirect until we've checked
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if no projects
  if (!projects || projects.length === 0) {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
    return null;
  }

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.bucket === filter);

  // Get buckets present in results
  const presentBuckets = [...new Set(projects.map(p => p.bucket))] as Bucket[];
  const filterOptions: (Bucket | 'All')[] = ['All', ...presentBuckets];

  const topProjects = projects.slice(0, 3);

  if (!projects.length) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Your AI Roadmap
              </h1>
              <p className="text-gray-600 mt-1">
                {projects.length} projects across the five core areas of your business
              </p>
            </div>
            <div className="flex gap-3">
              <Link 
                href="/" 
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Start Over
              </Link>
            </div>
          </div>
        </div>

        {/* Framing Line */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>AI roadmap below</strong> surfaces projects across the five core areas of your business — including tools you can deploy internally and AI services you can resell to your clients.
          </p>
        </div>

        {/* Top 3 Highlight */}
        {topProjects.length >= 3 && (
          <div className="mb-8 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 border border-primary-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🏆</span> Top 3 Recommended Projects
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {topProjects.map((project, index) => (
                <div 
                  key={project.id}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
                >
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="w-6 h-6 rounded-full bg-primary-500 text-white text-sm font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      project.bucket === 'Sales' ? 'bg-green-100 text-green-800' :
                      project.bucket === 'Marketing' ? 'bg-pink-100 text-pink-800' :
                      project.bucket === 'Fulfillment & Operations' ? 'bg-gray-100 text-gray-800' :
                      project.bucket === 'Customer Experience & Retention' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {project.bucket}
                    </span>
                    {/* Project Type Badge */}
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      project.projectType === 'Internal' ? 'bg-purple-100 text-purple-800' :
                      project.projectType === 'External-Resellable' ? 'bg-orange-100 text-orange-800' :
                      'bg-teal-100 text-teal-800'
                    }`}>
                      {project.projectType === 'Internal' ? '🏠 Internal' :
                       project.projectType === 'External-Resellable' ? '🔄 Resell' : '♻️ Both'}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 text-sm">{project.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{project.scores.total.toFixed(1)}/10 score</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter by Bucket */}
        <div className="mb-6 flex flex-wrap gap-2">
          {filterOptions.map(bucket => (
            <button
              key={bucket}
              onClick={() => setFilter(bucket)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === bucket
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {bucket === 'All' ? 'All Buckets' : BUCKET_LABELS[bucket]}
            </button>
          ))}
        </div>

        {/* Export Buttons */}
        {input && (
          <div className="mb-6">
            <ExportButtons projects={projects} input={input} />
          </div>
        )}

        {/* Project List */}
        <div className="space-y-4">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              isExpanded={expandedId === project.id}
              onToggle={() => setExpandedId(expandedId === project.id ? '' : project.id)}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found in this bucket.</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Built by HireZim AI • AI Project Engine for Marketing Agencies
          </p>
        </div>
      </main>
    </div>
  );
}