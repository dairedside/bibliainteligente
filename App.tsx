
import React, { useState } from 'react';
import { Section } from './types';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ChatSection from './components/sections/ChatSection';
import TheologySection from './components/sections/TheologySection';
import MeaningsSection from './components/sections/MeaningsSection';
import SummarySection from './components/sections/SummarySection';
import DevotionalSection from './components/sections/DevotionalSection';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.Chat);

  const renderSection = () => {
    switch (activeSection) {
      case Section.Chat:
        return <ChatSection />;
      case Section.Theology:
        return <TheologySection />;
      case Section.Meanings:
        return <MeaningsSection />;
      case Section.Summaries:
        return <SummarySection />;
      case Section.Devotional:
        return <DevotionalSection />;
      default:
        return <ChatSection />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-celestial-900 text-light-100 relative">
       <div 
        className="absolute top-0 left-0 w-full h-full bg-repeat opacity-5"
        style={{backgroundImage: `url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23e0e1dd" fill-opacity="0.1"><path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/></g></g></svg>')`}}
       ></div>
      <Header />
      <Navigation activeSection={activeSection} onNavClick={setActiveSection} />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 z-10">
        <div className="w-full max-w-5xl mx-auto">
         {renderSection()}
        </div>
      </main>
      <footer className="text-center p-4 text-light-200 text-sm z-10">
        <p>Desenvolvido com IA para a glória de Deus. © 2024 Bíblia Gênesis.</p>
      </footer>
    </div>
  );
};

export default App;
