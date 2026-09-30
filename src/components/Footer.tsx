import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div>
          <span className="font-semibold text-slate-700">Tender Live</span> — AI-Assisted Bid Compliance Verification Platform
        </div>
        <div className="flex items-center gap-2">
          <span>Official GeM Compliance Verification Suite</span>
          <span className="text-slate-300">•</span>
          <span className="font-mono text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
            Production Build v2.4.1
          </span>
        </div>
      </div>
    </footer>
  );
};
