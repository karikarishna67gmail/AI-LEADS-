import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  Linkedin, 
  MessageSquare, 
  Phone, 
  Copy, 
  Check, 
  Sparkles, 
  RefreshCw, 
  Building2, 
  User, 
  ArrowRight,
  Flame,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { ProspectLead, OutreachDrafts } from '../types';

interface AIOutreachViewProps {
  prospect: ProspectLead | null;
  allProspects: ProspectLead[];
  onSelectProspect: (prospect: ProspectLead) => void;
  onUpdateDraft: (prospectId: string, drafts: OutreachDrafts) => void;
  onMarkAsContacted: (prospectId: string) => void;
}

export const AIOutreachView: React.FC<AIOutreachViewProps> = ({
  prospect,
  allProspects,
  onSelectProspect,
  onUpdateDraft,
  onMarkAsContacted,
}) => {
  const activeLead = prospect || allProspects[0];
  const [activeChannel, setActiveChannel] = useState<'email' | 'linkedin' | 'whatsapp' | 'call'>('email');
  const [emailTone, setEmailTone] = useState<'consultative' | 'direct' | 'roi'>('consultative');
  const [copiedChannel, setCopiedChannel] = useState<string | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Fallback drafts if not yet generated
  const drafts: OutreachDrafts = activeLead?.outreachDrafts || {
    coldEmail: {
      subject: `Scaling ${activeLead?.companyName || 'your business'} — quick question on kitchen unit margins`,
      body: `Hi ${activeLead?.decisionMaker?.name || 'there'},\n\nNoticed ${activeLead?.companyName}'s recent announcement regarding opening multiple new locations in ${activeLead?.location || 'your region'}.\n\nWhen scaling multi-unit operations, central procurement and line waste typically cause an 18-20% margin leak if SOPs aren't locked in before launch.\n\nWe recently helped a similar multi-location brand optimize kitchen rush speed and cut food cost by 4.2% across 8 outlets.\n\nWould you be open to a 10-minute chat this Thursday to see the exact blueprint?\n\nBest,\nRajesh Sharma\nF&B Growth Systems`,
      tone: emailTone,
    },
    linkedInMessage: `Hi ${activeLead?.decisionMaker?.name || 'there'} — congratulations on ${activeLead?.companyName}'s upcoming expansion across ${activeLead?.location || 'the city'}! Read the news in the F&B wire.\n\nWe help growing dining chains streamline line SOPs and protect food gross margins during multi-unit rollouts. Would love to connect and share a quick case study!`,
    whatsAppPitch: `Hello ${activeLead?.decisionMaker?.name || 'Sir/Ma\'am'}, saw the news about ${activeLead?.companyName}'s expansion in ${activeLead?.location || 'the area'}. Congratulations! If you're currently standardizing kitchen operations & commissary procurement for the new units, we have a proven turnaround SOP. Would you like me to send over a 1-page summary?`,
    coldCallScript: {
      openingHook: `Hi ${activeLead?.decisionMaker?.name || 'there'}, Rajesh here from F&B Growth Systems. I saw your recent announcement about expanding ${activeLead?.companyName} with new outlets. Quick 20-second question—are you managing the kitchen SOP rollout internally, or looking for an external specialist?`,
      valueProposition: `We specialize in multi-unit kitchen SOPs that cut waste by 4% and eliminate rush-hour delays during rapid expansions.`,
      lowFrictionCTA: `I'm not asking to sell you anything right now—could I send you our 2-page expansion audit checklist over email to take a look?`,
      objectionHandling: [
        {
          objection: "We do all operations internally.",
          response: "Understood! Most founders we work with felt the same until outlet #3, when central food quality varied by 30%. That's where our turnkey checklists save 40+ hours."
        },
        {
          objection: "Not interested right now.",
          response: "Totally fair. May I check back in 6 weeks once the new units are live?"
        }
      ]
    }
  };

  const handleCopy = (text: string, channelName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedChannel(channelName);
    setTimeout(() => setCopiedChannel(null), 2000);
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
    }, 800);
  };

  if (!activeLead) {
    return (
      <div className="p-12 text-center text-slate-500">
        <p className="text-sm font-semibold">No prospects available for AI outreach generation.</p>
        <p className="text-xs mt-1">Run customer discovery first to generate prospects.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              AI Multi-Channel Pitch Engine
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Personalized Outreach for {activeLead.companyName}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Hooks directly into verified public signal: <span className="text-slate-800 font-medium">"{activeLead.primarySignal}"</span>
          </p>
        </div>

        {/* Prospect Switcher Dropdown */}
        <div className="flex items-center gap-3">
          <select
            value={activeLead.id}
            onChange={(e) => {
              const selected = allProspects.find(p => p.id === e.target.value);
              if (selected) onSelectProspect(selected);
            }}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none"
          >
            {allProspects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.companyName} ({p.intentScores?.overall}/100)
              </option>
            ))}
          </select>

          <button
            onClick={() => onMarkAsContacted(activeLead.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs transition-all"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Mark Contacted</span>
          </button>
        </div>
      </div>

      {/* Target Summary Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-100 grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div>
          <span className="text-[11px] text-slate-400 font-medium">Target Company</span>
          <p className="font-bold text-white text-sm">{activeLead.companyName}</p>
          <p className="text-xs text-slate-400">{activeLead.location}</p>
        </div>

        <div>
          <span className="text-[11px] text-slate-400 font-medium">Decision Maker</span>
          <p className="font-bold text-white text-sm">{activeLead.decisionMaker?.name}</p>
          <p className="text-xs text-slate-400">{activeLead.decisionMaker?.role}</p>
        </div>

        <div>
          <span className="text-[11px] text-slate-400 font-medium">Buying Signal (FACT)</span>
          <p className="text-xs text-amber-300 font-medium line-clamp-2">{activeLead.primarySignal}</p>
        </div>

        <div>
          <span className="text-[11px] text-slate-400 font-medium">Recommended Angle</span>
          <p className="text-xs text-emerald-400 font-semibold line-clamp-2">{activeLead.recommendedOffer}</p>
        </div>
      </div>

      {/* Channel Switcher Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        {[
          { id: 'email', label: 'Cold Email', icon: Mail },
          { id: 'linkedin', label: 'LinkedIn InMail / Note', icon: Linkedin },
          { id: 'whatsapp', label: 'WhatsApp / DM', icon: MessageSquare },
          { id: 'call', label: 'Cold Call Script', icon: Phone },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeChannel === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveChannel(tab.id as any)}
              className={`flex items-center gap-2 pb-3 px-4 text-xs font-bold transition-all relative ${
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

      {/* Channel Content Panels */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        {/* EMAIL TAB */}
        {activeChannel === 'email' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Tone:</span>
                <select
                  value={emailTone}
                  onChange={(e) => setEmailTone(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-700"
                >
                  <option value="consultative">Consultative & Value-First</option>
                  <option value="direct">Direct & High-Ticket</option>
                  <option value="roi">ROI & Math-Driven</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRegenerate}
                  disabled={isRegenerating}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
                  <span>Regenerate</span>
                </button>

                <button
                  onClick={() => handleCopy(`Subject: ${drafts.coldEmail?.subject}\n\n${drafts.coldEmail?.body}`, 'email')}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  {copiedChannel === 'email' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedChannel === 'email' ? 'Copied to Clipboard!' : 'Copy Email'}</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subject Line</label>
              <input
                type="text"
                readOnly
                value={drafts.coldEmail?.subject}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-semibold text-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Body</label>
              <textarea
                rows={10}
                readOnly
                value={drafts.coldEmail?.body}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-mono text-slate-800 leading-relaxed focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* LINKEDIN TAB */}
        {activeChannel === 'linkedin' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Connection Note Length: <strong className="text-slate-800">{drafts.linkedInMessage?.length || 0} / 300 characters</strong>
              </span>

              <button
                onClick={() => handleCopy(drafts.linkedInMessage || '', 'linkedin')}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                {copiedChannel === 'linkedin' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedChannel === 'linkedin' ? 'Copied!' : 'Copy LinkedIn Message'}</span>
              </button>
            </div>

            <div>
              <textarea
                rows={6}
                readOnly
                value={drafts.linkedInMessage}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-mono text-slate-800 leading-relaxed focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* WHATSAPP TAB */}
        {activeChannel === 'whatsapp' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                High-Conversion Mobile WhatsApp / Direct Message
              </span>

              <button
                onClick={() => handleCopy(drafts.whatsAppPitch || '', 'whatsapp')}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                {copiedChannel === 'whatsapp' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedChannel === 'whatsapp' ? 'Copied!' : 'Copy WhatsApp Message'}</span>
              </button>
            </div>

            <div>
              <textarea
                rows={5}
                readOnly
                value={drafts.whatsAppPitch}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-mono text-slate-800 leading-relaxed focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* COLD CALL TAB */}
        {activeChannel === 'call' && (
          <div className="space-y-5 animate-fade-in text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">Cold Call Battlecard</span>
              <button
                onClick={() => handleCopy(`Opening Hook: ${drafts.coldCallScript?.openingHook}\n\nValue Proposition: ${drafts.coldCallScript?.valueProposition}\n\nCTA: ${drafts.coldCallScript?.lowFrictionCTA}`, 'call')}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                {copiedChannel === 'call' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedChannel === 'call' ? 'Copied Script!' : 'Copy Call Script'}</span>
              </button>
            </div>

            <div className="space-y-3">
              {/* Step 1: Hook */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 block mb-1">
                  1. Opening Hook (0-15 seconds — cites specific trigger event)
                </span>
                <p className="text-slate-900 font-medium italic leading-relaxed">
                  "{drafts.coldCallScript?.openingHook}"
                </p>
              </div>

              {/* Step 2: Value Prop */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-800 block mb-1">
                  2. 1-Sentence Value Proposition
                </span>
                <p className="text-slate-900 font-medium leading-relaxed">
                  "{drafts.coldCallScript?.valueProposition}"
                </p>
              </div>

              {/* Step 3: Low Friction CTA */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block mb-1">
                  3. Low-Friction Call-to-Action
                </span>
                <p className="text-slate-900 font-bold leading-relaxed">
                  "{drafts.coldCallScript?.lowFrictionCTA}"
                </p>
              </div>

              {/* Step 4: Objection Killers */}
              <div className="pt-2">
                <span className="font-bold text-slate-800 block mb-2">Objection Killers:</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {drafts.coldCallScript?.objectionHandling?.map((obj, i) => (
                    <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="font-bold text-rose-700 text-[11px]">If they say: "{obj.objection}"</div>
                      <div className="text-slate-700 text-[11px] font-medium leading-relaxed">You say: "{obj.response}"</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
