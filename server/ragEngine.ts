import { GoogleGenAI, Type } from '@google/genai';
import { DEFAULT_SCHEMES } from '../src/data/defaultSchemes.js';
import { Language, SchemeChunk, SourceCitation, StructuredAIResponse } from '../src/types/index.js';

// In-memory knowledge base of chunks that can also be dynamically modified via Admin API
let activeChunks: SchemeChunk[] = [];

// Initialize chunks from default schemes
export function initializeKnowledgeBase() {
  activeChunks = [];
  for (const scheme of DEFAULT_SCHEMES) {
    if (scheme.chunks && scheme.chunks.length > 0) {
      activeChunks.push(...scheme.chunks);
    }
  }
}

// Reset knowledge base to original official guidelines
export function resetKnowledgeBase() {
  initializeKnowledgeBase();
  return activeChunks.length;
}

export function getAllChunks(): SchemeChunk[] {
  if (activeChunks.length === 0) {
    initializeKnowledgeBase();
  }
  return [...activeChunks];
}

export function addDocumentChunk(chunk: SchemeChunk) {
  if (activeChunks.length === 0) {
    initializeKnowledgeBase();
  }
  activeChunks.push(chunk);
}

export function removeDocumentChunk(id: string): boolean {
  const initialLength = activeChunks.length;
  activeChunks = activeChunks.filter(c => c.id !== id);
  return activeChunks.length < initialLength;
}

// Language detector: English, Hindi, or Hinglish
export function detectLanguage(query: string): Language {
  const hindiRegex = /[\u0900-\u097F]/;
  if (hindiRegex.test(query)) {
    return 'hi';
  }

  const hinglishMarkers = [
    'kya', 'kaun', 'hai', 'hain', 'mujhe', 'batao', 'kaise', 'milega', 'chahiye',
    'yojana', 'dastavej', 'kisan', 'aavedan', 'patra', 'paisa', 'kitna', 'nahi',
    'karein', 'kare', 'sakta', 'sakti', 'hoon', 'mera', 'meri', 'karega', 'ke liye'
  ];

  const lowerQuery = query.toLowerCase();
  const words = lowerQuery.split(/\s+/);
  const hinglishCount = words.filter(w => hinglishMarkers.includes(w)).length;

  if (hinglishCount >= 1 || (words.length <= 4 && hinglishCount > 0)) {
    return 'hinglish';
  }

  return 'en';
}

