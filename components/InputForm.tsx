'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AgencyInput } from '@/lib/types';

export default function InputForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<AgencyInput>({
    businessName: '',
    clientNiches: '',
    revenueRange: '',
    currentServices: [],
    techStack: '',
    painPoints: '',
    goals: ''
  });

  const revenueRanges = [
    'Under $100K',
    '$100K - $500K',
    '$500K - $1M',
    '$1M - $5M',
    '$5M+'
  ];

  // Expanded services list (April 2026)
  const services = [
    'Social Media Management',
    'SEO',
    'PPC/Paid Ads',
    'Content Marketing',
    'Email Marketing',
    'Web Design',
    'Branding',
    'Video Production',
    'Analytics/Reporting',
    'Client Consulting',
    'Direct Mail',
    'CTV/Connected TV',
    'TikTok Ads',
    'AI Search/GEO',
    'SMS Marketing',
    'Reputation Management',
    'Podcast Production',
    'Video Production',
    'PR/Earned Media',
    'Other'
  ];

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      currentServices: prev.currentServices.includes(service)
        ? prev.currentServices.filter(s => s !== service)
        : [...prev.currentServices, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    localStorage.setItem('agencyInput', JSON.stringify(formData));

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Request failed');
      }

      const data = await response.json();
      localStorage.setItem('projects', JSON.stringify(data));
      router.push('/results');
    } catch (error) {
      console.error('Error:', error);
      const msg = error instanceof Error ? error.message : 'Failed to generate. Please try again.';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">Business Name *</label>
        <input
          required
          type="text"
          value={formData.businessName}
          onChange={e => setFormData({ ...formData, businessName: e.target.value })}
          placeholder="Your agency or business name"
          className="w-full p-3 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Client Niches *</label>
        <input
          required
          type="text"
          value={formData.clientNiches}
          onChange={e => setFormData({ ...formData, clientNiches: e.target.value })}
          placeholder="e.g., HVAC, E-commerce, SaaS"
          className="w-full p-3 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Revenue Range *</label>
        <select
          required
          value={formData.revenueRange}
          onChange={e => setFormData({ ...formData, revenueRange: e.target.value })}
          className="w-full p-3 border rounded-lg"
        >
          <option value="">Select...</option>
          {revenueRanges.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Services (click to select) *</label>
        <div className="flex flex-wrap gap-2">
          {services.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => toggleService(s)}
              className={`px-3 py-2 rounded-full text-sm border transition-all ${
                formData.currentServices.includes(s)
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-primary hover:text-primary'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tech Stack</label>
        <input
          type="text"
          value={formData.techStack}
          onChange={e => setFormData({ ...formData, techStack: e.target.value })}
          placeholder="e.g., HubSpot, WordPress"
          className="w-full p-3 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Pain Points / Opportunities *</label>
        <textarea
          required
          value={formData.painPoints}
          onChange={e => setFormData({ ...formData, painPoints: e.target.value })}
          placeholder="e.g., Losing leads, slow follow-up, manual reporting, no automation, inconsistent client results"
          rows={2}
          className="w-full p-3 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Goals *</label>
        <textarea
          required
          value={formData.goals}
          onChange={e => setFormData({ ...formData, goals: e.target.value })}
          placeholder="e.g., Double revenue, scale team, launch new service, reduce costs, improve client retention, automate follow-up"
          rows={2}
          className="w-full p-3 border rounded-lg"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors disabled:bg-gray-400"
      >
        {loading ? 'Generating...' : '🚀 Generate My AI Projects'}
      </button>
    </form>
  );
}