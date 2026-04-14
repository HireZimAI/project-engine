'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-primary/10 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">HZ</span>
            </div>
            <div>
              <span className="text-lg font-bold text-gray-900">AI Project Engine</span>
              <span className="text-xs text-primary font-medium ml-2 block">by HireZim AI</span>
            </div>
          </Link>
          <nav className="flex items-center gap-4">
            <a 
              href="https://hirezim.ai" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              HireZim AI Website
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}