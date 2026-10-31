import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  CheckSquare, 
  Square, 
  AlertTriangle, 
  Copy, 
  Check, 
  RotateCcw, 
  FileText, 
  Layers, 
  ExternalLink,
  Mic,
  ShieldCheck,
  RefreshCw,
  Info
} from 'lucide-react';
import { ChatMessage, Language, Scheme, SourceCitation, StructuredAIResponse } from '../types';

interface ChatAssistantViewProps {
  language: Language;
  onOpenSourceModal: (citation: SourceCitation) => void;
  schemes: Scheme[];
  initialQuery?: string;
  onClearInitialQuery?: () => void;
}

export const ChatAssistantView: React.FC<ChatAssistantViewProps> = ({
  language,
  onOpenSourceModal,
  schemes,
  initialQuery,
  onClearInitialQuery,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-msg',
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: language === 'hi' 
        ? 'नमस्ते! मैं **योजना सहायक** हूँ—सरकारी योजनाओं के लिए आपका आधिकारिक मार्गदर्शक।\n\nआप मुझसे किसी भी योजना की **पात्रता**, **आवश्यक कागजात**, **लाभ** या **आवेदन प्रक्रिया** के बारे में हिन्दी, English या Hinglish में पूछ सकते हैं।\n\nप्रत्येक उत्तर सीधे आधिकारिक सरकारी गजट और दिशानिर्देशों के पृष्ठ संख्या के संदर्भ के साथ दिया जाएगा।'
        : 'Namaste! I am **Yojana Sahayak**, your AI assistant for Indian government schemes.\n\nYou can ask about **eligibility**, **required documents**, **benefits**, or **how to apply** in English, Hindi, or Hinglish.\n\nEvery factual answer cites the exact official government document, section, and page number.'
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastFailedQuery, setLastFailedQuery] = useState<string | null>(null);
  const [selectedSchemeFilter, setSelectedSchemeFilter] = useState<string>('all');
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleSendMessage(initialQuery.trim());
      if (onClearInitialQuery) {
        onClearInitialQuery();
      }
    }
  }, [initialQuery]);

  const toggleDocCheck = (docKey: string) => {
    setCheckedDocs(prev => ({
      ...prev,
      [docKey]: !prev[docKey]
    }));
  };

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || input.trim();
    if (!textToSend || loading) return;

    setLastFailedQuery(null);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: textToSend,
      language
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Prepare conversation history for context resolution (e.g. "this scheme")
    const historyPayload = messages.slice(-4).map(m => ({
      sender: m.sender,
      text: m.text
    }));

    try {
      // Relative URL /api/chat works both locally and on Vercel!
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language,
          schemeFocusId: selectedSchemeFilter !== 'all' ? selectedSchemeFilter : undefined,
          conversationHistory: historyPayload
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const structuredResult: StructuredAIResponse = await response.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: structuredResult.answer,
        structuredResponse: structuredResult,
        citedSources: structuredResult.sources,
        language: structuredResult.detectedLanguage || language
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat API Error:', err);
      setLastFailedQuery(textToSend);

      const errorMessage: ChatMessage = {
        id: `assistant-err-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: language === 'hi'
          ? 'एआई सहायक अस्थायी रूप से अनुपलब्ध है। कृपया पुनः प्रयास करें।'
          : 'The AI assistant is temporarily unavailable. Please try again.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const speakText = (text: string, msgId: string, lang?: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking === msgId) {
      window.speechSynthesis.cancel();
      setIsSpeaking(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(null);
    utterance.onerror = () => setIsSpeaking(null);

    setIsSpeaking(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const toggleSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(language === 'hi' ? 'ब्राउज़र में वॉइस इनपुट समर्थित नहीं है।' : 'Voice recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const speechText = event.results[0][0].transcript;
      setInput(speechText);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const copyMessage = (msg: ChatMessage) => {
    let full = msg.text;
    if (msg.structuredResponse) {
      if (msg.structuredResponse.eligibility) full += `\n\nEligibility:\n${msg.structuredResponse.eligibility}`;
      if (msg.structuredResponse.documentsRequired) full += `\n\nDocuments:\n${msg.structuredResponse.documentsRequired.join('\n- ')}`;
      if (msg.structuredResponse.benefits) full += `\n\nBenefits:\n${msg.structuredResponse.benefits}`;
      if (msg.structuredResponse.sources) {
        full += `\n\nSources:\n${msg.structuredResponse.sources.map(s => `${s.documentTitle} (Page ${s.pageNumber})`).join('\n')}`;
      }
    }
    navigator.clipboard.writeText(full);
    setCopiedId(msg.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickPrompts = language === 'hi' ? [
    'क्या मैं इस योजना के लिए पात्र हूँ?',
    'मुझे कौन से दस्तावेज चाहिए?',
    'मुझे कितना लाभ मिलेगा?',
    'आवेदन करने के चरण क्या हैं?'
  ] : [
    'Am I eligible for this scheme?',
    'What documents do I need?',
    'How much benefit will I receive?',
    'What are the application steps?'
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col h-[calc(100vh-8.5rem)] text-slate-100">
      {/* Chat Controls Top Bar */}
      <div className="bg-white/[0.03] rounded-2xl border border-white/[0.08] p-3 sm:p-4 mb-4 shadow-xl backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white">
                {language === 'hi' ? 'योजना सहायक एआई' : 'Yojana Sahayak Assistant'}
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                RAG Grounded
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {language === 'hi' 
                ? 'सरकारी दिशानिर्देशों से सत्यापित उत्तर (No Hallucination)' 
                : 'Directly grounded in official government gazettes'}
            </p>
          </div>
        </div>

        {/* Scheme focus & reset */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-white/[0.04] px-2.5 py-1.5 rounded-xl border border-white/[0.08]">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedSchemeFilter}
              onChange={(e) => setSelectedSchemeFilter(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-200 focus:outline-none cursor-pointer max-w-[140px] sm:max-w-[180px] truncate"
            >
              <option value="all" className="bg-[#0b0e14] text-white">
                {language === 'hi' ? 'सभी सरकारी योजनाएं' : 'All Schemes'}
              </option>
              {schemes.map(s => (
                <option key={s.id} value={s.id} className="bg-[#0b0e14] text-white">
                  {language === 'hi' ? s.hindiName : s.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              if (window.speechSynthesis) window.speechSynthesis.cancel();
              setIsSpeaking(null);
              setMessages([
                {
                  id: `welcome-${Date.now()}`,
                  sender: 'assistant',
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  text: language === 'hi'
                    ? 'बातचीत रीसेट हो गई है। आप किस सरकारी योजना के बारे में जानना चाहते हैं?'
                    : 'Chat cleared. Which government scheme would you like to explore?'
                }
              ]);
            }}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/[0.05] rounded-xl transition-colors border border-transparent hover:border-white/[0.08]"
            title={language === 'hi' ? 'बातचीत साफ़ करें' : 'Clear chat'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scroll-smooth">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const structured = msg.structuredResponse;

          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20 mt-1 border border-white/20">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[90%] sm:max-w-[82%] rounded-2xl p-4 sm:p-5 transition-all ${
                  isUser
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-xs shadow-lg'
                    : 'bg-white/[0.04] border border-white/[0.08] text-slate-100 rounded-tl-xs shadow-xl space-y-4 backdrop-blur-md'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-3 text-[11px] mb-1">
                  <span className={`font-semibold ${isUser ? 'text-blue-100' : 'text-slate-400'}`}>
                    {isUser ? (language === 'hi' ? 'आप' : 'You') : 'Yojana Sahayak'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={isUser ? 'text-blue-200' : 'text-slate-500'}>
                      {msg.timestamp}
                    </span>
                    {!isUser && (
                      <button
                        onClick={() => speakText(
                          `${msg.text} ${structured?.eligibility || ''} ${structured?.benefits || ''}`,
                          msg.id,
                          msg.language
                        )}
                        className="p-1 text-slate-400 hover:text-white rounded transition-colors"
                        title={isSpeaking === msg.id ? 'Stop reading' : 'Read aloud'}
                      >
                        {isSpeaking === msg.id ? (
                          <VolumeX className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                    {!isUser && (
                      <button
                        onClick={() => copyMessage(msg)}
                        className="p-1 text-slate-400 hover:text-white rounded transition-colors"
                        title="Copy answer"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Direct Answer */}
                <div className="text-sm leading-relaxed whitespace-pre-wrap font-normal">
                  {msg.text}
                </div>

                {/* Structured Sections */}
                {structured && (
                  <div className="space-y-3 pt-2 border-t border-white/[0.08] text-xs">
                    {/* Eligibility */}
                    {structured.eligibility && (
                      <div className="rounded-xl bg-blue-950/40 border border-blue-500/20 p-3.5">
                        <div className="flex items-center gap-1.5 font-bold text-blue-300 mb-1.5 text-xs uppercase tracking-wider">
                          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                          {language === 'hi' ? 'पात्रता (Eligibility)' : 'Eligibility'}
                        </div>
                        <p className="text-slate-200 text-xs sm:text-[13px] leading-relaxed">
                          {structured.eligibility}
                        </p>
                      </div>
                    )}

                    {/* Documents Required Checklist */}
                    {structured.documentsRequired && structured.documentsRequired.length > 0 && (
                      <div className="rounded-xl bg-amber-950/30 border border-amber-500/20 p-3.5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-amber-300 uppercase tracking-wider text-xs flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-amber-400" />
                            {language === 'hi' ? 'आवश्यक दस्तावेज़ (Documents Required)' : 'Documents Required'}
                          </span>
                          <span className="text-[10px] text-amber-400/80 font-medium">
                            Checklist
                          </span>
                        </div>
                        <div className="space-y-2">
                          {structured.documentsRequired.map((doc, idx) => {
                            const key = `${msg.id}-doc-${idx}`;
                            const isChecked = checkedDocs[key] || false;
                            return (
                              <div
                                key={idx}
                                onClick={() => toggleDocCheck(key)}
                                className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-colors ${
                                  isChecked 
                                    ? 'bg-amber-500/20 line-through text-slate-400' 
                                    : 'bg-white/[0.03] text-slate-200 border border-white/[0.05] hover:bg-white/[0.06]'
                                }`}
                              >
                                {isChecked ? (
                                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                ) : (
                                  <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                                )}
                                <span className="text-xs sm:text-[13px] font-medium leading-snug">
                                  {doc}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Benefits */}
                    {structured.benefits && (
                      <div className="rounded-xl bg-emerald-950/30 border border-emerald-500/20 p-3.5">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-300 mb-1.5 text-xs uppercase tracking-wider">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          {language === 'hi' ? 'मुख्य लाभ (Benefits)' : 'Benefits'}
                        </div>
                        <p className="text-slate-200 text-xs sm:text-[13px] leading-relaxed">
                          {structured.benefits}
                        </p>
                      </div>
                    )}

                    {/* Application Process */}
                    {structured.applicationProcess && (
                      <div className="rounded-xl bg-purple-950/30 border border-purple-500/20 p-3.5">
                        <div className="flex items-center gap-1.5 font-bold text-purple-300 mb-1.5 text-xs uppercase tracking-wider">
                          <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                          {language === 'hi' ? 'आवेदन कैसे करें (How to Apply)' : 'How to Apply'}
                        </div>
                        <div className="text-slate-200 text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap">
                          {structured.applicationProcess}
                        </div>
                      </div>
                    )}

                    {/* Source Citations */}
                    {structured.sources && structured.sources.length > 0 && (
                      <div className="pt-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                            {language === 'hi' ? 'आधिकारिक स्रोत (Official Sources):' : 'Official Sources:'}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            Verified
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {structured.sources.map((cit, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => onOpenSourceModal(cit)}
                              className="inline-flex items-center gap-1.5 bg-white/[0.04] hover:bg-blue-600/20 text-slate-200 hover:text-white border border-white/[0.08] hover:border-blue-500/40 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all group"
                            >
                              <FileText className="w-3 h-3 text-blue-400" />
                              <span className="underline decoration-dotted underline-offset-2">
                                {cit.documentTitle} — {cit.section}, Page {cit.pageNumber}
                              </span>
                              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Not Found in Docs Warning */}
                    {structured.notFoundInDocs && (
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div className="text-xs">
                          <span className="font-bold block">
                            {language === 'hi' ? 'आधिकारिक पुष्टि उपलब्ध नहीं' : 'Could Not Verify in Official Documents'}
                          </span>
                          <span>
                            {language === 'hi'
                              ? 'योजना सहायक मनगढ़ंत उत्तर नहीं बनाता। यदि जानकारी आधिकारिक सरकारी दस्तावेज़ में उपलब्ध नहीं है, तो हम इसकी पुष्टि नहीं करते।'
                              : "I couldn't verify this information from the available official sources. Yojana Sahayak avoids hallucinations."}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-md mt-1 border border-white/10">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading State matching specification */}
        {loading && (
          <div className="flex gap-3 justify-start items-center">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-500 text-white flex items-center justify-center shrink-0 animate-pulse border border-white/20">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl rounded-tl-xs px-4 py-3 shadow-xl flex items-center gap-3 backdrop-blur-md">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></div>
              </div>
              <span className="text-xs font-semibold text-slate-300">
                {language === 'hi'
                  ? 'योजना सहायक संबंधित जानकारी की जांच कर रहा है...'
                  : 'Yojana Sahayak is checking the relevant information...'}
              </span>
            </div>
          </div>
        )}

        {/* Retry Button if last query failed */}
        {lastFailedQuery && !loading && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() => handleSendMessage(lastFailedQuery)}
              className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'पुनः प्रयास करें (Retry)' : 'Retry Request'}</span>
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Follow-ups Bar */}
      <div className="pt-2 pb-1 shrink-0 flex items-center gap-2 overflow-x-auto text-xs text-slate-400">
        <span className="font-semibold text-slate-500 shrink-0">
          {language === 'hi' ? 'सुझाव:' : 'Suggestions:'}
        </span>
        {quickPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(p)}
            disabled={loading}
            className="shrink-0 bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white px-3 py-1 rounded-xl text-xs font-medium border border-white/[0.06] transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <div className="bg-[#06080e]/90 rounded-2xl border border-white/[0.12] p-2 shadow-2xl backdrop-blur-xl shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={toggleSpeechRecognition}
            className={`p-2.5 rounded-xl transition-all ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
            }`}
            title={isListening ? 'Listening...' : 'Voice Input (Speech-to-Text)'}
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* Input field */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder={
              language === 'hi'
                ? 'सरकारी योजना के बारे में पूछें (हिन्दी, English या Hinglish में)...'
                : 'Ask about any scheme in English, Hindi, or Hinglish...'
            }
            className="flex-1 px-3 py-2 text-sm text-white placeholder:text-slate-500 bg-transparent focus:outline-none"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
          >
            <span>{language === 'hi' ? 'भेजें' : 'Send'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-1 px-2 flex items-center justify-between text-[10px] text-slate-500">
          <span>
            {language === 'hi' 
              ? 'प्रत्येक उत्तर केवल आधिकारिक सरकारी दस्तावेजों पर आधारित है।' 
              : 'Directly grounded in official government guidelines. Never hallucinates.'}
          </span>
          <span className="hidden sm:inline font-mono text-[9px] text-blue-400/80">
            /api/chat • Vercel Ready
          </span>
        </div>
      </div>
    </div>
  );
};
