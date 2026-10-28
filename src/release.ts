// Single source of truth for the release shown on the site. Resolved once at
// build time from the latest GitHub release, so visitors make no extra request.
// Redeploy after each release (e.g. a Vercel deploy hook fired from the
// emberterm release workflow) to pick up the new version.
export const REPO_URL = 'https://github.com/emberterm/emberterm';

// Used only when the GitHub API is unreachable (offline builds, rate limits).
const FALLBACK_VERSION = '1.0.0';

async function latestRelease(): Promise<{ version: string; sizes: Map<string, number> }> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  // Optional: raises the API rate limit on shared CI IPs.
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  try {
    const res = await fetch('https://api.github.com/repos/emberterm/emberterm/releases/latest', { headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rel = (await res.json()) as { tag_name: string; assets: { name: string; size: number }[] };
    const version = rel.tag_name.replace(/^v/, '');
    // A missing asset means a broken download button, so fail the build rather
    // than ship dead links.
    const missing = assetNames(version).filter((n) => !rel.assets.some((a) => a.name === n));
    if (missing.length) throw new AssetError(`Release v${version} is missing: ${missing.join(', ')}`);
    return { version, sizes: new Map(rel.assets.map((a) => [a.name, a.size])) };
  } catch (e) {
    if (e instanceof AssetError) throw e;
    console.warn(`[release] could not fetch latest release (${e}); using v${FALLBACK_VERSION}`);
    return { version: FALLBACK_VERSION, sizes: new Map() };
  }
}

class AssetError extends Error {}

const assetNames = (v: string) => [
  `EmberTerm_${v}_x64-setup.exe`,
  `EmberTerm_${v}_x64_en-US.msi`,
  `EmberTerm_${v}_universal.dmg`,
];

const { version: VERSION_, sizes } = await latestRelease();
export const VERSION = VERSION_;
const base = `${REPO_URL}/releases/download/v${VERSION}`;
const [exe, msi, dmg] = assetNames(VERSION);

export const WIN_URL = `${base}/${exe}`;
export const MSI_URL = `${base}/${msi}`;
export const MAC_URL = `${base}/${dmg}`;

// Shown on the download buttons; undefined (and hidden) if sizes are unknown.
const mb = (name: string) => {
  const bytes = sizes.get(name);
  return bytes ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : undefined;
};
export const WIN_SIZE = mb(exe);
export const MSI_SIZE = mb(msi);
export const MAC_SIZE = mb(dmg);
