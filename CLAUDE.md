# EmberTerm website

Static landing page for https://github.com/emberterm/emberterm (open source Windows terminal; macOS builds too).
Live at https://emberterm.arifintahu.com (Vercel, project `emberterm-web`).

Stack: Astro 7, static output, TypeScript, pnpm. Two small vanilla scripts for the live demos; no UI framework.

## Commands
- `pnpm dev` · `pnpm build` · `pnpm check` (astro check; must be 0 errors before committing)
- Deploy: `vercel deploy --prod --scope miftahul-arifins-projects` (not linked to Git; pushing does not deploy)

## Layout
- `src/release.ts`: single source of truth for the version. Fetches the latest GitHub release at build time, derives
  all download URLs and installer sizes, fails the build if an expected asset is missing, falls back to a pinned
  version only when the API is unreachable. Never import it from a client `<script>`.
- `src/lib/content.ts`: copy, themes (from the app's real theme files) and ember sparks. Copy is final.
- `src/lib/demo.ts`: typing-terminal state machine, pure `(tick) -> frame`; rendered statically at build time and
  replayed by the client script in `Shells.astro`.
- `src/components/`: one component per page section. `src/styles/global.css`: tokens, buttons, keyframes.

## Rules
- No tracking, no external requests except Google Fonts. Build-time GitHub API calls are fine.
- Colors and spacing via CSS variables; never invent stats, star counts or testimonials.
- Honor `prefers-reduced-motion`: no ticking loops, static finished terminal frame.
- Keep contrast at 4.5:1+, touch targets 44px, no horizontal scroll from 360px, files under ~300 lines.
- `GITHUB_TOKEN` (Vercel env, optional, no scopes) only raises the API rate limit. Never prefix it `PUBLIC_`.
- Conventional Commits; branch off `main`; commit and push only when asked.

## Local-only files
`HANDOFF.md` (original spec) and `design/` (design-tool reference and hero screenshot) are gitignored. If present,
`design/Main.dc.html` is the visual reference; it is design-tool markup, not code to ship.
