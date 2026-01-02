
import { GoogleGenAI, Type } from "@google/genai";
import { AgeGroup, Category, TarotCardData, CardTheme } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateCardReading = async (
  ageGroup: AgeGroup,
  category: Category,
  cardTheme: CardTheme
): Promise<TarotCardData> => {
  // ย้ายตรรกะหลักไปไว้ใน System Instruction เพื่อความปลอดภัย
  const systemInstruction = `You are an AI tarot counselor for students. 
  Your mission is to provide positive, supportive, and age-appropriate guidance.
  
  STRICT RULES:
  1. 100% positive, encouraging, and safe. NO death, loss, fear, or negative fate.
  2. Structure the response into: English Name, English Meaning, English Guidance, Thai Meaning, Thai Guidance.
  3. Vocabulary must match the age group provided.
  4. Visual prompt should describe a beautiful, soft fantasy tarot card with gold and pastel tones.`;

  const userMessage = `Generate a tarot reading for a student in the "${ageGroup}" category. 
  The theme is "${category}" and the specific card is "${cardTheme.name}".`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: userMessage,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          meaning: { type: Type.STRING },
          guidance: { type: Type.STRING },
          thaiMeaning: { type: Type.STRING },
          thaiGuidance: { type: Type.STRING },
          visualPrompt: { type: Type.STRING, description: "Detailed visual description for an image generator. Focus on stars, nature, and light." }
        },
        required: ["name", "meaning", "guidance", "thaiMeaning", "thaiGuidance", "visualPrompt"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateCardImage = async (visualPrompt: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `A high-quality realistic tarot card illustration. Style: Soft fantasy, magical, hopeful. Elements: ${visualPrompt}. No dark colors.` }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: "3:4"
      }
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  return 'https://picsum.photos/600/800';
};
