/** @type {import('next').NextConfig} */
const nextConfig = {
  // هذا السطر يخبر Next.js أن هذه المكتبات يجب أن تبقى كـ Node.js فقط
  serverExternalPackages: ['@genkit-ai/core', 'genkit', '@grpc/grpc-js', '@opentelemetry/sdk-node'],
  
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // يمنع محاولة تحميل مكتبات Node.js في المتصفح
      config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: false,
        util: false,
        events: false,
        path: false,
      };
    }
    return config;
  },
};

export default nextConfig;