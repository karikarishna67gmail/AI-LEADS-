import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  Flame, 
  Target, 
  ShieldCheck, 
  ArrowRight, 
  Send, 
  Copy, 
  Check, 
  Zap, 
  RefreshCw,
  Lightbulb
} from 'lucide-react';

interface SignalAnalysisResult {
  intentScore: number;
  intentTier: string;
  signalCategory: string;
  inferredNeed: string;
  estimatedBudget: string;
  recommendedStrategy: string;
  recommendedPitchHook: string;
}

const SAMPLE_EVENTS = [
  {
    title: 'Restaurant Opening 3 Outlets',
    text: 'Barbeque Delight announced they are opening 3 new dine-in outlets in Hyderabad and Pune next quarter.',
    product: 'Food Business & Multi-Unit Restaurant Consulting',
  },
  {
    title: 'Fintech Hiring 6 Sales Leads',
    text: 'PayFlow Solutions just posted 6 openings for Senior Enterprise Account Executives and SDR Managers on LinkedIn.',
    product: 'B2B Sales Enablement & Cold Outbound Training',
  },
  {
    title: 'Series A Funding ($4.5M)',
    text: 'HealthTrack raised $4.5M Series A from Sequoia India to scale its clinic management software nationally.',
    product: 'Custom AI Engineering & Scalable Cloud Infrastructure',
  },
  {
    title: 'Spike in Delivery Complaints',
    text: 'Urban Wok received 18 1-star reviews this week complaining about cold noodles and 65-minute delivery wait times.',
    product: 'Restaurant Kitchen Line Workflow & Delivery Turnaround Advisory',
  },
  {
    title: 'Founder Asking for Vendor in Forum',
    text: 'Founder posted on IndieHackers: "What is the best automated customer onboarding software for B2B SaaS under $500/mo?"',
    product: 'SaaS Product Onboarding & Retention Optimization Software',
  }
];

export const SignalSimulator: React.FC = () => {
  const [signalInput, setSignalInput] = useState(
    'Chef Gourmet Bistro is opening their 2nd branch in Indiranagar Bangalore and looking for a centralized kitchen manager.'
  );
  const [productInput, setProductInput] = useState('Restaurant Operations & Expansion Consulting');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SignalAnalysisResult | null>({
    intentScore: 94,
    intentTier: 'hot',
    signalCategory: 'expansion',
    inferredNeed: 'Urgent requirement for multi-location kitchen recipe standardization, PAR-level inventory systems, and staff training SOPs before launch.',
    estimatedBudget: '₹1,50,000 - ₹3,50,000 (INR)',
    recommendedStrategy: 'Contact the owner Vikram/Founder within 48 hours while the new outlet lease is being finalized before they commit to an inflexible manual setup.',
    recommendedPitchHook: 'Congratulate them on the Indiranagar launch; offer the 14-day multi-branch launch playbook that cuts kitchen waste by 20% on day one.',
  });
  const [copiedHook, setCopiedHook] = useState(false);

  const handleAnalyze = async (textToAnalyze = signalInput, productToAnalyze = productInput) => {
    if (!textToAnalyze.trim()) return;
    setIsAnalyzing(true);

    try {
      const res = await fetch('/api/gemini/analyze-signal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawText: textToAnalyze,
          sellerOffering: productToAnalyze,
        }),
      });

      if (!res.ok) {
        throw new Error('Analysis failed');
      }

      const data = await res.json();
      setAnalysisResult(data);
    } catch (err) {
      console.error('Error analyzing signal:', err);
      // Fallback
      setAnalysisResult({
        intentScore: 89,
        intentTier: 'hot',
        signalCategory: 'expansion',
        inferredNeed: 'Scaling operational processes and staff onboarding workflows to handle expansion load.',
        estimatedBudget: 'High ($3,000 - $10,000)',
        recommendedStrategy: 'Reach out immediately citing the event to engage while timing is ideal.',
        recommendedPitchHook: `Noticed your recent announcement regarding "${textToAnalyze.slice(0, 50)}"—often at this stage teams experience operational bottlenecks.`,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApplySample = (sample: typeof SAMPLE_EVENTS[0]) => {
    setSignalInput(sample.text);
    setProductInput(sample.product);
    handleAnalyze(sample.text, sample.product);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/30 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Intent Signal Inference Lab</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
            Test Any Real-World Signal or News Headline
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            See how the AI decomposes raw public events (expansions, funding, job posts, bad reviews) into calculated Buyer-Intent Scores and strategic outreach angles.
          </p>
        </div>
      </div>

      {/* Preset Scenario Quick-Buttons */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
          Try Pre-built Scenario Signals:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {SAMPLE_EVENTS.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplySample(sample)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all whitespace-nowrap shadow-2xs cursor-pointer"
            >
              {sample.title}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Input Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            1. Input Event Signal & Your Solution
          </h3>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Your Product / Service Offering:
            </label>
            <input
              type="text"
              value={productInput}
              onChange={(e) => setProductInput(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              placeholder="e.g. Restaurant Operations Consulting"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Raw Public Event / Signal Text:
            </label>
            <textarea
              rows={4}
              value={signalInput}
              onChange={(e) => setSignalInput(e.target.value)}
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              placeholder="Paste a news headline, hiring announcement, customer review snippet, or forum inquiry..."
            />
          </div>

          <button
            type="button"
            onClick={() => handleAnalyze()}
            disabled={isAnalyzing}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-all active:scale-98 disabled:opacity-60 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                <span>Decomposing Buying Intent...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Run Intent Analysis Engine</span>
              </>
            )}
          </button>
        </div>

        {/* Real-time AI Output Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              2. Intent Inference & Scoring
            </h3>
            {analysisResult && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 border border-rose-200 text-rose-700">
                <Flame className="w-3.5 h-3.5 fill-rose-500" />
                Score: {analysisResult.intentScore}/100
              </span>
            )}
          </div>

          {analysisResult ? (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Inferred Buying Need
                </span>
                <p className="text-slate-800 font-medium leading-relaxed">
                  {analysisResult.inferredNeed}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">
                    Signal Type
                  </span>
                  <span className="font-bold text-slate-900 capitalize">
                    {analysisResult.signalCategory.replace('_', ' ')}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">
                    Est. Budget Potential
                  </span>
                  <span className="font-bold text-emerald-700">
                    {analysisResult.estimatedBudget}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl space-y-1.5">
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-amber-600" />
                  Recommended Strategy & Timing
                </span>
                <p className="text-slate-800 leading-relaxed">
                  {analysisResult.recommendedStrategy}
                </p>
              </div>

              <div className="p-3.5 bg-slate-900 text-white rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                    High-Converting Pitch Hook
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(analysisResult.recommendedPitchHook);
                      setCopiedHook(true);
                      setTimeout(() => setCopiedHook(false), 2000);
                    }}
                    className="text-[11px] font-semibold text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    {copiedHook ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-200 italic leading-relaxed">
                  "{analysisResult.recommendedPitchHook}"
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400">
              Input a signal and click "Run Intent Analysis Engine"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
