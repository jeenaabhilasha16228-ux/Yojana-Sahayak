import React from 'react';
import { 
  Building2, 
  MessageSquare, 
  Layers, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Database, 
  Info, 
  Globe2,
  Menu,
  X
} from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenQuickChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', labelEn: 'Home', labelHi: 'होम', icon: Building2 },
    { id: 'chat', labelEn: 'AI Assistant', labelHi: 'एआई सहायक', icon: MessageSquare },
    { id: 'schemes', labelEn: 'Schemes', labelHi: 'योजनाएं', icon: Layers },
    { id: 'eligibility', labelEn: 'Eligibility Checker', labelHi: 'पात्रता जांच', icon: CheckCircle2 },
    { id: 'documents', labelEn: 'Documents', labelHi: 'दस्तावेज', icon: FileText },
    { id: 'admin', labelEn: 'Knowledge Base', labelHi: 'ज्ञान केंद्र (Admin)', icon: Database },
    { id: 'about', labelEn: 'About', labelHi: 'परिचय', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      {/* Top Public Service Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-blue-700 to-emerald-700 text-white text-xs py-1 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
            <span className="font-medium tracking-wide">
              {language === 'hi'
                ? 'भारत सरकार की योजनाओं के लिए आधिकारिक दस्तावेज़-आधारित एआई'
                : 'Official Document-Grounded AI for Indian Government Schemes'}
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-3 text-white/90 text-[11px]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              {language === 'hi' ? 'सत्यापित स्रोत' : 'Zero Hallucination Grounding'}
            </span>
            <span>•</span>
            <span>{language === 'hi' ? 'हेल्पलाइन: 1800-11-5555' : 'Public Guidance Initiative'}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-900 text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform">
              <span className="text-xl font-black tracking-tighter">य</span>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white ring-2 ring-white">
                ✓
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  Yojana<span className="text-blue-700">Sahayak</span>
                </span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                  RAG
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                {language === 'hi' ? 'सरकारी योजनाएं, सबके लिए आसान' : 'Government Schemes, Simplified'}
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
                  <span>{language === 'hi' ? item.labelHi : item.labelEn}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Language Selector & CTA */}
          <div className="flex items-center gap-2.5">
            {/* Language Selector Button */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  language === 'en'
                    ? 'bg-white text-blue-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  language === 'hi'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Quick Ask AI CTA */}
            <button
              onClick={() => setCurrentTab('chat')}
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-xs hover:shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{language === 'hi' ? 'सवाल पूछें' : 'Ask Scheme AI'}</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
                <span>{language === 'hi' ? item.labelHi : item.labelEn}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
