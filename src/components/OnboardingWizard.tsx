import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Building2, 
  Target, 
  Zap, 
  Flame, 
  Plus, 
  X,
  ChevronLeft
} from 'lucide-react';
import { ICPSettings, SignalType } from '../types';
import { SIGNAL_INFO_MATRIX, PRESET_ICPS } from '../data/presetICPs';

interface OnboardingWizardProps {
  onComplete: (icp: ICPSettings) => void;
  onCancel: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 State: What do you sell?
  const [productName, setProductName] = useState('Restaurant Multi-Unit SOP & Kitchen Turnaround Consulting');
  const [productDescription, setProductDescription] = useState('Standard operating procedures (SOPs), food cost optimization, kitchen line rush turnaround & franchise scaling.');
  const [category, setCategory] = useState('Consulting & Advisory');
  const [currency, setCurrency] = useState('INR');
  const [minDealValue, setMinDealValue] = useState(30000);
  const [maxDealValue, setMaxDealValue] = useState(250000);
  const [salesCycle, setSalesCycle] = useState('14 - 30 days');
  const [targetAudience, setTargetAudience] = useState('Restaurant Owners, F&B Founders, Culinary Directors, QSR Chains');

  // Step 2 State: Ideal Customer Profile
  const [industry, setIndustry] = useState('Restaurants, Food & Beverage, Cloud Kitchens, Cafes');
  const [location, setLocation] = useState('India (Bangalore, Mumbai, Delhi NCR, Hyderabad, Pune)');
  const [companySize, setCompanySize] = useState('20-100 employees / 2-15 outlets');
  const [revenueRange, setRevenueRange] = useState('₹3 Cr - ₹20 Cr');
  const [decisionMakerRole, setDecisionMakerRole] = useState('Founder, Co-Founder, Culinary Director, Head of Ops');
  const [keywords, setKeywords] = useState<string[]>(['new outlet', 'cloud kitchen', 'expansion', 'food cost', 'delivery delay', 'hiring chef', 'franchise']);
  const [newKeyword, setNewKeyword] = useState('');
  const [excludedIndustries, setExcludedIndustries] = useState('Fine Dining Luxury Resorts, Nightclubs');
  const [excludedCompanies, setExcludedCompanies] = useState('Dominos, McDonalds, Subway');

  // Step 3 State: Buying Signals
  const [enabledSignals, setEnabledSignals] = useState<SignalType[]>([
    'expansion',
    'hiring_surge',
    'funding_growth',
    'negative_reviews',
    'new_incorporation',
    'franchise_expansion'
  ]);
  const [customSignals, setCustomSignals] = useState<string[]>([
    'Spike in Zomato delivery delay reviews',
    'Opening 3+ outlets in 6 months'
  ]);
  const [newCustomSignal, setNewCustomSignal] = useState('');

  const toggleSignal = (sig: SignalType) => {
    if (enabledSignals.includes(sig)) {
      setEnabledSignals(enabledSignals.filter(s => s !== sig));
    } else {
      setEnabledSignals([...enabledSignals, sig]);
    }
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    setKeywords(keywords.filter(k => k !== kw));
  };

  const handleAddCustomSignal = () => {
    if (newCustomSignal.trim() && !customSignals.includes(newCustomSignal.trim())) {
      setCustomSignals([...customSignals, newCustomSignal.trim()]);
      setNewCustomSignal('');
    }
  };

  const handleRemoveCustomSignal = (sig: string) => {
    setCustomSignals(customSignals.filter(s => s !== sig));
  };

  const handleApplyPreset = (presetId: string) => {
    const preset = PRESET_ICPS.find(p => p.id === presetId);
    if (!preset) return;
    setProductName(preset.icp.productName);
    setProductDescription(preset.icp.productDescription);
    setTargetAudience(preset.icp.targetAudience);
    setIndustry(preset.icp.industry);
    setLocation(preset.icp.location);
    setMinDealValue(preset.icp.minDealValue);
    setMaxDealValue(preset.icp.maxDealValue);
    setCurrency(preset.icp.currency);
    setKeywords(preset.icp.keywords);
    setEnabledSignals(preset.icp.enabledSignals);
  };

