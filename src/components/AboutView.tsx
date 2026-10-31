import React from 'react';
import { 
  Building2, 
  Cpu, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Globe2, 
  Users, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Language } from '../types';

interface AboutViewProps {
  language: Language;
  onNavigateTab: (tab: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  language,
  onNavigateTab,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-blue-700" />
          <span>{language === 'hi' ? 'हैकाथॉन नवाचार और दृष्टिकोण' : 'Hackathon Innovation & Mission'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          {language === 'hi' ? (
            <>
              योजना सहायक: <span className="text-blue-700">पारदर्शी लोक सेवा</span>
            </>
          ) : (
            <>
              Yojana Sahayak: <span className="text-blue-700">Simplified Public Service</span>
            </>
          )}
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          {language === 'hi'
            ? '“सरकारी योजनाएं, सबके लिए आसान।” — भारतीय नागरिकों के लिए आधिकारिक सरकारी दस्तावेजों पर आधारित द्विभाषी एआई सहायक।'
            : '“Government Schemes, Simplified for Everyone.” — A bilingual AI assistant empowering Indian citizens with document-grounded welfare insights.'}
        </p>
      </div>

      {/* Problem vs Solution vs Innovation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg">
            !
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {language === 'hi' ? '1. मुख्य समस्या (The Problem)' : '1. The Problem'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {language === 'hi'
              ? 'सरकारी योजनाओं की जानकारी विभिन्न पोर्टलों और जटिल 40-50 पृष्ठों के पीडीएफ दस्तावेजों में बिखरी होती है। आम नागरिक पात्रता की शर्तों और आवश्यक कागजातों को ठीक से नहीं समझ पाते।'
              : 'Welfare scheme information is scattered across dozens of complex, jargon-heavy 50-page PDF gazettes. Citizens struggle to verify whether they qualify or what papers they need.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
            ✓
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {language === 'hi' ? '2. हमारा समाधान (The Solution)' : '2. The Solution'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {language === 'hi'
              ? 'एक सहज संवादात्मक इंटरफ़ेस जहां नागरिक अपनी भाषा (हिन्दी, English या Hinglish) में सीधे प्रश्न पूछ सकते हैं और सरल बुलेट पॉइंट्स में स्पष्ट उत्तर प्राप्त कर सकते हैं।'
              : 'A single unified conversational platform where citizens query in natural Hindi, English, or Hinglish to receive immediate, plain-language guidance and interactive checklists.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
            ★
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {language === 'hi' ? '3. मुख्य नवाचार (Innovation)' : '3. Core Innovation: RAG'}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {language === 'hi'
              ? 'रिट्रीवल-ऑगमेंटेड जनरेशन (RAG) द्वारा शून्य-भ्रम (Zero Hallucination)। हर उत्तर के साथ आधिकारिक दस्तावेज़ और पेज नंबर का प्रमाण क्लिक करके देखा जा सकता है।'
              : 'Strict Retrieval-Augmented Generation (RAG) with Gemini 3.8 Flash. Every answer carries clickable source citations to the exact official document section and page number.'}
          </p>
        </div>
      </div>

      {/* RAG Architecture Flow Diagram */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-blue-400">
            {language === 'hi' ? 'तकनीकी वास्तुकला' : 'End-to-End Technical Architecture'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {language === 'hi' ? 'सख्त आरएजी पाइपलाइन' : 'Grounded RAG Pipeline Workflow'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
            <span className="text-xs font-bold text-blue-400">Step 1</span>
            <h4 className="text-sm font-bold text-white">User Query</h4>
            <p className="text-[11px] text-slate-400">English, Hindi, or conversational Hinglish</p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
            <span className="text-xs font-bold text-blue-400">Step 2</span>
            <h4 className="text-sm font-bold text-white">Query Analysis</h4>
            <p className="text-[11px] text-slate-400">Intent classification & synonym expansion</p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
            <span className="text-xs font-bold text-blue-400">Step 3</span>
            <h4 className="text-sm font-bold text-white">Hybrid Retrieval</h4>
            <p className="text-[11px] text-slate-400">BM25 scoring from official indexed PDFs</p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
            <span className="text-xs font-bold text-blue-400">Step 4</span>
            <h4 className="text-sm font-bold text-white">Grounded AI</h4>
            <p className="text-[11px] text-slate-400">Gemini 3.8 Flash bounded strictly to context</p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
            <span className="text-xs font-bold text-emerald-400">Step 5</span>
            <h4 className="text-sm font-bold text-white">Source Citation</h4>
            <p className="text-[11px] text-slate-400">Clickable page & section references</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 text-xs text-slate-300 text-center leading-relaxed max-w-3xl mx-auto font-mono">
          "If the required information cannot be found in the official documents, say: 'I couldn't find this information in the available official documents.' Do not hallucinate."
        </div>
      </div>

      {/* Public Disclaimer */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          {language === 'hi' ? 'सार्वजनिक सेवा एवं उत्तरदायित्व अस्वीकरण' : 'Public Guidance Disclaimer'}
        </h4>
        <p className="text-xs text-amber-950/80 leading-relaxed">
          {language === 'hi'
            ? 'योजना सहायक उपलब्ध आधिकारिक सरकारी दस्तावेजों के आधार पर केवल सूचनात्मक मार्गदर्शन प्रदान करता है। उपयोगकर्ताओं को सलाह दी जाती है कि वे अंतिम पात्रता और आवेदन संबंधी आवश्यकताओं का सत्यापन संबंधित आधिकारिक सरकारी प्राधिकरण अथवा पोर्टल से अवश्य करें।'
            : 'Yojana Sahayak provides informational guidance based on available government documents. Users should verify final eligibility and application requirements with the relevant official government authority.'}
        </p>
      </div>

      {/* CTA Box */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigateTab('chat')}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
        >
          <span>{language === 'hi' ? 'एआई सहायक से बातचीत शुरू करें' : 'Start Asking Yojana Sahayak AI'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
