import { DEFAULT_SCHEMES } from '../src/data/defaultSchemes.js';

export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { category, search } = req.query || {};
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

  return res.status(200).json(results);
}
