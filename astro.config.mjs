// @ts-check
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import { SHIKI_THEME } from './src/libs/shikiConfig';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), react()],

  // 記事本文のコードブロックは Astro 内蔵の Shiki が処理する。
  // カード裏面・検索結果（@libs/shikiHighlighter）とテーマを揃えるため明示する。
  markdown: {
    shikiConfig: {
      theme: SHIKI_THEME,
    },
  },

  vite: {
    plugins: [tailwindcss()]
  }
});
