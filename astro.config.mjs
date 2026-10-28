import { defineConfig } from 'astro/config';

// Vercel exposes the production hostname at build time; absolute URLs are
// needed for og:image. Falls back to relative paths when unset (local dev).
const host = process.env.SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL;

export default defineConfig({
  output: 'static',
  site: host ? (host.startsWith('http') ? host : `https://${host}`) : undefined,
});
