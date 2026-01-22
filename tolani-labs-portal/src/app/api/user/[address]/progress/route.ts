/**
 * GET /api/user/[address]/progress
 * Returns user's learning progress
 */

import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http, parseAbi } from 'viem';
import { base } from 'viem/chains';
import { COURSE_IDS } from '@/lib/api';

const TRAINING_REWARDS = '0x1fec9c4dB67b6d3531171936C13760E2a61415D7' as const;

const ABI = parseAbi([
  'function hasCompleted(address user, uint256 courseId) view returns (bool)',
  'function userTotalRewards(address user) view returns (uint256)',
]);

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params;

  // Validate address
  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return NextResponse.json(
      { error: 'Invalid address' },
      { status: 400 }
    );
  }

  try {
    const client = createPublicClient({
      chain: base,
      transport: http(process.env.NEXT_PUBLIC_BASE_RPC || 'https://mainnet.base.org'),
    });

    // Check completion status for all courses
    const courseEntries = Object.entries(COURSE_IDS);
    const completionChecks = await Promise.all(
      courseEntries.map(async ([trackId, courseId]) => {
        const completed = await client.readContract({
          address: TRAINING_REWARDS,
          abi: ABI,
          functionName: 'hasCompleted',
          args: [address as `0x${string}`, BigInt(courseId)],
        });
        return { trackId, courseId, completed };
      })
    );

    // Get total rewards
    const totalRewards = await client.readContract({
      address: TRAINING_REWARDS,
      abi: ABI,
      functionName: 'userTotalRewards',
      args: [address as `0x${string}`],
    });

    const completedTracks = completionChecks
      .filter(c => c.completed)
      .map(c => c.trackId);

    return NextResponse.json({
      address,
      completedModules: [], // Module-level tracking not yet implemented
      completedTracks,
      totalRewardsEarned: Number(totalRewards) / 100, // Convert from uTUT smallest unit
      pendingRewards: 0,
      lastActivity: new Date().toISOString(),
      stats: {
        tracksCompleted: completedTracks.length,
        totalTracksAvailable: courseEntries.length,
        completionPercentage: Math.round((completedTracks.length / courseEntries.length) * 100),
      },
    });
  } catch (error: any) {
    console.error('Error fetching user progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress', message: error.message },
      { status: 500 }
    );
  }
}
