import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const getGeminiRecommendation = async (query: string, products: Product[]): Promise<string> => {
  const ai = getClient();
  if (!ai) return "API Key is missing. Please configure the environment.";

  const productContext = products.map(p => 
    `- ${p.name} (${p.brand}): $${p.price}, Type: ${p.category}. Desc: ${p.description}`
  ).join('\n');

  const prompt = `
    You are an expert luxury watch concierge for "TimeStore".
    
    User Query: "${query}"
    
    Available Inventory:
    ${productContext}
    
    Task: Recommend 1-2 watches from the inventory that best match the user's query. 
    Explain why in a sophisticated, professional, yet concise tone.
    If no specific watch fits perfectly, suggest the closest match based on style or price.
    Do not invent products not in the list.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Lo siento, no pude generar una recomendación en este momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Lo siento, hubo un error al conectar con el asistente inteligente.";
  }
};