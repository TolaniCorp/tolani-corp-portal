/**
 * Contract Hooks
 * React hooks for reading on-chain data from Tolani Labs contracts
 */

'use client';

import { useReadContract, useReadContracts, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseAbi, formatUnits } from 'viem';
import { base } from 'wagmi/chains';
import { getContractAddress } from './wagmi';

// Constants
const DECIMALS = { TUT: 18, uTUT: 2 };

// ABIs
const ERC20_ABI = parseAbi([
  'function balanceOf(address account) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
]);

const TRAINING_REWARDS_ABI = parseAbi([
  'function hasCompleted(address user, uint256 courseId) view returns (bool)',
  'function courses(uint256 courseId) view returns (string name, uint256 rewardAmount, uint256 maxCompletions, uint256 completions, bool active, uint256 createdAt)',
  'function userTotalRewards(address user) view returns (uint256)',
]);

const TUT_CONVERTER_ABI = parseAbi([
  'function convert(uint256 uTUTAmount) external',
  'function conversionRate() view returns (uint256)',
]);

const STAKING_POOL_ABI = parseAbi([
  'function balanceOf(address account) view returns (uint256)',
  'function stake(uint256 amount) external',
  'function withdraw(uint256 amount) external',
  'function earned(address account) view returns (uint256)',
  'function getReward() external',
]);

/**
 * Hook to get uTUT balance
 */
export function useUTUTBalance(address: `0x${string}` | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: getContractAddress('uTUT'),
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    chainId: base.id,
    query: {
      enabled: !!address,
    },
  });

  const balance = data ? Number(formatUnits(data, DECIMALS.uTUT)) : 0;

  return { balance, raw: data, isLoading, error, refetch };
}

/**
 * Hook to get TUT balance
 */
export function useTUTBalance(address: `0x${string}` | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: getContractAddress('TUT'),
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    chainId: base.id,
    query: {
      enabled: !!address,
    },
  });

  const balance = data ? Number(formatUnits(data, DECIMALS.TUT)) : 0;

  return { balance, raw: data, isLoading, error, refetch };
}

/**
 * Hook to check if user has completed a specific course
 */
export function useCourseCompletion(address: `0x${string}` | undefined, courseId: number) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: getContractAddress('TrainingRewards'),
    abi: TRAINING_REWARDS_ABI,
    functionName: 'hasCompleted',
    args: address ? [address, BigInt(courseId)] : undefined,
    chainId: base.id,
    query: {
      enabled: !!address,
    },
  });

  return { completed: !!data, isLoading, error, refetch };
}

/**
 * Hook to check completion status of multiple courses
 */
export function useMultipleCourseCompletions(address: `0x${string}` | undefined, courseIds: number[]): {
  completions: Record<number, boolean>;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
} {
  const contracts = courseIds.map(courseId => ({
    address: getContractAddress('TrainingRewards'),
    abi: TRAINING_REWARDS_ABI,
    functionName: 'hasCompleted' as const,
    args: [address!, BigInt(courseId)] as const,
    chainId: base.id,
  }));

  const { data, isLoading, error, refetch } = useReadContracts({
    contracts: address ? contracts : [],
    query: {
      enabled: !!address && courseIds.length > 0,
    },
  });

  const completions: Record<number, boolean> = {};
  if (data) {
    courseIds.forEach((courseId, index) => {
      completions[courseId] = data[index]?.result === true;
    });
  }

  return { completions, isLoading, error: error ?? null, refetch };
}

/**
 * Hook to get user's total rewards from TrainingRewards contract
 */
export function useUserTotalRewards(address: `0x${string}` | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: getContractAddress('TrainingRewards'),
    abi: TRAINING_REWARDS_ABI,
    functionName: 'userTotalRewards',
    args: address ? [address] : undefined,
    chainId: base.id,
    query: {
      enabled: !!address,
    },
  });

  const rewards = data ? Number(formatUnits(data, DECIMALS.uTUT)) : 0;

  return { rewards, raw: data, isLoading, error, refetch };
}

/**
 * Hook to get staked TUT balance
 */
export function useStakedTUT(address: `0x${string}` | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: getContractAddress('StakingPool'),
    abi: STAKING_POOL_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    chainId: base.id,
    query: {
      enabled: !!address,
    },
  });

  const balance = data ? Number(formatUnits(data, DECIMALS.TUT)) : 0;

  return { balance, raw: data, isLoading, error, refetch };
}

/**
 * Hook to get pending staking rewards
 */
export function useStakingRewards(address: `0x${string}` | undefined) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: getContractAddress('StakingPool'),
    abi: STAKING_POOL_ABI,
    functionName: 'earned',
    args: address ? [address] : undefined,
    chainId: base.id,
    query: {
      enabled: !!address,
    },
  });

  const rewards = data ? Number(formatUnits(data, DECIMALS.TUT)) : 0;

  return { rewards, raw: data, isLoading, error, refetch };
}

/**
 * Hook for converting uTUT to TUT
 */
export function useConvertUTUT(): {
  convert: (amount: bigint) => Promise<void>;
  hash: `0x${string}` | undefined;
  isPending: boolean;
  isConfirming: boolean;
  isSuccess: boolean;
  error: Error | null;
} {
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const convert = async (amount: bigint) => {
    await writeContract({
      address: '0xF064C89198Ce3c595bf60ac0b6A12045CB49ebeD', // TUTConverter
      abi: TUT_CONVERTER_ABI,
      functionName: 'convert',
      args: [amount],
      chainId: base.id,
    });
  };

  return { convert, hash, isPending, isConfirming, isSuccess, error: error ?? null };
}

/**
 * Hook for staking TUT
 */
export function useStakeTUT(): {
  stake: (amount: bigint) => Promise<void>;
  hash: `0x${string}` | undefined;
  isPending: boolean;
  isConfirming: boolean;
  isSuccess: boolean;
  error: Error | null;
} {
  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const stake = async (amount: bigint) => {
    await writeContract({
      address: getContractAddress('StakingPool'),
      abi: STAKING_POOL_ABI,
      functionName: 'stake',
      args: [amount],
      chainId: base.id,
    });
  };

  return { stake, hash, isPending, isConfirming, isSuccess, error: error ?? null };
}

/**
 * Hook to get combined user stats
 */
export function useUserStats(address: `0x${string}` | undefined): {
  uTUTBalance: number;
  TUTBalance: number;
  stakedTUT: number;
  stakingRewards: number;
  totalRewardsEarned: number;
  isLoading: boolean;
  refetch: () => void;
} {
  const uTUT = useUTUTBalance(address);
  const TUT = useTUTBalance(address);
  const staked = useStakedTUT(address);
  const stakingRewards = useStakingRewards(address);
  const totalRewards = useUserTotalRewards(address);

  const isLoading = uTUT.isLoading || TUT.isLoading || staked.isLoading || stakingRewards.isLoading || totalRewards.isLoading;

  return {
    uTUTBalance: uTUT.balance,
    TUTBalance: TUT.balance,
    stakedTUT: staked.balance,
    stakingRewards: stakingRewards.rewards,
    totalRewardsEarned: totalRewards.rewards,
    isLoading,
    refetch: () => {
      uTUT.refetch();
      TUT.refetch();
      staked.refetch();
      stakingRewards.refetch();
      totalRewards.refetch();
    },
  };
}
