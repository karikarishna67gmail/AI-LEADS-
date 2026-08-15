import React, { useState } from 'react';
import { 
  Kanban, 
  Flame, 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  ExternalLink, 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  DollarSign, 
  Building2,
  Trophy
} from 'lucide-react';
import { ProspectLead, PipelineStage } from '../types';

interface CRMPipelineViewProps {
  prospects: ProspectLead[];
  onSelectProspect: (prospect: ProspectLead) => void;
  onTriggerPitch: (prospect: ProspectLead) => void;
  onUpdateStage: (prospectId: string, stage: PipelineStage) => void;
}

const STAGES: { id: PipelineStage; label: string; color: string; border: string }[] = [
  { id: 'new', label: 'New Discovered', color: 'bg-slate-100 text-slate-800', border: 'border-slate-300' },
  { id: 'qualified', label: 'Qualified (ICP)', color: 'bg-blue-50 text-blue-800', border: 'border-blue-200' },
  { id: 'contacted', label: 'Contacted', color: 'bg-indigo-50 text-indigo-800', border: 'border-indigo-200' },
  { id: 'replied', label: 'Replied / Warm', color: 'bg-amber-50 text-amber-800', border: 'border-amber-200' },
  { id: 'meeting_booked', label: 'Meeting Booked', color: 'bg-purple-50 text-purple-800', border: 'border-purple-200' },
  { id: 'proposal_sent', label: 'Proposal Sent', color: 'bg-cyan-50 text-cyan-800', border: 'border-cyan-200' },
  { id: 'negotiation', label: 'Negotiation', color: 'bg-teal-50 text-teal-800', border: 'border-teal-200' },
  { id: 'closed_won', label: 'Closed Won 🎉', color: 'bg-emerald-50 text-emerald-800', border: 'border-emerald-300' },
  { id: 'closed_lost', label: 'Closed Lost', color: 'bg-rose-50 text-rose-800', border: 'border-rose-200' },
];

export const CRMPipelineView: React.FC<CRMPipelineViewProps> = ({
  prospects,
  onSelectProspect,
  onTriggerPitch,
  onUpdateStage,
}) => {
  const [wonCelebration, setWonCelebration] = useState<string | null>(null);

  const handleStageShift = (prospectId: string, currentStage: PipelineStage, direction: 'prev' | 'next') => {
    const currentIndex = STAGES.findIndex(s => s.id === currentStage);
    if (currentIndex === -1) return;

    let targetIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (targetIndex >= 0 && targetIndex < STAGES.length) {
      const targetStage = STAGES[targetIndex].id;
      onUpdateStage(prospectId, targetStage);

      if (targetStage === 'closed_won') {
        const lead = prospects.find(p => p.id === prospectId);
        setWonCelebration(lead?.companyName || 'Deal');
        setTimeout(() => setWonCelebration(null), 4000);
      }
    }
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6 animate-fade-in">
      {/* Won Celebration Banner */}
      {wonCelebration && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-300 fill-yellow-300" />
            <div>
              <div className="font-extrabold text-sm">DEAL CLOSED WON! 🎉</div>
              <div className="text-xs text-emerald-100">Congratulations on closing {wonCelebration}!</div>
            </div>
          </div>
          <button
            onClick={() => setWonCelebration(null)}
            className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">9-Stage Deal Pipeline</h2>
          <p className="text-xs text-slate-500 mt-1">
            Track high-intent leads through each conversation milestone. Move deals forward with a single click.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">
            Total Pipeline Deals: <strong>{prospects.length}</strong>
          </span>
        </div>
      </div>

      {/* Kanban Board Horizontal Scroll */}
      <div className="flex gap-4 overflow-x-auto pb-6 custom-scrollbar">
        {STAGES.map((col) => {
          const colLeads = prospects.filter(p => p.pipelineStage === col.id);

          return (
            <div
              key={col.id}
              className="w-72 shrink-0 bg-slate-100/70 border border-slate-200/90 rounded-2xl flex flex-col max-h-[780px]"
            >
              {/* Stage Column Header */}
              <div className={`p-3.5 border-b rounded-t-2xl flex items-center justify-between ${col.color} ${col.border}`}>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider">{col.label}</h3>
                  <div className="text-[10px] opacity-80 mt-0.5">
                    {colLeads.length} {colLeads.length === 1 ? 'deal' : 'deals'}
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full bg-white/60 flex items-center justify-center text-[10px] font-bold">
                  {colLeads.length}
                </div>
              </div>

              {/* Cards List in Column */}
              <div className="p-2.5 flex-1 overflow-y-auto space-y-2.5 custom-scrollbar">
                {colLeads.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs italic">
                    No deals in this stage
                  </div>
                ) : (
                  colLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs hover:shadow-md transition-all space-y-2.5"
                    >
                      {/* Card Top */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4
                            onClick={() => onSelectProspect(lead)}
                            className="font-bold text-xs text-slate-900 hover:text-emerald-600 cursor-pointer"
                          >
                            {lead.companyName}
                          </h4>
                          <p className="text-[11px] text-slate-500">{lead.location}</p>
                        </div>

                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                          {lead.intentScores?.overall}/100
                        </span>
                      </div>

                      {/* Signal Snippet */}
                      <div className="text-[11px] text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100 line-clamp-2">
                        {lead.primarySignal}
                      </div>

                      {/* Value & Contact */}
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                        <span className="font-bold text-slate-800">{lead.estimatedDealValue}</span>
                        <span className="truncate max-w-[120px] text-slate-600">{lead.decisionMaker?.name}</span>
                      </div>

                      {/* Stage Shifter Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <button
                          onClick={() => handleStageShift(lead.id, lead.pipelineStage, 'prev')}
                          className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs"
                          title="Move to previous stage"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onTriggerPitch(lead)}
                          className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold flex items-center gap-1"
                        >
                          <Send className="w-2.5 h-2.5" />
                          <span>Pitch</span>
                        </button>

                        <button
                          onClick={() => handleStageShift(lead.id, lead.pipelineStage, 'next')}
                          className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs"
                          title="Move to next stage"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
