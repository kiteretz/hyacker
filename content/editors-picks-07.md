---
title: CSS カスタムプロパティ（変数）の活用法
description: CSS カスタムプロパティを使ってテーマカラーや共通値を管理し、保守性の高いスタイルシートを書く方法を解説します
upDate: 2025-02-05
pubDate: 2025-02-05
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - "Editor's Picks"
  - CSS
status: publish
---

## 回答

CSS カスタムプロパティは `--` で始まる変数名で定義し、`var()` 関数で参照します。

```css
/* :root にグローバル変数を定義 */
:root {
  --color-primary: #3b82f6;
  --color-text: #171717;
  --spacing-base: 16px;
  --border-radius: 8px;
}

/* 変数を使ってスタイルを定義 */
.button {
  background-color: var(--color-primary);
  color: white;
  padding: var(--spacing-base);
  border-radius: var(--border-radius);
}
```

## 解説

### Sass 変数との違い

Sass 変数はコンパイル時に値が確定しますが、CSS カスタムプロパティは実行時に値が決まります。そのため、JavaScript から動的に変更することが可能です。

```js
// JavaScript でカスタムプロパティを変更
document.documentElement.style.setProperty('--color-primary', '#ef4444');
```

### ダークモードの実装

```css
:root {
  --bg-color: #ffffff;
  --text-color: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #171717;
    --text-color: #ffffff;
  }
}
```

### フォールバック値

`var()` の第2引数にフォールバック値を指定できます。

```css
color: var(--color-accent, #3b82f6);
```
