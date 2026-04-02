import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "react-markdown"],
  },
  turbopack: {
    resolveAlias: {
      "@": "./",
    },
  },
  // Cache configuration for better performance
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  // Disable excessive console logs in production
  productionBrowserSourceMaps: false,
};

export default nextConfig;
