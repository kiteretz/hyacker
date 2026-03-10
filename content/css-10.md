---
title: CSS の clamp() 関数でレスポンシブなフォントサイズを設定する
description: CSS の clamp()、min()、max() 関数を使って、メディアクエリなしでレスポンシブなサイズを実現する方法を解説します
upDate: 2025-02-22
pubDate: 2025-02-22
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - CSS
status: publish
---

## 回答

`clamp(最小値, 推奨値, 最大値)` で最小・最大の範囲内で値を柔軟に変化させられます。

```css
/* フォントサイズ: 最小 16px、最大 32px、画面幅に応じて変化 */
h1 {
  font-size: clamp(16px, 4vw, 32px);
}

/* パディング: 最小 16px、最大 64px */
.section {
  padding: clamp(16px, 5vw, 64px);
}

/* コンテナ幅 */
.container {
  width: min(90%, 1200px);
  margin: 0 auto;
}
```

## 解説

### clamp() の引数

1. **最小値** : この値より小さくならない
2. **推奨値** : 通常時の値（`vw` や `calc()` を使うことが多い）
3. **最大値** : この値より大きくならない

### min() と max()

```css
/* 90% と 1200px のうち小さい方 */
width: min(90%, 1200px);

/* 320px と 50vw のうち大きい方 */
width: max(320px, 50vw);
```

### 流動的なタイポグラフィ

メディアクエリを使わずに画面幅に応じてフォントサイズを変化させられます。

```css
:root {
  --font-size-sm: clamp(0.875rem, 1.5vw, 1rem);
  --font-size-md: clamp(1rem, 2vw, 1.25rem);
  --font-size-lg: clamp(1.25rem, 3vw, 2rem);
  --font-size-xl: clamp(1.5rem, 5vw, 3rem);
}
```
