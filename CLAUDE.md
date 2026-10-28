# EmberTerm website

Static landing page for https://github.com/emberterm/emberterm (open source Windows terminal; macOS builds too).

Start by reading `HANDOFF.md` (full spec) and opening `design/Main.dc.html` (visual and behavioral reference;
design-tool markup, rebuild as real components) with `design/screenshot.png`.

First task: scaffold the site (Astro, static output), reproduce the design pixel-faithfully, keep the release version in
one constant that all download URLs derive from, and respect prefers-reduced-motion.

Rules:
- No tracking, no external requests except Google Fonts.
- Colors and spacing via CSS variables; copy is final, never invent stats.
- Conventional Commits; branch off `main`.
