import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ChatAssistantView } from './components/ChatAssistantView';
import { SchemesView } from './components/SchemesView';
import { SchemeDetailModal } from './components/SchemeDetailModal';
import { SourceModal } from './components/SourceModal';
import { EligibilityCheckerView } from './components/EligibilityCheckerView';
import { DocumentChecklistView } from './components/DocumentChecklistView';
import { AdminPortalView } from './components/AdminPortalView';
import { AboutView } from './components/AboutView';
import { DEFAULT_SCHEMES } from './data/defaultSchemes';
import { Language, Scheme, SourceCitation } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [language, setLanguage] = useState<Language>('hi');
  const [schemes, setSchemes] = useState<Scheme[]>(DEFAULT_SCHEMES);
  const [selectedSchemeForModal, setSelectedSchemeForModal] = useState<Scheme | null>(null);
  const [activeSourceCitation, setActiveSourceCitation] = useState<SourceCitation | null>(null);
  const [pendingChatQuery, setPendingChatQuery] = useState<string>('');

  // Fetch schemes from backend API to ensure live data
  useEffect(() => {
    fetch('/api/schemes')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setSchemes(data);
        }
      })
      .catch(err => {
        console.warn('Using client fallback schemes:', err);
      });
  }, []);

  // Quick search submit from Home page or Scheme cards
  const handleInitiateChat = (query: string) => {
    setPendingChatQuery(query);
    setCurrentTab('chat');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navbar with bilingual toggle and tabs */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            language={language}
            schemes={schemes}
            onSearchSubmit={handleInitiateChat}
            onNavigateTab={setCurrentTab}
            onSelectScheme={setSelectedSchemeForModal}
            onOpenSourceModal={setActiveSourceCitation}
          />
        )}

        {currentTab === 'chat' && (
          <ChatAssistantView
            language={language}
            schemes={schemes}
            onOpenSourceModal={setActiveSourceCitation}
            initialQuery={pendingChatQuery}
            onClearInitialQuery={() => setPendingChatQuery('')}
          />
        )}

        {currentTab === 'schemes' && (
          <SchemesView
            language={language}
            schemes={schemes}
            onSelectScheme={setSelectedSchemeForModal}
            onAskAI={handleInitiateChat}
            onOpenSourceModal={setActiveSourceCitation}
            onNavigateTab={setCurrentTab}
          />
        )}

        {currentTab === 'eligibility' && (
          <EligibilityCheckerView
            language={language}
            schemes={schemes}
            onOpenSourceModal={setActiveSourceCitation}
            onAskAI={handleInitiateChat}
          />
        )}

        {currentTab === 'documents' && (
          <DocumentChecklistView
            language={language}
            schemes={schemes}
            onOpenSourceModal={setActiveSourceCitation}
            onAskAI={handleInitiateChat}
          />
        )}

        {currentTab === 'admin' && (
          <AdminPortalView
            language={language}
            onOpenSourceModal={setActiveSourceCitation}
          />
        )}

        {currentTab === 'about' && (
          <AboutView
            language={language}
            onNavigateTab={setCurrentTab}
          />
        )}
      </main>

      {/* Scheme Detail Modal */}
      {selectedSchemeForModal && (
        <SchemeDetailModal
          scheme={selectedSchemeForModal}
          onClose={() => setSelectedSchemeForModal(null)}
          language={language}
          onAskAI={handleInitiateChat}
          onOpenSourceModal={setActiveSourceCitation}
        />
      )}

      {/* Source Citation Modal */}
      {activeSourceCitation && (
        <SourceModal
          citation={activeSourceCitation}
          onClose={() => setActiveSourceCitation(null)}
          language={language}
        />
      )}

      {/* Global Footer */}
      <Footer
        language={language}
        onNavigateTab={setCurrentTab}
      />
    </div>
  );
}
