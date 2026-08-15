import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  Target, 
  Users, 
  Flame, 
  Kanban, 
  Send, 
  Bookmark, 
  BarChart3, 
  Settings, 
  Building2, 
  LogOut,
  ShieldCheck,
  ChevronRight,
  Zap,
  Globe,
  Cloud,
  Lock
} from 'lucide-react';
import { ViewTab, UserProfile } from '../types';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  user: UserProfile;
  totalProspects: number;
  hotProspectsCount: number;
  isDemoMode: boolean;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenLanding: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  user,
  totalProspects,
  hotProspectsCount,
  isDemoMode,
  onOpenAuth,
  onLogout,
  onOpenLanding,
}) => {
  const { firebaseUser, isFirebaseReady } = useAuth();
  const navItems = [
    { id: 'dashboard' as ViewTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'find_customers' as ViewTab, label: 'Find Customers', icon: Sparkles, badge: 'AI Engine', badgeColor: 'bg-emerald-500 text-white' },
    { id: 'campaigns' as ViewTab, label: 'Campaigns', icon: Target },
    { id: 'prospects' as ViewTab, label: 'Prospects', icon: Users, count: totalProspects },
    { id: 'hot_leads' as ViewTab, label: 'Hot Leads', icon: Flame, count: hotProspectsCount, badgeColor: 'bg-amber-500/20 text-amber-400 font-semibold' },
    { id: 'pipeline' as ViewTab, label: 'CRM Pipeline', icon: Kanban },
    { id: 'outreach' as ViewTab, label: 'AI Outreach', icon: Send },
    { id: 'saved' as ViewTab, label: 'Saved Leads', icon: Bookmark },
    { id: 'analytics' as ViewTab, label: 'Analytics', icon: BarChart3 },
    { id: 'settings' as ViewTab, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col h-screen shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('dashboard')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Zap className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-white">BuyIntent</span>
              <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">AI</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Buyer-Intent Discovery</p>
          </div>
        </div>
      </div>

      {/* Workspace Selector */}
      <div className="px-3 pt-3 pb-2">
        <div className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg p-2 flex items-center justify-between transition-colors">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-semibold shrink-0">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <div className="truncate">
              <p className="text-xs font-medium text-slate-200 truncate">{user.organization}</p>
              <p className="text-[10px] text-slate-400 capitalize">{user.tier} Plan</p>
            </div>
          </div>
          <button 
            onClick={() => onSelectTab('settings')}
            className="text-slate-400 hover:text-slate-200 p-1"
            title="Workspace settings"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5 custom-scrollbar">
        <div className="px-3 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Intelligence Console
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              
              {item.badge && (
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                  {item.badge}
                </span>
              )}
              
              {item.count !== undefined && item.count > 0 && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Mode / Cloud Sync Compliance Badge */}
      <div className="p-3 mx-2 mb-2 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
            <Cloud className={`w-3.5 h-3.5 ${firebaseUser ? 'text-emerald-400' : 'text-sky-400'}`} />
            <span>{firebaseUser ? 'Firestore Synced' : 'Firebase Ready'}</span>
          </div>
          {firebaseUser ? (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          ) : (
            <button
              onClick={onOpenAuth}
              className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed">
          {firebaseUser 
            ? `Connected to Firestore (${firebaseUser.email?.slice(0, 18)}...)` 
            : 'Sign in to sync discovered prospects, campaigns, and custom outreach to Cloud.'}
        </p>
      </div>

      {/* User Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0 cursor-pointer" onClick={() => onSelectTab('settings')}>
          <div className="w-8 h-8 rounded-full bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-bold text-xs">
            {user.name ? user.name.slice(0, 2).toUpperCase() : 'US'}
          </div>
          <div className="truncate">
            <p className="text-xs font-semibold text-slate-200 truncate">{user.name}</p>
            <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onOpenLanding}
            className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded transition-colors cursor-pointer"
            title="View Landing Page"
          >
            <Globe className="w-4 h-4" />
          </button>
          <button
            onClick={firebaseUser ? onLogout : onOpenAuth}
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors cursor-pointer"
            title={firebaseUser ? "Log out of Firebase" : "Sign In"}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
