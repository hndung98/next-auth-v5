import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/**", // allow image on localhost
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // allow image on Cloudinary
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**", // allow image on Picsum
      },
    ],
  },
  headers: async () => {
    return [
      {
        source: "/api/(.*)",
        headers: [
          // Allow for specific domains to have access or * for all
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
            // DOES NOT WORK
            // value: process.env.ALLOWED_ORIGIN,
          },
          // Allows for specific methods accepted
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST",
          },
          // Allows for specific headers accepted (These are a few standard ones)
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
