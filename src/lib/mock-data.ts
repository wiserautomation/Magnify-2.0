import { type Store, type DashboardStats } from '@/types';

/**
 * Mock data for development and initial dashboard scaffolding
 */

export const MOCK_STORES: Store[] = [
  {
    id: 'store_123',
    userId: 'user_456',
    merchantId: '123456789',
    name: 'Outdoor Gear Co.',
    domain: 'outdoorgear.example.com',
    healthScore: 42,
    totalProducts: 1240,
    optimizedCount: 145,
    testingCount: 12,
    createdAt: new Date('2024-01-15'),
    lastSyncAt: new Date('2024-03-21T10:00:00Z'),
    settings: {
      autopilot: true,
      abTestDurationDays: 14,
      minConfidenceLevel: 0.95,
      maxConcurrentTests: 50,
      targetGeography: 'US',
      targetLanguage: 'en',
    },
  },
];

export const MOCK_STATS: DashboardStats = {
  totalProducts: 1240,
  optimizedCount: 145,
  testingCount: 12,
  activeExperiments: 42,
  completedExperiments: 156,
  winRate: 68,
  avgLiftPercent: 24.5,
  estimatedRevenueImpact: 12450,
  healthScore: 42,
};
