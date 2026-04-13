'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Project, AgencyInput } from '@/lib/types';
import { ProjectCard } from '@/components/ProjectCard';
import ExportButtons from '@/components/ExportButtons';
import Header from '@/components/Header';

export default function ResultsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [input, setInput] = useState<AgencyInput | null>(null);
  const [expandedId, setExpandedId] = useState<string>('project-1');
  const [filter, setFilter] = useState<string>('All');

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
    } catch (e) {
      router.push('/');
    }
  }, []);

  // Redirect if no projects
  if (!projects || projects.length === 0) {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
    return null;
  }

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const categories = ['All', ...new Set(projects.map(p => p.category))];

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
                Your AI Projects
              </h1>
              <p className="text-gray-600 mt-1">
                {projects.length} projects generated based on your agency profile
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
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-primary-500 text-white text-sm font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      project.category === 'Revenue' ? 'bg-green-100 text-green-800' :
                      project.category === 'Cost Saving' ? 'bg-blue-100 text-blue-800' :
                      project.category === 'Automation' ? 'bg-gray-100 text-gray-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {project.category}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 text-sm">{project.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{project.scores.total.toFixed(1)}/10 score</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === cat
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {cat}
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
            <p className="text-gray-500">No projects found in this category.</p>
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