import React from 'react';
import { Printer, Download, ShieldCheck, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import { Tender } from '../types';

interface ReportsScreenProps {
  tenders: Tender[];
  onSelectTenderForWorkbench: (tender: Tender) => void;
}

export const ReportsScreen: React.FC<ReportsScreenProps> = ({
  tenders,
  onSelectTenderForWorkbench,
}) => {
  const primaryTender = tenders.find(t => t.id === 'GEM/2026/PROC/1024') || tenders[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-[#0B1C30]">Government Procurement Evaluation Reports</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit-grade compliance matrices and technical committee executive briefs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-semibold shadow-2xs"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Official Government Report Preview Document */}
      <div className="bg-white rounded-xl border border-slate-300 p-8 shadow-sm max-w-4xl mx-auto space-y-6 print:shadow-none print:border-none">
        {/* Document Header */}
        <div className="text-center pb-6 border-b-2 border-slate-900 space-y-1">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Government of India • Ministry of Electronics & Information Technology
          </div>
          <h3 className="text-lg font-bold text-slate-900 uppercase">
            Official Technical & Financial Bid Compliance Scrutiny Report
          </h3>
          <p className="text-xs font-mono text-slate-600">
            Reference: {primaryTender.id} | Generated: 11 September 2026
          </p>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2 text-xs text-slate-800 leading-relaxed">
          <h4 className="font-bold uppercase text-slate-900 text-[11px] tracking-wider">
            1. Procurement Overview & Scope
          </h4>
          <p>
            Under GeM General Financial Rules (GFR 2017 Rule 149), technical bid evaluation for 
            <span className="font-semibold"> {primaryTender.title}</span> (Estimated Cost: {primaryTender.estimatedValue}) was submitted to automated multi-source compliance verification across GSTN, Udyam MSME, Income Tax Department, and MCA21 registries.
          </p>
        </div>

        {/* Bidder Evaluation Matrix */}
        <div className="space-y-2">
          <h4 className="font-bold uppercase text-slate-900 text-[11px] tracking-wider">
            2. Comparative Bidder Compliance Scrutiny
          </h4>
          <div className="overflow-x-auto border border-slate-300 rounded-lg">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                  <th className="py-2.5 px-3">Bidder Legal Name</th>
                  <th className="py-2.5 px-3">GSTIN / PAN</th>
                  <th className="py-2.5 px-3">Score</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Primary Risk / Finding</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {primaryTender.bidders.map((b, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{b.companyName}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">{b.gstin}</td>
                    <td className="py-2.5 px-3 font-bold">{b.complianceScore}%</td>
                    <td className="py-2.5 px-3 font-medium text-amber-700">{b.riskCategory}</td>
                    <td className="py-2.5 px-3 text-slate-600 text-[11px]">
                      {b.discrepancies[0]?.title || 'All criteria verified compliant without variance.'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Signatures & Certification */}
        <div className="pt-8 border-t border-slate-300 grid grid-cols-2 gap-8 text-xs">
          <div className="space-y-1">
            <p className="text-slate-500">Evaluated By (AI-Assisted System):</p>
            <p className="font-semibold text-slate-900">Tender Live Engine v2.4</p>
            <p className="text-[11px] font-mono text-slate-500">Algorithm Build: SHA-256 Validated</p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-slate-500">Designated Procurement Authority:</p>
            <p className="font-bold text-slate-900">{primaryTender.evaluatingOfficer}</p>
            <p className="text-[11px] text-emerald-700 font-semibold">DSC Digitally Signed & Sealed</p>
          </div>
        </div>
      </div>
    </div>
  );
};
