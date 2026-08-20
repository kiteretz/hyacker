// @ts-check
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';

import { SHIKI_THEME } from './src/libs/shikiConfig';

// https://astro.build/config
export default defineConfig({
  trailingSlash: 'always',
  integrations: [mdx(), react()],

  // 記事本文のコードブロックは Astro 内蔵の Shiki が処理する。
  // カード裏面・検索結果（@libs/shikiHighlighter）とテーマを揃えるため明示する。
  markdown: {
    shikiConfig: {
      theme: SHIKI_THEME,
    },
    processor: unified({
      // rehype-external-links の型定義と astro v6 の unified/hast 型に差異があり、構造的に不一致になるが実行時は問題ない
      // @ts-expect-error
      rehypePlugins: [[rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]],
    }),
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
