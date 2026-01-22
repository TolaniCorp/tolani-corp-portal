/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@tolani-labs/ui", "@tolani-labs/sdk", "@tolani-labs/contracts"],
  images: {
    domains: ["avatars.githubusercontent.com", "images.unsplash.com"],
  },
  // Vercel monorepo support
  output: "standalone",
  // Ensure serverless functions work correctly
  experimental: {
    serverComponentsExternalPackages: ["viem"],
  },
  // Handle Web3 module resolution issues
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    // Handle pino-pretty and other optional modules
    config.resolve.alias = {
      ...config.resolve.alias,
      'pino-pretty': false,
    };
    // Ignore react-native modules
    config.externals = [
      ...(config.externals || []),
      '@react-native-async-storage/async-storage',
    ];
    return config;
  },
};

module.exports = nextConfig;
