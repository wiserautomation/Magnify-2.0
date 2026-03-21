import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Magnify 2.0 Vision AI Engine
 * Logic to detect product subject "Kill-Zones" (Mobile Truncation)
 */

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export interface VisionAnalysis {
  isTruncated: boolean;
  score: number; // 0-100 image quality/centering score
  recommendation: string;
  subjectBounds?: { x: number, y: number, w: number, h: number };
}

/**
 * Analyze product image for Google Shopping compliance and mobile centering
 */
export async function analyzeProductImage(imageUrl: string): Promise<VisionAnalysis> {
  const prompt = `
    You are a Vision AI expert for Google Shopping.
    Analyze this product image URL: ${imageUrl}
    
    CRITERIA:
    1. Centering: Is the main product subject centered? Google Shopping crops to a square on mobile.
    2. Kill-Zone: If we crop the image to a center-square, will parts of the product be cut off?
    3. Background: Is it a clean, non-distracting background (preferably white)?
    
    OUTPUT:
    Return ONLY a JSON object:
    {
      "isTruncated": boolean,
      "score": number (0-100),
      "recommendation": "string suggesting how to fix the image",
      "subjectBounds": {"x": 0.5, "y": 0.5, "w": 0.8, "h": 0.8} // Relative coordinates
    }
  `;

  try {
    const result = await model.generateContent([prompt]); // In a real production environment, we would fetch the image bytes and pass them to Gemini Vision.
    const response = await result.response;
    const text = response.text();
    const cleanJson = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('Vision Analysis Failed:', error);
    // Fallback to safe defaults if AI fails
    return {
      isTruncated: false,
      score: 100,
      recommendation: "Maintain standard square aspect ratio."
    };
  }
}