// Extract keywords & identify potential scheme matches
export function analyzeQuery(query: string): {
  tokens: string[];
  targetedSchemeId?: string;
  intent: 'eligibility' | 'documents' | 'benefits' | 'apply' | 'general';
} {
  const lower = query.toLowerCase();
  
  // Scheme matching
  let targetedSchemeId: string | undefined;
  if (/kisan|pm-kisan|pmkisan|farmer|कृषि|किसान/i.test(lower)) targetedSchemeId = 'pm-kisan';
  else if (/ayushman|pm-jay|pmjay|health insurance|hospital|५ लाख|5 lakh|आरोग्य/i.test(lower)) targetedSchemeId = 'pm-jay';
  else if (/awas|housing|pmay|pucca house|makan|आवास|मकान/i.test(lower)) targetedSchemeId = 'pm-awas';
  else if (/mudra|loan|shishu|kishore|tarun|व्यापार|मुद्रा|ऋण/i.test(lower)) targetedSchemeId = 'pm-mudra';
  else if (/sukanya|ssy|girl child|beti|सुकन्या|बेटी/i.test(lower)) targetedSchemeId = 'sukanya-samriddhi';
  else if (/vishwakarma|artisan|carpenter|blacksmith|toolkit|कारीगर|विश्वकर्मा|दस्तकार/i.test(lower)) targetedSchemeId = 'pm-vishwakarma';
  else if (/surya|solar|bijli|electricity|300 unit|सोलर|बिजली|सूर्य घर/i.test(lower)) targetedSchemeId = 'pm-surya-ghar';
  else if (/atal|pension|apy|retirement|वृद्धावस्था|अटल पेंशन/i.test(lower)) targetedSchemeId = 'atal-pension';
  else if (/nmmss|scholarship|student|merit|school|छात्रवृत्ति|विद्यार्थी/i.test(lower)) targetedSchemeId = 'nmmss-scholarship';
  else if (/ujjwala|gas|cylinder|lpg|stove|उज्ज्वला|गैस/i.test(lower)) targetedSchemeId = 'pm-ujjwala';

  // Intent matching
  let intent: 'eligibility' | 'documents' | 'benefits' | 'apply' | 'general' = 'general';
  if (/eligible|eligibility|qualify|age|income limit|patra|patrata|paatr|पात्र|योग्यता|शर्तें/i.test(lower)) {
    intent = 'eligibility';
  } else if (/document|documents|paper|papers|aadhaar|certificate|dastavej|kagaz|दस्तावेज|कागजात|पहचान/i.test(lower)) {
    intent = 'documents';
  } else if (/benefit|benefits|amount|money|rupees|installment|coverage|subsidy|labh|paisa|milega|लाभ|रुपये|किस्त|सब्सिडी/i.test(lower)) {
    intent = 'benefits';
  } else if (/apply|how to apply|application|portal|process|steps|kaise kare|aavedan|आवेदन|प्रक्रिया|कैसे करें/i.test(lower)) {
    intent = 'apply';
  }

  // Tokenization and stopword removal
  const rawTokens = lower
    .replace(/[^\w\s\u0900-\u097F]/gi, ' ')
    .split(/\s+/)
    .filter(t => t.length > 1);

  return { tokens: rawTokens, targetedSchemeId, intent };
}

// Hindi & English synonym map for high-precision hybrid retrieval
const SYNONYMS: Record<string, string[]> = {
  'eligible': ['eligibility', 'qualify', 'पात्र', 'पात्रता', 'योग्यता', 'criteria', 'conditions'],
  'पात्रता': ['eligible', 'eligibility', 'qualify', 'पात्र', 'criteria', 'conditions'],
  'document': ['documents', 'certificate', 'aadhaar', 'ration', 'दस्तावेज', 'कागजात', 'प्रमाण'],
  'दस्तावेज': ['documents', 'document', 'certificate', 'aadhaar', 'कागजात'],
  'benefit': ['benefits', 'amount', 'coverage', 'subsidy', 'लाभ', 'पैसा', 'किस्त', 'सहायता'],
  'लाभ': ['benefit', 'benefits', 'amount', 'subsidy', 'पैसा', 'किस्त'],
  'apply': ['application', 'process', 'steps', 'portal', 'आवेदन', 'पंजीकरण', 'कैसे करें'],
  'आवेदन': ['apply', 'application', 'process', 'steps', 'portal', 'पंजीकरण'],
  'farmer': ['kisan', 'agriculture', 'land', 'किसान', 'खेती', 'भूमि'],
  'किसान': ['farmer', 'kisan', 'agriculture', 'land', 'खेती', 'भूमि'],
  'health': ['hospital', 'ayushman', 'treatment', 'स्वास्थ्य', 'इलाज', 'अस्पताल', 'बीमा'],
  'scholarship': ['student', 'education', 'merit', 'छात्रवृत्ति', 'पढ़ाई', 'छात्र'],
  'loan': ['credit', 'mudra', 'business', 'ऋण', 'लोन', 'उद्यम'],
  'solar': ['electricity', 'power', 'surya', 'सौर', 'सोलर', 'बिजली'],
  'pension': ['retirement', 'apy', 'पेंशन', 'वृद्धावस्था'],
  'house': ['housing', 'awas', 'pmay', 'मकान', 'आवास', 'घर']
};

