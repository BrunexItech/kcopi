import type { NextConfig } from "next";

// Images are served from whatever NEXT_PUBLIC_API_URL points at — localhost
// in dev, the real backend domain in production — so the allowed remote
// pattern is derived from it instead of being hardcoded.
const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8010");
const isLocalHost = apiUrl.hostname === "localhost" || apiUrl.hostname === "127.0.0.1";

const nextConfig: NextConfig = {
  // Produces a self-contained server in .next/standalone for lean Docker images.
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: apiUrl.protocol.replace(":", "") as "http" | "https",
        hostname: apiUrl.hostname,
        port: apiUrl.port,
        pathname: "/**",
      },
    ],
    // Dev-only: lets the Next image optimizer fetch from a plain local IP.
    ...(isLocalHost ? { dangerouslyAllowLocalIP: true } : {}),
  },
};

export default nextConfig;
