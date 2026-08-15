import React, { useState } from 'react';
import { 
  Bookmark, 
  Trash2, 
  Send, 
  Download, 
  ExternalLink, 
  Edit3, 
  Check, 
  Plus, 
  Flame, 
  Building2,
  FileText
} from 'lucide-react';
import { ProspectLead } from '../types';

interface SavedProspectsViewProps {
  prospects: ProspectLead[];
  onSelectProspect: (prospect: ProspectLead) => void;
  onTriggerPitch: (prospect: ProspectLead) => void;
  onToggleSave: (prospectId: string) => void;
  onExportCSV: () => void;
}

export const SavedProspectsView: React.FC<SavedProspectsViewProps> = ({
  prospects,
  onSelectProspect,
  onTriggerPitch,
  onToggleSave,
  onExportCSV,
}) => {
  const savedLeads = prospects.filter(p => p.isSaved);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Saved & Starred Leads ({savedLeads.length})
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Prospects bookmarked for priority follow-up, partner assignment, or customized campaign batching.
          </p>
        </div>

        {savedLeads.length > 0 && (
          <button
            onClick={onExportCSV}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Saved Leads CSV</span>
          </button>
        )}
      </div>

      {/* Leads Grid */}
      {savedLeads.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center text-slate-400 space-y-3">
          <Bookmark className="w-8 h-8 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">No Saved Leads Yet</h3>
          <p className="text-xs max-w-md mx-auto text-slate-500">
            Click the bookmark icon on any prospect card or table row across the dashboard to store them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {savedLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h3
                      onClick={() => onSelectProspect(lead)}
                      className="text-base font-bold text-slate-900 hover:text-emerald-600 cursor-pointer"
                    >
                      {lead.companyName}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{lead.location} • {lead.industry}</p>
                  </div>

                  <button
                    onClick={() => onToggleSave(lead.id)}
                    className="text-amber-500 hover:text-rose-500 p-1 transition-colors"
                    title="Remove from saved"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>

                <div className="space-y-2.5 my-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-slate-800">
                    <span className="font-bold text-amber-900 block text-[10px] uppercase">Buying Signal:</span>
                    <p className="italic">"{lead.primarySignal}"</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-950">
                    <span className="font-bold text-emerald-800 block text-[10px] uppercase">Recommended Offer:</span>
                    <p>{lead.recommendedOffer}</p>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 mb-3">
                  Decision Maker: <strong className="text-slate-800">{lead.decisionMaker?.name}</strong> ({lead.decisionMaker?.role})
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => onSelectProspect(lead)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200"
                >
                  Audit Details
                </button>

                <button
                  onClick={() => onTriggerPitch(lead)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Generate Pitch</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
