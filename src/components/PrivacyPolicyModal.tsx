import React from 'react';
import { ShieldCheck, Lock, Trash2, EyeOff, FileCheck, X, AlertCircle } from 'lucide-react';
import { Language } from '../types';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#0c101a] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {language === 'hi' ? 'दस्तावेज गोपनीयता और डेटा सुरक्षा नीति' : 'Document Privacy & Data Protection Policy'}
            </h2>
            <p className="text-xs text-slate-400">
              {language === 'hi' ? 'योजना सहायक नागरिक डेटा संप्रभुता और गोपनीयता प्रतिबद्धता' : 'Yojana Sahayak Citizen Data Sovereignty & Privacy Commitment'}
            </p>
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-6 text-sm text-slate-300">
          {/* Section 1 */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center gap-2 text-white font-semibold mb-2">
              <EyeOff className="w-4 h-4 text-blue-400" />
              <span>{language === 'hi' ? '1. हम कौन सी जानकारी एकत्र करते हैं?' : '1. What Information Is Collected?'}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'hi'
                ? 'हम केवल आपके द्वारा स्वेच्छा से प्रदान की गई प्रोफ़ाइल जानकारी (उम्र, राज्य, व्यवसाय, अनुमानित आय वर्ग) और आपके द्वारा योजना पात्रता मिलान के लिए अपलोड किए गए दस्तावेजों (जैसे आय प्रमाण पत्र, आधार, भूमि अभिलेख) को संसाधित करते हैं। हम कभी भी बैंक पिन, पासवर्ड या बायोमेट्रिक डेटा नहीं मांगते हैं।'
                : 'We collect only the profile information you voluntarily submit (age, state, occupation, income category) and documents uploaded specifically for scheme eligibility matching (such as Income Certificates, Aadhaar confirmation, Land records). We never ask for or store bank PINs, passwords, or biometric credentials.'}
            </p>
          </div>

          {/* Section 2 */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center gap-2 text-white font-semibold mb-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>{language === 'hi' ? '2. दस्तावेजों का उपयोग कैसे किया जाता है?' : '2. How Are Your Documents Handled & Stored?'}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'hi'
                ? 'अपलोड किए गए दस्तावेज़ आपके व्यक्तिगत खाते से सख्ती से जुड़े होते हैं। कोई अन्य नागरिक या सार्वजनिक आगंतुक आपके दस्तावेज़ नहीं देख सकता। संवेदनशील पहचान संख्या (जैसे 12-अंक आधार) को क्लाइंट-साइड मास्किंग द्वारा संरक्षित किया जाता है। दस्तावेजों का उपयोग केवल यह निर्धारित करने के लिए किया जाता है कि कौन से सरकारी दिशानिर्देश आपके मानदंडों से मेल खाते हैं।'
                : 'Uploaded documents are strictly linked to your authenticated user account. No other user, visitor, or third party has access to your files. Sensitive identifiers (such as 12-digit Aadhaar numbers) are masked immediately. Document contents are parsed exclusively to match relevant scheme eligibility guidelines from official gazettes.'}
            </p>
          </div>

          {/* Section 3 */}
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center gap-2 text-white font-semibold mb-2">
              <Trash2 className="w-4 h-4 text-rose-400" />
              <span>{language === 'hi' ? '3. स्थायी रूप से डेटा हटाने का अधिकार' : '3. Permanent Deletion & Right to be Forgotten'}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'hi'
                ? 'आपको किसी भी समय अपने किसी भी या सभी अपलोड किए गए दस्तावेजों को स्थायी रूप से हटाने का पूर्ण अधिकार है। जब आप "दस्तावेज़ हटाएं" पर क्लिक करते हैं, तो फ़ाइल और उससे निकाले गए सभी मेटाडेटा तुरंत और अपरिवर्तनीय रूप से साफ़ कर दिए जाते हैं।'
                : 'You retain full ownership and sovereignty over your data. You can delete any uploaded document or clear your profile at any time with a single click. When deleted, files and associated extracted metadata are immediately and irreversibly purged from the system.'}
            </p>
          </div>

          {/* Section 4 */}
          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <div className="flex items-center gap-2 text-amber-300 font-semibold mb-2">
              <AlertCircle className="w-4 h-4" />
              <span>{language === 'hi' ? '4. आधिकारिक अनुमोदन अस्वीकरण' : '4. Official Government Advisory'}</span>
            </div>
            <p className="text-xs text-amber-200/80 leading-relaxed">
              {language === 'hi'
                ? 'योजना सहायक एक सूचनात्मक और सलाहकार साधन है। "योजना सहायक मैच" स्कोर आधिकारिक सरकारी स्वीकृति नहीं है। योजनाओं का अंतिम लाभ संबंधित केंद्रीय या राज्य सरकार के नोडल विभाग और संबंधित अधिकारियों के सत्यापन के बाद ही मिलता है।'
                : 'Yojana Sahayak is an informational civic tool. A high match score or eligibility projection does not constitute an official government sanction. Final benefit disbursement is strictly subject to formal verification by respective Central or State Government ministries and designated nodal offices.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md"
          >
            {language === 'hi' ? 'मैंने समझ लिया है' : 'I Understand'}
          </button>
        </div>
      </div>
    </div>
  );
};
