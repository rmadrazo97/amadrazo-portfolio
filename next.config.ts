import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Firebase Hosting (no SSR needed — the page is fully static).
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
