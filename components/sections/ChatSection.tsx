
import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToChatStream } from '../../services/geminiService';
import { ChatMessage } from '../../types';
import SectionContainer from './SectionContainer';

const RevelationIcon = () => (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-inner">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-white">
          <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0V2.75A.75.75 0 0110 2zM5.404 4.343a.75.75 0 010 1.06l-1.854 1.853a.75.75 0 11-1.06-1.06l1.853-1.854a.75.75 0 011.06 0zm9.192 0a.75.75 0 011.06 0l1.853 1.854a.75.75 0 11-1.06 1.06l-1.854-1.853a.75.75 0 010-1.06zM2 10a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm14.25.75a.75.75 0 000-1.5h-3.5a.75.75 0 000 1.5h3.5zM6.464 14.596a.75.75 0 01-1.06 0l-1.853-1.854a.75.75 0 111.06-1.06l1.854 1.853a.75.75 0 010 1.06zm9.192-3.919a.75.75 0 010 1.06l-1.854 1.853a.75.75 0 11-1.06-1.06l1.853-1.854a.75.75 0 011.06 0zM10 18a.75.75 0 01-.75-.75v-3.5a.75.75 0 011.5 0v3.5A.75.75 0 0110 18z" clipRule="evenodd" />
        </svg>
    </div>
);


const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
);

const TypingIndicator = () => (
    <div className="flex items-center space-x-2 p-2">
        <div className="typing-light"></div>
        <span className="text-sm text-stone-500 font-serif italic">Gênesis está revelando...</span>
        <style>{`
            .typing-light {
                width: 10px;
                height: 10px;
                background-color: #fcd34d; /* gold-300 */
                border-radius: 50%;
                box-shadow: 0 0 10px #fcd34d, 0 0 20px #fcd34d;
                animation: typing-pulse 1.5s infinite ease-in-out;
            }
            @keyframes typing-pulse {
                0% { transform: scale(0.8); opacity: 0.7; }
                50% { transform: scale(1.2); opacity: 1; }
                100% { transform: scale(0.8); opacity: 0.7; }
            }
        `}</style>
    </div>
);

const ChatSection: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    useEffect(() => {
        setMessages([
            { role: 'model', content: "Olá! Eu sou Gênesis, seu assistente de estudos bíblicos. Como posso iluminar seu dia com a Palavra de Deus hoje?" }
        ]);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const newUserMessage: ChatMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const stream = await sendMessageToChatStream(newUserMessage.content);
            let fullResponse = "";
            
            setMessages(prev => [...prev, { role: 'model', content: '', isStreaming: true }]);

            for await (const chunk of stream) {
                fullResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage && lastMessage.role === 'model') {
                        lastMessage.content = fullResponse;
                        lastMessage.isStreaming = true;
                    }
                    return newMessages;
                });
            }

             setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage && lastMessage.role === 'model') {
                   lastMessage.isStreaming = false;
                }
                return newMessages;
            });

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Ocorreu um erro ao se comunicar com a IA.";
             setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage && lastMessage.isStreaming) {
                    newMessages.pop();
                }
                return [...newMessages, { role: 'model', content: `Desculpe, ocorreu um erro: ${errorMessage}` }];
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SectionContainer title="Chat Revelação" subtitle="Converse com uma IA especialista na Bíblia Sagrada.">
            <div className="flex flex-col h-[70vh] bg-parchment-50 rounded-xl shadow-2xl shadow-black/30 border border-gold-600/20">
                <div className="flex-grow p-4 sm:p-6 space-y-6 overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-3 animate-fade-in ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'model' && <div className="flex-shrink-0 self-start"><RevelationIcon /></div>}
                            <div className={`max-w-xs md:max-w-xl lg:max-w-3xl px-5 py-3 rounded-2xl shadow-md ${msg.role === 'user' ? 'bg-gold-50 text-stone-800 rounded-br-none' : 'bg-white text-stone-800 rounded-bl-none'}`}>
                                {msg.isStreaming && msg.content === '' ? (
                                    <TypingIndicator />
                                ) : (
                                    <p className="text-stone-700 leading-relaxed whitespace-pre-wrap font-sans">{msg.content}</p>
                                )}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 bg-parchment-100 border-t border-gold-600/20">
                    <form onSubmit={handleSubmit} className="flex items-center gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={isLoading ? "Aguarde a revelação..." : "Pergunte algo sobre a Bíblia..."}
                            className="flex-grow w-full px-5 py-3 bg-white border border-gold-600/20 rounded-full shadow-inner text-stone-800 placeholder:text-stone-500 focus:ring-2 focus:ring-gold-500 focus:border-gold-500 transition-all duration-200 disabled:bg-stone-100"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-white hover:shadow-lg hover:shadow-gold-500/40 focus:outline-none focus:ring-4 focus:ring-gold-400/50 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none disabled:bg-gold-500/50"
                            aria-label="Enviar mensagem"
                        >
                            <SendIcon />
                        </button>
                    </form>
                </div>
            </div>
        </SectionContainer>
    );
};

export default ChatSection;
