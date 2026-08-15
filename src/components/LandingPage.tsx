import React, { useState } from 'react';
import { 
  Sparkles, 
  Target, 
  Flame, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  Send, 
  Kanban, 
  Zap, 
  BarChart3, 
  Building2, 
  Users, 
  HelpCircle,
  ExternalLink,
  ChevronDown,
  TrendingUp,
  FileText,
  BadgeDollarSign
} from 'lucide-react';
import { SIGNAL_INFO_MATRIX } from '../data/presetICPs';

interface LandingPageProps {
  onStartApp: () => void;
  onOpenAuth: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartApp, onOpenAuth }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const faqs = [
    {
      q: 'How does BuyIntent AI find buying signals legally without breaking rules?',
      a: 'BuyIntent AI strictly inspects permitted, publicly observable business information—such as official press releases, public news announcements, public company job postings, Google/Zomato/Trustpilot business reviews, and public online forums. We never bypass login walls, CAPTCHAs, paywalls, or private personal data.',
    },
    {
      q: 'Does BuyIntent AI claim that a prospect WILL buy?',
      a: 'No. BuyIntent AI explicitly does NOT claim a prospect will definitely purchase. Instead, our engine analyzes verifiable factual events (FACT) to infer strategic operational needs (AI INFERENCE), assigning an objective Buying Intent Score (0–100) to help prioritize your outbound effort.',
    },
    {
      q: 'What makes this different from generic lead databases like Apollo or ZoomInfo?',
      a: 'Traditional databases tell you WHO EXISTS (static contact lists of millions of companies). BuyIntent AI tells you WHO NEEDS WHAT YOU SELL RIGHT NOW, WHY THEY NEED IT, and THE EXACT EVIDENCE BEHIND THE NEED.',
    },
    {
      q: 'Can I customize the buying signals and target regions?',
      a: 'Yes. You can define custom keywords, geographic territories (down to specific cities), deal size ranges (₹ or $), and toggle specific trigger events like new branch expansions, hiring sprees, or negative customer reviews.',
    },
    {
      q: 'How does the AI personalized outreach generator work?',
      a: 'The AI Outreach Engine reads the specific factual evidence collected (e.g. "Announced 4 new outlets in South India") and drafts tailored multi-channel messages (Email, LinkedIn, WhatsApp, and Cold Call openers) that hook directly into that event in the opening sentence.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans">
      {/* Navigation Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={onStartApp}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Zap className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-white tracking-tight">BuyIntent</span>
                <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">AI</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Buyer-Intent Discovery</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a>
            <a href="#signals" className="hover:text-emerald-400 transition-colors">Buying Signals</a>
            <a href="#scoring" className="hover:text-emerald-400 transition-colors">AI Scoring</a>
            <a href="#pipeline" className="hover:text-emerald-400 transition-colors">CRM Pipeline</a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAuth}
              className="text-xs font-semibold px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={onStartApp}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all"
            >
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 overflow-hidden">
        {/* Ambient Gradient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-emerald-600/15 via-teal-500/10 to-cyan-500/15 blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autonomous Event-Driven Buyer-Intent Engine</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            Find Customers Who Are Already <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Showing Buying Signals
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            BuyIntent AI searches permitted public business information, identifies event-driven buying signals, 
            and ranks the prospects most likely to need your product or service right now.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onStartApp}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer"
            >
              <span>Find My Customers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-semibold text-sm transition-all"
            >
              <span>See How It Works</span>
            </a>
          </div>

          {/* Value Proposition Core Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-xs font-bold uppercase text-slate-400 mb-2">Traditional Lead Database</div>
              <h3 className="text-base font-bold text-slate-200 mb-2">"Who exists in the market?"</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Static cold lists of thousands of companies with no idea if they actually have a problem, budget, or current need. Results in 1-2% response rates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900/80 to-slate-900 border border-emerald-500/40 shadow-lg shadow-emerald-950/50">
              <div className="text-xs font-bold uppercase text-emerald-400 mb-2 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 fill-emerald-400" />
                <span>BuyIntent AI Engine</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">"Who needs what I sell RIGHT NOW, and why?"</h3>
              <p className="text-xs text-emerald-200/80 leading-relaxed">
                Dynamic public signal extraction: Detects expansion announcements, hiring surges, capital raises, customer complaints, and vendor queries. Delivers 25%+ reply rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Mock Lead Card Showcase */}
      <section className="py-16 bg-slate-900/50 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Explainable AI: Fact vs. AI Inference
            </h2>
            <p className="text-sm text-slate-400">
              Every prospect card provides full transparency on why they received their score, citing verified public sources.
            </p>
          </div>

          {/* Example Prospect Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-white">Royal Spice Kitchens</h3>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <Flame className="w-3 h-3 fill-emerald-400" />
                    96/100 VERY HOT
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Cloud Kitchens & Multi-Unit Dining • Bangalore (Indiranagar & HSR) • Est. Deal: ₹1.8L - ₹2.5L
                </p>
              </div>

              <button
                onClick={onStartApp}
                className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors self-start sm:self-auto"
              >
                Generate Personalized Pitch
              </button>
            </div>

            {/* Fact vs Inference Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Publicly Verified FACT</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-900/60 p-3 rounded-lg border border-slate-800 mb-2">
                  "Co-founder Vikram Reddy confirmed opening 6 new locations by next quarter, restructuring central procurement to safeguard gross margins during multi-city rollout."
                </p>
                <div className="text-[11px] text-slate-400">
                  Source: <span className="text-slate-300 font-medium">The Economic Times (F&B Section)</span> • 14 hours ago
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Strategic INFERENCE</span>
                </div>
                <p className="text-xs text-emerald-200/90 leading-relaxed p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 mb-2">
                  "High operational need for multi-unit kitchen SOPs, commissary inventory management, and food waste reduction to prevent typical 18% margin leak during rapid expansion."
                </p>
                <div className="text-[11px] text-slate-400">
                  Recommended Offer: <span className="text-white font-semibold">Multi-Unit Kitchen SOP & Scaling Blueprint</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-white mb-4">How BuyIntent AI Works</h2>
          <p className="text-slate-400 text-sm">
            Four simple steps from defining what you sell to engaging ready-to-buy decision makers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-extrabold text-sm mb-4 border border-emerald-500/20">
              01
            </div>
            <h3 className="text-base font-bold text-white mb-2">Define Your Offering</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Specify what you sell, your target customer profile, geographic markets, and typical deal size range.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 relative">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-extrabold text-sm mb-4 border border-teal-500/20">
              02
            </div>
            <h3 className="text-base font-bold text-white mb-2">Autonomous Discovery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our engine scans permitted press releases, public job postings, reviews, and forums for active trigger events.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 relative">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-extrabold text-sm mb-4 border border-cyan-500/20">
              03
            </div>
            <h3 className="text-base font-bold text-white mb-2">Intent Scoring (0–100)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every lead is decomposed into Business Fit, Signal Strength, Recency, Problem Urgency, and Growth metrics.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 relative">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-extrabold text-sm mb-4 border border-indigo-500/20">
              04
            </div>
            <h3 className="text-base font-bold text-white mb-2">Multi-Channel Outreach</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generate fact-checked emails, LinkedIn notes, WhatsApp messages, and cold call scripts that hook directly into the signal.
            </p>
          </div>
        </div>
      </section>

      {/* Buying Signals Showcase */}
      <section id="signals" className="py-20 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-white mb-3">Supported Buying Signals</h2>
            <p className="text-slate-400 text-sm">
              We monitor 12+ verified public trigger events that indicate high purchasing elasticity and immediate problem urgency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SIGNAL_INFO_MATRIX.slice(0, 6).map((sig, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-white">{sig.title}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-emerald-400">
                    {sig.intentLevel}
                  </span>
                </div>
                <p className="text-xs text-slate-400 italic mb-3">
                  {sig.exampleQuote}
                </p>
                <div className="text-[11px] text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                  <span className="font-semibold text-emerald-400">Inferred Need:</span> {sig.inferredNeed}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-extrabold text-white mb-3">Simple, Transparent Pricing</h2>
          <p className="text-slate-400 text-sm mb-6">
            Find high-intent customers who need what you sell. Upgrade or downgrade anytime.
          </p>

          {/* Currency / Period Toggle */}
          <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                billingCycle === 'monthly' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                billingCycle === 'annual' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Annual Billing (Save 20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Starter Plan */}
          <div className="p-7 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase text-slate-400 mb-1">Starter</div>
              <h3 className="text-xl font-bold text-white mb-4">Single Operator</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-extrabold text-white">₹2,999</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100 verified prospects / month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Basic intent scoring (0–100)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1 Active Campaign</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>CSV Lead Export</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onStartApp}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
            >
              Get Started
            </button>
          </div>

          {/* Growth Plan (Popular) */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950/40 border-2 border-emerald-500 shadow-xl shadow-emerald-950/60 relative flex flex-col justify-between">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider">
              Most Popular
            </div>
            <div>
              <div className="text-xs font-bold uppercase text-emerald-400 mb-1">Growth</div>
              <h3 className="text-xl font-bold text-white mb-4">High-Velocity Outbound</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-extrabold text-white">₹9,999</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-200 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>1,000 verified prospects / month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Advanced Buying Signals (All 12+)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>AI Multi-Channel Outreach Generator</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>9-Stage CRM Deal Pipeline</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Conversion Analytics & Reports</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onStartApp}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all"
            >
              Start 7-Day Trial
            </button>
          </div>

          {/* Scale Plan */}
          <div className="p-7 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase text-slate-400 mb-1">Scale</div>
              <h3 className="text-xl font-bold text-white mb-4">Agencies & Teams</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-extrabold text-white">₹29,999</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>10,000 verified prospects / month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Unlimited Campaigns & Team Members</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dedicated Search Provider API Key</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Automated Daily Signal Discovery</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Custom CRM Webhooks & Sync</span>
                </li>
              </ul>
            </div>
            <button
              onClick={onStartApp}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-3">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm">
              Everything you need to know about our data sources, ethical compliance, and scoring methodology.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-sm text-slate-200 hover:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180 text-emerald-400' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Final CTA */}
      <section className="py-20 border-t border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950/40 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Stop guessing who to contact. <br />
            Find businesses ready to buy today.
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto mb-8">
            Start discovering high-intent prospects based on real-time event signals in under 60 seconds.
          </p>
          <button
            onClick={onStartApp}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer"
          >
            <span>Launch BuyIntent AI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800 bg-slate-950 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">BuyIntent AI</span>
            <span>— AI-Powered Customer Discovery & Buying-Intent Platform</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-emerald-400">● 100% Permitted Public Signals</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
