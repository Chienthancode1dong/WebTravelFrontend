import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
       {
        protocol: "https",
        hostname: "scontent.fsgn2-8.fna.fbcdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "scontent.xx.fbcdn.net",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/uploads/**",
      },
     
      
    ],
  
  },
};

export default nextConfig;