export function retrieveRelevantChunks(query: string, maxResults: number = 4): {
  chunks: SchemeChunk[];
  citations: SourceCitation[];
  bestScore: number;
} {
  const allChunks = getAllChunks();
  const analysis = analyzeQuery(query);
  const { tokens, targetedSchemeId, intent } = analysis;

  // Build expanded token set using synonyms
  const queryTokenSet = new Set<string>();
  for (const t of tokens) {
    queryTokenSet.add(t);
    for (const [key, synList] of Object.entries(SYNONYMS)) {
      if (t === key || synList.includes(t)) {
        synList.forEach(s => queryTokenSet.add(s.toLowerCase()));
        queryTokenSet.add(key.toLowerCase());
      }
    }
  }

  // Score each chunk
  const scored = allChunks.map(chunk => {
    let score = 0;
    const chunkText = `${chunk.documentTitle} ${chunk.section} ${chunk.content} ${chunk.contentHindi || ''} ${chunk.keywords.join(' ')}`.toLowerCase();

    // Check targeted scheme
    if (targetedSchemeId && chunk.schemeId === targetedSchemeId) {
      score += 15;
    }

    // Check intent matching in section title
    if (intent === 'eligibility' && /eligibility|criteria|पात्रता|definition/i.test(chunk.section)) {
      score += 8;
    }
    if (intent === 'documents' && /document|checklist|दस्तावेज|registration|enrolment/i.test(chunk.section)) {
      score += 8;
    }
    if (intent === 'benefits' && /benefit|subsidy|amount|लाभ|financial/i.test(chunk.section)) {
      score += 8;
    }
    if (intent === 'apply' && /apply|process|application|steps|portal|आवेदन/i.test(chunk.section)) {
      score += 8;
    }

    // Check token occurrences
    for (const token of queryTokenSet) {
      if (token.length <= 2) continue;
      if (chunk.keywords.some(k => k.toLowerCase() === token)) {
        score += 4;
      } else if (chunkText.includes(token)) {
        score += 2;
      }
    }

    return { chunk, score };
  });

  // Sort descending
  scored.sort((a, b) => b.score - a.score);

  const bestScore = scored.length > 0 ? scored[0].score : 0;

  // Filter top results that meet minimum threshold
  const filtered = scored.filter(item => item.score >= 5).slice(0, maxResults);
  const selectedChunks = filtered.map(item => item.chunk);

  const citations: SourceCitation[] = filtered.map(item => ({
    id: item.chunk.id,
    schemeId: item.chunk.schemeId,
    schemeName: item.chunk.schemeName,
    documentTitle: item.chunk.documentTitle,
    section: item.chunk.section,
    pageNumber: item.chunk.pageNumber,
    excerpt: item.chunk.content.substring(0, 180) + '...',
    officialUrl: item.chunk.officialUrl,
    relevanceScore: item.score
  }));

  return { chunks: selectedChunks, citations, bestScore };
}

// Model configuration with default fallback
const ACTIVE_GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

