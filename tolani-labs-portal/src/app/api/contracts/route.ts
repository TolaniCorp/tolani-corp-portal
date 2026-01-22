/**
 * GET /api/contracts
 * Returns all deployed contract addresses
 */

import { NextResponse } from 'next/server';

// Chain IDs
const CHAIN_IDS = {
  ETHEREUM: 1,
  BASE: 8453,
};

export async function GET() {
  return NextResponse.json({
    chainId: CHAIN_IDS.BASE,
    network: 'base',
    explorer: 'https://basescan.org',
    contracts: {
      TUT: {
        address: '0xAf7e938741a720508897Bf3a13538f6713A337A4',
        name: 'Tolani Utility Token',
        symbol: 'TUT',
        decimals: 18,
      },
      uTUT: {
        address: '0x6D3205ba4066260ca4B94F9221c46b95B1eedcD4',
        name: 'Micro Tolani Utility Token',
        symbol: 'uTUT',
        decimals: 2,
      },
      TrainingRewards: {
        address: '0x1fec9c4dB67b6d3531171936C13760E2a61415D7',
        description: 'Rewards contract for IBM SkillsBuild completions',
      },
      TUTConverter: {
        address: '0xF064C89198Ce3c595bf60ac0b6A12045CB49ebeD',
        description: 'Convert uTUT to TUT (100:1 ratio)',
      },
      Governor: {
        address: '0xeEd65936FaEDb315c598F8b1aF796289BCE2B7f6',
        description: 'DAO governance contract',
      },
      Treasury: {
        address: '0x3FaB09377944144eB991DB2a5ADf2C96A5e8587c',
        description: 'DAO treasury',
      },
      StakingPool: {
        address: '0x21Fc5CD8606e19961F38E26fd7286f7e647eFf04',
        description: 'TUT staking for rewards',
      },
      Timelock: {
        address: '0xb23f0662511ec0ee8d3760e3158a5Ab01551d52d',
        description: 'Governance timelock controller',
      },
    },
    ethereum: {
      chainId: CHAIN_IDS.ETHEREUM,
      TUT: '0x90e9d7189D605a824C2481Fe88A1d9A7DDFAF71D',
    },
  });
}
