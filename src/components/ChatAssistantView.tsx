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
  MicOff,
  ShieldAlert,
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
        ? 'नमस्ते! मैं **योजना सहायक** हूँ—भारत सरकार की योजनाओं के लिए आपका आधिकारिक दस्तावेज़-आधारित मार्गदर्शक।\n\nआप मुझसे किसी भी योजना की **पात्रता**, **आवश्यक दस्तावेज़**, **लाभ** या **आवेदन प्रक्रिया** के बारे में हिन्दी, English या Hinglish में पूछ सकते हैं।\n\nप्रत्येक उत्तर आधिकारिक सरकारी दस्तावेज़ और पृष्ठ संख्या के प्रमाण के साथ दिया जाएगा।'
        : 'Namaste! I am **Yojana Sahayak**, your bilingual AI assistant grounded strictly in official Indian government scheme guidelines.\n\nYou can ask about **eligibility**, **required documents**, **benefits**, or **how to apply** in English, Hindi, or Hinglish.\n\nEvery factual answer cites the exact official document, section, and page number.'
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  const [selectedSchemeFilter, setSelectedSchemeFilter] = useState<string>('all');
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Handle initial query passed from home or scheme card
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
    setLoadingStage(language === 'hi' ? 'आधिकारिक सरकारी दस्तावेज़ खोजे जा रहे हैं...' : 'Retrieving official PDF guidelines...');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          language,
          schemeFocusId: selectedSchemeFilter !== 'all' ? selectedSchemeFilter : undefined
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
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
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `assistant-err-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: language === 'hi'
          ? 'क्षमा करें, आधिकारिक जानकारी प्राप्त करने में अस्थायी समस्या आई। कृपया पुनः प्रयास करें।'
          : 'Sorry, there was a temporary issue retrieving the official guidelines. Please try again.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setLoadingStage('');
    }
  };

  // Text to speech function
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

  // Voice recognition function
  const toggleSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(language === 'hi' ? 'आपके ब्राउज़र में वॉइस रिकग्निशन समर्थित नहीं है।' : 'Voice recognition is not supported in this browser.');
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

  const copyMessageText = (msg: ChatMessage) => {
    let fullText = msg.text;
    if (msg.structuredResponse) {
      if (msg.structuredResponse.eligibility) {
        fullText += `\n\nEligibility:\n${msg.structuredResponse.eligibility}`;
      }
      if (msg.structuredResponse.documentsRequired) {
        fullText += `\n\nRequired Documents:\n${msg.structuredResponse.documentsRequired.join('\n- ')}`;
      }
      if (msg.structuredResponse.benefits) {
        fullText += `\n\nBenefits:\n${msg.structuredResponse.benefits}`;
      }
      if (msg.structuredResponse.sources && msg.structuredResponse.sources.length > 0) {
        fullText += `\n\nSources:\n${msg.structuredResponse.sources.map(s => `${s.documentTitle} (Page ${s.pageNumber})`).join('\n')}`;
      }
    }
    navigator.clipboard.writeText(fullText);
    setCopiedId(msg.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickFollowUps = language === 'hi' ? [
    'क्या मैं पात्र हूँ?',
    'कौन-कौन से दस्तावेज चाहिए?',
    'आवेदन कैसे करें?',
    'कितना लाभ मिलेगा?'
  ] : [
    'Am I eligible?',
    'What documents do I need?',
    'How do I apply?',
    'What are the key benefits?'
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col h-[calc(100vh-8.5rem)]">
      {/* Chat Header Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 mb-4 shadow-2xs flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-700 text-white shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                {language === 'hi' ? 'योजना सहायक एआई चैट' : 'Yojana Sahayak AI Assistant'}
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                RAG Active
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              {language === 'hi' 
                ? 'सरकारी दिशानिर्देशों से सत्यापित उत्तर (Zero Hallucination)'
                : 'Directly grounded in official government scheme gazettes'}
            </p>
          </div>
        </div>

        {/* Scheme focus filter & clear button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedSchemeFilter}
              onChange={(e) => setSelectedSchemeFilter(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer max-w-[140px] sm:max-w-[200px] truncate"
            >
              <option value="all">
                {language === 'hi' ? 'सभी सरकारी योजनाएं (All)' : 'All Government Schemes'}
              </option>
              {schemes.map(s => (
                <option key={s.id} value={s.id}>
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
                    ? 'बातचीत रीसेट हो गई है। आप किस योजना के बारे में जानना चाहते हैं?'
                    : 'Chat cleared. Which scheme would you like to explore today?'
                }
              ]);
            }}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title={language === 'hi' ? 'बातचीत साफ़ करें' : 'Clear Chat'}
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
              {/* Avatar */}
              {!isUser && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-900 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              {/* Message Bubble Card */}
              <div
                className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 sm:p-5 shadow-xs transition-all ${
                  isUser
                    ? 'bg-blue-700 text-white rounded-tr-xs'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs space-y-4'
                }`}
              >
                {/* Header info */}
                <div className="flex items-center justify-between gap-3 text-[11px] mb-1">
                  <span className={`font-semibold ${isUser ? 'text-blue-100' : 'text-slate-500'}`}>
                    {isUser ? (language === 'hi' ? 'आप' : 'You') : 'Yojana Sahayak'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={isUser ? 'text-blue-200' : 'text-slate-400'}>
                      {msg.timestamp}
                    </span>
                    {!isUser && (
                      <button
                        onClick={() => speakText(
                          `${msg.text} ${structured?.eligibility || ''} ${structured?.benefits || ''}`,
                          msg.id,
                          msg.language
                        )}
                        className="p-1 text-slate-400 hover:text-blue-700 rounded transition-colors"
                        title={isSpeaking === msg.id ? 'Stop reading' : 'Read aloud'}
                      >
                        {isSpeaking === msg.id ? (
                          <VolumeX className="w-3.5 h-3.5 text-blue-700 animate-pulse" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                    {!isUser && (
                      <button
                        onClick={() => copyMessageText(msg)}
                        className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                        title="Copy answer"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Main Text Content */}
                <div className={`text-sm leading-relaxed whitespace-pre-wrap ${isUser ? 'text-white' : 'text-slate-800 font-normal'}`}>
                  {msg.text}
                </div>

                {/* Structured Assistant Sections */}
                {structured && (
                  <div className="space-y-4 pt-2 border-t border-slate-100 text-xs">
                    {/* Eligibility Section */}
                    {structured.eligibility && (
                      <div className="rounded-xl bg-blue-50/70 border border-blue-200/80 p-3.5">
                        <div className="flex items-center gap-1.5 font-bold text-blue-900 mb-1.5 text-xs uppercase tracking-wider">
                          <span className="w-2 h-2 rounded-full bg-blue-700"></span>
                          {language === 'hi' ? 'पात्रता मानदंड (Eligibility)' : 'Eligibility Criteria'}
                        </div>
                        <p className="text-slate-700 text-xs sm:text-[13px] leading-relaxed">
                          {structured.eligibility}
                        </p>
                      </div>
                    )}

                    {/* Documents Required Checklist */}
                    {structured.documentsRequired && structured.documentsRequired.length > 0 && (
                      <div className="rounded-xl bg-amber-50/70 border border-amber-200/80 p-3.5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-amber-900 uppercase tracking-wider text-xs flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-amber-700" />
                            {language === 'hi' ? 'आवश्यक दस्तावेज़ चेकलिस्ट (Required Documents)' : 'Required Documents Checklist'}
                          </span>
                          <span className="text-[10px] text-amber-700/80 font-medium">
                            {language === 'hi' ? 'कागजात तैयार करें' : 'Interactive checklist'}
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
                                  isChecked ? 'bg-amber-100/70 line-through text-slate-500' : 'bg-white text-slate-800 border border-amber-200/50 hover:bg-amber-100/40'
                                }`}
                              >
                                {isChecked ? (
                                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                ) : (
                                  <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
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

                    {/* Benefits Section */}
                    {structured.benefits && (
                      <div className="rounded-xl bg-emerald-50/70 border border-emerald-200/80 p-3.5">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1.5 text-xs uppercase tracking-wider">
                          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                          {language === 'hi' ? 'योजना के मुख्य लाभ (Benefits)' : 'Scheme Benefits'}
                        </div>
                        <p className="text-slate-700 text-xs sm:text-[13px] leading-relaxed">
                          {structured.benefits}
                        </p>
                      </div>
                    )}

                    {/* Application Process Section */}
                    {structured.applicationProcess && (
                      <div className="rounded-xl bg-indigo-50/70 border border-indigo-200/80 p-3.5">
                        <div className="flex items-center gap-1.5 font-bold text-indigo-900 mb-1.5 text-xs uppercase tracking-wider">
                          <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                          {language === 'hi' ? 'आवेदन कैसे करें (Application Steps)' : 'Application Process'}
                        </div>
                        <div className="text-slate-700 text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap">
                          {structured.applicationProcess}
                        </div>
                      </div>
                    )}

                    {/* Source Citations Badges (Crucial Requirement!) */}
                    {structured.sources && structured.sources.length > 0 && (
                      <div className="pt-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-blue-700" />
                            {language === 'hi' ? 'संदर्भित आधिकारिक स्रोत (Click to inspect source):' : 'Official Sources Cited:'}
                          </span>
                          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            100% Grounded
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {structured.sources.map((cit, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => onOpenSourceModal(cit)}
                              className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-800 border border-slate-200 hover:border-blue-300 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-2xs group"
                            >
                              <FileText className="w-3 h-3 text-blue-700" />
                              <span className="underline decoration-dotted underline-offset-2">
                                {cit.documentTitle} — {cit.section}, Page {cit.pageNumber}
                              </span>
                              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-700" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Not Found in Docs Warning */}
                    {structured.notFoundInDocs && (
                      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div className="text-xs">
                          <span className="font-bold block">
                            {language === 'hi' ? 'आधिकारिक दस्तावेज़ में उल्लेख नहीं' : 'Unverified / Not Found in Guidelines'}
                          </span>
                          <span>
                            {language === 'hi'
                              ? 'योजना सहायक मनगढ़ंत उत्तर नहीं बनाता। यदि जानकारी आधिकारिक सरकारी दस्तावेज़ में उपलब्ध नहीं है, तो हम इसकी पुष्टि नहीं करते।'
                              : 'Yojana Sahayak strictly adheres to anti-hallucination standards. If information is absent from official gazettes, we state it transparently.'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* User Avatar */}
              {isUser && (
                <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex gap-3 justify-start items-center">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-900 text-white flex items-center justify-center shrink-0 animate-pulse">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs px-4 py-3 shadow-2xs flex items-center gap-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>
              </div>
              <span className="text-xs font-medium text-slate-500">
                {loadingStage || (language === 'hi' ? 'उत्तर तैयार किया जा रहा है...' : 'Synthesizing verified response...')}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Follow-ups Bar */}
      <div className="pt-2 pb-1 shrink-0 flex items-center gap-1.5 overflow-x-auto text-xs text-slate-500">
        <span className="font-medium shrink-0 text-slate-400">
          {language === 'hi' ? 'सुझाव:' : 'Suggestions:'}
        </span>
        {quickFollowUps.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt)}
            disabled={loading}
            className="shrink-0 bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full text-xs font-medium transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-md shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          {/* Voice input button */}
          <button
            type="button"
            onClick={toggleSpeechRecognition}
            className={`p-2.5 rounded-xl transition-all ${
              isListening
                ? 'bg-red-600 text-white animate-pulse'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
            title={isListening ? 'Listening...' : 'Voice Input (Speech-to-Text)'}
          >
            {isListening ? <Mic className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text input */}
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
            className="flex-1 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>{language === 'hi' ? 'भेजें' : 'Send'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-1 px-2 flex items-center justify-between text-[10px] text-slate-400">
          <span>
            {language === 'hi' 
              ? 'प्रत्येक उत्तर केवल आधिकारिक सरकारी दस्तावेजों पर आधारित है।' 
              : 'Every response is grounded in official government gazettes.'}
          </span>
          <span className="hidden sm:inline font-medium">
            AI Assistant + RAG
          </span>
        </div>
      </div>
    </div>
  );
};
