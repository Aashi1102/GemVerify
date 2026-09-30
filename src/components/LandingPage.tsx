import React, { useState } from 'react';
import { GeMLogo } from './GeMLogo';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  Search, 
  Scale, 
  UserCheck, 
  Database, 
  ExternalLink,
  Lock,
  Layers,
  Sparkles,
  ChevronRight,
  TrendingUp,
  FileCheck2,
  AlertOctagon,
  Award
} from 'lucide-react';

interface LandingPageProps {
  onExplorePrototype: () => void;
  onOpenLogin: () => void;
  onNavigateToSection?: (sectionId: string) => void;
  onViewVerificationWorkflow: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onExplorePrototype,
  onOpenLogin,
  onViewVerificationWorkflow,
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'how-it-works' | 'features' | 'impact' | 'about'>('home');

  const scrollToSection = (id: string, tabName: typeof activeTab) => {
    setActiveTab(tabName);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#0b1c30] flex flex-col selection:bg-blue-200">
      {/* ================================================== */}
      {/* 1. TOP NAVIGATION (Exact layout as reference image) */}
      {/* ================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-4">
            {/* Left: Tender Live Brand Logo */}
            <div className="flex items-center gap-3 min-w-0">
              <button 
                onClick={() => scrollToSection('hero-section', 'home')}
                className="flex items-center gap-3 text-left focus:outline-hidden group"
              >
                <GeMLogo className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-xs group-hover:scale-105 transition-transform" />
                <div className="flex flex-col justify-center min-w-0">
                  <span className="font-extrabold text-xl tracking-tight whitespace-nowrap leading-tight">
                    <span className="text-[#0F2C59]">Tender </span>
                    <span className="text-[#166534]">Live</span>
                  </span>
                  <span className="text-[12px] text-slate-500 font-normal truncate leading-tight">
                    AI-Powered Bid Compliance &amp; Risk Intelligence
                  </span>
                </div>
              </button>
            </div>

            {/* Middle: Navigation Links (Home, How It Works, Verification, Features, Impact, About) */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
              <button 
                onClick={() => scrollToSection('hero-section', 'home')}
                className={`py-1 relative transition-colors hover:text-[#0066cc] ${activeTab === 'home' ? 'text-[#0066cc] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#0066cc] after:rounded-full' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works-detail', 'how-it-works')}
                className={`py-1 relative transition-colors hover:text-[#0066cc] ${activeTab === 'how-it-works' ? 'text-[#0066cc] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#0066cc] after:rounded-full' : ''}`}
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('features-section', 'features')}
                className={`py-1 relative transition-colors hover:text-[#0066cc] ${activeTab === 'features' ? 'text-[#0066cc] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#0066cc] after:rounded-full' : ''}`}
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('scale-section', 'impact')}
                className={`py-1 relative transition-colors hover:text-[#0066cc] ${activeTab === 'impact' ? 'text-[#0066cc] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#0066cc] after:rounded-full' : ''}`}
              >
                Impact
              </button>
              <button 
                onClick={() => scrollToSection('about-section', 'about')}
                className={`py-1 relative transition-colors hover:text-[#0066cc] ${activeTab === 'about' ? 'text-[#0066cc] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#0066cc] after:rounded-full' : ''}`}
              >
                About
              </button>
            </nav>

            {/* Right: Login & Explore buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenLogin}
                className="px-6 py-2 text-sm font-semibold text-[#0066cc] hover:text-[#0052a3] hover:bg-blue-50/70 rounded-lg transition-colors border border-[#0066cc]/40 bg-white shadow-2xs"
              >
                Login
              </button>
              <button
                onClick={onExplorePrototype}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0066cc] hover:bg-[#0052a3] text-white text-sm font-semibold rounded-lg shadow-sm transition-all hover:shadow"
              >
                <span>Explore</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================================================== */}
      {/* 2. HERO SECTION (Full-width image layer behind Hero content) */}
      {/* ================================================== */}
      <section 
        id="hero-section"
        className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 border-b border-slate-200"
      >
        {/* Full-width background image layer */}
        <img
          src="/hero-bg.png"
          alt="Tender Live National Procurement Intelligence Platform"
          className="absolute inset-0 w-full h-full object-fill object-center pointer-events-none z-0"
          style={{ width: '100%', height: '100%', objectFit: 'fill', objectPosition: 'center' }}
        />

        {/* Very subtle white transparency overlay (10%) to keep image bold & clearly visible */}
        <div className="absolute inset-0 bg-white/10 pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[500px]">
            {/* Left Content Column placed over the light/empty space of the background, shifted to leave the State Emblem on the left unobstructed */}
            <div className="lg:col-span-8 pt-24 sm:pt-28 lg:pt-4 lg:pl-36 xl:pl-44 space-y-5 text-left">
              {/* Tag Pill Badge: AI-POWERED BID COMPLIANCE & RISK INTELLIGENCE PLATFORM */}
              <div>
                <span className="inline-block px-3.5 py-1.5 rounded-md bg-[#e6f4ea]/90 text-[#137333] text-[11px] sm:text-xs font-bold tracking-wider uppercase border border-[#ceead6] shadow-2xs">
                  AI-POWERED BID COMPLIANCE &amp; RISK INTELLIGENCE PLATFORM
                </span>
              </div>

              {/* Headline */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#0F2C59] tracking-tight leading-[1.12] drop-shadow-2xs">
                  From documents to <br />
                  <span className="text-[#0066cc]">
                    trusted decisions
                  </span>
                </h1>

                {/* Subtitle Tricolour decorative mini-accent bar */}
                <div className="flex items-center gap-1.5 mt-3 mb-1">
                  <div className="w-8 h-1 rounded-full bg-[#FF9933]"></div>
                  <div className="w-8 h-1 rounded-full bg-slate-400"></div>
                  <div className="w-8 h-1 rounded-full bg-[#138808]"></div>
                </div>
              </div>

              {/* Subheading text */}
              <p className="text-base sm:text-lg text-slate-700 max-w-xl leading-relaxed font-medium">
                Tender Live helps procurement teams understand tender requirements, verify bidder compliance, identify discrepancies and make faster, evidence-based decisions.
              </p>

              {/* Bold single line value claim */}
              <p className="text-sm sm:text-base font-bold text-[#0F2C59]">
                AI-assisted verification. Source-linked evidence. Procurement Officer in control.
              </p>

              {/* Primary Call-to-action buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onExplorePrototype}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0066cc] hover:bg-[#0052a3] text-white font-semibold rounded-lg text-sm sm:text-base shadow-md hover:shadow-lg transition-all"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => scrollToSection('how-it-works-detail', 'how-it-works')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white/95 hover:bg-white text-[#0066cc] font-semibold rounded-lg text-sm sm:text-base border border-slate-300 shadow-sm transition-colors"
                >
                  <div className="w-5 h-5 rounded-full border-2 border-[#0066cc] flex items-center justify-center">
                    <span className="text-[10px] font-bold ml-0.5">▶</span>
                  </div>
                  <span>How It Works</span>
                </button>
              </div>

              {/* 3 Pillars Row: Transparent Procurement • Trusted Bidders • Stronger India */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs sm:text-sm font-semibold text-[#0F2C59]">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-200/60 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-[#0066cc]" />
                  <span>Transparent Procurement</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-200/60 shadow-2xs">
                  <UserCheck className="w-4 h-4 text-[#0066cc]" />
                  <span>Trusted Bidders</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-200/60 shadow-2xs">
                  <TrendingUp className="w-4 h-4 text-[#0066cc]" />
                  <span>Stronger India</span>
                </div>
              </div>
            </div>

            {/* Right side left spacious for the background image's architectural dome, flag, Ashoka Chakra & trees */}
            <div className="lg:col-span-4 hidden lg:block"></div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 3. GeM AT SCALE (Exact layout and icons from reference image) */}
      {/* ================================================== */}
      <section id="scale-section" className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0 mt-0.5">
                <TrendingUp className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-[26px] font-extrabold text-[#0F2C59] tracking-tight">
                  GeM at Scale
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                  India's public procurement ecosystem operates at significant scale — making reliable compliance verification increasingly important.
                </p>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 self-start md:self-auto text-right">
              <span className="font-semibold text-slate-500">Source:</span> Government of India / Press Information Bureau,<br />GeM performance updates
            </div>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1: ₹20+ lakh crore with Shopping Cart Logo */}
            <div className="bg-white hover:bg-slate-50/60 rounded-2xl p-6 border border-slate-200/90 shadow-2xs flex items-center gap-4 transition-all">
              <div className="w-14 h-14 rounded-full bg-[#e8f1ff] text-[#0066cc] flex items-center justify-center shrink-0">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="21" r="1"/>
                  <circle cx="19" cy="21" r="1"/>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                  {/* Miniature GeM text inside cart */}
                  <text x="12" y="11" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="currentColor" stroke="none">GeM</text>
                </svg>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#0F2C59] tracking-tight leading-tight">
                  ₹20+ <br /><span className="text-lg font-bold">lakh crore</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Cumulative GeM GMV since launch
                </p>
              </div>
            </div>

            {/* Card 2: 3.78+ crore with Document Checkmark */}
            <div className="bg-white hover:bg-slate-50/60 rounded-2xl p-6 border border-slate-200/90 shadow-2xs flex items-center gap-4 transition-all">
              <div className="w-14 h-14 rounded-full bg-[#e6f7ef] text-[#00875a] flex items-center justify-center shrink-0">
                <FileText className="w-7 h-7 stroke-[2]" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#0F2C59] tracking-tight leading-tight">
                  3.78+ <br /><span className="text-lg font-bold">crore</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Cumulative orders since launch
                </p>
              </div>
            </div>

            {/* Card 3: ₹5.03 lakh crore with Bar Chart */}
            <div className="bg-white hover:bg-slate-50/60 rounded-2xl p-6 border border-slate-200/90 shadow-2xs flex items-center gap-4 transition-all">
              <div className="w-14 h-14 rounded-full bg-[#ede7f6] text-[#5e35b1] flex items-center justify-center shrink-0">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="12" width="4" height="9" rx="1" />
                  <rect x="10" y="7" width="4" height="14" rx="1" />
                  <rect x="17" y="3" width="4" height="18" rx="1" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#0F2C59] tracking-tight leading-tight">
                  ₹5.03 <br /><span className="text-lg font-bold">lakh crore</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  GMV in FY 2025–26
                </p>
              </div>
            </div>

            {/* Card 4: 11+ lakh MSEs with People Group */}
            <div className="bg-white hover:bg-slate-50/60 rounded-2xl p-6 border border-slate-200/90 shadow-2xs flex items-center gap-4 transition-all">
              <div className="w-14 h-14 rounded-full bg-[#fff3e0] text-[#e65100] flex items-center justify-center shrink-0">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#0F2C59] tracking-tight leading-tight">
                  11+ <br /><span className="text-lg font-bold">lakh</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  MSEs registered on GeM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 4. THE CHALLENGE */}
      {/* ================================================== */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
            <div className="max-w-3xl mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-sm font-bold">
                  ⚠️
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F2C59] tracking-tight">
                  The Challenge
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                GeM procurement operates at a scale where manual bid verification becomes difficult to sustain. Officers must review multiple bidder documents, compare information across sources and deal with inconsistencies, leading to delays and audit challenges.
              </p>
            </div>

            {/* 4 Key Challenge Vectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0F2C59]">Multiple Documents</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Heavy volume of unstandardized tender PDFs and declarations to verify.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0066cc] flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0F2C59]">Fragmented Sources</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Information spread across siloed external registries and portals.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0F2C59]">Cross Inconsistencies</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Mismatch in entity identities, dates, PAN/GST numbers and credentials.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0F2C59]">Difficult Audits</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Time-consuming manual paper scrutiny prone to post-award disputes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 4B. OUR SOLUTION (Sequential after The Challenge) */}
      {/* ================================================== */}
      <section id="our-solution-section" className="py-12 bg-[#f8fbff] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold">
                    💡
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0F2C59] tracking-tight">
                    Our Solution
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Tender Live brings tender understanding, document verification, authorised source checks, cross-document validation, tender-specific compliance rules, risk scoring and evidence-backed recommendations into one intelligent workflow.
                </p>
              </div>

              <button 
                onClick={onExplorePrototype}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0066cc] hover:bg-[#0055aa] text-white rounded-lg text-xs sm:text-sm font-semibold shadow-xs transition-colors self-start md:self-auto shrink-0"
              >
                <span>Explore</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* 5-Step Process Pipeline */}
            <div className="pt-6 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* 01 */}
                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex flex-col items-center text-center">
                  <span className="font-mono text-blue-600 font-bold text-xs mb-1">01</span>
                  <div className="w-10 h-10 rounded-lg bg-white border border-blue-200 text-[#0066cc] flex items-center justify-center mb-2 shadow-2xs">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-800 text-xs sm:text-sm">Understand</span>
                  <span className="text-[11px] text-slate-500 mt-1 leading-snug">Tender requirements and eligibility rules</span>
                </div>

                {/* 02 */}
                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex flex-col items-center text-center">
                  <span className="font-mono text-blue-600 font-bold text-xs mb-1">02</span>
                  <div className="w-10 h-10 rounded-lg bg-white border border-blue-200 text-[#0066cc] flex items-center justify-center mb-2 shadow-2xs">
                    <Database className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-800 text-xs sm:text-sm">Verify</span>
                  <span className="text-[11px] text-slate-500 mt-1 leading-snug">Bidder documents and authorised sources</span>
                </div>

                {/* 03 */}
                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex flex-col items-center text-center">
                  <span className="font-mono text-blue-600 font-bold text-xs mb-1">03</span>
                  <div className="w-10 h-10 rounded-lg bg-white border border-blue-200 text-[#0066cc] flex items-center justify-center mb-2 shadow-2xs">
                    <Search className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-800 text-xs sm:text-sm">Compare</span>
                  <span className="text-[11px] text-slate-500 mt-1 leading-snug">Cross-document identity and credentials</span>
                </div>

                {/* 04 */}
                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex flex-col items-center text-center">
                  <span className="font-mono text-blue-600 font-bold text-xs mb-1">04</span>
                  <div className="w-10 h-10 rounded-lg bg-white border border-blue-200 text-[#0066cc] flex items-center justify-center mb-2 shadow-2xs">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-800 text-xs sm:text-sm">Assess</span>
                  <span className="text-[11px] text-slate-500 mt-1 leading-snug">Compliance score, risks and discrepancies</span>
                </div>

                {/* 05 */}
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex flex-col items-center text-center">
                  <span className="font-mono text-emerald-600 font-bold text-xs mb-1">05</span>
                  <div className="w-10 h-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center mb-2 shadow-2xs">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-emerald-950 text-xs sm:text-sm">Decide</span>
                  <span className="text-[11px] text-emerald-800 mt-1 leading-snug">Officer reviews evidence and makes final decision</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 5. HOW IT WORKS (Full Section) */}
      {/* ================================================== */}
      <section id="how-it-works-detail" className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0F2C59] tracking-tight">
                  How It Works
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  End-to-end automated bid scrutiny and compliance workflow
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200 self-start md:self-auto">
              5-Stage Verification Flow
            </span>
          </div>

          {/* 5 Step Chronological Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Step 1 */}
            <div className="flex flex-col justify-between p-4 rounded-xl bg-[#f8faff] border border-slate-200/80 hover:border-blue-200 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-100 text-[#0066cc] flex items-center justify-center font-bold text-xs font-mono">
                    01
                  </span>
                  <span className="text-[10px] font-medium text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                    RFP Codification
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#0F2C59] mb-1.5">
                  Understand Tender Requirements
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ingests GeM tender notices, NITs and Corrigenda to extract mandatory technical criteria, GFR Rule 149 clauses, turnover thresholds and experience rules.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col justify-between p-4 rounded-xl bg-[#f8faff] border border-slate-200/80 hover:border-blue-200 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-100 text-[#0066cc] flex items-center justify-center font-bold text-xs font-mono">
                    02
                  </span>
                  <span className="text-[10px] font-medium text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                    OCR &amp; Parsing
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#0F2C59] mb-1.5">
                  Extract &amp; Verify Bidder Documents
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Processes uploaded PDF submissions, CA certificates, GST returns and technical datasheets with OCR extraction and entity disambiguation.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col justify-between p-4 rounded-xl bg-[#f8faff] border border-slate-200/80 hover:border-blue-200 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-100 text-[#0066cc] flex items-center justify-center font-bold text-xs font-mono">
                    03
                  </span>
                  <span className="text-[10px] font-medium text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                    Cross-Validation
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#0F2C59] mb-1.5">
                  Compare Across Registries
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Performs real-time and registry cross-validation across GSTN, Udyam, MCA21, PAN/ITD and DigiLocker to detect mismatches and falsifications.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col justify-between p-4 rounded-xl bg-[#f8faff] border border-slate-200/80 hover:border-blue-200 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-100 text-[#0066cc] flex items-center justify-center font-bold text-xs font-mono">
                    04
                  </span>
                  <span className="text-[10px] font-medium text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                    Rule Engine
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#0F2C59] mb-1.5">
                  Assess Risk &amp; Generate Findings
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Flags discrepancies, computes compliance status (Compliant, Clarification Needed, Non-Compliant), and links findings directly to document source coordinates.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col justify-between p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 hover:border-emerald-300 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs font-mono">
                    05
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-300">
                    Final Authority
                  </span>
                </div>
                <h3 className="text-sm font-bold text-emerald-950 mb-1.5">
                  Officer Decision &amp; Audit Trail
                </h3>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Generates non-repudiable audit trails and transparent evaluation sheets enabling authorised procurement officers to approve, clarify, or reject with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 6. WHY TENDER LIVE? (Placed right after How It Works) */}
      {/* ================================================== */}
      <section id="features-section" className="py-12 bg-[#f9fbff] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-500 text-xl">⭐</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F2C59] tracking-tight">
                Why Tender Live?
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-600">
              Purpose-built intelligence designed for sovereign procurement integrity and speed.
            </p>
          </div>

          {/* 4 Cards strictly matching user text */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tender-Aware Intelligence */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0F2C59]">
                  Tender-Aware Intelligence
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                  Understands the specific eligibility and compliance requirements of each tender.
                </p>
              </div>
            </div>

            {/* Cross-Document Validation */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center mb-3">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0F2C59]">
                  Cross-Document Validation
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                  Compares names, PAN, GST, addresses, dates and credentials across multiple documents and sources.
                </p>
              </div>
            </div>

            {/* Explainable Risk Assessment */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0F2C59]">
                  Explainable Risk Assessment
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                  Provides compliance results with evidence, discrepancies, risk levels and clear reasons.
                </p>
              </div>
            </div>

            {/* Human-in-the-Loop Governance */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066cc] flex items-center justify-center mb-3">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#0F2C59]">
                  Human-in-the-Loop Governance
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                  AI provides insights and recommendations; the authorised Procurement Officer retains the final decision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 6. BUILT FOR RESPONSIBLE PROCUREMENT */}
      {/* ================================================== */}
      <section className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-[#0066cc]" />
                <h3 className="text-xl font-bold text-[#0F2C59]">Built for Responsible Procurement</h3>
              </div>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Tender Live does not replace the Procurement Officer. It provides source-linked evidence, compliance insights, risk signals and explainable recommendations so authorised officers can make informed decisions.
              </p>
            </div>

            {/* 3 Pillars & Officer Support Callout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mt-6 pt-6 border-t border-slate-100">
              <div className="md:col-span-7 grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0066cc] flex items-center justify-center mb-2">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800">Evidence-backed</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0066cc] flex items-center justify-center mb-2">
                    <Search className="w-6 h-6" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800">Explainable</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0066cc] flex items-center justify-center mb-2">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800">Human-controlled</span>
                </div>
              </div>

              {/* Officer seated at desk / government interface banner */}
              <div className="md:col-span-5 p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#0F2C59] text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0F2C59]">Supporting Informed Decisions</div>
                  <div className="text-xs text-slate-500">Government of India Procurement Compliance Interface</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 7. FINAL CTA */}
      {/* ================================================== */}
      <section className="py-10 bg-[#0F2C59] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Turn compliance complexity into trusted decisions.
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/90 mt-1">
              Explore how Tender Live transforms fragmented bid verification into an evidence-based, explainable workflow.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onExplorePrototype}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-100 text-[#0F2C59] font-bold rounded-lg text-xs sm:text-sm shadow-xs transition-colors"
            >
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onViewVerificationWorkflow}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0066cc] hover:bg-[#0055aa] text-white font-semibold rounded-lg text-xs sm:text-sm border border-blue-400/30 transition-colors"
            >
              <span>View Verification Workflow</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 8. FOOTER */}
      {/* ================================================== */}
      <footer id="about-section" className="bg-white text-slate-600 py-8 border-t border-slate-200 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                G
              </div>
              <div>
                <span className="font-bold text-[#0F2C59] text-sm">Tender Live</span>
                <p className="text-[11px] text-slate-500">AI-Powered Bid Compliance &amp; Risk Intelligence Platform</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-slate-600 text-xs">
              <button onClick={() => scrollToSection('hero-section', 'home')} className="hover:text-[#0066cc]">Home</button>
              <button onClick={() => scrollToSection('how-it-works-detail', 'how-it-works')} className="hover:text-[#0066cc]">How It Works</button>
              <button onClick={() => scrollToSection('features-section', 'features')} className="hover:text-[#0066cc]">Why Tender Live</button>
              <button onClick={onExplorePrototype} className="hover:text-[#0066cc]">Reports</button>
              <button onClick={onExplorePrototype} className="hover:text-[#0066cc]">Audit Trail</button>
            </div>

            <div className="text-right text-[11px] text-slate-500">
              <span>Government e-Marketplace (GeM)</span>
              <p className="text-[10px] text-slate-400">National Public Procurement Portal</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
