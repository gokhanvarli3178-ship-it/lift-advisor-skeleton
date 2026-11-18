// @ts-check
import { randomUUID } from "node:crypto";
import withSerwistInit from "@serwist/next";

/**
 * ONE static build for both targets (`output: "export"` -> ./out):
 *   web / PWA    -> `npm run build`      : static files + Service Worker (deploy ./out to any static host)
 *   native shell -> `npm run build:cap`  : same files, Service Worker disabled (assets are local in the app)
 *
 * Why static export for the web build too:
 *   App Router client navigations fetch an RSC payload per page. With a static export those payloads are
 *   plain files (`<route>/index.txt`) that the Service Worker can PRECACHE, so module-to-module navigation
 *   stays a soft (SPA) navigation even on a cold start with no network. Without it every offline navigation
 *   falls back to a full reload and would wipe the in-memory session results (module 5).
 *   Consequence: no Next.js API routes — the AI advisor talks to an external gateway (NEXT_PUBLIC_AI_ENDPOINT).
 */
const isCapacitor = process.env.BUILD_TARGET === "capacitor";
const isDev = process.env.NODE_ENV === "development";

// Every page that must work offline from the first visit. `trailingSlash: true` -> "/x/" + "/x/index.txt".
const ROUTES = ["/", "/offline/", "/encyclopedia/", "/calculators/", "/standards/", "/ai-advisor/", "/export-center/"];
const rscPayload = (route) => `${route}index.txt`;

// Static files from /public that the installed app needs while offline.
const STATIC_FILES = [
  "/manifest.webmanifest",
  "/favicon.ico",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-maskable-512.png",
  "/icons/apple-touch-icon.png",
];

const revision = randomUUID();

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  cacheOnNavigation: true,
  reloadOnOnline: false, // never reload under the user: session results live in memory
  disable: isDev || isCapacitor,
  additionalPrecacheEntries: [...ROUTES, ...ROUTES.map(rscPayload), ...STATIC_FILES].map((url) => ({ url, revision })),
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BUILD_TARGET: isCapacitor ? "capacitor" : "web",
  },
};

export default withSerwist(nextConfig);
