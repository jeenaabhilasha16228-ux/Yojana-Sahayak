import React from 'react';
import { 
  Search, 
  MessageSquare, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  BookOpen, 
  FileText, 
  Layers, 
  HelpCircle,
  TrendingUp,
  Cpu,
  FileCheck2,
  ExternalLink
} from 'lucide-react';
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
  const [searchInput, setSearchInput] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchSubmit(searchInput.trim());
    }
  };

  const examplePrompts = language === 'hi' ? [
    { label: 'क्या मैं पीएम-किसान के लिए पात्र हूँ?', query: 'क्या मैं पीएम-किसान योजना के लिए पात्र हूँ?' },
    { label: 'आयुष्मान कार्ड के लिए कौन से दस्तावेज चाहिए?', query: 'आयुष्मान कार्ड बनवाने के लिए कौन से दस्तावेज चाहिए?' },
    { label: 'पीएम आवास योजना में कितना लाभ मिलता है?', query: 'पीएम आवास योजना में कितना लाभ मिलता है और कैसे आवेदन करें?' },
    { label: 'पीएम सूर्य घर मुफ्त बिजली योजना क्या है?', query: 'पीएम सूर्य घर मुफ्त बिजली योजना में 300 यूनिट और ₹78000 सब्सिडी की क्या शर्तें हैं?' },
    { label: 'सुकन्या समृद्धि योजना में कितना ब्याज मिलता है?', query: 'सुकन्या समृद्धि योजना में कितना ब्याज मिलता है और कौन पात्र है?' },
    { label: 'विश्वकर्मा योजना में ₹15000 टूलकिट कैसे मिलेगी?', query: 'पीएम विश्वकर्मा योजना में ₹15000 टूलकिट और 5% लोन कैसे मिलेगा?' }
  ] : [
    { label: 'Am I eligible for PM-KISAN?', query: 'Am I eligible for PM-KISAN? Who is excluded?' },
    { label: 'What documents do I need for Ayushman Card?', query: 'What documents do I need for Ayushman Card?' },
    { label: 'How much subsidy do I get in PM Surya Ghar?', query: 'How much subsidy and benefits do I get in PM Surya Ghar solar scheme?' },
    { label: 'How do I apply for PM Awas Yojana?', query: 'How do I apply for PM Awas Yojana and what are the income limits?' },
    { label: 'What are the benefits of Mudra Loan?', query: 'What are the benefits, categories, and limits of PM Mudra Loan?' },
    { label: 'Sukanya Samriddhi interest rate & documents', query: 'What documents do I need for Sukanya Samriddhi and what is the interest rate?' }
  ];

  const corePromptCards = [
    {
      titleEn: 'Am I eligible?',
      titleHi: 'क्या मैं पात्र हूँ?',
      descEn: 'Check age, income, and occupation rules directly from official guidelines.',
      descHi: 'आधिकारिक दिशानिर्देशों से अपनी उम्र, आय और पेशे की पात्रता जांचें।',
      sampleQueryEn: 'Am I eligible for government schemes as a small farmer or student?',
      sampleQueryHi: 'क्या मैं एक छोटे किसान या छात्र के रूप में सरकारी योजनाओं के लिए पात्र हूँ?',
      color: 'from-blue-600 to-indigo-700'
    },
    {
      titleEn: 'What documents do I need?',
      titleHi: 'मुझे कौन से दस्तावेज चाहिए?',
      descEn: 'Get exact checklists for Aadhaar, Land Records, Ration Card, or Income proof.',
      descHi: 'आधार, खतौनी, राशन कार्ड या आय प्रमाण पत्र की सटीक सूची प्राप्त करें।',
      sampleQueryEn: 'What documents are required to apply for Ayushman Bharat and PM-KISAN?',
      sampleQueryHi: 'आयुष्मान भारत और पीएम-किसान के लिए कौन से दस्तावेज अनिवार्य हैं?',
      color: 'from-emerald-600 to-teal-700'
    },
    {
      titleEn: 'How do I apply?',
      titleHi: 'मैं कैसे आवेदन करूं?',
      descEn: 'Step-by-step portal instructions, CSC assistance, and submission guidelines.',
      descHi: 'पोर्टल पंजीकरण, सीएससी केंद्र और आवेदन प्रक्रिया के स्पष्ट चरण।',
      sampleQueryEn: 'How can I apply online or at CSC for government welfare schemes?',
      sampleQueryHi: 'सरकारी योजनाओं में ऑनलाइन या सीएससी के जरिए कैसे आवेदन करें?',
      color: 'from-amber-600 to-orange-700'
    },
    {
      titleEn: 'What benefits do I get?',
      titleHi: 'मुझे क्या लाभ मिलेगा?',
      descEn: 'Understand cash DBT amounts, free insurance covers, pensions, or subsidies.',
      descHi: 'डीबीटी नकद राशि, मुफ्त बीमा कवर, पेंशन या सब्सिडी की सटीक जानकारी।',
      sampleQueryEn: 'What are the cash benefits, subsidies, and interest rates available?',
      sampleQueryHi: 'मुझे विभिन्न योजनाओं में कितनी नकद सहायता, सब्सिडी या ब्याज छूट मिलेगी?',
      color: 'from-purple-600 to-indigo-800'
    }
  ];

  const featuredSchemes = schemes.slice(0, 6);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-950 text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur-md shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>
              {language === 'hi' 
                ? 'आधिकारिक दस्तावेज़-आधारित द्विभाषी एआई (RAG आर्किटेक्चर)'
                : 'Bilingual RAG Assistant Grounded in Official Documents'}
            </span>
          </div>

          {/* Main Title & Tagline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {language === 'hi' ? (
              <>
                योजना <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-blue-300">सहायक</span>
              </>
            ) : (
              <>
                Yojana <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-blue-200 to-emerald-300">Sahayak</span>
              </>
            )}
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal">
            {language === 'hi'
              ? '“सरकारी योजनाएं, सबके लिए आसान।”'
              : '“Government Schemes, Simplified for Everyone.”'}
          </p>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            {language === 'hi'
              ? 'अपनी भाषा (हिन्दी, English या Hinglish) में सवाल पूछें। हर उत्तर आधिकारिक सरकारी दस्तावेज़ और पृष्ठ संख्या के संदर्भ के साथ मिलेगा।'
              : 'Ask in Hindi, English, or Hinglish. Every factual response cites the verified government guideline document and page number.'}
          </p>

          {/* Large AI Search Box */}
          <div className="pt-4 max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative group">
              <div className="relative flex items-center bg-white rounded-2xl shadow-xl overflow-hidden p-1.5 border-2 border-transparent focus-within:border-blue-500 transition-all">
                <Search className="w-6 h-6 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder={
                    language === 'hi'
                      ? 'पूछें: क्या मैं पात्र हूँ? कौन से दस्तावेज चाहिए? (उदा: पीएम-किसान, आयुष्मान)'
                      : 'Ask anything: Am I eligible? What documents do I need? (e.g. PM-KISAN, Ayushman)'
                  }
                  className="w-full px-3 py-3.5 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2 shrink-0 transition-colors shadow-sm"
                >
                  <span>{language === 'hi' ? 'पूछें' : 'Search'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Quick Example Question Pills */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-slate-400 font-medium">
                {language === 'hi' ? 'उदाहरण प्रश्न:' : 'Example questions:'}
              </span>
              {examplePrompts.slice(0, 4).map((p, i) => (
                <button
                  key={i}
                  onClick={() => onSearchSubmit(p.query)}
                  className="text-xs bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 px-3 py-1.5 rounded-full transition-all text-left"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Question Archetype Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {corePromptCards.map((card, idx) => (
            <div
              key={idx}
              onClick={() => onSearchSubmit(language === 'hi' ? card.sampleQueryHi : card.sampleQueryEn)}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center font-bold text-lg mb-3 shadow-xs group-hover:scale-105 transition-transform`}>
                  {idx === 0 ? '✓' : idx === 1 ? '📋' : idx === 2 ? '➔' : '₹'}
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {language === 'hi' ? card.titleHi : card.titleEn}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {language === 'hi' ? card.descHi : card.descEn}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-700">
                <span>{language === 'hi' ? 'एआई से पूछें' : 'Ask AI'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How RAG Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
              <Cpu className="w-3.5 h-3.5" />
              {language === 'hi' ? 'आरएजी तकनीक (RAG Pipeline)' : 'Retrieval-Augmented Generation'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {language === 'hi'
                ? 'योजना सहायक कैसे काम करता है?'
                : 'How Yojana Sahayak Works'}
            </h2>
            <p className="text-sm text-slate-600">
              {language === 'hi'
                ? 'हम इंटरनेट की भ्रामक जानकारी या मनगढ़ंत उत्तरों पर भरोसा नहीं करते। हमारा सिस्टम सरकारी गजट और आधिकारिक पीडीएफ फाइलों से उत्तर देता है।'
                : 'We avoid fabricated answers and internet rumors. Our system grounds every answer in official government gazettes and operational PDFs.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs relative">
              <span className="w-7 h-7 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center mb-3">1</span>
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'hi' ? 'प्रश्न पूछें' : '1. Ask Query'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'hi'
                  ? 'अपनी भाषा (हिन्दी, English या Hinglish) में बेझिझक सवाल पूछें।'
                  : 'Ask naturally in English, Hindi, or Hinglish.'}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs relative">
              <span className="w-7 h-7 rounded-full bg-indigo-700 text-white text-xs font-bold flex items-center justify-center mb-3">2</span>
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'hi' ? 'दस्तावेज़ खोज' : '2. Semantic Retrieval'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'hi'
                  ? 'सिस्टम आधिकारिक सरकारी फाइलों से संबंधित खंड और पृष्ठ संख्या ढूंढता है।'
                  : 'Retrieves matching sections and page numbers from official PDFs.'}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs relative">
              <span className="w-7 h-7 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center mb-3">3</span>
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'hi' ? 'सटीक उत्तर निर्माण' : '3. Grounded Synthesis'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'hi'
                  ? 'जेमिनी 3.8 मॉडल केवल प्राप्त संदर्भ के आधार पर सरल भाषा में उत्तर तैयार करता है।'
                  : 'Gemini 3.8 synthesizes clear guidance strictly using the retrieved text.'}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs relative">
              <span className="w-7 h-7 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center mb-3">4</span>
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'hi' ? 'सत्यापित स्रोत संदर्भ' : '4. Verified Citation'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'hi'
                  ? 'हर उत्तर के साथ आधिकारिक दस्तावेज़ और पेज नंबर का क्लिक करने योग्य प्रमाण मिलता है।'
                  : 'Every factual answer displays clickable citations with document & page.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured / Popular Schemes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
              <Layers className="w-4 h-4" />
              <span>{language === 'hi' ? 'लोकप्रिय सरकारी योजनाएं' : 'Popular Government Schemes'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {language === 'hi' ? 'प्रमुख केंद्रीय योजनाएं' : 'Featured Central Welfare Schemes'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {language === 'hi'
                ? 'कृषि, स्वास्थ्य, आवास, सौर ऊर्जा और पेंशन से जुड़ी आधिकारिक योजनाएं।'
                : 'Official guidelines indexed across agriculture, healthcare, housing, solar energy, and pensions.'}
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('schemes')}
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline"
          >
            <span>{language === 'hi' ? 'सभी योजनाएं देखें' : 'View All Schemes'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Scheme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6">
                {/* Ministry & Category Tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-100">
                    {scheme.category.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] text-slate-400 truncate max-w-[150px]">
                    {language === 'hi' ? scheme.ministryHindi : scheme.ministry}
                  </span>
                </div>

                {/* Scheme Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {language === 'hi' ? scheme.hindiName : scheme.name}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                  {language === 'hi' ? scheme.shortDescriptionHindi : scheme.shortDescription}
                </p>

                {/* Benefit Highlight Box */}
                <div className="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                    {language === 'hi' ? 'मुख्य लाभ (Benefits)' : 'Key Benefit'}
                  </span>
                  <p className="text-xs font-semibold text-amber-950 mt-0.5">
                    {language === 'hi' ? scheme.benefitHighlightHindi : scheme.benefitHighlight}
                  </p>
                </div>

                {/* Eligibility Summary */}
                <div className="mt-3 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">
                    {language === 'hi' ? 'पात्रता:' : 'Eligibility:'}
                  </span>{' '}
                  <span className="line-clamp-2">
                    {language === 'hi' ? scheme.eligibility.summaryHindi : scheme.eligibility.summary}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => onSelectScheme(scheme)}
                  className="font-semibold text-slate-700 hover:text-blue-700 transition-colors"
                >
                  {language === 'hi' ? 'विवरण देखें' : 'View Details'}
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (scheme.chunks && scheme.chunks.length > 0) {
                        const chunk = scheme.chunks[0];
                        onOpenSourceModal({
                          id: chunk.id,
                          schemeId: scheme.id,
                          schemeName: scheme.name,
                          documentTitle: chunk.documentTitle,
                          section: chunk.section,
                          pageNumber: chunk.pageNumber,
                          excerpt: chunk.content,
                          officialUrl: scheme.officialPortal
                        });
                      }
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-800 px-2 py-1 rounded-md border border-slate-200 bg-white"
                  >
                    <BookOpen className="w-3 h-3 text-blue-600" />
                    <span>{language === 'hi' ? 'स्रोत देखें' : 'View Source'}</span>
                  </button>
                  <button
                    onClick={() => onSearchSubmit(
                      language === 'hi'
                        ? `${scheme.hindiName} के लिए पात्रता और दस्तावेज क्या हैं?`
                        : `What are the eligibility and documents for ${scheme.name}?`
                    )}
                    className="inline-flex items-center gap-1 font-semibold text-blue-700 bg-blue-100/70 hover:bg-blue-200/80 px-2.5 py-1 rounded-md transition-colors"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>{language === 'hi' ? 'एआई से पूछें' : 'Ask AI'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-6 flex flex-col sm:flex-row items-center gap-5">
          <div className="p-3 rounded-2xl bg-blue-600 text-white shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-blue-950">
              {language === 'hi' ? 'आधिकारिक सूचना एवं उत्तरदायित्व' : 'Public Guidance & Trust Policy'}
            </h3>
            <p className="text-xs sm:text-sm text-blue-900/80 leading-relaxed">
              {language === 'hi'
                ? '“योजना सहायक उपलब्ध आधिकारिक सरकारी दस्तावेजों के आधार पर केवल सूचनात्मक मार्गदर्शन प्रदान करता है। उपयोगकर्ताओं को सलाह दी जाती है कि वे अंतिम पात्रता और आवेदन संबंधी आवश्यकताओं का सत्यापन संबंधित आधिकारिक सरकारी प्राधिकरण अथवा पोर्टल से अवश्य करें।”'
                : '“Yojana Sahayak provides informational guidance based on available government documents. Users should verify final eligibility and application requirements with the relevant official government authority.”'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
