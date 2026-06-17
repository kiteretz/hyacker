---
title: CSS カスタムプロパティの使い方
description: CSS カスタムプロパティ（CSS 変数）の定義方法と活用パターン、JavaScript からの操作方法を解説します
upDate: 2025-02-07
pubDate: 2025-02-07
author: とも
image:
  url: /assets/posts/background.svg
  alt: 背景の画像
tags:
  - CSS
status: publish
---

## 回答

CSS カスタムプロパティは `--変数名: 値;` で定義し、`var(--変数名)` で参照します。

```css
:root {
  --color-primary: #3b82f6;
  --color-text: #171717;
  --font-size-base: 16px;
  --spacing-4: 16px;
  --spacing-8: 32px;
  --border-radius-md: 8px;
}

.button {
  background-color: var(--color-primary);
  font-size: var(--font-size-base);
  padding: var(--spacing-4) var(--spacing-8);
  border-radius: var(--border-radius-md);
}
```

## 解説

### スコープとカスケード

`:root` に定義した変数はグローバルに使えます。特定のコンポーネント内だけで使う変数はそのクラスに定義します。

```css
.theme-dark {
  --color-primary: #60a5fa;
  --color-text: #f9fafb;
}
```

### フォールバック値

変数が未定義の場合のデフォルト値を設定できます。

```css
color: var(--color-accent, #ef4444);
```

### JavaScript との連携

```js
// 値を取得
const value = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary');

// 値を変更
document.documentElement.style.setProperty('--color-primary', '#ef4444');
```

### 計算への活用

```css
:root {
  --base-size: 4px;
}
.element {
  padding: calc(var(--base-size) * 4); /* 16px */
  margin: calc(var(--base-size) * 6);  /* 24px */
}
```
