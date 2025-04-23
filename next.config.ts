import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
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
};

export default nextConfig;
