import React, { useState } from 'react';
import { 
  FileText, 
  CheckSquare, 
  Square, 
  Printer, 
  BookOpen, 
  CheckCircle2, 
  Filter, 
  Layers, 
  Download,
  MessageSquare
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-bold border border-emerald-400/30">
            <FileText className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'आधिकारिक दस्तावेज़ तैयारी चेकलिस्ट' : 'Official Document Readiness Tracker'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {language === 'hi' ? 'सरकारी दस्तावेज़ चेकलिस्ट' : 'Government Document Requirements'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {language === 'hi'
              ? 'आवेदन करने से पहले आवश्यक प्रमाण पत्रों की जांच करें। अपने पास उपलब्ध दस्तावेजों पर टिक करें और आधिकारिक संदर्भ देखें।'
              : 'Verify necessary certificates before applying. Check off documents in hand and inspect cited official guideline sections.'}
          </p>
        </div>
      </div>

      {/* Scheme Selector & Progress Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-1/2 space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            {language === 'hi' ? 'योजना का चयन करें:' : 'Select Government Scheme:'}
          </label>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-700 shrink-0" />
            <select
              value={selectedSchemeId}
              onChange={(e) => setSelectedSchemeId(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:border-blue-600"
            >
              {schemes.map(s => (
                <option key={s.id} value={s.id}>
                  {language === 'hi' ? s.hindiName : s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full md:w-1/2 bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-700">
              {language === 'hi' ? 'दस्तावेज़ तैयारी प्रगति:' : 'Readiness Progress:'}
            </span>
            <span className="text-emerald-700">
              {readyDocs} / {totalDocs} ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-400">
            {progressPercent === 100
              ? (language === 'hi' ? 'बधाई! आपके सभी आवश्यक दस्तावेज तैयार हैं।' : 'All required documents ready!')
              : (language === 'hi' ? 'आवेदन करने से पूर्व शेष दस्तावेज तैयार करें।' : 'Collect remaining documents before applying.')}
          </p>
        </div>
      </div>

      {/* Checklist Content */}
      {currentScheme && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {language === 'hi' ? currentScheme.hindiName : currentScheme.name} — {language === 'hi' ? 'दस्तावेज सूची' : 'Documents List'}
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {currentScheme.officialDocTitle}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'प्रिंट / सेव करें' : 'Print Checklist'}</span>
              </button>
              <button
                onClick={() => onAskAI(
                  language === 'hi'
                    ? `${currentScheme.hindiName} के लिए कौन-कौन से दस्तावेज चाहिए?`
                    : `What documents are required for ${currentScheme.name}?`
                )}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-2xs transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'एआई से पूछें' : 'Ask AI'}</span>
              </button>
            </div>
          </div>

          {/* Document Cards */}
          <div className="space-y-3">
            {currentScheme.documents.map((doc, idx) => {
              const isChecked = checkedItems[doc.name] || false;

              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(doc.name)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 shadow-2xs ${
                    isChecked
                      ? 'bg-emerald-50/60 border-emerald-300'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {isChecked ? (
                      <CheckSquare className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <Square className="w-6 h-6 text-slate-300 hover:text-slate-400" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-3">
                      <span className={`text-sm sm:text-base font-bold ${
                        isChecked ? 'text-emerald-950 line-through' : 'text-slate-900'
                      }`}>
                        {language === 'hi' ? doc.nameHindi : doc.name}
                      </span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                        doc.required
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {doc.required ? (language === 'hi' ? 'अनिवार्य' : 'Mandatory') : (language === 'hi' ? 'वैकल्पिक' : 'Optional')}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {language === 'hi' ? doc.purposeHindi : doc.purpose}
                    </p>

                    <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-blue-600" />
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
                        className="text-blue-700 hover:underline font-semibold"
                      >
                        {language === 'hi' ? 'मूल नियम देखें' : 'View Rule'}
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
