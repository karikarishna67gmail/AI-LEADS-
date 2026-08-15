import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  Sparkles, 
  Target, 
  MapPin, 
  Coins, 
  Tag, 
  CheckSquare, 
  Square, 
  Check, 
  Zap, 
  Layers,
  Utensils,
  Code,
  TrendingUp,
  Building2,
  Dumbbell
} from 'lucide-react';
import { ICPSettings, SignalType } from '../types';
import { PRESET_ICPS } from '../data/presetICPs';

interface ICPSettingsFormProps {
  icp: ICPSettings;
  onSaveICP: (newICP: ICPSettings) => void;
  onRunSearch: () => void;
  isSearching: boolean;
}

const ALL_SIGNALS: { type: SignalType; label: string; description: string }[] = [
  { 
    type: 'expansion', 
    label: 'Opening New Branches / Expansion', 
    description: 'Companies announcing 2nd+ outlets, new cities, or footprint growth' 
  },
  { 
    type: 'hiring_surge', 
    label: 'Hiring Surges / Key Roles Open', 
    description: 'Recruiting for critical roles indicating internal scaling bottlenecks' 
  },
  { 
    type: 'funding_growth', 
    label: 'Funding Rounds / Capital Injection', 
    description: 'Recently raised Seed/Series A/debt with active deployment budgets' 
  },
  { 
    type: 'negative_reviews', 
    label: 'Customer Review Spikes / Ops Issues', 
    description: 'Ratings drops, delivery bottlenecks, or public service failures' 
  },
  { 
    type: 'outdated_tech', 
    label: 'Tech Debt / Slow Website / UX Flaws', 
    description: 'Outdated legacy systems, broken checkouts, or mobile speed issues' 
  },
  { 
    type: 'public_inquiry', 
    label: 'Public Forum Inquiries & Vendor Bids', 
    description: 'Founders actively asking for vendor recommendations or tools' 
  },
  { 
    type: 'new_incorporation', 
    label: 'Recently Launched / Incorporated', 
    description: 'New businesses needing foundational systems and operational setup' 
  },
];

export const ICPSettingsForm: React.FC<ICPSettingsFormProps> = ({
  icp,
  onSaveICP,
  onRunSearch,
  isSearching,
}) => {
  const [formData, setFormData] = useState<ICPSettings>(icp);
  const [keywordInput, setKeywordInput] = useState('');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('fnb-consulting-india');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleApplyPreset = (presetId: string) => {
    const found = PRESET_ICPS.find(p => p.id === presetId);
    if (found) {
      setSelectedPresetId(presetId);
      setFormData(found.icp);
    }
  };

  const handleToggleSignal = (type: SignalType) => {
    const current = [...formData.enabledSignals];
    const exists = current.includes(type);
    const updated = exists 
      ? current.filter(s => s !== type)
      : [...current, type];
    setFormData({ ...formData, enabledSignals: updated });
  };

  const handleAddKeyword = () => {
    if (!keywordInput.trim()) return;
    if (!formData.keywords.includes(keywordInput.trim())) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, keywordInput.trim()]
      });
    }
    setKeywordInput('');
  };

  const handleRemoveKeyword = (kw: string) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter(k => k !== kw)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveICP(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const getPresetIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils': return <Utensils className="w-4 h-4 text-amber-600" />;
      case 'Code': return <Code className="w-4 h-4 text-blue-600" />;
      case 'TrendingUp': return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'Building2': return <Building2 className="w-4 h-4 text-indigo-600" />;
      case 'Dumbbell': return <Dumbbell className="w-4 h-4 text-rose-600" />;
      default: return <Layers className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/30 mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Targeting Logic: Signals &gt; Static Scraping</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
            Configure Your Ideal Customer Profile (ICP) & Buying Signals
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Tell BuyIntent AI what you sell, your target customer profile, and the specific events that indicate an urgent need for your solution.
          </p>
        </div>
      </div>

      {/* Preset Niches Carousel */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-600" />
            <span>Quick Start Industry Templates</span>
          </h3>
          <span className="text-xs text-slate-500">1-click configuration</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PRESET_ICPS.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset.id)}
                className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/50 shadow-xs ring-1 ring-amber-500'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs shrink-0">
                    {getPresetIcon(preset.icon)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{preset.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {preset.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900">Product & Target Profile</h3>
          <p className="text-xs text-slate-500">Define what you sell and your target customer segment</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Product Name */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              What Product / Service Do You Sell? <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              placeholder="e.g. Business consulting for restaurants / Custom AI software development"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
          </div>

          {/* Product Description */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Service Value Proposition & What Problems You Solve
            </label>
            <textarea
              rows={2}
              value={formData.productDescription}
              onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
              placeholder="e.g. Helping restaurants reduce food waste, build standardized multi-unit SOPs, and scale to 10+ outlets without operational bottlenecks."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
          </div>

          {/* Target Audience */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Target Customer Persona / Title
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                placeholder="e.g. Restaurant Owners, F&B Directors, Founders"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
          </div>

          {/* Industry */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Target Industry
            </label>
            <input
              type="text"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              placeholder="e.g. Food & Beverage, Restaurants, Cloud Kitchens"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Target Location / Geography
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. India (Bangalore, Mumbai, Delhi NCR) or United States"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          {/* Deal Size Range & Currency */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-slate-400" />
              Deal Value Range & Currency
            </label>
            <div className="flex items-center gap-2">
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
              <input
                type="number"
                value={formData.minDealValue}
                onChange={(e) => setFormData({ ...formData, minDealValue: Number(e.target.value) })}
                placeholder="Min Value"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none"
              />
              <span className="text-slate-400 font-bold">-</span>
              <input
                type="number"
                value={formData.maxDealValue}
                onChange={(e) => setFormData({ ...formData, maxDealValue: Number(e.target.value) })}
                placeholder="Max Value"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Focus Keywords */}
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            Intent Trigger Keywords
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddKeyword();
                }
              }}
              placeholder="e.g. opening new branch, hiring head of ops, funding raised, bad reviews"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
            <button
              type="button"
              onClick={handleAddKeyword}
              className="px-4 py-2.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors shrink-0"
            >
              Add Keyword
            </button>
          </div>

          {/* Keyword tags pill list */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            {formData.keywords.map((kw) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
              >
                <span>{kw}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveKeyword(kw)}
                  className="text-slate-400 hover:text-slate-700 cursor-pointer ml-1"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Enabled Signal Triggers Checkboxes */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Event Signals to Monitor
            </h4>
            <p className="text-xs text-slate-500">
              Select which real-world events our agent should scan across the web to calculate Buyer Intent.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ALL_SIGNALS.map((sig) => {
              const isChecked = formData.enabledSignals.includes(sig.type);
              return (
                <div
                  key={sig.type}
                  onClick={() => handleToggleSignal(sig.type)}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    isChecked
                      ? 'border-slate-800 bg-slate-900/5 text-slate-900'
                      : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                  }`}
                >
                  <div className="mt-0.5 text-slate-900">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-slate-900" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-900">{sig.label}</span>
                    <span className="block text-[11px] text-slate-500 leading-tight mt-0.5">
                      {sig.description}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Settings Saved!</span>
                </>
              ) : (
                <span>Save ICP Settings</span>
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              onSaveICP(formData);
              onRunSearch();
            }}
            disabled={isSearching}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md transition-all active:scale-98 disabled:opacity-60 cursor-pointer"
          >
            {isSearching ? (
              <>
                <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                <span>Running Live Signal Scan...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Save & Find High-Intent Customers Now</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
