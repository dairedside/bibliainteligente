
import React, { useState, useCallback } from 'react';
import { THEOLOGY_TOPICS } from '../../constants';
import { explainTheology } from '../../services/geminiService';
import Spinner from '../common/Spinner';
import Card from '../common/Card';
import SectionContainer from './SectionContainer';

const TheologySection: React.FC = () => {
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const handleTopicClick = useCallback(async (topic: string) => {
    setIsLoading(true);
    setError(null);
    setResult('');
    setActiveTopic(topic);
    try {
      const response = await explainTheology(topic);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <SectionContainer title="Teologia Profunda" subtitle="Explore conceitos como Graça, Salvação, Reino e Trindade.">
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {THEOLOGY_TOPICS.map((topic) => (
          <button
            key={topic}
            onClick={() => handleTopicClick(topic)}
            disabled={isLoading && activeTopic === topic}
            className={`px-5 py-2 text-base font-semibold rounded-full transition-all duration-200 border transform hover:scale-105 ${
              activeTopic === topic && !isLoading
                ? 'bg-gradient-to-br from-gold-400 to-gold-600 text-celestial-900 border-transparent shadow-lg shadow-gold-500/30'
                : 'bg-parchment-100 text-gold-700 border-gold-600/20 hover:bg-gold-50 hover:border-gold-600/50'
            } ${isLoading ? 'cursor-not-allowed opacity-70' : ''}`}
          >
            {topic}
          </button>
        ))}
      </div>
      
      {isLoading && <Spinner />}
      {error && !isLoading && <Card><p className="text-center text-red-600 bg-red-100 p-3 rounded-md">{error}</p></Card>}
      {result && !isLoading && (
        <Card>
          <div className="prose max-w-none prose-stone text-stone-700 leading-relaxed whitespace-pre-wrap font-sans">
            {result}
          </div>
        </Card>
      )}
    </SectionContainer>
  );
};

export default TheologySection;
