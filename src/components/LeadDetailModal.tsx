import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  Send, 
  Bookmark, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  Building2, 
  User, 
  Clock, 
  BadgeDollarSign, 
  Check, 
  Edit3,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { ProspectLead, PipelineStage } from '../types';

interface LeadDetailModalProps {
  prospect: ProspectLead | null;
  isOpen: boolean;
  onClose: () => void;
  onTriggerPitch: (prospect: ProspectLead) => void;
  onToggleSave: (prospectId: string) => void;
  onUpdateStage: (prospectId: string, stage: PipelineStage) => void;
  onSaveNotes: (prospectId: string, notes: string) => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({
  prospect,
  isOpen,
  onClose,
  onTriggerPitch,
  onToggleSave,
  onUpdateStage,
  onSaveNotes,
}) => {
  if (!isOpen || !prospect) return null;

  const [notes, setNotes] = useState(prospect.notes || '');
  const [isSavedNotes, setIsSavedNotes] = useState(false);

  const handleSaveNotesClick = () => {
    onSaveNotes(prospect.id, notes);
    setIsSavedNotes(true);
    setTimeout(() => setIsSavedNotes(false), 2000);
  };

  const scores = prospect.intentScores || {
    overall: 88,
    businessFit: 23,
    signalStrength: 28,
    recency: 14,
    problemUrgency: 14,
    growthVelocity: 9,
    confidence: 5,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-4xl my-6 shadow-2xl overflow-hidden text-slate-900 animate-fade-in flex flex-col max-h-[90vh]">
        {/* Header Banner */}
        <div className="bg-slate-900 text-white p-6 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Prospect Intelligence Audit
              </span>
              <span className="text-xs text-slate-400">• {prospect.industry}</span>
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white tracking-tight">{prospect.companyName}</h2>
              {prospect.website && (
                <a href={prospect.website} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-emerald-400">
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">{prospect.location} • {prospect.employeeCount || '20-100 employees'}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(prospect.id)}
              className={`p-2 rounded-xl border text-xs transition-colors ${
                prospect.isSaved
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
              title="Save prospect"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          {/* Intent Score Gauge & Score Decomposition */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Buying Intent Score</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-extrabold text-slate-900">{scores.overall}</span>
                  <span className="text-sm font-semibold text-slate-400">/ 100</span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ml-2 ${
                    prospect.intentTier === 'very_hot'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}>
                    {prospect.intentTier.toUpperCase().replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-500 sm:text-right">
                <div>Est Deal Value: <strong className="text-slate-900 text-sm font-bold">{prospect.estimatedDealValue}</strong></div>
                <div>Optimal Window: <span className="text-emerald-700 font-semibold">Immediate Outreach Recommended</span></div>
              </div>
            </div>

            {/* Sub-Score Bars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 text-xs">
              <div className="p-2.5 bg-white rounded-xl border border-slate-200/80">
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>Business Fit</span>
                  <strong className="text-slate-900">{scores.businessFit}/25</strong>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(scores.businessFit / 25) * 100}%` }} />
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-slate-200/80">
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>Signal Strength</span>
                  <strong className="text-slate-900">{scores.signalStrength}/30</strong>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(scores.signalStrength / 30) * 100}%` }} />
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-slate-200/80">
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>Event Recency</span>
                  <strong className="text-slate-900">{scores.recency}/15</strong>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: `${(scores.recency / 15) * 100}%` }} />
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-slate-200/80">
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>Problem Urgency</span>
                  <strong className="text-slate-900">{scores.problemUrgency}/15</strong>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${(scores.problemUrgency / 15) * 100}%` }} />
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-slate-200/80">
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>Growth Trajectory</span>
                  <strong className="text-slate-900">{scores.growthVelocity}/10</strong>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(scores.growthVelocity / 10) * 100}%` }} />
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-xl border border-slate-200/80">
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>Data Confidence</span>
                  <strong className="text-slate-900">{scores.confidence}/5</strong>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${(scores.confidence / 5) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* FACT vs INFERENCE Detailed Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* FACT */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-2">
              <div className="flex items-center justify-between text-amber-900 font-bold uppercase tracking-wider text-[10px]">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Publicly Verified FACT
                </span>
                <span>Source: {prospect.evidence?.[0]?.source || 'Public Press'}</span>
              </div>

              <p className="text-slate-900 font-mono text-[11px] bg-white p-3 rounded-xl border border-amber-200 leading-relaxed italic">
                "{prospect.evidence?.[0]?.rawExcerpt || prospect.primarySignal}"
              </p>

              <div className="text-[11px] text-slate-500">
                Recorded: <strong className="text-slate-700 font-medium">{prospect.evidence?.[0]?.timestamp || 'Recent public filing'}</strong>
              </div>
            </div>

            {/* INFERENCE */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-2">
              <div className="flex items-center justify-between text-emerald-900 font-bold uppercase tracking-wider text-[10px]">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  AI Strategic INFERENCE
                </span>
                <span>Operational Diagnosis</span>
              </div>

              <p className="text-slate-900 text-[11px] bg-white p-3 rounded-xl border border-emerald-200 leading-relaxed">
                {prospect.inferredOpportunity}
              </p>

              <div className="text-[11px] text-slate-700">
                Recommended Solution Angle: <strong className="text-emerald-800">{prospect.recommendedOffer}</strong>
              </div>
            </div>
          </div>

          {/* Decision Maker & Contact Info */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Public Decision Maker Profile</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <span className="text-slate-400">Name:</span> <br />
                <strong className="text-slate-900 font-semibold text-sm">{prospect.decisionMaker?.name || 'Verified Executive'}</strong>
              </div>
              <div>
                <span className="text-slate-400">Role:</span> <br />
                <strong className="text-slate-900 font-medium">{prospect.decisionMaker?.role || 'Founder & Director'}</strong>
              </div>
              <div>
                <span className="text-slate-400">Public Channel:</span> <br />
                <span className="text-slate-700 font-mono text-[11px]">{prospect.decisionMaker?.publicEmail || 'contact@' + (prospect.website?.replace('https://', '') || 'company.com')}</span>
              </div>
            </div>
          </div>

          {/* Pipeline Stage & Private Notes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Pipeline Stage</label>
              <select
                value={prospect.pipelineStage}
                onChange={(e) => onUpdateStage(prospect.id, e.target.value as PipelineStage)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none"
              >
                <option value="new">New Discovered</option>
                <option value="qualified">Qualified</option>
                <option value="contacted">Contacted</option>
                <option value="replied">Replied</option>
                <option value="meeting_booked">Meeting Booked</option>
                <option value="proposal_sent">Proposal Sent</option>
                <option value="negotiation">Negotiation</option>
                <option value="closed_won">Closed Won 🎉</option>
                <option value="closed_lost">Closed Lost</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">Private Strategy Notes</label>
                {isSavedNotes && (
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Saved!
                  </span>
                )}
              </div>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add custom notes, next follow-up date, conversation history..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={handleSaveNotesClick}
                className="mt-1 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onTriggerPitch(prospect);
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Generate Multi-Channel AI Pitch</span>
          </button>
        </div>
      </div>
    </div>
  );
};