  const handleFinalSubmit = () => {
    const fullICP: ICPSettings = {
      campaignName: `${productName.split(' ')[0]} — ${location.split('(')[0].trim()}`,
      productName,
      productDescription,
      category,
      targetAudience,
      industry,
      location,
      salesCycle,
      minDealValue,
      maxDealValue,
      currency,
      keywords,
      enabledSignals,
      customSignals,
      excludedIndustries: excludedIndustries.split(',').map(s => s.trim()).filter(Boolean),
      excludedCompanies: excludedCompanies.split(',').map(s => s.trim()).filter(Boolean),
      primaryObjective: 'Find businesses needing consulting',
      status: 'active',
    };
    onComplete(fullICP);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl my-8 p-6 sm:p-8 shadow-2xl text-slate-100 relative">
        {/* Header with Step Progress */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Onboarding & Campaign Setup</h2>
              <p className="text-xs text-slate-400">Tell us what you sell. BuyIntent AI finds businesses showing signs that they need it.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 ring-2 ring-emerald-500/40'
                    : step > s
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {step > s ? <Check className="w-3.5 h-3.5" /> : s}
              </div>
            ))}
          </div>
        </div>

        {/* Presets Bar */}
        {step === 1 && (
          <div className="mb-6 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="text-[11px] font-semibold text-slate-400 mb-2">⚡ Quick-Start Industry Presets:</div>
            <div className="flex flex-wrap gap-2">
              {PRESET_ICPS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleApplyPreset(p.id)}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 transition-colors"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 1: WHAT DO YOU SELL? */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">1</span>
              <span>What do you sell?</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Product / Service Name *</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Restaurant Growth Consulting, B2B SaaS Development, SEO Audits"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Product Description / Core Value Proposition</label>
              <textarea
                rows={2}
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Describe how your product solves problems for clients..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Consulting, Agency, Software"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Typical Sales Cycle</label>
                <input
                  type="text"
                  value={salesCycle}
                  onChange={(e) => setSalesCycle(e.target.value)}
                  placeholder="e.g. 14 - 30 days"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Minimum Deal Value</label>
                <input
                  type="number"
                  value={minDealValue}
                  onChange={(e) => setMinDealValue(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Maximum Deal Value</label>
                <input
                  type="number"
                  value={maxDealValue}
                  onChange={(e) => setMaxDealValue(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: IDEAL CUSTOMER PROFILE */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">2</span>
              <span>Define Your Ideal Customer Profile (ICP)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Industry / Sector *</label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. Restaurants, F&B, FinTech, E-commerce"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Location / Geography *</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. India (Bangalore, Mumbai, Delhi) or USA"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Audience / Persona</label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. Restaurant Owners, Founders, CTOs"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Decision Maker Role(s)</label>
                <input
                  type="text"
                  value={decisionMakerRole}
                  onChange={(e) => setDecisionMakerRole(e.target.value)}
                  placeholder="e.g. Founder, CEO, VP Operations"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Focus Keywords & Signals to Scrape</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                  placeholder="Type keyword & press Add (e.g. new branch, seed funding)..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={handleAddKeyword}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {keywords.map((kw) => (
                  <span
                    key={kw}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-slate-800 text-slate-200 border border-slate-700/60"
                  >
                    <span>{kw}</span>
                    <button type="button" onClick={() => handleRemoveKeyword(kw)} className="text-slate-400 hover:text-rose-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Excluded Industries (Optional)</label>
                <input
                  type="text"
                  value={excludedIndustries}
                  onChange={(e) => setExcludedIndustries(e.target.value)}
                  placeholder="e.g. Nightclubs, Street Kiosks"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Excluded Companies (Optional)</label>
                <input
                  type="text"
                  value={excludedCompanies}
                  onChange={(e) => setExcludedCompanies(e.target.value)}
                  placeholder="e.g. McDonald's, Dominos"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-slate-600"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: BUYING SIGNALS */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <div className="text-sm font-bold text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">3</span>
                <span>Select Observable Buying Signals to Track</span>
              </div>
              <span className="text-xs text-emerald-400 font-semibold">{enabledSignals.length} signals active</span>
            </div>

            {/* Signal Checkbox Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
              {SIGNAL_INFO_MATRIX.map((item) => {
                const isChecked = enabledSignals.includes(item.signalType as SignalType);
                return (
                  <div
                    key={item.signalType}
                    onClick={() => toggleSignal(item.signalType as SignalType)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                      isChecked
                        ? 'bg-emerald-950/20 border-emerald-500/50 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-200 mb-0.5">{item.title}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{item.inferredNeed}</div>
                    </div>

                    <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                      isChecked ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-700'
                    }`}>
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Signals */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Custom Buying Signals (Optional)</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newCustomSignal}
                  onChange={(e) => setNewCustomSignal(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomSignal())}
                  placeholder="e.g. Recently switched to franchise model, high delivery complaints..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={handleAddCustomSignal}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Signal</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {customSignals.map((cs) => (
                  <span
                    key={cs}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs bg-emerald-950/30 text-emerald-300 border border-emerald-500/30"
                  >
                    <span>{cs}</span>
                    <button type="button" onClick={() => handleRemoveCustomSignal(cs)} className="text-emerald-400 hover:text-rose-400">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800">
          <div>
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>

          <div>
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s + 1) as any)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-xs shadow-xl shadow-emerald-500/30 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>START CUSTOMER DISCOVERY</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
