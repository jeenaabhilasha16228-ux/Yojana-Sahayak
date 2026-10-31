import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  FileCheck, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink, 
  MessageSquare, 
  Search, 
  FileQuestion,
  UserCheck
} from 'lucide-react';
import { Language, Scheme, UserProfile, UserDocument, SourceCitation } from '../types';
import { recommendationEngine } from '../services/recommendationEngine';

interface RecommendationsViewProps {
  language: Language;
  user: UserProfile | null;
  documents: UserDocument[];
  schemes: Scheme[];
  onOpenSourceModal: (citation: SourceCitation) => void;
  onAskAIWithContext: (query: string) => void;
  onNavigateToDashboard: () => void;
  onOpenAuthModal: () => void;
  onSetDemoUser?: (user: UserProfile) => void;
}

export const RecommendationsView: React.FC<RecommendationsViewProps> = ({
  language,
  user,
  documents,
  schemes,
  onOpenSourceModal,
  onAskAIWithContext,
  onNavigateToDashboard,
  onOpenAuthModal,
}) => {
  const [selectedMatchLevel, setSelectedMatchLevel] = useState<'all' | 'High' | 'Moderate' | 'More Info Needed'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePersona, setActivePersona] = useState<'rahul' | 'sunita' | null>(null);

  // Compute effective profile and documents (real authenticated user or interactive demo exploration)
  const effectiveProfile = useMemo(() => {
    if (user) return user;
    if (activePersona === 'sunita') {
      return {
        id: 'demo-farmer-user',
        email: 'sunita.devi@demo.kisan.gov.in',
        name: 'Sunita Devi',
        age: 44,
        gender: 'female',
        state: 'Uttar Pradesh',
        district: 'Varanasi',
        occupation: 'Farmer',
        annualIncome: 95000,
        isFarmer: true,
        hasAgriLand: true,
        isStudent: false,
        paysIncomeTax: false,
        isGovtEmployee: false,
        socialCategory: 'OBC',
        hasGirlChildUnder10: true,
      } as UserProfile;
    }
    if (activePersona === 'rahul') {
      return {
        id: 'demo-student-user',
        email: 'rahul.sharma@demo.student.gov.in',
        name: 'Rahul Sharma',
        age: 19,
        gender: 'male',
        state: 'Uttarakhand',
        district: 'Dehradun',
        occupation: 'Student',
        annualIncome: 180000,
        isFarmer: false,
        hasAgriLand: false,
        isStudent: true,
        paysIncomeTax: false,
        isGovtEmployee: false,
        socialCategory: 'General',
        hasGirlChildUnder10: false,
      } as UserProfile;
    }
    return null;
  }, [user, activePersona]);

  const effectiveDocs = useMemo(() => {
    if (user) return documents;
    if (activePersona === 'sunita') {
      return [
        {
          id: 'demo-doc-s1',
          userId: 'demo-farmer-user',
          fileName: 'PM_Kisan_Land_Khatauni_Record.pdf',
          fileType: 'application/pdf',
          fileSize: 520000,
          category: 'land_records',
          uploadedAt: new Date().toISOString(),
          verificationStatus: 'verified',
          extractedData: {
            documentType: 'Land Records / Khasra-Khatauni',
            confidence: 'high',
            detectedState: 'Uttar Pradesh',
            isFarmerDetected: true,
          }
        },
        {
          id: 'demo-doc-s2',
          userId: 'demo-farmer-user',
          fileName: 'Aadhaar_Card_eKYC_Masked.pdf',
          fileType: 'application/pdf',
          fileSize: 380000,
          category: 'aadhaar',
          uploadedAt: new Date().toISOString(),
          verificationStatus: 'verified',
          extractedData: {
            documentType: 'Aadhaar Card',
            confidence: 'high',
            detectedState: 'Uttar Pradesh',
          }
        }
      ] as UserDocument[];
    }
    if (activePersona === 'rahul') {
      return [
        {
          id: 'demo-doc-r1',
          userId: 'demo-student-user',
          fileName: 'Uttarakhand_Permanent_Residence_Certificate.pdf',
          fileType: 'application/pdf',
          fileSize: 420000,
          category: 'residence_domicile',
          uploadedAt: new Date().toISOString(),
          verificationStatus: 'verified',
          extractedData: {
            documentType: 'Domicile / Residence Certificate',
            confidence: 'high',
            detectedState: 'Uttarakhand',
          }
        },
        {
          id: 'demo-doc-r2',
          userId: 'demo-student-user',
          fileName: 'Government_School_Enrollment_Marksheet.pdf',
          fileType: 'application/pdf',
          fileSize: 610000,
          category: 'education_certificate',
          uploadedAt: new Date().toISOString(),
          verificationStatus: 'verified',
          extractedData: {
            documentType: 'Educational Certificate / Marksheet',
            confidence: 'high',
            isStudentDetected: true,
          }
        }
      ] as UserDocument[];
    }
    return [];
  }, [user, documents, activePersona]);

  // Compute recommendations
  const allRecommendations = useMemo(() => {
    return recommendationEngine.getRecommendations(effectiveProfile, effectiveDocs, schemes);
  }, [effectiveProfile, effectiveDocs, schemes]);

  // Filter recommendations
  const filteredRecommendations = useMemo(() => {
    return allRecommendations.filter(rec => {
      // Match level
      if (selectedMatchLevel !== 'all' && rec.matchLevel !== selectedMatchLevel) return false;
      // Category
      if (selectedCategory !== 'all' && rec.scheme.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = rec.scheme.name.toLowerCase().includes(q) || rec.scheme.hindiName.toLowerCase().includes(q);
        const matchesMinistry = rec.scheme.ministry.toLowerCase().includes(q);
        const matchesWhy = rec.matchReasons.some(c => c.toLowerCase().includes(q));
        if (!matchesName && !matchesMinistry && !matchesWhy) return false;
      }
      return true;
    });
  }, [allRecommendations, selectedMatchLevel, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title & Hero */}
      <div className="relative rounded-3xl bg-gradient-to-br from-blue-950/40 via-[#0a0f1d] to-[#070b14] border border-blue-500/20 p-6 sm:p-10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'hi' ? 'दस्तावेज-समर्थित व्यक्तिगत सिफारिशें' : 'Personalized & Document-Backed Scheme Match'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              {language === 'hi' ? 'आपके लिए अनुशंसित सरकारी योजनाएं' : 'Government Schemes Recommended For You'}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              {language === 'hi'
                ? 'यह प्रणाली आपकी व्यक्तिगत प्रोफ़ाइल और अपलोड किए गए दस्तावेजों के आधार पर आधिकारिक सरकारी दिशानिर्देशों से मिलान करती है। प्रत्येक सिफारिश के पीछे का स्पष्ट कारण, उपलब्ध व आवश्यक दस्तावेज और सरकारी स्रोत दिखाया गया है।'
                : 'Matches your personal profile and verified documents against official gazetted scheme guidelines. Every match clearly reveals why it fits, which documents you already have or still need, and exact official citations.'}
            </p>
          </div>

          {/* User Status / Demo Persona Toggle */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3">
            {user ? (
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 font-bold text-xs">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{user.name}</p>
                    <p className="text-[11px] text-slate-400">{user.occupation || 'Citizen'} • {user.state || 'India'}</p>
                  </div>
                </div>
                <button
                  onClick={onNavigateToDashboard}
                  className="w-full text-center text-xs text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2 pt-1"
                >
                  {language === 'hi' ? 'डैशबोर्ड में प्रोफ़ाइल व दस्तावेज़ बदलें →' : 'Edit Profile & Documents in Dashboard →'}
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
                <p className="text-xs font-bold text-slate-200">
                  {language === 'hi' ? 'डेमो प्रोफाइल के साथ तुरंत टेस्ट करें:' : 'Explore With 1-Click Demo Citizen Profiles:'}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActivePersona('sunita')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      activePersona === 'sunita'
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-500/20'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    👩‍🌾 Sunita (Farmer, UP)
                  </button>
                  <button
                    onClick={() => setActivePersona('rahul')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      activePersona === 'rahul'
                        ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/20'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    🎓 Rahul (Student, UK)
                  </button>
                </div>
                <div className="pt-1 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {language === 'hi' ? 'या अपना खाता खोलें' : 'Or use your own data'}
                  </span>
                  <button
                    onClick={onOpenAuthModal}
                    className="text-xs text-blue-400 hover:text-blue-300 font-bold underline"
                  >
                    {language === 'hi' ? 'साइन इन / रजिस्टर' : 'Sign In / Register'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Advisory Banner: Transparent Government Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-500/[0.07] border border-amber-500/20 flex items-start gap-3 text-xs text-amber-200/90">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-300">
            {language === 'hi' ? 'महत्वपूर्ण आधिकारिक अस्वीकरण:' : 'Official Government Advisory:'}
          </span>{' '}
          {language === 'hi'
            ? '“योजना सहायक मैच” एक एल्गोरिथमिक विश्लेषण है जो आपके द्वारा साझा की गई जानकारी की तुलना सार्वजनिक दिशानिर्देशों से करता है। यह आधिकारिक सरकारी स्वीकृति या गारंटीकृत पात्रता नहीं है। अंतिम निर्णय संबंधित मंत्रालय/विभाग के अधिकारियों द्वारा ही लिया जाता है।'
            : '“Yojana Sahayak Match” is an algorithmic suitability index comparing your profile and uploaded documents with public scheme gazettes. It does not constitute official government approval or sanctioned eligibility. Final sanction is strictly subject to verification by designated government nodal authorities.'}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0b0f1a] border border-white/[0.08]">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'hi' ? 'योजना का नाम, मंत्रालय या मानदंड खोजें...' : 'Filter recommendations by scheme name, ministry, or criteria...'}
            className="w-full pl-10 pr-4 py-2 bg-white/[0.04] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Match level filters */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0">
          <button
            onClick={() => setSelectedMatchLevel('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedMatchLevel === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white/[0.04] text-slate-400 hover:text-white'
            }`}
          >
            {language === 'hi' ? 'सभी मैच' : 'All Matches'} ({allRecommendations.length})
          </button>
          <button
            onClick={() => setSelectedMatchLevel('High')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedMatchLevel === 'High'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            {language === 'hi' ? 'उच्च संभावना (Likely)' : 'Likely Eligible'}
          </button>
          <button
            onClick={() => setSelectedMatchLevel('Moderate')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedMatchLevel === 'Moderate'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            {language === 'hi' ? 'शर्तों के अधीन (Possible)' : 'Possibly Eligible'}
          </button>
          <button
            onClick={() => setSelectedMatchLevel('More Info Needed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedMatchLevel === 'More Info Needed'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'bg-white/[0.04] text-slate-400 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            {language === 'hi' ? 'अधिक जानकारी अपेक्षित' : 'More Info Needed'}
          </button>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      {filteredRecommendations.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-white/[0.02] border border-white/[0.06]">
          <FileQuestion className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">
            {language === 'hi' ? 'कोई योजना इस फ़िल्टर से मेल नहीं खाती' : 'No Schemes Match Selected Filters'}
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
            {language === 'hi'
              ? 'कृपया फ़िल्टर रीसेट करें या अपने डैशबोर्ड में अपनी प्रोफ़ाइल में और विवरण जोड़ें।'
              : 'Try resetting your search query or match level filter, or add more details in your dashboard profile.'}
          </p>
          <button
            onClick={() => {
              setSelectedMatchLevel('all');
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
          >
            {language === 'hi' ? 'सभी फ़िल्टर साफ़ करें' : 'Clear All Filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRecommendations.map((rec) => {
            const { scheme, matchScore, matchLevel, matchReasons, pendingRequirements, availableDocuments, missingDocuments, officialSourceTitle, officialSourceSection, officialSourcePage, officialUrl } = rec;

            // Badge styling
            const badgeConfig = {
              'High': {
                bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
                dot: 'bg-emerald-400',
                labelEn: 'Likely Eligible',
                labelHi: 'संभावित पात्र',
              },
              'Moderate': {
                bg: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
                dot: 'bg-amber-400',
                labelEn: 'Possibly Eligible',
                labelHi: 'शर्तों के अधीन पात्र',
              },
              'More Info Needed': {
                bg: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
                dot: 'bg-blue-400',
                labelEn: 'More Information Needed',
                labelHi: 'अधिक जानकारी आवश्यक',
              },
            }[matchLevel];

            return (
              <div 
                key={scheme.id}
                className="flex flex-col justify-between rounded-3xl bg-[#090d17] border border-white/[0.08] hover:border-blue-500/40 p-6 sm:p-7 transition-all duration-300 shadow-xl group hover:shadow-blue-500/10"
              >
                <div className="space-y-5">
                  {/* Card Top: Category, Score & Match Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-slate-300 text-[10px] font-bold uppercase tracking-wider">
                          {scheme.category}
                        </span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-[11px] text-slate-400 font-medium line-clamp-1">
                          {scheme.ministry}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                        {language === 'hi' ? scheme.hindiName : scheme.name}
                      </h3>
                      {language === 'hi' && (
                        <p className="text-xs text-slate-400 font-medium">{scheme.name}</p>
                      )}
                    </div>

                    {/* Match Score Badge */}
                    <div className="flex flex-col items-end shrink-0">
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${badgeConfig.bg}`}>
                        <span className={`w-2 h-2 rounded-full ${badgeConfig.dot} animate-pulse`} />
                        <span>{language === 'hi' ? badgeConfig.labelHi : badgeConfig.labelEn}</span>
                      </div>
                      <span className="text-[11px] font-extrabold text-slate-400 mt-1">
                        {matchScore}% {language === 'hi' ? 'मैच' : 'Match'}
                      </span>
                    </div>
                  </div>

                  {/* Benefit Highlight */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                        {language === 'hi' ? 'मुख्य वित्तीय या सामाजिक लाभ' : 'Key Government Benefit'}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-emerald-300 mt-0.5">
                        {language === 'hi' ? scheme.benefitHighlightHindi : scheme.benefitHighlight}
                      </p>
                    </div>
                  </div>

                  {/* 1. WHY THIS SCHEME MATCHES YOU */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{language === 'hi' ? 'यह योजना आपसे क्यों मेल खाती है?' : 'Why This Scheme Matches You'}</span>
                    </div>
                    <ul className="space-y-1.5 pl-1">
                      {matchReasons.length > 0 ? (
                        matchReasons.map((crit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                            <span className="text-emerald-400 font-black mt-0.5">✓</span>
                            <span>{crit}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-xs text-slate-400 italic">
                          {language === 'hi' ? 'सामान्य नागरिक पात्रता लागू' : 'Standard public citizen eligibility applies'}
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* 2. DOCUMENTS STATUS: AVAILABLE VS MISSING */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {/* Available */}
                    <div className="p-3 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-300">
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>{language === 'hi' ? 'सत्यापित/उपलब्ध दस्तावेज' : 'Detected In Your Vault'}</span>
                      </div>
                      {availableDocuments.length > 0 ? (
                        <ul className="space-y-1">
                          {availableDocuments.map((doc, idx) => (
                            <li key={idx} className="text-[11px] text-emerald-200/90 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[11px] text-slate-500 italic">
                          {language === 'hi' ? 'कोई दस्तावेज अभी अपलोड नहीं' : 'No document uploaded yet'}
                        </p>
                      )}
                    </div>

                    {/* Missing / Required */}
                    <div className="p-3 rounded-xl bg-amber-500/[0.04] border border-amber-500/20 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-300">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{language === 'hi' ? 'आवश्यक / शेष दस्तावेज' : 'Pending Documents Needed'}</span>
                      </div>
                      {missingDocuments.length > 0 ? (
                        <ul className="space-y-1">
                          {missingDocuments.map((doc, idx) => (
                            <li key={idx} className="text-[11px] text-amber-200/90 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-[11px] text-emerald-400 font-medium">
                          {language === 'hi' ? 'सभी आवश्यक दस्तावेज उपलब्ध हैं!' : 'All core documents detected!'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 3. OFFICIAL SOURCE CITATION */}
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div className="truncate">
                        <p className="text-[11px] font-bold text-slate-300 truncate">
                          {officialSourceTitle}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {officialSourceSection} • Page {officialSourcePage}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenSourceModal({
                        id: `cite-${scheme.id}`,
                        schemeId: scheme.id,
                        schemeName: scheme.name,
                        documentTitle: officialSourceTitle,
                        section: officialSourceSection,
                        pageNumber: officialSourcePage,
                        excerpt: scheme.eligibility.summary,
                        officialUrl: officialUrl,
                      })}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-blue-400 text-[11px] font-semibold whitespace-nowrap border border-white/10 transition-all flex items-center gap-1"
                    >
                      <span>{language === 'hi' ? 'स्रोत देखें' : 'View Source'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-5 mt-5 border-t border-white/[0.08] flex items-center justify-between gap-3">
                  <a
                    href={officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-white font-medium flex items-center gap-1 transition-colors"
                  >
                    <span>{language === 'hi' ? 'सरकारी पोर्टल' : 'Official Portal'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => {
                      const q = language === 'hi'
                        ? `क्या मैं ${scheme.hindiName} के लिए पात्र हूँ? मेरे पास कौन से दस्तावेज होने चाहिए?`
                        : `Am I eligible for ${scheme.name}? What documents do I need to apply?`;
                      onAskAIWithContext(q);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30 hover:scale-[1.02]"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'एआई सहायक से पूछें →' : 'Ask AI About This →'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
