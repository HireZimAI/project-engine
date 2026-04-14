import InputForm from '@/components/InputForm';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-primary">AI Project Engine</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Discover High-ROI <span className="text-primary">AI Projects</span>
            <span className="block text-gray-600 mt-2">for Your Agency</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get tailored AI implementation plans in minutes. 
            Powered by Claude AI, built for forward-thinking agencies.
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-primary/10">
          <InputForm />
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-sm text-gray-500">
          <p className="flex items-center justify-center gap-2">
            <span className="text-primary font-medium">HireZim AI</span>
            <span>•</span>
            <span>AI Automation Experts</span>
          </p>
        </div>
      </main>
    </div>
  );
}