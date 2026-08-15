import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Globe, 
  Activity, 
  CheckCircle2, 
  Flame, 
  Send, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink,
  Layers,
  Zap,
  Filter,
  RefreshCw,
  Clock,
  Building2,
  FileText
} from 'lucide-react';
import { ProspectLead, ICPSettings } from '../types';

interface FindCustomersViewProps {
  activeCampaign: ICPSettings;
  onTriggerDiscovery: () => void;
  isSearching: boolean;
  prospects: ProspectLead[];
  onSelectProspect: (prospect: ProspectLead) => void;
  onTriggerPitch: (prospect: ProspectLead) => void;
  searchProvider: string;
  onSelectSearchProvider: (provider: string) => void;
}

export const FindCustomersView: React.FC<FindCustomersViewProps> = ({
  activeCampaign,
  onTriggerDiscovery,
  isSearching,
  prospects,
  onSelectProspect,
  onTriggerPitch,
  searchProvider,
  onSelectSearchProvider,
}) => {
  const [selectedSignalFilter, setSelectedSignalFilter] = useState<string>('all');

  // Generated queries based on active campaign
  const generatedQueries = [
    `"${activeCampaign.industry.split(',')[0]} opening new outlet" ${activeCampaign.location.split('(')[0]}`,
    `"${activeCampaign.industry.split(',')[0]} expansion plans" ${activeCampaign.location.split('(')[0]}`,
    `"${activeCampaign.industry.split(',')[0]} hiring chef kitchen manager"`,
    `"cloud kitchen raised funding" ${activeCampaign.location.split('(')[0]}`,
    `"${activeCampaign.industry.split(',')[0]} food quality complaints delivery delay"`,
    `"${activeCampaign.industry.split(',')[0]} looking for consultant partner"`,
  ];

  const filteredProspects = selectedSignalFilter === 'all'
    ? prospects
    : prospects.filter(p => p.signalType === selectedSignalFilter);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Top Search Launcher Panel */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100 relative overflow-hidden">
        {/* Animated Background Ring when searching */}
        {isSearching && (
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Autonomous Buyer-Intent Search Strategy
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Customer Discovery Radar
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Deploys targeted boolean search strings across public PR announcements, job portals, regulatory filings, and review platforms for <strong className="text-slate-200 font-semibold">{activeCampaign.campaignName}</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Provider Selector */}
            <select
              value={searchProvider}
              onChange={(e) => onSelectSearchProvider(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="demo">Demo Search Mode (Simulated Signals)</option>
              <option value="google_web">Google Web Intelligence (Gemini AI)</option>
              <option value="news_wire">Public News & PR Wire</option>
              <option value="job_boards">Job Postings & Hiring Surges</option>
            </select>

            <button
              onClick={onTriggerDiscovery}
              disabled={isSearching}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-xs shadow-xl shadow-emerald-500/25 active:scale-95 transition-all disabled:opacity-60 cursor-pointer shrink-0"
            >
              {isSearching ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Scanning Public Signals...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>START CUSTOMER DISCOVERY</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Search Queries Visualizer */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-emerald-400" />
              Active Boolean Search Queries:
            </span>
            <span className="text-[11px] text-slate-500">6 Strategy Strings Generated</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {generatedQueries.map((q, idx) => (
              <div
                key={idx}
                className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-2 text-[11px] font-mono text-slate-300 truncate flex items-center gap-2"
                title={q}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="truncate">{q}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Discovery Status Bar & Signal Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-bold text-slate-900">
            Discovered Prospects ({filteredProspects.length})
          </span>
          {isSearching && (
            <span className="text-[11px] font-semibold text-emerald-600 animate-pulse bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Extracting intent signals...
            </span>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Signals' },
            { id: 'expansion', label: 'Expansion' },
            { id: 'hiring_surge', label: 'Hiring' },
            { id: 'funding_growth', label: 'Funding' },
            { id: 'negative_reviews', label: 'Reviews' },
            { id: 'franchise_expansion', label: 'Franchise' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedSignalFilter(item.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedSignalFilter === item.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Discovered Prospects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProspects.map((lead) => {
          const score = lead.intentScores?.overall || 75;
          return (
            <div
              key={lead.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md hover:border-emerald-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3
                        onClick={() => onSelectProspect(lead)}
                        className="text-base font-bold text-slate-900 hover:text-emerald-600 cursor-pointer"
                      >
                        {lead.companyName}
                      </h3>
                      {lead.website && (
                        <a
                          href={lead.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-400 hover:text-slate-600"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {lead.industry} • {lead.location}
                    </p>
                  </div>

                  {/* Intent Badge */}
                  <div className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
                    lead.intentTier === 'very_hot'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : lead.intentTier === 'hot'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    <span>{score}/100</span>
                  </div>
                </div>

                {/* FACT vs INFERENCE Blocks */}
                <div className="space-y-2.5 my-4">
                  {/* FACT */}
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/90 text-xs">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase text-amber-800 mb-1">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        Publicly Verified FACT
                      </span>
                      <span>{lead.evidence?.[0]?.source || 'Public Press'}</span>
                    </div>
                    <p className="text-slate-800 font-medium leading-relaxed italic">
                      "{lead.evidence?.[0]?.rawExcerpt || lead.primarySignal}"
                    </p>
                  </div>

                  {/* INFERENCE */}
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/90 text-xs">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase text-emerald-800 mb-1">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        AI Strategic INFERENCE
                      </span>
                      <span>High Problem Urgency</span>
                    </div>
                    <p className="text-slate-900 font-medium leading-relaxed">
                      {lead.inferredOpportunity}
                    </p>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 mb-4">
                  <div>
                    <span className="text-slate-400">Decision Maker:</span> <br />
                    <strong className="text-slate-800 font-semibold">{lead.decisionMaker?.name}</strong> ({lead.decisionMaker?.role})
                  </div>
                  <div>
                    <span className="text-slate-400">Est. Deal Value:</span> <br />
                    <strong className="text-slate-800 font-semibold">{lead.estimatedDealValue}</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => onSelectProspect(lead)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
                >
                  View Full Audit
                </button>

                <button
                  onClick={() => onTriggerPitch(lead)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Generate Pitch</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
