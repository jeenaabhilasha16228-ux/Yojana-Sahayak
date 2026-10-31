import React from 'react';
import { ShieldCheck, ExternalLink, Lock } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onNavigateTab: (tab: string) => void;
  onOpenPrivacyPolicy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigateTab, onOpenPrivacyPolicy }) => {
  return (
    <footer className="bg-[#04060a] text-slate-400 border-t border-white/[0.08] text-xs">
      {/* Decorative tricolor top accent */}
      <div className="h-0.5 w-full bg-gradient-to-r from-amber-500 via-white to-emerald-500 opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                य
              </div>
              <span className="text-base font-extrabold text-white">
                Yojana<span className="text-blue-400">Sahayak</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'hi'
                ? '“सरकारी योजनाएं, सबके लिए आसान।” — भारतीय नागरिकों के लिए आधिकारिक दस्तावेज़-आधारित द्विभाषी एआई सहायक।'
                : '“Government Schemes, Simplified for Everyone.” — Grounded, anti-hallucination public welfare assistant.'}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 block">
              {language === 'hi' ? 'नेविगेशन' : 'Navigation'}
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigateTab('home')} className="hover:text-white transition-colors">
                  {language === 'hi' ? 'होम (Home)' : 'Home'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('recommendations')} className="hover:text-white transition-colors">
                  {language === 'hi' ? 'अनुशंसित योजनाएं (Recommended)' : 'Recommended Schemes'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('chat')} className="hover:text-white transition-colors">
                  {language === 'hi' ? 'एआई सहायक (AI Assistant)' : 'AI Assistant'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('schemes')} className="hover:text-white transition-colors">
                  {language === 'hi' ? 'योजना निर्देशिका (Schemes)' : 'Schemes Directory'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('eligibility')} className="hover:text-white transition-colors">
                  {language === 'hi' ? 'पात्रता जांचकर्ता (Eligibility)' : 'Eligibility Checker'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('documents')} className="hover:text-white transition-colors">
                  {language === 'hi' ? 'दस्तावेज चेकलिस्ट (Checklist)' : 'Document Checklist'}
                </button>
              </li>
            </ul>
          </div>

          {/* National Portals */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 block">
              {language === 'hi' ? 'आधिकारिक सरकारी पोर्टल' : 'Official National Portals (.gov.in)'}
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="https://pmkisan.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span>PM-KISAN Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://beneficiary.nha.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span>Ayushman PM-JAY Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://pmay-urban.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span>PMAY Housing Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://pmsuryaghar.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span>PM Surya Ghar Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span>National Scholarship Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Trust and Policy */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{language === 'hi' ? 'शून्य-भ्रम गारंटी' : 'Grounding Policy'}</span>
            </span>
            <p className="text-[11px] leading-relaxed text-slate-400">
              {language === 'hi'
                ? '“योजना सहायक उपलब्ध आधिकारिक सरकारी दस्तावेजों के आधार पर केवल सूचनात्मक मार्गदर्शन प्रदान करता है। अंतिम पात्रता और आवेदन संबंधी आवश्यकताओं का सत्यापन संबंधित आधिकारिक प्राधिकरण से अवश्य करें।”'
                : '“Yojana Sahayak provides informational guidance based on available government documents. Users should verify final eligibility and application requirements with the relevant official government authority.”'}
            </p>
            {onOpenPrivacyPolicy && (
              <button
                onClick={onOpenPrivacyPolicy}
                className="mt-2 inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2"
              >
                <Lock className="w-3 h-3" />
                <span>{language === 'hi' ? 'गोपनीयता और डेटा सुरक्षा नीति' : 'Privacy & Data Protection Policy'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 Yojana Sahayak. Bilingual RAG Architecture for Indian Public Welfare.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigateTab('about')} className="hover:text-slate-300">
              {language === 'hi' ? 'वास्तुकला' : 'Architecture'}
            </button>
            {onOpenPrivacyPolicy && (
              <>
                <span className="text-slate-700">•</span>
                <button onClick={onOpenPrivacyPolicy} className="hover:text-slate-300">
                  {language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
                </button>
              </>
            )}
            <span className="text-slate-700">•</span>
            <span>Vercel Deployable</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
