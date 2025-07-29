
import React, { useState } from 'react';
import { getWordMeaning } from '../../services/geminiService';
import Button from '../common/Button';
import Input from '../common/Input';
import Spinner from '../common/Spinner';
import Card from '../common/Card';
import SectionContainer from './SectionContainer';

const MeaningsSection: React.FC = () => {
  const [word, setWord] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) {
      setError("Por favor, digite uma palavra.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult('');
    try {
      const response = await getWordMeaning(word);
      setResult(response);
    } catch (err)
 {
      setError(err instanceof Error ? err.message : "Ocorreu um erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionContainer title="Significado das Palavras" subtitle="Descubra a origem hebraica/greco-aramaica de palavras bíblicas.">
      <Card className="mb-8 bg-parchment-100">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 items-center">
          <Input 
            type="text" 
            value={word} 
            onChange={(e) => setWord(e.target.value)} 
            placeholder="Digite uma palavra (ex: Ágape, Hosana)" 
            className="flex-grow !bg-parchment-50 !text-stone-800 placeholder:text-stone-500"
          />
          <Button type="submit" disabled={isLoading || !word.trim()}>
            {isLoading ? 'Buscando...' : '🔍 Pesquisar'}
          </Button>
        </form>
      </Card>
      
      {isLoading && <Spinner />}
      {error && !isLoading && <Card><p className="text-center text-red-600 bg-red-100 p-3 rounded-md">{error}</p></Card>}
      {result && !isLoading &&(
        <Card>
          <div className="prose max-w-none prose-stone text-stone-700 leading-relaxed whitespace-pre-wrap font-sans">{result}</div>
        </Card>
      )}
    </SectionContainer>
  );
};

export default MeaningsSection;
