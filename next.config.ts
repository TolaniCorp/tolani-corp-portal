import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    // Force the workspace root so Turbopack serves assets from the correct directory.
    root: __dirname,
  },
};

export default nextConfig;
