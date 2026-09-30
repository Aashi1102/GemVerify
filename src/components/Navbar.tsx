import React, { useState } from 'react';
import { GeMLogo } from './GeMLogo';
import { 
  Eye, 
  Bell, 
  Plus, 
  Menu, 
  X,
  FileCheck2,
  Sparkles,
  Globe
} from 'lucide-react';
import { NavigationTab } from '../types';

interface NavbarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onLaunchDemo: () => void;
  onOpenUpload: () => void;
  onOpenScraper?: () => void;
  onOpenLogin?: () => void;
  unreadAlertsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onLaunchDemo,
  onOpenUpload,
  onOpenScraper,
  onOpenLogin,
  unreadAlertsCount = 3,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Dedicated desktop navigation items
  const desktopNavItems: { id: NavigationTab; label: string }[] = [
    { id: 'landing', label: 'Home' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'tenders', label: 'Tenders' },
    { id: 'reports', label: 'Reports' },
    { id: 'audit-trail', label: 'Audit Trail' },
  ];

  // Mobile menu items including quick action
  const mobileNavItems: { id: NavigationTab; label: string; isAction?: boolean }[] = [
    { id: 'landing', label: 'Home (Landing Page)' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'tenders', label: 'Tenders' },
    { id: 'reports', label: 'Reports' },
    { id: 'audit-trail', label: 'Audit Trail' },
    { id: 'new-verification', label: '+ Upload New Tender PDF', isAction: true },
  ];

  const handleNavClick = (id: NavigationTab, isAction?: boolean) => {
    if (isAction) {
      onOpenUpload();
    } else {
      onSelectTab(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          {/* Brand Logo & Desktop Navigation */}
          <div className="flex items-center gap-3 xl:gap-5 min-w-0">
            <button 
              onClick={() => onSelectTab('landing')} 
              className="flex items-center gap-2.5 text-left focus:outline-hidden group shrink-0"
              id="brand-logo-btn"
              title="Tender Live — From Documents to Trusted Decisions"
            >
              <GeMLogo className="w-9 h-9 sm:w-10 sm:h-10 drop-shadow-xs group-hover:scale-105 transition-transform" />
              <div className="flex flex-col justify-center min-w-0">
                <div className="flex items-center gap-1.5 whitespace-nowrap leading-none">
                  <span className="font-bold text-base sm:text-lg tracking-tight whitespace-nowrap">
                    <span className="text-[#0F2C59]">Tender </span>
                    <span className="text-[#166534]">Live</span>
                  </span>
                  <span className="text-[9.5px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                    GovTech
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-500 font-medium whitespace-nowrap leading-tight mt-0.5 hidden xl:block">
                  From Documents to Trusted Decisions
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 ml-1 xl:ml-3" aria-label="Main Navigation">
              {desktopNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-2.5 xl:px-3.5 py-1.5 text-xs xl:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#e5eeff] text-[#0F2C59] font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
            {/* Live Scraper Button */}
            {onOpenScraper && (
              <button
                id="btn-live-scraper"
                onClick={onOpenScraper}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 bg-gradient-to-r from-blue-700 via-indigo-800 to-[#0F2C59] hover:from-blue-800 hover:to-slate-900 active:bg-blue-900 text-white text-xs font-semibold rounded-lg shadow-xs transition-all hover:shadow-sm whitespace-nowrap shrink-0 border border-blue-400/20"
                title="Scrape active tenders directly from GeM and CPPP portals"
              >
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-300 animate-pulse" />
                <span>Live Scraper</span>
              </button>
            )}

            {/* 1-Click Demo Button */}
            <button
              id="btn-one-click-demo"
              onClick={onLaunchDemo}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-all hover:shadow-sm whitespace-nowrap shrink-0"
              title="Launch Tender 1024 interactive verification walk-through"
            >
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
              <span>1-Click Demo</span>
            </button>

            {/* Notifications Bell with Dropdown */}
            <div className="relative shrink-0">
              <button
                id="btn-notifications"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors focus:outline-hidden"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadAlertsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0F2C59] uppercase tracking-wider">Officer Alerts</span>
                    <span className="text-[10px] bg-red-100 text-red-700 font-semibold px-2 py-0.5 rounded-full">{unreadAlertsCount} pending</span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                    <div 
                      onClick={() => { onLaunchDemo(); setShowNotifications(false); }} 
                      className="px-3 py-2.5 hover:bg-blue-50/50 cursor-pointer text-xs transition-colors"
                    >
                      <p className="font-semibold text-slate-800">GEM/2026/PROC/1024: 21.4% CA Turnover Shortfall</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">GSTN reconciliation mismatch for Apex Cloud Solutions.</p>
                      <span className="text-[10px] text-amber-600 font-medium">10 mins ago</span>
                    </div>
                    <div 
                      onClick={() => { onSelectTab('tenders'); setShowNotifications(false); }} 
                      className="px-3 py-2.5 hover:bg-blue-50/50 cursor-pointer text-xs transition-colors"
                    >
                      <p className="font-semibold text-slate-800">GEM/2026/PROC/1009: Expired EMD Guarantee</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">Solar PV Bidder BG validity lapsed on 31 August.</p>
                      <span className="text-[10px] text-red-600 font-medium">2 hours ago</span>
                    </div>
                    <div 
                      onClick={() => { onSelectTab('reports'); setShowNotifications(false); }} 
                      className="px-3 py-2.5 hover:bg-blue-50/50 cursor-pointer text-xs transition-colors"
                    >
                      <p className="font-semibold text-slate-800">Medical Tender 1018: Technical Clearance Signed</p>
                      <p className="text-slate-500 text-[11px] mt-0.5">Audit log SHA-256 recorded successfully.</p>
                      <span className="text-[10px] text-emerald-600 font-medium">Yesterday</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Officer Profile Badge */}
            <div 
              className="flex items-center gap-2 pl-2 border-l border-slate-200 shrink-0" 
              id="officer-profile-badge"
              title="Designated Officer: R. K. Sharma (Procurement Officer)"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0F2C59] text-white flex items-center justify-center font-bold text-xs shadow-xs ring-2 ring-blue-100 shrink-0">
                PO
              </div>
              <div className="hidden xl:block text-left whitespace-nowrap">
                <div className="text-xs font-bold text-slate-900 leading-tight">R. K. Sharma</div>
                <div className="text-[10px] text-slate-500 leading-tight">Procurement Officer</div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                id="btn-mobile-menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 rounded-lg"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-200 space-y-1">
            {mobileNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.isAction)}
                className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                  activeTab === item.id
                    ? 'bg-[#e5eeff] text-[#0F2C59] font-bold'
                    : item.isAction
                    ? 'text-blue-700 hover:bg-blue-50 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  onLaunchDemo();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold"
              >
                <Eye className="w-4 h-4" />
                <span>1-Click Demo (Tender 1024)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
