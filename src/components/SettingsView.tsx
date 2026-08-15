import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Building2, 
  Key, 
  Globe, 
  ShieldCheck, 
  CreditCard, 
  Check, 
  Save, 
  Sparkles, 
  Sliders, 
  Database,
  Lock,
  ExternalLink,
  Cloud,
  CheckCircle2
} from 'lucide-react';
import { UserProfile } from '../types';
import { useAuth } from '../context/AuthContext';

interface SettingsViewProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  isDemoMode: boolean;
  onToggleDemoMode: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  user,
  onUpdateUser,
  isDemoMode,
  onToggleDemoMode,
}) => {
  const { firebaseUser, isFirebaseReady } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'providers' | 'cloud' | 'ai' | 'billing' | 'compliance'>('profile');
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [org, setOrg] = useState(user.organization);
  const [role, setRole] = useState(user.role);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Search provider keys state
  const [googleKey, setGoogleKey] = useState('AIzaSyD-•••••••••••••••••••••••••••••');
  const [newsApiKey, setNewsApiKey] = useState('pr_live_••••••••••••••••••••••••••••');
  const [webhookUrl, setWebhookUrl] = useState('https://hooks.zapier.com/hooks/catch/12345/buyintent');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      email,
      organization: org,
      role,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Workspace & Provider Settings</h2>
          <p className="text-xs text-slate-500 mt-1">
            Configure profile, cloud persistence, autonomous search providers, AI models, and legal data compliance.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold animate-fade-in">
            <Check className="w-3.5 h-3.5" />
            <span>Settings Saved Successfully!</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto">
        {[
          { id: 'profile', label: 'User & Organization', icon: User },
          { id: 'cloud', label: 'Cloud & Firebase', icon: Cloud },
          { id: 'providers', label: 'Search Providers', icon: Globe },
          { id: 'ai', label: 'AI Intelligence Models', icon: Sparkles },
          { id: 'billing', label: 'Billing & Quotas', icon: CreditCard },
          { id: 'compliance', label: 'Compliance & Ethics', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 pb-3 px-4 text-xs font-bold transition-all whitespace-nowrap relative cursor-pointer ${
                isActive
                  ? 'text-emerald-700 border-b-2 border-emerald-600'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Panels */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-4 max-w-xl animate-fade-in">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Personal & Workspace Details</h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Business Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Organization Name</label>
                <input
                  type="text"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Job Role</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Workspace Changes</span>
            </button>
          </form>
        )}

        {/* CLOUD & FIREBASE TAB */}
        {activeTab === 'cloud' && (
          <div className="space-y-6 max-w-2xl animate-fade-in text-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Firebase Cloud Firestore & Authentication</h3>
            <p className="text-slate-500 mb-4">
              Realtime cloud persistence is active for user campaigns, prospects, deal pipeline stages, strategy notes, and search history.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Firestore Connection Status:</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Connected (asia-southeast1)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Database ID:</span>
                <span className="font-mono text-slate-900 text-[11px]">ai-studio-buyintentai-bc4ed2cd-18c9-4452-8e2f-3be98fab55ad</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Auth State:</span>
                <span className="text-slate-900 font-medium">
                  {firebaseUser ? `Authenticated as ${firebaseUser.email}` : 'Demo / Guest Session (Local)'}
                </span>
              </div>
              {firebaseUser && (
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Firebase User UID:</span>
                  <span className="font-mono text-slate-900 text-[11px] truncate max-w-xs">{firebaseUser.uid}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-xs">Active Firestore Collections:</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'UserProfile', path: 'users/{userId}', desc: 'User preferences, quotas & org settings' },
                  { name: 'Campaign', path: 'users/{userId}/campaigns/{id}', desc: 'ICP definitions, deal ranges, keywords' },
                  { name: 'ProspectLead', path: 'users/{userId}/prospects/{id}', desc: 'Discovered leads, intent scores, notes' },
                  { name: 'SearchRun', path: 'users/{userId}/searches/{id}', desc: 'Autonomous discovery run logs & telemetry' },
                ].map((col, idx) => (
                  <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl">
                    <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{col.name}</span>
                    </div>
                    <div className="font-mono text-[10px] text-slate-500 mt-1">{col.path}</div>
                    <div className="text-[11px] text-slate-600 mt-1">{col.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PROVIDERS TAB */}
        {activeTab === 'providers' && (
          <div className="space-y-6 max-w-2xl animate-fade-in text-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Search Engine Providers & Data Feeds</h3>
            <p className="text-slate-500 mb-4">
              BuyIntent AI supports multi-provider public scraping feeds. You can toggle between demo simulated feeds and live Google Web Intelligence.
            </p>

            {/* Demo Mode Toggle */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 text-xs">Demo Mode Engine (Simulated Realistic Signals)</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Generates realistic market signals without incurring third-party API costs or quota usage.
                </div>
              </div>
              <button
                type="button"
                onClick={onToggleDemoMode}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                  isDemoMode ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-600 text-white'
                }`}
              >
                {isDemoMode ? 'Active (Demo)' : 'Switch to Live'}
              </button>
            </div>

            {/* CRM Webhook */}
            <div className="space-y-2">
              <label className="block font-semibold text-slate-700">HubSpot / Zapier Webhook Endpoint</label>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-900 focus:outline-none"
              />
              <p className="text-[11px] text-slate-400">Newly discovered hot leads are automatically pushed to this webhook in real time.</p>
            </div>
          </div>
        )}

        {/* AI TAB */}
        {activeTab === 'ai' && (
          <div className="space-y-4 max-w-2xl animate-fade-in text-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Gemini AI Model Configurations</h3>
            <p className="text-slate-500 mb-4">
              Manage the neural model parameters responsible for Fact vs AI Inference extraction and intent scoring.
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div>
                <span className="font-bold text-slate-900">Current Model:</span>{' '}
                <span className="font-mono text-emerald-700 font-semibold">gemini-2.5-flash (Google DeepMind)</span>
              </div>
              <div>
                <span className="font-bold text-slate-900">Temperature:</span>{' '}
                <span className="text-slate-700">0.2 (Optimized for factual precision and zero hallucination)</span>
              </div>
              <div>
                <span className="font-bold text-slate-900">Safety Filter:</span>{' '}
                <span className="text-slate-700">BLOCK_NONE (Business & public press data ingestion)</span>
              </div>
            </div>
          </div>
        )}

        {/* BILLING TAB */}
        {activeTab === 'billing' && (
          <div className="space-y-6 max-w-2xl animate-fade-in text-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Plan & Monthly Quotas</h3>

            <div className="p-5 rounded-xl bg-slate-900 text-white flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold text-emerald-400">Active Subscription</div>
                <div className="text-xl font-bold mt-1">Growth Plan (₹9,999 / mo)</div>
                <div className="text-xs text-slate-400 mt-0.5">Renews automatically on the 1st of every month</div>
              </div>
              <button className="px-3.5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors">
                Manage Billing
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-slate-500">Searches Remaining:</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">{user.searchesRemaining} / {user.searchesTotal}</div>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-slate-500">Monthly Leads Quota:</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">{user.leadsUsedThisMonth} / {user.monthlyLeadQuota}</div>
              </div>
            </div>
          </div>
        )}

        {/* COMPLIANCE TAB */}
        {activeTab === 'compliance' && (
          <div className="space-y-4 max-w-2xl animate-fade-in text-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Ethical & Legal Compliance Statement</h3>
            <p className="text-slate-600 leading-relaxed">
              BuyIntent AI is engineered strictly in compliance with global data protection guidelines (including GDPR, CCPA, and India DPDP 2023).
            </p>

            <div className="space-y-2.5">
              {[
                { title: '100% Permitted Public Information', desc: 'All data points are extracted strictly from publicly accessible PR wire feeds, official government company registries, public business reviews, and indexed news articles.' },
                { title: 'Zero Login Wall / CAPTCHA Bypassing', desc: 'Our engine never bypasses login barriers, authentication walls, paywalls, or anti-scraping security mechanisms.' },
                { title: 'Explicit Fact vs Inference Separation', desc: 'We never claim a prospect will definitely buy. Every lead strictly separates verifiable factual event quotes from strategic AI recommendations.' },
                { title: 'No Private Personal Data Stored', desc: 'We only index publicly listed business executives and official corporate contact channels.' },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl">
                  <div className="font-bold text-emerald-950 flex items-center gap-1.5 mb-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-slate-700 text-[11px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

