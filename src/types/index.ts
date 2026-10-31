export type Language = 'en' | 'hi' | 'hinglish';

export interface SchemeChunk {
  id: string;
  schemeId: string;
  schemeName: string;
  documentTitle: string;
  section: string;
  pageNumber: number;
  content: string;
  contentHindi?: string;
  officialUrl?: string;
  keywords: string[];
}

export interface Scheme {
  id: string;
  name: string;
  hindiName: string;
  shortCode: string;
  ministry: string;
  ministryHindi: string;
  category: 
    | 'agriculture'
    | 'healthcare'
    | 'housing'
    | 'employment'
    | 'women_child'
    | 'education'
    | 'finance'
    | 'senior_citizens'
    | 'energy';
  shortDescription: string;
  shortDescriptionHindi: string;
  benefitHighlight: string;
  benefitHighlightHindi: string;
  targetAudience: string;
  targetAudienceHindi: string;
  officialPortal: string;
  officialDocTitle: string;
  applicationMode: 'online' | 'offline' | 'both';
  tags: string[];
  
  // Structured criteria for automated eligibility matching
  eligibility: {
    minAge?: number;
    maxAge?: number;
    gender?: 'all' | 'female' | 'male';
    targetCategories?: string[]; // e.g. ['Farmer', 'Artisan', 'Student', 'Low Income', 'Girl Child', 'Senior Citizen']
    maxAnnualIncome?: number; // In INR (e.g. 250000)
    landOwnershipRequired?: boolean;
    excludedOccupations?: string[]; // e.g. ['Income Tax Payers', 'Government Employees', 'Institutional Landholders']
    summary: string;
    summaryHindi: string;
    sourceSection: string;
    sourcePage: number;
  };
  
  // Required documents
  documents: Array<{
    name: string;
    nameHindi: string;
    required: boolean;
    purpose: string;
    purposeHindi: string;
    sourcePage: number;
    sourceSection: string;
  }>;
  
  // Benefits breakdown
  benefits: Array<{
    title: string;
    titleHindi: string;
    amountOrCoverage: string;
    frequency: string;
    frequencyHindi: string;
  }>;
  
  // Application steps
  applicationSteps: Array<{
    stepNumber: number;
    title: string;
    titleHindi: string;
    details: string;
    detailsHindi: string;
  }>;
  
  // Chunks for RAG retrieval
  chunks: SchemeChunk[];
}

export interface SourceCitation {
  id: string;
  schemeId: string;
  schemeName: string;
  documentTitle: string;
  section: string;
  pageNumber: number;
  excerpt: string;
  officialUrl?: string;
  relevanceScore?: number;
}

export interface StructuredAIResponse {
  answer: string;
  eligibility?: string;
  documentsRequired?: string[];
  benefits?: string;
  applicationProcess?: string;
  sources: SourceCitation[];
  detectedLanguage?: 'en' | 'hi' | 'hinglish';
  confidenceNotice?: string;
  notFoundInDocs?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  structuredResponse?: StructuredAIResponse;
  citedSources?: SourceCitation[];
  relevantSchemeId?: string;
  language?: Language;
}

export interface UserEligibilityProfile {
  age: number;
  gender: 'male' | 'female' | 'other';
  state: string;
  occupation: string;
  socialCategory: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  annualIncome: number;
  isFarmer: boolean;
  hasAgriculturalLand: boolean;
  hasGirlChildUnder10: boolean;
  isTraditionalArtisan: boolean;
  isStudentClass9To12: boolean;
  paysIncomeTax: boolean;
  isGovtEmployee: boolean;
  selectedSchemeId?: string;
}

export interface EligibilityResult {
  schemeId: string;
  schemeName: string;
  schemeNameHindi: string;
  verdict: 'Likely Eligible' | 'May Not Be Eligible' | 'More Information Required';
  verdictHindi: 'पात्र होने की संभावना' | 'संभवतः पात्र नहीं' | 'अधिक जानकारी की आवश्यकता';
  matchedCriteria: string[];
  unmatchedCriteria: string[];
  pendingQuestions: string[];
  sourceDocument: string;
  sourceSection: string;
  sourcePage: number;
  officialUrl: string;
}
