import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ArrowRight, 
  BookOpen, 
  ExternalLink, 
  FileText, 
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold border border-blue-400/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'hi' ? 'आधिकारिक पात्रता मूल्यांकन' : 'Official Criteria Matcher'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {language === 'hi' ? 'स्मार्ट पात्रता जांचकर्ता' : 'Intelligent Eligibility Checker'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {language === 'hi'
              ? 'अपनी व्यक्तिगत व पारिवारिक जानकारी भरें। हमारा सिस्टम आधिकारिक सरकारी दिशानिर्देशों के आधार पर जांच करेगा कि आप किन योजनाओं के लिए पात्र हैं।'
              : 'Enter your profile details. Our system verifies your inputs against official guideline thresholds, citation pages, and exclusion rules.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">
              {language === 'hi' ? 'आपकी जानकारी' : 'Citizen Profile Details'}
            </h2>
            <button
              onClick={resetForm}
              className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'रीसेट' : 'Reset'}</span>
            </button>
          </div>

          <form onSubmit={handleEvaluate} className="space-y-4 text-xs">
            {/* Target Scheme Selector */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                {language === 'hi' ? 'जांचने के लिए योजना चुनें:' : 'Select Scheme to Evaluate:'}
              </label>
              <select
                value={profile.selectedSchemeId}
                onChange={(e) => setProfile({ ...profile, selectedSchemeId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-blue-600"
              >
                <option value="all">
                  {language === 'hi' ? 'सभी योजनाओं की जांच करें (All Schemes)' : 'Check All Schemes'}
                </option>
                {schemes.map(s => (
                  <option key={s.id} value={s.id}>
                    {language === 'hi' ? s.hindiName : s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'hi' ? 'आयु (वर्ष):' : 'Age (Years):'}
                </label>
                <input
                  type="number"
                  min="0"
                  max="110"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'hi' ? 'लिंग:' : 'Gender:'}
                </label>
                <select
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-blue-600"
                >
                  <option value="male">{language === 'hi' ? 'पुरुष (Male)' : 'Male'}</option>
                  <option value="female">{language === 'hi' ? 'महिला (Female)' : 'Female'}</option>
                  <option value="other">{language === 'hi' ? 'अन्य (Other)' : 'Other'}</option>
                </select>
              </div>
            </div>

            {/* State & Category */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'hi' ? 'राज्य:' : 'State:'}
                </label>
                <select
                  value={profile.state}
                  onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-blue-600"
                >
                  {indianStates.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'hi' ? 'सामाजिक श्रेणी:' : 'Social Category:'}
                </label>
                <select
                  value={profile.socialCategory}
                  onChange={(e) => setProfile({ ...profile, socialCategory: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:border-blue-600"
                >
                  <option value="General">General / सामान्य</option>
                  <option value="OBC">OBC / अन्य पिछड़ा वर्ग</option>
                  <option value="SC">SC / अनुसूचित जाति</option>
                  <option value="ST">ST / अनुसूचित जनजाति</option>
                  <option value="EWS">EWS / आर्थिक कमजोर वर्ग</option>
                </select>
              </div>
            </div>

            {/* Annual Income */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">
                  {language === 'hi' ? 'वार्षिक पारिवारिक आय (₹):' : 'Annual Family Income (₹):'}
                </label>
                <span className="font-bold text-blue-700">
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
                className="w-full accent-blue-700"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>₹30,000</span>
                <span>₹5,00,000</span>
                <span>₹15,00,000+</span>
              </div>
            </div>

            {/* Key Status Toggles */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="font-bold text-slate-700 block">
                {language === 'hi' ? 'विशिष्ट परिस्थितियां:' : 'Specific Conditions:'}
              </span>

              <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-slate-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={profile.hasAgriculturalLand}
                  onChange={(e) => setProfile({ ...profile, hasAgriculturalLand: e.target.checked, isFarmer: e.target.checked })}
                  className="rounded text-blue-700 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-slate-700 font-medium">
                  {language === 'hi' ? 'मेरे पास कृषि योग्य भूमि (खतौनी) है' : 'I own cultivable agricultural land in my family name'}
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-slate-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={profile.hasGirlChildUnder10}
                  onChange={(e) => setProfile({ ...profile, hasGirlChildUnder10: e.target.checked })}
                  className="rounded text-blue-700 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-slate-700 font-medium">
                  {language === 'hi' ? 'परिवार में 10 वर्ष से कम आयु की बेटी है' : 'Have a girl child aged under 10 years'}
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-slate-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={profile.isTraditionalArtisan}
                  onChange={(e) => setProfile({ ...profile, isTraditionalArtisan: e.target.checked })}
                  className="rounded text-blue-700 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-slate-700 font-medium">
                  {language === 'hi' ? 'पारंपरिक कारीगर/दस्तकार (बढ़ई, लोहार, कुम्हार आदि)' : 'Traditional artisan/craftsperson (18 trades)'}
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-slate-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={profile.isStudentClass9To12}
                  onChange={(e) => setProfile({ ...profile, isStudentClass9To12: e.target.checked })}
                  className="rounded text-blue-700 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-slate-700 font-medium">
                  {language === 'hi' ? 'कक्षा 9 से 12 का छात्र (सरकारी स्कूल)' : 'Student enrolled in Class 9-12 (Govt/Aided)'}
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-slate-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={profile.paysIncomeTax}
                  onChange={(e) => setProfile({ ...profile, paysIncomeTax: e.target.checked })}
                  className="rounded text-blue-700 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-slate-700 font-medium">
                  {language === 'hi' ? 'पिछले वर्ष आयकर (Income Tax) का भुगतान किया' : 'Paid Income Tax in the last assessment year'}
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-slate-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={profile.isGovtEmployee}
                  onChange={(e) => setProfile({ ...profile, isGovtEmployee: e.target.checked })}
                  className="rounded text-blue-700 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-slate-700 font-medium">
                  {language === 'hi' ? 'परिवार में कोई सरकारी कर्मचारी या पेंशनभोगी है' : 'Serving/retired Govt employee or pensioner (₹10k+)'}
                </span>
              </label>
            </div>

            {/* Evaluate CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <span>{language === 'hi' ? 'पात्रता जांची जा रही है...' : 'Evaluating against official gazette...'}</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{language === 'hi' ? 'पात्रता की जांच करें' : 'Check Eligibility Verdict'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 space-y-4">
          {!results && !loading && (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-800">
                  {language === 'hi' ? 'अपनी जानकारी दर्ज करें और जांचें' : 'Enter Details to See Eligibility'}
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  {language === 'hi'
                    ? 'बाईं ओर दी गई जानकारी भरें और "पात्रता की जांच करें" पर क्लिक करें। आधिकारिक सरकारी नियमों के आधार पर तुरंत परिणाम मिलेगा।'
                    : 'Fill your profile on the left and click "Check Eligibility Verdict". The engine evaluates your data against official government eligibility clauses.'}
                </p>
              </div>
            </div>
          )}

          {loading && (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-xs">
              <div className="w-8 h-8 border-3 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-xs font-semibold text-slate-600">
                {language === 'hi' ? 'सरकारी गजट व दिशानिर्देशों से तुलना की जा रही है...' : 'Cross-referencing rules with official document chunks...'}
              </p>
            </div>
          )}

          {results && results.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800">
                  {language === 'hi' ? `मूल्यांकन परिणाम (${results.length} योजनाएं)` : `Evaluation Results (${results.length} schemes)`}
                </h3>
                <span className="text-xs text-slate-500">
                  {language === 'hi' ? 'दस्तावेज़ आधारित' : 'Grounded Verdicts'}
                </span>
              </div>

              {results.map((res, i) => {
                const isLikely = res.verdict === 'Likely Eligible';
                const isNot = res.verdict === 'May Not Be Eligible';

                return (
                  <div
                    key={i}
                    className={`rounded-2xl border p-5 shadow-2xs space-y-3 transition-all ${
                      isLikely
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : isNot
                        ? 'bg-rose-50/50 border-rose-200'
                        : 'bg-blue-50/50 border-blue-200'
                    }`}
                  >
                    {/* Header with Verdict Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-base font-bold text-slate-900">
                          {language === 'hi' ? res.schemeNameHindi : res.schemeName}
                        </h4>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <BookOpen className="w-3.5 h-3.5 text-blue-700" />
                          <span>{res.sourceDocument} — {res.sourceSection}, Page {res.sourcePage}</span>
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold shrink-0 shadow-2xs ${
                          isLikely
                            ? 'bg-emerald-600 text-white'
                            : isNot
                            ? 'bg-rose-600 text-white'
                            : 'bg-blue-700 text-white'
                        }`}
                      >
                        {isLikely ? <CheckCircle2 className="w-3.5 h-3.5" /> : isNot ? <AlertCircle className="w-3.5 h-3.5" /> : <HelpCircle className="w-3.5 h-3.5" />}
                        <span>{language === 'hi' ? res.verdictHindi : res.verdict}</span>
                      </span>
                    </div>

                    {/* Matched Criteria */}
                    {res.matchedCriteria.length > 0 && (
                      <div className="text-xs space-y-1">
                        <span className="font-bold text-emerald-900 block">
                          {language === 'hi' ? 'संतुष्ट शर्तें (Matched Criteria):' : 'Satisfied Criteria:'}
                        </span>
                        <ul className="space-y-0.5 text-emerald-950 list-disc list-inside">
                          {res.matchedCriteria.map((m, idx) => (
                            <li key={idx}>{m}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Unmatched / Exclusion Criteria */}
                    {res.unmatchedCriteria.length > 0 && (
                      <div className="text-xs space-y-1">
                        <span className="font-bold text-rose-900 block">
                          {language === 'hi' ? 'अपात्रता कारण (Unmatched / Exclusion):' : 'Unmatched / Disqualifying Clauses:'}
                        </span>
                        <ul className="space-y-0.5 text-rose-950 list-disc list-inside">
                          {res.unmatchedCriteria.map((u, idx) => (
                            <li key={idx}>{u}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Pending Information */}
                    {res.pendingQuestions.length > 0 && (
                      <div className="text-xs space-y-1">
                        <span className="font-bold text-blue-900 block">
                          {language === 'hi' ? 'अतिरिक्त सत्यापन आवश्यक (More Info Required):' : 'Additional Verification Needed:'}
                        </span>
                        <ul className="space-y-0.5 text-blue-950 list-disc list-inside">
                          {res.pendingQuestions.map((q, idx) => (
                            <li key={idx}>{q}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      <button
                        onClick={() => onAskAI(
                          language === 'hi'
                            ? `क्या मैं ${res.schemeNameHindi} के लिए पात्र हूँ? मेरी आयु ${profile.age} है और आय ₹${profile.annualIncome} है।`
                            : `Am I eligible for ${res.schemeName}? My age is ${profile.age} and income is ₹${profile.annualIncome}.`
                        )}
                        className="font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
                      >
                        <span>{language === 'hi' ? 'इस पर एआई से पूछें' : 'Ask AI follow-up'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {res.officialUrl && (
                        <a
                          href={res.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
                        >
                          <span>{language === 'hi' ? 'आधिकारिक पोर्टल' : 'Official Portal'}</span>
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