// Generate grounded RAG response via Gemini
export async function generateGroundedResponse(
  query: string,
  userLanguage?: Language,
  schemeFocusId?: string,
  conversationHistory?: Array<{ sender: string; text: string }>
): Promise<StructuredAIResponse> {
  const lang = userLanguage || detectLanguage(query);
  
  // If the query contains pronouns like "this scheme", "is yojana", etc.
  // check conversation history to deduce the active scheme
  let contextualSchemeId = schemeFocusId;
  if (!contextualSchemeId && conversationHistory && conversationHistory.length > 0) {
    const isContextualQuery = /this scheme|this|it|is yojana|is scheme|is yojana mein|isme|is me|is ke liye/i.test(query);
    if (isContextualQuery) {
      // Look backwards in history for mentioned schemes
      for (let i = conversationHistory.length - 1; i >= 0; i--) {
        const histAnalysis = analyzeQuery(conversationHistory[i].text);
        if (histAnalysis.targetedSchemeId) {
          contextualSchemeId = histAnalysis.targetedSchemeId;
          break;
        }
      }
    }
  }

  // Retrieve top relevant chunks from official knowledge base
  const { chunks, citations, bestScore } = retrieveRelevantChunks(
    contextualSchemeId ? `${contextualSchemeId} ${query}` : query, 
    4
  );

  // If no chunks match or score is below threshold, return strict "not found"
  if (chunks.length === 0 || bestScore < 4) {
    if (lang === 'hi') {
      return {
        answer: 'उपलब्ध आधिकारिक दस्तावेजों में यह जानकारी नहीं मिली।',
        sources: [],
        detectedLanguage: 'hi',
        confidenceNotice: 'यह जानकारी हमारे आधिकारिक सरकारी डाटाबेस में उपलब्ध नहीं है। कृपया संबंधित मंत्रालय के पोर्टल पर जांचें।',
        notFoundInDocs: true
      };
    } else if (lang === 'hinglish') {
      return {
        answer: 'Hamein available official government documents mein yeh jankari nahi mili.',
        sources: [],
        detectedLanguage: 'hinglish',
        confidenceNotice: 'Official scheme documents mein iska ullekh nahi mila. Kripya official portal check karein.',
        notFoundInDocs: true
      };
    } else {
      return {
        answer: "I couldn't find this information in the available official documents.",
        sources: [],
        detectedLanguage: 'en',
        confidenceNotice: 'The requested information was not located within the indexed official government scheme guidelines.',
        notFoundInDocs: true
      };
    }
  }

  // Check if Gemini API Key is available
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    // Generate grounded deterministic response from indexed knowledge base
    return generateFallbackGroundedResponse(query, lang, chunks, citations);
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const contextFormatted = chunks.map((c, idx) => `
[DOCUMENT ${idx + 1}]
Scheme: ${c.schemeName}
Document Title: ${c.documentTitle}
Section: ${c.section}
Page Number: ${c.pageNumber}
Content (English):
${c.content}
${c.contentHindi ? `Content (Hindi):\n${c.contentHindi}` : ''}
Official URL: ${c.officialUrl || 'N/A'}
-------------------------`).join('\n');

    const systemInstruction = `You are "Yojana Sahayak", an official AI assistant designed for Indian citizens to understand government schemes.
CORE RULES:
1. Grounding: You must answer using the provided retrieved context ONLY. Do NOT invent or assume facts or rules.
2. Missing Info: If the required information cannot be found in the provided context, you MUST state: "I couldn't find this information in the available official documents." (or in Hindi: "उपलब्ध आधिकारिक दस्तावेजों में यह जानकारी नहीं मिली।"). Do NOT hallucinate.
3. Citations: Every factual statement must cite the source document name, section, and page number from the context.
4. Language Matching: Answer in the same language as the user query.
   - If user asks in Hindi (Devanagari), answer in pure, easy-to-understand Hindi.
   - If user asks in English, answer in English.
   - If user asks in Hinglish (Roman Hindi, e.g. "Mujhe batao kya main eligible hoon?"), answer in conversational Hinglish or accessible Hindi.
5. Structured Formatting:
   - Provide a direct clear answer.
   - If eligibility was asked or relevant, break down eligibility criteria clearly.
   - If documents were asked or relevant, provide a clean list of required documents.
   - If benefits were asked or relevant, explain the financial/welfare benefits.
   - If application process is relevant, explain the application steps.
   - List the cited sources matching the document names and page numbers from the context.`;

    const prompt = `User Query: "${query}"
Detected Language: ${lang}

OFFICIAL RETRIEVED CONTEXT:
${contextFormatted}

Generate a grounded JSON response following the schema.`;

    const generatePromise = ai.models.generateContent({
      model: ACTIVE_GEMINI_MODEL,
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: {
              type: Type.STRING,
              description: 'Direct, clear answer to the user query based ONLY on the context.'
            },
            eligibility: {
              type: Type.STRING,
              description: 'Eligibility requirements if applicable.'
            },
            documentsRequired: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'List of required documents checklist.'
            },
            benefits: {
              type: Type.STRING,
              description: 'Explanation of scheme benefits.'
            },
            applicationProcess: {
              type: Type.STRING,
              description: 'Steps to apply.'
            },
            sources: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  documentTitle: { type: Type.STRING },
                  section: { type: Type.STRING },
                  pageNumber: { type: Type.INTEGER },
                  excerpt: { type: Type.STRING }
                },
                required: ['documentTitle', 'section', 'pageNumber']
              }
            },
            notFoundInDocs: {
              type: Type.BOOLEAN,
              description: 'True if the answer could not be verified in the documents.'
            }
          },
          required: ['answer', 'sources']
        }
      }
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Gemini API call timed out after 6 seconds')), 6000)
    );

    const response = await Promise.race([generatePromise, timeoutPromise]);

    const parsed = JSON.parse(response.text || '{}');
    
    // Merge returned citations with original chunk metadata for clickable accuracy
    const mappedSources: SourceCitation[] = (parsed.sources || []).map((s: any, idx: number) => {
      const matchedChunk = chunks.find(c => 
        c.pageNumber === s.pageNumber || 
        c.section.toLowerCase().includes((s.section || '').toLowerCase()) ||
        c.documentTitle.toLowerCase().includes((s.documentTitle || '').toLowerCase())
      ) || chunks[idx % chunks.length];

      return {
        id: matchedChunk?.id || `src-${idx}`,
        schemeId: matchedChunk?.schemeId || 'govt-scheme',
        schemeName: matchedChunk?.schemeName || 'Government Scheme',
        documentTitle: s.documentTitle || matchedChunk?.documentTitle || 'Official Scheme Guidelines',
        section: s.section || matchedChunk?.section || 'Guidelines',
        pageNumber: s.pageNumber || matchedChunk?.pageNumber || 1,
        excerpt: s.excerpt || matchedChunk?.content.substring(0, 160) + '...',
        officialUrl: matchedChunk?.officialUrl
      };
    });

    return {
      answer: parsed.answer,
      eligibility: parsed.eligibility,
      documentsRequired: parsed.documentsRequired,
      benefits: parsed.benefits,
      applicationProcess: parsed.applicationProcess,
      sources: mappedSources.length > 0 ? mappedSources : citations,
      detectedLanguage: lang,
      confidenceNotice: 'Grounded in official government guidelines.',
      notFoundInDocs: parsed.notFoundInDocs || false
    };

  } catch (error) {
    console.error('Gemini API Error, using deterministic grounded fallback:', error);
    return generateFallbackGroundedResponse(query, lang, chunks, citations);
  }
}

