import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Flame, 
  DollarSign, 
  Target, 
  Users, 
  PieChart,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { ProspectLead } from '../types';

interface AnalyticsViewProps {
  prospects: ProspectLead[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ prospects }) => {
  const funnelSteps = [
    { label: 'Signals Discovered', count: 1284, pct: '100%', color: 'bg-slate-800' },
    { label: 'Qualified ICP Fit', count: 642, pct: '50.0%', color: 'bg-indigo-600' },
    { label: 'Outreach Contacted', count: 284, pct: '22.1%', color: 'bg-blue-600' },
    { label: 'Replied / Engaged', count: 98, pct: '7.6%', color: 'bg-amber-600' },
    { label: 'Meeting Booked', count: 48, pct: '3.7%', color: 'bg-purple-600' },
    { label: 'Proposal Sent', count: 24, pct: '1.8%', color: 'bg-teal-600' },
    { label: 'Closed Won 🎉', count: 14, pct: '1.1%', color: 'bg-emerald-600' },
  ];

  const scoreCorrelation = [
    { tier: 'Very Hot (80–100)', convRate: '28.4%', replyRate: '46.2%', color: 'bg-emerald-500' },
    { tier: 'Hot (60–79)', convRate: '14.2%', replyRate: '26.8%', color: 'bg-teal-500' },
    { tier: 'Warm (30–59)', convRate: '4.1%', replyRate: '11.5%', color: 'bg-amber-500' },
    { tier: 'Cold (0–29)', convRate: '0.8%', replyRate: '2.1%', color: 'bg-slate-400' },
  ];

  const signalWinRates = [
    { signal: 'New Location / Multi-Unit Expansion', winRate: '34%', avgDeal: '₹1.8 Lakhs', count: 42 },
    { signal: 'Funding / Fresh Capital Inflow', winRate: '29%', avgDeal: '₹2.4 Lakhs', count: 36 },
    { signal: 'Hiring Spree / Ops Openings', winRate: '22%', avgDeal: '₹1.2 Lakhs', count: 28 },
    { signal: 'Negative Customer Reviews / Complaints', winRate: '19%', avgDeal: '₹90,000', count: 18 },
    { signal: 'Franchise / Scaling Announcements', winRate: '26%', avgDeal: '₹2.1 Lakhs', count: 16 },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Revenue & Conversion Analytics</h2>
          <p className="text-xs text-slate-500 mt-1">
            Analyze the mathematical correlation between Intent Scores, signal types, and actual closed revenue.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400">Total Closed Revenue</span>
            <div className="text-lg font-extrabold text-emerald-600">₹32.6 Lakhs ($39.5K)</div>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="text-xs font-semibold text-slate-500">Very Hot Reply Rate</div>
          <div className="text-3xl font-extrabold text-emerald-600 mt-1">46.2%</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>vs 2.1% traditional cold email</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="text-xs font-semibold text-slate-500">Average Deal Size</div>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">₹1.85L</div>
          <div className="text-[11px] text-slate-500 mt-1">~ $2,250 USD per contract</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="text-xs font-semibold text-slate-500">Avg. Sales Cycle Speed</div>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">11.4 Days</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">3.2x faster closing</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <div className="text-xs font-semibold text-slate-500">Signal Accuracy (Fact-Check)</div>
          <div className="text-3xl font-extrabold text-indigo-600 mt-1">99.4%</div>
          <div className="text-[11px] text-indigo-700 font-semibold mt-1">Permitted public data only</div>
        </div>
      </div>

      {/* 2-Column: Funnel vs Intent Correlation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Outbound Pipeline Conversion Funnel</h3>
          <div className="space-y-3">
            {funnelSteps.map((step, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>{step.label}</span>
                  <span className="font-bold text-slate-900">{step.count} ({step.pct})</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${step.color}`}
                    style={{ width: `${Math.max(Number(step.pct.replace('%', '')), 4)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Intent Score vs Win Rate Correlation */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 mb-4">Intent Score vs. Actual Win Rate</h3>
          <div className="space-y-4">
            {scoreCorrelation.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-900">{item.tier}</span>
                  <span className="text-xs font-extrabold text-emerald-600">Win Rate: {item.convRate}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Reply Rate: <strong className="text-slate-800">{item.replyRate}</strong></span>
                  <span>Conversion Velocity: High</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Signal Type Win Rate Breakdown */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Signal Performance Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase">
                <th className="pb-3">Buying Signal</th>
                <th className="pb-3">Total Leads</th>
                <th className="pb-3">Average Deal Value</th>
                <th className="pb-3">Conversion Win Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {signalWinRates.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60">
                  <td className="py-3 font-semibold text-slate-900">{row.signal}</td>
                  <td className="py-3 text-slate-600">{row.count}</td>
                  <td className="py-3 font-semibold text-slate-800">{row.avgDeal}</td>
                  <td className="py-3 font-bold text-emerald-600">{row.winRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
