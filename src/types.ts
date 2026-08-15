export type IntentTier = 'very_hot' | 'hot' | 'warm' | 'cold';

export type SignalType = 
  | 'expansion'
  | 'hiring_surge'
  | 'funding_growth'
  | 'negative_reviews'
  | 'outdated_tech'
  | 'public_inquiry'
  | 'new_incorporation'
  | 'vendor_search'
  | 'leadership_change'
  | 'franchise_expansion'
  | 'tech_migration'
  | 'compliance_regulatory';

export type PipelineStage = 
  | 'new'
  | 'qualified'
  | 'contacted'
  | 'replied'
  | 'meeting'
  | 'meeting_booked'
  | 'proposal'
  | 'proposal_sent'
  | 'negotiation'
  | 'won'
  | 'closed_won'
  | 'lost'
  | 'closed_lost'
  | 'new_signal'
  | 'reviewed'
  | 'pitch_ready'
  | 'in_conversation';

export type SearchProviderType = 'demo' | 'google_web' | 'bing_business' | 'news_pr_wire' | 'job_boards' | 'custom_api';

export interface ScoreBreakdown {
  businessFit: number; // 0-25
  signalStrength: number; // 0-30
  signalRecency: number; // 0-15
  problemRelevance: number; // 0-15
  companyGrowth: number; // 0-10
  dataConfidence: number; // 0-5
}

export interface IntentScores {
  overall: number; // 0 - 100
  urgency?: number; // 0 - 100
  budgetPower?: number; // 0 - 100
  solutionFit?: number; // 0 - 100
  timingFreshness?: number; // 0 - 100
  businessFit?: number;
  signalStrength?: number;
  recency?: number;
  problemUrgency?: number;
  growthVelocity?: number;
  confidence?: number;
  breakdown?: ScoreBreakdown;
}

export interface SignalEvidence {
  id?: string;
  sourceName?: string;
  source?: string;
  sourceType?: 'news_pr' | 'job_board' | 'review_site' | 'social_forum' | 'website_audit' | 'filing' | 'public_registry' | string;
  url?: string;
  timestamp?: string;
  headline?: string;
  rawExcerpt?: string; // The verifiable FACT
  inferredNeed?: string; // The strategic AI INFERENCE
  confidence?: 'high' | 'medium' | 'unverified';
  searchQueryMatched?: string;
}

export interface DecisionMaker {
  name: string;
  role: string;
  email?: string;
  publicEmail?: string;
  linkedin?: string;
  phone?: string;
  confidence?: number;
  isPublicInfo?: boolean;
}

export interface EmailDraft {
  subject: string;
  body: string;
  tone?: string;
  toneVariants?: {
    short?: string;
    professional?: string;
    friendly?: string;
    highTicket?: string;
  };
}

export interface ColdCallScript {
  openingHook?: string;
  hook?: string;
  valueProposition?: string;
  valueProp?: string;
  lowFrictionCTA?: string;
  cta?: string;
  objectionHandling?: { objection: string; response: string }[];
  objectionKillers?: string[];
}

export interface OutreachDrafts {
  email?: EmailDraft;
  coldEmail?: EmailDraft;
  linkedin?: string;
  linkedInMessage?: string;
  whatsapp?: string;
  whatsAppPitch?: string;
  callScript?: ColdCallScript;
  coldCallScript?: ColdCallScript;
}

export interface ProspectActivity {
  id: string;
  timestamp: string;
  type: 'discovered' | 'stage_changed' | 'pitch_generated' | 'note_added' | 'contacted' | 'saved';
  description: string;
  user?: string;
}

export interface ProspectLead {
  id: string;
  campaignId?: string;
  companyName: string;
  website?: string;
  industry: string;
  location: string;
  employeeCount?: string;
  revenueRange?: string;
  foundedYear?: string;
  detectedAt?: string;
  lastDiscoveredAt?: string;
  intentTier: IntentTier;
  intentScores: IntentScores;
  signalType: SignalType;
  primarySignal: string;
  inferredOpportunity: string;
  recommendedOffer: string; // e.g. "Restaurant Multi-Unit SOP Consulting"
  suggestedApproach?: string;
  estimatedDealValue: string;
  numericDealValue?: number;
  currency?: string;
  evidence: SignalEvidence[];
  decisionMaker: DecisionMaker;
  recommendedPitchAngle?: string;
  pipelineStage: PipelineStage;
  owner?: string;
  lastContactedAt?: string;
  nextFollowUpDate?: string;
  dealProbability?: number; // 0-100%
  notes?: string;
  outreachDrafts?: OutreachDrafts;
  tags?: string[];
  isSaved?: boolean;
  isDemo?: boolean;
  searchQueryUsed?: string;
  providerSource?: string;
  activities?: ProspectActivity[];
}

export interface ICPSettings {
  id?: string;
  campaignName: string;
  productName: string;
  productDescription: string;
  category?: string;
  targetAudience: string;
  industry: string;
  location: string;
  salesCycle?: string;
  minDealValue: number;
  maxDealValue: number;
  currency: string;
  keywords: string[];
  enabledSignals: SignalType[];
  customSignals?: string[];
  excludedIndustries?: string[];
  excludedCompanies?: string[];
  primaryObjective?: string;
  status?: 'active' | 'paused' | 'draft';
  createdAt?: string;
  leadCount?: number;
}

export interface SearchRun {
  id: string;
  timestamp: string;
  campaignId?: string;
  campaignName: string;
  queriesGenerated: string[];
  prospectsFound: number;
  veryHotCount: number;
  hotCount: number;
  warmCount: number;
  coldCount: number;
  searchProvider: SearchProviderType;
  durationMs: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  organization: string;
  role: string;
  tier: 'starter' | 'growth' | 'scale';
  searchesRemaining: number;
  searchesTotal: number;
  monthlyLeadQuota: number;
  leadsUsedThisMonth: number;
  onboardingCompleted: boolean;
  avatarUrl?: string;
}

export interface AnalyticsData {
  totalProspectsDiscovered: number;
  veryHotCount: number;
  hotCount: number;
  warmCount: number;
  coldCount: number;
  totalPipelineValue: number;
  averageIntentScore: number;
  conversionFunnel: {
    discovered: number;
    qualified: number;
    contacted: number;
    replied: number;
    meeting: number;
    proposal: number;
    negotiation: number;
    won: number;
  };
  revenueWon: number;
  signalBreakdown: { signal: string; count: number; winRate: number }[];
  intentVsConversion: { tier: string; scoreRange: string; prospects: number; converted: number; rate: number }[];
  weeklyTrend: { date: string; discovered: number; contacted: number; won: number }[];
}

export type ViewTab = 
  | 'dashboard'
  | 'find_customers'
  | 'campaigns'
  | 'prospects'
  | 'hot_leads'
  | 'pipeline'
  | 'outreach'
  | 'saved'
  | 'analytics'
  | 'settings'
  | 'landing';
