---
title: CSS Grid レイアウト入門
description: CSS Grid の基本概念と、grid-template-columns・grid-template-rows を使ったレイアウトの作り方を解説します
upDate: 2025-01-12
pubDate: 2025-01-12
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - CSS
status: publish
---

## 回答

CSS Grid は `display: grid` を親要素に指定し、`grid-template-columns` で列を定義して使います。

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3列、均等幅 */
  grid-template-rows: auto;
  gap: 24px;
}

/* 特定のエリアに配置 */
.header {
  grid-column: 1 / -1; /* 全列にまたがる */
}
```

## 解説

### fr 単位

Grid 専用の単位で、使用可能なスペースの割合を表します。`repeat(3, 1fr)` で3列を均等に分割します。

### grid-template-areas

名前でエリアを管理する直感的な書き方です。

```css
.container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 200px 1fr;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

### minmax() 関数

列の最小幅と最大幅を指定できます。

```css
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
```

これにより、カードが自動的に折り返す柔軟なグリッドが作れます。
