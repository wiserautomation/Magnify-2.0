import { GoogleGenerativeAI } from '@google/generative-ai';
import { type TitleStrategy, type TitleIssue } from '@/types';

/**
 * Magnify 2.0 AI Title Generation Engine
 * Powered by Google Gemini
 */

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export interface GeneratedVariant {
  title: string;
  strategy: TitleStrategy;
  reasoning: string;
}

/**
 * Generate AI title variants using multiple strategies
 */
export async function generateTitleVariants(
  currentTitle: string,
  brand: string,
  category: string,
  attributes: Record<string, string> = {},
  issues: TitleIssue[] = []
): Promise<GeneratedVariant[]> {
  const prompt = `
    You are a Google Shopping Title Optimization Expert.
    
    PRODUCT INFO:
    Current Title: "${currentTitle}"
    Brand: "${brand}"
    Category: "${category}"
    Attributes provided: ${JSON.stringify(attributes)}
    Identified Issues: ${issues.map(i => i.message).join(', ')}

    GOAL:
    Generate 3 distinct, high-performing Google Shopping product titles (max 150 chars).
    Follow Google best practices: brand first, then key attributes (color, size, material, model).
    Avoid promotional language ("sale", "best", etc.).

    STRATEGIES:
    1. brand_first: Focus on authority. [Brand] [Product Type] [Key Attributes]
    2. attribute_first: Focus on search intent. [Brand] [Key Attribute 1] [Product Type] [Key Attribute 2]
    3. semantic_rich: Focus on variety. Use natural synonyms and search-friendly terms.

    OUTPUT FORMAT:
    Return ONLY a JSON array of objects with keys: "title", "strategy", "reasoning".
    Example: [{"title": "Nike Men's Pegasus 40 Running Shoes - Black/White - Size 10", "strategy": "brand_first", "reasoning": "Standard high-intent structure for footwear."}]
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean JSON from potential markdown wrappers
    const cleanJson = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('AI Variant Generation Failed:', error);
    throw error;
  }
}
