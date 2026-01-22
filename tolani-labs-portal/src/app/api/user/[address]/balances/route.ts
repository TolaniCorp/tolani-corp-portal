/**
 * GET /api/user/[address]/balances
 * Returns user's token balances
 */

import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http, parseAbi, formatUnits } from 'viem';
import { base } from 'viem/chains';

const CONTRACTS = {
  TUT: '0xAf7e938741a720508897Bf3a13538f6713A337A4' as const,
  uTUT: '0x6D3205ba4066260ca4B94F9221c46b95B1eedcD4' as const,
  StakingPool: '0x21Fc5CD8606e19961F38E26fd7286f7e647eFf04' as const,
};

const ERC20_ABI = parseAbi([
  'function balanceOf(address account) view returns (uint256)',
]);

const STAKING_ABI = parseAbi([
  'function balanceOf(address account) view returns (uint256)',
  'function earned(address account) view returns (uint256)',
]);

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params;

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

    const [tutBalance, ututBalance, stakedBalance, earnedRewards] = await Promise.all([
      client.readContract({
        address: CONTRACTS.TUT,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [address as `0x${string}`],
      }),
      client.readContract({
        address: CONTRACTS.uTUT,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [address as `0x${string}`],
      }),
      client.readContract({
        address: CONTRACTS.StakingPool,
        abi: STAKING_ABI,
        functionName: 'balanceOf',
        args: [address as `0x${string}`],
      }),
      client.readContract({
        address: CONTRACTS.StakingPool,
        abi: STAKING_ABI,
        functionName: 'earned',
        args: [address as `0x${string}`],
      }),
    ]);

    return NextResponse.json({
      address,
      balances: {
        TUT: {
          raw: tutBalance.toString(),
          formatted: formatUnits(tutBalance, 18),
        },
        uTUT: {
          raw: ututBalance.toString(),
          formatted: formatUnits(ututBalance, 2),
        },
        stakedTUT: {
          raw: stakedBalance.toString(),
          formatted: formatUnits(stakedBalance, 18),
        },
        pendingRewards: {
          raw: earnedRewards.toString(),
          formatted: formatUnits(earnedRewards, 18),
        },
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error fetching balances:', error);
    return NextResponse.json(
      { error: 'Failed to fetch balances', message: error.message },
      { status: 500 }
    );
  }
}
