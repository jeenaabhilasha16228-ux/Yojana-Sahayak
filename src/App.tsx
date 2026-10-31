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
import { DashboardView } from './components/DashboardView';
import { RecommendationsView } from './components/RecommendationsView';
import { AuthModal } from './components/AuthModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { DEFAULT_SCHEMES } from './data/defaultSchemes';
import { Language, Scheme, SourceCitation, UserProfile, UserDocument } from './types';
import { authService } from './services/auth';
import { documentProcessor } from './services/documentProcessor';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [language, setLanguage] = useState<Language>('hi');
  const [schemes, setSchemes] = useState<Scheme[]>(DEFAULT_SCHEMES);
  const [selectedSchemeForModal, setSelectedSchemeForModal] = useState<Scheme | null>(null);
  const [activeSourceCitation, setActiveSourceCitation] = useState<SourceCitation | null>(null);
  const [pendingChatQuery, setPendingChatQuery] = useState<string>('');

  // Authentication & Personal Account state
  const [user, setUser] = useState<UserProfile | null>(null);
  const [userDocuments, setUserDocuments] = useState<UserDocument[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState<boolean>(false);

  // Initialize auth & documents on mount
  useEffect(() => {
    const initialUser = authService.getCurrentUser();
    if (initialUser) {
      setUser(initialUser);
      setUserDocuments(documentProcessor.getUserDocuments(initialUser.id));
    }

    const unsubscribe = authService.onAuthStateChange((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUserDocuments(documentProcessor.getUserDocuments(currentUser.id));
      } else {
        setUserDocuments([]);
      }
    });

    return () => unsubscribe();
  }, []);

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

  const handleLogout = async () => {
    await authService.signOut();
    setUser(null);
    setUserDocuments([]);
    if (currentTab === 'dashboard') {
      setCurrentTab('home');
    }
  };

  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Navbar with bilingual toggle, auth state, and tabs */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        user={user}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
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

        {currentTab === 'recommendations' && (
          <RecommendationsView
            language={language}
            user={user}
            documents={userDocuments}
            schemes={schemes}
            onOpenSourceModal={setActiveSourceCitation}
            onAskAIWithContext={handleInitiateChat}
            onNavigateToDashboard={() => setCurrentTab('dashboard')}
            onOpenAuthModal={() => setAuthModalOpen(true)}
            onSetDemoUser={(demoUser) => {
              setUser(demoUser);
              setUserDocuments(documentProcessor.getUserDocuments(demoUser.id));
            }}
          />
        )}

        {currentTab === 'dashboard' && (
          user ? (
            <DashboardView
              user={user}
              language={language}
              onUpdateUser={(updated) => setUser(updated)}
              onNavigateTab={setCurrentTab}
              onSelectScheme={setSelectedSchemeForModal}
              onAskAIWithContext={handleInitiateChat}
              onOpenPrivacyPolicy={() => setPrivacyModalOpen(true)}
              onOpenSourceModal={setActiveSourceCitation}
            />
          ) : (
            <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-blue-400 mx-auto">
                <span className="text-2xl font-bold">👤</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {language === 'hi' ? 'नागरिक व्यक्तिगत डैशबोर्ड' : 'Citizen Personal Dashboard'}
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                {language === 'hi'
                  ? 'अपने व्यक्तिगत दस्तावेज़ अपलोड करने, पात्रता प्रोफ़ाइल प्रबंधित करने और सटीक योजना मिलान देखने के लिए कृपया साइन इन करें।'
                  : 'Please sign in or test with a demo persona to securely upload documents, manage eligibility profile tags, and view your verified scheme match.'}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all"
                >
                  {language === 'hi' ? 'साइन इन / खाता बनाएं' : 'Sign In / Register'}
                </button>
                <button
                  onClick={() => setCurrentTab('recommendations')}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 font-bold text-xs border border-white/10 transition-all"
                >
                  {language === 'hi' ? 'डेमो सिफारिशें देखें' : 'Explore Demo Recommendations'}
                </button>
              </div>
            </div>
          )
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

      {/* Auth Modal (Sign In / Register / Demo) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        language={language}
        onSuccess={(authenticatedUser) => {
          setUser(authenticatedUser);
          setUserDocuments(documentProcessor.getUserDocuments(authenticatedUser.id));
        }}
      />

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        language={language}
      />

      {/* Global Footer */}
      <Footer
        language={language}
        onNavigateTab={setCurrentTab}
        onOpenPrivacyPolicy={() => setPrivacyModalOpen(true)}
      />
    </div>
  );
}
