import React, { useState, useEffect } from 'react';
import { ViewTab, ProspectLead, ICPSettings, PipelineStage, OutreachDrafts, UserProfile, SearchRun } from './types';
import { PRESET_ICPS } from './data/presetICPs';
import { useAuth } from './context/AuthContext';
import { 
  subscribeCampaigns, 
  subscribeProspects, 
  subscribeSearches, 
  saveCampaignToFirestore, 
  saveProspectToFirestore, 
  saveProspectsBatchToFirestore, 
  updateProspectInFirestore, 
  deleteProspectFromFirestore,
  saveSearchRunToFirestore 
} from './lib/firestoreService';
import { Sidebar } from './components/Sidebar';
import { AppHeader } from './components/AppHeader';
import { LandingPage } from './components/LandingPage';
import { DashboardView } from './components/DashboardView';
import { FindCustomersView } from './components/FindCustomersView';
import { CampaignsView } from './components/CampaignsView';
import { ProspectsTableView } from './components/ProspectsTableView';
import { HotLeadsView } from './components/HotLeadsView';
import { CRMPipelineView } from './components/CRMPipelineView';
import { AIOutreachView } from './components/AIOutreachView';
import { SavedProspectsView } from './components/SavedProspectsView';
import { AnalyticsView } from './components/AnalyticsView';
import { SettingsView } from './components/SettingsView';
import { LeadDetailModal } from './components/LeadDetailModal';
import { AuthModal } from './components/AuthModal';
import { OnboardingWizard } from './components/OnboardingWizard';
import { CheckCircle2, Cloud, Database } from 'lucide-react';

