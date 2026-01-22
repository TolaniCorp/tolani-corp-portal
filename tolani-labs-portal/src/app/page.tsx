"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <div className="min-h-screen bg-graphite text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-graphite/90 backdrop-blur-sm border-b border-graphite-600">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Tolani Labs" className="w-8 h-8" />
            <span className="text-xl font-bold">Tolani Labs</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#tracks" className="text-gray-300 hover:text-white transition">Learning Tracks</a>
            <a href="#rewards" className="text-gray-300 hover:text-white transition">Rewards</a>
            <a href="#ecosystem" className="text-gray-300 hover:text-white transition">Ecosystem</a>
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition">Dashboard</Link>
            <ConnectButton accountStatus="address" chainStatus="icon" showBalance={false} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-tech-grid bg-[size:40px_40px] opacity-20" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-signal-red/10 border border-signal-red/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-signal-red rounded-full animate-pulse" />
              <span className="text-signal-red text-sm font-medium">Powered by IBM SkillsBuild</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="tech-gradient">Learn. Earn. Build.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
              Master blockchain, AI, and cybersecurity with world-class curriculum. 
              Earn <span className="text-cyan font-semibold">uTUT tokens</span> for every milestone.
              Convert to <span className="text-emerald font-semibold">TUT governance power</span>.
            </p>


            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard" className="bg-signal-red hover:bg-signal-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105">
                Start Learning 
              </Link>
              <Link href="/rewards" className="border border-cyan text-cyan hover:bg-cyan/10 px-8 py-4 rounded-lg font-semibold text-lg transition">
                View Rewards
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          >
            {[
              { value: "50+", label: "Learning Modules", color: "text-signal-red" },
              { value: "6", label: "Tech Tracks", color: "text-cyan" },
              { value: "10,000", label: "uTUT Rewards Pool", color: "text-emerald" },
              { value: "100:1", label: "TUT Conversion", color: "text-gold" },
            ].map((stat, i) => (
              <div key={i} className="bg-graphite-700 rounded-xl p-6 text-center border border-graphite-600">
                <div className={`text-3xl md:text-4xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Learning Tracks */}
      <section id="tracks" className="py-20 px-6 bg-graphite-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Learning Tracks</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Industry-recognized curriculum designed with IBM SkillsBuild. 
              Each track rewards you with uTUT tokens upon completion.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: "", 
                title: "Blockchain & Smart Contracts", 
                modules: 12, 
                reward: 500,
                skills: ["Solidity", "Web3.js", "DeFi Protocols"],
                color: "border-signal-red",
                accent: "bg-signal-red/10 text-signal-red"
              },
              { 
                icon: "", 
                title: "Cybersecurity Fundamentals", 
                modules: 8, 
                reward: 350,
                skills: ["Network Security", "Threat Analysis", "Compliance"],
                color: "border-cyan",
                accent: "bg-cyan/10 text-cyan"
              },
              { 
                icon: "", 
                title: "AI & Machine Learning", 
                modules: 15, 
                reward: 600,
                skills: ["Python ML", "Neural Networks", "LLMs"],
                color: "border-emerald",
                accent: "bg-emerald/10 text-emerald"
              },
              { 
                icon: "", 
                title: "DAO Governance & Web3", 
                modules: 6, 
                reward: 300,
                skills: ["Governance Models", "Tokenomics", "Proposals"],
                color: "border-gold",
                accent: "bg-gold/10 text-gold"
              },
              { 
                icon: "", 
                title: "Business & Leadership", 
                modules: 10, 
                reward: 400,
                skills: ["Strategy", "Finance", "Team Management"],
                color: "border-teal",
                accent: "bg-teal/10 text-teal"
              },
              { 
                icon: "", 
                title: "ESG & Sustainability", 
                modules: 8, 
                reward: 350,
                skills: ["Impact Measurement", "Carbon Tracking", "Reporting"],
                color: "border-emerald",
                accent: "bg-emerald/10 text-emerald"
              },
            ].map((track, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-graphite-700 rounded-xl p-6 border-l-4 ${track.color} hover:bg-graphite-600 transition cursor-pointer group`}
              >
                <div className="text-4xl mb-4">{track.icon}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan transition">{track.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span>{track.modules} modules</span>
                  <span className={track.accent + " px-2 py-1 rounded font-semibold"}>{track.reward} uTUT</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {track.skills.map((skill, j) => (
                    <span key={j} className="bg-graphite-600 px-2 py-1 rounded text-xs text-gray-300">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards System */}
      <section id="rewards" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Earn While You Learn</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Complete modules, earn uTUT tokens, and convert to TUT for governance power in the Tolani Ecosystem DAO.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Complete Modules",
                description: "Work through IBM SkillsBuild courses and earn uTUT tokens for each milestone.",
                icon: "",
                color: "text-signal-red"
              },
              {
                step: "02", 
                title: "Accumulate uTUT",
                description: "Track your rewards in your wallet. uTUT represents your learning achievements.",
                icon: "",
                color: "text-cyan"
              },
              {
                step: "03",
                title: "Convert to TUT",
                description: "Exchange 100 uTUT for 1 TUT and gain voting power in the DAO.",
                icon: "",
                color: "text-emerald"
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative"
              >
                <div className={`text-8xl font-bold ${item.color} opacity-10 absolute -top-4 -left-2`}>
                  {item.step}
                </div>
                <div className="relative bg-graphite-700 rounded-xl p-8 border border-graphite-600">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Integration */}
      <section id="ecosystem" className="py-20 px-6 bg-graphite-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl font-bold mb-6">Part of the Tolani Ecosystem</h2>
              <p className="text-gray-400 text-lg mb-8">
                Tolani Labs is the education and training hub of the Tolani Ecosystem DAO, 
                a Wyoming-registered Decentralized Autonomous Organization building tools 
                for workforce development and economic empowerment.
              </p>
              <div className="space-y-4">
                {[
                  { label: "TUT Token", value: "Governance & utility token on Base", color: "text-signal-red" },
                  { label: "Multi-chain", value: "Ethereum L1 + Base L2", color: "text-cyan" },
                  { label: "DAO Governed", value: "Community-driven decisions", color: "text-emerald" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${item.color.replace('text', 'bg')}`} />
                    <span className={`font-semibold ${item.color}`}>{item.label}:</span>
                    <span className="text-gray-400">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-graphite-700 rounded-xl p-8 border border-graphite-600">
              <h3 className="text-xl font-bold mb-6 text-center">Contract Addresses (Base)</h3>
              <div className="space-y-3 font-mono text-sm">
                {[
                  { name: "TUT Token", address: "0xAf7e...337A4" },
                  { name: "uTUT Token", address: "0x6D32...edcD4" },
                  { name: "Governor", address: "0xeEd6...7f6" },
                  { name: "TrainingRewards", address: "0x1fec...15D7" },
                ].map((contract, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-graphite-600 last:border-0">
                    <span className="text-gray-400">{contract.name}</span>
                    <code className="text-cyan">{contract.address}</code>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="text-signal-red">level up</span>?
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              Join thousands of learners earning while they build skills for the future of work.
            </p>
            <a 
              href="https://app.tolanilabs.com" 
              className="inline-flex items-center gap-2 bg-signal-red hover:bg-signal-red-600 text-white px-10 py-5 rounded-lg font-bold text-xl transition transform hover:scale-105 pulse-red"
            >
              Start Your Journey
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-graphite-600 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.svg" alt="Tolani Labs" className="w-8 h-8" />
                <span className="font-bold">Tolani Labs</span>
              </div>
              <p className="text-gray-400 text-sm">
                Education and training hub of the Tolani Ecosystem.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">All Tracks</a></li>
                <li><a href="#" className="hover:text-white">Blockchain</a></li>
                <li><a href="#" className="hover:text-white">AI & ML</a></li>
                <li><a href="#" className="hover:text-white">Cybersecurity</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ecosystem</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Tolani DAO</a></li>
                <li><a href="#" className="hover:text-white">TUT Token</a></li>
                <li><a href="#" className="hover:text-white">Governance</a></li>
                <li><a href="#" className="hover:text-white">Treasury</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">GitHub</a></li>
                <li><a href="#" className="hover:text-white">Discord</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-graphite-600 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
               2026 Tolani Ecosystem DAO LLC. A Wyoming DAO LLC.
            </p>
            <div className="flex items-center gap-4 text-gray-500 text-sm">
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Terms</a>
              <span>Base Mainnet</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
