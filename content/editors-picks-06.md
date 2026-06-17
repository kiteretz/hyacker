---
title: レスポンシブデザインのベストプラクティス
description: モバイルファーストの考え方と、メディアクエリを使ったレスポンシブデザインの実装方法を解説します
upDate: 2025-02-01
pubDate: 2025-02-01
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

レスポンシブデザインはモバイルファーストで設計し、メディアクエリで大きい画面に対応するスタイルを追加していく方法が推奨されます。

```css
/* モバイルファースト: まずスマートフォン向けのスタイル */
.container {
  padding: 16px;
  font-size: 14px;
}

/* タブレット以上 */
@media (min-width: 768px) {
  .container {
    padding: 32px;
    font-size: 16px;
  }
}

/* デスクトップ以上 */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

## 解説

### モバイルファーストとは

小さい画面向けのスタイルをベースに書き、`min-width` のメディアクエリで大きい画面のスタイルを追加していくアプローチです。パフォーマンス面でも有利です。

### viewport メタタグ

レスポンシブデザインには `<meta name="viewport">` タグが必須です。

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 相対単位を活用する

- `%` : 親要素に対する割合
- `vw` / `vh` : ビューポートに対する割合
- `em` / `rem` : フォントサイズ基準の単位
- `clamp()` : 最小値・推奨値・最大値を指定
