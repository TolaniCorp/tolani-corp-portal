/**
 * Wallet & Web3 Configuration
 * RainbowKit + wagmi setup for Base chain
 */

'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base, baseSepolia } from 'wagmi/chains';
import { http } from 'wagmi';

// Chain IDs
const CHAIN_IDS = {
  ETHEREUM: 1,
  BASE: 8453,
  BASE_SEPOLIA: 84532,
};

// WalletConnect Project ID - required for production
// Get your project ID at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id';

// Configure chains
export const config = getDefaultConfig({
  appName: 'Tolani Labs',
  projectId,
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_RPC || 'https://mainnet.base.org'),
    [baseSepolia.id]: http('https://sepolia.base.org'),
  },
  ssr: true,
});

// Default chain based on environment
export const defaultChain = process.env.NODE_ENV === 'production' ? base : baseSepolia;

// Contract addresses by chain
export const getContractAddress = (
  contract: 'TUT' | 'uTUT' | 'TrainingRewards' | 'Governor' | 'Treasury' | 'StakingPool',
  chainId: number = CHAIN_IDS.BASE
): `0x${string}` => {
  const addresses: Record<string, Record<number, `0x${string}`>> = {
    TUT: {
      [CHAIN_IDS.BASE]: '0xAf7e938741a720508897Bf3a13538f6713A337A4',
    },
    uTUT: {
      [CHAIN_IDS.BASE]: '0x6D3205ba4066260ca4B94F9221c46b95B1eedcD4',
    },
    TrainingRewards: {
      [CHAIN_IDS.BASE]: '0x1fec9c4dB67b6d3531171936C13760E2a61415D7',
    },
    Governor: {
      [CHAIN_IDS.BASE]: '0xeEd65936FaEDb315c598F8b1aF796289BCE2B7f6',
    },
    Treasury: {
      [CHAIN_IDS.BASE]: '0x3FaB09377944144eB991DB2a5ADf2C96A5e8587c',
    },
    StakingPool: {
      [CHAIN_IDS.BASE]: '0x21Fc5CD8606e19961F38E26fd7286f7e647eFf04',
    },
  };

  return addresses[contract]?.[chainId] || '0x0000000000000000000000000000000000000000';
};
