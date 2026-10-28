// Typing-terminal state machine. Pure: (tick) -> frame, so Astro can render the
// static frame at build time and the client script can replay it every 80ms.
type Kind = 'c' | 'o' | 'r'; // command, output, restored banner
interface Scene { tab: number; shell: string; dir: string; right: string; lines: [Kind, string][] }

export const SHELLS = ['Git Bash', 'WSL', 'PowerShell'];
export const TICK_MS = 80;
// Frame shown for reduced motion and before JS runs: scene 1, fully typed.
export const STATIC_TICK = 60;

const scenes: Scene[] = [
  { tab: 0, shell: 'Git Bash', dir: '~/code/api', right: 'main', lines: [['c', 'git status'], ['o', 'On branch main'], ['o', 'nothing to commit, working tree clean'], ['c', 'pnpm dev'], ['o', 'dev server ready']] },
  { tab: 1, shell: 'WSL', dir: '~/work/infra', right: 'bash', lines: [['c', 'cd ~/work/infra'], ['c', 'ls'], ['o', 'main.tf  modules  README.md']] },
  { tab: 2, shell: 'PowerShell', dir: 'D:\notes', right: 'pwsh', lines: [['c', 'Get-ChildItem'], ['o', 'ideas.md  todo.md']] },
  { tab: 0, shell: 'Git Bash', dir: '~/code/api', right: 'main', lines: [['c', 'exit'], ['o', '… reopen EmberTerm …'], ['r', 'Session restored: every tab, split and folder.']] },
];

// A command takes one tick per char plus a 10-tick pause; output lines take 7.
const lineDur = ([k, text]: [Kind, string]) => (k === 'c' ? text.length + 10 : 7);
const sceneDur = (s: Scene) => s.lines.reduce((a, l) => a + lineDur(l), 0) + 10;
const total = scenes.reduce((a, s) => a + sceneDur(s), 0);

export interface DemoLine { prompt: string; text: string; kind: Kind | 'p'; cursor: boolean }
export interface DemoFrame { lines: DemoLine[]; activeTab: number; status: { shell: string; dir: string; right: string } }

export function demoFrame(tick: number): DemoFrame {
  let t = tick % total;
  let scene = scenes[0];
  for (const s of scenes) {
    const d = sceneDur(s);
    if (t < d) { scene = s; break; }
    t -= d;
  }
  const lines: DemoLine[] = [];
  let at = 0;
  let last: Kind | null = null;
  for (const l of scene.lines) {
    if (t < at) break;
    const local = t - at;
    lines.push(l[0] === 'c'
      ? { prompt: '❯ ', text: l[1].slice(0, local), kind: 'c', cursor: false }
      : { prompt: '', text: l[1], kind: l[0], cursor: false });
    last = l[0];
    at += lineDur(l);
  }
  if (last === 'o') lines.push({ prompt: '❯ ', text: '', kind: 'p', cursor: true });
  else if (lines.length && last === 'c') lines[lines.length - 1].cursor = true;
  const { shell, dir, right } = scene;
  return { lines, activeTab: scene.tab, status: { shell, dir, right } };
}
