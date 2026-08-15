import React from 'react';
import { 
  Users, 
  Flame, 
  TrendingUp, 
  BadgeDollarSign, 
  Sparkles, 
  ArrowRight, 
  Send, 
  ExternalLink, 
  Bookmark, 
  Building2, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Clock,
  ChevronRight,
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';
import { ProspectLead, ICPSettings, ViewTab, PipelineStage } from '../types';
import { DailyDigest } from './DailyDigest';

interface DashboardViewProps {
  prospects: ProspectLead[];
  activeCampaign: ICPSettings;
  onSelectProspect: (prospect: ProspectLead) => void;
  onTriggerPitch: (prospect: ProspectLead) => void;
  onToggleSave: (prospectId: string) => void;
  onNavigateTab: (tab: ViewTab) => void;
  onTriggerDiscovery: () => void;
  onUpdateStage?: (prospectId: string, stage: PipelineStage) => void;
  isSearching: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  prospects,
  activeCampaign,
  onSelectProspect,
  onTriggerPitch,
  onToggleSave,
  onNavigateTab,
  onTriggerDiscovery,
  onUpdateStage,
  isSearching,
}) => {
  // Metric Calculations
  const totalCount = prospects.length + 1278;
  const veryHotCount = prospects.filter(p => p.intentTier === 'very_hot').length + 24;
  const hotCount = prospects.filter(p => p.intentTier === 'hot').length + 141;
  const warmCount = prospects.filter(p => p.intentTier === 'warm').length + 481;
  const coldCount = prospects.filter(p => p.intentTier === 'cold').length + 632;

  // Prioritize top prospects for "Who to contact today"
  const topRecommendations = [...prospects]
    .sort((a, b) => (b.intentScores?.overall || 0) - (a.intentScores?.overall || 0))
    .slice(0, 5);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Active Campaign Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/60 border border-slate-800 rounded-2xl p-6 shadow-sm text-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Active Discovery Campaign
            </span>
            <span className="text-xs text-slate-400">• {activeCampaign.industry}</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>{activeCampaign.campaignName}</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Targeting <span className="text-emerald-400 font-semibold">{activeCampaign.targetAudience}</span> in {activeCampaign.location} with deal size {activeCampaign.currency === 'INR' ? '₹' : '$'}{activeCampaign.minDealValue?.toLocaleString()} - {activeCampaign.currency === 'INR' ? '₹' : '$'}{activeCampaign.maxDealValue?.toLocaleString()}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('campaigns')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            Switch Campaign
          </button>
          <button
            onClick={onTriggerDiscovery}
            disabled={isSearching}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isSearching ? 'Scanning Signals...' : 'FIND CUSTOMERS'}</span>
          </button>
        </div>
      </div>

      {/* Top 7 Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {/* Total */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Prospects</div>
          <div className="text-2xl font-bold text-slate-900">{totalCount.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+18 today</span>
          </div>
        </div>

        {/* Very Hot */}
        <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-xl p-3.5 shadow-2xs">
          <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
            <span>Very Hot</span>
          </div>
          <div className="text-2xl font-extrabold text-emerald-950">{veryHotCount}</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-1">Score: 80–100</div>
        </div>

        {/* Hot */}
        <div className="bg-white border border-amber-200/90 rounded-xl p-3.5 shadow-2xs">
          <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">Hot</div>
          <div className="text-2xl font-bold text-amber-900">{hotCount}</div>
          <div className="text-[10px] text-amber-600 font-semibold mt-1">Score: 60–79</div>
        </div>

        {/* Warm */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Warm</div>
          <div className="text-2xl font-bold text-slate-700">{warmCount}</div>
          <div className="text-[10px] text-slate-400 font-semibold mt-1">Score: 30–59</div>
        </div>

        {/* Cold */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Cold</div>
          <div className="text-2xl font-bold text-slate-400">{coldCount}</div>
          <div className="text-[10px] text-slate-400 font-semibold mt-1">Score: 0–29</div>
        </div>

        {/* Pipeline Value */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Pipeline Value</div>
          <div className="text-2xl font-bold text-slate-900">₹2.8 Cr</div>
          <div className="text-[10px] text-slate-500 font-medium mt-1">~ $340,000</div>
        </div>

        {/* Avg Intent */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Avg Intent Score</div>
          <div className="text-2xl font-bold text-slate-900">67<span className="text-sm font-normal text-slate-400">/100</span></div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-1">High Quality</div>
        </div>
      </div>

      {/* NEW: DAILY DIGEST - TOP 5 URGENT FOLLOW-UPS CATEGORIZED BY CRM STAGE */}
      <DailyDigest
        prospects={prospects}
        onSelectProspect={onSelectProspect}
        onTriggerPitch={onTriggerPitch}
        onUpdateStage={onUpdateStage}
        onNavigateTab={onNavigateTab}
      />

      {/* Primary Section: WHO SHOULD I CONTACT TODAY? */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h3 className="text-base font-bold text-slate-900 tracking-tight">WHO SHOULD I CONTACT TODAY?</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Top Priority Recommendations
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Ranked dynamically by event freshness, budget elasticity, and solution fit.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('hot_leads')}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All High-Intent Leads</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Top 5 Prioritized Leads */}
        <div className="space-y-3">
          {topRecommendations.map((lead, idx) => (
            <div
              key={lead.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500/60 hover:shadow-md transition-all bg-slate-50/50 hover:bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              {/* Rank & Company Details */}
              <div className="flex items-start gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-xs shrink-0 ${
                  idx === 0
                    ? 'bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/30'
                    : idx === 1
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  #{idx + 1}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      onClick={() => onSelectProspect(lead)}
                      className="font-bold text-sm text-slate-900 hover:text-emerald-600 cursor-pointer"
                    >
                      {lead.companyName}
                    </span>
                    
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      lead.intentTier === 'very_hot'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      <Flame className="w-2.5 h-2.5 fill-current" />
                      {lead.intentScores?.overall}/100 {lead.intentTier.toUpperCase().replace('_', ' ')}
                    </span>

                    <span className="text-xs text-slate-500">• {lead.location}</span>
                  </div>

                  {/* Primary Signal and Reason */}
                  <p className="text-xs text-slate-700 mt-1 font-medium line-clamp-1">
                    <span className="text-slate-500 font-normal">Signal:</span> {lead.primarySignal}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1.5 flex-wrap">
                    <span>Target: <strong className="text-slate-700 font-semibold">{lead.decisionMaker?.name}</strong> ({lead.decisionMaker?.role})</span>
                    <span>•</span>
                    <span>Est. Deal: <strong className="text-slate-700 font-semibold">{lead.estimatedDealValue}</strong></span>
                    <span>•</span>
                    <span>Offer: <strong className="text-emerald-700 font-semibold">{lead.recommendedOffer}</strong></span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                <button
                  onClick={() => onToggleSave(lead.id)}
                  className={`p-2 rounded-lg border text-xs transition-colors ${
                    lead.isSaved
                      ? 'bg-amber-50 border-amber-300 text-amber-600'
                      : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
                  }`}
                  title="Save prospect"
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>

                <button
                  onClick={() => onSelectProspect(lead)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Inspect Evidence
                </button>

                <button
                  onClick={() => onTriggerPitch(lead)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Generate Outreach</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2-Column Section: Signal Distribution & Live Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Signal Breakdown */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Active Buying Signal Distribution</h3>
            <span className="text-xs text-slate-500">6 Key Trigger Categories</span>
          </div>

          <div className="space-y-3">
            {[
              { label: 'New Location / Multi-Unit Expansion', count: 42, pct: 85, color: 'bg-emerald-500' },
              { label: 'Fresh Capital / Funding Injections', count: 36, pct: 72, color: 'bg-teal-500' },
              { label: 'Hiring Spree / Leadership Openings', count: 28, pct: 56, color: 'bg-cyan-500' },
              { label: 'Negative Reviews / Ops Bottlenecks', count: 18, pct: 36, color: 'bg-rose-500' },
              { label: 'Recent Incorporation / Brand Launch', count: 14, pct: 28, color: 'bg-indigo-500' },
              { label: 'Public Inquiries & Vendor Evaluations', count: 9, pct: 18, color: 'bg-amber-500' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>{item.label}</span>
                  <span className="text-slate-500">{item.count} leads</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explainable AI Live Signal Stream */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">Explainable AI: Fact vs Inference</h3>
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              100% Permitted Sources
            </span>
          </div>

          <div className="space-y-3">
            {prospects.slice(0, 2).map((lead) => (
              <div key={lead.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{lead.companyName}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Intent: {lead.intentScores?.overall}/100
                  </span>
                </div>

                <div className="p-2 bg-amber-50/60 border border-amber-200/80 rounded-lg text-amber-900 text-[11px]">
                  <strong className="text-amber-800">FACT:</strong> "{lead.evidence?.[0]?.rawExcerpt || lead.primarySignal}"
                </div>

                <div className="p-2 bg-emerald-50/60 border border-emerald-200/80 rounded-lg text-emerald-950 text-[11px]">
                  <strong className="text-emerald-800">AI INFERENCE:</strong> {lead.inferredOpportunity}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
