/**
 * Rewards Page
 * Manage uTUT/TUT conversion and staking
 */

'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { parseUnits } from 'viem';
import { 
  useUserStats, 
  useUTUTBalance, 
  useTUTBalance,
  useConvertUTUT,
  useStakeTUT,
} from '@/lib/contracts';

// Constants (from SDK)
const DECIMALS = { TUT: 18, uTUT: 2 };
const UTUT_TO_TUT_RATE = 100;

export default function RewardsPage() {
  const { address, isConnected } = useAccount();
  const stats = useUserStats(address);
  const { balance: uTUTBalance, refetch: refetchUTUT } = useUTUTBalance(address);
  const { balance: TUTBalance, refetch: refetchTUT } = useTUTBalance(address);
  
  const [convertAmount, setConvertAmount] = useState('');
  const [stakeAmount, setStakeAmount] = useState('');
  
  const { convert, isPending: isConverting, isSuccess: convertSuccess, hash: convertHash } = useConvertUTUT();
  const { stake, isPending: isStaking, isSuccess: stakeSuccess, hash: stakeHash } = useStakeTUT();

  const handleConvert = async () => {
    if (!convertAmount || parseFloat(convertAmount) <= 0) return;
    
    const amount = parseUnits(convertAmount, DECIMALS.uTUT);
    await convert(amount);
    
    // Refetch balances after success
    setTimeout(() => {
      refetchUTUT();
      refetchTUT();
    }, 2000);
  };

  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) return;
    
    const amount = parseUnits(stakeAmount, DECIMALS.TUT);
    await stake(amount);
    
    // Refetch balances after success
    setTimeout(() => {
      refetchTUT();
      stats.refetch();
    }, 2000);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-graphite flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Connect Your Wallet</h1>
          <p className="text-gray-400 mb-8 max-w-md">
            Connect your wallet to manage your rewards, convert uTUT, and stake TUT.
          </p>
          <ConnectButton />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-graphite text-white">
      {/* Header */}
      <header className="border-b border-graphite-600 bg-graphite/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="Tolani Labs" className="w-8 h-8" />
            <span className="text-xl font-bold">Rewards</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition">
              Dashboard
            </Link>
            <ConnectButton accountStatus="address" chainStatus="icon" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Balances Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-4 gap-4 mb-12"
        >
          <BalanceCard
            title="uTUT Balance"
            value={uTUTBalance}
            suffix="uTUT"
            icon="🎓"
            color="text-signal-red"
            description="Earned from learning"
          />
          <BalanceCard
            title="TUT Balance"
            value={TUTBalance}
            suffix="TUT"
            icon="🪙"
            color="text-cyan"
            description="Governance power"
          />
          <BalanceCard
            title="Staked TUT"
            value={stats.stakedTUT}
            suffix="TUT"
            icon="🔒"
            color="text-emerald"
            description="Earning rewards"
          />
          <BalanceCard
            title="Pending Rewards"
            value={stats.stakingRewards}
            suffix="TUT"
            icon="💰"
            color="text-gold"
            description="Ready to claim"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Convert uTUT to TUT */}
          <motion.div
            id="convert"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-graphite-700 rounded-xl p-8 border border-graphite-600"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🔄</span>
              <div>
                <h2 className="text-xl font-bold">Convert uTUT to TUT</h2>
                <p className="text-gray-400 text-sm">Exchange rate: {UTUT_TO_TUT_RATE} uTUT = 1 TUT</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Amount to convert</label>
                <div className="relative">
                  <input
                    type="number"
                    value={convertAmount}
                    onChange={(e) => setConvertAmount(e.target.value)}
                    placeholder="0"
                    className="w-full bg-graphite-600 border border-graphite-500 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-signal-red"
                  />
                  <button
                    onClick={() => setConvertAmount(uTUTBalance.toString())}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-signal-red text-sm hover:underline"
                  >
                    MAX
                  </button>
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  Available: {uTUTBalance.toLocaleString()} uTUT
                </p>
              </div>

              <div className="bg-graphite-600 rounded-lg p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">You will receive</span>
                  <span className="text-cyan font-bold">
                    {convertAmount ? (parseFloat(convertAmount) / UTUT_TO_TUT_RATE).toFixed(4) : '0'} TUT
                  </span>
                </div>
              </div>

              <button
                onClick={handleConvert}
                disabled={isConverting || !convertAmount || parseFloat(convertAmount) <= 0 || parseFloat(convertAmount) > uTUTBalance}
                className="w-full bg-signal-red hover:bg-signal-red-600 disabled:bg-graphite-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition"
              >
                {isConverting ? 'Converting...' : 'Convert to TUT'}
              </button>

              {convertSuccess && convertHash && (
                <div className="bg-emerald/10 border border-emerald/30 rounded-lg p-4">
                  <p className="text-emerald text-sm">
                    ✓ Conversion successful!{' '}
                    <a
                      href={`https://basescan.org/tx/${convertHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      View transaction
                    </a>
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Stake TUT */}
          <motion.div
            id="stake"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-graphite-700 rounded-xl p-8 border border-graphite-600"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📈</span>
              <div>
                <h2 className="text-xl font-bold">Stake TUT</h2>
                <p className="text-gray-400 text-sm">Earn additional rewards by staking</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Amount to stake</label>
                <div className="relative">
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="0"
                    className="w-full bg-graphite-600 border border-graphite-500 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-emerald"
                  />
                  <button
                    onClick={() => setStakeAmount(TUTBalance.toString())}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald text-sm hover:underline"
                  >
                    MAX
                  </button>
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  Available: {TUTBalance.toFixed(4)} TUT
                </p>
              </div>

              <div className="bg-graphite-600 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Currently staked</span>
                  <span className="text-white">{stats.stakedTUT.toFixed(4)} TUT</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Pending rewards</span>
                  <span className="text-gold">{stats.stakingRewards.toFixed(4)} TUT</span>
                </div>
              </div>

              <button
                onClick={handleStake}
                disabled={isStaking || !stakeAmount || parseFloat(stakeAmount) <= 0 || parseFloat(stakeAmount) > TUTBalance}
                className="w-full bg-emerald hover:bg-emerald/80 disabled:bg-graphite-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition"
              >
                {isStaking ? 'Staking...' : 'Stake TUT'}
              </button>

              {stakeSuccess && stakeHash && (
                <div className="bg-emerald/10 border border-emerald/30 rounded-lg p-4">
                  <p className="text-emerald text-sm">
                    ✓ Staking successful!{' '}
                    <a
                      href={`https://basescan.org/tx/${stakeHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      View transaction
                    </a>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">How Rewards Work</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <InfoCard
              step="1"
              title="Earn uTUT"
              description="Complete IBM SkillsBuild learning modules to earn uTUT tokens automatically. Each track has different reward amounts."
              color="text-signal-red"
            />
            <InfoCard
              step="2"
              title="Convert to TUT"
              description={`Exchange your uTUT at a ${UTUT_TO_TUT_RATE}:1 ratio to receive TUT governance tokens with voting power in the DAO.`}
              color="text-cyan"
            />
            <InfoCard
              step="3"
              title="Stake & Grow"
              description="Stake your TUT in the staking pool to earn additional rewards and increase your governance weight."
              color="text-emerald"
            />
          </div>
        </motion.div>
      </main>
    </div>
  );
}

function BalanceCard({
  title,
  value,
  suffix,
  icon,
  color,
  description,
}: {
  title: string;
  value: number;
  suffix: string;
  icon: string;
  color: string;
  description: string;
}) {
  return (
    <div className="bg-graphite-700 rounded-xl p-6 border border-graphite-600">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{icon}</span>
        <span className="text-gray-400 text-sm">{title}</span>
      </div>
      <div className={`text-2xl font-bold ${color}`}>
        {typeof value === 'number' && value < 1 ? value.toFixed(4) : value.toLocaleString()}
        <span className="text-gray-500 text-sm ml-2">{suffix}</span>
      </div>
      <p className="text-gray-500 text-xs mt-2">{description}</p>
    </div>
  );
}

function InfoCard({
  step,
  title,
  description,
  color,
}: {
  step: string;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="bg-graphite-700 rounded-xl p-6 border border-graphite-600 relative">
      <div className={`text-6xl font-bold ${color} opacity-10 absolute top-4 right-4`}>
        {step}
      </div>
      <div className="relative">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
}
