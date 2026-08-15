import React from 'react';
import { 
  Kanban, 
  Flame, 
  Sparkles, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  ChevronRight,
  Send,
  FileText
} from 'lucide-react';
import { ProspectLead, PipelineStage } from '../types';

interface CRMViewProps {
  prospects: ProspectLead[];
  onSelectLead: (lead: ProspectLead) => void;
  onGeneratePitch: (lead: ProspectLead) => void;
  onUpdateStage: (leadId: string, stage: PipelineStage) => void;
}

const STAGES: { id: PipelineStage; label: string; icon: string; countColor: string }[] = [
  { id: 'new_signal', label: '⚡ New Signals', icon: '⚡', countColor: 'bg-rose-100 text-rose-800' },
  { id: 'reviewed', label: '👀 Under Review', icon: '👀', countColor: 'bg-amber-100 text-amber-800' },
  { id: 'pitch_ready', label: '✍️ Pitch Ready', icon: '✍️', countColor: 'bg-blue-100 text-blue-800' },
  { id: 'contacted', label: '✉️ Contacted', icon: '✉️', countColor: 'bg-purple-100 text-purple-800' },
  { id: 'in_conversation', label: '💬 In Discussion', icon: '💬', countColor: 'bg-indigo-100 text-indigo-800' },
  { id: 'closed_won', label: '🏆 Closed / Won', icon: '🏆', countColor: 'bg-emerald-100 text-emerald-800' },
];

export const CRMView: React.FC<CRMViewProps> = ({
  prospects,
  onSelectLead,
  onGeneratePitch,
  onUpdateStage,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Kanban className="w-5 h-5 text-amber-600" />
            <span>Intent-Led CRM Pipeline</span>
          </h2>
          <p className="text-xs text-slate-500">
            Track and advance high-intent prospects through your outbound qualification pipeline.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">Total Pipeline:</span>
          <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
            {prospects.length} Opportunities
          </span>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageLeads = prospects.filter((p) => (p.pipelineStage || 'new_signal') === stage.id);

          return (
            <div
              key={stage.id}
              className="bg-slate-50/80 border border-slate-200 rounded-2xl p-3 flex flex-col min-w-[240px] max-h-[75vh]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                  <span>{stage.label}</span>
                </div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${stage.countColor}`}>
                  {stageLeads.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="space-y-2.5 overflow-y-auto pr-1 flex-1">
                {stageLeads.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl bg-white/50">
                    No leads in this stage
                  </div>
                ) : (
                  stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all space-y-2 cursor-pointer"
                      onClick={() => onSelectLead(lead)}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-slate-900 hover:text-amber-700 transition-colors">
                          {lead.companyName}
                        </h4>
                        <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 shrink-0">
                          {lead.intentScores.overall}%
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-tight">
                        "{lead.primarySignal}"
                      </p>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-emerald-700">
                          {lead.estimatedDealValue}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onGeneratePitch(lead);
                          }}
                          className="p-1 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                          title="Generate or View Pitch"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        </button>
                      </div>

                      {/* Stage Advancement dropdown */}
                      <div className="pt-1" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.pipelineStage || 'new_signal'}
                          onChange={(e) => onUpdateStage(lead.id, e.target.value as PipelineStage)}
                          className="w-full text-[10px] font-medium py-1 px-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-700 focus:outline-none"
                        >
                          {STAGES.map((s) => (
                            <option key={s.id} value={s.id}>
                              Move to: {s.label}
                            </option>
                          ))}
                        </select>
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
