/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['lucide-react'],
  // Top-level config to allow cross-origin HMR connections from your local IP
  allowedDevOrigins: ['192.168.1.4', 'localhost:3000'],
};

export default nextConfig;
