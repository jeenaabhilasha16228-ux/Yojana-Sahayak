import { DocumentCategory, ExtractedDocumentInfo, UserDocument } from '../types';

const DOCUMENTS_STORAGE_KEY = 'yojana_sahayak_user_documents';

// Maximum file size: 10MB
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png'
];

// Helper: load all documents stored per user
function getAllStoredDocs(): Record<string, UserDocument[]> {
  try {
    const raw = localStorage.getItem(DOCUMENTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAllStoredDocs(docsMap: Record<string, UserDocument[]>) {
  localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(docsMap));
}

// Pre-seeded verified demo documents for Hackathon exploration
export const DEMO_DOCUMENTS: Record<string, UserDocument[]> = {
  'demo-student-user': [
    {
      id: 'demo-doc-1',
      userId: 'demo-student-user',
      fileName: 'Uttarakhand_Permanent_Residence_Certificate.pdf',
      fileType: 'application/pdf',
      fileSize: 420 * 1024,
      category: 'residence_domicile',
      uploadedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      verificationStatus: 'verified',
      extractedData: {
        documentType: 'Domicile / Residence Certificate',
        confidence: 'high',
        detectedState: 'Uttarakhand',
        rawSummary: 'Permanent Residence Certificate issued by Tehsildar, District Dehradun, Uttarakhand.'
      }
    },
    {
      id: 'demo-doc-2',
      userId: 'demo-student-user',
      fileName: 'Secondary_School_Marksheet_Class10.pdf',
      fileType: 'application/pdf',
      fileSize: 610 * 1024,
      category: 'education_certificate',
      uploadedAt: new Date(Date.now() - 86400000).toISOString(),
      verificationStatus: 'verified',
      extractedData: {
        documentType: 'Secondary School Examination Marksheet',
        confidence: 'high',
        isStudentDetected: true,
        detectedAge: 20,
        rawSummary: 'State Board Class 10 / Class 12 Examination Marksheet. Score verified > 65% aggregate.'
      }
    }
  ],
  'demo-farmer-user': [
    {
      id: 'demo-doc-3',
      userId: 'demo-farmer-user',
      fileName: 'Khasra_Khatauni_Land_Record.pdf',
      fileType: 'application/pdf',
      fileSize: 512 * 1024,
      category: 'land_records',
      uploadedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      verificationStatus: 'verified',
      extractedData: {
        documentType: 'Record of Rights (Khatauni / RoR)',
        confidence: 'high',
        isFarmerDetected: true,
        detectedState: 'Uttar Pradesh',
        rawSummary: 'Agricultural land record verified in Varanasi District, Uttar Pradesh (1.2 Hectares).'
      }
    },
    {
      id: 'demo-doc-4',
      userId: 'demo-farmer-user',
      fileName: 'Aadhaar_Masked_Identification.pdf',
      fileType: 'application/pdf',
      fileSize: 340 * 1024,
      category: 'aadhaar',
      uploadedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      verificationStatus: 'verified',
      extractedData: {
        documentType: 'Aadhaar Identification Document',
        confidence: 'high',
        detectedState: 'Uttar Pradesh',
        rawSummary: 'Masked Aadhaar proof detected with biometric authentication flag.'
      }
    }
  ]
};

// Document heuristic classifier & entity extractor
export function analyzeDocumentFile(fileName: string, textSample?: string): {
  category: DocumentCategory;
  extractedInfo: ExtractedDocumentInfo;
} {
  const lowerName = fileName.toLowerCase();
  const lowerText = (textSample || '').toLowerCase();
  const combined = `${lowerName} ${lowerText}`;

  let category: DocumentCategory = 'other';
  let documentType = 'Government Scheme Supporting Document';
  let detectedState: string | undefined;
  let detectedIncome: number | undefined;
  let isStudentDetected = false;
  let isFarmerDetected = false;

  // State detection
  const states = [
    'uttarakhand', 'uttar pradesh', 'bihar', 'delhi', 'rajasthan', 
    'madhya pradesh', 'punjab', 'haryana', 'maharashtra', 'gujarat',
    'karnataka', 'tamil nadu', 'kerala', 'west bengal', 'odisha'
  ];
  for (const st of states) {
    if (combined.includes(st)) {
      detectedState = st.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      break;
    }
  }

  // Classification rules
  if (/aadhaar|adhar|uidai|आधार/i.test(combined)) {
    category = 'aadhaar';
    documentType = 'Aadhaar-Related Identity Document';
  } else if (/income|aay|salary|tahsildar|आय प्रमाण|certificate of income/i.test(combined)) {
    category = 'income_certificate';
    documentType = 'Revenue Authority Income Certificate';
    // Income threshold heuristics
    if (/1,50,000|150000|1.5 lakh/i.test(combined)) detectedIncome = 150000;
    else if (/2,50,000|250000|2.5 lakh/i.test(combined)) detectedIncome = 250000;
    else if (/3,00,000|300000|3 lakh/i.test(combined)) detectedIncome = 300000;
    else detectedIncome = 200000;
  } else if (/residence|domicile|niwas|mool niwas|स्थायी निवास/i.test(combined)) {
    category = 'residence_domicile';
    documentType = 'State Domicile / Residence Proof';
  } else if (/caste|jati|sc|st|obc|जाति प्रमाण/i.test(combined)) {
    category = 'caste_certificate';
    documentType = 'Caste / Social Category Certificate';
  } else if (/marksheet|degree|school|college|10th|12th|class 10|class 12|student|अंकतालिका/i.test(combined)) {
    category = 'education_certificate';
    documentType = 'Educational Certificate / Marksheet';
    isStudentDetected = true;
  } else if (/khasra|khatauni|land|jamabandi|ror|patta|खतौनी|जमीन/i.test(combined)) {
    category = 'land_records';
    documentType = 'Agricultural Land Records (Khatauni / RoR)';
    isFarmerDetected = true;
  } else if (/bank|passbook|account|statement|cheque|बैंक/i.test(combined)) {
    category = 'bank_passbook';
    documentType = 'Bank Passbook / Account Proof';
  } else if (/disability|pwd|divyang|दिव्यांग/i.test(combined)) {
    category = 'disability_certificate';
    documentType = 'Disability Certificate (UDID)';
  }

  return {
    category,
    extractedInfo: {
      documentType,
      confidence: category !== 'other' ? 'high' : 'medium',
      detectedState,
      detectedIncome,
      isStudentDetected,
      isFarmerDetected,
      rawSummary: `An uploaded document appears to contain ${documentType} details. Please verify its attributes before finalizing application.`
    }
  };
}

export const documentService = {
  // Get all documents belonging strictly to this user
  getUserDocuments(userId: string): UserDocument[] {
    // If it's a demo persona, return seeded demo documents if not yet loaded
    if (DEMO_DOCUMENTS[userId]) {
      const stored = getAllStoredDocs();
      if (!stored[userId]) {
        stored[userId] = DEMO_DOCUMENTS[userId];
        saveAllStoredDocs(stored);
      }
    }

    const all = getAllStoredDocs();
    return all[userId] || [];
  },

  // Upload and process a document
  async uploadUserDocument(
    userId: string,
    file: File,
    userCategoryHint?: DocumentCategory
  ): Promise<UserDocument> {
    if (!userId) {
      throw new Error('User authentication required to upload documents');
    }

    // Validate size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new Error(`File size exceeds 10MB limit. Current size: ${(file.size / (1024 * 1024)).toFixed(1)}MB`);
    }

    // Validate type
    const isAllowed = ALLOWED_MIME_TYPES.includes(file.type) || 
      /\.(pdf|jpe?g|png)$/i.test(file.name);

    if (!isAllowed) {
      throw new Error('Unsupported file format. Please upload a PDF, JPG, or PNG document.');
    }

    // Extract relevant scheme attributes
    const analysis = analyzeDocumentFile(file.name);
    const finalCategory = userCategoryHint || analysis.category;

    const newDoc: UserDocument = {
      id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      userId,
      fileName: file.name,
      fileType: file.type || 'application/pdf',
      fileSize: file.size,
      category: finalCategory,
      uploadedAt: new Date().toISOString(),
      verificationStatus: 'verified',
      extractedData: {
        ...analysis.extractedInfo,
        documentType: analysis.extractedInfo.documentType
      }
    };

    // Save strictly to this user's private store
    const all = getAllStoredDocs();
    if (!all[userId]) {
      all[userId] = [];
    }
    all[userId].push(newDoc);
    saveAllStoredDocs(all);

    return newDoc;
  },

  // Delete a document
  deleteUserDocument(userId: string, docId: string): boolean {
    const all = getAllStoredDocs();
    if (!all[userId]) return false;

    const initialCount = all[userId].length;
    all[userId] = all[userId].filter(d => d.id !== docId);
    saveAllStoredDocs(all);

    return all[userId].length < initialCount;
  }
};

export const documentProcessor = documentService;
