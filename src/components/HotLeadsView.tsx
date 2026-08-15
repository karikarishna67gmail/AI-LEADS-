import React from 'react';
import { 
  Flame, 
  Clock, 
  Send, 
  Bookmark, 
  ExternalLink, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  BadgeDollarSign
} from 'lucide-react';
import { ProspectLead } from '../types';

interface HotLeadsViewProps {
  prospects: ProspectLead[];
  onSelectProspect: (prospect: ProspectLead) => void;
  onTriggerPitch: (prospect: ProspectLead) => void;
  onToggleSave: (prospectId: string) => void;
}

export const HotLeadsView: React.FC<HotLeadsViewProps> = ({
  prospects,
  onSelectProspect,
  onTriggerPitch,
  onToggleSave,
}) => {
  const hotLeads = prospects.filter(
    p => p.intentTier === 'very_hot' || p.intentTier === 'hot' || (p.intentScores?.overall || 0) >= 60
  ).sort((a, b) => (b.intentScores?.overall || 0) - (a.intentScores?.overall || 0));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 border border-amber-500/40 rounded-2xl p-6 shadow-lg text-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              High-Velocity Outbound Queue
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {hotLeads.length} Hot Leads Ready For Contact
          </h2>
          <p className="text-xs text-amber-200/80 mt-1 max-w-2xl">
            These prospects scored ≥60 on our Intent Engine. Recent public triggers indicate maximum willingness to engage. We recommend initiating multi-channel contact within 48 hours of signal discovery.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-950/70 border border-slate-800 p-3 rounded-xl">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-400">Total Hot Pipeline</div>
            <div className="text-lg font-extrabold text-emerald-400">₹48.5 Lakhs</div>
          </div>
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {hotLeads.map((lead, idx) => {
          const score = lead.intentScores?.overall || 85;
          return (
            <div
              key={lead.id}
              className="bg-white border-2 border-amber-200/80 hover:border-amber-400 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              {/* Left Column: Details */}
              <div className="space-y-3 flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold text-xs shrink-0 shadow-sm shadow-amber-500/30">
                    #{idx + 1}
                  </div>

                  <h3
                    onClick={() => onSelectProspect(lead)}
                    className="text-lg font-bold text-slate-900 hover:text-emerald-600 cursor-pointer"
                  >
                    {lead.companyName}
                  </h3>

                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
                    <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{score}/100 INTENT</span>
                  </div>

                  <span className="text-xs text-slate-400">• {lead.industry} • {lead.location}</span>
                </div>

                {/* Evidence Callout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-xs">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-amber-800 mb-1">
                      <FileText className="w-3 h-3" />
                      <span>Verified Trigger Event (FACT)</span>
                    </div>
                    <p className="text-slate-800 font-medium italic">
                      "{lead.evidence?.[0]?.rawExcerpt || lead.primarySignal}"
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-xs">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-emerald-800 mb-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>Why Contact Now (AI INFERENCE)</span>
                    </div>
                    <p className="text-slate-900 font-medium">
                      {lead.inferredOpportunity}
                    </p>
                  </div>
                </div>

                {/* Persona & Value */}
                <div className="flex items-center gap-4 text-xs text-slate-600 flex-wrap">
                  <div>
                    <span className="text-slate-400">Target Decision Maker:</span>{' '}
                    <strong className="text-slate-800 font-semibold">{lead.decisionMaker?.name}</strong> ({lead.decisionMaker?.role})
                  </div>
                  <div>•</div>
                  <div>
                    <span className="text-slate-400">Est Deal Value:</span>{' '}
                    <strong className="text-emerald-700 font-bold">{lead.estimatedDealValue}</strong>
                  </div>
                  <div>•</div>
                  <div>
                    <span className="text-slate-400">Optimal Window:</span>{' '}
                    <span className="text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Next 48 Hours
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
                <button
                  onClick={() => onTriggerPitch(lead)}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Generate AI Pitch</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectProspect(lead)}
                    className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors text-center"
                  >
                    Inspect Full Audit
                  </button>
                  <button
                    onClick={() => onToggleSave(lead.id)}
                    className={`p-2 rounded-xl border transition-colors ${
                      lead.isSaved ? 'bg-amber-50 border-amber-300 text-amber-600' : 'border-slate-200 text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
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
