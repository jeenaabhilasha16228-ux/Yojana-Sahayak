import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ArrowRight, 
  BookOpen, 
  ExternalLink, 
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import { EligibilityResult, Language, Scheme, SourceCitation, UserEligibilityProfile } from '../types';

interface EligibilityCheckerViewProps {
  language: Language;
  schemes: Scheme[];
  onOpenSourceModal: (citation: SourceCitation) => void;
  onAskAI: (query: string) => void;
}

export const EligibilityCheckerView: React.FC<EligibilityCheckerViewProps> = ({
  language,
  schemes,
  onOpenSourceModal,
  onAskAI,
}) => {
  const [profile, setProfile] = useState<UserEligibilityProfile>({
    age: 28,
    gender: 'male',
    state: 'Uttar Pradesh',
    occupation: 'Farmer',
    socialCategory: 'OBC',
    annualIncome: 180000,
    isFarmer: true,
    hasAgriculturalLand: true,
    hasGirlChildUnder10: false,
    isTraditionalArtisan: false,
    isStudentClass9To12: false,
    paysIncomeTax: false,
    isGovtEmployee: false,
    selectedSchemeId: 'all'
  });

  const [results, setResults] = useState<EligibilityResult[] | null>(null);
  const [loading, setLoading] = useState(false);

  const indianStates = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
    'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 
    'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Relative URL /api/check-eligibility
      const response = await fetch('/api/check-eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });

      if (!response.ok) {
        throw new Error('Failed to evaluate eligibility');
      }

      const data: EligibilityResult[] = await response.json();
      setResults(data);
    } catch (err) {
      console.error('Eligibility check error:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setProfile({
      age: 25,
      gender: 'male',
      state: 'Uttar Pradesh',
      occupation: 'General Citizen',
      socialCategory: 'General',
      annualIncome: 200000,
      isFarmer: false,
      hasAgriculturalLand: false,
      hasGirlChildUnder10: false,
      isTraditionalArtisan: false,
      isStudentClass9To12: false,
      paysIncomeTax: false,
      isGovtEmployee: false,
      selectedSchemeId: 'all'
    });
    setResults(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-slate-100">
      {/* Header */}
      <div className="border-b border-white/[0.08] pb-6 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
          {language === 'hi' ? 'आधिकारिक पात्रता मूल्यांकन' : 'Eligibility Evaluation'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          {language === 'hi' ? 'स्मार्ट पात्रता जांचकर्ता' : 'Eligibility Checker'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
          {language === 'hi'
            ? 'अपनी जानकारी दर्ज करें। सिस्टम आधिकारिक सरकारी नियमों और अपवर्जन मानदंडों के आधार पर आपकी संभावित पात्रता का विश्लेषण करेगा।'
            : 'Enter your profile details. The engine verifies your inputs against official guideline thresholds, citation pages, and exclusion rules.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-5 bg-white/[0.03] rounded-3xl border border-white/[0.08] p-6 shadow-2xl backdrop-blur-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <h2 className="text-base font-bold text-white">
              {language === 'hi' ? 'आपकी जानकारी' : 'Profile Details'}
            </h2>
            <button
              onClick={resetForm}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'रीसेट' : 'Reset'}</span>
            </button>
          </div>

          <form onSubmit={handleEvaluate} className="space-y-4 text-xs">
            {/* Target Scheme Selector */}
            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                {language === 'hi' ? 'योजना चुनें:' : 'Select Scheme to Evaluate:'}
              </label>
              <select
                value={profile.selectedSchemeId}
                onChange={(e) => setProfile({ ...profile, selectedSchemeId: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white font-medium focus:outline-none focus:border-blue-500"
              >
                <option value="all" className="bg-[#0b0e14] text-white">
                  {language === 'hi' ? 'सभी योजनाओं की जांच करें (All Schemes)' : 'Check All Schemes'}
                </option>
                {schemes.map(s => (
                  <option key={s.id} value={s.id} className="bg-[#0b0e14] text-white">
                    {language === 'hi' ? s.hindiName : s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  {language === 'hi' ? 'आयु (वर्ष):' : 'Age (Years):'}
                </label>
                <input
                  type="number"
                  min="0"
                  max="110"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white font-medium focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  {language === 'hi' ? 'लिंग:' : 'Gender:'}
                </label>
                <select
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white font-medium focus:outline-none focus:border-blue-500"
                >
                  <option value="male" className="bg-[#0b0e14] text-white">{language === 'hi' ? 'पुरुष (Male)' : 'Male'}</option>
                  <option value="female" className="bg-[#0b0e14] text-white">{language === 'hi' ? 'महिला (Female)' : 'Female'}</option>
                  <option value="other" className="bg-[#0b0e14] text-white">{language === 'hi' ? 'अन्य (Other)' : 'Other'}</option>
                </select>
              </div>
            </div>

            {/* State & Category */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  {language === 'hi' ? 'राज्य:' : 'State:'}
                </label>
                <select
                  value={profile.state}
                  onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white font-medium focus:outline-none focus:border-blue-500"
                >
                  {indianStates.map(st => (
                    <option key={st} value={st} className="bg-[#0b0e14] text-white">{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  {language === 'hi' ? 'सामाजिक श्रेणी:' : 'Social Category:'}
                </label>
                <select
                  value={profile.socialCategory}
                  onChange={(e) => setProfile({ ...profile, socialCategory: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white font-medium focus:outline-none focus:border-blue-500"
                >
                  <option value="General" className="bg-[#0b0e14] text-white">General / सामान्य</option>
                  <option value="OBC" className="bg-[#0b0e14] text-white">OBC / अन्य पिछड़ा वर्ग</option>
                  <option value="SC" className="bg-[#0b0e14] text-white">SC / अनुसूचित जाति</option>
                  <option value="ST" className="bg-[#0b0e14] text-white">ST / अनुसूचित जनजाति</option>
                  <option value="EWS" className="bg-[#0b0e14] text-white">EWS / आर्थिक कमजोर वर्ग</option>
                </select>
              </div>
            </div>

            {/* Annual Income */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-300">
                  {language === 'hi' ? 'वार्षिक पारिवारिक आय (₹):' : 'Annual Family Income (₹):'}
                </label>
                <span className="font-bold text-blue-400">
                  ₹{profile.annualIncome.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="30000"
                max="1500000"
                step="20000"
                value={profile.annualIncome}
                onChange={(e) => setProfile({ ...profile, annualIncome: Number(e.target.value) })}
                className="w-full accent-blue-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                <span>₹30k</span>
                <span>₹5 Lakh</span>
                <span>₹15 Lakh+</span>
              </div>
            </div>

            {/* Status Toggles */}
            <div className="space-y-2 pt-2 border-t border-white/[0.08]">
              <span className="font-bold text-slate-300 block">
                {language === 'hi' ? 'विशिष्ट परिस्थितियां:' : 'Specific Conditions:'}
              </span>

              <label className="flex items-center gap-2.5 cursor-pointer p-1.5 hover:bg-white/[0.03] rounded-xl transition-colors">
                <input
                  type="checkbox"
                  checked={profile.hasAgriculturalLand}
                  onChange={(e) => setProfile({ ...profile, hasAgriculturalLand: e.target.checked, isFarmer: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-slate-300 font-medium">
                  {language === 'hi' ? 'मेरे पास कृषि योग्य भूमि (खतौनी) है' : 'I own cultivable land in my family name'}
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer p-1.5 hover:bg-white/[0.03] rounded-xl transition-colors">
                <input
                  type="checkbox"
                  checked={profile.hasGirlChildUnder10}
                  onChange={(e) => setProfile({ ...profile, hasGirlChildUnder10: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-slate-300 font-medium">
                  {language === 'hi' ? 'परिवार में 10 वर्ष से कम आयु की बेटी है' : 'Have a girl child aged under 10 years'}
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer p-1.5 hover:bg-white/[0.03] rounded-xl transition-colors">
                <input
                  type="checkbox"
                  checked={profile.isTraditionalArtisan}
                  onChange={(e) => setProfile({ ...profile, isTraditionalArtisan: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-slate-300 font-medium">
                  {language === 'hi' ? 'पारंपरिक कारीगर/दस्तकार (18 ट्रेड)' : 'Traditional artisan/craftsperson (18 trades)'}
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer p-1.5 hover:bg-white/[0.03] rounded-xl transition-colors">
                <input
                  type="checkbox"
                  checked={profile.isStudentClass9To12}
                  onChange={(e) => setProfile({ ...profile, isStudentClass9To12: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-slate-300 font-medium">
                  {language === 'hi' ? 'कक्षा 9 से 12 का छात्र (सरकारी स्कूल)' : 'Student enrolled in Class 9-12 (Govt/Aided)'}
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer p-1.5 hover:bg-white/[0.03] rounded-xl transition-colors">
                <input
                  type="checkbox"
                  checked={profile.paysIncomeTax}
                  onChange={(e) => setProfile({ ...profile, paysIncomeTax: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-slate-300 font-medium">
                  {language === 'hi' ? 'पिछले वर्ष आयकर (Income Tax) दिया' : 'Paid Income Tax in the last assessment year'}
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer p-1.5 hover:bg-white/[0.03] rounded-xl transition-colors">
                <input
                  type="checkbox"
                  checked={profile.isGovtEmployee}
                  onChange={(e) => setProfile({ ...profile, isGovtEmployee: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-slate-300 font-medium">
                  {language === 'hi' ? 'सरकारी कर्मचारी अथवा पेंशनभोगी (₹10k+)' : 'Serving/retired Govt employee or pensioner'}
                </span>
              </label>
            </div>

            {/* Evaluate CTA */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <span>{language === 'hi' ? 'पात्रता जांची जा रही है...' : 'Evaluating against official gazette...'}</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{language === 'hi' ? 'पात्रता जांचें' : 'Evaluate Eligibility'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 space-y-4">
          {!results && !loading && (
            <div className="bg-white/[0.03] rounded-3xl border border-white/[0.08] p-12 text-center space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">
                  {language === 'hi' ? 'अपनी जानकारी दर्ज करें और जांचें' : 'Enter Details to See Verdict'}
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  {language === 'hi'
                    ? 'बाईं ओर दी गई जानकारी भरें और "पात्रता जांचें" पर क्लिक करें। आधिकारिक सरकारी नियमों के आधार पर तुरंत परिणाम मिलेगा।'
                    : 'Fill your profile on the left and click "Evaluate Eligibility". The engine evaluates your data against official government clauses.'}
                </p>
              </div>
            </div>
          )}

          {loading && (
            <div className="bg-white/[0.03] rounded-3xl border border-white/[0.08] p-16 text-center space-y-4 shadow-xl">
              <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-xs font-semibold text-slate-300">
                {language === 'hi' ? 'सरकारी गजट व दिशानिर्देशों से तुलना की जा रही है...' : 'Cross-referencing rules with official document chunks...'}
              </p>
            </div>
          )}

          {results && results.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">
                  {language === 'hi' ? `मूल्यांकन परिणाम (${results.length} योजनाएं)` : `Evaluation Results (${results.length} schemes)`}
                </h3>
                <span className="text-xs text-slate-400">
                  {language === 'hi' ? 'दस्तावेज़ आधारित' : 'Grounded Verdicts'}
                </span>
              </div>

              {results.map((res, i) => {
                const isLikely = res.verdict === 'Likely Eligible';
                const isNot = res.verdict === 'May Not Be Eligible';

                return (
                  <div
                    key={i}
                    className={`rounded-3xl border p-5 shadow-xl space-y-3 transition-all ${
                      isLikely
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : isNot
                        ? 'bg-rose-950/20 border-rose-500/30'
                        : 'bg-blue-950/20 border-blue-500/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-base font-bold text-white">
                          {language === 'hi' ? res.schemeNameHindi : res.schemeName}
                        </h4>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                          <span>{res.sourceDocument} — {res.sourceSection}, Page {res.sourcePage}</span>
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black shrink-0 ${
                          isLikely
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : isNot
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}
                      >
                        {isLikely ? <CheckCircle2 className="w-3.5 h-3.5" /> : isNot ? <AlertCircle className="w-3.5 h-3.5" /> : <HelpCircle className="w-3.5 h-3.5" />}
                        <span>{language === 'hi' ? res.verdictHindi : res.verdict}</span>
                      </span>
                    </div>

                    {res.matchedCriteria.length > 0 && (
                      <div className="text-xs space-y-1">
                        <span className="font-bold text-emerald-400 block">
                          {language === 'hi' ? 'संतुष्ट शर्तें (Matched Criteria):' : 'Satisfied Criteria:'}
                        </span>
                        <ul className="space-y-0.5 text-slate-300 list-disc list-inside">
                          {res.matchedCriteria.map((m, idx) => (
                            <li key={idx}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {res.unmatchedCriteria.length > 0 && (
                      <div className="text-xs space-y-1">
                        <span className="font-bold text-rose-400 block">
                          {language === 'hi' ? 'अपात्रता कारण (Unmatched / Exclusion):' : 'Disqualifying Criteria:'}
                        </span>
                        <ul className="space-y-0.5 text-slate-300 list-disc list-inside">
                          {res.unmatchedCriteria.map((u, idx) => (
                            <li key={idx}>{u}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {res.pendingQuestions.length > 0 && (
                      <div className="text-xs space-y-1">
                        <span className="font-bold text-blue-400 block">
                          {language === 'hi' ? 'अतिरिक्त सत्यापन आवश्यक (More Info Required):' : 'Additional Verification Needed:'}
                        </span>
                        <ul className="space-y-0.5 text-slate-300 list-disc list-inside">
                          {res.pendingQuestions.map((q, idx) => (
                            <li key={idx}>{q}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold">
                      <button
                        onClick={() => onAskAI(
                          language === 'hi'
                            ? `क्या मैं ${res.schemeNameHindi} के लिए पात्र हूँ? मेरी आयु ${profile.age} है और आय ₹${profile.annualIncome} है।`
                            : `Am I eligible for ${res.schemeName}? My age is ${profile.age} and income is ₹${profile.annualIncome}.`
                        )}
                        className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                      >
                        <span>{language === 'hi' ? 'इस पर एआई से पूछें →' : 'Ask AI follow-up →'}</span>
                      </button>

                      {res.officialUrl && (
                        <a
                          href={res.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white flex items-center gap-1 font-medium"
                        >
                          <span>{language === 'hi' ? 'सरकारी पोर्टल' : 'Official Portal'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