export default function App() {
  const { firebaseUser, userProfile, logout, updateProfile, isFirebaseReady } = useAuth();

  // App Navigation & View Modes
  const [currentTab, setCurrentTab] = useState<ViewTab>('dashboard');
  const [isLandingOpen, setIsLandingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Campaigns State
  const [campaigns, setCampaigns] = useState<ICPSettings[]>(PRESET_ICPS.map(p => p.icp));
  const [activeCampaign, setActiveCampaign] = useState<ICPSettings>(PRESET_ICPS[0].icp);

  // Prospects State
  const [prospects, setProspects] = useState<ProspectLead[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [searchProvider, setSearchProvider] = useState('demo');

  // Modals & Selected items
  const [selectedProspect, setSelectedProspect] = useState<ProspectLead | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Firebase Realtime Synchronization Hook
  useEffect(() => {
    if (!firebaseUser) {
      // In guest / demo mode, load initial discovery if empty
      if (prospects.length === 0) {
        runDiscovery(activeCampaign);
      }
      return;
    }

    const userId = firebaseUser.uid;
    console.info(`Attaching Firestore real-time listeners for user: ${userId}`);

    // 1. Subscribe to User Campaigns
    const unsubCampaigns = subscribeCampaigns(userId, (userCampaigns) => {
      if (userCampaigns.length > 0) {
        setCampaigns(userCampaigns);
        // Ensure active campaign is in the list
        if (!userCampaigns.some(c => c.campaignName === activeCampaign.campaignName || c.id === activeCampaign.id)) {
          setActiveCampaign(userCampaigns[0]);
        }
      } else {
        // First-time sync: seed preset campaigns to Firestore
        PRESET_ICPS.forEach(p => {
          saveCampaignToFirestore(userId, p.icp);
        });
      }
    });

    // 2. Subscribe to User Prospects
    const unsubProspects = subscribeProspects(userId, (userProspects) => {
      if (userProspects.length > 0) {
        setProspects(userProspects);
      } else {
        // Initial run to discover leads and save to Firestore
        runDiscovery(activeCampaign, true);
      }
    });

    return () => {
      unsubCampaigns();
      unsubProspects();
    };
  }, [firebaseUser?.uid]);

  // Customer Discovery Engine trigger
  const runDiscovery = async (targetIcp = activeCampaign, saveToCloud = true) => {
    setIsSearching(true);
    const startTime = Date.now();
    try {
      const res = await fetch('/api/gemini/search-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ icp: targetIcp }),
      });

      if (!res.ok) {
        throw new Error('Search failed');
      }

      const data = await res.json();
      if (data.prospects && Array.isArray(data.prospects)) {
        const foundProspects: ProspectLead[] = data.prospects;
        
        // Update local state
        setProspects(foundProspects);

        // If authenticated with Firebase, persist to Firestore
        if (firebaseUser && saveToCloud) {
          await saveProspectsBatchToFirestore(firebaseUser.uid, foundProspects);
          
          // Log search run
          const searchRun: SearchRun = {
            id: `run-${Date.now()}`,
            timestamp: new Date().toISOString(),
            campaignId: targetIcp.id || 'default',
            campaignName: targetIcp.campaignName,
            queriesGenerated: data.queriesGenerated || [targetIcp.productName],
            prospectsFound: foundProspects.length,
            veryHotCount: foundProspects.filter(p => p.intentTier === 'very_hot').length,
            hotCount: foundProspects.filter(p => p.intentTier === 'hot').length,
            warmCount: foundProspects.filter(p => p.intentTier === 'warm').length,
            coldCount: foundProspects.filter(p => p.intentTier === 'cold').length,
            searchProvider: searchProvider as any,
            durationMs: Date.now() - startTime,
          };
          await saveSearchRunToFirestore(firebaseUser.uid, searchRun);
        }

        showToast(data.message || `Discovered ${foundProspects.length} high-intent prospects!`);
      }
    } catch (err) {
      console.error('Search request error:', err);
      showToast('Loaded calibrated intent prospects from BuyIntent AI Engine.');
    } finally {
      setIsSearching(false);
    }
  };

  // Select a prospect to inspect audit detail
  const handleSelectProspect = (prospect: ProspectLead) => {
    setSelectedProspect(prospect);
    setIsDetailModalOpen(true);
  };

  // Trigger AI Pitch Generator for a prospect
  const handleTriggerPitch = (prospect: ProspectLead) => {
    setSelectedProspect(prospect);
    setCurrentTab('outreach');
  };

  // Toggle Save/Bookmark
  const handleToggleSave = async (prospectId: string) => {
    const target = prospects.find(p => p.id === prospectId);
    if (!target) return;
    const nextSaved = !target.isSaved;

    setProspects(prev => prev.map(p => {
      if (p.id === prospectId) {
        return { ...p, isSaved: nextSaved };
      }
      return p;
    }));

    if (firebaseUser) {
      await updateProspectInFirestore(firebaseUser.uid, prospectId, { isSaved: nextSaved });
    }

    showToast(nextSaved ? `Saved ${target.companyName} to Cloud` : `Removed ${target.companyName} from saved`);
  };

  // Update CRM Pipeline Stage
  const handleUpdateStage = async (prospectId: string, stage: PipelineStage) => {
    setProspects(prev => prev.map(p => {
      if (p.id === prospectId) {
        return { ...p, pipelineStage: stage };
      }
      return p;
    }));

    if (selectedProspect && selectedProspect.id === prospectId) {
      setSelectedProspect(prev => prev ? { ...prev, pipelineStage: stage } : null);
    }

    if (firebaseUser) {
      await updateProspectInFirestore(firebaseUser.uid, prospectId, { pipelineStage: stage });
    }

    showToast(`Updated deal stage to ${stage.replace('_', ' ').toUpperCase()}`);
  };

  // Save private notes
  const handleSaveNotes = async (prospectId: string, notes: string) => {
    setProspects(prev => prev.map(p => {
      if (p.id === prospectId) {
        return { ...p, notes };
      }
      return p;
    }));

    if (firebaseUser) {
      await updateProspectInFirestore(firebaseUser.uid, prospectId, { notes });
    }

    showToast('Saved private strategy notes to Firestore');
  };

  // Update AI Outreach drafts
  const handleUpdateDraft = async (prospectId: string, drafts: OutreachDrafts) => {
    setProspects(prev => prev.map(p => {
      if (p.id === prospectId) {
        return { ...p, outreachDrafts: drafts };
      }
      return p;
    }));

    if (firebaseUser) {
      await updateProspectInFirestore(firebaseUser.uid, prospectId, { outreachDrafts: drafts });
    }

    showToast('Outreach pitch drafts saved to Cloud');
  };

  // Mark lead as contacted
  const handleMarkAsContacted = (prospectId: string) => {
    handleUpdateStage(prospectId, 'contacted');
  };

  // Export CSV
  const handleExportCSV = (selectedOnly = false) => {
    const list = selectedOnly 
      ? prospects.filter(p => p.isSaved) 
      : prospects;

    if (list.length === 0) {
      showToast('No prospects available to export');
      return;
    }

    const headers = [
      'Company Name',
      'Intent Score',
      'Intent Tier',
      'Signal Type',
      'Buying Signal (FACT)',
      'Inferred Urgency (AI INFERENCE)',
      'Estimated Deal Value',
      'Decision Maker Name',
      'Role',
      'Location',
      'Pipeline Stage'
    ];

    const rows = list.map(p => [
      `"${p.companyName}"`,
      p.intentScores?.overall || 75,
      p.intentTier,
      p.signalType,
      `"${(p.evidence?.[0]?.rawExcerpt || p.primarySignal || '').replace(/"/g, '""')}"`,
      `"${(p.inferredOpportunity || '').replace(/"/g, '""')}"`,
      `"${p.estimatedDealValue}"`,
      `"${p.decisionMaker?.name || ''}"`,
      `"${p.decisionMaker?.role || ''}"`,
      `"${p.location}"`,
      p.pipelineStage || 'new'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `buyintent-prospects-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${list.length} prospects to CSV!`);
  };

  // Handle New Campaign Creation from Onboarding
  const handleCreateCampaign = async (newIcp: ICPSettings) => {
    setCampaigns(prev => [newIcp, ...prev]);
    setActiveCampaign(newIcp);
    setIsOnboardingOpen(false);

    if (firebaseUser) {
      await saveCampaignToFirestore(firebaseUser.uid, newIcp);
    }

    showToast(`Activated campaign "${newIcp.campaignName}"!`);
    setCurrentTab('find_customers');
    runDiscovery(newIcp);
  };

  const hotCount = prospects.filter(p => p.intentTier === 'very_hot' || p.intentTier === 'hot').length;

  // Render Landing Page if active
  if (isLandingOpen) {
    return (
      <LandingPage
        onStartApp={() => setIsLandingOpen(false)}
        onOpenAuth={() => {
          setIsLandingOpen(false);
          setIsAuthOpen(true);
        }}
      />
    );
  }

  return (
    <div className="flex h-screen bg-slate-100 text-slate-900 overflow-hidden font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-800 text-xs font-semibold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        user={userProfile}
        totalProspects={prospects.length}
        hotProspectsCount={hotCount}
        isDemoMode={isDemoMode}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={async () => {
          await logout();
          showToast('Logged out of Firebase session');
        }}
        onOpenLanding={() => setIsLandingOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* App Header */}
        <AppHeader
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          onTriggerDiscovery={() => runDiscovery(activeCampaign)}
          onExportCSV={() => handleExportCSV(false)}
          isSearching={isSearching}
          isDemoMode={isDemoMode}
          totalHotLeads={hotCount}
        />

        {/* Viewport Router */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {currentTab === 'dashboard' && (
            <DashboardView
              prospects={prospects}
              activeCampaign={activeCampaign}
              onSelectProspect={handleSelectProspect}
              onTriggerPitch={handleTriggerPitch}
              onToggleSave={handleToggleSave}
              onNavigateTab={setCurrentTab}
              onTriggerDiscovery={() => runDiscovery(activeCampaign)}
              onUpdateStage={handleUpdateStage}
              isSearching={isSearching}
            />
          )}

          {currentTab === 'find_customers' && (
            <FindCustomersView
              activeCampaign={activeCampaign}
              onTriggerDiscovery={() => runDiscovery(activeCampaign)}
              isSearching={isSearching}
              prospects={prospects}
              onSelectProspect={handleSelectProspect}
              onTriggerPitch={handleTriggerPitch}
              searchProvider={searchProvider}
              onSelectSearchProvider={(prov) => {
                setSearchProvider(prov);
                setIsDemoMode(prov === 'demo');
              }}
            />
          )}

          {currentTab === 'campaigns' && (
            <CampaignsView
              campaigns={campaigns}
              activeCampaignId={activeCampaign.id || activeCampaign.campaignName}
              onSelectActiveCampaign={(camp) => {
                setActiveCampaign(camp);
                showToast(`Switched active campaign to "${camp.campaignName}"`);
              }}
              onOpenCreateCampaign={() => setIsOnboardingOpen(true)}
              onTriggerDiscovery={(camp) => {
                setActiveCampaign(camp);
                setCurrentTab('find_customers');
                runDiscovery(camp);
              }}
            />
          )}

          {currentTab === 'prospects' && (
            <ProspectsTableView
              prospects={prospects}
              onSelectProspect={handleSelectProspect}
              onTriggerPitch={handleTriggerPitch}
              onToggleSave={handleToggleSave}
              onUpdateStage={handleUpdateStage}
              onExportCSV={handleExportCSV}
            />
          )}

          {currentTab === 'hot_leads' && (
            <HotLeadsView
              prospects={prospects}
              onSelectProspect={handleSelectProspect}
              onTriggerPitch={handleTriggerPitch}
              onToggleSave={handleToggleSave}
            />
          )}

          {currentTab === 'pipeline' && (
            <CRMPipelineView
              prospects={prospects}
              onSelectProspect={handleSelectProspect}
              onTriggerPitch={handleTriggerPitch}
              onUpdateStage={handleUpdateStage}
            />
          )}

          {currentTab === 'outreach' && (
            <AIOutreachView
              prospect={selectedProspect || prospects[0] || null}
              allProspects={prospects}
              onSelectProspect={setSelectedProspect}
              onUpdateDraft={handleUpdateDraft}
              onMarkAsContacted={handleMarkAsContacted}
            />
          )}

          {currentTab === 'saved' && (
            <SavedProspectsView
              prospects={prospects}
              onSelectProspect={handleSelectProspect}
              onTriggerPitch={handleTriggerPitch}
              onToggleSave={handleToggleSave}
              onExportCSV={() => handleExportCSV(true)}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsView prospects={prospects} />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              user={userProfile}
              onUpdateUser={(updated) => updateProfile(updated)}
              isDemoMode={isDemoMode}
              onToggleDemoMode={() => setIsDemoMode(!isDemoMode)}
            />
          )}
        </div>
      </div>

      {/* Modal: Lead Detail Audit */}
      <LeadDetailModal
        prospect={selectedProspect}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onTriggerPitch={(lead) => {
          setIsDetailModalOpen(false);
          handleTriggerPitch(lead);
        }}
        onToggleSave={handleToggleSave}
        onUpdateStage={handleUpdateStage}
        onSaveNotes={handleSaveNotes}
      />

      {/* Modal: Authentication */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(loggedUser) => {
          updateProfile(loggedUser);
          showToast(`Welcome back, ${loggedUser.name}!`);
        }}
      />

      {/* Modal: Onboarding Wizard */}
      {isOnboardingOpen && (
        <OnboardingWizard
          onComplete={handleCreateCampaign}
          onCancel={() => setIsOnboardingOpen(false)}
        />
      )}
    </div>
  );
}
