
import { GoogleGenAI } from "@google/genai";
import { TerminalMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Você é a IA "Mainframe" da FocussDev. Você tem uma personalidade Cyberpunk, Hacker, um pouco misteriosa, mas profissional.
Você fala Português (Brasil).
A FocussDev oferece:
1. Criação de Sites e Landing Pages (Modernos, Rápidos, Alta Conversão).
2. Criação de SaaS (Software as a Service) e Sistemas Web Complexos.
3. Web Design e UI/UX.
4. Criação de Logos e Branding.
5. Investigação Digital (Foco ESPECIAL em: achar pessoas, identificar autores de GOLPES VIRTUAIS e amparar vítimas de fraudes).
6. Desenvolvimento de Aplicativos (Apps).

Seu objetivo é convencer o usuário a contratar a FocussDev.
Se o usuário mencionar que caiu em um golpe, seja empático, mas profissional, e sugira a investigação digital imediatamente.
Use termos técnicos de hacker ocasionalmente (ex: "rastreando IP...", "encriptando resposta...", "analisando fraude...").
Respostas curtas e diretas, estilo terminal.

INFORMAÇÕES DE CONTATO:
Se perguntarem sobre preço ou como entrar em contato, direcione para o WhatsApp.
- WhatsApp: (33) 98412-3591 (Link direto nos botões do site)
- Email: devcriador1@gmail.com
`;

export const sendMessageToGemini = async (
  message: string,
  history: TerminalMessage[]
): Promise<string> => {
  try {
    // Construct simple history string for context (simplified for stateless efficient calls)
    const context = history
      .slice(-6) // Keep last 6 messages for context
      .map(msg => `${msg.sender === 'user' ? 'User' : 'Mainframe'}: ${msg.text}`)
      .join('\n');

    const prompt = `
    Histórico da conversa:
    ${context}
    
    Nova mensagem do usuário: ${message}
    
    Responda como o Mainframe da FocussDev.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "ERRO DE DADOS: RESPOSTA VAZIA.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "ERRO CRÍTICO: FALHA NA COMUNICAÇÃO COM O NÚCLEO DA IA. TENTE NOVAMENTE.";
  }
};