// Deterministic grounded response fallback from indexed chunks
function generateFallbackGroundedResponse(
  query: string,
  lang: Language,
  chunks: SchemeChunk[],
  citations: SourceCitation[]
): StructuredAIResponse {
  const primaryChunk = chunks[0];
  const primaryScheme = DEFAULT_SCHEMES.find(s => s.id === primaryChunk.schemeId) || DEFAULT_SCHEMES[0];
  const analysis = analyzeQuery(query);

  let answer = '';
  let eligibility = '';
  let documentsRequired: string[] = [];
  let benefits = '';
  let applicationProcess = '';

  if (lang === 'hi') {
    if (analysis.intent === 'eligibility') {
      answer = `आधिकारिक दिशानिर्देशों के अनुसार, ${primaryScheme.hindiName} की पात्रता निम्नलिखित शर्तों पर आधारित है:`;
      eligibility = primaryScheme.eligibility.summaryHindi;
      documentsRequired = primaryScheme.documents.map(d => `${d.nameHindi} - (${d.purposeHindi})`);
    } else if (analysis.intent === 'documents') {
      answer = `${primaryScheme.hindiName} के लिए निम्नलिखित आधिकारिक दस्तावेज आवश्यक हैं:`;
      documentsRequired = primaryScheme.documents.map(d => `${d.nameHindi} (${d.required ? 'अनिवार्य' : 'वैकल्पिक'})`);
    } else if (analysis.intent === 'benefits') {
      answer = `${primaryScheme.hindiName} के अंतर्गत निम्नलिखित लाभ निर्धारित हैं:`;
      benefits = primaryScheme.benefitHighlightHindi;
    } else if (analysis.intent === 'apply') {
      answer = `${primaryScheme.hindiName} में आवेदन करने की प्रक्रिया निम्नलिखित है:`;
      applicationProcess = primaryScheme.applicationSteps.map(s => `${s.stepNumber}. ${s.titleHindi}: ${s.detailsHindi}`).join('\n\n');
    } else {
      answer = primaryChunk.contentHindi || primaryChunk.content;
      eligibility = primaryScheme.eligibility.summaryHindi;
      benefits = primaryScheme.benefitHighlightHindi;
    }
  } else if (lang === 'hinglish') {
    if (analysis.intent === 'eligibility') {
      answer = `Official guidelines ke mutabik, ${primaryScheme.name} ke liye eligibility criteria yeh hai:`;
      eligibility = primaryScheme.eligibility.summary;
      documentsRequired = primaryScheme.documents.map(d => `${d.name} (${d.purpose})`);
    } else if (analysis.intent === 'documents') {
      answer = `${primaryScheme.name} ke liye official documents ki requirement yeh hai:`;
      documentsRequired = primaryScheme.documents.map(d => `${d.name} (${d.required ? 'Mandatory' : 'Optional'})`);
    } else if (analysis.intent === 'benefits') {
      answer = `${primaryScheme.name} ke main benefits is tarah hain:`;
      benefits = primaryScheme.benefitHighlight;
    } else if (analysis.intent === 'apply') {
      answer = `${primaryScheme.name} mein aavedan karne ke official steps:`;
      applicationProcess = primaryScheme.applicationSteps.map(s => `Step ${s.stepNumber} - ${s.title}: ${s.details}`).join('\n\n');
    } else {
      answer = `${primaryScheme.name} ki verified jankari official document se retrieve ki gayi hai: ${primaryChunk.content}`;
      eligibility = primaryScheme.eligibility.summary;
      benefits = primaryScheme.benefitHighlight;
    }
  } else {
    // English
    if (analysis.intent === 'eligibility') {
      answer = `Based on the official operational guidelines for ${primaryScheme.name}, the eligibility criteria are as follows:`;
      eligibility = primaryScheme.eligibility.summary;
      documentsRequired = primaryScheme.documents.map(d => `${d.name} (${d.purpose})`);
    } else if (analysis.intent === 'documents') {
      answer = `The following official documents are required for ${primaryScheme.name}:`;
      documentsRequired = primaryScheme.documents.map(d => `${d.name} (${d.required ? 'Mandatory' : 'Optional'}) - ${d.purpose}`);
    } else if (analysis.intent === 'benefits') {
      answer = `The official benefits provided under ${primaryScheme.name} are as follows:`;
      benefits = primaryScheme.benefitHighlight;
    } else if (analysis.intent === 'apply') {
      answer = `To apply for ${primaryScheme.name}, follow these official steps:`;
      applicationProcess = primaryScheme.applicationSteps.map(s => `Step ${s.stepNumber}: ${s.title} — ${s.details}`).join('\n\n');
    } else {
      answer = primaryChunk.content;
      eligibility = primaryScheme.eligibility.summary;
      benefits = primaryScheme.benefitHighlight;
    }
  }

  return {
    answer,
    eligibility: eligibility || undefined,
    documentsRequired: documentsRequired.length > 0 ? documentsRequired : undefined,
    benefits: benefits || undefined,
    applicationProcess: applicationProcess || undefined,
    sources: citations,
    detectedLanguage: lang,
    confidenceNotice: 'Grounded directly in official government guidelines.',
    notFoundInDocs: false
  };
}
