
import React, { useState, useEffect, useCallback } from 'react';
import { getDevotional } from '../../services/geminiService';
import type { DevotionalResponse } from '../../types';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import Card from '../common/Card';
import SectionContainer from './SectionContainer';

const DevotionalSection: React.FC = () => {
  const [devotional, setDevotional] = useState<DevotionalResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDevotional = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setDevotional(null);
    try {
      const response = await getDevotional();
      setDevotional(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchDevotional();
  }, [fetchDevotional]);

  return (
    <SectionContainer title="Devocional Diário" subtitle="Receba uma palavra direcionada com explicação e oração.">
      <div className="text-center mb-8">
        <Button onClick={fetchDevotional} disabled={isLoading}>
          {isLoading ? 'Gerando...' : '🙏 Nova Palavra'}
        </Button>
      </div>

      {isLoading && <Spinner />}
      {error && !isLoading && <Card><p className="text-center text-red-600 bg-red-100 p-3 rounded-md">{error}</p></Card>}
      {devotional && !isLoading && (
        <Card className="text-center animate-fade-in">
          <h2 className="font-serif text-3xl font-bold text-amber-800">{devotional.titulo}</h2>
          <blockquote className="my-6 p-4 border-l-4 border-gold-400 bg-gold-50 rounded-r-lg">
            <p className="text-xl italic text-stone-700 font-sans">"{devotional.textoVersiculo}"</p>
            <footer className="text-right text-stone-600 font-bold mt-2 font-serif">{devotional.versiculo}</footer>
          </blockquote>
          
          <div className="text-left space-y-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-amber-800 mb-2">Reflexão</h3>
              <p className="text-stone-700 leading-relaxed font-sans">{devotional.reflexao}</p>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-amber-800 mb-2">Oração</h3>
              <p className="text-stone-700 leading-relaxed italic font-sans">{devotional.oracao}</p>
            </div>
          </div>
        </Card>
      )}
    </SectionContainer>
  );
};

export default DevotionalSection;
