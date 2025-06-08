import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Turbopack currently requires next-mdx-remote to be transpiled so
  // that imports such as `next-mdx-remote/rsc` can be resolved.
  // See https://github.com/hashicorp/next-mdx-remote for details.
  transpilePackages: ['next-mdx-remote'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
