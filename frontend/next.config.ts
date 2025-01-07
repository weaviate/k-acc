import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3o574pyao1sq3.cloudfront.net",
        port: "",
        pathname: "/fashion/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "d1flfk77wl2xk4.cloudfront.net",
        port: "",
        pathname: "/Assets/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
