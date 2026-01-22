/**
 * Web3 Providers
 * Wraps the app with RainbowKit, wagmi, and React Query providers
 */

'use client';

import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './wagmi';

import '@rainbow-me/rainbowkit/styles.css';

// Tolani Labs colors
const COLORS = {
  labs: {
    signalRed: '#E10600',
  },
};

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      gcTime: 1000 * 60 * 5, // 5 minutes (formerly cacheTime)
    },
  },
});

// Custom theme matching Tolani Labs brand
const customTheme = darkTheme({
  accentColor: COLORS.labs.signalRed,
  accentColorForeground: '#FFFFFF',
  borderRadius: 'medium',
  fontStack: 'system',
  overlayBlur: 'small',
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={customTheme}
          modalSize="compact"
          appInfo={{
            appName: 'Tolani Labs',
            learnMoreUrl: 'https://tolanilabs.io',
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
