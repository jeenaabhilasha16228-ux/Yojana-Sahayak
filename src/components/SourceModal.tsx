import React from 'react';
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
  const [copied, setCopied] = React.useState(false);

  if (!citation) return null;

  const handleCopyCitation = () => {
    const textToCopy = `Source: ${citation.documentTitle} — ${citation.section}, Page ${citation.pageNumber}\nExcerpt: "${citation.excerpt}"\nOfficial Portal: ${citation.officialUrl || 'N/A'}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-600/30 text-blue-300 border border-blue-500/30">
              <BookOpen className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider text-blue-300">
                  {language === 'hi' ? 'सत्यापित आधिकारिक स्रोत' : 'Verified Official Citation'}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  RAG Grounded
                </span>
              </div>
              <h3 className="text-base font-semibold text-white truncate max-w-md">
                {citation.schemeName}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Document Metadata Card */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 font-medium block">
                {language === 'hi' ? 'दस्तावेज़ का नाम:' : 'Official Document:'}
              </span>
              <span className="font-semibold text-slate-800 text-sm flex items-center gap-1.5 mt-0.5">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                {citation.documentTitle}
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block">
                {language === 'hi' ? 'खंड व पृष्ठ संख्या:' : 'Section & Page:'}
              </span>
              <span className="font-semibold text-slate-800 text-sm flex items-center gap-1.5 mt-0.5">
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-bold">
                  {citation.section}
                </span>
                <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs font-bold">
                  Page {citation.pageNumber}
                </span>
              </span>
            </div>
          </div>

          {/* Authentic Document Excerpt */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                {language === 'hi' ? 'आधिकारिक दिशानिर्देश अंश (Verbatim Excerpt)' : 'Official Guidelines Excerpt'}
              </span>
              <button
                onClick={handleCopyCitation}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-blue-700 font-medium transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">{language === 'hi' ? 'कॉपी हो गया' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'साइटेशन कॉपी करें' : 'Copy Citation'}</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/80 text-slate-800 text-sm leading-relaxed font-serif relative">
              <span className="absolute top-2 left-2 text-3xl text-amber-300 font-serif leading-none select-none">“</span>
              <p className="pl-4 italic">
                {citation.excerpt}
              </p>
            </div>
          </div>

          {/* Trust and Safety Notice */}
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-900">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">
                {language === 'hi' ? 'सत्यापित आधिकारिक रिकॉर्ड' : 'Direct Retrieval Verification'}
              </p>
              <p className="text-emerald-800 mt-0.5">
                {language === 'hi'
                  ? 'यह जानकारी संबंधित मंत्रालय के आधिकारिक दिशानिर्देशों से सीधे निकाली गई है। योजना सहायक किसी भी नियम को मनगढ़ंत नहीं बनाता।'
                  : 'This answer was synthesized strictly using the indexed text above. Yojana Sahayak does not hallucinate or invent scheme rules.'}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Citation ID: <span className="font-mono">{citation.id}</span>
          </div>
          <div className="flex items-center gap-3">
            {citation.officialUrl && (
              <a
                href={citation.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all"
              >
                <span>{language === 'hi' ? 'आधिकारिक पोर्टल पर देखें' : 'Visit Official Portal'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors"
            >
              {language === 'hi' ? 'बंद करें' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
