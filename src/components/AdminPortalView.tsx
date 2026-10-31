import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Upload, 
  Trash2, 
  Plus, 
  Search, 
  CheckCircle2, 
  RefreshCw, 
  FileText, 
  BookOpen, 
  Sliders, 
  ShieldCheck, 
  Cpu, 
  Layers,
  ExternalLink
} from 'lucide-react';
import { Language, SchemeChunk, SourceCitation } from '../types';

interface AdminPortalViewProps {
  language: Language;
  onOpenSourceModal: (citation: SourceCitation) => void;
}

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({
  language,
  onOpenSourceModal,
}) => {
  const [chunks, setChunks] = useState<SchemeChunk[]>([]);
  const [stats, setStats] = useState({
    totalChunks: 0,
    schemesCovered: 0,
    uniquePagesIndexed: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');

  // New Chunk Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSchemeName, setNewSchemeName] = useState('');
  const [newSchemeId, setNewSchemeId] = useState('');
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newSection, setNewSection] = useState('');
  const [newPageNumber, setNewPageNumber] = useState<number>(1);
  const [newContent, setNewContent] = useState('');
  const [newContentHindi, setNewContentHindi] = useState('');
  const [newOfficialUrl, setNewOfficialUrl] = useState('');
  const [newKeywords, setNewKeywords] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Semantic Retrieval Tester State
  const [testQuery, setTestQuery] = useState('');
  const [testResults, setTestResults] = useState<any | null>(null);
  const [testingSearch, setTestingSearch] = useState(false);

  const fetchChunks = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/documents');
      const data = await res.json();
      setChunks(data.chunks || []);
      setStats({
        totalChunks: data.totalChunks || 0,
        schemesCovered: data.schemesCovered || 0,
        uniquePagesIndexed: data.uniquePagesIndexed || 0
      });
    } catch (err) {
      console.error('Failed to load chunks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChunks();
  }, []);

  const handleAddChunk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchemeName || !newDocTitle || !newSection || !newContent) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schemeId: newSchemeId || newSchemeName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          schemeName: newSchemeName,
          documentTitle: newDocTitle,
          section: newSection,
          pageNumber: Number(newPageNumber) || 1,
          content: newContent,
          contentHindi: newContentHindi || undefined,
          officialUrl: newOfficialUrl || undefined,
          keywords: newKeywords.split(',').map(k => k.trim()).filter(Boolean)
        })
      });

      if (!res.ok) throw new Error('Failed to index document');

      setActionNotice(language === 'hi' ? 'दस्तावेज़ सफलतापूर्वक इंडेक्स हुआ!' : 'Document guideline chunk indexed successfully!');
      setTimeout(() => setActionNotice(null), 3000);

      // Reset form
      setNewSchemeName('');
      setNewSchemeId('');
      setNewDocTitle('');
      setNewSection('');
      setNewContent('');
      setNewContentHindi('');
      setNewOfficialUrl('');
      setNewKeywords('');
      setShowAddForm(false);

      fetchChunks();
    } catch (err) {
      console.error(err);
      alert('Error indexing document');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(language === 'hi' ? 'क्या आप इस दस्तावेज़ खंड को हटाना चाहते हैं?' : 'Are you sure you want to delete this chunk?')) return;

    try {
      const res = await fetch(`/api/admin/documents/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setActionNotice(language === 'hi' ? 'दस्तावेज़ हटा दिया गया।' : 'Document chunk deleted.');
        setTimeout(() => setActionNotice(null), 3000);
        fetchChunks();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = async () => {
    if (!confirm(language === 'hi' ? 'क्या आप ज्ञान केंद्र को आधिकारिक डिफ़ॉल्ट पर रीसेट करना चाहते हैं?' : 'Reset knowledge base to default official guidelines?')) return;

    try {
      const res = await fetch('/api/admin/reset', { method: 'POST' });
      if (res.ok) {
        setActionNotice(language === 'hi' ? 'ज्ञान केंद्र रीसेट कर दिया गया।' : 'Knowledge base reset to official default benchmark.');
        setTimeout(() => setActionNotice(null), 3000);
        fetchChunks();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTestSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testQuery.trim()) return;

    setTestingSearch(true);
    try {
      const res = await fetch(`/api/admin/test-search?q=${encodeURIComponent(testQuery)}`);
      const data = await res.json();
      setTestResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setTestingSearch(false);
    }
  };

  const filteredChunks = chunks.filter(c => {
    const q = searchFilter.toLowerCase();
    return !q ||
      c.schemeName.toLowerCase().includes(q) ||
      c.documentTitle.toLowerCase().includes(q) ||
      c.section.toLowerCase().includes(q) ||
      c.content.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-md">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold border border-blue-400/30">
            <Database className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'प्रशासन एवं आरएजी ज्ञान केंद्र' : 'Knowledge Base & RAG Index Manager'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {language === 'hi' ? 'सरकारी दस्तावेज़ प्रबंधन केंद्र' : 'Official Document Knowledge Base'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {language === 'hi'
              ? 'आधिकारिक सरकारी पीडीएफ फाइलों, दिशानिर्देशों और नियमों को इंडेक्स करें। हमारा RAG इंजन केवल इन्हीं सत्यापित दस्तावेजों से उत्तर प्रदान करता है।'
              : 'Index official government PDFs, guidelines, and gazettes. The RAG pipeline queries and cites these chunks to guarantee zero hallucinations.'}
          </p>
        </div>
      </div>

      {actionNotice && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            {language === 'hi' ? 'कुल इंडेक्स किए गए खंड' : 'Total Chunks Indexed'}
          </span>
          <div className="text-3xl font-black text-slate-900 mt-1 flex items-baseline gap-2">
            <span>{stats.totalChunks}</span>
            <span className="text-xs text-blue-700 font-semibold">Active in Memory</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            {language === 'hi' ? 'योजनाएं शामिल' : 'Schemes Covered'}
          </span>
          <div className="text-3xl font-black text-slate-900 mt-1 flex items-baseline gap-2">
            <span>{stats.schemesCovered}</span>
            <span className="text-xs text-indigo-700 font-semibold">Ministries</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            {language === 'hi' ? 'विशिष्ट पृष्ठ संदर्भ' : 'Unique Cited Pages'}
          </span>
          <div className="text-3xl font-black text-slate-900 mt-1 flex items-baseline gap-2">
            <span>{stats.uniquePagesIndexed}</span>
            <span className="text-xs text-emerald-700 font-semibold">Official Pages</span>
          </div>
        </div>
      </div>

      {/* Interactive Semantic Search Inspector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-700" />
            <h3 className="text-base font-bold text-slate-900">
              {language === 'hi' ? 'आरएजी खोज परीक्षक (RAG Inspector)' : 'RAG Semantic Retrieval Tester'}
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {language === 'hi' ? 'सटीकता व प्रासंगिकता स्कोर जांचें' : 'Inspect BM25 & Token Matching Scores'}
          </span>
        </div>

        <form onSubmit={handleTestSearch} className="flex gap-2">
          <input
            type="text"
            value={testQuery}
            onChange={(e) => setTestQuery(e.target.value)}
            placeholder={
              language === 'hi'
                ? 'कोई भी प्रश्न टाइप करें (उदा: किसान सम्मान निधि पात्रता, mudra loan 20 lakh)...'
                : 'Type query to inspect retrieved chunks (e.g. farmer income tax exclusion, ayushman 70+)...'
            }
            className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-blue-600"
          />
          <button
            type="submit"
            disabled={testingSearch}
            className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'जांचें' : 'Test Search'}</span>
          </button>
        </form>

        {testResults && (
          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Retrieved {testResults.chunks?.length || 0} Chunks (Top Score: {testResults.bestScore})</span>
              <span className="text-blue-700">{testResults.bestScore >= 5 ? 'Above Threshold (Pass)' : 'Low Match'}</span>
            </div>

            <div className="space-y-2">
              {(testResults.chunks || []).map((chunk: SchemeChunk, idx: number) => {
                const citation = testResults.citations?.[idx];
                return (
                  <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">
                        {chunk.schemeName} — {chunk.section} (Page {chunk.pageNumber})
                      </span>
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                        Score: {citation?.relevanceScore || 'N/A'}
                      </span>
                    </div>
                    <p className="text-slate-600 font-serif italic line-clamp-2">
                      "{chunk.content}"
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search chunks filter */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder={language === 'hi' ? 'इंडेक्स किए गए खंड खोजें...' : 'Filter indexed document chunks...'}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600 shadow-2xs"
          />
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3.5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'hi' ? 'नया दस्तावेज़ खंड जोड़ें' : 'Index New Guideline'}</span>
          </button>

          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
            title="Reset to official benchmark"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{language === 'hi' ? 'डिफ़ॉल्ट रीसेट' : 'Reset Default'}</span>
          </button>
        </div>
      </div>

      {/* Add Document Chunk Form */}
      {showAddForm && (
        <div className="bg-white rounded-2xl border-2 border-blue-500/40 p-6 shadow-md space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Upload className="w-5 h-5 text-blue-700" />
              <span>{language === 'hi' ? 'नया आधिकारिक दस्तावेज़ इंडेक्स करें' : 'Index New Official Guideline Document'}</span>
            </h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleAddChunk} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Scheme Name (e.g. PM-KISAN, PM-JAY):
                </label>
                <input
                  type="text"
                  required
                  value={newSchemeName}
                  onChange={(e) => setNewSchemeName(e.target.value)}
                  placeholder="e.g. PM Surya Ghar: Muft Bijli Yojana"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Document Title & Ministry:
                </label>
                <input
                  type="text"
                  required
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  placeholder="e.g. Operational Guidelines - Ministry of MNRE (2024)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Section / Clause Title:
                </label>
                <input
                  type="text"
                  required
                  value={newSection}
                  onChange={(e) => setNewSection(e.target.value)}
                  placeholder="e.g. Section 4: Eligibility & Subsidy Matrix"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Page Number:
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={newPageNumber}
                  onChange={(e) => setNewPageNumber(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Authentic Guideline Content (English):
              </label>
              <textarea
                required
                rows={3}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Paste the exact text from the official government PDF guideline..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 font-mono text-xs"
              ></textarea>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Content (Hindi, optional):
              </label>
              <textarea
                rows={2}
                value={newContentHindi}
                onChange={(e) => setNewContentHindi(e.target.value)}
                placeholder="आधिकारिक हिन्दी अनुवाद या दिशानिर्देश..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 text-xs"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Search Keywords (comma separated):
                </label>
                <input
                  type="text"
                  value={newKeywords}
                  onChange={(e) => setNewKeywords(e.target.value)}
                  placeholder="e.g. subsidy, 78000, solar, electricity, rooftop"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Official Portal URL:
                </label>
                <input
                  type="url"
                  value={newOfficialUrl}
                  onChange={(e) => setNewOfficialUrl(e.target.value)}
                  placeholder="https://pmsuryaghar.gov.in"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-bold transition-colors"
              >
                {submitting ? 'Indexing...' : 'Index Guideline Chunk'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Chunks List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            {language === 'hi' ? `इंडेक्स किए गए दस्तावेज़ (${filteredChunks.length})` : `Indexed Guideline Documents (${filteredChunks.length})`}
          </h3>
          <span className="text-xs text-slate-400">
            {language === 'hi' ? 'सत्यापित स्रोत भंडार' : 'Live Knowledge Corpus'}
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredChunks.map((chunk) => (
            <div key={chunk.id} className="p-5 hover:bg-slate-50/80 transition-colors space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">
                      {chunk.schemeName}
                    </span>
                    <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded text-[10px] font-bold">
                      Page {chunk.pageNumber}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    {chunk.documentTitle} — <span className="text-slate-700 font-semibold">{chunk.section}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenSourceModal({
                      id: chunk.id,
                      schemeId: chunk.schemeId,
                      schemeName: chunk.schemeName,
                      documentTitle: chunk.documentTitle,
                      section: chunk.section,
                      pageNumber: chunk.pageNumber,
                      excerpt: chunk.content,
                      officialUrl: chunk.officialUrl
                    })}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-blue-700 hover:bg-white text-xs font-medium flex items-center gap-1 shadow-2xs"
                    title="View Full Excerpt"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span className="hidden sm:inline">Inspect</span>
                  </button>

                  {chunk.id.startsWith('custom-doc-') && (
                    <button
                      onClick={() => handleDelete(chunk.id)}
                      className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs"
                      title="Delete chunk"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-serif italic bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                "{chunk.content.substring(0, 200)}..."
              </p>

              <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400">
                <span className="font-medium text-slate-500">Keywords:</span>
                {chunk.keywords.map((kw, ki) => (
                  <span key={ki} className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {filteredChunks.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-500">
              No guideline chunks found matching your filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
