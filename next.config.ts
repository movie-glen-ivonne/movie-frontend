import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'demos.creative-tim.com',
      },
    ],
    loader: 'default',
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;

