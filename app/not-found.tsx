import Link from 'next/link';
import { FileQuestion, Home } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | LoanHero',
  description: 'The page you are looking for could not be found.',
  robots: 'noindex, follow',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-indigo-500 blur-[40px] opacity-20 animate-pulse rounded-full"></div>
        <div 
          className="relative w-24 h-24 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/10"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <FileQuestion className="w-12 h-12" />
        </div>
      </div>
      
      <h1 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-black mb-4 tracking-tight text-slate-900">
        Page Not Found
      </h1>
      
      <p className="text-slate-500 text-sm md:text-base max-w-md mb-8">
        Oops! We can&apos;t seem to find the page you&apos;re looking for. It might have been moved, deleted, or possibly never existed.
      </p>
      
      <Link 
        href="/"
        className="text-white px-8 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 hover:shadow-indigo-500/40 ring-4 ring-indigo-500/10 hover:ring-indigo-500/20"
        style={{ background: 'var(--gradient-primary)' }}
      >
        <Home className="w-4 h-4" />
        Return to Homepage
      </Link>
    </div>
  );
}
