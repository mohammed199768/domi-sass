import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      // jsPDF's default (Node) build statically requires canvg -> core-js,
      // which breaks the client bundle. Resolve jsPDF to its browser build and
      // stub the optional canvg dependency (the diagnosis PDF never uses SVG).
      jspdf: "jspdf/dist/jspdf.es.min.js",
      canvg: "./src/lib/pdf-empty-module.js",
    },
  },
};

export default nextConfig;
