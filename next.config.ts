import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/uploads/**",
      },
    ],
     domains: [
      'scontent.fsgn2-8.fna.fbcdn.net', 
      'scontent.xx.fbcdn.net' 
    ],
  },
};

export default nextConfig;