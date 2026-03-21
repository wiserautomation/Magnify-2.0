import type { TitleIssue, TitleIssueType } from '@/types';

export interface ScoreResult {
  score: number; // 0–100
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  issues: TitleIssue[];
  breakdown: ScoreBreakdown;
}

export interface ScoreBreakdown {
  length: number;        // 0–20 pts
  brand: number;         // 0–15 pts
  attributes: number;    // 0–25 pts
  keywords: number;      // 0–20 pts
  clarity: number;       // 0–20 pts
}

const BRAND_STOP_WORDS = new Set(['the', 'a', 'an', 'and', 'or', 'for', 'of', 'in', 'on', 'at', 'with', 'by']);

export function scoreTitle(title: string, brand?: string): ScoreResult {
  const issues: TitleIssue[] = [];
  let score = 0;
  const breakdown: ScoreBreakdown = { length: 0, brand: 0, attributes: 0, keywords: 0, clarity: 0 };

  const trimmed = title.trim();
  const len = trimmed.length;
  const words = trimmed.split(/\s+/);

  // ── Length (0–20 pts) ──────────────────────────────────────────────────────
  if (len >= 70 && len <= 150) {
    breakdown.length = 20;
  } else if (len >= 50 && len < 70) {
    breakdown.length = 14;
    issues.push({ type: 'too_short', severity: 'warning', message: 'Title under 70 characters — add more attributes', suggestion: 'Include color, material, size, or model number' });
  } else if (len > 150) {
    breakdown.length = 10;
    issues.push({ type: 'too_long', severity: 'warning', message: 'Title exceeds 150 characters', suggestion: 'Trim to the most important 150 characters; Google truncates beyond this' });
  } else if (len < 50) {
    breakdown.length = 4;
    issues.push({ type: 'too_short', severity: 'critical', message: 'Title under 50 characters — severely under-optimized', suggestion: 'Add brand, size, color, material, and key attributes' });
  } else {
    breakdown.length = 0;
    issues.push({ type: 'too_short', severity: 'critical', message: 'Title too short (under 30 characters)', suggestion: 'Title needs significant expansion with product attributes' });
  }

  // ── Brand placement (0–15 pts) ─────────────────────────────────────────────
  if (brand && brand.trim().length > 0) {
    const brandLower = brand.toLowerCase();
    const titleLower = trimmed.toLowerCase();
    if (titleLower.startsWith(brandLower)) {
      breakdown.brand = 15;
    } else if (titleLower.includes(brandLower)) {
      breakdown.brand = 10;
      issues.push({ type: 'missing_brand', severity: 'info', message: 'Brand not at start of title', suggestion: `Move "${brand}" to the beginning of the title` });
    } else {
      breakdown.brand = 0;
      issues.push({ type: 'missing_brand', severity: 'critical', message: 'Brand missing from title', suggestion: `Add "${brand}" as the first word` });
    }
  } else {
    breakdown.brand = 8; // no brand info provided — partial credit
  }

  // ── Key attributes (0–25 pts) ──────────────────────────────────────────────
  let attrScore = 0;
  const titleLower = trimmed.toLowerCase();

  // Color detection
  const colors = ['black', 'white', 'red', 'blue', 'green', 'yellow', 'grey', 'gray', 'silver', 'gold', 'brown', 'pink', 'purple', 'orange', 'beige', 'navy', 'teal', 'maroon'];
  if (colors.some((c) => titleLower.includes(c))) attrScore += 7;
  
  // Size/dimension detection
  if (/\b(\d+[""]|xs|s\b|m\b|l\b|xl|xxl|small|medium|large|(\d+\s*(cm|mm|inch|ft|kg|g\b|oz|ml|l\b)))\b/i.test(trimmed)) attrScore += 7;
  
  // Material detection
  const materials = ['cotton', 'leather', 'metal', 'plastic', 'wood', 'silicon', 'stainless', 'aluminum', 'aluminium', 'polyester', 'nylon', 'rubber', 'glass', 'ceramic', 'fabric', 'wool', 'linen'];
  if (materials.some((m) => titleLower.includes(m))) attrScore += 6;

  // Model/SKU number
  if (/\b[A-Z0-9]{4,}\b/.test(trimmed)) attrScore += 5;

  breakdown.attributes = Math.min(attrScore, 25);

  if (attrScore < 10) {
    issues.push({ type: 'weak_attributes', severity: 'critical', message: 'Missing key product attributes', suggestion: 'Add color, size, material, or model number to help Google match relevant searches' });
  } else if (attrScore < 18) {
    issues.push({ type: 'weak_attributes', severity: 'warning', message: 'Few product attributes detected', suggestion: 'Consider adding color or material for better matching' });
  }

  // ── Keywords / search relevance (0–20 pts) ─────────────────────────────────
  let kwScore = 20;

  // Promotional language penalty
  const promoWords = ['sale', 'discount', 'deal', 'offer', 'cheap', 'buy now', 'free shipping', 'best price', 'clearance'];
  if (promoWords.some((p) => titleLower.includes(p))) {
    kwScore -= 10;
    issues.push({ type: 'promotional_language', severity: 'critical', message: 'Promotional language detected', suggestion: 'Remove promotional words like "sale", "discount", "cheap" — Google may penalize them' });
  }

  // Price in title
  if (/\$|€|£|\d+\.\d{2}/.test(trimmed)) {
    kwScore -= 8;
    issues.push({ type: 'price_in_title', severity: 'critical', message: 'Price detected in title', suggestion: 'Remove price from title — Google shows price separately and may flag this' });
  }

  // Keyword stuffing
  const wordFreq = words.reduce<Record<string, number>>((acc, w) => {
    const lower = w.toLowerCase();
    if (!BRAND_STOP_WORDS.has(lower)) acc[lower] = (acc[lower] || 0) + 1;
    return acc;
  }, {});
  const stuffed = Object.values(wordFreq).some((count) => count > 3);
  if (stuffed) {
    kwScore -= 8;
    issues.push({ type: 'keyword_stuffing', severity: 'warning', message: 'Repeated words detected', suggestion: 'Avoid repeating the same words — Google interprets this as spam' });
  }

  breakdown.keywords = Math.max(kwScore, 0);

  // ── Clarity / readability (0–20 pts) ──────────────────────────────────────
  let clarityScore = 20;

  // Special characters
  if (/[!@#%^&*={}[\]|<>]/.test(trimmed)) {
    clarityScore -= 10;
    issues.push({ type: 'special_characters', severity: 'warning', message: 'Special characters in title', suggestion: 'Remove special characters like !, @, # — they hurt click-through rates' });
  }

  // All caps words
  const allCapsWords = words.filter((w) => w.length > 3 && w === w.toUpperCase() && /[A-Z]/.test(w));
  if (allCapsWords.length > 1) {
    clarityScore -= 5;
    issues.push({ type: 'special_characters', severity: 'info', message: 'Multiple ALL-CAPS words', suggestion: 'Use title case instead of all caps for better readability' });
  }

  // Generic/weak words
  const genericWords = ['product', 'item', 'thing', 'stuff', 'good', 'great', 'best', 'quality'];
  if (genericWords.some((g) => titleLower.includes(g))) {
    clarityScore -= 5;
    issues.push({ type: 'generic_words', severity: 'warning', message: 'Generic descriptors detected', suggestion: 'Replace generic words with specific, searchable attributes' });
  }

  breakdown.clarity = Math.max(clarityScore, 0);

  // ── Final score ─────────────────────────────────────────────────────────────
  score = breakdown.length + breakdown.brand + breakdown.attributes + breakdown.keywords + breakdown.clarity;
  score = Math.min(Math.max(score, 0), 100);

  const grade: ScoreResult['grade'] =
    score >= 80 ? 'A' : score >= 65 ? 'B' : score >= 50 ? 'C' : score >= 35 ? 'D' : 'F';

  return { score, grade, issues, breakdown };
}

export function getTitleScoreLabel(score: number): string {
  if (score >= 80) return 'Optimized';
  if (score >= 65) return 'Good';
  if (score >= 50) return 'Needs Work';
  if (score >= 35) return 'Poor';
  return 'Critical';
}

export function getTitleScoreColor(score: number): string {
  if (score >= 80) return '#10b981'; // emerald
  if (score >= 65) return '#3b82f6'; // blue
  if (score >= 50) return '#f59e0b'; // amber
  if (score >= 35) return '#f97316'; // orange
  return '#ef4444'; // red
}
