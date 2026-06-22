import eslintPluginAstro from 'eslint-plugin-astro';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const importGroups = {
  groups: [
    // 0. 副作用 import（先頭固定・並べ替えなし）
    ['^\\u0000'],
    // 1. Astro 組み込み: `astro`, `astro:content` など
    ['^astro(:|$)'],
    // 2. サードパーティ
    ['^@?\\w'],
    // 3. @layouts/*
    ['^@layouts(/|$)'],
    // 4. @components/*
    ['^@components(/|$)'],
    // 5. @libs/*
    ['^@libs(/|$)'],
    // 6. @utils/*
    ['^@utils(/|$)'],
    // 7. import type（最後・ソース問わず）
    ['^.*\\u0000$'],
  ],
};

export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
      'simple-import-sort/imports': ['error', importGroups],
      'simple-import-sort/exports': 'error',
    },
  },
];
