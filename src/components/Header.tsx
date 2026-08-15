import React from 'react';
import { 
  Radar, 
  Flame, 
  Sparkles, 
  SlidersHorizontal, 
  Kanban, 
  Cpu, 
  Download, 
  Search,
  CheckCircle2,
  TrendingUp,
  Coins
} from 'lucide-react';
import { ProspectLead, ICPSettings } from '../types';

interface HeaderProps {
  activeTab: 'leads' | 'icp' | 'crm' | 'signals' | 'architecture';
  setActiveTab: (tab: 'leads' | 'icp' | 'crm' | 'signals' | 'architecture') => void;
  prospects: ProspectLead[];
  icp: ICPSettings;
  onQuickSearch: () => void;
  isSearching: boolean;
  onExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  prospects,
  icp,
  onQuickSearch,
  isSearching,
  onExport,
}) => {
  const hotLeadsCount = prospects.filter(p => p.intentTier === 'hot').length;
  const warmLeadsCount = prospects.filter(p => p.intentTier === 'warm').length;
  const totalPipelineCount = prospects.length;

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-white shadow-sm ring-1 ring-slate-800">
              <Radar className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-slate-900">BuyIntent<span className="text-amber-600">.AI</span></span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Engine
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Event-Driven Buyer Intent & Customer Finder
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hidden lg:flex items-center gap-6 px-4 py-2 bg-slate-50 border border-slate-200/80 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <span className="text-xs text-slate-500">Hot Signals:</span>
              <span className="text-xs font-bold text-rose-600 flex items-center gap-0.5">
                <Flame className="w-3.5 h-3.5 fill-rose-500" />
                {hotLeadsCount} Today
              </span>
            </div>

            <div className="h-4 w-px bg-slate-200" />

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Warm Signals:</span>
              <span className="text-xs font-semibold text-amber-700">{warmLeadsCount} Active</span>
            </div>

            <div className="h-4 w-px bg-slate-200" />

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Active ICP:</span>
              <span className="text-xs font-semibold text-slate-800 truncate max-w-[170px]" title={icp.productName}>
                {icp.productName}
              </span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onExport}
              title="Export leads to CSV"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Export Leads</span>
            </button>

            <button
              onClick={onQuickSearch}
              disabled={isSearching}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-all duration-150 disabled:opacity-60 cursor-pointer active:scale-98"
            >
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  <span>Scanning Web Signals...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Find High-Intent Customers</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2 border-t border-slate-100 text-xs sm:text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'leads'
                ? 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            <Radar className="w-4 h-4" />
            <span>Opportunities ({prospects.length})</span>
            {hotLeadsCount > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                activeTab === 'leads' ? 'bg-amber-400 text-slate-950' : 'bg-rose-100 text-rose-700'
              }`}>
                {hotLeadsCount} HOT
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('icp')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'icp'
                ? 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>ICP & Signal Triggers</span>
          </button>

          <button
            onClick={() => setActiveTab('crm')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'crm'
                ? 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            <Kanban className="w-4 h-4" />
            <span>Intent Pipeline & CRM</span>
          </button>

          <button
            onClick={() => setActiveTab('signals')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'signals'
                ? 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Signal Lab & Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              activeTab === 'architecture'
                ? 'bg-slate-900 text-white font-semibold shadow-xs'
                : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>System Architecture</span>
          </button>
        </div>
      </div>
    </header>
  );
};
