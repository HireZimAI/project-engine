import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Project Engine for Marketing Agencies',
  description: 'Discover high-ROI AI projects tailored to your agency. Get implementation-ready plans in minutes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}