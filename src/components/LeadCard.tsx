import React from 'react';
import { 
  Flame, 
  Sparkles, 
  FileText, 
  Send, 
  ExternalLink, 
  MapPin, 
  Briefcase, 
  Users, 
  CheckCircle, 
  Clock, 
  ChevronRight, 
  Building,
  Target,
  BadgeDollarSign,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { ProspectLead, PipelineStage } from '../types';

interface LeadCardProps {
  lead: ProspectLead;
  onSelectLead: (lead: ProspectLead) => void;
  onGeneratePitch: (lead: ProspectLead) => void;
  onUpdateStage: (leadId: string, stage: PipelineStage) => void;
}

export const LeadCard: React.FC<LeadCardProps> = ({
  lead,
  onSelectLead,
  onGeneratePitch,
  onUpdateStage,
}) => {
  const [copied, setCopied] = React.useState(false);

  const getTierBadge = (tier: string, score: number) => {
    if (tier === 'hot' || score >= 85) {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold shadow-2xs">
          <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-600 animate-pulse" />
          <span>{score}/100 🔥 Very High Intent</span>
        </div>
      );
    }
    if (tier === 'warm' || score >= 70) {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          <span>{score}/100 🟠 Warm Intent</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium">
        <span className="w-2 h-2 rounded-full bg-slate-400"></span>
        <span>{score}/100 🔵 Potential</span>
      </div>
    );
  };

  const getSignalBadgeColor = (type: string) => {
    switch (type) {
      case 'expansion':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'hiring_surge':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'funding_growth':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'negative_reviews':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'outdated_tech':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'public_inquiry':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-200';
    }
  };

  const handleCopyPitchAngle = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(lead.recommendedPitchAngle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="group relative bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
    >
      {/* Top Header: Company name & Score Badge */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                {lead.companyName}
              </h3>
              {lead.website && (
                <a
                  href={lead.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                  title="Visit website"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
              <span className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                {lead.industry}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {lead.location}
              </span>
              {lead.employeeCount && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {lead.employeeCount} team
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="shrink-0">
            {getTierBadge(lead.intentTier, lead.intentScores.overall)}
          </div>
        </div>

        {/* Primary Event Signal Section */}
        <div className="my-3.5 p-3.5 bg-slate-50/90 border border-slate-200/80 rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${getSignalBadgeColor(lead.signalType)}`}>
              <Sparkles className="w-3 h-3" />
              {lead.signalType.replace('_', ' ').toUpperCase()} SIGNAL
            </span>
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {lead.detectedAt}
            </span>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-slate-800 line-clamp-2 leading-relaxed">
            "{lead.primarySignal}"
          </p>

          <div className="pt-2 border-t border-slate-200/60 flex items-start gap-2">
            <Target className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 leading-snug">
              <span className="font-medium text-slate-800">Inferred Opportunity: </span>
              {lead.inferredOpportunity}
            </div>
          </div>
        </div>

        {/* Sub-scores Radar Pills */}
        <div className="grid grid-cols-4 gap-1.5 py-1 mb-3.5 text-center">
          <div className="bg-slate-50 rounded-lg p-1.5 border border-slate-100">
            <span className="block text-[10px] text-slate-600 font-medium">Urgency</span>
            <span className="text-xs font-bold text-slate-800">{lead.intentScores.urgency}%</span>
          </div>
          <div className="bg-slate-50 rounded-lg p-1.5 border border-slate-100">
            <span className="block text-[10px] text-slate-600 font-medium">Budget</span>
            <span className="text-xs font-bold text-slate-800">{lead.intentScores.budgetPower}%</span>
          </div>
          <div className="bg-slate-50 rounded-lg p-1.5 border border-slate-100">
            <span className="block text-[10px] text-slate-600 font-medium">Fit</span>
            <span className="text-xs font-bold text-slate-800">{lead.intentScores.solutionFit}%</span>
          </div>
          <div className="bg-slate-50 rounded-lg p-1.5 border border-slate-100">
            <span className="block text-[10px] text-slate-600 font-medium">Timing</span>
            <span className="text-xs font-bold text-slate-800">{lead.intentScores.timingFreshness}%</span>
          </div>
        </div>

        {/* Decision Maker & Deal Value */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs mb-4">
          <div>
            <span className="text-slate-600 block text-[11px]">Decision Maker</span>
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <span>{lead.decisionMaker.name}</span>
              <span className="text-[11px] font-normal text-slate-600">({lead.decisionMaker.role})</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-slate-600 block text-[11px]">Est. Deal Size</span>
            <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-xs">
              {lead.estimatedDealValue}
            </span>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectLead(lead)}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>View Evidence ({lead.evidence.length})</span>
          </button>

          <button
            onClick={handleCopyPitchAngle}
            title="Copy recommended outreach hook"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy Hook</span>
              </>
            )}
          </button>
        </div>

        <button
          onClick={() => onGeneratePitch(lead)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-all active:scale-98 cursor-pointer ml-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Generate Pitch</span>
        </button>
      </div>
    </div>
  );
};
