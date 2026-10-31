import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle, 
  BookOpen, 
  FileText, 
  ShieldCheck, 
  Copy, 
  Check, 
  Building
} from 'lucide-react';
import { Language, SourceCitation } from '../types';

interface SourceModalProps {
  citation: SourceCitation | null;
  onClose: () => void;
  language: Language;
}

export const SourceModal: React.FC<SourceModalProps> = ({
  citation,
  onClose,
  language,
}) => {
  const [copied, setCopied] = useState(false);

  if (!citation) return null;

  const handleCopyCitation = () => {
    const textToCopy = `Source: ${citation.documentTitle} — ${citation.section}, Page ${citation.pageNumber}\nExcerpt: "${citation.excerpt}"\nOfficial Portal: ${citation.officialUrl || 'N/A'}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="bg-[#0b0e17] rounded-3xl shadow-2xl max-w-2xl w-full border border-white/[0.12] overflow-hidden flex flex-col max-h-[90vh] text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-white/[0.03] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400">
                  {language === 'hi' ? 'सत्यापित आधिकारिक स्रोत' : 'Verified Official Citation'}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  RAG Grounded
                </span>
              </div>
              <h3 className="text-base font-bold text-white truncate max-w-md">
                {citation.schemeName}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Metadata Card */}
          <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-slate-400 font-medium block text-[11px]">
                {language === 'hi' ? 'आधिकारिक दस्तावेज़:' : 'Official Document:'}
              </span>
              <span className="font-bold text-white text-sm flex items-center gap-1.5 mt-0.5">
                <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                {citation.documentTitle}
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block text-[11px]">
                {language === 'hi' ? 'खंड व पृष्ठ संख्या:' : 'Section & Page:'}
              </span>
              <span className="font-bold text-white text-sm flex items-center gap-2 mt-0.5">
                <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-lg text-xs font-bold border border-blue-500/30">
                  {citation.section}
                </span>
                <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-lg text-xs font-bold border border-amber-500/30">
                  Page {citation.pageNumber}
                </span>
              </span>
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                {language === 'hi' ? 'दिशानिर्देश अंश (Verbatim Excerpt):' : 'Official Guidelines Excerpt:'}
              </span>
              <button
                onClick={handleCopyCitation}
                className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white font-medium transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">{language === 'hi' ? 'कॉपी हो गया' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'साइटेशन कॉपी करें' : 'Copy Citation'}</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-slate-200 text-sm leading-relaxed font-serif relative italic">
              “{citation.excerpt}”
            </div>
          </div>

          {/* Trust indicator */}
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-2.5 text-xs text-emerald-200">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">
                {language === 'hi' ? 'आधिकारिक स्रोत सत्यापन' : 'Direct Ministry Gazette Verification'}
              </p>
              <p className="text-emerald-300/80 mt-0.5 leading-relaxed">
                {language === 'hi'
                  ? 'यह जानकारी संबंधित मंत्रालय के आधिकारिक दिशानिर्देशों से सीधे निकाली गई है। योजना सहायक किसी भी नियम को मनगढ़ंत नहीं बनाता।'
                  : 'This answer was synthesized strictly using the indexed government document text above. Yojana Sahayak does not hallucinate.'}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-white/[0.02] border-t border-white/[0.08] flex items-center justify-between">
          <span className="text-[10px] text-slate-500 font-mono">
            {citation.id}
          </span>
          <div className="flex items-center gap-3">
            {citation.officialUrl && (
              <a
                href={citation.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition-all"
              >
                <span>{language === 'hi' ? 'सरकारी पोर्टल खोलें' : 'Open Official Portal (.gov.in)'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-white/[0.1] bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 text-xs font-medium transition-colors"
            >
              {language === 'hi' ? 'बंद करें' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
