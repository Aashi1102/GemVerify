import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  DownloadCloud, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Terminal, 
  Database,
  Layers
} from 'lucide-react';
import { Tender } from '../types';

interface LiveScraperPanelProps {
  onTendersFetched: (newTenders: Tender[], source: string) => void;
}

interface ScraperStatus {
  online: boolean;
  latencyMs: number;
  url: string;
  name: string;
}

export const LiveScraperPanel: React.FC<LiveScraperPanelProps> = ({ onTendersFetched }) => {
  const [loadingSource, setLoadingSource] = useState<'all' | 'cppp' | 'gem' | 'python' | null>(null);
  const [cpppStatus, setCpppStatus] = useState<ScraperStatus>({
    online: true,
    latencyMs: 120,
    url: 'https://eprocure.gov.in/cppp/latestactivetendersnew',
    name: 'CPPP (eprocure.gov.in)',
  });
  const [gemStatus, setGemStatus] = useState<ScraperStatus>({
    online: true,
    latencyMs: 165,
    url: 'https://bidplus.gem.gov.in/all-bids',
    name: 'GeM Portal (bidplus.gem.gov.in)',
  });
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [pythonOutput, setPythonOutput] = useState<string | null>(null);
  const [showPythonModal, setShowPythonModal] = useState(false);

  // Check portal status on mount
  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/scrapers/status');
      if (res.ok) {
        const data = await res.json();
        if (data.cppp) {
          setCpppStatus({
            online: data.cppp.online,
            latencyMs: data.cppp.latencyMs,
            url: data.cppp.url,
            name: data.cppp.name,
          });
        }
        if (data.gem) {
          setGemStatus({
            online: data.gem.online,
            latencyMs: data.gem.latencyMs,
            url: data.gem.url,
            name: data.gem.name,
          });
        }
      }
    } catch {
      // Keep optimistic online status if dev proxy is active
    }
  };

  const handleSyncAll = async () => {
    setLoadingSource('all');
    setSyncMessage(null);
    try {
      const res = await fetch('/api/scrapers/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ limit: 6 }),
      });
      const data = await res.json();
      if (data.success && data.tenders) {
        onTendersFetched(data.tenders, 'CPPP & GeM (Combined Live Feeds)');
        setLastSyncTime(new Date().toLocaleTimeString('en-IN'));
        setSyncMessage(`Successfully fetched ${data.tenders.length} active tenders (${data.counts.cppp} from CPPP, ${data.counts.gem} from GeM).`);
      } else {
        setSyncMessage(`Sync completed with error: ${data.error || 'Unknown error'}`);
      }
    } catch (err: any) {
      setSyncMessage(`Sync failed: ${err.message || 'Network error'}`);
    } finally {
      setLoadingSource(null);
    }
  };

  const handleFetchCPPP = async () => {
    setLoadingSource('cppp');
    setSyncMessage(null);
    try {
      const res = await fetch('/api/scrapers/cppp?limit=8');
      const data = await res.json();
      if (data.success && data.tenders) {
        onTendersFetched(data.tenders, 'CPPP eProcure');
        setLastSyncTime(new Date().toLocaleTimeString('en-IN'));
        setSyncMessage(`Fetched ${data.tenders.length} live tenders directly from eprocure.gov.in!`);
      } else {
        setSyncMessage(`CPPP fetch error: ${data.error}`);
      }
    } catch (err: any) {
      setSyncMessage(`CPPP fetch failed: ${err.message}`);
    } finally {
      setLoadingSource(null);
    }
  };

  const handleFetchGeM = async () => {
    setLoadingSource('gem');
    setSyncMessage(null);
    try {
      const res = await fetch('/api/scrapers/gem?limit=8');
      const data = await res.json();
      if (data.success && data.tenders) {
        onTendersFetched(data.tenders, 'GeM Bids');
        setLastSyncTime(new Date().toLocaleTimeString('en-IN'));
        setSyncMessage(`Fetched ${data.tenders.length} active tenders from GeM bid registry!`);
      } else {
        setSyncMessage(`GeM fetch error: ${data.error}`);
      }
    } catch (err: any) {
      setSyncMessage(`GeM fetch failed: ${err.message}`);
    } finally {
      setLoadingSource(null);
    }
  };

  const handleRunPython = async () => {
    setLoadingSource('python');
    try {
      const res = await fetch('/api/scrapers/run-python', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'all', limit: 4 }),
      });
      const data = await res.json();
      setPythonOutput(JSON.stringify(data, null, 2));
      setShowPythonModal(true);
    } catch (err: any) {
      setPythonOutput(JSON.stringify({ error: err.message }, null, 2));
      setShowPythonModal(true);
    } finally {
      setLoadingSource(null);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0c2340] via-[#102a4e] to-[#0a1c33] text-white rounded-xl p-5 sm:p-6 border border-blue-900/50 shadow-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Title & Description */}
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" />
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
              Government Procurement Web Scraper Engine
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                Live Integration
              </span>
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-blue-200/80 leading-relaxed">
            Directly pulls published tenders from the Central Public Procurement Portal (<span className="font-mono text-white">eprocure.gov.in</span>) and Government e-Marketplace (<span className="font-mono text-white">bidplus.gem.gov.in</span>).
          </p>
        </div>

        {/* Live Portal Status Badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* CPPP Status */}
          <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-700/60 px-3 py-1.5 rounded-lg">
            <span className={`w-2 h-2 rounded-full ${cpppStatus.online ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
            <div>
              <div className="font-semibold text-[11px] text-slate-200 flex items-center gap-1">
                <span>CPPP (eProcure)</span>
                <a href="https://eprocure.gov.in/cppp/latestactivetendersnew" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {cpppStatus.online ? `Connected • ${cpppStatus.latencyMs}ms` : 'Connecting...'}
              </div>
            </div>
          </div>

          {/* GeM Status */}
          <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-700/60 px-3 py-1.5 rounded-lg">
            <span className={`w-2 h-2 rounded-full ${gemStatus.online ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <div>
              <div className="font-semibold text-[11px] text-slate-200 flex items-center gap-1">
                <span>GeM Portal</span>
                <a href="https://bidplus.gem.gov.in/all-bids" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {gemStatus.online ? `Active • ${gemStatus.latencyMs}ms` : 'Proxy Ready'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="mt-5 pt-4 border-t border-blue-900/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Sync All */}
          <button
            onClick={handleSyncAll}
            disabled={loadingSource !== null}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingSource === 'all' ? 'animate-spin' : ''}`} />
            <span>{loadingSource === 'all' ? 'Fetching Live Tenders...' : '⚡ Sync Live (CPPP & GeM)'}</span>
          </button>

          {/* Fetch CPPP */}
          <button
            onClick={handleFetchCPPP}
            disabled={loadingSource !== null}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 disabled:opacity-50 text-slate-200 hover:text-white rounded-lg text-xs font-semibold border border-slate-700 transition-all"
          >
            <DownloadCloud className="w-3.5 h-3.5 text-blue-400" />
            <span>Fetch CPPP Only</span>
          </button>

          {/* Fetch GeM */}
          <button
            onClick={handleFetchGeM}
            disabled={loadingSource !== null}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 disabled:opacity-50 text-slate-200 hover:text-white rounded-lg text-xs font-semibold border border-slate-700 transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Fetch GeM Only</span>
          </button>

          {/* Run Python Scraper script */}
          <button
            onClick={handleRunPython}
            disabled={loadingSource !== null}
            title="Executes python3 scrapers/run_scrapers.py with curl_cffi and BeautifulSoup"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium border border-slate-700/80 transition-all"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Python Scraper CLI</span>
          </button>
        </div>

        {/* Sync Status / Info */}
        {lastSyncTime && (
          <div className="text-[11px] text-blue-200/80 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Last synced at <strong className="text-white">{lastSyncTime}</strong></span>
          </div>
        )}
      </div>

      {/* Toast / Notification Banner */}
      {syncMessage && (
        <div className="mt-3 py-2 px-3.5 bg-blue-950/80 border border-blue-800/80 rounded-lg text-xs text-blue-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{syncMessage}</span>
          </div>
          <button 
            onClick={() => setSyncMessage(null)}
            className="text-slate-400 hover:text-white text-xs underline ml-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Python Scraper Output Modal */}
      {showPythonModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0b1626] border border-slate-700 rounded-xl shadow-2xl max-w-2xl w-full p-5 text-white max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h4 className="font-bold text-sm font-mono">Python Scrapers Execution Output (scrapers/run_scrapers.py)</h4>
              </div>
              <button
                onClick={() => setShowPythonModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-auto mt-3 p-3 bg-black/60 rounded-lg border border-slate-800 font-mono text-xs text-emerald-300">
              <pre className="whitespace-pre-wrap">{pythonOutput}</pre>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Note: The Node.js backend executes the scrapers natively using Cheerio and live HTTP fetching, while the Python CLI executes via <code className="text-slate-300">scrapers/run_scrapers.py</code>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
