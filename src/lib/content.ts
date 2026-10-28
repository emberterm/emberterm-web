// Copy is final (see design/Main.dc.html); edit text here, not in components.
export const features = [
  { n: '01', title: 'Session restore', body: 'Closing and reopening brings back every tab, split, title and folder.' },
  { n: '02', title: 'Splits', body: 'Side by side or stacked, with any shell in each pane.' },
  { n: '03', title: 'Tab status', body: 'A dot marks a tab that is running a command or has new output. Closing a busy tab asks first.' },
  { n: '04', title: 'Copy, paste, find', body: 'Ctrl+C with a selection, Ctrl+V, a right-click menu, and Ctrl+Shift+F to search the scrollback.' },
  { n: '05', title: 'Command palette', body: 'Ctrl+Shift+P for tabs, profiles, splits and themes.' },
  { n: '06', title: 'Status bar', body: 'Shell, folder, git branch and changes, size and clock at a glance.' },
  { n: '07', title: 'Window memory', body: 'Size, position and maximized state come back too.' },
  { n: '08', title: 'One-click updates', body: 'Settings, About, Check for updates. Downloads are verified against the project signing key.' },
];

export const hood = [
  { title: 'Clipboard is opt-in', body: 'Programs cannot set your clipboard unless you turn it on, so text from a hostile file or host cannot silently replace what you copied.' },
  { title: 'Hardened git calls', body: 'The status bar runs git without repository locks or fsmonitor, and never in a network path or missing folder.' },
  { title: 'Content Security Policy', body: 'The app window ships with a CSP, and profile ids are restricted so they cannot reach outside the profiles folder.' },
  { title: 'Pinned release pipeline', body: 'Workflow actions are pinned to commit SHAs and kept current by Dependabot.' },
];

const words = ['Git Bash', 'WSL', 'PowerShell', 'cmd', 'session restore', 'split panes', 'command palette', 'VS Code themes', 'no telemetry', 'MIT licensed'];
// Doubled so the -50% translate loops without a visible jump.
export const ticker = [...words, ...words];

export interface Theme {
  name: string;
  bg: string; fg: string;
  red: string; green: string; yellow: string; blue: string; magenta: string; cyan: string;
}

// Values come from packages/app/src/theme/themes in the emberterm repo.
export const themes: Theme[] = [
  { name: 'Ember Dark', bg: '#0d1117', fg: '#e6edf3', red: '#ff7b72', green: '#7ee787', yellow: '#d29922', blue: '#58a6ff', magenta: '#bc8cff', cyan: '#39c5cf' },
  { name: 'Ember Light', bg: '#ffffff', fg: '#24292f', red: '#cf222e', green: '#116329', yellow: '#4d2d00', blue: '#0969da', magenta: '#8250df', cyan: '#1b7c83' },
  { name: 'Tokyo Night', bg: '#1a1b26', fg: '#a9b1d6', red: '#f7768e', green: '#9ece6a', yellow: '#e0af68', blue: '#7aa2f7', magenta: '#ad8ee6', cyan: '#449dab' },
  { name: 'Catppuccin Mocha', bg: '#1e1e2e', fg: '#cdd6f4', red: '#f38ba8', green: '#a6e3a1', yellow: '#f9e2af', blue: '#89b4fa', magenta: '#f5c2e7', cyan: '#94e2d5' },
  { name: 'Dracula', bg: '#282a36', fg: '#f8f8f2', red: '#ff5555', green: '#50fa7b', yellow: '#f1fa8c', blue: '#bd93f9', magenta: '#ff79c6', cyan: '#8be9fd' },
  { name: 'GitHub Dark', bg: '#0d1117', fg: '#c9d1d9', red: '#ff7b72', green: '#3fb950', yellow: '#d29922', blue: '#58a6ff', magenta: '#bc8cff', cyan: '#39c5cf' },
  { name: 'Solarized Dark', bg: '#002b36', fg: '#839496', red: '#dc322f', green: '#859900', yellow: '#b58900', blue: '#268bd2', magenta: '#d33682', cyan: '#2aa198' },
];

// Deterministic so server and client agree and there is no layout shift.
export const sparks = Array.from({ length: 16 }, (_, i) => ({
  left: `${((i * 37 + 11) % 96) + 2}%`,
  size: `${3 + ((i * 5) % 5)}px`,
  dur: `${7 + ((i * 3) % 7)}s`,
  delay: `-${((i * 1.7) % 9).toFixed(1)}s`,
}));
