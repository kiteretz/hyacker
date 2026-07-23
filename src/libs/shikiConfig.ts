/**
 * Shiki のテーマ設定。参照元は次の3箇所:
 * - astro.config.mjs(記事本文のコードブロック = Astro 内蔵 Shiki)
 * - @libs/shikiHighlighter(カード裏面 SSR・検索結果クライアント)の codeToHtml 呼び出し
 * テーマを変える場合は、この定数と shikiHighlighter.ts のテーマ import を揃えて変更すること。
 */
export const SHIKI_THEME = 'github-dark' as const;
