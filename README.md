# emberterm-web

Landing page for [EmberTerm](https://github.com/emberterm/emberterm), an open source terminal for Windows and macOS.
Live at https://emberterm.arifintahu.com.

Static [Astro](https://astro.build) site. No analytics or trackers; the only external request from the page is Google Fonts.

## Develop

Requires Node.js 22+ and pnpm.

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm check    # type check
pnpm build    # static output in dist/
```

## How the version is chosen

`src/release.ts` asks the GitHub API for the latest `emberterm/emberterm` release at build time and builds the
`.exe`, `.msi` and `.dmg` download URLs and installer sizes from it. The build fails if one of those assets is missing
from the release. If the API is unreachable, it uses the pinned `FALLBACK_VERSION` and hides the sizes.

The site only picks up a new release when it is rebuilt, so redeploy after each release.

## Deploy (Vercel)

```bash
vercel deploy --prod
```

Environment variables (Vercel, Production):

| Name | Purpose |
|---|---|
| `GITHUB_TOKEN` | Optional. A classic token with no scopes; only raises the GitHub API rate limit during the build. |
| `SITE_URL` | Public site URL, used for absolute Open Graph URLs. Falls back to `VERCEL_PROJECT_PRODUCTION_URL`. |

## Structure

```
src/release.ts        version, download URLs, sizes
src/lib/content.ts    copy, themes, ember sparks
src/lib/demo.ts       typing-terminal state machine
src/components/       one component per section
src/styles/global.css design tokens, buttons, keyframes
```

Animations respect `prefers-reduced-motion`: the typing terminal shows a static finished frame and the theme
switcher stops auto-cycling.
