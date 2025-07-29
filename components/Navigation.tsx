
import React from 'react';
import { Section } from '../types';

interface NavigationProps {
  activeSection: Section;
  onNavClick: (section: Section) => void;
}

const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" /></svg>;
const TheologyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>;
const MeaningsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a7.5 7.5 0 0 1-7.5 0c-1.42 0-2.8.204-4.12.603M19.5 9.128c0 .283-.01.565-.029.845m0-4.043a7.5 7.5 0 1 1-15 0m15 0c0 .375 0 .75-.029 1.124" /></svg>;
const SummariesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>;
const DevotionalIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75s.168-.75.375-.75.375.336.375.75Zm4.5 0c0 .414-.168.75-.375.75s-.375-1.014-.375-1.125.168-.75.375-.75.375.336.375.75Z" /></svg>;

const navItems = [
  { id: Section.Chat, label: 'Chat Revelação', icon: <ChatIcon /> },
  { id: Section.Theology, label: 'Teologia', icon: <TheologyIcon /> },
  { id: Section.Meanings, label: 'Significados', icon: <MeaningsIcon /> },
  { id: Section.Summaries, label: 'Resumos', icon: <SummariesIcon /> },
  { id: Section.Devotional, label: 'Devocional', icon: <DevotionalIcon /> },
];

const Navigation: React.FC<NavigationProps> = ({ activeSection, onNavClick }) => {
  return (
    <nav className="bg-celestial-800/80 backdrop-blur-sm shadow-md border-b border-celestial-900/50 sticky top-0 z-20">
      <div className="container mx-auto">
        <div className="flex justify-center items-center overflow-x-auto -mb-px">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className={`whitespace-nowrap flex-shrink-0 flex items-center py-4 px-3 sm:px-5 border-b-2 font-bold text-sm sm:text-base transition-all duration-300 transform hover:-translate-y-px ${
                activeSection === item.id
                  ? 'border-gold-400 text-gold-300'
                  : 'border-transparent text-light-200 hover:text-gold-300 hover:border-gold-500/50'
              }`}
              style={{textShadow: activeSection === item.id ? '0 0 8px rgba(251, 191, 36, 0.5)' : 'none'}}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
