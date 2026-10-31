import React, { useState } from 'react';
import { 
  Search, 
  Layers, 
  MessageSquare, 
  BookOpen, 
  FileText, 
  ExternalLink, 
  ArrowRight,
  Filter,
  Sparkles
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-slate-100">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-6 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
          {language === 'hi' ? 'आधिकारिक योजना निर्देशिका' : 'Schemes Catalog'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {language === 'hi' ? 'सभी केंद्रीय सरकारी योजनाएं' : 'Central Welfare Schemes'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          {language === 'hi'
            ? 'आधिकारिक राजपत्र, मंत्रालय के दिशानिर्देशों और दस्तावेज़ आवश्यकताओं के साथ क्रमबद्ध। किसी भी योजना पर क्लिक करें या सीधे एआई से पूछें।'
            : 'Indexed with official gazette rules, ministry guidelines, and document requirements. Inspect verified sources or query with AI.'}
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="space-y-4">
        {/* Search */}
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
            className="w-full pl-12 pr-4 py-3.5 bg-white/[0.03] border border-white/[0.1] rounded-2xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 shadow-xl"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 border border-blue-400/40'
                  : 'bg-white/[0.03] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.06]'
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
            className="bg-white/[0.03] rounded-3xl border border-white/[0.08] hover:border-blue-500/40 shadow-xl transition-all flex flex-col justify-between overflow-hidden p-6 hover:-translate-y-1 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  {scheme.category.replace('_', ' ')}
                </span>
                <span className="text-[11px] text-slate-500 truncate max-w-[140px]">
                  {scheme.ministry}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                  {language === 'hi' ? scheme.hindiName : scheme.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {language === 'hi' ? scheme.shortDescriptionHindi : scheme.shortDescription}
                </p>
              </div>

              {/* Benefit Box */}
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                  {language === 'hi' ? 'लाभ (Benefit)' : 'Key Benefit'}
                </span>
                <p className="text-xs font-semibold text-slate-200 mt-0.5 line-clamp-2">
                  {language === 'hi' ? scheme.benefitHighlightHindi : scheme.benefitHighlight}
                </p>
              </div>

              {/* Quick Eligibility snippet */}
              <div className="text-xs text-slate-400">
                <span className="font-semibold text-slate-200">
                  {language === 'hi' ? 'पात्रता:' : 'Eligibility:'}
                </span>{' '}
                <span className="line-clamp-2">
                  {language === 'hi' ? scheme.eligibility.summaryHindi : scheme.eligibility.summary}
                </span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-5 border-t border-white/[0.06] flex items-center justify-between gap-2 mt-4 text-xs font-semibold">
              <button
                onClick={() => onSelectScheme(scheme)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                {language === 'hi' ? 'पूर्ण विवरण' : 'Full Details'}
              </button>

              <div className="flex items-center gap-2">
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
                  className="px-2.5 py-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-[11px] font-medium text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <BookOpen className="w-3 h-3 text-blue-400" />
                  <span>{language === 'hi' ? 'स्रोत' : 'Source'}</span>
                </button>

                <button
                  onClick={() => onAskAI(
                    language === 'hi'
                      ? `${scheme.hindiName} के लिए कौन पात्र है और कौन से दस्तावेज चाहिए?`
                      : `Who is eligible for ${scheme.name} and what documents are needed?`
                  )}
                  className="px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white border border-blue-500/30 font-bold text-[11px] flex items-center gap-1 transition-all"
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
        <div className="text-center py-16 bg-white/[0.02] rounded-3xl border border-white/[0.08] p-8 space-y-3">
          <p className="text-base font-semibold text-slate-300">
            {language === 'hi' ? 'कोई योजना नहीं मिली।' : 'No schemes match your criteria.'}
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
            }}
            className="text-xs text-blue-400 font-bold hover:underline"
          >
            {language === 'hi' ? 'फ़िल्टर हटाएं' : 'Reset Filters'}
          </button>
        </div>
      )}
    </div>
  );
};
