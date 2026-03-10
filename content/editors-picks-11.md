---
title: Web パフォーマンス最適化の基本
description: ページの読み込み速度を改善するための基本的なテクニックと、計測ツールの使い方を解説します
upDate: 2025-02-25
pubDate: 2025-02-25
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - "Editor's Picks"
  - HTML
  - CSS
  - JavaScript
status: publish
---

## 回答

Web パフォーマンスを改善するには、画像の最適化・コードの軽量化・レンダリングブロックの排除が重要です。

```html
<!-- 画像の最適化 -->
<img
  src="image.webp"
  alt="画像の説明"
  width="800"
  height="600"
  loading="lazy"
/>

<!-- リソースの優先読み込み -->
<link rel="preload" href="fonts/main.woff2" as="font" crossorigin>
```

## 解説

### Core Web Vitals

Google が定める重要なパフォーマンス指標です。

- **LCP** (Largest Contentful Paint): 最大コンテンツの描画時間
- **FID** (First Input Delay): 最初の入力遅延
- **CLS** (Cumulative Layout Shift): 累積レイアウトシフト

### 画像の最適化

- WebP や AVIF などの次世代フォーマットを使用する
- `loading="lazy"` で遅延読み込みを行う
- `width` と `height` 属性を指定してレイアウトシフトを防ぐ

### JavaScript の最適化

- 不要なライブラリを削除する
- コードスプリッティングで必要な部分だけ読み込む
- `defer` や `async` 属性でスクリプトの読み込みを最適化する

1. Lighthouse で現状を計測する
2. 最も影響の大きい問題から対処する
3. 改善後に再計測して効果を確認する
