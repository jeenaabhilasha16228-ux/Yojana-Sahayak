import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Layers, 
  BookOpen, 
  Check, 
  ExternalLink,
  Cpu,
  Globe2,
  Lock,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { CanvasShaderBackground } from './CanvasShaderBackground';
import { Language, Scheme, SourceCitation } from '../types';

interface HomeViewProps {
  language: Language;
  onSearchSubmit: (query: string) => void;
  onNavigateTab: (tab: string) => void;
  onSelectScheme: (scheme: Scheme) => void;
  onOpenSourceModal: (citation: SourceCitation) => void;
  schemes: Scheme[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  language,
  onSearchSubmit,
  onNavigateTab,
  onSelectScheme,
  onOpenSourceModal,
  schemes,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchSubmit(searchInput.trim());
    }
  };

  const suggestedQuestions = language === 'hi' ? [
    { label: 'क्या मैं पात्र हूँ?', query: 'क्या मैं इस योजना के लिए पात्र हूँ?' },
    { label: 'कौन से दस्तावेज चाहिए?', query: 'इस योजना के लिए कौन से दस्तावेज चाहिए?' },
    { label: 'क्या लाभ मिलेगा?', query: 'इस योजना में मुझे क्या और कितना लाभ मिलेगा?' },
    { label: 'आवेदन कैसे करें?', query: 'मैं इस योजना के लिए आवेदन कैसे करूं?' },
    { label: 'पीएम-किसान में ₹6,000 की शर्तें?', query: 'पीएम किसान योजना में ₹6,000 की क्या शर्तें और अपात्रता नियम हैं?' },
    { label: 'आयुष्मान 70+ बुजुर्गों के लिए कार्ड?', query: 'आयुष्मान भारत में 70 वर्ष से अधिक उम्र के बुजुर्गों के लिए क्या नियम हैं?' },
  ] : [
    { label: 'Am I eligible?', query: 'Am I eligible for this scheme?' },
    { label: 'What documents do I need?', query: 'What documents do I need for this scheme?' },
    { label: 'What benefits do I get?', query: 'What benefits will I receive from this scheme?' },
    { label: 'How do I apply?', query: 'How do I apply for this scheme?' },
    { label: 'PM-KISAN ₹6,000 rules?', query: 'Am I eligible for PM-KISAN and what are the income tax exclusion rules?' },
    { label: 'Ayushman Bharat 70+ seniors?', query: 'How does the Ayushman Bharat ₹5 Lakh cover work for senior citizens aged 70+?' },
  ];

  const categories = [
    { id: 'education', nameEn: 'Education', nameHi: 'शिक्षा', count: 'Scholarships & Grants', icon: '🎓' },
    { id: 'agriculture', nameEn: 'Agriculture', nameHi: 'कृषि एवं किसान', count: 'Direct Cash DBT', icon: '🌾' },
    { id: 'healthcare', nameEn: 'Healthcare', nameHi: 'स्वास्थ्य सेवा', count: '₹5L Hospital Cover', icon: '🏥' },
    { id: 'employment', nameEn: 'Employment & MSME', nameHi: 'रोजगार व उद्यम', count: 'Collateral-free Loans', icon: '💼' },
    { id: 'housing', nameEn: 'Housing', nameHi: 'आवास', count: 'Pucca House Subsidy', icon: '🏠' },
    { id: 'women_child', nameEn: 'Women & Child Welfare', nameHi: 'महिला व बाल विकास', count: 'LPG & Savings', icon: '🌸' },
    { id: 'scholarships', nameEn: 'Scholarships', nameHi: 'छात्रवृत्ति', count: 'Merit Disbursals', icon: '📚' },
    { id: 'financial_assistance', nameEn: 'Financial Assistance', nameHi: 'वित्तीय सहायता', count: 'Pensions & Tarun Loans', icon: '₹' },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden text-slate-100">
      {/* 1. CINEMATIC HERO SECTION WITH SHADER BACKGROUND */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center pt-16 pb-20">
        {/* WebGL Canvas Shader background */}
        <CanvasShaderBackground />

        {/* Ambient Overlay gradient */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#06080e]/60 to-[#06080e] pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          {/* Subtle Tag Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.12] backdrop-blur-md text-xs font-semibold tracking-wide text-slate-300 shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>
              {language === 'hi' 
                ? 'आधिकारिक दस्तावेज़-आधारित आरएजी आर्किटेक्चर' 
                : 'Official Document Grounded RAG Assistant'}
            </span>
            <span className="text-white/[0.2]">•</span>
            <span className="text-blue-400 font-bold">100% Verified</span>
          </div>

          {/* Main Cinematic Title */}
          <div className="space-y-3">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05]">
              {language === 'hi' ? (
                <>
                  सरकारी योजनाएं। <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-emerald-400">
                    सबके लिए आसान।
                  </span>
                </>
              ) : (
                <>
                  Government Schemes. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-emerald-400">
                    Simplified.
                  </span>
                </>
              )}
            </h1>
            <p className="text-lg sm:text-2xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed pt-2">
              {language === 'hi'
                ? 'हिन्दी या अंग्रेजी में सवाल पूछें। आधिकारिक सरकारी स्रोतों पर आधारित स्पष्ट और प्रामाणिक उत्तर पाएं।'
                : 'Ask questions in Hindi or English. Get clear answers backed by official sources.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigateTab('chat')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 border border-blue-400/40"
            >
              <span>{language === 'hi' ? 'योजना सहायक से पूछें →' : 'Ask Yojana Sahayak →'}</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('schemes-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else onNavigateTab('schemes');
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-bold text-base border border-white/[0.12] hover:border-white/[0.25] backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4 text-slate-400" />
              <span>{language === 'hi' ? 'योजनाएं देखें' : 'Explore Schemes'}</span>
            </button>
          </div>

          {/* Bottom Live Metrics */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-medium text-slate-400 border-t border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="text-white font-black text-sm">10+</span>
              <span>National Welfare Programs</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-black text-sm">100%</span>
              <span>Direct Ministry Guidelines</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-black text-sm">EN / HI</span>
              <span>Bilingual & Hinglish AI</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AI QUESTION SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/[0.12] p-6 sm:p-12 shadow-2xl backdrop-blur-2xl space-y-6">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {language === 'hi' ? 'आप क्या जानना चाहते हैं?' : 'What do you want to know?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {language === 'hi'
                ? 'अपनी पात्रता, कागजात या लाभ के बारे में किसी भी भाषा में पूछें:'
                : 'Ask anything about eligibility, benefits, documents or procedures:'}
            </p>
          </div>

          {/* Large AI Search Box */}
          <form onSubmit={handleSearch} className="relative group">
            <div className="relative flex items-center bg-[#06080e]/90 rounded-2xl border-2 border-white/[0.15] focus-within:border-blue-500 shadow-2xl p-2 transition-all">
              <Search className="w-6 h-6 text-slate-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={
                  language === 'hi'
                    ? 'सरकारी योजना के बारे में पूछें (जैसे: क्या मैं पात्र हूँ? कौन से दस्तावेज चाहिए?)...'
                    : 'Ask about a government scheme (e.g. Am I eligible? What documents do I need?)...'
                }
                className="w-full px-4 py-3.5 bg-transparent text-white placeholder:text-slate-500 text-sm sm:text-base focus:outline-none"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3.5 rounded-xl font-bold text-sm shrink-0 flex items-center gap-2 shadow-lg transition-all"
              >
                <span>{language === 'hi' ? 'पूछें' : 'Ask AI'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Suggested Prompt Buttons */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-semibold text-slate-400 block text-center">
              {language === 'hi' ? 'लोकप्रिय प्रश्न (क्लिक करके तुरंत पूछें):' : 'Suggested questions (click to ask immediately):'}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {suggestedQuestions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onSearchSubmit(item.query)}
                  className="px-3.5 py-2 rounded-xl text-xs font-medium bg-white/[0.04] hover:bg-white/[0.1] text-slate-200 border border-white/[0.08] hover:border-white/[0.2] transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SCHEMES & CATEGORIES SECTION */}
      <section id="schemes-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              {language === 'hi' ? 'सरकारी योजना श्रेणियां' : 'Welfare Directory'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {language === 'hi' ? 'प्रमुख योजनाएं एवं श्रेणियां' : 'Key Government Schemes'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {language === 'hi'
                ? 'कृषि, स्वास्थ्य, आवास, सौर ऊर्जा और पेंशन से जुड़ी आधिकारिक योजनाएं।'
                : 'Explore by sector or ask the assistant for tailored eligibility evaluation.'}
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('schemes')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
          >
            <span>{language === 'hi' ? 'सभी योजनाएं देखें' : 'View All Schemes'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigateTab('schemes')}
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.07] hover:border-white/[0.2] transition-all cursor-pointer group"
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{cat.icon}</div>
              <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                {language === 'hi' ? cat.nameHi : cat.nameEn}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{cat.count}</p>
            </div>
          ))}
        </div>

        {/* Featured Scheme Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {schemes.slice(0, 6).map((scheme) => (
            <div
              key={scheme.id}
              className="rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/40 p-6 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/20 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    {scheme.category.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] text-slate-500 truncate max-w-[140px]">
                    {scheme.ministry}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {language === 'hi' ? scheme.hindiName : scheme.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {language === 'hi' ? scheme.shortDescriptionHindi : scheme.shortDescription}
                  </p>
                </div>

                {/* Benefit Highlight Box */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                    {language === 'hi' ? 'मुख्य लाभ' : 'Key Benefit'}
                  </span>
                  <p className="text-xs font-semibold text-slate-200 mt-0.5 line-clamp-2">
                    {language === 'hi' ? scheme.benefitHighlightHindi : scheme.benefitHighlight}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between gap-2 mt-4 text-xs font-semibold">
                <button
                  onClick={() => onSelectScheme(scheme)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {language === 'hi' ? 'विवरण' : 'Explore'}
                </button>

                <button
                  onClick={() => onSearchSubmit(
                    language === 'hi'
                      ? `${scheme.hindiName} की पात्रता और आवश्यक दस्तावेज क्या हैं?`
                      : `Am I eligible for ${scheme.name} and what documents are required?`
                  )}
                  className="px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white border border-blue-500/30 transition-all flex items-center gap-1"
                >
                  <span>{language === 'hi' ? 'एआई से पूछें' : 'Ask AI'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS (01 ASK -> 02 RETRIEVE -> 03 UNDERSTAND -> 04 VERIFY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white/[0.02] border border-white/[0.08] p-8 sm:p-14 space-y-12 backdrop-blur-xl">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              {language === 'hi' ? 'पारदर्शी प्रक्रिया' : 'How It Works'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {language === 'hi' ? 'योजना सहायक कैसे काम करता है' : 'From Question to Verified Source'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {language === 'hi'
                ? 'चार सरल चरणों में आधिकारिक सरकारी गजट और दिशानिर्देशों से सत्यापित उत्तर।'
                : 'A strict four-step pipeline engineered to eliminate AI hallucination entirely.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3 hover:border-blue-500/30 transition-all">
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                01
              </span>
              <h3 className="text-lg font-bold text-white">
                {language === 'hi' ? 'ASK — पूछें' : '01 — ASK'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'hi'
                  ? 'अपनी भाषा (English, हिन्दी या Hinglish) में बेझिझक सवाल पूछें।'
                  : 'Ask your question naturally in English, Hindi, or Hinglish.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3 hover:border-blue-500/30 transition-all">
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                02
              </span>
              <h3 className="text-lg font-bold text-white">
                {language === 'hi' ? 'RETRIEVE — खोजें' : '02 — RETRIEVE'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'hi'
                  ? 'सिस्टम आधिकारिक सरकारी फाइलों से संबंधित खंड और पृष्ठ संख्या निकालता है।'
                  : 'Relevant scheme information is retrieved from official PDF guidelines.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3 hover:border-blue-500/30 transition-all">
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">
                03
              </span>
              <h3 className="text-lg font-bold text-white">
                {language === 'hi' ? 'UNDERSTAND — समझें' : '03 — UNDERSTAND'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'hi'
                  ? 'एआई प्राप्त आधिकारिक पाठ के आधार पर सरल भाषा में स्पष्टीकरण देता है।'
                  : 'AI explains the information simply without fabricating facts.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3 hover:border-blue-500/30 transition-all">
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                04
              </span>
              <h3 className="text-lg font-bold text-white">
                {language === 'hi' ? 'VERIFY — सत्यापित करें' : '04 — VERIFY'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'hi'
                  ? 'प्रत्येक उत्तर के साथ आधिकारिक दस्तावेज़ और पेज नंबर का प्रमाण क्लिक करके देखें।'
                  : 'View the source document and page number used for the answer.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TRUST SECTION: "ANSWERS YOU CAN TRACE" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-[#06080e] border border-blue-500/20 p-8 sm:p-14 space-y-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
              {language === 'hi' ? 'विश्वसनीयता एवं सुरक्षा' : 'Trust and Safety'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {language === 'hi' ? 'उत्तर जिन्हें आप ट्रैक कर सकते हैं।' : 'Answers you can trace.'}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {language === 'hi'
                ? 'सरकारी योजनाओं की जानकारी अक्सर जटिल होती है। योजना सहायक हर उत्तर को उसके आधिकारिक प्रमाण से जोड़ता है।'
                : 'Government scheme information can be complicated. Yojana Sahayak connects answers to their supporting sources.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">
                {language === 'hi' ? 'स्रोतों पर आधारित (Source-backed)' : 'Source-backed'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'hi'
                  ? 'हर तथ्य आधिकारिक दिशानिर्देशों के पृष्ठ संख्या और खंड के साथ उद्धृत है।'
                  : 'Every fact is anchored to official ministry gazettes with exact page numbers.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Globe2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">
                {language === 'hi' ? 'द्विभाषी (Bilingual)' : 'Bilingual'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'hi'
                  ? 'हिन्दी, English और Hinglish में स्वाभाविक रूप से बातचीत करें।'
                  : 'Communicate naturally in English, Hindi, or conversational Hinglish.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">
                {language === 'hi' ? 'सरल (Simple)' : 'Simple'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {language === 'hi'
                  ? 'जटिल सरकारी शब्दावली के स्थान पर स्पष्ट बुलेट पॉइंट्स और चेकलिस्ट।'
                  : 'Clear checklists, plain explanations, and immediate next steps.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
