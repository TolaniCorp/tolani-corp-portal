/**
 * Dashboard Page
 * Shows user progress, token balances, and learning tracks
 */

'use client';

import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useUserStats, useMultipleCourseCompletions } from '@/lib/contracts';
import { LEARNING_TRACKS, COURSE_IDS } from '@/lib/api';

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const stats = useUserStats(address);
  const courseIds = Object.values(COURSE_IDS);
  const { completions } = useMultipleCourseCompletions(address, courseIds);

  // Calculate progress
  const completedCount = Object.values(completions).filter(Boolean).length;
  const totalTracks = LEARNING_TRACKS.length;
  const progressPercentage = totalTracks > 0 ? Math.round((completedCount / totalTracks) * 100) : 0;

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
            Connect your wallet to view your learning progress, token balances, and earned rewards.
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
            <span className="text-xl font-bold">Dashboard</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/rewards" className="text-gray-300 hover:text-white transition">
              Rewards
            </Link>
            <ConnectButton accountStatus="address" chainStatus="icon" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome & Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-gray-400">Track your learning progress and token rewards</p>
        </motion.div>

        {/* Token Balances */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <StatCard
            label="uTUT Balance"
            value={stats.uTUTBalance.toLocaleString()}
            suffix="uTUT"
            color="text-signal-red"
            loading={stats.isLoading}
          />
          <StatCard
            label="TUT Balance"
            value={stats.TUTBalance.toFixed(4)}
            suffix="TUT"
            color="text-cyan"
            loading={stats.isLoading}
          />
          <StatCard
            label="Staked TUT"
            value={stats.stakedTUT.toFixed(4)}
            suffix="TUT"
            color="text-emerald"
            loading={stats.isLoading}
          />
          <StatCard
            label="Total Earned"
            value={stats.totalRewardsEarned.toLocaleString()}
            suffix="uTUT"
            color="text-gold"
            loading={stats.isLoading}
          />
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-graphite-700 rounded-xl p-6 border border-graphite-600 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Learning Progress</h2>
            <span className="text-2xl font-bold text-signal-red">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-graphite-600 rounded-full h-3 mb-4">
            <div
              className="bg-signal-red h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>{completedCount} tracks completed</span>
            <span>{totalTracks} total tracks</span>
          </div>
        </motion.div>

        {/* Learning Tracks Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6">Learning Tracks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEARNING_TRACKS.map((track, i) => {
              const courseId = COURSE_IDS[track.id];
              const isCompleted = completions[courseId] || false;
              
              return (
                <TrackCard
                  key={track.id}
                  track={track}
                  isCompleted={isCompleted}
                  delay={i * 0.05}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <ActionCard
            title="Convert uTUT"
            description="Exchange 100 uTUT for 1 TUT governance token"
            href="/rewards#convert"
            icon="🔄"
            color="bg-signal-red/10 border-signal-red/30"
          />
          <ActionCard
            title="Stake TUT"
            description="Stake your TUT to earn additional rewards"
            href="/rewards#stake"
            icon="📈"
            color="bg-cyan/10 border-cyan/30"
          />
          <ActionCard
            title="View Governance"
            description="Participate in DAO proposals and voting"
            href="https://snapshot.org/#/tolanidao.eth"
            icon="🏛️"
            color="bg-emerald/10 border-emerald/30"
            external
          />
        </motion.div>
      </main>
    </div>
  );
}

function StatCard({ 
  label, 
  value, 
  suffix, 
  color, 
  loading 
}: { 
  label: string; 
  value: string; 
  suffix: string; 
  color: string;
  loading?: boolean;
}) {
  return (
    <div className="bg-graphite-700 rounded-xl p-6 border border-graphite-600">
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      {loading ? (
        <div className="animate-pulse h-8 bg-graphite-600 rounded w-24" />
      ) : (
        <div className="flex items-baseline gap-2">
          <span className={`text-2xl font-bold ${color}`}>{value}</span>
          <span className="text-gray-500 text-sm">{suffix}</span>
        </div>
      )}
    </div>
  );
}

function TrackCard({ 
  track, 
  isCompleted,
  delay 
}: { 
  track: typeof LEARNING_TRACKS[0]; 
  isCompleted: boolean;
  delay: number;
}) {
  const colorClasses: Record<string, string> = {
    'signal-red': 'border-signal-red bg-signal-red/10',
    'cyan': 'border-cyan bg-cyan/10',
    'emerald': 'border-emerald bg-emerald/10',
    'gold': 'border-gold bg-gold/10',
    'teal': 'border-teal bg-teal/10',
  };

  return (
    <motion.a
      href={track.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`bg-graphite-700 rounded-xl p-6 border-l-4 ${
        isCompleted ? 'border-emerald' : `border-${track.color}`
      } hover:bg-graphite-600 transition cursor-pointer group relative`}
    >
      {isCompleted && (
        <div className="absolute top-4 right-4 bg-emerald text-white text-xs px-2 py-1 rounded-full">
          ✓ Completed
        </div>
      )}
      <div className="text-4xl mb-4">{track.icon}</div>
      <h3 className="text-lg font-bold mb-2 group-hover:text-cyan transition">
        {track.name}
      </h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {track.description}
      </p>
      <div className="flex items-center gap-4 text-sm">
        <span className="text-gray-500">{track.modules} modules</span>
        <span className={`${colorClasses[track.color] || 'bg-graphite-600'} px-2 py-1 rounded text-xs font-semibold`}>
          {track.reward} uTUT
        </span>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {track.skills.slice(0, 3).map((skill, j) => (
          <span key={j} className="bg-graphite-600 px-2 py-1 rounded text-xs text-gray-300">
            {skill}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

function ActionCard({
  title,
  description,
  href,
  icon,
  color,
  external
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
  color: string;
  external?: boolean;
}) {
  const Component = external ? 'a' : Link;
  const props = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Component
      href={href}
      {...props}
      className={`${color} border rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer block`}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </Component>
  );
}
