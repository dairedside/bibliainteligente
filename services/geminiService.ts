import { GoogleGenAI, Type, Chat } from "@google/genai";
import type { SummaryResponse, DevotionalResponse } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash";

/**
 * Extracts and parses a JSON object from a string that might be wrapped in markdown code fences.
 * @param text The string containing the JSON.
 * @returns The parsed JSON object.
 */
function extractAndParseJson<T>(text: string): T {
    // Regex to find JSON block, possibly with a language specifier
    const jsonRegex = /```(json)?\s*([\s\S]*?)\s*```/;
    const match = text.match(jsonRegex);
    // If a JSON block is found, use its content; otherwise, use the whole text.
    const jsonString = match ? match[2].trim() : text.trim();

    try {
        return JSON.parse(jsonString);
    } catch (e) {
        console.error("Failed to parse JSON:", e);
        console.error("Original text from AI:", text);
        console.error("Extracted/processed string:", jsonString);
        throw new Error("A resposta da IA não estava em um formato JSON válido. Conteúdo: " + jsonString);
    }
}

// --- CHAT ---
// Create a single chat instance to maintain conversation history
const chat: Chat = ai.chats.create({
    model: model,
    config: {
        systemInstruction: `Você é "Gênesis", um assistente teológico especialista na Bíblia Sagrada. Sua única fonte de conhecimento e respostas é a Bíblia.
        Regras estritas:
        1.  Baseie TODAS as suas respostas exclusivamente em versículos e princípios bíblicos.
        2.  Sempre cite os versículos que suportam sua resposta (ex: João 3:16, Gênesis 1:1).
        3.  Se a pergunta não pode ser respondida pela Bíblia (ex: "qual a cor do céu?"), afirme que a Bíblia não aborda o tema e não tente responder.
        4.  Seja claro, objetivo e respeitoso em suas respostas.
        5.  Não use conhecimento externo ou de outras religiões. Foque apenas na interpretação cristã tradicional da Bíblia.`,
    },
});

export async function sendMessageToChatStream(message: string) {
    return chat.sendMessageStream({ message });
}

// --- OTHER SECTIONS ---

export async function explainTheology(topic: string): Promise<string> {
    const response = await ai.models.generateContent({
        model,
        contents: `Explique o conceito teológico de "${topic}" com base na Bíblia. Detalhe o que significa, sua importância e cite os principais versículos que sustentam essa doutrina. A resposta deve ser em texto corrido e bem explicativo.`,
    });
    return response.text;
}

export async function getWordMeaning(word: string): Promise<string> {
    const response = await ai.models.generateContent({
        model,
        contents: `Explique o significado da palavra "${word}" em seu contexto bíblico. Informe a origem (hebraico, grego, aramaico), o significado original e como ela é usada na Bíbl-ia. Cite exemplos de versículos. A resposta deve ser em texto corrido.`
    });
    return response.text;
}

const summarySchema = {
    type: Type.OBJECT,
    properties: {
        contexto: {
            type: Type.STRING,
            description: "O contexto histórico e literário da passagem."
        },
        revelacao: {
            type: Type.STRING,
            description: "A principal revelação ou verdade espiritual contida na passagem."
        },
        aplicacao: {
            type: Type.STRING,
            description: "Uma aplicação prática e pessoal para a vida do leitor hoje."
        },
    },
    required: ["contexto", "revelacao", "aplicacao"],
};

export async function summarizePassage(passage: string): Promise<SummaryResponse> {
    const response = await ai.models.generateContent({
        model,
        contents: `Analise a seguinte passagem bíblica: "${passage}". Gere uma resposta em JSON com base no schema fornecido.`,
        config: {
            responseMimeType: "application/json",
            responseSchema: summarySchema,
        },
    });
    return extractAndParseJson<SummaryResponse>(response.text);
}

const devotionalSchema = {
    type: Type.OBJECT,
    properties: {
        titulo: {
            type: Type.STRING,
            description: "Um título inspirador para o devocional."
        },
        versiculo: {
            type: Type.STRING,
            description: "A referência do versículo principal (ex: João 3:16)."
        },
        textoVersiculo: {
            type: Type.STRING,
            description: "O texto completo do versículo principal."
        },
        reflexao: {
            type: Type.STRING,
            description: "Uma reflexão profunda sobre o versículo, explicando seu significado e aplicando-o à vida diária."
        },
        oracao: {
            type: Type.STRING,
            description: "Uma oração curta inspirada pela reflexão."
        },
    },
    required: ["titulo", "versiculo", "textoVersiculo", "reflexao", "oracao"],
};

export async function getDevotional(): Promise<DevotionalResponse> {
    const response = await ai.models.generateContent({
        model,
        contents: "Gere um devocional diário inspirador baseado em um versículo da Bíblia. O versículo pode ser de qualquer livro. A resposta deve ser em JSON, seguindo o schema fornecido.",
        config: {
            responseMimeType: "application/json",
            responseSchema: devotionalSchema,
        },
    });
    return extractAndParseJson<DevotionalResponse>(response.text);
}
