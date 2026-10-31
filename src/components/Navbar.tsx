import React, { useState } from 'react';
import { 
  Building2, 
  MessageSquare, 
  Layers, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Sparkles,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', labelEn: 'Home', labelHi: 'होम' },
    { id: 'chat', labelEn: 'Assistant', labelHi: 'एआई सहायक' },
    { id: 'schemes', labelEn: 'Schemes', labelHi: 'योजनाएं' },
    { id: 'eligibility', labelEn: 'Eligibility', labelHi: 'पात्रता जांच' },
    { id: 'documents', labelEn: 'Documents', labelHi: 'दस्तावेज' },
    { id: 'about', labelEn: 'Trust & RAG', labelHi: 'विश्वसनीयता' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#06080e]/85 backdrop-blur-xl border-b border-white/[0.08] transition-all">
      {/* Top Ambient Bar */}
      <div className="bg-gradient-to-r from-amber-500/10 via-blue-500/15 to-emerald-500/10 border-b border-white/[0.05] text-[11px] py-1 px-4 text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium tracking-wide text-slate-200">
              {language === 'hi'
                ? 'भारत सरकार की योजनाओं के लिए आधिकारिक RAG एआई सहायक'
                : 'Official Document-Grounded AI for Indian Government Schemes'}
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-3 text-slate-400 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400/90 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              {language === 'hi' ? 'सत्यापित स्रोत आधारित' : 'Zero Hallucination Guarantee'}
            </span>
            <span>•</span>
            <span className="text-slate-400">{language === 'hi' ? 'अंतिम अपडेट: 2026' : 'National Portal Data'}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div 
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-500 text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform border border-white/20">
              <span className="text-xl font-black tracking-tighter">य</span>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-400 text-[8px] font-black text-slate-950">
                ✓
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-white group-hover:text-blue-300 transition-colors">
                  Yojana<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Sahayak</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  RAG
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                {language === 'hi' ? 'सरकारी योजनाएं, सबके लिए आसान' : 'Government Schemes, Simplified'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-white/[0.09] text-white border border-white/[0.15] shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {language === 'hi' ? item.labelHi : item.labelEn}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Language Selector & CTA */}
          <div className="flex items-center gap-3">
            {/* Bilingual Switcher */}
            <div className="flex items-center bg-white/[0.05] p-1 rounded-xl border border-white/[0.08]">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  language === 'en'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  language === 'hi'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Cinematic CTA */}
            <button
              onClick={() => setCurrentTab('chat')}
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all border border-blue-400/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'hi' ? 'सवाल पूछें →' : 'Ask Assistant →'}</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.05] border border-white/[0.08]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#06080e]/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span>{language === 'hi' ? item.labelHi : item.labelEn}</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </button>
            );
          })}

          <div className="pt-2">
            <button
              onClick={() => {
                setCurrentTab('chat');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{language === 'hi' ? 'योजना सहायक से पूछें →' : 'Ask Yojana Sahayak →'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
