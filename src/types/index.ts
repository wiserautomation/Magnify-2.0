// ─────────────────────────────────────────────────────────────────────────────
// Core domain types for Magnify 2.0
// ─────────────────────────────────────────────────────────────────────────────

export interface MagnifyUser {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  lastLoginAt: Date;
  gmcTokens?: OAuthTokens;
  adsTokens?: OAuthTokens;
}

export interface OAuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // unix ms
}

export interface Store {
  id: string;
  userId: string;
  merchantId: string;
  name: string;
  domain: string;
  healthScore: number; // 0–100
  totalProducts: number;
  optimizedCount: number;
  testingCount: number;
  createdAt: Date;
  lastSyncAt: Date | null;
  settings: StoreSettings;
}

export interface StoreSettings {
  autopilot: boolean;
  abTestDurationDays: number;
  minConfidenceLevel: number; // 0.8 = 80%
  maxConcurrentTests: number;
  targetGeography?: string;
  targetLanguage?: string;
}

export interface Product {
  id: string;
  storeId: string;
  gmcId: string;
  title: string;
  originalTitle: string;
  currentTitle: string;
  description: string;
  imageUrl: string;
  price: number;
  currency: string;
  category: string;
  brand: string;
  geography: string;
  language: string;
  titleScore: number; // 0–100
  titleIssues: TitleIssue[];
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  revenue: number;
  lastOptimizedAt: Date | null;
  optimizationCount: number;
  status: ProductStatus;
  activeExperimentId?: string;
}

export type ProductStatus = 'pending' | 'optimized' | 'testing' | 'champion';

export interface TitleIssue {
  type: TitleIssueType;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  suggestion?: string;
}

export type TitleIssueType =
  | 'too_short'
  | 'too_long'
  | 'missing_brand'
  | 'missing_color'
  | 'missing_size'
  | 'keyword_stuffing'
  | 'special_characters'
  | 'generic_words'
  | 'price_in_title'
  | 'promotional_language'
  | 'missing_product_type'
  | 'weak_attributes';

export interface Experiment {
  id: string;
  storeId: string;
  productId: string;
  productTitle: string; // for display
  variantA: ExperimentVariant; // control (original)
  variantB: ExperimentVariant; // challenger (AI-optimized)
  strategy: TitleStrategy;
  status: ExperimentStatus;
  startedAt: Date;
  endedAt: Date | null;
  confidenceLevel: number; // 0–1
  metadata: ExperimentMetadata;
}

export interface ExperimentVariant {
  title: string;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
}

export type ExperimentStatus = 'running' | 'winner_a' | 'winner_b' | 'inconclusive';

export type TitleStrategy =
  | 'brand_first'
  | 'attribute_first'
  | 'keyword_rich'
  | 'long_tail'
  | 'seasonal'
  | 'price_anchored';

export interface ExperimentMetadata {
  category: string;
  priceRange: string;
  geography: string;
  season: string;
  scoreImprovement: number; // delta in title score
}

export interface IntelligenceInsight {
  id: string;
  category: string;
  geography: string;
  season: string;
  sampleSize: number;
  findings: Finding[];
  benchmarkCTR: number;
  lastUpdatedAt: Date;
}

export interface Finding {
  strategy: TitleStrategy;
  insight: string;
  liftPercent: number;
  confidence: number;
  sampleSize: number;
}

export interface PlatformBenchmark {
  id: string; // category slug
  avgCTR: number;
  avgConversionRate: number;
  topStrategies: { strategy: TitleStrategy; avgLift: number }[];
  seasonalTrends: Record<string, number>; // month → multiplier
  competitorDensity: 'low' | 'medium' | 'high';
}

// Dashboard aggregate types
export interface DashboardStats {
  totalProducts: number;
  optimizedCount: number;
  testingCount: number;
  activeExperiments: number;
  completedExperiments: number;
  winRate: number; // % of experiments where variant B won
  avgLiftPercent: number; // avg CTR lift from winning experiments
  estimatedRevenueImpact: number;
  healthScore: number;
}
