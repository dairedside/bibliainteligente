
import React, { useState } from 'react';
import { summarizePassage } from '../../services/geminiService';
import type { SummaryResponse } from '../../types';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import Card from '../common/Card';
import SectionContainer from './SectionContainer';

const SummarySection: React.FC = () => {
  const [passage, setPassage] = useState('');
  const [result, setResult] = useState<SummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passage.trim()) {
      setError("Por favor, insira uma passagem bíblica.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await summarizePassage(passage);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionContainer title="Resumos e Revelações" subtitle="Digite um trecho e veja o resumo com contexto, revelação e aplicação.">
      <Card className="mb-8 bg-parchment-100">
        <form onSubmit={handleSummarize}>
          <textarea
            value={passage}
            onChange={(e) => setPassage(e.target.value)}
            placeholder="Cole a passagem bíblica aqui (ex: João 3:16-17)"
            className="w-full h-32 p-3 bg-parchment-50 border border-gold-600/20 rounded-lg shadow-inner text-stone-800 placeholder:text-stone-500 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-colors duration-200"
            disabled={isLoading}
          ></textarea>
          <div className="text-center mt-4">
            <Button type="submit" disabled={isLoading || !passage.trim()}>
              {isLoading ? 'Analisando...' : '✨ Gerar Revelação'}
            </Button>
          </div>
        </form>
      </Card>
      
      {isLoading && <Spinner />}
      {error && !isLoading && <Card><p className="text-center text-red-600 bg-red-100 p-3 rounded-md">{error}</p></Card>}
      {result && !isLoading && (
        <div className="space-y-6 animate-fade-in">
          <Card>
            <h3 className="font-serif text-2xl font-bold text-amber-800 border-b-2 border-gold-300 pb-2 mb-4">Contexto</h3>
            <p className="text-stone-700 leading-relaxed font-sans">{result.contexto}</p>
          </Card>
          <Card>
            <h3 className="font-serif text-2xl font-bold text-amber-800 border-b-2 border-gold-300 pb-2 mb-4">Revelação</h3>
            <p className="text-stone-700 leading-relaxed font-sans">{result.revelacao}</p>
          </Card>
          <Card>
            <h3 className="font-serif text-2xl font-bold text-amber-800 border-b-2 border-gold-300 pb-2 mb-4">Aplicação Prática</h3>
            <p className="text-stone-700 leading-relaxed font-sans">{result.aplicacao}</p>
          </Card>
        </div>
      )}
    </SectionContainer>
  );
};

export default SummarySection;
