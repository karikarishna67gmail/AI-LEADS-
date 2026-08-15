import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Mail, 
  Linkedin, 
  MessageSquare, 
  Phone, 
  Copy, 
  Check, 
  Send, 
  RefreshCw,
  Sliders,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';
import { ProspectLead, ICPSettings, OutreachDrafts, PipelineStage } from '../types';

interface PitchGeneratorModalProps {
  lead: ProspectLead | null;
  icp: ICPSettings;
  onClose: () => void;
  onUpdateLeadDrafts: (leadId: string, drafts: OutreachDrafts) => void;
  onUpdateStage: (leadId: string, stage: PipelineStage) => void;
}

export const PitchGeneratorModal: React.FC<PitchGeneratorModalProps> = ({
  lead,
  icp,
  onClose,
  onUpdateLeadDrafts,
  onUpdateStage,
}) => {
  const [activeChannel, setActiveChannel] = useState<'email' | 'linkedin' | 'whatsapp' | 'call'>('email');
  const [tone, setTone] = useState<string>('consultative');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [markedContacted, setMarkedContacted] = useState(false);

  // Local draft state
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [linkedinMsg, setLinkedinMsg] = useState('');
  const [whatsappMsg, setWhatsappMsg] = useState('');
  const [callHook, setCallHook] = useState('');
  const [callValueProp, setCallValueProp] = useState('');
  const [callCta, setCallCta] = useState('');

  // Initial load
  useEffect(() => {
    if (lead) {
      if (lead.outreachDrafts) {
        setEmailSubject(lead.outreachDrafts.email.subject);
        setEmailBody(lead.outreachDrafts.email.body);
        setLinkedinMsg(lead.outreachDrafts.linkedin);
        setWhatsappMsg(lead.outreachDrafts.whatsapp);
        setCallHook(lead.outreachDrafts.callScript.hook);
        setCallValueProp(lead.outreachDrafts.callScript.valueProp);
        setCallCta(lead.outreachDrafts.callScript.cta);
      } else {
        generatePitches();
      }
    }
  }, [lead]);

  const generatePitches = async (selectedTone = tone) => {
    if (!lead) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/gemini/generate-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead,
          icp,
          tone: selectedTone,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate pitch');
      }

      const data = await res.json();
      const drafts: OutreachDrafts = data.drafts;

      setEmailSubject(drafts.email.subject);
      setEmailBody(drafts.email.body);
      setLinkedinMsg(drafts.linkedin);
      setWhatsappMsg(drafts.whatsapp);
      setCallHook(drafts.callScript.hook);
      setCallValueProp(drafts.callScript.valueProp);
      setCallCta(drafts.callScript.cta);

      onUpdateLeadDrafts(lead.id, drafts);
    } catch (err) {
      console.error('Error generating pitch:', err);
      // Fallback local pitch builder
      const contactFirstName = lead.decisionMaker.name.split(' ')[0] || 'there';
      const fallbackSubject = `Quick note re: ${lead.companyName}'s recent update`;
      const fallbackBody = `Hi ${contactFirstName},\n\nSaw that ${lead.companyName} is currently ${lead.primarySignal.toLowerCase()}.\n\nWhen going through this specific transition, many operators run into roadblocks with ${lead.inferredOpportunity.toLowerCase()}.\n\nWe recently helped a similar team navigate this phase—driving an immediate 18% lift while protecting unit margins.\n\nOpen to a quick 5-minute brainstorm this Thursday to see what might apply to you?\n\nBest,\n[Your Name]`;
      
      setEmailSubject(fallbackSubject);
      setEmailBody(fallbackBody);
      setLinkedinMsg(`Hi ${contactFirstName} - Congrats on ${lead.companyName}'s news regarding ${lead.primarySignal.slice(0, 50)}! We've built an ops framework specifically solving ${lead.inferredOpportunity.slice(0, 60)}. Happy to share a 1-pager if you're open to connecting.`);
      setWhatsappMsg(`Hey ${contactFirstName}, noticed ${lead.companyName} is ${lead.primarySignal.toLowerCase().slice(0, 45)}. We created a 1-page playbook for ${lead.inferredOpportunity.slice(0, 50)}. Can I send it over?`);
      setCallHook(`"Hey ${contactFirstName}, the reason for my call is I saw your recent announcement about ${lead.primarySignal.slice(0, 50)}."`);
      setCallValueProp(`"Typically when operators hit this milestone, their biggest headache is ${lead.inferredOpportunity}."`);
      setCallCta(`"Would it make sense to compare notes for 5 minutes tomorrow?"`);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!lead) return null;

  const handleCopyCurrent = () => {
    let textToCopy = '';
    if (activeChannel === 'email') {
      textToCopy = `Subject: ${emailSubject}\n\n${emailBody}`;
    } else if (activeChannel === 'linkedin') {
      textToCopy = linkedinMsg;
    } else if (activeChannel === 'whatsapp') {
      textToCopy = whatsappMsg;
    } else if (activeChannel === 'call') {
      textToCopy = `HOOK: ${callHook}\n\nVALUE PROP: ${callValueProp}\n\nCTA: ${callCta}`;
    }

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMarkAsContacted = () => {
    onUpdateStage(lead.id, 'contacted');
    setMarkedContacted(true);
    setTimeout(() => setMarkedContacted(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  AI Outreach Studio
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-700">
                  {lead.companyName}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Anchored to signal: <span className="font-semibold text-slate-700">"{lead.primarySignal.slice(0, 60)}..."</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Controls */}
        <div className="p-6 space-y-5">
          
          {/* Tone Selector & Re-generate */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5" />
                Tone:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'consultative', label: 'Consultative & Helpful' },
                  { id: 'direct_authoritative', label: 'Direct & Authoritative' },
                  { id: 'friendly_warm', label: 'Warm & Casual' },
                  { id: 'roi_focused', label: 'ROI & Data Driven' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setTone(t.id);
                      generatePitches(t.id);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      tone === t.id
                        ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => generatePitches()}
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors shadow-2xs disabled:opacity-60 cursor-pointer ml-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin text-amber-600' : ''}`} />
              <span>Regenerate with AI</span>
            </button>
          </div>

          {/* Channel Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <button
              onClick={() => setActiveChannel('email')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeChannel === 'email'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Cold Email (110 words)</span>
            </button>

            <button
              onClick={() => setActiveChannel('linkedin')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeChannel === 'linkedin'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn InMail / DM</span>
            </button>

            <button
              onClick={() => setActiveChannel('whatsapp')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeChannel === 'whatsapp'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp / SMS</span>
            </button>

            <button
              onClick={() => setActiveChannel('call')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeChannel === 'call'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>Phone / Call Script</span>
            </button>
          </div>

          {/* Active Channel Editor Area */}
          <div className="space-y-4">
            {activeChannel === 'email' && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Personalized Email Body
                  </label>
                  <textarea
                    rows={8}
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-sans leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>
            )}

            {activeChannel === 'linkedin' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    LinkedIn Connection Message / InMail (Max 300 chars)
                  </label>
                  <span className={`text-xs font-semibold ${linkedinMsg.length > 300 ? 'text-rose-600' : 'text-slate-500'}`}>
                    {linkedinMsg.length}/300 chars
                  </span>
                </div>
                <textarea
                  rows={5}
                  value={linkedinMsg}
                  onChange={(e) => setLinkedinMsg(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-sans leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            )}

            {activeChannel === 'whatsapp' && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Direct WhatsApp / SMS Opener
                </label>
                <textarea
                  rows={4}
                  value={whatsappMsg}
                  onChange={(e) => setWhatsappMsg(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-sans leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            )}

            {activeChannel === 'call' && (
              <div className="space-y-3">
                <div className="p-3 bg-amber-50/50 border border-amber-200 rounded-xl">
                  <span className="block text-xs font-bold text-amber-900 mb-1">1. Pattern Interrupt & Signal Hook</span>
                  <p className="text-xs text-slate-800 italic">{callHook}</p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="block text-xs font-bold text-slate-700 mb-1">2. Relevant Value Proposition</span>
                  <p className="text-xs text-slate-800 italic">{callValueProp}</p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="block text-xs font-bold text-slate-700 mb-1">3. Low-Friction Close</span>
                  <p className="text-xs text-slate-800 italic">{callCta}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCurrent}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all shadow-2xs cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-600" />
                  <span>Copy This Pitch</span>
                </>
              )}
            </button>

            <button
              onClick={handleMarkAsContacted}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-2xs"
            >
              {markedContacted ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Moved to Contacted</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-slate-500" />
                  <span>Move Stage to 'Contacted'</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-all cursor-pointer ml-auto"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
