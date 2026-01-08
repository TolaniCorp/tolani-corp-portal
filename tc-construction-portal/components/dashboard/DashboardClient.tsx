'use client';

import { useState, useEffect } from 'react';
import styles from './DashboardClient.module.css';

// Types for dashboard data
interface ESGMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  category: 'environmental' | 'social' | 'governance';
}

interface HVACContract {
  id: string;
  projectName: string;
  client: string;
  status: 'active' | 'completed' | 'maintenance';
  efficiency: number;
  energySavings: number;
  co2Reduction: number;
  lastUpdated: string;
  contractHash?: string;
}

interface SmartSensorData {
  id: string;
  location: string;
  temperature: number;
  humidity: number;
  energyUsage: number;
  status: 'optimal' | 'warning' | 'critical';
}

// Mock data - in production would come from blockchain/API
const mockESGMetrics: ESGMetric[] = [
  { id: '1', name: 'Carbon Footprint Reduction', value: 42, target: 50, unit: '%', trend: 'up', category: 'environmental' },
  { id: '2', name: 'Renewable Energy Usage', value: 78, target: 80, unit: '%', trend: 'up', category: 'environmental' },
  { id: '3', name: 'Water Conservation', value: 35, target: 40, unit: '%', trend: 'stable', category: 'environmental' },
  { id: '4', name: 'Worker Safety Score', value: 98, target: 100, unit: '/100', trend: 'up', category: 'social' },
  { id: '5', name: 'Local Hiring Rate', value: 72, target: 70, unit: '%', trend: 'up', category: 'social' },
  { id: '6', name: 'Compliance Score', value: 100, target: 100, unit: '%', trend: 'stable', category: 'governance' },
];

const mockContracts: HVACContract[] = [
  { 
    id: '1', 
    projectName: 'Downtown Office Complex',
    client: 'Metro Properties LLC',
    status: 'active',
    efficiency: 94,
    energySavings: 156000,
    co2Reduction: 45,
    lastUpdated: '2024-01-15T10:30:00Z',
    contractHash: '0x7f8a...3e21'
  },
  { 
    id: '2', 
    projectName: 'Green Valley Hospital',
    client: 'Valley Health Systems',
    status: 'active',
    efficiency: 97,
    energySavings: 320000,
    co2Reduction: 62,
    lastUpdated: '2024-01-15T09:15:00Z',
    contractHash: '0x4c2b...9a7f'
  },
  { 
    id: '3', 
    projectName: 'Riverside Mall Retrofit',
    client: 'Riverside Development Corp',
    status: 'maintenance',
    efficiency: 89,
    energySavings: 98000,
    co2Reduction: 28,
    lastUpdated: '2024-01-14T16:45:00Z',
    contractHash: '0x1d5e...8b3c'
  },
  { 
    id: '4', 
    projectName: 'Tech Campus Phase 2',
    client: 'Innovation Partners',
    status: 'completed',
    efficiency: 96,
    energySavings: 425000,
    co2Reduction: 78,
    lastUpdated: '2024-01-10T14:00:00Z',
    contractHash: '0x9e7f...2d4a'
  },
];

const mockSensorData: SmartSensorData[] = [
  { id: '1', location: 'Building A - Floor 1', temperature: 72, humidity: 45, energyUsage: 124, status: 'optimal' },
  { id: '2', location: 'Building A - Floor 2', temperature: 71, humidity: 48, energyUsage: 118, status: 'optimal' },
  { id: '3', location: 'Building B - Floor 1', temperature: 74, humidity: 52, energyUsage: 156, status: 'warning' },
  { id: '4', location: 'Building B - Floor 2', temperature: 70, humidity: 44, energyUsage: 132, status: 'optimal' },
  { id: '5', location: 'Building C - Floor 1', temperature: 76, humidity: 58, energyUsage: 178, status: 'critical' },
];

