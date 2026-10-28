// Single source of truth for the release shown on the site. Resolved once at
// build time from the latest GitHub release, so visitors make no extra request.
// Redeploy after each release (e.g. a Vercel deploy hook fired from the
// emberterm release workflow) to pick up the new version.
export const REPO_URL = 'https://github.com/emberterm/emberterm';

// Used only when the GitHub API is unreachable (offline builds, rate limits).
const FALLBACK_VERSION = '1.0.0';

async function latestVersion(): Promise<string> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  // Optional: raises the API rate limit on shared CI IPs.
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  try {
    const res = await fetch('https://api.github.com/repos/emberterm/emberterm/releases/latest', { headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rel = (await res.json()) as { tag_name: string; assets: { name: string }[] };
    const version = rel.tag_name.replace(/^v/, '');
    // A missing asset means a broken download button, so fail the build rather
    // than ship dead links.
    const missing = assetNames(version).filter((n) => !rel.assets.some((a) => a.name === n));
    if (missing.length) throw new AssetError(`Release v${version} is missing: ${missing.join(', ')}`);
    return version;
  } catch (e) {
    if (e instanceof AssetError) throw e;
    console.warn(`[release] could not fetch latest release (${e}); using v${FALLBACK_VERSION}`);
    return FALLBACK_VERSION;
  }
}

class AssetError extends Error {}

const assetNames = (v: string) => [
  `EmberTerm_${v}_x64-setup.exe`,
  `EmberTerm_${v}_x64_en-US.msi`,
  `EmberTerm_${v}_universal.dmg`,
];

export const VERSION = await latestVersion();
const base = `${REPO_URL}/releases/download/v${VERSION}`;
const [exe, msi, dmg] = assetNames(VERSION);

export const WIN_URL = `${base}/${exe}`;
export const MSI_URL = `${base}/${msi}`;
export const MAC_URL = `${base}/${dmg}`;
