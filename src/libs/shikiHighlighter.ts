import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

import type { HighlighterCore } from 'shiki/core';

/**
 * フルバンドル('shiki')を import すると全言語の文法チャンクがビルド成果物に
 * 出力されてしまうため、core + JS 正規表現エンジン + 使用文法のみの明示 import で構成する。
 * SSR(SectionByTag)とクライアント(Card の検索結果ハイライト)の両方がこの
 * インスタンスを使う。言語の追加は langs への import 追記のみでよい。
 * 'text'(プレーンテキスト)は Shiki 組み込みのため import 不要。
 * テーマ名の文字列は @libs/shikiConfig の SHIKI_THEME と一致させること。
 */
let instancePromise: Promise<HighlighterCore> | null = null;

export function getShikiHighlighter(): Promise<HighlighterCore> {
  if (!instancePromise) {
    instancePromise = createHighlighterCore({
      themes: [import('shiki/themes/github-dark.mjs')],
      langs: [
        import('shiki/langs/typescript.mjs'),
        import('shiki/langs/javascript.mjs'),
        import('shiki/langs/tsx.mjs'),
        import('shiki/langs/jsx.mjs'),
        import('shiki/langs/css.mjs'),
        import('shiki/langs/html.mjs'),
        import('shiki/langs/python.mjs'),
        import('shiki/langs/bash.mjs'),
        import('shiki/langs/json.mjs'),
      ],
      engine: createJavaScriptRegexEngine(),
    });
  }
  return instancePromise;
}
