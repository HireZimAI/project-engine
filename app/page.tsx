import InputForm from '@/components/InputForm';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            AI Project Engine
            <span className="block text-primary-600">for Marketing Agencies</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover high-ROI AI projects tailored to your agency. 
            Get implementation-ready plans in minutes.
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <InputForm />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Powered by Claude AI • Built by HireZim AI</p>
        </div>
      </main>
    </div>
  );
}