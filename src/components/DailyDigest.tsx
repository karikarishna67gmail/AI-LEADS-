import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  Clock, 
  Calendar, 
  Send, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Mail, 
  Phone, 
  Linkedin, 
  MessageSquare, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Zap,
  Filter,
  Check
} from 'lucide-react';
import { ProspectLead, PipelineStage, ViewTab } from '../types';

interface DailyDigestProps {
  prospects: ProspectLead[];
  onSelectProspect: (prospect: ProspectLead) => void;
  onTriggerPitch: (prospect: ProspectLead) => void;
  onUpdateStage?: (prospectId: string, stage: PipelineStage) => void;
  onNavigateTab?: (tab: ViewTab) => void;
}

interface StageCategoryConfig {
  id: string;
  label: string;
  badgeClass: string;
  dotColor: string;
  iconName: string;
  urgencyDescription: string;
  matchingStages: PipelineStage[];
}

const STAGE_CATEGORIES: StageCategoryConfig[] = [
  {
    id: 'proposal',
    label: 'Proposals Pending',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-200',
    dotColor: 'bg-purple-500',
    iconName: 'file-text',
    urgencyDescription: 'High Deal Value • Decision Window Closing',
    matchingStages: ['proposal', 'proposal_sent', 'negotiation']
  },
  {
    id: 'meeting',
    label: 'Meetings & Demos',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
    dotColor: 'bg-blue-500',
    iconName: 'video',
    urgencyDescription: 'Demo Recap / Next Steps Required',
    matchingStages: ['meeting', 'meeting_booked']
  },
  {
    id: 'replied',
    label: 'Active Conversations',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    dotColor: 'bg-emerald-500',
    iconName: 'message-circle',
    urgencyDescription: 'Prospect Inquired • Strike While Warm',
    matchingStages: ['replied', 'in_conversation']
  },
  {
    id: 'contacted',
    label: 'Touchpoint Follow-Ups',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
    dotColor: 'bg-amber-500',
    iconName: 'send',
    urgencyDescription: 'Day 3 Bump / Value-Add Follow-Up',
    matchingStages: ['contacted', 'pitch_ready']
  },
  {
    id: 'qualified',
    label: 'High-Intent Priority',
    badgeClass: 'bg-teal-100 text-teal-800 border-teal-200',
    dotColor: 'bg-teal-500',
    iconName: 'flame',
    urgencyDescription: 'Strongest Buying Signal • Initial Pitch Ready',
    matchingStages: ['qualified', 'reviewed', 'new', 'new_signal']
  }
];

