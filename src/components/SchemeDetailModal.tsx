import React from 'react';
import { 
  X, 
  ExternalLink, 
  Building, 
  CheckCircle, 
  FileText, 
  HelpCircle, 
  BookOpen, 
  MessageSquare, 
  Award, 
  CheckSquare, 
  Layers,
  ArrowRight
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
  const [activeTab, setActiveTab] = React.useState<'overview' | 'eligibility' | 'documents' | 'benefits' | 'apply'>('overview');

  if (!scheme) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-900 to-indigo-950 text-white flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 border border-blue-400/30">
                {scheme.category.replace('_', ' ')}
              </span>
              <span className="text-xs text-slate-300">
                {language === 'hi' ? scheme.ministryHindi : scheme.ministry}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white">
              {language === 'hi' ? scheme.hindiName : scheme.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 overflow-x-auto text-xs font-semibold">
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
                  ? 'border-blue-700 text-blue-800 bg-white font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {language === 'hi' ? tab.labelHi : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">
                  {language === 'hi' ? 'योजना का उद्देश्य' : 'Objective'}
                </h3>
                <p className="text-slate-700 text-base leading-relaxed">
                  {language === 'hi' ? scheme.shortDescriptionHindi : scheme.shortDescription}
                </p>
              </div>

              {/* Benefit Box */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-xs uppercase font-bold tracking-wider text-amber-800 block">
                  {language === 'hi' ? 'मुख्य वित्तीय या सामाजिक लाभ' : 'Key Financial or Social Benefit'}
                </span>
                <p className="text-base font-bold text-amber-950 mt-1">
                  {language === 'hi' ? scheme.benefitHighlightHindi : scheme.benefitHighlight}
                </p>
              </div>

              {/* Official Guidelines Citation Box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-blue-700" />
                    {language === 'hi' ? 'आधिकारिक दिशानिर्देश दस्तावेज' : 'Official Grounded Guidelines'}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Verified
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-mono">
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
                      className="inline-flex items-center gap-1.5 text-xs bg-white hover:bg-blue-50 text-blue-700 border border-slate-200 px-2.5 py-1 rounded-md transition-colors font-medium shadow-2xs"
                    >
                      <FileText className="w-3 h-3 text-blue-600" />
                      <span>{chunk.section} (Page {chunk.pageNumber})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'eligibility' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200">
                <h3 className="text-xs uppercase font-bold tracking-wider text-blue-800 mb-1">
                  {language === 'hi' ? 'पात्रता सारांश' : 'Eligibility Summary'}
                </h3>
                <p className="text-slate-800 text-sm leading-relaxed">
                  {language === 'hi' ? scheme.eligibility.summaryHindi : scheme.eligibility.summary}
                </p>
                <div className="mt-3 text-xs text-blue-700 font-medium">
                  {language === 'hi' ? 'स्रोत:' : 'Source:'} {scheme.officialDocTitle} — {scheme.eligibility.sourceSection}, Page {scheme.eligibility.sourcePage}
                </div>
              </div>

              {scheme.eligibility.excludedOccupations && scheme.eligibility.excludedOccupations.length > 0 && (
                <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-rose-800 mb-2">
                    {language === 'hi' ? 'अपात्रता मानदंड (कौन आवेदन नहीं कर सकता)' : 'Exclusion Criteria (Who Cannot Apply)'}
                  </h3>
                  <ul className="space-y-1 text-xs text-rose-950 list-disc list-inside">
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
              <p className="text-xs text-slate-500">
                {language === 'hi'
                  ? 'आवेदन से पूर्व इन आधिकारिक दस्तावेजों की मूल व छायाप्रति तैयार रखें:'
                  : 'Prepare original and self-attested photocopies of the following verified documents:'}
              </p>

              <div className="space-y-2.5">
                {scheme.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs flex items-start gap-3"
                  >
                    <CheckSquare className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-slate-900 text-sm">
                          {language === 'hi' ? doc.nameHindi : doc.name}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          doc.required ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {doc.required ? (language === 'hi' ? 'अनिवार्य' : 'Mandatory') : (language === 'hi' ? 'वैकल्पिक' : 'Optional')}
                        </span>
                      </div>
                      <p className="text-slate-600 mt-1">
                        {language === 'hi' ? doc.purposeHindi : doc.purpose}
                      </p>
                      <div className="text-[11px] text-slate-400 mt-1">
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
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1">
                    <span className="text-xs uppercase font-bold tracking-wider text-blue-700">
                      {language === 'hi' ? b.titleHindi : b.title}
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900">
                      {b.amountOrCoverage}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {language === 'hi' ? b.frequencyHindi : b.frequency}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'apply' && (
            <div className="space-y-4">
              <div className="space-y-3">
                {scheme.applicationSteps.map((step) => (
                  <div key={step.stepNumber} className="flex gap-3 p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
                    <div className="w-7 h-7 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {step.stepNumber}
                    </div>
                    <div className="space-y-1 text-xs">
                      <h4 className="font-bold text-slate-900 text-sm">
                        {language === 'hi' ? step.titleHindi : step.title}
                      </h4>
                      <p className="text-slate-600 leading-relaxed">
                        {language === 'hi' ? step.detailsHindi : step.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onAskAI(
                  language === 'hi'
                    ? `${scheme.hindiName} के बारे में मुझे विस्तार से बताएं।`
                    : `Explain the key rules, eligibility, and documents for ${scheme.name}.`
                );
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'इस योजना पर एआई से सवाल पूछें' : 'Ask AI About This Scheme'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {scheme.officialPortal && (
              <a
                href={scheme.officialPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
              >
                <span>{language === 'hi' ? 'आधिकारिक पोर्टल' : 'Official Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-medium"
            >
              {language === 'hi' ? 'बंद करें' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
