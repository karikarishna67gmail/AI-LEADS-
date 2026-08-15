import React from 'react';
import { 
  Radar, 
  ArrowDown, 
  Sparkles, 
  Layers, 
  Search, 
  FileCheck, 
  Flame, 
  Cpu, 
  Send, 
  TrendingUp, 
  XCircle, 
  CheckCircle2,
  Building,
  Target,
  Zap
} from 'lucide-react';
import { SIGNAL_INFO_MATRIX } from '../data/presetICPs';

export const ArchitectureVisualizer: React.FC = () => {
  return (
    <div className="space-y-10 max-w-5xl mx-auto py-4">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-800">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-400/10 text-emerald-300 border border-emerald-400/30 mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Event-Driven Architecture</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
            Why BuyIntent AI Converts 6x Higher Than Static Databases
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Instead of searching for "people who might buy," BuyIntent AI monitors the web for real-world events that mathematically trigger the exact need for your services.
          </p>
        </div>
      </div>

      {/* Comparison: Traditional Scraping vs BuyIntent AI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bad: Traditional Scraping */}
        <div className="bg-rose-50/40 border border-rose-200 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
            <XCircle className="w-5 h-5 text-rose-600" />
            <span>Traditional Dumb Lead Scraping</span>
          </div>

          <ul className="space-y-2.5 text-xs text-rose-950">
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>Downloads 10,000 static emails of "Restaurant Owners" with zero intent.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>98% have no immediate need, no budget, or already have a solution.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>Sends generic "Hey, we are an agency" cold emails that go straight to spam.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500 font-bold">•</span>
              <span>Burn rate: High domain burn, &lt;0.5% reply rate, high rejection.</span>
            </li>
          </ul>
        </div>

        {/* Good: Event-Driven Intent Engine */}
        <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>BuyIntent AI Event-Driven Engine</span>
          </div>

          <ul className="space-y-2.5 text-xs text-emerald-950">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Identifies the <strong>Top 20 businesses</strong> triggering verifiable expansion, funding, or ops crises today.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Calculates an <strong>Intent Score (0-100)</strong> assessing urgency, budget power, and timing.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Generates a <strong>Hyper-Personalized Pitch</strong> anchoring to the exact public event.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>Conversion: 15-28% reply rates because your outreach arrives right when they need it.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* System Flow Diagram */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-slate-900">
          The 6-Stage Intent Discovery & Conversion Pipeline
        </h3>

        <div className="space-y-4 text-xs font-medium">
          {/* Step 1 */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold shrink-0">
              1
            </div>
            <div className="flex-1">
              <span className="font-bold text-slate-900 block text-sm">Your Product & ICP Definition</span>
              <span className="text-slate-500">
                You define what service you sell (e.g. F&B consulting), deal size range (₹25k-₹2L), and target geography.
              </span>
            </div>
          </div>

          <div className="flex justify-center -my-2 text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
              2
            </div>
            <div className="flex-1">
              <span className="font-bold text-slate-900 block text-sm">Multi-Source Web Signal Scanning</span>
              <span className="text-slate-500">
                Autonomous agent scans public PR releases, job boards, business registry filings, Google reviews, and forums.
              </span>
            </div>
          </div>

          <div className="flex justify-center -my-2 text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* Step 3 */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold shrink-0">
              3
            </div>
            <div className="flex-1">
              <span className="font-bold text-slate-900 block text-sm">Signal-to-Inference AI Engine</span>
              <span className="text-slate-500">
                Converts events into underlying business requirements (e.g. "Opening 3 new outlets" → "Needs multi-unit SOPs & inventory supply chain").
              </span>
            </div>
          </div>

          <div className="flex justify-center -my-2 text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* Step 4 */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold shrink-0">
              4
            </div>
            <div className="flex-1">
              <span className="font-bold text-slate-900 block text-sm">Multi-Dimensional Intent Scoring (0-100)</span>
              <span className="text-slate-500">
                Scores urgency, purchasing power, solution fit, and timing freshness. Segregates leads into Hot 🔥, Warm 🟠, and Potential 🔵.
              </span>
            </div>
          </div>

          <div className="flex justify-center -my-2 text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* Step 5 */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
              5
            </div>
            <div className="flex-1">
              <span className="font-bold text-slate-900 block text-sm">Hyper-Personalized Multi-Channel Pitch Studio</span>
              <span className="text-slate-500">
                Drafts tailored Email, LinkedIn connection notes, WhatsApp hooks, and Cold Call openers referencing the concrete event.
              </span>
            </div>
          </div>

          <div className="flex justify-center -my-2 text-slate-400">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* Step 6 */}
          <div className="flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold shrink-0">
              6
            </div>
            <div className="flex-1">
              <span className="font-bold text-emerald-950 block text-sm">Outreach, Reply & High-Ticket Close</span>
              <span className="text-emerald-800">
                You approve and send. High-intent timing turns cold outbound into high-converting consultative sales conversations.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Signal Matrix Reference */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          The 7 Core Buying Signals & Their Inferred Requirements
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SIGNAL_INFO_MATRIX.map((sig, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">{sig.title}</h4>
                <span className="text-[11px] font-bold text-amber-700">{sig.intentLevel}</span>
              </div>
              <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded border border-slate-100">
                {sig.exampleQuote}
              </p>
              <div className="text-xs text-slate-700">
                <span className="font-bold text-slate-900">Inferred Need: </span>
                {sig.inferredNeed}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
