import React from 'react';
import { ShieldCheck, Heart, ExternalLink } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigateTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
      {/* Decorative tricolor top border */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-white to-emerald-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-sm">
                य
              </div>
              <span className="text-base font-bold text-white">
                Yojana<span className="text-blue-400">Sahayak</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'hi'
                ? '“सरकारी योजनाएं, सबके लिए आसान।” — भारतीय नागरिकों के लिए आधिकारिक दस्तावेज़-आधारित द्विभाषी एआई सहायक।'
                : '“Government Schemes, Simplified for Everyone.” — Grounded, anti-hallucination public welfare assistant.'}
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 block">
              {language === 'hi' ? 'मुख्य पृष्ठ' : 'Navigation'}
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onNavigateTab('home')} className="hover:text-white transition-colors">
                  {language === 'hi' ? 'होम' : 'Home'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('chat')} className="hover:text-white transition-colors">
                  {language === 'hi' ? 'एआई सहायक चैट' : 'AI Assistant Chat'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('schemes')} className="hover:text-white transition-colors">
                  {language === 'hi' ? 'योजना निर्देशिका' : 'Schemes Directory'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('eligibility')} className="hover:text-white transition-colors">
                  {language === 'hi' ? 'पात्रता जांचकर्ता' : 'Eligibility Checker'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('documents')} className="hover:text-white transition-colors">
                  {language === 'hi' ? 'दस्तावेज चेकलिस्ट' : 'Document Checklist'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Government Portals */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 block">
              {language === 'hi' ? 'आधिकारिक सरकारी पोर्टल' : 'Official National Portals'}
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="https://pmkisan.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>PM-KISAN Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://beneficiary.nha.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>Ayushman PM-JAY Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://pmay-urban.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>PMAY Housing Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://pmsuryaghar.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>PM Surya Ghar Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                  <span>National Scholarship Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Disclaimer */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{language === 'hi' ? 'शून्य-भ्रम गारंटी' : 'Grounding Policy'}</span>
            </span>
            <p className="text-[11px] leading-relaxed text-slate-400">
              {language === 'hi'
                ? 'योजना सहायक केवल आधिकारिक सरकारी दिशानिर्देशों से उत्तर देता है। यह किसी भी नियम को मनगढ़ंत नहीं बनाता।'
                : 'Yojana Sahayak synthesizes answers strictly from indexed official government documents and cites source pages.'}
            </p>
            <div className="pt-2 text-[11px] text-slate-500">
              {language === 'hi' ? 'सार्वजनिक नागरिक सेवा' : 'Dedicated to Indian Citizens'}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 Yojana Sahayak. Built with Gemini 3.8 Flash RAG Architecture.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigateTab('about')} className="hover:text-slate-300">
              {language === 'hi' ? 'तकनीकी वास्तुकला' : 'Architecture'}
            </button>
            <button onClick={() => onNavigateTab('admin')} className="hover:text-slate-300">
              {language === 'hi' ? 'ज्ञान केंद्र' : 'Knowledge Base'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
