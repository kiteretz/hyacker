import { createHighlighter } from 'shiki';

import type { Highlighter } from 'shiki';

const LANGS = ['typescript', 'javascript', 'tsx', 'jsx', 'css', 'html', 'python', 'bash', 'json', 'text'] as const;
const THEME = 'github-dark' as const;

let instancePromise: Promise<Highlighter> | null = null;

export function getShikiHighlighter(): Promise<Highlighter> {
  if (!instancePromise) {
    instancePromise = createHighlighter({ themes: [THEME], langs: [...LANGS] });
  }
  return instancePromise;
}

export { THEME as SHIKI_THEME };