export default function DashboardClient() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'esg' | 'contracts' | 'monitoring'>('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: 'eth_requestAccounts'
        });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert('Please install MetaMask or another Web3 wallet to access blockchain features');
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setIsConnected(false);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
      </svg>
    );
    if (trend === 'down') return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
        <polyline points="17 18 23 18 23 12"/>
      </svg>
    );
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'optimal':
        return 'var(--success-green)';
      case 'warning':
      case 'maintenance':
        return 'var(--safety-yellow)';
      case 'critical':
        return 'var(--tccg-primary)';
      case 'completed':
        return 'var(--blueprint)';
      default:
        return 'var(--text-muted)';
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="3" y1="9" x2="21" y2="9"/>
              <line x1="9" y1="21" x2="9" y2="9"/>
            </svg>
            ESG & HVAC Dashboard
          </h1>
          <p className={styles.subtitle}>Real-time performance monitoring powered by Web3</p>
        </div>
        <div className={styles.headerRight}>
          {isConnected ? (
            <div className={styles.walletInfo}>
              <span className={styles.walletAddress}>
                <span className={styles.walletDot}></span>
                {formatAddress(walletAddress!)}
              </span>
              <button onClick={disconnectWallet} className={styles.disconnectBtn}>
                Disconnect
              </button>
            </div>
          ) : (
            <button onClick={connectWallet} className={styles.connectBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      {/* Tabs */}
      <nav className={styles.tabs}>
        {(['overview', 'esg', 'contracts', 'monitoring'] as const).map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className={styles.main}>
        {activeTab === 'overview' && (
          <>
            {/* Quick Stats */}
            <div className={styles.quickStats}>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: 'rgba(34, 197, 94, 0.2)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--success-green)" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statValue}>98%</span>
                  <span className={styles.statLabel}>ESG Compliance</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.2)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--blueprint)" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statValue}>4</span>
                  <span className={styles.statLabel}>Active Contracts</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: 'rgba(231, 76, 60, 0.2)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--tccg-primary)" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statValue}>$999K</span>
                  <span className={styles.statLabel}>Energy Savings YTD</span>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon} style={{ background: 'rgba(251, 191, 36, 0.2)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--safety-yellow)" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statValue}>213</span>
                  <span className={styles.statLabel}>Tons CO₂ Reduced</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Recent Contract Activity</h2>
              <div className={styles.contractList}>
                {mockContracts.slice(0, 3).map((contract) => (
                  <div key={contract.id} className={styles.contractCard}>
                    <div className={styles.contractHeader}>
                      <h3>{contract.projectName}</h3>
                      <span 
                        className={styles.statusBadge} 
                        style={{ background: `${getStatusColor(contract.status)}20`, color: getStatusColor(contract.status) }}
                      >
                        {contract.status}
                      </span>
                    </div>
                    <p className={styles.contractClient}>{contract.client}</p>
                    <div className={styles.contractStats}>
                      <div className={styles.contractStat}>
                        <span className={styles.contractStatValue}>{contract.efficiency}%</span>
                        <span className={styles.contractStatLabel}>Efficiency</span>
                      </div>
                      <div className={styles.contractStat}>
                        <span className={styles.contractStatValue}>${(contract.energySavings / 1000).toFixed(0)}K</span>
                        <span className={styles.contractStatLabel}>Savings</span>
                      </div>
                      <div className={styles.contractStat}>
                        <span className={styles.contractStatValue}>{contract.co2Reduction}t</span>
                        <span className={styles.contractStatLabel}>CO₂ Reduced</span>
                      </div>
                    </div>
                    {isConnected && contract.contractHash && (
                      <div className={styles.contractHash}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                        </svg>
                        {contract.contractHash}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'esg' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>ESG Performance Metrics</h2>
            <div className={styles.esgGrid}>
              {mockESGMetrics.map((metric) => (
                <div key={metric.id} className={styles.metricCard}>
                  <div className={styles.metricHeader}>
                    <span className={`${styles.metricCategory} ${styles[metric.category]}`}>
                      {metric.category}
                    </span>
                    <span className={`${styles.metricTrend} ${styles[metric.trend]}`}>
                      {getTrendIcon(metric.trend)}
                    </span>
                  </div>
                  <h3 className={styles.metricName}>{metric.name}</h3>
                  <div className={styles.metricProgress}>
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressFill} 
                        style={{ width: `${(metric.value / metric.target) * 100}%` }}
                      ></div>
                    </div>
                    <div className={styles.progressLabels}>
                      <span>{metric.value}{metric.unit}</span>
                      <span>Target: {metric.target}{metric.unit}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {!isConnected && (
              <div className={styles.connectPrompt}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <p>Connect your wallet to verify ESG data on-chain and access detailed reports</p>
                <button onClick={connectWallet} className={styles.connectBtn}>
                  Connect Wallet
                </button>
              </div>
            )}
          </section>
        )}

        {activeTab === 'contracts' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>HVAC Contract Performance</h2>
            <div className={styles.fullContractList}>
              {mockContracts.map((contract) => (
                <div key={contract.id} className={styles.fullContractCard}>
                  <div className={styles.contractMain}>
                    <div className={styles.contractInfo}>
                      <h3>{contract.projectName}</h3>
                      <p>{contract.client}</p>
                      <span className={styles.updateTime}>
                        Last updated: {new Date(contract.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                    <span 
                      className={styles.statusBadge} 
                      style={{ background: `${getStatusColor(contract.status)}20`, color: getStatusColor(contract.status) }}
                    >
                      {contract.status}
                    </span>
                  </div>
                  <div className={styles.contractMetrics}>
                    <div className={styles.metricItem}>
                      <span className={styles.metricLabel}>System Efficiency</span>
                      <div className={styles.metricBar}>
                        <div 
                          className={styles.metricFill} 
                          style={{ width: `${contract.efficiency}%`, background: 'var(--success-green)' }}
                        ></div>
                      </div>
                      <span className={styles.metricValue}>{contract.efficiency}%</span>
                    </div>
                    <div className={styles.metricItem}>
                      <span className={styles.metricLabel}>Energy Savings</span>
                      <span className={styles.metricValue}>${contract.energySavings.toLocaleString()}</span>
                    </div>
                    <div className={styles.metricItem}>
                      <span className={styles.metricLabel}>CO₂ Reduction</span>
                      <span className={styles.metricValue}>{contract.co2Reduction} tons</span>
                    </div>
                  </div>
                  {isConnected && (
                    <div className={styles.contractBlockchain}>
                      <span>Contract Hash:</span>
                      <code>{contract.contractHash}</code>
                      <button className={styles.verifyBtn}>Verify on Chain</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'monitoring' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Smart HVAC Monitoring</h2>
            <div className={styles.sensorGrid}>
              {mockSensorData.map((sensor) => (
                <div key={sensor.id} className={`${styles.sensorCard} ${styles[sensor.status]}`}>
                  <div className={styles.sensorHeader}>
                    <h3>{sensor.location}</h3>
                    <span 
                      className={styles.sensorStatus}
                      style={{ background: getStatusColor(sensor.status) }}
                    ></span>
                  </div>
                  <div className={styles.sensorReadings}>
                    <div className={styles.reading}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/>
                      </svg>
                      <span>{sensor.temperature}°F</span>
                    </div>
                    <div className={styles.reading}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                      </svg>
                      <span>{sensor.humidity}%</span>
                    </div>
                    <div className={styles.reading}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                      </svg>
                      <span>{sensor.energyUsage} kWh</span>
                    </div>
                  </div>
                  <div className={styles.sensorFooter}>
                    <span className={styles.statusText}>{sensor.status.toUpperCase()}</span>
                    {sensor.status !== 'optimal' && (
                      <button className={styles.alertBtn}>View Alert</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
