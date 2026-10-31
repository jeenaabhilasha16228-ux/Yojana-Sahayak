import React, { useState, useRef } from 'react';
import { 
  User, 
  Upload, 
  FileText, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Save, 
  BookOpen, 
  ShieldCheck,
  Check,
  Plus,
  HelpCircle
} from 'lucide-react';
import { authService } from '../services/auth';
import { documentService } from '../services/documentProcessor';
import { recommendationEngine } from '../services/recommendationEngine';
import { DocumentCategory, Language, Scheme, SourceCitation, UserDocument, UserProfile } from '../types';

interface DashboardViewProps {
  user: UserProfile;
  language: Language;
  onUpdateUser: (updated: UserProfile) => void;
  onNavigateTab: (tab: string) => void;
  onSelectScheme: (scheme: Scheme) => void;
  onAskAIWithContext: (query: string) => void;
  onOpenPrivacyPolicy: () => void;
  onOpenSourceModal: (citation: SourceCitation) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  language,
  onUpdateUser,
  onNavigateTab,
  onSelectScheme,
  onAskAIWithContext,
  onOpenPrivacyPolicy,
  onOpenSourceModal,
}) => {
  const [profile, setProfile] = useState<UserProfile>(user);
  const [documents, setDocuments] = useState<UserDocument[]>(() => 
    documentService.getUserDocuments(user.id)
  );

  const [savingProfile, setSavingProfile] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedDocCategory, setSelectedDocCategory] = useState<DocumentCategory>('income_certificate');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Recommendations calculated live from profile + uploaded documents
  const recommendations = recommendationEngine.getRecommendations(profile, documents);
  const topRecommendations = recommendations.slice(0, 3);

  // Calculate missing documents across all top recommendations
  const allMissingDocs = Array.from(
    new Set(recommendations.slice(0, 4).flatMap(r => r.missingDocuments))
  );

  const indianStates = [
    'Uttarakhand', 'Uttar Pradesh', 'Bihar', 'Delhi', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 
    'Madhya Pradesh', 'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 
    'Tamil Nadu', 'Telangana', 'West Bengal'
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setSaveSuccess(false);

    try {
      const updated = authService.updateProfile(user.id, profile);
      onUpdateUser(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const newDoc = await documentService.uploadUserDocument(user.id, file, selectedDocCategory);
      const updatedDocs = documentService.getUserDocuments(user.id);
      setDocuments(updatedDocs);

      // If document extraction detected attributes, offer to sync to profile
      if (newDoc.extractedData.detectedState && !profile.state) {
        setProfile(prev => ({ ...prev, state: newDoc.extractedData.detectedState }));
      }
      if (newDoc.extractedData.isStudentDetected) {
        setProfile(prev => ({ ...prev, isStudent: true, occupation: prev.occupation || 'Student' }));
      }
      if (newDoc.extractedData.isFarmerDetected) {
        setProfile(prev => ({ ...prev, isFarmer: true, hasAgriLand: true, occupation: prev.occupation || 'Farmer' }));
      }

      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      setUploadError(err.message || 'We could not process this document. Please try another file.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteDocument = (docId: string) => {
    if (!confirm(language === 'hi' ? 'क्या आप इस दस्तावेज़ को हटाना चाहते हैं?' : 'Are you sure you want to delete this document?')) return;

    documentService.deleteUserDocument(user.id, docId);
    setDocuments(documentService.getUserDocuments(user.id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-slate-100">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-[#06080e] border border-white/[0.1] p-6 sm:p-10 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold">
            <User className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'नागरिक पोर्टल' : 'Citizen Dashboard'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {language === 'hi' ? `स्वागत है, ${profile.name || 'नागरिक'}` : `Welcome, ${profile.name || 'Citizen'}`}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {language === 'hi'
              ? 'आपकी व्यक्तिगत प्रोफ़ाइल और अपलोड किए गए दस्तावेजों के आधार पर सरकारी योजना अनुशंसाएं।'
              : 'Personalized scheme recommendations based on your verified documents and criteria.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('recommendations')}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{language === 'hi' ? 'अनुशंसाएं देखें →' : 'View Recommended Schemes →'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: My Profile + My Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 1. MY PROFILE CARD */}
        <div className="lg:col-span-5 bg-white/[0.03] rounded-3xl border border-white/[0.08] p-6 sm:p-8 shadow-xl backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-bold text-white">
                {language === 'hi' ? 'मेरी प्रोफ़ाइल (My Profile)' : 'My Profile'}
              </h2>
            </div>
            {saveSuccess && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 animate-in fade-in">
                <Check className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'सहेजा गया' : 'Saved'}</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">
                {language === 'hi' ? 'नाम:' : 'Full Name:'}
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white focus:outline-none focus:border-blue-500 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  {language === 'hi' ? 'आयु (वर्ष):' : 'Age (Years):'}
                </label>
                <input
                  type="number"
                  min="0"
                  max="110"
                  value={profile.age || ''}
                  onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) || undefined })}
                  placeholder="e.g. 21"
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white focus:outline-none focus:border-blue-500 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  {language === 'hi' ? 'लिंग:' : 'Gender:'}
                </label>
                <select
                  value={profile.gender || 'male'}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white focus:outline-none focus:border-blue-500 text-xs"
                >
                  <option value="male" className="bg-[#0b0e14] text-white">{language === 'hi' ? 'पुरुष (Male)' : 'Male'}</option>
                  <option value="female" className="bg-[#0b0e14] text-white">{language === 'hi' ? 'महिला (Female)' : 'Female'}</option>
                  <option value="other" className="bg-[#0b0e14] text-white">{language === 'hi' ? 'अन्य (Other)' : 'Other'}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  {language === 'hi' ? 'राज्य:' : 'State:'}
                </label>
                <select
                  value={profile.state || 'Uttarakhand'}
                  onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white focus:outline-none focus:border-blue-500 text-xs"
                >
                  {indianStates.map(st => (
                    <option key={st} value={st} className="bg-[#0b0e14] text-white">{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  {language === 'hi' ? 'जिला:' : 'District:'}
                </label>
                <input
                  type="text"
                  value={profile.district || ''}
                  onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                  placeholder="e.g. Dehradun"
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white focus:outline-none focus:border-blue-500 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  {language === 'hi' ? 'पेशा:' : 'Occupation:'}
                </label>
                <input
                  type="text"
                  value={profile.occupation || ''}
                  onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                  placeholder="e.g. Student / Farmer"
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white focus:outline-none focus:border-blue-500 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  {language === 'hi' ? 'वार्षिक आय (₹):' : 'Annual Income (₹):'}
                </label>
                <input
                  type="number"
                  value={profile.annualIncome || ''}
                  onChange={(e) => setProfile({ ...profile, annualIncome: Number(e.target.value) || undefined })}
                  placeholder="e.g. 220000"
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white focus:outline-none focus:border-blue-500 text-xs"
                />
              </div>
            </div>

            {/* Status Checkboxes */}
            <div className="pt-2 border-t border-white/[0.08] space-y-2">
              <span className="font-bold text-slate-300 block">
                {language === 'hi' ? 'विशेष श्रेणियां:' : 'Special Status:'}
              </span>

              <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-white/[0.03] rounded-xl">
                <input
                  type="checkbox"
                  checked={Boolean(profile.isStudent)}
                  onChange={(e) => setProfile({ ...profile, isStudent: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-slate-300 font-medium">
                  {language === 'hi' ? 'विद्यार्थी (Enrolled Student)' : 'Currently enrolled student'}
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-white/[0.03] rounded-xl">
                <input
                  type="checkbox"
                  checked={Boolean(profile.isFarmer || profile.hasAgriLand)}
                  onChange={(e) => setProfile({ ...profile, isFarmer: e.target.checked, hasAgriLand: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-slate-300 font-medium">
                  {language === 'hi' ? 'भूमिधारक किसान (Landholding Farmer)' : 'Landholding farmer family'}
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-white/[0.03] rounded-xl">
                <input
                  type="checkbox"
                  checked={Boolean(profile.hasGirlChildUnder10)}
                  onChange={(e) => setProfile({ ...profile, hasGirlChildUnder10: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-slate-300 font-medium">
                  {language === 'hi' ? 'परिवार में 10 वर्ष से कम आयु की बेटी है' : 'Family has girl child under 10 years'}
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-white/[0.03] rounded-xl">
                <input
                  type="checkbox"
                  checked={Boolean(profile.paysIncomeTax)}
                  onChange={(e) => setProfile({ ...profile, paysIncomeTax: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-slate-300 font-medium">
                  {language === 'hi' ? 'आयकरदाता (Income Tax Payer)' : 'Paid Income Tax in last assessment year'}
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={savingProfile}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{savingProfile ? 'Saving...' : (language === 'hi' ? 'प्रोफ़ाइल सहेजें' : 'Save Profile')}</span>
            </button>
          </form>
        </div>

        {/* 2. MY DOCUMENTS & VAULT */}
        <div className="lg:col-span-7 bg-white/[0.03] rounded-3xl border border-white/[0.08] p-6 sm:p-8 shadow-xl backdrop-blur-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-bold text-white">
                  {language === 'hi' ? 'मेरे दस्तावेज़ (My Documents)' : 'My Documents'}
                </h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {documents.length} Uploaded
              </span>
            </div>

            {/* Privacy Notice Banner per specification */}
            <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-500/20 text-blue-200 text-xs flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">
                  {language === 'hi' ? 'दस्तावेज़ गोपनीयता गारंटी' : 'Privacy Protection'}
                </p>
                <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                  Your documents are private and are used only to help personalize scheme recommendations. You can delete uploaded documents from your account at any time.{' '}
                  <button onClick={onOpenPrivacyPolicy} className="text-blue-400 underline font-semibold hover:text-blue-300">
                    Privacy Policy
                  </button>
                </p>
              </div>
            </div>

            {/* Upload Area */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-dashed border-white/[0.15] space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
                <div>
                  <label className="font-bold text-white block">
                    {language === 'hi' ? 'दस्तावेज़ की श्रेणी चुनें:' : 'Select Document Type:'}
                  </label>
                  <select
                    value={selectedDocCategory}
                    onChange={(e) => setSelectedDocCategory(e.target.value as any)}
                    className="mt-1 px-3 py-1.5 bg-[#0b0e14] border border-white/[0.1] rounded-xl text-white text-xs"
                  >
                    <option value="income_certificate">Income Certificate (आय प्रमाण पत्र)</option>
                    <option value="residence_domicile">Residence / Domicile Certificate (निवास प्रमाण पत्र)</option>
                    <option value="education_certificate">Educational Marksheet / Degree (अंकतालिका)</option>
                    <option value="land_records">Land Record / Khatauni (खतौनी / जमाबंदी)</option>
                    <option value="aadhaar">Aadhaar Document (पहचान प्रमाण)</option>
                    <option value="caste_certificate">Caste Certificate (जाति प्रमाण पत्र)</option>
                    <option value="bank_passbook">Bank Passbook (बैंक पासबुक)</option>
                    <option value="other">Other Scheme Supporting Document</option>
                  </select>
                </div>

                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="doc-file-upload"
                  />
                  <label
                    htmlFor="doc-file-upload"
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? 'Processing...' : (language === 'hi' ? 'दस्तावेज़ अपलोड करें' : 'Upload Document')}</span>
                  </label>
                </div>
              </div>

              {uploadError && (
                <p className="text-xs text-rose-400 font-medium">
                  {uploadError}
                </p>
              )}
            </div>

            {/* Uploaded Documents List */}
            <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0 border border-emerald-500/20">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white truncate max-w-[200px] sm:max-w-xs">
                          {doc.fileName}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {doc.extractedData.documentType || 'Available'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">
                        {doc.extractedData.rawSummary}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors shrink-0"
                    title="Delete document"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {documents.length === 0 && (
                <div className="p-8 text-center bg-white/[0.01] rounded-2xl border border-white/[0.06] text-xs text-slate-400 space-y-1">
                  <p className="font-semibold text-slate-300">
                    {language === 'hi' ? 'कोई दस्तावेज़ अपलोड नहीं है।' : 'No documents uploaded yet.'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {language === 'hi' ? 'अनुशंसाओं को अनलॉक करने के लिए प्रमाण पत्र अपलोड करें।' : 'Upload certificates to detect eligible welfare schemes.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. RECOMMENDED SCHEMES PREVIEW SECTION */}
      <div className="rounded-3xl bg-white/[0.03] border border-white/[0.08] p-6 sm:p-10 shadow-xl space-y-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h2 className="text-xl font-bold text-white">
                {language === 'hi' ? 'आपके लिए अनुशंसित योजनाएं' : 'Schemes Recommended For You'}
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              {language === 'hi'
                ? 'आपकी प्रोफ़ाइल और अपलोड किए गए दस्तावेजों के साथ सटीक मिलान।'
                : 'Transparent criteria matching based on your profile and uploaded certificates.'}
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('recommendations')}
            className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            <span>{language === 'hi' ? 'सभी अनुशंसाएं देखें' : 'View Detailed Recommendations'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Top 3 Recommendation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topRecommendations.map((rec) => (
            <div
              key={rec.scheme.id}
              className="rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-blue-500/30 p-5 space-y-4 flex flex-col justify-between transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    {rec.scheme.category.replace('_', ' ')}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                    rec.matchLevel === 'High'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  }`}>
                    {rec.matchLevel} Match
                  </span>
                </div>

                <h3 className="text-base font-bold text-white line-clamp-1">
                  {language === 'hi' ? rec.scheme.hindiName : rec.scheme.name}
                </h3>

                {/* Match Reasons */}
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-300 block text-[11px]">
                    {language === 'hi' ? 'यह आपके लिए क्यों मेल खाती है:' : 'Why it was suggested:'}
                  </span>
                  <ul className="space-y-1 text-slate-400 text-[11px]">
                    {rec.matchReasons.slice(0, 2).map((r, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Missing Docs notice */}
                {rec.missingDocuments.length > 0 && (
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-[11px] space-y-0.5">
                    <span className="font-bold block">Document still needed:</span>
                    <span className="text-slate-300 truncate block">
                      ⚠ {rec.missingDocuments[0]}
                    </span>
                  </div>
                )}
              </div>

              {/* Source & Ask AI */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <button
                  onClick={() => onOpenSourceModal({
                    id: rec.scheme.chunks[0]?.id || 'src',
                    schemeId: rec.scheme.id,
                    schemeName: rec.scheme.name,
                    documentTitle: rec.officialSourceTitle,
                    section: rec.officialSourceSection,
                    pageNumber: rec.officialSourcePage,
                    excerpt: rec.scheme.chunks[0]?.content || rec.scheme.shortDescription,
                    officialUrl: rec.officialUrl
                  })}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 font-medium"
                >
                  <BookOpen className="w-3 h-3 text-blue-400" />
                  <span>Page {rec.officialSourcePage}</span>
                </button>

                <button
                  onClick={() => onAskAIWithContext(
                    language === 'hi'
                      ? `मेरी प्रोफ़ाइल के अनुसार क्या मैं ${rec.scheme.hindiName} के लिए पात्र हूँ?`
                      : `Am I eligible for ${rec.scheme.name} based on my profile?`
                  )}
                  className="font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <span>{language === 'hi' ? 'एआई से पूछें →' : 'Ask AI →'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
