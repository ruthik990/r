
import { GoogleGenAI, Type } from "@google/genai";
import { ContractAnalysis, RiskLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Formal or descriptive title of the contract" },
    summary: { type: Type.STRING, description: "Professional executive summary for an educated reader" },
    simpleExplanation: { type: Type.STRING, description: "The contract's main point explained as if to a 10-year-old (ELI5)" },
    parties: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Entities involved in the contract" },
    risks: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          clause: { type: Type.STRING, description: "The original text of the risky clause" },
          riskLevel: { type: Type.STRING, enum: Object.values(RiskLevel) },
          description: { type: Type.STRING, description: "Professional explanation of the legal risk" },
          simplifiedWarning: { type: Type.STRING, description: "Extremely simple warning of why this matters in daily life" }
        },
        required: ["clause", "riskLevel", "description", "simplifiedWarning"]
      }
    },
    deadlines: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          date: { type: Type.STRING, description: "Date or relative timeframe mentioned" },
          description: { type: Type.STRING, description: "What happens on this date" }
        }
      }
    },
    keyObligations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Top 5 things the user MUST do, in simple bullet points" }
  },
  required: ["title", "summary", "simpleExplanation", "parties", "risks", "deadlines", "keyObligations"]
};

export const analyzeContract = async (content: string | { data: string, mimeType: string }): Promise<ContractAnalysis> => {
  const model = "gemini-3-pro-preview";
  
  const prompt = `Analyze this contract with 100% accuracy. 
  1. Identify the core purpose.
  2. Translate legal jargon into words a child could understand.
  3. Identify hidden traps, fees, or unfair clauses.
  4. Extract all important dates.
  
  The user is educated but wants the "human" version of this legal document.`;

  const inputParts = typeof content === 'string' 
    ? { text: content } 
    : { inlineData: content };

  const result = await ai.models.generateContent({
    model,
    contents: { parts: [inputParts, { text: prompt }] },
    config: {
      responseMimeType: "application/json",
      responseSchema: analysisSchema,
      thinkingConfig: { thinkingBudget: 8000 }
    }
  });

  return JSON.parse(result.text || "{}") as ContractAnalysis;
};

export const askContractQuestion = async (contractContent: string, question: string, history: { role: 'user' | 'assistant', content: string }[]) => {
  const model = "gemini-3-pro-preview";
  
  const chat = ai.chats.create({
    model,
    config: {
      systemInstruction: "You are LegalEase AI. You take complex legal documents and explain them like a helpful friend. Be extremely accurate. If a user asks a question, give a 'Lawyer Answer' (professional) and a 'Simple Translation' (ELI5). If you don't know something, say you can't find it in the text.",
    }
  });

  const message = `DOCUMENT CONTEXT:\n${contractContent.substring(0, 40000)}\n\nUSER QUESTION: ${question}`;
  const result = await chat.sendMessage({ message });
  return result.text;
};
