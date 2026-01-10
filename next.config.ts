import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ['@genkit-ai/core', 'genkit'],
  webpack: (config, { isServer }) => {
    // This is to fix the "Module not found: Can't resolve 'dgram'" error and others.
    // It's a workaround for packages that are not fully compatible with the Edge runtime.
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "dgram": false,
        "dns": false,
        "fs": false,
        "net": false,
        "tls": false,
        "child_process": false,
        "os": false,
        "path": false,
        "http2": false,
        "grpc": false,
        "express": false,
      };
    }
    return config;
  },
};

export default nextConfig;
