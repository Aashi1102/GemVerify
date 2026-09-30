import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  ArrowRight, 
  AlertCircle, 
  FileCheck, 
  CheckCircle2,
  Building2,
  KeyRound
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [officerId, setOfficerId] = useState('PO-DELHI-2026-881');
  const [pin, setPin] = useState('1102');
  const [role, setRole] = useState<'officer' | 'tec' | 'auditor'>('officer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess();
      onClose();
    }, 600);
  };

  const handleQuickFill = (r: 'officer' | 'tec' | 'auditor') => {
    setRole(r);
    if (r === 'officer') {
      setOfficerId('PO-DELHI-2026-881');
      setPin('1102');
    } else if (r === 'tec') {
      setOfficerId('TEC-CHAIR-MIN-402');
      setPin('2026');
    } else {
      setOfficerId('AUD-CAG-VIG-901');
      setPin('4401');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0F2C59] to-[#004b7a] p-6 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight">Officer Authentication</h3>
                <p className="text-xs text-blue-200">Tender Live — Sovereign Procurement Portal</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-[11px] bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
            <Lock className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="text-blue-100">DSC token & PIN verification required under GFR Rule 149</span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Role selector chips */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select Designation Profile
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('officer')}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                  role === 'officer'
                    ? 'bg-blue-50 border-blue-600 text-blue-900 font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Procurement Officer
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('tec')}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                  role === 'tec'
                    ? 'bg-blue-50 border-blue-600 text-blue-900 font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                TEC Member
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('auditor')}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                  role === 'auditor'
                    ? 'bg-blue-50 border-blue-600 text-blue-900 font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                CAG Auditor
              </button>
            </div>
          </div>

          {/* Officer ID */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Government Officer ID / e-Gov Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={officerId}
                onChange={(e) => setOfficerId(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden font-mono"
                placeholder="e.g. PO-DELHI-2026-881"
              />
            </div>
          </div>

          {/* Security PIN */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">
                DSC Security PIN (Demo: 1102)
              </label>
              <span className="text-[11px] text-blue-600 font-mono">Quick PIN: 1102</span>
            </div>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-hidden font-mono tracking-widest"
                placeholder="••••"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0F2C59] hover:bg-[#1a3d75] active:bg-[#091b38] text-white rounded-xl text-sm font-semibold shadow-xs transition-colors disabled:opacity-75"
            >
              {isSubmitting ? (
                <span>Validating Credentials...</span>
              ) : (
                <>
                  <span>Authenticate & Enter Workbench</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
