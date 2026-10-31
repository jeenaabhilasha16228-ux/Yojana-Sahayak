import React from 'react';
import { 
  Building2, 
  Cpu, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Globe2, 
  Sparkles,
  BookOpen,
  Lock,
  Layers
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 text-slate-100">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>{language === 'hi' ? 'आधिकारिक आरएजी नवाचार' : 'Document-Grounded Architecture'}</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          {language === 'hi' ? (
            <>
              योजना सहायक: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">पारदर्शी लोक सेवा</span>
            </>
          ) : (
            <>
              Yojana Sahayak: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Simplified Public Service</span>
            </>
          )}
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          {language === 'hi'
            ? '“सरकारी योजनाएं, सबके लिए आसान।” — भारतीय नागरिकों के लिए आधिकारिक सरकारी दस्तावेजों पर आधारित द्विभाषी एआई सहायक।'
            : '“Government Schemes, Simplified for Everyone.” — A bilingual AI assistant empowering Indian citizens with document-grounded welfare insights.'}
        </p>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/[0.03] rounded-3xl border border-white/[0.08] p-6 shadow-xl space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-rose-400 block">
            01 — THE PROBLEM
          </span>
          <h3 className="text-lg font-bold text-white">
            {language === 'hi' ? 'जटिलता व बिखराव' : 'Information Fragmentation'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {language === 'hi'
              ? 'सरकारी योजनाओं की जानकारी विभिन्न पोर्टलों और जटिल 40-50 पृष्ठों के पीडीएफ दस्तावेजों में बिखरी होती है। आम नागरिक पात्रता की शर्तों और आवश्यक कागजातों को ठीक से नहीं समझ पाते।'
              : 'Welfare scheme rules are scattered across dozens of complex, jargon-heavy 50-page PDF gazettes. Citizens struggle to verify whether they qualify or what papers they need.'}
          </p>
        </div>

        <div className="bg-white/[0.03] rounded-3xl border border-white/[0.08] p-6 shadow-xl space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-blue-400 block">
            02 — THE SOLUTION
          </span>
          <h3 className="text-lg font-bold text-white">
            {language === 'hi' ? 'एकल संवादात्मक इंटरफ़ेस' : 'Unified Bilingual AI'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {language === 'hi'
              ? 'एक सहज संवादात्मक इंटरफ़ेस जहां नागरिक अपनी भाषा (हिन्दी, English या Hinglish) में सीधे प्रश्न पूछ सकते हैं और सरल बुलेट पॉइंट्स में स्पष्ट उत्तर प्राप्त कर सकते हैं।'
              : 'A single unified conversational platform where citizens query in natural Hindi, English, or Hinglish to receive immediate, plain-language guidance and interactive checklists.'}
          </p>
        </div>

        <div className="bg-white/[0.03] rounded-3xl border border-white/[0.08] p-6 shadow-xl space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 block">
            03 — THE INNOVATION
          </span>
          <h3 className="text-lg font-bold text-white">
            {language === 'hi' ? 'सख्त आरएजी व शून्य-भ्रम' : 'Grounded RAG Pipeline'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {language === 'hi'
              ? 'रिट्रीवल-ऑगमेंटेड जनरेशन (RAG) द्वारा शून्य-भ्रम (Zero Hallucination)। हर उत्तर के साथ आधिकारिक दस्तावेज़ और पेज नंबर का प्रमाण क्लिक करके देखा जा सकता है।'
              : 'Strict Retrieval-Augmented Generation (RAG) with Gemini 3.8 Flash. Every answer carries clickable source citations to the exact official document section and page number.'}
          </p>
        </div>
      </div>

      {/* RAG Pipeline Breakdown */}
      <div className="rounded-3xl bg-white/[0.02] border border-white/[0.08] p-8 sm:p-12 space-y-8 backdrop-blur-xl">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-blue-400">
            {language === 'hi' ? 'तकनीकी वास्तुकला' : 'End-to-End Architecture'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {language === 'hi' ? 'सख्त आरएजी पाइपलाइन' : 'Grounded RAG Pipeline Workflow'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
          <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/[0.08] space-y-2">
            <span className="text-xs font-bold text-blue-400">Step 1</span>
            <h4 className="text-sm font-bold text-white">User Query</h4>
            <p className="text-[11px] text-slate-400">English, Hindi, or conversational Hinglish</p>
          </div>

          <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/[0.08] space-y-2">
            <span className="text-xs font-bold text-blue-400">Step 2</span>
            <h4 className="text-sm font-bold text-white">Query Analysis</h4>
            <p className="text-[11px] text-slate-400">Intent classification & synonym expansion</p>
          </div>

          <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/[0.08] space-y-2">
            <span className="text-xs font-bold text-blue-400">Step 3</span>
            <h4 className="text-sm font-bold text-white">Hybrid Retrieval</h4>
            <p className="text-[11px] text-slate-400">BM25 scoring from official indexed PDFs</p>
          </div>

          <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/[0.08] space-y-2">
            <span className="text-xs font-bold text-blue-400">Step 4</span>
            <h4 className="text-sm font-bold text-white">Grounded AI</h4>
            <p className="text-[11px] text-slate-400">Gemini 3.8 Flash bounded strictly to context</p>
          </div>

          <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/[0.08] space-y-2">
            <span className="text-xs font-bold text-emerald-400">Step 5</span>
            <h4 className="text-sm font-bold text-white">Source Citation</h4>
            <p className="text-[11px] text-slate-400">Clickable page & section references</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-xs text-slate-300 text-center leading-relaxed max-w-3xl mx-auto font-mono">
          "Answer using the provided retrieved context. Do not invent government scheme information. If the required information is not available, clearly say that the information could not be found."
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigateTab('chat')}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-500/20 transition-all"
        >
          <span>{language === 'hi' ? 'एआई सहायक से बातचीत शुरू करें →' : 'Start Asking Yojana Sahayak AI →'}</span>
        </button>
      </div>
    </div>
  );
};
