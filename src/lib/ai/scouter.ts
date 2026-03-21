/**
 * Magnify 2.0 Market Scouter
 * Logic to automatically identify competitor trends and keyword gaps.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export interface MarketGap {
  keyword: string;
  competitorStrategy: string;
  opportunityScore: number;
  suggestedAction: string;
}

/**
 * Automatically scout for competitor keyword gaps in a specific category
 */
export async function scoutMarketGaps(
  category: string,
  competitors: string[]
): Promise<MarketGap[]> {
  const prompt = `
    Analyze the current Google Shopping landscape for category: "${category}".
    Top Competitors: ${competitors.join(', ')}.
    
    GOAL:
    Find search terms or product attributes these competitors are winning on that a growth store might be missing.
    Identify "Trend Holes" (e.g., if everyone is using "Waterproof" but no one is using "Breathable Lightweight").
    
    OUTPUT FORMAT:
    Return ONLY a JSON array of objects with keys: "keyword", "competitorStrategy", "opportunityScore", "suggestedAction".
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleanJson = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('Market Scouting Failed:', error);
    return [];
  }
}
