/**
 * API Client for Tolani Labs Portal
 * Provides typed interfaces for all backend interactions
 */

// API base URL
const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

// Types
export interface Track {
  id: string;
  name: string;
  description: string;
  modules: number;
  reward: number;
  skills: string[];
  icon: string;
  color: string;
  externalUrl?: string;
}

export interface Module {
  id: string;
  trackId: string;
  name: string;
  description: string;
  duration: string;
  reward: number;
  order: number;
  externalUrl: string;
}

export interface UserProgress {
  address: string;
  completedModules: string[];
  completedTracks: string[];
  totalRewardsEarned: number;
  pendingRewards: number;
  lastActivity: string;
}

export interface LeaderboardEntry {
  rank: number;
  address: string;
  ensName?: string;
  modulesCompleted: number;
  totalRewards: number;
  tracksCompleted: number;
}

export interface RewardClaim {
  id: string;
  moduleId: string;
  amount: number;
  status: 'pending' | 'claimable' | 'claimed';
  signature?: string;
  txHash?: string;
  claimedAt?: string;
}

// Learning tracks data (synced with IBM SkillsBuild)
export const LEARNING_TRACKS: Track[] = [
  {
    id: 'blockchain-fundamentals',
    name: 'Blockchain & Smart Contracts',
    description: 'Master the fundamentals of blockchain technology and smart contract development.',
    modules: 12,
    reward: 500,
    skills: ['Solidity', 'Web3.js', 'DeFi Protocols', 'EVM'],
    icon: '🔗',
    color: 'signal-red',
    externalUrl: 'https://skillsbuild.org/learn/course/blockchain-fundamentals'
  },
  {
    id: 'cybersecurity-essentials',
    name: 'Cybersecurity Fundamentals',
    description: 'Learn essential cybersecurity concepts and best practices.',
    modules: 8,
    reward: 350,
    skills: ['Network Security', 'Threat Analysis', 'Compliance', 'Risk Assessment'],
    icon: '🛡️',
    color: 'cyan',
    externalUrl: 'https://skillsbuild.org/learn/course/cybersecurity-fundamentals'
  },
  {
    id: 'ai-machine-learning',
    name: 'AI & Machine Learning',
    description: 'Dive into artificial intelligence and machine learning fundamentals.',
    modules: 15,
    reward: 600,
    skills: ['Python ML', 'Neural Networks', 'LLMs', 'Data Analysis'],
    icon: '🤖',
    color: 'emerald',
    externalUrl: 'https://skillsbuild.org/learn/course/ai-fundamentals'
  },
  {
    id: 'dao-governance',
    name: 'DAO Governance & Web3',
    description: 'Understand decentralized autonomous organizations and governance models.',
    modules: 6,
    reward: 300,
    skills: ['Governance Models', 'Tokenomics', 'Proposals', 'Voting Systems'],
    icon: '🏛️',
    color: 'gold',
    externalUrl: 'https://skillsbuild.org/learn/course/dao-governance'
  },
  {
    id: 'business-leadership',
    name: 'Business & Leadership',
    description: 'Develop essential business and leadership skills for the modern workplace.',
    modules: 10,
    reward: 400,
    skills: ['Strategy', 'Finance', 'Team Management', 'Communication'],
    icon: '📊',
    color: 'teal',
    externalUrl: 'https://skillsbuild.org/learn/course/business-leadership'
  },
  {
    id: 'esg-sustainability',
    name: 'ESG & Sustainability',
    description: 'Learn environmental, social, and governance principles for sustainable business.',
    modules: 8,
    reward: 350,
    skills: ['Impact Measurement', 'Carbon Tracking', 'Reporting', 'SDGs'],
    icon: '🌱',
    color: 'emerald',
    externalUrl: 'https://skillsbuild.org/learn/course/esg-sustainability'
  },
];

// Course ID mapping for on-chain contract
export const COURSE_IDS: Record<string, number> = {
  'blockchain-fundamentals': 0,
  'ai-fundamentals': 1,
  'web3-development': 2,
  'cybersecurity-essentials': 3,
  'data-science-intro': 4,
  'dao-governance': 5,
  'business-leadership': 6,
  'esg-sustainability': 7,
};

/**
 * API Client class for all backend interactions
 */
export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Tracks
  async getTracks(): Promise<Track[]> {
    return LEARNING_TRACKS; // Return static data for now, can be fetched from API later
  }

  async getTrack(trackId: string): Promise<Track | undefined> {
    return LEARNING_TRACKS.find(t => t.id === trackId);
  }

  // User Progress
  async getUserProgress(address: string): Promise<UserProgress> {
    try {
      return await this.fetch<UserProgress>(`/api/user/${address}/progress`);
    } catch {
      // Return empty progress if API not available
      return {
        address,
        completedModules: [],
        completedTracks: [],
        totalRewardsEarned: 0,
        pendingRewards: 0,
        lastActivity: new Date().toISOString(),
      };
    }
  }

  // Rewards
  async getRewardClaims(address: string): Promise<RewardClaim[]> {
    try {
      return await this.fetch<RewardClaim[]>(`/api/user/${address}/rewards`);
    } catch {
      return [];
    }
  }

  async claimReward(claimId: string, signature: string): Promise<{ txHash: string }> {
    return this.fetch('/api/rewards/claim', {
      method: 'POST',
      body: JSON.stringify({ claimId, signature }),
    });
  }

  // Leaderboard
  async getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
    try {
      return await this.fetch<LeaderboardEntry[]>(`/api/leaderboard?limit=${limit}`);
    } catch {
      return [];
    }
  }

  // IBM SkillsBuild integration
  async linkSkillsBuildAccount(address: string, skillsBuildId: string): Promise<{ success: boolean }> {
    return this.fetch('/api/skillsbuild/link', {
      method: 'POST',
      body: JSON.stringify({ address, skillsBuildId }),
    });
  }

  async getSkillsBuildProgress(address: string): Promise<{ modules: string[]; synced: string }> {
    return this.fetch(`/api/skillsbuild/progress/${address}`);
  }
}

// Singleton instance
export const api = new ApiClient();

// React Query keys
export const queryKeys = {
  tracks: ['tracks'] as const,
  track: (id: string) => ['tracks', id] as const,
  userProgress: (address: string) => ['user', address, 'progress'] as const,
  userRewards: (address: string) => ['user', address, 'rewards'] as const,
  leaderboard: (limit: number) => ['leaderboard', limit] as const,
  skillsBuildProgress: (address: string) => ['skillsbuild', address] as const,
};

/**
 * Calculate total possible rewards
 */
export function getTotalPossibleRewards(): number {
  return LEARNING_TRACKS.reduce((sum, track) => sum + track.reward, 0);
}

/**
 * Get track by course ID (on-chain ID)
 */
export function getTrackByCourseId(courseId: number): Track | undefined {
  const trackId = Object.entries(COURSE_IDS).find(([_, id]) => id === courseId)?.[0];
  return trackId ? LEARNING_TRACKS.find(t => t.id === trackId) : undefined;
}