export const DailyDigest: React.FC<DailyDigestProps> = ({
  prospects,
  onSelectProspect,
  onTriggerPitch,
  onUpdateStage,
  onNavigateTab,
}) => {
  const [selectedFilterStage, setSelectedFilterStage] = useState<string>('all');
  const [completedIds, setCompletedIds] = useState<Record<string, boolean>>({});

  // Helper to map prospect to category
  const getProspectCategory = (prospect: ProspectLead): StageCategoryConfig => {
    const stage = prospect.pipelineStage || 'new';
    const matched = STAGE_CATEGORIES.find(cat => cat.matchingStages.includes(stage));
    return matched || STAGE_CATEGORIES[4]; // Default to Qualified / High-Intent
  };

  // Helper to compute urgency reason based on lead state & stage
  const getUrgencyReason = (prospect: ProspectLead, categoryId: string): string => {
    switch (categoryId) {
      case 'proposal':
        return `Follow up on proposal ($${prospect.estimatedDealValue || 'High'}) sent to ${prospect.decisionMaker?.name || 'decision maker'}. Check for budget approval or timeline blockers.`;
      case 'meeting':
        return `Send tailored follow-up recap & case study to ${prospect.decisionMaker?.name || 'team'} following initial discussion.`;
      case 'replied':
        return `${prospect.decisionMaker?.name || 'Prospect'} engaged with outreach regarding "${prospect.primarySignal?.slice(0, 45)}...". Share calendar link today.`;
      case 'contacted':
        return `Touchpoint #2 required: Share 60-second video sample or ROI case study to reignite conversation.`;
      case 'qualified':
      default:
        return `Fresh verified buying signal detected: "${prospect.primarySignal?.slice(0, 60)}...". Send personalized pitch before competitors reach out.`;
    }
  };

  // Smart selection of the Top 5 most urgent prospects
  const urgentProspects = useMemo(() => {
    if (prospects.length === 0) return [];

    // Score leads for urgency:
    // 1. Proposal/Negotiation (1000 pts)
    // 2. Meeting Booked (800 pts)
    // 3. Replied (600 pts)
    // 4. Contacted (400 pts)
    // 5. Qualified/Very Hot (200 pts)
    // + Intent Score (0-100 pts)
    const scored = prospects.map((p, index) => {
      let stageWeight = 200;
      const stage = p.pipelineStage || 'new';

      if (['proposal', 'proposal_sent', 'negotiation'].includes(stage)) stageWeight = 1000;
      else if (['meeting', 'meeting_booked'].includes(stage)) stageWeight = 800;
      else if (['replied', 'in_conversation'].includes(stage)) stageWeight = 600;
      else if (['contacted', 'pitch_ready'].includes(stage)) stageWeight = 400;
      else if (p.intentTier === 'very_hot') stageWeight = 350;
      else if (p.intentTier === 'hot') stageWeight = 250;

      // Add a slight spread if stages are all identical so list has nice stage diversity if available
      const overallScore = (p.intentScores?.overall || 70) + stageWeight;

      return {
        prospect: p,
        urgencyWeight: overallScore,
        category: getProspectCategory(p),
      };
    });

    // If we have leads with varied stages, sort by urgency weight
    const sorted = scored.sort((a, b) => b.urgencyWeight - a.urgencyWeight);

    // Take top 5
    return sorted.slice(0, 5);
  }, [prospects]);

  // Filtered list
  const filteredList = useMemo(() => {
    if (selectedFilterStage === 'all') return urgentProspects;
    return urgentProspects.filter(item => item.category.id === selectedFilterStage);
  }, [urgentProspects, selectedFilterStage]);

  // Stage Breakdown Counts in top 5
  const stageCounts = useMemo(() => {
    const counts: Record<string, number> = { all: urgentProspects.length };
    STAGE_CATEGORIES.forEach(cat => {
      counts[cat.id] = urgentProspects.filter(item => item.category.id === cat.id).length;
    });
    return counts;
  }, [urgentProspects]);

  const toggleCompleted = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Today formatted
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }).format(new Date());

  const completedCount = Object.values(completedIds).filter(Boolean).length;

  if (prospects.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5">
      {/* Header with Date & Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>DAILY DIGEST: TOP 5 URGENT FOLLOW-UPS</span>
            </h3>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {todayFormatted}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Prioritized by CRM deal stages, buyer intent velocity, and pending response windows.
          </p>
        </div>

        {/* Action / Progress stats */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-[11px] font-bold text-slate-700">
              {completedCount} of {urgentProspects.length} Actioned
            </div>
            <div className="w-28 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / Math.max(1, urgentProspects.length)) * 100}%` }}
              />
            </div>
          </div>

          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab('pipeline')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>View Full CRM Pipeline</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Stage Categories Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
        <button
          onClick={() => setSelectedFilterStage('all')}
          className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all shrink-0 cursor-pointer ${
            selectedFilterStage === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
          }`}
        >
          All Urgent ({urgentProspects.length})
        </button>

        {STAGE_CATEGORIES.map(cat => {
          const count = stageCounts[cat.id] || 0;
          if (count === 0 && selectedFilterStage !== cat.id) return null;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedFilterStage(cat.id)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                selectedFilterStage === cat.id
                  ? `${cat.badgeClass} font-bold shadow-xs`
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${cat.dotColor}`} />
              <span>{cat.label}</span>
              <span className="text-[10px] opacity-75 font-bold">({count})</span>
            </button>
          );
        })}
      </div>

      {/* 5 Urgent Prospect Cards */}
      <div className="space-y-3">
        {filteredList.map(({ prospect, category }, idx) => {
          const isDone = !!completedIds[prospect.id];
          const reason = getUrgencyReason(prospect, category.id);
          const stageDisplay = (prospect.pipelineStage || 'new').replace('_', ' ').toUpperCase();

          return (
            <div
              key={prospect.id}
              className={`p-4 rounded-xl border transition-all ${
                isDone
                  ? 'bg-slate-50/80 border-slate-200 opacity-60'
                  : 'bg-white hover:bg-slate-50/50 border-slate-200 hover:border-emerald-400/80 hover:shadow-md'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                {/* Left: Checkbox, Rank, Info & Urgency */}
                <div className="flex items-start gap-3 min-w-0">
                  {/* Quick Action Checkmark */}
                  <button
                    onClick={(e) => toggleCompleted(prospect.id, e)}
                    className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                      isDone
                        ? 'bg-emerald-500 border-emerald-600 text-white'
                        : 'border-slate-300 hover:border-emerald-500 text-transparent hover:text-slate-300'
                    }`}
                    title={isDone ? 'Mark as pending' : 'Mark follow-up complete'}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </button>

                  <div className="min-w-0 space-y-1">
                    {/* Header Row: Company, CRM Stage Badge, Intent Score */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        onClick={() => onSelectProspect(prospect)}
                        className={`font-bold text-sm text-slate-900 hover:text-emerald-700 cursor-pointer ${
                          isDone ? 'line-through text-slate-500' : ''
                        }`}
                      >
                        {prospect.companyName}
                      </span>

                      {/* Categorized CRM Stage Badge */}
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${category.badgeClass} flex items-center gap-1`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${category.dotColor}`} />
                        <span>STAGE: {stageDisplay}</span>
                      </span>

                      {/* Intent Tier Badge */}
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        prospect.intentTier === 'very_hot'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        <Flame className="w-2.5 h-2.5 fill-current" />
                        {prospect.intentScores?.overall || 85}/100 INTENT
                      </span>

                      <span className="text-xs text-slate-500">• {prospect.location}</span>
                    </div>

                    {/* Urgency Recommendation Bar */}
                    <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-200/70 text-amber-950 text-xs flex items-start gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-900 font-bold">TODAY'S ACTION:</strong> {reason}
                      </div>
                    </div>

                    {/* Metadata Row */}
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 flex-wrap pt-0.5">
                      <span className="flex items-center gap-1">
                        <strong className="text-slate-700 font-semibold">{prospect.decisionMaker?.name || 'Key Executive'}</strong>
                        <span>({prospect.decisionMaker?.role || 'Decision Maker'})</span>
                      </span>
                      <span>•</span>
                      <span>Est. Deal: <strong className="text-emerald-800 font-bold">{prospect.estimatedDealValue || '$2,500'}</strong></span>
                      <span>•</span>
                      <span>Target Service: <strong className="text-slate-700 font-semibold">{prospect.recommendedOffer || 'Video Editing Retainer'}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Right: Quick Action Controls */}
                <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                  {/* Advance CRM Stage Quick Dropdown */}
                  {onUpdateStage && (
                    <select
                      value={prospect.pipelineStage || 'new'}
                      onChange={(e) => onUpdateStage(prospect.id, e.target.value as PipelineStage)}
                      className="text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none cursor-pointer"
                    >
                      <option value="new">New Lead</option>
                      <option value="qualified">Qualified</option>
                      <option value="contacted">Contacted</option>
                      <option value="replied">Replied</option>
                      <option value="meeting_booked">Meeting Booked</option>
                      <option value="proposal_sent">Proposal Sent</option>
                      <option value="negotiation">Negotiation</option>
                      <option value="closed_won">Closed Won</option>
                    </select>
                  )}

                  <button
                    onClick={() => onSelectProspect(prospect)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Inspect Deal
                  </button>

                  <button
                    onClick={() => onTriggerPitch(prospect)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Open Pitch</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
