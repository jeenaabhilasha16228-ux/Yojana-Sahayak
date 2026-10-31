import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  FileText, 
  BookOpen, 
  MessageSquare, 
  CheckSquare, 
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Language, Scheme, SourceCitation } from '../types';

interface SchemeDetailModalProps {
  scheme: Scheme | null;
  onClose: () => void;
  language: Language;
  onAskAI: (query: string) => void;
  onOpenSourceModal: (citation: SourceCitation) => void;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  scheme,
  onClose,
  language,
  onAskAI,
  onOpenSourceModal,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'documents' | 'benefits' | 'apply'>('overview');

  if (!scheme) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="bg-[#0b0e17] rounded-3xl shadow-2xl max-w-3xl w-full border border-white/[0.12] overflow-hidden flex flex-col max-h-[92vh] text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 bg-white/[0.03] border-b border-white/[0.08] flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                {scheme.category.replace('_', ' ')}
              </span>
              <span className="text-xs text-slate-400">
                {language === 'hi' ? scheme.ministryHindi : scheme.ministry}
              </span>
            </div>
            <h2 className="text-xl font-black text-white">
              {language === 'hi' ? scheme.hindiName : scheme.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/[0.08] bg-white/[0.01] px-6 gap-2 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'overview', labelEn: 'Overview', labelHi: 'विवरण' },
            { id: 'eligibility', labelEn: 'Eligibility', labelHi: 'पात्रता' },
            { id: 'documents', labelEn: 'Documents', labelHi: 'दस्तावेज' },
            { id: 'benefits', labelEn: 'Benefits', labelHi: 'लाभ' },
            { id: 'apply', labelEn: 'How to Apply', labelHi: 'आवेदन प्रक्रिया' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-white font-bold bg-white/[0.04]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {language === 'hi' ? tab.labelHi : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">
                  {language === 'hi' ? 'उद्देश्य' : 'Objective'}
                </h3>
                <p className="text-slate-300 text-base leading-relaxed">
                  {language === 'hi' ? scheme.shortDescriptionHindi : scheme.shortDescription}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
                <span className="text-xs uppercase font-bold tracking-wider text-amber-400 block">
                  {language === 'hi' ? 'मुख्य वित्तीय या सामाजिक लाभ' : 'Key Financial or Social Benefit'}
                </span>
                <p className="text-base font-bold text-white mt-1">
                  {language === 'hi' ? scheme.benefitHighlightHindi : scheme.benefitHighlight}
                </p>
              </div>

              {/* Official guidelines citation box */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    {language === 'hi' ? 'आधिकारिक दिशानिर्देश दस्तावेज' : 'Official Grounded Guidelines'}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Verified
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  {scheme.officialDocTitle}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {scheme.chunks.map((chunk, idx) => (
                    <button
                      key={idx}
                      onClick={() => onOpenSourceModal({
                        id: chunk.id,
                        schemeId: scheme.id,
                        schemeName: scheme.name,
                        documentTitle: chunk.documentTitle,
                        section: chunk.section,
                        pageNumber: chunk.pageNumber,
                        excerpt: chunk.content,
                        officialUrl: scheme.officialPortal
                      })}
                      className="inline-flex items-center gap-1.5 text-xs bg-white/[0.04] hover:bg-blue-600/20 text-slate-200 hover:text-white border border-white/[0.08] px-2.5 py-1 rounded-xl transition-colors font-medium"
                    >
                      <FileText className="w-3 h-3 text-blue-400" />
                      <span>{chunk.section} (Page {chunk.pageNumber})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'eligibility' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/20 space-y-2">
                <h3 className="text-xs uppercase font-bold tracking-wider text-blue-400">
                  {language === 'hi' ? 'पात्रता सारांश' : 'Eligibility Summary'}
                </h3>
                <p className="text-slate-200 text-sm leading-relaxed">
                  {language === 'hi' ? scheme.eligibility.summaryHindi : scheme.eligibility.summary}
                </p>
                <div className="text-xs text-blue-400 font-medium pt-1">
                  {language === 'hi' ? 'स्रोत:' : 'Source:'} {scheme.officialDocTitle} — {scheme.eligibility.sourceSection}, Page {scheme.eligibility.sourcePage}
                </div>
              </div>

              {scheme.eligibility.excludedOccupations && scheme.eligibility.excludedOccupations.length > 0 && (
                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/20 space-y-2">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-rose-400">
                    {language === 'hi' ? 'अपात्रता मानदंड (कौन आवेदन नहीं कर सकता)' : 'Exclusion Criteria (Who Cannot Apply)'}
                  </h3>
                  <ul className="space-y-1 text-xs text-rose-200/90 list-disc list-inside">
                    {scheme.eligibility.excludedOccupations.map((ex, i) => (
                      <li key={i}>{ex}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                {language === 'hi'
                  ? 'आवेदन से पूर्व इन आधिकारिक दस्तावेजों की मूल व छायाप्रति तैयार रखें:'
                  : 'Official document requirements based on verified ministry guidelines:'}
              </p>

              <div className="space-y-2.5">
                {scheme.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] flex items-start gap-3"
                  >
                    <CheckSquare className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div className="flex-1 text-xs space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-white text-sm">
                          {language === 'hi' ? doc.nameHindi : doc.name}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          doc.required ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-white/[0.05] text-slate-300'
                        }`}>
                          {doc.required ? (language === 'hi' ? 'अनिवार्य' : 'Mandatory') : (language === 'hi' ? 'वैकल्पिक' : 'Optional')}
                        </span>
                      </div>
                      <p className="text-slate-400">
                        {language === 'hi' ? doc.purposeHindi : doc.purpose}
                      </p>
                      <div className="text-[10px] text-slate-500">
                        Ref: Page {doc.sourcePage} ({doc.sourceSection})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'benefits' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {scheme.benefits.map((b, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] space-y-1">
                    <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
                      {language === 'hi' ? b.titleHindi : b.title}
                    </span>
                    <h4 className="text-lg font-black text-white">
                      {b.amountOrCoverage}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {language === 'hi' ? b.frequencyHindi : b.frequency}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'apply' && (
            <div className="space-y-3">
              {scheme.applicationSteps.map((step) => (
                <div key={step.stepNumber} className="flex gap-3 p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02]">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {step.stepNumber}
                  </div>
                  <div className="space-y-1 text-xs">
                    <h4 className="font-bold text-white text-sm">
                      {language === 'hi' ? step.titleHindi : step.title}
                    </h4>
                    <p className="text-slate-400 leading-relaxed">
                      {language === 'hi' ? step.detailsHindi : step.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white/[0.02] border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onAskAI(
                language === 'hi'
                  ? `${scheme.hindiName} की पात्रता और लाभ के बारे में बताएं।`
                  : `Explain the eligibility and key benefits for ${scheme.name}.`
              );
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'इस योजना पर एआई से पूछें →' : 'Ask AI about this scheme →'}</span>
          </button>

          <div className="flex items-center gap-2">
            {scheme.officialPortal && (
              <a
                href={scheme.officialPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-xs font-semibold transition-colors"
              >
                <span>{language === 'hi' ? 'आधिकारिक पोर्टल' : 'Official Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-medium"
            >
              {language === 'hi' ? 'बंद करें' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
