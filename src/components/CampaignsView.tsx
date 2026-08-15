import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  Sparkles, 
  Flame, 
  Users, 
  BadgeDollarSign, 
  Edit3, 
  Play, 
  Pause, 
  Copy, 
  Trash2, 
  Building2, 
  Globe, 
  Check, 
  Tag
} from 'lucide-react';
import { ICPSettings } from '../types';
import { PRESET_ICPS } from '../data/presetICPs';

interface CampaignsViewProps {
  campaigns: ICPSettings[];
  activeCampaignId: string;
  onSelectActiveCampaign: (campaign: ICPSettings) => void;
  onOpenCreateCampaign: () => void;
  onTriggerDiscovery: (campaign: ICPSettings) => void;
}

export const CampaignsView: React.FC<CampaignsViewProps> = ({
  campaigns,
  activeCampaignId,
  onSelectActiveCampaign,
  onOpenCreateCampaign,
  onTriggerDiscovery,
}) => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Product & ICP Campaigns</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Each campaign defines an offering, target geography, budget thresholds, and trigger signals that our autonomous search radar monitors.
          </p>
        </div>

        <button
          onClick={onOpenCreateCampaign}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs active:scale-95 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Product Campaign</span>
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {campaigns.map((camp) => {
          const isActive = camp.id === activeCampaignId;
          const currencySymbol = camp.currency === 'USD' ? '$' : '₹';

          return (
            <div
              key={camp.id || camp.campaignName}
              className={`rounded-2xl border transition-all p-6 flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-900 border-emerald-500 shadow-xl text-slate-100 ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200 text-slate-800 hover:shadow-md'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-800/40">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isActive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {camp.status || 'Active'}
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Currently Active
                        </span>
                      )}
                    </div>
                    <h3 className={`text-base font-bold mt-1.5 ${isActive ? 'text-white' : 'text-slate-900'}`}>
                      {camp.campaignName}
                    </h3>
                  </div>

                  <button
                    onClick={() => onSelectActiveCampaign(camp)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isActive ? 'Active' : 'Set as Active'}
                  </button>
                </div>

                {/* Offering Details */}
                <div className="py-4 space-y-3 text-xs">
                  <div>
                    <span className={`font-semibold ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>Offering:</span>
                    <p className={`mt-0.5 leading-relaxed ${isActive ? 'text-slate-200' : 'text-slate-700'}`}>
                      {camp.productDescription || camp.productName}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <span className={`font-semibold ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>Target Industry:</span>
                      <p className={`font-medium ${isActive ? 'text-white' : 'text-slate-800'}`}>{camp.industry}</p>
                    </div>
                    <div>
                      <span className={`font-semibold ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>Location:</span>
                      <p className={`font-medium ${isActive ? 'text-white' : 'text-slate-800'}`}>{camp.location}</p>
                    </div>
                    <div>
                      <span className={`font-semibold ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>Deal Range:</span>
                      <p className={`font-medium ${isActive ? 'text-emerald-400 font-bold' : 'text-emerald-700 font-bold'}`}>
                        {currencySymbol}{camp.minDealValue?.toLocaleString()} – {currencySymbol}{camp.maxDealValue?.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className={`font-semibold ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>Target Persona:</span>
                      <p className={`font-medium ${isActive ? 'text-white' : 'text-slate-800'}`}>{camp.targetAudience}</p>
                    </div>
                  </div>

                  {/* Signals Active */}
                  <div className="pt-2">
                    <span className={`font-semibold ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>Tracked Signals:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {camp.enabledSignals?.map((sig) => (
                        <span
                          key={sig}
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            isActive
                              ? 'bg-slate-800 text-emerald-300 border border-slate-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {sig.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className={`pt-4 border-t flex items-center justify-between gap-3 ${
                isActive ? 'border-slate-800' : 'border-slate-100'
              }`}>
                <div className="text-[11px] font-medium text-slate-400">
                  {camp.keywords?.length || 0} Search Keywords Active
                </div>

                <button
                  onClick={() => onTriggerDiscovery(camp)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run Discovery</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
