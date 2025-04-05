import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "1GB",
    },
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https", // or 'http'
        hostname: "knowledgland.ir",
        port: "", // If the port is not the default (80 for http, 443 for https), specify it here.
        pathname: "/your/path/**", // Optional: specify a path if needed
      },
      {
        protocol: "https", // or 'http'
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/your/path/**", // Optional: specify a path if needed
      },
    ],
  },
};

export default nextConfig;
