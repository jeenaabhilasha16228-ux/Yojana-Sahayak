import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { DEFAULT_SCHEMES } from './src/data/defaultSchemes.js';
import {
  generateGroundedResponse,
  getAllChunks,
  addDocumentChunk,
  removeDocumentChunk,
  resetKnowledgeBase,
  retrieveRelevantChunks
} from './server/ragEngine.js';
import { EligibilityResult, SchemeChunk, UserEligibilityProfile } from './src/types/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Yojana Sahayak RAG API',
    chunksIndexed: getAllChunks().length,
    timestamp: new Date().toISOString()
  });
});

// 1. RAG Chat Assistant Endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, language, schemeFocusId, conversationHistory } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message query is required' });
    }

    const structuredResult = await generateGroundedResponse(message, language, schemeFocusId, conversationHistory);
    return res.json(structuredResult);
  } catch (error) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({
      error: 'Failed to process RAG query',
      details: error instanceof Error ? error.message : 'Unknown server error'
    });
  }
});

// 2. Schemes Directory Endpoints
app.get('/api/schemes', (req: Request, res: Response) => {
  const { category, search } = req.query;
  let results = [...DEFAULT_SCHEMES];

  if (category && typeof category === 'string' && category !== 'all') {
    results = results.filter(s => s.category === category);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    results = results.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.hindiName.includes(q) ||
      s.shortDescription.toLowerCase().includes(q) ||
      s.shortDescriptionHindi.includes(q) ||
      s.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  res.json(results);
});

app.get('/api/schemes/:id', (req: Request, res: Response) => {
  const scheme = DEFAULT_SCHEMES.find(s => s.id === req.params.id);
  if (!scheme) {
    return res.status(404).json({ error: 'Scheme not found' });
  }
  res.json(scheme);
});

// 3. Automated Grounded Eligibility Checker Endpoint
app.post('/api/check-eligibility', (req: Request, res: Response) => {
  try {
    const profile: UserEligibilityProfile = req.body;
    const targetSchemeId = profile.selectedSchemeId;

    const schemesToEvaluate = targetSchemeId && targetSchemeId !== 'all'
      ? DEFAULT_SCHEMES.filter(s => s.id === targetSchemeId)
      : DEFAULT_SCHEMES;

    const evaluations: EligibilityResult[] = schemesToEvaluate.map(scheme => {
      const matchedCriteria: string[] = [];
      const unmatchedCriteria: string[] = [];
      const pendingQuestions: string[] = [];

      // Check scheme specific rules
      if (scheme.id === 'pm-kisan') {
        if (profile.paysIncomeTax) {
          unmatchedCriteria.push('Income Tax Payers are explicitly excluded under Section 4.');
        } else if (profile.isGovtEmployee) {
          unmatchedCriteria.push('Central/State Government employees are excluded (except Class IV).');
        } else if (profile.hasAgriculturalLand) {
          matchedCriteria.push('Holds cultivable agricultural land registered in farmer/family name.');
        } else {
          unmatchedCriteria.push('Must own cultivable agricultural land.');
        }
      } else if (scheme.id === 'pm-jay') {
        if (profile.age >= 70) {
          matchedCriteria.push('Citizen aged 70 or above qualifies unconditionally under Ayushman Vayo Vandana.');
        } else if (profile.annualIncome <= 250000 || profile.socialCategory === 'SC' || profile.socialCategory === 'ST') {
          matchedCriteria.push('Low-income / deprived socioeconomic status aligns with SECC criteria.');
        } else {
          pendingQuestions.push('Inclusion depends on SECC 2011 deprivation record or Ration Card category.');
        }
      } else if (scheme.id === 'pm-awas') {
        if (profile.annualIncome <= 300000) {
          matchedCriteria.push('Annual income qualifies under Economically Weaker Section (EWS up to ₹3 Lakh).');
        } else if (profile.annualIncome <= 600000) {
          matchedCriteria.push('Qualifies under Low Income Group (LIG ₹3-6 Lakh) interest subsidy.');
        } else if (profile.annualIncome <= 900000) {
          matchedCriteria.push('Qualifies under Middle Income Group (MIG ₹6-9 Lakh).');
        } else {
          unmatchedCriteria.push('Family annual income exceeds PMAY ceiling of ₹9 Lakh.');
        }
      } else if (scheme.id === 'pm-mudra') {
        if (profile.age >= 18 && profile.age <= 65) {
          matchedCriteria.push('Age satisfies the 18 to 65 years criterion for enterprise loan.');
        } else {
          unmatchedCriteria.push('Applicant must be between 18 and 65 years old.');
        }
        matchedCriteria.push('Micro/small business activity eligible for Shishu, Kishore, or Tarun.');
      } else if (scheme.id === 'sukanya-samriddhi') {
        if (profile.hasGirlChildUnder10) {
          matchedCriteria.push('Has a girl child below 10 years of age for account opening.');
        } else {
          unmatchedCriteria.push('Account can only be opened for a girl child aged 10 years or younger.');
        }
      } else if (scheme.id === 'pm-vishwakarma') {
        if (profile.isTraditionalArtisan && profile.age >= 18) {
          matchedCriteria.push('Working in one of the 18 recognized traditional artisan trades with hands and tools.');
        } else if (!profile.isTraditionalArtisan) {
          unmatchedCriteria.push('Must be an artisan engaged in one of the 18 specified traditional trades.');
        }
      } else if (scheme.id === 'atal-pension') {
        if (profile.paysIncomeTax) {
          unmatchedCriteria.push('Income Tax payers excluded w.e.f. October 1, 2022.');
        } else if (profile.age >= 18 && profile.age <= 40) {
          matchedCriteria.push('Age is within the permissible 18 to 40 years bracket.');
        } else {
          unmatchedCriteria.push('Applicant age must be between 18 and 40 years at entry.');
        }
      } else if (scheme.id === 'nmmss-scholarship') {
        if (profile.isStudentClass9To12 && profile.annualIncome <= 350000) {
          matchedCriteria.push('Class 9-12 student with parental annual income under ₹3.5 Lakh.');
        } else if (profile.annualIncome > 350000) {
          unmatchedCriteria.push('Parental income exceeds ₹3.5 Lakh threshold.');
        } else {
          pendingQuestions.push('Requires enrollment in Class 8/9 in Government/Aided school and qualifying exam score.');
        }
      } else if (scheme.id === 'pm-surya-ghar') {
        matchedCriteria.push('Domestic residential connection holder with terrace/rooftop space.');
      } else if (scheme.id === 'pm-ujjwala') {
        if (profile.gender === 'female' && profile.age >= 18) {
          matchedCriteria.push('Adult woman of poor household with no existing LPG connection.');
        } else {
          unmatchedCriteria.push('Connection is issued exclusively to adult women.');
        }
      }

      // Determine verdict
      let verdict: 'Likely Eligible' | 'May Not Be Eligible' | 'More Information Required' = 'Likely Eligible';
      let verdictHindi: 'पात्र होने की संभावना' | 'संभवतः पात्र नहीं' | 'अधिक जानकारी की आवश्यकता' = 'पात्र होने की संभावना';

      if (unmatchedCriteria.length > 0) {
        verdict = 'May Not Be Eligible';
        verdictHindi = 'संभवतः पात्र नहीं';
      } else if (pendingQuestions.length > 0 && matchedCriteria.length === 0) {
        verdict = 'More Information Required';
        verdictHindi = 'अधिक जानकारी की आवश्यकता';
      }

      return {
        schemeId: scheme.id,
        schemeName: scheme.name,
        schemeNameHindi: scheme.hindiName,
        verdict,
        verdictHindi,
        matchedCriteria,
        unmatchedCriteria,
        pendingQuestions,
        sourceDocument: scheme.officialDocTitle,
        sourceSection: scheme.eligibility.sourceSection,
        sourcePage: scheme.eligibility.sourcePage,
        officialUrl: scheme.officialPortal
      };
    });

    return res.json(evaluations);
  } catch (error) {
    console.error('Error in /api/check-eligibility:', error);
    return res.status(500).json({ error: 'Failed to assess eligibility' });
  }
});

// 4. Admin Knowledge Base Endpoints
app.get('/api/admin/documents', (req: Request, res: Response) => {
  const chunks = getAllChunks();
  const schemesCovered = Array.from(new Set(chunks.map(c => c.schemeName)));
  const totalPages = Array.from(new Set(chunks.map(c => `${c.schemeId}-${c.pageNumber}`))).length;

  res.json({
    totalChunks: chunks.length,
    schemesCovered: schemesCovered.length,
    uniquePagesIndexed: totalPages,
    schemesList: schemesCovered,
    chunks: chunks
  });
});

app.post('/api/admin/documents', (req: Request, res: Response) => {
  try {
    const { schemeId, schemeName, documentTitle, section, pageNumber, content, contentHindi, keywords, officialUrl } = req.body;

    if (!schemeName || !documentTitle || !section || !content) {
      return res.status(400).json({ error: 'Missing mandatory fields: schemeName, documentTitle, section, content' });
    }

    const newChunk: SchemeChunk = {
      id: `custom-doc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      schemeId: schemeId || 'custom-scheme',
      schemeName,
      documentTitle,
      section,
      pageNumber: Number(pageNumber) || 1,
      content,
      contentHindi: contentHindi || undefined,
      officialUrl: officialUrl || undefined,
      keywords: Array.isArray(keywords) ? keywords : (keywords || '').split(',').map((k: string) => k.trim()).filter(Boolean)
    };

    addDocumentChunk(newChunk);

    return res.status(201).json({
      success: true,
      message: 'Document guideline chunk indexed successfully',
      chunk: newChunk,
      totalChunksNow: getAllChunks().length
    });
  } catch (error) {
    console.error('Error adding document chunk:', error);
    return res.status(500).json({ error: 'Failed to index document chunk' });
  }
});

app.delete('/api/admin/documents/:id', (req: Request, res: Response) => {
  const success = removeDocumentChunk(req.params.id);
  if (!success) {
    return res.status(404).json({ error: 'Document chunk not found' });
  }
  res.json({ success: true, message: 'Document removed from knowledge base' });
});

app.post('/api/admin/reset', (req: Request, res: Response) => {
  const total = resetKnowledgeBase();
  res.json({ success: true, message: 'Knowledge base reset to official default guidelines', totalChunks: total });
});

// Test retrieval endpoint for admin inspector
app.get('/api/admin/test-search', (req: Request, res: Response) => {
  const query = (req.query.q as string) || '';
  const results = retrieveRelevantChunks(query, 5);
  res.json(results);
});

// Mount Vite or static dist
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[Yojana Sahayak Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
