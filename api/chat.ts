import type { IncomingMessage, ServerResponse } from 'http';
import { generateGroundedResponse } from '../server/ragEngine.js';

export default async function handler(req: any, res: any) {
  // Enable CORS if ever needed, though same-origin is preferred
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message, language, schemeFocusId, conversationHistory } = req.body || {};
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message query is required' });
    }

    const structuredResult = await generateGroundedResponse(
      message, 
      language, 
      schemeFocusId, 
      conversationHistory
    );

    return res.status(200).json(structuredResult);
  } catch (error) {
    console.error('Vercel API /api/chat error:', error);
    return res.status(500).json({
      error: 'Failed to process RAG query',
      details: error instanceof Error ? error.message : 'Unknown server error'
    });
  }
}
