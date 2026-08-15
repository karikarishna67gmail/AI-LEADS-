import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Flame, 
  Send, 
  Bookmark, 
  ExternalLink, 
  Filter, 
  ArrowUpDown, 
  ChevronRight, 
  CheckSquare, 
  Square,
  Building2,
  FileText,
  Clock,
  Sparkles,
  Download,
  Plus
} from 'lucide-react';
import { ProspectLead, PipelineStage, IntentTier } from '../types';

interface ProspectsTableViewProps {
  prospects: ProspectLead[];
  onSelectProspect: (prospect: ProspectLead) => void;
  onTriggerPitch: (prospect: ProspectLead) => void;
  onToggleSave: (prospectId: string) => void;
  onUpdateStage: (prospectId: string, stage: PipelineStage) => void;
  onExportCSV: (selectedOnly?: boolean) => void;
}

export const ProspectsTableView: React.FC<ProspectsTableViewProps> = ({
  prospects,
  onSelectProspect,
  onTriggerPitch,
  onToggleSave,
  onUpdateStage,
  onExportCSV,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [signalFilter, setSignalFilter] = useState<string>('all');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'score' | 'deal' | 'recent'>('score');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filtering and sorting
  const filteredProspects = useMemo(() => {
    return prospects.filter((p) => {
      const matchesSearch = 
        p.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.decisionMaker?.name && p.decisionMaker.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        p.primarySignal.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTier = tierFilter === 'all' || p.intentTier === tierFilter;
      const matchesSignal = signalFilter === 'all' || p.signalType === signalFilter;
      const matchesStage = stageFilter === 'all' || p.pipelineStage === stageFilter;

      return matchesSearch && matchesTier && matchesSignal && matchesStage;
    }).sort((a, b) => {
      if (sortBy === 'score') {
        return (b.intentScores?.overall || 0) - (a.intentScores?.overall || 0);
      }
      if (sortBy === 'recent') {
        return new Date(b.lastDiscoveredAt || 0).getTime() - new Date(a.lastDiscoveredAt || 0).getTime();
      }
      return 0;
    });
  }, [prospects, searchTerm, tierFilter, signalFilter, stageFilter, sortBy]);

  const handleSelectAll = () => {
    if (selectedIds.length === filteredProspects.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProspects.map(p => p.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5 animate-fade-in">
      {/* Search & Filter Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by company, decision maker, signal, location..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Quick Stats & Export */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">
              Showing {filteredProspects.length} of {prospects.length}
            </span>

            {selectedIds.length > 0 && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                {selectedIds.length} selected
              </span>
            )}

            <button
              onClick={() => onExportCSV(selectedIds.length > 0)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export {selectedIds.length > 0 ? `(${selectedIds.length})` : 'All'} CSV</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          {/* Tier Filter */}
          <div className="flex items-center gap-1">
            <span className="text-slate-400 font-medium">Tier:</span>
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none"
            >
              <option value="all">All Tiers</option>
              <option value="very_hot">🔥 Very Hot (80–100)</option>
              <option value="hot">⚡ Hot (60–79)</option>
              <option value="warm">Warm (30–59)</option>
              <option value="cold">Cold (0–29)</option>
            </select>
          </div>

          {/* Signal Filter */}
          <div className="flex items-center gap-1">
            <span className="text-slate-400 font-medium">Signal:</span>
            <select
              value={signalFilter}
              onChange={(e) => setSignalFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none"
            >
              <option value="all">All Signals</option>
              <option value="expansion">Expansion</option>
              <option value="hiring_surge">Hiring Surge</option>
              <option value="funding_growth">Funding Inflow</option>
              <option value="negative_reviews">Negative Reviews</option>
              <option value="franchise_expansion">Franchise Growth</option>
            </select>
          </div>

          {/* Pipeline Stage */}
          <div className="flex items-center gap-1">
            <span className="text-slate-400 font-medium">Stage:</span>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none"
            >
              <option value="all">All Pipeline Stages</option>
              <option value="new">New Discovered</option>
              <option value="qualified">Qualified</option>
              <option value="contacted">Contacted</option>
              <option value="replied">Replied</option>
              <option value="meeting_booked">Meeting Booked</option>
              <option value="proposal_sent">Proposal Sent</option>
              <option value="closed_won">Closed Won 🎉</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1 ml-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none"
            >
              <option value="score">Sort: Highest Intent Score</option>
              <option value="recent">Sort: Most Recent Signal</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 w-10">
                  <button onClick={handleSelectAll} className="text-slate-400 hover:text-slate-700">
                    {selectedIds.length === filteredProspects.length && filteredProspects.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="py-3.5 px-4">Company & Target</th>
                <th className="py-3.5 px-4">Intent Score</th>
                <th className="py-3.5 px-4">Buying Signal (FACT)</th>
                <th className="py-3.5 px-4">Est. Deal Value</th>
                <th className="py-3.5 px-4">Pipeline Stage</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredProspects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-semibold text-slate-600">No prospects match your active filters.</p>
                    <p className="text-xs mt-1">Try resetting the filters or running an Autonomous Customer Discovery search.</p>
                  </td>
                </tr>
              ) : (
                filteredProspects.map((lead) => {
                  const isSelected = selectedIds.includes(lead.id);
                  const score = lead.intentScores?.overall || 70;

                  return (
                    <tr
                      key={lead.id}
                      className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-emerald-50/40' : ''}`}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 px-4">
                        <button onClick={() => toggleSelectOne(lead.id)} className="text-slate-400 hover:text-slate-700">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* Company & Target */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            onClick={() => onSelectProspect(lead)}
                            className="font-bold text-slate-900 hover:text-emerald-600 cursor-pointer"
                          >
                            {lead.companyName}
                          </span>
                          {lead.website && (
                            <a href={lead.website} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-600">
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {lead.location} • <span className="font-semibold text-slate-700">{lead.decisionMaker?.name}</span> ({lead.decisionMaker?.role})
                        </div>
                      </td>

                      {/* Intent Score */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className={`px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1 ${
                            lead.intentTier === 'very_hot'
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : lead.intentTier === 'hot'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            <Flame className="w-3 h-3 fill-current" />
                            <span>{score}/100</span>
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-400 capitalize mt-0.5 font-medium">
                          {lead.intentTier.replace('_', ' ')}
                        </div>
                      </td>

                      {/* Buying Signal */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-medium text-slate-800 line-clamp-1">
                          {lead.primarySignal}
                        </div>
                        <div className="text-[11px] text-emerald-700 font-medium line-clamp-1 mt-0.5">
                          → {lead.recommendedOffer}
                        </div>
                      </td>

                      {/* Deal Value */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-800">{lead.estimatedDealValue}</span>
                        <div className="text-[10px] text-slate-400">Est. contract</div>
                      </td>

                      {/* Pipeline Stage */}
                      <td className="py-3.5 px-4">
                        <select
                          value={lead.pipelineStage}
                          onChange={(e) => onUpdateStage(lead.id, e.target.value as PipelineStage)}
                          className="bg-slate-50 border border-slate-200 text-slate-800 text-[11px] font-semibold rounded-lg px-2 py-1 focus:outline-none"
                        >
                          <option value="new">New</option>
                          <option value="qualified">Qualified</option>
                          <option value="contacted">Contacted</option>
                          <option value="replied">Replied</option>
                          <option value="meeting_booked">Meeting</option>
                          <option value="proposal_sent">Proposal</option>
                          <option value="closed_won">Won 🎉</option>
                          <option value="closed_lost">Lost</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onToggleSave(lead.id)}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              lead.isSaved
                                ? 'bg-amber-50 border-amber-300 text-amber-600'
                                : 'border-slate-200 text-slate-400 hover:text-slate-600'
                            }`}
                            title="Save prospect"
                          >
                            <Bookmark className="w-3.5 h-3.5 fill-current" />
                          </button>

                          <button
                            onClick={() => onSelectProspect(lead)}
                            className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                          >
                            Audit
                          </button>

                          <button
                            onClick={() => onTriggerPitch(lead)}
                            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-2xs transition-all"
                          >
                            <Send className="w-3 h-3" />
                            <span>Pitch</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
