import React from 'react';
import { 
  Sparkles, 
  Download, 
  Search, 
  Activity, 
  Flame, 
  ShieldCheck,
  ChevronRight,
  RefreshCw,
  Plus
} from 'lucide-react';
import { ViewTab } from '../types';

interface AppHeaderProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  onTriggerDiscovery: () => void;
  onExportCSV: () => void;
  isSearching: boolean;
  isDemoMode: boolean;
  totalHotLeads: number;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentTab,
  onSelectTab,
  onTriggerDiscovery,
  onExportCSV,
  isSearching,
  isDemoMode,
  totalHotLeads,
}) => {
  const getTabDetails = (tab: ViewTab) => {
    switch (tab) {
      case 'dashboard':
        return {
          title: 'Intelligence Dashboard',
          subtitle: 'Signal discovery pipeline, high-intent prospects, and revenue opportunities.',
        };
      case 'find_customers':
        return {
          title: 'Autonomous Customer Discovery Engine',
          subtitle: 'Multi-query public signal scraper, intent classifier, and evidence extractor.',
        };
      case 'campaigns':
        return {
          title: 'Product & ICP Campaigns',
          subtitle: 'Define what you sell, target demographics, deal thresholds, and active buying signals.',
        };
      case 'prospects':
        return {
          title: 'Prospect Intelligence Directory',
          subtitle: 'Examine all verified business prospects, intent scores, and evidence sources.',
        };
      case 'hot_leads':
        return {
          title: 'High-Intent Action Board',
          subtitle: 'Prospects with ≥80 Intent Score ready for immediate multi-channel outreach.',
        };
      case 'pipeline':
        return {
          title: '9-Stage CRM Deal Pipeline',
          subtitle: 'Track deals from initial signal to proposal, negotiation, and closed won.',
        };
      case 'outreach':
        return {
          title: 'AI Multi-Channel Outreach Generator',
          subtitle: 'Hyper-personalized emails, LinkedIn notes, WhatsApp messages, and cold call scripts.',
        };
      case 'saved':
        return {
          title: 'Saved & Starred Prospects',
          subtitle: 'Bookmarked high-priority prospects with custom tags and private notes.',
        };
      case 'analytics':
        return {
          title: 'Revenue & Intent Analytics',
          subtitle: 'Conversion funnels, signal win rates, and intent score correlation data.',
        };
      case 'settings':
        return {
          title: 'Workspace & Provider Settings',
          subtitle: 'Manage search providers, API keys, AI model prompts, and billing tiers.',
        };
      default:
        return {
          title: 'BuyIntent AI',
          subtitle: 'AI-Powered Customer Discovery & Buying-Intent Platform',
        };
    }
  };

  const details = getTabDetails(currentTab);

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 shadow-xs">
      {/* Title & Context */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-0.5">
          <span>BuyIntent AI</span>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-emerald-700 capitalize">{currentTab.replace('_', ' ')}</span>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">{details.title}</h1>
          
          {isDemoMode ? (
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              <ShieldCheck className="w-3 h-3 text-amber-600" />
              Demo Search Mode
            </span>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <Activity className="w-3 h-3 text-emerald-600 animate-pulse" />
              Live Search Engine
            </span>
          )}
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2.5 flex-wrap">
        {/* Hot Leads Quick Link */}
        {totalHotLeads > 0 && currentTab !== 'hot_leads' && (
          <button
            onClick={() => onSelectTab('hot_leads')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors"
          >
            <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
            <span>{totalHotLeads} Hot Leads</span>
          </button>
        )}

        {/* CSV Export */}
        <button
          onClick={onExportCSV}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 transition-colors"
          title="Export discovered prospects to CSV"
        >
          <Download className="w-3.5 h-3.5 text-slate-600" />
          <span className="hidden sm:inline">Export CSV</span>
        </button>

        {/* Primary CTA: FIND CUSTOMERS */}
        <button
          onClick={onTriggerDiscovery}
          disabled={isSearching}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 shadow-sm shadow-emerald-700/20 active:scale-95 transition-all disabled:opacity-60 cursor-pointer"
        >
          {isSearching ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Scanning Signals...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
              <span>FIND CUSTOMERS</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
