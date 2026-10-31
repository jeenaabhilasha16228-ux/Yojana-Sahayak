import React, { useState } from 'react';
import { 
  Search, 
  Layers, 
  MessageSquare, 
  BookOpen, 
  CheckCircle2, 
  FileText, 
  ExternalLink, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { Language, Scheme, SourceCitation } from '../types';

interface SchemesViewProps {
  language: Language;
  schemes: Scheme[];
  onSelectScheme: (scheme: Scheme) => void;
  onAskAI: (query: string) => void;
  onOpenSourceModal: (citation: SourceCitation) => void;
  onNavigateTab: (tab: string) => void;
}

export const SchemesView: React.FC<SchemesViewProps> = ({
  language,
  schemes,
  onSelectScheme,
  onAskAI,
  onOpenSourceModal,
  onNavigateTab,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', labelEn: 'All Schemes', labelHi: 'सभी योजनाएं' },
    { id: 'agriculture', labelEn: 'Agriculture', labelHi: 'कृषि एवं किसान' },
    { id: 'healthcare', labelEn: 'Healthcare', labelHi: 'स्वास्थ्य सेवा' },
    { id: 'housing', labelEn: 'Housing', labelHi: 'आवास' },
    { id: 'employment', labelEn: 'Employment & MSME', labelHi: 'रोजगार व उद्यम' },
    { id: 'women_child', labelEn: 'Women & Child', labelHi: 'महिला व बाल विकास' },
    { id: 'education', labelEn: 'Education & Scholarships', labelHi: 'शिक्षा व छात्रवृत्ति' },
    { id: 'senior_citizens', labelEn: 'Senior Citizens / Pension', labelHi: 'पेंशन व वरिष्ठ नागरिक' },
    { id: 'energy', labelEn: 'Solar & Energy', labelHi: 'सौर ऊर्जा व बिजली' },
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const q = search.toLowerCase();
    const matchesSearch = !q || 
      scheme.name.toLowerCase().includes(q) ||
      scheme.hindiName.includes(q) ||
      scheme.shortDescription.toLowerCase().includes(q) ||
      scheme.shortDescriptionHindi.includes(q) ||
      scheme.tags.some(t => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold border border-blue-400/30">
            <Layers className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'आधिकारिक सरकारी योजना निर्देशिका' : 'Official Government Schemes Directory'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {language === 'hi' ? 'सभी केंद्रीय सरकारी योजनाएं' : 'Central Government Schemes Database'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {language === 'hi'
              ? 'आधिकारिक राजपत्र, मंत्रालय के दिशानिर्देशों और दस्तावेज़ आवश्यकताओं के साथ क्रमबद्ध। किसी भी योजना पर क्लिक करें या सीधे एआई से पूछें।'
              : 'Indexed with official gazette rules, ministry guidelines, and document requirements. Inspect verified sources or query with AI.'}
          </p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              language === 'hi'
                ? 'योजना का नाम, कीवर्ड या मंत्रालय खोजें (जैसे: किसान, आवास, सौर, पेंशन)...'
                : 'Search schemes by name, ministry, or keyword (e.g. Kisan, Awas, Solar, Pension)...'
            }
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-blue-600 shadow-xs text-slate-900 placeholder:text-slate-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {language === 'hi' ? cat.labelHi : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {/* Category & Ministry */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-100">
                  {scheme.category.replace('_', ' ')}
                </span>
                <span className="text-[11px] text-slate-400 truncate max-w-[150px]">
                  {language === 'hi' ? scheme.ministryHindi : scheme.ministry}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                  {language === 'hi' ? scheme.hindiName : scheme.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {language === 'hi' ? scheme.shortDescriptionHindi : scheme.shortDescription}
                </p>
              </div>

              {/* Benefit Box */}
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
                <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block">
                  {language === 'hi' ? 'लाभ (Benefit)' : 'Key Benefit'}
                </span>
                <p className="text-xs font-bold text-amber-950 mt-0.5 line-clamp-2">
                  {language === 'hi' ? scheme.benefitHighlightHindi : scheme.benefitHighlight}
                </p>
              </div>

              {/* Quick Eligibility snippet */}
              <div className="text-xs text-slate-600">
                <span className="font-semibold text-slate-800">
                  {language === 'hi' ? 'पात्रता:' : 'Eligibility:'}
                </span>{' '}
                <span className="line-clamp-2">
                  {language === 'hi' ? scheme.eligibility.summaryHindi : scheme.eligibility.summary}
                </span>
              </div>

              {/* Documents badge */}
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>
                  {scheme.documents.length} {language === 'hi' ? 'आवश्यक दस्तावेज निर्धारित' : 'Required Documents'}
                </span>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
              <button
                onClick={() => onSelectScheme(scheme)}
                className="font-semibold text-slate-700 hover:text-blue-700 transition-colors"
              >
                {language === 'hi' ? 'पूर्ण विवरण' : 'Full Details'}
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    if (scheme.chunks && scheme.chunks.length > 0) {
                      const c = scheme.chunks[0];
                      onOpenSourceModal({
                        id: c.id,
                        schemeId: scheme.id,
                        schemeName: scheme.name,
                        documentTitle: c.documentTitle,
                        section: c.section,
                        pageNumber: c.pageNumber,
                        excerpt: c.content,
                        officialUrl: scheme.officialPortal
                      });
                    }
                  }}
                  className="px-2 py-1 rounded border border-slate-200 bg-white text-[11px] font-medium text-slate-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <BookOpen className="w-3 h-3 text-blue-600" />
                  <span>{language === 'hi' ? 'स्रोत' : 'Source'}</span>
                </button>
                <button
                  onClick={() => onAskAI(
                    language === 'hi'
                      ? `${scheme.hindiName} के लिए कौन पात्र है और कौन से दस्तावेज चाहिए?`
                      : `Who is eligible for ${scheme.name} and what documents are needed?`
                  )}
                  className="px-2.5 py-1 rounded bg-blue-700 hover:bg-blue-800 text-white font-semibold text-[11px] flex items-center gap-1 transition-colors"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>{language === 'hi' ? 'एआई से पूछें' : 'Ask AI'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
          <p className="text-base font-semibold text-slate-700">
            {language === 'hi' ? 'कोई योजना नहीं मिली।' : 'No schemes match your criteria.'}
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
            }}
            className="text-xs text-blue-700 font-bold hover:underline"
          >
            {language === 'hi' ? 'फ़िल्टर हटाएं' : 'Reset Filters'}
          </button>
        </div>
      )}
    </div>
  );
};
