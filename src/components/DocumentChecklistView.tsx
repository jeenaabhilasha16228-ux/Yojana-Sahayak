import React, { useState } from 'react';
import { 
  FileText, 
  CheckSquare, 
  Square, 
  Printer, 
  BookOpen, 
  Layers, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { Language, Scheme, SourceCitation } from '../types';

interface DocumentChecklistViewProps {
  language: Language;
  schemes: Scheme[];
  onOpenSourceModal: (citation: SourceCitation) => void;
  onAskAI: (query: string) => void;
}

export const DocumentChecklistView: React.FC<DocumentChecklistViewProps> = ({
  language,
  schemes,
  onOpenSourceModal,
  onAskAI,
}) => {
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>(schemes[0]?.id || 'pm-kisan');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const currentScheme = schemes.find(s => s.id === selectedSchemeId) || schemes[0];

  const toggleCheck = (docName: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [docName]: !prev[docName]
    }));
  };

  const totalDocs = currentScheme ? currentScheme.documents.length : 0;
  const readyDocs = currentScheme
    ? currentScheme.documents.filter(d => checkedItems[d.name]).length
    : 0;

  const progressPercent = totalDocs > 0 ? Math.round((readyDocs / totalDocs) * 100) : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-slate-100">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-6 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
          {language === 'hi' ? 'दस्तावेज़ तैयारी चेकलिस्ट' : 'Document Requirements'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {language === 'hi' ? 'सरकारी दस्तावेज़ चेकलिस्ट' : 'Required Documents Checklist'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          {language === 'hi'
            ? 'आवेदन करने से पहले आवश्यक प्रमाण पत्रों की जांच करें। अपने पास उपलब्ध दस्तावेजों पर टिक करें और आधिकारिक संदर्भ देखें।'
            : 'Checklist based on official ministry guidelines. Verify certificates in hand, review purpose, and inspect official source citations.'}
        </p>
      </div>

      {/* Selector & Gauge Card */}
      <div className="bg-white/[0.03] rounded-3xl border border-white/[0.08] p-6 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-1/2 space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            {language === 'hi' ? 'योजना का चयन करें:' : 'Select Government Scheme:'}
          </label>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400 shrink-0" />
            <select
              value={selectedSchemeId}
              onChange={(e) => setSelectedSchemeId(e.target.value)}
              className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.1] rounded-2xl text-sm font-bold text-white focus:outline-none focus:border-blue-500"
            >
              {schemes.map(s => (
                <option key={s.id} value={s.id} className="bg-[#0b0e14] text-white">
                  {language === 'hi' ? s.hindiName : s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full md:w-1/2 bg-white/[0.02] rounded-2xl p-4 border border-white/[0.06] space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-300">
              {language === 'hi' ? 'तैयारी प्रगति:' : 'Readiness Progress:'}
            </span>
            <span className="text-emerald-400 font-mono">
              {readyDocs} / {totalDocs} ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-white/[0.06] h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-400">
            {progressPercent === 100
              ? (language === 'hi' ? 'उत्कृष्ट! सभी आवश्यक दस्तावेज आपके पास तैयार हैं।' : 'All required documents in hand!')
              : (language === 'hi' ? 'आवेदन करने से पूर्व शेष कागजात तैयार रखें।' : 'Collect remaining certificates before submitting.')}
          </p>
        </div>
      </div>

      {/* Checklist items */}
      {currentScheme && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">
                {language === 'hi' ? currentScheme.hindiName : currentScheme.name}
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {currentScheme.officialDocTitle}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 text-xs font-semibold transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'प्रिंट करें' : 'Print'}</span>
              </button>
              <button
                onClick={() => onAskAI(
                  language === 'hi'
                    ? `${currentScheme.hindiName} के लिए आवश्यक दस्तावेजों की सूची क्या है?`
                    : `What documents are required to apply for ${currentScheme.name}?`
                )}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'एआई से पूछें' : 'Ask AI'}</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {currentScheme.documents.map((doc, idx) => {
              const isChecked = checkedItems[doc.name] || false;

              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(doc.name)}
                  className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-start gap-4 shadow-xl ${
                    isChecked
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : 'bg-white/[0.03] border-white/[0.08] hover:border-white/[0.2]'
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {isChecked ? (
                      <CheckSquare className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <Square className="w-6 h-6 text-slate-500 hover:text-slate-400" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1 text-xs">
                    <div className="flex items-center justify-between gap-3">
                      <span className={`text-sm sm:text-base font-bold ${
                        isChecked ? 'text-slate-400 line-through' : 'text-white'
                      }`}>
                        {language === 'hi' ? doc.nameHindi : doc.name}
                      </span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        doc.required
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-white/[0.05] text-slate-400'
                      }`}>
                        {doc.required ? (language === 'hi' ? 'अनिवार्य' : 'Mandatory') : (language === 'hi' ? 'वैकल्पिक' : 'Optional')}
                      </span>
                    </div>

                    <p className="text-slate-400 leading-relaxed">
                      {language === 'hi' ? doc.purposeHindi : doc.purpose}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1 text-slate-400">
                        <BookOpen className="w-3 h-3 text-blue-400" />
                        <span>Source: Page {doc.sourcePage} ({doc.sourceSection})</span>
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (currentScheme.chunks && currentScheme.chunks.length > 0) {
                            const c = currentScheme.chunks.find(chk => chk.pageNumber === doc.sourcePage) || currentScheme.chunks[0];
                            onOpenSourceModal({
                              id: c.id,
                              schemeId: currentScheme.id,
                              schemeName: currentScheme.name,
                              documentTitle: c.documentTitle,
                              section: doc.sourceSection,
                              pageNumber: doc.sourcePage,
                              excerpt: c.content,
                              officialUrl: currentScheme.officialPortal
                            });
                          }
                        }}
                        className="text-blue-400 hover:text-blue-300 font-bold"
                      >
                        {language === 'hi' ? 'मूल नियम देखें →' : 'View Rule →'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
