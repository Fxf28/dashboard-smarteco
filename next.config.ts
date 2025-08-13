import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev", "http://localhost:3000", "http://192.168.1.7:3000", "http://192.168.1.7", "192.168.1.7"],
};

export default nextConfig;
